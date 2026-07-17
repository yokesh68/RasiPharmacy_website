import { useState, useMemo, useRef } from 'react';

export function useCart({ medicines, showAlert }) {
  const [cart, setCart] = useState([]);
  const [itemPrescriptions, setItemPrescriptions] = useState({});
  const [prescriptionImage, setPrescriptionImage] = useState(null);
  const [prescriptionFileName, setPrescriptionFileName] = useState('');
  
  // Modal states
  const [isQtyModalOpen, setIsQtyModalOpen] = useState(false);
  const [selectedMedForQty, setSelectedMedForQty] = useState(null);
  const [userSelectedQty, setUserSelectedQty] = useState(1);
  const [showUploadOptionDialog, setShowUploadOptionDialog] = useState(false);
  const [activeUploadMedId, setActiveUploadMedId] = useState(null);

  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  // Memos
  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [cart]);

  const isPrescriptionRequiredForCart = useMemo(() => {
    return cart.some(item => item.prescriptionRequired);
  }, [cart]);

  const pendingRxMedicinesInCart = useMemo(() => {
    return cart.filter(item => item.prescriptionRequired && !itemPrescriptions[item.id]);
  }, [cart, itemPrescriptions]);

  const handleAddToCartClick = (med) => {
    if (med.stock <= 0) {
      showAlert('This item is currently out of stock!', 'error');
      return;
    }
    setSelectedMedForQty(med);
    setUserSelectedQty(1);
    setIsQtyModalOpen(true);
  };

  const confirmAddToCartWithQty = () => {
    const qty = parseInt(userSelectedQty);
    if (isNaN(qty) || qty <= 0) {
      showAlert('Please enter a valid quantity.', 'error');
      return;
    }

    if (qty > selectedMedForQty.stock) {
      showAlert(`Only ${selectedMedForQty.stock} units available in stock.`, 'error');
      return;
    }

    const existing = cart.find(item => item.id === selectedMedForQty.id);
    const totalNewQty = (existing ? existing.quantity : 0) + qty;

    if (totalNewQty > selectedMedForQty.stock) {
      showAlert(`Cannot add. Combined quantity in cart (${totalNewQty}) exceeds available stock.`, 'error');
      return;
    }

    if (existing) {
      setCart(cart.map(item => 
        item.id === selectedMedForQty.id ? { ...item, quantity: totalNewQty } : item
      ));
    } else {
      setCart([...cart, { ...selectedMedForQty, quantity: qty }]);
    }

    setIsQtyModalOpen(false);
    showAlert(`Successfully added ${qty}x ${selectedMedForQty.name} to cart.`);
  };

  const updateCartQuantity = (id, newQty) => {
    const med = medicines.find(m => m.id === id);
    if (newQty > med.stock) {
      showAlert(`Only ${med.stock} units are in stock.`, 'error');
      return;
    }
    if (newQty <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(cart.map(item => item.id === id ? { ...item, quantity: newQty } : item));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
    if (itemPrescriptions[id]) {
      const updated = { ...itemPrescriptions };
      delete updated[id];
      setItemPrescriptions(updated);
    }
    showAlert('Item removed from cart.', 'error');
  };

  const handlePrescriptionFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result;

      if (activeUploadMedId) {
        setItemPrescriptions(prev => ({
          ...prev,
          [activeUploadMedId]: {
            image: base64Data,
            name: file.name
          }
        }));
        showAlert(`Attached prescription for ${cart.find(item => item.id === activeUploadMedId)?.brand || 'item'}`);
      } else {
        setPrescriptionImage(base64Data);
        setPrescriptionFileName(file.name);
        showAlert('Prescription successfully pre-attached!');
      }

      setShowUploadOptionDialog(false);
      setActiveUploadMedId(null);
    };

    reader.readAsDataURL(file);
  };

  const handleOpenUploadOptionDialog = (medId = null) => {
    setActiveUploadMedId(medId);
    setShowUploadOptionDialog(true);
  };

  const triggerCameraOnly = () => {
    if (cameraInputRef.current) {
      cameraInputRef.current.click();
    }
  };

  const triggerGalleryOnly = () => {
    if (galleryInputRef.current) {
      galleryInputRef.current.click();
    }
  };

  const removePrescriptionForMed = (medId) => {
    setItemPrescriptions(prev => {
      const updated = { ...prev };
      delete updated[medId];
      return updated;
    });
    showAlert('Item prescription removed.', 'error');
  };

  const removePrescription = () => {
    setPrescriptionImage(null);
    setPrescriptionFileName('');
    showAlert('Prescription pre-attachment removed.', 'error');
  };

  const clearCartState = () => {
    setCart([]);
    setItemPrescriptions({});
    setPrescriptionImage(null);
    setPrescriptionFileName('');
  };

  return {
    cart,
    setCart,
    itemPrescriptions,
    setItemPrescriptions,
    prescriptionImage,
    setPrescriptionImage,
    prescriptionFileName,
    setPrescriptionFileName,
    isQtyModalOpen,
    setIsQtyModalOpen,
    selectedMedForQty,
    setSelectedMedForQty,
    userSelectedQty,
    setUserSelectedQty,
    showUploadOptionDialog,
    setShowUploadOptionDialog,
    activeUploadMedId,
    setActiveUploadMedId,
    cameraInputRef,
    galleryInputRef,
    cartTotal,
    isPrescriptionRequiredForCart,
    pendingRxMedicinesInCart,
    handleAddToCartClick,
    confirmAddToCartWithQty,
    updateCartQuantity,
    removeFromCart,
    handlePrescriptionFileChange,
    handleOpenUploadOptionDialog,
    triggerCameraOnly,
    triggerGalleryOnly,
    removePrescriptionForMed,
    removePrescription,
    clearCartState
  };
}
