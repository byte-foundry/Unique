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

const isMostSelected = (presets, font) => {
  let most = presets[0].id;
  let value = 0;
  presets.forEach((preset) => {
    if (preset.selected > value) {
      value = preset.selected;
      most = preset.id;
    }
  });
  return font.id === most && value > 0;
};

const TemplateChoice = props => (
  <div className="TemplateChoice">
    <Button label="Back" onClick={() => props.redirectToHome()} />
    <h1>Pick something that you like and edit it!</h1>   
    <div className="template-wrapper">
      {props.presets.map(font => <Template key={`${font.preset}${font.variant}`} font={font} selectFont={props.selectFont} text={props.chosenWord} mostSelected={isMostSelected(props.presets, font)} />)}
    </div>
    {props.isLoading
    ? (<h2>Loading font...</h2>)
    : false}
  </div>
);

const mapStateToProps = state => ({
  presets: state.presets.importedPresets,
  isLoading: state.font.isLoading,
  chosenWord: state.user.chosenWord,
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
  chosenWord: PropTypes.string,
};

TemplateChoice.defaultProps = {
  chosenWord: 'Hamburgefonstiv - Abc 123',
};

export default connect(mapStateToProps, mapDispatchToProps)(TemplateChoice);
