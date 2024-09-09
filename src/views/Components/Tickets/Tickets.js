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
import { searchTicketsData } from "../../../Redux/Creators/TicketsCreators";

//*Components
import PreLoader from "components/Loaders/PreLoader";
import TicketsTable from "./TicketsTable";

function Tickets(props) {
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
    props.searchTicketsData(data);
  };

  const handleSearchEnter = (event) => {
    const data = {
      token: token,
      search: searchTerm,
    };
    if (event.key == "Enter") {
      props.searchTicketsData(data);
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
            <strong className="d-flex flex-column justify-content-center text-center align-items-center h-100">Tickets</strong>

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
            <TicketsTable />
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPropertiesList: (data) => dispatch(getPropertiesList(data)),
    getBanksList: (data) => dispatch(getBanksList(data)),
    getBranchesList: (data) => dispatch(getBranchesList(data)),
    searchTicketsData: (data) => dispatch(searchTicketsData(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Tickets);
