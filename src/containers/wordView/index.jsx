// @flow
import React from 'react';
import PropTypes from 'prop-types';
import './WordView.css';

const WordView = (props) => (
  <div className="WordView">
    <p className="text">
      {props.word}
    </p>
  </div>
);


WordView.propTypes = {
  word: PropTypes.string.isRequired,
};

WordView.defaultProps = {
  word: 'Hello prototypo',
};

export default WordView;
