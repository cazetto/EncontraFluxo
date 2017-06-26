import React from 'react';
import { Route, Redirect } from 'react-router-native';

// Get this from service inside the function
const isAuthenticated = true;

export default PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname:'/auth/login',
        state: { from: props.location }
      }}/>
    )
  )} />
);
