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
import { dropdownDetailsPostData } from "../../../Redux/Creators/DropdownDetailsCreators";
import { Autocomplete } from "@mui/material";

function AddMasterDocuments(props) {
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
      pageno: props.data.pageno,
      pageSize: props.data.pageSize,
      user_id: props?.login?.login?.user?.id,
      dropdown_id: values.dropdown_id,
      name: values.name,
    };
    
    console.log("Data in Master Document", data);

    props.dropdownDetailsPostData(data);
    setSubmitting(true);
    setModal(false);
    // return;
  };
  console.log("objectprops?.dropdowns?.dropdowns?",props?.dropdowns?.dropdowns)

  return (
    <div>
      <Button
      style={{"width": "max-content"}}
        variant="contained"
        color="success"
        size="small"
        className=""
        onClick={() => toggle()}
        startIcon={<AddIcon fontSize="inherit" />}
      >
       2. Add Dropdown Options
      </Button>

      <Modal className="modal-lg" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <Typography>
            <strong>Add Dropdown Options</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              dropdown_id: "",
              name: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              dropdown_id: Yup.string().required("Description is required"),
              name: Yup.string().required("Value is required"),
            })}
          >
            {(formProps) => (
              <Form>
                <Row>
                  {/* <Col md={6} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      size="small"
                      select
                      variant="outlined"
                      id="dropdown_id"
                      name="dropdown_id"
                      label="Select Headers Dropdown *"
                      value={formProps.values.dropdown_id}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.dropdown_id &&
                        Boolean(formProps.errors.dropdown_id)
                      }
                      helperText={
                        formProps.touched.dropdown_id &&
                        formProps.errors.dropdown_id
                      }
                    >
                      <MenuItem value={""}>Select Description</MenuItem>

                      {props?.dropdowns?.dropdowns?.map((dropdown) => (
                        <MenuItem value={dropdown.id}>{dropdown.name}</MenuItem>
                      ))}
                    </TextField>
                  </Col> */}
                  <Col md={6} className="pb-4">
                      <>
                        <Autocomplete
                          id="contact-autocomplete"
                          options={props?.dropdowns?.dropdowns}
                          getOptionLabel={(dropdown) =>
                            // `${project?.project_name} ${project?.id}`
                            dropdown?.name
                          }
                          onChange={(e, value) =>
                            formProps.setFieldValue(
                              "dropdown_id",
                              value?.id || ""
                            )
                          }
                          onOpen={formProps.handleBlur}
                          includeInputInList
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              error={Boolean(
                                formProps.touched.dropdown_id &&
                                  formProps.errors.dropdown_id
                              )}
                              fullWidth
                              helperText={
                                formProps.touched.dropdown_id &&
                                formProps.errors.dropdown_id
                              }
                              label="Select Headers Dropdown*"
                              name="dropdown_id"
                              variant="outlined"
                            />
                          )}
                        />
                      </>
                    </Col>
                  <Col md={6} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Options *"
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
    dropdownDetailsPostData: (data) => dispatch(dropdownDetailsPostData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMasterDocuments);
