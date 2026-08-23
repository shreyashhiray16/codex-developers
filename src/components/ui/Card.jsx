import React from 'react';
import './Card.css';

const Card = ({
  children,
  className = '',
  variant = 'default',
  hover = true,
  padding = 'md',
}) => {
  return (
    <div className={`card card-${variant} card-pad-${padding} ${hover ? 'card-hover' : ''} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
