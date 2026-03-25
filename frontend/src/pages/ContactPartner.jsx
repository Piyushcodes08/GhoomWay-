import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Phone, Mail, MapPin, Send, MessageCircle, Clock } from "lucide-react";

const ContactPartner = () => {
  const { t } = useTranslation();

  const contactInfo = [
    {
      title: t('pages.landing.contactPartner.info.callUs.title'),
      value: "+91 98765 43210",
      description: t('pages.landing.contactPartner.info.callUs.desc'),
      icon: Phone,
    },
    {
      title: t('pages.landing.contactPartner.info.emailUs.title'),
      value: "partners@ghoomway.com",
      description: t('pages.landing.contactPartner.info.emailUs.desc'),
      icon: Mail,
    },
    {
      title: t('pages.landing.contactPartner.info.visitUs.title'),
      value: t('pages.landing.contactPartner.info.visitUs.address'),
      description: t('pages.landing.contactPartner.info.visitUs.desc'),
      icon: MapPin,
    },
  ];

  return (
    <section id="contact" className="py-12 md:py-24 bg-white overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-[15px] md:px-6">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start">
          {/* Contact Details Side */}
          <div className="lg:w-1/2 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-indigo-600 font-bold tracking-widest uppercase text-[11px] mb-3 block">
                {t('pages.landing.contactPartner.badge')}
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
                {t('pages.landing.contactPartner.heading')}
              </h2>
              <p className="text-base text-slate-600 mb-10 leading-relaxed max-w-md">
                {t('pages.landing.contactPartner.subtext')}
              </p>
            </motion.div>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-indigo-100 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm group-hover:bg-indigo-600 transition-colors shrink-0">
                    <info.icon className="text-indigo-600 group-hover:text-white transition-colors" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-0.5">{info.title}</h4>
                    <span className="text-indigo-100 font-bold text-sm bg-indigo-600 px-2 py-0.5 rounded-md inline-block">
                      {info.value}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 w-[calc(100%+30px)] -mx-[15px] md:mx-0 md:w-full"
          >
            <div className="bg-slate-900 rounded-none md:rounded-[2.5rem] p-6 md:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-full bg-indigo-600/20 flex items-center justify-center">
                  <MessageCircle className="text-indigo-400" size={16} />
                </div>
                <h3 className="text-xl font-bold text-white">{t('pages.landing.contactPartner.formTitle')}</h3>
              </div>
              
              <form className="space-y-5 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-slate-500 text-[10px] font-black uppercase tracking-widest ml-1">{t('pages.landing.contactPartner.nameLabel')}</label>
                    <input
                      type="text"
                      className="w-full bg-slate-800/40 border border-slate-700/40 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all text-sm placeholder:text-slate-600"
                      placeholder={t('pages.landing.contactPartner.namePlaceholder')}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-slate-500 text-[10px] font-black uppercase tracking-widest ml-1">{t('pages.landing.contactPartner.emailLabel')}</label>
                    <input
                      type="email"
                      className="w-full bg-slate-800/40 border border-slate-700/40 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all text-sm placeholder:text-slate-600"
                      placeholder={t('pages.landing.contactPartner.emailPlaceholder')}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-slate-500 text-[10px] font-black uppercase tracking-widest ml-1">{t('pages.landing.contactPartner.subjectLabel')}</label>
                  <input
                    type="text"
                    className="w-full bg-slate-800/40 border border-slate-700/40 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all text-sm placeholder:text-slate-600"
                    placeholder={t('pages.landing.contactPartner.subjectPlaceholder')}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-slate-500 text-[10px] font-black uppercase tracking-widest ml-1">{t('pages.landing.contactPartner.messageLabel')}</label>
                  <textarea
                    rows="3"
                    className="w-full bg-slate-800/40 border border-slate-700/40 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all resize-none text-sm leading-relaxed placeholder:text-slate-600"
                    placeholder={t('pages.landing.contactPartner.messagePlaceholder')}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2 group text-base tracking-tight shadow-lg shadow-indigo-900/20"
                >
                  {t('pages.landing.contactPartner.sendBtn')} <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Support Section - 100% Width */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, delay: 0.4 }}
           className="mt-12 p-6 md:p-8 rounded-[2rem] bg-indigo-50 border border-indigo-100 flex flex-col md:flex-row items-center gap-6 w-full"
        >
          <div className="bg-indigo-600 p-4 rounded-2xl shadow-lg shadow-indigo-200 shrink-0">
            <Clock className="text-white" size={28} />
          </div>
          <div className="text-center md:text-left">
            <h4 className="font-black text-slate-900 text-lg mb-1 uppercase tracking-tight">{t('pages.landing.contactPartner.supportHours')}</h4>
            <div className="text-slate-600 text-sm md:text-base leading-relaxed" 
              dangerouslySetInnerHTML={{ __html: t('pages.landing.contactPartner.supportLine')
                .replace("Monday through Friday, 10:00 AM to 8:00 PM IST", `<span class="font-bold text-indigo-600">Monday through Friday, 10:00 AM to 8:00 PM IST</span>`) 
              }} 
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactPartner;
