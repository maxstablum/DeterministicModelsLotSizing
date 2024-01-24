import React, { Component } from "react";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import eoqService from "../services/eoq.service";
import * as XLSX from "xlsx";
import Template from "../assets/xlsx/1Import_Deterministic_Models.xlsx"; // Import the Excel file
import costImg from "../assets/img/cost.png";

// EOQ component
export default class EOQ extends Component {
  // Constructor
  constructor(props) {
    super(props);
    this.onChangeDemand = this.onChangeDemand.bind(this);
    this.onChangeASetup = this.onChangeASetup.bind(this);
    this.onChangeH = this.onChangeH.bind(this);
    this.calculate = this.calculate.bind(this);

    //Old method: this.upload = this.upload.bind(this);
    // Set the state
    this.state = {
      averageDemand: null,
      aSetup: null,
      h: null,
      file: null,
    };
  }

  /**
   * On Change handlers:
   */
  onChangeDemand(e) {
    console.log(e.target.value);
    if (e.target.value < 0) {
      this.setState({
        averageDemand: 0,
      });
      return;
    }
    this.setState({
      averageDemand: parseFloat(e.target.value),
    });
  }

  onChangeASetup(e) {
    if (e.target.value < 0) {
      this.setState({
        aSetup: 0,
      });
      return;
    }
    this.setState({
      aSetup: parseFloat(e.target.value),
    });
  }

  onChangeH(e) {
    if (e.target.value < 0) {
      this.setState({
        h: 0,
      });
      return;
    }
    this.setState({
      h: parseFloat(e.target.value),
    });
  }

  handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      this.setState({ file }, () => {
        this.handleSubmit();
        //console.log(this.state);
      });
    }
  };

  handleSubmit = () => {
    const { file } = this.state;
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      try {
        this.processData(json);
      } catch (error) {
        alert("Error while processing the file: " + error.message);
      }
    };
    reader.readAsBinaryString(file);
    document.getElementById("custom-file").value = "";
  };

  processData = (data) => {
    console.log(data);
    // Looking for the setup cost and holding cost
    const h = data[2][1];
    const aSetup = data[3][1];

    // Looking for the demand values and calculate a average
    const seventhRow = data[6];
    console.log("seventhRow:", seventhRow);
    // Summiere die Werte von Index 1 bis zum Ende
    const sum = seventhRow
      .slice(1)
      .reduce((accumulator, value) => accumulator + value, 0);

    // Berechne den Durchschnitt
    const averageDemand = sum / (seventhRow.length - 1); // Subtrahiere 1, da das erste Element "Demand" übersprungen wird

    console.log("Durchschnitt:", averageDemand);

    console.log("----------------------");
    // Update the state
    //Calculate the average demand
    this.setState(
      {
        averageDemand,
        aSetup,
        h,
      },
      () => {
        this.calculate();
      }
    );
  };

  // Function to send the parameters to the backend with using the eoqService
  calculate = () => {
    // Check if the parameters are valid
    if (
      this.state.averageDemand === null ||
      isNaN(this.state.averageDemand) ||
      this.state.averageDemand === 0
    ) {
      alert("Please enter a valid average demand.");
      return;
    }

    if (
      this.state.aSetup === null ||
      isNaN(this.state.aSetup) ||
      this.state.aSetup === 0
    ) {
      alert("Please enter valid setup costs.");
      return;
    }

    if (this.state.h === null || isNaN(this.state.h) || this.state.h === 0) {
      alert("Please enter valid holding costs.");
      return;
    }

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
                      <Col md="3">
                        <Form.Group>
                          <Form.Label>Average Demand in Time Period</Form.Label>
                          <Form.Control
                            type="number"
                            value={this.state.averageDemand}
                            onChange={this.onChangeDemand}
                          />
                        </Form.Group>
                      </Col>
                      <Col md="3">
                        <Form.Group>
                          <Form.Label>Setup Costs</Form.Label>
                          <Form.Control
                            type="number"
                            value={this.state.aSetup}
                            onChange={this.onChangeASetup}
                          />
                        </Form.Group>
                      </Col>
                      <Col md="3">
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
                    <br />
                    <Row className="align-items-center">
                      <Col xs="auto" as="h5">
                        <br />
                        Optimal Reorder Quantity:
                      </Col>
                      <Col
                        xs="auto"
                        className="text-left"
                        style={{
                          fontSize: "2rem",
                          fontWeight: "bold",
                          color: "#007BFF",
                        }}
                      >
                        {this.state.response}
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col fluid>
              <Card>
                <Card.Header>
                  <Card.Title as="h4">Calculate your average demand</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form>
                    If you're unsure about your average demand rate, we've got
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
              <Row
                className="justify-content-center align-items-center"
                style={{ marginTop: "5vh" }}
              >
                <img
                  src={costImg}
                  width="40%"
                  height="auto"
                  alt="Centered Image"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
