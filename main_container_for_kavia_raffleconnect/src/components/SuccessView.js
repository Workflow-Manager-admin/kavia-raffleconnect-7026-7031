import React, { useEffect } from 'react';
import './SuccessView.css';
import { useRaffle } from '../contexts/RaffleContext';

// PUBLIC_INTERFACE
/**
 * Component displayed after successful raffle submission
 * @returns {JSX.Element} SuccessView component
 */
const SuccessView = () => {
  const { state, actions } = useRaffle();
  const { participantData, selectedPrize } = state;
  
  // Create confetti effect on component mount
  useEffect(() => {
    createConfetti();
    
    // Clean up confetti on unmount
    return () => {
      const confetti = document.querySelectorAll('.confetti');
      confetti.forEach(item => item.remove());
    };
  }, []);
  
  // Create confetti elements
  const createConfetti = () => {
    const container = document.querySelector('.success-container');
    if (!container) return;
    
    const colors = ['#E87A41', '#ffffff', '#FF8B4D', '#FFB088'];
    
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      
      const size = Math.random() * 10 + 5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      confetti.style.width = `${size}px`;
      confetti.style.height = `${size}px`;
      confetti.style.background = color;
      confetti.style.opacity = Math.random();
      
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.top = `-${size}px`;
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      
      const animationDuration = Math.random() * 3 + 2;
      confetti.style.animation = `confetti ${animationDuration}s ease-in infinite`;
      confetti.style.animationDelay = `${Math.random() * 2}s`;
      
      container.appendChild(confetti);
    }
  };
  
  // Handle restart button click
  const handleRestart = () => {
    actions.resetForm();
  };
  
  return (
    <div className="success-container">
      <div className="success-content">
        <div className="success-icon">
          <span className="checkmark">✓</span>
        </div>
        
        <h2 className="success-title">Entry Submitted!</h2>
        
        <p className="success-message">
          Thank you, {participantData.firstName}! Your entry for the Kavia AI raffle has been
          successfully submitted. Good luck!
        </p>
        
        <div className="selected-prize-card">
          <div className="prize-label">Your Selected Prize:</div>
          <div className="prize-name">{selectedPrize?.name}</div>
          <img 
            src={selectedPrize?.image} 
            alt={selectedPrize?.name}
            className="prize-image" 
          />
          <div className="prize-value">{selectedPrize?.value}</div>
        </div>
        
        <div className="confirmation-details">
          <p>
            A confirmation email has been sent to <strong>{participantData.email}</strong>.
            We'll notify you if you're the lucky winner!
          </p>
          
          <p className="announcement-date">
            Winner announcement: <strong>May 31, 2023</strong>
          </p>
        </div>
        
        <div className="social-share">
          <p>Share on social media:</p>
          <div className="social-buttons">
            <button className="social-btn twitter">
              <span className="social-icon">𝕏</span>
              Twitter
            </button>
            <button className="social-btn linkedin">
              <span className="social-icon">in</span>
              LinkedIn
            </button>
            <button className="social-btn facebook">
              <span className="social-icon">f</span>
              Facebook
            </button>
          </div>
        </div>
        
        <button className="btn btn-primary restart-btn" onClick={handleRestart}>
          Enter Another Submission
        </button>
        
        <p className="contact-support">
          Questions? <a href="#support" className="support-link">Contact Support</a>
        </p>
      </div>
    </div>
  );
};

export default SuccessView;
