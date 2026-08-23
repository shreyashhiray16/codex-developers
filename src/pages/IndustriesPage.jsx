import React, { useEffect } from 'react';
import { industries } from '../config/industries';
import ScrollReveal from '../components/ui/ScrollReveal';
import Button from '../components/ui/Button';
import CTASection from '../components/sections/CTASection';
import * as Icons from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import './IndustriesPage.css';

const DynamicIcon = ({ name, className }) => {
  const IconComponent = Icons[name] || Icons.Building;
  return <IconComponent className={className} />;
};

const IndustriesPage = () => {
  useEffect(() => {
    document.title = 'Industries — Codex Developers';
  }, []);

  return (
    <main className="industries-page">
      <section className="industries-hero">
        <div className="container">
          <ScrollReveal>
            <h1>Industries We Serve</h1>
            <p className="subtitle">
              Every industry has different goals, customers, and workflows. We adapt the design, features, and technology to suit your business requirements.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="industries-content">
        <div className="container">
          <div className="industries-grid">
            {industries.map((industry, index) => (
              <ScrollReveal key={industry.id} delay={index * 50}>
                <div className="industry-card">
                  <div className="industry-header">
                    <div className="industry-icon-wrap">
                      <DynamicIcon name={industry.icon} className="industry-icon" />
                    </div>
                    <h2>{industry.title}</h2>
                  </div>
                  
                  <p className="industry-description">{industry.description}</p>
                  
                  <div className="industry-use-cases">
                    <h3>Common Solutions:</h3>
                    <ul>
                      {industry.useCases.map((useCase, idx) => (
                        <li key={idx}>
                          <ChevronRight className="li-icon" />
                          <span>{useCase}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="industries-bottom-note">
              <p>
                Do not see your industry listed? We can adapt our solutions to fit your specific business requirements. <a href="/contact">Contact us to discuss your needs.</a>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CTASection />
    </main>
  );
};

export default IndustriesPage;
