import React from 'react';
import './FAQSection.css';
import { faqs } from '../../config/faqs';
import SectionHeader from '../ui/SectionHeader';
import ScrollReveal from '../ui/ScrollReveal';
import FAQAccordion from '../ui/FAQAccordion';
import Button from '../ui/Button';

const FAQSection = () => {
  return (
    <section id="faq" className="section faq-section page-section-photo">
      <div className="container container--narrow">
        <ScrollReveal>
          <SectionHeader 
            label="FAQ"
            title="Frequently Asked Questions"
            subtitle="Find answers to common questions about our services, process, and solutions."
          />
        </ScrollReveal>
        
        <ScrollReveal delay={200}>
          <div className="faq-content">
            <FAQAccordion items={faqs} />
          </div>
        </ScrollReveal>
        
        <ScrollReveal delay={400}>
          <div className="faq-cta">
            <p>Have a different question?</p>
            <Button href="/contact" variant="secondary">Contact Us</Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FAQSection;
