import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  MapPin,
  Smartphone,
  Calendar,
  Clock,
  Users,
  Car,
  Navigation,
  ChevronDown,
  User,
  CheckCircle2,
  Loader2
} from "lucide-react";

import { bookingTabs as tabs, outstationOptions, localOptions } from "../../constants/data.jsx";
import { createBooking as apiCreateBooking } from "../../services/bookingService";

export default function CabBooking() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("Outstation");
  const [tripType, setTripType] = useState("Round Trip");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorStatus, setErrorStatus] = useState(null);

  // Custom AM/PM time picker state
  const [timeHour, setTimeHour] = useState("");
  const [timeMinute, setTimeMinute] = useState("00");
  const [timePeriod, setTimePeriod] = useState("AM");
  
  // Controlled Form State
  const [formData, setFormData] = useState({
    pickupCity: "",
    dropCity: "",
    rentalPackage: "8 Hrs | 80 Kms",
    pickupDate: "",
    returnDate: "",
    pickupTime: "",
    cabCategory: "Sedan (Dzire/Etios) - 4 Seater",
    passengers: "1-4 Persons",
    customerName: "",
    phoneNumber: ""
  });

  useEffect(() => {
    setTripType(activeTab === "Outstation" ? "Round Trip" : "Local Rental");
    setFormData(prev => ({
      ...prev,
      dropCity: "",
      rentalPackage: "8 Hrs | 80 Kms"
    }));
    setErrorStatus(null);
  }, [activeTab]);

  const currentOptions = activeTab === "Outstation" ? outstationOptions : localOptions;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setErrorStatus(null);
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Sync hour/minute/period → formData.pickupTime as "HH:MM AM/PM"
  const syncPickupTime = (h, m, p) => {
    if (!h) return;
    const formatted = `${h}:${m} ${p}`;
    setFormData(prev => ({ ...prev, pickupTime: formatted }));
  };

  const handleHourChange = (e) => {
    const h = e.target.value;
    setTimeHour(h);
    syncPickupTime(h, timeMinute, timePeriod);
  };
  const handleMinuteChange = (e) => {
    const m = e.target.value;
    setTimeMinute(m);
    syncPickupTime(timeHour, m, timePeriod);
  };
  const handlePeriodChange = (p) => {
    setTimePeriod(p);
    syncPickupTime(timeHour, timeMinute, p);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorStatus(null);

    // Frontend validation
    if (formData.phoneNumber.replace(/\D/g, "").length !== 10) {
      setErrorStatus(t('booking.form.phoneError'));
      setIsLoading(false);
      return;
    }

    try {
      const payload = {
        tripCategory: activeTab,
        tripType: tripType,
        pickupCity: formData.pickupCity,
        dropCity: formData.dropCity || undefined,
        rentalPackage: formData.rentalPackage || undefined,
        pickupDate: formData.pickupDate,
        returnDate: formData.returnDate || undefined,
        pickupTime: formData.pickupTime,
        cabCategory: formData.cabCategory,
        passengers: formData.passengers,
        customerName: formData.customerName,
        phoneNumber: formData.phoneNumber.replace(/\D/g, "")
      };

      const data = await apiCreateBooking(payload);
      
      if (data.success) {
        setShowSuccess(true);
        setTimeHour(''); setTimeMinute('00'); setTimePeriod('AM');
        // Reset form on success
        setFormData({
          pickupCity: "",
          dropCity: "",
          rentalPackage: "8 Hrs | 80 Kms",
          pickupDate: "",
          returnDate: "",
          pickupTime: "",
          cabCategory: "Sedan (Dzire/Etios) - 4 Seater",
          passengers: "1-4 Persons",
          customerName: "",
          phoneNumber: ""
        });
      }
    } catch (error) {
      console.error('[Booking Submit Error]', error);
      setErrorStatus(error.message || t('booking.form.serverError'));
    } finally {
      setIsLoading(false);
    }
  };


  const closeSuccessModal = () => {
    setShowSuccess(false);
    setTimeHour(''); setTimeMinute('00'); setTimePeriod('AM');
    setFormData({
      pickupCity: "",
      dropCity: "",
      rentalPackage: "8 Hrs | 80 Kms",
      pickupDate: "",
      returnDate: "",
      pickupTime: "",
      cabCategory: "Sedan (Dzire/Etios) - 4 Seater",
      passengers: "1-4 Persons",
      customerName: "",
      phoneNumber: ""
    });
  };

  return (
    <div className="relative w-full max-w-6xl overflow-visible rounded-none sm:rounded-[32px] border-y sm:border-x border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-6 md:p-8">
      
      {/* SUCCESS MODAL */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-[2rem] p-8 max-w-md w-full text-center shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-[#f2ca1c]" />
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">{t('booking.success.title')}</h3>
              <p className="text-slate-600 font-medium leading-relaxed mb-8 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                {t('booking.success.message')}
              </p>
              <button 
                onClick={closeSuccessModal}
                className="w-full bg-[#31468e] text-white font-bold py-4 rounded-xl hover:bg-[#20316b] transition-colors"
              >
                {t('booking.success.btn')}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full">
        {/* Header Ribbon */}
        <div className="mb-6 rounded-[24px] border border-[#31468e]/10 bg-gradient-to-r from-[#31468e] via-[#3d56aa] to-[#31468e] p-[1px] shadow-[0_10px_28px_rgba(49,70,142,0.16)]">
          <div className="rounded-[23px] bg-[linear-gradient(135deg,#31468e_0%,#3d56aa_100%)] px-5 py-5 text-center text-white">
            <p className="mb-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-white/75">
              {t('booking.premiumRibbon')}
            </p>
            <h2 className="text-xl font-black sm:text-2xl lg:text-3xl tracking-tight">
              {t('booking.allIndia')}
            </h2>
          </div>
        </div>

        {/* Top Tabs */}
        <div className="mb-6 rounded-2xl border border-slate-200/70 bg-slate-100/80 p-1.5">
          <div className="grid grid-cols-2 gap-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              const tabKey = tab.toLowerCase().split(' / ')[0]; // 'outstation' or 'local'
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`relative overflow-hidden rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300 sm:text-base ${
                    isActive
                      ? "bg-[#31468e] text-white shadow-[0_8px_20px_rgba(49,70,142,0.20)]"
                      : "text-slate-600 hover:bg-white hover:text-[#31468e]"
                  }`}
                >
                  {t(`booking.tabs.${tabKey}`, tab)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Trip Types Selection */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {currentOptions.map((type) => {
            const isSelected = tripType === type.title;
            const optionKey = type.title.toLowerCase().replace(/\s+/g, '');
            return (
              <button
                key={type.title}
                type="button"
                onClick={() => setTripType(type.title)}
                className={`group relative overflow-hidden rounded-[24px] border p-5 text-left transition-all duration-300 ${
                  isSelected
                    ? "border-[#31468e]/20 bg-gradient-to-br from-[#31468e] to-[#425cb8] text-white shadow-[0_14px_28px_rgba(49,70,142,0.18)]"
                    : "border-slate-200 bg-white text-slate-800 hover:border-[#31468e]/30 hover:shadow-[0_10px_24px_rgba(15,23,42,0.05)]"
                }`}
              >
                <div className="relative z-10 flex items-start gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${
                      isSelected
                        ? "border-white/20 bg-white/10 text-white"
                        : "border-[#31468e]/10 bg-[#31468e]/5 text-[#31468e]"
                    }`}
                  >
                    {type.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="mb-1 flex items-center justify-between gap-3">
                      <h3 className="text-base font-bold sm:text-lg truncate">{t(`booking.options.${optionKey}.title`, type.title)}</h3>
                      <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${isSelected ? "border-white bg-white" : "border-slate-300 bg-transparent"}`}>
                        {isSelected && <div className="h-2.5 w-2.5 rounded-full bg-[#31468e]" />}
                      </div>
                    </div>
                    <p className={`text-xs sm:text-sm leading-relaxed ${isSelected ? "text-white/80" : "text-slate-500"}`}>
                      {t(`booking.options.${optionKey}.subtitle`, type.subtitle)}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="w-full h-px bg-slate-200 mb-8" />

        {/* REAL FORM */}
        <form onSubmit={handleBookingSubmit}>
          <AnimatePresence mode="wait">
            <motion.div
              key={tripType}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              
              {/* Pickup Location */}
              <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50/50 p-3 shadow-sm transition-all focus-within:border-[#31468e]/50 focus-within:bg-white focus-within:ring-4 focus-within:ring-[#31468e]/5">
                <label className="mb-1.5 ml-1 block text-[10px] font-black uppercase tracking-widest text-slate-500">{t('booking.form.pickupCity')}</label>
                <div className="flex items-center text-slate-700">
                  <MapPin size={18} className="mr-2 text-[#31468e] shrink-0" />
                  <input
                    type="text"
                    name="pickupCity"
                    value={formData.pickupCity}
                    onChange={handleInputChange}
                    required
                    placeholder={t('booking.form.pickupCityPlaceholder')}
                    className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 font-bold"
                  />
                </div>
              </div>

              {/* Drop Location */}
              {tripType !== "Local Rental" && (
                <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50/50 p-3 shadow-sm transition-all focus-within:border-[#31468e]/50 focus-within:bg-white focus-within:ring-4 focus-within:ring-[#31468e]/5">
                  <label className="mb-1.5 ml-1 block text-[10px] font-black uppercase tracking-widest text-slate-500">{t('booking.form.dropCity')}</label>
                  <div className="flex items-center text-slate-700">
                    <Navigation size={18} className="mr-2 text-[#31468e] shrink-0" />
                    <input
                      type="text"
                      name="dropCity"
                      value={formData.dropCity}
                      onChange={handleInputChange}
                      required
                      placeholder={tripType === "Airport Transfer" ? t('booking.form.dropCityPlaceholderAirport') : t('booking.form.dropCityPlaceholderCity')}
                      className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 font-bold"
                    />
                  </div>
                </div>
              )}

              {/* Package / Hours */}
              {tripType === "Local Rental" && (
                <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50/50 p-3 shadow-sm transition-all focus-within:border-[#31468e]/50 focus-within:bg-white focus-within:ring-4 focus-within:ring-[#31468e]/5">
                  <label className="mb-1.5 ml-1 block text-[10px] font-black uppercase tracking-widest text-slate-500">{t('booking.form.rentalPackage')}</label>
                  <div className="relative flex items-center text-slate-700">
                    <Clock size={18} className="mr-2 text-[#31468e] shrink-0" />
                    <select name="rentalPackage" value={formData.rentalPackage} onChange={handleInputChange} className="w-full bg-transparent text-sm outline-none font-bold cursor-pointer appearance-none">
                      <option value="8 Hrs | 80 Kms">{t('booking.packages.8hrs')}</option>
                      <option value="12 Hrs | 120 Kms">{t('booking.packages.12hrs')}</option>
                      <option value="24 Hrs | Unlimited">{t('booking.packages.24hrs')}</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-0 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              )}

              {/* Pickup Date */}
              <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50/50 p-3 shadow-sm transition-all focus-within:border-[#31468e]/50 focus-within:bg-white focus-within:ring-4 focus-within:ring-[#31468e]/5">
                <label className="mb-1.5 ml-1 block text-[10px] font-black uppercase tracking-widest text-slate-500">{t('booking.form.pickupDate')}</label>
                <div className="flex items-center text-slate-700 relative">
                  <Calendar size={18} className="mr-2 text-[#31468e] shrink-0" />
                  <input
                    type="date"
                    name="pickupDate"
                    value={formData.pickupDate}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-transparent text-sm outline-none font-bold cursor-pointer"
                  />
                </div>
              </div>

              {/* Return Date */}
              {tripType === "Round Trip" && (
                <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50/50 p-3 shadow-sm transition-all focus-within:border-[#31468e]/50 focus-within:bg-white focus-within:ring-4 focus-within:ring-[#31468e]/5">
                  <label className="mb-1.5 ml-1 block text-[10px] font-black uppercase tracking-widest text-slate-500">{t('booking.form.returnDate')}</label>
                  <div className="flex items-center text-slate-700 relative">
                    <Calendar size={18} className="mr-2 text-[#31468e] shrink-0" />
                    <input
                      type="date"
                      name="returnDate"
                      value={formData.returnDate}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-transparent text-sm outline-none font-bold cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* Pickup Time — custom AM/PM picker */}
              <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50/50 p-3 shadow-sm transition-all focus-within:border-[#31468e]/50 focus-within:bg-white focus-within:ring-4 focus-within:ring-[#31468e]/5">
                <label className="mb-1.5 ml-1 block text-[10px] font-black uppercase tracking-widest text-slate-500">{t('booking.form.pickupTime')}</label>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Clock size={18} className="text-[#31468e] shrink-0" />

                  {/* Hour */}
                  <select
                    value={timeHour}
                    onChange={handleHourChange}
                    required
                    className="bg-transparent text-sm font-bold outline-none cursor-pointer"
                  >
                    <option value="" disabled>HH</option>
                    {[...Array(12)].map((_, i) => {
                      const h = String(i + 1).padStart(2, '0');
                      return <option key={h} value={h}>{h}</option>;
                    })}
                  </select>

                  <span className="font-black text-slate-400 text-sm">:</span>

                  {/* Minute */}
                  <select
                    value={timeMinute}
                    onChange={handleMinuteChange}
                    className="bg-transparent text-sm font-bold outline-none cursor-pointer"
                  >
                    {['00','15','30','45'].map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>

                  {/* AM / PM Toggle */}
                  <div className="ml-auto flex rounded-lg overflow-hidden border border-slate-200">
                    {['AM','PM'].map(p => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => handlePeriodChange(p)}
                        className={`px-2.5 py-1 text-xs font-black transition-all ${
                          timePeriod === p
                            ? 'bg-[#31468e] text-white'
                            : 'bg-white text-slate-400 hover:text-[#31468e]'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Car Type */}
              <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50/50 p-3 shadow-sm transition-all focus-within:border-[#31468e]/50 focus-within:bg-white focus-within:ring-4 focus-within:ring-[#31468e]/5">
                <label className="mb-1.5 ml-1 block text-[10px] font-black uppercase tracking-widest text-slate-500">{t('booking.form.cabCategory')}</label>
                <div className="relative flex items-center text-slate-700">
                  <Car size={18} className="mr-2 text-[#31468e] shrink-0" />
                  <select name="cabCategory" value={formData.cabCategory} onChange={handleInputChange} className="w-full bg-transparent text-sm outline-none font-bold cursor-pointer appearance-none">
                    <option value="Hatchback (Mini) - 4 Seater">{t('booking.categories.hatchback')}</option>
                    <option value="Sedan (Dzire/Etios) - 4 Seater">{t('booking.categories.sedan')}</option>
                    <option value="SUV (Ertiga/Innova) - 6 Seater">{t('booking.categories.suv')}</option>
                    <option value="Premium SUV (Innova Crysta) - 7 Seater">{t('booking.categories.premiumsuv')}</option>
                    <option value="Tempo Traveller - 12+ Seater">{t('booking.categories.tempotraveller')}</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-0 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Passengers */}
              <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50/50 p-3 shadow-sm transition-all focus-within:border-[#31468e]/50 focus-within:bg-white focus-within:ring-4 focus-within:ring-[#31468e]/5">
                <label className="mb-1.5 ml-1 block text-[10px] font-black uppercase tracking-widest text-slate-500">{t('booking.form.passengers')}</label>
                <div className="relative flex items-center text-slate-700">
                  <Users size={18} className="mr-2 text-[#31468e] shrink-0" />
                  <select name="passengers" value={formData.passengers} onChange={handleInputChange} className="w-full bg-transparent text-sm outline-none font-bold cursor-pointer appearance-none">
                    <option value="1-4 Persons">{t('booking.passengersCount.1-4')}</option>
                    <option value="5-6 Persons">{t('booking.passengersCount.5-6')}</option>
                    <option value="7-9 Persons">{t('booking.passengersCount.7-9')}</option>
                    <option value="10+ Persons">{t('booking.passengersCount.10+')}</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-0 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Full Name */}
              <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50/50 p-3 shadow-sm transition-all focus-within:border-[#31468e]/50 focus-within:bg-white focus-within:ring-4 focus-within:ring-[#31468e]/5">
                <label className="mb-1.5 ml-1 block text-[10px] font-black uppercase tracking-widest text-slate-500">{t('booking.form.name')}</label>
                <div className="flex items-center text-slate-700">
                  <User size={18} className="mr-2 text-[#31468e] shrink-0" />
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    required
                    placeholder={t('booking.form.namePlaceholder')}
                    className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 font-bold"
                  />
                </div>
              </div>

              {/* Mobile Number */}
              <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50/50 p-3 shadow-sm transition-all focus-within:border-[#31468e]/50 focus-within:bg-white focus-within:ring-4 focus-within:ring-[#31468e]/5">
                <label className="mb-1.5 ml-1 block text-[10px] font-black uppercase tracking-widest text-slate-500">{t('booking.form.mobile')}</label>
                <div className="flex items-center text-slate-700">
                  <Smartphone size={18} className="mr-2 text-[#31468e] shrink-0" />
                  <span className="text-sm font-bold border-r border-slate-300 pr-2 mr-2">+91</span>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                    placeholder={t('booking.form.mobilePlaceholder')}
                    className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 font-bold"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {errorStatus && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 text-sm font-bold flex items-center gap-3 shadow-sm"
            >
              <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              {errorStatus}
            </motion.div>
          )}

          {/* CTA Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full overflow-hidden rounded-[1.5rem] bg-[linear-gradient(135deg,#31468e_0%,#3f58b2_60%,#31468e_100%)] px-6 py-5 text-base font-black tracking-wide text-white shadow-[0_14px_30px_rgba(49,70,142,0.20)] transition-all sm:text-lg mt-4 hover:opacity-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >

            <span className="relative z-10 flex items-center justify-center gap-3">
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5 text-[#f2ca1c]" /> 
                  {t('booking.form.submitting')}
                </>
              ) : (
                t('booking.form.submit')
              )}
            </span>
          </button>
        </form>

      </div>
    </div>
  );
}