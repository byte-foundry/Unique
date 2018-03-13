// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import './Checkout.css';


class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        className="Checkout"
      >
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({ goBack: () => push('/specimen') }, dispatch);

Checkout.propTypes = {
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout));
