
const Artikel = require('../models/artikelModel');
const Jurnal = require('../models/jurnalModel');
const { errorHttp } = require('../middlewares/errorHandler');

const LIMIT_DEFAULT = 10;
const LIMIT_MAKS = 50;

const FIELD_SORT = ['judul', 'jumlahHalaman', 'status', 'createdAt'];

const FIELD_BOLEH_DIPILIH = [
  'kodeArtikel',
  'judul',
  'jumlahHalaman',
  'status',
  'penulisUtama',
  'jurnalId',
  'createdAt'
];

function angkaAman(nilai, bawaan, min, maks) {
  const n = parseInt(nilai, 10);
  if (Number.isNaN(n)) return bawaan;
  return Math.min(Math.max(n, min), maks);
}

// POST: Menambahkan artikel
exports.create = async (req, res) => {
  try {
    const artikel = await Artikel.create(req.body);
    res.status(201).json(artikel);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        message: 'Kode artikel sudah terdaftar'
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

// GET: Menampilkan semua artikel dan filtering
exports.getAll = async (req, res) => {
  const filter = {};

  if (req.query.status) {
    filter.status = String(req.query.status).trim();
  }

  if (req.query.jurnal) {
    const jurnal = await Jurnal.findOne({
      kode: String(req.query.jurnal).toUpperCase()
    });

    filter.jurnalId = jurnal ? jurnal._id : { $in: [] };
  }

  const page = angkaAman(req.query.page, 1, 1, Number.MAX_SAFE_INTEGER);
  const limit = angkaAman(req.query.limit, LIMIT_DEFAULT, 1, LIMIT_MAKS);

  const sortParam = String(req.query.sort || '-createdAt');
  const arah = sortParam.startsWith('-') ? -1 : 1;
  const sortField = sortParam.replace(/^-/, '');

  if (!FIELD_SORT.includes(sortField)) {
    throw errorHttp(400, `sort hanya boleh: ${FIELD_SORT.join(', ')}`);
  }

  let select = '';

  if (req.query.fields) {
    const fields = String(req.query.fields)
      .split(',')
      .map((f) => f.trim());

    if (!fields.every((f) => FIELD_BOLEH_DIPILIH.includes(f))) {
      throw errorHttp(400, `fields hanya boleh: ${FIELD_BOLEH_DIPILIH.join(', ')}`);
    }

    select = fields.join(' ');
  }

  const query = Artikel.find(filter)
    .select(select)
    .sort({ [sortField]: arah, _id: 1 })
    .skip((page - 1) * limit)
    .limit(limit);

  if (!select || select.split(' ').includes('jurnalId')) {
    query.populate('jurnalId', 'kode nama');
  }

  const [data, total] = await Promise.all([
    query,
    Artikel.countDocuments(filter)
  ]);

  res.json({
    data,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit)
  });
};

// GET: Menampilkan artikel berdasarkan ID
exports.getById = async (req, res) => {
  const data = await Artikel.findById(req.params.id)
    .populate('jurnalId');

  if (!data) {
    throw errorHttp(404, 'Data artikel tidak ditemukan');
  }

  res.json(data);
};

// PUT: Mengubah artikel
exports.update = async (req, res) => {
  const data = await Artikel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { returnDocument: 'after', runValidators: true }
  );

  if (!data) {
    throw errorHttp(404, 'Data artikel tidak ditemukan');
  }

  res.json(data);
};

// DELETE: Menghapus artikel
exports.remove = async (req, res) => {
  const data = await Artikel.findByIdAndDelete(req.params.id);

  if (!data) {
    throw errorHttp(404, 'Data artikel tidak ditemukan');
  }

  res.status(204).send();
};
