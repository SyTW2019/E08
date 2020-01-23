const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Crear schema
const UserDataSchema = new Schema({
  lvl: {
    type: Number,
    required: true,
    default: 0
  },
  money: {
    type: Number,
    required: true,
    default: 0
  }
});

module.exports = UserData = mongoose.model('userdata', UserItemSchema);
