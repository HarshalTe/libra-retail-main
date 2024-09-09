import React, { useState } from "react";
import { connect } from "react-redux";

import TextField from "@mui/material/TextField";
import { Row, Col, Card, CardBody, CardHeader } from "reactstrap";

import CustomeInput from "views/Views/CustomeInput";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DatePicker,
} from "@material-ui/pickers";

import MomentUtils from "@date-io/moment";
import moment from "moment";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import DateFnsUtils from "@date-io/date-fns";

//*
import BillTableAll from "./BillTableAll";
import OnHoldBillsTable from "./OnHoldBillsTable";
import UnbilledTable from "./UnbilledTable";
import CreateBillInitiation from "./CreateBillInitiation";

import InputAdornment from "@material-ui/core/InputAdornment";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import IconButton from "@mui/material/IconButton";

//*Actions
import { getPaymentMasterList } from "../../../../Redux/Creators/PaymentMasterCreators";

//*Components

import PreLoader from "components/Loaders/PreLoader";

function BillInitiation(props) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const token = props.login?.login?.token;
  React.useEffect(() => {
    let data = {
      token: token,
    };
    props.getPaymentMasterList(data);
  }, []);
  const handleSearchEnter = (event) => {
    const data = {
      search: searchTerm,
    };
    if (event.key == "Enter") {
      props.searchPincodes(data, token);
    }
    return;
  };
  const handleSearch = () => {
    const data = {
      search: searchTerm,
    };
    props.searchPincodes(data, token);
  };
  const handleChangeSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <>
      {props?.paymentMaster?.isLoading ? (
        <div>
          <PreLoader />
        </div>
      ) : (
        <div className="container-fluid">
          <br />
          <Card>
            <CardHeader className="shadow-sm border-dark p-2 pb-4">
              <Row>
                <Col md={9}>
                  <Typography variant="h6">Bill Generate</Typography>
                </Col>

                <Col>
                  <Button
                    className="ml-8"
                    color="primary"
                    variant="contained"
                    size="small"
                  >
                    GST Website Link
                  </Button>
                </Col>
              </Row>
              
            </CardHeader>
            <CardBody>
              <div className="pt-2">
                {/* <CreateBillInitiation  /> */}
                <BillTableAll />
              </div>
            </CardBody>
          </Card>

          <br />

          <Card>
            <CardHeader className="shadow-sm border-dark p-2 pb-4">
              <Row>
                <Col md={10}>
                  <Typography variant="h6">Bills on hold</Typography>
                </Col>

                <Col>
                  <div className="d-flex">
                  <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className="download-table-sm-button btn-success"
                  table="table-OnHoldBillsTable"
                  filename="members"
                  sheet="tablecsv"
                  buttonText="Download"
                >
                    <Button
                      className="ml-3"
                      color="primary"
                      variant="contained"
                      size="small"
                    >
                      Download Excel
                    </Button>
                    </ReactHTMLTableToExcel>
                  </div>
                </Col>
              </Row>
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
            <CardBody>
              <div>
                <OnHoldBillsTable />
              </div>
            </CardBody>
          </Card>

          <br />

          <Card>
            <CardHeader className="shadow-sm border-dark p-2 pb-4">
              <Row>
                <Col md={10}>
                  <Typography variant="h6">Un-Billed</Typography>
                </Col>

                <Col>
                  <div className="d-flex">
                  <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className="download-table-sm-button btn-success"
                  table="table-UnbilledTable"
                  filename="members"
                  sheet="tablecsv"
                  buttonText="Download"
                >
                    <Button
                      className="ml-3"
                      color="primary"
                      variant="contained"
                      size="small"
                    >
                      Download Excel
                    </Button>
                    </ReactHTMLTableToExcel>
                  </div>
                </Col>
              </Row>
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
            <CardBody>
              <div>
                <UnbilledTable />
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    paymentMaster: state.paymentMaster,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPaymentMasterList: (data) => dispatch(getPaymentMasterList(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BillInitiation);
