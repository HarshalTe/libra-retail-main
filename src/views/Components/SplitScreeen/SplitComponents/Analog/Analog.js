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

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// import { Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import IconButton from "@mui/material/IconButton";
import AnalogTable from "./AnalogTable";

function Analog() {
  const [modal, setModal] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filter, setFilter] = React.useState("");
  const handleChangeSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggle2 = () => setTooltipOpen(!tooltipOpen);

  const toggle = () => {
    setModal(!modal);
  };
  return (
    <div className="container-fluid">
      <br />
      <Card>
        <CardHeader className="bg-info text-white">
          <Row>
            <Col></Col>
            <Col md={4}></Col>

            <Col md={6}>
              <TextField
                fullWidth
                type="search"
                variant="outlined"
                margin="normal"
                size="small"
                label="search"
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
          <AnalogTable searchTerm={filter}/>
        </CardBody>
      </Card>
    </div>
  );
}

export default Analog;
