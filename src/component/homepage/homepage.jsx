import React, { useState } from 'react';
import CreateFoundItem from '../CreateFoundInfo/CreateFoundInfo';
import FoundItemsList from '../FoundItemsList/FoundItemsList';
import { Container, Row, Col, Button, Card, Form, InputGroup } from 'react-bootstrap';

function Home({token, userId, onBackToLogin, onSwitchToSignup}){
    const [currentView, setCurrentView] = useState('home');

    if (currentView === 'createFoundItem') return <CreateFoundItem token={token} userId={userId} onBack={() => setCurrentView('home')}  onBackToLogin={onBackToLogin}/>;
    if (currentView === 'browseFoundItems') return <FoundItemsList token={token} onBack={() => setCurrentView('home')} onBackToLogin={onBackToLogin} />;
    

    return(
<Container className="mt-5">
  {/* Hero Section */}
  <Row className="align-items-center text-center mb-5">
    <Col>
      <h1 className="display-4 mb-3">Welcome to Lost & Found</h1>
      <p className="lead mb-4">
        Quickly report found items or browse items that have been found.
      </p>

      <InputGroup className="mb-3 justify-content-center" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <Form.Control
          placeholder="Search items by name or location"
          aria-label="Search items"
        />
        <Button variant="primary">Search</Button>
      </InputGroup> 

      {/* <div className="d-flex justify-content-center gap-3 mt-3">
        <Button variant="warning" size="lg" onClick={() => setCurrentView('foundItemReport')}>
          Report Found Item
        </Button>
        <Button variant="success" size="lg" onClick={() => setCurrentView('found')}>
          Check Found
        </Button>
      </div> */}
    </Col>
  </Row>

  {/* Feature Section */}
  <Row className="text-center">
    <Col md={4} className="mb-6">
      <Card>
        <Card.Body>
          <Card.Title>Report Found Items</Card.Title>
          <Card.Text>
            Quickly fill out details about items you have found and help owners get them back.
          </Card.Text>
          <Button variant="warning" onClick={() => setCurrentView('createFoundItem')}>Report Now</Button>
        </Card.Body>
      </Card>
    </Col> 

    <Col md={4} className="mb-4">
      <Card>
        <Card.Body>
          <Card.Title>Browse Found Items</Card.Title>
          <Card.Text>
            Check all the items that have been found in your area and contact the finder.
          </Card.Text>
          <Button variant="success" onClick={() => setCurrentView('browseFoundItems')}>Browse</Button>
        </Card.Body>
      </Card>
    </Col>

    <Col md={4} className="mb-4">
      <Card>
        <Card.Body>
          <Card.Title>Create Account</Card.Title>
          <Card.Text>
            Register to get full access, report found items, and track items efficiently.
          </Card.Text>
          <Button variant="primary" onClick={onSwitchToSignup}>Sign Up</Button>
        </Card.Body>
      </Card>
    </Col>
  </Row>
</Container>
    );
}

export default Home;