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
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
  import { DataGrid } from '@mui/x-data-grid';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
  import CreateLeave from "./CreateLeave"
  import { connect } from "react-redux";
  import { getLeavesList } from "../../../Redux/Creators/LeaveCreators";
import DeleteLeaves from './DeleteLeaves';
import EditLeaves from './EditLeaves';
import Paper from "@mui/material/Paper";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import IconButton from "@mui/material/IconButton";
import { getUsersPage } from "../../../Redux/Creators/UsersCreators";

const LeaveManagement = (props) => {

  const [searchTerm, setSearchTerm] = React.useState("");
  const [filter, setFilter] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(1000000);

  const handleChangeSearch = (event) => {
    setSearchTerm(event.target.value);
  };


  const handleSearchEnter = (event) => {
    const data = {
      search: searchTerm,
    };
    if (event.key == "Enter") {
      setFilter(searchTerm)
      // props.searchCompaniesData(data, token);
    }
    return;
  };

  let leave_management = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "leave_management"
  );
  console.log("object1122",props)
    const columns = [
        { field: 'employee',
         headerName: 'Employee Name',
          width: 170,
          valueFormatter: ({ value }) => value?.name 
         },
        { field: 'date', headerName: 'From Date',width: 130},
        { field: 'till_date', headerName: 'Till Date',width: 130},
        { field: 'reason', headerName: 'Reason',width: 220 },
        { field: 'is_approved', headerName: 'Approved',
        valueFormatter: ({ value }) => value== 0 ? "No" : "Yes"  },
        {field: "actions",
        headerName: "Actions",
        disableExport: true,
        width: 160,
        // style:{width: 200},
        sortable: false,
        headerAlign: "center",
        justifyContent: 'flex-start',
        align: "center",
        disableClickEventBubbling: true,
        renderCell: (params) => {
          return <div className="d-flex">
            {leave_management.update_status=="1"?(
              <EditLeaves  data={params.row} index={params.row.id}/>
            ):("")}
            {leave_management.delete_status=="1"?(
            <DeleteLeaves index={params.row.id}/>
            ):("")}
            </div>
        },
      },
       
      ];
      React.useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = () => {
        const token = props.login?.login?.token;
        let pageno = page + 1;
        let data = {
          pageno: pageno,
          pageSize: rowsPerPage,
          token: token,
        };
      props.getUsersPage(data);
        props.getLeavesList(data);
      };
      // const rows = [

      // ];
      const rows = props.leaves?.isLoading
      ? []
      : props.leaves?.leaves?.data?.length > 0
      ? props?.login?.login?.user.role == "admin"
      ? props.leaves?.leaves?.data
      : props.leaves?.leaves?.data.filter((item) => {
        return (
          (item?.employee?.id == props?.login?.login?.user?.id
      ))
    })?.filter((pur)=>{
      // console.log("hhhhhh",filter, pur?.company_detail)
      return(
        (filter
          ? pur?.employee?.name
         ?.toLowerCase().includes(filter.trim().toLowerCase())
        : pur) ||
        (filter
          ? pur?.date
         ?.toLowerCase().includes(filter.trim().toLowerCase())
        : pur) ||
        (filter
          ? pur?.reason
         ?.toLowerCase().includes(filter.trim().toLowerCase())
        : pur)
      )
    })
      : [];
      // console.log(rows,"hhhhhh")
  return (
    <div>
         <Container className="mt-3" fluid>
         <br />
      <Card className="p-1 px-2">
            <CardHeader className="shadow-sm border-dark p-0 pb-1 bg-gradient-yellow">
          <Row>
            <Col md={6}>
            <strong className="d-flex flex-column justify-content-center text-center align-items-center h-100">Leave Management</strong>

            </Col>

            <Col md={6}>
              <TextField
                fullWidth
                type="search"
                variant="outlined"
                margin="normal"
                size="small"
                label="search"
                onChange={(event) => handleChangeSearch(event)}
                onKeyDown={(event) => handleSearchEnter(event)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        aria-label="search"
                        color={searchTerm == "" ? "default" : "success"}
                        // onClick={() => handleSearch()}
                        onClick={() => setFilter(searchTerm)}
                        style={{ padding: "0px" }}
                      >
                        <SearchSharpIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Col>
          </Row>
        </CardHeader>
            {leave_management.create_status==1?(
            <CreateLeave/>
            ):("")}
            <div>
                <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className="download-table-sm-button btn-success"
                  table="table-to-xls"
                  filename="members"
                  sheet="tablecsv"
                  buttonText="Download"
                >
                  <Button size="sm" color="success">
                    Download Excel
                  </Button>
                  </ReactHTMLTableToExcel>
                </div>
              <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
       <TableContainer style={{"display":"none"}} component={Paper}>
      <Table id="table-to-xls" sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Employee Name</TableCell>
            <TableCell align="right">From Date</TableCell>
            <TableCell align="right">Till Date</TableCell>
            <TableCell align="right">Reason</TableCell>
            <TableCell align="right">Approved</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              {row.id}
              </TableCell>
              <TableCell component="th" scope="row">
              {row.employee?.name}
              </TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.bank?.till_date}</TableCell>
              <TableCell align="right">{row.reason}</TableCell>
              <TableCell align="right">{row.is_approved==0?"No":"Yes"}</TableCell>
                </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
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
    leaves: state.leaves,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLeavesList: (data) => dispatch(getLeavesList(data)),
    getUsersPage: (data) => dispatch(getUsersPage(data)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeaveManagement);

// export default LeaveManagement
