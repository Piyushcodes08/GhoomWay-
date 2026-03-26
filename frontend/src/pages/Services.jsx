import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { servicesData } from "../constants/data.jsx";

const Services = () => {
  return (
    <section id="services" className="py-[50px] md:py-24 bg-white overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-[15px] sm:px-6">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#31468e] leading-tight">
            Premium <span className="text-[#f2ca1c]">Services</span>
          </h2>
          <div className="w-20 h-1 bg-[#f2ca1c] mx-auto mt-4 rounded-full" />
          <p className="max-w-2xl mx-auto mt-6 text-gray-500 font-medium text-sm md:text-base">
            Experience comfort, safety, and luxury with our wide range of cab services mapped to every travel need.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {servicesData.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-slate-900 border border-white/10 rounded-none sm:rounded-[2.5rem] overflow-hidden aspect-[4/5] sm:aspect-square md:aspect-[3/2] lg:aspect-[4/3] shadow-2xl transition-all duration-700"
              >
                {/* Image Background */}
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-50"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-transparent to-transparent group-hover:from-[#31468e]/80 transition-all duration-700" />
                
                {/* Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(242,202,28,0.1)_0%,transparent_70%)] transition-opacity duration-700" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <div className={`w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 border border-white/20 transform transition-all duration-700 group-hover:scale-110 group-hover:bg-[#f2ca1c] group-hover:border-[#f2ca1c] shadow-2xl`}>
                    <Icon className="w-8 h-8 text-[#f2ca1c] group-hover:text-slate-900 transition-colors" />
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tight mb-3 group-hover:scale-110 transition-transform duration-500">
                    {service.title}
                  </h3>
                  <div className="w-10 h-1 bg-[#f2ca1c] rounded-full mb-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  <p className="max-w-[240px] text-slate-200 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link to="/services" className="inline-flex items-center gap-3 px-10 py-4 bg-[#31468e] text-white rounded-none sm:rounded-2xl font-black hover:bg-[#f2ca1c] hover:text-slate-900 transition-all shadow-xl shadow-[#31468e]/20">
            Explore All Services <span>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
