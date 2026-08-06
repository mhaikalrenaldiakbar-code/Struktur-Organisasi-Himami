import React from 'react';
import BookCard from './BookCard';
import { BookOpen } from 'lucide-react';

export default function BookList({ books }) {
  return (
    <section className="w-full my-8">
      {/* Section Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-amber-200/80">
        <div>
          <h2 className="font-serif-heading text-2xl font-extrabold text-stone-900 flex items-center gap-2.5">
            <BookOpen className="w-6 h-6 text-amber-800" />
            <span>Katalog Koleksi Buku</span>
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Daftar literatur digital yang tersedia di LibraryHub
          </p>
        </div>

        <span className="text-xs font-bold px-3.5 py-1.5 bg-amber-100/80 text-amber-900 rounded-full border border-amber-300/80 self-start sm:self-auto">
          {books.length} Judul Buku
        </span>
      </div>

      {/* List Rendering dengan .map() */}
      <div className="flex flex-wrap gap-6 items-stretch justify-start">
        {books.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            author={book.author}
            category={book.category}
            year={book.year}
            isAvailable={book.isAvailable}
          />
        ))}
      </div>
    </section>
  );
}
