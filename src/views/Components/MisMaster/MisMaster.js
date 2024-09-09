import React, { useState } from "react";
import { connect } from "react-redux";

import TextField from "@mui/material/TextField";
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
  Form,
} from "reactstrap";

import CustomeInput from "views/Views/CustomeInput";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import IconButton from "@mui/material/IconButton";

//*Compoenets
import MisTable from "./MisTable";
import MisTable2 from "./MisTable2";
import MisOfflineTable from "./MisOfflineTable";
import ExcelExport from "./ExcelExport";

//*Actions
import { searchOfflineProperties } from "../../../Redux/Creators/OffilePropertiesCreators";

function MisMaster(props) {
  const token = props.login?.login?.token;
  const [modal, setModal] = useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filter, setFilter] = React.useState("");
  const handleChangeSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const handleSearch = () => {
    const data = {
      search: searchTerm,
    };
    props.searchOfflineProperties(data, token);
  };

  const handleSearchEnter = (event) => {
    const data = {
      search: searchTerm,
    };
    if (event.key == "Enter") {
      setFilter(searchTerm)
      // props.searchCompaniesData(data, token);
    }
    return;
  };
  const toggle = () => {
    setModal(!modal);
  };
  return (
    <div className="container-fluid">
      <br />
      <Card>
        <CardHeader className="bg-info text-white">
          <Row>
            <Col md={12}>
              <strong>MIS Master</strong>
            </Col>
            {/* <Col md={3}>
              <ExcelExport/>
            </Col> */}
          </Row>
        </CardHeader>

        <CardBody>
          <MisTable2 />
        </CardBody>
      </Card>

      <br />
      <Card>
        <CardHeader className="shadow-sm border-dark p-0 pb-1">
          <Row>
            <Col md={6}>
            <strong className="d-flex flex-column justify-content-center text-center align-items-center h-100">Offline Properties</strong>
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
          <MisOfflineTable searchTerm={filter}/>
        </CardBody>
      </Card>
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
    searchOfflineProperties: (data, token) =>
      dispatch(searchOfflineProperties(data, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MisMaster);
