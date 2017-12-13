// @flow
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './Library.css';

const Library = () => (
  <div className="Library">
    <h1>Library</h1>
  </div>
);

Library.propTypes = {};
const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Library);
