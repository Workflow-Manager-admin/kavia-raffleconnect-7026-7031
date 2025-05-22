import React from 'react';
import './SubmissionProcess.css';
import { useRaffle } from '../contexts/RaffleContext';

// PUBLIC_INTERFACE
/**
 * Component for handling the submission process
 * @returns {JSX.Element} SubmissionProcess component
 */
const SubmissionProcess = () => {
  const { state, actions } = useRaffle();
  const { participantData, selectedPrize, isSubmitting } = state;
  
  // Handle submission
  const handleSubmit = () => {
    actions.startSubmission();
  };
  
  // Handle go back to previous step
  const handleBack = () => {
    actions.previousStep();
  };
  
  // Format interests for display
  const formatInterests = (interests) => {
    return interests.map(interest => {
      switch(interest) {
        case 'ai': return 'Artificial Intelligence';
        case 'ml': return 'Machine Learning';
        case 'data': return 'Data Science';
        case 'cloud': return 'Cloud Computing';
        case 'dev': return 'Software Development';
        case 'product': return 'Product Management';
        case 'design': return 'UX/UI Design';
        default: return interest;
      }
    }).join(', ');
  };
  
  return (
    <div className="submission-container">
      <h2 className="submission-title">Review and Submit</h2>
      <p className="submission-description">
        Please review your information before submitting your raffle entry
      </p>
      
      <div className="submission-card">
        <div className="section">
          <h3>Your Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="label">Name:</span>
              <span className="value">{`${participantData.firstName} ${participantData.lastName}`}</span>
            </div>
            <div className="info-item">
              <span className="label">Email:</span>
              <span className="value">{participantData.email}</span>
            </div>
            <div className="info-item">
              <span className="label">Company:</span>
              <span className="value">{participantData.company}</span>
            </div>
            <div className="info-item">
              <span className="label">Title:</span>
              <span className="value">{participantData.title}</span>
            </div>
            <div className="info-item full-width">
              <span className="label">Interests:</span>
              <span className="value">{formatInterests(participantData.interests)}</span>
            </div>
          </div>
        </div>
        
        <div className="section">
          <h3>Selected Prize</h3>
          <div className="selected-prize">
            <img 
              src={selectedPrize.image} 
              alt={selectedPrize.name} 
              className="prize-thumbnail" 
            />
            <div className="prize-info">
              <div className="prize-name">{selectedPrize.name}</div>
              <div className="prize-value">{selectedPrize.value}</div>
              <p className="prize-desc">{selectedPrize.description}</p>
            </div>
          </div>
        </div>
        
        <div className="terms-section">
          <p className="terms-text">
            By submitting this form, you agree to the Kavia AI raffle terms and conditions, 
            and consent to receiving promotional communications from Kavia AI. You can 
            unsubscribe at any time.
          </p>
        </div>
      </div>
      
      <div className="submission-actions">
        <button 
          className="btn btn-secondary" 
          onClick={handleBack}
          disabled={isSubmitting}
        >
          Back
        </button>
        <button 
          className={`btn btn-primary ${isSubmitting ? 'submitting' : ''}`} 
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Submitting...
            </>
          ) : (
            'Submit Raffle Entry'
          )}
        </button>
      </div>
    </div>
  );
};

export default SubmissionProcess;
