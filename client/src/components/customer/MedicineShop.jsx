import React from 'react';
import { 
  Activity, 
  Heart, 
  Search, 
  X, 
  FileText, 
  Camera, 
  ListFilter, 
  ShoppingCart,
  Phone
} from 'lucide-react';

const BG_IMAGES = [
  '/images/bg1.jpg',
  '/images/bg2.jpg',
  '/images/bg3.jpg',
  '/images/bg4.jpg',
  '/images/bg5.jpg'
];

export default function MedicineShop({
  CATEGORIES,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  filteredMedicines,
  cart,
  handleAddToCartClick,
  prescriptionImage,
  prescriptionFileName,
  isPrescriptionRequiredForCart,
  removePrescription,
  handleOpenUploadOptionDialog
}) {
  const [bgIndex, setBgIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % BG_IMAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      
      {/* transparent Medical Grid Background */}
      <div className="relative border border-slate-200/80 rounded-3xl p-4 sm:p-12 bg-white shadow-md overflow-hidden min-h-[380px] sm:min-h-[440px] flex flex-col justify-center items-center text-center">
        
        {/* Sliding Background Image Carousel */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
          <div 
            className="flex h-full transition-transform duration-[1200ms] cubic-bezier(0.4, 0, 0.2, 1)" 
            style={{ width: '500%', transform: `translateX(-${bgIndex * 20}%)` }}
          >
            {BG_IMAGES.map((src, index) => (
              <div key={index} className="w-1/5 h-full relative">
                <img 
                  src={src} 
                  alt={`Background ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          {/* Dark semi-transparent overlay to keep images clear and make white letters easily readable */}
          <div className="absolute inset-0 bg-black/35 sm:bg-black/40 backdrop-blur-[0.2px] transition-all"></div>
        </div>

        <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none z-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="medical-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#ffffff" strokeWidth="1"/>
                <circle cx="30" cy="30" r="1.5" fill="#ffffff" />
                <path d="M15 15 h10 v5 h-10 z" fill="none" stroke="#ffffff" strokeWidth="0.5"/>
                <path d="M45 45 q 5-5, 10 0" fill="none" stroke="#ffffff" strokeWidth="0.5"/>
                <path d="M45 50 q 5 5, 10 0" fill="none" stroke="#ffffff" strokeWidth="0.5"/>
                <path d="M5 45 l 5 0 l 2-5 l 2 10 l 2-15 l 2 12 l 2-2 l 5 0" fill="none" stroke="#ffffff" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#medical-grid)" />
          </svg>
        </div>

        {/* Helpline Number Badge */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
          <a 
            href="tel:7448849777" 
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 hover:border-white/50 text-white font-extrabold text-[10px] sm:text-xs px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95"
            title="Call Support"
          >
            <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 animate-pulse" />
            <span>744 884 9777</span>
          </a>
        </div>

        <div className="absolute top-6 right-10 text-white/10 pointer-events-none select-none hidden md:block z-10">
          <Activity className="w-24 h-24 stroke-[1]" />
        </div>
        <div className="absolute bottom-6 left-10 text-white/10 pointer-events-none select-none hidden md:block z-10">
          <Heart className="w-20 h-20 stroke-[1]" />
        </div>

        {/* Text content directly on the images */}
        <div className="relative z-20 max-w-2xl mx-auto w-full px-4">
          
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3 drop-shadow-md">
            Search Registered Medications & Stocks
          </h1>
          
          <p className="text-white/80 text-xs sm:text-sm mb-6 max-w-md mx-auto font-medium drop-shadow-sm">
            Type below to instantly filter our medicine registry.
          </p>

          <div className="relative bg-white/10 backdrop-blur-md border border-white/25 hover:border-white/45 transition-all rounded-2xl p-1.5 flex items-center shadow-2xl max-w-xl mx-auto">
            <Search className="text-white/70 w-5 h-5 ml-3 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Type paracetamol, amoxil, supplements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-white placeholder-white/50 bg-transparent py-2 focus:outline-none text-xs sm:text-sm font-semibold"
            />
            {searchQuery && (
              <button 
                type="button"
                onClick={() => setSearchQuery('')}
                className="p-1 mr-1 text-white/60 hover:text-white rounded-lg hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* PRESCRIPTION UPLOAD STATION */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-50 text-emerald-700 p-3 rounded-2xl">
            <FileText className="w-6 h-6" />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              Rasi Prescription Station
            </h3>
            <p className="text-xs text-slate-500 max-w-md">
              {isPrescriptionRequiredForCart 
                ? '⚠️ Required: Upload or snap a photo of your prescription to buy your Rx medicines.'
                : 'Optional: Pre-attach your medical script here for rapid home delivery validation.'}
            </p>
          </div>
        </div>

        <div className="w-full sm:w-auto shrink-0 flex items-center gap-3">
          {prescriptionImage ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5 flex items-center gap-3 w-full sm:w-auto justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded border border-emerald-300 overflow-hidden shrink-0">
                  <img src={prescriptionImage} alt="Prescription thumbnail" className="w-full h-full object-cover" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-emerald-900 truncate max-w-[120px]">
                    {prescriptionFileName || "Prescription.jpg"}
                  </p>
                  <span className="text-[10px] text-emerald-700 block font-medium">Uploaded & Ready</span>
                </div>
              </div>
              <button
                type="button"
                onClick={removePrescription}
                className="text-rose-600 hover:text-rose-800 p-1 hover:bg-rose-100 rounded transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => handleOpenUploadOptionDialog(null)}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-5 py-3.5 rounded-xl shadow-md transition flex items-center justify-center gap-2 group"
            >
              <Camera className="w-4 h-4 text-emerald-100 group-hover:scale-110 transition-transform" />
              Upload Prescription
            </button>
          )}
        </div>
      </div>

      {/* sliding Category Marquee */}
      <div className="overflow-hidden bg-slate-100 py-3 rounded-2xl border border-slate-200 shadow-inner relative">
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-slate-100 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-slate-100 to-transparent z-10 pointer-events-none"></div>
        
        <div className="flex items-center mb-1.5 px-4">
          <span className="text-[10px] font-black uppercase text-emerald-700 tracking-wider flex items-center gap-1.5">
            <ListFilter className="w-3.5 h-3.5 animate-pulse" /> Smooth Sliding Categories (Hover to Pause & Select)
          </span>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="animate-category-marquee flex gap-3">
            {[...CATEGORIES, ...CATEGORIES, ...CATEGORIES].map((category, index) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  type="button"
                  key={`${category}-${index}`}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all border shadow-sm ${
                    isActive 
                      ? 'bg-emerald-600 text-white border-emerald-700 scale-105' 
                      : 'bg-white text-slate-700 hover:text-emerald-700 border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Medicine Product Grid */}
      {filteredMedicines.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {filteredMedicines.map(med => {
            const isInCart = cart.find(c => c.id === med.id);
            const isLowStock = med.stock > 0 && med.stock < 10;
            const isOutOfStock = med.stock <= 0;

            return (
              <div 
                key={med.id} 
                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start gap-4 mb-4">
                    {med.image && (med.image.startsWith('/') || med.image.startsWith('http')) ? (
                      <div className="w-28 h-28 bg-slate-50 rounded-2xl overflow-hidden flex items-center justify-center p-1.5 border border-slate-150 shadow-sm shrink-0">
                        <img src={med.image} alt={med.name} className="w-full h-full object-contain" />
                      </div>
                    ) : (
                      <span className="text-5xl p-4 bg-slate-50 rounded-2xl block">{med.image || '💊'}</span>
                    )}
                    <div className="flex flex-col items-end gap-1.5">
                      {med.prescriptionRequired && (
                        <span className="bg-amber-50 text-amber-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-amber-200 animate-pulse flex items-center gap-1">
                          <FileText className="w-3 h-3" /> Rx Required
                        </span>
                      )}
                      {isOutOfStock ? (
                        <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Out of Stock
                        </span>
                      ) : isLowStock ? (
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Only {med.stock} Left!
                        </span>
                      ) : (
                        <span className="bg-emerald-50 text-emerald-800 text-[10px] font-medium px-2 py-0.5 rounded-full">
                          {med.stock} in stock
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mb-4 text-left">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">{med.brand}</p>
                    <h3 className="font-bold text-slate-800 text-base leading-tight mt-0.5 hover:text-emerald-700 transition">
                      {med.name}
                    </h3>
                    <span className="inline-block mt-2 text-[11px] bg-slate-100 text-slate-600 px-2 py-1 rounded">
                      {med.category}
                    </span>
                    <p className="text-slate-500 text-xs mt-3 line-clamp-2">
                      {med.description}
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-50 pt-4 mt-4 flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-xs text-slate-400 block font-medium">Price</span>
                    <span className="text-xl font-black text-slate-800">
                      ₹{med.price.toFixed(2)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAddToCartClick(med)}
                    disabled={isOutOfStock}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
                      isOutOfStock 
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                        : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {isInCart ? `In Cart (${isInCart.quantity})` : 'Add to Cart'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 border border-slate-100 text-center max-w-lg mx-auto shadow-sm">
          <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">No Medicines Found</h3>
          <p className="text-slate-500 text-sm">
            We couldn't find any results matching "{searchQuery}" under "{selectedCategory}".
          </p>
        </div>
      )}
    </div>
  );
}
