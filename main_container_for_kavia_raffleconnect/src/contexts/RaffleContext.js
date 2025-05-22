import React, { createContext, useContext, useReducer } from 'react';

// Initial state for the raffle application
const initialState = {
  // Current step in the raffle process
  currentStep: 0,
  // Steps in the raffle process
  steps: ['info', 'prizes', 'submit', 'success'],
  // Participant form data
  participantData: {
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    title: '',
    interests: []
  },
  // Form validation errors
  errors: {},
  // Submission status
  isSubmitting: false,
  submissionComplete: false,
  // Selected prize (if any)
  selectedPrize: null
};

// Action types for the reducer
const actionTypes = {
  UPDATE_PARTICIPANT_DATA: 'UPDATE_PARTICIPANT_DATA',
  SET_CURRENT_STEP: 'SET_CURRENT_STEP',
  NEXT_STEP: 'NEXT_STEP',
  PREVIOUS_STEP: 'PREVIOUS_STEP',
  SET_ERRORS: 'SET_ERRORS',
  CLEAR_ERRORS: 'CLEAR_ERRORS',
  START_SUBMISSION: 'START_SUBMISSION',
  COMPLETE_SUBMISSION: 'COMPLETE_SUBMISSION',
  SELECT_PRIZE: 'SELECT_PRIZE',
  RESET_FORM: 'RESET_FORM'
};

// Reducer function to handle state updates
function raffleReducer(state, action) {
  switch (action.type) {
    case actionTypes.UPDATE_PARTICIPANT_DATA:
      return {
        ...state,
        participantData: {
          ...state.participantData,
          ...action.payload
        }
      };
    
    case actionTypes.SET_CURRENT_STEP:
      return {
        ...state,
        currentStep: action.payload
      };
      
    case actionTypes.NEXT_STEP:
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, state.steps.length - 1)
      };
      
    case actionTypes.PREVIOUS_STEP:
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 0)
      };
      
    case actionTypes.SET_ERRORS:
      return {
        ...state,
        errors: action.payload
      };
      
    case actionTypes.CLEAR_ERRORS:
      return {
        ...state,
        errors: {}
      };
      
    case actionTypes.START_SUBMISSION:
      return {
        ...state,
        isSubmitting: true
      };
      
    case actionTypes.COMPLETE_SUBMISSION:
      return {
        ...state,
        isSubmitting: false,
        submissionComplete: true,
        currentStep: state.steps.indexOf('success')
      };
      
    case actionTypes.SELECT_PRIZE:
      return {
        ...state,
        selectedPrize: action.payload
      };
      
    case actionTypes.RESET_FORM:
      return initialState;
      
    default:
      return state;
  }
}

// Create the context
const RaffleContext = createContext();

// PUBLIC_INTERFACE
/**
 * Provider component for the RaffleContext
 * @param {Object} props - Component props
 * @returns {JSX.Element} Provider component
 */
export function RaffleProvider({ children }) {
  const [state, dispatch] = useReducer(raffleReducer, initialState);
  
  // Actions to update the state
  const actions = {
    updateParticipantData: (data) => {
      dispatch({ type: actionTypes.UPDATE_PARTICIPANT_DATA, payload: data });
    },
    
    setCurrentStep: (step) => {
      dispatch({ type: actionTypes.SET_CURRENT_STEP, payload: step });
    },
    
    nextStep: () => {
      dispatch({ type: actionTypes.NEXT_STEP });
    },
    
    previousStep: () => {
      dispatch({ type: actionTypes.PREVIOUS_STEP });
    },
    
    setErrors: (errors) => {
      dispatch({ type: actionTypes.SET_ERRORS, payload: errors });
    },
    
    clearErrors: () => {
      dispatch({ type: actionTypes.CLEAR_ERRORS });
    },
    
    startSubmission: () => {
      dispatch({ type: actionTypes.START_SUBMISSION });
      
      // Mock API submission with a timeout
      setTimeout(() => {
        dispatch({ type: actionTypes.COMPLETE_SUBMISSION });
      }, 2000);
    },
    
    selectPrize: (prize) => {
      dispatch({ type: actionTypes.SELECT_PRIZE, payload: prize });
    },
    
    resetForm: () => {
      dispatch({ type: actionTypes.RESET_FORM });
    }
  };
  
  return (
    <RaffleContext.Provider value={{ state, actions }}>
      {children}
    </RaffleContext.Provider>
  );
}

// PUBLIC_INTERFACE
/**
 * Hook to use the RaffleContext
 * @returns {Object} Context state and actions
 */
export function useRaffle() {
  const context = useContext(RaffleContext);
  if (!context) {
    throw new Error('useRaffle must be used within a RaffleProvider');
  }
  return context;
}
