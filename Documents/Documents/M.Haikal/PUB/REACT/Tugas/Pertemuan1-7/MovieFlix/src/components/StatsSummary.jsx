import React from 'react';
import { Film, PlayCircle, Heart, Star } from 'lucide-react';

export default function StatsSummary({ totalMovies, showingCount, favoriteCount, avgRating, isDarkMode }) {
  const cardStyle = isDarkMode
    ? "bg-slate-900/90 border-slate-800 text-white hover:border-slate-700"
    : "bg-white border-slate-200 text-slate-900 shadow-md hover:border-slate-300";

  const subTextStyle = isDarkMode ? "text-slate-400" : "text-slate-500";
  const iconBgStyle = isDarkMode ? "bg-slate-800/80" : "bg-slate-100";

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className={`relative overflow-hidden border rounded-2xl p-5 transition-all duration-300 group shadow-lg ${cardStyle}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-wider ${subTextStyle}`}>Total Film</p>
              <h3 className="text-3xl font-extrabold mt-1 group-hover:text-red-500 transition-colors">
                {totalMovies}
              </h3>
              <p className={`text-xs mt-1 ${subTextStyle}`}>Dalam koleksi MovieFlix</p>
            </div>
            <div className={`p-3.5 rounded-xl text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all shadow-md ${iconBgStyle}`}>
              <Film className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className={`relative overflow-hidden border rounded-2xl p-5 transition-all duration-300 group shadow-lg ${cardStyle}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-wider ${subTextStyle}`}>Sedang Tayang</p>
              <h3 className="text-3xl font-extrabold text-emerald-500 mt-1">
                {showingCount}
              </h3>
              <p className={`text-xs mt-1 ${subTextStyle}`}>Tersedia di bioskop / streaming</p>
            </div>
            <div className={`p-3.5 rounded-xl text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-md ${iconBgStyle}`}>
              <PlayCircle className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className={`relative overflow-hidden border rounded-2xl p-5 transition-all duration-300 group shadow-lg ${cardStyle}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-wider ${subTextStyle}`}>Favorite</p>
              <h3 className="text-3xl font-extrabold text-rose-500 mt-1">
                {favoriteCount}
              </h3>
              <p className={`text-xs mt-1 ${subTextStyle}`}>Film favorit tersimpan</p>
            </div>
            <div className={`p-3.5 rounded-xl text-rose-500 group-hover:bg-rose-600 group-hover:text-white transition-all shadow-md ${iconBgStyle}`}>
              <Heart className="w-6 h-6 fill-rose-500/20 group-hover:fill-white" />
            </div>
          </div>
        </div>

        <div className={`relative overflow-hidden border rounded-2xl p-5 transition-all duration-300 group shadow-lg ${cardStyle}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-wider ${subTextStyle}`}>Rata-Rata Rating</p>
              <h3 className="text-3xl font-extrabold text-amber-500 mt-1">
                {avgRating} <span className={`text-sm font-normal ${subTextStyle}`}>/ 10</span>
              </h3>
              <p className={`text-xs mt-1 ${subTextStyle}`}>Skor kualitas koleksi</p>
            </div>
            <div className={`p-3.5 rounded-xl text-amber-500 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all shadow-md ${iconBgStyle}`}>
              <Star className="w-6 h-6 fill-amber-400" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
