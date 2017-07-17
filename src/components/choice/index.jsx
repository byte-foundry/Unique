// @flow
import React from 'react';
import PropTypes from 'prop-types';
import './Choice.css';

const Choice = props => (
  <div
    className="Choice"
    key={props.name}
    onClick={() => props.selectChoice(props.values)}
    onMouseOver={() => props.previewChoice(props.values)}
    onMouseLeave={() => props.resetValues()}
    role="option"
    aria-checked="false"
    aria-selected="false"
    tabIndex={0}
  >
    <span>{props.name}</span>
  </div>
);


Choice.propTypes = {
  name: PropTypes.string.isRequired,
  selectChoice: PropTypes.func.isRequired,
  previewChoice: PropTypes.func.isRequired,
  resetValues: PropTypes.func.isRequired,
  values: PropTypes.array.isRequired,
};

export default Choice;
