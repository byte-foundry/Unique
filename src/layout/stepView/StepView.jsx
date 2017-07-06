// @flow
import React from 'react';
import PropTypes from 'prop-types';
import './StepView.css';

const StepView = (props) => {
  const choices = props.step.choices;
  return (
    <div className="StepView">
      <div
        className="back"
        role="button"
        tabIndex="0"
        onClick={() => props.goBack()}
      >
        Back
      </div>
      <div className="choices">
        {choices.map(choice => (
          <div
            className="choice"
            key={choice.name}
            onClick={() => props.selectChoice(choice.values)}
            onMouseOver={() => props.previewChoice(choice.values)}
            onMouseLeave={() => props.resetValues()}
            role="option"
            aria-checked="false"
            aria-selected="false"
            tabIndex={0}
          >
            <span>{choice.name}</span>
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
  goBack: PropTypes.func.isRequired,
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
