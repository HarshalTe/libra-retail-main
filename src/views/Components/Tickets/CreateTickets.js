import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
  Row,
  Col,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
} from "reactstrap";

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
import TextareaAutosize from "@mui/material/TextareaAutosize";

//* Actions
import { ticketsPostData } from "../../../Redux/Creators/TicketsCreators";

function CreateQueries(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values Add:", values);

    // let data = {
    //   user_id: values.user_id,
    //   case_id: values.property_id.toString(),
    //   subject: values.subject,
    //   file: values.file,
    //   status: values.status,
    //   deadline: values.deadline,
    //   remark: values.remark,
    // };

    const data = new FormData();

    data.append("user_id", values.user_id);
    data.append("case_id", values.case_id);
    data.append("subject", values.subject);
    data.append("file", values.file); // Assuming values.file is a File object
    data.append("status", values.status);
    data.append("deadline", values.deadline);
    data.append("remark", values.remark);

    console.log("data add", data);

    props.ticketsPostData(data, token);
    setSubmitting(true);
    setModal(false);
  };


  const propertiesProps2 = {
    options: props?.properties?.isLoading
      ? []
      : props?.properties?.properties?.data?.map((property) => property),
  };

  return (
    <div>
      <Button
        size="small"
        variant="contained"
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
            <strong>Create Tickets</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              user_id: props?.login?.login?.user?.id,
              case_id: "",
              subject: "",
              file: "",
              status: "",
              deadline: moment().format("YYYY-MM-DD"),
              remark: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              // case_id: Yup.string().required(
            })}
          >
            {(formProps) => (
              <Form>
                <Row>
                  <Col md={6} className="pb-4">
                    <>
                      <Autocomplete
                        id="case_id-autocomplete"
                        options={propertiesProps2.options}
                        getOptionLabel={(branch) => branch?.application_no}
                        onChange={(e, value) => {
                          console.log("value", value);
                          formProps.setFieldValue("case_id", value?.id || "");
                        }}
                        onOpen={formProps.handleBlur}
                        includeInputInList
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={Boolean(
                              formProps.touched.case_id &&
                                formProps.errors.case_id
                            )}
                            fullWidth
                            helperText={
                              formProps.touched.case_id &&
                              formProps.errors.case_id
                            }
                            label="Application Number *"
                            name="case_id"
                            variant="outlined"
                          />
                        )}
                      />
                    </>
                  </Col>

                  {/* <Col md={6} className="pb-4">
                    <Autocomplete
                      {...propertiesProps}
                      id="application_no"
                      name="application_no"
                      value={formProps.values.application_no}
                      inputValue={formProps.values.application_no}
                      onInputChange={(e, value) => {
                        console.log("value", value);
                        formProps.setFieldValue("application_no", value);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Application Number"
                          variant="outlined"
                          error={
                            formProps.touched.application_no &&
                            Boolean(formProps.errors.application_no)
                          }
                          helperText={
                            formProps.touched.application_no &&
                            formProps.errors.application_no
                          }
                        />
                      )}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="property_id"
                      name="property_id"
                      hidden
                      disabled
                      value={formProps.values.property_id}
                      onChange={formProps.handleChange}
                    >
                      {props?.properties?.properties?.data?.map((property) => {
                        if (
                          formProps.values.application_no ==
                          property.application_no
                        ) {
                          return (formProps.values.property_id = property.id);
                        } else if (formProps.values.application_no === "") {
                          return (formProps.values.property_id = "");
                        }
                      })}
                    </TextField>

                    </Col> */}

                  <Col md={6}>
                    <TextField
                      fullWidth
                      size="small"
                      id="subject"
                      name="subject"
                      label="Subject"
                      variant="outlined"
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

                  <Col md={6} className="pb-4">
                    {/* <Label>Upload</Label> */}
                    <TextField
                      fullWidth
                      size="small"
                      name="file"
                      variant="outlined"
                      onChange={(e, value) => {
                        formProps.setFieldValue(
                          "file",
                          e.currentTarget.files[0]
                        );
                      }}
                      type="file"
                      error={
                        formProps.touched.f && Boolean(formProps.errors.file)
                      }
                      helperText={
                        formProps.touched.file && formProps.errors.file
                      }
                    />
                  </Col>

                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      type="date"
                      size="small"
                      id="deadline"
                      name="deadline"
                      label="Deadline"
                      variant="outlined"
                      value={formProps.values.deadline}
                      onChange={formProps.handleChange}
                    />
                  </Col>
                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      size="small"
                      id="status"
                      name="status"
                      label="Status"
                      variant="outlined"
                      value={formProps.values.status}
                      onChange={formProps.handleChange}
                    >
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value={1}>Yes</MenuItem>
                      <MenuItem value={0}>No</MenuItem>
                    </TextField>
                  </Col>

                  <Col md={12} className="">
                    <Label>Remarks</Label>
                    <TextareaAutosize
                      //  aria-label="minimum height"
                      style={{ width: 725, margin: "auto" }}
                      minRows={6}
                      fullWidth
                      // variant="outlined"
                      size="large"
                      label="Remark"
                      id="remark"
                      name="remark"
                      value={formProps.values.remark}
                      onChange={formProps.handleChange}
                    />
                  </Col>
                </Row>

                <Divider />

                <Row className="pt-4 pd-4">
                  <Col md={6}>
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

                  <Col md={6}>
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
    banks: state.banks,
    branches: state.branches,
    properties: state.properties,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ticketsPostData: (data, token) => dispatch(ticketsPostData(data, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateQueries);
