// src/vendor/services/vendorApi.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/vendor';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    Authorization: `Bearer ${token}`,
  };
};

// Dashboard APIs
export const fetchDashboardStats = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/dashboard/stats`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
};

// Products APIs
export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/products`, productData, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const updateProduct = async (productId, productData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/products/${productId}`, productData, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/products/${productId}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Orders APIs
export const fetchOrders = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/orders/${orderId}/status`,
      { status },
      { headers: getAuthHeader() }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

// Quotations APIs
export const fetchQuotations = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/quotations`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching quotations:', error);
    throw error;
  }
};

export const approveQuotation = async (quotationId) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/quotations/${quotationId}/approve`,
      {},
      { headers: getAuthHeader() }
    );
    return response.data;
  } catch (error) {
    console.error('Error approving quotation:', error);
    throw error;
  }
};

export const rejectQuotation = async (quotationId) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/quotations/${quotationId}/reject`,
      {},
      { headers: getAuthHeader() }
    );
    return response.data;
  } catch (error) {
    console.error('Error rejecting quotation:', error);
    throw error;
  }
};

// Invoices APIs
export const fetchInvoices = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/invoices`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching invoices:', error);
    throw error;
  }
};

export const downloadInvoice = async (invoiceId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/invoices/${invoiceId}/pdf`, {
      headers: getAuthHeader(),
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    console.error('Error downloading invoice:', error);
    throw error;
  }
};

// Reports APIs
export const fetchReports = async (dateRange) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reports`, {
      params: dateRange,
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching reports:', error);
    throw error;
  }
};
