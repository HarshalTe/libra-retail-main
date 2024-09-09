import React from "react";
import { connect } from "react-redux";

import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import IconButton from "@mui/material/IconButton";

//*Compoenets
import TableUnderConstructProjects from "./TableUnderConstructProjects";

//*Actions
import { searchUnderConstructProjects } from "../../../Redux/Creators/UnderConstructionProjectsCreators";

function UnderConstructionProjects(props) {
  const token = props.login?.login?.token;
  const [searchTerm, setSearchTerm] = React.useState("");
  const handleChangeSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearch = () => {
    const data = {
      token: token,
      search: searchTerm,
    };
    props.searchUnderConstructProjects(data);
  };

  const handleSearchEnter = (event) => {
    const data = {
      token: token,
      search: searchTerm,
    };
    if (event.key == "Enter") {
      props.searchUnderConstructProjects(data);
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
            <strong className="d-flex flex-column justify-content-center text-center align-items-center h-100">Under Construction Projects</strong>

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

          <Modal
            className="modal-info modal-lg"
            // isOpen={modal}
            // toggle={toggle}
          >
            <ModalHeader>Add New User</ModalHeader>
            <ModalBody>
              <h1>ADD NEW USER</h1>
            </ModalBody>
          </Modal>
        </CardHeader>
        <CardBody>
          <div>
            <TableUnderConstructProjects />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchUnderConstructProjects: (data) =>
      dispatch(searchUnderConstructProjects(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnderConstructionProjects);
