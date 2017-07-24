// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
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

const mapStateToProps = state => ({
  steps: state.font.currentPreset.steps,
});

export default withRouter(connect(mapStateToProps)(ParamChoice));

