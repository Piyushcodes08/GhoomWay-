import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { 
  ArrowRight,
  Heart
} from "lucide-react";
import { Link } from "react-router-dom";
import { footerQuickLinks, footerSocialLinks } from "../../constants/data.jsx";


const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-12 md:pt-20 pb-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 bg-[#31468e] rounded-xl flex items-center justify-center shadow-lg shadow-[#31468e]/40">
                <span className="text-white font-black text-xl">G</span>
              </div>
              <h2 className="text-2xl font-black text-white tracking-tighter">GHOOM<span className="text-[#f2ca1c]">WAY</span></h2>
            </motion.div>
            <p className="text-slate-400 leading-relaxed text-sm">
              {t('footer.brandBio')}
            </p>
            <div className="flex gap-4">
              {footerSocialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ y: -5 }}
                  className={`w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 transition-all ${social.color}`}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Column */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white tracking-tight">{t('footer.quickLinks')}</h3>
            <ul className="space-y-4">
              {footerQuickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href} 
                    className="group text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm"
                  >
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    {t(`nav.${link.name.toLowerCase()}`, link.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white tracking-tight">{t('footer.getInTouch')}</h3>
            <ul className="space-y-4 pt-1">
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-[#31468e]/20 flex items-center justify-center shrink-0">
                  <span className="text-[#f2ca1c]">📞</span>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-0.5">{t('footer.callSupport')}</p>
                  <p className="text-white text-sm font-bold">+91 98765 43210</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-[#31468e]/20 flex items-center justify-center shrink-0">
                  <span className="text-[#f2ca1c]">✉️</span>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-0.5">{t('footer.emailUs')}</p>
                  <p className="text-white text-sm font-bold">hello@ghoomway.com</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-[#31468e]/20 flex items-center justify-center shrink-0">
                  <span className="text-[#f2ca1c]">📍</span>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-0.5">{t('footer.officeAddress')}</p>
                  <p className="text-white text-sm font-bold">123 Travel Hub, Sector 45, Gurugram</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white tracking-tight">{t('footer.newsletter')}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {t('footer.newsletterSub')}
            </p>
            <form className="relative">
              <input 
                type="email" 
                placeholder={t('footer.emailPlaceholder')}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3.5 pl-4 pr-12 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#f2ca1c] transition-all font-medium"
              />
              <button className="absolute right-2 top-2 w-9 h-9 bg-[#31468e] hover:bg-[#253670] rounded-lg flex items-center justify-center text-white transition-colors shadow-lg shadow-[#31468e]/20">
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <p className="text-slate-500 text-xs font-medium">
            &copy; {new Date().getFullYear()} GHOOMWAY Travel Solutions Pvt Ltd. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-slate-500 hover:text-white text-xs transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="text-slate-500 hover:text-white text-xs transition-colors">{t('footer.terms')}</a>
            <p className="text-slate-500 text-xs flex items-center gap-1.5">
              {t('footer.madeWith')} <Heart size={12} className="text-red-500 fill-red-500" /> {t('footer.inIndia')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
