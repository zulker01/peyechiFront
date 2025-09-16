import React,{ useState } from 'react';
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import FoundItemsList from '../FoundItemsList/FoundItemsList';

function ProfilePage({token,currentUser,onSwitchToItemsList}){
  const [currentView, setCurrentView] = useState('home');

    
    if (currentView === 'browseFoundItems') return <FoundItemsList token={token} onBackToHome={() => setCurrentView('home')}  user={currentUser}/>;
    return(
        <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm border-0 rounded-3">
            <Card.Header className="d-flex justify-content-between align-items-center bg-primary text-white">
              <h5 className="mb-0">Profile</h5>
              <Button variant="light" size="sm" onClick={()=>setCurrentView('browseFoundItems')}>
                Your Reported Items
              </Button>
            </Card.Header>

            <Card.Body>
              <Row className="mb-3">
                <Col xs={4} className="fw-bold">
                  Name:
                </Col>
                <Col>{currentUser?.username || "N/A"}</Col>
              </Row>

              <Row className="mb-3">
                <Col xs={4} className="fw-bold">
                  Email:
                </Col>
                <Col>{currentUser?.email || "N/A"}</Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  


    );
}
export default ProfilePage;