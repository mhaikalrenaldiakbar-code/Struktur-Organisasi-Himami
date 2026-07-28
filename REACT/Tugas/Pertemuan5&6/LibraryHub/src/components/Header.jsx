import React from 'react';
import { BookOpen, Layers } from 'lucide-react';

export default function Header({ totalBooks, availableCount, borrowedCount }) {
  return (
    <header className="bg-[#faf7f2]/90 backdrop-blur-md border-b border-amber-200/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Name */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-900 rounded-xl text-amber-50 shadow-md shadow-amber-950/10 flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif-heading text-2xl font-extrabold text-stone-900 tracking-tight">
                  LibraryHub
                </h1>
                <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300/70 rounded-full">
                  E-Perpus
                </span>
              </div>
              <p className="text-xs text-stone-500 font-medium hidden sm:block">
                Katalog Perpustakaan & Literatur Digital
              </p>
            </div>
          </div>

          {/* Quick Stats Badges */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-1.5 bg-white/80 rounded-xl text-xs border border-amber-200/80 shadow-xs">
              <Layers className="w-3.5 h-3.5 text-amber-800" />
              <span className="text-stone-600 font-medium">Total:</span>
              <strong className="text-stone-900 font-bold">{totalBooks}</strong>
            </div>

            <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-100/70 text-emerald-900 rounded-xl border border-emerald-300/80 text-xs font-bold shadow-xs">
              <span>🟢 Tersedia: <strong>{availableCount}</strong></span>
            </div>

            <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-rose-100/70 text-rose-900 rounded-xl border border-rose-300/80 text-xs font-bold shadow-xs">
              <span>🔴 Dipinjam: <strong>{borrowedCount}</strong></span>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
