// @flow
import React from 'react';
import PropTypes from 'prop-types';
import './Choice.css';

class Choice extends React.Component {
  render() {
    return (
      <div
        className={`Choice ${this.props.selected ? 'selected' : ''}  col-sm-${this.props.isGlyphMode ? '4' : '12'} ${this.props.isBlackOnWhite ? '' : 'whiteOnBlack'} ${this.props.isGlyphMode ? 'glyphMode' : ''}`}
        key={this.props.choice.name}
        onClick={() => this.props.markChoiceActive(this.props.choice)}
        onDoubleClick={() => this.props.selectChoice(this.props.choice)}
        role="option"
        aria-checked="false"
        aria-selected="false"
        tabIndex={0}
        style={{ fontFamily: `choiceFont${this.props.index}` }}
      >
        {this.props.isGlyphMode ? 'n' : this.props.text}
        <p className="choiceName">{this.props.choice.name}</p>
        {this.props.mostSelected ? (
          <span className=""/>
        ) : (
          false
        )}
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
  mostSelected: PropTypes.bool,
  isBlackOnWhite: PropTypes.bool.isRequired,
  isGlyphMode: PropTypes.bool.isRequired,
};

Choice.defaultProps = {
  text: 'Hamburgefonstiv - Abc 123',
  mostSelected: false,
};

export default Choice;
