import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, MapPin, Phone, Mail, ArrowUp } from 'lucide-react';
import '../styles/footer.css';

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer-wrapper">
      <div className="container">
        <div className="footer-top">
          {/* Brand Info */}
          <div className="footer-brand">
            <Link to="/" className="footer-brand-logo">
              <HeartPulse size={28} color="var(--primary-light)" />
              <span>NHC Hospital</span>
            </Link>
            <p className="footer-brand-desc">
              National Health Center Bhopal is born of a dream to provide Bhopal and Central India the best super specialty healthcare at affordable prices.
            </p>
            <div className="footer-socials">
              <a href="#" className="social-link"><FacebookIcon /></a>
              <a href="#" className="social-link"><TwitterIcon /></a>
              <a href="#" className="social-link"><LinkedinIcon /></a>
              <a href="#" className="social-link"><InstagramIcon /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/about_us" className="footer-link">About Us</Link></li>
              <li><Link to="/services" className="footer-link">Services</Link></li>
              <li><Link to="/doctors" className="footer-link">Our Doctors</Link></li>
              <li><Link to="/contact_us" className="footer-link">Contact Us</Link></li>
            </ul>
          </div>

          {/* Our Services */}
          <div className="footer-column">
            <h3>Our Services</h3>
            <ul className="footer-links">
              <li><Link to="/services" className="footer-link">Cardiology</Link></li>
              <li><Link to="/services" className="footer-link">Neurology</Link></li>
              <li><Link to="/services" className="footer-link">Orthopedics</Link></li>
              <li><Link to="/services" className="footer-link">Pediatrics</Link></li>
              <li><Link to="/services" className="footer-link">Gcology</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-column">
            <h3>Contact Us</h3>
            <div className="footer-contact-items">
              <div className="footer-contact-item">
                <MapPin size={18} />
                <span>SY NO 52/2 & 52/3, Devarabeesanahalli, Varthur Hobli, Bhopal, India</span>
              </div>
              <div className="footer-contact-item">
                <Phone size={18} />
                <span>+91 1234567890</span>
              </div>
              <div className="footer-contact-item">
                <Mail size={18} />
                <span>info@nationalhealthcenter.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} National Health Center. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#" className="footer-bottom-link">Privacy Policy</a>
            <a href="#" className="footer-bottom-link">Terms & Conditions</a>
            <button 
              onClick={scrollToTop} 
              style={{
                background: 'none',
                border: 'none',
                color: 'inherit',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
              className="footer-bottom-link"
            >
              Back to Top <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
