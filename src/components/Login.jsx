import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Container } from '@mui/material';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLoginSuccess = (token) => {
    localStorage.setItem('authToken', token);
    console.log('Автентифікація успішна');
    // Перезавантажуємо сторінку
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://connections-api.herokuapp.com/users/login',
        {
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        handleLoginSuccess(response.data.token);
      }
    } catch (error) {
      if (error.response) {
        console.error('Authentication failed:', error.response.data.error);
      } else {
        console.error('An error occurred during authentication:', error.message);
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h2">Authentication</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Sign in
        </Button>
      </form>
    </Container>
  );
};

export default Login;
