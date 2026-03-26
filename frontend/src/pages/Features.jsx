import { motion } from "framer-motion";
import { featuresListData, featuresHeaderData } from "../constants/data.jsx";

const Features = () => {
  return (
    <section id="features" className="py-[50px] md:py-24 bg-white overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-[15px] sm:px-8">
        {/* Header */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="text-center mb-16 md:mb-24"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-[#31468e] text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            {featuresHeaderData.badge}
          </div>
          
          <h2 
            className="text-3xl sm:text-4xl md:text-6xl font-black text-slate-900 leading-tight"
            dangerouslySetInnerHTML={{ __html: featuresHeaderData.titleHtml }}
          />
          
          <p className="max-w-3xl mx-auto mt-8 text-slate-500 font-medium text-sm md:text-base leading-relaxed italic">
            {featuresHeaderData.quote}
          </p>
        </motion.div>

        {/* Features Content (Matches the screenshot feeling) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {featuresListData.map((item, index) => {
             const Icon = item.icon;
             return (
               <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
               >
                  <div className="w-16 h-16 bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-[#31468e] transition-colors duration-500 border border-slate-100 shadow-sm rounded-none sm:rounded-2xl">
                    <Icon className="w-8 h-8 text-[#31468e] group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">
                    {item.description}
                  </p>
               </motion.div>
             );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;