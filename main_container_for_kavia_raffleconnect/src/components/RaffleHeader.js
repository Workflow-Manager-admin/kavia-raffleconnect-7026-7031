import React from 'react';
import './RaffleHeader.css';
import { useRaffle } from '../contexts/RaffleContext';

// PUBLIC_INTERFACE
/**
 * Header component for the Kavia RaffleConnect application
 * @returns {JSX.Element} RaffleHeader component
 */
const RaffleHeader = () => {
  const { state } = useRaffle();
  const { steps, currentStep } = state;
  
  return (
    <header className="raffle-header">
      <div className="raffle-logo">
        <span className="logo-symbol">*</span> KAVIA AI
      </div>
      
      <h1 className="raffle-title">RaffleConnect</h1>
      
      <div className="raffle-subtitle">
        Enter for a chance to win exclusive AI products and experiences
      </div>
      
      <div className="progress-bar-container">
        <div className="progress-steps">
          {steps.map((step, index) => (
            <div 
              key={step} 
              className={`progress-step ${index === currentStep ? 'active' : ''} 
                ${index < currentStep ? 'completed' : ''}`}
            >
              <div className="step-indicator">
                {index < currentStep ? (
                  <span className="step-check">✓</span>
                ) : (
                  index + 1
                )}
              </div>
              <div className="step-label">
                {step === 'info' && 'Your Info'}
                {step === 'prizes' && 'Select Prize'}
                {step === 'submit' && 'Submit'}
                {step === 'success' && 'Complete'}
              </div>
            </div>
          ))}
        </div>
        
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{width: `${(currentStep / (steps.length - 1)) * 100}%`}}
          ></div>
        </div>
      </div>
    </header>
  );
};

export default RaffleHeader;
