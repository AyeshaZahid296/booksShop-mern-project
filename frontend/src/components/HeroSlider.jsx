import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        {
            id: 1,
            title: "Bestseller of the Month",
            subtitle: "Discover this month's most popular reads",
            image: "/images/slide1.jpg",
            buttonText: "Shop Now"
        },
        // Add more slides
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <div className="relative h-96 overflow-hidden">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 flex items-center bg-cover bg-center ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                    style={{ backgroundImage: `url(${slide.image})` }}
                >
                    <div className="container mx-auto px-4 text-white">
                        <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
                        <p className="text-xl mb-6">{slide.subtitle}</p>
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg">
                            {slide.buttonText}
                        </button>
                    </div>
                </div>
            ))}

            <button
                onClick={() => setCurrentSlide(prev => prev === 0 ? slides.length - 1 : prev - 1)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            >
                <FiChevronLeft size={24} />
            </button>

            <button
                onClick={() => setCurrentSlide(prev => prev === slides.length - 1 ? 0 : prev + 1)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            >
                <FiChevronRight size={24} />
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-gray-400'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSlider;