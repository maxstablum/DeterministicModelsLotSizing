import React, { Component } from "react";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import eoqService from "../services/eoq.service";
import * as XLSX from "xlsx";
import Template from "../assets/xlsx/1Import_Deterministic_Models.xlsx"; // Import the Excel file

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
      weeksPerYear: 1,
      aSetup: 45,
      h: 15,
      response: null,
    };
  }

  /**
   * On Change handlers:
   */
  onChangeDemand(e) {
    if (e.target.value < 1) {
      this.setState({
        weeklyDemand: 1,
      });
      return;
    }
    this.setState({
      weeklyDemand: parseInt(e.target.value),
    });
  }

  onChangeWeeksPerYear(e) {
    if (e.target.value < 1) {
      this.setState({
        weeksPerYear: 1,
      });
      return;
    }
    this.setState({
      weeksPerYear: parseFloat(e.target.value),
    });
  }

  onChangeASetup(e) {
    if (e.target.value < 1) {
      this.setState({
        aSetup: 1,
      });
      return;
    }
    this.setState({
      aSetup: parseInt(e.target.value),
    });
  }

  onChangeH(e) {
    if (e.target.value < 1) {
      this.setState({
        h: 1,
      });
      return;
    }
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
                  <Card.Title as="h4">
                    Economic Order Quantity - Parameters
                  </Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Row>
                      {/* Weekly Demand and Weeks per Year side by side */}
                      <Col md="6">
                        <Form.Group>
                          <Form.Label>Weekly Demand</Form.Label>
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
            <Col md="12">Optimal Reorder Point: {this.state.response}</Col>
          </Row>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title as="h4">Optimal Reorder Point:</Card.Title>
              <Card.Text
                as="h1"
                style={{
                  fontSize: "3rem",
                  fontWeight: "bold",
                  color: "#007BFF",
                }}
              >
                17
              </Card.Text>
              <Card.Text as="h4">{this.state.response}</Card.Text>
            </Card.Body>
          </Card>

          <Row>
            <Col fluid>
              <Card>
                <Card.Header>
                  <Card.Title as="h4">Calculate your annual demand</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form>
                    If you're unsure about your annual demand rate, we've got
                    you covered. We've created a convenient Excel template that
                    allows you to input your relevant data effortlessly. Simply
                    download the template, fill it in with your details, and
                    then upload it here to seamlessly calculate your Economic
                    Order Quantity (EOQ). It's quick, easy, and ensures accurate
                    results tailored to your specific needs.
                    <br />
                    <br />
                    Follow these simple steps:
                    <br />
                    <ol>
                      <li>
                        Download the Excel template provided on our website.
                      </li>
                      <li>
                        Input your dayily/weekly/quarterly demand rate, setup
                        costs, and holding costs into the template.
                      </li>
                      <li>Save and upload the completed template.</li>
                      <li>
                        Let our website do the calculations for you and provide
                        your optimal EOQ!
                      </li>
                    </ol>
                    <b>Tip:</b> You can use the same template to calculate the{" "}
                    <a href="http://localhost:3000/admin/wagnerwhitin">
                      Wagner Whitin
                    </a>
                    !
                    <Row>
                      <Col md={{ span: 6, offset: 6 }}>
                        <div className="text-right">
                          <p>
                            Insert data from the
                            <a
                              href={Template}
                              download="Import_Deterministic_Models.xlsx"
                            >
                              {" "}
                              Template
                            </a>
                          </p>
                          <label
                            htmlFor="custom-file"
                            className="btn btn-primary"
                          >
                            Upload Excel File
                          </label>
                          <input
                            id="custom-file"
                            type="file"
                            onChange={this.handleFileChange}
                            style={{ display: "none" }}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
