// @flow
import React from "react";
import { bindActionCreators } from "redux";
import { push } from "react-router-redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import FlipMove from "react-flip-move";
import { Shortcuts } from "react-shortcuts";
import "./TemplateChoice.css";
import Template from "../../components/template/";

import { selectFont } from "../../data/font";

import { ReactComponent as Back } from "../stepView/back.svg";
import { ReactComponent as Next } from "../stepView/next.svg";

const isMostSelected = (presets, font) => {
  let most = presets[0].id;
  let value = 0;
  presets.forEach(preset => {
    if (preset.selected > value) {
      value = preset.selected;
      most = preset.id;
    }
  });
  return font.id === most && value > 0;
};

class TemplateChoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      templateIndex: -1
    };
    this.handleShortcuts = this.handleShortcuts.bind(this);
  }
  componentDidMount() {
    this.templateChoiceWrapper.focus();
  }
  handleShortcuts(action, event) {
    switch (action) {
      case "CHOICE_PREVIOUS":
        if (this.state.templateIndex !== -1) {
          if (this.state.templateIndex === 0) {
            this.setState({ templateIndex: this.props.presets.length - 1 });
            break;
          } else {
            this.setState({ templateIndex: this.state.templateIndex - 1 });
            break;
          }
        } else {
          this.setState({ templateIndex: this.props.presets.length - 1 });
          break;
        }
      case "CHOICE_NEXT":
        if (this.state.templateIndex !== -1) {
          if (this.state.templateIndex === this.props.presets.length - 1) {
            this.setState({ templateIndex: 0 });
            break;
          } else {
            this.setState({ templateIndex: this.state.templateIndex + 1 });
            break;
          }
        } else {
          this.setState({ templateIndex: 0 });
          break;
        }
      case "CHOICE_SELECT":
        if (this.state.templateIndex !== -1 && !this.props.isLoading) {
          this.props.selectFont(this.props.presets[this.state.templateIndex]);
        }
        break;
      case "STEP_BACK":
        this.props.redirectToHome();
        break;
      default:
        break;
    }
  }
  render() {
    return (
      <Shortcuts name="CHOICES" handler={this.handleShortcuts}>
        <div
          className="TemplateChoice"
          ref={c => {
            this.templateChoiceWrapper = c;
          }}
          tabIndex="-1"
        >
          <div className="container">
            <Back
              className="icon-back"
              onClick={() => {
                this.props.redirectToHome();
              }}
            />
            <div className="row">
              <div className="col-sm-12">
                <h1>Select one of our templates and start editing!</h1>
              </div>
            </div>
            <div className="template-wrapper">
              <FlipMove
                className="choices row"
                duration={300}
                delay={800}
                staggerDelayBy={50}
                easing="ease-out"
                appearAnimation={"fade"}
                enterAnimation={undefined}
                leaveAnimation={"none"}
              >
                {this.props.presets.map((font, index) => {
                  return (
                    <Template
                      font={font}
                      onClick={() => this.setState({ templateIndex: index })}
                      onDoubleClick={() =>
                        this.props.selectFont(this.props.presets[index])
                      }
                      selected={
                        this.state.templateIndex !== -1 &&
                        `${
                          this.props.presets[this.state.templateIndex].preset
                        }${
                          this.props.presets[this.state.templateIndex].variant
                        }` === `${font.preset}${font.variant}`
                      }
                      text={this.props.chosenWord}
                      mostSelected={isMostSelected(this.props.presets, font)}
                      isLoading={this.props.isLoading}
                    />
                  );
                })}
              </FlipMove>
            </div>
            {this.props.isLoading ? <h2>Loading font...</h2> : false}
            <Next
              className={`icon-next ${
                !(this.state.templateIndex >= 0) ? "disabled" : ""
              }`}
              onClick={() => {
                if (this.state.templateIndex >= 0)
                  this.props.selectFont(
                    this.props.presets[this.state.templateIndex]
                  );
              }}
            />
          </div>
        </div>
      </Shortcuts>
    );
  }
}

const mapStateToProps = state => ({
  presets: state.presets.importedPresets,
  isLoading: state.font.isLoading,
  chosenWord: state.user.chosenWord
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ selectFont, redirectToHome: () => push("/") }, dispatch);

TemplateChoice.propTypes = {
  selectFont: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  redirectToHome: PropTypes.func.isRequired,
  presets: PropTypes.arrayOf(
    PropTypes.shape({
      preset: PropTypes.string.isRequired,
      variant: PropTypes.string.isRequired
    })
  ).isRequired,
  chosenWord: PropTypes.string
};

TemplateChoice.defaultProps = {
  chosenWord: "Hamburgefonstiv - Abc 123"
};

export default connect(mapStateToProps, mapDispatchToProps)(TemplateChoice);
