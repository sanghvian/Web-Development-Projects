import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import RepoItem from './RepoItem';

export const Repos = ({ repos }) => {
  return (
    <Fragment>
      {repos.map((repo) => (
        <RepoItem key={repo.id} repo={repo} />
      ))}
    </Fragment>
  );
};

Repos.propTypes = {
  repos: PropTypes.array.isRequired,
};

export default Repos;
