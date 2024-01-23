import { React, Component } from "react";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import WagnerWhitinService from "../services/wagner_whitin.service"; // Import the service
//import { WagnerWhitinResults } from './WagnerWhitinResults';
import WagnerWhitinResults from "./WagnerWhitinResults"; // Import the results component
import * as XLSX from "xlsx";
import Template from "../assets/xlsx/1Import_Deterministic_Models.xlsx"; // Import the Excel file

// WagnerWhitin component
class WagnerWhitin extends Component {
  // Constructor
  constructor(props) {
    super(props);
    const usePresetDemands = true; // Value to change for testing cases

    // Preset demand values for testing purposes
    const presetDemands = [20, 50, 10, 50, 50, 10, 20, 40, 20, 30];

    // Set the state
    this.state = {
      periods: Array.from({ length: 10 }, (_, index) => ({
        id: index,
        value: usePresetDemands ? presetDemands[index].toString() : "",
      })),
      orderingCost: "",
      holdingCost: "",
      results: null,
      file: null,
    };
  }
  // Function to add a period to the view
  addPeriod = () => {
    this.setState((prevState) => ({
      periods: [
        ...prevState.periods,
        { id: prevState.periods.length, value: "" },
      ],
    }));
  };

  // Function to remove a period from the view
  removePeriod = (id) => {
    const newPeriods = this.state.periods.filter((period) => period.id !== id);
    this.setState({ periods: newPeriods });
  };

  // Function to handle the change of a period
  handlePeriodChange = (id, value) => {
    const newPeriods = this.state.periods.map((period) =>
      period.id === id ? { ...period, value: value } : period
    );
    this.setState({ periods: newPeriods });
  };

  //Function to send the parameters to the backend with using the WagnerWhitinService
  calculate = () => {
    const periodValues = this.state.periods.map(
      (period) => parseInt(period.value, 10) || 0
    );
    const orderCostInt = parseInt(this.state.orderingCost, 10) || 0;
    const holdingCostInt = parseInt(this.state.holdingCost, 10) || 0;
    const isDataIncomplete =
      this.state.periods.some((period) => period.value === "") ||
      this.state.holdingCost === "" ||
      this.state.orderingCost === "";

    if (isDataIncomplete) {
      // Alert the user if data is incomplete
      alert("Please enter values for all periods.");
      return;
    }

    WagnerWhitinService.calculateWagnerWhitin(
      periodValues,
      holdingCostInt,
      orderCostInt
    )
      .then((response) => {
        this.setState({ results: response.data }); // Update the state with the results
        console.log("Calculation successful", response.data);
      })
      .catch((error) => {
        console.error("Calculation failed!", error);
      });
  };

  // Function to render the period inputs
  renderPeriodInputs = () => {
    let inputs = [];
    for (let i = 0; i < this.state.periods.length; i += 10) {
      inputs.push(
        <Row key={i}>
          {this.state.periods.slice(i, i + 10).map((period) => (
            <Col md={1} key={period.id}>
              <Form.Group>
                <Form.Label>{`P${period.id + 1}`}</Form.Label>
                <Form.Control
                  type="number"
                  value={period.value}
                  onChange={(e) =>
                    this.handlePeriodChange(period.id, e.target.value)
                  }
                  size="sm"
                />
              </Form.Group>
            </Col>
          ))}
        </Row>
      );
    }

    return inputs;
  };

  handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      this.setState({ file }, () => {
        this.handleSubmit();
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
  };

  processData = (data) => {
    console.log(data);
    // Looking for the ordering cost and holding cost
    const holdingCost = data[2][1];
    const orderingCost = data[3][1];

    // Looking for the demand values
    const seventhRow = data[6];
    const periods = seventhRow
      ? seventhRow.slice(1).map((value, index) => ({
          id: index,
          value: value ? value.toString() : "",
        }))
      : [];

    // Update the state
    this.setState({
      periods,
      orderingCost,
      holdingCost,
    });
  };

  render() {
    return (
      <>
        <Container fluid>
          <Row>
            <Col md="12">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">Wagner-Whitin Parameters</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Row>
                      {/* Ordering Cost and Holding Cost side by side */}
                      <Col md="6">
                        <Form.Group>
                          <Form.Label>Ordering Cost</Form.Label>
                          <Form.Control
                            type="number"
                            value={this.state.orderingCost}
                            onChange={(e) =>
                              this.setState({ orderingCost: e.target.value })
                            }
                          />
                        </Form.Group>
                      </Col>
                      <Col md="6">
                        <Form.Group>
                          <Form.Label>Holding Cost</Form.Label>
                          <Form.Control
                            type="number"
                            value={this.state.holdingCost}
                            onChange={(e) =>
                              this.setState({ holdingCost: e.target.value })
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    {/* Period Inputs */}
                    {this.renderPeriodInputs()}
                    {/* Add Period Button */}
                    <Row>
                      <Col md="12">
                        <Button variant="primary" onClick={this.addPeriod}>
                          Add Period
                        </Button>
                      </Col>
                    </Row>
                    {/* Remove Period Button */}
                    <Row>
                      <Col md="12">
                        <Button
                          variant="danger"
                          onClick={() =>
                            this.removePeriod(this.state.periods.length - 1)
                          }
                        >
                          Remove Period
                        </Button>
                      </Col>
                    </Row>
                    {/* Calculate Button */}
                    <Row>
                      <Col md="12">
                        <Button variant="primary" onClick={this.calculate}>
                          Calculate
                        </Button>
                      </Col>
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
        {/* Conditional Rendering of Results and using the WagnerWhitinResults component*/}
        {this.state.results && (
          <WagnerWhitinResults
            totalCost={this.state.results.totalCost}
            orderSchedule={this.state.results.orderSchedule}
            costMatrix={this.state.results.costMatrix}
            productionPeriods={this.state.results.productionPeriods}
          />
        )}
      </>
    );
  }
}

export default WagnerWhitin;
