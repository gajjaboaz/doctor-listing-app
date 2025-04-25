import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DoctorCard from './components/DoctorCard';
import FilterPanel from './components/FilterPanel';
import BookingPage from './components/BookingPage';
import './App.css';

function App() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [consultationType, setConsultationType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');
      const data = await response.json();
      setDoctors(data);
      setFilteredDoctors(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch doctors');
      setLoading(false);
    }
  };

  // Extract all unique specialties from doctors data
  const getAllSpecialties = () => {
    const specialtiesSet = new Set();
    doctors.forEach(doctor => {
      doctor.specialities.forEach(specialty => {
        specialtiesSet.add(specialty.name);
      });
    });
    return Array.from(specialtiesSet);
  };

  // Filter and sort functions
  const filterDoctors = () => {
    let filtered = [...doctors];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(doctor => 
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialities.some(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by specialties
    if (selectedSpecialties.length > 0) {
      filtered = filtered.filter(doctor =>
        doctor.specialities.some(s => selectedSpecialties.includes(s.name))
      );
    }

    // Filter by consultation type
    if (consultationType !== 'all') {
      filtered = filtered.filter(doctor =>
        consultationType === 'video' ? doctor.video_consult : doctor.in_clinic
      );
    }

    // Sort doctors
    if (sortBy === 'price') {
      filtered.sort((a, b) => {
        const priceA = parseInt(a.fees.replace(/[^0-9]/g, ''));
        const priceB = parseInt(b.fees.replace(/[^0-9]/g, ''));
        return priceA - priceB;
      });
    } else if (sortBy === 'experience') {
      filtered.sort((a, b) => {
        const expA = parseInt(a.experience.replace(/[^0-9]/g, ''));
        const expB = parseInt(b.experience.replace(/[^0-9]/g, ''));
        return expB - expA;
      });
    }

    setFilteredDoctors(filtered);
  };

  useEffect(() => {
    filterDoctors();
  }, [doctors, selectedSpecialties, sortBy, consultationType, searchQuery]);

  const handleSpecialtyChange = (specialty) => {
    setSelectedSpecialties(prev =>
      prev.includes(specialty)
        ? prev.filter(s => s !== specialty)
        : [...prev, specialty]
    );
  };

  const handleClearFilters = () => {
    setSelectedSpecialties([]);
    setSortBy('');
    setConsultationType('all');
    setSearchQuery('');
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="app-container">
            <div className="header">
              <input
                type="text"
                className="search-input"
                placeholder="Search Symptoms, Doctors, Specialists, Clinics"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="main-content">
              <FilterPanel
                specialties={getAllSpecialties()}
                selectedSpecialties={selectedSpecialties}
                sortBy={sortBy}
                consultationType={consultationType}
                onSpecialtyChange={handleSpecialtyChange}
                onSortChange={setSortBy}
                onConsultationTypeChange={setConsultationType}
                onClearFilters={handleClearFilters}
              />

              <div className="doctor-list">
                {filteredDoctors.length === 0 ? (
                  <div className="no-results">No doctors found matching your criteria</div>
                ) : (
                  filteredDoctors.map(doctor => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                  ))
                )}
              </div>
            </div>
          </div>
        } />
        <Route path="/booking" element={<BookingPage />} />
      </Routes>
    </Router>
  );
}

export default App;