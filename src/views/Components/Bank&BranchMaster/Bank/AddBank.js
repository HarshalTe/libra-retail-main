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
import { banksPostData } from "../../../../Redux/Creators/BanksCreators";

function AddBank(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values In Bank Add:", values);

    let data = {
      token: token,
      pageno: props.data.pageno,
      pageSize: props.data.pageSize,
      bank_name: values.bank_name,
      bank_code: values.bank_code,
      short_code: values.short_code,
      format: values.format,
      agreement_start_date: values.agreement_start_date,
      agreement_end_date: values.agreement_end_date,
      age_of_property: values.age_of_property,
      is_approved_by_admin: values.is_approved_by_admin,
      address: values.address,
    };

    props.banksPostData(data);
    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="success"
        size="small"
        className="ml-3"
        onClick={() => toggle()}
        // startIcon={<AddIcon fontSize="inherit" />}
      >
        Add Bank
      </Button>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Add Bank</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          {" "}
          <Formik
            initialValues={{
              bank_name: "",
              bank_code: "",
              short_code: "",
              format: "",
              age_of_property: "",
              address: "",
              is_approved_by_admin: "",
              agreement_start_date: moment().format("YYYY-MM-DD"),
              agreement_end_date: moment().format("YYYY-MM-DD"),
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              bank_name: Yup.string().required("Bank Name is required"),
              agreement_start_date: Yup.string().required(
                "Agreement end date is required"
              ),
              agreement_end_date: Yup.string().required(
                "Agreement end date is required"
              ),
            })}
          >
            {(formProps) => (
              <Form>
                <Row>
                  <Col md={6} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Bank Name *"
                      id="bank_name"
                      name="bank_name"
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
                    />
                  </Col>

                  <Col md={6} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      type="bank_code"
                      size="small"
                      variant="outlined"
                      id="bank_code"
                      name="bank_code"
                      label="Bank Code*"
                      value={formProps.values.bank_code}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.bank_code &&
                        Boolean(formProps.errors.bank_code)
                      }
                      helperText={
                        formProps.touched.bank_code &&
                        formProps.errors.bank_code
                      }
                    />
                  </Col>

                  <Col md={6} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="short_code"
                      name="short_code"
                      label="Short Code *"
                      value={formProps.values.short_code}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.short_code &&
                        Boolean(formProps.errors.short_code)
                      }
                      helperText={
                        formProps.touched.short_code &&
                        formProps.errors.short_code
                      }
                    />
                  </Col>

                  <Col md={6} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="format"
                      name="format"
                      label="Format *"
                      value={formProps.values.format}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.format &&
                        Boolean(formProps.errors.format)
                      }
                      helperText={
                        formProps.touched.format && formProps.errors.format
                      }
                    />
                  </Col>

                  <Col md={6} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      type="date"
                      size="small"
                      variant="outlined"
                      id="agreement_start_date"
                      name="agreement_start_date"
                      label="Agreement Start date *"
                      value={formProps.values.agreement_start_date}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.agreement_start_date &&
                        Boolean(formProps.errors.agreement_start_date)
                      }
                      helperText={
                        formProps.touched.agreement_start_date &&
                        formProps.errors.agreement_start_date
                      }
                    />
                  </Col>

                  <Col md={6} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      type="date"
                      size="small"
                      variant="outlined"
                      id="agreement_end_date"
                      name="agreement_end_date"
                      label="Agreement End Date *"
                      value={formProps.values.agreement_end_date}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.agreement_end_date &&
                        Boolean(formProps.errors.agreement_end_date)
                      }
                      helperText={
                        formProps.touched.agreement_end_date &&
                        formProps.errors.agreement_end_date
                      }
                    />
                  </Col>
                  <Col md={6} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Age of Property"
                      id="age_of_property"
                      name="age_of_property"
                      value={formProps.values.age_of_property}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.age_of_property &&
                        Boolean(formProps.errors.age_of_property)
                      }
                      helperText={
                        formProps.touched.age_of_property &&
                        formProps.errors.age_of_property
                      }
                    />
                  </Col>
                  <Col md={6} className="">
                      <TextField
                        fullWidth
                        select
                        variant="outlined"
                        size="small"
                        label="Approve"
                        id="is_approved_by_admin"
                        name="is_approved_by_admin"
                        value={formProps.values.is_approved_by_admin}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.is_approved_by_admin &&
                          Boolean(formProps.errors.is_approved_by_admin)
                        }
                        helperText={
                          formProps.touched.is_approved_by_admin &&
                          formProps.errors.is_approved_by_admin
                        }
                      >
                      <MenuItem value="">Select</MenuItem>
                        <MenuItem value={0}>{"No"}</MenuItem>
                        <MenuItem value={1}>{"Yes"}</MenuItem>
                    </TextField>
                    </Col>
                    <Col md={12} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Address"
                      id="address"
                      name="address"
                      value={formProps.values.address}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.address &&
                        Boolean(formProps.errors.address)
                      }
                      helperText={
                        formProps.touched.address &&
                        formProps.errors.address
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
    banksPostData: (data) => dispatch(banksPostData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBank);
