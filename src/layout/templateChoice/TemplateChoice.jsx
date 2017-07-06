// @flow
import React from 'react';
import './TemplateChoice.css';

const openFont = (fontName, history, createFont) => {
  createFont(fontName);
  history.push(`/template/${fontName}/1`);
};
const TemplateChoice = props =>
  (<div className="TemplateChoice">
    <div className="template-wrapper">
      <div
        role="button"
        className="template"
        onClick={() => openFont('ELZEVIR', props.history, props.createFont)}
        tabIndex="0"
      >
        Elzevir
      </div>
      <div
        role="button"
        className="template"
        onClick={() => openFont('GROTESK', props.history, props.createFont)}
        tabIndex="0"
      >
        Grotesk
      </div>
      <div
        role="button"
        className="template"
        onClick={() => openFont('FELL', props.history, props.createFont)}
        tabIndex="0"
      >
        Fell
      </div>
      <div
        role="button"
        className="template"
        onClick={() => openFont('SPECTRAL', props.history, props.createFont)}
        tabIndex="0"
      >
        Spectral
      </div>
    </div>

  </div>);

export default TemplateChoice;
