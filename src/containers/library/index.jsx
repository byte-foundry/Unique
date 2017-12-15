// @flow
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Library.css';

const Library = (props) => (
  <div className="Library">
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <h1>My library</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <ul>
            {props.projects.map(project => <li>{project.id}</li>)}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

Library.propTypes = {
  projects: PropTypes.arrayOf({
    id: PropTypes.string.isRequired,
  }).isRequired,
};
const mapStateToProps = state => ({
  projects: state.user.projects,
});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Library);
