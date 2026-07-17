import React from 'react';
import { X, User, History, ShieldCheck, AlertTriangle, Truck } from 'lucide-react';

export default function SettingsModal({
  isSettingsOpen,
  setIsSettingsOpen,
  settingsActiveTab,
  setSettingsActiveTab,
  authName,
  setAuthName,
  authPhone,
  customerInfo,
  setCustomerInfo,
  handleUserSignOut,
  orders,
  handleAdminGateClick,
  handleDeliveryGateClick
}) {
  if (!isSettingsOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col md:flex-row min-h-[450px]">
        
        {/* Left Sidebar options */}
        <div className="w-full md:w-56 bg-slate-50 border-r border-slate-100 p-6 flex flex-col justify-between gap-6 shrink-0 text-left">
          <div className="space-y-5">
            <div>
              <h4 className="font-extrabold text-slate-800 text-sm">System Options</h4>
              <p className="text-[10px] text-slate-400">Manage account & portals</p>
            </div>

            <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
              <button
                type="button"
                onClick={() => setSettingsActiveTab('profile')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
                  settingsActiveTab === 'profile' 
                    ? 'bg-emerald-600 text-white shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <User className="w-4 h-4" /> User Profile
              </button>
              <button
                type="button"
                onClick={() => setSettingsActiveTab('history')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
                  settingsActiveTab === 'history' 
                    ? 'bg-emerald-600 text-white shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <History className="w-4 h-4" /> Order History
              </button>
              <button
                type="button"
                onClick={() => setSettingsActiveTab('staff-access')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
                  settingsActiveTab === 'staff-access' 
                    ? 'bg-emerald-600 text-white shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <ShieldCheck className="w-4 h-4" /> Staff Portals
              </button>
            </nav>
          </div>

          <div className="text-[10px] text-slate-400 font-medium leading-relaxed bg-slate-100 p-3 rounded-xl">
            🔒 Session active. Verified via mobile SMS authorization.
          </div>
        </div>

        {/* Right Detail Pane */}
        <div className="flex-1 p-6 flex flex-col justify-between text-left">
          <div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-extrabold text-slate-800 text-base uppercase tracking-tight">
                {settingsActiveTab === 'profile' && "User Profile Detail"}
                {settingsActiveTab === 'history' && "Ordered Medicine History"}
                {settingsActiveTab === 'staff-access' && "Staff Secure Gateways"}
              </h3>
              <button 
                type="button"
                onClick={() => setIsSettingsOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tab 1: Profile */}
            {settingsActiveTab === 'profile' && (
              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-2xl space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-800 font-black rounded-2xl flex items-center justify-center text-lg uppercase shadow-sm">
                      {authName.charAt(0) || "U"}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-sm">{authName || "Rasi Customer"}</h4>
                      <p className="text-[10px] text-slate-400 font-medium">Registered Mobile: {authPhone}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Edit Contact Name</label>
                    <input
                      type="text"
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Registered Phone</label>
                    <input
                      type="text"
                      disabled
                      value={authPhone}
                      className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-400 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Registered Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. user@domain.com"
                      value={customerInfo.email || ''}
                      onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Order History */}
            {settingsActiveTab === 'history' && (
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                {orders.length > 0 ? (
                  orders.map(ord => (
                    <div key={ord.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5 text-left">
                      <div className="flex justify-between items-start text-xs font-bold text-slate-800">
                        <div>
                          <span>{ord.id}</span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">{ord.date}</span>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold ${
                          ord.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800 animate-pulse'
                        }`}>
                          {ord.status}
                        </span>
                      </div>

                      <div className="space-y-1">
                        {ord.items.map(item => (
                          <div key={item.id} className="flex justify-between text-[11px] font-bold text-slate-600">
                            <span>{item.name} <strong className="text-emerald-700">x{item.quantity}</strong></span>
                            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-slate-200 pt-2 flex justify-between items-center text-xs font-bold text-slate-800">
                        <span>Amount Paid</span>
                        <span className="text-emerald-700">₹{ord.total.toFixed(2)}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 text-center py-10">No past orders registered yet.</p>
                )}
              </div>
            )}

            {/* Tab 3: Staff Access Gateways */}
            {settingsActiveTab === 'staff-access' && (
              <div className="space-y-4">
                <div className="bg-amber-50 text-amber-800 border border-amber-200 p-3 rounded-xl text-[11px] flex gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <p>These zones are protected. Gaining entry overrides the storefront and requires staff validation passkeys.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Admin Desk Gateway */}
                  <button
                    type="button"
                    onClick={handleAdminGateClick}
                    className="p-5 border border-slate-200 hover:border-emerald-600 rounded-2xl text-left hover:bg-slate-50 transition-all flex flex-col justify-between h-36"
                  >
                    <div className="bg-emerald-50 text-emerald-700 p-2.5 rounded-xl w-fit">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-black text-slate-800 block">Pharmacist Admin</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Edit medications, restock ledger</span>
                    </div>
                  </button>

                  {/* Delivery Agent Gateway */}
                  <button
                    type="button"
                    onClick={handleDeliveryGateClick}
                    className="p-5 border border-slate-200 hover:border-indigo-600 rounded-2xl text-left hover:bg-slate-50 transition-all flex flex-col justify-between h-36"
                  >
                    <div className="bg-indigo-50 text-indigo-700 p-2.5 rounded-xl w-fit">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-black text-slate-800 block">Delivery Agent</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Route GPS, collect cash at door</span>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-slate-100 pt-3 text-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Logged in context: {authPhone}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
