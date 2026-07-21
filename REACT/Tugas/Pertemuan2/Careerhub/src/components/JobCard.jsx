import React, { useState } from 'react';
import { MapPin, Banknote, Clock, Bookmark, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function JobCard({ job, onSelectJob }) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = (e) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  return (
    <article className={`job-card ${job.featured ? 'featured' : ''}`}>
      {job.featured && (
        <div className="featured-ribbon">
          <CheckCircle2 size={12} />
          <span>Rekomendasi</span>
        </div>
      )}

      {/* Card Header: Logo, Company & Bookmark */}
      <div className="card-header">
        <div className="company-logo" style={{ backgroundColor: job.logoBg }}>
          {job.logoText}
        </div>
        <div className="company-info">
          <h3 className="job-title">{job.title}</h3>
          <p className="company-name">{job.company}</p>
        </div>
        <button
          className={`btn-bookmark ${isBookmarked ? 'active' : ''}`}
          onClick={toggleBookmark}
          title={isBookmarked ? 'Hapus Bookmark' : 'Simpan Pekerjaan'}
        >
          <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Meta attributes: Location, Type, Salary */}
      <div className="card-meta">
        <div className="meta-item">
          <MapPin size={15} className="meta-icon" />
          <span>{job.location}</span>
        </div>
        <div className="meta-item">
          <Banknote size={15} className="meta-icon" />
          <span className="salary-text">{job.salary}</span>
        </div>
      </div>

      {/* Tech Tags */}
      <div className="card-tags">
        <span className="type-badge">{job.type}</span>
        {job.tags.slice(0, 3).map((tag, index) => (
          <span key={index} className="tech-tag">
            {tag}
          </span>
        ))}
      </div>

      {/* Card Footer: Posted time & Action Button */}
      <div className="card-footer">
        <div className="posted-time">
          <Clock size={14} />
          <span>{job.postedAt}</span>
        </div>
        <button className="btn-detail" onClick={() => onSelectJob(job)}>
          <span>Lihat Detail</span>
          <ArrowUpRight size={16} />
        </button>
      </div>
    </article>
  );
}
