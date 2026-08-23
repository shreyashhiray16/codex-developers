import React, { useEffect } from 'react';
import ScrollReveal from '../components/ui/ScrollReveal';
import CTASection from '../components/sections/CTASection';
import { Briefcase, Eye, Shield, Puzzle, Layout, TrendingUp, Check } from 'lucide-react';
import './AboutPage.css';

const AboutPage = () => {
  useEffect(() => {
    document.title = 'About Us — Codex Developers';
  }, []);

  const values = [
    {
      title: 'Professionalism',
      icon: <Briefcase className="value-icon" />,
      description: 'We deliver work that meets high standards of quality, design, and functionality.'
    },
    {
      title: 'Transparency',
      icon: <Eye className="value-icon" />,
      description: 'We communicate openly about timelines, capabilities, and what to expect.'
    },
    {
      title: 'Reliability',
      icon: <Shield className="value-icon" />,
      description: 'We build solutions that work consistently and support them after launch.'
    },
    {
      title: 'Customization',
      icon: <Puzzle className="value-icon" />,
      description: 'We tailor every solution to the specific needs of each business.'
    },
    {
      title: 'Simplicity',
      icon: <Layout className="value-icon" />,
      description: 'We make technology accessible and easy for non-technical business owners.'
    },
    {
      title: 'Growth-Oriented',
      icon: <TrendingUp className="value-icon" />,
      description: 'We build with scalability in mind so solutions grow with your business.'
    }
  ];

  const whyUsPoints = [
    'We focus on understanding business needs before writing code.',
    'We design clean, professional, and user-friendly interfaces.',
    'We communicate clearly and set realistic expectations.',
    'We build solutions that are easy to use and maintain.',
    'We provide support after project completion.',
    'We create technology that fits your budget and growth plans.'
  ];

  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="container">
          <ScrollReveal>
            <h1>About Codex Developers</h1>
            <p className="subtitle">
              Technology solutions built around real business needs.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="about-intro bg-white">
        <div className="container">
          <ScrollReveal>
            <div className="intro-text">
              <p>
                Codex Developers helps businesses use technology in a practical, professional, and effective way. From websites that strengthen your online presence to software that simplifies daily operations, we create digital solutions based on real business needs.
              </p>
              <p>
                We work with startups, small businesses, established companies, manufacturers, retailers, and service providers — helping them build, grow, and operate more efficiently through technology.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="about-mission bg-light">
        <div className="container">
          <ScrollReveal>
            <div className="statement-box">
              <h2>Our Mission</h2>
              <p>
                To provide practical, professional, and reliable technology solutions that help businesses strengthen their digital presence and improve their daily operations.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="about-vision bg-white">
        <div className="container">
          <ScrollReveal>
            <div className="statement-box">
              <h2>Our Vision</h2>
              <p>
                To be a trusted technology partner for businesses across industries — known for delivering solutions that are practical, well-designed, and built to grow with our clients.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="about-values bg-light">
        <div className="container">
          <ScrollReveal>
            <h2 className="section-title">Our Values</h2>
            <div className="values-grid">
              {values.map((value, idx) => (
                <div key={idx} className="value-card">
                  <div className="value-icon-wrap">
                    {value.icon}
                  </div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="about-approach bg-white">
        <div className="container">
          <ScrollReveal>
            <div className="approach-content">
              <h2 className="section-title">Our Approach</h2>
              <p>
                We start by understanding your business — the challenges you face, the goals you are working toward, and the audience you serve. From there, we design and develop solutions that are practical, professional, and aligned with how your business actually operates.
              </p>
              <p>
                Whether it is a website that needs to generate leads, an online store that needs to be easy to manage, or software that needs to simplify everyday tasks — our focus is always on creating something that works for you.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="about-why-us bg-light">
        <div className="container">
          <ScrollReveal>
            <div className="why-us-content">
              <h2 className="section-title">Why Businesses Choose Us</h2>
              <ul className="why-us-list">
                {whyUsPoints.map((point, idx) => (
                  <li key={idx}>
                    <Check className="check-icon" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CTASection />
    </main>
  );
};

export default AboutPage;
