import React from 'react';
import { Shield, Puzzle, Target, Headphones } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';
import './TrustSection.css';

const TrustSection = () => {
  const benefits = [
    { id: 1, title: 'Professional Execution', Icon: Shield },
    { id: 2, title: 'Customized Solutions', Icon: Puzzle },
    { id: 3, title: 'Business-Focused Approach', Icon: Target },
    { id: 4, title: 'Reliable Support', Icon: Headphones },
  ];

  const duplicatedBenefits = [...benefits, ...benefits];

  return (
    <section className="trust-section section section--light">
      <div className="container">
        <ScrollReveal>
          <div className="trust-header">
            <p>Technology solutions for businesses that are ready to move forward.</p>
          </div>
        </ScrollReveal>

        <div className="trust-marquee" aria-label="Business trust highlights">
          <div className="trust-track">
            {duplicatedBenefits.map((benefit, index) => {
              const { Icon, title } = benefit;
              return (
                <ScrollReveal key={`${benefit.id}-${index}`} delay={index * 60}>
                  <div className="trust-item" aria-hidden={index >= benefits.length}>
                    <Icon className="trust-icon" size={24} />
                    <span className="trust-title">{title}</span>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
