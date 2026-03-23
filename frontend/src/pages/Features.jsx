import { motion } from "framer-motion";
import { Phone, Award, Star, Calendar } from "lucide-react";

const features = [
  {
    icon: Phone,
    title: "24/7 Customer Support",
    description:
      "Wherever you travel, whenever you need us, our support team stays available around the clock for a smooth and worry-free experience.",
  },
  {
    icon: Award,
    title: "Earn Exclusive Rewards",
    description:
      "Unlock premium benefits, collect rewards on every booking, and enjoy a travel experience designed to give you more every time.",
  },
  {
    icon: Star,
    title: "Trusted by Millions",
    description:
      "Plan confidently with authentic reviews, trusted recommendations, and real experiences shared by travelers across the world.",
  },
  {
    icon: Calendar,
    title: "Flexible Booking Options",
    description:
      "Stay in control with free cancellation, reserve now pay later options, and flexible plans tailored to the way you travel.",
  },
];

const featureList = features;

const Features = () => {
  return (
    <section className="relative overflow-hidden bg-[#f8f9fc] py-12 md:py-24">
      {/* Premium Background Layers */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-10 h-[320px] w-[320px] rounded-full bg-[#31468e]/15 blur-3xl" />
        <div className="absolute right-[-100px] top-24 h-[300px] w-[300px] rounded-full bg-[#f2ca1c]/20 blur-3xl" />
        <div className="absolute bottom-[-100px] left-1/2 h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-[#31468e]/10 blur-3xl" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.9),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#31468e_1px,transparent_1px),linear-gradient(to_bottom,#31468e_1px,transparent_1px)] [background-size:60px_60px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-16 max-w-4xl text-center"
        >
          <div className="mb-5 inline-flex items-center rounded-full border border-[#31468e]/10 bg-white/80 px-5 py-2 text-sm font-medium text-[#31468e] shadow-[0_8px_30px_rgba(49,70,142,0.08)] backdrop-blur-md">
            Premium Travel Experience
          </div>

          <h2 className="text-4xl font-bold leading-tight text-[#31468e] sm:text-5xl lg:text-6xl">
            Why travelers choose{" "}
            <span className="relative inline-block text-[#f2ca1c]">
              GhoomWay
              <span className="absolute -bottom-1 left-0 h-[4px] w-full rounded-full bg-[#f2ca1c]/30" />
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-base">
            Designed with elegance, flexibility, and trust at its core, GhoomWay
            delivers a premium booking experience that feels seamless from the
            first search to the final destination.
          </p>
        </motion.div>

        {/* Marquee Wrapper */}
        <div className="group relative">
          {/* Edge fade */}
          <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-20 md:w-32" />
          <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-20  md:w-32" />

         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
  {featureList.map((item, index) => {
    const Icon = item.icon;

    return (
      <div
        key={index}
        className="relative min-h-[280px] rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm transition-transform duration-300 hover:-translate-y-2"
      >
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#31468e] text-white">
          <Icon className="h-7 w-7" />
        </div>

        <h3 className="mb-4 text-2xl font-semibold tracking-tight text-[#31468e]">
          {item.title}
        </h3>

        <p className="text-[15px] leading-7 text-slate-600">
          {item.description}
        </p>
      </div>
    );
  })}
</div>
        </div>

        {/* Bottom trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-16 flex flex-col items-center justify-center gap-4 text-center"
        >
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#31468e]/20 md:w-28" />
            <span>
              Trusted travel experiences with elegance, flexibility, and confidence
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#31468e]/20 md:w-28" />
          </div>
        </motion.div>
      </div>

      <style>{`
        .group:hover .group-hover\\:pause {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Features;