import React from 'react';
import * as LucideIcons from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import ScrollReveal from '../ui/ScrollReveal';
import { solutions } from '../../config/solutions';
import './SolutionsSection.css';

const SolutionsSection = () => {
  return (
    <section id="solutions" className="solutions-section section page-section-photo">
      <div className="container">
        <ScrollReveal>
          <SectionHeader 
            label="Solutions"
            title="Complete Solutions for Your Business Needs"
            subtitle="Whether you need a professional website, an online store, or software to manage daily operations, we create practical digital solutions that fit your business."
          />
        </ScrollReveal>
        
        <div className="solutions-grid">
          {solutions.map((solution, index) => {
            const Icon = LucideIcons[solution.icon] || LucideIcons.Briefcase;
            
            return (
              <ScrollReveal key={solution.id} delay={index * 100} className="solution-card">
                <div className="solution-icon-wrapper">
                  <Icon size={24} />
                </div>
                <div className="solution-content">
                  <h3 className="solution-title">{solution.title}</h3>
                  <p className="solution-problem">"{solution.problem}"</p>
                  <p className="solution-answer">{solution.solution}</p>
                  
                  {solution.relatedServices && (
                    <div className="solution-tags">
                      {solution.relatedServices.map((service, i) => (
                        <span key={i} className="solution-tag">{service}</span>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
