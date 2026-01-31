import axios from 'axios';

// Use Vite env var when available, fallback to localhost
const API_BASE_URL = import.meta?.env?.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const fetchProducts = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/products`);
    return res.data;
  } catch (error) {
    console.error('Error fetching public products:', error);
    throw error;
  }
};
