import React, { useState } from "react";
import { connect } from "react-redux";

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
  InputGroup,
  Input,
} from "reactstrap";
import PendingAmount from "../BillDashboard/PendingAmount";
import {branchWiseBillAmount} from "../../../../Redux/Creators/GraphCreators";
import CasesOnHold from "../BillDashboard/CasesOnHold";
import { DataGrid } from '@mui/x-data-grid';
import { Bar } from "react-chartjs-2";
//* Components
// import OnGoingBranchCases from "./OnGoingBranchCases";
// import CompletedBranchCases from "./CompletedBranchCases";

//*Actions
// import { getBranchesList } from "../../../Redux/Creators/BranchesCreators";
// import { getProjectsList } from "../../../Redux/Creators/ProjectsCreators";
// import { getDropdownsList } from "../../../Redux/Creators/DropdownCreators";
// //*
// import { getBankProductsList } from "../../../Redux/Creators/BankProductsCreators";
// import { getBankVerticalsList } from "../../../Redux/Creators/BankVerticalsCreators";
import LinerLoader from "components/Loaders/LinerLoader";

const UnBilledDetails = (props) => {
  const token = props.login?.login?.token;
  React.useEffect(() => {
    let data = {
      token: token,
    };
    props.branchWiseBillAmount(token);
  }, []);

  
  const rows = props?.bills?.bills?.isLoading
? []
: props.bills.bills.length > 0
  ? props.bills.bills?.filter((item) => {
    return (
      (
        item?.bill_status == "fresh"
        && item?.is_completed == 1
  ))
})
  : [];
  const rows2 = props?.bills?.bills?.isLoading
? []
: props.bills.bills.length > 0
  ? props.bills.bills?.filter((item) => {
    return (
      (
        item?.bill_status == "fresh"
        && item?.is_completed == 0
  ))
})
  : [];
console.log(rows, "hhhhhhggg")

const columns = [
  {
    field: "application_no",
    headerName: "Application No.",
  },
  {
    field: "customer_name",
    headerName: "Customer Name",
  },
  {
    field: "branch_name",
    headerName: "Branch Name",
  },

  {
    field: "created_date",
    headerName: "Created Date",
  },

  {
    field: "postal_address",
    headerName: "Postal Address",
  },

  {
    field: "plot_area",
    headerName: "Plot Area",
  },

  {
    field: "construction_area",
    headerName: "Construction Area",
  },

  {
    field: "property_type",
    headerName: "Property Type",
  },

  {
    field: "verticals",
    headerName: "Verticals",
  },

  {
    field: "product",
    headerName: "Product",
  },

  {
    field: "rate",
    headerName: "Rate",
  },

  {
    field: "kms",
    headerName: "No. of kms",
  },

  {
    field: "kms_from_bank",
    headerName: "Kms from bank",
  },

  {
    field: "cost",
    headerName: "Cost",
  },

  {
    field: "final_value",
    headerName: "Final Value",
  },

  // {
  //   id: "actions",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "Actions",
  // },
];



const data8 = {
  labels: props?.graph?.branchWiseBillAmount?.map(
    (el) => el?.bank_name
    ),
    datasets: [
      {
        label: "Pending Amount",
    data: props?.graph?.branchWiseBillAmount?.map((o) => ({
      y: o?.pending_amount,
      x: o?.bank_name
      })),
      backgroundColor: "rgba(102, 200, 2, 0.5)",
    },
      {
        label: "Amount",
    data: props?.graph?.branchWiseBillAmount?.map((o) => ({
      y: o?.amount,
      x: o?.bank_name
      })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};


  return (
    <>
      
        <Container className="mt-3" fluid>
          <Card>
            <CardHeader className="bg-info text-white">
              <Row>
                <Col>
                  <strong>Un-Billed Details (Case Completed But Bill not created)</strong>
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
        checkboxSelection
        // getRowClassName={(params) => {
        //   console.log(params,"WWW", params.row.pending_amount)
        //   if (params.row.pending_amount > "3000") {
        //     return "bg-red";
        //   } else if (
        //     params.row.pending_amount < "1100"
        //   ) {
        //     return "bg-green";
        //     console.log("lowhai")
        //   }
        //   // else if (params.row.no_purchase_orders < params?.row?.psi_count) {
        //   //   return "bg-yellow-2";
        //   // }
        //   else {
        //     return "bg-white";
        //   }
        // }}
      />
    </div>
          </Card>
          <Card>
            <CardHeader className="bg-info text-white">
              <Row>
                <Col>
                  <strong>Un-Billed Details (on going Case But Bill not created)</strong>
                </Col>
                <Col md={4}></Col>
              </Row>
            </CardHeader>
              <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows2}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        // getRowClassName={(params) => {
        //   console.log(params,"WWW", params.row.pending_amount)
        //   if (params.row.pending_amount > "3000") {
        //     return "bg-red";
        //   } else if (
        //     params.row.pending_amount < "1100"
        //   ) {
        //     return "bg-green";
        //     console.log("lowhai")
        //   }
        //   // else if (params.row.no_purchase_orders < params?.row?.psi_count) {
        //   //   return "bg-yellow-2";
        //   // }
        //   else {
        //     return "bg-white";
        //   }
        // }}
      />
    </div>
          </Card>
        <Row className="pt-1 pb-1">
            <Col >
              <Card className="pt-2 pb-2">
                <CardHeader className="bg-success text-white">
                  <strong>Un-Billed Amount</strong>
                </CardHeader>
                <CardBody>
                <Bar data={data8}
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
                    }}/>
                </CardBody>
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
    branches: state.branches,
    projects: state.projects,
    bankVerticals: state.bankVerticals,
    bankProducts: state.bankProducts,
    bills: state.bills,
    graph: state.graph,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    branchWiseBillAmount: (token) => dispatch(branchWiseBillAmount(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UnBilledDetails);
