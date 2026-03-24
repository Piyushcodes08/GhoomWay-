import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle } from 'lucide-react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, confirmText, type = 'primary', loading = false }) => {
  const [remark, setRemark] = useState('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(remark);
    setRemark('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden"
        >
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-3 rounded-2xl ${type === 'danger' ? 'bg-rose-50 text-rose-500' : 'bg-blue-50 text-[#31468e]'}`}>
                <AlertCircle size={24} />
              </div>
              <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={24} />
              </button>
            </div>

            <h3 className="text-2xl font-black text-slate-900 mb-2">{title}</h3>
            <p className="text-slate-500 font-bold mb-6">{message}</p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                  Admin Remark (Optional)
                </label>
                <textarea
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  placeholder="Enter a reason or note for this action..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-800 font-bold placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#31468e]/20 focus:border-[#31468e] transition-all"
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-black py-4 rounded-2xl transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={loading}
                  className={`flex-1 text-white font-black py-4 rounded-2xl transition-all shadow-lg ${
                    type === 'danger' 
                      ? 'bg-rose-500 hover:bg-rose-600 shadow-rose-200' 
                      : 'bg-[#31468e] hover:bg-[#253675] shadow-blue-200'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading ? 'Saving...' : confirmText}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ConfirmationModal;
