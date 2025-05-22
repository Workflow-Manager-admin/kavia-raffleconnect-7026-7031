/**
 * Form validation utilities for the Kavia RaffleConnect application
 */

// PUBLIC_INTERFACE
/**
 * Validates an email address
 * @param {string} email - The email address to validate
 * @returns {boolean} Whether the email is valid
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// PUBLIC_INTERFACE
/**
 * Validates if a string has minimum length
 * @param {string} value - The string to check
 * @param {number} minLength - Minimum required length
 * @returns {boolean} Whether the string meets minimum length
 */
export function hasMinLength(value, minLength) {
  return value && value.length >= minLength;
}

// PUBLIC_INTERFACE
/**
 * Validates the participant form data
 * @param {Object} data - The form data to validate
 * @returns {Object} Validation errors, if any
 */
export function validateParticipantData(data) {
  const errors = {};
  
  if (!hasMinLength(data.firstName, 2)) {
    errors.firstName = 'First name must be at least 2 characters';
  }
  
  if (!hasMinLength(data.lastName, 2)) {
    errors.lastName = 'Last name must be at least 2 characters';
  }
  
  if (!isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!hasMinLength(data.company, 2)) {
    errors.company = 'Company name must be at least 2 characters';
  }
  
  if (!data.title) {
    errors.title = 'Please select a job title';
  }
  
  if (!data.interests || data.interests.length === 0) {
    errors.interests = 'Please select at least one interest';
  }
  
  return errors;
}

// Available interest options for the form
export const interestOptions = [
  { id: 'ai', label: 'Artificial Intelligence' },
  { id: 'ml', label: 'Machine Learning' },
  { id: 'data', label: 'Data Science' },
  { id: 'cloud', label: 'Cloud Computing' },
  { id: 'dev', label: 'Software Development' },
  { id: 'product', label: 'Product Management' },
  { id: 'design', label: 'UX/UI Design' }
];

// Available job title options for the form
export const jobTitleOptions = [
  { value: 'Executive Level', label: 'Executive Level' },
  { value: 'Manager', label: 'Manager' },
  { value: 'Technical Role', label: 'Technical Role' },
  { value: 'Self-Employed', label: 'Self-Employed' },
  { value: 'Student', label: 'Student' },
  { value: 'Other', label: 'Other' }
];
