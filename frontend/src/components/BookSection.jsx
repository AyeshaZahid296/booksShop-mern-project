import BookCard from './BookCard';

const BookSection = ({ title, books = [] }) => {
    const validBooks = Array.isArray(books) ? books : [];

    return (
        <section className="py-10 px-4 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">{title}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {validBooks.map((book) => (
                        <BookCard key={book._id} book={book} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BookSection;
