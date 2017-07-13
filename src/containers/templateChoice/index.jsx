// @flow
import React from 'react';
import './TemplateChoice.css';
import Template from '../../components/template/';

class TemplateChoice extends React.Component {
  constructor(props) {
    super(props);
    this.openFont = (fontName) => {
      props.createFont(fontName);
      props.history.push(`/template/${fontName}/1`);
    };
  }
  render() {
    return (
      <div className="TemplateChoice">
        <h1>Choose a template</h1>
        <div className="template-wrapper">
          <Template name="Elzevir" openFont={this.openFont} />
          <Template name="Grotesk" openFont={this.openFont} />
          <Template name="Fell" openFont={this.openFont} />
          <Template name="Spectral" openFont={this.openFont} />
        </div>
      </div>
    );
  }
}

export default TemplateChoice;
