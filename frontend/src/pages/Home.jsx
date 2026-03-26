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
      <section className="relative flex min-h-[90vh] items-center justify-start overflow-hidden pt-20">

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

        <div className="relative z-10 mx-auto w-full max-w-7xl px-[15px] sm:px-8 ">
          <div className="max-w-xl md:max-w-2xl lg:max-w-3xl">
            <span className="inline-block px-4 py-1.5 mb-8 text-xs font-black tracking-[0.3em] text-[#f2ca1c] uppercase bg-white/5 backdrop-blur-md rounded-full border border-white/10 shadow-2xl">
              India's Premier Mobility Partner
            </span>

            <h1 
              className="mb-8 text-4xl font-black text-white sm:text-5xl md:text-6xl lg:text-[5rem]"
              dangerouslySetInnerHTML={{ __html: "Your Journey, <br /> <span class='text-[#f2ca1c]'>Elevated</span> Perfectly." }}
            />

            <p className="mb-5 text-base sm:text-lg leading-relaxed text-white/80 md:text-xl font-medium max-w-2xl">
              Experience the pinnacle of road travel with GhoomWay. Whether it's a cross-country expedition or a swift airport transfer, we deliver unmatched comfort, safety, and elite professionalism.
            </p>

            <div className="flex flex-wrap gap-4 pb-12 sm:pb-18">
              <a
                href="#booking"
                className="inline-flex items-center justify-center rounded-2xl bg-[#f2ca1c] px-10 py-4 text-lg font-black text-slate-900 transition-all duration-500 hover:bg-white hover:scale-105 shadow-xl shadow-[#f2ca1c]/20"
              >
                Book Your Ride
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
        className="relative z-20 -mt-8 sm:-mt-30 lg:-mt-10 px-[15px] sm:px-6 lg:px-8 py-[50px] sm:py-0 min-h-[400px]"
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