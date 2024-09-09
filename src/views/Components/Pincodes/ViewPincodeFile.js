import React, { useState } from "react";

import VisibilityIcon from "@mui/icons-material/Visibility";

import Button from "@mui/material/Button";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function ViewPincodeFile(props) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [numPages, setNumPages] = useState(1);

  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  console.log("props",props)
  return (
    <div>
        <Button
          variant="outlined"
          color="info"
          size="small"
          className="p-1 ml-1"
        >
            <a href={`https://lvpl.in/librabackend/storage/app/public/PincodeFiles/${props?.data?.row?.file_upload}`} target="_blank" rel="noopener noreferrer">
          <VisibilityIcon fontSize="medium" />
      </a>
        </Button>
    </div>
  );
}

export default ViewPincodeFile;
