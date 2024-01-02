import React, { useState } from "react";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import WagnerWhitinService from '../services/wagner_whitin.service'; // import the service

function WagnerWhitin() {
  const defaultPeriods = 10;
  const [periods, setPeriods] = useState(
    Array.from({ length: defaultPeriods }, (_, index) => ({
      id: index,
      value: '',
    }))
  );
  const [orderingCost, setOrderingCost] = useState('');
  const [holdingCost, setHoldingCost] = useState('');

  const addPeriod = () => {
    setPeriods([...periods, { id: periods.length, value: '' }]);
  };

  const handlePeriodChange = (id, value) => {
    const newPeriods = periods.map((period) =>
      period.id === id ? { ...period, value: value } : period
    );
    setPeriods(newPeriods);
  };

  const calculate = () => {
    const periodValues = periods.map((period) => parseInt(period.value, 10) || 0);
    const orderCostInt = parseInt(orderingCost, 10) || 0;
    const holdingCostInt = parseInt(holdingCost, 10) || 0;

    // Send data to the service and handle the response
    WagnerWhitinService.calculateWagnerWhitin(periodValues, holdingCostInt, orderCostInt)
        .then(response => {
            console.log("Calculation successful", response.data);
            // Handle the response data as needed
            // For example, update the state to display results in the UI
        })
        .catch(error => {
            console.error("There was an error!", error);
        });
};


  // Helper function to render period input fields
  const renderPeriodInputs = () => {
    let inputs = [];
    for (let i = 0; i < periods.length; i += defaultPeriods) {
      inputs.push(
        <Row key={i}>
          {periods.slice(i, i + defaultPeriods).map((period) => (
            <Col md={1} key={period.id}>
              <Form.Group>
                <Form.Label>{`P${period.id + 1}`}</Form.Label>
                <Form.Control
                  type="number"
                  value={period.value}
                  onChange={(e) => handlePeriodChange(period.id, e.target.value)}
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
                          value={orderingCost}
                          onChange={(e) => setOrderingCost(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <Form.Label>Holding Cost</Form.Label>
                        <Form.Control
                          type="number"
                          value={holdingCost}
                          onChange={(e) => setHoldingCost(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  {renderPeriodInputs()}
                  <Row>
                    <Col md="12">
                      <Button variant="primary" onClick={addPeriod}>
                        Add Period
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Button variant="primary" onClick={calculate}>
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
    </>
  );
}

export default WagnerWhitin;
