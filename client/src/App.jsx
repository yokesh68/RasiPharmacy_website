import React, { useState, useEffect, useMemo } from 'react';
import { Pill, ShoppingCart, Truck } from 'lucide-react';

// Import Modular Components
import MedicineShop from './components/customer/MedicineShop';
import CartView from './components/customer/CartView';
import TrackingView from './components/customer/TrackingView';
import AdminPortal from './components/admin/AdminPortal';
import DeliveryPortal from './components/delivery/DeliveryPortal';

// Import Modular Modals & Common Components
import Toast from './components/common/Toast';
import AuthModal from './components/modals/AuthModal';
import AddMedicineModal from './components/modals/AddMedicineModal';
import CheckoutModal from './components/modals/CheckoutModal';
import QuantityModal from './components/modals/QuantityModal';
import SettingsModal from './components/modals/SettingsModal';
import UploadSelectorModal from './components/modals/UploadSelectorModal';

// Import Modular Auth and Layout Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// Import Custom Hooks directly
import { useOtp } from './useOtp';
import { useCart } from './useCart';
import { useOrders } from './useOrders';
import { useAdmin } from './useAdmin';
import { useDelivery } from './useDelivery';

// Import Utilities & Constants
import { api } from './utils/api';
import { INITIAL_MEDICINES, CATEGORIES } from './constants/medicines';

