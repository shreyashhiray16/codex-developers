import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { company } from '../../config/company';
import Button from '../ui/Button';
import { useConsultation } from '../../context/ConsultationContext';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openConsultation } = useConsultation();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  const handleConsultationClick = () => {
    setMobileMenuOpen(false);
    openConsultation();
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div className="container header-container">
        <Link to="/" className="logo-link">
          <img
            src="/logo.png"
            alt="Codex Developers"
            className="logo-image"
          />
        </Link>

        <nav className="desktop-nav" aria-label="Main Navigation">
          {company.navigation.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Button
            variant="primary"
            size="sm"
            className="desktop-cta"
            onClick={handleConsultationClick}
          >
            Get a Free Consultation
          </Button>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <Link to="/" className="logo-link" onClick={() => setMobileMenuOpen(false)}>
            <img
              src="/logo.png"
              alt="Codex Developers"
              className="logo-image"
            />
          </Link>
          <button
            className="mobile-close-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className="mobile-nav" aria-label="Mobile Navigation">
          {company.navigation.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mobile-menu-footer">
          <Button
            variant="primary"
            className="mobile-cta"
            onClick={handleConsultationClick}
          >
            Get a Free Consultation
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
