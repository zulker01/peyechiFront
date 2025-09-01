import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

function AppNavbar({ onSwitchToHome, onSwitchToLogin, onSwitchToSignup, currentUser, onLogout }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="w-100">
      <Container fluid>
        <Navbar.Brand href="#" onClick={onSwitchToHome} style={{cursor: 'pointer'}}>My App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link onClick={onSwitchToHome} style={{cursor: 'pointer'}}>Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            {currentUser ? (
              <NavDropdown 
                title={`Welcome, ${currentUser.username || currentUser.email || 'User'}`} 
                id="user-nav-dropdown"
                align="end"
              >
                <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="#settings">Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link onClick={onSwitchToLogin} style={{cursor: 'pointer'}}>Login</Nav.Link>
                {onSwitchToSignup && (
                  <Nav.Link onClick={onSwitchToSignup} style={{cursor: 'pointer'}}>Sign Up</Nav.Link>
                )}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
