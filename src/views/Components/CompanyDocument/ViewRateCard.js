import React, { useState } from "react";

import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import VisibilityIcon from "@mui/icons-material/Visibility";

import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

import { Typography } from "@mui/material";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function ViewRateCard(props) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [numPages, setNumPages] = useState(1);

  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  return (
    <div>
      {/* <Tooltip title="View File" placement="left"> */}
        <Button
          variant="outlined"
          color="info"
          size="small"
          className="p-1"
          // onClick={() => toggle()}
          // startIcon={<VisibilityIcon fontSize="inherit" />}
        >
            <a href={`https://lvpl.in/librabackend/storage/app/public/BranchDocs/${props?.data?.row?.file_name}`} target="_blank" rel="noopener noreferrer">
          <VisibilityIcon fontSize="medium" />
      </a>
        </Button>
      {/* </Tooltip> */}
      {/* <Modal className="modal-lg" isOpen={modal} toggle={() => toggle()}>
        <ModalHeader toggle={() => toggle()}>View Rate Card</ModalHeader>
        <ModalBody>
          <Document
            file={`https://lvpl.in/librabackend/storage/app/public/RateCards/${props?.data?.row?.rate_card}`}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
        </ModalBody>
      </Modal> */}
    </div>
  );
}

export default ViewRateCard;
