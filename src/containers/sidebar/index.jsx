// @flow
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import Step from "../../components/step/";
import { goToStep, loadLibrary } from "../../data/font";
import Button from "../../components/button/";
import Checkout from "../../components/checkout";
import "./Sidebar.css";

import { ReactComponent as ProfileIcon } from "./profile.svg";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("---------------");
    console.log(this.props);
    console.log(
      parseFloat(this.props.checkoutPrice).toLocaleString(
        this.props.locale_full,
        {
          style: "currency",
          currency: this.props.currency
        }
      )
    );
    console.log("---------------");
    return (
      <div
        className={`Sidebar ${this.props.mode !== "checkout" ? "small" : ""} ${
          this.props.mode === "checkout" ? "checkout" : ""
        }`}
      >
        <ProfileIcon
          className="icon-profile"
          onClick={() => {
            this.props.isAuthenticated
              ? this.props.loadLibrary()
              : this.props.goToAuth();
          }}
        />
        {this.props.mode === "checkout" && (
          <div className="sidebar-checkout">
            <h2 className="price">
              {parseFloat(this.props.checkoutPrice).toLocaleString(
                this.props.locale_full,
                {
                  style: "currency",
                  currency: this.props.currency
                }
              )}
            </h2>
            <div className="choices">
              {this.props.checkoutOptions.map(
                option =>
                  option.selected && (
                    <div className="choice">
                      <span className="left">{option.name}</span>
                      <span className="right">
                        {option.price === 0
                          ? "included"
                          : parseFloat(
                              option.type === "discount"
                                ? this.props.option20Price
                                : this.props.option5Price
                            ).toLocaleString(this.props.locale_full, {
                              style: "currency",
                              currency: this.props.currency,
                              maximumSignificantDigits: 3
                            })}
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
                    checkoutOptions={this.props.checkoutOptions}
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
  isAuthenticated: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  loadLibrary: PropTypes.func.isRequired,
  mode: PropTypes.string,
  checkoutPrice: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  locale_full: PropTypes.string.isRequired,
  option5Price: PropTypes.number.isRequired,
  option20Price: PropTypes.number.isRequired
};

Sidebar.defaultProps = {
  specimen: false,
  mode: "default"
};

const mapStateToProps = state => ({
  fontName:
    state.font.currentPreset.variant &&
    state.font.currentPreset.variant.family.name +
      state.font.currentPreset.variant.name,
  steps: state.font.currentPreset.steps,
  step: state.font.step,
  choicesMade: state.font.choicesMade,
  checkoutPrice: state.user.checkoutPrice,
  checkoutOptions: state.user.checkoutOptions,
  locale_full: state.ui.locale_full,
  currency: state.ui.currency,
  option5Price: state.user.option5Price,
  option20Price: state.user.option20Price
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      goToStep,
      loadLibrary,
      goToAuth: () => push({ pathname: "/app/auth", authData: {} })
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
