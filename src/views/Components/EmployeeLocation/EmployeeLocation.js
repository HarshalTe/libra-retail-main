import React, { useState } from "react";
import { connect } from "react-redux";
import Header from "../../../components/Headers/Header";

import { Card, CardBody, CardHeader, Row, Col } from "reactstrap";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@material-ui/core/TextField";

//*actions
import { getEmployeeLocation } from "../../../Redux/Creators/EmployeeLocationCreators";
import { getUsersList } from "../../../Redux/Creators/UsersCreators";

//*compo
import ViewMap from "./ViewMap";
import UserLocationForm from "./UserLoacationForm";
import LinerLoader from "components/Loaders/LinerLoader";

function EmployeeLocation(props) {
  const token = props.login?.login?.token;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10000);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const token = props.login?.login?.token;
    // setPage(page + 1);
    console.log("page", page);
    let pageno = page + 1;
    console.log("pageno", pageno);
    let data = {
      pageno: pageno,
      pageSize: rowsPerPage,
      token: token,
    };
    props.getUsersList(data);
  };
  const [currentUserID, setCurrentUserID] = React.useState(null);

  const userProps = {
    options: props?.users?.isLoading
      ? []
      : props?.users?.users?.data?.map((user) => user),
  };

  const searchUser = (event, ID) => {
    // setCurrentUserID(ID);

    let data = {
      token: token,
      user_id: ID !== undefined || ID !== null ? ID : null,
    };

    if (ID) {
      callAPI(data);
    } else {
      return;
    }
  };

  const callAPI = (data) => {
    console.log("data", data);

    props.getEmployeeLocation(data);
  };

  console.log("current", currentUserID);

  return (
    <div>
      <div className="container" style={{ paddingTop: "15px" }}>
        <Card>
          <CardHeader className="bg-warning text-white mb-10"></CardHeader>

          <CardBody>
            <div>
              <Row>
                <Col md={12}>
                  <Autocomplete
                    id="contact-autocomplete"
                    options={userProps.options}
                    getOptionLabel={(user) => user?.name}
                    onChange={(e, value) => {
                      searchUser(e, value?.id);
                      setCurrentUserID(value?.name);
                    }}
                    clearOnBlur={() => setCurrentUserID(null)}
                    // onOpen={formProps.handleBlur}
                    includeInputInList
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        label="User"
                        name="user"
                        variant="outlined"
                      />
                    )}
                  />
                </Col>
              </Row>

              <br />

              {props.employeeLocation.isLoading ? (
                <Row>
                  <LinerLoader />
                </Row>
              ) : (
                <Row>
                  <Col
                    // md={currentUserID != "" ? 4 : 0}
                    md={4}
                    hidden={currentUserID != null ? false : true}
                  >
                    <UserLocationForm />
                  </Col>

                  <br />
                  <Col md={currentUserID != null ? 8 : 12}>
                    <ViewMap />
                  </Col>
                </Row>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    users: state.users,
    employeeLocation: state.employeeLocation,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getEmployeeLocation: (data) => dispatch(getEmployeeLocation(data)),
    getUsersList: (data) => dispatch(getUsersList(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeLocation);
