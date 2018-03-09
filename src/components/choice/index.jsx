// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ContentEditable from '../contentEditable';
import './Choice.css';
import { ReactComponent as PencilIcon } from './pencil.svg';

class Choice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
      isEditable: false,
    };
  }
  render() {
    return (
      <div
        className={`Choice ${this.props.selected ? 'selected' : ''}  ${
          this.props.isGlyphMode ? 'col-sm-4' : 'auto'
        } ${this.props.isBlackOnWhite ? '' : 'whiteOnBlack'} ${
          this.props.isGlyphMode ? 'glyphMode' : ''
        }`}
        key={this.props.choice.name}
        onClick={() => this.props.markChoiceActive(this.props.choice)}
        onDoubleClick={() => this.props.selectChoice(this.props.choice)}
        role="option"
        aria-checked="false"
        aria-selected="false"
        tabIndex={0}
        style={{ fontFamily: `choiceFont${this.props.index}` }}
        onMouseEnter={() => {
          this.setState({ isHovered: true });
        }}
        onMouseLeave={() => {
          this.setState({ isHovered: false });
        }}
      >

        <ContentEditable
          html={this.props.isGlyphMode ? this.props.glyph : this.props.text}
          disabled={!this.state.isEditable}
          onChange={(event) => {
            this.props.isGlyphMode
              ? this.props.storeChosenGlyph(event.target.value
                    .replace(/<\/?span[^>]*>/g, '')
                    .replace(/(<|&lt;)br\s*\/*(>|&gt;)/g, ''))
              : this.props.storeChosenWord(event.target.value
                    .replace(/<\/?span[^>]*>/g, '')
                    .replace(/(<|&lt;)br\s*\/*(>|&gt;)/g, ''));
          }}
          onBlur={() => {
            this.props.enableShortcuts();
            this.setState({ isEditable: false });
          }}
          onFocus={() => {
            this.props.disableShortcuts();
          }}
          onClick={() => {
            this.props.disableShortcuts();
          }}
          onDoubleClick={() => {
            this.props.selectChoice(this.props.choice);
          }}
          ref={c => (this.contentEditable = c)}
        />
        {this.state.isHovered && (
          <PencilIcon
            className="icon-pencil"
            onClick={() => {
              const isEditable = this.state.isEditable;
              this.setState({ isEditable: !isEditable });
              if (!isEditable) {
                ReactDOM.findDOMNode(this.contentEditable).focus();
              }
            }}
          />
        )}
        <p className="choiceName">{this.props.choice.name}</p>
        {this.props.mostSelected ? <span className="" /> : false}
      </div>
    );
  }
}

Choice.propTypes = {
  selectChoice: PropTypes.func.isRequired,
  markChoiceActive: PropTypes.func.isRequired,
  choice: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
  text: PropTypes.string,
  glyph: PropTypes.string,
  mostSelected: PropTypes.bool,
  isBlackOnWhite: PropTypes.bool.isRequired,
  isGlyphMode: PropTypes.bool.isRequired,
  storeChosenWord: PropTypes.func.isRequired,
  storeChosenGlyph: PropTypes.func.isRequired,
  enableShortcuts: PropTypes.func.isRequired,
  disableShortcuts: PropTypes.func.isRequired,
};

Choice.defaultProps = {
  text: 'Hamburgefonstiv - Abc 123',
  glyph: 'g',
  mostSelected: false,
};

export default Choice;
