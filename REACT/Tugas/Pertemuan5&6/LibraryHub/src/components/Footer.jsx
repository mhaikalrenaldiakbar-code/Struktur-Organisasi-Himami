import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#faf7f2] border-t border-amber-200/80 mt-12 py-6 text-stone-500 text-xs text-center">
      <div className="max-w-7xl mx-auto px-4">
        <p>&copy; {currentYear} <strong>LibraryHub</strong>. Aplikasi Perpustakaan Digital React & Tailwind CSS.</p>
      </div>
    </footer>
  );
}
