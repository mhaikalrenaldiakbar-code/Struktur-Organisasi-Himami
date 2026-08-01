import React from 'react';

const MovieCard = ({ movie }) => {
  const { judul, genre, tahun, rating, statusTayang, poster, durasi, batasanUmur } = movie;

  return (
    <div className="group bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-500 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-amber-500/10 flex flex-col justify-between">
      
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-950">
        <img
          src={poster}
          alt={judul}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-slate-950/80 text-slate-200 border border-slate-700 text-xs font-bold px-2.5 py-1 rounded-md">
            {batasanUmur || 'SU'}
          </span>
          <span className="bg-amber-500 text-slate-950 text-xs font-extrabold px-2.5 py-1 rounded-md">
            XXI 2D
          </span>
        </div>

        <div className="absolute top-3 right-3 bg-slate-950/90 border border-amber-500/50 text-amber-400 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
          <span>⭐</span>
          <span className="text-white font-extrabold">{rating}</span>
        </div>

        <div className="absolute bottom-3 left-3 right-3">
          {statusTayang ? (
            <div className="w-full bg-emerald-600 text-slate-950 font-bold text-xs py-2 px-3 rounded-xl flex items-center justify-between shadow-lg">
              <span className="flex items-center gap-1.5">
                <span>🎬</span> Sedang Tayang
              </span>
              <span className="text-[10px] bg-slate-950/20 px-1.5 py-0.5 rounded uppercase">NOW SHOWING</span>
            </div>
          ) : (
            <div className="w-full bg-rose-600 text-white font-bold text-xs py-2 px-3 rounded-xl flex items-center justify-between shadow-lg">
              <span className="flex items-center gap-1.5">
                <span>📦</span> Tidak Tayang
              </span>
              <span className="text-[10px] bg-slate-950/30 px-1.5 py-0.5 rounded uppercase">COMING SOON</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-1.5">
            <span className="text-amber-400 font-semibold">{genre}</span>
            <span>{tahun}</span>
          </div>

          <h2 className="text-base font-bold text-slate-100 group-hover:text-amber-300 transition-colors line-clamp-1">
            {judul}
          </h2>

          {durasi && (
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
              <span>⏱️</span> {durasi}
            </p>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800">
          {statusTayang ? (
            <button className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs py-2.5 rounded-xl shadow-md transition-all">
              🎟️ Beli Tiket XXI
            </button>
          ) : (
            <button className="w-full bg-slate-800 text-slate-400 font-semibold text-xs py-2.5 rounded-xl border border-slate-700 cursor-not-allowed">
              🔔 Ingatkan Saya
            </button>
          )}
        </div>
      </div>

    </div>
  );
};

export default MovieCard;
