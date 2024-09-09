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
  import CreateAssets from "./CreateAssets"
  import { connect } from "react-redux";
  import { getAssetsList } from "../../../../Redux/Creators/AssetsCreators";
import DeleteAssets from './DeleteAssets';
import EditAssets from './EditAssets';
import Paper from "@mui/material/Paper";
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
import { getUsersPage } from 'Redux/Creators/UsersCreators';
import VisibilityIcon from "@mui/icons-material/Visibility";

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


const AssrtsMaster = (props) => {

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

  let assets = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "assets"
  );
  console.log("object1122",props)
    const columns = [
        { field: 'name',
         headerName: 'Assets Name',
          width: 220,
          valueFormatter: ({ value }) => value?.name 
         },
        // { field: 'user',
        //  headerName: 'User Name',
        //   width: 170,
        //   renderCell: ({ value }) => console.log(value) 
        //  },
         { field: 'remark', headerName: 'Remarks',width: 220},
         { field: 'type', headerName: 'Type',width: 220},
        //  { field: 'photo', headerName: 'Photo',width: 130},
        {field: "assets_photo",
        headerName: "Assets Photo",
        disableExport: true,
        width: 100,
        // style:{width: 200},
        sortable: false,
        headerAlign: "center",
        justifyContent: 'flex-start',
        align: "center",
        disableClickEventBubbling: true,
        renderCell: (params) => {
          return <div className="d-flex">
             <div>
        <Button
          variant="outlined"
          color="info"
          size="small"
          className="p-1 ml-1"
        >
            <a href={`https://lvpl.in/librabackend/storage/app/public/assets/${params?.row?.photo}`} target="_blank" rel="noopener noreferrer">
          <VisibilityIcon fontSize="medium" />
      </a>
        </Button>
    </div>
            </div>
        },
      },
        {field: "bill_photo",
        headerName: "Bill Photo",
        disableExport: true,
        width: 100,
        // style:{width: 200},
        sortable: false,
        headerAlign: "center",
        justifyContent: 'flex-start',
        align: "center",
        disableClickEventBubbling: true,
        renderCell: (params) => {
          return <div className="d-flex">
             <div>
        <Button
          variant="outlined"
          color="info"
          size="small"
          className="p-1 ml-1"
        >
            <a href={`https://lvpl.in/librabackend/storage/app/public/assets/${params?.row?.bill_photo}`} target="_blank" rel="noopener noreferrer">
          <VisibilityIcon fontSize="medium" />
      </a>
        </Button>
    </div>
            </div>
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
            {assets.update_status=="1"?(
              <EditAssets  data={params.row} index={params.row.id}/>
            ):("")}
            {assets.delete_status=="1"?(
            <DeleteAssets index={params.row.id}/>
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
        pageno: 1,
        pageSize: 1000000,
        token: token,
      };
        props.getAssetsList(data);
        props.getUsersPage(data);
      };
      // const rows = [

      // ];
      const rows =props.assets?.isLoading
      ? []
      : props.assets?.assets?.length > 0
      ? props.assets?.assets?.filter((pur)=>{
        return(
          (filter
            ? pur?.user?.name
           ?.toLowerCase().includes(filter.trim().toLowerCase())
          : pur) ||
          (filter
            ? pur?.name
           ?.toLowerCase().includes(filter.trim().toLowerCase())
          : pur) ||
          (filter
            ? pur?.remark
           ?.toLowerCase().includes(filter.trim().toLowerCase())
          : pur) ||
          (filter
            ? pur?.document_nam
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
                  <strong className="d-flex flex-column justify-content-center text-center align-items-center h-100">Company Asset Master</strong>
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
            {assets.create_status==1?(
            <CreateAssets/>
            ):("")}
              <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        loading={props.assets?.isLoading ? true : false}  
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
    assets: state.assets,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAssetsList: (data) => dispatch(getAssetsList(data)),
    getUsersPage: (data) => dispatch(getUsersPage(data)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssrtsMaster);
