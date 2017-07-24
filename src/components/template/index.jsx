// @flow
import React from 'react';
import PropTypes from 'prop-types';
import './Template.css';

const Template = props => (
  <div
    role="button"
    className="Template"
    onClick={() => props.createFont(props.font)}
    tabIndex="0"
  >
    {props.font.preset} {props.font.variant}
  </div>
);


Template.propTypes = {
  font: PropTypes.shape({
    preset: PropTypes.string.isRequired,
    variant: PropTypes.string.isRequired,
  }).isRequired,
  createFont: PropTypes.func.isRequired,
};

export default Template;
