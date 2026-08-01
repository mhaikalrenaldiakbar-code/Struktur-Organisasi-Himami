import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  MapPin,
  Clock,
  Search,
  X,
  CheckCircle,
  ExternalLink,
  Sparkles,
  UserCheck,
  Tag,
} from "lucide-react";
import { useState } from "react";

function Events() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const events = [
    {
      title: "Seminar IT & Artificial Intelligence 2026",
      category: "akademik",
      date: "10 Juni 2026",
      time: "09:00 - 12:30 WIB",
      place: "Aula Utama Kampus PASIM",
      status: "Mendatang",
      desc: "Diskusi mendalam mengenai transformasi AI, Machine Learning, dan peluang karir industri software engineer di era AI masa depan.",
      speaker: "Praktisi AI & Lead Developer",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80",
    },
    {
      title: "OSJUR HIMAMI (Orientasi Jurusan)",
      category: "kaderisasi",
      date: "18 Juni 2026",
      time: "07:30 - 16:00 WIB",
      place: "Area Kampus Utama PASIM",
      status: "Mendatang",
      desc: "Orientasi pengenalan kehidupan kampus dan kurikulum jurusan Manajemen Informatika khusus bagi mahasiswa baru.",
      speaker: "Panitia OSJUR & BPH HIMAMI",
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&auto=format&fit=crop&q=80",
    },
    {
      title: "Workshop Web Development Fullstack",
      category: "pelatihan",
      date: "25 Juni 2026",
      time: "13:00 - 16:30 WIB",
      place: "Laboratorium Komputer Lanjut",
      status: "Mendatang",
      desc: "Pelatihan hands-on membangun web application modern menggunakan React.js, Tailwind CSS, dan API backend.",
      speaker: "M. Haikal & Tim Keilmuan",
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80",
    },
    {
      title: "Makrab (Malam Keakraban HIMAMI)",
      category: "sosial",
      date: "5 Juli 2026",
      time: "18:00 WIB - Selesai",
      place: "Villa Lembang Resort",
      status: "Mendatang",
      desc: "Malam keakraban keluarga besar Manajemen Informatika guna merekatkan hubungan emosional antar angkatan dan pengurus.",
      speaker: "Seluruh Mahasiswa MI",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop&q=80",
    },
  ];

  const filteredEvents = events.filter((ev) => {
    const matchesSearch =
      ev.title.toLowerCase().includes(search.toLowerCase()) ||
      ev.desc.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || ev.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <section
      id="event"
      className="scroll-mt-20 min-h-screen bg-slate-50/50 px-4 md:px-8 py-20 overflow-hidden relative border-b border-slate-200 text-slate-900"
    >
      {/* BACKGROUND DECORATIONS */}
      <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-sky-400/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0B25B7] to-indigo-700 text-white border border-blue-400/30 px-5 py-2 font-black text-xs md:text-sm uppercase rounded-full shadow-lg shadow-blue-600/20 mb-4">
            <Sparkles size={15} className="text-yellow-300 animate-pulse" />
            <span>AGENDA & PROGRAM KERJA HIMAMI</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase text-slate-900 tracking-tight">
            KEGIATAN & <span className="bg-gradient-to-r from-[#0B25B7] via-blue-600 to-indigo-600 bg-clip-text text-transparent">EVENT</span>
          </h2>
          <p className="text-slate-600 font-semibold max-w-2xl mx-auto mt-4 text-base md:text-lg">
            Ikuti berbagai seminar, workshop, osjur, dan malam keakraban untuk mengasah wawasan IT dan relasi mahasiswa.
          </p>
        </motion.div>

        {/* SEARCH & FILTER BAR */}
        <div className="bg-white border-2 border-slate-200 shadow-2xl rounded-3xl p-5 md:p-7 mb-14 text-slate-900 max-w-4xl mx-auto backdrop-blur-md">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* SEARCH INPUT */}
            <div className="relative w-full flex-1">
              <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Cari nama kegiatan atau kata kunci..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-2xl font-semibold text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-[#0B25B7] transition-all shadow-xs"
              />
            </div>

            {/* CATEGORY SELECTOR */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto justify-center">
              {[
                { id: "all", label: "SEMUA" },
                { id: "akademik", label: "AKADEMIK" },
                { id: "pelatihan", label: "WORKSHOP" },
                { id: "kaderisasi", label: "OSJUR" },
                { id: "sosial", label: "MAKRAB" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`
                    px-4 py-2.5 font-black text-xs rounded-xl border transition-all cursor-pointer uppercase tracking-wider shadow-xs
                    ${
                      category === cat.id
                        ? "bg-gradient-to-r from-[#0B25B7] to-indigo-700 text-white border-blue-900 shadow-md"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:border-[#0B25B7] hover:text-[#0B25B7]"
                    }
                  `}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* EVENTS GRID */}
        {filteredEvents.length === 0 ? (
          <div className="bg-white text-slate-900 border-2 border-slate-200 p-12 text-center max-w-md mx-auto rounded-3xl shadow-xl">
            <p className="font-black text-xl">Kegiatan tidak ditemukan!</p>
            <p className="text-xs font-semibold text-slate-600 mt-2">Coba gunakan kata kunci pencarian yang lain.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredEvents.map((ev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, y: -6 }}
                onClick={() => setSelected(ev)}
                className="
                  bg-white
                  text-slate-900
                  border-2
                  border-slate-200
                  hover:border-[#0B25B7]
                  rounded-[28px]
                  shadow-xl
                  overflow-hidden
                  cursor-pointer
                  flex flex-col justify-between
                  group
                  transition-all
                "
              >
                <div>
                  {/* IMAGE HEADER WITH STATUS BADGE */}
                  <div className="relative h-52 overflow-hidden border-b border-slate-100 bg-slate-100">
                    <img
                      src={ev.image}
                      alt={ev.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-[#0B25B7] text-white border border-blue-900 px-3.5 py-1 font-black text-[10px] rounded-full uppercase shadow-lg">
                      {ev.status}
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-6 space-y-3.5">
                    <h3 className="font-black text-xl leading-snug text-slate-900 group-hover:text-[#0B25B7] transition-colors">
                      {ev.title}
                    </h3>

                    <div className="text-xs font-semibold text-slate-700 space-y-2 pt-1">
                      <p className="flex items-center gap-2">
                        <CalendarDays size={16} className="text-[#0B25B7] shrink-0" /> {ev.date}
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock size={16} className="text-[#0B25B7] shrink-0" /> {ev.time}
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPin size={16} className="text-[#0B25B7] shrink-0" /> {ev.place}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 font-semibold line-clamp-2 leading-relaxed pt-3 border-t border-slate-100">
                      {ev.desc}
                    </p>
                  </div>
                </div>

                {/* CARD FOOTER */}
                <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-black text-[#0B25B7] group-hover:underline">DETAIL EVENT</span>
                  <span className="bg-[#0B25B7] text-white p-2 rounded-xl group-hover:translate-x-1 transition-transform shadow-md">
                    <ExternalLink size={14} />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* ================= EVENT MODAL ================= */}
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
              className="
                bg-white
                text-slate-900
                border-2
                border-slate-200
                rounded-[32px]
                shadow-2xl
                max-w-xl w-full
                overflow-hidden
                relative
                my-8
              "
            >
              {/* BANNER IMAGE */}
              <div className="relative h-60 border-b border-slate-200 bg-slate-100">
                <img src={selected.image} alt={selected.title} className="w-full h-full object-cover" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 bg-white/90 text-slate-800 p-2.5 border border-slate-300 rounded-2xl font-bold hover:bg-red-600 hover:text-white transition-all cursor-pointer shadow-lg"
                >
                  <X size={20} />
                </button>
              </div>

              {/* MODAL BODY */}
              <div className="p-6 md:p-8 space-y-5">
                <div className="inline-block bg-blue-50 text-[#0B25B7] border border-blue-200 px-3.5 py-1 font-black text-xs uppercase rounded-full">
                  {selected.category.toUpperCase()}
                </div>

                <h3 className="text-2xl md:text-3xl font-black leading-tight text-slate-900 uppercase">
                  {selected.title}
                </h3>

                <div className="bg-slate-50 p-5 border border-slate-200 rounded-2xl space-y-2.5 text-xs md:text-sm font-semibold text-slate-800 shadow-xs">
                  <div className="flex items-center gap-2.5">
                    <CalendarDays size={18} className="text-[#0B25B7]" />
                    <span>Tanggal: {selected.date}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock size={18} className="text-[#0B25B7]" />
                    <span>Waktu: {selected.time}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MapPin size={18} className="text-[#0B25B7]" />
                    <span>Lokasi: {selected.place}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <UserCheck size={18} className="text-[#0B25B7]" />
                    <span>Penyelenggara: {selected.speaker}</span>
                  </div>
                </div>

                <p className="text-sm font-semibold text-slate-700 leading-relaxed">
                  {selected.desc}
                </p>

                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center gap-3 text-xs md:text-sm font-bold text-emerald-900 shadow-xs">
                  <CheckCircle size={20} className="text-emerald-600 shrink-0" />
                  <span>Pendaftaran Terbuka Untuk Seluruh Mahasiswa Manajemen Informatika</span>
                </div>
              </div>

              {/* MODAL FOOTER */}
              <div className="bg-slate-50 p-5 border-t border-slate-200 flex gap-4">
                <a
                  href="#contact"
                  onClick={() => setSelected(null)}
                  className="bg-gradient-to-r from-[#0B25B7] to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white border border-blue-900 py-3.5 px-6 rounded-2xl font-black text-xs md:text-sm flex-1 text-center shadow-xl shadow-blue-600/30 transition-all uppercase tracking-wider"
                >
                  DAFTAR KEGIATAN
                </a>
                <button
                  onClick={() => setSelected(null)}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-800 border border-slate-300 py-3.5 px-6 rounded-2xl font-black text-xs md:text-sm transition-all cursor-pointer uppercase tracking-wider"
                >
                  TUTUP
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Events;
