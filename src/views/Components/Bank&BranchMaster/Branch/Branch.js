import React, { useState } from "react";
import { connect } from "react-redux";
import { Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import IconButton from "@mui/material/IconButton";

//*Actions

import { getBanksList } from "../../../../Redux/Creators/BanksCreators";
import { searchBranchesData } from "../../../../Redux/Creators/BranchesCreators";

//*component
import BranchTable from "./BranchTable";
import BranchTable2 from "./BranchTable2";
import AddBranch from "./AddBranch";
import Button from "@mui/material/Button";
import BranchTable3 from "./BranchTable3";
import BranchesBulkUpload from "./BranchesBulkUpload";
import { getDropdownsList } from "../../../../Redux/Creators/DropdownCreators";


function Branch(props) {
  const token = props.login?.login?.token;
  const [modal, setModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = React.useState("");

  const toggle = () => {
    setModal(!modal);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    let data = {
      pageno: 1,
      pageSize: 10000,
      token: token,
    };
    props.getBanksList(data);
    props.getDropdownsList(data);
  };

  const handleChangeSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearch = () => {
    const data = {
      token: token,
      search: searchTerm,
    };
    props.searchBranchesData(data);
  };

  const handleSearchEnter = (event) => {
    const data = {
      token: token,
      search: searchTerm,
    };
    if (event.key == "Enter") {
      props.searchBranchesData(data);
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
            <strong className="d-flex flex-column justify-content-center text-center align-items-center h-100">Branch</strong>
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
        <CardBody className="p-0">
          <div className="d-flex justify-content-end p-2 mt-2">
            <AddBranch
              data={{ pageno: props.pageno, pageSize: props.pageSize }}
            />
            <BranchesBulkUpload/>
          </div>

          {/* <BranchTable2 approved /> */}
          <BranchTable approved searchTerm={filter}/>
          <Card>
            <CardHeader>
              <strong>Pending Approval</strong>
            </CardHeader>
            <CardBody>
              {/* <BranchTable2 /> */}
              <BranchTable searchTerm={filter}/>
            </CardBody>
          </Card>
        </CardBody>
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    banks: state.banks,
    dropdowns: state.dropdowns,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBanksList: (data) => dispatch(getBanksList(data)),
    searchBranchesData: (data) => dispatch(searchBranchesData(data)),
    getDropdownsList: (data) => dispatch(getDropdownsList(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Branch);
