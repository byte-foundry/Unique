// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './ParamChoice.css';
import StepView from '../stepView/';
import WordView from '../wordView/';
import StepList from '../stepList/';

class ParamChoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: this.props.step,
      template: this.props.template,
      word: 'Hello Prototypo',
    };
    this.steps = require(`../../data/choices-${this.state.template}.json`).steps;
    this.previewChoice = (choice) => {
      props.changeParams(choice, false);
    };
    this.selectChoice = (choice) => {
      if (choice) {
        props.changeParams(choice);
      }
      if (this.state.step < this.steps.length) {
        props.stepForward(this.state.template, this.state.step);
      } else {
        props.goFinal(this.state.template, this.state.step);
      }
    };
    this.goBack = () => {
      if (this.state.step > 1) {
        props.stepBack(this.state.template, this.state.step);
      } else {
        props.goHome();
      }
    };
  }

  componentWillReceiveProps(newProps) {
    const step = newProps.step;
    this.setState({
      step,
    });
  }

  render() {
    return (
      <div className="ParamChoice">
        <WordView word={this.word} />
        <StepView
          step={this.steps[this.state.step - 1]}
          goBack={this.goBack}
          previewChoice={this.previewChoice}
          resetValues={this.props.resetValues}
          selectChoice={this.selectChoice}
        />
        <StepList steps={this.steps} template={this.template} />
      </div>
    );
  }
}

ParamChoice.propTypes = {
  stepBack: PropTypes.func.isRequired,
  stepForward: PropTypes.func.isRequired,
  resetValues: PropTypes.func.isRequired,
  changeParams: PropTypes.func.isRequired,
  goHome: PropTypes.func.isRequired,
  goFinal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  template: state.routing.location.pathname.split('/')[2],
  step: state.routing.location.pathname.split('/')[3],
});
const mapDispatchToProps = dispatch => bindActionCreators({
  stepBack: (template, step) => push(`/template/${template}/${parseInt(step, 10) - 1}`),
  stepForward: (template, step) => push(`/template/${template}/${parseInt(step, 10) + 1}`),
  goFinal: (template, step) => push(`/final/${template}/${parseInt(step, 10)}`),
  goHome: () => push('/'),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ParamChoice);

