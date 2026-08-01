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
    <footer className="bg-[#0B25B7] text-white border-t-4 border-blue-950 pt-12 pb-8 relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-blue-400/30 relative z-10">
        {/* BRANDING */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-xl border border-blue-900 shadow-md">
              <img src={logo} alt="HIMAMI Logo" className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight text-white uppercase">
                HIMAMI
              </h2>
              <p className="text-xs font-black text-yellow-300 uppercase tracking-wide">
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
              className="bg-white text-[#0B25B7] border border-white p-2.5 rounded-xl hover:bg-yellow-300 hover:text-black transition-all duration-200 shadow-md"
            >
              <InstagramIcon size={18} />
            </a>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="bg-white text-[#0B25B7] border border-white p-2.5 rounded-xl hover:bg-yellow-300 hover:text-black transition-all duration-200 shadow-md"
            >
              <MessageSquare size={18} />
            </a>
            <a
              href="mailto:himami@email.com"
              aria-label="Email"
              className="bg-white text-[#0B25B7] border border-white p-2.5 rounded-xl hover:bg-yellow-300 hover:text-black transition-all duration-200 shadow-md"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* QUICK NAVIGATION */}
        <div>
          <h3 className="text-base font-black uppercase text-yellow-300 mb-4 flex items-center gap-2 tracking-wider">
            <span className="w-2.5 h-2.5 bg-yellow-300 rounded-full"></span>
            Navigasi
          </h3>
          <ul className="space-y-2.5 text-sm font-semibold">
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
                  className="text-blue-100 hover:text-yellow-300 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-yellow-300 font-bold">›</span> {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* DEVELOPER CREDIT CARD */}
        <div className="bg-blue-900/80 border border-blue-400/40 p-5 rounded-2xl relative shadow-xl backdrop-blur-sm">
          <div className="absolute -top-3 right-4 bg-yellow-300 text-black border border-black text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase shadow-md">
            Official Developer
          </div>
          <h3 className="text-sm font-black uppercase text-white mb-2 flex items-center gap-2">
            <Code2 size={18} className="text-yellow-300" /> Web Builder
          </h3>
          <p className="text-xs text-blue-100 leading-relaxed mb-3 font-semibold">
            Website ini dirancang dan dikembangkan secara eksklusif oleh:
          </p>
          <div className="bg-white text-[#0B25B7] border border-white p-3 rounded-xl font-black text-center shadow-md hover:bg-yellow-300 hover:text-black transition-colors">
            <span className="text-base font-black uppercase tracking-wide">M. Haikal</span>
            <p className="text-[10px] font-extrabold text-blue-950">Lead Fullstack Developer & Designer</p>
          </div>
        </div>
      </div>

      {/* FOOTER BOTTOM & BACK TO TOP */}
      <div className="max-w-[1400px] mx-auto px-6 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold text-blue-100/90 relative z-10">
        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          <span>© {new Date().getFullYear()} HIMAMI • Crafted with</span>
          <Heart size={14} className="text-red-400 fill-red-400 inline" />
          <span>by</span>
          <span className="bg-yellow-300 text-black px-2.5 py-0.5 border border-black rounded-md font-black uppercase text-[11px]">
            M. Haikal
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="bg-white hover:bg-yellow-300 text-[#0B25B7] hover:text-black border border-white px-4 py-2 rounded-xl font-black shadow-md flex items-center gap-2 transition-all cursor-pointer text-xs uppercase tracking-wider"
        >
          <span>KEMBALI KE ATAS</span>
          <ArrowUp size={16} />
        </motion.button>
      </div>
    </footer>
  );
}

export default Footer;
