// @flow
import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ component: Component, requirement, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (requirement()
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/app', state: { from: props.location } }} />)}
  />
);

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  requirement: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

ProtectedRoute.defaultProps = {};

export default withRouter(ProtectedRoute);
