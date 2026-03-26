import React from "react";
import { motion } from "framer-motion";
import { galleryImages } from "../constants/data.jsx";


const Gallery = () => {
  return (
    <section id="gallery" className="py-[50px] md:py-24 bg-slate-900 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-[15px] sm:px-6">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="text-center mb-16"
        >
          <span className="text-[#f2ca1c] font-bold tracking-widest uppercase text-sm mb-4 block">
            Our Fleet & Journeys
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
            Experience the <span className="text-[#31468e] underline decoration-[#31468e] underline-offset-8">Ghoomway</span> Premium Lifestyle
          </h2>
          <p className="max-w-2xl mx-auto mt-8 text-slate-400 text-lg leading-relaxed">
            Browse through our collection of premium vehicles and memorable travel moments captured across India's most beautiful destinations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {galleryImages.map((image, index) => {
            return (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.2) }}
                className="relative group h-48 sm:h-64 md:h-80 rounded-none sm:rounded-3xl overflow-hidden shadow-xl"
              >
                <img
                  src={image.src}
                  alt={image.title}
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="800"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-[#31468e]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-[10px] uppercase font-bold text-[#f2ca1c] mb-1 tracking-widest">
                    {image.category}
                  </span>
                  <h4 className="text-xl font-bold text-white mb-2">
                    {image.title}
                  </h4>
                  <div className="w-8 h-1 bg-white rounded-full group-hover:w-full transition-all duration-500 delay-100" />
                </div>

                {/* View Icon (Optional decoration) */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, delay: 0.5 }}
           className="mt-16 md:mt-24 flex flex-col md:flex-row items-center justify-between p-6 md:p-10 rounded-none sm:rounded-[2rem] bg-gradient-to-r from-[#31468e] to-[#425cb8] shadow-xl shadow-[#31468e]/20 text-center md:text-left"
        >
          <div className="mb-6 md:mb-0">
             <h4 className="text-2xl font-bold text-white mb-2">Ready to start your own story?</h4>
             <p className="text-slate-200">Book your premium cab now and experience travel like never before.</p>
          </div>
          <button className="bg-[#f2ca1c] text-slate-900 px-8 py-4 rounded-2xl font-black tracking-wide hover:bg-white transition-all transform hover:scale-105 shadow-md">
            Book My Trip Now
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
