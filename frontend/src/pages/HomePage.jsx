// client/src/pages/HomePage.js
import { useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';
import HeroSlider from '../components/HeroSlider';
import BookSection from '../components/BookSection';
import { getPopularBooks, getNewReleases, getBooksByCategory } from '../api/books';

const HomePage = () => {
    const [popularBooks, setPopularBooks] = useState([]);
    const [newReleases, setNewReleases] = useState([]);
    const [islamicBooks, setIslamicBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [popular, newReleases, islamic] = await Promise.all([
                    getPopularBooks(),
                    getNewReleases(),
                    getBooksByCategory('islamic')
                ]);
                setPopularBooks(popular);
                setNewReleases(newReleases);
                setIslamicBooks(islamic);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* <Navbar /> */}
            <div className="container mx-auto px-4 py-8">
                <div className="animate-pulse space-y-8">
                    {[...Array(3)].map((_, i) => (
                        <div key={i}>
                            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                                {[...Array(5)].map((_, j) => (
                                    <div key={j} className="bg-white dark:bg-gray-700 rounded-lg shadow-md h-64"></div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* <Navbar /> */}
            <div className="container mx-auto px-4 py-8 text-center">
                <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 p-4 rounded-lg">
                    Error: {error}
                </div>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 bg-indigo-600 #1E3A8A hover:bg-indigo-700 text-white px-4 py-2 rounded"
                >
                    Retry
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* <Navbar /> */}
            <HeroSlider />

            <main>
                <BookSection title="Most Popular Books" books={popularBooks} />
                <BookSection title="New Releases" books={newReleases} />
                <BookSection title="Islamic Books" books={islamicBooks} />
            </main>

            <footer className="bg-gray-800 text-white py-8 mt-12">
                <div className="container mx-auto px-4 text-center">
                    <p>© {new Date().getFullYear()} AziReads. All rights reserved.</p>
                    <div className="flex justify-center space-x-4 mt-4">
                        <a href="#" className="hover:text-indigo-400">Terms</a>
                        <a href="#" className="hover:text-indigo-400">Privacy</a>
                        <a href="#" className="hover:text-indigo-400">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;