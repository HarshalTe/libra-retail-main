import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import IconButton from "@mui/material/IconButton";

//*Components
import TechPolicyCreate from "./TechPolicyCreate";
import TechPolicyTable from "./TechPolicyTable";

//*Actions
import { getBranchesPage } from "../../../Redux/Creators/BranchesCreators";
import { searchTechnicalPolicy } from "../../../Redux/Creators/TechnicalPolicyBank";
import { getTechTypes } from "../../../Redux/Creators/TechTypes";

function TechnicalPolicyBank(props) {
  const token = props.login?.login?.token;
  const [employee, setEmployee] = useState("");
  const [modal, setModal] = useState(false);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    let data = {
      pageno: 1,
      pageSize: 100,
      token: token,
    };
    props.getBranchesPage(data);
    props.getTechTypes(data);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = React.useState("");
  const handleChangeSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearch = () => {
    const data = {
      token: token,
      search: searchTerm,
    };
    props.searchTechnicalPolicy(data);
  };

  const handleSearchEnter = (event) => {
    const data = {
      token: token,
      search: searchTerm,
    };
    if (event.key == "Enter") {
      props.searchTechnicalPolicy(data);
    }
    return;
  };

  const toggle = () => {
    setModal(!modal);
  };
  return (
    <div className="container-fluid">
      <br />
      {props.branches.isLoading == true ? (
        <Card className="p-1 px-2">Loading..</Card>
      ) : (
        <Card className="p-1 px-2">
          <CardHeader className="shadow-sm border-dark p-0 pb-1 bg-gradient-yellow">
            <Row>
              <Col md={6}>
              <strong className="d-flex flex-column justify-content-center text-center align-items-center h-100">Technical Policy (Bank)</strong>

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
            <TechPolicyTable searchTerm={filter}/>
          </CardBody>
        </Card>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    branches: state.branches,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBranchesPage: (data) => dispatch(getBranchesPage(data)),
    getTechTypes: (data) => dispatch(getTechTypes(data)),
    searchTechnicalPolicy: (data) => dispatch(searchTechnicalPolicy(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TechnicalPolicyBank);
