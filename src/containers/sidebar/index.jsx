// @flow
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import Step from "../../components/step/";
import { goToStep, loadLibrary } from "../../data/font";
import Button from "../../components/button/";
import Checkout from "../../components/checkout";
import "./Sidebar.css";

import { ReactComponent as ProfileIcon } from "./profile.svg";

const getStepsDone = (steps, index, choicesMade, fontName, isSpecimen) =>
  steps &&
  steps.map((step, i) => (
    <Step
      index={i}
      title={steps[i].name}
      key={steps[i].name}
      current={index === i + 1 && !isSpecimen}
      choice={choicesMade[i] ? choicesMade[i].name : undefined}
      specimen={isSpecimen}
    />
  ));
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log('---------------')
    console.log(this.props.choicesMade)
    console.log('---------------')
    return (
      <div
        className={`Sidebar ${
          this.props.location.pathname !== "/customize" &&
          this.props.location.pathname !== "/specimen" &&
          this.props.mode !== "checkout"
            ? "small"
            : ""
        } ${this.props.mode === "checkout" ? "checkout" : ""}`}
      >
        <ProfileIcon
          className="icon-profile"
          onClick={() => {
            this.props.isAuthenticated()
              ? this.props.loadLibrary()
              : this.props.login();
          }}
        />
        {this.props.mode !== "checkout" ? (
          <div className="steps">
            {this.props.location.pathname !== "/customize" &&
            this.props.location.pathname !== "/specimen"
              ? false
              : getStepsDone(
                  this.props.steps,
                  this.props.step,
                  this.props.choicesMade,
                  this.props.fontName,
                  this.props.location.pathname === "/specimen"
                )}
          </div>
        ) : (
          <div className="sidebar-checkout">
            <h2 className="price">
              {parseFloat(this.props.checkoutPrice).toFixed(2)}
            </h2>
            <div className="choices">
              {this.props.checkoutOptions.map(
                option =>
                  option.selected && (
                    <div className="choice">
                      <span className="left">{option.name}</span>
                      <span className="right">
                        {option.price === 0 ? "included" : option.price}
                      </span>
                    </div>
                  )
              )}
            </div>
            <FormattedMessage
              id="Sidebar.checkoutAction"
              defaultMessage="Checkout"
              description="Sidebar - Checkout action"
            >
              {text => (
                <Checkout
                  title="Unique"
                  amount={this.props.checkoutPrice}
                  description={"Your unique package"}
                >
                  <Button
                    className="button-checkout"
                    onClick={() => {}}
                    mode="white"
                    label={text}
                  />
                </Checkout>
              )}
            </FormattedMessage>
          </div>
        )}
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
  loadLibrary: PropTypes.func.isRequired,
  mode: PropTypes.string,
  checkoutPrice: PropTypes.number.isRequired
};

Sidebar.defaultProps = {
  specimen: false,
  mode: "default"
};

const mapStateToProps = state => ({
  fontName: state.font.currentPreset.variant.family.name + state.font.currentPreset.variant.name,
  steps: state.font.currentPreset.steps,
  step: state.font.step,
  choicesMade: state.font.choicesMade,
  checkoutPrice: state.user.checkoutPrice,
  checkoutOptions: state.user.checkoutOptions
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      goToStep,
      loadLibrary,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
