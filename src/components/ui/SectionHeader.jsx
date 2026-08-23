import React from 'react';
import './SectionHeader.css';

const SectionHeader = ({
  label,
  title,
  subtitle,
  align = 'center',
  light = false,
}) => {
  return (
    <div className={`section-header align-${align} ${light ? 'light-mode' : ''}`}>
      {label && <span className="section-label">{label}</span>}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
};

export default SectionHeader;
