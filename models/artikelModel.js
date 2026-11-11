
const mongoose = require('mongoose');

const artikelSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  kodeArtikel: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  judul: {
    type: String,
    required: true,
    trim: true
  },
  jumlahHalaman: {
    type: Number,
    required: true,
    min: 1
  },
  status: {
    type: String,
    required: true,
    trim: true
  },
  penulisUtama: {
    nama: {
      type: String,
      required: true,
      trim: true
    },
    afiliasi: {
      type: String,
      required: true,
      trim: true
    },
    _id: false
  },
  jurnalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Jurnal',
    required: true
  }
}, {
  timestamps: true,
  collection: 'artikels'
});

module.exports = mongoose.model('Artikel', artikelSchema);
