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
import { queriesEditData } from "../../../Redux/Creators/QueriesCreators";

function EditQuries(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values Add:", values);

    let data = {
      token: token,
      pageno: props.data2.pageno,
      pageSize: props.data2.pageSize,
      id: props.data.id,
      bank_id: values.bank_id.toString(),
      branch_id: values.branch_id.toString(),
      property_id: values.property_id.toString(),
      remark: values.remark,
      type_of_query: values.type_of_query,
      active_status: values.active_status,
      start_date: values.start_date,

      //*siff edit mai
      resolved_date: values.resolved_date,
      resolved_by: values.resolved_by,
    };

    console.log("data add", data);

    props.queriesEditData(data);
    setSubmitting(true);
    setModal(false);
  };

  const branchProps = {
    options: props?.branches?.isLoading
      ? []
      : props?.branches?.branches?.data?.map((branch) => branch?.branch_name),
  };

  const bankProps = {
    options: props?.banks?.isLoading
      ? []
      : props?.banks?.banks?.data?.map((bank) => bank?.bank_name),
  };

  const propertiesProps = {
    options: props?.properties?.isLoading
      ? []
      : props?.properties?.properties?.data?.map(
          (property) => property?.application_no
        ),
  };

  return (
    <div>
      <Button
        size="small"
        variant="contained"
        className="ml-2"
        color="warning"
        onClick={() => {
          setModal(!modal);
        }}
      >
        Edit
      </Button>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Edit Queries</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              bank_id: props?.data?.bank_id,
              branch_id: props?.data?.branch_id,
              application_no: props?.data?.property?.application_no,
              property_id: props?.data?.property_id,
              remark: props?.data?.remark,
              type_of_query: props?.data?.type_of_query,
              active_status: props?.data?.active_status,
              start_date:
                props?.data?.start_date == null
                  ? moment().format("YYYY-MM-DD")
                  : props?.data?.start_date,

              //*siff edit mai
              resolved_date:
                props?.data?.resolved_date == null
                  ? moment().format("YYYY-MM-DD")
                  : props?.data?.resolved_date,
              resolved_by: props?.data?.resolved_by,
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              //   branch_name: Yup.string().required("Branch Name is required"),
              //   bank_name: Yup.string().required("Bank Name is required"),
              application_no: Yup.string().required(
                "Application Number is required"
              ),
              remark: Yup.string().required("Remark is required"),
            })}
          >
            {(formProps) => (
              <Form>
                <Row>
                  {/* <Col md={4} className="pb-3">
                    <Autocomplete
                      {...bankProps}
                      id="bank_name"
                      name="bank_name"
                      value={formProps.values.bank_name}
                      inputValue={formProps.values.bank_name}
                      onInputChange={(e, value) => {
                        console.log("value", value);
                        formProps.setFieldValue("bank_name", value);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Bank Name"
                          variant="outlined"
                        />
                      )}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="bank_id"
                      name="bank_id"
                      hidden
                      disabled
                      value={formProps.values.bank_id}
                      onChange={formProps.handleChange}
                    >
                      {props?.banks?.banks?.data?.map((bank) => {
                        if (formProps.values.bank_name == bank.bank_name) {
                          return (formProps.values.bank_id = bank.id);
                        } else if (formProps.values.bank_name === "") {
                          return (formProps.values.bank_id = "");
                        }
                      })}
                    </TextField>
                  </Col>

                  <Col md={4} className="pb-3">
                    <Autocomplete
                      {...branchProps}
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
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="branch_id"
                      name="branch_id"
                      hidden
                      disabled
                      label="Branch ID"
                      value={formProps.values.branch_id}
                      onChange={formProps.handleChange}
                    >
                      {props?.branches?.branches?.data?.map((branch) => {
                        if (
                          formProps.values.branch_name == branch.branch_name
                        ) {
                          return (formProps.values.branch_id = branch.id);
                        } else if (formProps.values.branch_name === "") {
                          return (formProps.values.branch_id = "");
                        }
                      })}
                    </TextField>
                  </Col> */}

                  <Col md={4} className="pb-4">
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

                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="bank_id"
                      name="bank_id"
                      lable="Bank ID"
                      hidden
                      disabled
                      value={formProps.values.bank_id}
                      onChange={formProps.handleChange}
                    >
                      {props?.properties?.properties?.data?.map((property) => {
                        if (
                          formProps.values.application_no ==
                          property.application_no
                        ) {
                          return (formProps.values.bank_id = property.bank.id);
                        } else if (formProps.values.application_no === "") {
                          return (formProps.values.bank_id = "");
                        }
                      })}
                    </TextField>

                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="branch_id"
                      name="branch_id"
                      lable="Branch ID"
                      hidden
                      disabled
                      value={formProps.values.branch_id}
                      onChange={formProps.handleChange}
                    >
                      {props?.properties?.properties?.data?.map((property) => {
                        if (
                          formProps.values.application_no ==
                          property.application_no
                        ) {
                          return (formProps.values.branch_id =
                            property.branch.id);
                        } else if (formProps.values.application_no === "") {
                          return (formProps.values.branch_id = "");
                        }
                      })}
                    </TextField>
                  </Col>

                  {/* <Col md={12}>
                    <TextareaAutosize
                      id="remark"
                      name="remark"
                      placeholder="Remark"
                      style={{ width: "100%" }}
                      value={formProps.values.remark}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.remark &&
                        Boolean(formProps.errors.remark)
                      }
                      helperText={
                        formProps.touched.remark && formProps.errors.remark
                      }
                    />
                  </Col> */}

                  <Col md={4}>
                    <TextField
                      fullWidth
                      size="small"
                      id="type_of_query"
                      name="type_of_query"
                      label="Type of query"
                      variant="outlined"
                      value={formProps.values.type_of_query}
                      onChange={formProps.handleChange}
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="date"
                      size="small"
                      label="Start date"
                      id="start_date"
                      name="start_date"
                      value={formProps.values.start_date}
                      onChange={formProps.handleChange}
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      required
                      size="small"
                      select
                      variant="outlined"
                      id="active_status"
                      name="active_status"
                      label="Status"
                      value={formProps.values.active_status}
                      onChange={formProps.handleChange}
                    >
                      <MenuItem value={""}>Select</MenuItem>
                      <MenuItem value={1}>Active</MenuItem>
                      <MenuItem value={0}>InActive</MenuItem>
                    </TextField>
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="date"
                      size="small"
                      label="Resolved date"
                      id="resolved_date"
                      name="resolved_date"
                      value={formProps.values.resolved_date}
                      onChange={formProps.handleChange}
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      size="small"
                      id="resolved_by"
                      name="resolved_by"
                      label="Resolved by"
                      variant="outlined"
                      value={formProps.values.resolved_by}
                      onChange={formProps.handleChange}
                    />
                  </Col>

                  <Col md={12}>
                    <TextField
                      fullWidth
                      id="remark"
                      name="remark"
                      label="Remark"
                      variant="outlined"
                      value={formProps.values.remark}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.remark &&
                        Boolean(formProps.errors.remark)
                      }
                      helperText={
                        formProps.touched.remark && formProps.errors.remark
                      }
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
    queriesEditData: (data) => dispatch(queriesEditData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditQuries);
