import React from 'react';
import { X, Locate, DollarSign, CreditCard, Check } from 'lucide-react';

export default function CheckoutModal({
  isCheckoutOpen,
  setIsCheckoutOpen,
  handleCheckoutSubmit,
  customerInfo,
  setCustomerInfo,
  handleDetectLocation,
  isDetectingLocation,
  itemPrescriptions,
  cart,
  cartTotal,
  coords
}) {
  if (!isCheckoutOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-left">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 text-white flex justify-between items-center">
          <div>
            <h3 className="font-extrabold text-lg">Delivery Registration</h3>
            <p className="text-emerald-100 text-xs mt-0.5">Please provide dispatch address & payment style.</p>
          </div>
          <button 
            type="button"
            onClick={() => setIsCheckoutOpen(false)}
            className="text-white hover:text-emerald-100 p-1.5 rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleCheckoutSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Full Name *</label>
            <input
              type="text"
              required
              placeholder="Enter recipient's name"
              value={customerInfo.name}
              onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Email Address</label>
              <input
                type="email"
                placeholder="name@example.com"
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Delivery Address *</label>
              
              <button
                type="button"
                onClick={handleDetectLocation}
                disabled={isDetectingLocation}
                className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg transition-all ${
                  isDetectingLocation 
                    ? 'bg-amber-100 text-amber-800 animate-pulse cursor-not-allowed' 
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800 border border-emerald-200'
                }`}
              >
                <Locate className={`w-3.5 h-3.5 ${isDetectingLocation ? 'animate-spin' : ''}`} />
                {isDetectingLocation ? 'Locating...' : 'Use Current Location'}
              </button>
            </div>
            
            <textarea
              required
              rows="3"
              placeholder="Door No, Street Name, Landmark, Pin Code (or use detected GPS location)"
              value={customerInfo.address}
              onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-600 mb-3"
            ></textarea>

            {/* Live Map Display */}
            {coords && (
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Live Delivery Map Location</label>
                <div className="w-full h-44 border border-slate-200 rounded-2xl overflow-hidden shadow-inner relative bg-slate-50">
                  <iframe
                    title="Live Address Map Pin"
                    src={`https://maps.google.com/maps?q=${coords.lat},${coords.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    className="w-full h-full border-0 absolute inset-0"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
                <span className="text-[9px] text-slate-400 font-medium block">Coordinates: {coords.lat.toFixed(6)}, {coords.lng.toFixed(6)}</span>
              </div>
            )}
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Payment Method</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setCustomerInfo({...customerInfo, paymentMethod: 'Cash on Delivery'})}
                className={`p-3 border rounded-xl text-left transition flex items-center gap-2 ${
                  customerInfo.paymentMethod === 'Cash on Delivery' 
                    ? 'border-emerald-600 bg-emerald-50/50 text-emerald-800' 
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <div>
                  <p className="text-xs font-bold leading-none">Cash on Delivery</p>
                  <span className="text-[9px] text-slate-400 mt-1 block">Pay cash at doorstep</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setCustomerInfo({...customerInfo, paymentMethod: 'UPI / Online Payment'})}
                className={`p-3 border rounded-xl text-left transition flex items-center gap-2 ${
                  customerInfo.paymentMethod === 'UPI / Online Payment' 
                    ? 'border-emerald-600 bg-emerald-50/50 text-emerald-800' 
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <CreditCard className="w-4 h-4 text-emerald-600" />
                <div>
                  <p className="text-xs font-bold leading-none">UPI / Card</p>
                  <span className="text-[9px] text-slate-400 mt-1 block">Scan QR code at delivery</span>
                </div>
              </button>
            </div>
          </div>

          {Object.keys(itemPrescriptions).length > 0 && (
            <div className="bg-emerald-50 text-emerald-800 p-3.5 rounded-xl text-xs space-y-1.5 border border-emerald-100">
              <p className="font-bold flex items-center gap-1">
                <Check className="w-4 h-4 text-emerald-600" /> Attached Medical Prescriptions
              </p>
              <ul className="list-disc list-inside text-[11px] space-y-0.5 text-emerald-700">
                {Object.entries(itemPrescriptions).map(([medId, val]) => {
                  const med = cart.find(m => m.id === medId);
                  return (
                    <li key={medId} className="truncate">
                      <strong>{med ? med.brand : 'Rx Item'}</strong>: {val.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <div className="bg-slate-50 p-3.5 rounded-xl text-xs text-slate-500 space-y-1">
            <div className="flex justify-between">
              <span>Medicine items</span>
              <span>{cart.reduce((s, i) => s + i.quantity, 0)} units</span>
            </div>
            <div className="flex justify-between font-bold text-slate-800">
              <span>Total Due</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs shadow-md transition-all uppercase tracking-wider"
          >
            Confirm Dispatch
          </button>
        </form>
      </div>
    </div>
  );
}
