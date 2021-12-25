import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import loadingGif from '../images/preloader.gif';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
function AuthWrapper({ children }) {
  const { isLoading, error } = useAuth0();
  const { isDemo } = React.useContext(GithubContext)

  console.log(isDemo)

  if (isDemo) {
    return <>{children}</>
  }

  if (isLoading) {
    return (
      <img src={loadingGif} alt="spinner" />
    )
  }

  if (error) {
    return <Wrapper><h1>{error.message}</h1></Wrapper>
  }

  return <>{children}</>
}

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  img {
    width: 150px;
  }
`;

export default AuthWrapper;
