import React, { Children, useEffect, useState } from "react";

import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Table,
} from "reactstrap";

import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@material-ui/core/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Autocomplete, Divider } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import DateFnsUtils from "@date-io/date-fns";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import View from "./View";

//*Actions
import { relievinglettersPostData } from "../../../../Redux/Creators/LievingLettersCreators";
import { getAssetsList } from "../../../../Redux/Creators/AssetsCreators";

function CreateLeavingLetter(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    // ? FormData Chahiye File Upload hai
    // const data = new FormData();
    // data.append("user_id", values.user_id);
    // data.append("expense_type", values.expense_type);
    // // data.append("limit", values.limit);
    // data.append("is_approved", values.is_approved);
    // data.append("file_upload", values.file_upload);
    let data = {
      user_id: values.user_id,
      relieving_date: values.relieving_date,
      position: values.position,
      status: values.status,
      message: values.message,
    };
    console.log("Values In Upload file:", data, values);

    props.relievinglettersPostData(data, token);
    setSubmitting(true);
    setModal(false);
  };

  const projectsProps = {
    options: props?.users?.isLoading
      ? []
      : props?.users?.users?.data?.map((project) => project),
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const token = props.login?.login?.token;
  let data = {
    token: token,
  };
    props.getAssetsList(data);
  };
  const rows =props.assets?.isLoading
  ? []
  : props.assets?.assets?.length > 0
  ? props.assets?.assets
  : [];


  return (
    <div>
      <Tooltip
        title="Add Leaving Letter"
        placement="right"
        className="m-2"
        style={{ float: "right" }}
      >
        <Button
          variant="outlined"
          color="info"
          size="small"
          className="ml-2"
          onClick={() => toggle()}
          startIcon={<AddIcon fontSize="small" />}
        >
          {/* <CloudUploadIcon fontSize="medium" /> */}
          Create
        </Button>
      </Tooltip>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Add Leaving Letter</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              user_id: "",
              relieving_date: "",
              position: "",
              status: "",
              message: "",
              assets:[]
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
            })}
          >
            {(formProps) => (
              <Form enctype="multipart/form-data">
                <Row>
                  <Col md={6} className="">
                    <>
                      <Autocomplete
                        id="contact-autocomplete"
                        options={projectsProps.options}
                        getOptionLabel={(project) => `${project?.name}`}
                        onChange={(e, value) => {
                          console.log(value, e, "ere");
                          formProps.setFieldValue("user_id", value?.id || "");
                          formProps.setFieldValue("name", value.name || "");
                          formProps.setFieldValue("email", value.email || "");
                          formProps.setFieldValue(
                            "mobile",
                            value.mobile_no || ""
                          );
                          formProps.setFieldValue(
                            "assets",
                            rows?.filter(item => item?.user_id === value?.id) || []
                          );
                        }}
                        onOpen={formProps.handleBlur}
                        includeInputInList
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={Boolean(
                              formProps.touched.user_id &&
                                formProps.errors.user_id
                            )}
                            fullWidth
                            helperText={
                              formProps.touched.user_id &&
                              formProps.errors.user_id
                            }
                            label="Employee Id"
                            name="user_id"
                            variant="outlined"
                          />
                        )}
                      />
                    </>
                  </Col>

                  <Col md={6} className="">
                    <Label>Relieving Date</Label>
                    <TextField
                      fullWidth
                      type="date"
                      variant="outlined"
                      size="small"
                      // label="Relieving Date"
                      id="relieving_date"
                      name="relieving_date"
                      value={formProps.values.relieving_date}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.relieving_date &&
                        Boolean(formProps.errors.relieving_date)
                      }
                      helperText={
                        formProps.touched.relieving_date &&
                        formProps.errors.relieving_date
                      }
                    />
                  </Col>
                  <Col md={6} className="">
                    <Label>Position</Label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Position"
                      id="position"
                      name="position"
                      value={formProps.values.position}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.position &&
                        Boolean(formProps.errors.position)
                      }
                      helperText={
                        formProps.touched.position && formProps.errors.position
                      }
                    />
                  </Col>

                  <Col md={6} className="">
                    <Label>Status</Label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Status"
                      id="status"
                      name="status"
                      value={formProps.values.status}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.status &&
                        Boolean(formProps.errors.status)
                      }
                      helperText={
                        formProps.touched.status && formProps.errors.status
                      }
                    />
                  </Col>
                  <Col md={12} className="">
                    <Label>Message</Label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Message"
                      id="message"
                      name="message"
                      value={formProps.values.message}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.message &&
                        Boolean(formProps.errors.message)
                      }
                      helperText={
                        formProps.touched.message && formProps.errors.message
                      }
                    />
                  </Col>

                

                  <Col md={12} className="pb-4 mt-4">
                    <FieldArray
                      name="assets"
                      render={(arrayHelpers) => (
                        <div>
                          <Row>
                            {/* <Col md={10}>
                              <TextField
                                fullWidth
                                required
                                size="small"
                                select
                                variant="outlined"
                                id="assets2"
                                name="assets2"
                                label="Assets"
                                value={formProps.values.assets2}
                                onChange={formProps.handleChange}
                                error={
                                  formProps.touched.assets2 &&
                                  Boolean(formProps.errors.assets2)
                                }
                                helperText={
                                  formProps.touched.assets2 &&
                                  formProps.errors.assets2
                                }
                              >
                              {  console.log(rows,"hhhhh")}
                                <MenuItem value={""}>Select</MenuItem>
                                {rows?.map((row) => {
                                  return(

                                    <MenuItem value={row?.name}>
                                    {row?.name}
                                  </MenuItem>
                                    )
                                })}
                              </TextField>
                            </Col>

                            <Col md={2}>
                              <Button
                                color="success"
                                variant="contained"
                                onClick={() => {
                                  arrayHelpers.push(formProps.values.assets2);
                                }}
                                size="large"
                              >
                                <AddIcon fontSize="medium" />
                              </Button>
                            </Col> */}
                          </Row>
                          <Table
                            size="sm"
                            className="mt-3"
                            bordered
                            style={{ textAlign: "center" }}
                          >
                            <thead>
                              <tr>
                                <th>Sr No.</th>
                                <th>Assets</th>
                              </tr>
                            </thead>

                            <tbody>
                              {console.log("values", formProps?.values?.assets)}
                              {formProps?.values?.assets?.map((bank, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{index + 1}</td>

                                    <td>
                                      <TextField
                                        fullWidth
                                        disabled
                                        size="small"
                                        label="Assets"
                                        variant="outlined"
                                        name={`bank.${index}`}
                                        value={bank.name}
                                        id="assets"
                                      />
                                    </td>

                                    <td>
                                      <Button
                                        color="error"
                                        size="large"
                                        variant="outlined"
                                        onClick={() => {
                                          arrayHelpers.remove(index);
                                          formProps.values.banks.splice(
                                            index,
                                            1
                                          );
                                        }}
                                      >
                                        <DeleteIcon fontSize="medium" />
                                      </Button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </Table>
                        </div>
                      )}
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
                  {/* <Col md={4}>
                   <View/>
                  </Col> */}
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
    users: state.users,
    dropdowns: state.dropdowns,
    assets: state.assets,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    relievinglettersPostData: (data, token) =>
      dispatch(relievinglettersPostData(data, token)),
      getAssetsList: (data) => dispatch(getAssetsList(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateLeavingLetter);
