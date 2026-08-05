import React, { useEffect } from 'react';
import { X, Star, Clock, Calendar, Heart, Play, Share2, Check } from 'lucide-react';

export default function MovieModal({ movie, onClose, onToggleFavorite }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!movie) return null;

  const { id, title, genre, year, duration, rating, showing, favorite, poster, description } = movie;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl space-y-0 text-slate-100 flex flex-col md:flex-row max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-slate-950/80 hover:bg-red-600 text-slate-300 hover:text-white rounded-full border border-slate-700/80 transition-all cursor-pointer shadow-lg"
          title="Tutup Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="md:w-5/12 h-64 md:h-auto relative bg-slate-950 flex-shrink-0">
          <img
            src={poster}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900 via-transparent to-transparent"></div>
          
          <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-400 border border-amber-500/30 flex items-center gap-1 shadow-md">
            <Star className="w-4 h-4 fill-amber-400" />
            <span>{rating} / 10</span>
          </div>
        </div>

        <div className="p-6 md:p-8 md:w-7/12 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-md text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                  {genre}
                </span>
                {showing ? (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/90 text-emerald-300 border border-emerald-500/40">
                    🟢 Sedang Tayang
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-950/90 text-rose-300 border border-rose-500/40">
                    🔴 Tidak Tayang
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                {title}
              </h2>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-400 font-medium border-y border-slate-800/80 py-2.5">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-slate-500" />
                {year}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-slate-500" />
                {duration}
              </span>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Sinopsis Film</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onToggleFavorite(id)}
              className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer ${
                favorite
                  ? 'bg-rose-600 hover:bg-rose-500 text-white'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
            >
              <Heart className={`w-4 h-4 ${favorite ? 'fill-white' : ''}`} />
              <span>{favorite ? 'Hapus dari Favorit' : 'Tambah ke Favorit'}</span>
            </button>

            <button
              onClick={() => alert(`Memutar trailer untuk ${title}...`)}
              className="px-4 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Trailer</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
