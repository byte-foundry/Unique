// @flow
import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './TemplateChoice.css';
import Template from '../../components/template/';

import { createFont, selectFont } from '../../data/font';

const context = require.context('../../data/presets', true, /^(.*\.(json$))[^.]*$/igm);
const presets = {};
context.keys().forEach((filename) => { presets[filename] = context(filename); });

class TemplateChoice extends React.Component {
  constructor(props) {
    super(props);
    this.openFont = (font) => {
      props.createFont(font);
      props.history.push(`/template/${font.template}/1`);
      props.selectFont(font);
    };
  }
  render() {
    return (
      <div className="TemplateChoice">
        <h1>Choose a template</h1>
        <div className="template-wrapper">
          {this.props.presets.map(font => <Template key={`${font.preset}${font.variant}`} font={font} openFont={this.openFont} />)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  presets: state.font.presets,
});
const mapDispatchToProps = dispatch => bindActionCreators({ createFont, selectFont }, dispatch);

TemplateChoice.propTypes = {
  createFont: PropTypes.func.isRequired,
  selectFont: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TemplateChoice);
