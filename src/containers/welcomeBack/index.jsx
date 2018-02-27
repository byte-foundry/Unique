// @flow
import React from "react";
import { withRouter } from "react-router-dom";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./WelcomeBack.css";

import { ReactComponent as Next } from "../stepView/next.svg";

const redirectToProject = (step, choicesLength, redirectToLocation) => {
  if (step <= choicesLength) {
    redirectToLocation("/customize");
  } else redirectToLocation("/specimen");
};

class WelcomeBack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    if (this.state.selected === "new") {
      this.props.redirectToHome();
    } else {
      redirectToProject(
        this.props.step,
        this.props.choicesLength,
        this.props.redirectToLocation
      );
    }
    event.preventDefault();
  }
  render() {
    return (
      <div className="WelcomeBack container">
      <Next
              className={`icon-next ${!this.state.selected ? "disabled" : ""}`}
              onClick={e => {
                this.handleSubmit(e);
              }}
            />
        <div className="row justify-content-sm-center">
          <div className="col-sm-12 col-md-11 col-lg-10">
            
            <h1>
              {" "}
              <FormattedMessage
                id="WelcomeBack.title"
                defaultMessage="Welcome back,"
                description="Welcome back page title"
              />
            </h1>
          </div>
        </div>
        <div className="choices row justify-content-sm-center">
          <div
            className={`col-sm-12 col-md-11 col-lg-10 ${
              this.state.selected === "old" ? "selected" : ""
            }`}
            onClick={() => this.setState({ selected: "old" })}
          >
            <FormattedMessage
              id="WelcomeBack.resumeProject"
              defaultMessage="Resume your project"
              description="Welcome back resume project"
            />
          </div>
          <div
            className={`col-sm-12 col-md-11 col-lg-10 ${
              this.state.selected === "new" ? "selected" : ""
            }`}
            onClick={() => this.setState({ selected: "new" })}
          >
            <FormattedMessage
              id="WelcomeBack.createNewProject"
              defaultMessage="Create a new one"
              description="Welcome back create new project"
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      redirectToHome: () => push("/"),
      redirectToLocation: location => push(location)
    },
    dispatch
  );

const mapStateToProps = state => ({
  step: state.font.choicesMade.length,
  choicesLength: state.font.currentPreset.steps.length
});

WelcomeBack.propTypes = {
  step: PropTypes.number.isRequired,
  redirectToHome: PropTypes.func.isRequired,
  redirectToLocation: PropTypes.func.isRequired,
  choicesLength: PropTypes.number.isRequired
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(WelcomeBack)
);
