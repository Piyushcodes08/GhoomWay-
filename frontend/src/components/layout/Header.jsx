import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import logo from "../../assets/logo (1).svg";
import { Plus, Languages } from 'lucide-react';
import { navLinks } from "../../constants/data.jsx";


const menuOverlayVariants = {
  open: "translate-x-0 opacity-100 visible",
  closed: "translate-x-full opacity-0 invisible",
};

export default function Header() {
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
          "fixed top-0 left-0 w-full py-2 transition-all duration-300 font-poppins z-[60]", // Increase Z-index to stay above menu
          scrolled ? "bg-black/90 backdrop-blur-md" : "bg-transparent",
          menuOpen && "bg-transparent backdrop-blur-none" // Menu khulne par header background saaf rakhein
        )}
      >
        <div className="max-w-7xl mx-auto md:px-6 h-16 px-4 flex items-center justify-between">
          
         <Link className="flex items-center" to="/" onClick={() => setMenuOpen(false)}>
  <img 
    src={logo} 
    alt="Ghoomway Logo" 
    width="100" 
    height="40" 
    loading="eager"
    decoding="async"
    className={clsx("w-20 md:w-24 h-auto transition-all", scrolled || menuOpen ? "brightness-100" : "brightness-100")}
  />
</Link>

          <div className="flex items-center gap-3">
            <button className="text-sm border-none rounded-xl px-4 py-2 font-bold inline-flex items-center gap-2 bg-white text-black hover:bg-[#f2ca1c] transition-colors shadow-sm">
              <Languages size={18} />
              <span className="hidden sm:inline">En</span>
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-sm border-none rounded-xl px-4 py-2 font-bold flex items-center gap-2 bg-white text-black transition-colors shadow-sm"
            >
              <Plus
                size={18}
                className="transition-transform duration-500"
                style={{ transform: menuOpen ? "rotate(45deg)" : "rotate(0deg)" }}
              />
              <span>{menuOpen ? "Close" : "Menu"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Menu Overlay - Fixed Z-Index and Layout */}
      <div
        className={clsx(
          "fixed inset-0 h-screen w-full bg-[#e3e1de] z-[55] transform-gpu transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col justify-center items-center px-6",
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
                {item}
                {/* Subtle Underline Effect */}
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#f2ca1c] transition-all duration-500 group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}