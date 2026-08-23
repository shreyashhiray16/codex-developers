import React, { useState } from 'react';
import { company } from '../../config/company';
import './FloatingButtons.css';

const FloatingButtons = () => {
  const [whatsappTooltip, setWhatsappTooltip] = useState(false);
  const whatsappNumber = company.contact.whatsapp.replace(/[^0-9]/g, '');
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hi%20Codex%20Developers%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services.`;
  const instagramLink = company.social.instagram;

  const handleWhatsAppClick = () => {
    setWhatsappTooltip(true);
    // Open WhatsApp after a brief tooltip flash
    setTimeout(() => {
      window.open(whatsappLink, '_blank');
    }, 600);
    setTimeout(() => setWhatsappTooltip(false), 2000);
  };

  return (
    <div className="floating-buttons">
      {/* Instagram Button - icon only */}
      <a
        href={instagramLink}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn instagram-btn"
        aria-label="Follow us on Instagram @codex__developers"
        title="Follow us on Instagram"
      >
        <svg className="floating-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="1.8" fill="none" />
          <circle cx="12" cy="12" r="5" stroke="white" strokeWidth="1.8" fill="none" />
          <circle cx="17.5" cy="6.5" r="1.2" fill="white" />
        </svg>
      </a>

      {/* WhatsApp Button - icon only with tooltip popup */}
      <div className="whatsapp-wrapper">
        <div className={`whatsapp-tooltip ${whatsappTooltip ? 'visible' : ''}`}>
          <span>WhatsApp Us</span>
          <div className="tooltip-arrow"></div>
        </div>
        <button
          className="floating-btn whatsapp-btn"
          onClick={handleWhatsAppClick}
          onMouseEnter={() => setWhatsappTooltip(true)}
          onMouseLeave={() => setWhatsappTooltip(false)}
          onTouchStart={() => setWhatsappTooltip(true)}
          aria-label="WhatsApp us at +91 9875172275"
          title="WhatsApp Us"
        >
          <svg className="floating-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="white"/>
            <path d="M12.004 2C6.48 2 2.003 6.475 2.003 11.997c0 1.762.46 3.476 1.335 4.992L2 22l5.233-1.237A9.956 9.956 0 0012.004 22c5.523 0 9.998-4.475 9.998-9.997 0-2.67-1.04-5.18-2.928-7.066A9.952 9.952 0 0012.004 2zm0 18.27a8.26 8.26 0 01-4.215-1.154l-.302-.18-3.133.822.837-3.057-.197-.313A8.237 8.237 0 013.73 12c0-4.567 3.718-8.282 8.287-8.282a8.231 8.231 0 015.858 2.426 8.224 8.224 0 012.424 5.856c-.003 4.564-3.72 8.27-8.295 8.27z" fill="white"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FloatingButtons;
