// frontend/src/api/books.js

import axios from 'axios';

// Use environment variable for base API URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE_URL}/api/books`; // Example: http://localhost:5000/api/books

// ✅ Fetch all books with filters
export const getBooks = async (page = 1, limit = 10, filters = {}) => {
    try {
        const params = { page, limit };

        if (filters.languages?.length) {
            params.language = filters.languages;
        }

        if (filters.categories?.length) {
            params.category = filters.categories;
        }

        const response = await axios.get(API_URL, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching books with filters:', error);
        return [];
    }
};

// ✅ Fetch popular books
export const getPopularBooks = async () => {
    try {
        const response = await axios.get(`${API_URL}/popular`);
        return response.data;
    } catch (error) {
        console.error('Error fetching popular books:', error);
        return [];
    }
};

// ✅ Fetch new releases
export const getNewReleases = async () => {
    try {
        const response = await axios.get(`${API_URL}/new-releases`);
        return response.data;
    } catch (error) {
        console.error('Error fetching new releases:', error);
        return [];
    }
};

// ✅ Fetch books by specific category
export const getBooksByCategory = async (category) => {
    try {
        const response = await axios.get(`${API_URL}/category/${category}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching books for category: ${category}`, error);
        return [];
    }
};
