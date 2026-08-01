import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Crown,
  Users,
  FileText,
  Wallet,
  BookOpen,
  Radio,
  Megaphone,
  Heart,
  HandHeart,
  X,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Eye,
  Award,
} from "lucide-react";

import ketua from "../assets/ketua.png";
import wakil from "../assets/wakil.png";
import sekretaris from "../assets/sekretaris.png";
import bendahara from "../assets/bendahara.png";
import keilmuan from "../assets/keilmuan.png";
import kominfo from "../assets/kominfo.png";
import humas from "../assets/humas.png";
import kerohanian from "../assets/kerohanian.png";
import kesejahteraan from "../assets/kesejahteraan.png";

function Divisi() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all");

  const roles = [
    {
      title: "Ketua Himpunan",
      category: "bph",
      icon: <Crown size={28} />,
      image: ketua,
      tagline: "Penanggung Jawab Utama Organisasi",
      jobdesk: [
        "Memimpin, mengoordinasikan, dan mengawasi seluruh kegiatan himpunan.",
        "Menjadi perwakilan resmi HIMAMI di dalam maupun luar kampus.",
        "Merumuskan arah kebijakan strategis organisasi HIMAMI.",
      ],
      color: "from-blue-600 to-indigo-800",
      accent: "bg-amber-400 text-slate-950",
    },
    {
      title: "Wakil Ketua",
      category: "bph",
      icon: <Users size={28} />,
      image: wakil,
      tagline: "Pendamping & Pengawas Internal",
      jobdesk: [
        "Mendampingi Ketua Himpunan dalam menjalankan fungsi kepemimpinan.",
        "Mengawasi kinerja seluruh divisi dan urusan internal pengurus.",
        "Menggantikan peran Ketua saat berhalangan hadir.",
      ],
      color: "from-blue-600 to-indigo-800",
      accent: "bg-blue-100 text-blue-900",
    },
    {
      title: "Sekretaris",
      category: "bph",
      icon: <FileText size={28} />,
      image: sekretaris,
      tagline: "Pusat Administrasi & Surat Menyurat",
      jobdesk: [
        "Mengelola arsip dokumen, surat masuk/keluar, dan notulensi rapat.",
        "Menyusun proposal dan laporan pertanggungjawaban (LPJ) kegiatan.",
        "Menjaga keteraturan sistem administrasi himpunan.",
      ],
      color: "from-blue-600 to-indigo-800",
      accent: "bg-emerald-100 text-emerald-900",
    },
    {
      title: "Bendahara",
      category: "bph",
      icon: <Wallet size={28} />,
      image: bendahara,
      tagline: "Pengelola Keuangan & Anggaran",
      jobdesk: [
        "Mengelola arus kas, iuran rutin, dan pembukuan keuangan organisasi.",
        "Menyusun rencana anggaran biaya (RAB) setiap program kerja.",
        "Menyajikan laporan keuangan yang transparan dan akuntabel.",
      ],
      color: "from-blue-600 to-indigo-800",
      accent: "bg-purple-100 text-purple-900",
    },
    {
      title: "Keilmuan",
      category: "divisi",
      icon: <BookOpen size={28} />,
      image: keilmuan,
      tagline: "Pengembangan Skill IT & Akademik",
      jobdesk: [
        "Menyelenggarakan workshop, pelatihan coding, dan study club IT.",
        "Fasilitasi mentoring ujian & lomba teknologi antar mahasiswa.",
        "Pengembangan potensi intelektual di bidang Informatika.",
      ],
      color: "from-sky-500 to-blue-700",
      accent: "bg-sky-100 text-sky-900",
    },
    {
      title: "Kominfo",
      category: "divisi",
      icon: <Radio size={28} />,
      image: kominfo,
      tagline: "Publikasi, Media & Desain Visual",
      jobdesk: [
        "Mengelola seluruh media sosial, website, dan saluran informasi HIMAMI.",
        "Merancang aset visual, banner, feed Instagram, dan konten edukatif.",
        "Dokumentasi fotografi & videografi setiap event HIMAMI.",
      ],
      color: "from-cyan-500 to-teal-700",
      accent: "bg-cyan-100 text-cyan-900",
    },
    {
      title: "Humas",
      category: "divisi",
      icon: <Megaphone size={28} />,
      image: humas,
      tagline: "Hubungan Masyarakat & Kemitraan",
      jobdesk: [
        "Membangun jaringan komunikasi dengan pihak internal & eksternal.",
        "Menggalang kerja sama sponsor, media partner, dan jejaring alumni.",
        "Menjadi jembatan penyalur informasi ke seluruh mahasiswa.",
      ],
      color: "from-amber-500 to-orange-700",
      accent: "bg-amber-100 text-amber-900",
    },
    {
      title: "Kerohanian",
      category: "divisi",
      icon: <HandHeart size={28} />,
      image: kerohanian,
      tagline: "Pembinaan Moral & Spiritual",
      jobdesk: [
        "Menyelenggarakan kajian keagamaan dan bakti sosial kerohanian.",
        "Menjaga iklim religius, toleransi, dan etika karakter mahasiswa.",
        "Memperingati hari-hari besar keagamaan secara rutin.",
      ],
      color: "from-emerald-500 to-green-700",
      accent: "bg-emerald-100 text-emerald-900",
    },
    {
      title: "Kesejahteraan",
      category: "divisi",
      icon: <Heart size={28} />,
      image: kesejahteraan,
      tagline: "Pengabdian & Internal Solidaritas",
      jobdesk: [
        "Menampung aspirasi dan kepedulian sosial antar sesama mahasiswa.",
        "Mengorganisir bantuan sosial, dana duka, dan keakraban pengurus.",
        "Mempererat tali rasa kekeluargaan di lingkungan jurusan.",
      ],
      color: "from-rose-500 to-pink-700",
      accent: "bg-rose-100 text-rose-900",
    },
  ];

  const filteredRoles = roles.filter((role) => {
    if (filter === "all") return true;
    return role.category === filter;
  });

  return (
    <section
      id="divisi"
      className="bg-slate-50/50 min-h-screen py-24 px-4 md:px-12 relative overflow-hidden border-b border-slate-200 text-slate-900"
    >
      {/* BACKGROUND DECORATIVE GLOWS */}
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* SECTION TITLE */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0B25B7] to-indigo-700 text-white border border-blue-400/30 px-5 py-2 font-black text-xs md:text-sm uppercase rounded-full shadow-lg shadow-blue-600/20 mb-4">
            <Sparkles size={15} className="text-yellow-300 animate-pulse" />
            <span>STRUKTUR ORGANISASI KABINET 2025/2026</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-slate-900">
            STRUKTUR DIVISI <span className="bg-gradient-to-r from-[#0B25B7] via-blue-600 to-indigo-600 bg-clip-text text-transparent">HIMAMI</span>
          </h2>
          <p className="text-slate-600 font-semibold max-w-2xl mx-auto mt-4 text-base md:text-lg">
            Klik pada setiap kartu BPH atau Divisi untuk melihat profil resmi, tanggung jawab, dan program kerja utama.
          </p>
        </motion.div>

        {/* CATEGORY FILTER TABS */}
        <div className="flex justify-center flex-wrap gap-3 mb-14">
          {[
            { id: "all", label: "SEMUA BAGIAN" },
            { id: "bph", label: "BADAN PENGURUS HARIAN (BPH)" },
            { id: "divisi", label: "DIVISI OPERASIONAL" },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setFilter(tab.id)}
              className={`
                px-6 py-3 font-black text-xs md:text-sm rounded-2xl border transition-all cursor-pointer uppercase tracking-wider shadow-md
                ${filter === tab.id 
                  ? "bg-gradient-to-r from-[#0B25B7] to-indigo-700 text-white border-blue-900 shadow-xl shadow-blue-600/30" 
                  : "bg-white text-slate-700 border-slate-200 hover:border-[#0B25B7] hover:text-[#0B25B7]"}
              `}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRoles.map((role, idx) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, y: -6 }}
              onClick={() => setSelected(role)}
              className="
                bg-white text-slate-900 border-2 border-slate-200 shadow-xl rounded-[28px]
                p-7 cursor-pointer flex flex-col justify-between group relative overflow-hidden
                hover:border-[#0B25B7] transition-all
              "
            >
              {/* ACCENT GLOW STRIP */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#0B25B7] to-indigo-600" />

              {/* TOP BADGE */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-[10px] font-black uppercase bg-blue-50 text-[#0B25B7] border border-blue-200 px-3.5 py-1 rounded-full shadow-xs">
                  {role.category === "bph" ? "BPH UTAMA" : "DIVISI OPERASIONAL"}
                </span>
                <span className="text-xs font-extrabold text-slate-400 group-hover:text-[#0B25B7] transition-colors flex items-center gap-1">
                  Detail <ChevronRight size={14} />
                </span>
              </div>

              {/* CARD MAIN INFO */}
              <div className="flex items-center gap-5 my-2">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-50 text-[#0B25B7] border-2 border-blue-200 rounded-2xl flex items-center justify-center shadow-md shrink-0 group-hover:bg-[#0B25B7] group-hover:text-white transition-colors duration-300">
                  {role.icon}
                </div>

                <div>
                  <h3 className="font-black text-2xl leading-tight text-slate-900 group-hover:text-[#0B25B7] transition-colors">
                    {role.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-600 mt-1 line-clamp-1">
                    {role.tagline}
                  </p>
                </div>
              </div>

              {/* PHOTO PREVIEW THUMBNAIL */}
              <div className="mt-5 relative h-44 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200">
                <img
                  src={role.image}
                  alt={role.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-3">
                  <span className="text-[11px] font-black text-white uppercase flex items-center gap-1.5">
                    <Eye size={14} className="text-yellow-300" /> Profil Pengurus
                  </span>
                </div>
              </div>

              {/* CARD FOOTER */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-slate-500">
                <span className="group-hover:text-[#0B25B7] transition-colors">KLIK PROFIL RESMI</span>
                <span className="bg-blue-50 text-[#0B25B7] border border-blue-200 px-2.5 py-0.5 rounded-md text-[10px] uppercase font-extrabold">
                  VERIFIED
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ================= DETAILED MODAL ================= */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border-2 border-slate-200 rounded-[32px] shadow-2xl max-w-xl w-full overflow-hidden relative my-8 text-slate-900"
            >
              {/* MODAL HEADER */}
              <div className="bg-gradient-to-r from-[#0B25B7] to-indigo-800 text-white p-6 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="bg-white text-[#0B25B7] p-3 rounded-2xl shadow-md">
                    {selected.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black uppercase text-white leading-tight">
                      {selected.title}
                    </h3>
                    <p className="text-xs font-black text-yellow-300 uppercase tracking-wider">
                      HIMAMI Kabinet 2025/2026
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelected(null)}
                  className="bg-white/10 hover:bg-white text-white hover:text-red-600 p-2.5 rounded-xl border border-white/20 transition-all cursor-pointer shadow-md"
                >
                  <X size={20} />
                </button>
              </div>

              {/* MODAL BODY */}
              <div className="p-6 md:p-8 space-y-6">
                {/* PHOTO & TAGLINE */}
                <div className="flex flex-col sm:flex-row items-center gap-6 bg-slate-50 p-5 border-2 border-slate-200 rounded-3xl">
                  <img
                    src={selected.image}
                    alt={selected.title}
                    className="w-40 h-40 object-cover border-2 border-slate-300 rounded-2xl bg-white shrink-0 shadow-lg"
                  />
                  <div className="space-y-2 text-center sm:text-left">
                    <span className="text-[10px] font-black uppercase bg-blue-50 text-[#0B25B7] px-3 py-1 border border-blue-200 rounded-full inline-block">
                      Peran & Tagline
                    </span>
                    <h4 className="text-xl font-black text-slate-900 leading-snug">
                      {selected.tagline}
                    </h4>
                    <p className="text-xs font-semibold text-slate-600">
                      Dokumentasi foto perwakilan pengurus resmi HIMAMI UNAS PASIM.
                    </p>
                  </div>
                </div>

                {/* JOBDESK LIST */}
                <div className="space-y-3">
                  <h4 className="font-black text-sm uppercase text-slate-900 flex items-center gap-2">
                    <Award size={18} className="text-[#0B25B7]" />
                    Tugas Utama & Program Kerja:
                  </h4>
                  <div className="space-y-2.5">
                    {selected.jobdesk.map((item, index) => (
                      <div
                        key={index}
                        className="flex gap-3 items-start bg-blue-50/70 p-4 border border-blue-100 rounded-2xl text-xs md:text-sm font-bold text-slate-800 shadow-xs"
                      >
                        <CheckCircle2 size={18} className="text-[#0B25B7] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* MODAL FOOTER */}
              <div className="bg-slate-50 p-5 border-t border-slate-200 text-center">
                <button
                  onClick={() => setSelected(null)}
                  className="bg-gradient-to-r from-[#0B25B7] to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white border border-blue-900 px-10 py-3 rounded-2xl font-black text-sm shadow-xl shadow-blue-600/30 transition-all cursor-pointer uppercase tracking-wider"
                >
                  TUTUP PROFIL
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Divisi;
