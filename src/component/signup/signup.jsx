import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap'

function Signup({ onSwitchToLogin }) {
  // const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  // const [type, setType] = useState('default');

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
          // id: id,
          username: username,
          password: password,
          email: email,
          // type: type
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

  useEffect(() => {
    if (result) {
      const timer = setTimeout(() => {
        onSwitchToLogin(); // ✅ call the function
      }, 2500); // 2.5 seconds
  
      // Clean up the timer if component unmounts
      return () => clearTimeout(timer);
    }
  }, [result, onSwitchToLogin]);
  
  return (
    <Container className="signup mt-5" style={{ maxWidth: '500px' }}>
  <h2 className="mb-4 text-center">Signup</h2>

  <Form onSubmit={handleSubmit}>
    {/* <Form.Group className="mb-3" controlId="id">
      <Form.Label>ID</Form.Label>
      <Form.Control
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="Enter user ID"
        required
      />
    </Form.Group> */}

    <Form.Group className="mb-3" controlId="username">
      <Form.Label>Username</Form.Label>
      <Form.Control
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
        required
      />
    </Form.Group>

    <Form.Group className="mb-3" controlId="password">
      <Form.Label>Password</Form.Label>
      <Form.Control
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
        required
      />
    </Form.Group>

    <Form.Group className="mb-3" controlId="email">
      <Form.Label>Email</Form.Label>
      <Form.Control
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
        required
      />
    </Form.Group>

    {/* <Form.Group className="mb-3" controlId="type">
      <Form.Label>Type</Form.Label>
      <Form.Control
        type="text"
        value={type}
        onChange={(e) => setType(e.target.value)}
        placeholder="Enter type"
        required
      />
    </Form.Group> */}

    <Button type="submit" variant="success" className="w-100 mb-3">
      Create Account
    </Button>
  </Form>

  {result && (
    <Alert variant="success">
      <strong>Success:</strong> User registered. Redirecting to login
      {/* <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(result, null, 2)}</pre> */}
    </Alert>
  )}

  {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

  <div className="text-center mt-3">
    <Button variant="secondary" size="sm" onClick={onSwitchToLogin}>
      Login
    </Button>
  </div>
</Container>
  );
}

export default Signup;

