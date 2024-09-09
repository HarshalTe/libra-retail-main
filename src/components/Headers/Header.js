/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import {getDashboardCount} from "../../Redux/Creators/GraphCreators";
import { connect } from "react-redux";


// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const Header = (props) => {
  // const token = props.login?.login?.token;
  React.useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = () => {
    const token = props.login?.login?.token;

    props.getDashboardCount(token);
  };
  const rows = props?.graph?.dashboardCount

  return (
    <>
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
                            OnGoing Cases
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {rows?.ongoing_cases}
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
                            Completed Cases
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                          {rows?.completed_cases}
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
                            Total Cases
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                          {rows?.total_cases}
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
                            Cases Pending For Allocation
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                          {rows?.case_pending}

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
    getDashboardCount: (token) => dispatch(getDashboardCount(token)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);

