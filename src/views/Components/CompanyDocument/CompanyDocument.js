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
  import CreateCompanyDocument from "./CreateCompanyDocument"
  import { connect } from "react-redux";
  import { getCompanyDocumentPage } from "../../../Redux/Creators/CompanyDocumentCreators";
import DeleteCompanyDocument from './DeleteCompanyDocument';
import EditCompanyDocument from './EditCompanyDocument';
import ViewRateCard from './ViewRateCard';
import DownloadDocs from './DownloadDocs';
import Paper from "@mui/material/Paper";
import { getBranchMasterPage } from "../../../Redux/Creators/BranchMasterCreators";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import IconButton from "@mui/material/IconButton";
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



const CompanyDocument = (props) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filter, setFilter] = React.useState("");

  const handleChangeSearch = (event) => {
    setSearchTerm(event.target.value);
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


  let company_document = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "company_document"
    );
    console.log("object1122",props)
    const columns = [
        { field: 'document_name', headerName: 'Document Name',width: 350},
        {field: "view",
        headerName: "View Documents",
        disableExport: true,
        width: 160,
    
        // style:{width: 200},
        sortable: false,
        headerAlign: "center",
        justifyContent: 'flex-start',
        align: "center",
        disableClickEventBubbling: true,
        renderCell: (row) => {
          return <ViewRateCard data={row} />
        },
        },
        {field: "download_documents",
        headerName: "Download Documents",
        disableExport: true,
        width: 160,
    
        // style:{width: 200},
        sortable: false,
        headerAlign: "center",
        justifyContent: 'flex-start',
        align: "center",
        disableClickEventBubbling: true,
        renderCell: (row) => {
          return <DownloadDocs data={row} />
        },
      },
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
            {/* {company_document.update_status=="1"?(
              <EditCompanyDocument  data={params.row} index={params.row.id}/>
            ):("")} */}
            {company_document.delete_status=="1"?(
            <DeleteCompanyDocument index={params.row.id}/>
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
        props.getCompanyDocumentPage(data);
        props.getBranchMasterPage(data);
      };
      // const rows = [

      // ];
      const rows = props.companyDocument?.isLoading
      ? []
      : props.companyDocument?.companyDocument?.length > 0
      ? props.companyDocument?.companyDocument?.filter((pur)=>{
        return(
          (filter
            ? pur?.document_name
           ?.toLowerCase().includes(filter.trim().toLowerCase())
          : pur)
        )
      })
      : [];
      console.log(rows,"hhhhhh")
  return (
    <div>
         <Container className="mt-3" fluid>
         <br />
          <Card>
         
            <CardHeader className="shadow-sm border-dark p-0 pb-1 bg-gradient-yellow">
              <Row>
                <Col md={6}>
                  <strong className="d-flex flex-column justify-content-center text-center align-items-center h-100">Libra Company Document</strong>
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
            {company_document.create_status==1?(
            <CreateCompanyDocument/>
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
    companyDocument: state.companyDocument,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCompanyDocumentPage: (data) => dispatch(getCompanyDocumentPage(data)),
    getBranchMasterPage: (data) => dispatch(getBranchMasterPage(data)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyDocument);

// export default CompanyDocument
