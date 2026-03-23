import React from "react";
import { Link } from "react-router-dom";
import { servicesData } from "../constants/data.jsx";


export default function Services() {
  return (
    <section
      id="services"
      className="relative py-16 md:py-28 bg-[#f8fafc] overflow-hidden"
    >
      {/* Performance optimized background - No heavy filters */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header: Static for instant LCP (Largest Contentful Paint) */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-[#31468e] tracking-tight">
            Premium <span className="text-[#f2ca1c]">Services</span>
          </h2>
          <div className="w-20 h-1.5 bg-[#f2ca1c] mx-auto mt-4 rounded-full" />
          <p className="mt-6 text-slate-600 text-lg max-w-2xl mx-auto font-medium">
            Experience comfort, safety, and luxury with our wide range of cab services mapped to every travel need.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <div
              key={service.title || index}
              className="service-card group relative h-[320px] rounded-[2.5rem] overflow-hidden bg-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] transform-gpu hover:-translate-y-3"
            >
              {/* Image: Optimized with Aspect Ratio & GPU priority */}
             <img
  src={service.image}
  alt={service.title}
  loading="lazy"
  decoding="async"
  width="600"
  height="640"
  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 transform-gpu"
/>

              {/* Advanced Gradient Overlay (Better than plain black/40) */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#31468e]/90 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

              {/* Icon & Title Container */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <div className="mb-4 transform transition-all duration-500 group-hover:-translate-y-2">
                  <div className="w-16 h-16 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold text-white tracking-tight">
                  {service.title}
                </h3>
                
                {/* Description: Revealed on Hover */}
                <p className="text-white/80 text-sm mt-2 opacity-0 h-0 group-hover:opacity-100 group-hover:h-auto transition-all duration-500 delay-100">
                  {service.description || "Premium travel experience tailored for you."}
                </p>
              </div>

              {/* Industry Style Button */}
              <div className="absolute bottom-6 left-0 right-0 px-8 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-150">
                <Link to="/services" className="block text-center w-full py-4 bg-white text-[#31468e] font-black rounded-2xl shadow-xl hover:bg-[#f2ca1c] hover:text-[#31468e] transition-colors uppercase tracking-widest text-xs">
                  Book {service.title}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Global Optimization Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        .service-card {
          backface-visibility: hidden;
          perspective: 1000px;
        }
        /* Reveal cards one by one on scroll without Framer Motion */
        @keyframes reveal {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .service-card {
          animation: reveal 0.8s ease-out both;
          animation-timeline: view();
          animation-range: entry 5% cover 20%;
        }
        /* Fallback for older browsers */
        @supports not (animation-timeline: view()) {
          .service-card { opacity: 1; transform: none; animation: none; }
        }
      `}} />
    </section>
  );
}