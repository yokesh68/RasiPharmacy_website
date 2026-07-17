import React from 'react';
import { X, AlertTriangle, ShoppingCart } from 'lucide-react';

export default function QuantityModal({
  isQtyModalOpen,
  selectedMedForQty,
  setIsQtyModalOpen,
  userSelectedQty,
  setUserSelectedQty,
  confirmAddToCartWithQty
}) {
  if (!isQtyModalOpen || !selectedMedForQty) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200 text-left">
        <div className="bg-emerald-600 p-6 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-3xl p-1 bg-white/10 rounded-xl">{selectedMedForQty.image}</span>
            <div className="text-left">
              <h3 className="font-extrabold text-base leading-tight">Quantity Selection</h3>
              <p className="text-emerald-100 text-[11px]">{selectedMedForQty.brand}</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={() => setIsQtyModalOpen(false)}
            className="text-white hover:text-emerald-100 p-1.5 rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Item Details</p>
            <h4 className="font-bold text-slate-800 text-sm mt-1">{selectedMedForQty.name}</h4>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">{selectedMedForQty.description}</p>
            <div className="mt-2.5 flex items-center justify-between text-xs">
              <span className="text-slate-500">
                Unit Price: <strong className="text-slate-800">₹{selectedMedForQty.price.toFixed(2)}</strong>
              </span>
              <span className="text-slate-500">
                Available Stock: <strong className="text-emerald-600">{selectedMedForQty.stock} units</strong>
              </span>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 p-3.5 rounded-2xl text-xs text-blue-800">
            <div className="flex gap-2">
              <AlertTriangle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Usage Advisory:</span>
                <p className="text-[11px] text-blue-700 mt-0.5">
                  {selectedMedForQty.dosage || "Take only as directed by your physician. Keep medicines away from children."}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Select Quantity to Purchase
            </label>
            
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setUserSelectedQty(prev => Math.max(1, prev - 1))}
                  className="w-10 h-10 bg-white text-slate-700 font-extrabold text-base rounded-lg shadow-sm hover:bg-slate-50 transition flex items-center justify-center"
                >
                  -
                </button>
                <input 
                  type="number"
                  min="1"
                  max={selectedMedForQty.stock}
                  value={userSelectedQty}
                  onChange={(e) => {
                    const parsedVal = parseInt(e.target.value);
                    if (!isNaN(parsedVal)) {
                      setUserSelectedQty(Math.min(selectedMedForQty.stock, Math.max(1, parsedVal)));
                    } else {
                      setUserSelectedQty('');
                    }
                  }}
                  className="w-14 bg-transparent text-center font-extrabold text-base text-slate-800 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setUserSelectedQty(prev => Math.min(selectedMedForQty.stock, (parseInt(prev) || 0) + 1))}
                  className="w-10 h-10 bg-white text-slate-700 font-extrabold text-base rounded-lg shadow-sm hover:bg-slate-50 transition flex items-center justify-center"
                >
                  +
                </button>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Estimated Cost</span>
                <span className="text-xl font-black text-emerald-700">
                  ₹{((parseInt(userSelectedQty) || 0) * selectedMedForQty.price).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsQtyModalOpen(false)}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-3 rounded-xl text-xs transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={confirmAddToCartWithQty}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs shadow-md transition flex items-center justify-center gap-1.5"
            >
              <ShoppingCart className="w-4 h-4" /> Add to Basket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
