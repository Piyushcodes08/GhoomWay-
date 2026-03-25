import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MapPin, Phone, Mail, Clock, Send, ShieldCheck, Briefcase, TrendingUp, Handshake, Car } from "lucide-react";


export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        <img 
          src="/bg-hero.webp" 
          alt={t('pages.innerPages.contact.hero.title')} 
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-slate-900/80" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto mt-16">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight"
          >
            {t('pages.innerPages.contact.hero.title').split(' ').slice(0, 2).join(' ')} <span className="text-[#f2ca1c]">{t('pages.innerPages.contact.hero.title').split(' ').slice(2).join(' ')}</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-300 font-medium"
          >
            {t('pages.innerPages.contact.hero.subtext')}
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-32 px-4 md:px-6 max-w-7xl mx-auto z-20 relative -mt-16">
        <div className="grid lg:grid-cols-5 gap-10">
          
          {/* Contact Info (Side) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-[#31468e] rounded-[2.5rem] p-8 md:p-10 text-white shadow-2xl shadow-[#31468e]/30 overflow-hidden relative">
              {/* Accents */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#f2ca1c]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

              <h2 className="text-3xl font-black mb-8 relative z-10">{t('pages.innerPages.contact.details.title')}</h2>
              
              <ul className="space-y-8 relative z-10">
                <li className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                    <Phone className="w-5 h-5 text-[#f2ca1c]" />
                  </div>
                  <div>
                    <h4 className="text-slate-300 text-sm font-bold uppercase tracking-widest mb-1">{t('pages.innerPages.contact.details.support.title')}</h4>
                    <p className="text-xl font-bold">+91 98765 43210</p>
                    <p className="text-sm text-slate-300 mt-1">{t('pages.innerPages.contact.details.support.partnerHelp')}: +91 99887 76655</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                    <Mail className="w-5 h-5 text-[#f2ca1c]" />
                  </div>
                  <div>
                    <h4 className="text-slate-300 text-sm font-bold uppercase tracking-widest mb-1">{t('pages.innerPages.contact.details.email.title')}</h4>
                    <p className="text-lg font-medium">bookings@ghoomway.com</p>
                    <p className="text-sm text-slate-300 mt-1">partners@ghoomway.com</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                    <MapPin className="w-5 h-5 text-[#f2ca1c]" />
                  </div>
                  <div>
                    <h4 className="text-slate-300 text-sm font-bold uppercase tracking-widest mb-1">{t('pages.innerPages.contact.details.office.title')}</h4>
                    <p className="text-lg font-medium leading-relaxed">{t('pages.innerPages.contact.details.office.address')}</p>
                  </div>
                </li>
              </ul>
            </div>
            
            {/* Quick Partner Pitch CTA */}
            <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-xl">
               <div className="w-12 h-12 rounded-xl bg-[#f2ca1c]/20 flex items-center justify-center mb-4">
                 <Briefcase className="w-6 h-6 text-[#f2ca1c] fill-[#fceb9e]" />
               </div>
               <h3 className="text-xl font-black text-slate-900 mb-2">{t('pages.innerPages.contact.pitch.title')}</h3>
               <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                 {t('pages.innerPages.contact.pitch.desc')}
               </p>
            </div>
          </motion.div>

          {/* Unified Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100"
          >
            <div className="mb-10 text-center sm:text-left">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">{t('pages.innerPages.contact.form.heading')}</h2>
              <p className="text-slate-500 text-lg">{t('pages.innerPages.contact.form.subtext')}</p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">{t('pages.innerPages.contact.form.nameLabel')}</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#31468e] focus:border-transparent transition-all font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">{t('pages.innerPages.contact.form.emailLabel')}</label>
                  <input type="email" placeholder="john@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#31468e] focus:border-transparent transition-all font-medium" />
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">{t('pages.innerPages.contact.form.phoneLabel')}</label>
                  <input type="tel" placeholder="+91" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#31468e] focus:border-transparent transition-all font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">{t('pages.innerPages.contact.form.subjectLabel')}</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#31468e] focus:border-transparent transition-all font-medium appearance-none">
                    {t('pages.innerPages.contact.form.subjects', { returnObjects: true }).map((subj, idx) => (
                      <option key={idx} className={idx === 3 ? "font-bold text-[#31468e]" : ""}>{subj}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">{t('pages.innerPages.contact.form.messageLabel')}</label>
                <textarea rows="5" placeholder={t('pages.innerPages.contact.form.messagePlaceholder')} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#31468e] focus:border-transparent transition-all font-medium resize-none"></textarea>
              </div>

              <button className="w-full sm:w-auto px-10 py-4 bg-[#31468e] hover:bg-[#20316b] text-white rounded-xl font-bold transition-all shadow-lg shadow-[#31468e]/30 flex items-center justify-center gap-2 group">
                {t('pages.innerPages.contact.form.submitBtn')}
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Corporate Partner / Driver Onboarding Section */}
      <section className="py-20 md:py-32 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
        {/* Decorative Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f2ca1c]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#31468e]/30 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f2ca1c]/10 border border-[#f2ca1c]/20 text-[#f2ca1c] font-bold uppercase tracking-widest text-[11px] mb-6">
              {t('pages.innerPages.contact.onboarding.badge')}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 tracking-tight">
              {t('pages.innerPages.contact.onboarding.heading').split('GhoomWay')[0]} <span className="text-[#f2ca1c]">GhoomWay</span> {t('pages.innerPages.contact.onboarding.heading').split('GhoomWay')[1]}
            </h2>
            <p className="text-xl font-medium text-slate-300 mb-8 border-l-4 border-[#31468e] pl-4">
              {t('pages.innerPages.contact.onboarding.subtext')}
            </p>
            <div className="space-y-6">
              {t('pages.innerPages.contact.onboarding.benefits', { returnObjects: true }).map((benefit, i) => {
                const Icons = [TrendingUp, ShieldCheck, Handshake];
                const Icon = Icons[i];
                return (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <Icon className="text-[#f2ca1c] w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg mb-1">{benefit.title}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{benefit.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Registration Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 w-full"
          >
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#31468e]/10 rounded-2xl mx-auto flex items-center justify-center mb-6">
                  <Car className="w-8 h-8 text-[#31468e]" />
                </div>
                <h3 className="text-3xl font-black text-slate-900">{t('pages.innerPages.contact.onboarding.form.title')}</h3>
                <p className="text-sm font-bold text-slate-500 mt-2">{t('pages.innerPages.contact.onboarding.form.subtitle')}</p>
              </div>
              
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-1.5">
                  <label className="block text-slate-500 text-[10px] font-black uppercase tracking-widest ml-1">{t('pages.innerPages.contact.onboarding.form.ownerLabel')}</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#31468e] transition-all font-medium" placeholder="E.g. Ramesh Kumar" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-slate-500 text-[10px] font-black uppercase tracking-widest ml-1">{t('pages.innerPages.contact.onboarding.form.phoneLabel')}</label>
                    <input type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#31468e] transition-all font-medium" placeholder="+91" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-slate-500 text-[10px] font-black uppercase tracking-widest ml-1">{t('pages.innerPages.contact.onboarding.form.cityLabel')}</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#31468e] transition-all font-medium" placeholder="E.g. Delhi NCR" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-slate-500 text-[10px] font-black uppercase tracking-widest ml-1">{t('pages.innerPages.contact.onboarding.form.vehicleLabel')}</label>
                  <select defaultValue="" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#31468e] transition-all font-medium appearance-none">
                    <option value="" disabled>{t('pages.innerPages.contact.onboarding.form.vehiclePlaceholder')}</option>
                    {Object.entries(t('pages.innerPages.contact.onboarding.form.vehicleTypes', { returnObjects: true })).map(([val, label]) => (
                      <option key={val} value={val}>{label}</option>
                    ))}
                  </select>
                </div>

                <div className="pt-2">
                  <button type="submit" className="w-full bg-[#31468e] hover:bg-[#20316b] text-white font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2 group text-lg shadow-lg shadow-[#31468e]/30">
                    {t('pages.innerPages.contact.onboarding.form.applyBtn')} <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
