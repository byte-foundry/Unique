// @flow
import React from 'react';
import PropTypes from 'prop-types';
import './Choice.css';

const Choice = props => (
  <div
    className={`Choice ${props.selected ? 'selected' : ''}`}
    key={props.choice.name}
    onClick={() => props.markChoiceActive(props.choice)}
    onDoubleClick={() => props.selectChoice(props.choice)}
    role="option"
    aria-checked="false"
    aria-selected="false"
    tabIndex={0}
    style={{ fontFamily: `choiceFont${props.index}` }}
  >
    {props.text}
    {props.mostSelected ? <span className="mostSelected">Most selected</span> : false}
  </div>
);


Choice.propTypes = {
  selectChoice: PropTypes.func.isRequired,
  markChoiceActive: PropTypes.func.isRequired,
  choice: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
  text: PropTypes.string,
  mostSelected: PropTypes.bool,
};

Choice.defaultProps = {
  text: 'Hamburgefonstiv - Abc 123',
  mostSelected: false,
};

export default Choice;
