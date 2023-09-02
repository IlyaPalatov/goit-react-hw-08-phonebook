import React, { useState } from 'react';
import axios from 'axios';

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://connections-api.herokuapp.com/auth/login', formData);

      if (response.status === 200) {
        // Якщо логін успішний, можливо виконати дії, наприклад, перенаправити користувача
        console.log('Логін успішний');
      }
    } catch (error) {
      // Обробка помилок при логіні
      if (error.response) {
        console.error('Помилка при логіні:', error.response.data.error);
      } else {
        console.error('Помилка під час логіну:', error.message);
      }
    }
  };

  return (
    <div>
      <h2>Логін</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Пароль:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Увійти</button>
      </form>
    </div>
  );
};

export default Login;
