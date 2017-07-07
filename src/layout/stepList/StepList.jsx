// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './StepList.css';

const StepList = props => (
  <div className="StepList">
    <Link key="template" to="/"><div>Template choice</div></Link>
    {props.steps.map((step, index) => (
      <Link key={`step-${index + 1}`}to={`/template/${props.template}/${index + 1}`}><div>{step.title}</div></Link>
    ))}
  </div>
);


StepList.propTypes = {
  template: PropTypes.string.isRequired,
};

StepList.defaultProps = {
  template: 'elzevir',
};

export default StepList;
