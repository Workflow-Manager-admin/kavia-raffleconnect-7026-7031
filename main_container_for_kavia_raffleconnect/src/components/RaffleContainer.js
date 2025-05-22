import React from 'react';
import './RaffleContainer.css';
import { useRaffle } from '../contexts/RaffleContext';

// Import all the subcomponents
import RaffleHeader from './RaffleHeader';
import ParticipantForm from './ParticipantForm';
import PrizeShowcase from './PrizeShowcase';
import SubmissionProcess from './SubmissionProcess';
import SuccessView from './SuccessView';

// PUBLIC_INTERFACE
/**
 * Main container component for the Kavia RaffleConnect application
 * @returns {JSX.Element} RaffleContainer component
 */
const RaffleContainer = () => {
  const { state } = useRaffle();
  const { currentStep, steps } = state;
  
  // Render the appropriate component based on the current step
  const renderStep = () => {
    const currentStepName = steps[currentStep];
    
    switch (currentStepName) {
      case 'info':
        return <ParticipantForm />;
      case 'prizes':
        return <PrizeShowcase />;
      case 'submit':
        return <SubmissionProcess />;
      case 'success':
        return <SuccessView />;
      default:
        return <ParticipantForm />;
    }
  };
  
  return (
    <div className="raffle-container">
      <RaffleHeader />
      
      <div className="raffle-content">
        {renderStep()}
      </div>
      
      <footer className="raffle-footer">
        <div className="footer-content">
          <div className="footer-copyright">
            © {new Date().getFullYear()} Kavia AI. All rights reserved.
          </div>
          <div className="footer-links">
            <a href="#terms" className="footer-link">Terms</a>
            <a href="#privacy" className="footer-link">Privacy</a>
            <a href="#contact" className="footer-link">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RaffleContainer;
