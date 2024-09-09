import React, {
  createRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import SidebarMini from "../SidebarMini";
import routes from "routes";
import ComponentContext from "../CompoenetContext";
import { Typography } from "@material-ui/core";

import { height } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SplitPaneContext from "../SplitPaneContext";
import SpeedDials from "views/Components/CaseMaster/WorkInProgressCases/SpeedDials";

export const LeftScreen = (props) => {
  const { component, setComponent } = useContext(ComponentContext);

  const { leftScreenFull } = useContext(SplitPaneContext);

  console.log("LeftScreen Props:", component);
  return (
    <div
      {...props}
      className="split-pane-right"
      style={{ overflowY: "scroll" }}
    >
      <SidebarMini {...props} routes={routes} />

      <div style={{ width: "100%" }}>{component}</div>
    </div>
  );
};
