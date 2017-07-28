// @flow
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { stepForward, selectChoice } from '../../data/font';
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
        <WordView word="Hamburgefonstiv - Abc 123" />
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
            />),
          )}
        </div>
        <div className="actions">
          <Button
            className="nextStep"
            label="Skip"
            onClick={this.props.stepForward}
          />
          <Button
            className="nextStep"
            label="OK"
            onClick={() => (
              Object.keys(this.state.choice).length > 0
              ? this.props.selectChoice(this.state.choice)
              : this.props.stepForward()
            )}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stepValues: state.font.currentPreset.steps[state.font.step - 1],
  step: state.font.step,
  choicesMade: state.font.choicesMade,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  stepForward,
  selectChoice,
}, dispatch);

StepView.propTypes = {
  stepForward: PropTypes.func.isRequired,
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
};

export default connect(mapStateToProps, mapDispatchToProps)(StepView);
