import React from "react";
import { connect } from "react-redux";
import { CardBody, Card, CardHeader, CardFooter, Row, Col } from "reactstrap";

import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "../../../../variables/charts";

import { Bar } from "react-chartjs-2";

import PendingAmount from "./PendingAmount";
import CasesOnHold from "./CasesOnHold";
import PendingAmountPie from "./PendingAmountPie";
import TotalAmountPie from "./TotalAmountPie";

import PiTotalAmount from "./PiTotalAmount";

//*Actions
import { getBillDashboard } from "../../../../Redux/Creators/BillDashboardCreators";
import PreLoader from "components/Loaders/PreLoader";

function BillDashboard(props) {
  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const token = props.login?.login?.token;

    let data = {
      token: token,
    };
    props.getBillDashboard(data);
  };
  return (
    <div>
      {props.billDashboard.isLoading ? (
        <div className="pt-4 px-3">
          <PreLoader />
        </div>
      ) : (
        <div className="pt-4 px-3">
          <Row className="pt-1 pb-1">
            <Col md={3}>
              <Card className="pt-2 pb-2">
                <CardHeader className="bg-info text-white">
                  <strong>Amount Recived</strong>
                </CardHeader>
                <CardBody>
                  <strong>
                    {props?.billDashboard?.billDashboard?.data?.received_amount}
                  </strong>
                </CardBody>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="pt-2 pb-2">
                <CardHeader className="bg-info text-white">
                  <strong>Pending Amount</strong>
                </CardHeader>
                <CardBody>
                  <strong>
                    {props?.billDashboard?.billDashboard?.data?.pending_amoumt}
                  </strong>
                </CardBody>
              </Card>
            </Col>

            <Col md={3} className="pt-2 pb-2">
              <Card>
                <CardHeader className="bg-info text-white">
                  <strong>TDS Deducted</strong>
                </CardHeader>
                <CardBody>
                  <strong>
                    {props?.billDashboard?.billDashboard?.data?.tds_amount}
                  </strong>
                </CardBody>
              </Card>
            </Col>
            <Col md={3} className="pt-2 pb-2">
              <Card>
                <CardHeader className="bg-info text-white">
                  <strong>GST Payable</strong>
                </CardHeader>
                <CardBody>
                  <strong>
                    {props?.billDashboard?.billDashboard?.data?.gst_amount}
                  </strong>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row className="pt-2 pb-2">
            <Col md={12}>
              <Card className="bg-gradient-default shadow">
                <CardHeader className="bg-transparent text-white">
                  <strong>Total Amount</strong>
                </CardHeader>
                <CardBody>
                  <PiTotalAmount />
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row className="pt-1 pb-1">
            <Col md={6}>
              <Card className="pt-2 pb-2">
                <CardHeader className="bg-success text-white">
                  <strong>Pending amount(Bank/Branch)</strong>
                </CardHeader>
                <CardBody>
                  <PendingAmount />
                </CardBody>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="bg-gradient-default shadow">
                <CardHeader className="bg-transparent text-white">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Cases On Hold(Bank/Branch)
                      </h6>
                      <h2 className="mb-0">Total Cases</h2>
                      {/* <strong></strong> */}
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart">
                    <CasesOnHold />
                  </div>
                </CardBody>
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
    billDashboard: state.billDashboard,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBillDashboard: (data) => dispatch(getBillDashboard(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BillDashboard);
