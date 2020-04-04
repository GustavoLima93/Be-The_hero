import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import api from '../services/api';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const signed = localStorage.getItem('token');
  console.log(signed);

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  api.defaults.headers.Authorization = `Bearer ${signed}`;

  if (signed && !isPrivate) {
    return <Redirect to="/profile" />;
  }

  return <Route {...rest} render={props => <Component {...props} />} />;
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
