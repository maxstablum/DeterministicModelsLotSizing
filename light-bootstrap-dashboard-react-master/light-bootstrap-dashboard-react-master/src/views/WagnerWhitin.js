import React, { Component } from 'react';
import { Button, Card, Container, Row, Col, Form } from 'react-bootstrap';
import WagnerWhitinService from '../services/wagner_whitin.service'; // Import the service
import WagnerWhitinResults from './WagnerWhitinResults'; // Import the results component

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
            value: usePresetDemands ? presetDemands[index].toString() : '',
        })),
        orderingCost: '',
        holdingCost: '',
        results: null
    };
}
    // Function to add a period to the view
    addPeriod = () => {
        this.setState(prevState => ({
            periods: [...prevState.periods, { id: prevState.periods.length, value: '' }]
        }));
    };

    // Function to remove a period from the view
    removePeriod = (id) => {
        const newPeriods = this.state.periods.filter(period => period.id !== id);
        this.setState({ periods: newPeriods });
      };

    // Function to handle the change of a period
    handlePeriodChange = (id, value) => {
        const newPeriods = this.state.periods.map(period =>
            period.id === id ? { ...period, value: value } : period
        );
        this.setState({ periods: newPeriods });
    };

    //Function to send the parameters to the backend with using the WagnerWhitinService
    calculate = () => {
        const periodValues = this.state.periods.map(period => parseInt(period.value, 10) || 0);
        const orderCostInt = parseInt(this.state.orderingCost, 10) || 0;
        const holdingCostInt = parseInt(this.state.holdingCost, 10) || 0;
        const isDataIncomplete = this.state.periods.some(period => period.value === '') || 
        this.state.holdingCost === '' || this.state.orderingCost === '';

        if (isDataIncomplete) {
            // Alert the user if data is incomplete
            alert('Please enter values for all periods.');
            return;
        }

        WagnerWhitinService.calculateWagnerWhitin(periodValues, holdingCostInt, orderCostInt)
            .then(response => {
                this.setState({ results: response.data }); // Update the state with the results
                console.log("Calculation successful", response.data);
            })
            .catch(error => {
                console.error("Calculation failed!", error);
            });
    };

    // Function to render the period inputs
    renderPeriodInputs = () => {
        let inputs = [];
        for (let i = 0; i < this.state.periods.length; i += 10) {
            inputs.push(
                <Row key={i}>
                    {this.state.periods.slice(i, i + 10).map(period => (
                        <Col md={1} key={period.id}>
                            <Form.Group>
                                <Form.Label>{`P${period.id + 1}`}</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={period.value}
                                    onChange={e => this.handlePeriodChange(period.id, e.target.value)}
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
                                                      onChange={(e) => this.setState({ orderingCost: e.target.value })}
                                                  />
                                              </Form.Group>
                                          </Col>
                                          <Col md="6">
                                              <Form.Group>
                                                  <Form.Label>Holding Cost</Form.Label>
                                                  <Form.Control
                                                      type="number"
                                                      value={this.state.holdingCost}
                                                      onChange={(e) => this.setState({ holdingCost: e.target.value })}
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
                                            <Button variant="danger" onClick={() => this.removePeriod(this.state.periods.length - 1)}>
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
                  />
              )}
          </>
      );
  }
}

export default WagnerWhitin;
