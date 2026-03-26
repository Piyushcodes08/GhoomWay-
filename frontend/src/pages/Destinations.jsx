
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { ArrowRight, Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { destinationsData } from "../constants/data.jsx";

import "swiper/css";
import "swiper/css/pagination";

const Destinations = () => {
  return (
    <section id="destinations" className="py-[50px] md:py-24 bg-slate-50 border-t border-slate-200/60 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-[15px] sm:px-6">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#31468e] text-xs font-black uppercase tracking-[0.25em] mb-3 block">
              ✦ Premium Travel Destinations
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight">
              Top <span className="text-[#31468e]">Destinations</span>
            </h2>
            <div className="w-16 h-1 bg-[#f2ca1c] mt-4 rounded-full" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-slate-900 text-white rounded-none sm:rounded-xl font-black hover:bg-[#31468e] transition-all duration-300 shadow-xl shadow-slate-900/20 text-sm"
            >
              View All <span className="text-[#f2ca1c]">→</span>
            </Link>
          </motion.div>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true, el: ".dest-pagination" }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
            1280: { slidesPerView: 4, spaceBetween: 24 },
          }}
          className="pb-14"
        >
          {destinationsData.map((dest) => (
            <SwiperSlide key={dest.id}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative rounded-none sm:rounded-[2rem] overflow-hidden shadow-xl group border border-slate-100 aspect-[3/4] cursor-pointer"
              >
                {/* Image */}
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/30 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-5 left-5 right-5 flex justify-between items-start z-10">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/20">
                    <Star size={12} className="text-[#f2ca1c] fill-[#f2ca1c]" />
                    <span className="text-white text-xs font-black">{dest.rating}</span>
                  </div>
                  {dest.tag && (
                    <div className="px-3 py-1.5 rounded-full bg-[#f2ca1c] text-slate-900 text-[10px] font-black uppercase tracking-wider shadow-lg">
                      {dest.tag}
                    </div>
                  )}
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <div className="flex items-center gap-1.5 text-[#f2ca1c] mb-2">
                    <MapPin size={14} />
                    <span className="text-xs font-black uppercase tracking-[0.15em]">{dest.location}</span>
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tight mb-4">{dest.name}</h3>
                  
                  <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <div>
                      <p className="text-[9px] uppercase font-black text-white/50 tracking-widest">Starts From</p>
                      <p className="text-xl font-black text-white">{dest.price}</p>
                    </div>
                    <Link
                      to="/destinations"
                      className="w-11 h-11 rounded-xl bg-[#f2ca1c] flex items-center justify-center text-slate-900 hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg shadow-[#f2ca1c]/30"
                    >
                      <ArrowRight size={20} strokeWidth={3} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination dots */}
        <div className="dest-pagination flex justify-center items-center gap-2 mt-2" />
      </div>

      <style>{`
        .dest-pagination .swiper-pagination-bullet {
          width: 24px; height: 4px;
          background: #31468e; border-radius: 4px;
          opacity: 0.2; transition: all 0.3s; margin: 0 !important;
        }
        .dest-pagination .swiper-pagination-bullet-active {
          width: 48px; opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default Destinations;
