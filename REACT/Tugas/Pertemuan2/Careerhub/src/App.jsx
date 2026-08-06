import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import JobList from './components/JobList';
import Footer from './components/Footer';
import JobDetailModal from './components/JobDetailModal';
import { JOBS_DATA } from './data/jobs';
import './App.css';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');
  const [selectedJobModal, setSelectedJobModal] = useState(null);

  // Filter jobs based on search term, location, and category
  const filteredJobs = useMemo(() => {
    return JOBS_DATA.filter((job) => {
      const matchSearch =
        searchTerm === '' ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchLocation =
        locationFilter === '' ||
        job.location.toLowerCase().includes(locationFilter.toLowerCase());

      const matchCategory =
        selectedCategory === 'Semua Kategori' ||
        job.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchSearch && matchLocation && matchCategory;
    });
  }, [searchTerm, locationFilter, selectedCategory]);

  return (
    <div className="app-wrapper">
      {/* 1. Header Component */}
      <Header />

      {/* Main Content Area */}
      <main className="main-content">
        {/* 2. Hero Component */}
        <Hero
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
        />

        {/* 3. JobList & 4. JobCard Components */}
        <JobList
          jobs={filteredJobs}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onSelectJob={(job) => setSelectedJobModal(job)}
        />
      </main>

      {/* 5. Footer Component */}
      <Footer />

      {/* Modal for Job Detail */}
      {selectedJobModal && (
        <JobDetailModal
          job={selectedJobModal}
          onClose={() => setSelectedJobModal(null)}
        />
      )}
    </div>
  );
}
