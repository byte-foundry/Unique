// @flow
import React from 'react';
import PropTypes from 'prop-types';
import './Template.css';
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}
class Template extends React.Component {  
  render() {
    let tags = [...this.props.font.tags];
    shuffleArray(tags);
    return (
      <div
        key={`preset${this.props.font.variant.family.name}${this.props.font.variant.name}`}
        className={`Template ${this.props.selected ? "selected" : ""}`}
        onClick={this.props.onClick}
        onDoubleClick={this.props.onDoubleClick}
        style={{ fontFamily: `'${this.props.font.variant.family.name}${this.props.font.variant.name}'` }}
      >
        {tags[0]}
        <p className="templateName">{`${tags[1]}, ${tags[2]}`}</p>
      </div>
    );
  }
}

Template.propTypes = {
  font: PropTypes.shape({
    preset: PropTypes.string.isRequired,
    variant: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
  text: PropTypes.string,
  mostSelected: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
};

Template.defaultProps = {
  text: 'Hamburgefonstiv - Abc 123',
  mostSelected: false,
};

export default Template;
