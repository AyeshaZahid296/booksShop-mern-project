import { useEffect, useState } from 'react';
import { getPopularBooks, getNewReleases } from '../api/books';
import HeroSlider from '../components/HeroSlider';
import BookSection from '../components/BookSection';

const HomePage = () => {
    const [popularBooks, setPopularBooks] = useState([]);
    const [newBooks, setNewBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const [popular, recent] = await Promise.all([
                    getPopularBooks(),
                    getNewReleases(),
                ]);

                console.log('Popular:', popular);
                console.log('Recent:', recent);

                setPopularBooks(Array.isArray(popular) ? popular : []);
                setNewBooks(Array.isArray(recent) ? recent : []);
            } catch (err) {
                setError('Failed to fetch books.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadBooks();
    }, []);

    if (loading) {
        return <div className="text-center py-10 text-lg dark:text-white">Loading books...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">{error}</div>;
    }

    return (
        <div>
            <HeroSlider />
            <BookSection title="Popular Books" books={popularBooks} />
            <BookSection title="New Releases" books={newBooks} />
        </div>
    );
};

export default HomePage;
