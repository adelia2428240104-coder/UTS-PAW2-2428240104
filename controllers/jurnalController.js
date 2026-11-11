
const Jurnal = require('../models/jurnalModel');
const { errorHttp } = require('../middlewares/errorHandler');

// GET: Menampilkan semua jurnal
exports.getAll = async (req, res) => {
  const data = await Jurnal.find();
  res.json(data);
};

// GET: Menampilkan jurnal berdasarkan ID
exports.getById = async (req, res) => {
  const data = await Jurnal.findById(req.params.id);

  if (!data) {
    throw errorHttp(404, 'Jurnal tidak ditemukan');
  }

  res.json(data);
};

// POST: Menambahkan jurnal
exports.create = async (req, res) => {
  try {
    const jurnal = await Jurnal.create(req.body);
    res.status(201).json(jurnal);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        message: 'Kode jurnal sudah terdaftar'
      });
    }

    if (err.name === 'ValidationError') {
      return res.status(400).json({
        message: err.message
      });
    }

    throw err;
  }
};
