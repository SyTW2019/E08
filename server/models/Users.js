const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Item = require('./Users_item');
var Data = require('./Users_data');
var Stat = require('./Users_stat');

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
  },
  items: [Item],
  data: Data,
  stats: Stat
});

module.exports = User = mongoose.model('user', UserSchema);
