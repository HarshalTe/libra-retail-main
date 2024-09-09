import React from 'react'
import {
    Card,
    CardHeader,
    Table,
    Container,
    Row,
    Col,
    Button,
  } from "reactstrap";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
  import { DataGrid } from '@mui/x-data-grid';
  import CreateLeavingLetter from "./CreateLeavingLetter"
  import { connect } from "react-redux";
  import { getRelievingLettersList } from "../../../../Redux/Creators/LievingLettersCreators";
import DeleteLeavingLetter from './DeleteLeavingLetter';
import EditLeavingLetter from './EditLeavingLetter';
import Paper from "@mui/material/Paper";
import View from './View';
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

const LeavingLetter = (props) => {
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

  let leaving_letter = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "leaving_letter"
  );
  console.log("object1122",props)
  const columns = [
        { field: 'name',
         headerName: 'Name',
          width: 170,
          renderCell: (value) =>value?.row?.user?.name  
         },
        { field: 'position', headerName: 'Position',width: 135},
        { field: 'status', headerName: 'Status.',width: 160},
        { field: 'relieving_date', headerName: 'Releaving Date',width: 200},
        {field: "actions",
        headerName: "Actions",
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
                    <Button
          variant="outlined"
          color="info"
          size="small"
          className="p-1 ml-1"
        >
            <a href={`https://lvpl.in/librabackend/storage/app/public/offerletters/${params?.row?.file_name}`} target="_blank" rel="noopener noreferrer">
          <VisibilityIcon fontSize="medium" />
      </a>
        </Button>
            </div>
        },
      },
        {field: "actions",
        headerName: "Actions",
        disableExport: true,
        width: 280,
        // style:{width: 200},
        sortable: false,
        headerAlign: "center",
        justifyContent: 'flex-start',
        align: "center",
        disableClickEventBubbling: true,
        renderCell: (params) => {
          return <div className="d-flex">
            {leaving_letter.update_status=="1"?(
              <EditLeavingLetter  data={params.row} index={params.row.id}/>
            ):("")}
            {leaving_letter.delete_status=="1"?(
            <DeleteLeavingLetter index={params.row.id}/>
            ):("")}
            <View index={params.row.id} data={params.row}/>
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
        props.getRelievingLettersList(data);
        props.getUsersPage(data);
      };
      // const rows = [

      // ];
      const rows =props.relievingLetters?.isLoading
      ? []
      : props.relievingLetters?.relievingLetters?.length > 0
      ? props.relievingLetters?.relievingLetters?.filter((pur)=>{
        return(
          (filter
            ? pur?.relieving_date
           ?.toLowerCase().includes(filter.trim().toLowerCase())
          : pur) ||
          (filter
            ? pur?.position
           ?.toLowerCase().includes(filter.trim().toLowerCase())
          : pur) ||
          (filter
            ? pur?.status
           ?.toLowerCase().includes(filter.trim().toLowerCase())
          : pur) ||
          (filter
            ? pur?.message
           ?.toLowerCase().includes(filter.trim().toLowerCase())
          : pur) ||
          (filter
            ? pur?.user?.name
           ?.toLowerCase().includes(filter.trim().toLowerCase())
          : pur) ||
        
          (filter
            ? pur?.user?.role
           ?.toLowerCase().includes(filter.trim().toLowerCase())
          : pur)
        )
      })
      : [];
      console.log(rows,"hhhhhh",props.relievingLetters)
  return (
    <div>
         <Container className="mt-3" fluid>
         <br />
          <Card>
         
            <CardHeader className="shadow-sm border-dark p-0 pb-1 bg-gradient-yellow">
              <Row>
                <Col md={6}>
                  <strong className="d-flex flex-column justify-content-center text-center align-items-center h-100">Relieving Letter</strong>
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
            {leaving_letter.create_status==1?(
            <CreateLeavingLetter/>
            ):("")}
              <div style={{ height: 400, width: '100%' }}>
      <DataGrid
      loading={props.relievingLetters?.isLoading ? true : false}
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
    relievingLetters: state.relievingLetters,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRelievingLettersList: (data) => dispatch(getRelievingLettersList(data)),
    getUsersPage: (data) => dispatch(getUsersPage(data)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeavingLetter);
