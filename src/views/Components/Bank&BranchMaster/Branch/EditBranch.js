import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
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
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@material-ui/core/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Checkbox, Divider, FormControlLabel } from "@mui/material";
import { IconButton, TextareaAutosize } from "@material-ui/core";


import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";

//* Actions
import { branchesEditData } from "../../../../Redux/Creators/BranchesCreators";
import Autocomplete from "@mui/material/Autocomplete";
import moment from "moment";

function EditBranch(props) {
  // console.log(props, "propdata");
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values In Branch Edit:", values);

    let data = {
      token: token,
      pageno: props.data.pageno,
      pageSize: props.data.pageSize,
      id: props.data.id,
      bank_name: values.bank_name,
      bank_code: values.bank_code,
      branch_name: values.branch_name,
      branch_code: values.branch_code,
      address: values.address,
      mobile_no_1: values.mobile_no_1,
      mobile_no_2: values.mobile_no_2,
      city: values.city,
      state: values.state,
      country: values.country,
      pincode: values.pincode,
      report_type: values.report_type,
      gstno: values.gstno,
      site_visit_automail: values.site_visit_automail,
      remark: values.remark,
      email_for_all: values.email_for_all,
      longitude: values.longitude,
      latitude: values.latitude,
      //*Login Details Main
      login_details: values.login_details,
      //* Email Details
      email_details: values.email_details,

      area: values.area,
      distance: values.distance,
      fixed_value: values.fixed_value,
      fixed_value_rate: values.fixed_value_rate,
      area_details: values.area_details,
      distance_details: values.distance_details,
      is_approved_by_admin: values.is_approved_by_admin,
      contact_name: values.contact_name,
      contact_number: values.contact_number,
      payement_id: values.payement_id,
      vendor_code: values.vendor_code,
    };

    console.log("data branch edit", data);

    props.branchesEditData(data);
    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
      {/* <Button
        size="small"
        className="ml-2"
        variant="contained"
        color="warning"
        onClick={() => {
          setModal(!modal);
        }}
      >
        Edit
      </Button> */}
      <MenuItem
        disableRipple
        color="warning"
        onClick={() => {
          setModal(!modal);
        }}
      >
        <EditIcon color="warning" />
        {/* Edit */}
      </MenuItem>
      <Modal className="modal-xl" isOpen={modal} toggle={() => toggle()}>
        <ModalHeader toggle={() => toggle()}>
          <Typography>
            <strong>Branch Edit</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              bank_name: props.data.bank_name,
              bank_code: props.data.bank_code,
              branch_name: props.data.branch_name,
              branch_code: props.data.branch_code,
              address: props.data.address,
              mobile_no_1: props.data.mobile_no_1,
              mobile_no_2: props.data.mobile_no_2,
              city: props.data.city,
              state: props.data.state,
              country: props.data.country,
              pincode: props.data.pincode,
              longitude: props.data.longitude,
              latitude: props.data.latitude,
              report_type: props.data.report_type,
              gstno: props.data.gstno,
              site_visit_automail: props.data.site_visit_automail,
              remark: props.data.remark,
              email_for_all: props.data.email_for_all,
              email_details: props.data.email_details,
              //*Login Details Main
              email_for_login: "",
              role: "",
              designation: "",
              password: "",
              login_details: props.data.login_details,
              //* Email Details
              case_type: "",
              email_for_reports: "",
              case_type2: "",
              email_for_billing: "",
              // email_details: [],
              is_approved_by_admisssn: "",
              is_approved_by_admin: props.data.is_approved_by_admin,
              contact_number: props.data.contact_number,
              contact_name: props.data.contact_name,
              payement_id: props.data.payement_id,
              vendor_code: props.data.vendor_code,

                     //* Email Details
                     area: 0,
                     distance: 0,
                     fixed_value: 0,
                     area_value: "",
                     area_rate: "",
                     distance_value: "",
                     distance_rate: "",
                     fixed_value_rate: props.data.fixed_value_rate,
                     area_details: props.data.area_details,
                     distance_details: props.data.distance_details,
                     dob_billing: moment().format("YYYY-MM-DD"),
                     dob_report: moment().format("YYYY-MM-DD"),

            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              branch_name: Yup.string().required("Branch Name is required"),
              bank_name: Yup.string().required("Bank Name is required"),
              bank_code: Yup.string().required("Bank Code is required"),
              pincode: Yup.string().required("Pincode is required"),
              report_type: Yup.string().required("Report Type is required"),
            })}
          >
            {(formProps) => {
               const paymentProps = {
                options: props?.paymentMaster?.isLoading
                  ? []
                  : props?.paymentMaster?.paymentMaster?.data?.map(
                      (payment) => payment
                    ),
              };
              return(
              <Form>
                <Row>
                  <Col md={3} style={{ paddingBottom: "20px" }}>
                    <TextField
                      select
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="bank_name"
                      name="bank_name"
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
                      <MenuItem value={""}>Select</MenuItem>
                      {props.banks?.banks?.data?.map((bank) => (
                        <MenuItem value={bank.bank_name}>
                          {bank.bank_name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Col>
                  <Col md={3} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      disabled
                      size="small"
                      variant="outlined"
                      id="bank_code"
                      name="bank_code"
                      label="Bank Code *"
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
                    >
                      {props.banks?.banks?.data?.map((bank) => {
                        if (formProps.values.bank_name == bank.bank_name) {
                          return (formProps.values.bank_code = bank.bank_code);
                        } else if (formProps.values.bank_name === "") {
                          return (formProps.values.bank_code = "");
                        }
                      })}
                    </TextField>
                  </Col>

                  <Col md={3} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Branch Name *"
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

                  <Col md={3} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="branch_code"
                      name="branch_code"
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
                    />
                  </Col>

                  <Col md={12} className="pb-4">
        <Autocomplete
          id="contact-autocomplete"
          options={paymentProps.options}
          getOptionLabel={(payment) =>
            payment?.account_name + ` (${payment?.account_no})`
          }
          value={paymentProps.options.find(
            (option) => option.id === formProps.values.payement_id
          )}
          onChange={(e, value) =>
            formProps.setFieldValue("payement_id", value?.id || "")
          }
          onOpen={formProps.handleBlur}
          includeInputInList
          renderInput={(params) => (
            <TextField
              {...params}
              error={Boolean(
                formProps.touched.payement_id && formProps.errors.payement_id
              )}
              fullWidth
              helperText={
                formProps.touched.payement_id && formProps.errors.payement_id
              }
              label="Libra Payment Account"
              name="payement_id"
              variant="outlined"
            />
          )}
        />
      </Col>
                    <Col md={6} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="gstno"
                      name="gstno"
                      label="GST IN No."
                      value={formProps.values.gstno}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.gstno &&
                        Boolean(formProps.errors.gstno)
                      }
                      helperText={
                        formProps.touched.gstno && formProps.errors.gstno
                      }
                    />
                  </Col>
                  <Col md={6} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="vendor_code"
                      name="vendor_code"
                      label="Bank Eampanelment Code *"
                      value={formProps.values.vendor_code}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.vendor_code &&
                        Boolean(formProps.errors.vendor_code)
                      }
                      helperText={
                        formProps.touched.vendor_code &&
                        formProps.errors.vendor_code
                      }
                    />
                  </Col>
                  <Col md={12} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      // type="textarea"
                      // multiline
                      size="small"
                      variant="outlined"
                      id="address"
                      name="address"
                      label="Bank Branch Address *"
                      value={formProps.values.address}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.address &&
                        Boolean(formProps.errors.address)
                      }
                      helperText={
                        formProps.touched.address && formProps.errors.address
                      }
                    />
                  </Col>

                  <Col md={6} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="mobile_no_1"
                      name="mobile_no_1"
                      label="Mobile No. 1"
                      value={formProps.values.mobile_no_1}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.mobile_no_1 &&
                        Boolean(formProps.errors.mobile_no_1)
                      }
                      helperText={
                        formProps.touched.mobile_no_1 &&
                        formProps.errors.mobile_no_1
                      }
                    />
                  </Col>

                  <Col md={6} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="mobile_no_2"
                      name="mobile_no_2"
                      label="Mobile No. 2"
                      value={formProps.values.mobile_no_2}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.mobile_no_2 &&
                        Boolean(formProps.errors.mobile_no_2)
                      }
                      helperText={
                        formProps.touched.mobile_no_2 &&
                        formProps.errors.mobile_no_2
                      }
                    />
                  </Col>

                  <Col md={6} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="contact_name"
                      name="contact_name"
                      label="Contact Person Name"
                      value={formProps.values.contact_name}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.contact_name &&
                        Boolean(formProps.errors.contact_name)
                      }
                      helperText={
                        formProps.touched.contact_name &&
                        formProps.errors.contact_name
                      }
                    />
                  </Col>

                  <Col md={6} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="contact_number"
                      name="contact_number"
                      label="Contact Person Number"
                      value={formProps.values.contact_number}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.contact_number &&
                        Boolean(formProps.errors.contact_number)
                      }
                      helperText={
                        formProps.touched.contact_number &&
                        formProps.errors.contact_number
                      }
                    />
                  </Col>

                  <Col md={3} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      select
                      size="small"
                      variant="outlined"
                      id="country"
                      name="country"
                      label="Country *"
                      value={formProps.values.country}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.country &&
                        Boolean(formProps.errors.country)
                      }
                      helperText={
                        formProps.touched.country && formProps.errors.country
                      }
                      >
                      <MenuItem value="">Select</MenuItem>
                       {props?.dropdowns?.dropdowns
                         ?.filter((field) => field?.name == "Country")[0]
                         ?.drop_down_details?.map((field, i) => (
                           <MenuItem key={i} value={field?.name}>
                             {field?.name}
                           </MenuItem>
                         ))}
                         </TextField>
                  </Col>
                  <Col md={3} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      select
                      size="small"
                      variant="outlined"
                      id="state"
                      name="state"
                      label="State *"
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
                  <Col md={3} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      select
                      size="small"
                      variant="outlined"
                      id="city"
                      name="city"
                      label="City *"
                      value={formProps.values.city}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.city && Boolean(formProps.errors.city)
                      }
                      helperText={
                        formProps.touched.city && formProps.errors.city
                      }
                      >
                      <MenuItem value="">Select</MenuItem>
                       {props?.dropdowns?.dropdowns
                         ?.filter((field) => field?.name == "city")[0]
                         ?.drop_down_details?.map((field, i) => (
                           <MenuItem key={i} value={field?.name}>
                             {field?.name}
                           </MenuItem>
                         ))}
                         </TextField>
                  </Col>
{console.log("formProps.values.city",formProps.values.city,formProps.values.state)}

                  <Col md={3} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="pincode"
                      name="pincode"
                      label="Pincode *"
                      value={formProps.values.pincode}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.pincode &&
                        Boolean(formProps.errors.pincode)
                      }
                      helperText={
                        formProps.touched.pincode && formProps.errors.pincode
                      }
                    />
                  </Col>
                  {/* <Col md={12} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="remark"
                      name="remark"
                      label="Bank Policy"
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
                  <Col md={12} style={{ paddingBottom: "20px" }} className="">
                    <Label>Bank Policy</Label>
                    <TextareaAutosize
                    //  aria-label="minimum height"
                    style={{ width: 1090, margin:"auto" }}
                     minRows={6}
                        fullWidth
                        // variant="outlined"
                        size="large"
                        label="Bank Policy"
                        id="remark"
                        name="remark"
                        value={formProps.values.remark}
                        onChange={formProps.handleChange}
                       
                      />
                    </Col>
                  <Col md={6} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="report_type"
                      name="report_type"
                      label="Report Type *"
                      value={formProps.values.report_type}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.report_type &&
                        Boolean(formProps.errors.report_type)
                      }
                      helperText={
                        formProps.touched.report_type &&
                        formProps.errors.report_type
                      }
                    />
                  </Col>
                  
                  <Col md={6} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="site_visit_automail"
                      name="site_visit_automail"
                      label="Site Visit Automail *"
                      value={formProps.values.site_visit_automail}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.site_visit_automail &&
                        Boolean(formProps.errors.site_visit_automail)
                      }
                      helperText={
                        formProps.touched.site_visit_automail &&
                        formProps.errors.site_visit_automail
                      }
                    />
                  </Col>

                  <Col md={12} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      size="small"
                      multiline
                      rows={2}
                      rowsMax={4}
                      variant="outlined"
                      id="email_for_all"
                      name="email_for_all"
                      label="Email For All *"
                      value={formProps.values.email_for_all}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.email_for_all &&
                        Boolean(formProps.errors.email_for_all)
                      }
                      helperText={
                        formProps.touched.email_for_all &&
                        formProps.errors.email_for_all
                      }
                    />
                  </Col>
                  <Col md={4} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      disabled
                      size="small"
                      variant="outlined"
                      id="longitude"
                      name="longitude"
                      label="Longitude"
                      value={formProps.values.longitude}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.longitude &&
                        Boolean(formProps.errors.longitude)
                      }
                      helperText={
                        formProps.touched.longitude &&
                        formProps.errors.longitude
                      }
                    />
                  </Col>
                  <Col md={4} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      disabled
                      size="small"
                      variant="outlined"
                      id="latitude"
                      name="latitude"
                      label="Latitude"
                      value={formProps.values.latitude}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.latitude &&
                        Boolean(formProps.errors.latitude)
                      }
                      helperText={
                        formProps.touched.latitude && formProps.errors.latitude
                      }
                    />
                  </Col>
                  <Col md={4} className="">
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
                </Row>

                <Divider />

                <Typography className="pt-4" variant="h6">
                  Email For Reports
                </Typography>
                <Row className="pt-4 pb-2">
                  <Col md={12}>
                    <FieldArray
                      name="email_details"
                      render={(arrayHelpers) => (
                        <div>
                          <Row>
                            <Col md={4}>
                              <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="name"
                                name="name_report"
                                label="Name"
                                value={formProps.values.name_report}
                                onChange={formProps.handleChange}
                              >
                              </TextField>
                            </Col>
                            <Col md={4}>
                              <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="phone"
                                name="phone"
                                label="Phone No."
                                value={formProps.values.phone}
                                onChange={formProps.handleChange}
                              >
                              </TextField>
                            </Col>
                            <Col md={4}>
                              <TextField
                                fullWidth
                                type="date"
                                size="small"
                                variant="outlined"
                                id="dob_report"
                                name="dob_report"
                                label="Date Of Birth"
                                value={formProps.values.dob_report}
                                onChange={formProps.handleChange}
                              >
                              </TextField>
                            </Col>
                            <Col md={4}>
                              <TextField
                                fullWidth
                                size="small"
                                select
                                variant="outlined"
                                id="case_type"
                                name="case_type"
                                label="Case Type *"
                                value={formProps.values.case_type}
                                onChange={formProps.handleChange}
                              >
                                <MenuItem value={""}>Select</MenuItem>
                                <MenuItem value={"Commercial"}>
                                  Commercial
                                </MenuItem>
                                <MenuItem value={"Residential"}>
                                  Residential
                                </MenuItem>
                              </TextField>
                            </Col>

                            <Col md={6}>
                              <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="email_for_reports"
                                name="email_for_reports"
                                label="Email"
                                value={formProps.values.email_for_reports}
                                onChange={formProps.handleChange}
                              />
                            </Col>

                            <Col md={2}>
                              <Button
                                color="success"
                                variant="contained"
                                onClick={() => {
                                  arrayHelpers.push({
                                    email_type: "reports",
                                    case_type: formProps.values.case_type,
                                    email: formProps.values.email_for_reports,
                                    phone: formProps.values.phone,
                                    customer_name: formProps.values.name_report,
                                    dob: formProps.values.dob_report,
                                  });
                                  {
                                    formProps.setFieldValue("phone", "");
                                    formProps.setFieldValue("name_report", "");
                                    formProps.setFieldValue("dob_report", "");
                                    formProps.setFieldValue("case_type", "");
                                    formProps.setFieldValue(
                                      "email_for_reports",
                                      ""
                                    );
                                  }
                                }}
                                size="large"

                                // startIcon={<AddIcon fontSize="inherit" />}
                              >
                                {/* Add */}
                                <AddIcon fontSize="inherit" />
                              </Button>
                            </Col>
                          </Row>
                          <Table size="sm" className="mt-3">
                            <thead>
                              <tr>
                                <th>Sr No.</th>
                                <th>Name</th>
                                <th>Phone No.</th>
                                <th>Date of Birth</th>
                                <th>Case Type</th>
                                <th>Email</th>
                                <th>Delete</th>
                              </tr>
                            </thead>
                            <tbody>
                              {console.log(
                                "values",
                                formProps?.values?.email_details
                              )}
                              {formProps?.values?.email_details
                                ?.filter(
                                  (email_details) =>
                                    email_details?.email_type == "reports"
                                )

                                ?.map((email_details, index) => {
                                  return (
                                    <tr key={index}>
                                      <td>{index + 1}</td>
                                      <td>
                                        <TextField
                                          fullWidth
                                          size="small"
                                          disabled
                                          label="Name"
                                          variant="outlined"
                                          name={`email_details.${index}.customer_name`}
                                          value={email_details.customer_name}
                                          id="customer_name"
                                        />
                                      </td>
                                      <td>
                                        <TextField
                                          fullWidth
                                          size="small"
                                          disabled
                                          label="Phone No."
                                          variant="outlined"
                                          name={`email_details.${index}.phone`}
                                          value={email_details.phone}
                                          id="phone"
                                        />
                                      </td>
                                      <td>
                                        <TextField
                                          fullWidth
                                          size="small"
                                          disabled
                                          label="Date Of Birth"
                                          variant="outlined"
                                          name={`email_details.${index}.dob`}
                                          value={email_details.dob}
                                          id="dob"
                                        />
                                      </td>
                                      <td>
                                        <TextField
                                          fullWidth
                                          size="small"
                                          disabled
                                          label="Case Type"
                                          variant="outlined"
                                          name={`email_details.${index}.case_type`}
                                          value={email_details.case_type}
                                          id="case_type"
                                        />
                                      </td>
                                      <td>
                                        <TextField
                                          fullWidth
                                          size="small"
                                          label="Email"
                                          variant="outlined"
                                          name={`email_details.${index}.email`}
                                          value={email_details.email}
                                          id="email"
                                          onChange={formProps.handleChange}
                                        />
                                      </td>

                                      <td>
                                        <Button
                                          color="error"
                                          size="large"
                                          variant="contained"
                                          onClick={() =>
                                            arrayHelpers.remove(index)
                                          }
                                        >
                                          <DeleteIcon fontSize="inherit" />
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

                <Typography className="pt-4" variant="h6">
                  Email For Billing
                </Typography>
                <Row className="pt-4 pb-2">
                  <Col md={12}>
                    <FieldArray
                      name="email_details"
                      render={(arrayHelpers) => (
                        <div>
                          <Row>
                          <Col md={4}>
                              <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="name"
                                name="name_billing"
                                label="Name"
                                value={formProps.values.name_billing}
                                onChange={formProps.handleChange}
                              >
                              </TextField>
                            </Col>
                            <Col md={4}>
                              <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="phone"
                                name="phone"
                                label="Phone No."
                                value={formProps.values.phone}
                                onChange={formProps.handleChange}
                              >
                              </TextField>
                            </Col>
                            <Col md={4}>
                              <TextField
                                fullWidth
                                type="date"
                                size="small"
                                variant="outlined"
                                id="dob_billing"
                                name="dob_billing"
                                label="Date Of Birth"
                                value={formProps.values.dob_billing}
                                onChange={formProps.handleChange}
                              >
                              </TextField>
                            </Col>
                         
                            <Col md={4}>
                              <TextField
                                fullWidth
                                size="small"
                                select
                                variant="outlined"
                                id="case_type2"
                                name="case_type2"
                                label="Case Type *"
                                value={formProps.values.case_type2}
                                onChange={formProps.handleChange}
                              >
                                <MenuItem value={""}>Select</MenuItem>
                                <MenuItem value={"Commercial"}>
                                  Commercial
                                </MenuItem>
                                <MenuItem value={"Residential"}>
                                  Residential
                                </MenuItem>
                              </TextField>
                            </Col>

                            <Col md={6}>
                              <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="email_for_billing"
                                name="email_for_billing"
                                label="Email"
                                value={formProps.values.email_for_billing}
                                onChange={formProps.handleChange}
                              />
                            </Col>

                            <Col md={2}>
                              <Button
                                color="success"
                                variant="contained"
                                onClick={() => {
                                  arrayHelpers.push({
                                    email_type: "billing",
                                    case_type: formProps.values.case_type2,
                                    email: formProps.values.email_for_billing,
                                    phone: formProps.values.phone,
                                    customer_name: formProps.values.name_billing,
                                    dob: formProps.values.dob_billing,
                                  });

                                  formProps.setFieldValue("phone", "");
                                  formProps.setFieldValue("name_billing", "");
                                  formProps.setFieldValue("dob_billing", "");
                                  formProps.setFieldValue("case_type2", "");
                                  formProps.setFieldValue(
                                    "email_for_billing",
                                    ""
                                  );
                                }}
                                size="large"
                              >
                                <AddIcon fontSize="inherit" />
                              </Button>
                            </Col>
                          </Row>
                          <Table size="sm" className="mt-3">
                            <thead>
                              <tr>
                                <th>Sr No.</th>
                                <th>Name</th>
                                <th>Phone No.</th>
                                <th>Date of Birth</th>
                                <th>Case Type</th>
                                <th>Email</th>
                                <th>Delete</th>
                              </tr>
                            </thead>
                            <tbody>
                              {console.log(
                                "values",
                                formProps?.values?.email_details
                              )}
                              {formProps?.values?.email_details
                                ?.filter(
                                  (email_details) =>
                                    email_details?.email_type == "billing"
                                )
                                ?.map((email_details, index) => {
                                  return (
                                    <tr key={index}>
                                      <td>{index + 1}</td>
                                      <td>
                                        <TextField
                                          fullWidth
                                          size="small"
                                          disabled
                                          label="Name"
                                          variant="outlined"
                                          name={`email_details.${index}.customer_name`}
                                          value={email_details.customer_name}
                                          id="customer_name"
                                        />
                                      </td>
                                      <td>
                                        <TextField
                                          fullWidth
                                          size="small"
                                          disabled
                                          label="Phone No."
                                          variant="outlined"
                                          name={`email_details.${index}.phone`}
                                          value={email_details.phone}
                                          id="phone"
                                        />
                                      </td>
                                      <td>
                                        <TextField
                                          fullWidth
                                          size="small"
                                          disabled
                                          label="Date Of Birth"
                                          variant="outlined"
                                          name={`email_details.${index}.dob`}
                                          value={email_details.dob}
                                          id="dob"
                                        />
                                      </td>
                                      <td>
                                        <TextField
                                          fullWidth
                                          size="small"
                                          disabled
                                          label="Case Type"
                                          variant="outlined"
                                          name={`email_details.${index}.case_type`}
                                          value={email_details.case_type}
                                          id="case_type"
                                        />
                                      </td>
                                      <td>
                                        <TextField
                                          fullWidth
                                          disabled
                                          size="small"
                                          label="Email"
                                          variant="outlined"
                                          name={`email_details.${index}.email`}
                                          value={email_details.email}
                                          id="email"
                                          // onChange={formProps.handleChange}
                                        />
                                      </td>

                                      <td>
                                        <Button
                                          color="error"
                                          size="large"
                                          variant="contained"
                                          onClick={() =>
                                            arrayHelpers.remove(index)
                                          }
                                          // startIcon={
                                          //   <DeleteIcon fontSize="inherit" />
                                          // }
                                        >
                                          {/* Delete */}
                                          <DeleteIcon fontSize="inherit" />
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

                <Typography className="pt-4" variant="h6">
                  Login Details
                </Typography>

                <Row className="pt-4 pb-2">
                  <Col md={12}>
                    <FieldArray
                      name="login_details"
                      render={(arrayHelpers) => (
                        <div>
                          <Row>
                            <Col md={4}>
                              <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="email_for_login"
                                name="email_for_login"
                                label="Email"
                                value={formProps.values.email_for_login}
                                onChange={formProps.handleChange}
                              />
                            </Col>

                            <Col>
                              <TextField
                                fullWidth
                                size="small"
                                select
                                variant="outlined"
                                id="role"
                                name="role"
                                label="Role *"
                                value={formProps.values.role}
                                onChange={formProps.handleChange}
                              >
                                <MenuItem value={""}>Select</MenuItem>
                                <MenuItem value={"Lvl1"}>Lvl1</MenuItem>
                                <MenuItem value={"Lvl2"}>Lvl2</MenuItem>
                                <MenuItem value={"Lvl3"}>Lvl3</MenuItem>
                              </TextField>
                            </Col>

                            <Col md={2}>
                              <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="designation"
                                name="designation"
                                label="Designation"
                                value={formProps.values.designation}
                                onChange={formProps.handleChange}
                              />
                            </Col>

                            <Col md={2}>
                              <TextField
                                fullWidth
                                type="password"
                                size="small"
                                variant="outlined"
                                id="password"
                                name="password"
                                label="Password"
                                value={formProps.values.password}
                                onChange={formProps.handleChange}
                              />
                            </Col>

                            <Col>
                              <Button
                                color="success"
                                variant="contained"
                                onClick={() => {
                                  arrayHelpers.push({
                                    email: formProps.values.email_for_login,
                                    role: formProps.values.role,
                                    designation: formProps.values.designation,
                                    password: formProps.values.password,
                                    password_confirmation:
                                      formProps.values.password_confirmation,
                                  });
                                  {
                                    formProps.setFieldValue(
                                      "email_for_login",
                                      ""
                                    );
                                    formProps.setFieldValue("role", "");
                                    formProps.setFieldValue("designation", "");
                                    formProps.setFieldValue("password", "");
                                    formProps.setFieldValue(
                                      "password_confirmation",
                                      ""
                                    );
                                  }
                                }}
                                size="large"
                              >
                                <AddIcon fontSize="inherit" />
                              </Button>
                            </Col>
                          </Row>
                          <Table size="sm" className="mt-3">
                            <thead>
                              <tr>
                                <th>Sr No.</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Designation</th>
                                <th>Delete</th>
                              </tr>
                            </thead>
                            <tbody>
                              {console.log(
                                "values",
                                formProps?.values?.login_details
                              )}
                              {formProps?.values?.login_details?.map(
                                (login_details, index) => {
                                  return (
                                    <tr key={index}>
                                      <td>{index + 1}</td>

                                      <td>
                                        <TextField
                                          fullWidth
                                          disabled
                                          size="small"
                                          label="Email"
                                          variant="outlined"
                                          name={`login_details.${index}.email`}
                                          value={login_details.email}
                                          id="email"
                                          // onChange={formProps.handleChange}
                                        />
                                      </td>
                                      <td>
                                        <TextField
                                          fullWidth
                                          size="small"
                                          disabled
                                          label="Role"
                                          variant="outlined"
                                          name={`login_details.${index}.role`}
                                          value={login_details.role}
                                          id="role"
                                        />
                                      </td>
                                      <td>
                                        <TextField
                                          fullWidth
                                          size="small"
                                          disabled
                                          label="Designation"
                                          variant="outlined"
                                          name={`login_details.${index}.designation`}
                                          value={login_details.designation}
                                          id="designation"
                                        />
                                      </td>

                                      <td>
                                        <Button
                                          color="error"
                                          size="large"
                                          variant="contained"
                                          onClick={() =>
                                            arrayHelpers.remove(index)
                                          }
                                        >
                                          <DeleteIcon fontSize="inherit" />
                                        </Button>
                                      </td>
                                    </tr>
                                  );
                                }
                              )}
                            </tbody>
                          </Table>
                        </div>
                      )}
                    />
                  </Col>
                </Row>

                <Typography className="pt-4" variant="h6">
                  Billing Details
                </Typography>
                <Row className="form-group">
                  <Col md={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          id="area"
                          name="area"
                          value={formProps.values.area}
                          checked={formProps.values.area == 1 ? true : false}
                          onChange={(event) => {
                            event.target.value == 1
                              ? formProps.setFieldValue("area", 0)
                              : formProps.setFieldValue("area", 1);
                          }}
                        />
                      }
                      label="Billing By area"
                    />
                  </Col>

                  <Col md={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          id="distance"
                          name="distance"
                          value={formProps.values.distance}
                          checked={
                            formProps.values.distance == 1 ? true : false
                          }
                          onChange={(event) => {
                            event.target.value == 1
                              ? formProps.setFieldValue("distance", 0)
                              : formProps.setFieldValue("distance", 1);
                          }}
                        />
                      }
                      label="Billing By Distance"
                    />
                  </Col>
                  {/* <Col md={4}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          id="fixed_value"
                          name="fixed_value"
                          value={formProps.values.fixed_value}
                          checked={
                            formProps.values.fixed_value == 1 ? true : false
                          }
                          onChange={(event) => {
                            event.target.value == 1
                              ? formProps.setFieldValue("fixed_value", 0)
                              : formProps.setFieldValue("fixed_value", 1);
                          }}
                        />
                      }
                      label="Billing By Fixed Value"
                    />
                  </Col> */}
                </Row>

                {formProps.values.area == 1 && (
                  <>
                    <Row className="pt-4 pb-2">
                      <Col md={12}>
                        <FieldArray
                          name="area_details"
                          render={(arrayHelpers) => (
                            <div>
                              <Row>
                                <Col md={3}>
                                  <TextField
                                    fullWidth
                                    select
                                    size="small"
                                    variant="outlined"
                                    id="type_of_property"
                                    name="type_of_property"
                                    label="Type Of Property"
                                    value={formProps.values.type_of_property}
                                    onChange={formProps.handleChange}
                                    error={
                                      formProps.touched.type_of_property &&
                                      Boolean(formProps.errors.type_of_property)
                                    }
                                    helperText={
                                      formProps.touched.type_of_property &&
                                      formProps.errors.type_of_property
                                    }
                                  >
                                     <MenuItem value="">Select</MenuItem>
                         {props?.dropdowns?.dropdowns
                           ?.filter((field) => field?.name == "Property Type")[0]
                           ?.drop_down_details?.map((field, i) => (
                             <MenuItem key={i} value={field?.name}>
                               {field?.name}
                             </MenuItem>
                           ))}
                           </TextField>
                                </Col>
                                <Col md={2}>
                                  <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    select
                                    id="billing_by_area"
                                    name="billing_by_area"
                                    label="Billing By Area"
                                    value={formProps.values.billing_by_area}
                                    onChange={formProps.handleChange}
                                    error={
                                      formProps.touched.billing_by_area &&
                                      Boolean(formProps.errors.billing_by_area)
                                    }
                                    helperText={
                                      formProps.touched.billing_by_area &&
                                      formProps.errors.billing_by_area
                                    }
                                    >
                                    <MenuItem value="">Select</MenuItem>
                                     {props?.dropdowns?.dropdowns
                                       ?.filter((field) => field?.name == "Type Of Area")[0]
                                       ?.drop_down_details?.map((field, i) => (
                                         <MenuItem key={i} value={field?.name}>
                                           {field?.name}
                                         </MenuItem>
                                       ))}
                                       </TextField>
                                </Col>
                                <Col md={2}>
                                  <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    id="area_from"
                                    name="area_from"
                                    label="From"
                                    value={formProps.values.area_from}
                                    onChange={formProps.handleChange}
                                    error={
                                      formProps.touched.area_from &&
                                      Boolean(formProps.errors.area_from)
                                    }
                                    helperText={
                                      formProps.touched.area_from &&
                                      formProps.errors.area_from
                                    }
                                  />
                                </Col>
                                <Col md={2}>
                                  <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    id="area_to"
                                    name="area_to"
                                    label="To"
                                    value={formProps.values.area_to}
                                    onChange={formProps.handleChange}
                                    error={
                                      formProps.touched.area_to &&
                                      Boolean(formProps.errors.area_to)
                                    }
                                    helperText={
                                      formProps.touched.area_to &&
                                      formProps.errors.area_to
                                    }
                                  />
                                </Col>
                                <Col md={2}>
                                  <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    id="area_value"
                                    name="area_value"
                                    label="Area Value"
                                    value={formProps.values.area_value}
                                    onChange={formProps.handleChange}
                                    error={
                                      formProps.touched.area_value &&
                                      Boolean(formProps.errors.area_value)
                                    }
                                    helperText={
                                      formProps.touched.area_value &&
                                      formProps.errors.area_value
                                    }
                                  />
                                </Col>
                                {/* <Col md={5}>
                                  <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    id="area_rate"
                                    name="area_rate"
                                    label="Area Rate"
                                    value={formProps.values.area_rate}
                                    onChange={formProps.handleChange}
                                    error={
                                      formProps.touched.area_rate &&
                                      Boolean(formProps.errors.area_rate)
                                    }
                                    helperText={
                                      formProps.touched.area_rate &&
                                      formProps.errors.area_rate
                                    }
                                  />
                                </Col> */}

                                <Col md={1}>
                                  <Button
                                    color="success"
                                    variant="contained"
                                    onClick={() => {
                                      arrayHelpers.push({
                                        type_of_property: formProps.values.type_of_property,
                                        billing_by_area: formProps.values.billing_by_area,
                                        area_from: formProps.values.area_from,
                                        area_to: formProps.values.area_to,
                                        area_value: formProps.values.area_value,
                                        
                                      });
                                    }}
                                    size="large"
                                  >
                                    <AddIcon fontSize="inherit" />
                                  </Button>
                                </Col>
                              </Row>
                              <Table size="sm" className="mt-3">
                                <thead>
                                  <tr>
                                    <th>Sr No</th>
                                    <th>Type of Property</th>
                                    <th>Billing By Area</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Area Value</th>
                                    <th>Delete</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {formProps?.values?.area_details?.map(
                                    (area, index) => {
                                      return (
                                        <tr key={index}>
                                          <td>{index + 1}</td>
                                          <td>
                                            <TextField
                                              fullWidth
                                              size="small"
                                              disabled
                                              label="Area Value"
                                              variant="outlined"
                                              name={`area_details.${index}.type_of_property`}
                                              value={area.type_of_property}
                                              id="type_of_property"
                                            />
                                          </td>
                                          <td>
                                            <TextField
                                              fullWidth
                                              size="small"
                                              disabled
                                              label="Area Value"
                                              variant="outlined"
                                              name={`area_details.${index}.billing_by_area`}
                                              value={area.billing_by_area}
                                              id="billing_by_area"
                                            />
                                          </td>
                                          <td>
                                            <TextField
                                              fullWidth
                                              size="small"
                                              disabled
                                              label="Area Value"
                                              variant="outlined"
                                              name={`area_details.${index}.area_from`}
                                              value={area.area_from}
                                              id="area_from"
                                            />
                                          </td>
                                          <td>
                                            <TextField
                                              fullWidth
                                              size="small"
                                              disabled
                                              label="Area Value"
                                              variant="outlined"
                                              name={`area_details.${index}.area_to`}
                                              value={area.area_to}
                                              id="area_to"
                                            />
                                          </td>
                                          <td>
                                            <TextField
                                              fullWidth
                                              size="small"
                                              disabled
                                              label="Area Value"
                                              variant="outlined"
                                              name={`area_details.${index}.area_value`}
                                              value={area.area_value}
                                              id="area_value"
                                            />
                                          </td>
                                         

                                          <td>
                                            <Button
                                              color="error"
                                              size="large"
                                              variant="contained"
                                              onClick={() =>
                                                arrayHelpers.remove(index)
                                              }
                                              // startIcon={
                                              //   <DeleteIcon fontSize="inherit" />
                                              // }
                                            >
                                              {/* Delete */}
                                              <DeleteIcon fontSize="inherit" />
                                            </Button>
                                          </td>
                                        </tr>
                                      );
                                    }
                                  )}
                                </tbody>
                              </Table>
                            </div>
                          )}
                        />
                      </Col>
                    </Row>
                  </>
                )}
                {formProps.values.distance == 1 && (
                  <>
                    <Row className="pt-4 pb-2">
                      <Col md={12}>
                        <FieldArray
                          name="distance_details"
                          render={(arrayHelpers) => (
                            <div>
                              <Row>
                                <Col md={4}>
                                  <TextField
                                    fullWidth
                                    select
                                    size="small"
                                    variant="outlined"
                                    id="distance_from"
                                    name="distance_from"
                                    label="Distance From"
                                    value={formProps.values.distance_from}
                                    onChange={formProps.handleChange}
                                    error={
                                      formProps.touched.distance_from &&
                                      Boolean(formProps.errors.distance_from)
                                    }
                                    helperText={
                                      formProps.touched.distance_from &&
                                      formProps.errors.distance_from
                                    }
                                    >
                                    <MenuItem value={""}>Select</MenuItem>
                                    <MenuItem value={"Libra Office"}>
                                      Libra Office
                                    </MenuItem>
                                    <MenuItem value={"Bank Office"}>
                                      Bank Office
                                    </MenuItem>
                                  </TextField>
                                </Col>
                               
                                <Col md={4}>
                                  <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    id="from"
                                    name="from"
                                    label="From"
                                    value={formProps.values.from}
                                    onChange={formProps.handleChange}
                                    error={
                                      formProps.touched.from &&
                                      Boolean(formProps.errors.from)
                                    }
                                    helperText={
                                      formProps.touched.from &&
                                      formProps.errors.from
                                    }
                                  />
                                </Col>
                                <Col md={4}>
                                  <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    id="to"
                                    name="to"
                                    label="To"
                                    value={formProps.values.to}
                                    onChange={formProps.handleChange}
                                    error={
                                      formProps.touched.to &&
                                      Boolean(formProps.errors.to)
                                    }
                                    helperText={
                                      formProps.touched.to &&
                                      formProps.errors.to
                                    }
                                  />
                                </Col>
                                <Col md={4}>
                                  <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    id="distance_value"
                                    name="distance_value"
                                    label="Distance Value"
                                    value={formProps.values.distance_value}
                                    onChange={formProps.handleChange}
                                    error={
                                      formProps.touched.distance_value &&
                                      Boolean(formProps.errors.distance_value)
                                    }
                                    helperText={
                                      formProps.touched.distance_value &&
                                      formProps.errors.distance_value
                                    }
                                  />
                                </Col>
                                <Col md={3}>
                                  <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    id="charges"
                                    name="charges"
                                    label="Per KM Charge"
                                    value={formProps.values.charges}
                                    onChange={formProps.handleChange}
                                    error={
                                      formProps.touched.charges &&
                                      Boolean(formProps.errors.charges)
                                    }
                                    helperText={
                                      formProps.touched.charges &&
                                      formProps.errors.charges
                                    }
                                  />
                                </Col>
                                <Col md={3}>
                                  <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    id="avobe"
                                    name="avobe"
                                    label="Above"
                                    value={formProps.values.avobe}
                                    onChange={formProps.handleChange}
                                    error={
                                      formProps.touched.avobe &&
                                      Boolean(formProps.errors.avobe)
                                    }
                                    helperText={
                                      formProps.touched.avobe &&
                                      formProps.errors.avobe
                                    }
                                  />
                                </Col>

                                <Col md={2}>
                                  <Button
                                    color="success"
                                    variant="contained"
                                    onClick={() => {
                                      arrayHelpers.push({
                                        distance_from:
                                          formProps.values.distance_from,
                                        distance_value:
                                          formProps.values.distance_value,
                                        avobe:
                                          formProps.values.avobe,
                                        distance_rate:
                                          formProps.values.distance_rate,
                                        from:
                                          formProps.values.from,
                                        to:
                                          formProps.values.to,
                                      });
                                    }}
                                    size="large"
                                  >
                                    <AddIcon fontSize="inherit" />
                                  </Button>
                                </Col>
                              </Row>
                              <Table size="sm" className="mt-3">
                                <thead>
                                  <tr>
                                    <th>Sr No</th>
                                    <th>Distance From</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Distance Value</th>
                                    <th>Per KM Charge</th>
                                    <th>Above</th>
                                    <th>Delete</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {formProps?.values?.distance_details?.map(
                                    (distance, index) => {
                                      return (
                                        <tr key={index}>
                                          <td>{index + 1}</td>
                                          <td>
                                            <TextField
                                              fullWidth
                                              size="small"
                                              disabled
                                              label="Distance From"
                                              variant="outlined"
                                              name={`distance_details.${index}.distance_from`}
                                              value={distance.distance_from}
                                              id="distance_from"
                                            />
                                          </td>
                                          <td>
                                            <TextField
                                              fullWidth
                                              size="small"
                                              disabled
                                              label="From"
                                              variant="outlined"
                                              name={`distance_details.${index}.from`}
                                              value={distance.from}
                                              id="from"
                                            />
                                          </td>
                                          <td>
                                            <TextField
                                              fullWidth
                                              size="small"
                                              disabled
                                              label="To"
                                              variant="outlined"
                                              name={`distance_details.${index}.to`}
                                              value={distance.to}
                                              id="to"
                                            />
                                          </td>
                                          <td>
                                            <TextField
                                              fullWidth
                                              size="small"
                                              disabled
                                              label="Distance Value"
                                              variant="outlined"
                                              name={`distance_details.${index}.distance_value`}
                                              value={distance.distance_value}
                                              id="distance_value"
                                            />
                                          </td>
                                          <td>
                                            <TextField
                                              fullWidth
                                              size="small"
                                              disabled
                                              label="Distance Value"
                                              variant="outlined"
                                              name={`distance_details.${index}.avobe`}
                                              value={distance.avobe}
                                              id="avobe"
                                            />
                                          </td>
                                          <td>
                                            <TextField
                                              fullWidth
                                              size="small"
                                              disabled
                                              label="Per Km Charges"
                                              variant="outlined"
                                              name={`distance_details.${index}.charges`}
                                              value={distance.charges}
                                              id="charges"
                                            />
                                          </td>
                                          <td>
                                            <TextField
                                              fullWidth
                                              size="small"
                                              disabled
                                              label="Avobe"
                                              variant="outlined"
                                              name={`distance_details.${index}.avobe`}
                                              value={distance.avobe}
                                              id="avobe"
                                            />
                                          </td>
                                        

                                          <td>
                                            <Button
                                              color="error"
                                              size="large"
                                              variant="contained"
                                              onClick={() =>
                                                arrayHelpers.remove(index)
                                              }
                                              // startIcon={
                                              //   <DeleteIcon fontSize="inherit" />
                                              // }
                                            >
                                              {/* Delete */}
                                              <DeleteIcon fontSize="inherit" />
                                            </Button>
                                          </td>
                                        </tr>
                                      );
                                    }
                                  )}
                                </tbody>
                              </Table>
                            </div>
                          )}
                        />
                      </Col>
                    </Row>
                  </>
                )}
                {formProps.values.fixed_value == 1 && (
                  <Row className="form-group">
                    <Col md={6}>
                      <Label>Fixed Value Rate</Label>
                      <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        id="fixed_value_rate"
                        name="fixed_value_rate"
                        label="Fixed Value Rate"
                        value={formProps.values.fixed_value_rate}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.fixed_value_rate &&
                          Boolean(formProps.errors.fixed_value_rate)
                        }
                        helperText={
                          formProps.touched.fixed_value_rate &&
                          formProps.errors.fixed_value_rate
                        }
                      />
                    </Col>
                  </Row>
                )}

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
    banks: state.banks,
    paymentMaster: state.paymentMaster,
    dropdowns: state.dropdowns,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    branchesEditData: (data) => dispatch(branchesEditData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBranch);
