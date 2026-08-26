import React from 'react';
import './PortfolioSection.css';
import { portfolio } from '../../config/portfolio';
import SectionHeader from '../ui/SectionHeader';
import ScrollReveal from '../ui/ScrollReveal';
import Button from '../ui/Button';
const bgColors = [
  'hsl(220, 80%, 70%)',
  'hsl(250, 80%, 75%)',
  'hsl(180, 60%, 65%)',
  'hsl(280, 70%, 70%)',
  'hsl(150, 70%, 65%)',
  'hsl(40, 90%, 65%)'
];

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="section portfolio-section bg-light">
      <div className="container">
        <ScrollReveal>
          <SectionHeader 
            label="Our Work"
            title="Built for Different Business Goals"
          />
        </ScrollReveal>
        
        <div className="portfolio-grid">
          {portfolio.map((project, index) => {
            const gradientBg = `linear-gradient(135deg, ${bgColors[index % bgColors.length]}, ${bgColors[(index + 1) % bgColors.length]})`;
            
            return (
              <ScrollReveal key={project.id} delay={index * 100}>
                <div className="portfolio-card">
                  <div className="portfolio-card-header" style={{ background: gradientBg }}>
                    <img
                      className="portfolio-card-image"
                      src={project.image}
                      alt={`${project.title} project preview`}
                    />
                    <span className="portfolio-badge">Sample Project</span>
                  </div>
                  <div className="portfolio-card-body">
                    <h3 className="portfolio-title">{project.title}</h3>
                    <p className="portfolio-category">{project.category}</p>
                    <p className="portfolio-description">{project.description}</p>
                    <div className="portfolio-tags">
                      {project.tags && project.tags.map(tag => (
                        <span key={tag} className="portfolio-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
        
        <ScrollReveal delay={400}>
          <div className="portfolio-cta">
            <Button href="/contact" variant="primary">Discuss Your Project</Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default PortfolioSection;
