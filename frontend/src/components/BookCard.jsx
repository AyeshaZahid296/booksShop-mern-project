import { useState } from 'react';
import { FaStar, FaShoppingCart } from 'react-icons/fa';

const BookCard = ({ book }) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    const handleLoad = () => setLoaded(true);
    const handleError = () => setError(true);

    const imageSrc = error
        ? ''
        : book.coverImage.startsWith('http')
            ? book.coverImage
            : `http://localhost:5000${book.coverImage}`;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-100 dark:border-gray-700">
            {/* Image Section */}
            <div className="relative w-full h-70 border-b-2 border-gray-100 bg-gray-200 dark:bg-gray-700">
                {!loaded && (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
                        Loading image...
                    </div>
                )}
                {!error && (
                    <img
                        src={imageSrc}
                        alt={book.title}
                        className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                        onLoad={handleLoad}
                        onError={handleError}
                        loading="lazy"
                    />
                )}

                {/* Rating Badge */}
                <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-yellow-400 text-xs font-medium px-2 py-1 rounded-lg flex items-center gap-1 shadow">
                    <FaStar className="text-yellow-400" />
                    {book.rating}
                </div>

                {/* Price Badge */}
                <div className="absolute top-2 right-2 bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded-lg shadow">
                    ${book.price.toFixed(2)}
                </div>

                {/* Cart Icon */}
                <button
                    title="Add to Cart"
                    className="absolute bottom-2 right-2 bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-300 p-2 rounded-full shadow hover:bg-indigo-600 hover:text-white transition-colors"
                >
                    <FaShoppingCart className="w-4 h-4" />
                </button>
            </div>

            {/* Book Info */}
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white truncate">
                        {book.title}
                    </h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-300 truncate">
                    {book.author}
                </p>
            </div>
        </div>
    );
};

export default BookCard;
