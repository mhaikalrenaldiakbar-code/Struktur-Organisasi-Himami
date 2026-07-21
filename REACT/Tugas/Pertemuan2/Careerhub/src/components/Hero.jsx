import React from 'react';
import { Search, MapPin, Sparkles, TrendingUp, ShieldCheck, Users } from 'lucide-react';

export default function Hero({ searchTerm, setSearchTerm, locationFilter, setLocationFilter }) {
  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Top Announcement Badge */}
        <div className="hero-badge">
          <Sparkles size={14} className="badge-sparkle" />
          <span>Platform Karir Teknologi #1 di Indonesia</span>
        </div>

        {/* Main Title & Description */}
        <h1 className="hero-title">
          Temukan Karier Impianmu di <span className="highlight">Perusahaan Terbaik</span>
        </h1>
        <p className="hero-subtitle">
          CareerHub membantu kamu menemukan berbagai lowongan pekerjaan berkualitas dari startup ternama hingga unicorn di Indonesia.
        </p>

        {/* Interactive Search Box */}
        <div className="search-box-card">
          <div className="search-input-group">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Cari posisi (contoh: Frontend, Designer, Data)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="divider-line"></div>

          <div className="search-input-group">
            <MapPin className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Lokasi (contoh: Jakarta, Remote, Bandung)..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="search-input"
            />
          </div>

          <button className="btn-search-submit">
            <span>Cari Kerja</span>
          </button>
        </div>

        {/* Live Metrics / Quick Stats */}
        <div className="hero-stats">
          <div className="stat-item">
            <TrendingUp size={18} className="stat-icon" />
            <div>
              <span className="stat-number">1.450+</span>
              <span className="stat-label">Lowongan Aktif</span>
            </div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <Users size={18} className="stat-icon" />
            <div>
              <span className="stat-number">500+</span>
              <span className="stat-label">Perusahaan Partner</span>
            </div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <ShieldCheck size={18} className="stat-icon" />
            <div>
              <span className="stat-number">98%</span>
              <span className="stat-label">Terverifikasi</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
