import React from 'react';
import { Film, Send, ShieldCheck, HelpCircle, FileText, Globe } from 'lucide-react';

export default function Footer({ isDarkMode }) {
  return (
    <footer className={`mt-20 border-t transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-slate-950 border-slate-800/90 text-slate-400' 
        : 'bg-slate-100 border-slate-200 text-slate-600'
    }`}>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-red-600 rounded-xl text-white shadow-lg shadow-red-600/30">
                <Film className="w-5 h-5" />
              </div>
              <span className={`text-xl font-black tracking-wider ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                MOVIE<span className="text-red-600">FLIX</span>
              </span>
            </div>
            <p className={`text-xs sm:text-sm leading-relaxed max-w-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Platform katalog dan rekomendasi film bioskop & streaming terkini. Temukan jadwal tayang, simpan film favoritmu, dan nikmati ulasan sinematik terbaru.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white' : 'bg-white border-slate-300 text-slate-700 hover:text-slate-900 shadow-xs'
              }`}>
                <Globe className="w-3.5 h-3.5 text-red-500" />
                Bahasa Indonesia
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className={`text-xs font-extrabold uppercase tracking-wider ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Navigasi Utama</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-red-500 transition-colors">Beranda Utama</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Sedang Tayang di Bioskop</a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors">Daftar Film Terfavorit</a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors">Rilis Terbaru 2024</a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors">Rekomendasi Minggu Ini</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className={`text-xs font-extrabold uppercase tracking-wider ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Genre Film</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-red-500 transition-colors">Action & Pertualangan</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Drama & Romance</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Horror & Misteri</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Sci-Fi & Fantasy</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Animasi & Keluarga</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className={`text-xs font-extrabold uppercase tracking-wider ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Berlangganan Info</h4>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Dapatkan notifikasi film rilis dan rekomendasi menarik langsung ke emailmu.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-1.5">
              <input
                type="email"
                placeholder="Email kamu..."
                className={`w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-red-500 ${
                  isDarkMode ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                }`}
              />
              <button
                type="submit"
                className="p-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors cursor-pointer shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        <div className={`mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
          isDarkMode ? 'border-slate-900' : 'border-slate-300/80'
        }`}>
          <p>© {new Date().getFullYear()} MovieFlix Portal Inc. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#" className="hover:text-red-500 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Privasi
            </a>
            <a href="#" className="hover:text-red-500 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5" /> Ketentuan
            </a>
            <a href="#" className="hover:text-red-500 flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5" /> Pusat Bantuan
            </a>
          </div>
        </div>

      </div>

    </footer>
  );
}
