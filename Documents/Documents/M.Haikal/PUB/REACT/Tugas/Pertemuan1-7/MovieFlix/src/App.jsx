import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import StatsSummary from './components/StatsSummary';
import SearchBar from './components/SearchBar';
import FeaturedHero from './components/FeaturedHero';
import MovieList from './components/MovieList';
import MovieModal from './components/MovieModal';
import Footer from './components/Footer';

const initialMovies = [
  {
    id: 1,
    title: "Spider-Man: No Way Home",
    genre: "Sci-Fi/Action",
    year: 2021,
    duration: "148 Menit",
    rating: 8.2,
    showing: true,
    favorite: false,
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSStv0_i8-XbqG9257HJ0ugUsFxd0ULB-U3H6PBJWTogw&s",
    description: "Identitas Spider-Man terungkap, membuat Peter meminta bantuan Doctor Strange. Mantra tersebut mengacaukan multiverse."
  },
  {
    id: 2,
    title: "Jangan Buang Ibu",
    genre: "Drama",
    year: 2024,
    duration: "105 Menit",
    rating: 8.5,
    showing: true,
    favorite: false,
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwzWIyz9ag3alVbtTPyatYDwdBTW3pjQWGW8Whadme7w&s=10",
    description: "Kisah haru pengorbanan anak dan perjuangan menjaga kehormatan serta kasih sayang seorang ibu di masa sulit."
  },
  {
    id: 3,
    title: "Agak Laen",
    genre: "Comedy/Horror",
    year: 2024,
    duration: "119 Menit",
    rating: 8.1,
    showing: false,
    favorite: true,
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNCj0-IUP9TEtIDvyjfOU5ZhdOJO__loQt2Iw-Spk8BQ&s=10",
    description: "Empat penjaga rumah hantu di pasar malam mencoba menyelamatkan bisnis mereka yang berujung pada kejadian kocak tak terduga."
  },
  {
    id: 4,
    title: "Dune: Part Two",
    genre: "Sci-Fi",
    year: 2024,
    duration: "166 Menit",
    rating: 8.6,
    showing: true,
    favorite: true,
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUiR-mNGV-rbTwIJaz2IWWz20Ehw8zFQtCqbCdSDJTYg&s=10",
    description: "Paul Atreides bersatu dengan Chani dan suku Fremen untuk membalas dendam terhadap para konspirator keluarga Atreides."
  },
  {
    id: 5,
    title: "Siksa Kubur",
    genre: "Horror",
    year: 2024,
    duration: "117 Menit",
    rating: 7.3,
    showing: false,
    favorite: false,
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_jEmaKzlovawUHothpevExc-r90t_uTDNUWkTje03CA&s=10",
    description: "Sita yang tidak percaya agama mencari orang paling berdosa untuk membuktikan bahwa siksa kubur itu tidak ada."
  },
  {
    id: 6,
    title: "Deadpool & Wolverine",
    genre: "Action/Comedy",
    year: 2024,
    duration: "127 Menit",
    rating: 8.0,
    showing: true,
    favorite: true,
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPsbboSsRXWOPfre68iIagUIALQ3fF_BKQK2vtadnBag&s=10",
    description: "Wolverine yang ragu-ragu bergabung dengan Deadpool yang eksentrik untuk mengalahkan musuh bersama."
  },
  {
    id: 7,
    title: "Inside Out 2",
    genre: "Animation",
    year: 2024,
    duration: "96 Menit",
    rating: 7.8,
    showing: true,
    favorite: false,
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsMZs2YBg3urMKZOSkraThQPBUzAraPVfyMc77km5M5w&s=10",
    description: "Riley memasuki masa remaja dan emosi baru seperti Anxiety (Kecemasan) mulai mengambil alih markas besar."
  },
  {
    id: 8,
    title: "Godzilla x Kong: The New Empire",
    genre: "Sci-Fi/Action",
    year: 2024,
    duration: "115 Menit",
    rating: 6.7,
    showing: false,
    favorite: false,
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOYLDdbqXvt4rvLa4S3dVO9i9qo0sEuIfu4XwEurAuTw&s=10",
    description: "Dua titan legendaris, Godzilla dan Kong, harus bersatu melawan ancaman raksasa yang tersembunyi di dalam bumi."
  },
  {
    id: 9,
    title: "Exhuma",
    genre: "Horror/Mystery",
    year: 2024,
    duration: "134 Menit",
    rating: 7.5,
    showing: false,
    favorite: true,
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1EaNX9kk0L7mZHnlG_iE8gHKW0DvvZGLPvWfT-8m8jQ&s=10",
    description: "Proses penggalian makam kuno keluarga kaya memicu terlepasnya kekuatan gaib yang sangat mengerikan."
  },
  {
    id: 10,
    title: "Oppenheimer",
    genre: "Biography/Drama",
    year: 2023,
    duration: "180 Menit",
    rating: 8.9,
    showing: false,
    favorite: true,
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3lWRKjW1jsqFSooRlS_jGaAQTv3JIp7KS0jf-UAsxVA&s=10",
    description: "Kisah fisikawan J. Robert Oppenheimer dan perannya dalam pengembangan bom atom selama Proyek Manhattan."
  },
  {
    id: 11,
    title: "Interstellar",
    genre: "Sci-Fi",
    year: 2014,
    duration: "169 Menit",
    rating: 8.7,
    showing: true,
    favorite: false,
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_IcWGBZGDvlX39868oe-HG0eDAyzFjF3Yvt7BHvQtfw&s=10",
    description: "Tim penjelajah menjelajahi wormhole di luar angkasa dalam upaya memastikan kelangsungan hidup umat manusia."
  },
  {
    id: 12,
    title: "Kung Fu Panda 4",
    genre: "Animation",
    year: 2024,
    duration: "94 Menit",
    rating: 6.7,
    showing: true,
    favorite: false,
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1wffPUma7cfzHgeE0RRY2r8lFE1WKRf6MZDvEIcervQ&s=10",
    description: "Po bersiap menjadi Pemimpin Spiritual Lembah Kedamaian dan mencari pengganti Ksatria Naga yang baru."
  },
  {
    id: 13,
    title: "Badarawuhi di Desa Penari",
    genre: "Horror",
    year: 2024,
    duration: "122 Menit",
    rating: 6.5,
    showing: false,
    favorite: false,
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN39In5xWP-6e39wamdF1S5aLpC14Onkkn6tIOAZ9lkA&s=10",
    description: "Misteri awal mula teror entitas mistis Badarawuhi di sebuah desa terpencil yang misterius."
  },
  {
    id: 14,
    title: "Kingdom of the Planet of the Apes",
    genre: "Sci-Fi/Action",
    year: 2024,
    duration: "145 Menit",
    rating: 7.1,
    showing: true,
    favorite: false,
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-Oc0GZ0J5FFvvMkIGAvCbeGCtBixXLYsJoLo7s12buw&s=10",
    description: "Seekor kera muda memulai perjalanan yang membuatnya mempertanyakan semua yang telah dia pelajari tentang masa lalu."
  },
  {
    id: 15,
    title: "The Batman",
    genre: "Action/Crime",
    year: 2022,
    duration: "176 Menit",
    rating: 7.8,
    showing: false,
    favorite: false,
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQqhZEJvqXiArCqCv71bsLnc6bTsjmnuvPq-u3qS51Xw&s=10",
    description: "Saat seorang pembunuh berantai misterius menargetkan para elit Gotham, Batman mengungkap korupsi tersembunyi."
  },
  {
    id: 16,
    title: "Avengers: Endgame",
    genre: "Action/Sci-Fi",
    year: 2019,
    duration: "181 Menit",
    rating: 8.4,
    showing: false,
    favorite: true,
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBHuijcDqq1e-2kRx2RbZqHAItrnpksbsA7eK8rTdoow&s=10",
    description: "Para pahlawan super yang tersisa berkumpul kembali untuk mengembalikan kehancuran yang disebabkan oleh Thanos."
  },
  {
    id: 17,
    title: "Pengabdi Setan 2: Communion",
    genre: "Horror",
    year: 2022,
    duration: "119 Menit",
    rating: 7.0,
    showing: false,
    favorite: false,
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHpCHbDEz6dFVDIuafCzeEww_qpkbjVnrIMtZvvDYiQw&s=10",
    description: "Beberapa tahun setelah kejadian mengerikan, Rini dan keluarganya kini tinggal di rumah susun yang penuh rahasia."
  },
  {
    id: 18,
    title: "Venom: The Last Dance",
    genre: "Action/Sci-Fi",
    year: 2024,
    duration: "109 Menit",
    rating: 7.2,
    showing: true,
    favorite: false,
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbZctt4BCyDUspU3G9BwpiPB47ps_ixsD5ef9WvLPWHg&s=10",
    description: "Eddie dan Venom melarikan diri dari buruan dua dunia saat keputusan tragis harus diambil dalam pertarungan terakhir."
  },
  {
    id: 19,
    title: "Moana 2",
    genre: "Animation",
    year: 2024,
    duration: "100 Menit",
    rating: 7.6,
    showing: true,
    favorite: true,
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgQ_wcTAJAAKSzYznyyU4Ix6arnFyVaAXqkPv5EjqGZA&s=10",
    description: "Moana menerima panggilan tak terduga dari leluhurnya untuk berlayar ke lautan jauh Oceania bersama Maui."
  },
  {
    id: 20,
    title: "Gladiator II",
    genre: "Action/Drama",
    year: 2024,
    duration: "148 Menit",
    rating: 8.3,
    showing: true,
    favorite: true,
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS51LdVez5SDLfU-1NdQiYmFV2edBwI06Pv_G2SYpA5_5QbNSgQTI9zZDy-rM9lzEdAhMJ8sa3Tc4niTCXlI2gCWinHKxYp5GEH8qC7kO20yQ&s=10",
    description: "Bertahun-tahun setelah kematian Maximus, Lucius harus memasuki Colosseum untuk mengembalikan kehancuran Roma."
  }
];

