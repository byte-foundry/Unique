// @flow
import React from 'react';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './ParamChoice.css';
import StepView from '../stepView/';
import WordView from '../wordView/';
import StepList from '../stepList/';

class ParamChoice extends React.Component {
  constructor(props) {
    super(props);
    if (props.step === 0) {
      props.redirectToHome();
    }
  }
  render() {
    return (
      <div className="ParamChoice">
        <WordView word="Spectral" />
        <StepView />
        <StepList />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  redirectToHome: () => push('/'),
}, dispatch);

const mapStateToProps = state => ({
  step: state.font.step,
});

ParamChoice.propTypes = {
  redirectToHome: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ParamChoice));
