import axios from 'axios';

export interface SearchResult {
  id: number;
  name: string;
  searchResults:string;
  // Add other relevant properties
}

export const calltodb = async (searchText: string): Promise<SearchResult[]> => {
  try {
    const response = await axios.get(`/api/search?query=${searchText}`);
    return response.data;
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
};