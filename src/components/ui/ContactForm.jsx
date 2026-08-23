import React, { useState } from 'react';
import Button from './Button';
import { services } from '../../config/services';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    serviceRequired: '',
    budgetRange: '',
    projectDescription: '',
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone Number is required';
    if (!formData.projectDescription.trim()) newErrors.projectDescription = 'Project Description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    setStatus('submitting');
    
    setTimeout(() => {
      setStatus('success');
      setFormData({
        fullName: '',
        companyName: '',
        email: '',
        phone: '',
        serviceRequired: '',
        budgetRange: '',
        projectDescription: '',
      });
    }, 1500);
  };

  return (
    <div className="contact-form-container">
      <h2 className="contact-form-title">Tell Us What You Want to Build</h2>
      <p className="contact-form-subtitle">
        Share a few details about your business and requirements. We will review your message and get back to you with the next steps.
      </p>

      {status === 'success' && (
        <div className="form-success">
          Thank you! We have received your message and will get back to you shortly.
        </div>
      )}

      {status === 'error' && (
        <div className="form-error">
          Something went wrong. Please try again later.
        </div>
      )}

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="fullName">Full Name *</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className={`form-input ${errors.fullName ? 'is-invalid' : ''}`}
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <span className="error-text">{errors.fullName}</span>}
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="companyName">Company Name</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              className="form-input"
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-input ${errors.email ? 'is-invalid' : ''}`}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className={`form-input ${errors.phone ? 'is-invalid' : ''}`}
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="serviceRequired">Service Required</label>
            <select
              id="serviceRequired"
              name="serviceRequired"
              className="form-select"
              value={formData.serviceRequired}
              onChange={handleChange}
            >
              <option value="">Select a service</option>
              {services && services.map((service) => (
                <option key={service.id} value={service.id}>{service.title}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="budgetRange">Budget Range</label>
            <select
              id="budgetRange"
              name="budgetRange"
              className="form-select"
              value={formData.budgetRange}
              onChange={handleChange}
            >
              <option value="">Select budget range</option>
              <option value="Not sure yet">Not sure yet</option>
              <option value="Under ₹25,000">Under ₹25,000</option>
              <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
              <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
              <option value="₹1,00,000 - ₹2,50,000">₹1,00,000 - ₹2,50,000</option>
              <option value="Above ₹2,50,000">Above ₹2,50,000</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="projectDescription">Project Description *</label>
          <textarea
            id="projectDescription"
            name="projectDescription"
            rows="4"
            className={`form-textarea ${errors.projectDescription ? 'is-invalid' : ''}`}
            value={formData.projectDescription}
            onChange={handleChange}
          ></textarea>
          {errors.projectDescription && <span className="error-text">{errors.projectDescription}</span>}
        </div>

        <div className="form-submit">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'Sending...' : 'Send Message'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
