import React from 'react';
import './ProcessStep.css';

const ProcessStep = ({ step, isLast }) => {
  return (
    <div className="process-step">
      <div className="process-step-number">
        {step.number}
      </div>
      {!isLast && <div className="process-step-connector"></div>}
      <h3 className="process-step-title">{step.title}</h3>
      <p className="process-step-desc">{step.description}</p>
    </div>
  );
};

export default ProcessStep;
