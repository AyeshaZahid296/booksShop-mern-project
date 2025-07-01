import BookCard from './BookCard';

const BookSection = ({ title, books }) => {
    return (
        <section className="py-8 dark:bg-gray-800">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">{title}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {books.map(book => (
                        <BookCard key={book._id} book={book} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BookSection;