const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Crear schema
const UserDataSchema = new Schema({
  lvl: {
    type: Number,
    required: true
  },
  money: {
    type: Number,
    required: true
  }
});

module.exports = UserData = mongoose.model('userdata', UserItemSchema);
