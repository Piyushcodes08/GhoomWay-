import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, RefreshCw, Eye, CheckCircle2, XCircle, 
  MapPin, Clock, BarChart3, TrendingUp, X
} from "lucide-react";
import { fetchBookings, updateBookingStatus } from "../services/bookingService";
import { getStoredUser, logout } from "../services/authService";
import StatusBadge from "../components/common/StatusBadge";
import Toast from "../components/common/Toast";
import ConfirmationModal from "../components/common/ConfirmationModal";
import BookingDetailModal from "../components/booking/BookingDetailModal";

const TAB_STATUSES = ['All', 'Pending', 'Accepted', 'Rejected', 'Completed', 'Cancelled'];

export default function AdminDashboard() {
  const admin = getStoredUser();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  
  // Modals & Toasts
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState({ 
    open: false, 
    type: 'Accepted', 
    booking: null 
  });
  const [toast, setToast] = useState(null);

  // Stats calculation
  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'Pending').length,
    accepted: bookings.filter(b => b.status === 'Accepted').length,
    rejected: bookings.filter(b => b.status === 'Rejected' || b.status === 'Cancelled').length,
  };

  const loadData = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    
    try {
      const data = await fetchBookings();
      if (data.success) {
        setBookings(data.data);
      }
    } catch (error) {
      setToast({ message: error.message, type: 'error' });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Debounce search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleStatusUpdate = async (remark) => {
    const { booking, type } = confirmationModal;
    setRefreshing(true);
    try {
      const data = await updateBookingStatus(booking._id, type, remark);
      if (data.success) {
        // Optimistic UI update: replace the individual booking in the list
        setBookings(prev => prev.map(b => b._id === booking._id ? data.data : b));
        setToast({ message: `Booking ${type.toLowerCase()} successfully!`, type: 'success' });
      }
    } catch (error) {
      setToast({ message: error.message, type: 'error' });
    } finally {
      setRefreshing(false);
      setConfirmationModal({ open: false, type: 'Accepted', booking: null });
    }
  };

  const filteredBookings = bookings.filter(b => {
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    const s = debouncedSearch.toLowerCase();
    const matchesSearch = !s || 
      b.bookingId?.toLowerCase().includes(s) ||
      b.customerName?.toLowerCase().includes(s) ||
      b.phoneNumber?.includes(s) ||
      b.pickupCity?.toLowerCase().includes(s);
    return matchesStatus && matchesSearch;
  });

  if (loading && bookings.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#31468e] border-t-transparent rounded-full animate-spin" />
          <p className="font-black text-[#31468e] uppercase tracking-widest text-sm">Initialising Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 pt-24 md:pt-28">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#31468e] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-100">
                {admin?.name?.charAt(0) || 'A'}
              </div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Logged in as {admin?.name || 'Administrator'}</p>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Booking Central</h1>
            <p className="text-slate-500 font-bold flex items-center gap-2">
              <TrendingUp size={16} className="text-emerald-500" /> 
              Monitoring {bookings.length} total ride operations
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => loadData(true)}
              disabled={refreshing}
              className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-2xl font-black text-slate-600 hover:bg-slate-50 transition-all shadow-sm active:scale-95 disabled:opacity-50"
            >
              <RefreshCw size={18} className={refreshing ? 'animate-spin' : ''} />
              {refreshing ? 'Refreshing...' : 'Refresh Feed'}
            </button>
            <button 
              onClick={logout}
              className="flex items-center gap-2 bg-rose-50 border border-rose-100 px-5 py-3 rounded-2xl font-black text-rose-600 hover:bg-rose-100 transition-all shadow-sm active:scale-95"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Rides', value: stats.total, icon: <BarChart3 />, color: 'text-slate-900', bg: 'bg-white' },
            { label: 'Pending', value: stats.pending, icon: <Clock />, color: 'text-amber-600', bg: 'bg-amber-50/50' },
            { label: 'Confirmed', value: stats.accepted, icon: <CheckCircle2 />, color: 'text-emerald-600', bg: 'bg-emerald-50/50' },
            { label: 'Rejected/Cancelled', value: stats.rejected, icon: <XCircle />, color: 'text-rose-600', bg: 'bg-rose-50/50' },
          ].map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`${s.bg} p-6 rounded-[2rem] border border-slate-200 shadow-sm flex items-center gap-5`}
            >
              <div className={`p-4 rounded-2xl bg-white shadow-sm ${s.color}`}>
                {s.icon}
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
                <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-2 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col lg:flex-row gap-4 items-center overflow-hidden">
          <div className="flex bg-slate-50 p-1 rounded-2xl w-full lg:w-fit overflow-x-auto no-scrollbar">
            {TAB_STATUSES.map(t => (
              <button 
                key={t}
                onClick={() => setStatusFilter(t)}
                className={`px-5 py-2.5 rounded-xl font-black text-sm transition-all whitespace-nowrap ${
                  statusFilter === t 
                    ? 'bg-[#31468e] text-white shadow-lg shadow-blue-200' 
                    : 'text-slate-400 hover:text-slate-600 hover:bg-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          
          <div className="relative flex-1 w-full flex items-center bg-slate-50 rounded-2xl border border-slate-100 px-4 group focus-within:ring-2 focus-within:ring-[#31468e]/10 transition-all">
            <Search size={18} className="text-slate-400 group-focus-within:text-[#31468e] transition-colors" />
            <input 
              type="text"
              placeholder="Search by ID, Name, Phone, or City..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent border-none py-3 px-3 text-sm font-bold text-slate-700 placeholder:text-slate-300 focus:outline-none"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="text-slate-300 hover:text-slate-500">
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Booking ID</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer Details</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type & Location</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Schedule</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <AnimatePresence mode="popLayout">
                  {filteredBookings.map((b) => (
                    <motion.tr 
                      key={b._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      layout
                      className="group hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-8 py-6">
                        <span className="font-black text-slate-900 group-hover:text-[#31468e] transition-colors">
                          {b.bookingId}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="space-y-1">
                          <p className="font-black text-slate-800">{b.customerName}</p>
                          <p className="text-xs font-bold text-slate-400">{b.phoneNumber}</p>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="space-y-1">
                          <p className="font-bold text-slate-700 text-sm flex items-center gap-1.5">
                            <MapPin size={14} className="text-emerald-500" /> {b.pickupCity}
                          </p>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter bg-slate-100 w-fit px-1.5 py-0.5 rounded">
                            {b.tripCategory} • {b.tripType}
                          </p>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                            <Clock size={14} className="text-[#31468e]" /> {b.pickupTime}
                          </p>
                          <p className="text-xs font-bold text-slate-400">{new Date(b.pickupDate).toLocaleDateString()}</p>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <StatusBadge status={b.status} />
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => {
                              setSelectedBooking(b);
                              setDetailModalOpen(true);
                            }}
                            className="p-2.5 bg-slate-100 text-slate-500 hover:bg-[#31468e] hover:text-white rounded-xl transition-all"
                            title="View Details"
                          >
                            <Eye size={18} />
                          </button>
                          
                          {b.status === 'Pending' && (
                            <>
                              <button 
                                onClick={() => setConfirmationModal({ open: true, type: 'Accepted', booking: b })}
                                className="p-2.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white rounded-xl transition-all"
                                title="Accept"
                              >
                                <CheckCircle2 size={18} />
                              </button>
                              <button 
                                onClick={() => setConfirmationModal({ open: true, type: 'Rejected', booking: b })}
                                className="p-2.5 bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white rounded-xl transition-all"
                                title="Reject"
                              >
                                <XCircle size={18} />
                              </button>
                            </>
                          )}
                          
                          {b.status === 'Accepted' && (
                            <button 
                              onClick={() => setConfirmationModal({ open: true, type: 'Completed', booking: b })}
                              className="p-2.5 bg-blue-50 text-blue-600 hover:bg-blue-500 hover:text-white rounded-xl transition-all"
                              title="Mark Completed"
                            >
                              <CheckCircle2 size={18} />
                            </button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          
          {filteredBookings.length === 0 && !loading && (
            <div className="p-20 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                <BarChart3 size={40} />
              </div>
              <div>
                <p className="text-xl font-black text-slate-800">No operations found</p>
                <p className="text-slate-400 font-bold">Try adjusting your filters or search terms.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <ConfirmationModal
        isOpen={confirmationModal.open}
        onClose={() => setConfirmationModal({ open: false, type: 'Accepted', booking: null })}
        onConfirm={handleStatusUpdate}
        title={`${confirmationModal.type} Booking`}
        message={`Confirming this action will update the booking to ${confirmationModal.type}.`}
        confirmText={`Confirm ${confirmationModal.type}`}
        type={confirmationModal.type === 'Rejected' ? 'danger' : 'primary'}
        loading={refreshing}
      />

      <BookingDetailModal 
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        booking={selectedBooking}
      />

      <AnimatePresence>
        {toast && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
