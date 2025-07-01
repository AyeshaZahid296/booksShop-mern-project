import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar';
import BookCard from '../components/BookCard';
import { getBooks } from '../api/books';

const ExplorePage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({
        languages: [],
        categories: []
    });

    // Available filter options
    const languageOptions = ['English', 'Urdu', 'Arabic', 'French', 'Spanish', 'German'];
    const categoryOptions = ['Psychology', 'Academic', 'Islamic', 'Fiction', 'Biography', 'Self-Help'];

    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const query = {};

                if (filters.languages.length > 0) {
                    query.language = { $in: filters.languages };
                }

                if (filters.categories.length > 0) {
                    query.category = { $in: filters.categories };
                }

                const data = await getBooks(page, 12, query);
                setBooks(data.books);
                setTotalPages(data.pages);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchBooks();
    }, [page, filters]);

    const handleLanguageChange = (language) => {
        setFilters(prev => {
            if (prev.languages.includes(language)) {
                return {
                    ...prev,
                    languages: prev.languages.filter(lang => lang !== language)
                };
            } else {
                return {
                    ...prev,
                    languages: [...prev.languages, language]
                };
            }
        });
        setPage(1); // Reset to first page when filters change
    };

    const handleCategoryChange = (category) => {
        setFilters(prev => {
            if (prev.categories.includes(category)) {
                return {
                    ...prev,
                    categories: prev.categories.filter(cat => cat !== category)
                };
            } else {
                return {
                    ...prev,
                    categories: [...prev.categories, category]
                };
            }
        });
        setPage(1); // Reset to first page when filters change
    };

    const resetFilters = () => {
        setFilters({
            languages: [],
            categories: []
        });
        setPage(1);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* <Navbar isExplorePage={true} /> */}

            <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <div className="w-full md:w-64 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                        <div className="mb-6">
                            <h3 className="font-bold text-lg mb-3 text-gray-800 dark:text-white">Languages</h3>
                            <div className="space-y-2">
                                {languageOptions.map(language => (
                                    <div key={language} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`lang-${language}`}
                                            checked={filters.languages.includes(language)}
                                            onChange={() => handleLanguageChange(language)}
                                            className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
                                        />
                                        <label htmlFor={`lang-${language}`} className="ml-2 text-gray-700 dark:text-gray-300">
                                            {language}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="font-bold text-lg mb-3 text-gray-800 dark:text-white">Categories</h3>
                            <div className="space-y-2">
                                {categoryOptions.map(category => (
                                    <div key={category} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`cat-${category}`}
                                            checked={filters.categories.includes(category)}
                                            onChange={() => handleCategoryChange(category)}
                                            className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
                                        />
                                        <label htmlFor={`cat-${category}`} className="ml-2 text-gray-700 dark:text-gray-300">
                                            {category}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={resetFilters}
                            className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-2 px-4 rounded"
                        >
                            Reset Filters
                        </button>
                    </div>

                    {/* Books Grid */}
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                            Explore Books
                            {filters.languages.length > 0 || filters.categories.length > 0 ? (
                                <span className="text-sm ml-2 text-gray-500 dark:text-gray-400">
                                    (Filtered results)
                                </span>
                            ) : null}
                        </h2>

                        {books.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-600 dark:text-gray-400">No books found matching your filters.</p>
                                <button
                                    onClick={resetFilters}
                                    className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {books.map(book => (
                                        <BookCard key={book._id} book={book} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex justify-center mt-8">
                                        <nav className="inline-flex rounded-md shadow">
                                            <button
                                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                                disabled={page === 1}
                                                className="px-3 py-2 rounded-l-md border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50"
                                            >
                                                Previous
                                            </button>
                                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                                // Show pages around current page
                                                let pageNum;
                                                if (totalPages <= 5) {
                                                    pageNum = i + 1;
                                                } else if (page <= 3) {
                                                    pageNum = i + 1;
                                                } else if (page >= totalPages - 2) {
                                                    pageNum = totalPages - 4 + i;
                                                } else {
                                                    pageNum = page - 2 + i;
                                                }

                                                return (
                                                    <button
                                                        key={pageNum}
                                                        onClick={() => setPage(pageNum)}
                                                        className={`px-3 py-2 border-t border-b border-gray-300 ${page === pageNum ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'}`}
                                                    >
                                                        {pageNum}
                                                    </button>
                                                );
                                            })}
                                            <button
                                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                                disabled={page === totalPages}
                                                className="px-3 py-2 rounded-r-md border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50"
                                            >
                                                Next
                                            </button>
                                        </nav>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ExplorePage;