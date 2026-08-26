import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  fullWidth = false,
  type = 'button',
  onClick,
  disabled = false,
  ariaLabel,
}) => {
  const baseClasses = `btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full-width' : ''} ${className}`;
  const linkTarget = to || href;

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="btn-icon" size={size === 'sm' ? 16 : size === 'lg' ? 20 : 18} />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="btn-icon" size={size === 'sm' ? 16 : size === 'lg' ? 20 : 18} />}
    </>
  );

  if (linkTarget) {
    return (
      <Link to={linkTarget} className={baseClasses} onClick={onClick} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={baseClasses}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
};

export default Button;
