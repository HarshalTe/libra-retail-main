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
  import CreateBranch from "./CreateBranch"
  import { connect } from "react-redux";
  import { getBranchMasterPage } from "../../../Redux/Creators/BranchMasterCreators";
import DeleteBranch from './DeleteBranch';
import EditBranch from './EditBranch';
import Paper from "@mui/material/Paper";
import { getCompaniesList } from "./../../../Redux/Creators/CompanyMasterCreators";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import IconButton from "@mui/material/IconButton";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const BranchManagement = (props) => {

  const [searchTerm, setSearchTerm] = React.useState("");
  const [filter, setFilter] = React.useState("");

  let branch_master = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "branch_master"
  );
  console.log("object1122",props)
    const columns = [
      { field: 'branch_name', headerName: 'Branch Name',width: 130},
        { field: 'company_detail',
         headerName: 'Company Detail',
          width: 170,
          valueFormatter: ({ value }) => value?.company_detail 
         },
        { field: 'account', headerName: 'Account No.',width: 130},
        { field: 'ifsc_code', headerName: 'IFSC Code',width: 130},
        { field: 'gstin', headerName: 'GSTIN',width: 220 },
        { field: 'pan', headerName: 'Pan No.'},
        { field: 'state_code', headerName: 'State Code'},
        { field: 'state', headerName: 'State'},
        { field: 'sac', headerName: 'Sac'},
        { field: 'composition_scheme', headerName: 'Composition Scheme'},
        { field: 'msme_no', headerName: 'MSME No.'},
        { field: 'encl', headerName: 'ENCL'},
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
            {branch_master.update_status=="1"?(
              <EditBranch  data={params.row} index={params.row.id}/>
            ):("")}
            {branch_master.delete_status=="1"?(
            <DeleteBranch index={params.row.id}/>
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
      let data = {
        token: token,
      };
        props.getBranchMasterPage(data);
        props.getCompaniesList(data);
      };
      // const rows = [

      // ];
      
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

        const rows = props.branchMaster?.isLoading
        ? []
        : props.branchMaster?.branchMaster?.length > 0
        ? props.branchMaster?.branchMaster?.filter((pur)=>{
          console.log("hhhhhh",filter, pur?.company_detail)
          return(
            (filter
              ? pur?.company_detail
             ?.toLowerCase().includes(filter.trim().toLowerCase())
            : pur) ||
            (filter
              ? pur?.account
             ?.toLowerCase().includes(filter.trim().toLowerCase())
            : pur) ||
            (filter
              ? pur?.ifsc_code
             ?.toLowerCase().includes(filter.trim().toLowerCase())
            : pur) ||
            (filter
              ? pur?.gstin
             ?.toLowerCase().includes(filter.trim().toLowerCase())
            : pur) ||
            (filter
              ? pur?.pan
             ?.toLowerCase().includes(filter.trim().toLowerCase())
            : pur) ||
            (filter
              ? pur?.pan
             ?.toLowerCase().includes(filter.trim().toLowerCase())
            : pur) ||
            (filter
              ? pur?.state
             ?.toLowerCase().includes(filter.trim().toLowerCase())
            : pur) ||
            (filter
              ? pur?.sac
             ?.toLowerCase().includes(filter.trim().toLowerCase())
            : pur) ||
            (filter
              ? pur?.composition_scheme
             ?.toLowerCase().includes(filter.trim().toLowerCase())
            : pur) ||
            (filter
              ? pur?.msme_no
             ?.toLowerCase().includes(filter.trim().toLowerCase())
            : pur) ||
            (filter
              ? pur?.encl
             ?.toLowerCase().includes(filter.trim().toLowerCase())
            : pur)
          )
        })
        : [];
        console.log(rows,"hhhhhh")
  return (
    <div >
         <Container className="mt-3" fluid>
         <br />
          <Card>
            <CardHeader className="shadow-sm border-dark p-0 pb-1 bg-gradient-yellow">
              <Row>
                <Col md={6}>
                  <strong className="d-flex flex-column justify-content-center text-center align-items-center h-100">Libra Branch Master</strong>
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
            {branch_master.create_status==1?(
            <CreateBranch/>
            ):("")} 
            {/* <div>
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
                </div> */}
              <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        components={{
          Toolbar: CustomToolbar,
        }}
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
    branchMaster: state.branchMaster,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBranchMasterPage: (data) => dispatch(getBranchMasterPage(data)),
    getCompaniesList: (data) => dispatch(getCompaniesList(data)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BranchManagement);

// export default BranchManagement
