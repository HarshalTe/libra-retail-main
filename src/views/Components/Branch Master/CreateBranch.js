import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label
} from "reactstrap";


import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@material-ui/core/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import DateFnsUtils from "@date-io/date-fns";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";

//*Actions
import { postBranchMaster } from "../../../Redux/Creators/BranchMasterCreators";
import Autocomplete from "@mui/material/Autocomplete";

function CreateBranch(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    
    let data = {
      company_detail_id:values.company_detail_id,
      company_detail:values.company_detail,
      account: values.account,
      ifsc_code: values.ifsc_code,
      gstin: values.gstin,
      pan: values.pan,
      state_code: values.state_code,
      state: values.state,
      sac: values.sac,
      composition_scheme: values.composition_scheme,
      msme_no: values.msme_no,
      encl: values.encl,
      branch_name: values.branch_name,
    };
    console.log("Values In Upload file:",data, values);

    props.postBranchMaster(data, token);
    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
      <Tooltip title="Add Branch" placement="right" className="m-2" style={{float:"right"}}>
        <Button
          variant="outlined"
          color="info"
          size="small"
          className="ml-2"
          onClick={() => toggle()}
          startIcon={<AddIcon fontSize="small" />}
        >
          {/* <CloudUploadIcon fontSize="medium" /> */}
          Create Libra Branch Master
        </Button>
      </Tooltip>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Add Libra Branch Master</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              company_detail_id: "",
              company_detail: "",
              branch_name: "",
              account: "",
              ifsc_code: "",
              gstin: "",
              pan: "",
              state_code: "",
              state: "",
              sac: "",
              composition_scheme: "",
              msme_no: "",
              encl: ""
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              company_detail: Yup.string().required("Company_detail is required"),
              account: Yup.string().required("Account is required"),
              ifsc_code: Yup.string().required("Ifsc_code is required"),
              gstin: Yup.string().required("Gstin is required"),
              pan: Yup.string().required("Pan is required"),
            })}
            >
            {(formProps) =>{
              const projectsProps = {
                options: props?.companies?.isLoading
                  ? []
                  : props.companies?.companies?.data?.map((project) => project),
              }; 
              console.log("formprops",formProps.values,projectsProps)
              return(
              <Form enctype="multipart/form-data">
                <Row>

                <Col md={12} className="pb-4">
              <Label>Company Detail</Label>
                      <>
                        <Autocomplete
                          id="contact-autocomplete"
                          options={projectsProps.options}
                          getOptionLabel={(project) =>
                            `${project?.company_detail}`
                          }
                          onChange={(e, value) =>{
                            console.log(value,e,"ere")
                            formProps.setFieldValue(
                              "company_detail_id",
                              value?.id || ""
                            )
                            formProps.setFieldValue(
                              "company_detail",
                              value?.company_detail || ""
                            )
                            formProps.setFieldValue(
                              "account",
                              value.account || ""
                            )
                            formProps.setFieldValue(
                              "composition_scheme",
                              value.composition_scheme || ""
                            )
                            formProps.setFieldValue(
                              "encl",
                              value.encl || ""
                            )
                            formProps.setFieldValue(
                              "gstin",
                              value.gstin || ""
                            )
                            formProps.setFieldValue(
                              "ifsc_code",
                              value.ifsc_code || ""
                            )
                            formProps.setFieldValue(
                              "msme_no",
                              value.msme_no || ""
                            )
                            formProps.setFieldValue(
                              "owner_name",
                              value.owner_name || ""
                            )
                            formProps.setFieldValue(
                              "pan",
                              value.pan || ""
                            )
                            formProps.setFieldValue(
                              "sac",
                              value.sac || ""
                            )
                            formProps.setFieldValue(
                              "state",
                              value.state || ""
                            )
                            formProps.setFieldValue(
                              "state_code",
                              value.state_code || ""
                            )
                          }
                          }
                          onOpen={formProps.handleBlur}
                          includeInputInList
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              error={Boolean(
                                formProps.touched.company_detail_id &&
                                  formProps.errors.company_detail_id
                              )}
                              fullWidth
                              helperText={
                                formProps.touched.company_detail_id &&
                                formProps.errors.company_detail_id
                              }
                              label="Company Detail"
                              name="company_detail_id"
                              variant="outlined"
                            />
                          )}
                        />
                      </>
                    </Col>
                    <Col md={6} className="">
                    <Label>Branch Name</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Branch Name"
                        id="branch_name"
                        name="branch_name"
                        value={formProps.values.branch_name}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.branch_name &&
                          Boolean(formProps.errors.branch_name)
                        }
                        helperText={
                          formProps.touched.branch_name &&
                          formProps.errors.branch_name
                        }
                      />
                    </Col>
                    <Col md={6} className="">
                    <Label>Account No.</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Account No."
                        id="account"
                        name="account"
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
                    </Col>
                    <Col md={6} className="">
                    <Label>IFSC Code</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="IFSC Code"
                        id="ifsc_code"
                        name="ifsc_code"
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
                    <Col md={6} className="">
                    <Label>GSTIN</Label>
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
                          formProps.touched.gstin &&
                          formProps.errors.gstin
                        }
                      />
                    </Col>
                    <Col md={6} className="">
                    <Label>PAN No.</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="PAN No."
                        id="pan"
                        name="pan"
                        value={formProps.values.pan}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.pan &&
                          Boolean(formProps.errors.pan)
                        }
                        helperText={
                          formProps.touched.pan &&
                          formProps.errors.pan
                        }
                      />
                    </Col>
                    <Col md={6} className="">
                    <Label>State Code</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="State Code"
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
                    <Col md={6} className="">
                    <Label>State</Label>
                      <TextField
                        fullWidth
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
                          formProps.touched.state &&
                          formProps.errors.state
                        }
                      />
                    </Col>
                    <Col md={6} className="">
                    <Label>Sac</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Sac"
                        id="sac"
                        name="sac"
                        value={formProps.values.sac}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.sac &&
                          Boolean(formProps.errors.sac)
                        }
                        helperText={
                          formProps.touched.sac &&
                          formProps.errors.sac
                        }
                      />
                    </Col>
                    <Col md={6} className="">
                    <Label>Composition Scheme</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Composition Scheme"
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
                      />
                    </Col>
                    <Col md={6} className="">
                    <Label>Msme no</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Msme no"
                        id="msme_no"
                        name="msme_no"
                        value={formProps.values.msme_no}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.msme_no &&
                          Boolean(formProps.errors.msme_no)
                        }
                        helperText={
                          formProps.touched.msme_no &&
                          formProps.errors.msme_no
                        }
                      />
                    </Col>
                    <Col md={6} className="">
                    <Label>ENCL</Label>
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
                          formProps.touched.encl &&
                          Boolean(formProps.errors.encl)
                        }
                        helperText={
                          formProps.touched.encl &&
                          formProps.errors.encl
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
            )}}
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
    companies: state.companies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postBranchMaster: (data,token) => dispatch(postBranchMaster(data,token)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateBranch);
