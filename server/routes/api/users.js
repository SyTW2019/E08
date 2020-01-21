const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

//Item model

const User = require('../../models/Users');

// @route GET users
router.get('/', (req, res) => {
  console.log('Entrando al get...');

  User.find()
    .then(users => res.json(users));
});

// @route POST register user
router.post('/registro', (req, res) => {
  console.log("Entrando al registro....");

  const newUser = new User({
    nombre: req.body.nombre,
    password: req.body.contrasena,
    email: req.body.email,
  });

  newUser.items.push({ nombre: 'Bebida energetica', iden: 0 });
  newUser.items.push({ nombre: 'Colegas', iden: 1 });
  newUser.items.push({ nombre: 'Asistir a clase', iden: 2 });
  newUser.items.push({ nombre: 'Tutorias', iden: 3 });

  User.findOne({email : newUser.email}, function(err,doc){
    if(err) throw err;
    if(doc) return res.status(400).json({ msg: 'El usuario no existe' });

    // Crear el salt & hash, el 10 es el número de veces que se ejecuta
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if(err) throw err;

        newUser.password = hash;

        newUser.save()
          .then(usuario => {
            //firmamos el token, es asincrono
            jwt.sign(
              { id: usuario.id },
              config.get('jwtSecret'),
              { expiresIn: 3600 },   //expira en una hora
              (err, token) => {
                if(err) throw err;

                console.log(token);

                res.send(JSON.stringify({
                  token,
                  id: 1,
                  user: usuario.nombre,
                  email: usuario.email
                }))
              })
          })
          .catch(error => {
            console.log(error)
            res.send(error)
        })
      })
    })
  });
});

// @route POST login user
router.post('/login', (req, res) => {
  console.log("Entrando al login....");
  const newUser = new User({
    password: req.body.contrasena,
    email: req.body.email
  });

  User.findOne({email : newUser.email}, function(err,doc){
    if(err) throw err;
    if(!doc) return res.status(400).json({ msg: 'El usuario no existe' })

    //Validar contraseña
    // Crear el salt & hash, el 10 es el número de veces que se ejecuta
    bcrypt.compare(newUser.password, doc.password)
      .then(isMatch => {
        if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        jwt.sign(
          { id: doc.id },
          config.get('jwtSecret'),
          { expiresIn: 3600 },   //expira en una hora
          (err, token) => {
            if(err) throw err;

            console.log(token);

            res.send(JSON.stringify({
              token,
              id: 1,
              user: doc.nombre,
              email: doc.email
            }))
          }
        )
      })

  });
});

// @route GET logout user
router.get('/logout', auth, (req, res) => {
  console.log("Entrando al logout....");

  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json({
      id: 1,
      user: user.nombre,
      email: user.email
    }));
});

router.post('/save', auth, (req, res) => {
  console.log("Entrando al guardado de partida, datos del usuario...");

  // User.findByIdAndUpdate(
  //   req.user.id,
  //   {
  //     items[0]: req.body.items[0],
  //     items[1]: req.body.items[1],
  //     items[2]: req.body.items[2],
  //     items[3]: req.body.items[3],
  //     data.lvl: req.body.currentLvl,
  //     data.money: req.body.money,
  //     stats.items: [
  //       {name:"Bebida Energetica",precio:10,cantidad:0,id:0,dps:3},
  //       {name:"Colegas",precio:250,cantidad:0,id:1,dps:8},
  //       {name:"Asistir a Clase",precio:750,cantidad:0,id:2,dps:15},
  //       {name:"Tutorias",precio:3000,cantidad:0,id:3,dps:20},
  //   ],
  //   data: {
  //       currentLvl: 1,
  //       money: 0
  //   },
  //   stats: {
  //       kills: 0,
  //       clicks: 0,
  //       tiempo_juego: 0,
  //   },kills: req.stats.kills,
  //     stats.clicks: req.stats.clicks,
  //     stats.tiempo: req.stats.tiempo_juego
  //   }
  //     function(err, result){
  //     if(err) throw err;
  //
  //     console.log(result);
  //     res.send(JSON.stringify(result));
  //   }
  // );
  // //v2
  // User.findById(req.user.id, function(err, data) {
  //   data.items[0].precio =
  //   data.items[0].cantidad =
  //   data.items[0].dps =
  // })
  // for (int i = 0; i < req.body.items.size; i++)
  //   User.update(
  //     { "_id": req.user.id },
  //     {
  //       $set: {"items.i.precio": req.body.items[i].precio, "items.i.cantidad": req.body.items[i].cantidad, "items.i.dps": req.body.items[i].dps}
  //     }
  //   )

  //v3
  User.findById(req.user.id, function(document) {
    document.items.forEach(function(elemento, indice, array) {
      items[indice].precio = req.items[indice].precio;
      items[indice].cantidad = req.items[indice].cantidad;
      items[indice].dps = req.items[indice].dps;
    })
    User.save(document);
  });

});

module.exports = router;
