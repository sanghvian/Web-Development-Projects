import React, { Fragment, useEffect, useContext } from 'react';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import Repos from '../pages/Repos';
import GithubContext from '../../context/github/githubContext';

const User = ({ match }) => {
  const githubContext = useContext(GithubContext);
  const { loading, user, getUser, repos, getUserRepos } = githubContext;

  useEffect(() => {
    // console.log(match);
    getUser(match.params.login);
    getUserRepos(match.params.login);
    //eslint-disable-next-line
  }, []);

  const {
    name,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    company,
    public_gists,
    hireable,
  } = user;

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        <Link to='/' exact className='btn btn-light'>
          Back To Search
        </Link>
        Hirable:{' '}
        {hireable ? (
          <i className='fa fa-check-circle' aria-hidden='true'></i>
        ) : (
          <i className='fa fa-times-circle' aria-hidden='true'></i>
        )}
        <div className='card grid-2'>
          <div className='all-center'>
            <img
              src={avatar_url}
              alt='user_img'
              className='round-img'
              style={{ width: '150px' }}
            />
            <h1>{name}</h1>
            <p>Location : {location}</p>
          </div>
          <div>
            {bio && (
              <Fragment>
                <h3>Bio</h3>
                <p>{bio}</p>
              </Fragment>
            )}
            <a href={html_url} className='btn btn-dark'>
              Visit GitHub page
            </a>
            <ul>
              <li>{login && <Fragment>Username : {login}</Fragment>}</li>
              <li>{blog && <Fragment>Website : {blog}</Fragment>}</li>
              <li>{company && <Fragment>Company : {company}</Fragment>}</li>
            </ul>
          </div>
        </div>
        <div className='card text-center'>
          <div className='badge badge-primary'>Followers:{followers}</div>
          <div className='badge badge-success'>Following:{following} </div>
          <div className='badge badge-light'>Repos:{public_repos} </div>
          <div className='badge badge-dark'>Public:{public_gists} </div>
        </div>
        <Repos repos={repos} />
      </Fragment>
    );
  }
};

export default User;
