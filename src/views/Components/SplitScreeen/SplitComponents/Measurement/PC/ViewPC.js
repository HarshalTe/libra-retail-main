import React, { useState } from "react";

import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import VisibilityIcon from "@mui/icons-material/Visibility";

import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

import { Typography } from "@mui/material";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function ViewPC(props) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [numPages, setNumPages] = useState(1);

  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  return (
    <div>
      <Tooltip title="View File" placement="left">
        <a href={`https://lvpl.in/librabackend/storage/app/public/Measurements/${props?.file}`} target="_blank">
        <Button
          variant="outlined"
          color="info"
          size="small"
          className="p-1"
          onClick={() => toggle()}
          // startIcon={<VisibilityIcon fontSize="inherit" />}
        >
          <VisibilityIcon fontSize="medium" />
          {/* View */}
        </Button>
          </a>
      </Tooltip>
      <Modal className="modal-lg" isOpen={modal} toggle={() => toggle()}>
        <ModalHeader toggle={() => toggle()}>View PC</ModalHeader>
        <ModalBody>
          <Document
          // https://uditsolutions.in/librabackend/storage/app
            file={`https://lvpl.in/librabackend/storage/app/public/Measurements/${props?.file}`}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ViewPC;
