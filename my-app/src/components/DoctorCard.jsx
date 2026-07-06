import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Award, Calendar } from 'lucide-react';

export default function DoctorCard({ doctor }) {
  // Fallback image if none provided
  const imageUrl = doctor.image || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1528&auto=format&fit=crop';

  return (
    <div className="doctor-card">
      <div className="doctor-card-img-wrapper">
        <img 
          src={imageUrl} 
          alt={doctor.doctors_name} 
          className="doctor-card-img"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1528&auto=format&fit=crop';
          }}
        />
        <div className="doctor-card-badge">
          {doctor.specialization}
        </div>
      </div>
      
      <div className="doctor-card-info">
        <h3 className="doctor-card-name">{doctor.doctors_name}</h3>
        {doctor.qualifications && (
          <span className="doctor-card-qualifications">
            {doctor.qualifications}
          </span>
        )}
        
        <div className="doctor-card-details">
          <div className="doctor-card-detail-item">
            <Stethoscope size={16} color="var(--primary)" />
            <span>{doctor.years_of_experience}+ Years Experience</span>
          </div>
          <div className="doctor-card-detail-item">
            <Award size={16} color="var(--primary)" />
            <span>{doctor.institution || 'NHC Medical'}</span>
          </div>
        </div>

        <div className="doctor-card-actions">
          <Link to={`/doctor/${doctor._id}`} className="btn-card-primary flex-center">
            View Full Profile
          </Link>
          <Link to="/appointment" className="btn-card-secondary" title="Book Appointment">
            <Calendar size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
