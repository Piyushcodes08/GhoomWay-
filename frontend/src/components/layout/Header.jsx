import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import logo from "../../assets/logo (1).svg";
import { Plus } from "lucide-react";
import { navLinks } from "../../constants/data.jsx";

const menuOverlayVariants = {
  open:   "translate-x-0 opacity-100 visible",
  closed: "translate-x-full opacity-0 invisible",
};

// ─── Header ───
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
          "fixed top-0 left-0 w-full transition-all duration-300 font-poppins z-[60]",
          scrolled ? "bg-black/90 backdrop-blur-md" : "bg-transparent",
          menuOpen && "bg-transparent backdrop-blur-none"
        )}
      >
        <div className="max-w-7xl mx-auto md:px-6 h-16 px-[15px] flex items-center justify-between">
          <Link className="flex items-center" to="/" onClick={() => setMenuOpen(false)}>
            <img src={logo} alt="Ghoomway Logo" className="w-20 md:w-24 h-auto" />
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-sm border-none rounded-none sm:rounded-xl px-4 py-2 font-bold flex items-center gap-2 bg-white text-black transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f2ca1c]"
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

      <div
        className={clsx(
          "fixed inset-0 h-screen w-full bg-[#e3e1de] z-[55] transform-gpu transition-all duration-500 flex flex-col justify-center items-center px-6",
          menuOpen ? menuOverlayVariants.open : menuOverlayVariants.closed
        )}
      >
        <ul className="w-full max-w-4xl text-left sm:text-center space-y-4">
          <li className="group">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="relative inline-block w-full py-2 text-4xl sm:text-6xl md:text-7xl font-black text-black capitalize transition-all duration-500 hover:text-[#31468e] hover:translate-x-4 sm:hover:translate-x-0"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#f2ca1c] transition-all duration-500 group-hover:w-full"></span>
            </Link>
          </li>
          {navLinks.map((item) => (
            <li key={item} className="group">
              <Link
                to={`/${item}`}
                onClick={() => setMenuOpen(false)}
                className="relative inline-block w-full py-2 text-4xl sm:text-6xl md:text-7xl font-black text-black capitalize transition-all duration-500 hover:text-[#31468e] hover:translate-x-4 sm:hover:translate-x-0"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#f2ca1c] transition-all duration-500 group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}