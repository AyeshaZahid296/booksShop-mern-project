// server/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Routes and DB setup
const bookRoutes = require('../routes/bookRoutes');
const Book = require('../models/Book');
const seedDB = require('../seed/seedDB');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve static files from the images folder
app.use('/images', express.static(path.join(__dirname, '../images')));

// Routes
app.use('/api/books', bookRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// MongoDB + Server Startup
const startServer = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ Connected to MongoDB');

        // Seed DB with sample books if needed
        await seedDB(Book);

        // Start Express server
        app.listen(PORT, () => {
            console.log(` Server running at: http://localhost:${PORT}`);
            console.log(` Images served at: http://localhost:${PORT}/images/<filename>`);
        });
    } catch (error) {
        console.error(' Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
