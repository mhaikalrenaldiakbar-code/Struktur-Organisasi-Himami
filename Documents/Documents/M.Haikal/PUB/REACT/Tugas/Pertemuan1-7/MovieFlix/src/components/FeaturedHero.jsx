import React, { useState, useEffect } from 'react';
import { Play, Heart, Star, Sparkles, ChevronLeft, ChevronRight, Clock, Calendar } from 'lucide-react';

export default function FeaturedHero({ featuredMovies = [], onToggleFavorite }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Take top 5 films for carousel
  const slides = featuredMovies.slice(0, 6);

  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length, isPaused]);

  if (slides.length === 0) return null;

  const currentMovie = slides[currentIndex];
  const { id, title, genre, year, duration, rating, favorite, poster, description } = currentMovie;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
      <div 
        className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800/90 shadow-2xl group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        
        <div className="absolute inset-0">
          <img
            key={id}
            src={poster}
            alt={title}
            className="w-full h-full object-cover object-center opacity-30 blur-xs scale-105 transition-all duration-700 animate-fadeIn"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 p-6 sm:p-10 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 min-h-[420px]">
          
          <div className="max-w-2xl space-y-4 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold bg-gradient-to-r from-red-600 to-rose-600 text-white uppercase tracking-wider shadow-lg shadow-red-600/30">
              <Sparkles className="w-3.5 h-3.5" />
              Sorotan Utama Film Trending #{currentIndex + 1}
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight transition-all duration-300">
              {title}
            </h2>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs sm:text-sm text-slate-300 font-medium">
              <span className="px-3 py-1 rounded-lg bg-slate-800/90 text-slate-200 border border-slate-700/80 shadow-xs">{genre}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {year}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {duration}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-amber-400 font-bold bg-amber-950/40 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                <Star className="w-4 h-4 fill-amber-400" />
                {rating} / 10
              </span>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
              {description}
            </p>

            <div className="flex items-center justify-center sm:justify-start gap-4 pt-3">
              <button
                onClick={() => onToggleFavorite(id)}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 shadow-lg cursor-pointer ${
                  favorite
                    ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30'
                    : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                }`}
              >
                <Heart className={`w-4 h-4 ${favorite ? 'fill-white' : ''}`} />
                <span>{favorite ? '❤️ Favorite' : '🤍 Tambah Favorite'}</span>
              </button>
            </div>
          </div>

          <div className="hidden md:block w-56 h-76 flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-700/60 transform rotate-1 hover:rotate-0 transition-all duration-500">
            <img src={poster} alt={title} className="w-full h-full object-cover" />
          </div>

        </div>

        <button
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-slate-950/70 border border-slate-800 text-slate-300 hover:text-white hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-slate-950/70 border border-slate-800 text-slate-300 hover:text-white hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-slate-950/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800/80">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx ? 'w-6 bg-red-500' : 'w-2 bg-slate-600 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
