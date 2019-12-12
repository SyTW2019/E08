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
router.post('/registro', (req, res) => {
  const newUser = new User({
    nombre: req.body.emailValue,
    password: req.body.pwdValue,
    email: req.body.emailValue
  });
  console.log(`valor de newuser: ${newUser}`);
  newUser.save()
  .then(user => res.json(user))
  .catch(err => console.log(err));
});

module.exports = router;
