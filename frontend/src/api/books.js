// client/src/api/books.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/books';

// Update client/src/api/books.js
export const getBooks = async (page = 1, limit = 10, filters = {}) => {
    const params = { page, limit };

    // Add filters to params
    if (filters.languages && filters.languages.length > 0) {
        params.language = filters.languages;
    }

    if (filters.categories && filters.categories.length > 0) {
        params.category = filters.categories;
    }

    const response = await axios.get(API_URL, { params });
    return response.data;
};

export const getPopularBooks = async () => {
    const response = await axios.get(`${API_URL}/popular`);
    return response.data;
};

export const getNewReleases = async () => {
    const response = await axios.get(`${API_URL}/new-releases`);
    return response.data;
};

export const getBooksByCategory = async (category) => {
    const response = await axios.get(`${API_URL}/category/${category}`);
    return response.data;
};
