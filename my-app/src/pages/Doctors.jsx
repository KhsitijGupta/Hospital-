import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar, Star } from 'lucide-react';
import api from '../utils/api';
import DoctorCard from '../components/DoctorCard';
import '../styles/doctors.css';

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [specialties, setSpecialties] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await api.get('/doctors');
        setDoctors(response.data);
        setFilteredDoctors(response.data);
        
        // Extract unique specialties
        const specs = ['All', ...new Set(response.data.map(d => d.specialization).filter(Boolean))];
        setSpecialties(specs);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching doctors:', err);
        setError('Failed to fetch doctor profiles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Filter logic
  useEffect(() => {
    let result = doctors;

    if (searchQuery) {
      result = result.filter(d => 
        d.doctors_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.specialization.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedSpecialty !== 'All') {
      result = result.filter(d => d.specialization === selectedSpecialty);
    }

    setFilteredDoctors(result);
  }, [searchQuery, selectedSpecialty, doctors]);

  return (
    <div className="doctors-page-wrapper">
      {/* Banner */}
      <div className="subpage-banner">
        <div className="container">
          <div className="breadcrumbs">
            <Link to="/">Home</Link> / Doctors
          </div>
          <h1>Our Medical Specialists</h1>
          <div className="quick-actions">
            <Link to="/appointment" className="action-btn">
              Take an Appointment
            </Link>
          </div>
        </div>
      </div>

      {/* Grid & Controls */}
      <div className="container doctors-grid-container">
        
        {/* Search & Filter Bar */}
        <div style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '40px',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'white',
          padding: '20px',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--border)'
        }}>
          {/* Search Box */}
          <div style={{
            position: 'relative',
            flexGrow: 1,
            maxWidth: '400px',
            minWidth: '250px'
          }}>
            <Search size={18} color="var(--text-light)" style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)'
            }} />
            <input 
              type="text" 
              placeholder="Search doctor name or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px 12px 42px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                outline: 'none',
                fontSize: '0.95rem',
                backgroundColor: 'var(--background)'
              }}
            />
          </div>

          {/* Specialty Dropdown */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Filter size={18} color="var(--primary)" />
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              style={{
                padding: '12px 24px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                outline: 'none',
                fontSize: '0.95rem',
                backgroundColor: 'white',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              {specialties.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Doctor Grid Rendering */}
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading medical directory...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <h3>Something Went Wrong</h3>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="btn-primary" 
              style={{ border: 'none', marginTop: '16px', cursor: 'pointer' }}
            >
              Retry Connection
            </button>
          </div>
        ) : filteredDoctors.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <h3>No Doctors Found</h3>
            <p>We couldn't find any specialists matching your query.</p>
          </div>
        ) : (
          <motion.div 
            className="doctors-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredDoctors.map(doctor => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))}
          </motion.div>
        )}
      </div>

      {/* Reviews Bottom Panel */}
      <section style={{ backgroundColor: 'white', padding: '80px 0' }}>
        <div className="container">
          <div className="section-header">
            <h2>Patient Experiences</h2>
            <p>We provide continuous medical excellence for all our patients.</p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            marginTop: '40px'
          }}>
            <div style={{ background: 'var(--background)', padding: '30px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="var(--accent)" stroke="none" />)}
              </div>
              <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '16px' }}>
                "Very effective service from the doctors and staff. Doctors are patient, address our concerns, and give all needed precautions. I recommend all to select this hospital."
              </p>
              <h5 style={{ fontWeight: '700' }}>Vijay R.</h5>
            </div>
            <div style={{ background: 'var(--background)', padding: '30px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="var(--accent)" stroke="none" />)}
              </div>
              <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '16px' }}>
                "Very good hospital. Easy to get appointment. Less crowd, more care and fast testing and perfect diagnosis. Complete consultation, testing, and reports are handled smoothly."
              </p>
              <h5 style={{ fontWeight: '700' }}>Nisha D.</h5>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
