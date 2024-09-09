/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { connect } from "react-redux";

import { Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import IconButton from "@mui/material/IconButton";
import BankTable2 from "./BankTable2";
//*Actions
import { searchBanksData } from "../../../../Redux/Creators/BanksCreators";

//*Components
import BanksTable from "./BanksTable";
import ServerPaginationGrid from "./BankTable3";
import CursorPaginationGrid from "./BankTable3";
import AddBank from "./AddBank";
import Button from "@mui/material/Button";
import BankBulkUpload from "./BankBulkUpload";


function Bank(props) {
  const token = props.login?.login?.token;
  const [modal, setModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = React.useState("");
  const toggle = () => {
    setModal(!modal);
  };

  const handleChangeSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearch = () => {
    const data = {
      token: token,
      search: searchTerm,
    };
    props.searchBanksData(data);
  };

  const handleSearchEnter = (event) => {
    const data = {
      token: token,
      search: searchTerm,
    };
    if (event.key == "Enter") {
      props.searchBanksData(data);
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
            <strong className="d-flex flex-column justify-content-center text-center align-items-center h-100">Bank</strong>

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
        <CardBody className="p-0" style={{ width: "100%" }}>
          <div className="d-flex justify-content-end p-2 mt-2">
            <AddBank
              data={{ pageno: props.pageno, pageSize: props.pageSize }}
            />
            <BankBulkUpload/>
          </div>
          <Card>
            <CardHeader>
              <strong>Approved Banks</strong>
            </CardHeader>
            <CardBody>
          <BankTable2 approved searchTerm={filter} />
              {/* <BankTable2 /> */}
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <strong>Pending Approval</strong>
            </CardHeader>
            <CardBody>
              <BankTable2 searchTerm={filter}/>
            </CardBody>
          </Card>
          {/* <ServerPaginationGrid /> */}
          {/* <CursorPaginationGrid /> */}
          {/* <BanksTable addbutton /> */}
          {/* <BanksTable noadd={true} /> */}
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
    searchBanksData: (data) => dispatch(searchBanksData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bank);
