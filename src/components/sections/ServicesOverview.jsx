import React from 'react';
import SectionHeader from '../ui/SectionHeader';
import ServiceCard from '../ui/ServiceCard';
import ScrollReveal from '../ui/ScrollReveal';
import Button from '../ui/Button';
import { services } from '../../config/services';
import './ServicesOverview.css';

const ServicesOverview = () => {
  return (
    <section id="services" className="services-overview section page-section-photo">
      <div className="container">
        <SectionHeader 
          label="Our Services"
          title="Everything You Need to Build and Improve Your Business Online"
        />
        
        <div className="services-grid">
          {services.slice(0, 6).map((service, index) => (
            <ScrollReveal key={service.id} delay={index * 100}>
              <ServiceCard service={service} />
            </ScrollReveal>
          ))}
        </div>
        
        <div className="services-actions">
          <ScrollReveal delay={300}>
            <Button variant="secondary" size="lg" to="/services">
              View All Services
            </Button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
