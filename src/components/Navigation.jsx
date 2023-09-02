import React from 'react';
import { Link } from 'react-router-dom';
import UserMenu from './UserMenu';

const Navigation = () => {
  return (
    <nav style={navStyle}>
      <ul style={ulStyle}>
        <li style={liStyle}>
          <Link to="/register" style={linkStyle}>
           Registration
          </Link>
        </li>
        <li style={liStyle}>
          <Link to="/login" style={linkStyle}>
           Login
          </Link>
        </li>
        <li style={liStyle}>
          <Link to="/contacts" style={linkStyle}>
            Contacts
          </Link>
        </li>
      </ul>
      <UserMenu />
    </nav>
  );
};

const navStyle = {
  background: '#4682B4',
  color: '#fff',
  padding: '10px',
};

const ulStyle = {
  listStyle: 'none',
    display: 'flex',
};

const liStyle = {
  margin: '0 10px',
};

const linkStyle = {
  textDecoration: 'none',
  color: '#fff',
};

export default Navigation;
