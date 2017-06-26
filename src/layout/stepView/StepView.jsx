// @flow
import React from 'react';
import PropTypes from 'prop-types';
import './StepView.css';

const StepView = (props) => {
  const choices = props.step.choices;
  return (
    <div className="StepView">
      <div className="back" onClick={() => props.goBack()}>Back</div>
      <div className="choices">
        {choices.map(choice => (
          <div
            className="choice"
            key={choice.name}
            onClick={() => props.previewChoice(choice.values)}
            role="option"
            aria-checked="false"
            aria-selected="false"
            tabIndex={0}
          >
            {choice.name}
          </div>
        ))}
      </div>
      <div className="description">
        <h2>{props.step.description.title}</h2>
        <p>{props.step.description.subtitle}</p>
      </div>
    </div>
  );
};

StepView.propTypes = {
  step: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.shape({
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string.isRequired,
    }),
    choices: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })),
  }),
  previewChoice: PropTypes.func.isRequired,
};

StepView.defaultProps = {
  step: {
    title: '',
    description: {
      title: 'default title',
      subtitle: 'default subtitle',
    },
  },
};


export default StepView;
