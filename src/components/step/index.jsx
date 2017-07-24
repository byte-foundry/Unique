// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { goToStep } from '../../data/font';
import './Step.css';

const Step = props => (
  <div
    role="button"
    className="Step"
    onClick={() => props.goToStep(props.index + 1)}
    tabIndex="0"
  >
    {props.title}
  </div>
);

Step.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  goToStep: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({ goToStep }, dispatch);


export default connect(null, mapDispatchToProps)(Step);
