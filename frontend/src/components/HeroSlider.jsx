import { useEffect, useState } from 'react';

const HeroSlider = () => {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        setImageUrl(`${baseUrl}/images/main.avif`);
    }, []);

    return (
        <div
            className="relative h-[32rem] bg-contain bg-no-repeat bg-center flex items-end
            "
            style={{ backgroundImage: `url(${imageUrl})` }}
        >
            <div className="container  text-white px-6 py-6 ">
                {/* <h2 className="text-4xl font-bold mb-2">Welcome to Our Bookstore</h2>
                <p className="text-xl mb-4">Find the best reads curated just for you</p> */}
                <button className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg">
                    Explore Now
                </button>
            </div>
        </div>
    );
};

export default HeroSlider;
