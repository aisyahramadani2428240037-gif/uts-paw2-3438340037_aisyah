
require('dotenv').config();

const express = require('express');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');

const orangTuaRoutes = require('./routes/OrangTuaRoutes');
const toddlerRoutes = require('./routes/toddlerRoutes');

app.use(express.json({
  strict: true
}));

// Middleware API Key
const API_KEY = 'si5b_rahasia123';

function cekApiKey(req, res, next) {
  const apiKey = req.headers['x-api-key'];

  if (apiKey !== API_KEY) {
    return res.status(401).json({
      message: 'API key tidak valid'
    });
  }

  next();
}

// Middleware format JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      message: 'Format JSON tidak valid'
    });
  }
  next(err);
});

// Halaman utama
app.get('/', (req, res) => {
  res.send('Server Express.js berjalan!');
});

// Route Toddler
app.use('/toddler', toddlerRoutes);

// Route OrangTua
app.use('/orangtua', orangTuaRoutes);

// Koneksi MongoDB
mongoose.connect(process.env.MONGODB_URI)
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
