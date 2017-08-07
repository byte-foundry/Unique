// @flow
import React from 'react';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './ParamChoice.css';
import StepView from '../stepView/';
import StepList from '../stepList/';

class ParamChoice extends React.Component {
  componentWillMount() {
    console.log(this.props.step);
    if (this.props.step === 0) {
      this.props.redirectToHome();
    }
  }
  render() {
    return (
      <div className="ParamChoice">
        <div className="left">
          <StepView />
        </div>
        <div className="right">
          <StepList />
        </div>
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
