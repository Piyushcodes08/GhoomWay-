import { motion, useInView } from "framer-motion";
import { useRef, Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import heroBg from "/bg-hero.webp";


// Performance Optimization: CabBooking ko lazy load karein taaki 
// main page load hone tak JS block na ho (TBT fix)
const CabBooking = lazy(() => import("../components/booking/CabBooking"));

const Home = () => {
  const bookingRef = useRef(null);

  const isBookingInView = useInView(bookingRef, {
    once: true,
    amount: 0.15,
    margin: "0px 0px -80px 0px",
  });

  return (
    <div className="bg-white">
      {/* Hero Section - Explicit height to prevent Layout Shift */}
      <section className="relative min-h-[100svh] w-full overflow-hidden flex items-center pt-12 bg-slate-900">
        
        {/* Optimized Hero Image */}
      <img
  src={heroBg}
  alt="GhoomWay mountain travel background"
  fetchPriority="high"
  loading="eager"
  decoding="async"
  width="1920"
  height="1080"
  className="absolute inset-0 h-full w-full object-cover pointer-events-none"
/>

        {/* Gradient Overlay - Z-index fixed for better paint performance */}
      <div className="absolute inset-0 bg-black/45 z-[1]" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 pt-10 lg:pt-12">
          <div className="max-w-xl md:max-w-2xl lg:max-w-3xl">
            <span className="inline-block px-4 py-1 mb-6 text-sm font-bold tracking-[0.2em] text-[#f2ca1c] uppercase bg-[#f2ca1c]/10 rounded-full border border-[#f2ca1c]/20">
              All India Travel Partner
            </span>

            <h1 className="mb-6 text-5xl font-black leading-[1.1] text-white sm:text-6xl md:text-7xl lg:text-[5rem]">
              Elevate Your <br />
              <span className="text-[#f2ca1c]">Journey</span> With Us.
            </h1>

            <p className="mb-6 text-lg leading-relaxed text-slate-300 sm:text-xl font-medium max-w-2xl">
              Plan your perfect round trip with our reliable cab service. Enjoy premium comfort,
              professional drivers, and highly affordable pricing for every mile.
            </p>

            <div className="flex flex-wrap gap-4 pb-24">
              <a
                href="#booking"
                className="inline-flex items-center justify-center rounded-lg bg-[#31468e] px-6 py-3 text-lg font-semibold text-white transition-all duration-300 hover:bg-[#f2ca1c] hover:text-black"
              >
                Book Now
              </a>

              <Link
                to="/services"
                className="inline-flex items-center justify-center rounded-lg border border-white px-6 py-3 text-lg font-semibold text-white transition-all duration-300 hover:border-[#f2ca1c] hover:bg-[#f2ca1c] hover:text-black"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section with Suspense for better TBT */}
      <section
        id="booking"
        ref={bookingRef}
        className="relative z-20 -mt-8 sm:-mt-12 md:-mt-16 lg:-mt-20 px-4 sm:px-6 lg:px-8 min-h-[400px]"
      >
        <Suspense fallback={<div className="h-40 w-full bg-gray-100 animate-pulse rounded-xl" />}>
       <motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.15 }}
  transition={{ duration: 0.45, ease: "easeOut" }}
  className="mx-auto flex w-full max-w-6xl justify-center"
>
            <CabBooking />
          </motion.div>
        </Suspense>
      </section>
    </div>
  );
};

export default Home;