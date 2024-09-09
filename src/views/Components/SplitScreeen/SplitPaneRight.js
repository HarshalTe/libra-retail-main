import React, {
  createRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import SplitPaneContext from "./SplitPaneContext";

export const SplitPaneRight = (props) => {
  const topRef = createRef();
  const { clientWidth, setClientWidth } = useContext(SplitPaneContext);
  console.log("Right", SplitPaneContext);

  useEffect(() => {
    if (!clientWidth) {
      setClientWidth(topRef.current.clientWidth / 1.2);
      return;
    }

    topRef.current.style.minWidth = clientWidth + "px";
    topRef.current.style.maxWidth = clientWidth + "px";
  }, [clientWidth]);

  return <div {...props} className="split-pane-left" ref={topRef} />;
};
