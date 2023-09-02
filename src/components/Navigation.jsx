import React from 'react';
import { Link } from 'react-router-dom';
import UserMenu from './UserMenu';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/register">Реєстрація</Link>
        </li>
        <li>
          <Link to="/login">Логін</Link>
        </li>
        <li>
          <Link to="/contacts">Контакти</Link>
        </li>
      </ul>
      <UserMenu />
    </nav>
  );
};

export default Navigation;
