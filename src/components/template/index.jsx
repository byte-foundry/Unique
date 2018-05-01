// @flow
import React from "react";
import PropTypes from "prop-types";
import "./Template.css";
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
class Template extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: props.font.tags
    };
    this.shuffleTags = this.shuffleTags.bind(this);
  }
  componentDidMount() {
    this.shuffleTags();
  }
  shuffleTags() {
    let tags = this.state.tags;
    shuffleArray(tags);
    this.setState({ tags });
  }
  render() {
    let tags = [...this.state.tags];
    return (
      <div
        key={`preset${this.props.font.variant.family.name}${
          this.props.font.variant.name
        }`}
        className={`Template ${this.props.selected ? "selected" : ""}`}
        onClick={this.props.onClick}
        onDoubleClick={this.props.onDoubleClick}
        onTouchTap={this.props.onTouchTap}
        style={{
          fontFamily: `'${this.props.font.variant.family.name}${
            this.props.font.variant.name
          }'`
        }}
      >
        {tags[0]}
        <p className="templateName">
          {`${tags[1]}, ${tags[2]}`}
        </p>
      </div>
    );
  }
}

Template.propTypes = {
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
