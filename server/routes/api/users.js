const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config'); //para almacenar el jwtsecret y la uri de mongo
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

//MOdelo del Schema de Usuario
const User = require('../../models/Users');

//@route GET '/', por defecto sirve para comprobar si
//los usuarios se almacenan bien en la bdd, no tiene
//uso para los usuarios
router.get('/', (req, res) => {
  console.log('Petición GET /');

  User.find()
    .then(users => res.json(users));
});

//@route POST registrar usuario
router.post('/registro', (req, res) => {
  console.log("Petición POST de registro");

  //Creamos una variable que va a almacenar al nuevo usuario
  //de tipo User
  const newUser = new User({
    nombre: req.body.nombre,
    password: req.body.contrasena,
    email: req.body.email,
  });

  //Inicializamos los items a 0 de los usuarios.
  newUser.items.push({ name: 'Bebida energetica', iden: 0 });
  newUser.items.push({ name: 'Colegas', iden: 1 });
  newUser.items.push({ name: 'Asistir a clase', iden: 2 });
  newUser.items.push({ name: 'Tutorias', iden: 3 });

  //Revisamos que el usuario no exista ya
  User.findOne({email : newUser.email}, function(err,doc){
    if(err) throw err;
    if(doc) return res.status(400).json({ msg: 'El usuario ya existe' });

    // Crear el salt & hash, el 10 es el número de veces que se ejecuta
    bcrypt.genSalt(10, (err, salt) => {
      //Creamos el hash, que será la contraseña encriptada
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if(err) throw err;

        newUser.password = hash;

        //Guardamos al nuevo usuario con la contraseña encriptada
        newUser.save()
          .then(usuario => {
            //Creamos y firmamos el token, es asincrono
            jwt.sign(
              { id: usuario.id }, //Utilizamos el id del usuario para crear el token
              config.get('jwtSecret'),
              { expiresIn: 3600 },   //expira en una hora
              (err, token) => {
                if(err) throw err;

                //console.log(token);

                //Enviamos al front end el token, un 1 indicando que se ha realizado
                //el registro satisfactoriamente, y mandamos además el mail y nombre
                res.send(JSON.stringify({
                  token,
                  id: 1,
                  user: usuario.nombre,
                  email: usuario.email
                }))
              })
          })
          .catch(error => {   //en caso de error, lo sacamos en el backend y lo enviamos al front
            console.log(error)
            res.json({
              id: 0,
              msg: error
            })
        })
      })
    })
  });
});

//@route POST login usuario
router.post('/login', (req, res) => {
  console.log("Petición POST de login");

  //Creamos la variable que almacena los datos del usuario a loggear
  //que nos envñia el front end
  const newUser = new User({
    password: req.body.contrasena,
    email: req.body.email
  });

  //Buscamos el email del usuario para ver si existe o no
  User.findOne({email : newUser.email}, function(err,doc){
    if(err) throw err;
    if(!doc) return res.status(400).json({ msg: 'El usuario no existe' })

    //Validar contraseña
    //Comparamos si la contraseña que nos envían, es la misma que se tiene alacenada
    bcrypt.compare(newUser.password, doc.password)
      .then(isMatch => {
        if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        //Si es correecta, se crea un token para enviarselo al usuario
        jwt.sign(
          { id: doc.id },
          config.get('jwtSecret'),
          { expiresIn: 3600 },   //expira en una hora
          (err, token) => {
            if(err) throw err;

            //console.log(token);

            //Se envía al front end el token y los datos del usuario menos el id y la passwd
            res.send(JSON.stringify({
              token,
              id: 1,
              user: doc.nombre,
              email: doc.email,
              items: doc.items,
              data: doc.data,
              stats: doc.stats
            }))
          }
        )
      })
      .error(error =>{
        res.send(JSON.stringify({
          id:0
        }))
      })
  });
});

// @route GET logout usuario
// utilizamos un middleware, la función auth que nos valida el token
// una vez se compruebe que el token es correcto, se hace el logout
router.get('/logout', auth, (req, res) => {
  console.log("Petición GET de logout");

  //Se busca el id del usuario
  User.findById(req.user.id)
    .select('-password')  //Se toman los valores menos la contraseña
    .then(user => res.json({  //y se envñian al front end
      id: 1,
      user: user.nombre,
      email: user.email
    }));
});

// @route POST save datos del usuario
router.post('/save', auth, (req, res) => {
  console.log("Petición POST de guardado de partida");

  //Se busca el id del usuario
  User.findById(req.user.id)
    .then(user => {
        //Para cada item del usuario
        user.items.forEach(function(elemento) {
          //Se almacenan los distintos valores que toma cada item

          // console.log('Valor del item precio req:');
          // console.log(req.body.items[elemento.iden].precio);
          elemento.precio = req.body.items[elemento.iden].precio;
          // console.log('Valor del item precio almacenado:');
          // console.log(elemento.precio);

          // console.log('Valor del item cantidad req:');
          // console.log(req.body.items[elemento.iden].cantidad);
          elemento.cantidad = req.body.items[elemento.iden].cantidad;
          // console.log('Valor del item cantidad almacenado:');
          // console.log(elemento.cantidad);

          // console.log('Valor del item dps req:');
          // console.log(req.body.items[elemento.iden].dps);
          elemento.dps = req.body.items[elemento.iden].dps;
          // console.log('Valor del item dps almacenado:');
          // console.log(elemento.dps);
        })
      //Se almacenan el resto de datos y stats
      user.data.currentLvl = req.body.data.currentLvl;
      user.data.money = req.body.data.money;
      user.stats.kills = req.body.stats.kills;
      user.stats.clicks = req.body.stats.clicks;
      user.stats.tiempo_juego = req.body.stats.tiempo_juego;
      user.save();
      console.log('Valor del usuario almacenado:');
      console.log(user);
      //Se envia al front end un 1 de confirmación, y los datos almacenados para que se compruebe.
      res.json({
        id: 1,
        items: user.items,
        data: user.data,
        stats: user.stats
      })
    })
    .catch(error => {
      console.log(error);
      res.json({
        id: 0,
        msg: error
      })
    })
});

module.exports = router;
