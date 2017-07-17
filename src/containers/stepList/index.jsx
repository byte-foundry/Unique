// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Step from '../../components/step/';
import './StepList.css';

const StepList = props => (
  <div className="StepList">
    <Link key="template" to="/"><div>Template choice</div></Link>
    {props.steps.map((step, index) => (
      <Step index={index} title={step.title} template={props.template} key={step.title} />
    ))}
  </div>
);


StepList.propTypes = {
  template: PropTypes.string.isRequired,
};

StepList.defaultProps = {
  template: 'elzevir',
};

const mapStateToProps = state => ({
  template: state.routing.location.pathname.split('/')[2],
});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StepList);

