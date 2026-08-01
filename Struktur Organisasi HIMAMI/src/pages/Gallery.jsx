import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2, Tag } from "lucide-react";

function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [activeTag, setActiveTag] = useState("all");

  const galleryItems = [
    {
      title: "Pelatihan Development & Coding",
      category: "workshop",
      tag: "Workshop IT",
      date: "Mei 2026",
      src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80",
    },
    {
      title: "Seminar AI & Cyber Security",
      category: "seminar",
      tag: "Seminar",
      date: "April 2026",
      src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80",
    },
    {
      title: "Musyawarah Himpunan & Rapat Kerja",
      category: "musyawarah",
      tag: "Rapat Kerja",
      date: "Maret 2026",
      src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
    },
    {
      title: "Kebersamaan Malam Keakraban (Makrab)",
      category: "makrab",
      tag: "Makrab",
      date: "Februari 2026",
      src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&auto=format&fit=crop&q=80",
    },
    {
      title: "Diskusi & Study Club Programming",
      category: "workshop",
      tag: "Study Club",
      date: "Januari 2026",
      src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80",
    },
    {
      title: "Pemberian Penghargaan Mahasiswa Berprestasi",
      category: "seminar",
      tag: "Apresiasi",
      date: "Desember 2025",
      src: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80",
    },
    {
      title: "Bakti Sosial & Kepedulian Lingkungan",
      category: "makrab",
      tag: "Sosial",
      date: "November 2025",
      src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&auto=format&fit=crop&q=80",
    },
    {
      title: "Pelantikan Pengurus HIMAMI Kabinet Baru",
      category: "musyawarah",
      tag: "Pelantikan",
      date: "Oktober 2025",
      src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80",
    },
  ];

  const filteredItems = galleryItems.filter(
    (item) => activeTag === "all" || item.category === activeTag
  );

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section
      id="gallery"
      className="scroll-mt-20 min-h-screen bg-[#F8FAFC] px-4 md:px-8 py-20 overflow-hidden relative border-b border-slate-200 text-slate-900"
    >
      {/* DECORATIVE GRADIENT GLOWS */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-block bg-blue-50 text-[#0B25B7] border border-blue-200 px-4 py-1.5 font-black text-xs md:text-sm uppercase rounded-full shadow-sm mb-3">
            Dokumentasi & Memori
          </div>
          <h2 className="text-4xl md:text-6xl font-black uppercase text-slate-900 tracking-tight">
            Galeri Kegiatan HIMAMI
          </h2>
          <p className="text-slate-600 font-semibold max-w-xl mx-auto mt-3 text-base md:text-lg">
            Kumpulan momen berharga, kebersamaan, serta rekam jejak aktivitas pengurus dan anggota HIMAMI.
          </p>
        </motion.div>

        {/* CATEGORY TABS */}
        <div className="flex justify-center flex-wrap gap-2.5 mb-12">
          {[
            { id: "all", label: "SEMUA FOTO" },
            { id: "workshop", label: "WORKSHOP & CODING" },
            { id: "seminar", label: "SEMINAR IT" },
            { id: "musyawarah", label: "RAPAT & MUSYAWARAH" },
            { id: "makrab", label: "MAKRAB & SOSIAL" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTag(tab.id)}
              className={`
                px-4 py-2 font-black text-xs rounded-xl border transition-all cursor-pointer uppercase tracking-wider shadow-sm
                ${activeTag === tab.id 
                  ? "bg-[#0B25B7] text-white border-blue-900 shadow-md" 
                  : "bg-white text-slate-700 border-slate-200 hover:border-[#0B25B7] hover:text-[#0B25B7]"}
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* GALLERY GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.04, y: -6 }}
              onClick={() => setSelectedIndex(idx)}
              className="
                bg-white
                border-2
                border-slate-200
                hover:border-[#0B25B7]
                rounded-2xl
                shadow-xl
                overflow-hidden
                cursor-pointer
                group
                relative
                transition-all
              "
            >
              <div className="relative h-56 overflow-hidden bg-slate-100">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />

                {/* OVERLAY HOVER */}
                <div className="absolute inset-0 bg-[#0B25B7]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center">
                  <div className="bg-white text-[#0B25B7] p-3 rounded-xl shadow-lg">
                    <Maximize2 size={20} />
                  </div>
                </div>

                <div className="absolute top-3 left-3 bg-[#0B25B7] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full border border-blue-900 uppercase shadow-md">
                  {item.tag}
                </div>
              </div>

              {/* CARD CAPTION */}
              <div className="p-4 bg-white border-t border-slate-100">
                <h3 className="font-black text-sm text-slate-900 group-hover:text-[#0B25B7] transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-[11px] font-semibold text-slate-500 mt-1 flex items-center gap-1.5">
                  <Tag size={12} className="text-[#0B25B7]" /> {item.date}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ================= LIGHTBOX MODAL ================= */}
      <AnimatePresence>
        {selectedIndex !== null && filteredItems[selectedIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-6 right-6 bg-white text-slate-800 p-3 rounded-xl border border-slate-300 hover:bg-red-600 hover:text-white z-50 cursor-pointer transition-all shadow-md"
            >
              <X size={24} />
            </button>

            {/* NAV PREV */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 bg-white text-[#0B25B7] p-3 rounded-xl border border-slate-300 hover:bg-[#0B25B7] hover:text-white z-50 cursor-pointer hidden sm:block transition-all shadow-lg"
            >
              <ChevronLeft size={28} />
            </button>

            {/* NAV NEXT */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 bg-white text-[#0B25B7] p-3 rounded-xl border border-slate-300 hover:bg-[#0B25B7] hover:text-white z-50 cursor-pointer hidden sm:block transition-all shadow-lg"
            >
              <ChevronRight size={28} />
            </button>

            {/* LIGHTBOX MAIN CONTAINER */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border-2 border-slate-200 rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden text-slate-900"
            >
              <div className="bg-slate-950 p-2 md:p-4 text-center">
                <img
                  src={filteredItems[selectedIndex].src}
                  alt={filteredItems[selectedIndex].title}
                  className="max-h-[65vh] w-auto mx-auto object-contain rounded-xl border border-slate-800"
                />
              </div>

              <div className="p-6 bg-white flex flex-col md:flex-row items-center justify-between gap-4 border-t border-slate-100">
                <div>
                  <span className="bg-blue-50 text-[#0B25B7] border border-blue-200 px-3 py-1 font-black text-xs uppercase rounded-full">
                    {filteredItems[selectedIndex].tag}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 uppercase mt-2">
                    {filteredItems[selectedIndex].title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 mt-1">
                    Dokumentasi Resmi Kegiatan HIMAMI • {filteredItems[selectedIndex].date}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handlePrev}
                    className="sm:hidden bg-slate-100 text-slate-800 px-4 py-2 rounded-xl border border-slate-300 font-bold text-xs"
                  >
                    ‹ SEBELUMNYA
                  </button>
                  <button
                    onClick={handleNext}
                    className="sm:hidden bg-slate-100 text-slate-800 px-4 py-2 rounded-xl border border-slate-300 font-bold text-xs"
                  >
                    SELANJUTNYA ›
                  </button>
                  <button
                    onClick={() => setSelectedIndex(null)}
                    className="bg-[#0B25B7] hover:bg-blue-800 text-white px-5 py-2 rounded-xl border border-blue-900 font-black text-xs shadow-lg shadow-blue-600/30 transition-all uppercase tracking-wider"
                  >
                    TUTUP
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Gallery;
