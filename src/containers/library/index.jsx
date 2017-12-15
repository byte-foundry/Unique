// @flow
import React from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../../components/button/';
import './Library.css';

const Library = props => (
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
            {props.projects.map(project => <li key={project.id}>{project.id}</li>)}
          </ul>
          <Button
            className=""
            label="Create a new one"
            mode=""
            onClick={() => props.goToHome()}
          />
        </div>
      </div>
    </div>
  </div>
);

Library.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  goToHome: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  projects: state.user.projects,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  goToHome: () => push('/'),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Library);
