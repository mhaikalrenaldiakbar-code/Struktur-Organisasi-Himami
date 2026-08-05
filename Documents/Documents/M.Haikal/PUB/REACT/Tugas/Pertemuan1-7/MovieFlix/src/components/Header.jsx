import React, { useState } from 'react';
import { Film, Compass, Heart, PlayCircle, Sun, Moon, Menu, X, User } from 'lucide-react';

export default function Header({ activeTab, onTabChange, isDarkMode, onToggleTheme }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-300 shadow-xl ${
      isDarkMode 
        ? 'bg-slate-950/85 border-slate-800/80 text-slate-100' 
        : 'bg-white/85 border-slate-200 text-slate-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-8">
            <div 
              onClick={() => onTabChange && onTabChange('all')} 
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="p-2.5 bg-gradient-to-tr from-red-600 via-red-500 to-rose-500 rounded-xl shadow-lg shadow-red-600/30 text-white flex items-center justify-center transform group-hover:scale-105 transition-all duration-300">
                <Film className="w-6 h-6 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className={`text-2xl font-black tracking-wider ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  MOVIE<span className="text-red-600">FLIX</span>
                </span>
                <span className={`text-[10px] tracking-widest font-semibold uppercase -mt-1 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  Cinema Portal
                </span>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              <button
                onClick={() => onTabChange && onTabChange('all')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  !activeTab || activeTab === 'all'
                    ? isDarkMode ? 'bg-slate-800/90 text-red-400 border border-slate-700' : 'bg-slate-100 text-red-600 border border-slate-300 shadow-xs'
                    : isDarkMode ? 'text-slate-300 hover:text-white hover:bg-slate-900/60' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Compass className="w-4 h-4" />
                <span>Beranda</span>
              </button>

              <button
                onClick={() => onTabChange && onTabChange('showing')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'showing'
                    ? isDarkMode ? 'bg-slate-800/90 text-emerald-400 border border-slate-700' : 'bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-xs'
                    : isDarkMode ? 'text-slate-300 hover:text-white hover:bg-slate-900/60' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <PlayCircle className="w-4 h-4 text-emerald-500" />
                <span>Sedang Tayang</span>
              </button>

              <button
                onClick={() => onTabChange && onTabChange('favorite')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'favorite'
                    ? isDarkMode ? 'bg-slate-800/90 text-rose-400 border border-slate-700' : 'bg-rose-50 text-rose-600 border border-rose-200 shadow-xs'
                    : isDarkMode ? 'text-slate-300 hover:text-white hover:bg-slate-900/60' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Heart className="w-4 h-4 text-rose-500" />
                <span>Favorit Saya</span>
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Dark / Light Mode Toggle Button */}
            <button
              onClick={onToggleTheme}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-center shadow-sm ${
                isDarkMode
                  ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800 hover:border-slate-700'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
              }`}
              title={isDarkMode ? "Ganti ke Mode Terang (Light Mode)" : "Ganti ke Mode Gelap (Dark Mode)"}
            >
              {isDarkMode ? <Sun className="w-5 h-5 animate-spin-slow" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>

            <button className={`hidden sm:flex p-2.5 border rounded-xl transition-all cursor-pointer shadow-xs ${
              isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white' : 'bg-slate-100 border-slate-300 text-slate-700 hover:text-slate-900'
            }`}>
              <User className="w-5 h-5" />
            </button>
            
            <button className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-red-600/25 transition-all cursor-pointer">
              Masuk / Daftar
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2.5 border rounded-xl transition-colors ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-300 text-slate-700'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-slate-800/80 space-y-2">
            <button
              onClick={() => {
                onTabChange && onTabChange('all');
                setIsMobileMenuOpen(false);
              }}
              className="w-full px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-slate-800/50"
            >
              <Compass className="w-4 h-4 text-red-500" />
              <span>Beranda</span>
            </button>
            <button
              onClick={() => {
                onTabChange && onTabChange('showing');
                setIsMobileMenuOpen(false);
              }}
              className="w-full px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-slate-800/50"
            >
              <PlayCircle className="w-4 h-4 text-emerald-500" />
              <span>Sedang Tayang</span>
            </button>
            <button
              onClick={() => {
                onTabChange && onTabChange('favorite');
                setIsMobileMenuOpen(false);
              }}
              className="w-full px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-slate-800/50"
            >
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Favorit Saya</span>
            </button>
          </div>
        )}

      </div>
    </header>
  );
}
