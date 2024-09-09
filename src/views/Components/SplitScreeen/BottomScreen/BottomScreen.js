import React, {
  createRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import TabsBottomScreen from "./TabsBottomScreen";

export const BottomScreen = (props) => {
  return (
    <div
      {...props}
      className="split-pane-bottom"
      style={{ overflowY: "scroll", width: "75%" }}
    >
      <TabsBottomScreen />
    </div>
  );
};
