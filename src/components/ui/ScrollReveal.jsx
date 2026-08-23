import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const ScrollReveal = ({
  children,
  className = '',
  direction = 'up',
  delay,
}) => {
  const ref = useScrollReveal();

  const directionClass = {
    up: 'reveal',
    left: 'reveal-left',
    right: 'reveal-right',
    scale: 'reveal-scale',
  }[direction] || 'reveal';

  const style = delay ? { transitionDelay: `${delay}ms` } : undefined;

  return (
    <div
      ref={ref}
      className={`${directionClass} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
