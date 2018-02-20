// @flow
import React from "react";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { defineNeed } from "../../data/font";
import { storeChosenWord } from "../../data/user";
import "./DefineNeed.css";

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
        <Next
          className={`icon-next ${!this.state.selected ? "disabled" : ""}`}
          onClick={e => {
            this.handleSubmit(e);
          }}
        />
        {this.props.isLoading ? <h2>Creating font...</h2> : false}
        <div className="row">
          <div className="col-sm-12">
            <h1>What kind of need do you have?</h1>
          </div>
        </div>
        <div className="needs row">
          <div
            className={`col-sm-12 ${
              this.state.selected === "logo" ? "selected" : ""
            }`}
            onClick={() => this.setState({ selected: "logo" })}
          >
            Logotype
          </div>
          <div
            className={`col-sm-12 ${
              this.state.selected === "text" ? "selected" : ""
            }`}
            onClick={() => this.setState({ selected: "text" })}
          >
            Text
          </div>
          <div
            className={`col-sm-12 ${
              this.state.selected === "website" ? "selected" : ""
            }`}
            onClick={() => this.setState({ selected: "website" })}
          >
            Website
          </div>
        </div>
        {this.state.selected === "logo" ? (
          <div className="row logoName">
            <div className="col-sm-12">
              <h1>What is your brand name?</h1>
            </div>
            <div className="col-sm-12">
              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  placeholder="Type something"
                  name="text"
                  onChange={this.handleChange}
                />
              </form>
            </div>
          </div>
        ) : (
          false
        )}
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
      storeChosenWord
    },
    dispatch
  );

DefineNeed.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  defineNeed: PropTypes.func.isRequired,
  storeChosenWord: PropTypes.func.isRequired
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DefineNeed)
);
