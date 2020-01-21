const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Crear schema
const UserStatsSchema = new Schema({
  kills: {
    type: Number,
    required: true,
    default: 0
  },
  clicks: {
    type: Number,
    required: true,
    default: 0
  },
  tiempo: {
    type: Number,
    required: true,
    default: 0
  }
});

module.exports = UserStats = mongoose.model('userstats', UserItemSchema);
