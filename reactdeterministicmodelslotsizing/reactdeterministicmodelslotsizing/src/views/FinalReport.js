import React from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import report from "../assets/pdf/Term_Project_Report_Gaub_Stablum.pdf";

import { useState } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const FinalReport = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () =>
    setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

  const goToNextPage = () =>
    setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <Card
        className="d-flex align-items-center justify-content-center"
        style={{ width: "80%" }}
      >
        <Card.Body>
          <Document file={report} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
          <Row className="mt-3">
            <Col md="6">
              <Button variant="primary" onClick={goToPrevPage}>
                Prev
              </Button>
            </Col>
            <Col md="6" className="text-right">
              <Button variant="primary" onClick={goToNextPage}>
                Next
              </Button>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md="12" className="text-center">
              <p>
                Page {pageNumber} of {numPages}
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default FinalReport;
