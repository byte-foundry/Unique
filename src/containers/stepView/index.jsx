// @flow
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import FlipMove from "react-flip-move";
import { Shortcuts } from "react-shortcuts";
import {
  stepForward,
  stepBack,
  selectChoice,
  updateSliderFont,
  finishEditing,
  resetStep
} from "../../data/font";
import { switchBlackOnWhite, switchGlyphMode } from "../../data/user";
import Choice from "../../components/choice/";
import WordView from "../wordView/";
import Sliders from "../sliders/";
import Button from "../../components/button/";
import "./StepView.css";

import { ReactComponent as Back } from "./back.svg";
import { ReactComponent as Next } from "./next.svg";
import { ReactComponent as Finish } from "./finish.svg";
import { ReactComponent as BackgroundIcon } from "./background.svg";
import { ReactComponent as GlyphIcon } from "./glyph.svg";

const isMostSelected = choices => {
  let most = choices[0].id;
  let value = 0;
  choices.forEach(choice => {
    if (choice.selected > value) {
      value = choice.selected;
      most = choice.id;
    }
  });
  return value > 0 && most;
};

class StepView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      choice: props.choicesMade[props.step],
      isInputFocused: false
    };

    this.markChoiceActive = choice => {
      this.setState({ choice });
    };

    this.onUpdate = updatedParam => {
      const currentParams = this.state.choice;
      this.props.updateSliderFont(updatedParam);
      currentParams.values[updatedParam.name] = parseFloat(updatedParam.value);
      this.setState({ choice: currentParams });
      return true;
    };
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.handleShortcuts = this.handleShortcuts.bind(this);
    this.setChoiceSelected = this.setChoiceSelected.bind(this);
  }
  componentWillMount() {
    this.setChoiceSelected(this.props);
  }
  componentDidMount() {
    this.stepViewWrapper.focus();
  }
  componentWillReceiveProps(newProps) {
    this.setChoiceSelected(newProps);
  }
  onFocus() {
    this.setState({ isInputFocused: true });
  }
  onBlur() {
    this.setState({ isInputFocused: false });
  }
  setChoiceSelected(props) {
    let choice = {};
    if (props.choicesMade[props.step]) {
      if (props.choicesMade[props.step].name === "Custom") {
        choice = {
          name: props.choicesMade[props.step].name,
          values: { ...props.choicesMade[props.step] }
        };
        delete choice.values.name;
      } else {
        choice = props.stepValues.choices.find(
          c => c.name === props.choicesMade[props.step].name
        );
      }
    }
    this.setState({
      choice,
      mostSelected: isMostSelected(props.stepValues.choices)
    });
  }
  handleShortcuts(action, event) {
    if (!this.state.isInputFocused) {
      switch (action) {
        case "CHOICE_PREVIOUS":
          if (this.state.choice) {
            if (this.state.choice.name === "Custom") {
              this.setState({ choice: { name: "No choice", values: {} } });
              break;
            }

            const choiceIndex = this.props.stepValues.choices.findIndex(
              choice => choice.name === this.state.choice.name
            );
            if (this.state.choice.name === "No choice") {
              this.setState({
                choice: this.props.stepValues.choices[
                  this.props.stepValues.choices.length - 1
                ]
              });
              break;
            }
            if (choiceIndex === 0) {
              this.setState({
                choice: this.props.stepValues.choices[
                  this.props.stepValues.choices.length - 1
                ]
              });
              break;
            } else {
              this.setState({
                choice: this.props.stepValues.choices[choiceIndex - 1]
              });
              break;
            }
          } else {
            this.setState({
              choice: this.props.stepValues.choices[
                this.props.stepValues.choices.length - 1
              ]
            });
            break;
          }
        case "CHOICE_NEXT":
          if (this.state.choice) {
            if (this.state.choice.name === "Custom") {
              this.setState({ choice: this.props.stepValues.choices[0] });
              break;
            }
            if (this.state.choice.name === "No choice") {
              this.setState({ choice: this.props.stepValues.choices[0] });
              break;
            }
            const choiceIndex = this.props.stepValues.choices.findIndex(
              choice => choice.name === this.state.choice.name
            );
            if (choiceIndex + 1 >= this.props.stepValues.choices.length) {
              this.setState({ choice: this.props.stepValues.choices[0] });
              break;
            } else {
              this.setState({
                choice: this.props.stepValues.choices[choiceIndex + 1]
              });
              break;
            }
          } else {
            this.setState({ choice: this.props.stepValues.choices[0] });
            break;
          }
        case "CHOICE_CUSTOM":
          if (this.state.choice && this.state.choice.name === "Custom") {
            this.setState({ choice: { name: "No choice", values: {} } });
          } else {
            this.markChoiceActive({ name: "Custom", values: {} });
          }
          break;
        case "CHOICE_SELECT":
          this.props.selectChoice(this.state.choice);
          break;
        case "STEP_BACK":
          this.props.stepBack();
          break;
        case "BW_MODE":
          this.props.switchBlackOnWhite();
          break;
        case "GLYPH_MODE":
          this.props.switchGlyphMode();
          break;
        case "FINISH_FONT":
          this.props.finishEditing();
          break;
        default:
          break;
      }
    }
  }
  render() {
    return (
      <Shortcuts name="CHOICES" handler={this.handleShortcuts}>
        <div
          className={`StepView ${
            this.props.isBlackOnWhite ? "" : "whiteOnBlack"
          }`}
          ref={c => {
            this.stepViewWrapper = c;
          }}
          tabIndex="-1"
        >
          <div className="container">
            <Back
              className="icon-back"
              onClick={() => {
                this.props.stepBack();
              }}
            />
            <FlipMove
              className="choices row"
              duration={250}
              delay={150}
              staggerDelayBy={50}
              easing="ease-out"
              appearAnimation={undefined}
              enterAnimation={"fade"}
              leaveAnimation={"none"}
            >
              {this.props.stepValues.choices.map((choice, index) => (
                <Choice
                  choice={choice}
                  key={`${choice.name}${choice.id}`}
                  markChoiceActive={this.markChoiceActive}
                  selectChoice={this.props.selectChoice}
                  index={index}
                  selected={this.state.choice === choice}
                  text={this.props.chosenWord}
                  mostSelected={this.state.mostSelected === choice.id}
                  isBlackOnWhite={this.props.isBlackOnWhite}
                  isGlyphMode={this.props.isGlyphMode}
                />
              ))}
              <div
                className={`Choice choiceMore ${
                  this.state.choice && this.state.choice.name === "Custom"
                    ? "selected"
                    : ""
                } col-sm-${this.props.isGlyphMode ? "4 glyphMode" : "12"}`}
                role="option"
                aria-checked="false"
                aria-selected="false"
                tabIndex={0}
                key={`choiceCustom${this.props.step}`}
                onDoubleClick={() => this.props.selectChoice(this.state.choice)}
              >
                {this.props.isGlyphMode ? "g" : this.props.chosenWord}
                <p className="choiceName">Custom</p>
              </div>
            </FlipMove>
            {this.state.choice && this.state.choice.name === "Custom" ? (
              <Sliders onUpdate={this.onUpdate} />
            ) : (
              false
            )}
            <Next
              className={`icon-next ${
                !(this.state.choice && this.state.choice.name) ? "disabled" : ""
              }`}
              onClick={() => {
                if (this.state.choice && this.state.choice.name)
                  this.props.selectChoice(this.state.choice);
              }}
            />
            <Finish
              className={`icon-finish ${
                this.props.choicesMade.length - 1 === this.props.stepLength
                  ? ""
                  : "disabled"
              }`}
              onClick={() => {
                if (this.props.choicesMade.length - 1 === this.props.stepLength)
                  this.props.finishEditing(this.state.choice);
              }}
            />
            <div className="actions">
              <span className="previousStep">
                <Button
                  className="hollow"
                  mode="isConfigure"
                  label={
                    this.state.choice && this.state.choice.name === "Custom"
                      ? "Less accuracy"
                      : "More accuracy"
                  }
                  onClick={() =>
                    this.state.choice && this.state.choice.name === "Custom"
                      ? this.markChoiceActive({ name: undefined, values: {} })
                      : this.markChoiceActive({ name: "Custom", values: {} })
                  }
                />
              </span>
              <span className="controls">
                <BackgroundIcon
                  className="icon-background"
                  onClick={() => this.props.switchBlackOnWhite()}
                />
                <GlyphIcon
                  className="icon-glyph"
                  onClick={() => this.props.switchGlyphMode()}
                />
              </span>
            </div>
          </div>
        </div>
      </Shortcuts>
    );
  }
}

