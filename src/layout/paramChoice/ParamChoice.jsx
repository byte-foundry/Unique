// @flow
import React from 'react';
import PropTypes from 'prop-types';
import './ParamChoice.css';
import StepView from '../stepView/StepView';
import WordView from '../wordView/WordView';

const ParamChoice = (props) => {
  const template = props.match.params.template;
  const steps = require(`../../data/choices-${template}.json`);
  const word = 'Hello Prototypo';
  const previewChoice = (choice) => {
    // make change here
    console.log(choice);
  }
  return (
    <div className="ParamChoice">
      <WordView word={word} />
      <StepView step={steps[0]} previewChoice={previewChoice} />
    </div>
  );
};

ParamChoice.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      template: PropTypes.string.isRequired,
    }),
  }),
};

ParamChoice.defaultProps = {
  match: {
    params: {
      template: 'spectral',
    },
  },
};

export default ParamChoice;
