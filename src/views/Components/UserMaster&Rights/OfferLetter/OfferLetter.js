import React from "react";
import { Card, CardHeader, Table, Container, Row, Col, Button } from "reactstrap";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { DataGrid } from "@mui/x-data-grid";
import CreateOfferLetter from "./CreateOfferLetter";
import { connect } from "react-redux";
import { getOfferLettersList } from "../../../../Redux/Creators/OfferLetterCreators";
import DeleteOfferLetter from "./DeleteOfferLetter";
import EditOfferLetter from "./EditOfferLetter";
import Paper from "@mui/material/Paper";
import View from "../LeavingLetter/View";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";


const OfferLetter = (props) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filter, setFilter] = React.useState("");

  const handleChangeSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearchEnter = (event) => {
    if (event.key === "Enter") {
      setFilter(searchTerm);
    }
    return;
  };

  let offer_letter = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name === "offer_letter"
  );
  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 170,
      valueFormatter: ({ value }) => value?.name,
    },
    { field: "email", headerName: "Email", width: 130 },
    { field: "phone", headerName: "Mobile No.", width: 130 },
    { field: "gender", headerName: "gender", width: 130 },
    { field: "doj", headerName: "Date Of Birth", width: 130 },
    { field: "position", headerName: "Position", width: 130 },
    { field: "salary_pa", headerName: "Salary", width: 130 },
    { field: "status", headerName: "Status", width: 130 },
    {field: "file",
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
    {
      field: "actions",
      headerName: "Actions",
      disableExport: true,
      width: 280,
      // style:{width: 200},
      sortable: false,
      headerAlign: "center",
      justifyContent: "flex-start",
      align: "center",
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <div className="d-flex">
            {offer_letter.update_status == "1" ? (
              <EditOfferLetter data={params.row} index={params.row.id} />
            ) : (
              ""
            )}
            {offer_letter.delete_status == "1" ? (
              <DeleteOfferLetter index={params.row.id} />
            ) : (
              ""
            )}
            <View index={params.row.id} data={params.row} />
          </div>
        );
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
    props.getOfferLettersList(data);
  };
  const rows = props.offerLetters?.isLoading
    ? []
    : props.offerLetters?.offerLetters?.length > 0
    ? props.offerLetters?.offerLetters?.filter((pur) => {
        return (
          (filter
            ? pur?.email?.toLowerCase().includes(filter.trim().toLowerCase())
            : pur) ||
          (filter
            ? pur?.phone?.toLowerCase().includes(filter.trim().toLowerCase())
            : pur) ||
          (filter
            ? pur?.gender?.toLowerCase().includes(filter.trim().toLowerCase())
            : pur) ||
          (filter
            ? pur?.doj?.toLowerCase().includes(filter.trim().toLowerCase())
            : pur) ||
          (filter
            ? pur?.position?.toLowerCase().includes(filter.trim().toLowerCase())
            : pur) ||
          (filter
            ? pur?.salary_pa
                ?.toLowerCase()
                .includes(filter.trim().toLowerCase())
            : pur) ||
          (filter
            ? pur?.message?.toLowerCase().includes(filter.trim().toLowerCase())
            : pur) ||
          (filter
            ? pur?.test?.toLowerCase().includes(filter.trim().toLowerCase())
            : pur)
        );
      })
    : [];
  return (
    <div>
      <Container className="mt-3" fluid>
        <br />
        <Card>
          <CardHeader className="shadow-sm border-dark p-0 pb-1 bg-gradient-yellow">
            <Row>
              <Col md={6}>
                <strong className="d-flex flex-column justify-content-center text-center align-items-center h-100">
                  Offer Letter
                </strong>
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
          {offer_letter.create_status == 1 ? <CreateOfferLetter /> : ""}
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              loading={props.offerLetters?.isLoading ? true : false}
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
            <TableContainer style={{ display: "none" }} component={Paper}>
              <Table
                id="table-to-xls"
                sx={{ minWidth: 650 }}
                aria-label="simple table"
              >
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
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
                      <TableCell align="right">
                        {row.is_approved == 0 ? "No" : "Yes"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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
    offerLetters: state.offerLetters,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOfferLettersList: (data) => dispatch(getOfferLettersList(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OfferLetter);
