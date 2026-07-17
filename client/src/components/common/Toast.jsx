import React from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';

export default function Toast({ alertMsg }) {
  if (!alertMsg) return null;

  return (
    <div className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-5 py-4 rounded-2xl shadow-xl border bg-white animate-in slide-in-from-top duration-300 ${
      alertMsg.type === 'error' 
        ? 'border-rose-100 bg-rose-50 text-rose-800' 
        : 'border-emerald-100 bg-emerald-50 text-emerald-800'
    }`}>
      {alertMsg.type === 'error' ? (
        <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />
      ) : (
        <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
      )}
      <span className="font-semibold text-slate-800 text-xs tracking-wide">{alertMsg.text}</span>
    </div>
  );
}
