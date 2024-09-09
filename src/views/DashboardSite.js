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
  CardTitle,
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

const DashboardSite = (props) => {
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
    // props.bankStatsTableDashboard(token);
    // props.bankWiseRevenue(token);
    // props.employeeWiseStatsTable(token);
    // props.bankWiseOverallStats(token);
    
  };
  React.useEffect(() => {
    fetchData();
  }, []);
  
  


return (
  <>
      {/* <Header /> */}
      {/* Page content */}
      {/* <Container className="mt--7" fluid> */}
      <header>
        <div className="header bg-gradient-info pb-8 pt-5 ">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
      <Row>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Today Visit
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {/* {rows?.ongoing_cases} */}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-chart-bar" />
                          </div>
                        </Col>
                      </Row>
                    
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Pending Visit
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                          {/* {rows?.completed_cases} */}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="fas fa-chart-pie" />
                          </div>
                        </Col>
                      </Row>
                   
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Completed Visit
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                          {/* {rows?.total_cases} */}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                            <i className="fas fa-users" />
                          </div>
                        </Col>
                      </Row>
                   
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Cases 
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                          {/* {rows?.case_pending} */}

                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="fas fa-hourglass" />
                          </div>
                        </Col>
                      </Row>
                   
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              </div>
          </Container>
        </div>
      </header>

  
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="6">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Pending Visit Pincode</h3>
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
                    <th scope="col">Pincode</th>
                    <th scope="col">Pending Cases</th>
                    {/* <th scope="col">Productivity</th> */}
                  </tr>
                </thead>
                {/* <tbody>
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
                </tbody> */}
              </Table>
            </Card>
          </Col>
          <Col xl="6">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Completed Visit Pincode</h3>
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
                    <th scope="col">Pincode</th>
                    <th scope="col">Completed Cases</th>
                  </tr>
                </thead>
                {/* <tbody>
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
                 
                </tbody> */}
              </Table>
            </Card>
          </Col>
          <Col xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Engineer With Pending Visit</h3>
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
                    <th scope="col">Engineer Name</th>
                    <th scope="col">Pincode</th>
                    <th scope="col">Completed Cases</th>
                  </tr>
                </thead>
                {/* <tbody>
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
                 
                </tbody> */}
              </Table>
            </Card>
          </Col>
        </Row>
      {/* </Container> */}
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
export default connect(mapStateToProps, mapDispatchToProps)(DashboardSite);
