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

// @route POST user
router.post('/registro', (req, res) => {
  console.log("Entrando al registro....");
  const newUser = new User({
    nombre: req.body.userValue,
    password: req.body.pwdValue,
    email: req.body.emailValue
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
  	.then(res.send(JSON.stringify({id: "1", user: newUser.nombre})))
  	.catch(error => {
        console.log(error)
        res.send(error)})
    }
  });
});

module.exports = router;
