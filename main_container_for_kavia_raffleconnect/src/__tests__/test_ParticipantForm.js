import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import ParticipantForm from '../components/ParticipantForm';
import { useRaffle } from '../contexts/RaffleContext';
import { interestOptions } from '../utils/validation';

// Mock the context hook
jest.mock('../contexts/RaffleContext');

describe('ParticipantForm Component', () => {
  // Default mock state and actions
  const mockState = {
    participantData: {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      title: '',
      interests: []
    },
    errors: {}
  };
  
  const mockActions = {
    updateParticipantData: jest.fn(),
    setErrors: jest.fn(),
    clearErrors: jest.fn(),
    nextStep: jest.fn()
  };

  // Set up default mocks before each test
  beforeEach(() => {
    useRaffle.mockReturnValue({
      state: { ...mockState },
      actions: mockActions
    });
    
    // Clear mock calls between tests
    jest.clearAllMocks();
  });

  test('renders all form fields correctly', () => {
    render(<ParticipantForm />);

    // Check if form title and description are rendered
    expect(screen.getByText('Your Information')).toBeInTheDocument();
    expect(screen.getByText(/Please provide your details/i)).toBeInTheDocument();

    // Check if all input fields are rendered
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Company/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Job Title/i)).toBeInTheDocument();

    // Check if interest options are rendered
    expect(screen.getByText('Professional Interests')).toBeInTheDocument();
    interestOptions.forEach(interest => {
      expect(screen.getByLabelText(interest.label)).toBeInTheDocument();
    });

    // Check if submit button is rendered
    expect(screen.getByRole('button', { name: /Continue to Prize Selection/i })).toBeInTheDocument();
  });

  test('displays validation errors for empty fields on submit', () => {
    render(<ParticipantForm />);
    
    // Submit the form without filling any fields
    fireEvent.click(screen.getByRole('button', { name: /Continue to Prize Selection/i }));
    
    // Check that validation was triggered with form validation
    expect(mockActions.setErrors).toHaveBeenCalled();
    
    // Now manually update the mock to simulate what the component would do
    // when validation errors are set
    const validationErrors = {
      firstName: 'First name must be at least 2 characters',
      lastName: 'Last name must be at least 2 characters',
      email: 'Please enter a valid email address',
      company: 'Company name must be at least 2 characters',
      title: 'Job title must be at least 2 characters',
      interests: 'Please select at least one interest'
    };
    
    // Re-render with validation errors
    useRaffle.mockReturnValue({
      state: {
        ...mockState,
        errors: validationErrors
      },
      actions: mockActions
    });
    
    render(<ParticipantForm />);
    
    // Now check if all error messages are displayed
    expect(screen.getByText('First name must be at least 2 characters')).toBeInTheDocument();
    expect(screen.getByText('Last name must be at least 2 characters')).toBeInTheDocument();
    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    expect(screen.getByText('Company name must be at least 2 characters')).toBeInTheDocument();
    expect(screen.getByText('Job title must be at least 2 characters')).toBeInTheDocument();
    expect(screen.getByText('Please select at least one interest')).toBeInTheDocument();
    
    // Verify that nextStep was not called
    expect(mockActions.nextStep).not.toHaveBeenCalled();
  });

  test('handles input field changes correctly', () => {
    // Setup with errors to test clearErrors
    useRaffle.mockReturnValue({
      state: {
        ...mockState,
        errors: { firstName: 'Error' } // Add an error to trigger clearErrors
      },
      actions: mockActions
    });
    
    render(<ParticipantForm />);
    
    // Interact with a text field
    const firstNameInput = screen.getByLabelText(/First Name/i);
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    
    // Check if updateParticipantData was called with the correct value
    expect(mockActions.updateParticipantData).toHaveBeenCalledWith({ firstName: 'John' });
    
    // Test email field
    const emailInput = screen.getByLabelText(/Email Address/i);
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    
    expect(mockActions.updateParticipantData).toHaveBeenCalledWith({ email: 'john@example.com' });
    
    // Now clearErrors should be called because we have errors and made changes
    expect(mockActions.clearErrors).toHaveBeenCalled();
  });

  test('handles checkbox selection correctly', () => {
    // Test adding a checkbox
    render(<ParticipantForm />);
    
    const aiCheckbox = screen.getByLabelText('Artificial Intelligence');
    fireEvent.click(aiCheckbox);
    
    // Verify that updateParticipantData is called with the right value
    expect(mockActions.updateParticipantData).toHaveBeenCalledWith({ interests: ['ai'] });
    
    // Reset mock for next test
    jest.clearAllMocks();
    
    // Test multiple selections
    // Mock the state as if 'ai' is already selected
    useRaffle.mockReturnValue({
      state: {
        participantData: {
          ...mockState.participantData,
          interests: ['ai']
        },
        errors: {}
      },
      actions: mockActions
    });
    
    render(<ParticipantForm />);
    
    // Select 'ml' checkbox
    const mlCheckbox = screen.getByLabelText('Machine Learning');
    fireEvent.click(mlCheckbox);
    
    // The handler should create a new array with both values
    expect(mockActions.updateParticipantData).toHaveBeenCalledWith(
      expect.objectContaining({
        interests: expect.arrayContaining(['ai', 'ml'])
      })
    );
    
    // Reset mock for next test
    jest.clearAllMocks();
    
    // Test removing a checkbox
    // Mock the state as if both are selected
    useRaffle.mockReturnValue({
      state: {
        participantData: {
          ...mockState.participantData,
          interests: ['ai', 'ml']
        },
        errors: {}
      },
      actions: mockActions
    });
    
    render(<ParticipantForm />);
    
    // Uncheck 'ai' checkbox
    const aiCheckboxToUncheck = screen.getByLabelText('Artificial Intelligence');
    expect(aiCheckboxToUncheck).toBeChecked(); // Verify it starts checked
    fireEvent.click(aiCheckboxToUncheck);
    
    // It should have called with only 'ml' remaining
    // We can't check exact array because Jest mock call tracking doesn't provide
    // the exact order of interest removals
    expect(mockActions.updateParticipantData).toHaveBeenCalled();
    const lastCallArgs = mockActions.updateParticipantData.mock.calls[0][0];
    expect(lastCallArgs.interests).toContain('ml');
    expect(lastCallArgs.interests).not.toContain('ai');
  });

  test('submits form successfully with valid data', () => {
    // Set up the mock with valid data
    useRaffle.mockReturnValue({
      state: {
        participantData: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          company: 'Acme Inc.',
          title: 'Developer',
          interests: ['ai', 'dev']
        },
        errors: {}
      },
      actions: mockActions
    });
    
    render(<ParticipantForm />);
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Continue to Prize Selection/i }));
    
    // Verify that nextStep was called
    expect(mockActions.nextStep).toHaveBeenCalledTimes(1);
    
    // Verify that setErrors was not called (since data is valid)
    expect(mockActions.setErrors).not.toHaveBeenCalled();
  });
  
  test('clears validation errors when inputs change', () => {
    // Set up mock with some existing errors
    useRaffle.mockReturnValue({
      state: {
        ...mockState,
        errors: {
          firstName: 'First name must be at least 2 characters',
          email: 'Please enter a valid email address'
        }
      },
      actions: mockActions
    });
    
    render(<ParticipantForm />);
    
    // Check that errors are initially displayed
    expect(screen.getByText('First name must be at least 2 characters')).toBeInTheDocument();
    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    
    // Make a change to an input
    const firstNameInput = screen.getByLabelText(/First Name/i);
    fireEvent.change(firstNameInput, { target: { value: 'Jo' } });
    
    // Verify clearErrors was called
    expect(mockActions.clearErrors).toHaveBeenCalledTimes(1);
  });

  test('error class is applied to inputs with errors', () => {
    // Set up mock with some errors
    useRaffle.mockReturnValue({
      state: {
        ...mockState,
        errors: {
          firstName: 'First name must be at least 2 characters',
          email: 'Please enter a valid email address'
        }
      },
      actions: mockActions
    });
    
    render(<ParticipantForm />);
    
    // Check if error class is applied to inputs with errors
    const firstNameInput = screen.getByLabelText(/First Name/i);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    
    expect(firstNameInput).toHaveClass('error');
    expect(emailInput).toHaveClass('error');
    expect(lastNameInput).not.toHaveClass('error');
  });
});
