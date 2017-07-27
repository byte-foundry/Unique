// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import Step from '../../components/step/';
import { goToStep } from '../../data/font';
import './StepList.css';

const getStepsDone = (steps, index, choicesMade) => steps.map((step, i) => {
  if (i < index) {
    return (<Step
      index={i}
      title={step.name}
      key={step.name}
      current={index - i === 1}
      choice={choicesMade[i + 1] ? choicesMade[i + 1].name : 'no choice'}
    />);
  }
});

const StepList = props => (
  <div className="StepList">
    {props.steps.map((step, index) => (
      <div
        className={`bubble ${props.step > index + 1 ? 'past' : ''} ${props.step === index + 1 ? 'active' : ''}`}
        onClick={() => props.goToStep(index + 1)}
        tabIndex="0"
        key={`bubble-${step.name}`}
        role="button"
      />
    ))}
    <h2>Choices made:</h2>
    <Link key="template" to="/"><div className="Step">Template: {props.fontName}</div></Link>
    {getStepsDone(props.steps, props.step, props.choicesMade)}
  </div>
);


StepList.propTypes = {
  step: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      choices: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
        }),
      ),
    }),
  ).isRequired,
  choicesMade: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  fontName: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  fontName: state.font.currentPreset.preset + state.font.currentPreset.variant,
  steps: state.font.currentPreset.steps,
  step: state.font.step,
  choicesMade: state.font.choicesMade,
});

const mapDispatchToProps = dispatch => bindActionCreators({ goToStep }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StepList);

