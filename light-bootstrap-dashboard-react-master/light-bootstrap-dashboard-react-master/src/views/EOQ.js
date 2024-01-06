import React, { Component } from "react";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import eoqService from "../services/eoq.service";

// EOQ component
export default class EOQ extends Component {
  // Constructor
  constructor(props) {
    super(props);
    this.onChangeDemand = this.onChangeDemand.bind(this);
    this.onChangeWeeksPerYear = this.onChangeWeeksPerYear.bind(this);
    this.onChangeASetup = this.onChangeASetup.bind(this);
    this.onChangeH = this.onChangeH.bind(this);
    this.calculate = this.calculate.bind(this);

    //Old method: this.upload = this.upload.bind(this);
    // Set the state
    this.state = {
      weeklyDemand: 19,
      weeksPerYear: 52,
      aSetup: 45,
      h: 15,
      response: null,
    };
  }

  /**
   * On Change handlers:
   */
  onChangeDemand(e) {
    this.setState({
      weeklyDemand: parseInt(e.target.value),
    });
  }

  onChangeWeeksPerYear(e) {
    this.setState({
      weeksPerYear: parseFloat(e.target.value),
    });
  }

  onChangeASetup(e) {
    this.setState({
      aSetup: parseInt(e.target.value),
    });
  }

  onChangeH(e) {
    this.setState({
      h: parseInt(e.target.value),
    });
  }

  // Function to send the parameters to the backend with using the eoqService
  calculate = () => {
    // Send data to the service and handle the response
    eoqService
      .create(this.state)
      .then((response) => {
        console.log("Calculation successful", response.data);
        this.setState({ response: response.data });
        // Handle the response data as needed
        // For example, update the state to display results in the UI
      })
      .catch((error) => {
        console.error("Tamino: There was an error!", error);
      });
  };

  render() {
    return (
      <div>
        <Container fluid>
          <Row>
            <Col md="12">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">EOQ Parameters</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Row>
                      {/* Ordering Cost and Weeks per Year side by side */}
                      <Col md="6">
                        <Form.Group>
                          <Form.Label>Ordering Cost</Form.Label>
                          <Form.Control
                            type="number"
                            value={this.state.weeklyDemand}
                            onChange={this.onChangeDemand}
                          />
                        </Form.Group>
                      </Col>
                      <Col md="6">
                        <Form.Group>
                          <Form.Label>Weeks per Year</Form.Label>
                          <Form.Control
                            type="number"
                            value={this.state.weeksPerYear}
                            onChange={this.onChangeWeeksPerYear}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      {/* Setup Cost and Holding Cost side by side */}
                      <Col md="6">
                        <Form.Group>
                          <Form.Label>Setup Costs</Form.Label>
                          <Form.Control
                            type="number"
                            value={this.state.aSetup}
                            onChange={this.onChangeASetup}
                          />
                        </Form.Group>
                      </Col>
                      <Col md="6">
                        <Form.Group>
                          <Form.Label>Holding Costs</Form.Label>
                          <Form.Control
                            type="number"
                            value={this.state.h}
                            onChange={this.onChangeH}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        {/* Calculate Button */}
                        <Button variant="primary" onClick={this.calculate}>
                          Calculate
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="12">Result: {this.state.response}</Col>
          </Row>
        </Container>
      </div>
    );
  }
}
