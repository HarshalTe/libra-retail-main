import React from "react";
import { connect } from "react-redux";

// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/pie
import { ResponsivePie } from "@nivo/pie";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
function PiTotalAmount(props) {
  const data = [
    {
      id: "gst",
      label: "GST",
      value: props?.billDashboard?.billDashboard?.data?.gst_amount,
      //   color: "hsl(175, 70%, 50%)",
    },
    {
      id: "tds",
      label: "TDS",
      value: props?.billDashboard?.billDashboard?.data?.tds_amount,
      // color: "hsl(344, 70%, 50%)",
    },
    {
      id: "received_amount",
      label: "Received Amount",
      value: props?.billDashboard?.billDashboard?.data?.received_amount,
      //   color: "hsl(119, 70%, 50%)",
      color: "blue",
    },
  ];
  return (
    <div style={{ height: 500 }}>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.4}
        padAngle={0.7}
        cornerRadius={10}
        activeOuterRadiusOffset={40}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#FFFFFF"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          //   {
          //     match: {
          //       id: "received_amount",
          //     },
          //     id: "dots",
          //   },
          {
            match: {
              id: "gst",
            },
            id: "dots",
          },
          {
            match: {
              id: "tds",
            },
            id: "lines",
          },
        ]}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    billDashboard: state.billDashboard,
  };
};

export default connect(mapStateToProps, null)(PiTotalAmount);
