// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { goToStep } from '../../data/font';
import pencilIcon from './pencil.svg';
import './Step.css';

const Step = props => (
  <div
    role="button"
    className={`Step ${props.current ? 'current' : ''}`}
    onClick={() => props.goToStep(props.index, props.specimen)}
    tabIndex="0"
  >
    <span>
      {`${props.title}${props.choice ? `: ${props.choice}` : ''}`}
      {
        !props.specimen && !props.current
        ? (<img src={pencilIcon} alt="icon-edit" />)
        : false
      }
    </span>
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
  choice: undefined,
  specimen: false,
};

const mapDispatchToProps = dispatch => bindActionCreators({ goToStep }, dispatch);


export default connect(null, mapDispatchToProps)(Step);
