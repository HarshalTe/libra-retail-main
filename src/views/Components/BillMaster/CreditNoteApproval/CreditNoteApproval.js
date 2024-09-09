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
import ApprovelBtn from "./ApprovelBtn";

const CreditNoteApproval = (props) => {
  const [page, setPage] = React.useState(0);
  // const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(100000);
  const token = props.login?.login?.token;
  React.useEffect(() => {
    let data = {
      token: token,
    };
    fetchData(page, rowsPerPage);
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


  const columns = [
    // { field: 'id', headerName: 'ID', width: 70 },
    // { field: 'bill_no', headerName: 'Bill No.', width: 130 },
    // { field: 'bank_name', headerName: 'Bank Name', width: 150 },
    // { field: 'amount', headerName: 'Amount', width: 130 },
    // { field: 'reopen_reason', headerName: 'Reopen Reason', width: 130 },
    { field: 'created_at', headerName: 'Credit note date', width: 130 },
    { field: 'id', headerName: 'Credit note number', width: 130 },
    { field: 'bill_no', headerName: 'Original invoice number', width: 130 },
    { field: 'created_date', headerName: 'Original invoice date', width: 130 },
    { field: 'branch_name', headerName: 'Party name', width: 130,
    renderCell: (row) => {
      return row.row?.bank?.branch_name
    }
    
    },
    { field: 'branch_name', headerName: 'Party Branch', width: 130
    ,renderCell: (row) => {
      // console.log("object",row)
      return row.row?.raw_bills[0]?.branch?.branch_name
    } },
    { field: 'address', headerName: 'Address of the party', width: 130
    ,renderCell: (row) => {
      return row.row?.raw_bills[0]?.branch?.address
    } },
    { field: 'gstno', headerName: 'Party GST number', width: 130 
    ,renderCell: (row) => {
      return row.row?.raw_bills[0]?.branch?.gstno
    }},
    { field: 'product', headerName: 'Product details', width: 130
    ,renderCell: (row) => {
      console.log(row.row?.raw_bills[0]?.product,"product")
      return row.row?.raw_bills[0]?.product==null?"N/A":row.row?.raw_bills[0]?.product.name
    } },
    { field: 'net_amount_receivable', headerName: 'Taxable Value', width: 130 },
    { field: 'igst', headerName: 'IGST', width: 130 },
    { field: 'cgst', headerName: 'CGST', width: 130 },
    { field: 'sgst', headerName: 'SGST', width: 130 },
    { field: 'grand_total', headerName: 'Invoice value', width: 130 },
    { field: 'reason_for_credit_note', headerName: 'Reason for credit note', width: 130 },
    {
      field: 'approve',
      headerName: 'Approve',
      width: 170,
      renderCell: (row) => {
        return <ApprovelBtn data={row}/>
      
      }  

    },
  ];

  const rows = props?.finalBills?.finalBills?.data?.isLoading
  ? []
  : props.finalBills.finalBills?.data?.length > 0
    ? props.finalBills.finalBills?.data?.filter((item) => {
      return (
        (item?.is_creditnote_approved==0
    ))
  })
    : [];
  
  // const rows = [
  //   { id: 1, amount: 6000,contact_person_name:"ravi", bank_name: 'SBI', bill_no: 35, reopen_reason: "non" },
    
  // ];
  const rowsCopy = [...rows];
  const reversedRows = rowsCopy.reverse();
  return (
    <>
      
        <Container className="mt-3" fluid>
          <Card>
            <CardHeader className="bg-info text-white">
              <Row>
                <Col>
                  <strong>Credit Note Approval</strong>
                </Col>
                <Col md={4}></Col>
      {/* <CreateBill data={row.row}/> */}

              </Row>
            </CardHeader>
              <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={reversedRows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
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
    branches: state.branches,
    projects: state.projects,
    bankVerticals: state.bankVerticals,
    bankProducts: state.bankProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFinalBillsPage: (data) => dispatch(getFinalBillsPage(data)),
    // getBranchesList: (data) => dispatch(getBranchesList(data)),
    // getProjectsList: (data) => dispatch(getProjectsList(data)),
    // getDropdownsList: (data) => dispatch(getDropdownsList(data)),

    // //!
    // getBankProductsList: (data) => dispatch(getBankProductsList(data)),
    // getBankVerticalsList: (data) => dispatch(getBankVerticalsList(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreditNoteApproval);
