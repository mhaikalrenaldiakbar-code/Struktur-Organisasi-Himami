import React from 'react';
import { Briefcase, Heart, Globe, Share2, MessageSquare, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-container">
          {/* Brand Info */}
          <div className="footer-brand">
            <div className="brand-wrapper">
              <div className="logo-badge white">
                <Briefcase className="logo-icon text-emerald" size={22} />
              </div>
              <span className="brand-name white">CareerHub</span>
            </div>
            <p className="footer-desc">
              Platform pencarian lowongan kerja modern yang menjembatani talenta terbaik Indonesia dengan perusahaan impian.
            </p>
            <div className="social-links">
              <a href="#website" className="social-icon" aria-label="Website"><Globe size={18} /></a>
              <a href="#share" className="social-icon" aria-label="Bagikan"><Share2 size={18} /></a>
              <a href="#community" className="social-icon" aria-label="Komunitas"><MessageSquare size={18} /></a>
              <a href="#contact" className="social-icon" aria-label="Kontak"><Send size={18} /></a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="footer-column">
            <h4>Pencari Kerja</h4>
            <ul>
              <li><a href="#jobs">Cari Pekerjaan</a></li>
              <li><a href="#categories">Kategori Populer</a></li>
              <li><a href="#salaries">Estimasi Gaji</a></li>
              <li><a href="#remote">Kerja Remote</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Perusahaan</h4>
            <ul>
              <li><a href="#post">Pasang Lowongan</a></li>
              <li><a href="#solutions">Solusi Rekrutmen</a></li>
              <li><a href="#pricing">Paket Harga</a></li>
              <li><a href="#partners">Mitra Kampus</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Hubungi Kami</h4>
            <p className="footer-contact">support@careerhub.id</p>
            <p className="footer-contact">+62 21 5555 7890</p>
            <p className="footer-contact">Jakarta, Indonesia</p>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p className="copyright">
            © 2026 <strong>CareerHub</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}
