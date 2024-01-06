// WagnerWhitinResults.js

import React, { Component } from 'react';
import { Table, Card, Container, Row, Col } from 'react-bootstrap';

class WagnerWhitinResults extends Component {
    render() {
        const { totalCost, orderSchedule, costMatrix } = this.props;
        const lastTotalCost = totalCost[totalCost.length - 1]; // Get the last total cost

        // Inline styles
        const smallTableStyle = {
            fontSize: "0.8rem", // Smaller font size
            width: "100%", // Ensure it takes the full width
        };

        const smallCellStyle = {
            padding: "0.2rem", // Smaller padding for cells
        };

        return (
            <Container className="mt-4">
                <Row>
                    <Col md="12"> {/* Adjusted for full width */}
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Wagner-Whitin Calculation Results</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                {/* Total Cost */}
                                <h5>Total Cost</h5>
                                <p>{lastTotalCost}</p>

                                {/* Order Schedule Numbers */}
                                <h5>Order Schedule Numbers</h5>
                                <p>{orderSchedule.join(", ")}</p> {/* Display the order schedule numbers */}
                                {/* Cost Matrix */}
                                <Table striped bordered hover size="sm" style={smallTableStyle}>
                                    <thead>
                                        <tr>
                                            <th style={smallCellStyle}>Last week with Production</th>
                                            {Array.from({ length: costMatrix[0].length }, (_, index) => (
                                                <th key={index} style={smallCellStyle}>T={index + 1}</th> // Planning Horizon t
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {costMatrix.map((row, rowIndex) => (
                                            <tr key={rowIndex}>
                                                <td style={smallCellStyle}>{rowIndex + 1}</td>
                                                {row.map((cost, index) => (
                                                    <td key={index} style={smallCellStyle}>{cost}</td> // Cost values
                                                ))}
                                            </tr>
                                        ))}
                                        {/* Z* row */}
                                        <tr>
                                            <td style={smallCellStyle}>Z*_t</td>
                                            {totalCost.map((cost, index) => (
                                                <td key={index} style={smallCellStyle}>{cost}</td> // Total cost values
                                            ))}
                                        </tr>
                                        {/* J* row - increment each value by 1 before rendering */}
                                        <tr>
                                            <td style={smallCellStyle}>J*_t</td>
                                            {orderSchedule.map((period, index) => (
                                                <td key={index} style={smallCellStyle}>{period + 1}</td> // Incremented Order schedule values
                                            ))}
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default WagnerWhitinResults;


