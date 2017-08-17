// @flow
import React from 'react';
import PropTypes from 'prop-types';
import './Template.css';

const Template = props => (
  <div
    role="button"
    className="Template"
    onClick={() => props.selectFont(props.font)}
    tabIndex="0"
    style={{ fontFamily: `${props.font.preset}${props.font.variant}` }}
  >
    {props.text}
  </div>
);


Template.propTypes = {
  font: PropTypes.shape({
    preset: PropTypes.string.isRequired,
    variant: PropTypes.string.isRequired,
  }).isRequired,
  selectFont: PropTypes.func.isRequired,
  text: PropTypes.string,
};

Template.defaultProps = {
  text: 'Hamburgefonstiv - Abc 123',
};

export default Template;
