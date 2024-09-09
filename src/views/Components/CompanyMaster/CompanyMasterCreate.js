/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
  Row,
  Col,
  Card,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardBody,
  Label,
} from "reactstrap";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@material-ui/core/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Checkbox, Divider, FormControlLabel } from "@mui/material";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";

//*Actions
import { companiesPostData } from "../../../Redux/Creators/CompanyMasterCreators";
import DeleteButton from "Helpers/DeleteButton";

function CompanyMasterCreate(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);

    let data = {
      company_detail: values?.company_detail,
      account: values?.account,
      ifsc_code: values?.ifsc_code,
      gstin: values?.gstin,
      pan: values?.pan,
      state_code: values?.state_code,
      state: values?.state,
      sac: values?.sac,
      composition_scheme: values?.composition_scheme,
      msme_no: values?.msme_no,
      encl: values?.encl,
      owner_name: values?.owner_name,
    };

    console.log("Data:", data);

    props.companiesPostData(data, token);
    setSubmitting(true);
    setModal(false);
  };
  console.log("drop_down_details",props?.dropdowns?.dropdowns)

  return (
    <div>
      <Tooltip title="Create Company" placement="top">
        <Button
          style={{ width: "max-content" }}
          variant="outlined"
          color="success"
          size="small"
          className="ml-1"
          onClick={() => toggle()}
          startIcon={<AddIcon fontSize="inherit" />}
        >
          Create Company Master
        </Button>
      </Tooltip>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Create Company</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              company_detail: "",
              account: "N/A",
              ifsc_code: "N/A",
              gstin: "",
              pan: "",
              state_code: "",
              state: "",
              sac: "",
              composition_scheme: "",
              msme_no: "",
              encl: "",
              owner_name: "",
              bank: [
                {
                  bank_name: "",
                  phone: "",
                  bank_contact_person: "",
                  account_no: "",
                  ifsc_code: "",
                  branch_name: "",
                  swift_no: "",
                  iban_number: "",
                  set_as_default: 1,
                },
              ],
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              company_detail: Yup.string().required("Company Name is required"),
              account: Yup.string().required("Account Number are required"),
              ifsc_code: Yup.string().required("IFSC code is required"),
              gstin: Yup.string().required("GSTIN is required"),
              pan: Yup.string().required("Pan No. is required"),
            })}
          >
            {(formProps) => (
              <Form>
                <Row>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Company Name"
                      id="company_detail"
                      name="company_detail"
                      value={formProps.values.company_detail}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.company_detail &&
                        Boolean(formProps.errors.company_detail)
                      }
                      helperText={
                        formProps.touched.company_detail &&
                        formProps.errors.company_detail
                      }
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Owner Name / Partner Name"
                      id="owner_name"
                      name="owner_name"
                      value={formProps.values.owner_name}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.owner_name &&
                        Boolean(formProps.errors.owner_name)
                      }
                      helperText={
                        formProps.touched.owner_name &&
                        formProps.errors.owner_name
                      }
                    />
                  </Col>

                  {/* <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="ifsc_code"
                      name="ifsc_code"
                      label="IFSC code"
                      value={formProps.values.ifsc_code}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.ifsc_code &&
                        Boolean(formProps.errors.ifsc_code)
                      }
                      helperText={
                        formProps.touched.ifsc_code &&
                        formProps.errors.ifsc_code
                      }
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="account"
                      name="account"
                      label="Account"
                      value={formProps.values.account}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.account &&
                        Boolean(formProps.errors.account)
                      }
                      helperText={
                        formProps.touched.account &&
                        formProps.errors.account
                      }
                    />
                  </Col> */}

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="GSTIN"
                      id="gstin"
                      name="gstin"
                      value={formProps.values.gstin}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.gstin &&
                        Boolean(formProps.errors.gstin)
                      }
                      helperText={
                        formProps.touched.gstin && formProps.errors.gstin
                      }
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Pan number"
                      id="pan"
                      name="pan"
                      value={formProps.values.pan}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.pan && Boolean(formProps.errors.pan)
                      }
                      helperText={formProps.touched.pan && formProps.errors.pan}
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="State code"
                      id="state_code"
                      name="state_code"
                      value={formProps.values.state_code}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.state_code &&
                        Boolean(formProps.errors.state_code)
                      }
                      helperText={
                        formProps.touched.state_code &&
                        formProps.errors.state_code
                      }
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      variant="outlined"
                      size="small"
                      label="State"
                      id="state"
                      name="state"
                      value={formProps.values.state}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.state &&
                        Boolean(formProps.errors.state)
                      }
                      helperText={
                        formProps.touched.state && formProps.errors.state
                      }
                    >
                      <MenuItem value="">Select</MenuItem>
                      {props?.dropdowns?.dropdowns?.filter((field) => field?.name == "State")[0]
                        ?.drop_down_details?.map((field, i) => (
                          <MenuItem key={i} value={field?.name}>
                            {field?.name}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="SAC"
                      id="sac"
                      name="sac"
                      value={formProps.values.sac}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.sac && Boolean(formProps.errors.sac)
                      }
                      helperText={formProps.touched.sac && formProps.errors.sac}
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      variant="outlined"
                      size="small"
                      label="Composition scheme"
                      id="composition_scheme"
                      name="composition_scheme"
                      value={formProps.values.composition_scheme}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.composition_scheme &&
                        Boolean(formProps.errors.composition_scheme)
                      }
                      helperText={
                        formProps.touched.composition_scheme &&
                        formProps.errors.composition_scheme
                      }
                    >
                      <MenuItem value={""}>Select</MenuItem>
                      <MenuItem value={"1"}>Yes</MenuItem>
                      <MenuItem value={"0"}>No</MenuItem>
                    </TextField>
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="MSME No."
                      id="msme_no"
                      name="msme_no"
                      value={formProps.values.msme_no}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.msme_no &&
                        Boolean(formProps.errors.msme_no)
                      }
                      helperText={
                        formProps.touched.msme_no && formProps.errors.msme_no
                      }
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="ENCL"
                      id="encl"
                      name="encl"
                      value={formProps.values.encl}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.encl && Boolean(formProps.errors.encl)
                      }
                      helperText={
                        formProps.touched.encl && formProps.errors.encl
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
    dropdowns: state.dropdowns,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    companiesPostData: (data, token) =>
      dispatch(companiesPostData(data, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyMasterCreate);
