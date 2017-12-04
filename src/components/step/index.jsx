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
    className={`Step ${props.current ? 'current' : ''}`}
    onClick={() => props.goToStep(props.index, props.specimen)}
    tabIndex="0"
  >
    {`${props.title}${props.choice ? `: ${props.choice}` : ''}`}
  </div>
);

Step.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  goToStep: PropTypes.func.isRequired,
  current: PropTypes.bool.isRequired,
  choice: PropTypes.string,
  specimen: PropTypes.bool,
};

Step.defaultProps = {
  choice: 'No choice',
  specimen: false,
};

const mapDispatchToProps = dispatch => bindActionCreators({ goToStep }, dispatch);


export default connect(null, mapDispatchToProps)(Step);
