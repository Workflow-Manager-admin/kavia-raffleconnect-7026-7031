import React, { useEffect } from 'react';
import './PrizeShowcase.css';
import { useRaffle } from '../contexts/RaffleContext';
import prizes from '../data/prizes';

// PUBLIC_INTERFACE
/**
 * Component for showcasing available prizes
 * @returns {JSX.Element} PrizeShowcase component
 */
const PrizeShowcase = () => {
  const { actions } = useRaffle();
  
  // Automatically select the first prize when the component mounts
  useEffect(() => {
    // Set the first prize as the selected prize for consistency with other components
    actions.selectPrize(prizes[0]);
  }, [actions]);
  
  // Handle continue to next step
  const handleContinue = () => {
    actions.nextStep();
  };
  
  // Handle go back to previous step
  const handleBack = () => {
    actions.previousStep();
  };
  
  return (
    <div className="prize-showcase-container">
      <h2 className="showcase-title">Available Prizes</h2>
      <p className="showcase-description">
        These are the amazing prizes available in this raffle
      </p>
      
      <div className="prizes-grid">
        {prizes.map(prize => (
          <div 
            key={prize.id}
            className="prize-card"
          >
            <div className="prize-image-container">
              <img src={prize.image} alt={prize.name} className="prize-image" />
            </div>
            <div className="prize-details">
              <h3 className="prize-name">{prize.name}</h3>
              <div className="prize-value">{prize.value}</div>
              <p className="prize-description">{prize.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="showcase-actions">
        <button className="btn btn-secondary" onClick={handleBack}>
          Back
        </button>
        <button 
          className="btn btn-primary" 
          onClick={handleContinue}
        >
          Continue to Submit
        </button>
      </div>
    </div>
  );
};

export default PrizeShowcase;
