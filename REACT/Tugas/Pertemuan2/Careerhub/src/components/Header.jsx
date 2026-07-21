import React from 'react';
import { Briefcase, Compass, Building2, BookOpen, PlusCircle } from 'lucide-react';

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-container">
        {/* Brand / Logo + Title & Slogan */}
        <div className="brand-wrapper">
          <div className="logo-badge">
            <Briefcase className="logo-icon" size={24} />
          </div>
          <div className="brand-text">
            <span className="brand-name">CareerHub</span>
            <span className="brand-slogan">Find Your Dream Job</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="header-nav">
          <a href="#jobs" className="nav-link active">
            <Compass size={16} />
            <span>Cari Lowongan</span>
          </a>
          <a href="#companies" className="nav-link">
            <Building2 size={16} />
            <span>Perusahaan Partner</span>
          </a>
          <a href="#resources" className="nav-link">
            <BookOpen size={16} />
            <span>Tips Karir</span>
          </a>
        </nav>

        {/* Actions */}
        <div className="header-actions">
          <button className="btn-post-job">
            <PlusCircle size={18} />
            <span>Pasang Lowongan</span>
          </button>
        </div>
      </div>
    </header>
  );
}
