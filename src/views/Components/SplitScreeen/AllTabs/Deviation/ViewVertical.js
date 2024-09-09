import React from "react";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";


function ViewVertical(props) {
  
  return (
    <div>
      <Tooltip title="View File" placement="left">
        <a href={`https://lvpl.in/librabackend/storage/app/public/Deviations/${props?.vertical}`} target="_blank">
        <Button
          variant="outlined"
          color="info"
          fullWidth
          size="large"
          className="p-1"
          >
          View File
        </Button>
          </a>
      </Tooltip>
     
    </div>
  );
}

export default ViewVertical;
