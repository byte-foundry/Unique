// @flow
import React from "react";
import PropTypes from "prop-types";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import Step from "../../components/step/";
import Button from "../../components/button";
import { goToStep, finishEditing } from "../../data/font";
import "./StepList.css";

import { ReactComponent as ProfileIcon } from "./profile.svg";
import { ReactComponent as MenuIcon } from "./menu.svg";

const getStepsDone = (steps, index, choicesMade, fontName, isSpecimen) =>
  steps.map(
    (step, i) =>
      (
        <Step
          index={i}
          title={steps[i].name}
          key={steps[i].name}
          current={index === i + 1 && !isSpecimen}
          choice={choicesMade[i - 1] ? choicesMade[i - 1].name : undefined}
          specimen={isSpecimen}
        />
      )
  );
const StepList = props => {
  console.log(props);
  return (
    <div className="StepList">
      <ProfileIcon
        className="icon-profile"
        onClick={() => {
          props.isAuthenticated() ? props.goToLibrary() : props.login();
        }}
      />
      <MenuIcon className="icon-menu" onClick={() => {}} />
      {getStepsDone(
        props.steps,
        props.step,
        props.choicesMade,
        props.fontName,
        props.specimen
      )}
    </div>
  );
};

StepList.propTypes = {
  step: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      choices: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired
        })
      )
    })
  ).isRequired,
  choicesMade: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  fontName: PropTypes.string.isRequired,
  specimen: PropTypes.bool,
  finishEditing: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  goToLibrary: PropTypes.func.isRequired
};

StepList.defaultProps = {
  specimen: false
};

const mapStateToProps = state => ({
  fontName: state.font.currentPreset.preset + state.font.currentPreset.variant,
  steps: state.font.currentPreset.steps,
  step: state.font.step,
  choicesMade: state.font.choicesMade
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      goToStep,
      goToLibrary: () => push("/library")
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(StepList);
