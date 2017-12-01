// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Start.css';

const redirectToProject = (step, choicesLength, redirectToLocation) => {
  if (step <= choicesLength) {
    redirectToLocation('/customize');
  } else redirectToLocation('/specimen');
};

const Start = (props) => (
  <div className="Start container">
    <div className="row">
      <div className="col-sm-12">
          <h1>Welcome back!</h1>
      </div>
    </div>    
    <div className="choices row">
      <div className="choice col-md-6">
        <div
          className="card"
          onClick={() => redirectToProject(props.step, props.choicesLength, props.redirectToLocation)}
          role="option"
          aria-checked="false"
          aria-selected="false"
          tabIndex={0}
        >
          <div className="image" />
          <div className="title">Resume your project</div>
        </div>
      </div>
      <div className="choice col-md-6">
        <div
          className="card"
          onClick={() => props.redirectToHome()}
          role="option"
          aria-checked="false"
          aria-selected="false"
          tabIndex={0}
        >
          <div className="image" />
          <div className="title">Create a new one</div>
        </div>
      </div>
    </div>
  </div>
);

const mapDispatchToProps = dispatch => bindActionCreators({
  redirectToHome: () => push('/'),
  redirectToLocation: location => push(location),
}, dispatch);

const mapStateToProps = state => ({
  step: state.font.choicesMade.length,
  choicesLength: state.font.currentPreset.steps.length,
});

Start.propTypes = {
  step: PropTypes.number.isRequired,
  redirectToHome: PropTypes.func.isRequired,
  redirectToLocation: PropTypes.func.isRequired,
  choicesLength: PropTypes.number.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Start));