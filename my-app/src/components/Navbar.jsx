import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Phone, Clock, Menu, X, HeartPulse } from 'lucide-react';
import '../styles/navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        isScrolled || setIsScrolled(true);
      } else {
        !isScrolled || setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header className="navbar-wrapper">
      {/* Top Utility Bar */}
      <div className="top-bar">
        <div className="container top-bar-content">
          <div className="top-bar-info">
            <div className="top-bar-item">
              <Phone size={14} />
              <span>Emergency: +91 1234567890</span>
            </div>
            <div className="top-bar-item">
              <Clock size={14} />
              <span>24/7 Care & Support</span>
            </div>
          </div>
          <div className="marquee-container">
            <marquee scrollamount="4">
              ✨ NHC Hospital Bhopal: World class infrastructure meets the best doctors. Book your health package today!
            </marquee>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`main-navbar glass ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <Link to="/" className="logo-link">
            <HeartPulse size={32} color="var(--primary)" />
            <span className="logo-text">NHC Hospital</span>
          </Link>

          <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
            <li>
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about_us" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/services" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/doctors" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Doctors
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact_us" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Contact Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/appointment" className="nav-appointment-btn">
                Book Appointment
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
