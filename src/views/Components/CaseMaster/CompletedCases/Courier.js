import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  // Button,
  Table,
  Label,
  CardBody,
  FormGroup,
  CardHeader,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
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
import { Divider } from "@mui/material";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";

import DateFnsUtils from "@date-io/date-fns";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";

//*Actions
import { hardCopiesPostData } from "./../../../../Redux/Entites/HardCopies";

function Courier(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  console.log("props2223",props)

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values In Bank Add:", values);


    let data = {
      token: token,
      pageno: props.data.pageno,
      pageSize: props.data.pageSize,
    };
    let user = {
      tracking: values.tracking,
      options: values.options,
      company_name: values.company_name,
      delivery: values.delivery,
      tracking_link: values.tracking_link,
      property_id: values.property_id,
      bank_id: values.bank_id,
      branch_id: values.branch_id,
      file_upload: values.file_upload,
    };

    props.hardCopiesPostData(data, user, setSubmitting, toggle);
    setSubmitting(true);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="info"
        size="small"
        className="ml-3 p-2"
        onClick={() => toggle()}
      >
        Add Courier
      </Button>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Add Courier</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          {" "}
          <Formik
            initialValues={{
              tracking: "",
              options: "",
              company_name: "",
              delivery: "",
              tracking_link: "",
              property_id: props.data.id,
              bank_id: props.data.bank_id,
              branch_id: props.data.branch_id,
              // file_upload: props.data.file_upload,
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({})}
          >
            {(formProps) => (
              <Form>
                <Row>
                  <Col md={6} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Courier Tracking Number"
                      id="tracking"
                      name="tracking"
                      value={formProps.values.tracking}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.tracking &&
                        Boolean(formProps.errors.tracking)
                      }
                      helperText={
                        formProps.touched.tracking && formProps.errors.tracking
                      }
                    />
                  </Col>

                  <Col md={6} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      select
                      size="small"
                      variant="outlined"
                      id="options"
                      name="options"
                      label="Options"
                      value={formProps.values.options}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.options &&
                        Boolean(formProps.errors.options)
                      }
                      helperText={
                        formProps.touched.options && formProps.errors.options
                      }
                    >
                      <MenuItem value="">
                        <em>Select Option</em>
                      </MenuItem>
                      <MenuItem value="documents">
                        <em>Documents</em>
                      </MenuItem>
                      <MenuItem value="reports">
                        <em>Reports</em>
                      </MenuItem>
                    </TextField>
                  </Col>

                  <Col md={6} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="company_name"
                      name="company_name"
                      label="Company Name"
                      value={formProps.values.company_name}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.company_name &&
                        Boolean(formProps.errors.company_name)
                      }
                      helperText={
                        formProps.touched.company_name &&
                        formProps.errors.company_name
                      }
                    />
                  </Col>

                  <Col md={6} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Estimated Time of Delivery"
                      id="delivery"
                      name="delivery"
                      value={formProps.values.delivery}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.delivery &&
                        Boolean(formProps.errors.delivery)
                      }
                      helperText={
                        formProps.touched.delivery && formProps.errors.delivery
                      }
                    />
                  </Col>
                  <Col md={6} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Courier Tracking Link"
                      id="tracking_link"
                      name="tracking_link"
                      value={formProps.values.tracking_link}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.tracking_link &&
                        Boolean(formProps.errors.tracking_link)
                      }
                      helperText={
                        formProps.touched.tracking_link &&
                        formProps.errors.tracking_link
                      }
                    />
                  </Col>
                  <Col>
                  <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        type="file"
                        id="file_upload"
                        name="file_upload"
                        onChange={(e) => {
                          formProps.setFieldValue(
                            "file_upload",
                            e.currentTarget.files[0]
                          );
                        }}
                        error={
                          formProps.touched.file_upload &&
                          Boolean(formProps.errors.file_upload)
                        }
                        helperText={
                          formProps.touched.file_upload && formProps.errors.file_upload
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hardCopiesPostData: (data, user, setSubmitting, toggle) =>
      dispatch(hardCopiesPostData(data, user, setSubmitting, toggle)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Courier);
