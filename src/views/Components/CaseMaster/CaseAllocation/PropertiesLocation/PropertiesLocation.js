import React, { useState } from "react";
import { connect } from "react-redux";
import Header from "../../../../../components/Headers/Header";

import { Card, CardBody, CardHeader, Row, Col } from "reactstrap";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@material-ui/core/TextField";

//*actions
import { getPropertiesLocation } from "../../../../../Redux/Creators/EmployeeLocationCreators";
import { getUsersList } from "../../../../../Redux/Creators/UsersCreators";

//*compo
import ViewMap from "./ViewMap";
import UserLocationForm from "./UserLoacationForm";
import LinerLoader from "components/Loaders/LinerLoader";

function EmployeeLocation(props) {
  const token = props.login?.login?.token;
  const [data, setData] = useState([]);

  const handleData = (childData) => {
    setData(childData);
  }


  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const token = props.login?.login?.token;

    let data = {
      token: token,
    };
    // props.getUsersList(data);
    props.getPropertiesLocation(data);
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

    props.getPropertiesLocation(data);
  };

  console.log("current", currentUserID,data);

  return (
    <div>
      <div className="container" style={{ paddingTop: "15px" }}>
        <Card>
          <CardHeader className="bg-warning text-white mb-10"></CardHeader>

          <CardBody>
            <div>
              {/* <Row>
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
              </Row> */}

              <br />

              {props.propertiesLocation.isLoading ? (
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
                    <UserLocationForm onData={handleData} />
                  </Col>

                  <br />
                  <Col md={currentUserID != null ? 8 : 12}>
                    <ViewMap empLive={data} />
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
    propertiesLocation: state.propertiesLocation,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPropertiesLocation: (data) => dispatch(getPropertiesLocation(data)),
    getUsersList: (data) => dispatch(getUsersList(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeLocation);
