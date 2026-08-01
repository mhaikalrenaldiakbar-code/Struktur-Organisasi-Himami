import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-2">
            <span>🎬</span> Daftar Film XXI
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Menampilkan {movies.length} judul film terkini di XXI Cinema.
          </p>
        </div>
      </div>

      {movies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-12 text-center my-8">
          <div className="text-4xl mb-3">🍿</div>
          <h3 className="text-lg font-bold text-slate-200">Tidak ada film ditemukan</h3>
          <p className="text-sm text-slate-400 mt-1">
            Silakan ubah filter kategori tayang untuk melihat daftar film lainnya.
          </p>
        </div>
      )}
    </section>
  );
};

export default MovieList;
