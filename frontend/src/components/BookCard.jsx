import { FaStar } from 'react-icons/fa';

const BookCard = ({ book }) => {
    return (
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
            <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-48 object-cover"
                loading="lazy"
            />
            <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 dark:text-white line-clamp-1">{book.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-1">{book.author}</p>
                <div className="flex items-center text-sm mb-2">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="text-gray-700 dark:text-gray-200">{book.rating}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">${book.price.toFixed(2)}</span>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-sm">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookCard;
