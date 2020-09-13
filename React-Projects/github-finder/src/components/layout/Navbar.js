import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({ title, icon }) => {
  return (
    <div>
      <nav className='navbar bg-primary'>
        <h1>
          <i className={icon}></i> &nbsp;
          {title}
        </h1>
        <ul>
          <Link to='/'>
            <li>Home</li>
          </Link>
          <Link to='/about'>
            <li>About</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

Navbar.defaultProps = {
  title: 'GITHUB FINDER',
  icon: 'fa fa-github',
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Navbar;
