import React, { useState } from "react";

import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import VisibilityIcon from "@mui/icons-material/Visibility";

import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

import { Typography } from "@mui/material";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function ViewAgreement(props) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  console.log(props?.data?.row?.aggrement_copy)
  return (
    <div>
        <Button
          variant="outlined"
          color="info"
          size="small"
          className="p-1"
        >
          <a href={`https://lvpl.in/librabackend/storage/app/public/AggrementCopies/${props?.data?.row?.aggrement_copy}`} target="_blank" rel="noopener noreferrer">
          <VisibilityIcon fontSize="medium" />
      </a>
        </Button>
    </div>
  );
}

export default ViewAgreement;
