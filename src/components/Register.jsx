import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Container, Box } from '@mui/material';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
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

  const handleRegisterSuccess = (token) => {
    localStorage.setItem('authToken', token);
    console.log('Authentication is successful');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://connections-api.herokuapp.com/users/signup',
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        const { token } = response.data;
        handleRegisterSuccess(token);
        console.log('Registration is successful');
      }
    } catch (error) {
      if (error.response) {
        console.error('Registration error:', error.response.data.error);
      } else {
        console.error('Error during registration:', error.message);
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4">Registration</Typography>
      <Box mt={2}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            margin="normal"
          />
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
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign up
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
