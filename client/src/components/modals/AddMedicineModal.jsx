import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

export default function AddMedicineModal({
  isAddingMed,
  setIsAddingMed,
  handleAddMedicine,
  newMed,
  setNewMed,
  CATEGORIES
}) {
  if (!isAddingMed) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-left">
        <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
          <div>
            <h3 className="font-extrabold text-lg">Add Medicine to Inventory</h3>
            <p className="text-slate-400 text-xs mt-0.5">Upload new pharmaceutical specifications and initialize stocks.</p>
          </div>
          <button 
            type="button"
            onClick={() => setIsAddingMed(false)}
            className="text-white hover:text-slate-400 p-1.5 rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleAddMedicine} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Medicine Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Paracetamol"
                value={newMed.name}
                onChange={(e) => setNewMed({...newMed, name: e.target.value})}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Manufacturer Brand</label>
              <input
                type="text"
                placeholder="e.g. GlaxoSmithKline"
                value={newMed.brand}
                onChange={(e) => setNewMed({...newMed, brand: e.target.value})}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Category Category *</label>
              <select
                value={newMed.category}
                onChange={(e) => setNewMed({...newMed, category: e.target.value})}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-600 font-bold"
              >
                {CATEGORIES.slice(1).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Dosage Form</label>
              <input
                type="text"
                placeholder="e.g. 500mg, 1 tablet daily"
                value={newMed.dosage}
                onChange={(e) => setNewMed({...newMed, dosage: e.target.value})}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Unit Price (INR) *</label>
              <input
                type="number"
                step="0.01"
                required
                placeholder="₹0.00"
                value={newMed.price}
                onChange={(e) => setNewMed({...newMed, price: e.target.value})}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Initial Stock *</label>
              <input
                type="number"
                required
                placeholder="Qty in units"
                value={newMed.stock}
                onChange={(e) => setNewMed({...newMed, stock: e.target.value})}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Product Description</label>
            <textarea
              rows="2"
              placeholder="Details regarding purpose, active chemicals, warning tags..."
              value={newMed.description}
              onChange={(e) => setNewMed({...newMed, description: e.target.value})}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
            ></textarea>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Medicine Image (File Upload or Emoji)</label>
            <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-xl p-3.5">
              {newMed.image && (newMed.image.startsWith('data:image') || newMed.image.startsWith('/') || newMed.image.startsWith('http')) ? (
                <div className="w-16 h-16 bg-white border border-slate-200 rounded-xl overflow-hidden flex items-center justify-center p-1 shrink-0 shadow-sm">
                  <img src={newMed.image} alt="Preview" className="w-full h-full object-contain" />
                </div>
              ) : (
                <span className="text-4xl p-2 bg-white border border-slate-200 rounded-xl block shrink-0 shadow-sm">{newMed.image || '💊'}</span>
              )}
              
              <div className="flex flex-col gap-2 w-full">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setNewMed({ ...newMed, image: reader.result });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="block w-full text-xs text-slate-500
                    file:mr-4 file:py-1.5 file:px-3
                    file:rounded-xl file:border-0
                    file:text-[10px] file:font-black file:uppercase file:tracking-wider
                    file:bg-emerald-50 file:text-emerald-700
                    hover:file:bg-emerald-100 cursor-pointer"
                />
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Or Use Emoji:</span>
                  <input
                    type="text"
                    maxLength="4"
                    placeholder="e.g. 💊"
                    value={newMed.image && !newMed.image.startsWith('data:image') && !newMed.image.startsWith('/') && !newMed.image.startsWith('http') ? newMed.image : ''}
                    onChange={(e) => setNewMed({ ...newMed, image: e.target.value || '💊' })}
                    className="w-12 px-1.5 py-0.5 border border-slate-200 rounded text-center text-xs focus:outline-none focus:border-emerald-600 font-bold"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-slate-800 block">Prescription Regulation (Rx Required)</span>
                <span className="text-[10px] text-slate-400 block">Should the customer upload a prescription to buy this medicine?</span>
              </div>
              
              <div className="bg-slate-200 p-1 rounded-xl flex gap-1">
                <button
                  type="button"
                  onClick={() => setNewMed({...newMed, prescriptionRequired: false})}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                    !newMed.prescriptionRequired 
                      ? 'bg-white text-slate-700 shadow-sm' 
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  OTC (None)
                </button>
                <button
                  type="button"
                  onClick={() => setNewMed({...newMed, prescriptionRequired: true})}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                    newMed.prescriptionRequired 
                      ? 'bg-amber-500 text-white shadow-sm' 
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  Rx (Required)
                </button>
              </div>
            </div>

            {newMed.prescriptionRequired && (
              <div className="bg-amber-50 text-amber-800 text-[10px] p-2.5 rounded-lg flex items-start gap-1.5 border border-amber-200 animate-fade-in">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Regulation Notice:</strong> Customers will be forced to upload a prescription file for this exact medicine in their shopping cart.
                </p>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs shadow-md transition-all uppercase tracking-wider"
          >
            Upload & Register Medicine
          </button>
        </form>
      </div>
    </div>
  );
}
