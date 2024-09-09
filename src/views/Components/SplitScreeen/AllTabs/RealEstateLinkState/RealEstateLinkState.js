import React, { useState } from "react";
import { connect } from "react-redux";
import { Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import IconButton from "@mui/material/IconButton";

//*Actions
import { getStatesData } from "../../../../../Redux/Creators/StateCreators";
import { searchRealEstate } from "../../../../../Redux/Creators/RealEstateStateCreators";

//*component
import TableRealEstate from "./TableRealEstate";

function RealEstateLinkState(props) {
  const token = props.login?.login?.token;
  const [modal, setModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggle = () => {
    setModal(!modal);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    let data = {
      pageno: 1,
      pageSize: 100,
      token: token,
    };
    props.getStatesData(data);
  };

  const handleChangeSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearch = () => {
    const data = {
      token: token,
      search: searchTerm,
    };
    props.searchRealEstate(data);
  };

  const handleSearchEnter = (event) => {
    const data = {
      token: token,
      search: searchTerm,
    };
    if (event.key == "Enter") {
      props.searchRealEstate(data);
    }
    return;
  };
  return (
    <div className="container-fluid">
      <br />
      <Card className="p-1 px-2">
        <CardHeader className="shadow-sm border-dark p-0 pb-1">
          <Row>
            <Col md={6}></Col>
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
        <CardBody className="p-0">
          <TableRealEstate />
        </CardBody>
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    states: state.states,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStatesData: (data) => dispatch(getStatesData(data)),
    searchRealEstate: (data) => dispatch(searchRealEstate(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RealEstateLinkState);
