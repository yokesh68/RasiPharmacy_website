import { useState } from 'react';
import { api } from './utils/api';

export function useDelivery({ setRole, setIsSettingsOpen, setOrders, lastPlacedOrder, setLastPlacedOrder, showAlert }) {
  const [deliveryTab, setDeliveryTab] = useState('available');
  const [deliveryPassword] = useState('delivery123');
  const [isDeliveryAuthenticated, setIsDeliveryAuthenticated] = useState(false);
  const [showDeliveryPasswordModal, setShowDeliveryPasswordModal] = useState(false);
  const [deliveryPasswordError, setDeliveryPasswordError] = useState('');

  const handleDeliveryGateClick = () => {
    if (isDeliveryAuthenticated) {
      setRole('delivery');
      setDeliveryTab('available');
      setIsSettingsOpen(false);
    } else {
      setShowDeliveryPasswordModal(true);
    }
  };

  const handleDeliveryPasswordSubmit = (password) => {
    if (password === deliveryPassword) {
      setIsDeliveryAuthenticated(true);
      setShowDeliveryPasswordModal(false);
      setIsSettingsOpen(false);
      setRole('delivery');
      setDeliveryTab('available');
      showAlert('Access Granted. Welcome to Delivery Agent Portal!');
    } else {
      setDeliveryPasswordError('Invalid delivery access password. Try again.');
      showAlert('Incorrect delivery password.', 'error');
    }
  };

  const handleDeliveryLogout = (setActiveTab) => {
    setIsDeliveryAuthenticated(false);
    setRole('customer');
    setActiveTab('shop');
    showAlert('Delivery agent session locked.');
  };

  const handleUpdateOrderStatus = async (orderId, nextStatus) => {
    // Eager update for instant UI feedback
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: nextStatus } : o));
    if (lastPlacedOrder && lastPlacedOrder.id === orderId) {
      setLastPlacedOrder(prev => ({ ...prev, status: nextStatus }));
    }

    try {
      await api.updateOrderStatus(orderId, nextStatus);
      showAlert(`Order status updated to: ${nextStatus}`);
    } catch (error) {
      console.warn("Failed to synchronize status with backend database. Maintained locally.", error);
      showAlert(`Status updated locally to: ${nextStatus} (Offline)`);
    }
  };

  return {
    deliveryTab,
    setDeliveryTab,
    deliveryPassword,
    isDeliveryAuthenticated,
    setIsDeliveryAuthenticated,
    showDeliveryPasswordModal,
    setShowDeliveryPasswordModal,
    deliveryPasswordError,
    setDeliveryPasswordError,
    handleDeliveryGateClick,
    handleDeliveryPasswordSubmit,
    handleDeliveryLogout,
    handleUpdateOrderStatus
  };
}
