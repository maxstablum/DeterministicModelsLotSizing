import React from "react";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

import costImg from "../assets/img/cost.png";

function Homepage() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col fluid>
            <Card>
              <Card.Header>
                <Card.Title as="h4">
                  Term Project - Deterministic Models for Lot Sizing
                </Card.Title>
                <p className="card-category">
                  by Tamino Gaub & Maximilian Stablum
                </p>
              </Card.Header>
              <Card.Body>Text TBD</Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-history"></i>
                  Updated 16.01.2024
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-center align-items-center">
          <img
            src={costImg}
            width="40%"
            height="auto"
            alt="Centered Image"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </Row>
      </Container>
    </>
  );
}

export default Homepage;
