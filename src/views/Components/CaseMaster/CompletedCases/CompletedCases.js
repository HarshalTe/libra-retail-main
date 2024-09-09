import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  Table,
  Label,
  Button,
  CardBody,
  FormGroup,
  CardHeader,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Modal,
  Input,
  ModalHeader,
  ModalBody,
  Container,
  PaginationLink,
  Pagination,
  PaginationItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import IconButton from "@mui/material/IconButton";

import CompletedCasesTable from "./CompletedCasesTable";

//*Actions
import { getUsersList } from "../../../../Redux/Creators/UsersCreators";

function CommpletedCases(props) {
  const token = props.login?.login?.token;

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
    props.getUsersList(data);
  };
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filter, setFilter] = React.useState("");
  const handleChangeSearch = (event) => {
    // setSearchTerm(event.target.value);
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
  return (
    <div className="container-fluid">
      <br />
      <Card className="p-1 px-2">
        <CardHeader className="shadow-sm border-dark p-0 pb-1">
          <Row>
            {/* <Col md={6}></Col> */}

            <Col md={6}>
              <TextField
                fullWidth
                type="search"
                variant="outlined"
                margin="normal"
                size="small"
                label="search"
                // onChange={(event) => handleChangeSearch(event)}
                // onKeyDown={(event) => handleSearchEnter(event)}
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
          <CompletedCasesTable searchTerm={filter} />
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
    getUsersList: (data) => dispatch(getUsersList(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommpletedCases);
