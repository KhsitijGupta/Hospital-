import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Eye, Heart, MapPin, Phone, Mail, Navigation } from 'lucide-react';
import '../styles/aboutus.css';

export default function AboutUs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="about-page-wrapper">
      {/* Banner */}
      <div className="subpage-banner">
        <div className="container">
          <div className="breadcrumbs">
            <Link to="/">Home</Link> / About Us
          </div>
          <h1>About NHC Hospital</h1>
          <div className="quick-actions">
            <Link to="/doctors" className="action-btn">Find a Doctor</Link>
            <Link to="/appointment" className="action-btn">Take an Appointment</Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="section-padding container">
        <motion.div 
          className="about-content-section"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div className="about-text-content" variants={itemVariants}>
            <h3>Welcome to NHC Hospital</h3>
            <h2>Best Medical & Healthcare Needs for Our Patients</h2>
            <p className="about-desc">
              NHC Hospital, Bhopal, is a 300-bedded Super Specialty Hospital born of a dream. A dream that the people of Bhopal and Central India get the best healthcare at affordable prices.
            </p>
            <p className="about-desc">
              A dream that the best infrastructure and technology be provided to doctors so that they can serve patients to the best of their capability. A dream that our people need not flee to metros for medical needs.
            </p>
            <p className="about-desc">
              This conviction inspired us to make a world-class hospital in the heart of the country where the best infrastructure meets the best doctors to deliver cutting-edge technology with care.
            </p>
          </motion.div>

          <motion.div className="about-image-wrapper" variants={itemVariants}>
            <img 
              src="https://images.unsplash.com/photo-1586773860418-d3b3b998ae67?q=80&w=1470&auto=format&fit=crop" 
              alt="Hospital Facility" 
              className="about-img"
            />
          </motion.div>
        </motion.div>

        {/* Mission Vision Grid */}
        <motion.div 
          className="mission-vision-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="mv-card" variants={itemVariants}>
            <div className="mv-icon"><Compass size={24} /></div>
            <h3>Our Mission</h3>
            <p>To provide high-quality, compassionate, and affordable healthcare services to the community, utilizing advanced medical technology and infrastructure.</p>
          </motion.div>

          <motion.div className="mv-card" variants={itemVariants}>
            <div className="mv-icon"><Eye size={24} /></div>
            <h3>Our Vision</h3>
            <p>To be the leading healthcare provider in central India, recognized for clinical excellence, patient-centric care, and ethical medical practices.</p>
          </motion.div>

          <motion.div className="mv-card" variants={itemVariants}>
            <div className="mv-icon"><Heart size={24} /></div>
            <h3>Our Values</h3>
            <p>Integrity, Compassion, Innovation, and Teamwork. We place our patients first, ensuring safety and respect in everything we do.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Address Section */}
      <section className="container">
        <motion.div 
          className="address-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="address-grid">
            <div className="address-info">
              <h2>Contact Directory</h2>
              <h1>National Health Center</h1>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
                Reach out to us directly or visit our medical center. We are open 24/7 to accommodate your emergency and therapeutic needs.
              </p>
            </div>
            
            <div className="address-details">
              <div className="address-item">
                <div className="address-icon"><MapPin size={20} /></div>
                <div className="address-text">
                  <h4>Bhopal Campus (Main)</h4>
                  <p>Benad, Bharatpur Raj 302020, Bhopal, India</p>
                </div>
              </div>

              <div className="address-item">
                <div className="address-icon"><Phone size={20} /></div>
                <div className="address-text">
                  <h4>Contact Numbers</h4>
                  <p>Reception: +91 0123456789</p>
                  <p>Emergency: +91 1234567890</p>
                </div>
              </div>

              <div className="address-item">
                <div className="address-icon"><Mail size={20} /></div>
                <div className="address-text">
                  <h4>E-mail & Support</h4>
                  <p>nhchospital17@gmail.com</p>
                  <p>info@nationalhealthcenter.com</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
