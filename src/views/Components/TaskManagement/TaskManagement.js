import React from "react";
import { connect } from "react-redux";

import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
} from "reactstrap";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import IconButton from "@mui/material/IconButton";

//*Compoenets
import TaskManagementTable2 from "./TaskManagementTable2";

//*Actions
import { searchProjects } from "../../../Redux/Creators/ProjectsCreators";
import { getUsersPage } from "../../../Redux/Creators/UsersCreators";

function TaskManagement(props) {
  const token = props.login?.login?.token;
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filter, setFilter] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(1000000);
  
  React.useEffect(() => {
    fetchData(page);
  }, []);

  const handleChangeSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearch = () => {
    const data = {
      token: token,
      search: searchTerm,
    };
    // props.searchProjects(data);
  };

  const handleSearchEnter = (event) => {
    const data = {
      token: token,
      search: searchTerm,
    };
    if (event.key == "Enter") {
      props.searchProjects(data);
    }
    return;
  };

  
  const fetchData = (page) => {
    const token = props.login?.login?.token;
    let pageno = page + 1;
    let data = {
      pageno: pageno,
      pageSize: rowsPerPage,
      token: token,
    };
    props.getUsersPage(data);
  };
  
  let tasks = props.tasks?.isLoading
  ? []
  : props.tasks?.tasks?.tasks?.data

  console.log(
    "Filtered tasks:",
    tasks?.filter((row) => row.status === "1")
  );
  return (
    <div className="container-fluid">
       <div className="pt-4 px-3">
          <Row className="pt-1 pb-1">
            <Col md={4}>
              <Card className="pt-2 pb-2">
                <CardHeader className="bg-info text-white">
                  <strong>Pending task</strong>
                </CardHeader>
                <CardBody>
                  <strong>
                    {tasks?.filter((row) => row.status === "0").length}
                  </strong>
                </CardBody>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="pt-2 pb-2">
                <CardHeader className="bg-info text-white">
                  <strong>Completed task</strong>
                </CardHeader>
                <CardBody>
                  <strong>
                  {tasks?.filter((row) => row.status === "1").length}
                  </strong>
                </CardBody>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="pt-2 pb-2">
                <CardHeader className="bg-info text-white">
                  <strong>Total task </strong>
                </CardHeader>
                <CardBody>
                  <strong>
                    {props.tasks?.tasks?.totalTasksCount}
                  </strong>
                </CardBody>
              </Card>
            </Col>
           
           
          </Row>
         
        </div>
      <br />
      <Card className="p-1 px-2">
        <CardHeader className="shadow-sm border-dark p-0 pb-1 bg-gradient-yellow">
          <Row>
            {/* <Col md={6}
            style={{fontWeight:"bolder",margin:"2vw 0"}}>
            </Col> */}
            <Col md={6}>
              <strong className="d-flex flex-column justify-content-center text-center align-items-center h-100">Task Management</strong>
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
        
        <CardBody>
          <div>
            <TaskManagementTable2 searchTerm={filter} />
            {/* <TaskManagementTable /> */}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    tasks: state.tasks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchProjects: (data) => dispatch(searchProjects(data)),
    getUsersPage: (data) => dispatch(getUsersPage(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskManagement);
