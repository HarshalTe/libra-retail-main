import React, { useContext } from "react";
import SplitPaneContext from "./SplitPaneContext";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function LeftScreenFull() {
  const { leftScreenFull, rightScreenFull, clientWidth } =
    useContext(SplitPaneContext);
  return (
    <div className="d-flex">
      <IconButton
        aria-label="Left Full"
        size="small"
        onClick={() => leftScreenFull()}
      >
        <ArrowForwardIosIcon fontSize="medium" />
      </IconButton>
    </div>
  );
}
