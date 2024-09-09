import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { Row, Col, Table, Modal, ModalHeader, ModalBody } from "reactstrap";

import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import Tooltip from "@mui/material/Tooltip";

import TextField from "@material-ui/core/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@material-ui/core";

import { Divider } from "@mui/material";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";

//*
import moment from "moment";

//* Actions
import { postTechnicalPolicy2 } from "../../../Redux/Creators/TechnicalPolicyBank";
// import { getBranchesPage } from "../../../Redux/Creators/BranchesCreators";

function TechPolicyCreate(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values in TechPolicy Add:", values);

    //form data mai aayega
    const data = new FormData();
    data.append("token", token);
    data.append("pageno", props.data.pageno);
    data.append("pageSize", props.data.pageSize);
    data.append("branch_id", values.branch_id);
    data.append("date", values.date);
    data.append("notification_no", values.notification_no);
    data.append("subject", values.subject);
    data.append("dept", values.dept);
    data.append("city", values.city);
    data.append("tech_type_name", values.tech_type_name);
    data.append("tech_type_id", values.tech_type_id);
    data.append("file", values.file);

    props.postTechnicalPolicy2(data);
    setSubmitting(true);
    setModal(false);
  };

  const flatProps = {
    options: props.branches?.branches?.data?.map((branche) => branche?.branch_name),
  };

  const techTypesProps = {
    options: props.techTypes?.techTypes?.map((techType) => techType?.name),
  };

  return (
    <div>
      <Button
        size="small"
        variant="outlined"
        className="ml-2"
        color="success"
        onClick={() => {
          setModal(!modal);
        }}
      >
        Create
      </Button>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Create Technical Policy</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              date: moment().format("YYYY-MM-DD"),

              //*
              branch_id: "",
              branch_name: "",
              branch_code: "",
              bank_name: "",
              //*
              notification_no: "",
              subject: "",
              dept: "",
              city: "",
              tech_type_name: "",
              tech_type_id: "",
              file: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              // tech_type_name: Yup.string().required("Type is required"),
              subject: Yup.string().required("Subject is required"),
              notification_no: Yup.string().required(
                "Notification No is required"
              ),
              branch_name: Yup.string().required("Branch Name is required"),
            })}
          >
            {(formProps) => (
              <Form encType="multipart/form-data">
                <Row>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      type="date"
                      size="small"
                      variant="outlined"
                      id="date"
                      name="date"
                      label="Type Date"
                      value={formProps.values.date}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.date && Boolean(formProps.errors.date)
                      }
                      helperText={
                        formProps.touched.date && formProps.errors.date
                      }
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="notification_no"
                      name="notification_no"
                      label="Notification No."
                      value={formProps.values.notification_no}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.notification_no &&
                        Boolean(formProps.errors.notification_no)
                      }
                      helperText={
                        formProps.touched.notification_no &&
                        formProps.errors.notification_no
                      }
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="subject"
                      name="subject"
                      label="Subject"
                      value={formProps.values.subject}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.subject &&
                        Boolean(formProps.errors.subject)
                      }
                      helperText={
                        formProps.touched.subject && formProps.errors.subject
                      }
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <Autocomplete
                      {...flatProps}
                      id="branch_name"
                      name="branch_name"
                      value={formProps.values.branch_name}
                      inputValue={formProps.values.branch_name}
                      onInputChange={(e, value) => {
                        console.log("value", value);
                        formProps.setFieldValue("branch_name", value);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Branch Name"
                          variant="outlined"
                        />
                      )}
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="branch_code"
                      name="branch_code"
                      disabled
                      label="Branch Code *"
                      value={formProps.values.branch_code}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.branch_code &&
                        Boolean(formProps.errors.branch_code)
                      }
                      helperText={
                        formProps.touched.branch_code &&
                        formProps.errors.branch_code
                      }
                    >
                      {props.branches.branches.data.map((branch) => {
                        if (
                          formProps.values.branch_name == branch.branch_name
                        ) {
                          return (formProps.values.branch_code =
                            branch.branch_code);
                        } else if (formProps.values.branch_name === "") {
                          return (formProps.values.branch_code = "");
                        }
                      })}
                    </TextField>

                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="branch_id"
                      name="branch_id"
                      disabled
                      hidden
                      label="Branch ID"
                      value={formProps.values.branch_id}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.branch_id &&
                        Boolean(formProps.errors.branch_id)
                      }
                      helperText={
                        formProps.touched.branch_id &&
                        formProps.errors.branch_id
                      }
                    >
                      {props.branches.branches.data.map((branch) => {
                        if (
                          formProps.values.branch_name == branch.branch_name
                        ) {
                          return (formProps.values.branch_id = branch.id);
                        } else if (formProps.values.branch_name === "") {
                          return (formProps.values.branch_id = "");
                        }
                      })}
                    </TextField>
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="bank_name"
                      name="bank_name"
                      disabled
                      label="Bank Name"
                      value={formProps.values.bank_name}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.bank_name &&
                        Boolean(formProps.errors.bank_name)
                      }
                      helperText={
                        formProps.touched.bank_name &&
                        formProps.errors.bank_name
                      }
                    >
                      {props.branches.branches.data.map((branch) => {
                        if (
                          formProps.values.branch_name == branch.branch_name
                        ) {
                          return (formProps.values.bank_name =
                            branch.bank_name);
                        } else if (formProps.values.branch_name === "") {
                          return (formProps.values.bank_name = "");
                        }
                      })}
                    </TextField>
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="dept"
                      name="dept"
                      label="Department"
                      value={formProps.values.dept}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.dept && Boolean(formProps.errors.dept)
                      }
                      helperText={
                        formProps.touched.dept && formProps.errors.dept
                      }
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="city"
                      name="city"
                      label="City"
                      value={formProps.values.city}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.city && Boolean(formProps.errors.city)
                      }
                      helperText={
                        formProps.touched.city && formProps.errors.city
                      }
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <Autocomplete
                      {...techTypesProps}
                      id="tech_type_name"
                      name="tech_type_name"
                      value={formProps.values.tech_type_name}
                      inputValue={formProps.values.tech_type_name}
                      onInputChange={(e, value) => {
                        console.log("value", value);
                        formProps.setFieldValue("tech_type_name", value);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Type"
                          variant="outlined"
                        />
                      )}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="tech_type_id"
                      name="tech_type_id"
                      disabled
                      hidden
                      label="Tech type ID"
                      value={formProps.values.tech_type_id}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.tech_type_id &&
                        Boolean(formProps.errors.tech_type_id)
                      }
                      helperText={
                        formProps.touched.tech_type_id &&
                        formProps.errors.tech_type_id
                      }
                    >
                      {props.techTypes.techTypes.map((techType) => {
                        if (formProps.values.tech_type_name == techType.name) {
                          return (formProps.values.tech_type_id = techType.id);
                        } else if (formProps.values.tech_type_name === "") {
                          return (formProps.values.tech_type_id = "");
                        }
                      })}
                    </TextField>
                  </Col>

                  <Col md={12} className="pb-4">
                    <TextField
                      fullWidth
                      type="file"
                      size="small"
                      variant="outlined"
                      id="file"
                      name="file"
                      focused
                      label="File Upload"
                      onChange={(event) => {
                        formProps.setFieldValue(
                          "file",
                          event.currentTarget.files[0]
                        );
                        console.log("file", formProps.values.file);
                      }}
                    />
                  </Col>
                </Row>

                <Divider />

                <Row className="pt-4 pd-4">
                  <Col md={6}>
                    <Button
                      color="success"
                      variant="outlined"
                      disabled={formProps.isSubmitting}
                      fullWidth
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Col>

                  <Col md={6}>
                    <Button
                      color="error"
                      variant="outlined"
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
    branches: state.branches,
    techTypes: state.techTypes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postTechnicalPolicy2: (data) => dispatch(postTechnicalPolicy2(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TechPolicyCreate);
