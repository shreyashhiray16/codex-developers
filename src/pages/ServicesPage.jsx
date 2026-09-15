import { useEffect } from 'react';
import { services } from '../config/services';
import ScrollReveal from '../components/ui/ScrollReveal';
import Button from '../components/ui/Button';
import CTASection from '../components/sections/CTASection';
import * as Icons from 'lucide-react';
import { Check, CheckCircle, ArrowRight } from 'lucide-react';
import { usePageTitle } from '../hooks/usePageTitle';
import './ServicesPage.css';

const DynamicIcon = ({ name, className }) => {
  const IconComponent = Icons[name] || Icons.Layers;
  return <IconComponent className={className} />;
};

const ServicesPage = () => {
  usePageTitle('Services — Codex Developers');

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="services-page">
      <section className="services-list page-section-photo">
        <div className="container page-section-heading">
          <ScrollReveal>
            <h1>Our Services</h1>
            <p className="subtitle">
              Professional website development and business software solutions designed to help your business succeed.
            </p>
          </ScrollReveal>
        </div>

        {services.map((service, index) => {
          const isEven = index % 2 !== 0; // 0-indexed, so 1 is even visually for alternate layout
          return (
            <div 
              key={service.id} 
              id={service.id} 
              className={`service-section ${isEven ? 'bg-light' : 'bg-white'}`}
            >
              <div className="container">
                <ScrollReveal>
                  <div className={`service-content-wrapper ${isEven ? 'row-reverse' : ''}`}>
                    <div className="service-visual">
                      {service.image ? (
                        <div className="service-image-frame">
                          <img
                            src={service.image}
                            alt={`${service.title} preview`}
                            className="service-image"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className="icon-container">
                          <DynamicIcon name={service.icon} className="service-large-icon" />
                        </div>
                      )}
                    </div>
                    
                    <div className="service-text">
                      <h2>{service.title}</h2>
                      <p className="target-audience">For: {service.targetAudience}</p>
                      <p className="description">{service.fullDescription || service.description}</p>
                      
                      <div className="features-benefits-grid">
                        <div className="list-block">
                          <h3>Key Features</h3>
                          <ul>
                            {service.features.map((feature, idx) => (
                              <li key={idx}>
                                <Check className="list-icon check-icon" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="list-block">
                          <h3>Business Benefits</h3>
                          <ul>
                            {service.benefits.map((benefit, idx) => (
                              <li key={idx}>
                                <CheckCircle className="list-icon benefit-icon" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="service-cta">
                        <Button href="/contact" variant="primary">
                          {service.cta} <ArrowRight size={18} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          );
        })}
      </section>

      <CTASection />
    </div>
  );
};

export default ServicesPage;
