// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import Step from '../../components/step/';
import Button from '../../components/button';
import { goToStep, finishEditing } from '../../data/font';
import pencilIcon from '../../components/step/pencil.svg';
import './StepList.css';

const getStepsDone = (steps, index, choicesMade, fontName, isSpecimen) =>
  steps.map((step, i) =>
    (i === 0
      ? (
       false
      )
      : (
        <Step
          index={i}
          title={steps[i - 1].name}
          key={steps[i - 1].name}
          current={index === i && !isSpecimen}
          choice={choicesMade[i-1] ? choicesMade[i-1].name : undefined}
          specimen={isSpecimen}
        />
      )),
  );

const StepList = (props) => {
  console.log(props)
  return (<div className="StepList">
    {getStepsDone(props.steps, props.step, props.choicesMade, props.fontName, props.specimen)}
  </div>);
}

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
  specimen: PropTypes.bool,
  finishEditing: PropTypes.func.isRequired,
};

StepList.defaultProps = {
  specimen: false,
};

const mapStateToProps = state => ({
  fontName: state.font.currentPreset.preset + state.font.currentPreset.variant,
  steps: state.font.currentPreset.steps,
  step: state.font.step,
  choicesMade: state.font.choicesMade,
});

const mapDispatchToProps = dispatch => bindActionCreators({ goToStep }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StepList);
