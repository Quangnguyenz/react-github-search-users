import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import loginImg from '../images/login-img.svg';
import { PrivateRoute } from '.';
import { Route, Redirect } from 'react-router-dom';
import { GithubContext } from '../context/context';

const Login = () => {
  let { loginWithRedirect, user, isAuthenticated } = useAuth0();

  const { isDemo, setIsDemo, request } = React.useContext(GithubContext)


  let quickAccess = () => {
    setIsDemo(true)
    window.location.replace('/')
  }
  // console.log(isDemo)

  return (
    <Wrapper>
      <div className="container">
        <img src={loginImg} alt="github user" />
        <h1>github user</h1>
        <button className='btn' onClick={quickAccess}>Quick Demo / no sign up</button>
        <br />
        <br />
        <button className='btn' onClick={loginWithRedirect}>login / sign up</button>
      </div>
    </Wrapper>
  )
};
const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  .container {
    width: 90vw;
    max-width: 600px;
    text-align: center;
  }
  img {
    margin-bottom: 2rem;
  }
  h1 {
    margin-bottom: 1.5rem;
  }
`;
export default Login;
