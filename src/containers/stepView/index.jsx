// @flow
import React from 'react';
import PropTypes from 'prop-types';
import Choice from '../../components/choice/';
import Button from '../../components/button/';
import './StepView.css';

const StepView = (props) => {
  const choices = props.step.choices;
  return (
    <div className="StepView">
      <Button className="back" label="Back" onClick={props.goBack} />
      <div className="choices">
        {choices.map(choice =>
          (
            <Choice
              name={choice.name}
              values={choice.values}
              selectChoice={props.selectChoice}
              previewChoice={props.previewChoice}
              resetValues={props.resetValues}
              key={choice.name}
            />),
        )}
      </div>
      <Button className="nextStep" label="I'm good like this" onClick={props.selectChoice} />
      <div className="description">
        <h2>{props.step.name}</h2>
        <p>{props.step.description}</p>
      </div>
    </div>
  );
};

StepView.propTypes = {
  step: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    choices: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
      }),
    ),
  }),
  previewChoice: PropTypes.func.isRequired,
  selectChoice: PropTypes.func.isRequired,
  resetValues: PropTypes.func.isRequired,
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
