import React, { useState } from 'react';
import './PrizeShowcase.css';
import { useRaffle } from '../contexts/RaffleContext';
import prizes, { prizeCategories } from '../data/prizes';

// PUBLIC_INTERFACE
/**
 * Component for showcasing available prizes
 * @returns {JSX.Element} PrizeShowcase component
 */
const PrizeShowcase = () => {
  const { state, actions } = useRaffle();
  const [activeCategory, setActiveCategory] = useState('all');
  const { selectedPrize } = state;
  
  // Filter prizes by category
  const filteredPrizes = activeCategory === 'all' 
    ? prizes 
    : prizes.filter(prize => prize.category === activeCategory);
  
  // Handle prize selection
  const handlePrizeSelect = (prize) => {
    actions.selectPrize(prize);
  };
  
  // Handle category filter change
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };
  
  // Handle continue to next step
  const handleContinue = () => {
    if (selectedPrize) {
      actions.nextStep();
    }
  };
  
  // Handle go back to previous step
  const handleBack = () => {
    actions.previousStep();
  };
  
  return (
    <div className="prize-showcase-container">
      <h2 className="showcase-title">Select Your Prize</h2>
      <p className="showcase-description">
        Choose one of these amazing prizes you'd like to win
      </p>
      
      <div className="prize-categories">
        {prizeCategories.map(category => (
          <button 
            key={category.id}
            className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => handleCategoryChange(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>
      
      <div className="prizes-grid">
        {filteredPrizes.map(prize => (
          <div 
            key={prize.id}
            className={`prize-card ${selectedPrize && selectedPrize.id === prize.id ? 'selected' : ''}`}
            onClick={() => handlePrizeSelect(prize)}
          >
            <div className="prize-image-container">
              <img src={prize.image} alt={prize.name} className="prize-image" />
              {selectedPrize && selectedPrize.id === prize.id && (
                <div className="prize-selected-indicator">
                  <span className="checkmark">✓</span>
                </div>
              )}
            </div>
            <div className="prize-details">
              <h3 className="prize-name">{prize.name}</h3>
              <div className="prize-value">{prize.value}</div>
              <p className="prize-description">{prize.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      {filteredPrizes.length === 0 && (
        <div className="no-prizes">No prizes found in this category</div>
      )}
      
      <div className="showcase-actions">
        <button className="btn btn-secondary" onClick={handleBack}>
          Back
        </button>
        <button 
          className="btn btn-primary" 
          onClick={handleContinue}
          disabled={!selectedPrize}
        >
          Continue to Submit
        </button>
      </div>
    </div>
  );
};

export default PrizeShowcase;
