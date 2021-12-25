import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { GithubContext } from '../context/context';

const PrivateRoute = ({ children, ...rest }) => {
  let { isAuthenticated, user } = useAuth0();
  console.log(isAuthenticated, user)

  const { isDemo } = React.useContext(GithubContext)
  if (isDemo) {
    return children
  }
  const isUser = isAuthenticated && user;
  return <Route {...rest} render={() => {
    return isUser ? children : <Redirect to="/login"></Redirect>
  }}></Route>
};
export default PrivateRoute;
