import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Row,
  Col,
  Card,
  Table,
  Label,
  Button,
  CardBody,
  CardHeader,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import IconButton from "@mui/material/IconButton";

//*Compoenets
import CompanyMasterTable from "./CompanyMasterTable";
import PreLoader from "components/Loaders/PreLoader";

//*Actions
import { searchCompaniesData } from "../../../Redux/Creators/CompanyMasterCreators";
import { getCompaniesList } from "./../../../Redux/Creators/CompanyMasterCreators";
import { getDropdownsList } from "../../../Redux/Creators/DropdownCreators";



function CompanyMaster(props) {
  const token = props.login?.login?.token;
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filter, setFilter] = React.useState("");

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    console.log("dataaa");
    let data = {
      token: token,
    };
    props.getDropdownsList(data);
    props.getCompaniesList(data);
  };
  const handleChangeSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearch = () => {
    const data = {
      search: searchTerm,
    };
    props.searchCompaniesData(data, token);
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
  return (
    <div className="container-fluid">
      <br />
      <Card className="p-1 px-2">
        <CardHeader className="shadow-sm border-dark p-0 pb-1 bg-gradient-yellow">
          <Row>
            <Col md={6}>
            <strong className="d-flex flex-column justify-content-center text-center align-items-center h-100">Company Master</strong>

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
        {props?.companies?.isLoading ? (
          <CardBody>
            <PreLoader />
          </CardBody>
        ) : (
          <CardBody>
            <div>
              <CompanyMasterTable searchTerm={filter} />
            </div>
          </CardBody>
        )}
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    companies: state.companies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchCompaniesData: (data, token) =>
      dispatch(searchCompaniesData(data, token)),
    getCompaniesList: (data) => dispatch(getCompaniesList(data)),
    getDropdownsList: (data) => dispatch(getDropdownsList(data)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyMaster);
