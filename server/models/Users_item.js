const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Crear schema
const UserItemSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  cantidad: {
    type: Number,
    required: true
  },
  id: {
    type: Number,
    required: true
  },
  dps: {
    type: Number,
    required: true
  }
});

module.exports = UserItem = mongoose.model('useritem', UserItemSchema);
