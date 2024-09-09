import React from 'react'
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
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import ReactHTMLTableToExcel from "react-html-table-to-excel";

  import { DataGrid } from '@mui/x-data-grid';
  import CreateExpense from "./CreateExpense"
  import { connect } from "react-redux";
  import { getExpensesList,DeleteExpenses } from "../../../Redux/Creators/ExpensesCreators";
import EditExpense from './EditExpense';
import ExpansesApproveAction from './ExpansesApproveAction';
import DeleteButton from '../../../Helpers/DeleteButton';

const ExpenseManagement = (props) => {
  const token = props.login?.login?.token;

  let expense_management = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "expense_management"//r
  );

  console.log("object1122",props)
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'expense_name', headerName: 'Expense Namewww', width: 130 },
        { field: 'expense_type', headerName: 'Expense Type', width: 150 },
        { field: 'amount', headerName: 'Amount', width: 130 },
        { field: 'case_no', headerName: 'Case No.', width: 130 },
        { field: 'user', headerName: 'Engineer Name', width: 130,valueFormatter: ({ value }) => value?.name },
        // { field: 'case_no', headerName: 'Case No.', width: 130 },
        {
          field: 'view',
          headerName: 'View',
          // description: 'This column has a value getter and is not sortable.',
          // sortable: false,
          width: 160,
            renderCell: (row) => {
              return <div className="d-flex">
                {expense_management.update_status=="1"?(
                <EditExpense data={row} />
            ):("")}
                {/* {expense_management.update_status=="1"?(
                <ExpansesApproveAction data={row} />
            ):("")} */}
            {expense_management.delete_status=="1"?(
                <DeleteButton
      id={row.row.id}
      deleteFunction={() => props.DeleteExpenses(row.row.id, token)}
      /> 
            ):("")}
            </div>
            }  
         
        },
       
      ];
      React.useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = () => {
        const token = props.login?.login?.token;
      let data = {
        token: token,
      };
        props.getExpensesList(data);
      };
      // const rows = [

      // ];
      const rows = props.expenses?.expenses?.data?.isLoading
      ? []
      : props.expenses?.expenses?.data?.length > 0
      ? props.expenses?.expenses?.data
      : [];
      console.log(rows,"hhhhhh")
  return (
    <div>
         <Container className="mt-3" fluid>
          <Card>
            <CardHeader className="bg-info text-white">
              <Row>
                <Col>
                  <strong>Expense Management</strong>
                </Col>
                <Col md={4}></Col>
                <Col md={2} className="d-flex">
                  <div className="d-flex">
                  <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className="download-table-sm-button btn-success"
                  table="table-ExpenseManagement"
                  filename="members"
                  sheet="tablecsv"
                  buttonText="Download Excel of Approved"
                >
                    <Button
                      className="ml-3"
                      color="primary"
                      variant="contained"
                      size="small"
                    >
                      Download Excel of Approved
                    </Button>
                    </ReactHTMLTableToExcel>
                  </div>
                 
                </Col>
                <Col md={2} className="d-flex">
                 
                  <div className="d-flex">
                  <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className="download-table-sm-button btn-success"
                  table="table-ExpenseManagementNotApprove"
                  filename="members"
                  sheet="tablecsv"
                  buttonText="Download Excel of Non Approved"
                >
                    <Button
                      className="ml-3"
                      color="primary"
                      variant="contained"
                      size="small"
                    >
                      Download Excel of Non Approved
                    </Button>
                    </ReactHTMLTableToExcel>
                  </div>
                </Col>
              </Row>
            </CardHeader>
            {expense_management.create_status=="1"?(
            <CreateExpense/>
            ):("")}
              <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        getRowClassName={(params) => {
          // console.log(params,"WWW", params.row.pending_amount)
          if (params.row.is_approved == "1") {
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
    <TableContainer style={{"display":"none"}} component={Paper}>
      <Table id="table-ExpenseManagement" sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Expense Name</TableCell>
            <TableCell align="right">Expense Type</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Case No.</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.filter((pur,i)=>{return(pur?.is_approved=="0")}).map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="right">{row.expense_name}</TableCell>
              <TableCell align="right">{row.expense_type}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">{row.case_no}</TableCell>
                </TableRow>
          ))}
        </TableBody>
      </Table>
      <Table id="table-ExpenseManagementNotApprove" sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Expense Name</TableCell>
            <TableCell align="right">Expense Type</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Case No.</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.filter((pur,i)=>{return(pur?.is_approved=="1")}).map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="right">{row.expense_name}</TableCell>
              <TableCell align="right">{row.expense_type}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">{row.case_no}</TableCell>
                </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          </Card>
        </Container>
      
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    login: state.login,
    projects: state.projects,
    tasks: state.tasks,
    expenses: state.expenses,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getExpensesList: (data) => dispatch(getExpensesList(data)),
    DeleteExpenses: (id,token) => dispatch(DeleteExpenses(id,token)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseManagement);

// export default ExpenseManagement
