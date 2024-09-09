import React, { useState, useEffect } from "react";
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

//*
import UsersTableNext from "./UsersTableNext";

//*Actions
import { searchUsersData } from "../../../Redux/Creators/UsersCreators";
import { getPincodesPage } from "Redux/Creators/PincodeCreators";

function UserCreation(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filter, setFilter] = React.useState("");

  useEffect(() => {
    props.getPincodesPage({
      pageno: 1,
      pageSize: 100000,
      token: token,
    });
  }, []);

  const toggle = () => {
    setModal(!modal);
  };
  const handleChangeSearch = (event) => {
    // console.log("sss:", event.target, event.target.value);
    setSearchTerm(event.target.value);
    // console.log("search:", searchTerm);
  };
  const handleSearch = () => {
    const data = {
      token: token,
      search: searchTerm,
    };
    props.searchUsersData(data);
  };

  const handleSearchEnter = (event) => {
    const data = {
      token: token,
      search: searchTerm,
    };
    if (event.key == "Enter") {
      props.searchUsersData(data);
    }
    return;
  };
  return (
    <div className="container-fluid">
      <br />
      <Card className="p-1 px-2">
        <CardHeader className="shadow-sm border-dark p-0 pb-1 bg-gradient-yellow">
          <Row>
            <Col md={6}>
            <strong className="d-flex flex-column justify-content-center text-center align-items-center h-100">User Creation</strong>

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
        <CardBody className="p-0">
          <div>
            <UsersTableNext searchTerm={filter} />
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
    getPincodesPage: (data) => dispatch(getPincodesPage(data)),
    searchUsersData: (data) => dispatch(searchUsersData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCreation);
