import axios from 'axios';
export const calltodb = async (searchText) => {
    try {
        const response = await axios.get(`/api/search?query=${searchText}`);
        return response.data;
    }
    catch (error) {
        console.error('Search error:', error);
        return [];
    }
};
