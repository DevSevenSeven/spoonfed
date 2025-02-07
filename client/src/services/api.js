// src/services/api.ts
const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL) {
    throw new Error('API URL not found in environment variables');
}
export const fetchData = async (endpoint) => {
    try {
        const response = await fetch(`${API_URL}${endpoint}`);
        if (!response.ok)
            throw new Error('Network response was not ok');
        return await response.json();
    }
    catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};
export default API_URL;
