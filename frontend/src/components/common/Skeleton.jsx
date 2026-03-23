import { motion } from "framer-motion";

export const Skeleton = ({ className }) => (
  <motion.div
    animate={{ opacity: [0.5, 1, 0.5] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    className={`bg-slate-200 rounded-lg ${className}`}
  />
);

export const CardSkeleton = () => (
  <div className="p-4 border border-slate-100 rounded-2xl bg-white shadow-sm space-y-4">
    <Skeleton className="h-48 w-full" />
    <div className="space-y-2">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  </div>
);
