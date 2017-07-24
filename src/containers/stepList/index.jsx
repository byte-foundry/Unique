// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Step from '../../components/step/';
import './StepList.css';

const StepList = props => (
  <div className="StepList">
    <Link key="template" to="/"><div>Template choice</div></Link>
    {props.steps.map((step, index) => (
      <Step index={index} title={step.name} key={step.name} />
    ))}
  </div>
);


StepList.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      choices: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
        }),
      ),
    }),
  ).isRequired,
};

const mapStateToProps = state => ({
  steps: state.font.currentPreset.steps,
});

export default connect(mapStateToProps, null)(StepList);

