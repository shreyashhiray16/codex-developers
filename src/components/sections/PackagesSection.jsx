import React from 'react';
import './PackagesSection.css';
import { packages } from '../../config/packages';
import SectionHeader from '../ui/SectionHeader';
import ScrollReveal from '../ui/ScrollReveal';
import Button from '../ui/Button';
import { Sparkles, Building, ShoppingCart, Cog, Check } from 'lucide-react';

const iconMap = {
  Sparkles,
  Building,
  ShoppingCart,
  Cog,
  default: Sparkles
};

const PackagesSection = () => {
  return (
    <section id="packages" className="section packages-section bg-light">
      <div className="container">
        <ScrollReveal>
          <SectionHeader 
            label="Packages"
            title="Choose the Right Package for Your Business"
            subtitle="Each package is tailored to different business needs. Contact us for a detailed quote based on your specific requirements."
          />
        </ScrollReveal>
        
        <div className="packages-grid">
          {packages.map((pkg, index) => {
            const Icon = iconMap[pkg.icon] || iconMap.default;
            
            return (
              <ScrollReveal key={pkg.id} delay={index * 100}>
                <div className={`package-card ${pkg.popular ? 'package-card-popular' : ''}`}>
                  {pkg.popular && <span className="package-badge">Most Popular</span>}
                  
                  <div className="package-icon-wrapper">
                    <Icon size={24} className="package-icon" />
                  </div>
                  
                  <h3 className="package-title">{pkg.title}</h3>
                  <p className="package-subtitle">{pkg.subtitle}</p>
                  
                  <ul className="package-features">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="package-feature">
                        <Check size={16} className="package-check-icon" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <p className="package-ideal">Ideal for: {pkg.idealFor}</p>
                  
                  <div className="package-action">
                    <Button 
                      href="/contact" 
                      variant={pkg.popular ? 'primary' : 'secondary'} 
                      className="package-btn"
                    >
                      {pkg.popular ? 'Get Started' : 'Request Quote'}
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
