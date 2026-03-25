import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Car, Plane, Briefcase, Map, ShieldCheck, CheckCircle2, Navigation, Clock, Building2, Battery } from "lucide-react";

import img3 from "../../assets/img3.webp";
import img4 from "../../assets/img4.webp";
import img1 from "../../assets/img1.webp";
import img2 from "../../assets/img2.webp";

export default function ServicesPage() {
  const { t } = useTranslation();

  const fleetClasses = [
    { key: "sedan", img: img3 },
    { key: "suv", img: img4 },
    { key: "luxury", img: img1 },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. Services Hero */}
      <section className="relative h-screen flex items-center justify-start overflow-hidden pt-20">
        <img 
          src="/bg-hero.webp" 
          alt={t('pages.innerPages.services.hero.heading')} 
          className="absolute inset-0 w-full h-full object-cover grayscale-[30%]"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/40" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 text-slate-300 font-bold uppercase tracking-wider text-xs mb-6 backdrop-blur-md">
              <Building2 className="w-4 h-4 text-[#f2ca1c]" /> {t('pages.innerPages.services.hero.badge')}
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
              {t('pages.innerPages.services.hero.heading').split(' ')[0]} <span className="text-[#f2ca1c]">{t('pages.innerPages.services.hero.heading').split(' ')[1]}</span> {t('pages.innerPages.services.hero.heading').split(' ').slice(2).join(' ')}
            </h1>
            <p className="text-xl text-slate-300 font-medium leading-relaxed mb-8">
              {t('pages.innerPages.services.hero.subtext')}
            </p>
            <div className="flex gap-4">
              <a href="#services" className="px-8 py-4 bg-[#31468e] text-white rounded-xl font-bold shadow-lg hover:bg-[#20316b] transition-all">
                {t('pages.innerPages.services.hero.exploreBtn')}
              </a>
              <a href="#fleet" className="hidden sm:inline-flex px-8 py-4 bg-white/10 text-white rounded-xl font-bold border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all">
                {t('pages.innerPages.services.hero.viewFleetBtn')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Deep Dive Alternate Blocks */}
      <section id="services" className="py-24 md:py-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto space-y-32">
          
          {/* Outstation Block */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-300/50 order-2 lg:order-1 relative aspect-[4/3]"
            >
              <img src={img1} alt={t('pages.innerPages.services.outstation.heading')} className="w-full h-full object-cover" />
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Map className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-black text-slate-900">{t('booking.tabs.outstation')}</div>
                    <div className="text-xs font-bold text-slate-500 uppercase">{t('booking.options.onewaytrip.title')} & {t('booking.options.roundtrip.title')}</div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 lg:pl-10"
            >
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">{t('pages.innerPages.services.outstation.heading')}</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {t('pages.innerPages.services.outstation.subtext')}
              </p>
              <ul className="space-y-4">
                {t('pages.innerPages.services.outstation.features', { returnObjects: true }).map((item, i) => (
                  <li key={i} className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 items-start">
                    <CheckCircle2 className="w-6 h-6 text-[#f2ca1c] shrink-0 mt-0.5" />
                    <span className="font-medium text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Airport Block */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">{t('pages.innerPages.services.airport.heading')}</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {t('pages.innerPages.services.airport.subtext')}
              </p>
              <ul className="space-y-4">
                {t('pages.innerPages.services.airport.features', { returnObjects: true }).map((item, i) => (
                  <li key={i} className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 items-start">
                    <CheckCircle2 className="w-6 h-6 text-[#31468e] shrink-0 mt-0.5" />
                    <span className="font-medium text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-300/50 relative aspect-[4/3]"
            >
              <img src={img2} alt={t('pages.innerPages.services.airport.heading')} className="w-full h-full object-cover" />
              <div className="absolute bottom-6 left-6 bg-slate-900/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sky-500/20 flex items-center justify-center">
                    <Plane className="w-5 h-5 text-sky-400" />
                  </div>
                  <div>
                    <div className="font-black text-white">{t('booking.options.airporttransfer.title')}</div>
                    <div className="text-xs font-bold text-slate-400 uppercase">{t('pages.innerPages.services.airport.features', { returnObjects: true })[0]}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 3. Corporate & B2B Focus */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#31468e]/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#31468e] mb-8 shadow-lg shadow-[#31468e]/40">
              <Briefcase className="w-8 h-8 text-[#f2ca1c]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6">{t('pages.innerPages.services.corporate.heading')}</h2>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              {t('pages.innerPages.services.corporate.subtext')}
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {Object.entries(t('pages.innerPages.services.corporate.features', { returnObjects: true })).map(([key, feature]) => (
                <div key={key} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                  <h4 className="text-[#f2ca1c] font-bold text-lg mb-2">{feature.title}</h4>
                  <p className="text-sm text-slate-400">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-[3rem] overflow-hidden border-8 border-slate-800">
              <img src="/bg-hero.webp" alt="Corporate Needs" className="w-full h-full object-cover" />
            </div>
            {/* Overlay Stat block */}
             <div className="absolute -bottom-8 -left-8 bg-white text-slate-900 rounded-[2rem] p-8 shadow-2xl z-10 hidden sm:block">
               <div className="text-[#31468e] font-black text-4xl mb-1">{t('pages.innerPages.services.corporate.stats.count')}</div>
               <div className="text-sm uppercase font-bold text-slate-500 tracking-wider">{t('pages.innerPages.services.corporate.stats.label')}</div>
             </div>
          </div>

        </div>
      </section>

      {/* 4. Fleet Overview */}
      <section id="fleet" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">{t('pages.innerPages.services.fleet.heading')}</h2>
            <p className="text-xl text-slate-600">{t('pages.innerPages.services.fleet.subtext')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {fleetClasses.map((vehicle, i) => {
              const details = t(`pages.innerPages.services.fleet.classes.${vehicle.key}`, { returnObjects: true });
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group border border-slate-200 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 transition-all bg-white"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-slate-100 p-8 flex items-center justify-center relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#f2ca1c] rounded-full opacity-10 blur-xl group-hover:opacity-30 transition-opacity" />
                    <img src={vehicle.img} alt={details.name} className="w-full h-full object-contain relative z-10 mix-blend-multiply group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-black text-slate-900 mb-2">{details.name}</h3>
                    <p className="text-slate-500 font-medium mb-6">{details.models}</p>
                    
                    <div className="space-y-4 pt-6 border-t border-slate-100 mb-8">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">{t('pages.innerPages.services.fleet.capacity')}</span>
                        <span className="font-semibold text-slate-700">{details.seats}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">{t('pages.innerPages.services.fleet.luggage')}</span>
                        <span className="font-semibold text-slate-700">{details.bags}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">{t('pages.innerPages.services.fleet.bestFor')}</span>
                        <span className="font-semibold text-[#31468e]">{details.ideal}</span>
                      </div>
                    </div>

                    <button className="w-full py-4 bg-slate-50 text-slate-900 rounded-xl font-bold hover:bg-[#31468e] hover:text-white transition-colors">
                      {t('pages.innerPages.services.fleet.requestBtn')}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
