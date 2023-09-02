import React from 'react';

const UserMenu = ({ userEmail, onLogout }) => {
  const handleLogout = () => {
    // Викликати функцію для виходу з облікового запису, наприклад, передану через props
    onLogout();
  };

  return (
    <div>
      <p>{userEmail}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserMenu;
