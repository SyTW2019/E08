const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Crear schema
const UserStatsSchema = new Schema({
  kills: {
    type: Number,
    required: true
  },
  clicks: {
    type: Number,
    required: true
  },
  tiempo_juego: {
    type: Number,
    required: true
  }
});

module.exports = UserStats = mongoose.model('userstats', UserItemSchema);
