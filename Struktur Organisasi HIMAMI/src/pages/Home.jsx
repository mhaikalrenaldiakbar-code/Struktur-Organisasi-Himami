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
      className="scroll-mt-20 bg-[#F8FAFC] overflow-hidden relative border-b border-slate-200 pb-20 text-slate-900"
    >
      {/* ANNOUNCEMENT TICKER */}
      <div className="bg-[#0B25B7] text-white py-2.5 overflow-hidden whitespace-nowrap font-extrabold text-xs md:text-sm tracking-wide uppercase shadow-md">
        <div className="inline-flex gap-8 animate-marquee">
          <span>⚡ Official Website HIMAMI • Sinergi & Inovasi Mahasiswa Manajemen Informatika</span>
          <span>⚡ Developed by M. Haikal</span>
          <span>⚡ Bersatu • Berkarya • Bermanfaat</span>
          <span>⚡ Welcome to HIMAMI Hub</span>
          <span>⚡ Official Website HIMAMI • Sinergi & Inovasi Mahasiswa Manajemen Informatika</span>
          <span>⚡ Developed by M. Haikal</span>
        </div>
      </div>

      {/* BACKGROUND GRADIENT GLOWS */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-10 w-[500px] h-[500px] bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-10 md:pt-16 relative z-10">
        {/* ================= HERO MAIN GRID ================= */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid lg:grid-cols-12 items-center gap-10 min-h-[75vh]"
        >
          {/* LEFT CONTENT (7 COLS) */}
          <motion.div variants={fadeLeft} className="lg:col-span-7 space-y-6">
            {/* BADGES */}
            <div className="flex flex-wrap items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 bg-[#0B25B7] text-white border border-blue-900 px-4 py-1.5 text-xs md:text-sm font-black rounded-full shadow-md"
              >
                <Sparkles size={16} className="text-yellow-300 animate-pulse" />
                <span>HIMAMI KABINET 2025/2026</span>
              </motion.div>

              <div className="inline-block bg-white text-slate-800 border border-slate-300 px-3.5 py-1 text-xs font-black rounded-full shadow-sm">
                DEV BY <span className="text-[#0B25B7] font-black">M. HAIKAL</span>
              </div>
            </div>

            {/* HERO TITLE */}
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase text-slate-900 leading-[0.95] tracking-tight"
            >
              Himpunan <br />
              <span className="text-white bg-[#0B25B7] px-3.5 py-1 rounded-2xl inline-block my-1 shadow-lg shadow-blue-600/30 border border-blue-800">
                Mahasiswa
              </span>{" "}
              <br />
              Manajemen Informatika
            </motion.h1>

            {/* SLOGAN BADGE */}
            <motion.div variants={fadeUp}>
              <div className="inline-block bg-white border-2 border-[#0B25B7] text-[#0B25B7] px-5 py-2.5 text-sm md:text-lg font-black rounded-xl uppercase tracking-widest shadow-md">
                BERSATU • BERKARYA • BERMANFAAT
              </div>
            </motion.div>

            {/* DESCRIPTION */}
            <motion.p
              variants={fadeUp}
              className="text-base md:text-lg text-slate-700 font-semibold leading-relaxed max-w-2xl bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-slate-200 shadow-xl"
            >
              Wadah resmi mahasiswa Manajemen Informatika untuk menempa keilmuan teknologi, mengembangkan kepemimpinan, dan menciptakan inovasi karya digital yang bermanfaat.
            </motion.p>

            {/* CALL TO ACTION BUTTONS */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
              <motion.a
                href="#about"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="
                  bg-[#0B25B7]
                  hover:bg-blue-800
                  text-white
                  border border-blue-900
                  px-6 py-3.5
                  rounded-xl
                  font-black
                  text-sm md:text-base
                  shadow-lg shadow-blue-600/30
                  flex items-center gap-3
                  transition-all
                  cursor-pointer
                  uppercase tracking-wider
                "
              >
                TENTANG KAMI <ArrowRight size={20} />
              </motion.a>

              <motion.a
                href="#divisi"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="
                  bg-white
                  hover:bg-slate-50
                  text-[#0B25B7]
                  border-2 border-[#0B25B7]
                  px-6 py-3.5
                  rounded-xl
                  font-black
                  text-sm md:text-base
                  shadow-md
                  flex items-center gap-3
                  transition-all
                  cursor-pointer
                  uppercase tracking-wider
                "
              >
                STRUKTUR DIVISI <ArrowRight size={20} />
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
              className="absolute w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] border-2 border-dashed border-blue-600/30 rounded-full pointer-events-none"
            />

            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] border border-blue-400/40 rounded-full pointer-events-none"
            />

            {/* LOGO DISPLAY */}
            <div className="relative z-10 bg-white border-4 border-[#0B25B7] p-8 rounded-3xl shadow-2xl backdrop-blur-md hover:scale-[1.02] transition-transform duration-300">
              <motion.img
                initial={{ scale: 0.8 }}
                animate={{ scale: 1, y: [0, -10, 0] }}
                transition={{
                  scale: { duration: 0.5 },
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                }}
                src={logo}
                alt="HIMAMI Logo"
                className="w-[200px] sm:w-[250px] h-auto object-contain mx-auto filter drop-shadow-xl"
              />
              <div className="mt-5 text-center border-t-2 border-slate-100 pt-4">
                <span className="font-black text-xl text-[#0B25B7] block uppercase tracking-wider">HIMAMI</span>
                <span className="text-[11px] font-black text-[#0B25B7] uppercase bg-blue-50 px-3 py-1 border border-blue-200 rounded-full inline-block mt-1">
                  Official Badge
                </span>
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
          className="mt-14 bg-[#0B25B7] border-4 border-blue-900 rounded-3xl shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 p-6 md:p-8"
        >
          {[
            ["120+", "Anggota Aktif", <Users key="users" size={26} />],
            ["30+", "Kegiatan Pertahun", <CalendarDays key="calendar" size={26} />],
            ["15+", "Prestasi Regional", <Trophy key="trophy" size={26} />],
            ["5+", "Divisi Pengurus", <UsersRound key="divisi" size={26} />],
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.03, y: -4 }}
              className="bg-white border border-blue-200 p-4 md:p-5 rounded-2xl shadow-md flex flex-col sm:flex-row items-center gap-4 text-slate-900 hover:border-yellow-400 transition-all"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-center text-[#0B25B7] shrink-0">
                {item[2]}
              </div>

              <div className="text-center sm:text-left">
                <h2 className="text-2xl md:text-3xl font-black text-[#0B25B7] leading-none">{item[0]}</h2>
                <p className="text-xs md:text-sm font-extrabold text-slate-700 mt-1 uppercase tracking-tight">{item[1]}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ================= FEATURE HIGHLIGHT CARDS ================= */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ y: -6 }}
            className="bg-white border-2 border-slate-200 p-6 rounded-2xl shadow-xl hover:border-[#0B25B7] transition-all"
          >
            <div className="w-12 h-12 bg-blue-50 border border-blue-200 text-[#0B25B7] rounded-xl flex items-center justify-center font-black mb-4">
              <Code size={24} />
            </div>
            <h3 className="text-xl font-black uppercase text-slate-900 mb-2">Pengembangan IT</h3>
            <p className="text-sm font-semibold text-slate-600 leading-relaxed">
              Pelatihan programming, pengembangan web/mobile, workshop cyber security, dan penguasaan tools IT terkini.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -6 }}
            className="bg-white border-2 border-slate-200 p-6 rounded-2xl shadow-xl hover:border-[#0B25B7] transition-all"
          >
            <div className="w-12 h-12 bg-[#0B25B7] text-white rounded-xl flex items-center justify-center font-black shadow-lg shadow-blue-600/30 mb-4">
              <Rocket size={24} />
            </div>
            <h3 className="text-xl font-black uppercase text-slate-900 mb-2">Karakter & Leadership</h3>
            <p className="text-sm font-semibold text-slate-600 leading-relaxed">
              Membentuk jiwa kepemimpinan yang berintegritas, beretika, profesional, dan siap berkontribusi bagi masyarakat.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -6 }}
            className="bg-white border-2 border-slate-200 p-6 rounded-2xl shadow-xl hover:border-[#0B25B7] transition-all"
          >
            <div className="w-12 h-12 bg-blue-50 border border-blue-200 text-[#0B25B7] rounded-xl flex items-center justify-center font-black mb-4">
              <Compass size={24} />
            </div>
            <h3 className="text-xl font-black uppercase text-slate-900 mb-2">Jaringan & Relasi</h3>
            <p className="text-sm font-semibold text-slate-600 leading-relaxed">
              Koneksi luas antar alumni, himpunan mahasiswa antar universitas, dan kemitraan dengan industri teknologi.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Home;
