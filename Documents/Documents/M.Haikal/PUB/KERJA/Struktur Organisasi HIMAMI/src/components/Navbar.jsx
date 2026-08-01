import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2, Sparkles } from "lucide-react";
import logo from "../assets/logo-himami.png";

function Navbar() {
  const [active, setActive] = useState("home");
  const [isOpen, setIsOpen] = useState(false);

  const menus = [
    { name: "BERANDA", path: "home" },
    { name: "TENTANG", path: "about" },
    { name: "DIVISI", path: "divisi" },
    { name: "KEGIATAN", path: "event" },
    { name: "GALERI", path: "gallery" },
    { name: "KONTAK", path: "contact" },
  ];

  // SCROLL SPY
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;

      for (let i = menus.length - 1; i >= 0; i--) {
        const section = document.getElementById(menus[i].path);
        if (section) {
          if (scrollPos >= section.offsetTop) {
            setActive(menus[i].path);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="bg-gradient-to-r from-[#0B25B7] via-blue-900 to-indigo-950 border-b-4 border-blue-950 sticky top-0 z-50 shadow-2xl backdrop-blur-md">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        {/* LOGO */}
        <motion.a
          href="#home"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="
            bg-white
            border-2 border-blue-900
            px-4 py-2
            rounded-2xl
            shadow-lg
            flex items-center gap-3
            cursor-pointer
            group
            transition-all duration-200
          "
        >
          <img
            src={logo}
            alt="HIMAMI Logo"
            className="w-8 h-8 md:w-9 md:h-9 object-contain group-hover:rotate-6 transition-transform"
          />

          <div>
            <h1 className="text-xl md:text-2xl font-black text-[#0B25B7] leading-none uppercase tracking-tight">
              HIMAMI
            </h1>
            <span className="text-[9px] font-black text-blue-950 tracking-wider block uppercase">
              UNAS PASIM BANDUNG
            </span>
          </div>
        </motion.a>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex items-center gap-2">
          {menus.map((menu, index) => {
            const isActive = active === menu.path;
            return (
              <motion.a
                href={`#${menu.path}`}
                key={index}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`
                  px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl
                  transition-all duration-200
                  cursor-pointer
                  ${
                    isActive
                      ? "bg-white text-[#0B25B7] shadow-xl border border-white scale-105"
                      : "text-white hover:bg-white/10 hover:text-yellow-300 border border-transparent"
                  }
                `}
              >
                {menu.name}
              </motion.a>
            );
          })}

          <div className="ml-3 pl-3 border-l border-blue-400/40 hidden xl:flex items-center gap-2 text-[11px] font-extrabold text-white bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-xl shadow-inner">
            <Code2 size={14} className="text-yellow-300 animate-pulse" />
            <span>
              by <strong className="text-yellow-300 font-black">M. Haikal</strong>
            </span>
          </div>
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="
              bg-white
              border-2 border-blue-900
              p-2.5
              rounded-xl
              text-[#0B25B7]
              shadow-lg
              active:scale-95 transition-all
            "
          >
            {isOpen ? <X size={24} className="text-red-600" /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-gradient-to-b from-[#091E96] to-indigo-950 border-t border-blue-800 overflow-hidden shadow-2xl"
          >
            <div className="p-5 flex flex-col gap-2">
              {menus.map((menu, index) => (
                <a
                  key={index}
                  href={`#${menu.path}`}
                  onClick={() => setIsOpen(false)}
                  className={`
                    px-5 py-3 text-sm font-black rounded-xl tracking-wider text-center uppercase transition-all
                    ${
                      active === menu.path
                        ? "bg-white text-[#0B25B7] shadow-lg"
                        : "bg-blue-950/60 text-white border border-blue-800/80 hover:bg-blue-900"
                    }
                  `}
                >
                  {menu.name}
                </a>
              ))}

              <div className="mt-2 pt-3 border-t border-blue-800 text-center text-xs font-semibold text-blue-100 flex items-center justify-center gap-2">
                <span>Designed & Developed by</span>
                <span className="bg-yellow-300 text-black px-3 py-0.5 border border-black rounded-md font-black uppercase text-[10px] shadow-sm">
                  M. Haikal
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
