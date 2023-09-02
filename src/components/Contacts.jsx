import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Функція для отримання списку контактів з сервера
    const fetchContacts = async () => {
      try {
        const response = await axios.get('https://connections-api.herokuapp.com/contacts');

        if (response.status === 200) {
          // Якщо запит успішний, оновіть стан контактів
          setContacts(response.data);
        }
      } catch (error) {
        // Обробка помилок при отриманні контактів
        console.error('Помилка при отриманні контактів:', error);
      }
    };

    // Виклик функції для отримання контактів при завантаженні компонента
    fetchContacts();
  }, []);

  return (
    <div>
      <h2>Список контактів</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            {contact.name}: {contact.phone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
