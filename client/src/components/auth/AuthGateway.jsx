import React from 'react';
import { 
  CheckSquare, 
  User, 
  Smartphone, 
  ShieldAlert, 
  Clock, 
  ChevronRight, 
  Unlock 
} from 'lucide-react';

export default function AuthGateway({
  alertMsg,
  authStep,
  handleRequestOtp,
  authName,
  setAuthName,
  authPhone,
  setAuthPhone,
  authError,
  isSendingOtp,
  handleVerifyOtp,
  enteredOtp,
  setEnteredOtp,
  handleResetRegistration
}) {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 text-slate-100 font-sans">
      
      {/* Alert Notification Toast inside Login Screen */}
      {alertMsg && (
        <div className="fixed top-4 right-4 z-50 flex items-center p-4 rounded-xl shadow-lg border bg-slate-800 text-emerald-400 border-slate-700 animate-bounce">
          <CheckSquare className="w-5 h-5 mr-2 text-emerald-500" />
          <span className="font-semibold text-xs tracking-wider">{alertMsg.text}</span>
        </div>
      )}

      <div className="max-w-md w-full bg-slate-800 rounded-3xl p-8 shadow-2xl border border-slate-700 text-center relative space-y-6">
        
        {/* Header branding */}
        <div className="space-y-2">
          <div className="mx-auto w-24 h-24 bg-white rounded-3xl overflow-hidden flex items-center justify-center shadow-lg p-2 border border-slate-700">
            <img src="/images/logo.jpg" alt="Rasi Pharmacy Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white uppercase">Rasi Pharmacy</h1>
          <p className="text-slate-400 text-xs">Complete first-time app installation verification to access pharmacy storefront.</p>
        </div>

        {authStep === 'register' ? (
          <form onSubmit={handleRequestOtp} className="space-y-4 text-left">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Full Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  placeholder="Enter full name"
                  value={authName}
                  onChange={(e) => setAuthName(e.target.value)}
                  className="w-full bg-slate-900/60 border border-slate-700 rounded-2xl py-3 pl-10 pr-4 text-xs font-semibold focus:outline-none focus:border-emerald-500 text-white placeholder-slate-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Mobile Number</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Smartphone className="w-4 h-4" />
                </span>
                <input
                  type="tel"
                  required
                  maxLength="10"
                  placeholder="10-digit mobile number"
                  value={authPhone}
                  onChange={(e) => setAuthPhone(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-slate-900/60 border border-slate-700 rounded-2xl py-3 pl-10 pr-4 text-xs font-semibold focus:outline-none focus:border-emerald-500 text-white placeholder-slate-500 tracking-wider"
                />
              </div>
            </div>

            {authError && (
              <div className="bg-rose-500/10 text-rose-400 border border-rose-500/20 p-3 rounded-2xl text-[10px] font-bold flex items-start gap-1.5 animate-pulse">
                <ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <p>{authError}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSendingOtp}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-700 text-white font-black py-3.5 rounded-2xl text-xs uppercase tracking-widest transition flex items-center justify-center gap-2 shadow-lg"
            >
              {isSendingOtp ? (
                <>
                  <Clock className="w-4 h-4 animate-spin" />
                  Generating Pin...
                </>
              ) : (
                <>
                  <ChevronRight className="w-4 h-4" /> Send OTP Code
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4 text-left">
            <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700 text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">SMS Authentication Sent To</p>
              <p className="font-extrabold text-white mt-1 text-sm tracking-widest">{authPhone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}</p>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block text-center">Enter Verification Code</label>
              <input
                type="text"
                required
                maxLength="4"
                placeholder="0 0 0 0"
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, ''))}
                className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-4 text-center font-black text-xl tracking-[1.5em] pl-[1.5em] focus:outline-none focus:border-emerald-500 text-white"
              />
            </div>

            {authError && (
              <div className="bg-rose-500/10 text-rose-400 border border-rose-500/20 p-3 rounded-2xl text-[10px] font-bold flex items-start gap-1.5 animate-pulse">
                <ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <p>{authError}</p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleResetRegistration}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold py-3.5 rounded-2xl text-xs transition uppercase tracking-wider text-center"
              >
                Edit Phone
              </button>
              <button
                type="submit"
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3.5 rounded-2xl text-xs transition uppercase tracking-widest text-center shadow-lg flex items-center justify-center gap-1.5"
              >
                <Unlock className="w-4 h-4" /> Verify & Install
              </button>
            </div>

            <p className="text-[10px] text-slate-400 text-center italic mt-2">
              Didn't get SMS code? Click 'Edit Phone' above to trigger a new security code.
            </p>
          </form>
        )}

        <div className="border-t border-slate-700 pt-4 flex items-center justify-center gap-2 text-[10px] text-slate-500">
          <CheckSquare className="w-3.5 h-3.5 text-emerald-500" /> Secure 256-Bit SSL Secured App Gateway
        </div>
      </div>
    </div>
  );
}
