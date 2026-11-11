
const mongoose = require('mongoose');

const jurnalSchema = new mongoose.Schema({
  kode: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  nama: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true,
  collection: 'jurnals'
});

module.exports = mongoose.model('Jurnal', jurnalSchema);
