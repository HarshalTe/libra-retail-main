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
import EditIcon from "@mui/icons-material/Edit";

//*Actions
import { companiesEditData } from "../../../Redux/Creators/CompanyMasterCreators";
import DeleteButton from "Helpers/DeleteButton";
import AddButton from "Helpers/AddButton";

function CompanyMasterEdit(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);
    console.log("tttttttt", props);

    let data = {
      id: props?.data?.id,
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
      banks: JSON.stringify(values?.bank),
    };

    console.log("Data:", data);

    props.companiesEditData(data, token);
    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
      <Tooltip title="Edit Company" placement="top">
        <Button
          variant="outlined"
          color="warning"
          size="small"
          className="p-1"
          onClick={() => toggle()}
        >
          <EditIcon fontSize="medium" />
        </Button>
      </Tooltip>
      <Modal
        className="modal-xl"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Edit Company</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              company_detail: props?.data?.company_detail,
              account: props?.data?.account,
              ifsc_code: props?.data?.ifsc_code,
              gstin: props?.data?.gstin,
              pan: props?.data?.pan,
              state_code: props?.data?.state_code,
              state: props?.data?.state,
              sac: props?.data?.sac,
              composition_scheme: props?.data?.composition_scheme,
              msme_no: props?.data?.msme_no,
              encl: props?.data?.encl,
              owner_name: props?.data?.owner_name,
              bank: props?.data?.banks== null?[
                {
                  bank_name: "",
                  // phone: "",
                  account_no: "",
                  ifsc_code: "",
                  branch_name: "",
                  // qr_code: "",
                  // set_as_default: 1,
                },
              ]:JSON.parse(props?.data?.banks),
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              company_detail: Yup.string().required(
                "Company Name is required"
              ),
              account: Yup.string().required("Account Number are required"),
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
                      label="Company Name *"
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
                        formProps.touched.owner_name && formProps.errors.owner_name
                      }
                    />
                  </Col>

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
                      {props?.dropdowns?.dropdowns
                        ?.filter((field) => field?.name == "State")[0]
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
                  {/* <Col md={4} className="pb-4">
                    <Label className="label f-12">KYC Document</Label>
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
                  </Col> */}
                </Row>
                <Col md={12}>
                  <FieldArray
                    name={`bank`}
                    render={(bankArrayHelper) => {
                      return formProps.values.bank?.map((bank, BIndex) => {
                        return (
                          <Card className="bank-container mb-2">
                            <CardBody className="p-0">
                              <div className="d-flex justify-content-between align-items-center">
                                <Label className="font-weight-600 text-black">
                                  Bank Details {BIndex + 1}
                                </Label>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      defaultChecked
                                      sx={{
                                        "& .MuiSvgIcon-root": {
                                          fontSize: 25,
                                        },
                                      }}
                                      name={`bank.${BIndex}.set_as_default`}
                                      id={`bank.${BIndex}.set_as_default`}
                                      checked={
                                        formProps.values.bank.set_as_default ==
                                        1
                                          ? true
                                          : false
                                      }
                                      onChange={(event) => {
                                        formProps.setFieldValue(
                                          `bank.${BIndex}.set_as_default`,
                                          event.target.value
                                        );
                                      }}
                                      value={
                                        formProps.values.bank[BIndex]
                                          .set_as_default == 1
                                          ? 0
                                          : 1
                                      }
                                    />
                                  }
                                  label="Set as Default"
                                />
                              </div>
                              <div className="bank-details">
                                <Row className="form-group">
                                  <Col md={3}>
                                    <TextField
                                      fullWidth
                                      variant="standard"
                                      id={`bank.${BIndex}.bank_name`}
                                      label="Bank Name *"
                                      name={`bank.${BIndex}.bank_name`}
                                      value={
                                        formProps.values.bank[BIndex].bank_name
                                      }
                                      onChange={formProps.handleChange}
                                    />
                                  </Col>

                                  <Col md={3}>
                                    <TextField
                                      fullWidth
                                      variant="standard"
                                      id={`bank.${BIndex}.account_no`}
                                      label="Account No *"
                                      name={`bank.${BIndex}.account_no`}
                                      value={
                                        formProps.values.bank[BIndex].account_no
                                      }
                                      onChange={formProps.handleChange}
                                    />
                                  </Col>
                                  <Col md={3}>
                                    <TextField
                                      fullWidth
                                      variant="standard"
                                      id={`bank.${BIndex}.ifsc_code`}
                                      label="IFSC Code"
                                      name={`bank.${BIndex}.ifsc_code`}
                                      value={
                                        formProps.values.bank[BIndex].ifsc_code
                                      }
                                      onChange={formProps.handleChange}
                                    />
                                  </Col>

                                  <Col md={3}>
                                    <TextField
                                      fullWidth
                                      variant="standard"
                                      id={`bank.${BIndex}.branch_name`}
                                      label="Branch Address"
                                      name={`bank.${BIndex}.branch_name`}
                                      value={
                                        formProps.values.bank[BIndex]
                                          .branch_name
                                      }
                                      onChange={formProps.handleChange}
                                    />
                                  </Col>
                                </Row>
                                {/* <Row className="form-group">
                                  <Col md={3}>
                                    <Label className="">QR Code</Label>
                                    <TextField
                                      fullWidth
                                      type="file"
                                      variant="standard"
                                      id={`bank.${BIndex}.qr_code`}
                                      name={`bank.${BIndex}.qr_code`}
                                      value={
                                        formProps.values.bank[BIndex].qr_code
                                      }
                                      onChange={formProps.handleChange}
                                    />
                                  </Col>
                                </Row> */}
                              </div>
                              <div className="d-flex justify-content-end align-items-center p-1">
                                {formProps.values.bank.length ===
                                  BIndex + 1 && (
                                  <AddButton
                                    onClick={() => {
                                      console.log("object1233",formProps.values)
                                      bankArrayHelper.push({
                                        bank_name:
                                          formProps.values.bank[BIndex]
                                            .bank_name ?? "",
                                        phone:
                                          formProps.values.bank[BIndex].phone ??
                                          "",
                                        bank_contact_person:
                                          formProps.values.bank[BIndex]
                                            .bank_contact_person ?? "",
                                        account_no:
                                          formProps.values.bank[BIndex]
                                            .account_no ?? "",
                                        ifsc_code:
                                          formProps.values.bank[BIndex]
                                            .ifsc_code ?? "",
                                        branch_name:
                                          formProps.values.bank[BIndex]
                                            .branch_name ?? "",
                                        swift_no:
                                          formProps.values.bank[BIndex]
                                            .swift_no ?? "",
                                        iban_number:
                                          formProps.values.bank[BIndex]
                                            .iban_number ?? "",
                                        set_as_default: 0,
                                      });
                                    }}
                                  />
                                )}

                                {formProps.values.bank?.length > 1 && (
                                  <DeleteButton
                                    deleteFunction={() =>
                                      bankArrayHelper.remove(BIndex)
                                    }
                                  />
                                )}
                              </div>
                            </CardBody>
                          </Card>
                        );
                      });
                    }}
                  />
                </Col>

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
    companiesEditData: (data, token) =>
      dispatch(companiesEditData(data, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyMasterEdit);
