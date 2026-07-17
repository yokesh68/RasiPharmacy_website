import React, { useState } from 'react';
import { X, Lock, Unlock, Truck, Eye, EyeOff } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onSubmit, role, error, setError }) {
  const [enteredPassword, setEnteredPassword] = useState('');
  const [showPasswordChar, setShowPasswordChar] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(enteredPassword);
  };

  const handleClose = () => {
    setEnteredPassword('');
    setShowPasswordChar(false);
    setError('');
    onClose();
  };

  const isAdmin = role === 'admin';

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-slate-900 p-6 text-white text-center relative">
          <div className={`mx-auto w-12 h-12 rounded-2xl flex items-center justify-center mb-3 ${
            isAdmin 
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
              : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
          }`}>
            {isAdmin ? (
              <Lock className="w-5 h-5 animate-pulse" />
            ) : (
              <Truck className="w-5 h-5 animate-pulse" />
            )}
          </div>
          <h3 className="font-extrabold text-lg">
            {isAdmin ? 'Admin Authentication Lock' : 'Delivery Portal Login'}
          </h3>
          <p className="text-slate-400 text-xs mt-1">
            {isAdmin 
              ? 'Please enter your Rasi Pharmacy master password to log in.' 
              : 'Please enter your assigned agent passkey to access delivery queues.'}
          </p>
          
          <button 
            type="button"
            onClick={handleClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1 text-left">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              {isAdmin ? 'Administrative Password' : 'Agent Passkey'}
            </label>
            <div className="relative">
              <input
                type={showPasswordChar ? "text" : "password"}
                required
                placeholder={isAdmin ? "Enter passkey..." : "Enter agent passkey..."}
                value={enteredPassword}
                onChange={(e) => {
                  setEnteredPassword(e.target.value);
                  setError('');
                }}
                className={`w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none pr-10 font-mono tracking-widest ${
                  isAdmin ? 'focus:border-emerald-600' : 'focus:border-indigo-600'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPasswordChar(!showPasswordChar)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition"
              >
                {showPasswordChar ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && (
              <p className="text-[10px] text-rose-600 font-semibold animate-pulse mt-1">
                ⚠️ {error}
              </p>
            )}
            <p className="text-[10px] text-slate-400 mt-1 italic text-center">
              Note: Default password is{' '}
              <span className={`font-bold ${isAdmin ? 'text-emerald-600' : 'text-indigo-600'}`}>
                {isAdmin ? 'rasi123' : 'delivery123'}
              </span>
              .
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs shadow-md transition uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <Unlock className="w-4 h-4" />{' '}
            {isAdmin ? 'Unlock Admin Panel' : 'Unlock Delivery Desk'}
          </button>
        </form>
      </div>
    </div>
  );
}
