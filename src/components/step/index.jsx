// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '../button/';
import './Step.css';

const Step = props => (
  <Link key={`step-${props.index + 1}`}to={`/template/${props.template}/${props.index + 1}`}><Button label={props.title} /></Link>
);


Step.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  template: PropTypes.string.isRequired,
};

export default Step;
