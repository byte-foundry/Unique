// @flow
import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ component: Component, requirement, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (requirement
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/', state: { from: props.location } }} />)}
  />
);

ProtectedRoute.propTypes = {
  component: PropTypes.element.isRequired,
  requirement: PropTypes.bool.isRequired,
  location: PropTypes.string.isRequired,
};

ProtectedRoute.defaultProps = {};

export default withRouter(ProtectedRoute);
