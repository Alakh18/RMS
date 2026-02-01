import axios from 'axios';

const API_BASE_URL = import.meta?.env?.VITE_API_BASE_URL || 'http://localhost:3000/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const addItemToCart = async (item) => {
  const payload = {
    productId: item.productId,
    quantity: item.quantity,
    startDate: item.startDate,
    endDate: item.endDate,
  };
  const res = await axios.post(`${API_BASE_URL}/orders/cart`, payload, {
    headers: getAuthHeader(),
  });
  return res.data;
};

export const confirmOrder = async (orderId) => {
  const res = await axios.post(
    `${API_BASE_URL}/orders/confirm`,
    { orderId },
    { headers: getAuthHeader() }
  );
  return res.data;
};

export const submitQuotation = async () => {
  const res = await axios.post(
    `${API_BASE_URL}/orders/submit-quotation`,
    {},
    { headers: getAuthHeader() }
  );
  return res.data;
};

export const getQuotationStatus = async () => {
  const res = await axios.get(`${API_BASE_URL}/orders/quotation-status`, {
    headers: getAuthHeader(),
  });
  return res.data;
};

export const payOrder = async (orderId) => {
  const res = await axios.post(
    `${API_BASE_URL}/orders/pay`,
    { orderId },
    { headers: getAuthHeader() }
  );
  return res.data;
};