export default function App() {
  const [movies, setMovies] = useState(initialMovies);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Semua');
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [sortBy, setSortBy] = useState('default');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleToggleFavorite = (id) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id ? { ...movie, favorite: !movie.favorite } : movie
      )
    );

    if (selectedMovie && selectedMovie.id === id) {
      setSelectedMovie((prev) => (prev ? { ...prev, favorite: !prev.favorite } : null));
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'all') {
      setStatusFilter('Semua');
    } else if (tab === 'showing') {
      setStatusFilter('showing');
    } else if (tab === 'favorite') {
      setStatusFilter('favorite');
    }
  };

  const genres = useMemo(() => {
    const set = new Set(movies.map((m) => m.genre));
    return Array.from(set).sort();
  }, [movies]);

  const filteredMovies = useMemo(() => {
    let result = movies.filter((movie) => {
      const matchesSearch = movie.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase().trim());

      const matchesGenre =
        selectedGenre === 'Semua' || movie.genre === selectedGenre;

      let matchesStatus = true;
      if (statusFilter === 'showing') {
        matchesStatus = movie.showing === true;
      } else if (statusFilter === 'not_showing') {
        matchesStatus = movie.showing === false;
      } else if (statusFilter === 'favorite') {
        matchesStatus = movie.favorite === true;
      }

      return matchesSearch && matchesGenre && matchesStatus;
    });

    if (sortBy === 'rating_desc') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'year_desc') {
      result = [...result].sort((a, b) => b.year - a.year);
    } else if (sortBy === 'title_asc') {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [movies, searchTerm, selectedGenre, statusFilter, sortBy]);

  const totalMovies = movies.length;
  const showingCount = movies.filter((m) => m.showing).length;
  const favoriteCount = movies.filter((m) => m.favorite).length;
  const avgRating = totalMovies > 0
    ? (movies.reduce((acc, m) => acc + m.rating, 0) / totalMovies).toFixed(1)
    : 0;

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedGenre('Semua');
    setStatusFilter('Semua');
    setSortBy('default');
    setActiveTab('all');
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-ambient-dark text-slate-100' 
        : 'bg-ambient-light text-slate-900'
    }`}>
      <Header 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
      />

      <main className="flex-grow">
        {!searchTerm && selectedGenre === 'Semua' && statusFilter === 'Semua' && (
          <FeaturedHero
            featuredMovies={movies}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        <StatsSummary
          totalMovies={totalMovies}
          showingCount={showingCount}
          favoriteCount={favoriteCount}
          avgRating={avgRating}
          isDarkMode={isDarkMode}
        />

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          genres={genres}
          isDarkMode={isDarkMode}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between mt-8 mb-2">
          <h3 className={`text-lg font-extrabold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            <span className="bg-gradient-to-r from-red-500 to-rose-500 bg-clip-text text-transparent">Daftar Film Trending</span>
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
              isDarkMode ? 'bg-slate-900/90 text-slate-400 border-slate-800' : 'bg-white text-slate-600 border-slate-200 shadow-xs'
            }`}>
              {filteredMovies.length} dari {totalMovies} film
            </span>
          </h3>
        </div>

        <MovieList
          moviesData={filteredMovies}
          onToggleFavorite={handleToggleFavorite}
          onResetFilters={handleResetFilters}
          onSelectMovie={setSelectedMovie}
          isDarkMode={isDarkMode}
        />
      </main>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}
