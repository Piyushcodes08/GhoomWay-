import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className="fixed bottom-6 right-6 z-[9999] flex items-center gap-3 bg-white px-5 py-4 rounded-2xl shadow-2xl shadow-slate-200 border border-slate-100 min-w-[320px]"
    >
      <div className={`p-2 rounded-xl ${type === 'success' ? 'bg-emerald-50 text-emerald-500' : 'bg-rose-50 text-rose-500'}`}>
        {type === 'success' ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
      </div>
      
      <div className="flex-1">
        <p className="text-sm font-black text-slate-800">{type === 'success' ? 'Success' : 'Error'}</p>
        <p className="text-xs font-bold text-slate-500">{message}</p>
      </div>

      <button 
        onClick={onClose}
        className="text-slate-300 hover:text-slate-500 transition-colors"
      >
        <X size={18} />
      </button>
    </motion.div>
  );
};

export default Toast;
