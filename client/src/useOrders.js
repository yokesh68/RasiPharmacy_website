import { useState, useEffect } from 'react';
import { detectGeoLocation } from './utils/geo';
import { api } from './utils/api';

export function useOrders({ cart, cartTotal, itemPrescriptions, medicines, setMedicines, showAlert, setActiveTab, clearCartState }) {
  const [orders, setOrders] = useState([]);
  const [lastPlacedOrder, setLastPlacedOrder] = useState(null);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    paymentMethod: 'Cash on Delivery'
  });
  const [coords, setCoords] = useState({ lat: 13.0827, lng: 80.2707 }); // Chennai default coordinates

  // Fetch orders from database on mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const dbOrders = await api.getOrders();
        setOrders(dbOrders);
      } catch (error) {
        console.warn("Express server or database is offline. Running with client-side orders log list.", error);
      }
    };
    fetchOrders();
  }, []);

  const handleDetectLocation = async () => {
    setIsDetectingLocation(true);
    showAlert('Fetching GPS coordinates...');

    try {
      const result = await detectGeoLocation();
      setCustomerInfo(prev => ({
        ...prev,
        address: result.address
      }));
      setCoords({ lat: result.latitude, lng: result.longitude });
      showAlert('Exact current location successfully detected!');
    } catch (error) {
      console.warn("Browser GPS detection failed.", error);
      showAlert('Unable to acquire GPS coordinates.', 'error');
    } finally {
      setIsDetectingLocation(false);
    }
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      showAlert("Please fill in name, phone, and address.", "error");
      return;
    }

    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const orderDate = new Date().toLocaleDateString('en-US', dateOptions);

    const newOrder = {
      id: orderId,
      customerName: customerInfo.name,
      phone: customerInfo.phone,
      email: customerInfo.email,
      address: customerInfo.address,
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      total: cartTotal,
      paymentMethod: customerInfo.paymentMethod,
      status: 'Placed',
      date: orderDate,
      prescriptions: itemPrescriptions
    };

    // Decrement stock levels locally
    setMedicines(medicines.map(m => {
      const cartItem = cart.find(c => c.id === m.id);
      if (cartItem) {
        return { ...m, stock: Math.max(0, m.stock - cartItem.quantity) };
      }
      return m;
    }));

    try {
      const savedOrder = await api.createOrder({
        customerName: customerInfo.name,
        phone: customerInfo.phone,
        email: customerInfo.email,
        address: customerInfo.address,
        items: newOrder.items,
        total: cartTotal,
        paymentMethod: customerInfo.paymentMethod,
        prescriptions: itemPrescriptions
      });
      setOrders(prev => [savedOrder, ...prev]);
      setLastPlacedOrder(savedOrder);
      showAlert("Purchase successfully placed! Express delivery en-route.");
      clearCartState();
    } catch (error) {
      console.warn("Failed to submit order to API database. Maintained local memory state.", error);
      setOrders(prev => [newOrder, ...prev]);
      setLastPlacedOrder(newOrder);
      showAlert("Purchase placed locally (Offline)");
      clearCartState();
    }

    setIsCheckoutOpen(false);
    setActiveTab('tracking');
  };

  return {
    orders,
    setOrders,
    lastPlacedOrder,
    setLastPlacedOrder,
    isDetectingLocation,
    setIsDetectingLocation,
    customerInfo,
    setCustomerInfo,
    isCheckoutOpen,
    setIsCheckoutOpen,
    handleDetectLocation,
    handleCheckoutSubmit,
    coords
  };
}
