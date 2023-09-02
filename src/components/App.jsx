import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navigation from './Navigation';
import Register from './Register';
import Login from './Login';
import Contacts from './Contacts';

const App = () => {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/*" element={<Navigate to="/contacts" />} /> {/* Додано перенаправлення на /contacts за замовчуванням */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
