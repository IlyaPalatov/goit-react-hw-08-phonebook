import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const [error, setError] = useState(null);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsUserLoggedIn(token !== null);
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('authToken');

      if (!token) {
        throw new Error('The authorization token is missing');
      }

      const response = await axios.post(
        'https://connections-api.herokuapp.com/users/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        localStorage.removeItem('authToken');
        setIsLoggedOut(true);
        console.log('User exit successful');
        
        navigate('/register');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError('Error while exiting');
      }
    }
  };

  return (
    <div>
      {isUserLoggedIn && !isLoggedOut ? (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {error ? (
            <p>Error: {error}</p>
          ) : (
            <Button
              variant="contained"
              style={{ backgroundColor: 'red', color: 'white' }}
              onClick={handleLogout}
            >
              Go Out
            </Button>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Logout;
