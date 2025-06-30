import axios from 'axios';

const API_URL = 'http://localhost:8081/news'; // Adjust this if your backend URL is different

export const fetchNews = async (category, keyword) => {
    try {
        const response = await axios.get(API_URL, {
            params: { category, keyword },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching news:", error);
        throw error; // Rethrow the error for handling in your components
    }
};
