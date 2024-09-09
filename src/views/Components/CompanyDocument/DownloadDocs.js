import React, { useState } from "react";

import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from '@mui/icons-material/Download';

import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

import { Typography } from "@mui/material";
import { Document, Page, pdfjs } from "react-pdf";
import axios from "axios";
import { baseUrl } from "shared/baseURL";
import fileDownload from "js-file-download";
import { connect } from "react-redux";
import { connectAdvanced } from "react-redux";
// import  from "../";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function DownloadDocs(props) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [numPages, setNumPages] = useState(1);

  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  function downloadDocs(data) {
    axios
      .get(
        `${baseUrl}download-pdf/BranchDocs/${data}`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${props?.login?.login?.token}` // Include the Bearer token
          }
        }
      )
      .then((res) => {
        fileDownload(res.data, data);
      });
  }
  return (
    <div>
        {/* <Button
          variant="outlined"
          color="info"
          size="small"
          className="p-1"
        >
            <a href={`https://lvpl.in/librabackend/storage/app/public/BranchDocs/${props?.data?.row?.file_name}`} download>
          <DownloadIcon fontSize="medium" />
      </a>
        </Button> */}

        <Button
                          variant="outlined"
                          size="small"
                          color="success"
                          className=""
                          fullWidth
                          onClick={() => downloadDocs(props?.data?.row?.file_name)}
                        >
                          <DownloadIcon fontSize="medium" />
                        </Button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

export default connect(mapStateToProps)(DownloadDocs);
