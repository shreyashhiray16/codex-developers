import React from 'react';
import './CTASection.css';
import ScrollReveal from '../ui/ScrollReveal';
import Button from '../ui/Button';
import { useConsultation } from '../../context/ConsultationContext';

const CTASection = () => {
  const { openConsultation } = useConsultation();

  return (
    <section id="cta" className="section cta-section">
      <div className="cta-background"></div>
      <div className="container">
        <div className="cta-content">
          <ScrollReveal>
            <h2 className="cta-title">Ready to Build a Better Digital Foundation?</h2>
            <p className="cta-subtitle">
              Tell us about your business, your goals, and the solution you need. Our team will help you identify the right next step.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <div className="cta-actions">
              <Button onClick={openConsultation} variant="primary" className="cta-btn-primary">Get a Free Consultation</Button>
              <Button to="/contact" variant="outline" className="cta-btn-secondary">Start a Conversation</Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
