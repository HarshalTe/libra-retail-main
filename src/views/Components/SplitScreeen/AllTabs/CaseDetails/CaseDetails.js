import React from "react";
import { connect } from "react-redux";
import { Row, Col, Table } from "reactstrap";
import Button from "@mui/material/Button";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { Divider, Typography } from "@mui/material";

//*Actions
import { editPropertiesData } from "../../../../../Redux/Creators/ViewWorkInProgressCreators";
import { getDropdownsList } from "../../../../../Redux/Creators/DropdownCreators";

//*Compoenets
import LinerLoader from "components/Loaders/LinerLoader";
import Box from "@mui/material/Box";
import LinearProgressWithLabel from "../ProjectDetails/LinearProgressWithLabel";
import ADD_ONE from "../../../../../Redux/Types/ActionTypes";
import { useDispatch } from "react-redux";
import { editProgressData } from "../../../../../Redux/Creators/ProgressCreators";
import Autocomplete from "@mui/material/Autocomplete";

function CaseDetails(props) {
  const [progress, setProgress] = React.useState(0);
  const dispatch = useDispatch();

  const handleSubmit = (values, { setSubmitting }) => {
    const token = props.login?.login?.token;

    const value = 1;

    let progressData = {
      id: props?.property?.property?.id,
      casesDetailsProgress: 1,
    };

    props.editProgressData(
      progressData,
      props.setValue,
      value,
      props.login?.login?.token
    );

    // props.editPropertiesData(data, props.setValue, value);
    // setSubmitting(true);
    handleSubmit2(values, { setSubmitting });
  };
  const handleSubmit2 = (values, { setSubmitting }) => {
    const token = props.login?.login?.token;
    let data = {
      token: token,
      pageno: 1,
      pageSize: 10000,
      id: values?.id,
      //*Case Details
      application_no: values?.application_no,
      prospect_no: values?.prospect_no,
      applicant_name: values?.applicant_name,
      customer_name: values?.customer_name,
      surname: values?.surname,
      branch_name: values?.branch?.branch_name,
      contact_person_name: values?.contact_person_name,
      contact_person_cell_no: values?.contact_person_cell_no,
      property_type: values?.property_type,

      //*Type of OwnerShip
      property_ownerships: values?.property_ownerships,
      //*
      postal_address: values?.postal_address,
      legal_address: values?.legal_address,
      name_per_nameplate: values?.name_per_nameplate,
      is_site_address_matching: values?.is_site_address_matching,
      is_customer_name_matching: values?.is_customer_name_matching,
      is_society_name_matching: values?.is_society_name_matching,
      office_remark: values?.office_remark,

      //*Legal Address
      survey_no: values?.survey_no,
      tp_no: values?.tp_no,
      fp_no: values?.fp_no,
      sp_no: values?.sp_no,
      op_no: values?.op_no,
      plot_no: values?.plot_no,
      block_no: values?.block_no,
      khasra_no: values?.khasra_no,
      village: values?.village,
      mouje: values?.mouje,
      district_name: values?.district_name,
      state: values?.state,
      pincode: values?.pincode,

      //* Next
      phase: values?.phase,
      flat_no: values?.flat_no,
      unit_name: values?.unit_name,
      road_name: values?.road_name,
      street_name: values?.street_name,
      area: values?.area,

      city: values?.city,
      location: values?.location,
      nearby_landmark: values?.nearby_landmark,
      taluka: values?.taluka,
      district: values?.district,
      is_address_missing: values?.is_address_missing,
      configuration: values.configuration,
      bank_vertical_id: values.bank_vertical_id,
      bank_product_id: values.bank_product_id,
      branch_id: values.branch_id,
      bank_id: values.bank_id,
      bank_no: values.bank_no,
      unit_name_as_per_door: values.unit_name_as_per_door,
      sector_no: values.sector_no,
      ward_no: values.ward_no,
      bank_sub_product: values.bank_sub_product,
      name_of_initiator: values.name_of_initiator,
    };

    const value = 1;

    // props.editProgressData(progressData, props.setValue, value,props.login?.login?.token);

    props.editPropertiesData(data, props.setValue, value);
    setSubmitting(true);
  };
  const formPropsLength = 44;
  console.log(
    "props?.dropdowns?.dropdowns?.filter",
    props?.dropdowns?.dropdowns?.filter(
      (field) => field?.name == "Property Type"
    )[0]?.drop_down_details
  );

  return (
    <>
      {props.property.isLoading ? (
        <div>
          <LinerLoader />
        </div>
      ) : (
        <div>
          <br />
          <Formik
            initialValues={{
              id: props?.property?.property?.id,
              //*Case Details
              application_no: props?.property?.property?.application_no,
              prospect_no: props?.property?.property?.prospect_no,
              applicant_name: props?.property?.property?.applicant_name,
              customer_name: props?.property?.property?.customer_name,
              surname: props?.property?.property?.surname,
              contact_person_name:
                props?.property?.property?.contact_person_name,
              contact_person_cell_no:
                props?.property?.property?.contact_person_cell_no,
              property_type: props?.property?.property?.property_type,

              //*Type of OwnerShip
              type_of_ownership: "",
              owner_name: "",
              share: "",
              property_ownerships:
                props?.property?.property?.property_ownerships,
              //*
              postal_address: props?.property?.property?.postal_address,
              legal_address: props?.property?.property?.legal_address,
              name_per_nameplate: props?.property?.property?.name_per_nameplate,
              is_site_address_matching:
                props?.property?.property?.is_site_address_matching == 1
                  ? "Yes"
                  : props?.property?.property?.is_site_address_matching == 0
                  ? "No"
                  : "N/A",
              is_customer_name_matching:
                props?.property?.property?.is_customer_name_matching == 1
                  ? "Yes"
                  : props?.property?.property?.is_customer_name_matching == 0
                  ? "No"
                  : "N/A",
              is_society_name_matching:
                props?.property?.property?.is_society_name_matching == 1
                  ? "Yes"
                  : props?.property?.property?.is_society_name_matching == 0
                  ? "No"
                  : "N/A",
              office_remark: props?.property?.property?.office_remark,

              //*Legal Address
              survey_no: props?.property?.property?.survey_no,
              tp_no: props?.property?.property?.tp_no,
              fp_no: props?.property?.property?.fp_no,
              sp_no: props?.property?.property?.sp_no,
              op_no: props?.property?.property?.op_no,
              plot_no: props?.property?.property?.plot_no,
              block_no: props?.property?.property?.block_no,
              khasra_no: props?.property?.property?.khasra_no,
              village: props?.property?.property?.village,
              mouje: props?.property?.property?.mouje,
              district_name: props?.property?.property?.district_name,
              state: props?.property?.property?.state,
              pincode: props?.property?.property?.pincode,

              //* Next
              phase: props?.property?.property?.phase,
              flat_no: props?.property?.property?.flat_no,
              unit_name: props?.property?.property?.unit_name,
              road_name: props?.property?.property?.road_name,
              street_name: props?.property?.property?.street_name,
              area: props?.property?.property?.area,

              city: props?.property?.property?.city,
              location: props?.property?.property?.location,
              nearby_landmark: props?.property?.property?.nearby_landmark,
              taluka: props?.property?.property?.taluka,
              district: props?.property?.property?.district,
              is_address_missing: props?.property?.property?.is_address_missing,
              configuration: props?.property?.property?.configuration,
              bank_vertical_id: props?.property?.property?.bank_vertical_id,
              bank_product_id: props?.property?.property?.bank_product_id,
              branch_id: props?.property?.property?.branch_id,
              bank_no: props?.property?.property?.bank_no,
              bank_id: props?.property?.property?.bank_id,
              bank_vertical: props?.property?.property?.bank_vertical?.name,
              bank_product: props?.property?.property?.bank_product?.name,
              branch_name: props?.property?.property?.branch?.branch_name,
              unit_name_as_per_door: props?.property?.property?.unit_name_as_per_door,
              sector_no: props?.property?.property?.sector_no,
              ward_no: props?.property?.property?.ward_no,
              bank_sub_product: props?.property?.property?.bank_sub_product,
              name_of_initiator: props?.property?.property?.name_of_initiator,
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              // branch_name: Yup.string().required("Branch Name is required"),
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
              // console.log("projectsProps",projectsProps)

              const verticalsProps = {
                options: props?.bankVerticals?.isLoading
                  ? []
                  : props.bankVerticals.bankVerticals?.data
                      ?.filter(
                        (product) =>
                          formProps?.values.branch_name ==
                          product.branch?.branch_name
                      )
                      ?.map((vertical) => vertical),
              };
              // const verticalsProps = {
              //   options: props?.bankVerticals?.isLoading
              //     ? []
              //     : props.bankVerticals.bankVerticals?.data?.filter((row)=>{
              //       console.log("row?.name",row?.branch?.branch_name,formProps?.values.branch_name,row?.branch?.branch_name == formProps?.values.branch_name)
              //       return (
              //         (row?.name == formProps?.values.branch_name
              //     ))
              //     })
              //     // .map(
              //     //     (vertical) => vertical
              //     //   ),
              // };
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
              return (
                <Form>
                  <div className="pb-4">
                    <Box sx={{ width: "100%" }}>
                      <LinearProgressWithLabel
                        value={
                          (Object?.values(formProps?.values)?.filter(
                            (val) => val !== null && val?.length > 0
                          )?.length /
                            Object?.keys(formProps?.values)?.length) *
                          100
                        }
                      />
                    </Box>
                  </div>
                  <Typography variant={"h5"}>Case Details</Typography>
                  <Divider />
                  <br />
                  <Row className="form-group">
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="applicant_name"
                        name="applicant_name"
                        label="Applicant Name "
                        variant="standard"
                        value={formProps.values.applicant_name}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.applicant_name)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                        error={
                          formProps.touched.applicant_name &&
                          Boolean(formProps.errors.applicant_name)
                        }
                        helperText={
                          formProps.touched.applicant_name &&
                          formProps.errors.applicant_name
                        }
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="customer_name"
                        name="customer_name"
                        label="Customer Name &#x1F4F1;"
                        // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                        variant="standard"
                        value={formProps.values.customer_name}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.customer_name)
                            setProgress(progress + 100 / formPropsLength);
                        }}
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
                        onBlur={() => {
                          if (formProps.values.surname)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                        error={
                          formProps.touched.surname &&
                          Boolean(formProps.errors.surname)
                        }
                        helperText={
                          formProps.touched.surname && formProps.errors.surname
                        }
                      />
                    </Col>

                    <Col md={4}>
                      <TextField
                        fullWidth
                        id="contact_person_name"
                        name="contact_person_name"
                        label="Contact Person Name &#x1F4F1;"
                        // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                        variant="standard"
                        value={formProps.values.contact_person_name}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.contact_person_name)
                            setProgress(progress + 100 / formPropsLength);
                        }}
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
                        onBlur={() => {
                          if (formProps.values.contact_person_cell_no)
                            setProgress(progress + 100 / formPropsLength);
                        }}
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
                      <Autocomplete
                        fullWidth
                        id="property_type-autocomplete"
                        options={
                          props?.dropdowns?.dropdowns?.filter(
                            (field) => field?.name === "Property Type"
                          )[0]?.drop_down_details || []
                        }
                        getOptionLabel={(option) => option?.name || ""}
                        onChange={(e, value) => {
                          formProps.setFieldValue(
                            "property_type",
                            value?.name || ""
                          );
                          if (value?.name)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                        onOpen={formProps.handleBlur}
                        includeInputInList
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={Boolean(
                              formProps.touched.property_type &&
                                formProps.errors.property_type
                            )}
                            helperText={
                              formProps.touched.property_type &&
                              formProps.errors.property_type
                            }
                            label="Property Type"
                            name="property_type"
                            variant="standard"
                            size="small"
                          />
                        )}
                      />
                    </Col>

                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="is_society_name_matching"
                        name="is_society_name_matching"
                        label="name as per society name board along with Flat no. &#x1F4F1; "
                        // InputLabelProps={{ style: { fontSize: 20,textTransform: "capitalize" } }}
                        variant="standard"
                        value={formProps.values.is_society_name_matching}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.is_society_name_matching)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="unit_name_as_per_door"
                        name="unit_name_as_per_door"
                        label="Name & Unit No. as per unit Enterence Door"
                        variant="standard"
                        value={formProps.values.unit_name_as_per_door}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.unit_name_as_per_door)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="is_customer_name_matching"
                        name="is_customer_name_matching"
                        label="customer name matching &#x1F4F1; "
                        variant="standard"
                        value={formProps.values.is_customer_name_matching}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.is_customer_name_matching)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      />
                    </Col>
                    <Col md={3} className="pb-4">
                      <Autocomplete
                        fullWidth
                        id="configuration-autocomplete"
                        options={
                          props?.dropdowns?.dropdowns?.filter(
                            (field) => field?.name === "Configuration"
                          )[0]?.drop_down_details || []
                        }
                        getOptionLabel={(option) => option?.name || ""}
                        onChange={(e, value) => {
                          formProps.setFieldValue(
                            "configuration",
                            value?.name || ""
                          );
                        }}
                        onOpen={formProps.handleBlur}
                        includeInputInList
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={Boolean(
                              formProps.touched.configuration &&
                                formProps.errors.configuration
                            )}
                            helperText={
                              formProps.touched.configuration &&
                              formProps.errors.configuration
                            }
                            label="Configuration"
                            name="configuration"
                            variant="standard"
                            size="small"
                          />
                        )}
                      />
                    </Col>
                    <Col md={3} className="pb-4">
                      <TextField
                        fullWidth
                        id="phase"
                        name="phase"
                        // label="Phase/Tower"
                        label="Phase"
                        variant="standard"
                        value={formProps.values.phase}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.phase)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      />
                    </Col>
                    <Col md={3} className="pb-4">
                      <TextField
                        fullWidth
                        id="flat_no"
                        name="flat_no"
                        label="Flat No./Unit No."
                        variant="standard"
                        value={formProps.values.flat_no}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.flat_no)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      />
                    </Col>
                    <Col md={3} className="pb-4">
                      <TextField
                        fullWidth
                        id="unit_name"
                        name="unit_name"
                        label="Unit Name"
                        variant="standard"
                        value={formProps.values.unit_name}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.unit_name)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      />
                    </Col>
                  </Row>
                  <Typography variant={"h5"}>Type Of Ownership</Typography>
                  <Divider />
                  <Row className="pt-4 pb-2">
                    <Col md={12}>
                      <FieldArray
                        name="property_ownerships"
                        render={(arrayHelpers) => (
                          <div>
                            <Row>
                              <Col md={4}>
                                <Autocomplete
                                  fullWidth
                                  id="type_of_ownership-autocomplete"
                                  options={
                                    props?.dropdowns?.dropdowns?.filter(
                                      (field) =>
                                        field?.name === "Type of Ownership"
                                    )[0]?.drop_down_details || []
                                  }
                                  getOptionLabel={(option) =>
                                    option?.name || ""
                                  }
                                  onChange={(e, value) => {
                                    formProps.setFieldValue(
                                      "type_of_ownership",
                                      value?.name || ""
                                    );
                                    if (value?.name) {
                                      setProgress(
                                        progress + 100 / formPropsLength
                                      );
                                    }
                                  }}
                                  onOpen={formProps.handleBlur}
                                  includeInputInList
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Type Of Ownership"
                                      name="type_of_ownership"
                                      variant="standard"
                                      size="small"
                                    />
                                  )}
                                />
                              </Col>

                              <Col md={4}>
                                <TextField
                                  fullWidth
                                  size="small"
                                  variant="standard"
                                  id="owner_name"
                                  name="owner_name"
                                  label="Owner Name"
                                  value={formProps.values.owner_name}
                                  onChange={formProps.handleChange}
                                  onBlur={() => {
                                    if (formProps.values.owner_name)
                                      setProgress(
                                        progress + 100 / formPropsLength
                                      );
                                  }}
                                />
                              </Col>

                              <Col md={2}>
                                <TextField
                                  fullWidth
                                  size="small"
                                  variant="outlined"
                                  id="share"
                                  name="share"
                                  label="Share percent"
                                  value={formProps.values.share}
                                  onChange={formProps.handleChange}
                                  onBlur={() => {
                                    if (formProps.values.share)
                                      setProgress(
                                        progress + 100 / formPropsLength
                                      );
                                  }}
                                />
                              </Col>

                              <Col md={2}>
                                <Button
                                  color="success"
                                  variant="outlined"
                                  onClick={() => {
                                    arrayHelpers.push({
                                      property_id: formProps.values.id,
                                      type_of_ownership:
                                        formProps.values.type_of_ownership,
                                      owner_name: formProps.values.owner_name,
                                      share: formProps.values.share,
                                    });
                                    {
                                      formProps.setFieldValue(
                                        "type_of_ownership",
                                        ""
                                      );
                                      formProps.setFieldValue("owner_name", "");
                                      formProps.setFieldValue("share", "");
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
                                  <th>Type Of Ownership</th>
                                  <th>Owner Name</th>
                                  <th>Share Percent</th>
                                  <th>delete</th>
                                </tr>
                              </thead>
                              <tbody>
                                {formProps?.values?.property_ownerships?.map(
                                  (property_ownerships, index) => {
                                    return (
                                      <tr key={index}>
                                        <td>
                                          <TextField
                                            fullWidth
                                            size="small"
                                            label="Type of ownership"
                                            variant="outlined"
                                            name={`property_ownerships.${index}.type_of_ownership`}
                                            value={
                                              property_ownerships.type_of_ownership
                                            }
                                            id="type_of_ownership"
                                            onChange={formProps.handleChange}
                                          />
                                        </td>
                                        <td>
                                          <TextField
                                            fullWidth
                                            size="small"
                                            label="Owner name"
                                            variant="outlined"
                                            name={`property_ownerships.${index}.owner_name`}
                                            value={
                                              property_ownerships.owner_name
                                            }
                                            id="owner_name"
                                            onChange={formProps.handleChange}
                                          />
                                        </td>
                                        <td>
                                          <TextField
                                            fullWidth
                                            size="small"
                                            label="Share percent"
                                            variant="outlined"
                                            name={`property_ownerships.${index}.share`}
                                            value={property_ownerships.share}
                                            id="share"
                                            onChange={formProps.handleChange}
                                          />
                                        </td>

                                        <td>
                                          <Button
                                            color="error"
                                            size="large"
                                            variant="outlined"
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
                  <br />
                  <Typography variant={"h5"}>Address</Typography>

                  <Row className="form-group">
                    <Col md={12} className="pb-4">
                      <TextField
                        fullWidth
                        id="initiation_address"
                        name="initiation_address"
                        label="Initiation Address"
                        variant="standard"
                        value={formProps.values.initiation_address}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.initiation_address)
                            setProgress(progress + 100 / formPropsLength);
                        }}
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
                        onBlur={() => {
                          if (formProps.values.postal_address)
                            setProgress(progress + 100 / formPropsLength);
                        }}
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
                        onBlur={() => {
                          if (formProps.values.legal_address)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      />
                    </Col>
                    <Col md={12} className="pb-4">
                      <TextField
                        fullWidth
                        id="is_address_missing"
                        name="is_address_missing"
                        label="Is site Address Matching?"
                        variant="standard"
                        value={formProps.values.is_address_missing}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.is_address_missing)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="road_name"
                        name="road_name"
                        label="Road Name"
                        variant="standard"
                        value={formProps.values.road_name}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.road_name)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="street_name"
                        name="street_name"
                        label="Street Name"
                        variant="standard"
                        value={formProps.values.street_name}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.street_name)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="area"
                        name="area"
                        label="Area"
                        variant="standard"
                        value={formProps.values.area}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.area)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="nearby_landmark"
                        name="nearby_landmark"
                        label="Landmark"
                        variant="standard"
                        value={formProps.values.nearby_landmark}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.nearby_landmark)
                            setProgress(progress + 100 / formPropsLength);
                        }}
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
                        onBlur={() => {
                          if (formProps.values.City)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="location"
                        name="location"
                        label="Location"
                        variant="standard"
                        value={formProps.values.location}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.location)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      />
                    </Col>
                  </Row>
                  <br />
                  <Typography variant={"h5"}>Legal Address</Typography>

                  <Row>
                    <Col md={3} className="pb-4">
                      <TextField
                        fullWidth
                        id="survey_no"
                        name="survey_no"
                        label="Survey No"
                        variant="standard"
                        value={formProps.values.survey_no}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.survey_no)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      />
                    </Col>
                    <Col md={3} className="pb-4">
                      <TextField
                        fullWidth
                        id="tp_no"
                        name="tp_no"
                        label="TP No *"
                        variant="standard"
                        value={formProps.values.tp_no}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.tp_no)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                        error={
                          formProps.touched.tp_no &&
                          Boolean(formProps.errors.tp_no)
                        }
                        helperText={
                          formProps.touched.tp_no && formProps.errors.tp_no
                        }
                      />
                    </Col>

                    <Col md={3} className="pb-4">
                      <TextField
                        fullWidth
                        id="fp_no"
                        name="fp_no"
                        label="FP No"
                        variant="standard"
                        value={formProps.values.fp_no}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.fp_no)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      />
                    </Col>
                    <Col md={3} className="pb-4">
                      <TextField
                        fullWidth
                        id="sp_no"
                        name="sp_no"
                        label="SP No"
                        variant="standard"
                        value={formProps.values.sp_no}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.sp_no)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      />
                    </Col>
                    <Col md={3} className="pb-4">
                      <TextField
                        fullWidth
                        id="op_no"
                        name="op_no"
                        label="OP No"
                        variant="standard"
                        value={formProps.values.op_no}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.op_no)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      />
                    </Col>
                    <Col md={3} className="pb-4">
                      <TextField
                        fullWidth
                        id="plot_no"
                        name="plot_no"
                        label="Plot No"
                        variant="standard"
                        value={formProps.values.plot_no}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.plot_no)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      />
                    </Col>
                    <Col md={3} className="pb-4">
                      <TextField
                        fullWidth
                        id="block_no"
                        name="block_no"
                        label="Block No"
                        variant="standard"
                        value={formProps.values.block_no}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.block_no)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      />
                    </Col>
                    <Col md={3} className="pb-4">
                      <TextField
                        fullWidth
                        id="khasra_no"
                        name="khasra_no"
                        label="Khasra No"
                        variant="standard"
                        value={formProps.values.khasra_no}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.khasra_no)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      />
                    </Col>
                    <Col md={3} className="pb-4">
                      <TextField
                        fullWidth
                        id="village"
                        name="village"
                        label="Village"
                        variant="standard"
                        value={formProps.values.village}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.village)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      />
                    </Col>

                    <Col md={3} className="pb-4">
                      <TextField
                        fullWidth
                        id="mouje"
                        name="mouje"
                        label="Mouje"
                        variant="standard"
                        value={formProps.values.mouje}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.mouje)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      />
                    </Col>

                    <Col md={3} className="pb-4">
                      <TextField
                        fullWidth
                        size="small"
                        id="sector_no"
                        name="sector_no"
                        label="Sector No"
                        variant="standard"
                        value={formProps.values.sector_no}
                        onChange={formProps.handleChange}
                      />
                    </Col>
                    <Col md={3} className="pb-4">
                      <TextField
                        fullWidth
                        size="small"
                        id="ward_no"
                        name="ward_no"
                        label="Ward No"
                        variant="standard"
                        value={formProps.values.ward_no}
                        onChange={formProps.handleChange}
                      />
                    </Col>

                    <Col md={3} className="pb-4">
                      <TextField
                        fullWidth
                        id="taluka"
                        name="taluka"
                        label="Taluka"
                        variant="standard"
                        value={formProps.values.taluka}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.taluka)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      />
                    </Col>
                    <Col md={3} className="pb-4">
                      <TextField
                        fullWidth
                        id="district"
                        name="district"
                        label="District"
                        variant="standard"
                        value={formProps.values.district}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.district)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      />
                    </Col>
                    <Col md={3} className="pb-4">
                      <TextField
                        fullWidth
                        id="state"
                        name="state"
                        label="State"
                        variant="standard"
                        value={formProps.values.state}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.state)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      />
                    </Col>
                    <Col md={3} className="pb-4">
                      <TextField
                        fullWidth
                        id="pincode"
                        name="pincode"
                        label="PinCode"
                        variant="standard"
                        value={formProps.values.pincode}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.pincode)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      />
                    </Col>
                  </Row>
                  <Typography variant={"h5"}>Bank Details</Typography>

                  <Row>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="name_of_initiator"
                        name="name_of_initiator"
                        label="Name of Initiator"
                        variant="standard"
                        value={formProps.values.name_of_initiator}
                        onChange={formProps.handleChange}
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="application_no"
                        name="application_no"
                        label="Application Number"
                        variant="standard"
                        value={formProps.values.application_no}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.application_no)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                        error={
                          formProps.touched.application_no &&
                          Boolean(formProps.errors.application_no)
                        }
                        helperText={
                          formProps.touched.application_no &&
                          formProps.errors.application_no
                        }
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="prospect_no"
                        name="prospect_no"
                        label="Prospect Number"
                        variant="standard"
                        value={formProps.values.prospect_no}
                        onChange={formProps.handleChange}
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="branch_date"
                        name="branch_date"
                        label="Branch Date"
                        type="date"
                        variant="standard"
                        value={formProps.values.branch_date}
                        onChange={formProps.handleChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Col>

                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="inspection_date"
                        name="inspection_date"
                        label="Inspection Date"
                        type="date"
                        variant="standard"
                        value={formProps.values.inspection_date}
                        onChange={formProps.handleChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="inspection_date_time"
                        name="inspection_date_time"
                        label="Inspection Time"
                        type="time"
                        variant="standard"
                        value={formProps.values.inspection_date_time}
                        onChange={formProps.handleChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <>
                        <Autocomplete
                          id="bank_vertical_id"
                          options={verticalsProps.options}
                          getOptionLabel={(vertical) => vertical?.name}
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
                              variant="standard"
                            />
                          )}
                        />
                      </>
                    </Col>

                    <Col md={4} className="pb-4">
                      <>
                        <Autocomplete
                          id="bank_product_id"
                          options={productProps.options}
                          getOptionLabel={(product) => product?.name}
                          onChange={(e, value) => {
                            console.log("bank_product_id", value);
                            formProps.setFieldValue("total", value?.rate || "");
                            formProps.setFieldValue(
                              "bank_product_id",
                              value?.id || ""
                            );
                          }}
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
                              variant="standard"
                            />
                          )}
                        />
                      </>
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="bank_sub_product"
                        name="bank_sub_product"
                        label="Bank Sub Product"
                        variant="standard"
                        value={formProps.values.bank_sub_product}
                        onChange={formProps.handleChange}
                      />
                    </Col>
                    <Col md={12} className="pb-4">
                      <TextField
                        fullWidth
                        id="office_remark"
                        name="office_remark"
                        label="Remarks For office use &#x1F4F1; "
                        // InputLabelProps={{ style: { fontSize: 20,textTransform: "capitalize" } }}
                        variant="standard"
                        value={formProps.values.office_remark}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.office_remark)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      />
                    </Col>
                  </Row>

                  <br />
                  <Row className="form-group">
                    <Col>
                      <Button
                        color="success"
                        variant="contained"
                        disabled={formProps.isSubmitting}
                        fullWidth
                        onClick={() => dispatch(ADD_ONE())}
                        type="submit"
                      >
                        Next
                      </Button>
                    </Col>
                  </Row>
                </Form>
              );
            }}
          </Formik>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    // propertyid: state.properties.propertyid,
    property: state.property,
    dropdowns: state.dropdowns,
    bankVerticals: state.bankVerticals,
    bankProducts: state.bankProducts,
    branches: state.branches,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editPropertiesData: (data, setValue, value) =>
      dispatch(editPropertiesData(data, setValue, value)),
    getDropdownsList: (data) => dispatch(getDropdownsList(data)),

    editProgressData: (progressData, setValue, value, token) =>
      dispatch(editProgressData(progressData, setValue, value, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CaseDetails);
