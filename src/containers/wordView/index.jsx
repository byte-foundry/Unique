// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DEFAULT_UI_WORD } from '../../data/constants';
import './WordView.css';

const WordView = props => (
  <div className="WordView">
    <p className="text" style={{ fontFamily: props.fontName }}>
      {props.word}
    </p>
  </div>
);


WordView.propTypes = {
  word: PropTypes.string,
  fontName: PropTypes.string,
};

WordView.defaultProps = {
  word: DEFAULT_UI_WORD,
  fontName: 'ptypo',
};

const mapStateToProps = state => ({
  fontName: state.font.currentPreset.preset + state.font.currentPreset.variant,
});

export default connect(mapStateToProps)(WordView);
