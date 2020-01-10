const express = require('express');
const router = express.Router();

//Item model

const User = require('../../models/Users');

// @route GET user
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
  console.log(`Valor de newUser: ${newUser}`);
  User.findOne({nombre : newUser.nombre}, function(err,doc){
    if(err) throw err;
    if(doc)
        console.log("Found: "+newUser.nombre+", pass="+doc.password);
    else
    {
        console.log("Not found: "+newUser);
	User.remove({});
	newUser.save()
  	.then(res.send(JSON.stringify({id: 1, user: newUser.nombre})))
  	.catch(error => {
        console.log(error)
        res.send(error)})
    }
  });
});

// @route POST login user
router.post('/login', (req, res) => {
  console.log("Entrando al login....");

  console.log(req.body.email);
  console.log(req.body.contrasena);

  User.findOne({email: req.body.email}, function(err, usuario){
    if(err) throw err;
    console.log(usuario.nombre);
    console.log(usuario.email);
    console.log(req.body.email);
    console.log(usuario.password);
    console.log(req.body.contrasena);
    if(usuario.email == req.body.email)
    {
      if(usuario.password == req.body.contrasena)
      {
        console.log("Login correcto del usuario "+usuario.nombre+", con contraseña: "+usuario.password);
        res.send(JSON.stringify({id: 1, user: usuario.nombre}));
      }
      else
      {
        console.log("La contraseña es incorrecta.");
        res.send(JSON.stringify({id: 2, user: null}));
      }
    }
    else
    {
      console.log("El usuario buscado no existe.");
      res.send(JSON.stringify({id: 0, user: null}));
    }
  });
});

module.exports = router;
