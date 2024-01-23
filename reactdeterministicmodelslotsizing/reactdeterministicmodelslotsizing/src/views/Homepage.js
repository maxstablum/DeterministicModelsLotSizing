import React from "react";
// react-bootstrap components
import { Card, Container, Row, Col } from "react-bootstrap";

import cartoonMan from "../assets/img/cartoonMan.png";
import header from "../assets/img/Header.png";

function Homepage() {
  const pageBackgroundStyle = {
    backgroundImage: `url(${header})`,
    backgroundSize: "cover",
    backgroundPosition: "center center", 
    backgroundRepeat: "no-repeat",
    //minHeight: "100vh",
    width: "100%",
  };

  const cardStyle = {
    backgroundColor: "white",
    marginTop: "3%",
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Palatino+Linotype&display=swap"
      />
      <Container fluid style={pageBackgroundStyle}>
        <Row>
          <Col fluid>
            <Card
              style={{
                width: "32rem",
                backgroundColor: "rgba(110, 110, 110, 0.7)",
                position: "relative",
                marginTop: "5%",
                marginLeft: "10%", // Setzt einen Abstand vom oberen Rand
                padding: "2rem",
              }}
            >
              <Card.Title
                as="h2"
                className="text-white"
                style={{
                  fontFamily:
                    "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
                }}
              >
                <b>EOQ and Wagner Whitin</b>
              </Card.Title>
            </Card>
            <Card style={cardStyle}>
              <Card.Header>
                <Card.Title as="h4">
                  Term Project - Deterministic Models for Lot Sizing
                </Card.Title>
                <p className="card-category">
                  by Tamino Gaub & Maximilian Stablum
                </p>
              </Card.Header>
              <Card.Body>
                <img
                  src={cartoonMan}
                  width="25%"
                  height="auto"
                  alt="Cost Image"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    float: "right",
                    overflow: "hidden",
                  }}
                />
                Welcome to our website, where you can conveniently calculate
                both the Economic Order Quantity (EOQ) and the Wagner Whitin
                algorithm.
                <br /> These tools are essential for optimizing inventory
                management and production planning.
                <br />
                <br />
                <b>EOQ (Economic Order Quantity):</b>
                <br />
                The EOQ calculation helps determine the optimal order quantity
                that minimizes the total inventory holding costs and ordering
                costs.
                <br /> It is particularly useful for businesses looking to
                strike the right balance between holding too much inventory
                (incurring storage costs) and ordering too frequently (incurring
                ordering costs).
                <br />
                <br />
                <b>Wagner whitin Algorithm:</b>
                <br />
                The Wagner Whitin algorithm, on the other hand, is designed for
                dynamic inventory management, especially in scenarios with
                variable demand and production rates.
                <br /> This algorithm aids in finding the optimal production
                plan over multiple periods, considering both holding and
                backordering costs.
                <br />
                <br />
                <u>
                  <b>When to Use EOQ or Wagner Whitin</b>
                </u>{" "}
                <br />
                <br />
                <table>
                  <tr>
                    {" "}
                    <th>Use EOQ when:</th>
                    <th>Use Wagner Whitin when:</th>
                  </tr>
                  <tr>
                    <td>
                      <ol>
                        <li>Kown and constant demand</li>
                        <li>Known and constant lead time</li>
                        <li>Instantaneous receipt of material</li>
                        <li>No quantity discounts</li>
                        <li>
                          Only order setup cost and inventory holding cost
                        </li>
                        <li>No stock-out</li>
                      </ol>
                    </td>
                    <td>
                      <ol>
                        <li>Variable demand</li>
                        <li>Variable lead time</li>
                        <li>Non-instantaneous receipt of material</li>
                        <li>Quantity discounts</li>
                        <li>Backordering cost</li>
                      </ol>
                    </td>
                  </tr>
                </table>
                <br />
                Feel free to input your data and explore how these calculations
                can enhance your inventory and production strategies.
                <br /> If you have specific scenarios or questions, our platform
                is here to assist you in making informed decisions for your
                business.
              </Card.Body>
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
       
      </Container>
    </>
  );
}

export default Homepage;
