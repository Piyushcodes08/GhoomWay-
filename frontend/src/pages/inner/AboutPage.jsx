import { motion } from "framer-motion";
import { Users, Globe, Award, ShieldCheck, Target, Eye, Quote, ChevronRight, CheckCircle2, Smartphone } from "lucide-react";
import heroImg from "../../assets/about img.webp";
import img1 from "../../assets/img1.webp";
import img2 from "../../assets/img2.webp";
import img3 from "../../assets/img3.webp";
import img4 from "../../assets/img4.webp";

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. Cinematic Hero Section */}
      <section className="relative h-[75vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <img 
          src={heroImg} 
          alt="About Ghoomway" 
          className="absolute inset-0 w-full h-full object-cover grayscale-[20%]"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 mt-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-[0.2em] text-[#f2ca1c] uppercase bg-[#f2ca1c]/10 rounded-full border border-[#f2ca1c]/20 backdrop-blur-sm">
              Our Journey
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-black text-white mb-8 leading-[1.1] tracking-tight">
              Moving India, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f2ca1c] to-[#fceb9e]">One Journey</span> At A Time.
            </h1>
            <p className="text-lg md:text-2xl text-slate-300 font-medium leading-relaxed max-w-2xl border-l-4 border-[#31468e] pl-6">
              We are not just a mobility company; we are your reliable travel partner bringing trust, safety, and uncompromising luxury to the Indian roads.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. The Brand Story */}
      <section className="py-24 md:py-32 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <img src={img1} alt="Travel" className="w-full h-64 object-cover rounded-3xl rounded-tr-none shadow-xl" />
              <img src={img2} alt="Comfort" className="w-full h-64 object-cover rounded-3xl rounded-tl-none shadow-xl mt-8" />
            </div>
            {/* Experience Badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-2xl">
              <div className="w-24 h-24 rounded-full bg-[#31468e] flex flex-col items-center justify-center text-white border-4 border-dashed border-white/20">
                <span className="text-3xl font-black">10+</span>
                <span className="text-[10px] uppercase tracking-widest font-bold">Years</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-8 lg:pl-10"
          >
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1]">
              A Decade of <span className="text-[#31468e]">Excellence</span> in Travel
            </h2>
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <p>
                Founded in 2014, Ghoomway started with a simple belief: long-distance road travel in India shouldn’t be a compromise between comfort, affordability, and reliability. It should be seamless.
              </p>
              <p>
                What began as a small fleet of five premium sedans in Delhi NCR has now grown into a vast, organized network covering over 100+ cities. We revolutionized the unorganized cab sector by introducing strict driver verifications, transparent pricing, and GPS-enabled tracking before it became the industry norm.
              </p>
              <p className="font-semibold text-slate-800">
                Today, we proudly serve corporate executives, enthusiastic tourists, and daily commuters with the exact same level of dedication and premium protocol.
              </p>
            </div>
            
            {/* Quick Stats inline */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200">
              <div>
                <div className="text-3xl font-black text-[#f2ca1c] mb-1">50k+</div>
                <div className="text-xs uppercase font-bold tracking-wider text-slate-500">Rides Completed</div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#f2ca1c] mb-1">99.8%</div>
                <div className="text-xs uppercase font-bold tracking-wider text-slate-500">On-Time Arrival</div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#f2ca1c] mb-1">24/7</div>
                <div className="text-xs uppercase font-bold tracking-wider text-slate-500">Active Support</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="py-24 bg-[#31468e] text-white relative overflow-hidden">
        {/* Background abstract design */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-lg border border-white/20 p-12 rounded-[2.5rem]"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#f2ca1c] flex items-center justify-center mb-8 shadow-lg shadow-[#f2ca1c]/30">
                <Target className="w-8 h-8 text-[#31468e]" />
              </div>
              <h3 className="text-3xl font-black mb-6">Our Mission</h3>
              <p className="text-lg text-slate-200 leading-relaxed">
                To organize India's scattered inter-city mobility sector by providing highly standardized, deeply reliable, and thoroughly safe transport solutions. We aim to make every traveler feel like a VIP, prioritizing their peace of mind over everything else.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-lg border border-white/20 p-12 rounded-[2.5rem]"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#f2ca1c] flex items-center justify-center mb-8 shadow-lg shadow-[#f2ca1c]/30">
                <Eye className="w-8 h-8 text-[#31468e]" />
              </div>
              <h3 className="text-3xl font-black mb-6">Our Vision</h3>
              <p className="text-lg text-slate-200 leading-relaxed">
                To emerge as the undisputed leader in the Indian premium travel segment. We envision a future where 'Ghoomway' is practically synonymous with absolute trust, cutting-edge routing technology, and zero-compromise luxury on the roads.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Core Values / Trust Building */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Why Travelers <span className="text-[#31468e]">Trust Us</span></h2>
            <p className="text-xl text-slate-600">The foundational pillars that separate us from ordinary cab aggregators.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, title: "Stringent Vetting", desc: "Every driver undergoes a comprehensive 4-step background check and behavioral training." },
              { icon: Award, title: "Maintained Fleet", desc: "Our vehicles are serviced every 5,000 kms to ensure zero breakdowns and maximum comfort." },
              { icon: CheckCircle2, title: "Transparent Billing", desc: "No hidden toll surprises, no surge pricing traps. We bill exactly what we quote." },
              { icon: Globe, title: "Tech-Driven Safety", desc: "Live GPS tracking, SOS buttons, and a dedicated 24/7 command center monitoring every ride." }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-[#31468e]" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h4>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Mock Leadership / Team (Corporate Element) */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black mb-6">Driven By <span className="text-[#f2ca1c]">Leaders</span></h2>
              <p className="text-slate-400 text-lg">Meet the minds steering Ghoomway toward the future of mobility.</p>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Founder 1 */}
            <div className="group relative rounded-[2rem] overflow-hidden">
              <img src={img3} alt="CEO" className="w-full aspect-[4/5] object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="text-2xl font-bold mb-1">Aman Sharma</h4>
                <p className="text-[#f2ca1c] font-bold text-sm uppercase tracking-widest mb-4">Founder & CEO</p>
                <p className="text-slate-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">15 years in logistics and premium mobility operations.</p>
              </div>
            </div>
            {/* Executive 2 */}
            <div className="group relative rounded-[2rem] overflow-hidden">
              <img src={img4} alt="COO" className="w-full aspect-[4/5] object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="text-2xl font-bold mb-1">Divya Kapoor</h4>
                <p className="text-[#f2ca1c] font-bold text-sm uppercase tracking-widest mb-4">Chief Operations Officer</p>
                <p className="text-slate-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">Spearheads fleet management and driver standardizations.</p>
              </div>
            </div>
            {/* Executive 3 */}
            <div className="group relative rounded-[2rem] overflow-hidden sm:hidden lg:block">
              <img src={img1} alt="CTO" className="w-full aspect-[4/5] object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="text-2xl font-bold mb-1">Rajiv Mehta</h4>
                <p className="text-[#f2ca1c] font-bold text-sm uppercase tracking-widest mb-4">Head of Technology</p>
                <p className="text-slate-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">Architects our live tracking and routing algorithms.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Digital Future / App Coming Soon */}
      <section className="py-20 bg-slate-50 border-y border-slate-200 overflow-hidden relative">
         <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[600px] h-[600px] bg-[#31468e]/5 rounded-full blur-[80px]" />
         <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
               <div className="w-14 h-14 bg-[#31468e] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#31468e]/30">
                  <Smartphone className="w-7 h-7 text-[#f2ca1c]" />
               </div>
               <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">The Future is <span className="text-[#31468e]">Digital</span></h2>
               <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  We are accelerating our timeline to bring the entire Ghoomway experience to your fingertips. Our upcoming mobile application is currently in closed beta and will revolutionize how you book, track, and manage your intercity travel.
               </p>
               <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white border border-slate-200 shadow-sm text-sm font-bold text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f2ca1c] animate-pulse" /> Launching Q3 2026
               </div>
            </div>
            
            <div className="relative aspect-square md:aspect-[4/3] w-full rounded-[3rem] bg-gradient-to-br from-[#31468e] to-slate-900 p-8 shadow-2xl flex items-center justify-center overflow-hidden">
               {/* Mockup visual */}
               <div className="w-64 h-[500px] bg-slate-900 rounded-[2.5rem] border-8 border-slate-800 shadow-2xl relative translate-y-12 shrink-0 flex flex-col items-center pt-8 overflow-hidden z-10">
                  <div className="w-20 h-1.5 bg-slate-700 rounded-full mb-8" />
                  <div className="w-16 h-16 bg-[#f2ca1c] shadow-[0_0_30px_rgba(242,202,28,0.5)] rounded-2xl mb-6 border border-white/20" />
                  <div className="text-xl font-black text-white mb-2 tracking-tight">GhoomWay</div>
                  <div className="text-xs text-slate-400 uppercase tracking-widest font-bold mt-12 bg-slate-800 px-4 py-2 rounded-full border border-slate-700">Driver Arriving...</div>
               </div>
               <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
            </div>
         </div>
      </section>

      {/* 7. Call to Action */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-slate-50 p-12 md:p-20 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50"
          >
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Ready to Experience the <span className="text-[#31468e]">Difference?</span></h2>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">Book your next trip with Ghoomway and discover why thousands of travelers refuse to ride with anyone else.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-[#31468e] text-white rounded-xl font-bold text-lg hover:bg-[#20316b] transition-all shadow-lg flex items-center justify-center gap-2">
                Book a Ride <ChevronRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all">
                Contact For Corporate
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
