import React, { useEffect } from 'react';
import { solutions } from '../config/solutions';
import ScrollReveal from '../components/ui/ScrollReveal';
import Button from '../components/ui/Button';
import CTASection from '../components/sections/CTASection';
import * as Icons from 'lucide-react';
import './SolutionsPage.css';

const DynamicIcon = ({ name, className }) => {
  const IconComponent = Icons[name] || Icons.Briefcase;
  return <IconComponent className={className} />;
};

const SolutionsPage = () => {
  useEffect(() => {
    document.title = 'Solutions — Codex Developers';
  }, []);

  return (
    <main className="solutions-page">
      <section className="solutions-hero">
        <div className="container">
          <ScrollReveal>
            <h1>Solutions</h1>
            <p className="subtitle">
              We create practical digital solutions organized around real business needs — not just isolated services.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="solutions-list">
        <div className="container">
          <div className="solutions-grid">
            {solutions.map((solution, index) => (
              <ScrollReveal key={solution.id} delay={index * 100}>
                <div className="solution-card">
                  <div className="solution-header">
                    <div className="solution-icon-wrap">
                      <DynamicIcon name={solution.icon} className="solution-icon" />
                    </div>
                    <h2>{solution.title}</h2>
                  </div>

                  <div className="solution-body">
                    <div className="challenge-block">
                      <span className="block-label">The Challenge</span>
                      <p>{solution.problem}</p>
                    </div>

                    <div className="solution-block">
                      <span className="block-label">How We Help</span>
                      <p>{solution.solution}</p>
                    </div>
                  </div>

                  <div className="solution-footer">
                    <div className="related-services">
                      {solution.services && solution.services.map((svc, idx) => (
                        <span key={idx} className="service-tag">{svc}</span>
                      ))}
                    </div>
                    <Button href="/contact" variant="secondary" className="solution-btn">
                      Get Started
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
};

export default SolutionsPage;
