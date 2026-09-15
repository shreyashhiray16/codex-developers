import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { services } from '../../config/services';
import './ConsultationModal.css';

const emptyForm = {
  name: '',
  phone: '',
  place: '',
  service: '',
  website: '',
};

const ConsultationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const modalRef = useRef(null);
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => firstInputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key !== 'Tab' || !modalRef.current) return;

      const focusable = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your name';
    if (!formData.phone.trim()) newErrors.phone = 'Please enter your phone number';
    else if (!/^[+]?[\d\s-]{8,15}$/.test(formData.phone.trim())) newErrors.phone = 'Please enter a valid phone number';
    if (!formData.place.trim()) newErrors.place = 'Please enter your city or location';
    if (!formData.service) newErrors.service = 'Please select a service';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate() || submitting) return;
    setSubmitError('');
    setSubmitting(true);

    fetch('/api/consultations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'consultation',
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        place: formData.place.trim(),
        service: formData.service,
        website: formData.website,
      }),
    })
      .then(response => {
        if (!response.ok) throw new Error('Unable to submit consultation');
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData(emptyForm);
          setSubmitting(false);
          onClose();
        }, 3000);
      })
      .catch(() => {
        setSubmitError('Something went wrong. Please try again.');
        setSubmitting(false);
      });
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick} role="dialog" aria-modal="true" aria-label="Free Consultation Form">
      <div className="modal-container" ref={modalRef}>
        <button className="modal-close" onClick={onClose} aria-label="Close form">
          <X size={20} />
        </button>

        {submitted ? (
          <div className="modal-success">
            <div className="success-icon">✓</div>
            <h3>Thank You!</h3>
            <p>We have received your request. Our team will contact you shortly.</p>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <h2>Get a Free Consultation</h2>
              <p>Share your details and we will get back to you with the next steps.</p>
            </div>

            <form className="modal-form" onSubmit={handleSubmit} noValidate>
              <div className="honeypot-field" aria-hidden="true">
                <label htmlFor="consult-website">Website</label>
                <input
                  id="consult-website"
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>

              <div className="modal-field">
                <label htmlFor="consult-name">Your Name <span className="required">*</span></label>
                <input
                  ref={firstInputRef}
                  id="consult-name"
                  type="text"
                  name="name"
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={submitting}
                />
                {errors.name && <span className="field-error">{errors.name}</span>}
              </div>

              <div className="modal-field">
                <label htmlFor="consult-phone">Phone Number <span className="required">*</span></label>
                <input
                  id="consult-phone"
                  type="tel"
                  name="phone"
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={submitting}
                />
                {errors.phone && <span className="field-error">{errors.phone}</span>}
              </div>

              <div className="modal-field">
                <label htmlFor="consult-place">City / Location <span className="required">*</span></label>
                <input
                  id="consult-place"
                  type="text"
                  name="place"
                  className={`form-input ${errors.place ? 'error' : ''}`}
                  placeholder="e.g. Mumbai, Delhi, Pune"
                  value={formData.place}
                  onChange={handleChange}
                  disabled={submitting}
                />
                {errors.place && <span className="field-error">{errors.place}</span>}
              </div>

              <div className="modal-field">
                <label htmlFor="consult-service">Service Required <span className="required">*</span></label>
                <select
                  id="consult-service"
                  name="service"
                  className={`form-select ${errors.service ? 'error' : ''}`}
                  value={formData.service}
                  onChange={handleChange}
                  disabled={submitting}
                >
                  <option value="">Select a service</option>
                  {services.map(s => (
                    <option key={s.id} value={s.title}>{s.title}</option>
                  ))}
                  <option value="Other">Other / Not Sure</option>
                </select>
                {errors.service && <span className="field-error">{errors.service}</span>}
              </div>

              <button type="submit" className="btn btn-primary btn-lg modal-submit-btn" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Request'}
              </button>
              {submitError && <span className="field-error modal-submit-error">{submitError}</span>}
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ConsultationModal;
