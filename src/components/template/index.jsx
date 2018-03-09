// @flow
import React from "react";
import PropTypes from "prop-types";
import "./Template.css";

class Template extends React.Component {
  render() {
    return (
      <div
        tabIndex={0}
        key={`preset${this.props.font.preset}${this.props.font.variant}`}
        className={`Template ${this.props.selected ? "selected" : ""} col-sm-12 col-md-11 col-lg-10`}
        onClick={this.props.onClick}
        onDoubleClick={this.props.onDoubleClick}
        style={{ fontFamily: `'${this.props.font.preset}${this.props.font.variant}'` }}
      >
        {this.props.text}
        <p className="templateName">{this.props.font.preset}</p>
      </div>
    );
  }
}

Template.propTypes = {
  font: PropTypes.shape({
    preset: PropTypes.string.isRequired,
    variant: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
  text: PropTypes.string,
  mostSelected: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired
};

Template.defaultProps = {
  text: "Hamburgefonstiv - Abc 123",
  mostSelected: false
};

export default Template;
