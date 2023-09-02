import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);
  const [newContact, setNewContact] = useState({ name: '', number: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      return navigate('/login');
    }

    const fetchContacts = async () => {
      try {
        const response = await axios.get('https://connections-api.herokuapp.com/contacts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setContacts(response.data);
        }
      } catch (error) {
        if (error.response) {
          setError(error.response.data.error);
        } else {
          setError('Error fetching contacts');
        }
      }
    };

    fetchContacts();
  }, [navigate]);

  const handleCreateContact = async () => {
    try {
      const token = localStorage.getItem('authToken');

      if (!token) {
        throw new Error('Authorization token is missing');
      }

      const response = await axios.post(
        'https://connections-api.herokuapp.com/contacts',
        newContact,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        setNewContact({ name: '', number: '' });
        setContacts([...contacts, response.data]);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError('Error creating contact');
      }
    }
  };

  const handleDeleteContact = async (contactId) => {
    try {
      const token = localStorage.getItem('authToken');

      if (!token) {
        throw new Error('Authorization token is missing');
      }

      const response = await axios.delete(`https://connections-api.herokuapp.com/contacts/${contactId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
        setContacts(updatedContacts);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError('Error deleting contact');
      }
    }
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2>Contacts</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <div>
            <TextField
              type="text"
              placeholder="Name"
              variant="outlined"
              margin="normal"
              fullWidth
              value={newContact.name}
              onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
            />
            <TextField
              type="text"
              placeholder="Number"
              variant="outlined"
              margin="normal"
              fullWidth
              value={newContact.number}
              onChange={(e) => setNewContact({ ...newContact, number: e.target.value })}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleCreateContact}
            >
              Create Contact
            </Button>
          </div>
          <div>
            <TextField
              type="text"
              placeholder="Search Contacts"
              variant="outlined"
              margin="normal"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <List>
            {filteredContacts.map((contact) => (
              <ListItem key={contact.id}>
                <ListItemText primary={contact.name} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteContact(contact.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </div>
  );
};

export default Contacts;
