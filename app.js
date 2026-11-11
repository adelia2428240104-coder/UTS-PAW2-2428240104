
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const logger = require('./middlewares/logger');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');

const artikelRoutes = require('./routes/artikelRoutes');
const jurnalRoutes = require('./routes/jurnalRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger);
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server Express.js berjalan!');
});

app.use('/artikel', artikelRoutes);
app.use('/jurnal', jurnalRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

mongoose.connect(process.env.DB_URI)
  .then(() => {
    console.log('Terhubung ke MongoDB');
    app.listen(PORT, () => {
      console.log(`Server berjalan di http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Gagal terhubung:', err.message);
    process.exit(1);
  });
