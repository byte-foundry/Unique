// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './ParamChoice.css';
import StepView from '../stepView/';
import StepList from '../stepList/';

const ParamChoice = () => (
  <div className="ParamChoice container-fluid">
    <div className="row">
    <div className="left col-sm-10">
      <StepView />
    </div>
    <div className="right col-sm-2">
      <StepList />
    </div>
    </div>
  </div>
);

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

const mapStateToProps = state => ({
  step: state.font.step,
});

ParamChoice.propTypes = {
  step: PropTypes.number.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ParamChoice));
