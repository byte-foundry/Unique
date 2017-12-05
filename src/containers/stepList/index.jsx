// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import Step from '../../components/step/';
import Button from '../../components/button/';
import { goToStep } from '../../data/font';
import pencilIcon from '../../components/step/pencil.svg';
import './StepList.css';

const getStepsDone = (steps, index, choicesMade, fontName, isSpecimen) =>
  choicesMade.map((choice, i) =>
    (i === 0
      ? (
        <Link key="template" to="/">
          <div className="Step">
            Template: {fontName}
            {!isSpecimen
              ? (<img src={pencilIcon} alt="icon-edit" />)
              : false
            }
          </div>
        </Link>
      )
      : (
        <Step
          index={i}
          title={steps[i - 1].name}
          key={steps[i - 1].name}
          current={index === i && !isSpecimen}
          choice={choice.name}
          specimen={isSpecimen}
        />
      )),
  );

const StepList = props =>
  (<div className="StepList">
    <div className="bubbles">
      {!props.specimen && props.steps.map((step, index) =>
        (<div
          className={`bubble ${props.step > index + 1 ? 'past' : ''} ${props.step === index + 1
            ? 'active'
            : ''}`}
          onClick={() => props.goToStep(index + 1)}
          tabIndex="0"
          key={`bubble-${step.name}`}
          role="button"
        />),
      )}
    </div>
    <h3>Choices made:</h3>
    {getStepsDone(props.steps, props.step, props.choicesMade, props.fontName, props.specimen)}
  </div>);

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