const mapStateToProps = state => ({
  stepValues: state.font.currentPreset.steps[state.font.step - 1],
  step: state.font.step,
  choicesMade: state.font.choicesMade,
  chosenWord: state.user.chosenWord,
  isBlackOnWhite: state.user.isBlackOnWhite,
  isGlyphMode: state.user.isGlyphMode,
  stepLength: state.font.currentPreset.steps.length
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      stepForward,
      stepBack,
      selectChoice,
      updateSliderFont,
      finishEditing,
      resetStep,
      switchBlackOnWhite,
      switchGlyphMode
    },
    dispatch
  );

StepView.propTypes = {
  stepForward: PropTypes.func.isRequired,
  stepBack: PropTypes.func.isRequired,
  selectChoice: PropTypes.func.isRequired,
  finishEditing: PropTypes.func.isRequired,
  updateSliderFont: PropTypes.func.isRequired,
  resetStep: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  stepLength: PropTypes.number.isRequired,
  choicesMade: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  stepValues: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    choices: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired
      })
    )
  }).isRequired,
  chosenWord: PropTypes.string.isRequired,
  switchBlackOnWhite: PropTypes.func.isRequired,
  switchGlyphMode: PropTypes.func.isRequired,
  isGlyphMode: PropTypes.bool.isRequired,
  isBlackOnWhite: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(StepView);
