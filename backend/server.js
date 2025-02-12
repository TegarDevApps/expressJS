const express = require('express');
const multer = require('multer');
const path = require('path');
const connectDB = require('./config/db');
const router = require('./router/routers');
const cors = require('cors');

const app = express();
const port = 3000;

// Koneksi ke database
connectDB();

// Middleware CORS (Tambahkan di sini)
app.use(cors({
    origin: 'http://localhost:5173', // React frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));

app.use('/uploads', express.static('uploads'));

// Middleware untuk JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set folder public untuk menyimpan gambar
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Gunakan routes
app.use('/api', router);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
