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
    email: req.body.email
  });

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

// @route POST logout user
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

module.exports = router;
