// @flow
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';
import { Shortcuts } from 'react-shortcuts';
import { FormattedMessage } from 'react-intl';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';
import {
  stepBack,
  selectChoice,
  updateSliderFont,
  finishEditing,
} from '../../data/font';
import {
  switchBlackOnWhite,
  switchGlyphMode,
  storeChosenWord,
  storeChosenGlyph,
} from '../../data/user';
import Choice from '../../components/choice/';
import WordView from '../wordView/';
import Sliders from '../sliders/';
import Button from '../../components/button/';
import './StepView.css';

import { ReactComponent as Back } from './back.svg';
import { ReactComponent as Next } from './next.svg';
import { ReactComponent as Finish } from './finish.svg';
import { ReactComponent as BackgroundIcon } from './background.svg';
import { ReactComponent as GlyphIcon } from './glyph.svg';

const isMostSelected = (choices) => {
  let most = choices[0].id;
  let value = 0;
  choices.forEach((choice) => {
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
      isInputFocused: false,
    };

    this.markChoiceActive = (choice) => {
      this.setState({ choice });
    };

    this.onUpdate = (updatedParam) => {
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
    if (props.choicesMade[props.step]) {
      if (props.choicesMade[props.step].name === 'Custom') {
        choice = {
          name: props.choicesMade[props.step].name,
          values: { ...props.choicesMade[props.step] },
        };
        delete choice.values.name;
      } else {
        choice = props.stepValues.choices.find(c => c.name === props.choicesMade[props.step].name);
      }
    }
    this.setState({
      choice,
      mostSelected: isMostSelected(props.stepValues.choices),
    });
  }
  handleShortcuts(action, event) {
    if (!this.state.isInputFocused) {
      switch (action) {
        case 'CHOICE_PREVIOUS':
          if (this.state.choice) {
            if (this.state.choice.name === 'Custom') {
              this.setState({ choice: { name: 'No choice', values: {} } });
              break;
            }

            const choiceIndex = this.props.stepValues.choices.findIndex(choice => choice.name === this.state.choice.name);
            if (this.state.choice.name === 'No choice') {
              this.setState({
                choice: this.props.stepValues.choices[
                  this.props.stepValues.choices.length - 1
                ],
              });
              break;
            }
            if (choiceIndex === 0) {
              this.setState({
                choice: this.props.stepValues.choices[
                  this.props.stepValues.choices.length - 1
                ],
              });
              break;
            } else {
              this.setState({
                choice: this.props.stepValues.choices[choiceIndex - 1],
              });
              break;
            }
          } else {
            this.setState({
              choice: this.props.stepValues.choices[
                this.props.stepValues.choices.length - 1
              ],
            });
            break;
          }
        case 'CHOICE_NEXT':
          if (this.state.choice) {
            if (this.state.choice.name === 'Custom') {
              this.setState({ choice: this.props.stepValues.choices[0] });
              break;
            }
            if (this.state.choice.name === 'No choice') {
              this.setState({ choice: this.props.stepValues.choices[0] });
              break;
            }
            const choiceIndex = this.props.stepValues.choices.findIndex(choice => choice.name === this.state.choice.name);
            if (choiceIndex + 1 >= this.props.stepValues.choices.length) {
              this.setState({ choice: this.props.stepValues.choices[0] });
              break;
            } else {
              this.setState({
                choice: this.props.stepValues.choices[choiceIndex + 1],
              });
              break;
            }
          } else {
            this.setState({ choice: this.props.stepValues.choices[0] });
            break;
          }
        case 'CHOICE_CUSTOM':
          if (this.state.choice && this.state.choice.name === 'Custom') {
            this.setState({ choice: { name: 'No choice', values: {} } });
          } else {
            this.markChoiceActive({ name: 'Custom', values: {} });
          }
          break;
        case 'CHOICE_SELECT':
          this.props.selectChoice(this.state.choice);
          break;
        case 'STEP_BACK':
          this.props.stepBack();
          break;
        case 'BW_MODE':
          this.props.switchBlackOnWhite();
          break;
        case 'GLYPH_MODE':
          this.props.switchGlyphMode();
          break;
        case 'FINISH_FONT':
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
            this.props.isBlackOnWhite ? '' : 'whiteOnBlack'
          }`}
          ref={(c) => {
            this.stepViewWrapper = c;
          }}
          tabIndex="-1"
        >
          <div className="container">
            <div className="row justify-content-sm-center">
              <div className="col-sm-12 col-md-11 col-lg-10">
                <FormattedMessage
                  id="Shortcuts.previousAction"
                  defaultMessage="Press left key to go back"
                  description="Shortcut - previous action"
                >
                  {text => (
                    <Tooltip
                      title={text}
                      position="top"
                      open={this.props.showShortcutTooltips}
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
                  )}
                </FormattedMessage>

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
                    <Choice
                      choice={choice}
                      key={`${choice.name}${choice.id}`}
                      markChoiceActive={this.markChoiceActive}
                      selectChoice={this.props.selectChoice}
                      index={index}
                      selected={this.state.choice === choice}
                      text={this.props.chosenWord}
                      glyph={this.props.chosenGlyph}
                      mostSelected={this.state.mostSelected === choice.id}
                      isBlackOnWhite={this.props.isBlackOnWhite}
                      isGlyphMode={this.props.isGlyphMode}
                      storeChosenWord={this.props.storeChosenWord}
                      storeChosenGlyph={this.props.storeChosenGlyph}
                      disableShortcuts={this.disableShortcuts}
                      enableShortcuts={this.enableShortcuts}
                    />
                  ))}
                  <div
                    className={`Choice choiceMore ${
                      this.state.choice && this.state.choice.name === 'Custom'
                        ? 'selected'
                        : ''
                    } col-sm-${this.props.isGlyphMode ? '4 glyphMode' : '12'}`}
                    role="option"
                    aria-checked="false"
                    aria-selected="false"
                    tabIndex={0}
                    key={`choiceCustom${this.props.step}`}
                    onDoubleClick={() =>
                      this.props.selectChoice(this.state.choice)
                    }
                  >
                    {this.props.isGlyphMode ? 'g' : this.props.chosenWord}
                    <p className="choiceName">
                      <FormattedMessage
                        id="StepView.customChoiceName"
                        defaultMessage="Custom"
                        description="Custom choice name"
                      />
                    </p>
                  </div>
                </FlipMove>
                {this.state.choice && this.state.choice.name === 'Custom' ? (
                  <Sliders onUpdate={this.onUpdate} />
                ) : (
                  false
                )}
<<<<<<< HEAD

                <FormattedMessage
                  id="Shortcuts.nextAction"
                  defaultMessage="Press right key to move forward"
                  description="Shortcut - next action"
                >
                  {text => (
                    <Tooltip
                      title={text}
                      position="top"
                      open={this.props.showShortcutTooltips}
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
                          if (this.state.choice && this.state.choice.name)
                            this.props.selectChoice(this.state.choice);
                        }}
                      />
                    </Tooltip>
                  )}
                </FormattedMessage>

=======
                <Next
                  className={`icon-next ${
                    !(this.state.choice && this.state.choice.name)
                      ? 'disabled'
                      : ''
                  }`}
                  onClick={() => {
                    if (this.state.choice && this.state.choice.name) { this.props.selectChoice(this.state.choice); }
                  }}
                />
>>>>>>> 8caa9af7d531ca7dc18b2790c768c06cd05e7317
                <Finish
                  className={`icon-finish ${
                    this.props.choicesMade.length - 1 === this.props.stepLength
                      ? ''
                      : 'disabled'
                  }`}
                  onClick={() => {
                    if (
                      this.props.choicesMade.length - 1 ===
                      this.props.stepLength
                    ) { this.props.finishEditing(this.state.choice); }
                  }}
                />
                <div className="actions">
                  <span className="previousStep">
                    {this.state.choice &&
                    this.state.choice.name === 'Custom' ? (
                      <FormattedMessage
                        id="StepView.customButtonLess"
                        defaultMessage="Less accuracy"
                        description="More accuracy button - less state"
                      >
                        {text => (
                          <Button
                            className="hollow"
                            mode="isConfigure"
                            label={text}
                            onClick={() =>
                              this.markChoiceActive({
                                name: undefined,
                                values: {},
                              })
                            }
                          />
                        )}
                      </FormattedMessage>
                    ) : (
                      <FormattedMessage
                        id="StepView.customButtonMore"
                        defaultMessage="More accuracy"
                        description="More accuracy button - more state"
                      >
                        {text => (
                          <Button
                            className="hollow"
                            mode="isConfigure"
                            label={text}
                            onClick={() =>
                              this.markChoiceActive({
                                name: 'Custom',
                                values: {},
                              })
                            }
                          />
                        )}
                      </FormattedMessage>
                    )}
                  </span>
                  <span className="controls">
                    {this.props.isBlackOnWhite ? (
                      <FormattedMessage
                        id="StepView.blackOnWhiteTooltipOn"
                        defaultMessage="Toggle white on black mode"
                        description="Black on white mode - On State"
                      >
                        {text => (
                          <Tooltip
                            title={text}
                            position="top"
                            trigger="mouseenter"
                            arrow="true"
                            delay={600}
                          >
                            <BackgroundIcon
                              className="icon-background"
                              onClick={() => this.props.switchBlackOnWhite()}
                            />
                          </Tooltip>
                        )}
                      </FormattedMessage>
                    ) : (
                      <FormattedMessage
                        id="StepView.blackOnWhiteTooltipOff"
                        defaultMessage="Toggle black on white mode"
                        description="Black on white mode - Off State"
                      >
                        {text => (
                          <Tooltip
                            title={text}
                            position="top"
                            trigger="mouseenter"
                            arrow="true"
                            delay={600}
                          >
                            <BackgroundIcon
                              className="icon-background"
                              onClick={() => this.props.switchBlackOnWhite()}
                            />
                          </Tooltip>
                        )}
                      </FormattedMessage>
                    )}

                    {this.props.isGlyphMode ? (
                      <FormattedMessage
                        id="StepView.glyphTooltipOff"
                        defaultMessage="Toggle regular mode"
                        description="Glyph mode - Off State"
                      >
                        {text => (
                          <Tooltip
                            title={text}
                            position="top"
                            trigger="mouseenter"
                            arrow="true"
                            delay={600}
                          >
                            <GlyphIcon
                              className="icon-glyph"
                              onClick={() => this.props.switchGlyphMode()}
                            />
                          </Tooltip>
                        )}
                      </FormattedMessage>
                    ) : (
                      <FormattedMessage
                        id="StepView.glyphTooltipOn"
                        defaultMessage="Toggle glyph"
                        description="Glyph mode - On State"
                      >
                        {text => (
                          <Tooltip
                            title={text}
                            position="top"
                            trigger="mouseenter"
                            arrow="true"
                            delay={600}
                          >
                            <GlyphIcon
                              className="icon-glyph"
                              onClick={() => this.props.switchGlyphMode()}
                            />
                          </Tooltip>
                        )}
                      </FormattedMessage>
                    )}
                  </span>
                </div>
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
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      stepBack,
      selectChoice,
      updateSliderFont,
      finishEditing,
      switchBlackOnWhite,
      switchGlyphMode,
      storeChosenWord,
      storeChosenGlyph,
    },
    dispatch,
  );

StepView.propTypes = {
  stepBack: PropTypes.func.isRequired,
  selectChoice: PropTypes.func.isRequired,
  finishEditing: PropTypes.func.isRequired,
  updateSliderFont: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  stepLength: PropTypes.number.isRequired,
  choicesMade: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,
  stepValues: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    choices: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
    })),
  }).isRequired,
  chosenWord: PropTypes.string.isRequired,
  chosenGlyph: PropTypes.string.isRequired,
  switchBlackOnWhite: PropTypes.func.isRequired,
  switchGlyphMode: PropTypes.func.isRequired,
  isGlyphMode: PropTypes.bool.isRequired,
  isBlackOnWhite: PropTypes.bool.isRequired,
  storeChosenWord: PropTypes.func.isRequired,
  storeChosenGlyph: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(StepView);
