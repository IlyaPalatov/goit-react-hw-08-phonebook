import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
          <Route path="/register" Component={Register} />
          <Route path="/login" Component={Login} />
          <Route path="/contacts" Component={Contacts} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
