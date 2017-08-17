// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { defineNeed } from '../../data/font';
import { storeChosenWord } from '../../data/user';
import './DefineNeed.css';

class DefineNeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: '',
      logoNeedOpened: false,
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
    if (this.state.word !== '') {
      this.props.storeChosenWord(this.state.word);
    }
    this.props.defineNeed('logo');
    event.preventDefault();
  }
  render() {
    return (
      <div className="DefineNeed">
        <h1>Which need ?</h1>
        <div className="needs">
          <div
            role="button"
            className="choice"
            onClick={() => this.toggleLogoNeed()}
            tabIndex="0"
          >
            Logo
          </div>
          {this.state.logoNeedOpened
            ? (
              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  placeholder="your text"
                  name="text"
                  onChange={this.handleChange}
                />
                <button type="submit">Select template</button>
              </form>
              )
            : false
          }
          <div
            role="button"
            className="choice"
            onClick={() => this.props.defineNeed('text')}
            tabIndex="0"
          >
            Text
          </div>
          <div
            role="button"
            className="choice"
            onClick={() => this.props.defineNeed('website')}
            tabIndex="0"
          >
            Website
          </div>
        </div>
        {this.props.isLoading ? <h2>Creating font...</h2> : false}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.presets.isLoading,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      defineNeed,
      storeChosenWord,
    },
    dispatch,
  );

DefineNeed.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  defineNeed: PropTypes.func.isRequired,
  storeChosenWord: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DefineNeed));
