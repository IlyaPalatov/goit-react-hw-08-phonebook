import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navigation from './Navigation';
import Register from './Register';
import Login from './Login';
import Contacts from './Contacts';

const App = () => {
  const token = localStorage.getItem('authToken');

  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {!token ? (
            <Route path="/contacts" element={<Navigate to="/login" />} />
          ) : (
            <Route path="/contacts" element={<Contacts />} />
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
