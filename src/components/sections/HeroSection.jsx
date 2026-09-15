import React from 'react';
import Button from '../ui/Button';
import { useConsultation } from '../../context/ConsultationContext';
import './HeroSection.css';

const HeroSection = () => {
  const { openConsultation } = useConsultation();

  return (
    <section id="hero" className="hero-section is-loaded">
      <div className="hero-video-bg">
        <video
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src="/videos/same_but_with_duration_of_se.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-overlay"></div>
      </div>
      <div className="container hero-container">
        <div className="hero-content">
          <span className="hero-trust-label">Professional Web Development & Software Solutions</span>
          <h1 className="hero-headline">Websites and Business Software Built for Growth.</h1>
          <p className="hero-description">
            Codex Developers helps businesses build a powerful online presence and streamline their operations through professional websites, e-commerce platforms, and customized business software.
          </p>
          <div className="hero-actions">
            <Button variant="primary" size="lg" onClick={openConsultation}>Get a Free Consultation</Button>
            <Button variant="secondary" size="lg" to="/services">Explore Our Services</Button>
          </div>
          <p className="hero-microcopy">
            Built for startups, growing businesses, industrial companies, retailers, and service providers.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
