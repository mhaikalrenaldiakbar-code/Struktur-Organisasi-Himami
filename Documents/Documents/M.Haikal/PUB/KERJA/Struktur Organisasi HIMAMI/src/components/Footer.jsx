import { motion } from "framer-motion";
import { ArrowUp, Code2, Heart, Mail, MessageSquare } from "lucide-react";
import logo from "../assets/logo-himami.png";

const InstagramIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#090D16] text-slate-100 border-t border-slate-800/80 pt-16 pb-10 relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80 relative z-10">
        {/* BRANDING */}
        <div className="md:col-span-2 space-y-5">
          <div className="flex items-center gap-3.5">
            <div className="bg-slate-900 p-2.5 rounded-2xl border border-blue-500/30 shadow-lg">
              <img src={logo} alt="HIMAMI Logo" className="w-9 h-9" />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-300 uppercase">
                HIMAMI
              </h2>
              <p className="text-xs font-black text-amber-400 uppercase tracking-widest mt-0.5">
                Himpunan Mahasiswa Manajemen Informatika
              </p>
            </div>
          </div>

          <p className="text-slate-400 text-sm max-w-md leading-relaxed font-medium">
            Wadah pengembangan minat, bakat, keilmuan, dan karakter mahasiswa Manajemen Informatika Universitas Nasional PASIM Bandung. Bersatu, Berkarya, Bermanfaat.
          </p>

          <div className="flex gap-3 pt-2">
            <a
              href="https://instagram.com/himami_official"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="bg-slate-900 text-blue-400 border border-slate-800 p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white transition-all duration-300 shadow-md"
            >
              <InstagramIcon size={18} />
            </a>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="bg-slate-900 text-emerald-400 border border-slate-800 p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white transition-all duration-300 shadow-md"
            >
              <MessageSquare size={18} />
            </a>
            <a
              href="mailto:himami@email.com"
              aria-label="Email"
              className="bg-slate-900 text-sky-400 border border-slate-800 p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white transition-all duration-300 shadow-md"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* QUICK NAVIGATION */}
        <div>
          <h3 className="text-base font-black uppercase text-amber-400 mb-5 flex items-center gap-2 tracking-wider">
            <span className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-pulse"></span>
            Navigasi
          </h3>
          <ul className="space-y-3 text-sm font-medium">
            {[
              { name: "Beranda", href: "#home" },
              { name: "Tentang Kami", href: "#about" },
              { name: "Struktur Divisi", href: "#divisi" },
              { name: "Kegiatan & Event", href: "#event" },
              { name: "Galeri Foto", href: "#gallery" },
              { name: "Kontak", href: "#contact" },
            ].map((item, idx) => (
              <li key={idx}>
                <a
                  href={item.href}
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="text-amber-400 font-bold group-hover:translate-x-1 transition-transform">›</span> {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* DEVELOPER CREDIT CARD */}
        <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl relative shadow-2xl backdrop-blur-xl group hover:border-blue-500/50 transition-all duration-300">
          <div className="absolute -top-3 right-4 bg-amber-400 text-slate-950 text-[10px] font-black px-3 py-0.5 rounded-full uppercase shadow-md">
            Official Developer
          </div>
          <h3 className="text-sm font-black uppercase text-white mb-2 flex items-center gap-2">
            <Code2 size={18} className="text-amber-400" /> Web Builder
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-4 font-medium">
            Website ini dirancang dan dikembangkan secara eksklusif oleh:
          </p>
          <div className="bg-slate-950 text-white border border-blue-500/30 p-3.5 rounded-2xl font-black text-center shadow-lg group-hover:border-amber-400/50 transition-colors">
            <span className="text-base font-black uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-amber-300">M. Haikal</span>
            <p className="text-[10px] font-bold text-slate-400 mt-0.5">Lead Fullstack Developer & Designer</p>
          </div>
        </div>
      </div>

      {/* FOOTER BOTTOM & BACK TO TOP */}
      <div className="max-w-[1400px] mx-auto px-6 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-400 relative z-10">
        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          <span>© {new Date().getFullYear()} HIMAMI • Crafted with</span>
          <Heart size={14} className="text-rose-500 fill-rose-500 inline" />
          <span>by</span>
          <span className="bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-md font-black uppercase text-[11px]">
            M. Haikal
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="bg-slate-900 hover:bg-gradient-to-r hover:from-[#0B25B7] hover:to-blue-600 text-slate-200 hover:text-white border border-slate-800 px-5 py-2.5 rounded-xl font-black shadow-lg flex items-center gap-2 transition-all cursor-pointer text-xs uppercase tracking-wider"
        >
          <span>KEMBALI KE ATAS</span>
          <ArrowUp size={16} className="text-amber-400" />
        </motion.button>
      </div>
    </footer>
  );
}

export default Footer;
