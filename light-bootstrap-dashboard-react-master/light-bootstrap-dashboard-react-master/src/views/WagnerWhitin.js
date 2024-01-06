import React, { Component } from 'react';
import { Button, Card, Container, Row, Col, Form } from 'react-bootstrap';
import WagnerWhitinService from '../services/wagner_whitin.service'; // Import the service
import WagnerWhitinResults from './WagnerWhitinResults'; // Import the results component

class WagnerWhitin extends Component {
  constructor(props) {
    super(props);
    const usePresetDemands = true; // Value to change for testing cases

    // Preset demand values
    const presetDemands = [20, 50, 10, 50, 50, 10, 20, 40, 20, 30];

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

    addPeriod = () => {
        this.setState(prevState => ({
            periods: [...prevState.periods, { id: prevState.periods.length, value: '' }]
        }));
    };

    handlePeriodChange = (id, value) => {
        const newPeriods = this.state.periods.map(period =>
            period.id === id ? { ...period, value: value } : period
        );
        this.setState({ periods: newPeriods });
    };

    calculate = () => {
        const periodValues = this.state.periods.map(period => parseInt(period.value, 10) || 0);
        const orderCostInt = parseInt(this.state.orderingCost, 10) || 0;
        const holdingCostInt = parseInt(this.state.holdingCost, 10) || 0;

        WagnerWhitinService.calculateWagnerWhitin(periodValues, holdingCostInt, orderCostInt)
            .then(response => {
                this.setState({ results: response.data }); // Update the state with the results
                console.log("Calculation successful", response.data);
            })
            .catch(error => {
                console.error("There was an error!", error);
            });
    };

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
                                      {this.renderPeriodInputs()}
                                      <Row>
                                          <Col md="12">
                                              <Button variant="primary" onClick={this.addPeriod}>
                                                  Add Period
                                              </Button>
                                          </Col>
                                      </Row>
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
              {/* Conditional Rendering of Results */}
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
