import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Sparkles,
  Trophy,
  Users,
  UsersRound,
  Code,
  Rocket,
  Compass,
} from "lucide-react";

import logo from "../assets/logo-himami.png";

function Home() {
  /* ================= ANIMATION VARIANTS ================= */
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 35 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -50 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 50 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="home"
      className="scroll-mt-20 bg-[#0B0F19] text-slate-100 overflow-hidden relative border-b border-slate-800/80 pb-24"
    >
      {/* ANNOUNCEMENT TICKER */}
      <div className="bg-gradient-to-r from-blue-950 via-[#0B25B7] to-indigo-950 text-white py-3 overflow-hidden whitespace-nowrap font-extrabold text-xs md:text-sm tracking-wide uppercase border-b border-blue-500/20 shadow-xl">
        <div className="inline-flex gap-10 animate-marquee">
          <span className="flex items-center gap-2"><Sparkles size={14} className="text-amber-300 animate-spin" style={{ animationDuration: '6s' }} /> Official Website HIMAMI • Sinergi & Inovasi Mahasiswa Manajemen Informatika</span>
          <span className="flex items-center gap-2"><Code size={14} className="text-blue-300" /> Developed by M. Haikal</span>
          <span className="flex items-center gap-2"><Rocket size={14} className="text-amber-300" /> Bersatu • Berkarya • Bermanfaat</span>
          <span className="flex items-center gap-2"><Sparkles size={14} className="text-amber-300 animate-spin" style={{ animationDuration: '6s' }} /> Welcome to HIMAMI Hub UNAS PASIM</span>
          <span className="flex items-center gap-2"><Code size={14} className="text-blue-300" /> Developed by M. Haikal</span>
        </div>
      </div>

      {/* BACKGROUND MESH & GLOW EFFECTS */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-10 left-1/4 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-40 right-10 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-12 md:pt-20 relative z-10">
        {/* ================= HERO MAIN GRID ================= */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid lg:grid-cols-12 items-center gap-12 min-h-[75vh]"
        >
          {/* LEFT CONTENT (7 COLS) */}
          <motion.div variants={fadeLeft} className="lg:col-span-7 space-y-7">
            {/* BADGES */}
            <div className="flex flex-wrap items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0B25B7] to-indigo-600 text-white border border-blue-400/40 px-4 py-2 text-xs md:text-sm font-black rounded-full shadow-lg shadow-blue-600/25 backdrop-blur-md"
              >
                <Sparkles size={16} className="text-amber-300 animate-pulse" />
                <span>HIMAMI KABINET 2025/2026</span>
              </motion.div>

              <div className="inline-flex items-center gap-1.5 bg-slate-900/90 text-slate-300 border border-slate-700/80 px-4 py-1.5 text-xs font-black rounded-full shadow-md backdrop-blur-md">
                <Code size={13} className="text-blue-400" />
                DEV BY <span className="text-amber-400 font-black">M. HAIKAL</span>
              </div>
            </div>

            {/* HERO TITLE */}
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase text-white leading-[0.95] tracking-tight"
            >
              Himpunan <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-300 inline-block my-1 filter drop-shadow-lg">
                Mahasiswa
              </span>{" "}
              <br />
              Manajemen Informatika
            </motion.h1>

            {/* SLOGAN BADGE */}
            <motion.div variants={fadeUp}>
              <div className="inline-block bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/80 border border-blue-500/40 text-blue-300 px-5 py-2.5 text-xs md:text-sm font-black rounded-xl uppercase tracking-widest shadow-xl backdrop-blur-md">
                ⚡ BERSATU • BERKARYA • BERMANFAAT
              </div>
            </motion.div>

            {/* DESCRIPTION */}
            <motion.p
              variants={fadeUp}
              className="text-base md:text-lg text-slate-300 font-medium leading-relaxed max-w-2xl bg-slate-900/80 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 shadow-2xl"
            >
              Wadah resmi mahasiswa Manajemen Informatika Universitas Nasional PASIM untuk menempa keilmuan teknologi, mengembangkan kepemimpinan, dan menciptakan inovasi karya digital yang bermanfaat.
            </motion.p>

            {/* CALL TO ACTION BUTTONS */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
              <motion.a
                href="#about"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="
                  bg-gradient-to-r from-[#0B25B7] via-blue-600 to-indigo-600
                  hover:from-blue-600 hover:to-indigo-500
                  text-white
                  border border-blue-400/40
                  px-7 py-4
                  rounded-2xl
                  font-black
                  text-sm md:text-base
                  shadow-xl shadow-blue-600/30
                  flex items-center gap-3
                  transition-all duration-300
                  cursor-pointer
                  uppercase tracking-wider
                "
              >
                TENTANG KAMI <ArrowRight size={20} className="text-amber-300" />
              </motion.a>

              <motion.a
                href="#divisi"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="
                  bg-slate-900/90
                  hover:bg-slate-800
                  text-slate-200
                  hover:text-white
                  border border-slate-700
                  px-7 py-4
                  rounded-2xl
                  font-black
                  text-sm md:text-base
                  shadow-lg
                  flex items-center gap-3
                  transition-all duration-300
                  cursor-pointer
                  uppercase tracking-wider
                "
              >
                STRUKTUR DIVISI <ArrowRight size={20} className="text-blue-400" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* RIGHT HERO ARTWORK (5 COLS) */}
          <motion.div
            variants={fadeRight}
            className="lg:col-span-5 relative flex justify-center items-center py-8"
          >
            {/* ROTATING ORBIT RINGS */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] border border-dashed border-blue-500/30 rounded-full pointer-events-none"
            />

            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              className="absolute w-[270px] h-[270px] sm:w-[340px] sm:h-[340px] border border-indigo-400/25 rounded-full pointer-events-none"
            />

            {/* LOGO DISPLAY */}
            <div className="relative z-10 bg-slate-900/90 border border-slate-800 p-8 rounded-3xl shadow-2xl backdrop-blur-xl group hover:border-blue-500/50 transition-all duration-500">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-amber-500 rounded-3xl blur-md opacity-30 group-hover:opacity-60 transition duration-500"></div>
              
              <div className="relative z-10">
                <motion.img
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1, y: [0, -10, 0] }}
                  transition={{
                    scale: { duration: 0.5 },
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  }}
                  src={logo}
                  alt="HIMAMI Logo"
                  className="w-[200px] sm:w-[240px] h-auto object-contain mx-auto filter drop-shadow-2xl"
                />
                <div className="mt-5 text-center border-t border-slate-800 pt-4">
                  <span className="font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-amber-300 block uppercase tracking-wider">HIMAMI</span>
                  <span className="text-[10px] font-black text-amber-400 uppercase bg-amber-400/10 px-3.5 py-1 border border-amber-400/30 rounded-full inline-block mt-1">
                    UNAS PASIM BANDUNG
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ================= STATS SECTION ================= */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={container}
          className="mt-16 bg-gradient-to-r from-slate-900 via-blue-950/80 to-slate-900 border border-slate-800 rounded-3xl shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 p-6 md:p-8 backdrop-blur-xl"
        >
          {[
            ["120+", "Anggota Aktif", <Users key="users" size={24} />],
            ["30+", "Kegiatan Pertahun", <CalendarDays key="calendar" size={24} />],
            ["15+", "Prestasi Regional", <Trophy key="trophy" size={24} />],
            ["5+", "Divisi Pengurus", <UsersRound key="divisi" size={24} />],
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.03, y: -4 }}
              className="bg-slate-950/80 border border-slate-800 p-4 md:p-5 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center gap-4 text-slate-100 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center text-blue-400 shrink-0">
                {item[2]}
              </div>

              <div className="text-center sm:text-left">
                <h2 className="text-2xl md:text-3xl font-black text-white leading-none">{item[0]}</h2>
                <p className="text-xs md:text-sm font-extrabold text-slate-400 mt-1 uppercase tracking-tight">{item[1]}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ================= FEATURE HIGHLIGHT CARDS ================= */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ y: -6 }}
            className="bg-slate-900/80 border border-slate-800 p-7 rounded-3xl shadow-xl hover:border-blue-500/50 transition-all duration-300 backdrop-blur-xl group"
          >
            <div className="w-13 h-13 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-2xl flex items-center justify-center font-black mb-5 group-hover:scale-110 transition-transform">
              <Code size={26} />
            </div>
            <h3 className="text-xl font-black uppercase text-white mb-2 tracking-tight">Pengembangan IT</h3>
            <p className="text-sm font-medium text-slate-400 leading-relaxed">
              Pelatihan programming, pengembangan web/mobile, workshop cyber security, dan penguasaan tools IT terkini.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -6 }}
            className="bg-slate-900/80 border border-slate-800 p-7 rounded-3xl shadow-xl hover:border-indigo-500/50 transition-all duration-300 backdrop-blur-xl group"
          >
            <div className="w-13 h-13 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl flex items-center justify-center font-black shadow-lg shadow-blue-600/30 mb-5 group-hover:scale-110 transition-transform">
              <Rocket size={26} />
            </div>
            <h3 className="text-xl font-black uppercase text-white mb-2 tracking-tight">Karakter & Leadership</h3>
            <p className="text-sm font-medium text-slate-400 leading-relaxed">
              Membentuk jiwa kepemimpinan yang berintegritas, beretika, profesional, dan siap berkontribusi bagi masyarakat.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -6 }}
            className="bg-slate-900/80 border border-slate-800 p-7 rounded-3xl shadow-xl hover:border-amber-500/50 transition-all duration-300 backdrop-blur-xl group"
          >
            <div className="w-13 h-13 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-2xl flex items-center justify-center font-black mb-5 group-hover:scale-110 transition-transform">
              <Compass size={26} />
            </div>
            <h3 className="text-xl font-black uppercase text-white mb-2 tracking-tight">Jaringan & Relasi</h3>
            <p className="text-sm font-medium text-slate-400 leading-relaxed">
              Koneksi luas antar alumni, himpunan mahasiswa antar universitas, dan kemitraan dengan industri teknologi.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Home;