export default function App() {
  // --- General States ---
  const [role, setRole] = useState('customer'); // 'customer', 'admin', 'delivery'
  const [medicines, setMedicines] = useState(INITIAL_MEDICINES);
  const [activeTab, setActiveTab] = useState('shop'); // 'shop', 'cart', 'tracking'
  const [alertMsg, setAlertMsg] = useState(null);

  // Settings Panel States
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsActiveTab, setSettingsActiveTab] = useState('profile'); // 'profile', 'history', 'staff-access'

  // Customer search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter Medicines for Shopping catalog
  const filteredMedicines = useMemo(() => {
    return medicines.filter(med => {
      const matchSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          med.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = selectedCategory === 'All' || med.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [medicines, searchQuery, selectedCategory]);

  const showAlert = (message, type = 'success') => {
    setAlertMsg({ text: message, type });
    setTimeout(() => setAlertMsg(null), 4000);
  };

  // Fetch medicines from database on mount
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const dbMedicines = await api.getMedicines();
        if (dbMedicines && dbMedicines.length > 0) {
          setMedicines(dbMedicines);
        }
      } catch (error) {
        console.warn("Express server or database is offline. Running with client-side initial medicines ledger.", error);
      }
    };
    fetchMedicines();
  }, []);

  // Initialize modular hooks
  const cartHook = useCart({
    medicines,
    showAlert
  });

  const ordersHook = useOrders({
    cart: cartHook.cart,
    cartTotal: cartHook.cartTotal,
    itemPrescriptions: cartHook.itemPrescriptions,
    medicines,
    setMedicines,
    showAlert,
    setActiveTab,
    clearCartState: cartHook.clearCartState
  });

  const otpHook = useOtp({
    showAlert,
    setCustomerInfo: ordersHook.setCustomerInfo,
    clearCartState: cartHook.clearCartState
  });

  const adminHook = useAdmin({
    medicines,
    setMedicines,
    setRole,
    setIsSettingsOpen,
    showAlert
  });

  const deliveryHook = useDelivery({
    setRole,
    setIsSettingsOpen,
    setOrders: ordersHook.setOrders,
    lastPlacedOrder: ordersHook.lastPlacedOrder,
    setLastPlacedOrder: ordersHook.setLastPlacedOrder,
    showAlert
  });

  // Destructure variables for UI components
  const {
    cart,
    itemPrescriptions,
    prescriptionImage,
    prescriptionFileName,
    isQtyModalOpen,
    setIsQtyModalOpen,
    selectedMedForQty,
    userSelectedQty,
    setUserSelectedQty,
    showUploadOptionDialog,
    setShowUploadOptionDialog,
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
    removePrescription
  } = cartHook;

  const {
    orders,
    lastPlacedOrder,
    isDetectingLocation,
    customerInfo,
    setCustomerInfo,
    isCheckoutOpen,
    setIsCheckoutOpen,
    handleDetectLocation,
    handleCheckoutSubmit,
    coords
  } = ordersHook;

  const {
    authName,
    setAuthName,
    authPhone,
    handleUserSignOut
  } = otpHook;

  const {
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
    handleUpdateStock,
    handleAddMedicine
  } = adminHook;

  const {
    deliveryTab,
    setDeliveryTab,
    showDeliveryPasswordModal,
    setShowDeliveryPasswordModal,
    deliveryPasswordError,
    setDeliveryPasswordError,
    handleDeliveryGateClick,
    handleDeliveryPasswordSubmit,
    handleUpdateOrderStatus
  } = deliveryHook;

  const handleAdminLogout = () => adminHook.handleAdminLogout(setActiveTab);
  const handleDeliveryLogout = () => deliveryHook.handleDeliveryLogout(setActiveTab);



  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans antialiased animate-fade-in">
      
      {/* Reusable Toast Notifications Alert */}
      <Toast alertMsg={alertMsg} />

      {/* Main App Navigation Header */}
      {role === 'customer' && (
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          cart={cart}
          setSettingsActiveTab={setSettingsActiveTab}
          setIsSettingsOpen={setIsSettingsOpen}
          setRole={setRole}
        />
      )}

      {/* Main Content Customer Views */}
      {role === 'customer' && (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          
          {/* Header navigation sub-tab toggler */}
          <div className="flex gap-2 border-b border-slate-200/60 pb-3 mb-6 self-start">
            <button
              onClick={() => setActiveTab('shop')}
              className={`pb-4 px-4 font-semibold text-sm border-b-2 whitespace-nowrap transition flex items-center gap-2 ${
                activeTab === 'shop' 
                  ? 'border-emerald-600 text-emerald-600' 
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Pill className="w-4 h-4" />
              Medication Registry
            </button>
            <button
              onClick={() => setActiveTab('cart')}
              className={`pb-4 px-4 font-semibold text-sm border-b-2 whitespace-nowrap transition flex items-center gap-2 ${
                activeTab === 'cart' 
                  ? 'border-emerald-600 text-emerald-600' 
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              Basket ({cart.reduce((s, i) => s + i.quantity, 0)})
            </button>
            {lastPlacedOrder && (
              <button
                onClick={() => setActiveTab('tracking')}
                className={`pb-4 px-4 font-semibold text-sm border-b-2 whitespace-nowrap transition flex items-center gap-2 ${
                  activeTab === 'tracking' 
                    ? 'border-emerald-600 text-emerald-600' 
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Truck className="w-4 h-4" />
                Live Order Status
              </button>
            )}
          </div>

          {activeTab === 'shop' && (
            <MedicineShop
              CATEGORIES={CATEGORIES}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filteredMedicines={filteredMedicines}
              cart={cart}
              handleAddToCartClick={handleAddToCartClick}
              prescriptionImage={prescriptionImage}
              prescriptionFileName={prescriptionFileName}
              isPrescriptionRequiredForCart={isPrescriptionRequiredForCart}
              removePrescription={removePrescription}
              handleOpenUploadOptionDialog={handleOpenUploadOptionDialog}
            />
          )}

          {activeTab === 'cart' && (
            <CartView
              cart={cart}
              updateCartQuantity={updateCartQuantity}
              removeFromCart={removeFromCart}
              itemPrescriptions={itemPrescriptions}
              removePrescriptionForMed={removePrescriptionForMed}
              handleOpenUploadOptionDialog={handleOpenUploadOptionDialog}
              setActiveTab={setActiveTab}
              cartTotal={cartTotal}
              isPrescriptionRequiredForCart={isPrescriptionRequiredForCart}
              pendingRxMedicinesInCart={pendingRxMedicinesInCart}
              showAlert={showAlert}
              setIsCheckoutOpen={setIsCheckoutOpen}
            />
          )}

          {activeTab === 'tracking' && (
            <TrackingView
              lastPlacedOrder={lastPlacedOrder}
              medicines={medicines}
            />
          )}
        </main>
      )}

      {/* Staff Portals rendering */}
      {role === 'admin' && (
        <AdminPortal
          adminTab={adminTab}
          setAdminTab={setAdminTab}
          handleAdminLogout={handleAdminLogout}
          medicines={medicines}
          setMedicines={setMedicines}
          orders={orders}
          setIsAddingMed={setIsAddingMed}
          stockEditId={stockEditId}
          setStockEditId={setStockEditId}
          quickStockVal={quickStockVal}
          setQuickStockVal={setQuickStockVal}
          handleUpdateStock={handleUpdateStock}
          handleUpdateOrderStatus={handleUpdateOrderStatus}
          currentPasswordConfirm={currentPasswordConfirm}
          setCurrentPasswordConfirm={setCurrentPasswordConfirm}
          newPasswordVal={newPasswordVal}
          setNewPasswordVal={setNewPasswordVal}
          confirmNewPasswordVal={confirmNewPasswordVal}
          setConfirmNewPasswordVal={setConfirmNewPasswordVal}
          handleUpdatePassword={handleUpdatePassword}
          showAlert={showAlert}
        />
      )}

      {role === 'delivery' && (
        <DeliveryPortal
          deliveryTab={deliveryTab}
          setDeliveryTab={setDeliveryTab}
          orders={orders}
          handleDeliveryLogout={handleDeliveryLogout}
          handleUpdateOrderStatus={handleUpdateOrderStatus}
        />
      )}

      {/* Footer Branding Block */}
      <Footer />

      {/* --- MODALS RENDER SECTION --- */}

      {/* Checkout Modal */}
      <CheckoutModal
        isCheckoutOpen={isCheckoutOpen}
        setIsCheckoutOpen={setIsCheckoutOpen}
        handleCheckoutSubmit={handleCheckoutSubmit}
        customerInfo={customerInfo}
        setCustomerInfo={setCustomerInfo}
        handleDetectLocation={handleDetectLocation}
        isDetectingLocation={isDetectingLocation}
        itemPrescriptions={itemPrescriptions}
        cart={cart}
        cartTotal={cartTotal}
        coords={coords}
      />

      {/* Admin Add Medicine Modal */}
      <AddMedicineModal
        isAddingMed={isAddingMed}
        setIsAddingMed={setIsAddingMed}
        handleAddMedicine={handleAddMedicine}
        newMed={newMed}
        setNewMed={setNewMed}
        CATEGORIES={CATEGORIES}
      />

      {/* Admin Passkey Authentication lock screen */}
      <AuthModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSubmit={handlePasswordSubmit}
        role="admin"
        error={passwordError}
        setError={setPasswordError}
      />

      {/* Delivery Agent lock screen */}
      <AuthModal
        isOpen={showDeliveryPasswordModal}
        onClose={() => setShowDeliveryPasswordModal(false)}
        onSubmit={handleDeliveryPasswordSubmit}
        role="delivery"
        error={deliveryPasswordError}
        setError={setDeliveryPasswordError}
      />

      {/* Quantity picker Modal */}
      <QuantityModal
        isQtyModalOpen={isQtyModalOpen}
        selectedMedForQty={selectedMedForQty}
        setIsQtyModalOpen={setIsQtyModalOpen}
        userSelectedQty={userSelectedQty}
        setUserSelectedQty={setUserSelectedQty}
        confirmAddToCartWithQty={confirmAddToCartWithQty}
      />

      {/* Upload selector modal (camera/gallery) */}
      <UploadSelectorModal
        showUploadOptionDialog={showUploadOptionDialog}
        setShowUploadOptionDialog={setShowUploadOptionDialog}
        setActiveUploadMedId={setActiveUploadMedId}
        triggerCameraOnly={triggerCameraOnly}
        triggerGalleryOnly={triggerGalleryOnly}
      />

      {/* Settings Modal */}
      <SettingsModal
        isSettingsOpen={isSettingsOpen}
        setIsSettingsOpen={setIsSettingsOpen}
        settingsActiveTab={settingsActiveTab}
        setSettingsActiveTab={setSettingsActiveTab}
        authName={authName}
        setAuthName={setAuthName}
        authPhone={authPhone}
        customerInfo={customerInfo}
        setCustomerInfo={setCustomerInfo}
        handleUserSignOut={handleUserSignOut}
        orders={orders}
        handleAdminGateClick={handleAdminGateClick}
        handleDeliveryGateClick={handleDeliveryGateClick}
      />

      {/* Hidden File inputs to receive file payloads */}
      <input 
        type="file" 
        ref={cameraInputRef}
        onChange={handlePrescriptionFileChange}
        accept="image/*"
        capture="environment"
        className="hidden"
      />
      <input 
        type="file" 
        ref={galleryInputRef}
        onChange={handlePrescriptionFileChange}
        accept="image/*"
        className="hidden"
      />

    </div>
  );
}