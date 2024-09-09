import React, { useContext } from "react";
import SplitPaneContext from "./SplitPaneContext";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export default function RightScreenFull() {
  const { rightScreenFull } = useContext(SplitPaneContext);
  return (
    <div className="d-flex">
      <IconButton
        aria-label="Right Full"
        size="small"
        onClick={() => rightScreenFull()}
      >
        <ArrowBackIosNewIcon fontSize="medium" />
      </IconButton>
    </div>
  );
}
