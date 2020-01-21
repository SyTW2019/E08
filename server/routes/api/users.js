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

  User.findById(req.user.id)
    .then(user => {
        user.items.forEach(function(elemento) {

          console.log('Valor del item precio req:');
          console.log(req.body.items[elemento.iden].precio);
          elemento.precio = req.body.items[elemento.iden].precio;
          console.log('Valor del item precio almacenado:');
          console.log(elemento.precio);

          console.log('Valor del item cantidad req:');
          console.log(req.body.items[elemento.iden].cantidad);
          elemento.cantidad = req.body.items[elemento.iden].cantidad;
          console.log('Valor del item cantidad almacenado:');
          console.log(elemento.cantidad);

          console.log('Valor del item dps req:');
          console.log(req.body.items[elemento.iden].dps);
          elemento.dps = req.body.items[elemento.iden].dps;
          console.log('Valor del item dps almacenado:');
          console.log(elemento.dps);
        })
      user.data.lvl = req.body.data.currentLvl;
      user.data.money = req.body.data.money;
      user.stats.kills = req.body.stats.kills;
      user.stats.clicks = req.body.stats.clicks;
      user.stats.tiempo = req.body.stats.tiempo_juego;
      user.save();
      console.log('Valor del usuario almacenado:');
      console.log(user);
    })
});

module.exports = router;
