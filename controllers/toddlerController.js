
const Toddler = require('../models/toddlerModel');

exports.create = async (req, res) => {
  try {
    const toddler = await Toddler.create(req.body);
    await toddler.populate('orangTuaId');
    res.status(201).json(toddler);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



exports.getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {};

    if (req.query.jenisKelamin) {
  filter.jenisKelamin = {
    $regex: `^${req.query.jenisKelamin}$`,
    $options: 'i'
  };
}

    const total = await Toddler.countDocuments(filter);

    const data = await Toddler.find(filter)
      .skip(skip)
      .limit(limit)
      .populate('orangTuaId');

    res.status(200).json({
      page: page,
      limit: limit,
      total: total,
      totalPages: Math.ceil(total / limit),
      data: data
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



exports.getById = async (req, res) => {
  try {
    const data = await Toddler.findById(req.params.id)
      .populate('orangTuaId');

    if (!data) {
      return res.status(404).json({
        message: 'Data tidak ditemukan'
      });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: 'Terjadi kesalahan pada server'
    });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await Toddler.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('orangTuaId');

    if (!data) {
      return res.status(404).json({
        message: 'Data tidak ditemukan'
      });
    }

    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const data = await Toddler.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({
        message: 'Data tidak ditemukan'
      });
    }

    res.status(200).json({
      message: 'Data Toddler berhasil dihapus'
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
