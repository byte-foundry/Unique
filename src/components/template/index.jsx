// @flow
import React from 'react';
import PropTypes from 'prop-types';
import './Template.css';

class Template extends React.Component {
  render() {
    return (
      <div
        key={`preset${this.props.font.variant.family.name}${this.props.font.variant.name}`}
        className={`Template ${this.props.selected ? "selected" : ""}`}
        onClick={this.props.onClick}
        onDoubleClick={this.props.onDoubleClick}
        style={{ fontFamily: `'${this.props.font.variant.family.name}${this.props.font.variant.name}'` }}
      >
        {this.props.font.variant.family.name}
        <p className="templateName">{`Font preset ${this.props.index}`}</p>
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
