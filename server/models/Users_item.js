const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Crear schema
const UserItemSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    default: ''
  },
  precio: {
    type: Number,
    required: true,
    default: 0
  },
  cantidad: {
    type: Number,
    required: true,
    default: 0
  },
  iden: {
    type: Number,
    required: true,
    default: 0
  },
  dps: {
    type: Number,
    required: true,
    default: 0
  }
});

module.exports = UserItem = mongoose.model('useritem', UserItemSchema);
