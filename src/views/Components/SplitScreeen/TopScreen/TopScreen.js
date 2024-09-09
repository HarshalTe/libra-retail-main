import React, {
  createRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { Typography } from "@material-ui/core";

import SplitPaneContext from "../SplitPaneContext";
import TabsTopScreen from "./TabsTopScreen";
export const TopScreen = (props) => {
  const topRef = createRef(); //? refrence to the top componet jsx
  const { clientHeight, setClientHeight } = useContext(SplitPaneContext);
  console.log("top", SplitPaneContext);

  useEffect(() => {
    if (!clientHeight) {
      setClientHeight(topRef.current.clientHeight);
      return;
    }

    topRef.current.style.minHeight = clientHeight + "px";
    topRef.current.style.maxHeight = clientHeight + "px";
  }, [clientHeight]);

  return (
    <div
      {...props}
      className="split-pane-top main-content"
      ref={topRef}
      style={{ overflowY: "scroll", width: "75%" }}
    >
      <TabsTopScreen />
    </div>
  );
};
