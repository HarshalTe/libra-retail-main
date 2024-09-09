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
import { DataGrid } from '@mui/x-data-grid';
import { getFinalBillsPage } from "../../../../Redux/Creators/FinalBillsCreators";
import LinerLoader from "components/Loaders/LinerLoader";

const BranchDashboard = (props) => {

  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(100000);
  const [selectionModel, setSelectionModel] = React.useState([]); 
  const [pageSize, setPageSize] = React.useState(10);

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

    console.log("page", page);
    let pageno = page + 1;
    console.log("pageno", pageno);

    let data = {
      token: token,
      pageno: pageno,
      pageSize: rowsPerPage,
    };
    props.getFinalBillsPage(data);
  };

  React.useEffect(() => {
    fetchData(page, rowsPerPage);
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'bank_name', headerName: 'Bank Name', width: 130, 

    renderCell: (row) => {
      // console.log("1123",row,row.row?.final_bill?.bank?.bank_name)
      return row.row?.bank?.bank_name
    }  },
    { field: 'contact_person_name', headerName: 'Contact Person Name ', width: 250,
    renderCell: (row) => {
      // console.log("1123",row,row.row?.final_bill?.bank?.bank_name)
      return row.row?.raw_bills?.customer_name
    } },
    // { field: 'mob_no', headerName: 'Mob No.', width: 130 },
    { field: 'pending_amount', headerName: 'Pending Amount', width: 150,
    renderCell: (row) => {
      // console.log("1123",row,row.row?.final_bill?.bill_no)
      return row.row?.final_bill?.pending_amount
    } },
    {
      field: 'bill_no',
      headerName: 'Bill No.',
      type: 'number',
      width: 190,
      renderCell: (row) => {
        return row.row?.final_bill?.bill_no
      }
    },
    {
      field: 'time',
      headerName: 'Oldest Bill',
      width: 160,
      renderCell: (row) => {
        const date = new Date(row.row?.final_bill?.time);

        const currentDate = new Date();
        const timeDifference = date.getTime() - currentDate.getTime();
        const numberOfDays = Math.abs(Math.floor(timeDifference / (1000 * 3600 * 24)));

        return numberOfDays + " Day"
      }
      // oldest unpaid
     
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
      
        <Container className="mt-3" fluid>
          <Card>
            <CardHeader className="bg-info text-white">
              <Row>
                <Col>
                  <strong>Pending Amount</strong>
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
        getRowClassName={(params) => {
          console.log(params,"WWW", params.row.pending_amount)
          if (params.row.pending_amount > "3000") {
            return "bg-red";
          } else if (
            params.row.pending_amount < "50"
          ) {
            return "bg-green";
          }
          //   return "bg-yellow-2";
          // }
          else {
            return "bg-white";
          }
        }}
      />
    </div>
          </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(BranchDashboard);
