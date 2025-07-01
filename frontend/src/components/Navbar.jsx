import { FaMoon, FaSun, FaHome, FaCompass } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
    const location = useLocation();
    const isExplorePage = location.pathname === '/explore';

    const [darkMode, setDarkMode] = useState(false);

    // Load saved theme from localStorage
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark') {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    // Toggle theme and update localStorage
    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        if (newMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-md p-4 sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                {/* Left Side: Logo */}
                <Link to="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    AziReads
                </Link>

                {/* Right Side: Explore/Home Toggle + Dark Mode */}
                <div className="flex items-center space-x-4">
                    <Link
                        to={isExplorePage ? '/' : '/explore'}
                        className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full transition-colors"
                    >
                        {isExplorePage ? (
                            <>
                                <FaHome className="mr-2" /> Home
                            </>
                        ) : (
                            <>
                                <FaCompass className="mr-2" /> Explore
                            </>
                        )}
                    </Link>

                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Toggle dark mode"
                    >
                        {darkMode ? (
                            <FaSun className="text-yellow-400" />
                        ) : (
                            <FaMoon className="text-gray-700 dark:text-gray-200" />
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
