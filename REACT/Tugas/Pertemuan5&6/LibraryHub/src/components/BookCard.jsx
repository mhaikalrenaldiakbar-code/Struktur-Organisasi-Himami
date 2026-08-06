import React from 'react';
import { User, Calendar, Tag, Bookmark } from 'lucide-react';

export default function BookCard({
  title,
  author,
  category,
  year,
  isAvailable
}) {
  // Aksen garis spine buku sesuai kategori
  const categorySpines = {
    "Pemrograman": "border-l-4 border-l-blue-600",
    "Software Engineering": "border-l-4 border-l-amber-600",
    "Desain Web": "border-l-4 border-l-teal-600",
    "Algoritma": "border-l-4 border-l-purple-600",
    "Kecerdasan Buatan": "border-l-4 border-l-indigo-600",
    "Keamanan Siber": "border-l-4 border-l-rose-600"
  };

  const spineClass = categorySpines[category] || "border-l-4 border-l-amber-800";

  return (
    <div className={`flex flex-col justify-between w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] min-w-[260px] bg-white border border-amber-200/80 ${spineClass} rounded-2xl p-5 shadow-xs hover:shadow-xl hover:shadow-amber-900/5 hover:-translate-y-1 hover:border-amber-300 transition-all duration-300 group`}>
      <div>
        {/* Header Badges: Kategori & Conditional Status */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-stone-100 text-stone-700 border border-stone-200/80">
            <Tag className="w-3 h-3 text-stone-500" />
            {category}
          </span>

          {/* Conditional Rendering (PRD Mandate: Ternary Operator) */}
          <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold ${
              isAvailable
                ? "bg-emerald-100/80 text-emerald-900 border border-emerald-300/80"
                : "bg-rose-100/80 text-rose-900 border border-rose-300/80"
            }`}
          >
            {isAvailable ? "🟢 Tersedia" : "🔴 Dipinjam"}
          </span>
        </div>

        {/* Title dengan Serf Font */}
        <h3 className="font-serif-heading text-lg font-bold text-stone-900 line-clamp-2 mb-3 leading-snug group-hover:text-amber-900 transition-colors">
          {title}
        </h3>

        {/* Detail Metadata */}
        <div className="space-y-2 text-xs text-stone-600 border-t border-amber-100 pt-3.5 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-stone-500 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-stone-400" />
              Penulis:
            </span>
            <span className="font-semibold text-stone-800 truncate max-w-[130px]">{author}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-stone-500 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              Tahun:
            </span>
            <span className="font-semibold text-stone-800">{year}</span>
          </div>
        </div>
      </div>

      {/* Button Pinjam */}
      <div className="pt-3 border-t border-amber-100">
        <button
          disabled={!isAvailable}
          className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
            isAvailable
              ? "bg-amber-900 hover:bg-amber-950 text-amber-50 shadow-sm cursor-pointer active:scale-[0.98]"
              : "bg-stone-100 text-stone-400 cursor-not-allowed border border-stone-200"
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>{isAvailable ? "Pinjam Buku Ini" : "Sedang Dipinjam"}</span>
        </button>
      </div>
    </div>
  );
}
