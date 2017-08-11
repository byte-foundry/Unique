// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { defineNeed } from '../../data/font';
import './DefineNeed.css';

const DefineNeed = props => (
  <div className="DefineNeed">
    <h1>Which need ?</h1>
    <div className="needs">
      <div role="button" className="choice" onClick={() => props.defineNeed('logo')} tabIndex="0">
        Logo
      </div>
      <div role="button" className="choice" onClick={() => props.defineNeed('text')} tabIndex="0">
        Text
      </div>
      <div role="button" className="choice" onClick={() => props.defineNeed('website')} tabIndex="0">
        Website
      </div>
    </div>
    {props.isLoading
    ? (<h2>Creating font...</h2>)
    : false}
  </div>
);

const mapStateToProps = state => ({
  isLoading: state.presets.isLoading,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  defineNeed,
}, dispatch);

DefineNeed.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  defineNeed: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DefineNeed));
