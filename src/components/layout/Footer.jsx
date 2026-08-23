import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Facebook, Instagram, Phone, Mail, MessageCircle } from 'lucide-react';
import { company } from '../../config/company';
import { services } from '../../config/services';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-grid">
          {/* Column 1: Brand & Social */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-logo">
              <img
                src="/logo.png"
                alt="Codex Developers"
                className="footer-logo-image"
              />
            </Link>
            <p className="footer-description">
              Elevating businesses with cutting-edge digital solutions. We build scalable, modern, and high-performance applications.
            </p>
            <div className="social-links">
              <a href={company.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-btn">
                <Linkedin size={20} />
              </a>
              <a href={company.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="social-btn">
                <Twitter size={20} />
              </a>
              <a href={company.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-btn">
                <Facebook size={20} />
              </a>
              <a href={company.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-btn">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              {company.navigation.map((item) => (
                <li key={item.label}>
                  <Link to={item.path}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="footer-col">
            <h4 className="footer-heading">Our Services</h4>
            <ul className="footer-links">
              {services.map((service) => (
                <li key={service.id}>
                  <Link to={`/services#${service.id}`}>{service.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="footer-col contact-col">
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="footer-contact-list">
              {company.contact.phoneNumbers.map((num) => (
                <li key={num}>
                  <Phone size={18} />
                  <a href={`tel:${num}`}>{num}</a>
                </li>
              ))}
              <li>
                <Mail size={18} />
                <a href={`mailto:${company.contact.email}`}>{company.contact.email}</a>
              </li>
              <li>
                <MessageCircle size={18} />
                <a href={`https://wa.me/${company.contact.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="copyright">{company.legal.copyright}</p>
          <div className="legal-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <span className="dot-separator">•</span>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
