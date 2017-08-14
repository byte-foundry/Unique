// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import './UnstableView.css';

const UnstableView = () => (
  <div className="UnstableView">
    <h1>Recreating your fonts</h1>
  </div>
);

UnstableView.propTypes = {};

export default withRouter(UnstableView);
