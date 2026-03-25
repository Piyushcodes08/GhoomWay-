import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, User, Phone, MapPin, Calendar, Clock, Car, Users, Info, MessageSquare } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

const BookingDetailModal = ({ isOpen, onClose, booking }) => {
  const { t } = useTranslation();
  if (!isOpen || !booking) return null;

  const detailItems = [
    { icon: <User size={20} />, label: t('admin.modals.customerName'), value: booking.customerName },
    { icon: <Phone size={20} />, label: t('admin.modals.phoneNumber'), value: booking.phoneNumber },
    { icon: <Calendar size={20} />, label: t('admin.modals.pickupDate'), value: new Date(booking.pickupDate).toLocaleDateString(t('common.locale', 'en-IN'), { dateStyle: 'long' }) },
    { icon: <Clock size={20} />, label: t('admin.modals.pickupTime'), value: booking.pickupTime },
    { icon: <Info size={20} />, label: t('admin.modals.tripType'), value: `${t(`booking.tabs.${(booking.tripCategory || '').toLowerCase().replace(/\s|\//g, '')}`, booking.tripCategory)} (${t(`booking.options.${(booking.tripType || '').toLowerCase().replace(/\s/g, '')}.title`, booking.tripType)})` },
    { icon: <Car size={20} />, label: t('admin.modals.cabCategory'), value: booking.cabCategory },
    { icon: <Users size={20} />, label: t('admin.modals.passengers'), value: booking.passengers },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-end">
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           onClick={onClose}
           className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        />
        
        <motion.div
           initial={{ x: '100%' }}
           animate={{ x: 0 }}
           exit={{ x: '100%' }}
           transition={{ type: 'spring', damping: 25, stiffness: 200 }}
           className="relative bg-white w-full max-w-xl h-full shadow-2xl overflow-y-auto"
        >
          <div className="p-8">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-3xl font-black text-slate-900 transition-all">{t('admin.modals.details')}</h2>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-slate-400 font-black">ID: {booking.bookingId}</span>
                  <StatusBadge status={booking.status} />
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl text-slate-400 hover:text-slate-600 transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-8">
              {/* Location Card */}
              <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-100">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white rounded-2xl shadow-sm text-emerald-500 border border-slate-100">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{t('admin.modals.pickupCity')}</p>
                      <p className="text-xl font-black text-slate-900">{booking.pickupCity}</p>
                    </div>
                  </div>

                  {booking.dropCity && (
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-white rounded-2xl shadow-sm text-rose-500 border border-slate-100">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{t('admin.modals.dropCity')}</p>
                        <p className="text-xl font-black text-slate-900">{booking.dropCity}</p>
                      </div>
                    </div>
                  )}

                  {booking.rentalPackage && (
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-white rounded-2xl shadow-sm text-[#31468e] border border-slate-100">
                        <Calendar size={24} />
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{t('admin.modals.rentalPackage')}</p>
                        <p className="text-xl font-black text-slate-900">{booking.rentalPackage}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Grid Details */}
              <div className="grid grid-cols-2 gap-4">
                {detailItems.map((item, idx) => (
                  <div key={idx} className="p-5 bg-white border border-slate-100 shadow-sm rounded-2xl">
                    <div className="text-[#31468e] mb-3">{item.icon}</div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1">{item.label}</p>
                    <p className="font-bold text-slate-800 break-words">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Admin Remark */}
              {booking.adminRemark && (
                <div className="bg-amber-50 rounded-[2rem] p-6 border border-amber-100">
                  <div className="flex items-center gap-3 mb-3 text-amber-600">
                    <MessageSquare size={20} />
                    <p className="text-xs font-black uppercase tracking-widest">{t('admin.modals.remark')}</p>
                  </div>
                  <p className="text-slate-800 font-bold italic">"{booking.adminRemark}"</p>
                </div>
              )}

              <div className="pt-8 border-t border-slate-100">
                 <p className="text-[10px] font-black text-slate-300 uppercase text-center tracking-widest">
                   {t('admin.modals.created')}: {new Date(booking.createdAt).toLocaleString(t('common.locale', 'en-IN'))}
                 </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BookingDetailModal;
