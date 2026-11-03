const OrangTua = require('../models/OrangTuaModel');

// Menampilkan semua data OrangTua
exports.getAll = async (req, res) => {
  try {
    const data = await OrangTua.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: 'Terjadi kesalahan pada server',
      error: err.message
    });
  }
};

// Menambahkan data OrangTua
exports.create = async (req, res) => {
  try {
    const data = await OrangTua.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};