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
  Shield,
  Layers,
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
  const [filter, setFilter] = useState("all"); // 'all', 'bph', 'divisi'

  const roles = [
    {
      title: "Ketua Himpunan",
      category: "bph",
      icon: <Crown size={28} />,
      image: ketua,
      tagline: "Penanggung Jawab Utama Organisasi HIMAMI",
      jobdesk: [
        "Memimpin, mengoordinasikan, dan mengawasi seluruh kegiatan himpunan.",
        "Menjadi perwakilan resmi HIMAMI di dalam maupun luar kampus.",
        "Merumuskan arah kebijakan strategis organisasi HIMAMI.",
      ],
      color: "bg-[#0B1957] text-amber-400",
    },
    {
      title: "Wakil Ketua",
      category: "bph",
      icon: <Users size={28} />,
      image: wakil,
      tagline: "Pendamping & Pengawas Internal Organisasi",
      jobdesk: [
        "Mendampingi Ketua Himpunan dalam menjalankan fungsi kepemimpinan.",
        "Mengawasi kinerja seluruh divisi dan urusan internal pengurus.",
        "Menggantikan peran Ketua saat berhalangan hadir.",
      ],
      color: "bg-[#0B1957] text-amber-400",
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
      color: "bg-[#0B1957] text-amber-400",
    },
    {
      title: "Bendahara",
      category: "bph",
      icon: <Wallet size={28} />,
      image: bendahara,
      tagline: "Pengelola Keuangan & Anggaran Organisasi",
      jobdesk: [
        "Mengelola arus kas, iuran rutin, dan pembukuan keuangan organisasi.",
        "Menyusun rencana anggaran biaya (RAB) setiap program kerja.",
        "Menyajikan laporan keuangan yang transparan dan akuntabel.",
      ],
      color: "bg-[#0B1957] text-amber-400",
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
      color: "bg-white text-slate-900",
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
      color: "bg-white text-slate-900",
    },
    {
      title: "Humas",
      category: "divisi",
      icon: <Megaphone size={28} />,
      image: humas,
      tagline: "Hubungan Masyarakat & Kemitraan Eksternal",
      jobdesk: [
        "Membangun jaringan komunikasi dengan pihak internal & eksternal.",
        "Menggalang kerja sama sponsor, media partner, dan jejaring alumni.",
        "Menjadi jembatan penyalur informasi ke seluruh mahasiswa.",
      ],
      color: "bg-white text-slate-900",
    },
    {
      title: "Kerohanian",
      category: "divisi",
      icon: <HandHeart size={28} />,
      image: kerohanian,
      tagline: "Pembinaan Moral & Spiritual Anggota",
      jobdesk: [
        "Menyelenggarakan kajian keagamaan dan bakti sosial kerohanian.",
        "Menjaga iklim religius, toleransi, dan etika karakter mahasiswa.",
        "Memperingati hari-hari besar keagamaan secara rutin.",
      ],
      color: "bg-white text-slate-900",
    },
    {
      title: "Kesejahteraan",
      category: "divisi",
      icon: <Heart size={28} />,
      image: kesejahteraan,
      tagline: "Pengabdian & Solidaritas Internal",
      jobdesk: [
        "Menampung aspirasi dan kepedulian sosial antar sesama mahasiswa.",
        "Mengorganisir bantuan sosial, dana duka, dan keakraban pengurus.",
        "Mempererat tali rasa kekeluargaan di lingkungan jurusan.",
      ],
      color: "bg-white text-slate-900",
    },
  ];

  const filteredRoles = roles.filter((role) => {
    if (filter === "all") return true;
    return role.category === filter;
  });

  return (
    <section
      id="divisi"
      className="bg-hex-pattern min-h-screen py-24 px-4 md:px-12 relative overflow-hidden border-b border-slate-200 text-slate-900"
    >
      {/* DECORATIVE GRADIENT GLOWS */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* SECTION TITLE */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-1.5 bg-blue-50 text-[#0B1957] border border-blue-200 px-4 py-1.5 font-black text-xs md:text-sm uppercase rounded-full shadow-sm mb-3">
            <Layers size={14} className="text-amber-500" /> Kabinet & Sinergi Organisasi 2025/2026
          </div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#0B1957]">
            Struktur Pengurus HIMAMI
          </h2>
          <p className="text-slate-600 font-semibold max-w-xl mx-auto mt-3 text-base md:text-lg">
            Klik pada setiap divisi atau pengurus untuk melihat detail foto resmi, peran, dan program kerja utama.
          </p>
        </motion.div>

        {/* CATEGORY FILTER TABS */}
        <div className="flex justify-center flex-wrap gap-3 mb-12">
          {[
            { id: "all", label: "SEMUA STRUKTUR" },
            { id: "bph", label: "BADAN PENGURUS HARIAN (BPH)" },
            { id: "divisi", label: "DIVISI OPERASIONAL" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`
                px-5 py-2.5 font-black text-xs md:text-sm rounded-2xl border transition-all cursor-pointer uppercase tracking-wider shadow-sm flex items-center gap-2
                ${
                  filter === tab.id
                    ? "bg-gradient-to-r from-[#0B1957] to-[#0B25B7] text-white border-amber-400 shadow-xl shadow-blue-900/20"
                    : "bg-white text-slate-700 border-slate-200 hover:border-[#0B25B7] hover:text-[#0B25B7]"
                }
              `}
            >
              {filter === tab.id && <Shield size={14} className="text-amber-400" />}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                bg-white text-slate-900 border-2 border-slate-200 shadow-xl rounded-3xl
                p-6 cursor-pointer flex flex-col justify-between group relative overflow-hidden
                hover:border-[#0B25B7] transition-all
              "
            >
              {/* ACCENT LINE */}
              <div className={`absolute top-0 left-0 right-0 h-2 ${role.category === "bph" ? "bg-gradient-to-r from-[#0B1957] to-amber-500" : "bg-gradient-to-r from-[#0B25B7] to-cyan-500"}`}></div>

              {/* TOP BADGE */}
              <div className="flex items-center justify-between mb-4 pt-1">
                <span
                  className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${
                    role.category === "bph"
                      ? "bg-amber-100 border-amber-300 text-amber-900"
                      : "bg-blue-50 border-blue-200 text-[#0B1957]"
                  }`}
                >
                  {role.category === "bph" ? "BPH KABINET" : "DIVISI OPERASIONAL"}
                </span>
                <span className="text-xs font-bold text-slate-500 group-hover:text-[#0B25B7] transition-colors">
                  Detail Profil ›
                </span>
              </div>

              {/* CARD MAIN INFO */}
              <div className="flex items-center gap-4 my-2">
                <div className="w-14 h-14 bg-[#0B1957] text-amber-400 border border-blue-900 rounded-2xl flex items-center justify-center shadow-md shrink-0 group-hover:bg-[#0B25B7] group-hover:text-white transition-colors">
                  {role.icon}
                </div>

                <div>
                  <h3 className="font-black text-xl leading-tight text-[#0B1957] group-hover:text-[#0B25B7] transition-colors">
                    {role.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-600 mt-1 line-clamp-1">
                    {role.tagline}
                  </p>
                </div>
              </div>

              {/* CARD FOOTER */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-slate-500">
                <span className="group-hover:text-[#0B25B7] transition-colors">KLIK UNTUK PROFIL LENGKAP</span>
                <span className="bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded text-[10px]">
                  OFFICIAL
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
            className="fixed inset-0 bg-slate-900/70 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border-4 border-[#0B1957] rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden relative my-8 text-slate-900"
            >
              {/* MODAL HEADER */}
              <div className="bg-gradient-to-r from-[#0B1957] via-[#0B25B7] to-[#0B1957] text-white p-5 flex items-center justify-between border-b-2 border-amber-400">
                <div className="flex items-center gap-3">
                  <div className="bg-white text-[#0B1957] p-2.5 rounded-2xl shadow-md">
                    {selected.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black uppercase text-white leading-tight">
                      {selected.title}
                    </h3>
                    <p className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center gap-1">
                      <Award size={12} /> HIMAMI Kabinet 2025/2026
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelected(null)}
                  className="bg-white/10 hover:bg-white text-white hover:text-red-600 p-2 rounded-xl border border-white/20 transition-all cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* MODAL BODY */}
              <div className="p-6 space-y-5">
                {/* PHOTO & TAGLINE */}
                <div className="flex flex-col sm:flex-row items-center gap-5 bg-slate-50 p-4 border border-slate-200 rounded-2xl">
                  <img
                    src={selected.image}
                    alt={selected.title}
                    className="w-36 h-36 object-cover border-2 border-[#0B1957] rounded-2xl bg-white shrink-0 shadow-md"
                  />
                  <div>
                    <span className="text-[10px] font-black uppercase bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
                      {selected.category === "bph" ? "Pengurus Harian" : "Divisi Operational"}
                    </span>
                    <h4 className="text-lg font-black text-[#0B1957] leading-snug">
                      {selected.tagline}
                    </h4>
                    <p className="text-xs font-semibold text-slate-600 mt-2">
                      Foto perwakilan resmi struktur pengurus HIMAMI.
                    </p>
                  </div>
                </div>

                {/* JOBDESK LIST */}
                <div>
                  <h4 className="font-black text-sm uppercase text-[#0B1957] mb-3 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-amber-500 rounded-full"></span>
                    Tugas Utama & Program Kerja:
                  </h4>
                  <div className="space-y-2">
                    {selected.jobdesk.map((item, index) => (
                      <div
                        key={index}
                        className="flex gap-3 items-start bg-blue-50/60 p-3.5 border border-blue-100 rounded-xl text-xs font-bold text-slate-800"
                      >
                        <CheckCircle2 size={16} className="text-[#0B25B7] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* MODAL FOOTER */}
              <div className="bg-slate-50 p-4 border-t border-slate-200 text-center">
                <button
                  onClick={() => setSelected(null)}
                  className="bg-gradient-to-r from-[#0B1957] to-[#0B25B7] hover:from-[#081344] hover:to-[#091E96] text-white border border-amber-400/80 px-8 py-2.5 rounded-xl font-black text-sm shadow-lg shadow-blue-900/30 transition-all cursor-pointer uppercase tracking-wider"
                >
                  TUTUP JENDELA
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

