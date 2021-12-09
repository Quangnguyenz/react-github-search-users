import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

//acces to provider and consumer - Github.Provider

const GithubProvider = ({ children }) => {
    const [githubUser, setGithubUser] = useState(mockUser);
    const [repos, setrepos] = useState(mockRepos);
    const [followers, setFollwers] = useState(mockFollowers);
    return <GithubContext.Provider
        value={{
            githubUser,
            repos,
            followers,
        }}>{children}</GithubContext.Provider>
}

export { GithubContext, GithubProvider }