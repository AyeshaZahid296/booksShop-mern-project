const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const bookRoutes = require('../routes/bookRoutes');
const Book = require('../models/Book');
const seedDB = require('../seed/seedDB');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI not found in .env');
    process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());

// Serve static images
app.use('/images', express.static(path.join(__dirname, '../images')));

// default route
// app.use('/', (req, res) => {
//     res.send("Api running....")
// });

// Routes
app.use('/api/books', bookRoutes);

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start Server
const startServer = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ MongoDB Connected');

        await seedDB(Book);

        app.listen(PORT, () => {
            console.log(`🚀 Server running: http://localhost:${PORT}`);
            console.log(`📦 Images: http://localhost:${PORT}/images/<filename>`);
        });
    } catch (error) {
        console.error('❌ Startup Error:', error);
        process.exit(1);
    }
};

startServer();
