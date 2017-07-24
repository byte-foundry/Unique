// @flow
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { stepForward, stepBackward, resetValues, changeParams } from '../../data/font';
import Choice from '../../components/choice/';
import Button from '../../components/button/';
import './StepView.css';

const StepView = props =>
  (<div className="StepView">
    <Button className="back" label="Back" onClick={props.stepBackward} />
    <div className="choices">
      {props.step.choices.map(choice =>
        (<Choice
          choice={choice}
          changeParams={props.changeParams}
          resetValues={props.resetValues}
          key={choice.name}
        />),
      )}
    </div>
    <Button className="nextStep" label="I'm good like this" onClick={props.stepForward} />
    <div className="description">
      <h2>{props.step.name}</h2>
      <p>{props.step.description}</p>
    </div>
  </div>);

const mapStateToProps = state => ({
  step: state.font.currentPreset.steps[state.font.step - 1],
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ stepForward, stepBackward, resetValues, changeParams }, dispatch);

StepView.propTypes = {
  stepForward: PropTypes.func.isRequired,
  stepBackward: PropTypes.func.isRequired,
  resetValues: PropTypes.func.isRequired,
  changeParams: PropTypes.func.isRequired,
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
