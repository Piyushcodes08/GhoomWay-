import { motion } from "framer-motion";
import cinematicBg from "../assets/about img.webp";
import { aboutStats, aboutValues } from "../constants/data.jsx";


const About = () => {
  return (
    <section id="about" className="relative bg-white py-12 md:py-24 overflow-hidden">

      <div className="w-full max-w-7xl mx-auto px-[15px] md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-16">

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
              <img
  src={cinematicBg}
  alt="Premium Travel Experience"
  loading="lazy"
  decoding="async"
  width="800"
  height="960"
  className="w-full h-[280px] md:h-[480px] object-cover transition-transform duration-300 hover:scale-[1.03]"
/>

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-xs uppercase tracking-widest mb-2 opacity-80">
                  Since 2014
                </p>
                <h3 className="text-xl font-bold">Redefining Modern Travel</h3>
              </div>
            </div>

            {/* Decorative frame (lightweight) */}
            <div className="absolute -bottom-5 -right-5 w-full h-full border border-[#f2ca1c] rounded-2xl -z-10" />
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:w-1/2"
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-[#31468e] uppercase bg-[#31468e]/10 rounded-full">
              About Our Journey
            </span>

            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              We Craft <span className="text-[#31468e]">Unforgettable</span> Travel Stories
            </h2>

            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Founded on the belief that travel should be more than just moving from A to B,
              we provide a premium, seamless, and personalized experience for every traveler.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {aboutValues.map((value, index) => (
                <div key={index} className="flex gap-4 py-3 rounded-lg hover:bg-gray-50 transition">
                  <div className="w-1 h-10 bg-[#31468e] rounded-full flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{value.title}</h4>
                    <p className="text-sm text-gray-600">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-16 md:mt-24 bg-[#31468e] rounded-[1.5rem] md:rounded-2xl p-6 md:p-8 shadow-xl"
        >
          {aboutStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-3">
                <stat.icon className="w-8 h-8 text-[#f2ca1c]" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-white/60 text-xs font-medium uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;