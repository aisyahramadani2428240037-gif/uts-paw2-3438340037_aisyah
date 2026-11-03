const mongoose = require('mongoose');

// Schema alamat (Embedding)
const alamatSchema = new mongoose.Schema({
  jalan: String,
  kota: String
}, { _id: false });

// Schema Toddler
const toddlerSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: [true, 'nama wajib diisi'],
    trim: true
  },
  tanggalLahir: {
    type: Date,
    required: [true, 'tanggal lahir wajib diisi']
  },
  jenisKelamin: {
    type: String,
    required: [true, 'jenis kelamin wajib diisi'],
    enum: ['L', 'P']
  },
  beratKg: {
    type: Number,
    required: [true, 'berat badan wajib diisi']
  },
  tinggiCm: {
    type: Number,
    required: [true, 'tinggi badan wajib diisi']
  },

  // Embedding
  alamat: alamatSchema,

  // Referencing ke OrangTua
  orangTuaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrangTua'
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

toddlerSchema.index(
  { tanggalLahir: 1 },
  { unique: true }
);

module.exports = mongoose.model('Toddler', toddlerSchema);