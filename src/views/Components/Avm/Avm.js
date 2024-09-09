import React, { useState } from "react";

import {
  Row,
  Col,
  Card,
  Tooltip,
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
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import IconButton from "@mui/material/IconButton";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import heatmap from "../../../assets/head.png";

//*
import AvmTable from "./AvmTable";

function Avm(props) {
  const token = props.login?.login?.token;
  const [modal, setModal] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle2 = () => setTooltipOpen(!tooltipOpen);

  const toggle = () => {
    setModal(!modal);
  };

  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchTermProp, setSearchTermProp] = React.useState("");
  const handleChangeSearch = (event) => {
    setSearchTerm(event.target.value);
    setSearchTermProp(searchTerm)
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
  console.log("hhhhhhsss",searchTerm,searchTermProp)

  return (
    <div className="container-fluid">
      <br />
      <Card>
        <CardHeader className="shadow-sm border-dark p-0 pb-1 bg-gradient-yellow">
          <Row>
            <Col md={6}>
            <strong className="d-flex flex-column justify-content-center text-center align-items-center h-100">AVM</strong>

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
                        onClick={() => handleSearch()}
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
          <AvmTable data={searchTerm} />
        </CardBody>
      </Card>

      <br />

      {/* <Card>
        <CardHeader className="bg-info text-white">
          <Row>
            <Col>
              <strong>HeatMap</strong>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <br />
          <div>
            <img src={heatmap} width="100%" height="450px" />
          </div>
        </CardBody>
      </Card> */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getPropertiesPage: (data) => dispatch(getPropertiesPage(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Avm);
