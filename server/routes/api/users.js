const express = require('express');
const router = express.Router();

//Item model

const User = require('../../models/Users');

// @route GET user
router.get('/', (req, res) => {
  console.log('Entro')
  User.find()
    .then(users => res.json(users));
});

// @route POST user
router.post('/', (req, res) => {
  console.log(`valor de newuser: ${newUser}`);
  User.find({
    nombre: req.body.nombre
  }, (err, prevuser) => {
    if(err)
    {
      console.log(err);
      // res.end('Error: Error del servidor.');
      res.end({
        resultado: false,
        mensaje: 'Error: error del servidor.'
      });
    }
    else if (prevuser.length > 0)
    {
      // res.end('Error: El usuario ya existe.')
      res.end({
        resultado: false,
        mensaje: 'Error: el usuario ya existe.'
      });
    }
    else
    {
      const newUser = new User({
        nombre: req.body.nombre,
        password: req.body.password,
        email: req.body.email
      });
      newUser.save()
      .then(user => res.json(user))
      .catch(err => console.log(err));
    }
    res.end({
      resultado: true,
      mensaje: 'Registro completado.'
    });
  });
});

module.exports = router;
