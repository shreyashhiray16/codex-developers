import ContactForm from '../components/ui/ContactForm';
import ScrollReveal from '../components/ui/ScrollReveal';
import { company } from '../config/company';
import { MessageCircle, Phone, Mail } from 'lucide-react';
import { usePageTitle } from '../hooks/usePageTitle';
import './ContactPage.css';

const ContactPage = () => {
  usePageTitle('Contact Us — Codex Developers');

  return (
    <div className="contact-page">
      <section className="contact-content page-section-photo">
        <div className="container page-section-heading">
          <ScrollReveal>
            <h1>Contact Us</h1>
            <p className="subtitle">
              Have a project in mind or need help choosing the right solution? We would be happy to help.
            </p>
          </ScrollReveal>
        </div>

        <div className="container">
          <ScrollReveal>
            <div className="contact-layout">
              <div className="contact-form-col">
                <ContactForm />
              </div>

              <div className="contact-info-col">
                <div className="contact-info-card">
                  <h3>Other Ways to Reach Us</h3>
                  
                  <div className="contact-methods">
                    <div className="method-item">
                      <div className="method-icon-wrap">
                        <MessageCircle className="method-icon" />
                      </div>
                      <div className="method-text">
                        <h4>Chat on WhatsApp</h4>
                        <a href={`https://wa.me/${company.contact.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer">
                          {company.contact.whatsapp}
                        </a>
                      </div>
                    </div>

                    <div className="method-item">
                      <div className="method-icon-wrap">
                        <Phone className="method-icon" />
                      </div>
                      <div className="method-text">
                        <h4>Call Us</h4>
                        <a href={`tel:${company.contact.phoneNumbers[0]}`}>
                          {company.contact.phone}
                        </a>
                      </div>
                    </div>

                    <div className="method-item">
                      <div className="method-icon-wrap">
                        <Mail className="method-icon" />
                      </div>
                      <div className="method-text">
                        <h4>Email Us</h4>
                        <a href={`mailto:${company.contact.email}`}>
                          {company.contact.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="business-hours">
                    <h4>Business Hours</h4>
                    <p>Monday – Saturday: 10:00 AM – 7:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
