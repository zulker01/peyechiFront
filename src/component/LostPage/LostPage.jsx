import React, { useState, useCallback } from 'react';
import axios from 'axios';

function LostPage({ token, onBack }) {
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchFoundItems = useCallback(async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_backendURI}/api/foundItem/all`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setFoundItems(response?.data?.data || response?.data || []);
    } catch (error) {
      console.error('Failed to fetch found items:', error);
      if (error.response?.status === 401) {
        setErrorMessage('Unauthorized. Please login again.');
      } else {
        setErrorMessage('Failed to fetch found items. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  }, [token]);

  

  const handleRefresh = () => {
    fetchFoundItems();
  };

  return (
    <div className="lost-page">
      <div className="lost-page-header">
        <h2>Lost Items - Check Found Items</h2>
        <div className="header-actions">
          <button onClick={handleRefresh} disabled={loading} className="refresh-btn">
            {loading ? 'Loading...' : '🔄 Refresh'}
          </button>
          <button onClick={onBack} className="back-btn">← Back to Home</button>
        </div>
      </div>

      {loading && (
        <div className="loading-message">
          <p>Loading found items...</p>
        </div>
      )}
      
      {errorMessage && (
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
      )}

      {!loading && !errorMessage && foundItems.length === 0 && (
        <div className="no-items-message">
          <p>No found items available to check.</p>
        </div>
      )}

      {!loading && !errorMessage && foundItems.length > 0 && (
        <div className="items-container">
          <div className="items-grid">
            {foundItems.map((item, index) => (
              <div key={item.id || index} className="item-card">
                <div className="item-header">
                  <h3 className="item-name">{item.name || 'Unnamed Item'}</h3>
                  <span className="item-quantity">Qty: {item.quantity || '1'}</span>
                </div>
                <div className="item-details">
                  <p className="item-description">
                    <strong>Description:</strong> {item.description || 'No description available'}
                  </p>
                  <p className="item-location">
                    <strong>Location:</strong> {item.location || 'Location not specified'}
                  </p>
                  {item.user && (
                    <p className="item-user">
                      <strong>Found by:</strong> {item.user}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default LostPage;
