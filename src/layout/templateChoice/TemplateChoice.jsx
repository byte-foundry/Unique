// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import './TemplateChoice.css';

const TemplateChoice = () => (
  <div className="TemplateChoice">
    <ul>
      <li>
        <Link to="/template/elzevir/1">Elzevir</Link>
      </li>
      <li>
        <Link to="/template/fell/1">Fell</Link>
      </li>
      <li>
        <Link to="/template/grotesk/1">Grotesk</Link>
      </li>
      <li>
        <Link to="/template/spectral/1">Spectral</Link>
      </li>
    </ul>
  </div>
);

export default TemplateChoice;
