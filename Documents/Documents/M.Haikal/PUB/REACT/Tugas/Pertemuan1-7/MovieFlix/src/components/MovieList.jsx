import React from 'react';
import MovieCard from './MovieCard';
import { Sparkles, SearchX } from 'lucide-react';

export default function MovieList({ 
  moviesData, 
  movies, 
  onToggleFavorite, 
  onResetFilters, 
  onSelectMovie, 
  isDarkMode 
}) {
  const list = moviesData || movies || [];

  if (list.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12 text-center">
        <div className={`border rounded-2xl p-10 max-w-md mx-auto space-y-4 shadow-xl ${
          isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="w-16 h-16 bg-slate-800/80 rounded-full flex items-center justify-center mx-auto text-slate-400">
            <SearchX className="w-8 h-8" />
          </div>
          <h3 className={`text-lg font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Tidak Ada Film Ditemukan</h3>
          <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Coba ubah kata kunci pencarian atau sesuaikan filter genre dan status tayang.
          </p>
          {onResetFilters && (
            <button
              onClick={onResetFilters}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-semibold shadow-lg transition-all cursor-pointer inline-flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Reset Pencarian
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
      
      {/* 
        Responsive Container: 
        - Layar HP (< md): Flex overflow-x-auto (Scroll Kiri-Kanan)
        - Layar Tablet/Laptop (>= md): Grid 3-4 Kolom Rapi (Tidak Perlu Scroll Kiri-Kanan)
      */}
      <div className="flex overflow-x-auto gap-4 pb-4 pt-1 snap-x snap-mandatory scroll-smooth no-scrollbar md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-6 md:pb-0 md:overflow-visible">
        {list.map((movie) => (
          <MovieCard
            key={movie.id}
            movieData={movie}
            onToggleFavorite={onToggleFavorite}
            onSelectMovie={onSelectMovie}
            isDarkMode={isDarkMode}
          />
        ))}
      </div>

    </div>
  );
}
