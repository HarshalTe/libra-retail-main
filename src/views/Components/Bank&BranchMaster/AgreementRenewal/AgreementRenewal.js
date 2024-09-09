import React, { useState } from "react";
import { connect } from "react-redux";
import Header from "../../../../components/Headers/Header";
import TextField from "@mui/material/TextField";
import { Row, Col, Card, CardBody, CardHeader } from "reactstrap";

//*Componet
import AgreementTable from "./AgreementTable";

//*Actions
import { getBanksList } from "../../../../Redux/Creators/BanksCreators";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import IconButton from "@mui/material/IconButton";
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function AgreementRenewal(props) {

  const [searchTerm, setSearchTerm] = React.useState("");
  const [filter, setFilter] = React.useState("");

  const handleChangeSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearchEnter = (event) => {
    const data = {
      search: searchTerm,
    };
    if (event.key == "Enter") {
      setFilter(searchTerm)
    }
    return;
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const token = props.login?.login?.token;

    let data = {
      token: token,
    };
    props.getBanksList(data);
  };
  return (
    <div className="container-fluid">
      <br />
      <Card>
        {/* <CardHeader className="bg-info text-white"></CardHeader> */}
        <CardHeader className="shadow-sm border-dark p-0 pb-1 bg-gradient-yellow">
              <Row>
                <Col md={6}>
                  <strong className="d-flex flex-column justify-content-center text-center align-items-center h-100">Agreement Renewal</strong>
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
          <AgreementTable searchTerm={filter}  />
        </CardBody>
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    banks: state.banks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBanksList: (data) => dispatch(getBanksList(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AgreementRenewal);
