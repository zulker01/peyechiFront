import React, { useState } from 'react';
import axios from 'axios';

function Login({ onSwitchToSignup, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [token, setToken] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

   // if login submit button clicked 
  const handleSubmit = async (event) => {   // for await -> async  ,event-> contains form, submission details, 
    event.preventDefault(); 
    console.log('Login button pressed', { email, password });
    setErrorMessage('');
    setToken('');

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_backendURI}/api/auth/login`,
        {
          // API expects `username`, map from email input
          username: email,
          password: password
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      const receivedToken = response?.data?.data?.token || ''; // ? checks if response is null or undefined
      const username = response?.data?.data?.username || response?.data?.data?.email || email;
      const userData = { username: username, email: email };
      setToken(receivedToken); // sets token locally , not needed 
      console.log('Received token:', receivedToken);
      console.log('User data:', userData);
      
      // Call the parent callback with the token
      if (onLoginSuccess && receivedToken) {
        onLoginSuccess(receivedToken, userData);  // call App method
      }
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('Login failed. Please check your credentials or try again later.');
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email or Username</label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email or username"
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
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {token && (
        <div>
          <p><strong>Token:</strong> {token}</p>
        </div>
      )}
      {errorMessage && ( // if error msg is null or empty no need to render () jsx . 
        <div>
          <p>{errorMessage}</p>
        </div>
      )}
      <div style={{ marginTop: '12px' }}>
        <button type="button" onClick={onSwitchToSignup}>Register</button>
      </div>
    </div>
  );
}

export default Login;

