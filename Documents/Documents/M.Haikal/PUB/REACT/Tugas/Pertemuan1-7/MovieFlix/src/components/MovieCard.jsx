import React from 'react';
import { Star, Clock, Calendar, Heart, Eye } from 'lucide-react';

export default function MovieCard({ movieData, movie, onToggleFavorite, onSelectMovie, isDarkMode }) {
  const item = movieData || movie;
  const { id, title, genre, year, duration, rating, showing, favorite, poster, description } = item;

  const cardContainerStyle = isDarkMode
    ? "bg-slate-900/90 border-slate-800 text-slate-100 hover:border-slate-700 hover:shadow-2xl"
    : "bg-white border-slate-200 text-slate-900 hover:border-slate-300 hover:shadow-xl";

  const subTextStyle = isDarkMode ? "text-slate-400" : "text-slate-500";

  return (
    <div 
      onClick={() => onSelectMovie && onSelectMovie(item)}
      className={`w-[220px] sm:w-[250px] md:w-auto flex-shrink-0 md:flex-shrink-1 snap-start border rounded-2xl overflow-hidden shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col group h-full cursor-pointer ${cardContainerStyle}`}
    >
      
      <div className="relative h-60 sm:h-64 md:h-72 w-full overflow-hidden bg-slate-950">
        <img
          src={poster}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

        <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-amber-400 border border-amber-500/30 flex items-center gap-1 shadow-md">
          <Star className="w-3.5 h-3.5 fill-amber-400" />
          <span>{rating}</span>
        </div>

        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-semibold text-slate-300 border border-slate-700/80 shadow-md">
          {genre}
        </div>

        <div className="absolute bottom-3 left-3">
          {showing ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 backdrop-blur-sm shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              🟢 Sedang Tayang
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-rose-950/90 text-rose-300 border border-rose-500/40 backdrop-blur-sm shadow-md">
              🔴 Tidak Tayang
            </span>
          )}
        </div>

        <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold shadow-lg flex items-center gap-1.5 transform scale-90 group-hover:scale-100 transition-transform">
            <Eye className="w-4 h-4" /> Detail Film
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div>
          <h3 className={`text-base sm:text-lg font-bold group-hover:text-red-500 transition-colors line-clamp-1 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
            {title}
          </h3>

          <div className={`flex flex-wrap items-center gap-2.5 mt-2 text-xs ${subTextStyle}`}>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {year}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {duration}
            </span>
          </div>

          {description && (
            <p className={`mt-3 text-xs leading-relaxed line-clamp-2 ${subTextStyle}`}>
              {description}
            </p>
          )}
        </div>

        <div className={`pt-3 border-t flex items-center justify-between gap-2 ${isDarkMode ? 'border-slate-800/80' : 'border-slate-200'}`}>
          
          <div className="text-xs font-medium">
            {favorite ? (
              <span className="text-rose-500 font-semibold flex items-center gap-1">
                ❤️ Favorite
              </span>
            ) : (
              <span className={`flex items-center gap-1 ${subTextStyle}`}>
                🤍 Belum Favorite
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(id);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shadow-md cursor-pointer ${
              favorite
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 hover:bg-rose-600 hover:text-white'
                : isDarkMode ? 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 border border-slate-300 hover:bg-slate-200'
            }`}
            title="Klik untuk mengubah status Favorite"
          >
            <Heart className={`w-3.5 h-3.5 ${favorite ? 'fill-rose-500 text-rose-500 group-hover:text-white' : 'text-slate-400'}`} />
            <span>{favorite ? '❤️' : '🤍'}</span>
          </button>

        </div>

      </div>

    </div>
  );
}
