import React, { useState, useEffect } from "react";
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
import Switch from "@mui/material/Switch";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import IconButton from "@mui/material/IconButton";

//*Actions
import { getDropdowns } from "../../../Redux/Creators/DropdownCreators";
import { searchDropdownDetailsData } from "../../../Redux/Creators/DropdownDetailsCreators";
//*Actions for bankverticals
import { getBanksList } from "../../../Redux/Creators/BanksCreators";
import { getBranchesList } from "../../../Redux/Creators/BranchesCreators";
import { getBankVerticalsList } from "../../../Redux/Creators/BankVerticalsCreators";

//*
import MasterDocumentsTable from "./MasterDocumentsTable";
import MasterDocumentGrid from "./MasterDocumentGrid";
import PreLoader from "components/Loaders/PreLoader";
import AddDropdown from "./AddDropdown";
//*
import BanksProductsTable from "./BankVerticals/BankProductsTable";
import AddBankVerticals from "./BankVerticals/AddBankVerticals";
import AddBankProducts from "./BankVerticals/AddBankProducts";

function MasterDocuments(props) {
  //*
  const document_master = props?.login?.login?.user?.rights.find(
    (o) => o.page.name === "document_master"
  );
  //*
  const token = props.login?.login?.token;
  const data = {
    token: token,
  };
  React.useEffect(() => {
    props.getDropdowns(data);
    props.getBanksList(data);
    props.getBankVerticalsList(data);
    props.getBranchesList(data);
  }, []);

  const [searchTerm, setSearchTerm] = React.useState("");
  const [filter, setFilter] = React.useState("");
  const [searchTerm2, setSearchTerm2] = React.useState("");
  const [filter2, setFilter2] = React.useState("");

  const handleChangeSearch = (event) => {
    // console.log("sss:", event.target, event.target.value);
    setSearchTerm(event.target.value);
    setSearchTerm2(event.target.value);
    // console.log("search:", searchTerm);
  };
  const handleSearch = () => {
    const data = {
      token: token,
      search: searchTerm,
    };
    // props.searchDropdownDetailsData(data);
  };
  const handleSearchEnter = (event) => {
    const data = {
      token: token,
      search: searchTerm,
    };
    if (event.key == "Enter") {
      // props.searchDropdownDetailsData(data);
    }
    return;
  };

  return (
    <div className="container-fluid">
      <br />
      <Card className="p-1 px-2">
        <CardHeader className="shadow-sm border-dark p-0 pb-1 ">
          <Row style={{"align-items": "center"}}>
            <Col md={6}>
            {/* Master Documents/Remarks */}
              {document_master.create_status == "1" ? <AddDropdown /> : ""}
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
        {props.dropdowns.isLoading ? (
          <CardBody className="p-0">
            <PreLoader />
          </CardBody>
        ) : (
          <CardBody className="p-0">
            <MasterDocumentsTable searchTerm ={filter}  />
          </CardBody>
        )}
      </Card>

      <br />

      <Card className="p-1 px-2">
        <CardHeader className="shadow-sm border-dark p-0 pb-1">
          <Row style={{"alignItems":"center"}}>
            <Col md={3}>
            <div className="d-flex">
              {document_master.create_status == "1" ? <AddBankVerticals /> : ""}
        </div>
            </Col>
            <Col md={3}>
            <div className="d-flex">
              {document_master.create_status == "1" ? <AddBankProducts /> : ""}
        </div>
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
                        onClick={() => setFilter2(searchTerm2)}
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
        {props.banks.isLoading &&
        props.branches.isLoading &&
        props.bankVerticals.isLoading ? (
          <CardBody className="p-0">
            <PreLoader />
          </CardBody>
        ) : (
          <CardBody className="p-0">
            <BanksProductsTable searchTerm2={filter2}  />
          </CardBody>
        )}
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    dropdowns: state.dropdowns,
    banks: state.banks,
    branches: state.branches,
    bankVerticals: state.bankVerticals,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDropdowns: (data) => dispatch(getDropdowns(data)),
    searchDropdownDetailsData: (data) =>
      dispatch(searchDropdownDetailsData(data)),

    //*
    getBanksList: (data) => dispatch(getBanksList(data)),
    getBranchesList: (data) => dispatch(getBranchesList(data)),
    getBankVerticalsList: (data) => dispatch(getBankVerticalsList(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MasterDocuments);
