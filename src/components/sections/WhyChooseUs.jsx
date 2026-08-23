import React from 'react';
import { 
  Crosshair, 
  Palette, 
  Code2, 
  Smartphone, 
  TrendingUp, 
  MessageSquare, 
  Monitor, 
  LifeBuoy 
} from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import ScrollReveal from '../ui/ScrollReveal';
import './WhyChooseUs.css';

const reasons = [
  { id: 1, title: 'Business-Focused Solutions', desc: 'Designed to solve real problems.', Icon: Crosshair },
  { id: 2, title: 'Clean and Professional Design', desc: 'Modern, trustworthy aesthetics.', Icon: Palette },
  { id: 3, title: 'Customized Development', desc: 'Tailored to your specific needs.', Icon: Code2 },
  { id: 4, title: 'Mobile-Friendly Experiences', desc: 'Flawless on all devices.', Icon: Smartphone },
  { id: 5, title: 'Scalable Technology', desc: 'Grows alongside your business.', Icon: TrendingUp },
  { id: 6, title: 'Transparent Communication', desc: 'Clear updates every step.', Icon: MessageSquare },
  { id: 7, title: 'Practical Software', desc: 'Tools that improve efficiency.', Icon: Monitor },
  { id: 8, title: 'Ongoing Support', desc: 'Reliable help when you need it.', Icon: LifeBuoy },
];

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="why-us-section section section--light">
      <div className="container">
        <div className="why-us-layout">
          <div className="why-us-content">
            <ScrollReveal>
              <SectionHeader 
                label="Why Codex Developers"
                title="Technology Designed Around the Way Your Business Works"
                align="left"
              />
            </ScrollReveal>
            
            <div className="reasons-grid">
              {reasons.map((reason, index) => {
                const { Icon, title, desc } = reason;
                return (
                  <ScrollReveal key={reason.id} delay={index * 50}>
                    <div className="reason-item">
                      <div className="reason-icon-wrapper">
                        <Icon size={20} />
                      </div>
                      <div className="reason-text">
                        <h4 className="reason-title">{title}</h4>
                        <p className="reason-desc">{desc}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
          
          <div className="why-us-visual">
            <ScrollReveal delay={200} className="visual-wrapper">
              <div className="abstract-graphic">
                <div className="node node-center">
                  <div className="pulse-ring"></div>
                </div>
                <div className="node node-1"><Code2 size={24} /></div>
                <div className="node node-2"><TrendingUp size={24} /></div>
                <div className="node node-3"><Monitor size={24} /></div>
                <div className="node node-4"><Smartphone size={24} /></div>
                <svg className="connections" width="100%" height="100%">
                  <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="var(--color-primary-subtle)" strokeWidth="2" strokeDasharray="5,5" />
                  <line x1="50%" y1="50%" x2="80%" y2="30%" stroke="var(--color-primary-subtle)" strokeWidth="2" strokeDasharray="5,5" />
                  <line x1="50%" y1="50%" x2="30%" y2="80%" stroke="var(--color-primary-subtle)" strokeWidth="2" strokeDasharray="5,5" />
                  <line x1="50%" y1="50%" x2="75%" y2="75%" stroke="var(--color-primary-subtle)" strokeWidth="2" strokeDasharray="5,5" />
                </svg>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
