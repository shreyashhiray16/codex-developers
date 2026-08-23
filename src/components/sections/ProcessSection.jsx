import React from 'react';
import { Search, FileText, Code2, Rocket } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import ScrollReveal from '../ui/ScrollReveal';
import './ProcessSection.css';

const steps = [
  {
    id: 1,
    title: 'Discover',
    desc: 'We understand your business, goals, audience, and requirements.',
    Icon: Search
  },
  {
    id: 2,
    title: 'Plan',
    desc: 'We define the structure, features, content, and technology needed for your solution.',
    Icon: FileText
  },
  {
    id: 3,
    title: 'Build',
    desc: 'We design and develop a professional, functional, and responsive product.',
    Icon: Code2
  },
  {
    id: 4,
    title: 'Launch & Support',
    desc: 'We help you launch confidently and provide support for future improvements.',
    Icon: Rocket
  }
];

const ProcessSection = () => {
  return (
    <section id="process" className="process-section section">
      <div className="container">
        <ScrollReveal>
          <SectionHeader 
            label="How We Work"
            title="Our Simple Development Process"
          />
        </ScrollReveal>
        
        <div className="process-timeline">
          <div className="timeline-line"></div>
          <div className="process-grid">
            {steps.map((step, index) => {
              const { id, title, desc, Icon } = step;
              return (
                <ScrollReveal key={id} delay={index * 150} className="process-step">
                  <div className="step-marker">
                    <span className="step-number">{id}</span>
                  </div>
                  <div className="step-icon">
                    <Icon size={24} />
                  </div>
                  <h3 className="step-title">{title}</h3>
                  <p className="step-desc">{desc}</p>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
