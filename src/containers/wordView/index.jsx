// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ContentEditable from '../../components/contentEditable/';
import { storeChosenWord } from '../../data/user';
import { DEFAULT_UI_WORD } from '../../data/constants';
import './WordView.css';

class WordView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: props.word,
    };
  }
  render() {
    return (
      <div className="WordView">
        <p className="text" style={{ fontFamily: this.props.fontName }}>
          <ContentEditable
            html={`<span>${this.state.word}</span>`}
            disabled={false}
            onChange={(event) => {
              this.props.storeChosenWord(
                event.target.value.replace(/<\/?span[^>]*>/g, '').replace(/(<|&lt;)br\s*\/*(>|&gt;)/g, ''),
              );
            }}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
          />
        </p>
      </div>
    );
  }
}

WordView.propTypes = {
  word: PropTypes.string,
  fontName: PropTypes.string,
  storeChosenWord: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
};

WordView.defaultProps = {
  word: DEFAULT_UI_WORD,
  fontName: 'ptypo',
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      storeChosenWord,
    },
    dispatch,
  );
const mapStateToProps = state => ({
  fontName: state.font.currentPreset.preset + state.font.currentPreset.variant,
});

export default connect(mapStateToProps, mapDispatchToProps)(WordView);
