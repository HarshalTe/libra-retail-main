import React, {
  createRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import SplitPaneContext from "./SplitPaneContext";

const SplitPane = ({ children, ...props }) => {
  //? setting Height for all components
  const [clientHeight, setClientHeight] = useState(null);
  //? setting Width for all components
  const [clientWidth, setClientWidth] = useState(null);
  //? position for Y-axis
  const yDividerPos = useRef(null);
  //? position for X-axis
  const xDividerPos = useRef(null);

  const onMouseHoldDown = (e) => {
    yDividerPos.current = e.clientY;
    xDividerPos.current = e.clientX;
  };

  const onMouseHoldUp = () => {
    yDividerPos.current = null;
    xDividerPos.current = null;
  };

  const onMouseHoldMove = (e) => {
    if (!yDividerPos.current && !xDividerPos.current) {
      return;
    }

    setClientHeight(clientHeight + e.clientY - yDividerPos.current);

    // {
    if (clientWidth - e.clientX + xDividerPos.current < 250) {
      setClientWidth(250);
    } else if (clientWidth - e.clientX + xDividerPos.current > 1600) {
      setClientWidth(1600);
    } else {
      setClientWidth(clientWidth - e.clientX + xDividerPos.current);
    }
    // }
    // setClientWidth(
    //   clientWidth - e.clientX + xDividerPos.current < 50
    //     ? 50
    //     : clientWidth - e.clientX + xDividerPos.current
    // );

    // setClientWidth(clientWidth + e.clientX - xDividerPos.current); //?use this for Right Screen

    yDividerPos.current = e.clientY;
    xDividerPos.current = e.clientX;
  };

  //* Left Screen Full
  const leftScreenFull = () => {
    setClientWidth(250);
  };

  //* Right Screen Full
  const rightScreenFull = () => {
    setClientWidth(1600);
  };

  //* Bottom Full
  const bottomScreenFull = () => {
    setClientHeight(10);
  };

  //* TopScreen Full
  const topScreenFull = () => {
    setClientHeight(650);
  };

  useEffect(() => {
    document.addEventListener("mouseup", onMouseHoldUp);
    document.addEventListener("mousemove", onMouseHoldMove);

    return () => {
      document.removeEventListener("mouseup", onMouseHoldUp);
      document.removeEventListener("mousemove", onMouseHoldMove);
    };
  });

  return (
    <div {...props}>
      <SplitPaneContext.Provider
        value={{
          clientHeight,
          setClientHeight,
          clientWidth,
          setClientWidth,
          onMouseHoldDown,
          leftScreenFull,
          rightScreenFull,
          topScreenFull,
          bottomScreenFull,
        }}
      >
        {children}
      </SplitPaneContext.Provider>
    </div>
  );
};

export default SplitPane;
