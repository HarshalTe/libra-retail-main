import React, { useState } from "react";
import { connect } from "react-redux";

import { Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import IconButton from "@mui/material/IconButton";

//* Components
import WIPTable from "./WIPTable";

//* Actions
import { getPropertiesPage } from "../../../../Redux/Creators/PropertiesCreators";
import { getUsersList } from "../../../../Redux/Creators/UsersCreators";

function WorkInProgressCases(props) {
  const token = props.login?.login?.token;

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const token = props.login?.login?.token;

    let data = {
      token: token,
      pageno: 1,
        pageSize: 1000000,
    };
    props.getUsersList(data);
  };

  const [searchTerm, setSearchTerm] = React.useState("");
  const [filter, setFilter] = React.useState("");
  const handleChangeSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearch = () => {
    const data = {
      token: token,
      search: searchTerm,
    };
    // props.searchUnderConstructProjects(data);
  };

  const handleSearchEnter = (event) => {
    const data = {
      token: token,
      search: searchTerm,
    };
    if (event.key == "Enter") {
      // props.searchUnderConstructProjects(data);
    }
    return;
  };
  console.log("searchTerm",searchTerm)
  return (
    <div className="container-fluid">
      <br />
      <Card className="p-1 px-2">
        <CardHeader className="shadow-sm border-dark p-0 pb-1">
          <Row>
            {/* <Col md={6}></Col> */}

            <Col md={4}>
              <TextField
                fullWidth
                type="search"
                variant="outlined"
                margin="normal"
                size="small"
                label="search by Application No"
                onChange={(event) => handleChangeSearch(event)}
                // onKeyDown={(event) => handleSearchEnter(event)}
                // onKeyDown={(event) => handleChangeSearch(event)}
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
            <Col md={4}>
              <TextField
                fullWidth
                type="search"
                variant="outlined"
                margin="normal"
                size="small"
                label="search by Customer Name"
                onChange={(event) => handleChangeSearch(event)}
                // onKeyDown={(event) => handleSearchEnter(event)}
                // onKeyDown={(event) => handleChangeSearch(event)}
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
            <Col md={4}>
              <TextField
                fullWidth
                type="search"
                variant="outlined"
                margin="normal"
                size="small"
                label="search by Branch Name"
                onChange={(event) => handleChangeSearch(event)}
                // onKeyDown={(event) => handleSearchEnter(event)}
                // onKeyDown={(event) => handleChangeSearch(event)}
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
        <CardBody>
          <div>
            <WIPTable searchTerm={filter} />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getPropertiesPage: (data) => dispatch(getPropertiesPage(data)),
    getUsersList: (data) => dispatch(getUsersList(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkInProgressCases);
