import React, { useState } from 'react';
import axios from 'axios';

function CreateFoundItem({ token, userId, onBack }) {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    description: '',
    location: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200 || response.status === 201) {
        setMessage('Found item created successfully!');
        // Clear form after successful submission
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
    <div className="found-info">
      <div className="found-info-header">
        <h2>Found Anything ? Add here</h2>
        <button onClick={onBack} className="back-btn">← Back to Home</button>
      </div>
      
      {message && (
        <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="found-info-form">
        {[
          { key: 'name', label: 'Items Found' },
          { key: 'quantity', label: 'Quantity' },
          { key: 'description', label: 'Description' },
          { key: 'location', label: 'Location' }
        ].map(field => (
          <div key={field.key} className="form-group">
            <label htmlFor={field.key}>{field.label}:</label>
            <input
              type="text"
              id={field.key}
              name={field.key}
              value={formData[field.key]}
              onChange={(e) => setFormData({...formData, [field.key]: e.target.value})}
              placeholder={`Enter ${field.label.toLowerCase()}`}
              required
            />
          </div>
        ))}
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Creating...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default CreateFoundItem;
