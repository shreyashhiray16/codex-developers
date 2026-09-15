import React from 'react';
import './TestimonialsSection.css';
import { testimonials } from '../../config/testimonials';
import SectionHeader from '../ui/SectionHeader';
import ScrollReveal from '../ui/ScrollReveal';
import { Quote, Star } from 'lucide-react';

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="section testimonials-section page-section-photo">
      <div className="container">
        <ScrollReveal>
          <SectionHeader 
            label="Testimonials"
            title="What Our Clients Say"
          />
        </ScrollReveal>
        
        {testimonials.hasTestimonials ? (
          <div className="testimonials-carousel">
            {testimonials.items.map((testimonial, index) => (
              <ScrollReveal key={testimonial.id || index} delay={index * 100}>
                <div className="testimonial-card">
                  <Quote size={32} className="testimonial-quote-icon" />
                  <p className="testimonial-text">"{testimonial.text}"</p>
                  <div className="testimonial-author">
                    <h4 className="testimonial-name">{testimonial.name}</h4>
                    <p className="testimonial-role">{testimonial.role}, {testimonial.company}</p>
                    <div className="testimonial-stars">
                      {[...Array(testimonial.rating || 5)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <ScrollReveal delay={200}>
            <div className="testimonial-placeholder">
              <Quote size={48} className="testimonial-quote-icon-large" />
              <p className="testimonial-placeholder-message">{testimonials.placeholderMessage || "We are currently collecting feedback from our wonderful clients."}</p>
              <p className="testimonial-placeholder-note">This section will be updated with real client feedback.</p>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
