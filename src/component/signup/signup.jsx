import React, { useState } from 'react';
import axios from 'axios';

function Signup({ onSwitchToLogin }) {
  const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('');

  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setResult(null);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_backendURI}/api/auth/user/register`,
        {
          id: id,
          username: username,
          password: password,
          email: email,
          type: type
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      setResult(response?.data ?? null);
    } catch (error) {
      console.error('Signup failed:', error);
      setErrorMessage('Signup failed. Please try again later.');
    }
  };

  return (
    <div className="signup">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">ID</label>
          <input
            id="id"
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Enter user id"
            required
          />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>
        <div>
          <label htmlFor="email">email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </div>
        <div>
          <label htmlFor="type">type</label>
          <input
            id="type"
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Enter type"
            required
          />
        </div>
        <button type="submit">Create account</button>
      </form>
      {result && (
        <div>
          <p><strong>Success:</strong> User registered.</p>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
      {errorMessage && (
        <div>
          <p>{errorMessage}</p>
        </div>
      )}
      <div style={{ marginTop: '12px' }}>
        <button type="button" onClick={onSwitchToLogin}>Login</button>
      </div>
    </div>
  );
}

export default Signup;

