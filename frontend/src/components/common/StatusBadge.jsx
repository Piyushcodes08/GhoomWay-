import React from 'react';

const StatusBadge = ({ status }) => {
  const statusStyles = {
    Pending: 'bg-amber-100 text-amber-700 border-amber-200',
    Accepted: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    Rejected: 'bg-rose-100 text-rose-700 border-rose-200',
    Completed: 'bg-blue-100 text-blue-700 border-blue-200',
    Cancelled: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider border ${statusStyles[status] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
