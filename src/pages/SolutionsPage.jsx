import { solutions } from '../config/solutions';
import ScrollReveal from '../components/ui/ScrollReveal';
import Button from '../components/ui/Button';
import CTASection from '../components/sections/CTASection';
import * as Icons from 'lucide-react';
import { usePageTitle } from '../hooks/usePageTitle';
import './SolutionsPage.css';

const DynamicIcon = ({ name, className }) => {
  const IconComponent = Icons[name] || Icons.Briefcase;
  return <IconComponent className={className} />;
};

const SolutionsPage = () => {
  usePageTitle('Solutions — Codex Developers');

  return (
    <div className="solutions-page">
      <section className="solutions-list page-section-photo">
        <div className="container page-section-heading">
          <ScrollReveal>
            <h1>Solutions</h1>
            <p className="subtitle">
              We create practical digital solutions organized around real business needs — not just isolated services.
            </p>
          </ScrollReveal>
        </div>

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
                      <span className="block-label">Challenge</span>
                      <p>{solution.problem}</p>
                    </div>
                    <div className="solution-block">
                      <span className="block-label">Solution</span>
                      <p>{solution.solution}</p>
                    </div>
                  </div>

                  <div className="solution-footer">
                    {solution.services && (
                      <div className="related-services">
                        {solution.services.map((service) => (
                          <span key={service} className="service-tag">{service}</span>
                        ))}
                      </div>
                    )}
                    <Button href="/contact" variant="secondary" className="solution-btn">
                      Discuss This Solution
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default SolutionsPage;
