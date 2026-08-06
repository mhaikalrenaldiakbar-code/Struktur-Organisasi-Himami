import { motion } from "framer-motion";
import { ArrowUp, Code2, Heart, Mail, MessageSquare, Shield } from "lucide-react";
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
    <footer className="bg-gradient-to-b from-[#0B1957] via-[#0A1128] to-[#050A1A] text-white border-t-4 border-amber-500 pt-14 pb-8 relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/15 relative z-10">
        {/* BRANDING */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-2xl border-2 border-amber-400 shadow-md">
              <img src={logo} alt="HIMAMI Logo" className="w-9 h-9 object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-2xl font-black tracking-tight text-white uppercase font-sans">
                  HIMAMI
                </h2>
                <Shield size={16} className="text-amber-400" />
              </div>
              <p className="text-xs font-black text-amber-300 uppercase tracking-wide">
                Himpunan Mahasiswa Manajemen Informatika
              </p>
            </div>
          </div>

          <p className="text-blue-100/90 text-sm max-w-md leading-relaxed font-semibold">
            Wadah pengembangan minat, bakat, keilmuan, dan karakter mahasiswa Manajemen Informatika. Bersatu, Berkarya, Bermanfaat.
          </p>

          <div className="flex gap-3 pt-2">
            <a
              href="https://instagram.com/himami_official"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="bg-white/10 text-white border border-white/20 p-2.5 rounded-xl hover:bg-amber-400 hover:text-slate-950 transition-all duration-200 shadow-md"
            >
              <InstagramIcon size={18} />
            </a>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="bg-white/10 text-white border border-white/20 p-2.5 rounded-xl hover:bg-amber-400 hover:text-slate-950 transition-all duration-200 shadow-md"
            >
              <MessageSquare size={18} />
            </a>
            <a
              href="mailto:himami@email.com"
              aria-label="Email"
              className="bg-white/10 text-white border border-white/20 p-2.5 rounded-xl hover:bg-amber-400 hover:text-slate-950 transition-all duration-200 shadow-md"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* QUICK NAVIGATION */}
        <div>
          <h3 className="text-base font-black uppercase text-amber-400 mb-4 flex items-center gap-2 tracking-wider">
            <span className="w-2.5 h-2.5 bg-amber-400 rounded-full"></span>
            Navigasi Portal
          </h3>
          <ul className="space-y-2.5 text-sm font-semibold">
            {[
              { name: "Beranda Utama", href: "#home" },
              { name: "Profil & Bendera", href: "#about" },
              { name: "Struktur Divisi", href: "#divisi" },
              { name: "Kegiatan & Event", href: "#event" },
              { name: "Galeri Foto", href: "#gallery" },
              { name: "Kontak Resmi", href: "#contact" },
            ].map((item, idx) => (
              <li key={idx}>
                <a
                  href={item.href}
                  className="text-blue-100 hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-amber-400 font-bold">›</span> {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* DEVELOPER CREDIT CARD */}
        <div className="bg-blue-950/80 border border-amber-400/50 p-5 rounded-3xl relative shadow-xl backdrop-blur-sm">
          <div className="absolute -top-3 right-4 bg-amber-400 text-slate-950 border border-slate-950 text-[10px] font-black px-3 py-0.5 rounded-full uppercase shadow-md">
            Official Developer
          </div>
          <h3 className="text-sm font-black uppercase text-white mb-2 flex items-center gap-2">
            <Code2 size={18} className="text-amber-400" /> Web Creator
          </h3>
          <p className="text-xs text-blue-100 leading-relaxed mb-3 font-semibold">
            Website organisasi ini dirancang dan dikembangkan secara eksklusif oleh:
          </p>
          <div className="bg-white text-[#0B1957] border border-white p-3 rounded-2xl font-black text-center shadow-md hover:bg-amber-400 hover:text-slate-950 transition-colors">
            <span className="text-base font-black uppercase tracking-wide">M. Haikal</span>
            <p className="text-[10px] font-extrabold text-slate-800">Lead Developer & UI Designer</p>
          </div>
        </div>
      </div>

      {/* FOOTER BOTTOM & BACK TO TOP */}
      <div className="max-w-[1400px] mx-auto px-6 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold text-blue-200/90 relative z-10">
        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          <span>© {new Date().getFullYear()} HIMAMI • Crafted with</span>
          <Heart size={14} className="text-red-400 fill-red-400 inline" />
          <span>by</span>
          <span className="bg-amber-400 text-slate-950 px-2.5 py-0.5 border border-slate-950 rounded-md font-black uppercase text-[11px]">
            M. Haikal
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="bg-white hover:bg-amber-400 text-[#0B1957] hover:text-slate-950 border border-white px-4 py-2 rounded-xl font-black shadow-md flex items-center gap-2 transition-all cursor-pointer text-xs uppercase tracking-wider"
        >
          <span>KEMBALI KE ATAS</span>
          <ArrowUp size={16} />
        </motion.button>
      </div>
    </footer>
  );
}
export default Footer;
