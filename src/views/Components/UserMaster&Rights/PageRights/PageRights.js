import React, { useState } from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";

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
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { getUsersPage } from "../../../../Redux/Creators/UsersCreators";

//*Components

import PageRightsTable from "./PageRightsTable";
import EditFullPageRights from "./EditFullPageRights";

function PageRights(props) {
  const [currentUser, setCurrentUser] = React.useState("");
  const flatProps = {
    options: props?.users?.isLoading
      ? []
      : props?.users?.users?.data?.map((user) => user?.name),
  };
  console.log("objectflatProps",flatProps)
  const fetchData = (page) => {
    const token = props.login?.login?.token;
    // setPage(page + 1);
    console.log("page", page);
    let pageno = page + 1;
    console.log("pageno", pageno);
    let data = {
      pageno: 1,
      pageSize: 1000,
      token: token,
    };
    props.getUsersPage(data);
  };

  return (
    <div className="container-fluid">
      <br />
      <Card>
        <CardHeader className="bg-info text-white">
          <Row>
            <Col>
              <strong>Page Rights</strong>
            </Col>
            <Col md={4}></Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md={10}>
          <Autocomplete
            hidden={flatProps.options == [] ? true : false}
            sx={{ flex: "1 1 100%" }}
            {...flatProps}
            id="name"
            name="name"
            inputValue={currentUser}
            onInputChange={(e, value) => {
              console.log("value", value);
              setCurrentUser(value);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Select User" variant="outlined" />
            )}
          />
            </Col>
            <Col md={2}>
          <EditFullPageRights
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          />
            </Col>
          </Row>
          <PageRightsTable
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />

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
    getUsersPage: (data) => dispatch(getUsersPage(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageRights);
