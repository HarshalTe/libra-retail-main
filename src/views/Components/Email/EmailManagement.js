import React from "react";
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
import { DataGrid } from "@mui/x-data-grid";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { connect } from "react-redux";
import { getBranchesPage } from "../../../Redux/Creators/BranchesCreators";
import { getBranchMasterPage } from "../../../Redux/Creators/BranchMasterCreators";

import Paper from "@mui/material/Paper";

import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import TextField from "@material-ui/core/TextField";
import { IconButton, InputAdornment } from "@mui/material";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";

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
  const [pageSize, setPageSize] = React.useState(1000000);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filter, setFilter] = React.useState("");
  const mapPageToNextCursor = React.useRef({});

  const [page, setPage] = React.useState(0);

  let email_master = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "email_master"
  );
  console.log("object1122", props);
  const columns = [
    { field: "bank_name", headerName: "Name", width: 100 },
    { field: "branch_name", headerName: "Branch Name", width: 100 },
    { field: "city", headerName: "Address", width: 100 },
    { field: "pincode", headerName: "Pincode", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "mobile_no_1", headerName: "Mobile No.", width: 100 },
    { field: "case_type", headerName: "Case Type", width: 150 },
    { field: "email_type", headerName: "Email Type", width: 150 },
    { field: "dob", headerName: "Date Of Birth", width: 150 },
  ];
  React.useEffect(() => {
    fetchData();
  }, []);
  const token = props.login?.login?.token;
  const fetchData = (page) => {
    const token = props.login?.login?.token;

    // console.log("page", page);
    let pageno = page + 1;
    // console.log("pageno", pageno);
    let data = {
      pageno: 1,
      pageSize: pageSize,
      token: token,
    };
    props.getBranchesPage(data);
  };
  // const rows = [

  // ];
  const rows = props.branches?.isLoading
    ? []
    : props.branches?.branches?.data?.length > 0
    ? props.branches?.branches?.data
    : [];
    console.log(rows, "hhhhhh");
    const emailArray = [];
    let uniqueId = 0
    rows.forEach((account, id) => {
      account.email_details.forEach((emailDetail, i) => {
      emailArray.push({
        id: uniqueId++,
        branch_id: emailDetail.branch_id,
        name: emailDetail.name,
        email: emailDetail.email,
        email_type: emailDetail.email_type,
        case_type: emailDetail.case_type,
        branch_name: rows.find((row, i) => row.id == emailDetail.branch_id)
        ?.branch_name,
        bank_name: rows.find((row, i) => row.id == emailDetail.branch_id)
          ?.bank_name,
          city: rows.find((row, i) => row.id == emailDetail.branch_id)?.city,
          pincode: rows.find((row, i) => row.id == emailDetail.branch_id)
          ?.pincode,
          mobile_no_1: emailDetail.phone,
          dob: emailDetail.dob,
        });
      });
  });
  const rowNonBanking = emailArray?.filter((row) => row?.email_type == "reports")
  // ?.filter((pur)=>
    // (filter
    //   ? pur?.pincode.toLowerCase().includes(filter.trim().toLowerCase())
    //   : pur) 
    //   ||
    // (filter
    //   ? pur?.bank_name.toLowerCase().includes(filter.trim().toLowerCase())
    //   : pur) ||
    // (filter
    //   ? pur?.branch_name.toLowerCase().includes(filter.trim().toLowerCase())
    //   : pur) ||
    // (filter
    //   ? pur?.case_type.toLowerCase().includes(filter.trim().toLowerCase())
    //   : pur) ||
    // (filter
    //   ? pur?.city.toLowerCase().includes(filter.trim().toLowerCase())
    //   : pur) ||
    // (filter
    //   ? pur?.dob.toLowerCase().includes(filter.trim().toLowerCase())
    //   : pur) ||
    // (filter
    //   ? pur?.email_type.toLowerCase().includes(filter.trim().toLowerCase())
    //   : pur) ||
    // (filter
    //   ? pur?.email.toLowerCase().includes(filter.trim().toLowerCase())
    //   : pur) ||
    // (filter
    //   ? pur?.mobile_no_1.toLowerCase().includes(filter.trim().toLowerCase())
    //   : pur) 
    // );
  const rowBanking = emailArray?.filter((row) => row?.email_type == "billing")

  const handleChangeSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearch = () => {
    const data = {
      search: searchTerm,
    };
    // props.searchPincodes(data, token);
  };

  const handleSearchEnter = (event) => {
    const data = {
      search: searchTerm,
    };
    if (event.key == "Enter") {
      setFilter(searchTerm)
    }
    return;
  };

  console.log(emailArray, "hhhhhh", props.branches,filter);
  return (
    <div>
      <Container className="mt-3" fluid>
        <Card className="p-1 px-2">
          <CardHeader className="bg-gradient-yellow text-white">
            <Row>
              <Col md={6}>
                <strong>Client Email Details</strong>
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

          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rowBanking}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              components={{
                Toolbar: CustomToolbar,
              }}
            />
          </div>
        </Card>
      </Container>
      <Container className="mt-3" fluid>
        <Card className="p-1 px-2">
          <CardHeader className="bg-gradient-yellow text-white">
            <Row>
              <Col md={6}>
                <strong>Non Banking Customer Details</strong>
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

          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rowNonBanking}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              components={{
                Toolbar: CustomToolbar,
              }}
            />
          </div>
        </Card>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    login: state.login,
    projects: state.projects,
    tasks: state.tasks,
    branches: state.branches,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBranchMasterPage: (data) => dispatch(getBranchMasterPage(data)),
    getBranchesPage: (data) => dispatch(getBranchesPage(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BranchManagement);

// export default BranchManagement
