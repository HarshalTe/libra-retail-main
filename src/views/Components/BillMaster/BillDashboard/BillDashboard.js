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
import { BillGraphGet } from "../../../../Redux/Creators/BillGraphCreators";
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
    props.BillGraphGet(data);
  };
  const data8 = {
    labels: props?.billGraph?.billGraph?.data?.on_hold_cases?.map(
      (el) => el.bank_name
      ),
      datasets: [
        {
          label: "Bank Name",
      data: props?.billGraph?.billGraph?.data?.on_hold_cases?.map((o) => ({
        y: o.count,
        x: o.bank_name
        })),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const data4 = {
    labels: props?.billGraph?.billGraph?.data?.banks_pending_amount?.map(
      (el) => el.bank_name
      ),
      datasets: [
        {
          label: "Bank Name",
      data: props?.billGraph?.billGraph?.data?.banks_pending_amount?.map((o) => ({
        y: o.pending_amount,
        x: o.bank_name
        })),
        backgroundColor: "rgba(102, 200, 2, 0.5)",
      },
    ],
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
                    {props?.billGraph?.billGraph?.data?.received_amount}
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
                    {props?.billGraph?.billGraph?.data?.pending_amoumt}
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
                    {props?.billGraph?.billGraph?.data?.tds_amount}
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
                    {props?.billGraph?.billGraph?.data?.gst_amount}
                  </strong>
                </CardBody>
              </Card>
            </Col>
            <Col md={3} className="pt-2 pb-2">
              <Card>
                <CardHeader className="bg-info text-white">
                  <strong>Amount billed</strong>
                </CardHeader>
                <CardBody>
                  <strong>
                    {props?.billGraph?.billGraph?.data?.billed_amount}
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
                {/* Chart */}
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
                {/* <CardBody>
                  <PendingAmount />
                </CardBody> */}
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
    billGraph: state.billGraph,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBillDashboard: (data) => dispatch(getBillDashboard(data)),
    BillGraphGet: (data) => dispatch(BillGraphGet(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BillDashboard);
