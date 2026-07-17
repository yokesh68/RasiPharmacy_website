import React, { useMemo } from 'react';
import { 
  Unlock, 
  LogOut, 
  TrendingUp, 
  AlertTriangle, 
  Package, 
  ShieldCheck, 
  Plus, 
  FileText, 
  Trash2, 
  Truck, 
  Phone, 
  MapPin, 
  KeyRound, 
  ShoppingBag 
} from 'lucide-react';

export default function AdminPortal({
  adminTab,
  setAdminTab,
  handleAdminLogout,
  medicines,
  setMedicines,
  orders,
  setIsAddingMed,
  stockEditId,
  setStockEditId,
  quickStockVal,
  setQuickStockVal,
  handleUpdateStock,
  handleUpdateOrderStatus,
  currentPasswordConfirm,
  setCurrentPasswordConfirm,
  newPasswordVal,
  setNewPasswordVal,
  confirmNewPasswordVal,
  setConfirmNewPasswordVal,
  handleUpdatePassword,
  showAlert
}) {
  // Calculate analytics stats locally
  const stats = useMemo(() => {
    const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
    const lowStockCount = medicines.filter(m => m.stock < 10).length;
    const pendingOrders = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length;
    return { totalSales, lowStockCount, pendingOrders, totalMedTypes: medicines.length };
  }, [medicines, orders]);

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-800">Rasi Admin Hub</h1>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Unlock className="w-2.5 h-2.5" /> Authenticated
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">Control pharmacy inventory, upload medicine stocks, and manage authorization keys.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1 rounded-xl self-start sm:sm:center">
          <button 
            type="button"
            onClick={() => setAdminTab('dashboard')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              adminTab === 'dashboard' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Dashboard
          </button>
          <button 
            type="button"
            onClick={() => setAdminTab('inventory')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              adminTab === 'inventory' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Inventory List
          </button>
          <button 
            type="button"
            onClick={() => setAdminTab('orders')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              adminTab === 'orders' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Orders ({orders.filter(o => o.status !== 'Delivered').length})
          </button>
          <button 
            type="button"
            onClick={() => setAdminTab('security')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              adminTab === 'security' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Security Keys
          </button>
          
          <button
            type="button"
            onClick={handleAdminLogout}
            className="ml-2 text-rose-600 hover:bg-rose-50 p-2 rounded-lg transition"
            title="Lock Session"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ADMIN VIEW 1: Dashboard Stats Overview */}
      {adminTab === 'dashboard' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Sales Revenue</span>
                <span className="text-2xl font-black text-slate-800 mt-1 block">₹{stats.totalSales.toFixed(2)}</span>
              </div>
              <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Critical Stock Alerts</span>
                <span className={`text-2xl font-black mt-1 block ${stats.lowStockCount > 0 ? 'text-rose-600' : 'text-slate-800'}`}>{stats.lowStockCount} items</span>
              </div>
              <div className={`p-3 rounded-xl ${stats.lowStockCount > 0 ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-500'}`}>
                <AlertTriangle className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Pending Shipments</span>
                <span className="text-2xl font-black text-slate-800 mt-1 block">{stats.pendingOrders} orders</span>
              </div>
              <div className="bg-amber-50 text-amber-600 p-3 rounded-xl">
                <Package className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Registered Medicine Brands</span>
                <span className="text-2xl font-black text-slate-800 mt-1 block">{stats.totalMedTypes} types</span>
              </div>
              <div className="bg-indigo-50 text-indigo-600 p-3 rounded-xl">
                <ShieldCheck className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Low Stock Panel */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-black text-slate-800 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-500 animate-pulse" /> Critical Restock Warnings
              </h3>
              <div className="divide-y divide-slate-100 max-h-[280px] overflow-y-auto pr-1">
                {medicines.filter(m => m.stock < 10).map(med => (
                  <div key={med.id} className="py-3 first:pt-0 flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2.5">
                      {med.image && (med.image.startsWith('/') || med.image.startsWith('http')) ? (
                        <div className="w-12 h-12 bg-slate-50 rounded-lg overflow-hidden flex items-center justify-center p-0.5 border border-slate-100 shrink-0">
                          <img src={med.image} alt={med.name} className="w-full h-full object-contain" />
                        </div>
                      ) : (
                        <span className="text-3xl p-1.5 bg-slate-50 rounded-lg block">{med.image || '💊'}</span>
                      )}
                      <div className="text-left">
                        <p className="font-bold text-slate-800 leading-tight">{med.brand}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5 truncate max-w-[120px]">{med.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`block font-black ${med.stock === 0 ? 'text-rose-600' : 'text-amber-600'}`}>
                        {med.stock === 0 ? 'OUT OF STOCK' : `${med.stock} left`}
                      </span>
                      <button 
                        type="button"
                        onClick={() => { setAdminTab('inventory'); setStockEditId(med.id); setQuickStockVal(0); }}
                        className="text-[10px] text-emerald-600 font-bold hover:underline"
                      >
                        Restock
                      </button>
                    </div>
                  </div>
                ))}
                {medicines.filter(m => m.stock < 10).length === 0 && (
                  <p className="text-xs text-slate-400 text-center py-6">All medical stock levels are healthy.</p>
                )}
              </div>
            </div>

            {/* Right: Modern Recent Orders Feed */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 lg:col-span-2">
              <h3 className="text-sm font-black text-slate-800 mb-4 flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-600" /> Recent Activity & Delivery Tracking
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[10px] uppercase font-bold text-slate-400">
                      <th className="pb-3">Order ID</th>
                      <th className="pb-3">Recipient</th>
                      <th className="pb-3">Total Cost</th>
                      <th className="pb-3">Tracking Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-55 text-xs divide-slate-100">
                    {orders.slice(0, 5).map(ord => (
                      <tr key={ord.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 font-bold text-slate-800">{ord.id}</td>
                        <td className="py-3 font-semibold text-slate-600">{ord.customerName}</td>
                        <td className="py-3 font-bold text-slate-800">₹{ord.total.toFixed(2)}</td>
                        <td className="py-3">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            ord.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                            ord.status === 'Out for Delivery' ? 'bg-blue-100 text-blue-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {ord.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADMIN VIEW 2: Complete Inventory Control */}
      {adminTab === 'inventory' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h3 className="text-base font-black text-slate-800">Complete Pharmacy Stock Ledger</h3>
            
            <button
              type="button"
              onClick={() => setIsAddingMed(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-1.5 transition self-start"
            >
              <Plus className="w-4 h-4" /> Add New Medicine
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] uppercase font-bold text-slate-400">
                  <th className="pb-3">Medicine Info</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Price</th>
                  <th className="pb-3">Rx Reg.</th>
                  <th className="pb-3">Current Stock</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {medicines.map(med => (
                  <tr key={med.id} className="hover:bg-slate-50/50 transition animate-fade-in">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        {med.image && (med.image.startsWith('/') || med.image.startsWith('http')) ? (
                          <div className="w-12 h-12 bg-slate-50 rounded-lg overflow-hidden flex items-center justify-center p-0.5 border border-slate-100 shrink-0">
                            <img src={med.image} alt={med.name} className="w-full h-full object-contain" />
                          </div>
                        ) : (
                          <span className="text-3xl p-1.5 bg-slate-50 rounded-lg block">{med.image || '💊'}</span>
                        )}
                        <div className="text-left">
                          <p className="font-bold text-slate-800 leading-tight">{med.name}</p>
                          <span className="text-[10px] text-slate-400">{med.brand}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4">
                      <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded text-[10px] font-bold">
                        {med.category}
                      </span>
                    </td>

                    <td className="py-4 font-bold text-slate-800">
                      ₹{med.price.toFixed(2)}
                    </td>

                    <td className="py-4">
                      {med.prescriptionRequired ? (
                        <span className="bg-amber-50 text-amber-800 border border-amber-200 text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase flex items-center gap-1 w-fit">
                          <FileText className="w-2.5 h-2.5" /> Rx Required
                        </span>
                      ) : (
                        <span className="text-slate-400">OTC</span>
                      )}
                    </td>

                    <td className="py-4">
                      {stockEditId === med.id ? (
                        <div className="flex items-center gap-2">
                          <input 
                            type="number" 
                            placeholder="+/- Stock"
                            onChange={(e) => setQuickStockVal(e.target.value)}
                            className="w-20 px-2 py-1.5 border border-slate-200 rounded text-xs text-slate-800 font-bold focus:outline-none focus:border-emerald-600"
                          />
                          <button 
                            type="button"
                            onClick={() => handleUpdateStock(med.id)}
                            className="bg-emerald-600 text-white font-bold px-2 py-1.5 rounded text-[10px] hover:bg-emerald-700"
                          >
                            Save
                          </button>
                          <button 
                            type="button"
                            onClick={() => setStockEditId(null)}
                            className="text-slate-400 hover:text-slate-800 text-[10px] font-bold"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${med.stock < 10 ? 'text-rose-600' : 'text-slate-800'}`}>
                            {med.stock} units
                          </span>
                          <button 
                            type="button"
                            onClick={() => { setStockEditId(med.id); setQuickStockVal(0); }}
                            className="text-emerald-600 hover:text-emerald-800 text-[10px] font-bold hover:underline"
                          >
                            Add Stock
                          </button>
                        </div>
                      )}
                    </td>

                    <td className="py-4 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setMedicines(medicines.filter(m => m.id !== med.id));
                          showAlert(`${med.name} removed from registry.`, 'error');
                        }}
                        className="text-slate-300 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50 transition"
                        title="Delete item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ADMIN VIEW 3: Incoming Customer Orders */}
      {adminTab === 'orders' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-base font-black text-slate-800 mb-4">Pending Orders & Fulfillments</h3>
            
            {orders.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {orders.map(ord => (
                  <div key={ord.id} className="py-6 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start gap-6">
                    <div className="space-y-3 max-w-lg text-left">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-black text-slate-800">{ord.id}</span>
                        <span className="text-xs text-slate-400 font-medium">{ord.date}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          ord.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                          ord.status === 'Out for Delivery' ? 'bg-blue-100 text-blue-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {ord.status}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm font-bold text-slate-700">{ord.customerName}</p>
                        <p className="text-xs text-slate-500 flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5" /> {ord.phone}
                        </p>
                        <p className="text-xs text-slate-500 flex items-start gap-1.5">
                          <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" /> {ord.address}
                        </p>
                      </div>

                      <div className="bg-slate-55 bg-slate-50 p-3 rounded-xl">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Items Ordered</p>
                        <div className="space-y-1.5">
                          {ord.items.map(item => (
                            <div key={item.id} className="flex justify-between text-xs font-semibold text-slate-700">
                              <span>
                                {item.name}{' '}
                                <span className="text-emerald-600 font-bold">x{item.quantity}</span>
                                {item.prescriptionRequired && (
                                  <span className="ml-1 text-[8px] uppercase px-1 bg-amber-100 text-amber-800 rounded font-black">Rx</span>
                                )}
                              </span>
                              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="md:text-right flex flex-col justify-between items-start md:items-end h-full gap-4 shrink-0 w-full md:w-auto">
                      <div className="text-left md:text-right">
                        <span className="text-xs text-slate-400 block font-medium">Order Total</span>
                        <span className="text-xl font-black text-emerald-700">₹{ord.total.toFixed(2)}</span>
                        <span className="text-[10px] text-slate-400 block italic mt-0.5">Method: {ord.paymentMethod}</span>
                      </div>

                      {ord.prescriptions && Object.keys(ord.prescriptions).length > 0 && (
                        <div className="text-left md:text-right">
                          <span className="text-[10px] font-bold text-slate-400 block uppercase mb-1">Attached Prescriptions</span>
                          <div className="flex flex-wrap gap-2 justify-start md:justify-end">
                            {Object.entries(ord.prescriptions).map(([medId, fileData]) => {
                              const med = medicines.find(m => m.id === medId) || ord.items.find(i => i.id === medId);
                              return (
                                <div key={medId} className="group relative border border-slate-200 rounded-xl p-1 bg-slate-50 hover:bg-slate-100 transition flex items-center gap-1.5">
                                  <a href={fileData.image} target="_blank" rel="noreferrer" className="flex items-center gap-1.5">
                                    <img src={fileData.image} alt="Prescription" className="h-10 w-14 object-cover rounded-lg border" />
                                    <div className="text-left text-[9px] pr-2 max-w-[80px]">
                                      <p className="font-bold text-slate-700 truncate">{med ? med.brand : 'Rx'}</p>
                                      <p className="text-slate-400 truncate">{fileData.name}</p>
                                    </div>
                                  </a>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 justify-start md:justify-end w-full md:w-auto">
                        {ord.status === 'Placed' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateOrderStatus(ord.id, 'Preparing')}
                            className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-3 py-2 rounded-lg transition shadow-sm"
                          >
                            Mark as Preparing
                          </button>
                        )}
                        {ord.status === 'Preparing' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateOrderStatus(ord.id, 'Out for Delivery')}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3 py-2 rounded-lg transition shadow-sm"
                          >
                            Hand over to Agent (Dispatch)
                          </button>
                        )}
                        {ord.status === 'Out for Delivery' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateOrderStatus(ord.id, 'Delivered')}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3 py-2 rounded-lg transition shadow-sm"
                          >
                            Confirm Safe Delivery
                          </button>
                        )}
                        {ord.status !== 'Delivered' && ord.status !== 'Cancelled' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateOrderStatus(ord.id, 'Cancelled')}
                            className="text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 font-bold text-xs px-3 py-2 rounded-lg transition"
                          >
                            Cancel Order
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-md font-bold text-slate-800">No Orders in queue</h3>
                <p className="text-slate-400 text-xs mt-1">Pending customer orders will appear here for processing.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ADMIN VIEW 4: Security Access & Password Settings */}
      {adminTab === 'security' && (
        <div className="max-w-xl mx-auto bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
            <div className="bg-slate-100 p-2.5 rounded-xl text-slate-700">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 text-left">Rasi Admin Authentication Settings</h3>
              <p className="text-xs text-slate-400 text-left">Define the security credentials required to gain dashboard access.</p>
            </div>
          </div>

          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1 text-left">Current Password *</label>
              <input
                type="password"
                required
                placeholder="Enter current password to verify"
                value={currentPasswordConfirm}
                onChange={(e) => setCurrentPasswordConfirm(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1 text-left">New Access Password *</label>
              <input
                type="password"
                required
                placeholder="Set new authorization password"
                value={newPasswordVal}
                onChange={(e) => setNewPasswordVal(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1 text-left">Confirm New Password *</label>
              <input
                type="password"
                required
                placeholder="Re-type new password to verify"
                value={confirmNewPasswordVal}
                onChange={(e) => setConfirmNewPasswordVal(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div className="bg-blue-50/50 text-blue-800 border border-blue-100 p-3 rounded-xl text-xs flex gap-2 text-left">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-blue-600" />
              <p>
                <strong>Keep this safe!</strong> If you change this credential, any subsequent attempts to load the Admin Desk will require the new key.
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs shadow-md transition"
            >
              Save Security Passkey
            </button>
          </form>
        </div>
      )}
    </main>
  );
}
