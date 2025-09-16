import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';
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
      const username = response?.data?.data?.username || response?.data?.data?.email || null;
      const userId = response?.data?.data?.userId  || '';
      const userData = { 
        username: username, 
        email: response?.data?.data?.email, 
        id: userId 
      };
      setToken(receivedToken); // sets token locally , not needed 
      console.log('Received token:', receivedToken);
      console.log('User ID:', userId);
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
    <Container className="login mt-5" style={{ maxWidth: '400px' }}>
  <h2 className="mb-4 text-center">Login</h2>
  <Form onSubmit={handleSubmit}>
    <Form.Group className="mb-3" controlId="email">
      <Form.Label>Email or Username</Form.Label>
      <Form.Control
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email or username"
        required
      />
    </Form.Group>

    <Form.Group className="mb-3" controlId="password">
      <Form.Label>Password</Form.Label>
      <Form.Control
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        required
      />
    </Form.Group>

    <Button type="submit" variant="primary" className="w-100 mb-3">
      Login
    </Button>
  </Form>

  {token && (
    <Alert variant="success">
      <strong>Token:</strong> {token}
    </Alert>
  )}

  {errorMessage && (
    <Alert variant="danger">{errorMessage}</Alert>
  )}

  <div className="text-center mt-3">
    <Button variant="secondary" size="sm" onClick={onSwitchToSignup}>
      Register
    </Button>
  </div>
</Container>
  );
}

export default Login;

