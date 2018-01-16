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
    if (!this.props.isLoading) {
      this.props.defineNeed('logo');
    }
    event.preventDefault();
  }
  render() {
    return (
      <div className="DefineNeed container">
        {this.props.isLoading ? <h2>Creating font...</h2> : false}
        <div className="row">
          <div className="col-sm-12">
            <h1>What kind of need do you have?</h1>
          </div>
        </div>
        <div className="needs row">
          <div className="col-sm-12 col-md-4">
            <div
              className="card"
              onClick={() => this.toggleLogoNeed()}
              role="button"
              tabIndex="0"
            >
              <div className="image" />
              <div className="title">
                Logo
              </div>
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
                <button type="submit">Go</button>
              </form>
              )
            : false
            }
          </div>
          <div className="col-sm-12 col-md-4">
            <div
              className="card"
              onClick={() => (!this.props.isLoading ? this.props.defineNeed('text') : false)}
              role="button"
              tabIndex="0"
            >
              <div className="image" />
              <div className="title">
                Text
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-4">
            <div
              className="card"
              onClick={() => (!this.props.isLoading ? this.props.defineNeed('website') : false)}
              role="button"
              tabIndex="0"
            >
              <div className="image" />
              <div className="title">
                Website
              </div>
            </div>
          </div>
        </div>
        
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
