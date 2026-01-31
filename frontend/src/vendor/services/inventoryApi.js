// src/vendor/services/inventoryApi.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/vendor';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    Authorization: `Bearer ${token}`,
  };
};

// Inventory Management
export const reserveInventory = async (productId, quantity) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/inventory/reserve`,
      { productId, quantity },
      { headers: getAuthHeader() }
    );
    return response.data;
  } catch (error) {
    console.error('Error reserving inventory:', error);
    throw error;
  }
};

export const releaseInventory = async (productId, quantity) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/inventory/release`,
      { productId, quantity },
      { headers: getAuthHeader() }
    );
    return response.data;
  } catch (error) {
    console.error('Error releasing inventory:', error);
    throw error;
  }
};

// Pickup Management
export const generatePickupDocument = async (orderId) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/pickups/generate-document`,
      { orderId },
      { headers: getAuthHeader(), responseType: 'blob' }
    );
    return response.data;
  } catch (error) {
    console.error('Error generating pickup document:', error);
    throw error;
  }
};

export const markAsWithCustomer = async (orderId) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/pickups/${orderId}/with-customer`,
      {},
      { headers: getAuthHeader() }
    );
    return response.data;
  } catch (error) {
    console.error('Error marking as with customer:', error);
    throw error;
  }
};

// Return Management
export const processReturn = async (orderId, condition) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/returns/process`,
      { orderId, condition },
      { headers: getAuthHeader() }
    );
    return response.data;
  } catch (error) {
    console.error('Error processing return:', error);
    throw error;
  }
};

export const calculateLateFee = async (orderId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/returns/${orderId}/late-fee`,
      { headers: getAuthHeader() }
    );
    return response.data;
  } catch (error) {
    console.error('Error calculating late fee:', error);
    throw error;
  }
};
