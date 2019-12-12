const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Crear schema
const UserSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

module.exports = User = mongoose.model('user', UserSchema);
