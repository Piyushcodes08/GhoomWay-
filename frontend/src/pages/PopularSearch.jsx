import React from "react";
import { motion } from "framer-motion";
import { popularCities, popularAttractions } from "../constants/data.jsx";


const PopularSearch = () => {

  return (
    <section className="py-12 md:py-24 bg-slate-50 border-t border-slate-200">
      <div className="w-full max-w-7xl mx-auto px-[15px] md:px-6">
        {/* Popular Cities */}
        <div className="mb-16">
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3"
          >
            <span className="w-1.5 h-8 bg-[#31468e] rounded-full"></span>
            Popular Cities
          </motion.h3>
          <div className="flex flex-wrap gap-x-3 gap-y-4">
            {popularCities.map((city, index) => (
              <React.Fragment key={city}>
                <motion.a
                  href={`#${city.toLowerCase()}`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.02 }}
                  className="text-[13px] text-slate-500 hover:text-[#31468e] transition-colors font-medium whitespace-nowrap"
                >
                  Things to do in {city}
                </motion.a>
                {index < popularCities.length - 1 && (
                  <span className="text-slate-300 pointer-events-none">|</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Popular Attractions */}
        <div>
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3"
          >
            <span className="w-1.5 h-8 bg-[#31468e] rounded-full"></span>
            Popular Attractions
          </motion.h3>
          <div className="flex flex-wrap gap-x-3 gap-y-4">
            {popularAttractions.map((attraction, index) => (
              <React.Fragment key={attraction}>
                <motion.a
                  href={`#${attraction.toLowerCase().replace(/\s+/g, '-')}`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.02 }}
                  className="text-[13px] text-slate-500 hover:text-[#31468e] transition-colors font-medium whitespace-nowrap"
                >
                  {attraction}
                </motion.a>
                {index < popularAttractions.length - 1 && (
                  <span className="text-slate-300 pointer-events-none">|</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularSearch;
