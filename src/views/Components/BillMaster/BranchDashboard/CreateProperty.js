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
} from "reactstrap";

import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@mui/icons-material/Edit";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Switch from "@mui/material/Switch";
import moment from "moment";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";

//*Actions
import { postPropertiesData } from "../../../Redux/Creators/PropertiesCreators";

//* compo
import CreateProjects from "../../Components/Projects/CreateProjects";

function CreateProperty(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values In Create form", values);

    let data = {
      token: token,
      pageno: 1,
      pageSize: 10000,
      branch_id: props?.login?.login?.Branch?.branch?.id,
      //   employee_id: props.login?.login?.user?.id,
      status: 1,
      prospect_no: values.prospect_no,
      project_id: values.project_id,
      customer_name: values.customer_name,
      surname: values.surname,
      contact_person_name: values.contact_person_name,
      contact_person_cell_no: values.contact_person_cell_no,
      location: values.location,
      legal_address: values.legal_address,
      state: values.state,
      city: values.city,
      pin_code: values.pin_code,
      country: values.country,
      tp_no: values.tp_no,
      survey_no: values.survey_no,
      fp_no: values.fp_no,
      sp_no: values.sp_no,
      op_no: values.op_no,
      plot_no: values.plot_no,
      block_no: values.block_no,
      flat_no: values.flat_no,
      khasra_no: values.khasra_no,
      nearby_landmark: values.nearby_landmark,
      latitude: values.latitude,
      longitude: values.longitude,
      postal_address: values.postal_address,
      remark: values.remark,
      vertical: values.vertical,
      product: values.product,
      bank_vertical_id: values.bank_vertical_id,
      bank_product_id: values.bank_product_id,
      branch_name: values.branch_name,
      branch_id: values.branch_id,
      bank_id: values.bank_id,
      bank_no: values.bank_no,
      inspection_date_time: values.inspection_date_time,
      document_details: [
        { document_name: "Pan Card", status: values.pancard_status },
        { document_name: "Adhar Card", status: values.adharcard_status },
        { document_name: "Tax Details", status: values.taxdetails_status },
        { document_name: "Index XI", status: values.index11_status },
        { document_name: "Sale Deed", status: values.saledeed_status },
        {
          document_name: "Sale Certificate",
          status: values.salecertificate_status,
        },
      ],
    };

    console.log("submit data", data);
    props.postPropertiesData(data);
    setSubmitting(false);
  };

  return (
    <div>
      <Tooltip title="Create" placement="top">
        <Button
          variant="outlined"
          color="success"
          size="small"
          className="p-1"
          onClick={() => toggle()}
        >
          Create
        </Button>
      </Tooltip>
      <Modal
        className="modal-xl"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Create Property</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              //* Customer Dets
              customer_name: "",
              surname: "",
              contact_person_name: "",
              contact_person_cell_no: "",
              location: "",
              legal_address: "",
              state: "",
              city: "",
              pin_code: "",
              country: "",
              tp_no: "",
              survey_no: "",
              fp_no: "",
              sp_no: "",
              op_no: "",
              plot_no: "",
              block_no: "",
              flat_no: "",
              khasra_no: "",
              nearby_landmark: "",
              latitude: "",
              longitude: "",
              postal_address: "",
              remark: "",

              //!

              //* Bank Dets
              branch_name: props?.login?.login?.Branch?.branch?.branch_name,
              branch_id: props?.login?.login?.Branch?.branch?.id,
              bank_id: props?.login?.login?.Branch?.branch?.bank?.id,
              bank_no: props?.login?.login?.Branch?.branch?.bank_code,
              prospect_no: "",
              //*
              project_name: "",
              project_id: "",
              //*
              documents_submitted: "",
              inspection_date_time: moment().format("YYYY-MM-DD"),
              vertical: "",
              product: "",
              //*
              bank_vertical_id: "",
              bank_product_id: "",
              //*
              document_attachment_name: "",
              file_upload: "",
              //!

              //*status

              pancard_status: 0,
              adharcard_status: 0,
              taxdetails_status: 0,
              index11_status: 0,
              saledeed_status: 0,
              salecertificate_status: 0,
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              branch_name: Yup.string().required("Branch Name is required"),
              project_id: Yup.string().required("Project is required"),
              country: Yup.string().required("Country is required"),
              tp_no: Yup.string().required("TP Number is required"),
              survey_no: Yup.string().required("Survey Number is required"),
              state: Yup.string().required("State is required"),
              city: Yup.string().required("City is required"),

              nearby_landmark: Yup.string().required(
                "Nearby Landmark is required"
              ),

              inspection_date_time: Yup.string().required(
                "Inspection Date & Time is required"
              ),
              remark: Yup.string().required("Remarks is required"),

              bank_vertical_id: Yup.string().required("Vertical is required"),
              bank_product_id: Yup.string().required("Product is required"),
            })}
          >
            {(formProps) => {
              const branchProps = {
                options: props?.branches?.isLoading
                  ? []
                  : props?.branches?.branches?.data?.map((branch) => branch),
              };

              const projectsProps = {
                options: props?.projects?.isLoading
                  ? []
                  : props?.projects?.projects?.data?.map((project) => project),
              };

              const verticalsProps = {
                options: props?.bankVerticals?.isLoading
                  ? []
                  : props.bankVerticals.bankVerticals?.data?.map(
                      (vertical) => vertical
                    ),
              };
              const productProps = {
                options:
                  formProps.values.bank_vertical_id == ""
                    ? []
                    : props?.bankProducts?.bankProducts?.data
                        ?.filter(
                          (product) =>
                            formProps.values.bank_vertical_id ==
                            product.bank_vertical_id
                        )
                        ?.map((product) => product),
              };

              console.log("bank_product_id", formProps.values.bank_product_id);

              return (
                <Form>
                  <Typography variant={"h4"}>Customer Details</Typography>
                  <Divider />
                  <br />
                  <Row className="form-group">
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="prospect_no"
                        name="prospect_no"
                        label="Prospect No"
                        variant="standard"
                        value={formProps.values.prospect_no}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.prospect_no &&
                          Boolean(formProps.errors.prospect_no)
                        }
                        helperText={
                          formProps.touched.prospect_no &&
                          formProps.errors.prospect_no
                        }
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="customer_name"
                        name="customer_name"
                        label="Customer Name"
                        variant="standard"
                        value={formProps.values.customer_name}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.customer_name &&
                          Boolean(formProps.errors.customer_name)
                        }
                        helperText={
                          formProps.touched.customer_name &&
                          formProps.errors.customer_name
                        }
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="surname"
                        name="surname"
                        label="Surname"
                        variant="standard"
                        value={formProps.values.surname}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.surname &&
                          Boolean(formProps.errors.surname)
                        }
                        helperText={
                          formProps.touched.surname && formProps.errors.surname
                        }
                      />
                    </Col>
                    <Col md={10} className="pb-4">
                      <>
                        <Autocomplete
                          id="contact-autocomplete"
                          options={projectsProps.options}
                          getOptionLabel={(project) =>
                            // `${project?.project_name} ${project?.id}`
                            project?.project_name
                          }
                          onChange={(e, value) =>
                            formProps.setFieldValue(
                              "project_id",
                              value?.id || ""
                            )
                          }
                          onOpen={formProps.handleBlur}
                          includeInputInList
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              error={Boolean(
                                formProps.touched.project_id &&
                                  formProps.errors.project_id
                              )}
                              fullWidth
                              helperText={
                                formProps.touched.project_id &&
                                formProps.errors.project_id
                              }
                              label="Project"
                              name="project_id"
                              variant="outlined"
                            />
                          )}
                        />
                      </>
                    </Col>
                    <Col md={2} className="pb-4 pr-5">
                      <CreateProjects />
                    </Col>
                    <Col md={4}>
                      <TextField
                        fullWidth
                        id="contact_person_name"
                        name="contact_person_name"
                        label="Contact Person Name"
                        variant="standard"
                        value={formProps.values.contact_person_name}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.contact_person_name &&
                          Boolean(formProps.errors.contact_person_name)
                        }
                        helperText={
                          formProps.touched.contact_person_name &&
                          formProps.errors.contact_person_name
                        }
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="contact_person_cell_no"
                        name="contact_person_cell_no"
                        label="Contact Person Cell No"
                        variant="standard"
                        value={formProps.values.contact_person_cell_no}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.contact_person_cell_no &&
                          Boolean(formProps.errors.contact_person_cell_no)
                        }
                        helperText={
                          formProps.touched.contact_person_cell_no &&
                          formProps.errors.contact_person_cell_no
                        }
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="location"
                        name="location"
                        label="Location/Area"
                        variant="standard"
                        value={formProps.values.location}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.location &&
                          Boolean(formProps.errors.location)
                        }
                        helperText={
                          formProps.touched.location &&
                          formProps.errors.location
                        }
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="property_type"
                        name="property_type"
                        label="Property Type"
                        variant="standard"
                        value={formProps.values.property_type}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.property_type &&
                          Boolean(formProps.errors.property_type)
                        }
                        helperText={
                          formProps.touched.property_type &&
                          formProps.errors.property_type
                        }
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="state"
                        name="state"
                        label="State"
                        variant="standard"
                        value={formProps.values.state}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.state &&
                          Boolean(formProps.errors.state)
                        }
                        helperText={
                          formProps.touched.state && formProps.errors.state
                        }
                      />
                    </Col>
                    <Col md={12} className="pb-4">
                      <TextField
                        fullWidth
                        id="legal_address"
                        name="legal_address"
                        label="Legal Address"
                        variant="standard"
                        value={formProps.values.legal_address}
                        onChange={formProps.handleChange}
                      />
                    </Col>
                    <Col md={12} className="pb-4">
                      <TextField
                        fullWidth
                        id="postal_address"
                        name="postal_address"
                        label="Postal Address"
                        variant="standard"
                        value={formProps.values.postal_address}
                        onChange={formProps.handleChange}
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="city"
                        name="city"
                        label="City"
                        variant="standard"
                        value={formProps.values.city}
                        onChange={formProps.handleChange}
                      />
                    </Col>
                    {/* <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="property_type"
                      name="property_type"
                      label="Property Type"
                      variant="standard"
                      value={formProps.values.property_type}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.property_type &&
                        Boolean(formProps.errors.property_type)
                      }
                      helperText={
                        formProps.touched.property_type &&
                        formProps.errors.property_type
                      }
                    />
                  </Col> */}
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="pin_code"
                        name="pin_code"
                        label="Pin Code"
                        variant="standard"
                        value={formProps.values.pin_code}
                        onChange={formProps.handleChange}
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="country"
                        name="country"
                        label="Country *"
                        variant="standard"
                        value={formProps.values.country}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.country &&
                          Boolean(formProps.errors.country)
                        }
                        helperText={
                          formProps.touched.country && formProps.errors.country
                        }
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="tp_no"
                        name="tp_no"
                        label="TP No *"
                        variant="standard"
                        value={formProps.values.tp_no}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.tp_no &&
                          Boolean(formProps.errors.tp_no)
                        }
                        helperText={
                          formProps.touched.tp_no && formProps.errors.tp_no
                        }
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="survey_no"
                        name="survey_no"
                        label="Survey No"
                        variant="standard"
                        value={formProps.values.survey_no}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.survey_no &&
                          Boolean(formProps.errors.survey_no)
                        }
                        helperText={
                          formProps.touched.survey_no &&
                          formProps.errors.survey_no
                        }
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="fp_no"
                        name="fp_no"
                        label="FP No"
                        variant="standard"
                        value={formProps.values.fp_no}
                        onChange={formProps.handleChange}
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="sp_no"
                        name="sp_no"
                        label="SP No"
                        variant="standard"
                        value={formProps.values.sp_no}
                        onChange={formProps.handleChange}
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="op_no"
                        name="op_no"
                        label="OP No"
                        variant="standard"
                        value={formProps.values.op_no}
                        onChange={formProps.handleChange}
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="plot_no"
                        name="plot_no"
                        label="Plot No"
                        variant="standard"
                        value={formProps.values.plot_no}
                        onChange={formProps.handleChange}
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="block_no"
                        name="block_no"
                        label="Block No"
                        variant="standard"
                        value={formProps.values.block_no}
                        onChange={formProps.handleChange}
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="flat_no"
                        name="flat_no"
                        label="Flat No"
                        variant="standard"
                        value={formProps.values.flat_no}
                        onChange={formProps.handleChange}
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="khasra_no"
                        name="khasra_no"
                        label="Khasra No"
                        variant="standard"
                        value={formProps.values.khasra_no}
                        onChange={formProps.handleChange}
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="nearby_landmark"
                        name="nearby_landmark"
                        label="Nearby Landmark *"
                        variant="standard"
                        value={formProps.values.nearby_landmark}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.nearby_landmark &&
                          Boolean(formProps.errors.nearby_landmark)
                        }
                        helperText={
                          formProps.touched.nearby_landmark &&
                          formProps.errors.nearby_landmark
                        }
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="latitude"
                        name="latitude"
                        label="Latitude *"
                        variant="standard"
                        value={formProps.values.latitude}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.latitude &&
                          Boolean(formProps.errors.latitude)
                        }
                        helperText={
                          formProps.touched.latitude &&
                          formProps.errors.latitude
                        }
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="longitude"
                        name="longitude"
                        label="Longitude *"
                        variant="standard"
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
                    <Col md={12} className="pb-4">
                      <TextField
                        fullWidth
                        id="remark"
                        name="remark"
                        label="Special instructions to engineer  *"
                        variant="standard"
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
                  <Typography variant={"h6"}>Bank Details</Typography>
                  <Divider />
                  <br />
                  <Row className="form-group">
                    <Col md={6} className="pb-4">
                      {/* <FormLabel>Branch name</FormLabel> */}
                      <>
                        {/* <Autocomplete
                          id="branch-autocomplete"
                          options={branchProps.options}
                          getOptionLabel={(branch) => branch?.branch_name}
                          onChange={(e, value) => {
                            formProps.setFieldValue(
                              "branch_name",
                              value?.branch_name || ""
                            );
                            formProps.setFieldValue(
                              "branch_id",
                              value?.id || ""
                            );
                            formProps.setFieldValue(
                              "bank_id",
                              value?.bank?.id || ""
                            );
                            formProps.setFieldValue(
                              "bank_no",
                              value?.bank?.bank_code || ""
                            );
                          }}
                          onOpen={formProps.handleBlur}
                          includeInputInList
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              error={Boolean(
                                formProps.touched.branch_name &&
                                  formProps.errors.branch_name
                              )}
                              fullWidth
                              helperText={
                                formProps.touched.branch_name &&
                                formProps.errors.branch_name
                              }
                              label="Branch Name"
                              name="branch_name"
                              variant="outlined"
                            />
                          )}
                        /> */}
                        <TextField
                          fullWidth
                          id="branch_name"
                          name="branch_name"
                          label="Branch Name"
                          disabled
                          variant="outlined"
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
                      </>
                    </Col>

                    <Col md={6} className="pb-4">
                      <TextField
                        fullWidth
                        id="inspection_date_time"
                        name="inspection_date_time"
                        size="medium"
                        // placeholder="Inspection Date & Time *"
                        label="Inspection Date & Time *"
                        variant="outlined"
                        shrink={true}
                        type="date"
                        value={formProps.values.inspection_date_time}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.inspection_date_time &&
                          Boolean(formProps.errors.inspection_date_time)
                        }
                        helperText={
                          formProps.touched.inspection_date_time &&
                          formProps.errors.inspection_date_time
                        }
                      />
                    </Col>

                    <Col md={6} className="pb-4">
                      <>
                        <Autocomplete
                          id="bank_vertical_id"
                          options={verticalsProps.options}
                          getOptionLabel={(vertical) =>
                            // `${project?.project_name} ${project?.id}`
                            vertical?.name
                          }
                          onChange={(e, value) =>
                            formProps.setFieldValue(
                              "bank_vertical_id",
                              value?.id || ""
                            )
                          }
                          onOpen={formProps.handleBlur}
                          includeInputInList
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              error={Boolean(
                                formProps.touched.bank_vertical_id &&
                                  formProps.errors.bank_vertical_id
                              )}
                              fullWidth
                              helperText={
                                formProps.touched.bank_vertical_id &&
                                formProps.errors.bank_vertical_id
                              }
                              label="Bank Vertical"
                              name="bank_vertical_id"
                              variant="outlined"
                            />
                          )}
                        />
                      </>
                    </Col>

                    <Col md={6} className="pb-4">
                      <>
                        <Autocomplete
                          id="bank_product_id"
                          options={productProps.options}
                          getOptionLabel={(product) =>
                            // `${project?.project_name} ${project?.id}`
                            product?.name
                          }
                          onChange={(e, value) =>
                            formProps.setFieldValue(
                              "bank_product_id",
                              value?.id || ""
                            )
                          }
                          onOpen={formProps.handleBlur}
                          includeInputInList
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              error={Boolean(
                                formProps.touched.bank_product_id &&
                                  formProps.errors.bank_product_id
                              )}
                              fullWidth
                              helperText={
                                formProps.touched.bank_product_id &&
                                formProps.errors.bank_product_id
                              }
                              label="Bank Product"
                              name="bank_product_id"
                              variant="outlined"
                            />
                          )}
                        />
                      </>
                    </Col>
                  </Row>
                  <Row className="pr-3">
                    <Col md={9}>
                      <Typography variant={"h6"}>Document Details</Typography>
                    </Col>
                    <Col>
                      <Switch
                        className="float-right"
                        // {...label}
                        defaultChecked
                        size="small"
                        color="success"
                      />
                      <strong className="float-right">Send Mail</strong>
                    </Col>

                    <Col className="pb-1">
                      <Button size="small" variant="contained" color="warning">
                        Edit
                      </Button>
                    </Col>
                  </Row>

                  <Divider />
                  <br />

                  {/* <strong>Documents Submitted</strong> */}

                  {/* <Divider /> */}
                  <Row className="form-group">
                    {/* <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="documents_submitted"
                      name="documents_submitted"
                      label="Documents Submitted *"
                      variant="standard"
                      value={formProps.values.documents_submitted}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.documents_submitted &&
                        Boolean(formProps.errors.documents_submitted)
                      }
                      helperText={
                        formProps.touched.documents_submitted &&
                        formProps.errors.documents_submitted
                      }
                    />
                  </Col> */}
                    <Col md={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            id="pancard_status"
                            name="pancard_status"
                            value={formProps.values.pancard_status}
                            checked={
                              formProps.values.pancard_status == 1
                                ? true
                                : false
                            }
                            onChange={(event) => {
                              event.target.value == 1
                                ? formProps.setFieldValue("pancard_status", 0)
                                : formProps.setFieldValue("pancard_status", 1);
                            }}
                          />
                        }
                        label="Pan Card"
                      />
                    </Col>

                    <Col md={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            id="adharcard_status"
                            name="adharcard_status"
                            value={formProps.values.adharcard_status}
                            checked={
                              formProps.values.adharcard_status == 1
                                ? true
                                : false
                            }
                            onChange={(event) => {
                              event.target.value == 1
                                ? formProps.setFieldValue("adharcard_status", 0)
                                : formProps.setFieldValue(
                                    "adharcard_status",
                                    1
                                  );
                            }}
                          />
                        }
                        label="Adhar Card"
                      />
                    </Col>
                    <Col md={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            id="taxdetails_status"
                            name="taxdetails_status"
                            value={formProps.values.taxdetails_status}
                            checked={
                              formProps.values.taxdetails_status == 1
                                ? true
                                : false
                            }
                            onChange={(event) => {
                              event.target.value == 1
                                ? formProps.setFieldValue(
                                    "taxdetails_status",
                                    0
                                  )
                                : formProps.setFieldValue(
                                    "taxdetails_status",
                                    1
                                  );
                            }}
                          />
                        }
                        label="Tax Details"
                      />
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Col md={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            id="index11_status"
                            name="index11_status"
                            value={formProps.values.index11_status}
                            checked={
                              formProps.values.index11_status == 1
                                ? true
                                : false
                            }
                            onChange={(event) => {
                              event.target.value == 1
                                ? formProps.setFieldValue("index11_status", 0)
                                : formProps.setFieldValue("index11_status", 1);
                            }}
                          />
                        }
                        label="Index XI"
                      />
                    </Col>
                    <Col md={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            id="saledeed_status"
                            name="saledeed_status"
                            value={formProps.values.saledeed_status}
                            checked={
                              formProps.values.saledeed_status == 1
                                ? true
                                : false
                            }
                            onChange={(event) => {
                              event.target.value == 1
                                ? formProps.setFieldValue("saledeed_status", 0)
                                : formProps.setFieldValue("saledeed_status", 1);
                            }}
                          />
                        }
                        label="Sale Deed"
                      />
                    </Col>
                    <Col md={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            id="salecertificate_status"
                            name="salecertificate_status"
                            value={formProps.values.salecertificate_status}
                            checked={
                              formProps.values.salecertificate_status == 1
                                ? true
                                : false
                            }
                            onChange={(event) => {
                              event.target.value == 1
                                ? formProps.setFieldValue(
                                    "salecertificate_status",
                                    0
                                  )
                                : formProps.setFieldValue(
                                    "salecertificate_status",
                                    1
                                  );
                            }}
                          />
                        }
                        label="Sale Certificate"
                      />
                    </Col>

                    <br />
                    <br />
                  </Row>

                  <Row>
                    <Button
                      color="success"
                      variant="contained"
                      disabled={formProps.isSubmitting}
                      fullWidth
                      type="submit"
                    >
                      Create
                    </Button>
                  </Row>
                </Form>
              );
            }}
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    branches: state.branches,
    projects: state.projects,
    bankVerticals: state.bankVerticals,
    bankProducts: state.bankProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postPropertiesData: (data) => dispatch(postPropertiesData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProperty);
