import React from 'react';
import { X, FileText, Camera, Upload } from 'lucide-react';

export default function UploadSelectorModal({
  showUploadOptionDialog,
  setShowUploadOptionDialog,
  setActiveUploadMedId,
  triggerCameraOnly,
  triggerGalleryOnly
}) {
  if (!showUploadOptionDialog) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden border border-slate-100 text-left">
        <div className="bg-slate-900 p-5 text-white flex justify-between items-center">
          <div>
            <h3 className="font-extrabold text-sm uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-emerald-400 animate-pulse" />
              Prescription Source
            </h3>
            <p className="text-[10px] text-slate-400">Choose prescription attachment style</p>
          </div>
          <button 
            type="button"
            onClick={() => {
              setShowUploadOptionDialog(false);
              setActiveUploadMedId(null);
            }}
            className="text-white hover:text-slate-400 p-1 rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-3">
          <button
            type="button"
            onClick={triggerCameraOnly}
            className="w-full border border-slate-200 rounded-2xl p-4 text-left hover:bg-slate-50 hover:border-emerald-600 transition flex items-center gap-4 group"
          >
            <div className="bg-emerald-50 text-emerald-700 p-3 rounded-xl group-hover:bg-emerald-100 transition">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-black text-slate-800 block">Take Live Photo</span>
              <span className="text-[10px] text-slate-400">Launches system camera to snap prescription</span>
            </div>
          </button>

          <button
            type="button"
            onClick={triggerGalleryOnly}
            className="w-full border border-slate-200 rounded-2xl p-4 text-left hover:bg-slate-50 hover:border-emerald-600 transition flex items-center gap-4 group"
          >
            <div className="bg-blue-50 text-blue-700 p-3 rounded-xl group-hover:bg-blue-100 transition">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-black text-slate-800 block">Upload from Gallery / Files</span>
              <span className="text-[10px] text-slate-400">Select an existing photo, screenshot, or PDF</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
