import React from 'react';
import './IndustriesSection.css';
import { industries } from '../../config/industries';
import IndustryCard from '../ui/IndustryCard';
import SectionHeader from '../ui/SectionHeader';
import ScrollReveal from '../ui/ScrollReveal';
import Button from '../ui/Button';

const IndustriesSection = () => {
  return (
    <section id="industries" className="section industries-section bg-white">
      <div className="container">
        <ScrollReveal>
          <SectionHeader 
            label="Industries We Serve"
            title="Solutions Adapted for Your Industry"
            subtitle="Every industry has different goals, customers, and workflows. We adapt the design, features, and technology to suit your business requirements."
          />
        </ScrollReveal>
        
        <div className="industries-grid">
          {industries.map((industry, index) => (
            <ScrollReveal key={industry.id} delay={index * 100}>
              <IndustryCard industry={industry} />
            </ScrollReveal>
          ))}
        </div>
        
        <ScrollReveal delay={400}>
          <div className="industries-cta">
            <p>Looking for a solution for a different industry? We are happy to discuss your requirements.</p>
            <Button href="/contact" variant="secondary">Tell Us About Your Industry</Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default IndustriesSection;
