import React, { useReducer } from 'react';
import GithubReducer from './githubReducer';
import GithubContext from './githubContext';
import axios from 'axios';
import {
  SEARCH_USERS,
  GET_REPOS,
  SET_LOADING,
  GET_USER,
  CLEAR_USERS,
} from '../types';

let clientId;
let clientSecret;

if (process.env.NODE_ENV !== 'production') {
  clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  clientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  clientId = process.env.GITHUB_CLIENT_ID;
  clientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //SEARCH FOR USER

  const searchUsers = async (text) => {
    // console.log(text);

    // console.log(process.env.REACT_APP_GITHUB_CLIENT_ID);
    setLoading();

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${clientId}&client_secret=${clientSecret}`
    );

    dispatch({ type: SEARCH_USERS, payload: res.data.items });
  };

  //TO GET MORE DATA ABOUT A SINGLE USER

  const getUser = async (loginBoi) => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/users/${loginBoi}?client_id=${clientId}&client_secret=${clientSecret}`
    );

    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  };

  //GET REPOS FOR EACH USER

  const getUserRepos = async (loginBoi) => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/users/${loginBoi}/repos?per_page=5&sort=created:asc&client_id=${clientId}&client_secret=${clientSecret}`
    );

    dispatch({ type: GET_REPOS, payload: res.data });
  };

  //TO CLEAR USERS AND GO BACK TO HOMEPAGE FROM A SEARCHPAGE

  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
