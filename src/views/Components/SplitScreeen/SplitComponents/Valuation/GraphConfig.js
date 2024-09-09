import React from "react";
import { connect } from "react-redux";
import { CardBody, Card, CardHeader, CardFooter, Row, Col } from "reactstrap";

import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "../../../../../variables/charts";

import { Line } from "react-chartjs-2";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";

//*Actions
import { getBillDashboard } from "../../../../../Redux/Creators/BillDashboardCreators";
// import { BillGraphGet } from "../../../../../Redux/Creators/BillGraphCreators";
import {
  BillConfigGet,
  RentConfigGet,
  YieldConfigGet,
} from "../../../../../Redux/Creators/BillGraphCreators";
import PreLoader from "components/Loaders/PreLoader";
import { FormControl, MenuItem, Select } from "@mui/material";
import { InputLabel } from "@material-ui/core";

function BillDashboard(props) {
  React.useEffect(() => {
    fetchData();
  }, []);
  const [checked, setChecked] = React.useState(true);
  const [checked2, setChecked2] = React.useState(true);
  const [checked3, setChecked3] = React.useState(true);
  const [checked4, setChecked4] = React.useState(true);
  const [type, setType] = React.useState("1 BHK");
  const [quarter, serQuarter] = React.useState(["2023-07-01","2023-09-30"]);
  const [propertyType, setPropertyType] = React.useState("Flat");

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleChange2 = (event) => {
    setChecked2(event.target.checked2);
  };
  const handleChange3 = (event) => {
    setChecked3(event.target.checked3);
  };
  const handleChange4 = (event) => {
    setChecked4(event.target.checked4);
  };
  
  const handleChangeSelect = (event) => {
    setType(event.target.value);
  };
  const handleChangeQuarter = (event) => {
    serQuarter(event.target.value);
  };
  const handleChangeSelect2 = (event) => {
    setPropertyType(event.target.value);
  };
  const fetchData = () => {
    const token = props.login?.login?.token;

    let data = {
      token: token,
      id: props?.property?.property?.project_id,
    };
    // props.getBillDashboard(data);
    props.BillConfigGet(data);
    props.YieldConfigGet(data);
    props.RentConfigGet(data);
    // props.BillGraphGet(data);
  };
  console.log("object", props?.billGraph?.billConfigGraph);
  // const data4 = {
  //   labels: props?.billGraph?.billConfigGraph["1 BHK"]?.map(el => el.inspection_date),
  //   datasets: props?.billGraph?.billConfigGraph["1 BHK"]?.map((o, index) => ({
  //     label: o.configuration,
  //     data: [
  //       {
  //         x: o.inspection_date,
  //         y: o.rate
  //       }
  //     ],
  //     backgroundColor: `rgba(102, 200, 2, 0.5)`,
  //     borderColor: `rgba(102, 200, 2, 1)`,
  //     borderWidth: 2
  //   }))
  // };


  const data4 = {
    labels: props?.billGraph?.billConfigGraph[type]?.filter(obj=> obj?.property_type==propertyType)?.map(
      (el) => el?.inspection_date
    ),
    datasets: [
      {
        label: type,
        data: props?.billGraph?.billConfigGraph[type]?.filter(obj=> obj?.property_type==propertyType)?.map((o) => ({
          // y: [9,6],
          y: o.rate,
          x: o.configuration,
        })),
        backgroundColor: "rgba(102, 200, 2, 0.5)",
      },
    ],
  };
  const data5 = {
    labels: props?.billGraph?.projectRateGraph?.map((el) => el.configuration),
    datasets: [
      {
        label: "Project Type",
        data: props?.billGraph?.projectRateGraph?.map((o) => ({
          // y: [9,6],
          y: o.rate,
          x: o.created_at,
        })),
        backgroundColor: "rgba(102, 200, 2, 0.5)",
      },
    ],
  };



 



  // Function to get an array of dates from start to end date
function getDatesInRange(startDate, endDate) {
  const dates = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

// Generating dates from July 1, 2023, to September 30, 2023
const startDate = new Date("2023-07-01");
const endDate = new Date("2023-09-30");
const quarterlyWiseArray = getDatesInRange(startDate, endDate).map((date, index) => ({
  id: (index + 1).toString(),
  inspection_date: date.toISOString().slice(0, 10),
  rate: "0",
  yield: "0",
  rent_per_sqrft: "0",
  property_type: propertyType,
  configuration: type
}));

// Your initial array with rates
// const dataArray2 = props?.billGraph?.billConfigGraph[type]?.filter(obj=> obj?.property_type==propertyType)


// Matching and updating the rates in the quarterlyWiseArray

const updatedQuarterlyWiseArray = quarterlyWiseArray?.map(quarterlyItem => {
  const matchingItem = props?.billGraph?.billConfigGraph[type]?.filter(obj=> obj?.property_type==propertyType).find(dataItem => dataItem?.inspection_date === quarterlyItem?.inspection_date);
  if (matchingItem) {
      return { ...quarterlyItem, rate: matchingItem.rate };
  } else {
      return quarterlyItem;
  }
});
const updatedQuarterlyWiseArrayRent = quarterlyWiseArray.map(quarterlyItem => {
  const matchingItem = props?.billGraph?.rentConfigGraph[type]?.filter(obj=> obj?.property_type==propertyType).find(dataItem => dataItem.inspection_date === quarterlyItem.inspection_date);
  if (matchingItem) {
      return { ...quarterlyItem, rent_per_sqrft: matchingItem.rent_per_sqrft };
  } else {
      return quarterlyItem;
  }
});
const updatedQuarterlyWiseArrayYield = quarterlyWiseArray.map(quarterlyItem => {
  const matchingItem = props?.billGraph?.yieldConfigGraph[type]?.filter(obj=> obj?.property_type==propertyType).find(dataItem => dataItem.inspection_date === quarterlyItem.inspection_date);
  if (matchingItem) {
      return { ...quarterlyItem, yield: matchingItem.yield };
  } else {
      return quarterlyItem;
  }
});

const data8 = {
  labels: updatedQuarterlyWiseArray?.map(
    (el) => el.inspection_date
  ),
  datasets: [
    {
      label: type,
      data: updatedQuarterlyWiseArray?.map((o) => ({
        // y: [9,6],
        y: o.rate,
        x: o.configuration,
      })),
      backgroundColor: "rgba(102, 200, 2, 0.5)",
    },
  ],
};
const data6 = {
  labels: updatedQuarterlyWiseArrayRent?.map(
    (el) => el.inspection_date
  ),
  datasets: [
    {
      label: type,
      data: updatedQuarterlyWiseArrayRent?.map((o) => ({
        // y: [9,6],
        y: o.rent_per_sqrft,
        x: o.configuration,
      })),
      backgroundColor: "rgba(102, 200, 2, 0.5)",
    },
  ],
};
const data7 = {
  labels: updatedQuarterlyWiseArrayYield?.map(
    (el) => el.inspection_date
  ),
  datasets: [
    {
      label: type,
      data: updatedQuarterlyWiseArrayYield?.map((o) => ({
        // y: [9,6],
        y: o.yield,
        x: o.configuration,
      })),
      backgroundColor: "rgba(102, 200, 2, 0.5)",
    },
  ],
};
console.log(updatedQuarterlyWiseArrayRent,"updatedQuarterlyWiseArray",updatedQuarterlyWiseArray,updatedQuarterlyWiseArrayYield);





  return (
    <div>
      {props.billGraph.isLoading ? (
        <div className="pt-4 px-3">
          <PreLoader />
        </div>
      ) : (
        <div className="pt-4 px-3">
          <Row>

            <Col md={4}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                Period
                </InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={quarter}
                  label="Configration"
                  onChange={handleChangeQuarter}
                >
                  <MenuItem value="1">First quarter</MenuItem>
                  <MenuItem value="2">Second quarter</MenuItem>
                  <MenuItem value="3">Third quarter</MenuItem>
                  <MenuItem value="4">Fourth quarter</MenuItem>
                 
                </Select>
              </FormControl>
            </Col>
            <Col md={4}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                Configration
                </InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  label="Configration"
                  onChange={handleChangeSelect}
                >
                  <MenuItem value="1 BHK">1 BHK</MenuItem>
                  <MenuItem value="2 BHK">2 BHK</MenuItem>
                  <MenuItem value="3 BHK">3 BHK</MenuItem>
                 
                </Select>
              </FormControl>
            </Col>
            <Col md={4}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                Property Type
                </InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={propertyType}
                  label="Property Type"
                  onChange={handleChangeSelect2}
                >
                  <MenuItem value="">Select</MenuItem>
                      {props?.dropdowns?.dropdowns
                        ?.filter((field) => field?.name == "Property Type")[0]
                        ?.drop_down_details?.map((field, i) => (
                          <MenuItem key={i} value={field?.name}>
                            {field?.name}
                          </MenuItem>
                        ))}
                 
                </Select>
              </FormControl>
            </Col>
          </Row>

          <Row className="pt-1 pb-1">
            <Col md={12}>
              <Card className="pt-2 pb-2">
              
                <Col md={12}>
                  <CardHeader className="bg-success text-white d-flex justify-content-between">
                    <strong>Properties Rate Analysis</strong>
                    <strong>
                      Add To Report{" "}
                      <Switch
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </strong>
                  </CardHeader>
                  <CardBody>
                    {/* Chart */}
                    <div className="">
                      <Line
                        data={data8}
                        options={{
                          responsive: true,

                          legend: {
                            display: true,
                            position: "top",

                            labels: {
                              boxHeight: 5,
                              boxWidth: 10,
                            },
                          },
                        }}
                      />
                    </div>
                  </CardBody>
                </Col>
                <Col md={12}>
                  <CardHeader className="bg-success text-white d-flex justify-content-between">
                    <strong>Properties Rate Analysis</strong>
                    <strong>
                      Add To Report{" "}
                      <Switch
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </strong>
                  </CardHeader>
                  <CardBody>
                    {/* Chart */}
                    <div className="">
                      <Line
                        data={data4}
                        options={{
                          responsive: true,

                          legend: {
                            display: true,
                            position: "top",

                            labels: {
                              boxHeight: 5,
                              boxWidth: 10,
                            },
                          },
                        }}
                      />
                    </div>
                  </CardBody>
                </Col>
                <Col md={12}>
                  <CardHeader className="bg-success text-white d-flex justify-content-between">
                    <strong>Project Rate Analysis</strong>
                    <strong>
                      Add To Report{" "}
                      <Switch
                        checked={checked2}
                        onChange={handleChange2}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </strong>
                  </CardHeader>
                  <CardBody>
                    {/* Chart */}
                    <div className="">
                      <Line
                        data={data5}
                        options={{
                          responsive: true,

                          legend: {
                            display: true,
                            position: "top",

                            labels: {
                              boxHeight: 5,
                              boxWidth: 10,
                            },
                          },
                        }}
                      />
                    </div>
                  </CardBody>
                </Col>
                <Col md={12}>
                  <CardHeader className="bg-success text-white d-flex justify-content-between">
                    <strong>Rent Analysis</strong>
                    <strong>
                      Add To Report{" "}
                      <Switch
                        checked={checked3}
                        onChange={handleChange3}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </strong>
                  </CardHeader>
                  <CardBody>
                    {/* Chart */}
                    <div className="">
                      <Line
                        data={data6}
                        options={{
                          responsive: true,

                          legend: {
                            display: true,
                            position: "top",

                            labels: {
                              boxHeight: 5,
                              boxWidth: 10,
                            },
                          },
                        }}
                      />
                    </div>
                  </CardBody>
                </Col>
                <Col md={12}>
                  <CardHeader className="bg-success text-white d-flex justify-content-between">
                    <strong>Yield Analysis</strong>
                    <strong>
                      Add To Report{" "}
                      <Switch
                        checked={checked4}
                        onChange={handleChange4}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </strong>
                  </CardHeader>
                  <CardBody>
                    {/* Chart */}
                    <div className="">
                      <Line
                        data={data7}
                        options={{
                          responsive: true,

                          legend: {
                            display: true,
                            position: "top",

                            labels: {
                              boxHeight: 5,
                              boxWidth: 10,
                            },
                          },
                        }}
                      />
                    </div>
                  </CardBody>
                </Col>

                <Row className="form-group pb-4">
                  <Col>
                    <Button
                      color="success"
                      variant="contained"
                      // disabled={formProps.isSubmitting}
                      fullWidth
                      onClick={() => props.setValue(5)}
                      type="submit"
                    >
                      Next
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    property: state.property,
    billDashboard: state.billDashboard,
    billGraph: state.billGraph,
    dropdowns: state.dropdowns,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBillDashboard: (data) => dispatch(getBillDashboard(data)),
    BillConfigGet: (data) => dispatch(BillConfigGet(data)),
    RentConfigGet: (data) => dispatch(RentConfigGet(data)),
    YieldConfigGet: (data) => dispatch(YieldConfigGet(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BillDashboard);
