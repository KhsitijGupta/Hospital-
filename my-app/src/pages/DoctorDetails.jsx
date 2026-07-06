import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Stethoscope, Award, Mail, Phone, MapPin, 
  Globe, Calendar, GraduationCap, Clock, FileText, ArrowLeft 
} from 'lucide-react';
import api from '../utils/api';
import '../styles/doctordetails.css';

export default function DoctorDetails() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/doctors/${id}`);
        setDoctor(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching doctor details:', err);
        setError('Could not retrieve doctor profile details. Please verify the link or try again.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDoctorDetails();
    }
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="loading-container" style={{ minHeight: '60vh' }}>
        <div className="spinner"></div>
        <p>Loading doctor profile...</p>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="container" style={{ padding: '80px 0' }}>
        <div className="error-container">
          <h3>Failed to Load Profile</h3>
          <p>{error || 'Doctor details could not be found.'}</p>
          <div style={{ marginTop: '20px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <Link to="/doctors" className="btn-primary flex-center" style={{ gap: '8px' }}>
              <ArrowLeft size={16} /> Back to Directory
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const imageUrl = doctor.image || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1528&auto=format&fit=crop';

  return (
    <div className="doc-details-wrapper">
      <div className="container">
        
        {/* Back Link */}
        <Link to="/doctors" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: 'var(--text-secondary)',
          fontWeight: '600',
          marginBottom: '24px'
        }}>
          <ArrowLeft size={18} /> Back to Directory
        </Link>

        {/* Profile Card */}
        <motion.div 
          className="profile-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header Grid */}
          <div className="profile-header-grid">
            <div className="profile-image-container">
              <img 
                src={imageUrl} 
                alt={doctor.doctors_name} 
                className="profile-image"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1528&auto=format&fit=crop';
                }}
              />
            </div>
            
            <div className="profile-header-info">
              <span className="profile-specialty-badge">{doctor.specialization}</span>
              <h1 className="profile-name">{doctor.doctors_name}</h1>
              
              <div className="profile-quick-stats">
                <div className="profile-stat-box">
                  <div className="profile-stat-val">{doctor.years_of_experience}+</div>
                  <div className="profile-stat-lbl">Years Experience</div>
                </div>
                <div className="profile-stat-box">
                  <div className="profile-stat-val">{doctor.gender === 'M' || doctor.gender === 'Male' ? 'Male' : 'Female'}</div>
                  <div className="profile-stat-lbl">Gender</div>
                </div>
                <div className="profile-stat-box">
                  <div className="profile-stat-val">Active</div>
                  <div className="profile-stat-lbl">Status</div>
                </div>
              </div>

              {doctor.bio && (
                <div className="profile-bio">
                  <p>{doctor.bio}</p>
                </div>
              )}
            </div>
          </div>

          {/* Details Grid */}
          <div className="profile-details-grid">
            
            {/* Left Details Column */}
            <div>
              {/* Certification details */}
              <h3 className="details-section-title">Certification Details</h3>
              <div className="info-list">
                <div className="info-item">
                  <div className="info-icon"><Award size={18} /></div>
                  <div className="info-content-text">
                    <h4>Position & Institution</h4>
                    <p>{doctor.position || 'Specialist'} at {doctor.institution || 'NHC Hospital'}</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon"><FileText size={18} /></div>
                  <div className="info-content-text">
                    <h4>Certification Name</h4>
                    <p>{doctor.certification_name || 'Medical Registration'}</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon"><Calendar size={18} /></div>
                  <div className="info-content-text">
                    <h4>Date Awarded</h4>
                    <p>{formatDate(doctor.date_awarded)} (Expires: {formatDate(doctor.expiration_date)})</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon"><Clock size={18} /></div>
                  <div className="info-content-text">
                    <h4>Tenure</h4>
                    <p>Start Date: {formatDate(doctor.start_date)} {doctor.end_date ? `to ${doctor.end_date}` : '(Present)'}</p>
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              <h3 className="details-section-title">Personal & Professional Info</h3>
              <div className="info-list">
                <div className="info-item">
                  <div className="info-icon"><GraduationCap size={18} /></div>
                  <div className="info-content-text">
                    <h4>Education</h4>
                    <p>{doctor.education || doctor.qualifications}</p>
                  </div>
                </div>
                {doctor.hospital_affiliations && (
                  <div className="info-item">
                    <div className="info-icon"><Award size={18} /></div>
                    <div className="info-content-text">
                      <h4>Hospital Affiliations</h4>
                      <p>{doctor.hospital_affiliations}</p>
                    </div>
                  </div>
                )}
                {doctor.languages_spoken && (
                  <div className="info-item">
                    <div className="info-icon"><Globe size={18} /></div>
                    <div className="info-content-text">
                      <h4>Languages Spoken</h4>
                      <p>{doctor.languages_spoken}</p>
                    </div>
                  </div>
                )}
                {doctor.description && (
                  <div className="info-item">
                    <div className="info-icon"><FileText size={18} /></div>
                    <div className="info-content-text">
                      <h4>Professional Description</h4>
                      <p>{doctor.description}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Booking Column */}
            <div>
              <div className="booking-sidebar-card">
                <h3>Need to Consult?</h3>
                <p>Book a physical consultation or online video checkup directly with {doctor.doctors_name}.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <Link to="/appointment" className="btn-primary flex-center" style={{ gap: '8px', padding: '12px' }}>
                    <Calendar size={18} /> Book Appointment
                  </Link>
                </div>

                <div style={{ marginTop: '30px', borderTop: '1px solid rgba(15, 118, 110, 0.1)', paddingTop: '20px', textAlign: 'left' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '12px', color: 'var(--text-primary)' }}>Contact Info</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <Phone size={14} color="var(--primary)" /> <span>{doctor.contact_number}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <Mail size={14} color="var(--primary)" /> <span>{doctor.email}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <MapPin size={14} color="var(--primary)" style={{ flexShrink: 0 }} /> 
                      <span>{doctor.address}, {doctor.city}, {doctor.state}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
