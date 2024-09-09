import React, { useState } from "react";

import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import VisibilityIcon from "@mui/icons-material/Visibility";

import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function ViewAnnexture(props) {
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
        <Button
          variant="outlined"
          color="info"
          size="small"
          className="p-1"
          onClick={() => toggle()}
        >
          <VisibilityIcon fontSize="medium" />
          {/* View */}
        </Button>
      </Tooltip>
      <Modal className="modal-lg" isOpen={modal} toggle={() => toggle()}>
        <ModalHeader toggle={() => toggle()}>View Annexture</ModalHeader>
        <ModalBody>
          <Document
            file={`https://lvpl.in/librabackend/storage/app/public/Annexures/${props?.file}`}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ViewAnnexture;
