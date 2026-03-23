import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, Smartphone } from "lucide-react";

export default function AppNotice() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after 2 seconds to be non-intrusive
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-[100] max-w-sm w-[calc(100%-48px)] bg-slate-900/90 backdrop-blur-md border border-slate-700 p-4 rounded-2xl shadow-2xl flex items-start gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#31468e] to-[#20316b] flex items-center justify-center shrink-0 shadow-inner border border-blue-400/20">
            <Smartphone className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 pr-6 relative">
            <h4 className="text-white font-bold text-[13px] mb-1 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#f2ca1c] animate-pulse shadow-[0_0_8px_#f2ca1c]" /> Mobile App Coming Soon
            </h4>
            <p className="text-slate-300 text-xs leading-relaxed font-medium">
              Get ready for a seamless premium travel experience right at your fingertips.
            </p>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
