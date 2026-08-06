import React from 'react';

const Header = ({ totalMovies, activeFilter, setActiveFilter }) => {
  return (
    <header className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-amber-500/20 sticky top-0 z-50 shadow-2xl backdrop-blur-md">
      <div className="h-1 bg-gradient-to-r from-amber-700 via-amber-400 to-amber-600"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-yellow-700 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="text-2xl">🍿</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-cinzel text-2xl sm:text-3xl font-extrabold tracking-wider gold-gradient-text">
                  CINEMA XXI
                </h1>
                <span className="bg-amber-400/10 text-amber-400 border border-amber-500/30 text-xs font-semibold px-2 py-0.5 rounded tracking-wide">
                  CineList
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 font-medium tracking-wide mt-0.5">
                Jadwal Tayang Bioskop XXI & Premier Indonesia
              </p>
            </div>
          </div>

          <div className="flex items-center bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 shadow-inner">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeFilter === 'all'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                  : 'text-slate-400 hover:text-amber-300'
              }`}
            >
              Semua Film ({totalMovies})
            </button>
            <button
              onClick={() => setActiveFilter('showing')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                activeFilter === 'showing'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-bold'
                  : 'text-slate-400 hover:text-emerald-400'
              }`}
            >
              <span>🎬</span> Sedang Tayang
            </button>
            <button
              onClick={() => setActiveFilter('upcoming')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                activeFilter === 'upcoming'
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20 font-bold'
                  : 'text-slate-400 hover:text-rose-400'
              }`}
            >
              <span>📦</span> Tidak Tayang
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
