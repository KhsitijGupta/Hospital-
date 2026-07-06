import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Award, Shield, Star, Calendar, UserCheck } from 'lucide-react';
import '../styles/home.css';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <div className="home-wrapper">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="hero-badge">Welcome to NHC Medical Center</span>
            <h1 className="hero-title">ENJOY YOUR LIFE, WE WILL CARE FOR YOU</h1>
            <p className="hero-desc">
              Your health is our priority. Experience cutting-edge medical treatments with compassionate care from central India's leading medical experts.
            </p>
            <div className="hero-ctas">
              <Link to="/appointment" className="btn-primary flex-center">
                <Calendar size={18} style={{ marginRight: '8px' }} /> Book Appointment
              </Link>
              <Link to="/doctors" className="btn-secondary flex-center">
                <UserCheck size={18} style={{ marginRight: '8px' }} /> Find Doctors
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Info Section */}
      <section className="section-padding container">
        <motion.div 
          className="info-section"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div className="info-image-wrapper" variants={itemVariants}>
            <img 
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1453&auto=format&fit=crop" 
              alt="Medical Center" 
              className="info-image"
            />
            <div className="info-tag">
              <div className="info-tag-number">10+</div>
              <div>Years of Excellence in Healthcare</div>
            </div>
          </motion.div>
          <motion.div className="info-content" variants={itemVariants}>
            <p className="info-welcome">About NHC Hospital</p>
            <h2>We Have Medicare Plan Options for You!</h2>
            <p className="info-text">
              NHC Hospital, Bhopal, is a 300-bedded Super Specialty Hospital born of a dream. A dream that the people of Bhopal and Central India get the best healthcare at affordable prices.
            </p>
            <p className="info-text">
              This conviction inspired us to build a world-class hospital in the heart of the country, where the best infrastructure meets the best doctors to deliver cutting-edge technology with care.
            </p>
            <Link to="/about_us" className="btn-primary" style={{ display: 'inline-block', marginTop: '12px' }}>
              Learn More About Us
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="container" style={{ marginBottom: '80px' }}>
        <motion.div 
          className="stats-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="stats-title">Clinical Excellence</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon"><Users size={24} /></div>
              <div className="stat-number">4.2M+</div>
              <div className="stat-label">Patients Treated Every Year</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><Award size={24} /></div>
              <div className="stat-number">19+</div>
              <div className="stat-label">State-of-the-Art Hospitals</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><Shield size={24} /></div>
              <div className="stat-number">18,000+</div>
              <div className="stat-label">Dedicated Associates & staff</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="section-padding testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>What Our Patients Say</h2>
            <p>Read inspiring stories of healing and recovery from patients who trusted NHC Hospital with their care.</p>
          </div>
          
          <motion.div 
            className="testimonials-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div className="testimonial-card" variants={itemVariants}>
              <div className="testimonial-rating">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="var(--accent)" stroke="none" style={{ display: 'inline-block', marginRight: '2px' }} />)}
              </div>
              <p className="testimonial-text">
                "The doctors and staff at NHC Hospital provided exceptional care during my bypass surgery. Their professional approach and warm nature helped me recover quickly."
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">RK</div>
                <div>
                  <div className="author-name">Rajesh Kumar</div>
                  <div className="author-title">Bhopal Resident</div>
                </div>
              </div>
            </motion.div>

            <motion.div className="testimonial-card" variants={itemVariants}>
              <div className="testimonial-rating">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="var(--accent)" stroke="none" style={{ display: 'inline-block', marginRight: '2px' }} />)}
              </div>
              <p className="testimonial-text">
                "We rushed my mother to NHC during a neurological emergency. The quick intervention of their ICU team saved her life. I cannot thank them enough."
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">PS</div>
                <div>
                  <div className="author-name">Priyanka Sharma</div>
                  <div className="author-title">IT Professional</div>
                </div>
              </div>
            </motion.div>

            <motion.div className="testimonial-card" variants={itemVariants}>
              <div className="testimonial-rating">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="var(--accent)" stroke="none" style={{ display: 'inline-block', marginRight: '2px' }} />)}
              </div>
              <p className="testimonial-text">
                "Booking appointments online was so smooth. The pediatric division is wonderful. They handled my toddler with so much patience and care."
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">AS</div>
                <div>
                  <div className="author-name">Amit Singh</div>
                  <div className="author-title">Parent</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
