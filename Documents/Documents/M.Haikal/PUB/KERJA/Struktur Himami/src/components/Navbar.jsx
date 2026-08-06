import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2, ShieldCheck } from "lucide-react";
import logo from "../assets/logo-himami.png";

function Navbar() {
  const [active, setActive] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menus = [
    { name: "BERANDA", path: "home" },
    { name: "TENTANG", path: "about" },
    { name: "DIVISI", path: "divisi" },
    { name: "KEGIATAN", path: "event" },
    { name: "GALERI", path: "gallery" },
    { name: "KONTAK", path: "contact" },
  ];

  // SCROLL SPY & HEADER GLOW ON SCROLL
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      const scrollPos = window.scrollY + 220;

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
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0B1957]/95 backdrop-blur-md shadow-2xl border-b-2 border-blue-600/40 py-2.5"
          : "bg-gradient-to-r from-[#0B1957] via-[#0B25B7] to-[#0B1957] border-b-4 border-yellow-500/80 py-3.5 shadow-xl"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* OFFICIAL BRANDING LOGO */}
        <motion.a
          href="#home"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="
            bg-white/95 backdrop-blur-sm
            border-2 border-blue-900/30
            px-3.5 py-1.5 md:px-4 md:py-2
            rounded-2xl
            shadow-lg hover:shadow-blue-500/20
            flex items-center gap-3
            cursor-pointer
            group
            transition-all duration-200
          "
        >
          <div className="relative">
            <img
              src={logo}
              alt="HIMAMI Logo"
              className="w-9 h-9 md:w-10 md:h-10 object-contain group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 drop-shadow"
            />
            <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-xl md:text-2xl font-black text-[#0B1957] leading-none uppercase tracking-tight font-sans">
                HIMAMI
              </h1>
              <ShieldCheck size={14} className="text-blue-700 hidden sm:inline" />
            </div>
            <span className="text-[9px] md:text-[10px] font-black text-blue-900 tracking-wider block uppercase">
              WEBSITE RESMI ORGANISASI
            </span>
          </div>
        </motion.a>

        {/* DESKTOP NAVIGATION MENU */}
        <div className="hidden lg:flex items-center gap-1.5">
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
                  cursor-pointer relative flex items-center gap-1.5
                  ${
                    isActive
                      ? "bg-white text-[#0B1957] shadow-lg font-black border border-white"
                      : "text-white/90 hover:bg-white/10 hover:text-white border border-transparent"
                  }
                `}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] inline-block animate-ping"></span>
                )}
                <span>{menu.name}</span>
              </motion.a>
            );
          })}

          {/* CREATOR BADGE */}
          <div className="ml-3 pl-3 border-l border-white/20 hidden xl:flex items-center gap-1.5 text-[11px] font-extrabold text-white bg-blue-950/80 border border-yellow-400/40 px-3 py-1.5 rounded-xl shadow-inner">
            <Code2 size={13} className="text-amber-400" />
            <span>Dev by <strong className="text-amber-300">M. Haikal</strong></span>
          </div>
        </div>

        {/* MOBILE HAMBURGER TOGGLE */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="
              bg-white text-[#0B1957]
              border-2 border-blue-900/20
              p-2.5
              rounded-xl
              shadow-md
              active:scale-95 transition-all
            "
          >
            {isOpen ? <X size={24} className="text-red-600" /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE EXPANDABLE DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-[#0B1957] border-t border-blue-800/80 overflow-hidden shadow-2xl"
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
                        ? "bg-white text-[#0B1957] shadow-lg border-2 border-yellow-400"
                        : "bg-blue-950/80 text-white border border-blue-800/60 hover:bg-blue-900"
                    }
                  `}
                >
                  {menu.name}
                </a>
              ))}

              <div className="mt-3 pt-3 border-t border-blue-800 text-center text-xs font-semibold text-blue-100 flex items-center justify-center gap-2">
                <span>Website Resmi Organisasi HIMAMI • Dev by</span>
                <span className="bg-amber-400 text-slate-950 px-2.5 py-0.5 border border-slate-900 rounded-md font-black uppercase text-[10px]">
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

