import React, { useState } from "react";
import { connect } from "react-redux";

import {
  Row,
  Col,
  Card,
  Button,
  CardBody,
  CardHeader,
  InputGroup,
  Input,
} from "reactstrap";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import IconButton from "@mui/material/IconButton";

//*Actions
import { getPropertiesList } from "../../../Redux/Creators/PropertiesCreators";
import { getBanksList } from "../../../Redux/Creators/BanksCreators";
import { getBranchesList } from "../../../Redux/Creators/BranchesCreators";
import { searchQueriesData } from "../../../Redux/Creators/QueriesCreators";

//*Components
import PreLoader from "components/Loaders/PreLoader";
import QueriesTable from "./QueriesTable";

function Queries(props) {
  const token = props.login?.login?.token;

  React.useEffect(() => {
    let data = {
      token: token,
    };

    props.getPropertiesList(data);
    props.getBanksList(data);
    props.getBranchesList(data);
  }, []);

  const [searchTerm, setSearchTerm] = React.useState("");
  const handleChangeSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearch = () => {
    const data = {
      token: token,
      search: searchTerm,
    };
    props.searchQueriesData(data);
  };

  const handleSearchEnter = (event) => {
    const data = {
      token: token,
      search: searchTerm,
    };
    if (event.key == "Enter") {
      props.searchQueriesData(data);
    }
    return;
  };
  let queries = props.queries?.data?.isLoading
  ? []
  : props.queries?.queries?.data
  console.log(queries,
    "Filtered tasks:",
    queries?.filter((row) => row.active_status === 1)
  );
  return (
    <div className="container-fluid">
       <div className="pt-4 px-3">
          <Row className="pt-1 pb-1">
            <Col md={4}>
              <Card className="pt-2 pb-2">
                <CardHeader className="bg-info text-white">
                  <strong>Pending task</strong>
                </CardHeader>
                <CardBody>
                  <strong>
                    {queries?.filter((row) => row.active_status === 0).length}
                  </strong>
                </CardBody>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="pt-2 pb-2">
                <CardHeader className="bg-info text-white">
                  <strong>Completed task</strong>
                </CardHeader>
                <CardBody>
                  <strong>
                  {queries?.filter((row) => row.active_status === 1).length}
                  </strong>
                </CardBody>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="pt-2 pb-2">
                <CardHeader className="bg-info text-white">
                  <strong>Total task </strong>
                </CardHeader>
                <CardBody>
                  <strong>
                    {props.queries.queries.data?.length}
                  </strong>
                </CardBody>
              </Card>
            </Col>
           
           
          </Row>
         
        </div>
      <br />
      <Card className="p-1 px-2">
        <CardHeader className="shadow-sm border-dark p-0 pb-1 bg-gradient-yellow">
          <Row>
            <Col md={6}>
            <strong className="d-flex flex-column justify-content-center text-center align-items-center h-100">Queries</strong>

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
        {props.banks.isLoading &&
        props.branches.isLoading &&
        props.properties.isLoading ? (
          <CardBody>
            <PreLoader />
          </CardBody>
        ) : (
          <CardBody>
            <QueriesTable />
          </CardBody>
        )}
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    banks: state.banks,
    branches: state.branches,
    properties: state.properties,
    queries: state.queries,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPropertiesList: (data) => dispatch(getPropertiesList(data)),
    getBanksList: (data) => dispatch(getBanksList(data)),
    getBranchesList: (data) => dispatch(getBranchesList(data)),
    searchQueriesData: (data) => dispatch(searchQueriesData(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Queries);
