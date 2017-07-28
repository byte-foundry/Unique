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
    onClick={() => props.goToStep(props.index)}
    tabIndex="0"
  >
    {`${props.current ? '> ' : ''}${props.title}${props.choice ? `: ${props.choice}` : ''}`}
  </div>
);

Step.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  goToStep: PropTypes.func.isRequired,
  current: PropTypes.bool.isRequired,
  choice: PropTypes.string,
};

Step.defaultProps = {
  choice: 'no choice',
};

const mapDispatchToProps = dispatch => bindActionCreators({ goToStep }, dispatch);


export default connect(null, mapDispatchToProps)(Step);
