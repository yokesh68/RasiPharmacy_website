import React from 'react';
import { ShoppingCart, Settings } from 'lucide-react';

export default function Header({
  activeTab,
  setActiveTab,
  cart,
  setSettingsActiveTab,
  setIsSettingsOpen,
  setRole
}) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setRole('customer'); setActiveTab('shop'); }}>
            <div className="w-12 h-12 bg-white rounded-2xl overflow-hidden border border-slate-100 flex items-center justify-center p-0.5 shadow-sm">
              <img src="/images/logo.jpg" alt="Rasi Pharmacy Logo" className="w-full h-full object-contain" />
            </div>
            <div className="text-left">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent block">
                RASI PHARMACY
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                24/7 Medicine Delivery
              </span>
            </div>
          </div>

          {/* Right side operations */}
          <div className="flex items-center gap-3">
            {/* Shopping Cart button */}
            <button 
              onClick={() => setActiveTab('cart')}
              className={`relative p-2.5 rounded-xl transition ${
                activeTab === 'cart' 
                  ? 'bg-emerald-50 text-emerald-600' 
                  : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
              }`}
            >
              <ShoppingCart className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                  {cart.reduce((s, i) => s + i.quantity, 0)}
                </span>
              )}
            </button>

            {/* Settings Panel trigger */}
            <button 
              onClick={() => { setSettingsActiveTab('profile'); setIsSettingsOpen(true); }}
              className="p-2.5 rounded-xl text-slate-600 hover:text-emerald-600 hover:bg-slate-50 transition"
              title="Account Settings"
            >
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
