import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import report from "../assets/pdf/Term_Project_Proposal_Gaub_Stablum.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

/*
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
*/

const Typography = () => {
  //const pdfURL = "path_to_pdf_file.pdf";
  return (
    <div>
      <Document file={report}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};
export default Typography;
