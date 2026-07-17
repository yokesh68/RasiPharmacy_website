import React from 'react';
import { Navigation, LogOut, Package, User, MapPin, Phone, Truck, CheckCircle, Check, Clock, CheckSquare } from 'lucide-react';

export default function DeliveryPortal({
  deliveryTab,
  setDeliveryTab,
  orders,
  handleDeliveryLogout,
  handleUpdateOrderStatus
}) {
  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-800">Rasi Delivery Hub</h1>
            <span className="bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Navigation className="w-2.5 h-2.5 animate-pulse" /> Active Agent
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">Pick up ready medical parcels, access GPS routes, and confirm customer deliveries.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1 rounded-xl self-start sm:sm:center">
          <button 
            type="button"
            onClick={() => setDeliveryTab('available')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              deliveryTab === 'available' ? 'bg-white text-indigo-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Available Pickups ({orders.filter(o => o.status === 'Preparing').length})
          </button>
          <button 
            type="button"
            onClick={() => setDeliveryTab('active')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              deliveryTab === 'active' ? 'bg-white text-indigo-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Active Shipments ({orders.filter(o => o.status === 'Out for Delivery').length})
          </button>
          <button 
            type="button"
            onClick={() => setDeliveryTab('history')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              deliveryTab === 'history' ? 'bg-white text-indigo-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Delivery Log ({orders.filter(o => o.status === 'Delivered').length})
          </button>

          <button
            type="button"
            onClick={handleDeliveryLogout}
            className="ml-2 text-rose-600 hover:bg-rose-50 p-2 rounded-lg transition"
            title="Lock Session"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tab 1: Available Pickups */}
      {deliveryTab === 'available' && (
        <div className="space-y-6">
          <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
            <Package className="w-5 h-5 text-indigo-600" />
            Parcels Ready for Pickup at Rasi Store
          </h3>

          {orders.filter(o => o.status === 'Preparing').length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {orders.filter(o => o.status === 'Preparing').map(ord => (
                <div key={ord.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4 hover:border-indigo-200 transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider">Ready for Dispatch</span>
                      <h4 className="font-extrabold text-slate-800 text-sm">{ord.id}</h4>
                    </div>
                    <span className="bg-slate-100 text-slate-600 font-bold text-[11px] px-2.5 py-1 rounded">
                      {ord.date}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <p className="font-bold text-slate-700 flex items-center gap-1.5">
                      <User className="w-4 h-4 text-slate-400" /> {ord.customerName}
                    </p>
                    <p className="text-slate-505 text-slate-500 flex items-start gap-1.5">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" /> {ord.address}
                    </p>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl text-xs space-y-1">
                    {ord.items.map(item => (
                      <div key={item.id} className="flex justify-between font-medium text-slate-600">
                        <span>{item.name}</span>
                        <span className="font-bold text-slate-800">x{item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Collect from Customer</span>
                      <span className="font-black text-slate-800 text-sm">
                        {ord.paymentMethod === 'Cash on Delivery' ? `₹${ord.total.toFixed(2)} (COD)` : '₹0.00 (Prepaid)'}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        handleUpdateOrderStatus(ord.id, 'Out for Delivery');
                        setDeliveryTab('active');
                      }}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition flex items-center gap-1.5"
                    >
                      <Navigation className="w-3.5 h-3.5" /> Accept & Pick Up
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 border border-slate-100 text-center max-w-lg mx-auto shadow-sm">
              <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-md font-bold text-slate-800">No ready pick-ups</h3>
              <p className="text-slate-400 text-xs mt-1">Once the administrator prepares and boxes a customer's order, it will appear here for pickup.</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Active Shipments */}
      {deliveryTab === 'active' && (
        <div className="space-y-6">
          <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
            <Truck className="w-5 h-5 text-indigo-600" />
            Your Active En-Route Deliveries
          </h3>

          {orders.filter(o => o.status === 'Out for Delivery').length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {orders.filter(o => o.status === 'Out for Delivery').map(ord => (
                <div key={ord.id} className="bg-white rounded-2xl border-2 border-indigo-100 shadow-md p-6 space-y-4 animate-in fade-in duration-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="bg-indigo-100 text-indigo-800 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider block w-fit mb-1">En-Route</span>
                      <h4 className="font-extrabold text-slate-800 text-sm">{ord.id}</h4>
                    </div>
                    <a 
                      href={`tel:${ord.phone}`}
                      className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 p-2 rounded-xl transition flex items-center gap-1 text-xs font-bold"
                    >
                      <Phone className="w-4 h-4" /> Call Client
                    </a>
                  </div>

                  <div className="space-y-3 text-xs border-b border-slate-100 pb-4">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Customer</span>
                      <p className="font-bold text-slate-800 mt-0.5">{ord.customerName}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Delivery Address</span>
                      <p className="font-semibold text-indigo-900 mt-0.5 flex items-start gap-1">
                        <MapPin className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                        {ord.address}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Payment instructions</span>
                      <p className="font-bold text-slate-700 mt-0.5">
                        {ord.paymentMethod === 'Cash on Delivery' 
                          ? `💸 Collect Cash: ₹${ord.total.toFixed(2)}` 
                          : `💳 Already Paid Online (Prepaid)`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        handleUpdateOrderStatus(ord.id, 'Delivered');
                        setDeliveryTab('history');
                      }}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <CheckSquare className="w-4 h-4" /> Delivered & Collected
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUpdateOrderStatus(ord.id, 'Preparing')}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs py-3 px-4 rounded-xl transition"
                    >
                      Return to Store
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 border border-slate-100 text-center max-w-lg mx-auto shadow-sm">
              <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Navigation className="w-8 h-8" />
              </div>
              <h3 className="text-md font-bold text-slate-800">No active shipments</h3>
              <p className="text-slate-400 text-xs mt-1">Accept available pickups to start driving and complete deliveries.</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Delivery History Log */}
      {deliveryTab === 'history' && (
        <div className="space-y-6">
          <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            Your Completed Delivery History
          </h3>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50 text-[10px] uppercase font-bold text-slate-400">
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Customer Name</th>
                    <th className="p-4">Delivery Location</th>
                    <th className="p-4">Revenue Collected</th>
                    <th className="p-4">Dispatch Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {orders.filter(o => o.status === 'Delivered').map(ord => (
                    <tr key={ord.id} className="hover:bg-slate-50/50 transition">
                      <td className="p-4 font-bold text-slate-800">{ord.id}</td>
                      <td className="p-4 font-semibold text-slate-600">{ord.customerName}</td>
                      <td className="p-4 text-slate-500 max-w-xs truncate">{ord.address}</td>
                      <td className="p-4 font-black text-slate-800">
                        {ord.paymentMethod === 'Cash on Delivery' ? `₹${ord.total.toFixed(2)} (Cash)` : `₹${ord.total.toFixed(2)} (Online)`}
                      </td>
                      <td className="p-4">
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 w-fit">
                          <Check className="w-3 h-3" /> Safe Delivery
                        </span>
                      </td>
                    </tr>
                  ))}
                  {orders.filter(o => o.status === 'Delivered').length === 0 && (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-slate-400">
                        No completed deliveries logged yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
