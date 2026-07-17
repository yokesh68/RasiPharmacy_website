import { useState } from 'react';
import { api } from './utils/api';

export function useAdmin({ medicines, setMedicines, setRole, setIsSettingsOpen, showAlert }) {
  const [adminTab, setAdminTab] = useState('dashboard');
  const [isAddingMed, setIsAddingMed] = useState(false);
  const [newMed, setNewMed] = useState({
    name: '',
    brand: '',
    category: 'Pain Relief',
    description: '',
    price: '',
    stock: '',
    dosage: '',
    prescriptionRequired: false,
    image: '💊'
  });
  const [stockEditId, setStockEditId] = useState(null);
  const [quickStockVal, setQuickStockVal] = useState(0);

  // Security Gate
  const [adminPassword, setAdminPassword] = useState('rasi123');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // Password Settings
  const [currentPasswordConfirm, setCurrentPasswordConfirm] = useState('');
  const [newPasswordVal, setNewPasswordVal] = useState('');
  const [confirmNewPasswordVal, setConfirmNewPasswordVal] = useState('');

  const handleAdminGateClick = () => {
    if (isAdminAuthenticated) {
      setRole('admin');
      setAdminTab('dashboard');
      setIsSettingsOpen(false);
    } else {
      setShowPasswordModal(true);
    }
  };

  const handlePasswordSubmit = (password) => {
    if (password === adminPassword) {
      setIsAdminAuthenticated(true);
      setShowPasswordModal(false);
      setIsSettingsOpen(false);
      setRole('admin');
      setAdminTab('dashboard');
      showAlert('Access Granted. Welcome to Rasi Admin Panel!');
    } else {
      setPasswordError('Invalid administrative passkey. Try again.');
      showAlert('Authentication failed.', 'error');
    }
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (currentPasswordConfirm !== adminPassword) {
      showAlert('Current password verification failed.', 'error');
      return;
    }
    if (!newPasswordVal) {
      showAlert('New password cannot be empty.', 'error');
      return;
    }
    if (newPasswordVal !== confirmNewPasswordVal) {
      showAlert('New passwords do not match.', 'error');
      return;
    }

    setAdminPassword(newPasswordVal);
    setCurrentPasswordConfirm('');
    setNewPasswordVal('');
    setConfirmNewPasswordVal('');
    showAlert('Admin authorization password successfully updated!');
  };

  const handleAdminLogout = (setActiveTab) => {
    setIsAdminAuthenticated(false);
    setRole('customer');
    setActiveTab('shop');
    showAlert('Admin session locked.');
  };

  const handleUpdateStock = async (id) => {
    const change = parseInt(quickStockVal);
    if (isNaN(change)) {
      showAlert("Please enter a valid stock change number.", "error");
      return;
    }

    const localUpdated = medicines.map(m => m.id === id ? { ...m, stock: Math.max(0, m.stock + change) } : m);
    setMedicines(localUpdated);
    setStockEditId(null);

    try {
      await api.updateStock(id, change);
      showAlert("Stock level successfully adjusted in database!");
    } catch (error) {
      console.warn("Failed to synchronize stock change with backend. Maintained locally.", error);
      showAlert("Stock adjusted locally (Offline)");
    }
  };

  const handleAddMedicine = async (e) => {
    e.preventDefault();
    if (!newMed.name || !newMed.price || !newMed.stock) {
      showAlert("Name, Price, and Stock are required.", "error");
      return;
    }

    const priceVal = parseFloat(newMed.price);
    const stockVal = parseInt(newMed.stock);

    const mockNewMed = {
      ...newMed,
      id: `med-${medicines.length + 1}-${Math.floor(100 + Math.random() * 900)}`,
      price: priceVal,
      stock: stockVal
    };

    try {
      const savedMed = await api.addMedicine({
        name: newMed.name,
        brand: newMed.brand,
        category: newMed.category,
        description: newMed.description,
        price: priceVal,
        stock: stockVal,
        dosage: newMed.dosage,
        prescriptionRequired: newMed.prescriptionRequired,
        image: newMed.image
      });
      setMedicines(prev => [...prev, savedMed]);
      showAlert("Medicine successfully registered in database!");
    } catch (error) {
      console.warn("Failed to save new medication on server database. Appending locally.", error);
      setMedicines(prev => [...prev, mockNewMed]);
      showAlert("Medicine registered locally (Offline)");
    }

    setIsAddingMed(false);
    setNewMed({
      name: '',
      brand: '',
      category: 'Pain Relief',
      description: '',
      price: '',
      stock: '',
      dosage: '',
      prescriptionRequired: false,
      image: '💊'
    });
  };

  return {
    adminTab,
    setAdminTab,
    isAddingMed,
    setIsAddingMed,
    newMed,
    setNewMed,
    stockEditId,
    setStockEditId,
    quickStockVal,
    setQuickStockVal,
    adminPassword,
    setAdminPassword,
    isAdminAuthenticated,
    setIsAdminAuthenticated,
    showPasswordModal,
    setShowPasswordModal,
    passwordError,
    setPasswordError,
    currentPasswordConfirm,
    setCurrentPasswordConfirm,
    newPasswordVal,
    setNewPasswordVal,
    confirmNewPasswordVal,
    setConfirmNewPasswordVal,
    handleAdminGateClick,
    handlePasswordSubmit,
    handleUpdatePassword,
    handleAdminLogout,
    handleUpdateStock,
    handleAddMedicine
  };
}
