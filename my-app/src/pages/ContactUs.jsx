import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, CheckCircle, Send, Globe, HeartPulse } from 'lucide-react';
import api from '../utils/api';
import '../styles/contactus.css';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: ''
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
      await api.post('/feedback', formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        description: ''
      });
      // Hide success alert after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setError(err.response?.data?.message || 'Failed to submit form. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page-wrapper">
      {/* Banner */}
      <div className="subpage-banner">
        <div className="container">
          <div className="breadcrumbs">
            <Link to="/">Home</Link> / Contact Us
          </div>
          <h1>Contact Our Medical Center</h1>
          <div className="quick-actions">
            <Link to="/doctors" className="action-btn">Find a Doctor</Link>
            <Link to="/appointment" className="action-btn">Take an Appointment</Link>
          </div>
        </div>
      </div>

      <div className="container contact-section-grid">
        {/* Left Column: Form */}
        <motion.div 
          className="contact-form-card"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Help us know your Feedback</h2>
          <p>We value your opinion. Send us your feedback, inquiries, or suggestions to help us improve our services.</p>

          {success && (
            <div className="alert-success">
              <CheckCircle size={20} />
              <span>Thank you! Your feedback has been submitted successfully.</span>
            </div>
          )}

          {error && (
            <div className="error-container" style={{ margin: '0 0 24px 0', padding: '16px' }}>
              <p style={{ color: 'var(--error)', margin: 0 }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                placeholder="Enter your full name" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">E-mail Address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="name@example.com" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Mobile / Phone Number</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                placeholder="10-digit mobile number" 
                pattern="[0-9]{10}"
                value={formData.phone}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Feedback / Message Description</label>
              <textarea 
                id="description" 
                name="description" 
                cols="30" 
                rows="6" 
                placeholder="Write your feedback here..."
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="form-submit-btn"
              disabled={loading}
            >
              {loading ? 'Submitting...' : <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Send size={16} /> Submit Feedback</span>}
            </button>
          </form>
        </motion.div>

        {/* Right Column: Info */}
        <motion.div 
          className="contact-sidebar"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Info Card */}
          <div className="contact-info-card">
            <h3>National Health Center</h3>
            <div className="contact-info-list">
              <div className="contact-info-item">
                <MapPin size={20} />
                <div>
                  <strong>Main Address:</strong>
                  <p>SY NO 52/2 & 52/3, Devarabeesanahalli, Varthur Hobli, Bhopal, Karnataka 560103, India.</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginTop: '4px' }}>(Opposite Intel, Outer Ring Road, Marathahalli)</p>
                </div>
              </div>

              <div className="contact-info-item">
                <Phone size={20} />
                <div>
                  <strong>Phone / Mobile:</strong>
                  <p>General Helpline: +91 1234567890</p>
                  <p>Ambulance (24/7): +91 0123456789</p>
                </div>
              </div>

              <div className="contact-info-item">
                <Mail size={20} />
                <div>
                  <strong>E-mail Contacts:</strong>
                  <p>General Feedback: info@nationalhealthcenter.com</p>
                  <p>International Connect: intl.connect@nationalhealthcenter.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Google Map (Placeholder layout or standard map iframe) */}
          <div className="contact-map-card">
            <iframe 
              title="NHC Hospital Map Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9751080649713!2d77.69176337589657!3d12.934988687376678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13bc9f72782b%3A0xe6ab1db7c2cdbd97!2sDevarabisanahalli%27s%20Outer%20Ring%20Road!5e0!3m2!1sen!2sin!4v1719999999999" 
              className="contact-map-iframe" 
              allowFullScreen="" 
              loading="lazy"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
