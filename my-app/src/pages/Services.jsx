import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Ambulance, Pill, Scissors, Bone, HeartPulse, 
  FlaskConical, Apple, Brain, Activity, Eye, Syringe, Heart 
} from 'lucide-react';
import '../styles/services.css';

export default function Services() {
  const servicesList = [
    { 
      icon: <Ambulance size={28} />, 
      title: 'Emergency Services', 
      desc: 'Round-the-clock emergency care and trauma center with dedicated ambulances.' 
    },
    { 
      icon: <Pill size={28} />, 
      title: 'General Medicine', 
      desc: 'Comprehensive outpatient and inpatient care for chronic and acute illnesses.' 
    },
    { 
      icon: <Scissors size={28} />, 
      title: 'General Surgery', 
      desc: 'Advanced surgical care including laparoscopic and minimally invasive procedures.' 
    },
    { 
      icon: <Bone size={28} />, 
      title: 'Orthopaedics', 
      desc: 'Expert care for bones, joints, ligaments, tendons, and muscles.' 
    },
    { 
      icon: <Activity size={28} />, 
      title: 'Dental Care', 
      desc: 'Preventive, cosmetic, and reconstructive dental procedures.' 
    },
    { 
      icon: <HeartPulse size={28} />, 
      title: 'Cardiology', 
      desc: 'State-of-the-art diagnostic and interventional cardiac treatments.' 
    },
    { 
      icon: <FlaskConical size={28} />, 
      title: 'Pathology Lab', 
      desc: 'Accurate and rapid laboratory diagnostic testing and blood services.' 
    },
    { 
      icon: <Apple size={28} />, 
      title: 'Dietetics & Nutrition', 
      desc: 'Customized clinical nutrition plans and dietary counselling.' 
    },
    { 
      icon: <Brain size={28} />, 
      title: 'Neuro Surgery', 
      desc: 'Advanced surgical treatment for neurological and spine disorders.' 
    },
    { 
      icon: <Activity size={28} />, 
      title: 'Fitness & Wellness', 
      desc: 'Physiological rehabilitation programs and preventative health packages.' 
    },
    { 
      icon: <Eye size={28} />, 
      title: 'Ophthalmology', 
      desc: 'Comprehensive eye examinations, laser procedures, and cataract surgery.' 
    },
    { 
      icon: <Syringe size={28} />, 
      title: 'Critical Care', 
      desc: 'ICU support and anaesthesia services for complex medical emergencies.' 
    },
    { 
      icon: <Heart size={28} />, 
      title: 'Physiotherapy', 
      desc: 'Advanced physical therapy and sports injury recovery programs.' 
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="services-page-wrapper">
      {/* Banner */}
      <div className="subpage-banner">
        <div className="container">
          <div className="breadcrumbs">
            <Link to="/">Home</Link> / Services
          </div>
          <h1>Patient Supports & Services</h1>
          <div className="quick-actions">
            <Link to="/doctors" className="action-btn">Find a Doctor</Link>
            <Link to="/appointment" className="action-btn">Take an Appointment</Link>
          </div>
        </div>
      </div>

      {/* Intro Text */}
      <section className="services-intro-section container">
        <div className="services-intro-card">
          <p className="services-intro-text">
            NHC Hospital's Emergency and Trauma wing is available round the clock to tackle any emergency situation. Well-equipped with the latest medical infrastructure and top-class specialists from different branches of medicine, we ensure prompt and world-class care when every second counts.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container services-grid-container">
        <motion.div 
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {servicesList.map((service, index) => (
            <motion.div 
              key={index} 
              className="service-item-card"
              variants={cardVariants}
            >
              <div className="service-icon-wrapper">
                {service.icon}
              </div>
              <h3 className="service-item-title">{service.title}</h3>
              <p className="service-item-desc">{service.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
