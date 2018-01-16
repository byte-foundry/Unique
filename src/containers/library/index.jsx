// @flow
import React from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../../components/button/';
import { loadProject } from '../../data/font';
import './Library.css';

const Library = props => {
  console.log(props.projects);
  return (
    <div className="Library">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h1>My library</h1>
          </div>
        </div>
        <div className="row">
          {props.projects.map(project => (
            <div className="col-sm-3 project" role="button" tabIndex="0" onClick={() => props.loadProject(project.id, project.name)} key={project.id}>            
              <div className="description">
                {project.preset.steps.map((step, index) => (
                  <span key={`${project.id}${step.name}`}>{step.name}: {project.choicesMade[index + 1].name}<br /></span>
                ))}
              </div>
              <div className="title">{project.name}</div>
            </div>
          ))}
          <div className="col-sm-12">
            <Button
              className="create"
              label="Create a new one"
              mode=""
              onClick={() => props.goToHome()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

Library.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  goToHome: PropTypes.func.isRequired,
  loadProject: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  projects: state.user.projects,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  goToHome: () => push('/'),
  loadProject,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Library);
