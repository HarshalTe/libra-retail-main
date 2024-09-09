import React from "react";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

function ViewHorizontal(props) {

  return (
    <div>
      <Tooltip title="View File" placement="left">
      <a href={`https://lvpl.in/librabackend/storage/app/public/Deviations/${props?.horizontal}`} target="_blank">
        <Button
          variant="outlined"
          color="info"
          size="large"
          fullWidth
          className="p-1"
        >
          View File
        </Button>
          </a>
      </Tooltip>
    </div>
  );
}

export default ViewHorizontal;
