const booksData = require('./bookData');

const seedDB = async (Book) => {
    try {
        const count = await Book.countDocuments();
        if (count === 0) {
            await Book.insertMany(booksData);
            console.log('✅ Books collection seeded.');
        } else {
            console.log(' Books collection already has data. Seeding skipped.');
        }
    } catch (err) {
        console.error(' Error seeding books:', err);
    }
};

module.exports = seedDB;
