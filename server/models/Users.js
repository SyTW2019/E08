const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// var Item = require('./Users_item');
// var Data = require('./Users_data');
// var Stat = require('./Users_stat');

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
  items: [{
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
  }],
  data: {
    currentLvl: {
      type: Number,
      required: true,
      default: 0
    },
    money: {
      type: Number,
      required: true,
      default: 0
    }
  },
  stats: {
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
    tiempo_juego: {
      type: Number,
      required: true,
      default: 0
    }
  }
});

module.exports = User = mongoose.model('user', UserSchema);
