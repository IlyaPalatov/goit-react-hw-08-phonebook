import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
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
      const response = await axios.post('https://connections-api.herokuapp.com/users/signup', formData);

      if (response.status === 201) {
        // Реєстрація пройшла успішно, можливо відобразити повідомлення про успішну реєстрацію
        console.log('Реєстрація успішна');
      }
    } catch (error) {
      // Реєстрація не вдалася, обробте помилку, яку повернув сервер
      if (error.response) {
        console.error('Помилка реєстрації:', error.response.data.error);
      } else {
        console.error('Помилка під час реєстрації:', error.message);
      }
    }
  };

  return (
    <div>
      <h2>Реєстрація</h2>
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
        <button type="submit">Зареєструватися</button>
      </form>
    </div>
  );
};

export default Register;
