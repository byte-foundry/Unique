// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import './TemplateChoice.css';

const TemplateChoice = () => (
  <div className="TemplateChoice">
    <ul>
      <li>
        <Link to="/template/elzevir">Elzevir</Link>
      </li>
      <li>
        <Link to="/template/fell">Fell</Link>
      </li>
      <li>
        <Link to="/template/grotesk">Grotesk</Link>
      </li>
      <li>
        <Link to="/template/spectral">Spectral</Link>
      </li>
    </ul>
  </div>
);

export default TemplateChoice;
