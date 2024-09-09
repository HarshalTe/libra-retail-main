import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@material-ui/core/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Divider, Typography } from "@material-ui/core";

//*
import { dropdownPostData } from "../../../Redux/Creators/DropdownCreators";

function AddDropdown(props) {
  console.log("addmasterdocs", props);
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("handleSubmit");
    let data = {
      token: token,
      pageno: 1,
      pageSize: 10000,
      user_id: props?.login?.login?.user?.id,
      name: values.name,
    };

    console.log("Data in Master Document", data);

    props.dropdownPostData(data);
    setSubmitting(true);
    setModal(false);
    // return;
  };

  return (
    <div>
      <Button
      style={{"width": "max-content"}}
        variant="contained"
        color="success"
        size="small"
        className="ml-3"
        onClick={() => toggle()}
        startIcon={<AddIcon fontSize="inherit" />}
      >
        1. Create System Dropdown Header
      </Button>

      <Modal className="modal-lg" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <Typography>
            <strong>Add System Dropdown Header</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              name: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Value is required"),
            })}
          >
            {(formProps) => (
              <Form>
                <Row>
                  <Col md={12} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Name"
                      id="name"
                      name="name"
                      value={formProps.values.name}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.name && Boolean(formProps.errors.name)
                      }
                      helperText={
                        formProps.touched.name && formProps.errors.name
                      }
                    />
                  </Col>
                </Row>

                <Divider />

                <Row style={{ justifyContent: "center" }} className="pt-4">
                  <Col>
                    <Button
                      color="success"
                      variant="contained"
                      disabled={formProps.isSubmitting}
                      fullWidth
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Col>

                  <Col>
                    <Button
                      color="error"
                      variant="contained"
                      fullWidth
                      onClick={() => toggle()}
                    >
                      Cancel
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    dropdowns: state.dropdowns,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dropdownPostData: (data) => dispatch(dropdownPostData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddDropdown);
