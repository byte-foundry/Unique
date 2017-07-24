// @flow
import React from 'react';
import './ParamChoice.css';
import StepView from '../stepView/';
import WordView from '../wordView/';
import StepList from '../stepList/';

const ParamChoice = () => (
  <div className="ParamChoice">
    <WordView word="hello Prototypo" />
    <StepView />
    <StepList />
  </div>);

export default ParamChoice;

