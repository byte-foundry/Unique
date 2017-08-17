// @flow
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { stepForward, stepBack, selectChoice } from '../../data/font';
import Choice from '../../components/choice/';
import WordView from '../wordView/';
import Button from '../../components/button/';
import './StepView.css';

class StepView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      choice: {},
    };
    this.markChoiceActive = (choice) => {
      if (choice === this.state.choice) {
        this.setState({ choice: {} });
      } else this.setState({ choice });
    };
  }
  componentWillMount() {
    this.setChoiceSelected(this.props);
  }
  componentWillReceiveProps(newProps) {
    this.setChoiceSelected(newProps);
  }
  setChoiceSelected(props) {
    if (props.choicesMade[props.step]) {
      this.setState({
        choice: props.stepValues.choices.find(
          choice => choice.name === props.choicesMade[props.step].name,
        ),
      });
    }
  }
  render() {
    return (
      <div className="StepView">
        <WordView word={this.props.chosenWord} />
        <div className="description">
          <h2>{this.props.stepValues.name}:</h2>
          <p>{this.props.stepValues.description}</p>
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
            />),
          )}
        </div>
        <div className="actions">
          <Button
            className="previousStep"
            label="Back"
            onClick={this.props.stepBack}
          />
          {
            Object.keys(this.state.choice || {}).length > 0
              ? (
                <Button
                  className="nextStep"
                  label="OK"
                  onClick={() => this.props.selectChoice(this.state.choice)}
                />
                )
              : (
                <Button
                  className="nextStep"
                  label="I like it that way"
                  onClick={this.props.stepForward}
                />
                )
          }
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
const mapDispatchToProps = dispatch => bindActionCreators({
  stepForward,
  stepBack,
  selectChoice,
}, dispatch);

StepView.propTypes = {
  stepForward: PropTypes.func.isRequired,
  stepBack: PropTypes.func.isRequired,
  selectChoice: PropTypes.func.isRequired,
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
