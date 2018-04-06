// @flow
import React from "react";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";
import { defineNeed } from "../../data/font";
import { storeChosenWord } from "../../data/user";
import "./DefineNeed.css";

import { ReactComponent as Back } from "../stepView/back.svg";
import { ReactComponent as Next } from "../stepView/next.svg";

class DefineNeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: "",
      logoNeedOpened: false,
      selected: undefined
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleLogoNeed = this.toggleLogoNeed.bind(this);
  }
  toggleLogoNeed() {
    this.setState({ logoNeedOpened: !this.state.logoNeedOpened });
  }
  handleChange(event) {
    this.setState({ word: event.target.value });
  }
  handleSubmit(event) {
    if (this.state.word !== "") {
      this.props.storeChosenWord(this.state.word);
    }
    if (!this.props.isLoading) {
      this.props.defineNeed(this.state.selected);
    }
    event.preventDefault();
  }
  render() {
    return (
      <div className="DefineNeed container">
        {this.props.isLoading ? <h2>Creating font...</h2> : false}
        <div className="row justify-content-sm-center">
          <div className="col-sm-12 col-md-11 col-lg-10">
            <h1>
              <FormattedMessage
                id="DefineNeed.title"
                defaultMessage="What kind of need do you have?"
                description="Define need page title"
              />
            </h1>
          </div>
        </div>
        <div className="needs row justify-content-sm-center">
          <div
            className={`col-sm-12 col-md-11 col-lg-10 ${
              this.state.selected === "logo" ? "selected" : ""
            }`}
            onClick={() => this.setState({ selected: "logo" })}
          >
            <FormattedMessage
              id="DefineNeed.logo"
              defaultMessage="Logotype"
              description="Logo need"
            />
            <span>
              {" "}
              <FormattedMessage
                id="DefineNeed.logoTooltip"
                defaultMessage="A logo font is blablabla blablabla blablabla"
                description="logo need tooltip"
              >
                {text => (
                  <Tooltip
                    title={text}
                    position="top"
                    trigger="mouseenter"
                    arrow="true"
                  >
                    <span className="tooltip">?</span>
                  </Tooltip>
                )}
              </FormattedMessage>
            </span>
          </div>
          <div
            className={`col-sm-12 col-md-11 col-lg-10 ${
              this.state.selected === "text" ? "selected" : ""
            }`}
            onClick={() => this.setState({ selected: "text" })}
            onDoubleClick={e => {
              this.setState({ selected: "text" });
              this.handleSubmit(e);
            }}
          >
            <FormattedMessage
              id="DefineNeed.text"
              defaultMessage="Text"
              description="Text need"
            />
            <span>
              {" "}
              <FormattedMessage
                id="DefineNeed.textTooltip"
                defaultMessage="A text font is blablabla blablabla blablabla"
                description="text need tooltip"
              >
                {text => (
                  <Tooltip
                    title={text}
                    position="top"
                    trigger="mouseenter"
                    arrow="true"
                  >
                    <span className="tooltip">?</span>
                  </Tooltip>
                )}
              </FormattedMessage>
            </span>
          </div>
          <div
            className={`col-sm-12 col-md-11 col-lg-10 ${
              this.state.selected === "display" ? "selected" : ""
            }`}
            onClick={() => this.setState({ selected: "display" })}
            onDoubleClick={e => {
              this.setState({ selected: "display" });
              this.handleSubmit(e);
            }}
          >
            <FormattedMessage
              id="DefineNeed.Display"
              defaultMessage="Display"
              description="Display need"
            />
            <span>
              {" "}
              <FormattedMessage
                id="DefineNeed.DisplayTooltip"
                defaultMessage="A display font is blablabla blablabla blablabla"
                description="Display need tooltip"
              >
                {text => (
                  <Tooltip
                    title={text}
                    position="top"
                    trigger="mouseenter"
                    arrow="true"
                  >
                    <span className="tooltip">?</span>
                  </Tooltip>
                )}
              </FormattedMessage>
            </span>
          </div>
          <div
            className={`col-sm-12 col-md-11 col-lg-10 ${
              this.state.selected === "dunno" ? "selected" : ""
            }`}
            onClick={() => this.setState({ selected: "dunno" })}
            onDoubleClick={e => {
              this.setState({ selected: "dunno" });
              this.handleSubmit(e);
            }}
          >
            <FormattedMessage
              id="DefineNeed.dunno"
              defaultMessage="Dunno"
              description="Dunno need"
            />
            <span>
              {" "}
              <FormattedMessage
                id="DefineNeed.dunnoTooltip"
                defaultMessage="I don’t know yet what I want to do."
                description="dunno need tooltip"
              >
                {dunno => (
                  <Tooltip
                    title={dunno}
                    position="top"
                    trigger="mouseenter"
                    arrow="true"
                  >
                    <span className="tooltip">?</span>
                  </Tooltip>
                )}
              </FormattedMessage>
            </span>
          </div>
        </div>
        {this.state.selected === "logo" ? (
          <div className="row justify-content-sm-center logoName">
            <div className="col-sm-12 col-md-11 col-lg-10">
              <h1>
                <FormattedMessage
                  id="DefineNeed.brandTitle"
                  defaultMessage="What is your brand name?"
                  description="Brand name question"
                />
              </h1>
            </div>
            <div className="col-sm-12 col-md-11 col-lg-10">
              <form onSubmit={this.handleSubmit}>
                <FormattedMessage
                  id="DefineNeed.brandInput"
                  defaultMessage="Type something"
                  description="Brand input placeholder"
                >
                  {text => (
                    <input
                      type="text"
                      placeholder={text}
                      name="text"
                      onChange={this.handleChange}
                    />
                  )}
                </FormattedMessage>
              </form>
            </div>
          </div>
        ) : (
          false
        )}
        <Back
          className="icon-back"
          onClick={() => {
            this.props.redirectToLanding();
          }}
        />
        <Next
          className={`icon-next ${!this.state.selected ? "disabled" : ""}`}
          onClick={e => {
            this.handleSubmit(e);
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.presets.isLoading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      defineNeed,
      storeChosenWord,
      redirectToLanding: () => push("/")
    },
    dispatch
  );

DefineNeed.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  defineNeed: PropTypes.func.isRequired,
  storeChosenWord: PropTypes.func.isRequired,
  redirectToLanding: PropTypes.func.isRequired
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DefineNeed)
);
