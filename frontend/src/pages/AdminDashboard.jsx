import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, RefreshCw, Eye, CheckCircle2, XCircle,
  MapPin, Clock, BarChart3, TrendingUp, X, LogOut,
  Users, Car, AlertCircle, ChevronRight, Filter
} from "lucide-react";
import { fetchBookings, updateBookingStatus } from "../services/bookingService";
import { getStoredUser, logout } from "../services/authService";
import StatusBadge from "../components/common/StatusBadge";
import Toast from "../components/common/Toast";
import ConfirmationModal from "../components/common/ConfirmationModal";
import BookingDetailModal from "../components/booking/BookingDetailModal";

const TAB_STATUSES = ['All', 'Pending', 'Accepted', 'Rejected', 'Completed', 'Cancelled'];

const STATUS_DOT = {
  Pending: '#f59e0b',
  Accepted: '#10b981',
  Rejected: '#f43f5e',
  Completed: '#3b82f6',
  Cancelled: '#94a3b8',
};

export default function AdminDashboard() {
  const admin = getStoredUser();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState({
    open: false, type: 'Accepted', booking: null
  });
  const [toast, setToast] = useState(null);

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'Pending').length,
    accepted: bookings.filter(b => b.status === 'Accepted').length,
    rejected: bookings.filter(b => b.status === 'Rejected' || b.status === 'Cancelled').length,
    completed: bookings.filter(b => b.status === 'Completed').length,
  };

  const loadData = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    try {
      const data = await fetchBookings();
      if (data.success) setBookings(data.data);
    } catch (error) {
      setToast({ message: error.message, type: 'error' });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(t);
  }, [searchTerm]);

  const handleStatusUpdate = async (remark) => {
    const { booking, type } = confirmationModal;
    setRefreshing(true);
    try {
      const data = await updateBookingStatus(booking._id, type, remark);
      if (data.success) {
        setBookings(prev => prev.map(b => b._id === booking._id ? data.data : b));
        setToast({ 
          message: `Booking successfully marked as ${type}`, 
          type: 'success' 
        });
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

  /* ─── Skeleton loader ─── */
  if (loading && bookings.length === 0) {
    return (
      <div style={styles.page}>
        <div style={styles.topbar}>
          <div style={styles.topbarLeft}>
            <div style={styles.logo}>G</div>
            <span style={styles.logoText}>GhoomWay <span style={styles.logoBadge}>Admin</span></span>
          </div>
        </div>
        <div style={styles.container}>
          <div style={{ ...styles.skeletonBlock, height: 48, width: 260, marginBottom: 8, borderRadius: 12 }} />
          <div style={{ ...styles.skeletonBlock, height: 28, width: 380, marginBottom: 32, borderRadius: 8 }} />
          <div style={styles.statsGrid}>
            {[1,2,3,4].map(i => <div key={i} style={{ ...styles.skeletonBlock, height: 104, borderRadius: 16 }} />)}
          </div>
          <div style={{ ...styles.skeletonBlock, height: 480, borderRadius: 20, marginTop: 24 }} />
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>

      {/* ── Top Navigation Bar ── */}
      <header style={styles.topbar}>
        <div style={styles.topbarLeft}>
          <div style={styles.logo}>G</div>
          <span style={styles.logoText}>GhoomWay <span style={styles.logoBadge}>Admin Dashboard</span></span>
        </div>
        <div style={styles.topbarRight}>
          <button
            onClick={() => loadData(true)}
            disabled={refreshing}
            style={styles.refreshBtn}
            className="admin-btn"
          >
            <RefreshCw size={15} style={{ ...(refreshing ? styles.spin : {}) }} />
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
          <div style={styles.adminChip}>
            <div style={styles.adminAvatar}>{admin?.name?.charAt(0) || 'A'}</div>
            <span style={styles.adminName}>{admin?.name || 'Admin'}</span>
          </div>
          <button onClick={logout} style={styles.logoutBtn} className="admin-btn" title="Logout">
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main style={styles.container}>

        {/* Page heading */}
        <div style={styles.pageHeading}>
          <div>
            <h1 style={styles.h1}>Booking Central</h1>
            <p style={styles.subtext}>
              <TrendingUp size={14} style={{ color: '#10b981', marginRight: 6, flexShrink: 0 }} />
              Monitoring {bookings.length} active bookings
            </p>
          </div>
        </div>

        {/* ── Stat Cards ── */}
        <div style={styles.statsGrid}>
          {[
            { label: "Total Bookings", value: stats.total, icon: <Car size={20} />, accent: '#6366f1', bg: 'rgba(99,102,241,0.08)' },
            { label: "Pending", value: stats.pending, icon: <AlertCircle size={20} />, accent: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
            { label: "Confirmed", value: stats.accepted, icon: <CheckCircle2 size={20} />, accent: '#10b981', bg: 'rgba(16,185,129,0.08)' },
            { label: "Completed", value: stats.completed, icon: <BarChart3 size={20} />, accent: '#3b82f6', bg: 'rgba(59,130,246,0.08)' },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              style={{ ...styles.statCard }}
            >
              <div style={{ ...styles.statIcon, background: s.bg, color: s.accent }}>
                {s.icon}
              </div>
              <div>
                <p style={styles.statLabel}>{s.label}</p>
                <p style={{ ...styles.statValue, color: s.accent }}>{s.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Filter + Search Bar ── */}
        <div style={styles.filterBar}>
          {/* Tab pills */}
          <div style={styles.tabRow}>
            {TAB_STATUSES.map(t_id => (
              <button
                key={t_id}
                onClick={() => setStatusFilter(t_id)}
                style={{
                  ...styles.tab,
                  ...(statusFilter === t_id ? styles.tabActive : {}),
                }}
                className="admin-tab"
              >
                {t_id !== 'All' && (
                  <span style={{
                    ...styles.tabDot,
                    background: STATUS_DOT[t_id] || '#94a3b8',
                    opacity: statusFilter === t_id ? 1 : 0.5,
                  }} />
                )}
                {t_id === 'All' ? 'All Bookings' : t_id}
              </button>
            ))}
          </div>

          {/* Search */}
          <div style={styles.searchWrap}>
            <Search size={16} style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by ID, Name or City..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} style={styles.clearBtn}>
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* ── Results summary ── */}
        <div style={styles.resultsMeta}>
          <Filter size={13} style={{ color: '#94a3b8', marginRight: 6 }} />
          <span style={styles.resultsText}>
            Showing {filteredBookings.length} {filteredBookings.length === 1 ? 'booking' : 'bookings'}
            {statusFilter !== 'All' ? ` · ${statusFilter}` : ''}
          </span>
        </div>

        {/* ── Table ── */}
        <div style={styles.tableCard}>
          <div style={styles.tableScroll}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.thead}>
                  <th style={styles.th}>Booking ID</th>
                  <th style={styles.th}>Customer</th>
                  <th style={styles.th} className="md-hide">Route</th>
                  <th style={styles.th}>Date & Time</th>
                  <th style={styles.th} className="sm-hide">Status</th>
                  <th style={{ ...styles.th, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {filteredBookings.map((b, idx) => (
                    <motion.tr
                      key={b._id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: idx * 0.02 }}
                      style={styles.tr}
                      className="admin-row"
                    >
                      {/* Booking ID */}
                      <td style={styles.td}>
                        <span style={styles.bookingId}>{b.bookingId}</span>
                      </td>

                      {/* Customer */}
                      <td style={styles.td}>
                        <div style={styles.customerWrap}>
                          <div style={styles.customerAvatar}>
                            {b.customerName?.charAt(0) || '?'}
                          </div>
                          <div>
                            <p style={styles.customerName}>{b.customerName}</p>
                            <p style={styles.customerPhone}>{b.phoneNumber}</p>
                          </div>
                        </div>
                      </td>

                      {/* Route – hidden on md */}
                      <td style={styles.td} className="md-hide">
                        <p style={styles.routeCity}>
                          <MapPin size={12} style={{ color: '#10b981', flexShrink: 0 }} />
                          {b.pickupCity}
                        </p>
                        <p style={styles.routeBadge}>
                          {b.tripCategory} · {b.tripType}
                        </p>
                      </td>

                      {/* Date & Time */}
                      <td style={styles.td}>
                        <p style={styles.schedTime}>
                          <Clock size={12} style={{ color: '#6366f1', flexShrink: 0 }} />
                          {b.pickupTime}
                        </p>
                        <p style={styles.schedDate}>{new Date(b.pickupDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                      </td>

                      {/* Status – hidden on sm */}
                      <td style={styles.td} className="sm-hide">
                        <StatusBadge status={b.status} />
                      </td>

                      {/* Actions */}
                      <td style={styles.td}>
                        <div style={styles.actions}>
                          <button
                            onClick={() => { setSelectedBooking(b); setDetailModalOpen(true); }}
                            style={styles.actionBtn}
                            className="action-view"
                            title="View Details"
                          >
                            <Eye size={15} />
                          </button>

                          {b.status === 'Pending' && (
                            <>
                              <button
                                onClick={() => setConfirmationModal({ open: true, type: 'Accepted', booking: b })}
                                style={{ ...styles.actionBtn, ...styles.actionAccept }}
                                className="action-accept"
                                title="Accept Booking"
                              >
                                <CheckCircle2 size={15} />
                              </button>
                              <button
                                onClick={() => setConfirmationModal({ open: true, type: 'Rejected', booking: b })}
                                style={{ ...styles.actionBtn, ...styles.actionReject }}
                                className="action-reject"
                                title="Reject Booking"
                              >
                                <XCircle size={15} />
                              </button>
                            </>
                          )}

                          {b.status === 'Accepted' && (
                            <button
                              onClick={() => setConfirmationModal({ open: true, type: 'Completed', booking: b })}
                              style={{ ...styles.actionBtn, ...styles.actionComplete }}
                              className="action-complete"
                              title="Mark as Completed"
                            >
                              <CheckCircle2 size={15} />
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

          {/* Empty state */}
          {filteredBookings.length === 0 && !loading && (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}><BarChart3 size={36} /></div>
              <p style={styles.emptyTitle}>No matches found</p>
              <p style={styles.emptySubtitle}>Try adjusting your filters or search term</p>
            </div>
          )}
        </div>
      </main>

      {/* ── Modals ── */}
      <ConfirmationModal
        isOpen={confirmationModal.open}
        onClose={() => setConfirmationModal({ open: false, type: 'Accepted', booking: null })}
        onConfirm={handleStatusUpdate}
        title={`Confirm ${confirmationModal.type}`}
        message={`Are you sure you want to mark this booking as ${confirmationModal.type}?`}
        confirmText={`Yes, ${confirmationModal.type}`}
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
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}
      </AnimatePresence>

      {/* ── Scoped styles ── */}
      <style>{`
        * { box-sizing: border-box; }
        .admin-btn:hover { opacity: 0.82; }
        .admin-tab { border: none; cursor: pointer; }
        .admin-tab:hover { background: rgba(99,102,241,0.08) !important; color: #6366f1 !important; }
        .admin-row:hover td { background: rgba(99,102,241,0.03); }
        .action-view:hover  { background: #6366f1 !important; color: #fff !important; }
        .action-accept:hover{ background: #10b981 !important; color: #fff !important; }
        .action-reject:hover{ background: #f43f5e !important; color: #fff !important; }
        .action-complete:hover{ background: #3b82f6 !important; color: #fff !important; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .md-hide { display: none !important; }
        }
        @media (max-width: 540px) {
          .sm-hide { display: none !important; }
        }
        ::-webkit-scrollbar { height: 4px; width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 99px; }
      `}</style>
    </div>
  );
}

/* ─── Design Tokens & Styles ─── */
const styles = {
  page: {
    minHeight: '100vh',
    background: '#f8fafc',
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },

  /* Top bar */
  topbar: {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    height: 64,
    background: '#ffffff',
    borderBottom: '1px solid #e2e8f0',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
  },
  topbarLeft: { display: 'flex', alignItems: 'center', gap: 10 },
  logo: {
    width: 36, height: 36,
    borderRadius: 10,
    background: 'linear-gradient(135deg,#31468e,#6366f1)',
    color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: 900, fontSize: 18,
    boxShadow: '0 2px 8px rgba(99,102,241,0.3)',
  },
  logoText: {
    fontWeight: 800, fontSize: 16, color: '#1e293b', letterSpacing: '-0.3px',
  },
  logoBadge: {
    background: 'linear-gradient(90deg,#6366f1,#31468e)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 900,
  },
  topbarRight: { display: 'flex', alignItems: 'center', gap: 10 },
  refreshBtn: {
    display: 'flex', alignItems: 'center', gap: 6,
    padding: '8px 16px',
    border: '1px solid #e2e8f0',
    borderRadius: 10,
    background: '#fff',
    fontSize: 13, fontWeight: 700, color: '#475569',
    cursor: 'pointer', transition: 'all 0.2s',
  },
  spin: { animation: 'spin 0.8s linear infinite' },
  adminChip: {
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '6px 12px',
    background: '#f1f5f9',
    borderRadius: 999,
  },
  adminAvatar: {
    width: 28, height: 28,
    borderRadius: '50%',
    background: 'linear-gradient(135deg,#31468e,#6366f1)',
    color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: 900, fontSize: 13,
  },
  adminName: { fontSize: 13, fontWeight: 700, color: '#334155' },
  logoutBtn: {
    width: 36, height: 36,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    border: '1px solid #fecdd3',
    borderRadius: 10,
    background: '#fff1f2',
    color: '#f43f5e',
    cursor: 'pointer',
  },

  /* Container */
  container: {
    maxWidth: 1280,
    margin: '0 auto',
    padding: '32px 24px 64px',
  },

  /* Page heading */
  pageHeading: {
    display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
    marginBottom: 28,
  },
  h1: {
    fontSize: 30, fontWeight: 900,
    color: '#0f172a', letterSpacing: '-0.7px', margin: 0,
  },
  subtext: {
    display: 'flex', alignItems: 'center',
    fontSize: 13, fontWeight: 600, color: '#64748b',
    marginTop: 6,
  },

  /* Stats */
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: 16,
    padding: '20px 22px',
    display: 'flex', alignItems: 'center', gap: 16,
    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
  },
  statIcon: {
    width: 46, height: 46, borderRadius: 12,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  statLabel: { fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 },
  statValue: { fontSize: 26, fontWeight: 900, lineHeight: 1 },

  /* Filter bar */
  filterBar: {
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: 16,
    padding: '12px 16px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 12,
    alignItems: 'center',
    marginBottom: 12,
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  },
  tabRow: {
    display: 'flex', gap: 4, flexWrap: 'wrap',
  },
  tab: {
    display: 'flex', alignItems: 'center', gap: 6,
    padding: '7px 14px',
    borderRadius: 8,
    fontSize: 13, fontWeight: 700,
    color: '#64748b',
    background: 'transparent',
    transition: 'all 0.18s',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  tabActive: {
    background: 'linear-gradient(135deg,#31468e,#6366f1)',
    color: '#fff',
    boxShadow: '0 2px 8px rgba(99,102,241,0.25)',
  },
  tabDot: {
    width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
  },
  searchWrap: {
    flex: 1, minWidth: 200,
    display: 'flex', alignItems: 'center',
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: 10,
    padding: '0 12px',
    gap: 8,
  },
  searchIcon: { color: '#94a3b8', flexShrink: 0 },
  searchInput: {
    flex: 1, border: 'none', background: 'transparent',
    padding: '9px 0',
    fontSize: 13, fontWeight: 600,
    color: '#334155',
    outline: 'none',
  },
  clearBtn: {
    background: 'none', border: 'none', cursor: 'pointer',
    color: '#94a3b8', display: 'flex', alignItems: 'center', padding: 2,
  },

  /* Results meta */
  resultsMeta: {
    display: 'flex', alignItems: 'center',
    marginBottom: 12, paddingLeft: 4,
  },
  resultsText: { fontSize: 12, fontWeight: 600, color: '#94a3b8' },

  /* Table card */
  tableCard: {
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: 20,
    overflow: 'hidden',
    boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
  },
  tableScroll: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse' },
  thead: { background: '#f8fafc', borderBottom: '1px solid #f1f5f9' },
  th: {
    padding: '14px 20px',
    fontSize: 10, fontWeight: 800,
    color: '#94a3b8',
    textTransform: 'uppercase', letterSpacing: '0.07em',
    whiteSpace: 'nowrap',
  },
  tr: { borderBottom: '1px solid #f8fafc', transition: 'background 0.15s' },
  td: { padding: '16px 20px', verticalAlign: 'middle' },

  /* Table cell contents */
  bookingId: {
    fontFamily: "'Courier New', monospace",
    fontWeight: 800, fontSize: 13,
    color: '#1e293b',
    background: '#f1f5f9',
    padding: '3px 8px', borderRadius: 6,
  },
  customerWrap: { display: 'flex', alignItems: 'center', gap: 10 },
  customerAvatar: {
    width: 34, height: 34, borderRadius: '50%',
    background: 'linear-gradient(135deg,#e0e7ff,#c7d2fe)',
    color: '#4f46e5',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: 900, fontSize: 14, flexShrink: 0,
  },
  customerName: { fontSize: 13, fontWeight: 800, color: '#1e293b', marginBottom: 2 },
  customerPhone: { fontSize: 11, fontWeight: 600, color: '#94a3b8' },

  routeCity: {
    display: 'flex', alignItems: 'center', gap: 5,
    fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 4,
  },
  routeBadge: {
    display: 'inline-block',
    fontSize: 10, fontWeight: 800,
    color: '#64748b',
    background: '#f1f5f9',
    borderRadius: 4, padding: '2px 6px',
    textTransform: 'uppercase', letterSpacing: '0.04em',
  },
  schedTime: {
    display: 'flex', alignItems: 'center', gap: 5,
    fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 4,
  },
  schedDate: { fontSize: 11, fontWeight: 600, color: '#94a3b8' },

  /* Action buttons */
  actions: { display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6 },
  actionBtn: {
    width: 32, height: 32,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    border: '1px solid #e2e8f0',
    borderRadius: 8,
    background: '#f8fafc',
    color: '#64748b',
    cursor: 'pointer',
    transition: 'all 0.18s',
  },
  actionAccept: { background: '#f0fdf4', borderColor: '#bbf7d0', color: '#10b981' },
  actionReject: { background: '#fff1f2', borderColor: '#fecdd3', color: '#f43f5e' },
  actionComplete: { background: '#eff6ff', borderColor: '#bfdbfe', color: '#3b82f6' },

  /* Empty state */
  emptyState: {
    padding: '72px 24px',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
    textAlign: 'center',
  },
  emptyIcon: {
    width: 72, height: 72, borderRadius: '50%',
    background: '#f1f5f9',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#cbd5e1',
  },
  emptyTitle: { fontSize: 18, fontWeight: 800, color: '#1e293b' },
  emptySubtitle: { fontSize: 14, fontWeight: 600, color: '#94a3b8' },

  /* Skeleton */
  skeletonBlock: {
    background: 'linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.4s infinite',
    borderRadius: 12,
  },
};
