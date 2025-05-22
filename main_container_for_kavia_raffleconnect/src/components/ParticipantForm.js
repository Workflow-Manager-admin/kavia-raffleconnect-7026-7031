import React, { useEffect } from 'react';
import './ParticipantForm.css';
import { useRaffle } from '../contexts/RaffleContext';
import { validateParticipantData, interestOptions, jobTitleOptions } from '../utils/validation';

// PUBLIC_INTERFACE
/**
 * Participant form component for collecting user information
 * @returns {JSX.Element} ParticipantForm component
 */
const ParticipantForm = () => {
  const { state, actions } = useRaffle();
  const { participantData, errors } = state;
  
  // Handle input changes and update form data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    actions.updateParticipantData({ [name]: value });
  };
  
  // Handle checkbox changes for interests
  const handleInterestChange = (e) => {
    const { value, checked } = e.target;
    const updatedInterests = [...participantData.interests];
    
    if (checked) {
      updatedInterests.push(value);
    } else {
      const index = updatedInterests.indexOf(value);
      if (index > -1) {
        updatedInterests.splice(index, 1);
      }
    }
    
    actions.updateParticipantData({ interests: updatedInterests });
  };
  
  // Clear validation errors when inputs change
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      actions.clearErrors();
    }
  }, [participantData, actions, errors]);
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form data
    const validationErrors = validateParticipantData(participantData);
    
    if (Object.keys(validationErrors).length > 0) {
      actions.setErrors(validationErrors);
      return;
    }
    
    // Proceed to next step if validation passes
    actions.nextStep();
  };
  
  return (
    <div className="participant-form-container">
      <h2 className="form-title">Your Information</h2>
      <p className="form-description">
        Please provide your details to enter the Kavia AI raffle
      </p>
      
      <form className="participant-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={participantData.firstName}
              onChange={handleInputChange}
              className={errors.firstName ? 'error' : ''}
              placeholder="Enter your first name"
            />
            {errors.firstName && <div className="error-message">{errors.firstName}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={participantData.lastName}
              onChange={handleInputChange}
              className={errors.lastName ? 'error' : ''}
              placeholder="Enter your last name"
            />
            {errors.lastName && <div className="error-message">{errors.lastName}</div>}
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={participantData.email}
            onChange={handleInputChange}
            className={errors.email ? 'error' : ''}
            placeholder="name@company.com"
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="company">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              value={participantData.company}
              onChange={handleInputChange}
              className={errors.company ? 'error' : ''}
              placeholder="Your company name"
            />
            {errors.company && <div className="error-message">{errors.company}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="title">Job Title</label>
            <select
              id="title"
              name="title"
              value={participantData.title}
              onChange={handleInputChange}
              className={errors.title ? 'error' : ''}
            >
              <option value="" disabled>Select your job title</option>
              {jobTitleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.title && <div className="error-message">{errors.title}</div>}
          </div>
        </div>
        
        <div className="form-group">
          <label>Professional Interests</label>
          <div className="interests-grid">
            {interestOptions.map((interest) => (
              <div key={interest.id} className="interest-checkbox">
                <input
                  type="checkbox"
                  id={`interest-${interest.id}`}
                  name="interests"
                  value={interest.id}
                  checked={participantData.interests.includes(interest.id)}
                  onChange={handleInterestChange}
                />
                <label htmlFor={`interest-${interest.id}`}>{interest.label}</label>
              </div>
            ))}
          </div>
          {errors.interests && <div className="error-message">{errors.interests}</div>}
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Continue to Prize Selection
          </button>
        </div>
      </form>
    </div>
  );
};

export default ParticipantForm;
