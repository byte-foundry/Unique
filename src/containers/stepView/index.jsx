// @flow
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { stepForward, stepBack, selectChoice, updateSliderFont } from '../../data/font';
import Choice from '../../components/choice/';
import WordView from '../wordView/';
import Sliders from '../sliders/';
import Button from '../../components/button/';
import './StepView.css';

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
    };

    this.markChoiceActive = (choice) => {
      if (choice.name === this.state.choice.name) {
        this.setState({ choice: {} });
      } else this.setState({ choice });
    };

    this.onUpdate = (updatedParam) => {
      const currentParams = this.state.choice;
      this.props.updateSliderFont(updatedParam);
      currentParams.values[updatedParam.name] = parseFloat(updatedParam.value);
      this.setState({ choice: currentParams });
      return true;
    };
  }
  componentWillMount() {
    this.setChoiceSelected(this.props);
  }
  componentWillReceiveProps(newProps) {
    this.setChoiceSelected(newProps);
  }
  setChoiceSelected(props) {
    let choice = {};
    if (props.choicesMade[props.step]) {
      if (props.choicesMade[props.step].name === 'custom') {
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
  render() {
    return (
      <div className="StepView">
        <WordView word={this.props.chosenWord} />
        <div className="description">
          <h2>
            {this.props.stepValues.name}:
          </h2>
          <p>
            {this.props.stepValues.description}
          </p>
        </div>
        <div className="choices">
          {this.props.stepValues.choices.map((choice, index) =>
            (<Choice
              choice={choice}
              key={choice.name}
              markChoiceActive={this.markChoiceActive}
              selectChoice={this.props.selectChoice}
              index={index}
              selected={this.state.choice === choice}
              text={this.props.chosenWord}
              mostSelected={this.state.mostSelected === choice.id}
            />),
          )}
          <div
            className={`choiceMore ${this.state.choice && this.state.choice.name === 'custom'
              ? 'selected'
              : ''}`}
            role="option"
            aria-checked="false"
            aria-selected="false"
            tabIndex={0}
            onClick={() => this.markChoiceActive({ name: 'custom', values: {} })}
          >
            {this.state.choice && this.state.choice.name === 'custom'
              ? this.props.chosenWord
              : 'More'}
          </div>
          {this.state.choice && this.state.choice.name === 'custom'
            ? <Sliders onUpdate={this.onUpdate} />
            : false}
        </div>
        <div className="actions">
          <Button className="previousStep" label="Back" onClick={this.props.stepBack} />
          {Object.keys(this.state.choice || {}).length > 0
            ? <Button
              className="nextStep"
              label="OK"
              onClick={() => this.props.selectChoice(this.state.choice)}
            />
            : <Button
              className="nextStep"
              label="I like it that way"
              onClick={this.props.stepForward}
            />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stepValues: state.font.currentPreset.steps[state.font.step - 1],
  step: state.font.step,
  choicesMade: state.font.choicesMade,
  chosenWord: state.user.chosenWord,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      stepForward,
      stepBack,
      selectChoice,
      updateSliderFont,
    },
    dispatch,
  );

StepView.propTypes = {
  stepForward: PropTypes.func.isRequired,
  stepBack: PropTypes.func.isRequired,
  selectChoice: PropTypes.func.isRequired,
  updateSliderFont: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  choicesMade: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  stepValues: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    choices: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    ),
  }).isRequired,
  chosenWord: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(StepView);
