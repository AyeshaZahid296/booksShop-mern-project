// server/controllers/bookController.js
const Book = require('../models/Book');

const getBooks = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const query = {};

        // Filter by category if provided
        if (req.query.category) {
            query.category = { $in: Array.isArray(req.query.category) ? req.query.category : [req.query.category] };
        }

        // Filter by language if provided
        if (req.query.language) {
            query.language = { $in: Array.isArray(req.query.language) ? req.query.language : [req.query.language] };
        }

        // Search by title or author if search term is provided
        if (req.query.search) {
            query.$or = [
                { title: { $regex: req.query.search, $options: 'i' } },
                { author: { $regex: req.query.search, $options: 'i' } }
            ];
        }

        // Sorting options
        let sort = {};
        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(':');
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
        } else {
            sort = { createdAt: -1 }; // Default sort by newest
        }

        const books = await Book.find(query)
            .sort(sort)
            .skip(skip)
            .limit(limit);

        const total = await Book.countDocuments(query);

        res.json({
            books,
            total,
            page,
            pages: Math.ceil(total / limit)
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getPopularBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({ rating: -1 }).limit(10);
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getNewReleases = async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 }).limit(10);
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getBooksByCategory = async (req, res) => {
    try {
        const books = await Book.find({ category: req.params.category }).limit(10);
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getBooks, getPopularBooks, getBooksByCategory, getNewReleases }