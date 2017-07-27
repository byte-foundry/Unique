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
      this.setState({ choice });
    };
  }
  render() {
    return (
      <div className="StepView">
        <WordView word="Hamburgefonstiv - Abc 123" />
        <div className="description">
          <h2>{this.props.step.name}:</h2>
          <p>{this.props.step.description}</p>
        </div>
        <div className="choices">
          {this.props.step.choices.map((choice, index) =>
            (<Choice
              choice={choice}
              key={choice.name}
              selectChoice={this.markChoiceActive}
              index={index}
              selected={this.state.choice === choice}
            />),
          )}
        </div>
        <div className="actions">
          <Button
            className="nextStep"
            label="I'm good like this"
            onClick={this.props.stepForward}
          />
          <Button
            className="nextStep"
            label="OK"
            onClick={() => { this.props.selectChoice(this.state.choice); }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  step: state.font.currentPreset.steps[state.font.step - 1],
});
const mapDispatchToProps = dispatch => bindActionCreators({
  stepForward,
  selectChoice,
}, dispatch);

StepView.propTypes = {
  stepForward: PropTypes.func.isRequired,
  selectChoice: PropTypes.func.isRequired,
  step: PropTypes.shape({
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
