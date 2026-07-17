import React from 'react';
import { Truck, CheckCircle, MapPin, Phone, Clock } from 'lucide-react';

export default function TrackingView({ lastPlacedOrder, medicines }) {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-left">
      <h2 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
        <Truck className="w-5 h-5 text-emerald-600" /> Live Delivery Status
      </h2>

      {lastPlacedOrder ? (
        <div>
          <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-start gap-3 mb-6">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-emerald-900 text-sm">Order {lastPlacedOrder.id} Placed!</h4>
              <p className="text-xs text-emerald-700 mt-1">
                Our pharmacist is packaging your medicine. Total items: {(lastPlacedOrder.items || []).reduce((s, i) => s + i.quantity, 0)}.
              </p>
            </div>
          </div>

          <div className="relative pl-8 space-y-6 before:content-[''] before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            <div className="relative">
              <div className={`absolute -left-8 w-6 h-6 rounded-full border-4 border-white flex items-center justify-center text-xs font-bold ${
                ['Placed', 'Preparing', 'Out for Delivery', 'Delivered'].includes(lastPlacedOrder.status)
                  ? 'bg-emerald-600 text-white' : 'bg-slate-200'
              }`}>
                1
              </div>
              <h5 className="font-bold text-sm text-slate-800">Order Placed</h5>
              <p className="text-xs text-slate-400 mt-0.5">We have received your delivery request.</p>
            </div>

            <div className="relative">
              <div className={`absolute -left-8 w-6 h-6 rounded-full border-4 border-white flex items-center justify-center text-xs font-bold ${
                ['Preparing', 'Out for Delivery', 'Delivered'].includes(lastPlacedOrder.status)
                  ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
              }`}>
                2
              </div>
              <h5 className="font-bold text-sm text-slate-800">Pharmacist Verified & Packed</h5>
              <p className="text-xs text-slate-400 mt-0.5">Medicines inspected and packed in temperature-controlled bag.</p>
            </div>

            <div className="relative">
              <div className={`absolute -left-8 w-6 h-6 rounded-full border-4 border-white flex items-center justify-center text-xs font-bold ${
                ['Out for Delivery', 'Delivered'].includes(lastPlacedOrder.status)
                  ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
              }`}>
                3
              </div>
              <h5 className="font-bold text-sm text-slate-800">Out for Delivery</h5>
              <p className="text-xs text-slate-400 mt-0.5">Rasi Pharmacy delivery agent is en-route to your address.</p>
            </div>

            <div className="relative">
              <div className={`absolute -left-8 w-6 h-6 rounded-full border-4 border-white flex items-center justify-center text-xs font-bold ${
                ['Delivered'].includes(lastPlacedOrder.status)
                  ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
              }`}>
                4
              </div>
              <h5 className="font-bold text-sm text-slate-800">Delivered Safely</h5>
              <p className="text-xs text-slate-400 mt-0.5">Medicines handed over at your doorstep.</p>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-100 pt-6">
            <h4 className="font-bold text-sm text-slate-800 mb-4">Delivery & Order details</h4>
            <div className="space-y-3 bg-slate-50 p-4 rounded-xl">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Shipping Address</span>
                  <span className="text-xs font-semibold text-slate-700">{lastPlacedOrder.address}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Contact Number</span>
                  <span className="text-xs font-semibold text-slate-700">{lastPlacedOrder.phone}</span>
                </div>
              </div>
              
              {lastPlacedOrder.prescriptions && Object.keys(lastPlacedOrder.prescriptions).length > 0 && (
                <div className="border-t border-slate-200 pt-4 mt-3">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase mb-2">Attached Prescriptions</span>
                  <div className="flex flex-wrap gap-3">
                    {Object.entries(lastPlacedOrder.prescriptions).map(([medId, fileData]) => {
                      const med = medicines.find(m => m.id === medId) || (lastPlacedOrder.items || []).find(i => i.id === medId);
                      return (
                        <div key={medId} className="flex items-center gap-2 bg-white border border-slate-200 p-1.5 rounded-xl">
                          <img 
                            src={fileData.image} 
                            alt="Rx" 
                            className="w-10 h-10 object-cover rounded-lg border"
                          />
                          <div className="text-left text-[10px] max-w-[100px]">
                            <p className="font-bold text-slate-700 truncate">{med ? med.brand : 'Rx Medicine'}</p>
                            <p className="text-slate-400 truncate">{fileData.name}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
            <Clock className="w-8 h-8" />
          </div>
          <h3 className="text-md font-bold text-slate-800">No active tracking found</h3>
          <p className="text-slate-400 text-xs mt-1">Once you complete a purchase, your real-time delivery tracking status will load here.</p>
        </div>
      )}
    </div>
  );
}
