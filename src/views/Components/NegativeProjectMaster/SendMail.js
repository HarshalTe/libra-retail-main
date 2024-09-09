import React, { useState } from "react";

import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import VisibilityIcon from "@mui/icons-material/Visibility";
import MailIcon from "@mui/icons-material/Mail";

import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

import { Typography } from "@mui/material";

function SendMail(props) {
  return (
    <div>
      <Tooltip title="Send Mail" placement="right">
        <Button
          variant="outlined"
          color="success"
          size="small"
          className="p-1 ml-3"
          // startIcon={<VisibilityIcon fontSize="inherit" />}
        >
          <MailIcon fontSize="medium" />
          {/* View */}
        </Button>
      </Tooltip>
    </div>
  );
}

export default SendMail;
