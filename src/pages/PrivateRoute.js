import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { GithubContext } from '../context/context';

const PrivateRoute = ({ children, demo, ...rest }) => {
  let { isAuthenticated, user } = useAuth0();
  console.log(isAuthenticated, user)

  const { isDemo } = React.useContext(GithubContext)
  if (isDemo === true) {
    return <Route {...rest} render={() => {
      return children
    }}></Route>
  }

  const isUser = isAuthenticated && user;
  return <Route {...rest} render={() => {
    return isUser ? children : <Redirect to="/login"></Redirect>
  }}></Route>
};
export default PrivateRoute;
