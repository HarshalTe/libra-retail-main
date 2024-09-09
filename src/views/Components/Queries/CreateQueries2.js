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
import { queriesPostData } from "../../../Redux/Creators/QueriesCreators";

function CreateQueries(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values Add:", values);

    let data = {
      token: token,
      pageno: 1,
      pageSize: 10000,
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

    props.queriesPostData(data);
    setSubmitting(false);
    setModal(false);
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
        color="success"
        onClick={() => {
          setModal(!modal);
        }}
      >
        Create Query
      </Button>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Create Queries</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              bank_name: props?.data?.branch?.bank_name,
              bank_id: props?.data?.bank?.id,
              branch_name: props?.data?.branch?.branch_name,
              branch_id: props?.data?.branch?.id,
              application_no: props?.data?.application_no,
              property_id: props?.data?.id,
              remark: "",
              type_of_query: "",
              active_status: "",
              start_date: moment().format("YYYY-MM-DD"),

              //*siff edit mai
              resolved_date: null,
              resolved_by: null,
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              application_no: Yup.string().required(
                "Application Number is required"
              ),
              remark: Yup.string().required("Remark is required"),
            })}
          >
            {(formProps) => (
              <Form>
                <Row>
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
    queriesPostData: (data) => dispatch(queriesPostData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateQueries);
