import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function AppNavbar({
  onSwitchToHome,
  onSwitchToLogin,
  onSwitchToSignup,
  onSwitchToProfile,
  currentUser,
  onLogout
}) {
  const userDisplayName = currentUser && (currentUser.username || currentUser.email || 'User');

  return (
    <Navbar expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand onClick={onSwitchToHome} style={{ cursor: 'pointer' }}>
          Lost & Found
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {userDisplayName ? (
              <>
                <NavDropdown title={`Welcome ${userDisplayName}`} id="user-nav-dropdown">
                  <NavDropdown.Item onClick={onSwitchToProfile}>Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <NavDropdown title="Account" id="login-signup-dropdown">
                <NavDropdown.Item onClick={onSwitchToLogin}>Login</NavDropdown.Item>
                <NavDropdown.Item onClick={onSwitchToSignup}>Sign Up</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
