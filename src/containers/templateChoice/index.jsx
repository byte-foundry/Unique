// @flow
import React from "react";
import { bindActionCreators } from "redux";
import { push } from "react-router-redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import FlipMove from "react-flip-move";
import { FormattedMessage } from "react-intl";
import unorphan from "unorphan";
import { Shortcuts } from "react-shortcuts";
import "./TemplateChoice.css";
import Template from "../../components/template/";

import { selectFont } from "../../data/font";
import { isDblTouchTap } from "../../data/constants";

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
    window.scrollTo(0, 0);
    unorphan("h1, h2, h3, p, span");
  }
  handleShortcuts(action) {
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
            <div className="row">
              <div className="col-sm-12 col-md-11 col-lg-10">
                <h1>
                  <FormattedMessage
                    id="TemplateChoice.title"
                    defaultMessage="Pick one of our templates and get started!"
                    description="TemplateChoice page title"
                  />
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="pagination">
                  <span
                    className="pagination-prev"
                    onClick={() => {
                      this.props.redirectToHome();
                    }}
                  >
                    <FormattedMessage
                      id="App.prevAction"
                      defaultMessage="Back"
                      description="Back"
                    />
                  </span>
                  <span
                    className={`pagination-next ${
                      !(this.state.templateIndex >= 0) ? "disabled" : ""
                    }`}
                    onClick={() => {
                      if (this.state.templateIndex >= 0) {
                        this.props.selectFont(
                          this.props.presets[this.state.templateIndex]
                        );
                      }
                    }}
                  >
                    <FormattedMessage
                      id="App.nextAction"
                      defaultMessage="Next"
                      description="Next"
                    />
                  </span>
                </div>
              </div>
            </div>
            <div className="template-wrapper">
              <FlipMove
                className="templates row"
                duration={300}
                delay={800}
                staggerDelayBy={50}
                easing="ease-out"
                appearAnimation="fade"
                enterAnimation={undefined}
                leaveAnimation="none"
              >
                {this.props.presets.map((font, index) => (
                  <div className="col-sm-9 col-md-10 col-lg-6" key={`Template${font.variant.family.name}${font.variant.name}`}>
                    <Template
                      font={font}
                      onClick={() => this.setState({ templateIndex: index })}
                      onDoubleClick={() =>
                        this.props.selectFont(this.props.presets[index])
                      }
                      onTouchTap={
                        (e) => {
                          if (isDblTouchTap(e)) {
                            this.props.selectFont(this.props.presets[index]);
                          } else {
                            this.setState({ templateIndex: index });
                          }
                        } 
                      }
                      selected={
                        this.state.templateIndex !== -1 &&
                        `${
                          this.props.presets[this.state.templateIndex].variant
                            .family.name
                        }${
                          this.props.presets[this.state.templateIndex].variant
                            .name
                        }` === `${font.variant.family.name}${font.variant.name}`
                      }
                      text={this.props.chosenWord}
                      mostSelected={isMostSelected(this.props.presets, font)}
                      isLoading={this.props.isLoading}
                      index={index + 1}                      
                    />
                  </div>
                ))}
              </FlipMove>
            </div>
            {this.props.isLoading ? <h2>Loading font...</h2> : false}
          </div>
        </div>
      </Shortcuts>
    );
  }
}

const mapStateToProps = state => ({
  presets: state.presets.filteredPresets,
  isLoading: state.font.isLoading,
  chosenWord: state.user.chosenWord
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { selectFont, redirectToHome: () => push("/app/") },
    dispatch
  );

TemplateChoice.propTypes = {
  selectFont: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  redirectToHome: PropTypes.func.isRequired,
  chosenWord: PropTypes.string
};

TemplateChoice.defaultProps = {
  chosenWord: "Hamburgefonstiv - Abc 123"
};

export default connect(mapStateToProps, mapDispatchToProps)(TemplateChoice);
