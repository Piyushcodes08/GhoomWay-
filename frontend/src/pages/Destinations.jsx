import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { MapPin, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { destinationsData } from "../constants/data.jsx";


import "swiper/css";
import "swiper/css/pagination";

const Destinations = () => {
  const { t } = useTranslation();

  return (
    <section id="destinations" className="py-12 md:py-24 bg-slate-50 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header - Static for Performance */}
        <div className="mb-10">
          <span className="text-[#31468e] font-bold tracking-widest uppercase text-[10px] mb-2 block">
            {t('pages.landing.destinations.badge')}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900">
            {t('pages.landing.destinations.headingPrefix')} <span className="text-[#31468e]">{t('pages.landing.destinations.headingSuffix')}</span>
          </h2>
        </div>

        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          loop={false}
          speed={400}
          pagination={{ clickable: true, dynamicBullets: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 }
          }}
          className="destinations-swiper !pb-14"
        >
          {destinationsData.map((dest, index) => {
            const key = dest.name.toLowerCase().replace(/\s+/g, '');
            return (
              <SwiperSlide key={dest.id || index}>
                <div className="relative group h-[420px] rounded-[2rem] overflow-hidden bg-slate-200 transform-gpu shadow-sm hover:shadow-xl transition-all duration-500">
                  
                  {/* Critical Fix: fetchPriority for LCP */}
                  <img
                    src={dest.image}
                    alt={t(`pages.landing.destinations.${key}.name`, dest.name)}
                    loading="lazy"
                    decoding="async"
                    width="500"
                    height="700"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Overlay - Gradient is faster than Blur/Filters */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 w-full p-6">
                    <div className="flex items-center gap-1.5 text-[#f2ca1c] text-[10px] font-bold uppercase mb-2">
                      <MapPin size={12} /> {t(`pages.landing.destinations.${key}.location`, dest.location)}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {t(`pages.landing.destinations.${key}.name`, dest.name)}
                    </h3>

                    {/* Price & Button - Won't slow down LCP */}
                    <div className="flex justify-between items-center pt-4 border-t border-white/10">
                      <div>
                        <p className="text-white/60 text-[10px] uppercase tracking-wider">{t('common.startingFrom')}</p>
                        <p className="text-xl font-bold text-[#f2ca1c]">{dest.price}</p>
                      </div>
                      <Link to="/destinations" className="bg-[#f2ca1c] text-[#31468e] p-3 rounded-full hover:bg-white transition-all transform hover:scale-110 active:scale-90 shadow-lg block">
                        <ArrowRight size={20} />
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .destinations-swiper .swiper-pagination-bullet-active { background: #31468e !important; width: 26px !important; border-radius: 10px !important; }
      `}} />
    </section>
  );
};

export default Destinations;