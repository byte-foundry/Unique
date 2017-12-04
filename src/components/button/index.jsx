// @flow
import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';
import backIcon from './return.svg';

const Button = props => (
  <div
    role="button"
    className={`Button ${props.className} ${props.isBack ? 'isBack' : ''}`}
    onClick={() => props.onClick()}
    tabIndex="0"
  >
    {props.isBack
    ? (<img src={backIcon} alt="Icon back" />)
    : props.label}
  </div>
);


Button.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  isBack: PropTypes.bool,
};

Button.defaultProps = {
  className: '',
  isBack: false,
  onClick: () => {},
};

export default Button;
