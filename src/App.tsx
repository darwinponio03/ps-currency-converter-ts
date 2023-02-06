import React from 'react';

import './App.css';
import CurrencyConversion from './components/CurrencyConversion';
import Header from './components/Header';

const App = () => {
  return (
    <div className="app">
      <div className="app__content">
        <Header />
        <CurrencyConversion/>
      </div>
    </div>
  );
};

export default App;
