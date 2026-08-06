import React from 'react';
import JobCard from './JobCard';
import { Filter, Briefcase, Frown } from 'lucide-react';

export default function JobList({ jobs, selectedCategory, setSelectedCategory, onSelectJob }) {
  const categories = ['Semua Kategori', 'Tech', 'Design', 'Product', 'Data'];

  return (
    <section className="job-list-section" id="jobs">
      <div className="job-list-container">
        {/* Section Header & Filters */}
        <div className="section-header">
          <div>
            <div className="section-tag">
              <Briefcase size={14} />
              <span>Lowongan Terkini</span>
            </div>
            <h2 className="section-title">Daftar Lowongan Kerja</h2>
            <p className="section-subtitle">
              Pilihan pekerjaan terbaik dengan remunerasi kompetitif di Indonesia
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="category-tabs">
            <Filter size={16} className="filter-icon" />
            {categories.map((cat) => (
              <button
                key={cat}
                className={`tab-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="results-info">
          <span>Menampilkan <strong>{jobs.length}</strong> lowongan pekerjaan</span>
        </div>

        {/* Job Cards Grid or Empty State */}
        {jobs.length > 0 ? (
          <div className="job-cards-grid">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} onSelectJob={onSelectJob} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Frown size={48} className="empty-icon" />
            <h3>Tidak Ada Lowongan Ditemukan</h3>
            <p>Coba ubah kata kunci pencarian atau kategori filter kamu.</p>
          </div>
        )}
      </div>
    </section>
  );
}
