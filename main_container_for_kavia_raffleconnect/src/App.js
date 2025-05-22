import React from 'react';
import './App.css';
import { RaffleProvider } from './contexts/RaffleContext';
import RaffleContainer from './components/RaffleContainer';

function App() {
  return (
    <div className="app">
      <RaffleProvider>
        <RaffleContainer />
      </RaffleProvider>
    </div>
  );
}

export default App;