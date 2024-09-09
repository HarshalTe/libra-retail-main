import React, { useContext } from "react";
import SplitPaneContext from "./SplitPaneContext";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function BottomScreenFull() {
  const { bottomScreenFull, topScreenFull } = useContext(SplitPaneContext);
  return (
    // <div className="d-flex flex-column">
    <div>
      <IconButton
        aria-label="Bottom Full"
        size="small"
        onClick={() => bottomScreenFull()}
      >
        <KeyboardArrowUpIcon fontSize="large" />
      </IconButton>
    </div>
    // </div>
  );
}
