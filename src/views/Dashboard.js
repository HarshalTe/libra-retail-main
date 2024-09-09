import React, { useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
// react plugin used to create charts
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
} from "variables/charts.js";
import { DataGrid } from '@mui/x-data-grid';
import Header from "components/Headers/Header.js";
import {
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { Bar, Line } from "react-chartjs-2";
import faker from "faker";
import Chart from "chart.js";
import { connect } from "react-redux";
import {MontlyReportPostGetData} from "../Redux/Creators/GraphCreators";
import {WeeklyReportPostGetData} from "../Redux/Creators/GraphCreators";
import {dailyReportPincodeGet} from "../Redux/Creators/GraphCreators";
import {dailyReportUserWise} from "../Redux/Creators/GraphCreators";
import {dailyReportDayWise} from "../Redux/Creators/GraphCreators";
import {dailyReportLocationWise} from "../Redux/Creators/GraphCreators";
import {dailyReportBankWise} from "../Redux/Creators/GraphCreators";
import {bankStatsTableDashboard} from "../Redux/Creators/GraphCreators";
import {branchBankWiseDashboard} from "../Redux/Creators/GraphCreators";
import {bankWiseRevenue} from "../Redux/Creators/GraphCreators";
import {employeeWiseStatsTable} from "../Redux/Creators/GraphCreators";
import {dailyReportNotRelease} from "../Redux/Creators/GraphCreators";
import {bankWiseOverallStats} from "../Redux/Creators/GraphCreators";
import DashboardModelIndex from "./DashboardModelIndex";
import DashboardModelIndexTime from "./DashboardModelIndexTime";

// Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "bottom",

      labels: {
        boxHeight: 5,
        boxWidth: 10,
      },
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = [
  "15-07-2022",
  "14-07-2022",
  "13-04-2022",
  "12-07-2022",
  "11-07-2022",
  "10-07-2022",
  "09-07-2022",
];



export const adminData = {
  labels,
  datasets: [
    {
      label: "Dab",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Bank",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "TAT",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(56, 59, 235, 0.5)",
    },
  ],
};

export const data3 = {
  labels,
  datasets: [
    {
      label: "Bank Intiated",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Engineer Allocated",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const bankLabels = [
  "HDFC",
  "SBI",
  "ICICI",
  "Axis",
  "Bank of Baroda",
  "Bank of India",
  "Bank of Maharashtra",
];

const locationLabels = [
  "Bangalore",
  "Chennai",
  "Mumbai",
  "Pune",
  "Saurat",
  "Thane",
  "Nagpur",
];

const Dashboard = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }
  
  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };
  const token = props.login?.login?.token;
  React.useEffect(() => {
    fetchData()
  }, []);
  React.useEffect(() => {
    let data={
      token:token,
      city:searchQuery
    }
    props.branchBankWiseDashboard(data)
  }, [searchQuery]);
  const fetchData = () => {
    props.bankStatsTableDashboard(token);
    props.bankWiseRevenue(token);
    props.employeeWiseStatsTable(token);
    props.bankWiseOverallStats(token);
    
  };
  React.useEffect(() => {
    fetchData();
  }, []);
  
  
  const rows = props.graph?.getBankStatsTableDashboard.length > 0
  ? props.graph?.getBankStatsTableDashboard?.initiated_case
  : [];
  
  // const rows = [];
  console.log("object",searchQuery)
  const data = {
    labels: props?.graph?.dailyReportRelease?.map(
      (el) => el.date
      ),
      datasets: [
        {
          label: "date",
      data: props?.graph?.dailyReportRelease?.map((o) => ({
        y: o.count,
        x: o.date
      })),
        backgroundColor: "rgba(102, 200, 2, 0.5)",
      },
    ],
  };
  const data6 = {
    labels: props?.graph?.getBankWiseRevenue?.map(
      (el) => el.bank_name
      ),
      datasets: [
        {
          label: "Bank",
          
          data: props?.graph?.getBankWiseRevenue?.map((o) => ({
            y: o.revenue,
            x: o.bank_name
          })),
        backgroundColor: "rgba(205, 59, 252, 0.5)",
      },
    ],
  };
  const dataUser = {
    labels: props?.graph?.dailyReportUserWise?.map(
      (el) => el.date
      ),
      datasets: [
        {
          label: "Users",
          data: props?.graph?.dailyReportUserWise?.map((o) => ({
            y: o.count,
            x: o.date
          })),
          backgroundColor: "rgba(102, 200, 2, 0.5)",
        },
      ],
    };
    const data8 = {
      labels: props?.graph?.dailyReportLocationWise?.map(
        (el) => el.location
        ),
        datasets: [
          {
            label: "Location",
            data: props?.graph?.dailyReportLocationWise?.map((o) => ({
        y: o.count,
        x: o.location
      })),
      backgroundColor: "rgba(102, 200, 2, 0.5)",
    },
  ],
  };
  // console.log("props?.graph?.dailyBankWiseReport",props?.graph?.dailyReportDayWise)
  const newData = {
    labels: props?.graph?.dailyReportDayWise?.map(
      (el) => el.date
      ),
      datasets: [
        {
          label: "date",
          data: props?.graph?.dailyReportDayWise?.map((o) => ({
            y: o.count,
            x: o.date
          })),
          backgroundColor: "rgba(102, 200, 2, 0.5)",
    },
  ],
};
const data5 = {
  labels: props?.graph?.bankWiseOverallStats?.map(
    (el) => el.bank_name
    ),
    datasets: [
      {
        label: "Stats",
        data: props?.graph?.bankWiseOverallStats?.map((o) => ({
          y: o.tat,
          x: o.bank_name
        })),
        backgroundColor: "rgba(102, 200, 2, 0.5)",
  },
],
};
let lineDataUsers = {
  labels: props?.graph?.dailyReportUserWise?.map(
    (el) => el.pincode
    ),
    datasets: [
      {
        label: "Users",
        borderWidth: 1,
        backgroundColor: "rgba(238,210,2,.1)",
        borderColor: "rgb(238,210,2)",
        pointBorderColor: "rgb(238,210,2)",
      pointBackgroundColor: "rgb(238,210,2)",
      data: props?.graph?.dailyReportUserWise?.map((o) => ({
        y: o.count,
        x: o.date,
      })),
      // data: [1, 2, 5, 7, 8, 10],
    },
  ],
};
const data7 = {
  labels: props?.graph?.getBranchBankWiseDashboard?.map(
    (el) => el.bank_name
    ),
  datasets: [
    {
      label: "Banks",
      data: props?.graph?.getBranchBankWiseDashboard?.map((o) => ({
        y: o.branch_counts,
        x: o.bank_name,
      })),
      backgroundColor: "rgba(102, 20, 2, 0.5)",
    },
  ],
};
const data2 = {
  labels: props?.graph?.DailyReportNotRelease?.map(
    (el) => el.date?.date?.slice(0,10)
    ),
  datasets: [
    {
      label: "Banks",
      data: props?.graph?.DailyReportNotRelease?.map((o) => ({
        y: o.prop_count,
        x: o.date?.date,
      })),
      backgroundColor: "rgba(102, 20, 2, 0.5)",
    },
  ],
};
let lineData2 = {
  labels: props?.graph?.dailyPincodeReport?.map(
    (el) => el.pincode
    ),
  datasets: [
    {
      label: "Pincode",
      borderWidth: 1,
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      borderColor: "rgb(238,210,2)",
      pointBorderColor: "rgb(238,210,2)",
      pointBackgroundColor: "rgb(238,210,2)",
      data: props?.graph?.dailyPincodeReport?.map((o) => ({
        y: o.count,
        x: o.pincode,
      })),
      // data: [1, 2, 5, 7, 8, 10],
    },
  ],
};

const data4 = {
  labels: props?.graph?.dailyReportReleaseInTat?.map(
    (el) => el.date?.date?.slice(0,10)
    ),
    datasets: [
      {
        label: "In Time Property Count",
    data: props?.graph?.dailyReportReleaseInTat?.map((o) => ({
      y: o.inTimePropsCount,
      x: o.date?.date
      })),
      backgroundColor: "rgba(56, 59, 235, 0.5)",
    },
      {
        label: "Out Time Property Count",
    data: props?.graph?.dailyReportReleaseInTat?.map((o) => ({
      y: o.outTimePropsCount,
      x: o.date?.date
      })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

let lineData = {
  type: 'line',
  data: props?.graph?.hourlyProps?.map((o)=>({
    x: o.completed_date,
    y: o.name
  })),
  options: {
      scales: {
          x: {
              type: 'timeseries',
          }
      }
  }
};


return (
  <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
        <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    {/* <h6 className="text-uppercase text-light ls-1 mb-1">
                      Completed Cases
                    </h6> */}
                    <h2 className="text-white mb-0">Daily Visits</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                    <DashboardModelIndexTime name="DailyVisits"/>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                <Line
                      data={lineData}
                      options={{
                        tooltips: {
                          mode: "x-axis",
                        },
                        maintainAspectRatio: false,
                        legend: {
                          display: false,
                          labels: { fontFamily: "Nunito Sans" },
                        },
                      }}
                    />
                </div>
              </CardBody>
            </Card>
          </Col>
          
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    {/* <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Initiated Cases
                    </h6> */}
                    <h2 className="mb-0">Daily Report Release</h2>
                  </div>
                  <DashboardModelIndex name="dailyReportRelease"/>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  {/* <Bar
                    data={chartExample3.data}
                    options={chartExample3.options}
                  /> */}
                  <Bar
                    data={data}
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
            </Card>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    {/* <h6 className="text-uppercase text-light ls-1 mb-1">
                      Completed Cases
                    </h6> */}
                    <h2 className="text-white mb-0">
                      Daily Report Not Release
                    </h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                    <DashboardModelIndex name="DailyReportNotRelease"/>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Bar
                    data={data2}
                    options={{
                      responsive: true,
                      title: {
                        text: "Daily Report Not Release",
                        display: true,
                      },

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
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    {/* <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Initiated Cases
                    </h6> */}
                    <h2 className="mb-0">Pincode wise Cases Allocation</h2>
                  </div>
                  <DashboardModelIndex name="dailyPincodeReport"/>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                <Bar
                      data={lineData2}
                      options={{
                        tooltips: {
                          mode: "x-axis",
                        },
                        maintainAspectRatio: false,
                        legend: {
                          display: false,
                          labels: { fontFamily: "Nunito Sans" },
                        },
                      }}
                    />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row className="mt-5">
        <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    {/* <h6 className="text-uppercase text-light ls-1 mb-1">
                      Completed Cases
                    </h6> */}
                    <h2 className="text-white mb-0">Admin Productivity</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                  <DashboardModelIndex name="dailyReportDayWise"/>
                      
                      {/* <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Week</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem> */}
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Line
                    // data={chartExample1[chartExample1Data]}
                    data={lineDataUsers}
                    
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
              <Row className="align-items-center">
                  <div className="col">
                    {/* <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Initiated Cases
                    </h6> */}
                    <h2 className="mb-0">Report Release in TAT</h2>
                  </div>
                <DashboardModelIndex name="dailyReportReleaseInTat"/>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  <Bar
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
            </Card>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    {/* <h6 className="text-uppercase text-light ls-1 mb-1">
                      Completed Cases
                    </h6> */}
                    <h2 className="text-white mb-0">Bank Wise Overall TAT</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      {/* <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Month</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem> */}
                      {/* <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Week</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem> */}
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Bar
                    data={data5}
                    options={{
                      responsive: true,
                      title: {
                        text: "Bank Wise Overall TAT",
                        display: true,
                      },

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
            </Card>
          </Col>

          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    {/* <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Initiated Cases
                    </h6> */}
                    <h2 className="mb-0">Revenue MIS Bankwise</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Bar
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
            </Card>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    {/* <h6 className="text-uppercase text-light ls-1 mb-1">
                      Completed Cases
                    </h6> */}
                    <h2 className="text-white mb-0">
                      Daily Bankwise Intiation
                    </h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                  <DashboardModelIndex name="dailyBankWiseReport"/>
                      
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Bar
                    data={data6}
                    options={{
                      responsive: true,
                      title: {
                        text: "Daily Bankwise Intiation",
                        display: true,
                      },

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
            </Card>
          </Col>

          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    {/* <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Initiated Cases
                    </h6> */}
                    <h2 className="mb-0">Bankwise Branch in City</h2>
                  </div>
                  <form>
    <TextField
      id="search-bar"
      className="text ml-3"
      onBlur={(e) => {
        setSearchQuery(e.target.value);
      }}
      label="Enter a city name"
      variant="outlined"
      placeholder="Search..."
      size="small"
    />
    <IconButton>
      <SearchIcon  style={{ fill: "blue" }} />
    </IconButton>
  </form>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Bar
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
            </Card>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    {/* <h6 className="text-uppercase text-light ls-1 mb-1">
                      Completed Cases
                    </h6> */}
                    <h2 className="text-white mb-0">
                      Case Initiation Location Wise
                    </h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                  <DashboardModelIndex name="dailyReportLocationWise"/>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Bar
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
            </Card>
          </Col>
            {/* <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Initiated Cases
                    </h6>
                    <h2 className="mb-0">Total Cases</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  <Bar
                    data={chartExample2.data}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col> */}
        </Row>

        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Employees</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Employee name</th>
                    <th scope="col">Initiated Cases</th>
                    <th scope="col">Completed Cases</th>
                    <th scope="col">Productivity</th>
                  </tr>
                </thead>
                <tbody>
                  {props?.graph?.EmployeeWiseStats?.initiated_case?.map((row,i)=>(
                  <tr key={i}>
                    <th scope="row">{row?.user_name}</th>
                    <td>{row?.prop_count}</td>
                    <td>{props?.graph?.EmployeeWiseStats?.completed_case[i]?.prop_count}</td>
                    <td>
                      <i className="text-success mr-3" /> {Math.round(props?.graph?.EmployeeWiseStats?.percentage_case[i]?.percentage)}%
                    </td>
                  </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Bank Statistics</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Bank Name</th>
                    <th scope="col">Initiated Cases</th>
                    <th scope="col">Completed Cases</th>
                  </tr>
                </thead>
                <tbody>
                 {props.graph?.getBankStatsTableDashboard?.initiated_case?.map((row,i)=>
                  (
                   <tr key={i}>
                    <th scope="row">{row?.bank_name}</th>
                    <td>{row?.prop_count}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">{props?.graph?.getBankStatsTableDashboard?.completed_case[i]?.prop_count}</span>
                        <div>
                          <Progress
                            max="100"
                            value={(props?.graph?.getBankStatsTableDashboard?.completed_case[i]?.prop_count/ row?.prop_count) * 100}
                            barClassName="bg-gradient-success"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  )
                 )}
                 
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    login: state.login,
    graph: state.graph,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    MontlyReportPostGetData: (data,token) => dispatch(MontlyReportPostGetData(data,token)),
    WeeklyReportPostGetData: (data,token) => dispatch(WeeklyReportPostGetData(data,token)),
    dailyReportPincodeGet: (data2,token) => dispatch(dailyReportPincodeGet(data2,token)),
    dailyReportUserWise: (data2,token) => dispatch(dailyReportUserWise(data2,token)),
    dailyReportNotRelease: (data2,token) => dispatch(dailyReportNotRelease(data2,token)),
    dailyReportDayWise: (data2,token) => dispatch(dailyReportDayWise(data2,token)),
    dailyReportLocationWise: (data2,token) => dispatch(dailyReportLocationWise(data2,token)),
    dailyReportBankWise: (data2,token) => dispatch(dailyReportBankWise(data2,token)),
    bankStatsTableDashboard: (token) => dispatch(bankStatsTableDashboard(token)),
    bankWiseRevenue: (token) => dispatch(bankWiseRevenue(token)),
    employeeWiseStatsTable: (token) => dispatch(employeeWiseStatsTable(token)),
    bankWiseOverallStats: (token) => dispatch(bankWiseOverallStats(token)),
    branchBankWiseDashboard: (data) => dispatch(branchBankWiseDashboard(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
