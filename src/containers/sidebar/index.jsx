// @flow
import React from "react";
import PropTypes from "prop-types";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Step from "../../components/step/";
import { goToStep } from "../../data/font";
import "./Sidebar.css";

import { ReactComponent as ProfileIcon } from "./profile.svg";

const getStepsDone = (steps, index, choicesMade, fontName, isSpecimen) =>
  steps && steps.map((step, i) => (
    <Step
      index={i}
      title={steps[i].name}
      key={steps[i].name}
      current={index === i + 1 && !isSpecimen}
      choice={choicesMade[i + 1] ? choicesMade[i + 1].name : undefined}
      specimen={isSpecimen}
    />
  ));
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.choicesMade)
    console.log(this.props.steps)
    return (
      <div className={`Sidebar ${this.props.location.pathname !== "/customize" ? 'small' : ''}`}>
        <ProfileIcon
          className="icon-profile"
          onClick={() => {
            this.props.isAuthenticated()
              ? this.props.goToLibrary()
              : this.props.login();
          }}
        />
        <div className="steps">
          {this.props.location.pathname !== "/customize"
            ? false
            : getStepsDone(
                this.props.steps,
                this.props.step,
                this.props.choicesMade,
                this.props.fontName,
                this.props.specimen
              )}
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
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
  pathName: PropTypes.string.isRequired,
  fontName: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  goToLibrary: PropTypes.func.isRequired,
};

Sidebar.defaultProps = {
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
      goToLibrary: () => push("/library"),
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
