import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'https://raasi-pharmacy-backend.onrender.com/api';

export const api = {
  /**
   * Fetch all medicines from database
   */
  getMedicines: async () => {
    const response = await axios.get(`${API_BASE}/medicines`);
    return response.data;
  },

  /**
   * Register/Upload a new medicine specifications
   */
  addMedicine: async (medicineData) => {
    const response = await axios.post(`${API_BASE}/medicines`, medicineData);
    return response.data;
  },

  /**
   * Update stock level of a medicine (stockChange is positive for restock, negative for sale/reduction)
   */
  updateStock: async (id, stockChange) => {
    const response = await axios.patch(`${API_BASE}/medicines/${id}/stock`, { stockChange });
    return response.data;
  },

  /**
   * Fetch all order tracking logs
   */
  getOrders: async () => {
    const response = await axios.get(`${API_BASE}/orders`);
    return response.data;
  },

  /**
   * Submit/Place a new customer order and decrement stocks
   */
  createOrder: async (orderData) => {
    const response = await axios.post(`${API_BASE}/orders`, orderData);
    return response.data;
  },

  /**
   * Update order status timeline stages
   */
  updateOrderStatus: async (orderId, status) => {
    const response = await axios.patch(`${API_BASE}/orders/${orderId}/status`, { status });
    return response.data;
  }
};
