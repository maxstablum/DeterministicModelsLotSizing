import React, { Component } from 'react';
import { Table, Card, Container, Row, Col } from 'react-bootstrap';

// function to filter out the 0 values from the answer from the backend
function filterArray(arr) {
    return arr.filter(value => value !== 0);
}

// function to remove duplicates from the order schedule, due to the fact that the backend returns the order schedule per period
function removeDuplicates(arr) {
    return [...new Set(arr)];
  }
  
// WagnerWhitinResults component
class WagnerWhitinResults extends Component {
   
    render() {
        // Destructure the props
        const { totalCost, orderSchedule, costMatrix, productionPeriods } = this.props;
        const lastTotalCost = totalCost[totalCost.length - 1]; // Get the last total cost
        const filteredArray = filterArray(productionPeriods);
        const orderScheduleArray = removeDuplicates(orderSchedule);

        
        
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
                                <h5>The optimum of the total costs are: {lastTotalCost} €</h5>
                                {/* Order Schedule and Filtered Array */}
                                {/* Order Schedule Numbers 
                                <h5>The optimal order frequency is: {
                                    [...new Set(orderSchedule.map(number => number + 1))]
                                    .join(", ")
                                }</h5>  
                                 
                                 <h5>The optimal order amount is: {
                                    [...new Set(productionPeriods.map(number => number))]
                                    .join(", ")
                                }</h5> */}
                                {/* Order Schedule and optimal amount of production */}
                                <Table size="sm" style={{ ...smallTableStyle, border: '1px solid grey' }}>
                                    <thead>
                                        <tr>
                                            <th style={{ ...smallCellStyle, width: '20%' }}>Period of production</th>
                                            {orderScheduleArray.map((number) => (
                                                <th key={number} style={smallCellStyle}>{number + 1}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style={smallCellStyle}>Production quantity</td>
                                            {filteredArray.map((quantity, index) => (
                                                <td key={index} style={smallCellStyle}>{quantity}</td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </Table>                             
                                {/* Cost Matrix */}
                                <Table striped bordered hover size="sm" style={smallTableStyle}>
                                    <thead>
                                        <tr>
                                        <th style={{ ...smallCellStyle, width: '20%' }}>Last week with Production</th>
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
                                                <td key={index} style={smallCellStyle}>{period + 1}</td>
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


