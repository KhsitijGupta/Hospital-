import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Mail, Phone, MessageSquare, Check, Sparkles, Shield, Clock } from 'lucide-react';
import api from '../utils/api';
import '../styles/appointment.css';

export default function Appointment() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    comments: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.post('/appointments', formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        comments: ''
      });
    } catch (err) {
      console.error('Error booking appointment:', err);
      setError(err.response?.data?.message || 'Failed to submit appointment request. Please check your data.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="appointment-page-wrapper flex-center" style={{ padding: '40px 24px' }}>
        <motion.div 
          className="appointment-success-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="success-icon-wrapper">
            <Check size={40} />
          </div>
          <h1>Successfully Appointed!</h1>
          <p>Thank you for registering. Your appointment request was received. Our reception desk will contact you shortly to confirm your consultation slot.</p>
          <Link to="/" className="btn-primary" style={{ display: 'inline-block' }}>
            Go to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="appointment-page-wrapper">
      {/* Banner */}
      <div className="subpage-banner">
        <div className="container">
          <div className="breadcrumbs">
            <Link to="/">Home</Link> / Appointment Form
          </div>
          <h1>Schedule a Consultation</h1>
          <div className="quick-actions">
            <Link to="/doctors" className="action-btn">Find a Doctor</Link>
          </div>
        </div>
      </div>

      <div className="container appointment-grid">
        {/* Left Column: Form */}
        <motion.div 
          className="appointment-form-wrapper"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Book an Appointment</h2>
          <p>Fill out the form below and specify your preferred date. We will arrange a slot for you with the respective specialist.</p>

          {error && (
            <div className="error-container" style={{ margin: '0 0 24px 0', padding: '16px' }}>
              <p style={{ color: 'var(--error)', margin: 0 }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Patient Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={16} color="var(--text-light)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="John Doe" 
                  value={formData.name}
                  onChange={handleChange}
                  style={{ paddingLeft: '42px' }}
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="var(--text-light)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="john.doe@example.com" 
                  value={formData.email}
                  onChange={handleChange}
                  style={{ paddingLeft: '42px' }}
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone / Mobile Number</label>
              <div style={{ position: 'relative' }}>
                <Phone size={16} color="var(--text-light)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  placeholder="10-digit mobile number" 
                  pattern="[0-9]{10}"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{ paddingLeft: '42px' }}
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="date">Preferred Appointment Date</label>
              <div style={{ position: 'relative' }}>
                <Calendar size={16} color="var(--text-light)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="date" 
                  id="date" 
                  name="date" 
                  value={formData.date}
                  onChange={handleChange}
                  style={{ paddingLeft: '42px' }}
                  min={new Date().toISOString().split('T')[0]} // Block past dates
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="comments">Additional Comments / Health Description</label>
              <div style={{ position: 'relative' }}>
                <MessageSquare size={16} color="var(--text-light)" style={{ position: 'absolute', left: '14px', top: '20px' }} />
                <textarea 
                  id="comments" 
                  name="comments" 
                  rows="4" 
                  placeholder="Mention any symptoms or previous medical history..."
                  value={formData.comments}
                  onChange={handleChange}
                  style={{ paddingLeft: '42px' }}
                ></textarea>
              </div>
            </div>

            <button 
              type="submit" 
              className="form-submit-btn"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Submit Appointment Request'}
            </button>
          </form>
        </motion.div>

        {/* Right Column: Perks */}
        <motion.div 
          className="appointment-perks-sidebar"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="perk-item">
            <div className="perk-icon-box"><Sparkles size={20} /></div>
            <div className="perk-text">
              <h3>Qualified Doctors Only</h3>
              <p>Consult with highly experienced super-specialty physicians who are leaders in their respective clinical fields.</p>
            </div>
          </div>

          <div className="perk-item">
            <div className="perk-icon-box"><Shield size={20} /></div>
            <div className="perk-text">
              <h3>Secure Data Handling</h3>
              <p>Your medical history, reports, and contact info are completely protected under our strict patient confidentiality protocol.</p>
            </div>
          </div>

          <div className="perk-item">
            <div className="perk-icon-box"><Clock size={20} /></div>
            <div className="perk-text">
              <h3>Fast & Direct Approvals</h3>
              <p>Skip the queues. Your digital requests are prioritised directly by the reception desk for instant scheduling.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
