import React, { useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
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
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import DashboardModel from "./DashboardModel";
import DashboardModelIndex from "./DashboardModelIndex";
import { connect } from "react-redux";
import {MontlyReportPostGetData} from "../Redux/Creators/GraphCreators";
import {WeeklyReportPostGetData} from "../Redux/Creators/GraphCreators";
import {dailyReportPincodeGet} from "../Redux/Creators/GraphCreators";
import {dailyReportUserWise} from "../Redux/Creators/GraphCreators";
import {dailyReportDayWise} from "../Redux/Creators/GraphCreators";
import {dailyReportLocationWise} from "../Redux/Creators/GraphCreators";
import {dailyReportBankWise} from "../Redux/Creators/GraphCreators";
import {bankStatsTableDashboard} from "../Redux/Creators/GraphCreators";
import {employeeWiseStatsTable} from "../Redux/Creators/GraphCreators";

const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [day, setDay] = useState(0);
  // const [chartExample1Data, setChartExample1Data] = useState(props?.graph?.weeklyReport);

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    // setChartExample1Data("data" + index);
  };

  React.useEffect(() => {
    fetchData();
  }, []);
  const token = props.login?.login?.token;
  React.useEffect(() => {
    fetchData()
  }, []);

  const fetchData = () => {
    props.bankStatsTableDashboard(token);
    props.employeeWiseStatsTable(token);
    
  };

  
  let lineData = {
    labels:Object.keys(day==0? props?.graph?.monthlyReport:props?.graph?.weeklyReport) ,

    datasets: [
      {
        label: "Report",
        borderWidth: 1,
        backgroundColor: "rgba(238,210,2,.1)",
        borderColor: "rgb(238,210,2)",
        pointBorderColor: "rgb(238,210,2)",
        pointBackgroundColor: "rgb(238,210,2)",
        data: Object.values(day==0? props?.graph?.monthlyReport:props?.graph?.weeklyReport)
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
        backgroundColor: "rgba(238,210,2,.1)",
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
  const data6 = {
    labels: props?.graph?.dailyBankWiseReport?.map(
      (el) => el.bank_name
      ),
      datasets: [
        {
          label: "Bank",
          
          data: props?.graph?.dailyBankWiseReport?.map((o) => ({
            y: o.count,
            x: o.date
          })),
          backgroundColor: "rgba(205, 59, 252, 0.5)",
        },
      ],
    };
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
const data4 = {
  labels: props?.graph?.dailyReportLocationWise?.map(
  // labels: props?.graph?.dailyReportReleaseInTat?.map(
    (el) => el.location
    ),
    datasets: [
      {
        label: "Report Release In Tat",
    data: props?.graph?.dailyReportLocationWise?.map((o) => ({
    // data: props?.graph?.dailyReportReleaseInTat?.map((o) => ({
      y: o.count,
      x: o.location
      })),
      backgroundColor: "rgba(102, 200, 2, 0.5)",
    },
  ],
};

const rows = props.graph?.getBankStatsTableDashboard.length > 0
? props.graph?.getBankStatsTableDashboard?.initiated_case
: [];

  // console.log("objectprops222111",props,props?.graph?.dailyReportDayWise,lineData)
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Completed Cases
                    </h6>
                    <h2 className="text-white mb-0">{day==0?"Monthly Cases":"Weekly Cases"}</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                    <DashboardModel/>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={(e) => {
                            setDay(!day)
                            toggleNavs(e, 1)
                          }
                          
                          }
                        >
                          <span className="d-none d-md-block">{day==0?"Month":"week"}</span>
                          {/* <span className="d-md-none">Mwsws</span> */}
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  {/* <Line
                    data={chartExample1[chartExample1Data]}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  /> */}
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
        
        </Row>

        <Row className="mt-5">
          
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Daily Visit Initiated
                    </h6>
                    {/* <h2 className="text-white mb-0">Monthly Cases</h2> */}
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                    <DashboardModelIndex name="dailyReportDayWise"/>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Bar
                    data={newData}
                    options={{
                      indexAxis: "Y",
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
                {/* horizontal bar graph */}
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
                    <h2 className="text-white mb-0">Admin Productivity</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                  <DashboardModelIndex name="dailyReportUserWise"/>
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
                    data={dataUser}
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
          

          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    {/* <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Initiated Cases
                    </h6> */}
                    <h2 className="mb-0">Pincode Initiation</h2>
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
          <Col className="mb-5 mb-xl-0" xl="7">
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
          <Col className="mb-5 mb-xl-0" xl="5">
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
        </Row>
        <Row>
        </Row>

        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="7">
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
                      <i className=" text-success mr-3" /> {Math.round(props?.graph?.EmployeeWiseStats?.percentage_case[i]?.percentage)}%
                    </td>
                  </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col xl="5">
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
    dailyReportDayWise: (data2,token) => dispatch(dailyReportDayWise(data2,token)),
    dailyReportLocationWise: (data2,token) => dispatch(dailyReportLocationWise(data2,token)),
    dailyReportBankWise: (data2,token) => dispatch(dailyReportBankWise(data2,token)),
    employeeWiseStatsTable: (token) => dispatch(employeeWiseStatsTable(token)),
    bankStatsTableDashboard: (token) => dispatch(bankStatsTableDashboard(token)),


  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);