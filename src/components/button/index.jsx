// @flow
import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';
import backIcon from './return.svg';
import settingsIcon from './settings.svg';

const Button = props => (
  <span
    role="button"
    className={`Button ${props.className} ${props.mode}`}
    onClick={() => props.onClick()}
    tabIndex="0"
  >
    {(() => {
      switch (props.mode) {
        case 'isBack':
          return (<img src={backIcon} alt="Icon back" />);
        case 'isConfigure':
          return (<span><img src={settingsIcon} alt="Icon back" />{props.label}</span>);
        default:
          return props.label;
      }
    })()}
  </span>
);


Button.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  mode: PropTypes.string,
};

Button.defaultProps = {
  className: '',
  mode: 'default',
  onClick: () => {},
};

export default Button;
