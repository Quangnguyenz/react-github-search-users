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
    // request loading
    const [request, setRequest] = useState(0);
    const [loading, setIsLoading] = useState(0);
    // check error
    const [error, setError] = useState({ show: false, msg: '' })
    const searchGithubUser = async (user) => {
        //toggle error
        //set loading true
        const response = await axios(`${rootUrl}/users/${user}`).catch(err => console.log(err))
        console.log(response);
        if (response) {
            setGithubUser = response.data
        } else {
            toggleError(true, 'there is no user with the username')
        }
    }

    // check rate
    const checkRequest = () => {
        axios(`${rootUrl}/rate_limit`)
            .then(({ data }) => {
                let { rate: { remaining } } = data
                setRequest(remaining)
                if (remaining === 0) {
                    // throw error
                    toggleError(true, 'sorry, you exceeded the hourly rate limit')
                }
            })
            .catch((err) => console.log(err))
    }

    function toggleError(show = false, msg = '') {
        setError({ show, msg })
    }
    //error
    useEffect(checkRequest, [])
    return <GithubContext.Provider
        value={{
            githubUser,
            repos,
            followers,
            request,
            error,
            searchGithubUser,
        }}>{children}</GithubContext.Provider>
}

export { GithubContext, GithubProvider }