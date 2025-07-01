import { useEffect, useState } from 'react';
import { getBooks } from '../api/books';
import BookSection from '../components/BookSection';

const categoriesList = ['fiction', 'non-fiction', 'islamic', 'biography', 'self-help', 'academic', 'psychology'];
const languagesList = ['english', 'urdu', 'arabic', 'french', 'spanish', 'german'];

const ExplorePage = () => {
    const [allBooks, setAllBooks] = useState([]); // All books fetched once
    const [filteredBooks, setFilteredBooks] = useState([]); // Shown books
    const [filters, setFilters] = useState({
        categories: [],
        languages: []
    });

    // Fetch only once on mount
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const data = await getBooks(1, 100); // No filters sent to backend
                setAllBooks(data.books || []);
                setFilteredBooks(data.books || []);
            } catch (err) {
                console.error('Failed to fetch books:', err);
            }
        };

        fetchBooks();
    }, []);

    // Apply filters in frontend whenever filters OR books change
    useEffect(() => {
        let filtered = [];

        if (filters.categories.length === 0 && filters.languages.length === 0) {
            filtered = allBooks;
        } else {
            filtered = allBooks.filter(book => {
                const matchCategory =
                    filters.categories.length === 0 ||
                    filters.categories.includes(book.category.toLowerCase());

                const matchLanguage =
                    filters.languages.length === 0 ||
                    filters.languages.includes(book.language.toLowerCase());

                // ✅ AND between groups (language + category), OR within each group
                return (
                    (filters.categories.length === 0 || matchCategory) &&
                    (filters.languages.length === 0 || matchLanguage)
                );
            });
        }

        setFilteredBooks(filtered);
    }, [filters, allBooks]);



    const toggleFilter = (type, value) => {
        setFilters(prev => {
            const current = prev[type];
            const updated = current.includes(value)
                ? current.filter(item => item !== value)
                : [...current, value];
            return { ...prev, [type]: updated };
        });
    };

    const resetFilters = () => {
        setFilters({ categories: [], languages: [] });
    };

    const isSelected = (type, value) => filters[type].includes(value);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-800 pt-4">
            <div className="container mx-auto px-4 mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Explore Books</h1>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                    <div className="flex flex-col gap-4">
                        {/* Category Filters */}
                        <div className="flex flex-wrap gap-2">
                            {categoriesList.map(category => (
                                <button
                                    key={category}
                                    onClick={() => toggleFilter('categories', category)}
                                    className={`px-3 py-1 rounded-full text-sm font-medium border ${isSelected('categories', category)
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* Language Filters */}
                        <div className="flex flex-wrap gap-2">
                            {languagesList.map(language => (
                                <button
                                    key={language}
                                    onClick={() => toggleFilter('languages', language)}
                                    className={`px-3 py-1 rounded-full text-sm font-medium border ${isSelected('languages', language)
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300'
                                        }`}
                                >
                                    {language}
                                </button>
                            ))}
                        </div>
                    </div>


                    <button
                        onClick={resetFilters}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm"
                    >
                        Reset Filters
                    </button>
                </div>

                <BookSection title="Filtered Results" books={filteredBooks} />
                {/* if no book matches filters */}
                {filteredBooks.length === 0 && (
                    <div className="text-center text-gray-600 dark:text-gray-300 mt-8 text-lg">
                        No books found for these filters.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExplorePage;