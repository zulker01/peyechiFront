import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
function ProfilePage({onSwitchToLogin}){
    return(
        <Container>
          <Row className="mb-3">
    <Col></Col>
    <Col>
      <Row>
        <Col>Name</Col>
        <Col>usernamevar</Col>
      </Row>
    </Col>
    <Col></Col>
  </Row>

  <Row className="mb-3">
    <Col></Col>
    <Col>
      <Row>
        <Col>Email</Col>
        <Col>useremailvar</Col>
      </Row>
    </Col>
    <Col></Col>
  </Row>
        </Container>


    );
}
export default ProfilePage;