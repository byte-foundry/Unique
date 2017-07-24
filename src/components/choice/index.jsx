// @flow
import React from 'react';
import PropTypes from 'prop-types';
import './Choice.css';

const Choice = props => (
  <div
    className="Choice"
    key={props.name}
    onClick={() => props.changeParams(props.choice, true)}
    onMouseOver={() => props.changeParams(props.choice, false)}
    onMouseLeave={() => props.resetValues()}
    role="option"
    aria-checked="false"
    aria-selected="false"
    tabIndex={0}
  >
    <span>{props.choice.name}</span>
  </div>
);


Choice.propTypes = {
  name: PropTypes.string.isRequired,
  changeParams: PropTypes.func.isRequired,
  resetValues: PropTypes.func.isRequired,
  choice: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Choice;
