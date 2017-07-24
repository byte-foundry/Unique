// @flow
import React from 'react';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './FinalView.css';
import Button from '../../components/button/';

const FinalView = props =>
  (<div className="FinalView">
    <Button className="back" label="Back" onClick={() => props.goBack()} />
    <h1>Congrats!</h1>
  </div>);

const mapDispatchToProps = dispatch => bindActionCreators({
  goBack: () => push('/customize'),
}, dispatch);

FinalView.propTypes = {
  goBack: PropTypes.func.isRequired,
};


export default withRouter(connect(null, mapDispatchToProps)(FinalView));
