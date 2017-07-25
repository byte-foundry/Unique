// @flow
import React from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './TemplateChoice.css';
import Template from '../../components/template/';
import Button from '../../components/button/';

import { createFont } from '../../data/font';

const TemplateChoice = props => (
  <div className="TemplateChoice">
    <h1>Choose a template</h1>
    <Button label="Back" onClick={() => props.redirectToHome()} />
    <div className="template-wrapper">
      {props.presets.map(font => <Template key={`${font.preset}${font.variant}`} font={font} createFont={props.createFont} />)}
    </div>
    {props.isCreating
    ? (<h2>Creating font...</h2>)
    : false}
  </div>
);

const mapStateToProps = state => ({
  presets: state.font.presets,
  isCreating: state.font.isCreating,
});
const mapDispatchToProps = dispatch => bindActionCreators({ createFont, redirectToHome: () => push('/') }, dispatch);

TemplateChoice.propTypes = {
  createFont: PropTypes.func.isRequired,
  isCreating: PropTypes.bool.isRequired,
  redirectToHome: PropTypes.func.isRequired,
  presets: PropTypes.arrayOf(
    PropTypes.shape({
      preset: PropTypes.string.isRequired,
      variant: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TemplateChoice);
