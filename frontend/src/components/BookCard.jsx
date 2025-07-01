import { FaStar } from 'react-icons/fa';

const BookCard = ({ book }) => {
    return (
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="font-semibold text-lg mb-1 text-gray-800 dark:text-white">{book.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{book.author}</p>
                <div className="flex items-center mb-2">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="text-gray-700 dark:text-gray-200 text-sm">{book.rating}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">${book.price}</span>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-sm">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookCard;