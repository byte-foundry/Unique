// @flow
import React from 'react';
import StepView from '../stepView/StepView';
import WordView from '../wordView/WordView';
import './App.css';

const App = () => (
  <div className="App">
    <WordView />
    <StepView />
  </div>
);

export default App;
