import React, { useState } from 'react';
import Header from './components/Header';
import MovieList from './components/MovieList';

function App() {
  const [movies] = useState([
    {
      id: 1,
      judul: "Bila Esok Ibu Telah Tiada",
      genre: "Drama / Keluarga",
      tahun: 2024,
      rating: 8.9,
      statusTayang: true,
      durasi: "1j 44m",
      batasanUmur: "13+",
      poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvzI_h0s34dBziTKf7_ab0EC4xke5Rt0jujxDAsHSa8xHYQeS6J0ZpYTAO95AQaECpRaruRcZ0GwIjmYSf1FFS94s_TmlxZYgOElUtqZeW&s=10"
    },
    {
      id: 2,
      judul: "Tunggu Aku Sukses Nanti",
      genre: "Drama / Inspirasi",
      tahun: 2025,
      rating: 8.7,
      statusTayang: false,
      durasi: "1j 50m",
      batasanUmur: "SU",
      poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRURzUJG6o6p7ND5zH78_29Xy8MPYczuJyi4Wc2XhZVVg&s=10"
    },
    {
      id: 3,
      judul: "Kang Mak from Pee Mak",
      genre: "Komedi / Horor",
      tahun: 2024,
      rating: 8.4,
      statusTayang: true,
      durasi: "2j 02m",
      batasanUmur: "13+",
      poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG6x8w2MmKyY1kFNc66YH4wQNIzwGfcqfVAzLo4F8E5g&s=10"
    },
    {
      id: 4,
      judul: "Home Sweet Loan",
      genre: "Drama / Slice of Life",
      tahun: 2024,
      rating: 8.6,
      statusTayang: true,
      durasi: "1j 52m",
      batasanUmur: "13+",
      poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3eP2MYmi477kbewvWKrCrUDAkpvJ1eWvG5-V0ty_8Bg&s=10"
    },
    {
      id: 5,
      judul: "Lembayung",
      genre: "Horor / Thriller",
      tahun: 2024,
      rating: 8.0,
      statusTayang: true,
      durasi: "2j 03m",
      batasanUmur: "17+",
      poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHK9FTVjVZaYBJ40pm9WjxK3AvNBNsJx-iiLFe_X1xQQ&s=10"
    },
    {
      id: 6,
      judul: "Perewangan",
      genre: "Horor / Mistik",
      tahun: 2024,
      rating: 7.8,
      statusTayang: true,
      durasi: "1j 48m",
      batasanUmur: "17+",
      poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ1dm11D-y9cnNarA5-x8I4j1QvGPP3ht4fER1if7hbA&s=10"
    },
    {
      id: 7,
      judul: "Petaka Gunung Gede",
      genre: "Horor / Petualangan",
      tahun: 2025,
      rating: 8.2,
      statusTayang: false,
      durasi: "1j 55m",
      batasanUmur: "17+",
      poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_ud9P-aZax0WFgm7lLYMtQeFl-_AkVCCVGQau4ngdUQ&s=10"
    },
    {
      id: 8,
      judul: "Deadpool & Wolverine",
      genre: "Action / Komedi",
      tahun: 2024,
      rating: 8.9,
      statusTayang: true,
      durasi: "2j 08m",
      batasanUmur: "17+",
      poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYuVILipfwkW5tuiclkoNe_SCUvFfMb2dmASu8xxlfEw&s"
    },
    {
      id: 9,
      judul: "Moana 2",
      genre: "Animasi / Petualangan",
      tahun: 2024,
      rating: 8.5,
      statusTayang: true,
      durasi: "1j 40m",
      batasanUmur: "SU",
      poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgQ_wcTAJAAKSzYznyyU4Ix6arnFyVaAXqkPv5EjqGZA&s=10"
    },
    {
      id: 10,
      judul: "Gladiator II",
      genre: "Action / Drama",
      tahun: 2024,
      rating: 8.3,
      statusTayang: true,
      durasi: "2j 28m",
      batasanUmur: "17+",
      poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7db7e6PDZyY5Ae_hRtvaKUGVhTbk3qZGXeWE_7_yFXw&s=10"
    },
    {
      id: 11,
      judul: "Avatar: Fire and Ash",
      genre: "Petualangan / Sci-Fi",
      tahun: 2025,
      rating: 9.0,
      statusTayang: false,
      durasi: "3j 10m",
      batasanUmur: "13+",
      poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQBd6gUFGn9kA1ki8rNSqzAQ_jtDEBLn_nPT1H2H7Vyw&s=10"
    },
    {
      id: 12,
      judul: "Jumbo",
      genre: "Animasi / Keluarga",
      tahun: 2025,
      rating: 8.8,
      statusTayang: false,
      durasi: "1j 35m",
      batasanUmur: "SU",
      poster: "data:image/jpeg;base64,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"
    }
  ]);

  const [activeFilter, setActiveFilter] = useState('all');

  const filteredMovies = movies.filter((movie) => {
    if (activeFilter === 'showing') return movie.statusTayang === true;
    if (activeFilter === 'upcoming') return movie.statusTayang === false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      <Header
        totalMovies={movies.length}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      <div className="bg-gradient-to-r from-slate-900 via-amber-950/20 to-slate-900 border-b border-slate-800 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🏛️</span>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-amber-400">
                Cinema XXI Studio 1-5 Premiere
              </h2>
              <p className="text-xs text-slate-400">
                Pesan tiket bioskop XXI favoritmu online tanpa antre.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Sistem Tiket XXI Aktif</span>
          </div>
        </div>
      </div>

      <main className="flex-1">
        <MovieList movies={filteredMovies} />
      </main>

      <footer className="bg-slate-950 border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-cinzel text-amber-400 font-bold">CINEMA XXI - CineList App</p>
          <p>© 2026 CineList XXI.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
