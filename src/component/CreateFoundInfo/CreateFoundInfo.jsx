import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

import axios from 'axios';

function CreateFoundItem({ token, userId,onBackToLogin,onBackToHome }) {
  
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    description: '',
    location: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Redirect to login if token is null
  useEffect(() => {
    if (!token) {
      onBackToLogin();
    }
  }, [token,onBackToLogin ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const requestBody = {
        name: formData.name,
        quantity: formData.quantity,
        description: formData.description,
        location: formData.location,
        user: userId
      };

      const response = await axios.post(
        `${process.env.REACT_APP_backendURI}/api/foundItem/create`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200 || response.status === 201) {
        setMessage('Found item created successfully!');
        setFormData({
          name: '',
          quantity: '',
          description: '',
          location: ''
        });
      }
    } catch (error) {
      console.error('Error creating found item:', error);
      setMessage(error.response?.data?.message || 'Failed to create found item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4 text-center">Found Anything? Add Here</h2>

      {message && (
        <Alert variant={message.includes('successfully') ? 'success' : 'danger'}>
          {message}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        {[
          { key: 'name', label: 'Items Found' },
          { key: 'quantity', label: 'Quantity' },
          { key: 'description', label: 'Description' },
          { key: 'location', label: 'Location' }
        ].map(field => (
          <Form.Group className="mb-3" controlId={field.key} key={field.key}>
            <Form.Label>{field.label}</Form.Label>
            <Form.Control
              type="text"
              value={formData[field.key]}
              onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
              placeholder={`Enter ${field.label.toLowerCase()}`}
              required
            />
          </Form.Group>
        ))}

        <div className="d-flex justify-content-between">
          <Button variant="secondary" onClick={() => onBackToHome}>
            ← Back to Home
          </Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Creating...' : 'Submit'}
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default CreateFoundItem;
