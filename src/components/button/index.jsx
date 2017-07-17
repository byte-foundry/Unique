// @flow
import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';


const Button = props => (
  <div
    role="button"
    className={`button ${props.className}`}
    onClick={() => props.onClick()}
    tabIndex="0"
  >
    {props.label}
  </div>
);


Button.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Button.defaultProps = {
  className: '',
  onClick: () => {},
};

export default Button;
