import React from 'react';
import { Pill } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-10 mt-auto border-t border-slate-800 text-center sm:text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600 text-white p-2 rounded-xl flex items-center justify-center">
              <Pill className="w-5 h-5" />
            </div>
            <span className="font-bold text-base text-white tracking-wider">RASI PHARMACY</span>
          </div>
          <p className="text-xs text-slate-500">
            © 2026 Rasi Pharmacy Delivery Network. Licensed pharmaceutical providers. All stocks auto-calculated on purchase.
          </p>
        </div>
      </div>
    </footer>
  );
}
