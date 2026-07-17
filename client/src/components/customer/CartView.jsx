import React from 'react';
import { 
  ShoppingBag, 
  FileText, 
  Trash2, 
  Camera, 
  X, 
  ShoppingCart, 
  AlertTriangle, 
  Check, 
  ChevronRight 
} from 'lucide-react';

export default function CartView({
  cart,
  updateCartQuantity,
  removeFromCart,
  itemPrescriptions,
  removePrescriptionForMed,
  handleOpenUploadOptionDialog,
  setActiveTab,
  cartTotal,
  isPrescriptionRequiredForCart,
  pendingRxMedicinesInCart,
  showAlert,
  setIsCheckoutOpen
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
      {/* Cart List */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-600" />
            Shopping Basket
          </h2>

          {cart.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {cart.map(item => (
                <div key={item.id} className="py-5 first:pt-0 flex flex-col space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                      {item.image && (item.image.startsWith('/') || item.image.startsWith('http')) ? (
                        <div className="w-24 h-24 bg-slate-100 rounded-2xl overflow-hidden flex items-center justify-center p-1.5 border border-slate-200/60 shadow-sm shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                        </div>
                      ) : (
                        <span className="text-5xl p-4 bg-slate-100 rounded-2xl block">{item.image || '💊'}</span>
                      )}
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">{item.category}</span>
                          {item.prescriptionRequired && (
                            <span className="bg-amber-100 text-amber-800 text-[8px] font-black px-1.5 py-0.5 rounded uppercase flex items-center gap-0.5">
                              <FileText className="w-2 h-2" /> Rx Required
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-slate-800 text-sm">{item.name}</h4>
                        <p className="text-xs text-slate-400 mt-0.5">₹{item.price.toFixed(2)} per unit</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full sm:w-auto gap-6 border-t sm:border-0 pt-3 sm:pt-0">
                      <div className="flex items-center gap-2.5 bg-slate-100 p-1 rounded-lg">
                        <button 
                          type="button"
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 bg-white text-slate-600 hover:bg-slate-50 rounded font-bold text-sm flex items-center justify-center transition shadow-sm"
                        >
                          -
                        </button>
                        <span className="font-bold text-sm w-6 text-center text-slate-700">{item.quantity}</span>
                        <button 
                          type="button"
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 bg-white text-slate-600 hover:bg-slate-50 rounded font-bold text-sm flex items-center justify-center transition shadow-sm"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-slate-400">Total</p>
                        <p className="font-bold text-slate-800 text-sm">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>

                      <button 
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-400 hover:text-rose-600 p-2 rounded-lg hover:bg-rose-50 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Item Prescription upload */}
                  {item.prescriptionRequired && (
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 ml-0 sm:ml-16 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in">
                      <div className="flex items-center gap-2.5">
                        <div className="bg-amber-100 text-amber-800 p-2 rounded-lg">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                          <h5 className="text-xs font-bold text-slate-800">Prescription for {item.brand}</h5>
                          <p className="text-[10px] text-slate-400 mt-0.5">Please provide a matching prescription slip for this medicine.</p>
                        </div>
                      </div>

                      <div>
                        {itemPrescriptions[item.id] ? (
                          <div className="flex items-center gap-3 bg-white border border-emerald-200 rounded-xl p-1.5 pl-3">
                            <div className="w-8 h-8 rounded border overflow-hidden shrink-0">
                              <img src={itemPrescriptions[item.id].image} alt="Prescription thumbnail" className="w-full h-full object-cover" />
                            </div>
                            <div className="text-left max-w-[150px]">
                              <p className="text-xs font-bold text-emerald-800 truncate">{itemPrescriptions[item.id].name}</p>
                              <span className="text-[9px] text-emerald-600 font-semibold block">Attached</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removePrescriptionForMed(item.id)}
                              className="text-rose-500 hover:text-rose-700 p-1 rounded hover:bg-rose-50"
                              title="Remove"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleOpenUploadOptionDialog(item.id)}
                            className="bg-amber-505 hover:bg-amber-600 bg-amber-500 text-white font-extrabold text-[10px] uppercase tracking-wider px-3.5 py-2 rounded-lg shadow-sm transition flex items-center gap-1"
                          >
                            <Camera className="w-3.5 h-3.5" /> Attach Prescription
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <h3 className="text-md font-bold text-slate-800">Your basket is empty</h3>
              <p className="text-slate-400 text-xs mt-1 mb-6">Explore medicines and add them to order.</p>
              <button 
                type="button"
                onClick={() => setActiveTab('shop')}
                className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-emerald-700 transition shadow-sm"
              >
                Start Shopping
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Order summary / Checkout Details */}
      {cart.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 h-fit">
          <h3 className="text-md font-bold text-slate-800 mb-4 border-b border-slate-50 pb-3">
            Order Summary
          </h3>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-xs text-slate-500">
              <span>Items Subtotal</span>
              <span className="font-semibold text-slate-800">₹{cartTotal.toFixed(2)}</span>
            </div>
            {isPrescriptionRequiredForCart && (
              <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-xl p-3.5 text-xs space-y-1">
                <p className="font-bold flex items-center gap-1.5 text-amber-950">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" /> Prescription Verification
                </p>
                <div className="text-[11px] text-amber-800">
                  {pendingRxMedicinesInCart.length === 0 ? (
                    <span className="text-emerald-800 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> All prescriptions successfully uploaded!
                    </span>
                  ) : (
                    <span className="text-rose-800 font-bold block">
                      Missing {pendingRxMedicinesInCart.length} prescription(s). Please attach a prescription for each Rx medicine below.
                    </span>
                  )}
                </div>
              </div>
            )}
            <div className="flex justify-between text-xs text-slate-500">
              <span>Express Delivery Charge</span>
              <span className="font-semibold text-emerald-600">FREE</span>
            </div>
            <div className="border-t border-slate-100 pt-3 flex justify-between text-sm font-bold text-slate-800">
              <span>Total Amount</span>
              <span className="text-emerald-700 text-lg">₹{cartTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              if (pendingRxMedicinesInCart.length > 0) {
                showAlert(`You must upload a prescription for each Rx item: ${pendingRxMedicinesInCart.map(m => m.brand).join(', ')}`, 'error');
                return;
              }
              setIsCheckoutOpen(true);
            }}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
          >
            Proceed to Delivery Info <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
