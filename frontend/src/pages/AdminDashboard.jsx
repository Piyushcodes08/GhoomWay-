import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Search, Clock, MapPin, User, Car } from "lucide-react";

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/bookings');
      const data = await res.json();
      if (data.success) {
        setRequests(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/v1/bookings/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      
      if (data.success) {
        // Optimistically update UI
        setRequests(prev => prev.map(req => req._id === id ? { ...req, status: newStatus } : req));
        alert(`Request ${newStatus}!`);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update status.");
    }
  };

  const filteredData = filter === "All" ? requests : requests.filter(r => r.status === filter);

  if (loading) return <div className="h-screen flex items-center justify-center bg-slate-50"><div className="w-10 h-10 border-4 border-[#31468e] border-t-transparent rounded-full animate-spin"/></div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6 pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Admin Dispatch</h1>
            <p className="text-slate-500 font-medium">Manage incoming ride requests and WhatsApp triggers.</p>
          </div>
          
          <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200">
            {['All', 'Pending', 'Accepted', 'Rejected'].map(f => (
              <button 
                key={f} 
                onClick={() => setFilter(f)}
                className={`px-4 py-2 ${filter === f ? 'bg-[#31468e] text-white' : 'text-slate-600 hover:bg-slate-50'} font-bold rounded-lg transition-colors text-sm`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          {filteredData.map(req => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={req._id} 
              className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-200 flex flex-col lg:flex-row gap-6 justify-between items-start"
            >
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${
                    req.status === 'Accepted' ? 'bg-emerald-100 text-emerald-700' :
                    req.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {req.status}
                  </span>
                  <span className="text-slate-400 font-bold text-sm">ID: {req.bookingId}</span>
                  <span className="text-slate-400 font-bold text-sm bg-slate-100 px-2 py-1 rounded-md">{req.tripCategory} ({req.tripType})</span>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="flex items-center gap-2 text-slate-700 font-bold text-lg">
                      <User size={18} className="text-[#31468e]" /> {req.customerName}
                    </p>
                    <p className="text-slate-500 font-medium pl-6 block">{req.phoneNumber}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="flex items-center gap-2 text-slate-700 font-bold text-lg">
                      <Clock size={18} className="text-[#31468e]" /> {new Date(req.pickupDate).toLocaleDateString()}
                    </p>
                    <p className="text-slate-500 font-medium pl-6 block">{req.pickupTime}</p>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <div className="flex items-start gap-3 mb-3">
                    <MapPin size={18} className="text-emerald-500 mt-1 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase">Pickup Location</p>
                      <p className="font-bold text-slate-800">{req.pickupCity}</p>
                    </div>
                  </div>
                  {req.dropCity && (
                    <div className="flex items-start gap-3 mb-3">
                      <MapPin size={18} className="text-rose-500 mt-1 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase">Drop Location</p>
                        <p className="font-bold text-slate-800">{req.dropCity}</p>
                      </div>
                    </div>
                  )}
                  {req.rentalPackage && (
                    <div className="flex items-start gap-3">
                      <Clock size={18} className="text-indigo-500 mt-1 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase">Local Package</p>
                        <p className="font-bold text-slate-800">{req.rentalPackage}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <p className="text-sm font-bold text-slate-600 flex items-center gap-2">
                  <Car size={16} /> Category: <span className="text-slate-900">{req.cabCategory}</span> • {req.passengers}
                </p>
              </div>

              {req.status === 'Pending' && (
                <div className="flex lg:flex-col gap-3 w-full lg:w-48 shrink-0">
                  <button 
                    onClick={() => updateStatus(req._id, 'Accepted')}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 size={18} /> Accept
                  </button>
                  <button 
                    onClick={() => updateStatus(req._id, 'Rejected')}
                    className="flex-1 bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <XCircle size={18} /> Reject
                  </button>
                </div>
              )}
            </motion.div>
          ))}
          {filteredData.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-400 font-bold text-xl">No {filter !== 'All' ? filter : ''} requests found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
