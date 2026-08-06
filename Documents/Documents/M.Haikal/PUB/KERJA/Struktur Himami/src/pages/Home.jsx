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
  Shield,
  Layers,
  Flame,
  CheckCircle2,
} from "lucide-react";

import logo from "../assets/logo-himami.png";

function Home() {
  /* ================= ANIMATION VARIANTS ================= */
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -40 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 40 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="home"
      className="scroll-mt-20 bg-hex-pattern overflow-hidden relative border-b border-slate-200 pb-24 text-slate-900"
    >
      {/* OFFICIAL ANNOUNCEMENT MARQUEE TICKER */}
      <div className="bg-gradient-to-r from-[#0B1957] via-[#0B25B7] to-[#0B1957] text-white py-2.5 overflow-hidden whitespace-nowrap font-extrabold text-xs md:text-sm tracking-wide uppercase border-b-2 border-yellow-500/80 shadow-md">
        <div className="inline-flex gap-8 animate-marquee">
          <span className="flex items-center gap-2">
            <Flame size={14} className="text-yellow-400 fill-yellow-400" /> Portal Resmi Himpunan Mahasiswa Manajemen Informatika
          </span>
          <span className="text-yellow-300">•</span>
          <span>Kabinet Sinergi & Inovasi 2025/2026</span>
          <span className="text-yellow-300">•</span>
          <span>Developed by M. Haikal</span>
          <span className="text-yellow-300">•</span>
          <span>Slogan: Bersatu • Berkarya • Bermanfaat</span>
          <span className="text-yellow-300">•</span>
          <span className="flex items-center gap-2">
            <Shield size={14} className="text-cyan-300" /> Official Student Organization Portal
          </span>
        </div>
      </div>

      {/* BACKGROUND GRADIENT GLOWS */}
      <div className="absolute top-10 left-0 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-8 md:pt-14 relative z-10">
        {/* ================= HERO MAIN GRID ================= */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid lg:grid-cols-12 items-center gap-10 min-h-[75vh]"
        >
          {/* LEFT CONTENT (7 COLS) */}
          <motion.div variants={fadeLeft} className="lg:col-span-7 space-y-6">
            {/* OFFICIAL BADGES */}
            <div className="flex flex-wrap items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="inline-flex items-center gap-2 bg-[#0B1957] text-white border-2 border-yellow-500/70 px-4 py-1.5 text-xs md:text-sm font-black rounded-full shadow-lg shadow-blue-950/20"
              >
                <Sparkles size={16} className="text-yellow-400 animate-pulse" />
                <span>HIMAMI KABINET 2025/2026</span>
              </motion.div>

              <div className="inline-flex items-center gap-1.5 bg-white text-slate-800 border border-slate-300 px-3.5 py-1 text-xs font-black rounded-full shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                OFFICIAL PORTAL BY <span className="text-[#0B25B7] font-black">M. HAIKAL</span>
              </div>
            </div>

            {/* HERO TITLE */}
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase text-[#0B1957] leading-[0.96] tracking-tight font-sans"
            >
              Himpunan <br />
              <span className="text-white bg-gradient-to-r from-[#0B1957] via-[#0B25B7] to-[#1D4ED8] px-4 py-1 rounded-2xl inline-block my-1.5 shadow-xl border-2 border-yellow-400/80">
                Mahasiswa
              </span>{" "}
              <br />
              <span className="text-[#0B25B7]">Manajemen Informatika</span>
            </motion.h1>

            {/* SLOGAN BADGE & MOTTO */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 px-5 py-2.5 text-xs md:text-sm font-black rounded-xl uppercase tracking-widest shadow-lg border border-amber-300">
                <Flame size={18} className="text-slate-950 fill-slate-950" />
                <span>BERSATU • BERKARYA • BERMANFAAT</span>
              </div>
            </motion.div>

            {/* DESCRIPTION */}
            <motion.p
              variants={fadeUp}
              className="text-base md:text-lg text-slate-700 font-semibold leading-relaxed max-w-2xl bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 shadow-xl relative"
            >
              <span className="absolute -top-3 left-6 bg-[#0B1957] text-white text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider">
                Visi Singkat Organisasi
              </span>
              Wadah resmi mahasiswa Manajemen Informatika untuk menempa keilmuan teknologi informasi, menggembleng jiwa kepemimpinan berintegritas, dan menciptakan solusi digital unggul bagi kampus dan masyarakat.
            </motion.p>

            {/* CALL TO ACTION BUTTONS */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
              <motion.a
                href="#about"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="
                  bg-gradient-to-r from-[#0B1957] to-[#0B25B7]
                  hover:from-[#081344] hover:to-[#091E96]
                  text-white
                  border-2 border-yellow-400/80
                  px-7 py-3.5
                  rounded-2xl
                  font-black
                  text-sm md:text-base
                  shadow-xl shadow-blue-900/25
                  flex items-center gap-3
                  transition-all
                  cursor-pointer
                  uppercase tracking-wider
                "
              >
                PROFIL & MAKNA BENDERA <ArrowRight size={20} />
              </motion.a>

              <motion.a
                href="#divisi"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="
                  bg-white
                  hover:bg-blue-50
                  text-[#0B1957]
                  border-2 border-[#0B25B7]
                  px-7 py-3.5
                  rounded-2xl
                  font-black
                  text-sm md:text-base
                  shadow-md
                  flex items-center gap-3
                  transition-all
                  cursor-pointer
                  uppercase tracking-wider
                "
              >
                STRUKTUR KABINET <Layers size={20} />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* RIGHT HERO ARTWORK WITH EMBLEM (5 COLS) */}
          <motion.div
            variants={fadeRight}
            className="lg:col-span-5 relative flex justify-center items-center py-8"
          >
            {/* ROTATING ORBIT RINGS */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              className="absolute w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] border-2 border-dashed border-blue-600/30 rounded-full pointer-events-none"
            />

            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] border-2 border-blue-400/40 rounded-full pointer-events-none"
            />

            {/* EMBLEM & LOGO DISPLAY CARD */}
            <div className="relative z-10 bg-white border-4 border-[#0B1957] p-8 md:p-10 rounded-3xl shadow-2xl backdrop-blur-md hover:scale-[1.02] transition-transform duration-300 max-w-[340px] sm:max-w-[380px] w-full text-center">
              {/* TOP FLAG ACCENT STRIP */}
              <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-[#0B1957] via-[#0B25B7] to-amber-500 rounded-t-2xl"></div>

              <motion.img
                initial={{ scale: 0.8 }}
                animate={{ scale: 1, y: [0, -8, 0] }}
                transition={{
                  scale: { duration: 0.5 },
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                }}
                src={logo}
                alt="Logo & Bendera Resmi HIMAMI"
                className="w-[190px] sm:w-[240px] h-auto object-contain mx-auto filter drop-shadow-2xl pt-2"
              />

              <div className="mt-6 border-t-2 border-slate-100 pt-4 space-y-2">
                <span className="font-black text-2xl text-[#0B1957] block uppercase tracking-wider">
                  HIMAMI
                </span>
                <p className="text-xs font-bold text-slate-600">
                  Himpunan Mahasiswa Manajemen Informatika
                </p>

                <div className="flex items-center justify-center gap-2 pt-1">
                  <span className="text-[10px] font-black text-[#0B1957] uppercase bg-amber-100 border border-amber-300 text-amber-900 px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                    <Shield size={12} className="text-amber-700" /> LAMBANG & BENDERA RESMI
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
          className="mt-16 bg-gradient-to-r from-[#0B1957] via-[#0B25B7] to-[#0B1957] border-4 border-yellow-500/80 rounded-3xl shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 p-6 md:p-8"
        >
          {[
            ["120+", "Anggota Aktif", <Users key="users" size={26} />, "Seluruh Angkatan MI"],
            ["30+", "Kegiatan Pertahun", <CalendarDays key="calendar" size={26} />, "Workshop & Event"],
            ["15+", "Prestasi Regional", <Trophy key="trophy" size={26} />, "Lomba IT & Karya"],
            ["5+", "Divisi Pengurus", <UsersRound key="divisi" size={26} />, "Struktur Kabinet"],
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.03, y: -4 }}
              className="bg-white border border-blue-200 p-5 rounded-2xl shadow-lg flex flex-col items-center sm:items-start text-slate-900 hover:border-amber-400 transition-all group"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 bg-[#0B1957] text-amber-400 border border-blue-900 rounded-2xl flex items-center justify-center shrink-0 shadow-md group-hover:bg-[#0B25B7] transition-colors">
                {item[2]}
              </div>

              <div className="text-center sm:text-left mt-3">
                <h2 className="text-2xl md:text-3xl font-black text-[#0B1957] leading-none">
                  {item[0]}
                </h2>
                <p className="text-xs md:text-sm font-extrabold text-slate-800 mt-1 uppercase tracking-tight">
                  {item[1]}
                </p>
                <span className="text-[10px] font-semibold text-slate-500 block mt-0.5">
                  {item[3]}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ================= FEATURE HIGHLIGHT CARDS ================= */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ y: -6 }}
            className="bg-white border-2 border-slate-200 p-7 rounded-3xl shadow-xl hover:border-[#0B25B7] transition-all relative overflow-hidden group"
          >
            <div className="w-12 h-12 bg-blue-50 border border-blue-200 text-[#0B25B7] rounded-2xl flex items-center justify-center font-black mb-4 group-hover:bg-[#0B25B7] group-hover:text-white transition-colors">
              <Code size={24} />
            </div>
            <h3 className="text-xl font-black uppercase text-[#0B1957] mb-2">
              Pengembangan IT & Skill
            </h3>
            <p className="text-sm font-semibold text-slate-600 leading-relaxed">
              Program unggulan pelatihan web development, software engineering, UI/UX design, dan persiapan sertifikasi IT untuk menjawab tantangan industri digital.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1 text-xs font-black text-[#0B25B7]">
              <CheckCircle2 size={14} className="text-amber-500" /> <span>Pelatihan Terjadwal</span>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -6 }}
            className="bg-white border-2 border-slate-200 p-7 rounded-3xl shadow-xl hover:border-[#0B25B7] transition-all relative overflow-hidden group"
          >
            <div className="w-12 h-12 bg-[#0B1957] text-amber-400 rounded-2xl flex items-center justify-center font-black shadow-lg shadow-blue-950/20 mb-4">
              <Rocket size={24} />
            </div>
            <h3 className="text-xl font-black uppercase text-[#0B1957] mb-2">
              Karakter & Leadership
            </h3>
            <p className="text-sm font-semibold text-slate-600 leading-relaxed">
              Membentuk kader mahasiswa berintegritas tinggi, berjiwa kepemimpinan yang etis, serta tangguh dalam mengelola organisasi modern.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1 text-xs font-black text-[#0B25B7]">
              <CheckCircle2 size={14} className="text-amber-500" /> <span>Kaderisasi Berkelanjutan</span>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -6 }}
            className="bg-white border-2 border-slate-200 p-7 rounded-3xl shadow-xl hover:border-[#0B25B7] transition-all relative overflow-hidden group"
          >
            <div className="w-12 h-12 bg-blue-50 border border-blue-200 text-[#0B25B7] rounded-2xl flex items-center justify-center font-black mb-4 group-hover:bg-[#0B25B7] group-hover:text-white transition-colors">
              <Compass size={24} />
            </div>
            <h3 className="text-xl font-black uppercase text-[#0B1957] mb-2">
              Jaringan & Kemitraan
            </h3>
            <p className="text-sm font-semibold text-slate-600 leading-relaxed">
              Menghubungkan mahasiswa dengan jaringan alumni sukses, komunitas IT nasional, serta sinergi antar himpunan di berbagai perguruan tinggi.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1 text-xs font-black text-[#0B25B7]">
              <CheckCircle2 size={14} className="text-amber-500" /> <span>Koneksi Industri & Alumni</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Home;

