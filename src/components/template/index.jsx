// @flow
import React from 'react';
import PropTypes from 'prop-types';
import './Template.css';

const Template = props => (
  <div
    role="button"
    className="Template"
    onClick={() => props.openFont(props.name.toUpperCase())}
    tabIndex="0"
  >
    {props.name}
  </div>
);


Template.propTypes = {
  name: PropTypes.string.isRequired,
  openFont: PropTypes.func.isRequired,
};

export default Template;
