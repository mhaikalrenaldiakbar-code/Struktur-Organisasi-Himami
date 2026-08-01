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
    <nav className="sticky top-0 z-50 bg-[#090D16]/90 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl transition-all duration-300">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between">
        {/* LOGO */}
        <motion.a
          href="#home"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="
            bg-slate-900/90
            border border-blue-500/30 hover:border-blue-500/60
            px-4 py-2
            rounded-2xl
            shadow-lg shadow-blue-950/50
            flex items-center gap-3
            cursor-pointer
            group
            transition-all duration-300
          "
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-sm opacity-60 group-hover:opacity-100 transition duration-300"></div>
            <img
              src={logo}
              alt="HIMAMI Logo"
              className="relative w-8 h-8 md:w-9 md:h-9 object-contain group-hover:rotate-6 transition-transform duration-300"
            />
          </div>

          <div>
            <h1 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-300 leading-none uppercase tracking-tight">
              HIMAMI
            </h1>
            <span className="text-[9px] font-extrabold text-slate-400 tracking-widest block uppercase mt-0.5">
              UNAS PASIM BANDUNG
            </span>
          </div>
        </motion.a>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex items-center gap-1.5 bg-slate-950/60 border border-slate-800/80 p-1.5 rounded-2xl backdrop-blur-md shadow-inner">
          {menus.map((menu, index) => {
            const isActive = active === menu.path;
            return (
              <motion.a
                href={`#${menu.path}`}
                key={index}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.04 }}
                className={`
                  relative px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl
                  transition-all duration-300
                  cursor-pointer flex items-center gap-1.5
                  ${
                    isActive
                      ? "bg-gradient-to-r from-[#0B25B7] to-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }
                `}
              >
                {isActive && (
                  <Sparkles size={12} className="text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} />
                )}
                {menu.name}
              </motion.a>
            );
          })}

          <div className="ml-2 pl-3 border-l border-slate-800 hidden xl:flex items-center gap-2 text-[11px] font-extrabold text-slate-300 bg-gradient-to-r from-blue-950/40 to-indigo-950/40 border border-blue-500/20 px-3.5 py-1.5 rounded-xl">
            <Code2 size={14} className="text-amber-400 animate-pulse" />
            <span>
              by <strong className="text-amber-400 font-black">M. Haikal</strong>
            </span>
          </div>
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="
              bg-slate-900
              border border-slate-700
              p-2.5
              rounded-xl
              text-blue-400
              shadow-lg
              active:scale-95 transition-all
            "
          >
            {isOpen ? <X size={24} className="text-rose-400" /> : <Menu size={24} />}
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
            className="lg:hidden bg-slate-950/95 border-t border-slate-800 overflow-hidden shadow-2xl backdrop-blur-xl"
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
                        ? "bg-gradient-to-r from-[#0B25B7] to-blue-600 text-white shadow-lg shadow-blue-600/30"
                        : "bg-slate-900/80 text-slate-300 border border-slate-800 hover:bg-slate-800"
                    }
                  `}
                >
                  {menu.name}
                </a>
              ))}

              <div className="mt-2 pt-3 border-t border-slate-800 text-center text-xs font-semibold text-slate-400 flex items-center justify-center gap-2">
                <span>Designed & Developed by</span>
                <span className="bg-amber-400 text-slate-950 px-3 py-0.5 rounded-md font-black uppercase text-[10px] shadow-sm">
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
