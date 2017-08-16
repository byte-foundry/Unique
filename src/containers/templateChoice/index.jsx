// @flow
import React from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './TemplateChoice.css';
import Template from '../../components/template/';
import Button from '../../components/button/';

import { selectFont } from '../../data/font';

const TemplateChoice = props => (
  <div className="TemplateChoice">
    <h1>Pick something that you like and edit it!</h1>
    <Button label="Back" onClick={() => props.redirectToHome()} />
    {props.isLoading
    ? (<h2>Loading font...</h2>)
    : false}
    <div className="template-wrapper">
      {props.presets.map(font => <Template key={`${font.preset}${font.variant}`} font={font} selectFont={props.selectFont} />)}
    </div>
  </div>
);

const mapStateToProps = state => ({
  presets: state.presets.presets,
  isLoading: state.font.isLoading,
});
const mapDispatchToProps = dispatch => bindActionCreators({ selectFont, redirectToHome: () => push('/') }, dispatch);

TemplateChoice.propTypes = {
  selectFont: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  redirectToHome: PropTypes.func.isRequired,
  presets: PropTypes.arrayOf(
    PropTypes.shape({
      preset: PropTypes.string.isRequired,
      variant: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TemplateChoice);
