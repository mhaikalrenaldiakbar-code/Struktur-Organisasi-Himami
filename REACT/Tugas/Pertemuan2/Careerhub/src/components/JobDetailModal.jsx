import React, { useState } from 'react';
import { X, MapPin, Banknote, Clock, Building2, CheckCircle, Gift, Send, Check } from 'lucide-react';

export default function JobDetailModal({ job, onClose }) {
  const [applied, setApplied] = useState(false);

  if (!job) return null;

  const handleApply = () => {
    setApplied(true);
    setTimeout(() => {
      alert(`Selamat! Lamaran Anda untuk posisi ${job.title} di ${job.company} telah berhasil dikirim.`);
      onClose();
    }, 400);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-company-wrapper">
            <div className="company-logo modal-logo" style={{ backgroundColor: job.logoBg }}>
              {job.logoText}
            </div>
            <div>
              <h2 className="modal-job-title">{job.title}</h2>
              <div className="modal-company-sub">
                <Building2 size={16} />
                <span>{job.company}</span>
                <span className="dot-separator">•</span>
                <Clock size={16} />
                <span>{job.postedAt}</span>
              </div>
            </div>
          </div>
          <button className="btn-close-modal" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Quick Info Grid */}
          <div className="modal-info-grid">
            <div className="info-box">
              <span className="info-label">Lokasi</span>
              <div className="info-val">
                <MapPin size={16} />
                <span>{job.location}</span>
              </div>
            </div>
            <div className="info-box">
              <span className="info-label">Rentang Gaji</span>
              <div className="info-val highlight-val">
                <Banknote size={16} />
                <span>{job.salary}</span>
              </div>
            </div>
            <div className="info-box">
              <span className="info-label">Tipe Pekerjaan</span>
              <div className="info-val">
                <span className="type-badge">{job.type}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="modal-section">
            <h3 className="modal-section-title">Deskripsi Pekerjaan</h3>
            <p className="modal-text">{job.description}</p>
          </div>

          {/* Requirements */}
          <div className="modal-section">
            <h3 className="modal-section-title">Syarat & Kualifikasi</h3>
            <ul className="modal-list">
              {job.requirements.map((req, index) => (
                <li key={index}>
                  <CheckCircle size={16} className="list-icon" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="modal-section">
            <h3 className="modal-section-title">Fasilitas & Benefit</h3>
            <ul className="modal-list">
              {job.benefits.map((benefit, index) => (
                <li key={index}>
                  <Gift size={16} className="list-icon gift-icon" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            Tutup
          </button>
          <button className={`btn-apply ${applied ? 'applied' : ''}`} onClick={handleApply} disabled={applied}>
            {applied ? (
              <>
                <Check size={18} />
                <span>Lamaran Terkirim</span>
              </>
            ) : (
              <>
                <Send size={18} />
                <span>Lamar Pekerjaan Ini</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
