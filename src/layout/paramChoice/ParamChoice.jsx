// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {
  withRouter,
} from 'react-router-dom';
import './ParamChoice.css';
import StepView from '../stepView/StepView';
import WordView from '../wordView/WordView';
import StepList from '../stepList/StepList';

class ParamChoice extends React.Component {
  constructor(props) {
    super(props);
    this.template = props.match.params.template;
    this.steps = require(`../../data/choices-${this.template}.json`).steps;
    this.state = {
      word: 'Hello Prototypo',
      step: props.match.params.step,
    };
    this.previewChoice = (choice) => {
      // make change here
      if (this.state.step < this.steps.length) {
        props.history.push(`/template/${this.template}/${parseInt(this.state.step, 10) + 1}`);
      }
    };
    this.goBack = () => {
      // make change here
      if (this.state.step > 1) {
        props.history.push(`/template/${this.template}/${parseInt(this.state.step, 10) - 1}`);
      }
    };
  }

  componentWillReceiveProps(newProps) {
    const step = newProps.match.params.step;
    this.setState({ step });
  }

  render() {
    return (
      <div className="ParamChoice">
        <WordView word={this.word} />
        <StepView
          step={this.steps[this.state.step - 1]}
          goBack={this.goBack}
          previewChoice={this.previewChoice}
        />
        <StepList steps={this.steps} template={this.template} />
      </div>
    );
  }
}

ParamChoice.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      template: PropTypes.string.isRequired,
      step: PropTypes.string,
    }),
  }),
};

ParamChoice.defaultProps = {
  match: {
    params: {
      template: 'spectral',
      step: '1',
    },
  },
};

export default withRouter(ParamChoice);
