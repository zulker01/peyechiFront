import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function Users({ token, onBackToLogin }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchUsers = useCallback(async () => { // useCallback -> memoize the function, so it doesn't re-render on every render
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_backendURI}/api/users/all`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setUsers(response?.data?.data || response?.data || []);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      if (error.response?.status === 401) {
        setErrorMessage('Unauthorized. Please login again.');
      } else {
        setErrorMessage('Failed to fetch users. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token, fetchUsers]); // token and fetchUsers are dependencies, so if they change, the effect will run again

  const handleRefresh = () => {
    fetchUsers();
  };

  const handleLogout = () => {
    onBackToLogin();
  };

  return (
    <div className="users">
      <div className="users-header">
        <h2>All Users</h2>
        <div className="users-actions">
          <button onClick={handleRefresh} disabled={loading}>
            {loading ? 'Loading...' : 'Refresh'}
          </button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {loading && <p>Loading users...</p>}
      
      {errorMessage && (
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
      )}

      {!loading && !errorMessage && users.length === 0 && (
        <p>No users found.</p>
      )}

      {!loading && !errorMessage && users.length > 0 && (
        <div className="users-list">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id || index}>
                  <td>{user.id || 'N/A'}</td>
                  <td>{user.username || 'N/A'}</td>
                  <td>{user.email || 'N/A'}</td>
                  <td>{user.type || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Users; 