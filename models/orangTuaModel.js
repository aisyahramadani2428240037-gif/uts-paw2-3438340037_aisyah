const mongoose = require('mongoose');

const orangTuaSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
    trim: true
  },
  noTelepon: {
    type: String,
    required: true
  },
  alamat: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('OrangTua', orangTuaSchema);