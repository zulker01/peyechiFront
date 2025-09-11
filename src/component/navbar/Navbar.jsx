import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
function AppNavbar({ onSwitchToHome, onSwitchToLogin, onSwitchToSignup, onSwitchToProfile, currentUser, onLogout }) {
  const userDisplayName = currentUser && (currentUser.username || currentUser.email || 'User');

  return (
    <Navbar expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand onClick={onSwitchToHome}>React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="ms-auto">
            {userDisplayName ? (
          <>
            <Nav.Link onClick={onSwitchToHome}>{userDisplayName}</Nav.Link>
            <NavDropdown title={`Welcome ${userDisplayName}`} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={onSwitchToProfile}>Profile</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </>
        ) : (
          <>
            <Nav.Link href="#login">Login</Nav.Link>
            <Nav.Link href="#signup">Sign Up</Nav.Link>
          </>
        )}
      </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
