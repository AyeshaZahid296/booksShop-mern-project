// server/routes/bookRoutes.js
const express = require('express');
const { getBooks, getPopularBooks, getBooksByCategory, getNewReleases } = require('../controllers/bookController');
const router = express.Router();

// GET /api/books - Get all books with pagination and filtering
router.get('/', getBooks);

// GET /api/books/popular - Get popular books
router.get('/popular', getPopularBooks);

// GET /api/books/new-releases - Get new releases
router.get('/new-releases', getNewReleases);

// GET /api/books/category/:category - Get books by category
router.get('/category/:category', getBooksByCategory);

module.exports = router;