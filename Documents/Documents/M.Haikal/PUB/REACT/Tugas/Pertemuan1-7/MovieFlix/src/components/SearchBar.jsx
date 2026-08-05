import React from 'react';
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export default function SearchBar({
  searchTerm,
  onSearchChange,
  selectedGenre,
  onGenreChange,
  statusFilter,
  onStatusChange,
  sortBy,
  onSortChange,
  genres,
  isDarkMode
}) {
  const containerStyle = isDarkMode
    ? "bg-slate-900/90 border-slate-800"
    : "bg-white border-slate-200 shadow-md";

  const inputStyle = isDarkMode
    ? "bg-slate-950/80 border-slate-800 text-slate-100 placeholder-slate-500"
    : "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400";

  const selectStyle = isDarkMode
    ? "bg-slate-950/80 border-slate-800 text-slate-200"
    : "bg-slate-50 border-slate-300 text-slate-800";

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
      <div className={`border rounded-2xl p-4 sm:p-5 shadow-xl space-y-4 transition-colors ${containerStyle}`}>
        
        <div className="flex flex-col lg:flex-row items-center gap-4">
          
          <div className="relative flex-1 w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari judul film (Contoh: Spider-Man, Interstellar, Agak Laen)..."
              className={`w-full pl-11 pr-10 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/80 transition-all text-sm sm:text-base ${inputStyle}`}
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-red-500 transition-colors"
                title="Hapus Pencarian"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto flex-wrap sm:flex-nowrap">
            
            <div className="flex-1 sm:flex-none">
              <select
                value={selectedGenre}
                onChange={(e) => onGenreChange(e.target.value)}
                className={`w-full sm:w-auto px-4 py-3 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500/80 cursor-pointer ${selectStyle}`}
              >
                <option value="Semua">Semua Genre</option>
                {genres.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div className="flex-1 sm:flex-none">
              <select
                value={statusFilter}
                onChange={(e) => onStatusChange(e.target.value)}
                className={`w-full sm:w-auto px-4 py-3 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500/80 cursor-pointer ${selectStyle}`}
              >
                <option value="Semua">Semua Status</option>
                <option value="showing">🟢 Sedang Tayang</option>
                <option value="not_showing">🔴 Tidak Tayang</option>
                <option value="favorite">❤️ Favorite</option>
              </select>
            </div>

            <div className="flex-1 sm:flex-none">
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className={`w-full sm:w-auto px-4 py-3 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500/80 cursor-pointer ${selectStyle}`}
              >
                <option value="default">Urutkan: Default</option>
                <option value="rating_desc">⭐ Rating Tertinggi</option>
                <option value="year_desc">📅 Rilis Terbaru</option>
                <option value="title_asc">🔤 Judul A-Z</option>
              </select>
            </div>

          </div>

        </div>

        {/* Quick Genre Pills Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 no-scrollbar">
          <span className="text-xs font-bold uppercase text-slate-400 flex items-center gap-1 flex-shrink-0 mr-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-red-500" /> Genre:
          </span>
          <button
            onClick={() => onGenreChange('Semua')}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedGenre === 'Semua'
                ? 'bg-red-600 text-white shadow-sm'
                : isDarkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Semua
          </button>
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => onGenreChange(g)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedGenre === g
                  ? 'bg-red-600 text-white shadow-sm'
                  : isDarkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
