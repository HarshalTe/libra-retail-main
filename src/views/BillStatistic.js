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
import { connect } from "react-redux";
import { DataGrid } from '@mui/x-data-grid';
import { DateFormat } from "../components/DateFormat/DateFormat"

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
} from "variables/charts.js";
import { getFinalBillsPage } from "../Redux/Creators/FinalBillsCreators";
import Header2 from "components/Headers/Header2.js";

const BillStatistic = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const token = props.login?.login?.token;

  React.useEffect(() => {
    let data = {
      token: token,
    };
    // props.getBranchesList(data);
    // props.getProjectsList(data);
    // props.getBankProductsList(data);
    // props.getBankVerticalsList(data);
  }, []);
  const fetchData = () => {
    const token = props.login?.login?.token;
    let data = {
      token: token,
      pageno: 1,
      pageSize: 100,
    };
    props.getFinalBillsPage(data);
  };
  React.useEffect(() => {
    fetchData();
  }, []);

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };
  
  const columns = [
    { field: 'id', headerName: 'ID',
    headerAlign: "center",
    align: "center", width: 70 },
    {
      field: 'bill_no',
      headerName: 'Bill No.',
      headerAlign: "center",
      align: "center",
      type: 'number',
      width: 250,
      renderCell: (row) => {
        // console.log("1123",row,row.row?.final_bill?.bill_no)
        return row.row?.final_bill?.bill_no
      }
    },
    {
      field: "date",
      headerName: "Date",
      headerAlign: "center",
    align: "center",
    width: 200,
      renderCell: (row) => {
        return DateFormat({ data: row.row?.created_at})
      }
    },
    { field: 'bank_name', headerName: 'Bank Name',
    headerAlign: "center",
    align: "center",
     width: 200, 

    renderCell: (row) => {
      return row.row?.bank?.bank_name
    }  },
    {
      field: 'amount',
      headerAlign: "center",
      align: "center",
      headerName: 'Amount',
      width: 260,
     
    },
  ];


  const rows = props?.finalBills?.finalBills?.data?.isLoading
  ? []
  : props.finalBills.finalBills.data?.length > 0
    ? props.finalBills.finalBills.data.filter((item) => {
      return (
        (item?.is_paid==0
    ))
  })
    : [];
console.log(rows, "hhhhhh")



  return (
    <>
      <Header2 />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Container className="mt-3" fluid>
          <Card>
            <CardHeader className="">
              <Row>
                <Col>
                  <strong>Billing Statistics</strong>
                </Col>
                <Col md={4}></Col>
              </Row>
            </CardHeader>
              <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
          </Card>
        </Container>
  
        {/* <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Completed Cases
                    </h6>
                    <h2 className="text-white mb-0">Monthly Cases</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
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
                      </NavItem>
                       <NavItem>
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
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
              
                <div className="chart">
                  <Line
                    data={chartExample1[chartExample1Data]}
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
          </Col>
        </Row>

        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                     <h6 className="text-uppercase text-light ls-1 mb-1">
                      Completed Cases
                    </h6> 
                    <h2 className="text-white mb-0">Daily Visits</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
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
                      </NavItem>
                       <NavItem>
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
                      </NavItem> 
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
               
                <div className="chart">
                  <Line
                    data={chartExample1[chartExample1Data]}
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
                     <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Initiated Cases
                    </h6> 
                    <h2 className="mb-0">Daily Report Release</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
     
                <div className="chart">
                  <Bar
                    data={chartExample3.data}
                    options={chartExample3.options}
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
                      Completed Cases
                    </h6>
                    <h2 className="text-white mb-0">Admin Productivity</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
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
                      </NavItem>
                    <NavItem>
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
                      </NavItem> 
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  <Line
                    data={chartExample1[chartExample1Data]}
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
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Initiated Cases
                    </h6> 
                    <h2 className="mb-0">Pincode Initiation</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
              
                <div className="chart">
                  <Bar
                    data={chartExample4.data}
                    options={chartExample4.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row> */}

        {/* <Row Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Billing Statistics</h3>
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
                    <th scope="col">Bill No</th>
                    <th scope="col">Bill Creation Date</th>
                    <th scope="col">Bank Name</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1454</th>
                    <td>12-06-2022</td>
                    <td>state</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" /> 102
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2458</th>
                    <td>13-06-2022</td>
                    <td>hdfc</td>
                    <td>
                      <i className="fas fa-arrow-down text-warning mr-3" /> 106
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">54515</th>
                    <td>11-06-2022</td>
                    <td>IDFC</td>
                    <td>
                      <i className="fas fa-arrow-down text-warning mr-3" /> 42
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">5454</th>
                    <td>10-06-2022</td>
                    <td>punjab</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" />
                      45
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
          

        </Row> */}
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    login: state.login,
    finalBills: state.finalBills,
    paymentMaster: state.paymentMaster,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFinalBillsPage: (data) => dispatch(getFinalBillsPage(data)),
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BillStatistic);
