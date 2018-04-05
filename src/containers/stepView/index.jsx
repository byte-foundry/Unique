// @flow
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import FlipMove from "react-flip-move";
import { Shortcuts } from "react-shortcuts";
import { FormattedMessage } from "react-intl";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";
import {
  stepBack,
  selectChoice,
  updateSliderFont,
  finishEditing,
  goToStep
} from "../../data/font";
import { storeChosenWord, storeChosenGlyph ,
  switchBlackOnWhite,
  switchGlyphMode, } from "../../data/user";
import Choice from "../../components/choice/";
import WordView from "../wordView/";
import Sliders from "../sliders/";
import Button from "../../components/button/";
import "./StepView.css";

import { ReactComponent as Back } from "./back.svg";
import { ReactComponent as Next } from "./next.svg";
import { ReactComponent as Finish } from "./finish.svg";

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
    this.enableShortcuts = this.enableShortcuts.bind(this);
    this.disableShortcuts = this.disableShortcuts.bind(this);
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
  disableShortcuts() {
    this.setState({ isInputFocused: true });
  }
  enableShortcuts() {
    this.setState({ isInputFocused: false });
  }
  setChoiceSelected(props) {
    let choice = {};
    if (props.choicesMade[props.step - 1]) {
        choice = props.stepValues.choices.find(
          c => c.name === props.choicesMade[props.step - 1].name
        );
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
            const choiceIndex = this.props.stepValues.choices.findIndex(
              choice => choice.name === this.state.choice.name
            );
            if (choiceIndex <= 0) {
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
    console.log(this.props);
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
            <div className="row justify-content-md-between step-description">
              <div className="col-md-4 col-sm-12">
                <p className="step-name">{this.props.stepValues.name}</p>
              </div>
              <div className="col-md-4 col-sm-12">
                <div className="step-bubbles">
                  {[...Array(this.props.stepLength)].map((e, i) => (
                    <span
                      className={`step-bubble ${
                        this.props.step > i || this.props.choicesMade[i]
                          ? "past"
                          : ""
                      } ${i === this.props.step - 1 ? "current" : ""}`}
                      onClick={() => {
                        if (this.props.step > i || this.props.choicesMade[i]) {
                          this.props.goToStep(i + 1);
                        }
                      }}
                      key={`stepbubble-${i}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-sm-12 choices-wrapper">
                <FormattedMessage
                  id="Shortcuts.chooseChoice"
                  defaultMessage="Press up and down keys to choose the most suitable option"
                  description="Shortcut - up down choice action"
                >
                  {text => (
                    <Tooltip
                      title={text}
                      position="top"
                      open={this.props.shouldShowTooltips}
                      arrow="true"
                      delay={200}
                    >
                      <FlipMove
                        className="choices row"
                        duration={250}
                        delay={150}
                        staggerDelayBy={50}
                        easing="ease-out"
                        appearAnimation={undefined}
                        enterAnimation="fade"
                        leaveAnimation="none"
                      >
                        {this.props.stepValues.choices.map((choice, index) => (
                          <div
                            className={`${
                              this.props.isGlyphMode ? "col-sm-4" : "col-sm-12"
                            }`}
                          >
                            <Choice
                              choice={choice}
                              key={`${choice.name}${choice.id}`}
                              markChoiceActive={this.markChoiceActive}
                              selectChoice={this.props.selectChoice}
                              index={index}
                              selected={this.state.choice === choice}
                              text={this.props.chosenWord}
                              glyph={this.props.chosenGlyph}
                              mostSelected={
                                this.state.mostSelected === choice.id
                              }
                              isBlackOnWhite={this.props.isBlackOnWhite}
                              isGlyphMode={this.props.isGlyphMode}
                              storeChosenWord={this.props.storeChosenWord}
                              storeChosenGlyph={this.props.storeChosenGlyph}
                              disableShortcuts={this.disableShortcuts}
                              enableShortcuts={this.enableShortcuts}
                              fontSize={this.props.fontSize}
                            />
                          </div>
                        ))}
                      </FlipMove>
                    </Tooltip>
                  )}
                </FormattedMessage>

                <FormattedMessage
                  id="Shortcuts.previousAction"
                  defaultMessage="Press left key to go back"
                  description="Shortcut - previous action"
                >
                  {text => (
                    <div className="icon-back-wrapper">
                      <Tooltip
                        title={text}
                        position="top"
                        open={this.props.shouldShowTooltips}
                        arrow="true"
                        delay={200}
                      >
                        <Back
                          className="icon-back"
                          onClick={() => {
                            this.props.stepBack();
                          }}
                        />
                      </Tooltip>
                    </div>
                  )}
                </FormattedMessage>

                <FormattedMessage
                  id="Shortcuts.nextAction"
                  defaultMessage="Press right key to move forward"
                  description="Shortcut - next action"
                >
                  {text => (
                    <div className="icon-next-wrapper">
                      <Tooltip
                        title={text}
                        position="top"
                        open={this.props.shouldShowTooltips}
                        arrow="true"
                        delay={200}
                      >
                        <Next
                          className={`icon-next ${
                            !(this.state.choice && this.state.choice.name)
                              ? "disabled"
                              : ""
                          }`}
                          onClick={() => {
                            if (this.state.choice && this.state.choice.name) {
                              this.props.selectChoice(this.state.choice);
                            }
                          }}
                        />
                      </Tooltip>
                    </div>
                  )}
                </FormattedMessage>
                <Finish
                  className={`icon-finish ${
                    this.props.choicesMade.length === this.props.stepLength
                      ? ""
                      : "disabled"
                  }`}
                  onClick={() => {
                    if (
                      this.props.choicesMade.length === this.props.stepLength
                    ) {
                      this.props.finishEditing(this.state.choice);
                    }
                  }}
                />
              </div>
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
  chosenGlyph: state.user.chosenGlyph,
  isBlackOnWhite: state.user.isBlackOnWhite,
  isGlyphMode: state.user.isGlyphMode,
  stepLength: state.font.currentPreset.steps.length,
  shouldShowTooltips: state.ui.shouldShowTooltips,
  fontSize: state.user.fontSize
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      stepBack,
      selectChoice,
      updateSliderFont,
      finishEditing,
      storeChosenWord,
      storeChosenGlyph,
      goToStep,      
      switchBlackOnWhite,
      switchGlyphMode,
    },
    dispatch
  );

StepView.propTypes = {
  stepBack: PropTypes.func.isRequired,
  selectChoice: PropTypes.func.isRequired,
  finishEditing: PropTypes.func.isRequired,
  updateSliderFont: PropTypes.func.isRequired,
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
  chosenGlyph: PropTypes.string.isRequired,
  isGlyphMode: PropTypes.bool.isRequired,
  isBlackOnWhite: PropTypes.bool.isRequired,
  storeChosenWord: PropTypes.func.isRequired,
  storeChosenGlyph: PropTypes.func.isRequired,
  shouldShowTooltips: PropTypes.bool.isRequired,
  fontSize: PropTypes.number.isRequired,
  goToStep: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(StepView);
