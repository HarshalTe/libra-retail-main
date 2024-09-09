import React from 'react'
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
  import ViewBill from "./ViewBill"
  import { getFinalBillsPage } from "../../../../Redux/Creators/FinalBillsCreators";
const BillHistory = (props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100000);
  const [selectionModel, setSelectionModel] = React.useState([]); 
  const [pageSize, setPageSize] = React.useState(10);

  React.useEffect(() => {
    fetchData(page, rowsPerPage);
  }, []);
  let bill_history = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "bill_history"
  );
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
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'bill_no', headerName: 'bill no.', width: 210 },
        { field: 'bank_name', 
        headerName: 'Bank Name',
         width: 250,
        renderCell: (row) => {
          return row.row?.bank?.bank_name
        } 
      },
        {
          field: 'view',
          headerName: 'View',
          // description: 'This column has a value getter and is not sortable.',
          // sortable: false,
          width: 160,
            renderCell: (row) => {
              return <div className="d-flex">
                <ViewBill data={row} />
            </div>
            }  
         
        },
      ];
      const rows = props?.finalBills?.finalBills?.data?.isLoading
? []
: props.finalBills.finalBills.data?.length > 0
  ? props.finalBills.finalBills.data
  : [];
console.log(rows, "hhhhhh")
const rowsCopy = [...rows];
const reversedRows = rowsCopy.reverse();
return (
    <div>
      <Container className="mt-3" fluid>
          <Card>
            <CardHeader className="bg-info text-white">
              <Row>
                <Col>
                  <strong>Bill History</strong>
                </Col>
                <Col md={4}></Col>
              </Row>
            </CardHeader>
              <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={reversedRows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
      
      />
    </div>
          </Card>
        </Container>
    
    </div>
  )
}

// export default BillHistory

const mapStateToProps = (state) => {
  return {
    login: state.login,
    users: state.users,
    finalBills: state.finalBills,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // tasksPostData: (data,user) => dispatch(tasksPostData(data,user)),
    getFinalBillsPage: (data) => dispatch(getFinalBillsPage(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BillHistory);
