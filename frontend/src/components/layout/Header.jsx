import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import logo from "../../assets/logo (1).svg";
import { Plus, Languages, Check } from "lucide-react";
import { navLinks } from "../../constants/data.jsx";

// ─── Language options config ───
const LANGUAGES = [
  { code: "en", label: "English",    short: "EN", native: "English"    },
  { code: "hi", label: "हिन्दी",      short: "HI", native: "हिन्दी"      },
  { code: "gu", label: "ગુજરાતી",    short: "GU", native: "ગુજરાતી"    },
];

const menuOverlayVariants = {
  open:   "translate-x-0 opacity-100 visible",
  closed: "translate-x-full opacity-0 invisible",
};

// ─── Language Switcher Dropdown ───
function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const activeLang =
    LANGUAGES.find((l) => l.code === i18n.resolvedLanguage) || LANGUAGES[0];

  // Close on outside click
  useEffect(() => {
    const handleOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const handleSelect = (code) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls="lang-dropdown"
        className="text-sm border-none rounded-xl px-4 py-2 font-bold inline-flex items-center gap-2 bg-white text-black hover:bg-[#f2ca1c] transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f2ca1c]"
      >
        <Languages size={18} />
        <span className="hidden sm:inline">{activeLang.short}</span>
      </button>

      <div
        id="lang-dropdown"
        className={clsx(
          "absolute right-0 mt-2 w-48 origin-top-right rounded-2xl border border-slate-100 bg-white shadow-xl ring-1 ring-black/5 z-[70] p-1.5 transition-all duration-200",
          open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        )}
      >
        <div className="space-y-0.5">
          {LANGUAGES.map((lang) => {
            const isActive = lang.code === activeLang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleSelect(lang.code)}
                className={clsx(
                  "w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all",
                  isActive ? "bg-[#31468e] text-white" : "text-slate-700 hover:bg-slate-50 hover:text-[#31468e]"
                )}
              >
                <div className="flex items-center gap-2">
                  <span className={clsx("text-[10px] px-1.5 py-0.5 rounded-md font-black", isActive ? "bg-white/20" : "bg-slate-100")}>
                    {lang.short}
                  </span>
                  {lang.native}
                </div>
                {isActive && <Check size={14} />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Header ───
export default function Header() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 80);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 left-0 w-full py-2 transition-all duration-300 font-poppins z-[60]",
          scrolled ? "bg-black/90 backdrop-blur-md" : "bg-transparent",
          menuOpen && "bg-transparent backdrop-blur-none"
        )}
      >
        <div className="max-w-7xl mx-auto md:px-6 h-16 px-4 flex items-center justify-between">
          <Link className="flex items-center" to="/" onClick={() => setMenuOpen(false)}>
            <img src={logo} alt="Ghoomway Logo" className="w-20 md:w-24 h-auto" />
          </Link>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-sm border-none rounded-xl px-4 py-2 font-bold flex items-center gap-2 bg-white text-black transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f2ca1c]"
            >
              <Plus
                size={18}
                className="transition-transform duration-500"
                style={{ transform: menuOpen ? "rotate(45deg)" : "rotate(0deg)" }}
              />
              <span>{menuOpen ? t("nav.close") : t("nav.menu")}</span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={clsx(
          "fixed inset-0 h-screen w-full bg-[#e3e1de] z-[55] transform-gpu transition-all duration-500 flex flex-col justify-center items-center px-6",
          menuOpen ? menuOverlayVariants.open : menuOverlayVariants.closed
        )}
      >
        <ul className="w-full max-w-4xl text-left sm:text-center space-y-4">
          {navLinks.map((item) => (
            <li key={item} className="group">
              <Link
                to={item === "home" ? "/" : `/${item}`}
                onClick={() => setMenuOpen(false)}
                className="relative inline-block w-full py-2 text-5xl sm:text-7xl font-black text-black capitalize transition-all duration-500 hover:text-[#31468e] hover:translate-x-4 sm:hover:translate-x-0"
              >
                {t(`nav.${item}`)}
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#f2ca1c] transition-all duration-500 group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}