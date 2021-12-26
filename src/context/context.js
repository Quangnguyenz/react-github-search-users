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
    const [repos, setRepos] = useState(mockRepos);
    const [followers, setFollwers] = useState(mockFollowers);
    // request loading
    const [request, setRequest] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    // check error
    const [error, setError] = useState({ show: false, msg: '' })

    // check demo
    const [isDemo, setIsDemo] = useState(false);

    const searchGithubUser = async (user) => {
        console.log('search function called')
        toggleError();
        setIsLoading(true)
        const response = await axios(`${rootUrl}/users/${user}`).catch((err) => console.log(err))
        if (response) {

            setGithubUser(response.data)
            const { login, followers_url } = response.data

            await Promise.allSettled([axios(`${rootUrl}/users/${login}/repos?per_page=100`), axios(`${followers_url}?per_page=100`)])
                .then((results) => {
                    const [repos, followers] = results;
                    const status = 'fulfilled'
                    if (repos.status === status) {
                        setRepos(repos.value.data)
                    }
                    if (followers.status === status) {
                        setFollwers(followers.value.data)
                    }
                }).catch((error) => console.log(error))

        } else {
            toggleError(true, 'there is no user with the username')
        }
        checkRequest();
        setIsLoading(false);
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
            isLoading,
            isDemo,
            setIsDemo,
        }}>{children}</GithubContext.Provider>
}

export { GithubContext, GithubProvider }