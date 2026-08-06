import React, { useState } from 'react';
import Header from './components/Header';
import BookList from './components/BookList';
import Footer from './components/Footer';
import { booksData } from './data/books';
import { Sparkles, BookOpenCheck, BookmarkCheck } from 'lucide-react';

export default function App() {
  const [books] = useState(booksData);

  const totalBooks = books.length;
  const availableCount = books.filter((b) => b.isAvailable).length;
  const borrowedCount = totalBooks - availableCount;

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#faf7f2] text-stone-800 font-sans">
      <div>
        <Header
          totalBooks={totalBooks}
          availableCount={availableCount}
          borrowedCount={borrowedCount}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Banner Editorial Warm Design */}
          <div className="bg-white border border-amber-200/90 rounded-3xl p-8 sm:p-10 mb-10 shadow-xs relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-amber-50/80 to-transparent pointer-events-none hidden md:block" />

            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 border border-amber-300/80 text-xs font-bold mb-4">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>Katalog Perpustakaan Digital</span>
              </div>

              <h2 className="font-serif-heading text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-3 leading-tight">
                Selamat Datang di LibraryHub
              </h2>

              <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6">
                Platform perpustakaan digital resmi. Jelajahi berbagai pilihan koleksi literatur pemrograman, rekayasa perangkat lunak, hingga ilmu komputer.
              </p>

              {/* Stat Highlights */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-amber-100">
                <div className="flex items-center gap-2 text-xs font-semibold text-stone-700">
                  <BookOpenCheck className="w-4 h-4 text-amber-800" />
                  <span>{totalBooks} Koleksi Lengkap</span>
                </div>
                <div className="w-px h-4 bg-amber-200" />
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                  <span>🟢 {availableCount} Siap Dipinjam</span>
                </div>
                <div className="w-px h-4 bg-amber-200" />
                <div className="flex items-center gap-2 text-xs font-semibold text-rose-800">
                  <span>🔴 {borrowedCount} Sedang Dipinjam</span>
                </div>
              </div>
            </div>
          </div>

          <BookList books={books} />
        </main>
      </div>

      <Footer />
    </div>
  );
}
