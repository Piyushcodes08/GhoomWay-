import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Clock, ArrowRight, Star, CheckCircle2, Compass, Navigation } from "lucide-react";
import { popularCities, destinationsPageHero, featuredRoutes } from "../../constants/data.jsx";
export default function DestinationsPage() {
  return (
    <div className="bg-slate-50 min-h-screen">

      {/* 1. Cinematic Hero */}
      <section className="relative h-screen flex items-center justify-start overflow-hidden pt-20">
        <img
          src="/bg-hero.webp"
          alt="Ghoomway Premium Journey"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/70 to-transparent" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-[15px] sm:px-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#f2ca1c] font-black uppercase tracking-[0.2em] text-[10px] mb-6 backdrop-blur-md">
              <destinationsPageHero.badgeIcon className="w-4 h-4" /> {destinationsPageHero.badge}
            </div>
            <h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tight"
              dangerouslySetInnerHTML={{ __html: destinationsPageHero.titleHtml }}
            />
            <p className="text-xl text-slate-200 font-medium leading-relaxed mb-10 max-w-xl">
              {destinationsPageHero.description}
            </p>
            <div className="bg-white/10 backdrop-blur-md p-2 rounded-none sm:rounded-2xl flex max-w-lg border border-white/20 shadow-2xl">
              <input
                type="text"
                placeholder="Where do you want to go?"
                className="w-full bg-transparent border-none text-white px-4 focus:outline-none placeholder:text-white/60 font-medium"
              />
              <button className="px-8 py-3 bg-[#f2ca1c] text-slate-900 rounded-none sm:rounded-xl font-black hover:bg-white transition-all whitespace-nowrap shadow-lg">
                Search Route
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Signature Itineraries */}
      <section className="py-[50px] md:py-32 px-[15px] md:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 pt-8 border-t border-slate-200">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
              Signature <span className="text-[#31468e]">Itineraries</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed font-medium">
              Handpicked road-trip packages combining popular tourist circuits with our elite fleet and expert highway chauffeurs.
            </p>
          </div>
          <Link
            to="/contact"
            className="whitespace-nowrap px-8 py-4 rounded-none sm:rounded-2xl border-2 border-[#31468e] text-[#31468e] font-black hover:bg-[#31468e] hover:text-white transition-all shadow-xl shadow-[#31468e]/10"
          >
            Download E-Brochure
          </Link>
        </div>

        <div className="space-y-12">
          {featuredRoutes.map((route, i) => (
            <motion.div
              key={route.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-none sm:rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 bg-white flex flex-col h-full lg:flex-row"
            >
              <div className="lg:w-2/5 relative overflow-hidden h-[350px] lg:h-auto">
                <img
                  src={route.image}
                  alt={route.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full flex items-center gap-2 font-black shadow-xl text-slate-900 text-sm">
                  <Star className="w-4 h-4 text-[#f2ca1c] fill-[#f2ca1c]" /> 4.9 Superb
                </div>
              </div>

              <div className="lg:w-3/5 p-8 md:p-14 flex flex-col justify-between bg-white">
                <div>
                  <div className="flex flex-wrap items-center gap-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded-lg">
                      <Clock className="w-3.5 h-3.5" /> {route.duration}
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded-lg">
                      <MapPin className="w-3.5 h-3.5" /> {route.distance}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
                    {route.title}
                  </h3>
                  <p className="text-[#31468e] font-black mb-8 flex items-center gap-2 text-lg">
                    <MapPin className="w-6 h-6 shrink-0" /> {route.route}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4 mb-10">
                    {route.highlights.map((hlt, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 text-slate-600 font-bold bg-slate-50/50 p-3 rounded-none sm:rounded-xl border border-slate-100/50"
                      >
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                        {hlt}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between pt-10 border-t border-slate-100 gap-8">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Package Starting at</p>
                    <p className="text-4xl font-black text-slate-900 tracking-tighter">{route.price}</p>
                    <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase">Per Sedan (excl. taxes &amp; tolls)</p>
                  </div>
                  <Link
                    to="/contact"
                    className="w-full sm:w-auto px-10 py-5 bg-[#f2ca1c] text-slate-900 rounded-none sm:rounded-2xl font-black hover:bg-slate-900 hover:text-white transition-all shadow-xl shadow-[#f2ca1c]/30 flex items-center justify-center gap-3 text-lg"
                  >
                    Request Quote <ArrowRight className="w-6 h-6" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Nationwide Coverage */}
      <section className="py-[50px] md:py-32 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-[600px] bg-[#31468e]/30 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-[15px] sm:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 tracking-tight">
              Nationwide <span className="text-[#f2ca1c]">Coverage</span>
            </h2>
            <p className="text-xl text-slate-300 font-medium">
              We operate an expansive network across the country. If there is a road, we can take you there.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            <div className="bg-white/5 border border-white/10 rounded-none sm:rounded-[3rem] p-10 md:p-14 backdrop-blur-md shadow-2xl">
              <h3 className="text-2xl font-black mb-8 border-b border-white/10 pb-6 tracking-tight uppercase text-[#f2ca1c]">
                Major Operational Hubs
              </h3>
              <div className="flex flex-wrap gap-3">
                {popularCities.slice(0, 18).map((city, i) => (
                  <span
                    key={i}
                    className="px-5 py-3 bg-slate-800/50 text-slate-100 rounded-none sm:rounded-xl text-sm font-black hover:bg-[#31468e] transition-all cursor-default border border-slate-700/50 shadow-sm"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#31468e] border border-white/10 rounded-none sm:rounded-[3rem] p-10 md:p-14 shadow-2xl relative overflow-hidden flex flex-col justify-center">
              <div className="absolute -right-16 -bottom-16 opacity-10 pointer-events-none">
                <Compass className="w-80 h-80" />
              </div>
              <h3 className="text-3xl md:text-4xl font-black mb-6 relative z-10 text-white tracking-tight leading-tight">
                Need a Custom <br /> Itinerary?
              </h3>
              <p className="text-lg text-blue-100 mb-10 relative z-10 font-medium leading-relaxed">
                Planning a multi-state tour spanning 15 days? Or a corporate offsite for 200 employees? Our logistics experts design custom routing charts tailored perfectly to your requirements.
              </p>
              <Link
                to="/contact"
                className="relative z-10 self-start w-full sm:w-auto px-10 py-4 bg-white text-[#31468e] rounded-none sm:rounded-2xl font-black hover:bg-[#f2ca1c] hover:text-slate-900 transition-all shadow-2xl text-lg text-center"
              >
                Talk to a Travel Expert
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Final CTA */}
      <section className="py-[50px] md:py-32 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-[15px] sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900 rounded-none sm:rounded-[3rem] p-8 sm:p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-slate-900/40"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#31468e]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-8 relative z-10 leading-tight tracking-tight">
              Ready to Plan Your <br /> <span className="text-[#f2ca1c]">Dream Vacation?</span>
            </h2>
            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto relative z-10 font-medium">
              Tell us your destination and let our experts handle the rest. From luxury fleets to curated itineraries, we ensure every mile is perfect.
            </p>
            <div className="flex flex-wrap justify-center gap-6 relative z-10">
              <Link
                to="/contact"
                className="w-full sm:w-auto px-10 py-5 bg-[#31468e] text-white rounded-none sm:rounded-2xl font-black hover:bg-[#f2ca1c] hover:text-slate-900 transition-all shadow-xl shadow-[#31468e]/20 text-center"
              >
                Get a Free Quote
              </Link>
              <Link
                to="/"
                className="w-full sm:w-auto px-10 py-5 bg-white/10 text-white border border-white/20 backdrop-blur-md rounded-none sm:rounded-2xl font-black hover:bg-white/20 transition-all text-center"
              >
                Book a Fast Cab
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
