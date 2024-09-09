import React from "react";
import { connect } from "react-redux";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Row,
  Col,
  Table,
} from "reactstrap";
import Button from "@mui/material/Button";
import TextField from "@material-ui/core/TextField";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import { MenuItem, Tooltip } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Checkbox from "@mui/material/Checkbox";

// import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import moment from "moment";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Divider, Typography } from "@mui/material";

//*Actions
import { editObservationsData } from "../../../../../Redux/Creators/ObservationCreators";
//*Compoenets
import LinerLoader from "components/Loaders/LinerLoader";
import ADD_ONE from "../../../../../Redux/Types/ActionTypes"
import { useDispatch } from "react-redux";
import { editProgressData } from "../../../../../Redux/Creators/ProgressCreators";


function Observations(props) {
  const token = props.login?.login?.token;
  const dispatch = useDispatch();
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);

    let data = {
      // token: token,
      id: values.id,
      property_id: values.property_id,
      //*Observations
      const_asper_approved_plan: values.const_asper_approved_plan,
      notice_of_any_other: values.notice_of_any_other,
      demarcated: values.demarcated,
      peripheral_boundaries_maintain: values.peripheral_boundaries_maintain,
      marketablity: values.marketablity,
      is_demolition_risk: values.is_demolition_risk,
      demolition_risk: values.demolition_risk,
      locatable: values.locatable,
      doc_detail_match_property: values.doc_detail_match_property,
      doc_submitted_clear: values.doc_submitted_clear,
      stamp_seal: values.stamp_seal,
      original_doc_submitted: values.original_doc_submitted,
      ownership_confirmed: values.ownership_confirmed,
      cust_cooperation_valuation: values.cust_cooperation_valuation,
      accesebility_to_reach: values.accesebility_to_reach,
      property_identified_through: values.property_identified_through,
      structure_confirming: values.structure_confirming,
      adverse_feature: values.adverse_feature,
      surrounded_by_factory: values.surrounded_by_factory,
      avaliabilty_school_hospital: values.avaliabilty_school_hospital,
      disaster_management_resilient: values.disaster_management_resilient,
      enlisted_negative: values.enlisted_negative,
      activity_on_site: values.activity_on_site,
      labour_site: values.labour_site,
      permissible_master: values.permissible_master,
      municipal_limits: values.municipal_limits,
      prop_acceptable: values.prop_acceptable,
      permissible_usage: values.permissible_usage,
      high_tension_line_passing: values.high_tension_line_passing,
      is_high_tension_line: values.is_high_tension_line,
      property_negative: values.property_negative,
    };

    const value = 1;
    
    let progressData = {
      id: props?.property?.property?.id,
      observationsProgress: 1,
      
    }

    props.editProgressData(progressData, props.setValue, value,props.login?.login?.token);

    props.editObservationsData(data, props.setValue, value, token);
    setSubmitting(false);
  };
  return (
    <>
      {props.observations.isLoading ? (
        <div>
          <LinerLoader />
        </div>
      ) : (
        <div>
          <br />
          <Formik
            initialValues={{
              id: props?.property?.property?.observation?.id,
              property_id: props?.property?.property?.id,
              //*Observations
              const_asper_approved_plan:
                props?.property?.property?.observation
                  ?.const_asper_approved_plan,
              notice_of_any_other:
                props?.property?.property?.observation?.notice_of_any_other,
              demarcated: props?.property?.property?.observation?.demarcated,
              peripheral_boundaries_maintain:
                props?.property?.property?.observation
                  ?.peripheral_boundaries_maintain,
              marketablity:
                props?.property?.property?.observation?.marketablity,
                is_demolition_risk:
                props?.property?.property?.observation?.is_demolition_risk==1?"Yes":props?.property?.property?.observation?.is_demolition_risk==0?"No":"",
              demolition_risk:
                props?.property?.property?.observation?.demolition_risk,
              locatable: props?.property?.property?.observation?.locatable,
              doc_detail_match_property:
                props?.property?.property?.observation
                  ?.doc_detail_match_property,
              doc_submitted_clear:
                props?.property?.property?.observation?.doc_submitted_clear,
              stamp_seal: props?.property?.property?.observation?.stamp_seal,
              original_doc_submitted:
                props?.property?.property?.observation?.original_doc_submitted,
              ownership_confirmed:
                props?.property?.property?.observation?.ownership_confirmed,
              cust_cooperation_valuation:
                props?.property?.property?.observation
                  ?.cust_cooperation_valuation,
              accesebility_to_reach:
                props?.property?.property?.observation?.accesebility_to_reach,
              property_identified_through:
                props?.property?.property?.observation
                  ?.property_identified_through,
              structure_confirming:
                props?.property?.property?.observation?.structure_confirming,
              adverse_feature:
                props?.property?.property?.observation?.adverse_feature,
              surrounded_by_factory:
                props?.property?.property?.observation?.surrounded_by_factory,
              avaliabilty_school_hospital:
                props?.property?.property?.observation
                  ?.avaliabilty_school_hospital,
              disaster_management_resilient:
                props?.property?.property?.observation
                  ?.disaster_management_resilient,
              enlisted_negative:
                props?.property?.property?.observation?.enlisted_negative,
              activity_on_site:
                props?.property?.property?.observation?.activity_on_site,
              labour_site: props?.property?.property?.observation?.labour_site,
              permissible_master:
                props?.property?.property?.observation?.permissible_master,
              municipal_limits:
                props?.property?.property?.observation?.municipal_limits,
              prop_acceptable:
                props?.property?.property?.observation?.prop_acceptable,
              permissible_usage:
                props?.property?.property?.observation?.permissible_usage,
                is_high_tension_line:
                props?.property?.property?.observation?.is_high_tension_line==1?"Yes":props?.property?.property?.observation?.is_high_tension_line==0?"No":"",
                high_tension_line_passing:
                props?.property?.property?.observation?.high_tension_line_passing,
                property_negative:
                props?.property?.property?.observation?.property_negative,
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              const_asper_approved_plan: Yup.string().required("Construction as per approved plan or not is required"),
              notice_of_any_other: Yup.string().required("Please check the security board of Notices of any other instituition find on the property is required"),
              demarcated: Yup.string().required("Check whether the unit/plot is demarcated or not is required"),
              peripheral_boundaries_maintain: Yup.string().required("Whether peripheral boundaries are as per plan in maintain is required"),
              marketablity: Yup.string().required("Marketablility is required"),
              is_demolition_risk: Yup.string().required("Demolition risk of the unauthorized part of the property at site is required"),
              demolition_risk: Yup.string().required("Demolition risk Remark is required"),
              locatable: Yup.string().required("Is property easily locatable/identifiable is required"),
              doc_detail_match_property: Yup.string().required("Documents details match with actual property at site is required"),
              doc_submitted_clear: Yup.string().required("Documents submitted is clear and legible is required"),
              stamp_seal: Yup.string().required("Stamp & seal by proper approving authority is available is required"),
              original_doc_submitted: Yup.string().required("Originals of documents submitted is verified is required"),
              ownership_confirmed: Yup.string().required("Ownership confirmed by any three documents is required"),
              cust_cooperation_valuation: Yup.string().required("Customer is co-operation in valuation is required"),
              accesebility_to_reach: Yup.string().required("Proper accessibility is available to reach the property is required"),
              property_identified_through: Yup.string().required("Property identified through is required"),
              structure_confirming: Yup.string().required("Structure confirming local by laws is required"),
              adverse_feature: Yup.string().required("Is there any adverse feature like slum , graveyard , cremation(nonelectrical) ,dumping ground are nearby site ? is required"),
              surrounded_by_factory: Yup.string().required("Is it surrounded by factory/godown etc? is required"),
              avaliabilty_school_hospital: Yup.string().required("Is property in a residential area where major housing complex ,market complex, school are in the surroundings apart from the availability of electrical ,telephone connection is required"),
              disaster_management_resilient: Yup.string().required("Is construction as per guideline of national disaster management on ensuring disaster resilient construction of building and infrasturcture ? is required"),
              enlisted_negative: Yup.string().required("Enlisted for any negative authority action is required"),
              activity_on_site: Yup.string().required("Activity on site is required"),
              labour_site: Yup.string().required("Labor on site is required"),
              permissible_master: Yup.string().required("Permissible Use Master is required"),
              municipal_limits: Yup.string().required("Permissible Use Master is required"),
              prop_acceptable: Yup.string().required("Property Technically Acceptable is required"),
              permissible_usage: Yup.string().required("Permissible Usage Allow As Per Master Plan is required"),
              high_tension_line_passing: Yup.string().required("high tension line passing near our property Remark is required"),
              is_high_tension_line: Yup.string().required("Permissible Usage Allow As Per Master Plan is required"),
              property_negative: Yup.string().required("property negative is required"),
            })}
          >
            {(formProps) => (
              <Form>
                {console.log(formProps,"formProps")}
                <Typography variant={"h5"}>Observations</Typography>
                <Divider />
                <br />
                <Row className="form-group">
                  <Col md={12} className="pb-4">
                    <TextField
                      fullWidth
                      id="const_asper_approved_plan"
                      name="const_asper_approved_plan"
                      label="Construction as per approved plan or not"
                      variant="standard"
                      value={formProps.values.const_asper_approved_plan}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.const_asper_approved_plan &&
                        Boolean(formProps.errors.const_asper_approved_plan)
                      }
                      helperText={
                        formProps.touched.const_asper_approved_plan &&
                        formProps.errors.const_asper_approved_plan
                      }
                    />
                  </Col>
                  <Col md={12} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      id="notice_of_any_other"
                      name="notice_of_any_other"
                      label="Please check the security board of Notices of any other instituition find on the property"
                      variant="standard"
                      value={formProps.values.notice_of_any_other}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.notice_of_any_other &&
                        Boolean(formProps.errors.notice_of_any_other)
                      }
                      helperText={
                        formProps.touched.notice_of_any_other &&
                        formProps.errors.notice_of_any_other
                      }
                    >
                     
                     <MenuItem value="">Select</MenuItem>
                      {props?.dropdowns?.dropdowns?.filter((field) => field?.name == "Please check the security board of Notices of any other instituition find on the property")[0]?.drop_down_details?.map((field, i) => (
                          <MenuItem key={i} value={field?.name}>
                            {field?.name}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Col>
                  <Col md={12} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      id="demarcated"
                      name="demarcated"
                      label="Check whether the unit/plot is demarcated or not"
                      variant="standard"
                      value={formProps.values.demarcated}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.demarcated &&
                        Boolean(formProps.errors.demarcated)
                      }
                      helperText={
                        formProps.touched.demarcated &&
                        formProps.errors.demarcated
                      }
                    >
                    
                    <MenuItem value="">Select</MenuItem>
                      {props?.dropdowns?.dropdowns?.filter((field) => field?.name == "Check whether the unit/plot is demarcated or not")[0]?.drop_down_details?.map((field, i) => (
                          <MenuItem key={i} value={field?.name}>
                            {field?.name}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Col>
                  <Col md={12} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      id="peripheral_boundaries_maintain"
                      name="peripheral_boundaries_maintain"
                      label="Whether peripheral boundaries are as per plan in maintain"
                      variant="standard"
                      value={formProps.values.peripheral_boundaries_maintain}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.peripheral_boundaries_maintain &&
                        Boolean(formProps.errors.peripheral_boundaries_maintain)
                      }
                      helperText={
                        formProps.touched.peripheral_boundaries_maintain &&
                        formProps.errors.peripheral_boundaries_maintain
                      }
                    >
                    
                    <MenuItem value="">Select</MenuItem>
                      {props?.dropdowns?.dropdowns?.filter((field) => field?.name == "Whether peripheral boundaries are as per plan in maintain")[0]?.drop_down_details?.map((field, i) => (
                          <MenuItem key={i} value={field?.name}>
                            {field?.name}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Col>

                  <Col md={12} className="pb-4">
                    {/* <FormLabel>Branch name</FormLabel> */}
                    <TextField
                      fullWidth
                      select
                      id="marketablity"
                      name="marketablity"
                      label="Marketablility"
                      variant="standard"
                      value={formProps.values.marketablity}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.marketablity &&
                        Boolean(formProps.errors.marketablity)
                      }
                      helperText={
                        formProps.touched.marketablity &&
                        formProps.errors.marketablity
                      }
                    >
                      
                      <MenuItem value="">Select</MenuItem>
                      {props?.dropdowns?.dropdowns?.filter((field) => field?.name == "Marketablility")[0]?.drop_down_details?.map((field, i) => (
                          <MenuItem key={i} value={field?.name}>
                            {field?.name}
                          </MenuItem>
                        ))}
                      {/* <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                      <MenuItem value="NA">NA</MenuItem>
                      <MenuItem value="Average">Average</MenuItem>
                      <MenuItem value="Good">Good</MenuItem>
                      <MenuItem value="Bellow Average">Bellow Average</MenuItem>
                      <MenuItem value="Poor">Poor</MenuItem> */}
                    </TextField>
                  </Col>

                  <Col md={12}>
                    <TextField
                      fullWidth
                      select
                      id="is_demolition_risk"
                      name="is_demolition_risk"
                      label="Demolition risk of the unauthorized part of the property at site"
                      variant="standard"
                      value={formProps.values.is_demolition_risk}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.is_demolition_risk &&
                        Boolean(formProps.errors.is_demolition_risk)
                      }
                      helperText={
                        formProps.touched.is_demolition_risk &&
                        formProps.errors.is_demolition_risk
                      }
                    >
                     
                     {/* <MenuItem value="">Select</MenuItem>
                      {props?.dropdowns?.dropdowns?.filter((field) => field?.name == "Demolition risk of the unauthorized part of the property at site")[0]?.drop_down_details?.map((field, i) => (
                          <MenuItem key={i} value={field?.name}>
                            {field?.name}
                          </MenuItem>
                        ))} */}
                     <MenuItem value={1}>Yes</MenuItem>
                     <MenuItem value={0}>No</MenuItem>
                    </TextField>
                  </Col>
                  <Col md={12}>
                    <TextField
                      fullWidth
                      Text
                      id="demolition_risk"
                      name="demolition_risk"
                      label="Demolition risk Remark"
                      variant="standard"
                      value={formProps.values.demolition_risk}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.demolition_risk &&
                        Boolean(formProps.errors.demolition_risk)
                      }
                      helperText={
                        formProps.touched.demolition_risk &&
                        formProps.errors.demolition_risk
                      }
                    >
                      
                      <MenuItem value="">Select</MenuItem>
                      {props?.dropdowns?.dropdowns?.filter((field) => field?.name == "Demolition risk Remark")[0]?.drop_down_details?.map((field, i) => (
                          <MenuItem key={i} value={field?.name}>
                            {field?.name}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Col>
                  <Col md={12} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      id="locatable"
                      name="locatable"
                      label="Is property easily locatable/identifiable"
                      variant="standard"
                      value={formProps.values.locatable}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.locatable &&
                        Boolean(formProps.errors.locatable)
                      }
                      helperText={
                        formProps.touched.locatable &&
                        formProps.errors.locatable
                      }
                    >
                    
                    <MenuItem value="">Select</MenuItem>
                      {props?.dropdowns?.dropdowns?.filter((field) => field?.name == "Is property easily locatable/identifiable")[0]?.drop_down_details?.map((field, i) => (
                          <MenuItem key={i} value={field?.name}>
                            {field?.name}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Col>

                  <Col md={12} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      id="doc_detail_match_property"
                      name="doc_detail_match_property"
                      label="Documents details match with actual property at site"
                      variant="standard"
                      size="small"
                      value={formProps.values.doc_detail_match_property}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.doc_detail_match_property &&
                        Boolean(formProps.errors.doc_detail_match_property)
                      }
                      helperText={
                        formProps.touched.doc_detail_match_property &&
                        formProps.errors.doc_detail_match_property
                      }
                    >
                     
                     <MenuItem value="">Select</MenuItem>
                      {props?.dropdowns?.dropdowns?.filter((field) => field?.name == "Documents details match with actual property at site")[0]?.drop_down_details?.map((field, i) => (
                          <MenuItem key={i} value={field?.name}>
                            {field?.name}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Col>

                  <Col md={12} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      id="doc_submitted_clear"
                      name="doc_submitted_clear"
                      label="Documents submitted is clear and legible"
                      variant="standard"
                      size="small"
                      value={formProps.values.doc_submitted_clear}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.doc_submitted_clear &&
                        Boolean(formProps.errors.doc_submitted_clear)
                      }
                      helperText={
                        formProps.touched.doc_submitted_clear &&
                        formProps.errors.doc_submitted_clear
                      }
                    >
                    
                    <MenuItem value="">Select</MenuItem>
                      {props?.dropdowns?.dropdowns?.filter((field) => field?.name == "Documents submitted is clear and legible")[0]?.drop_down_details?.map((field, i) => (
                          <MenuItem key={i} value={field?.name}>
                            {field?.name}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Col>

                  <Col md={12} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      id="stamp_seal"
                      name="stamp_seal"
                      label="Stamp & seal by proper approving authority is available"
                      variant="standard"
                      size="small"
                      value={formProps.values.stamp_seal}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.stamp_seal &&
                        Boolean(formProps.errors.stamp_seal)
                      }
                      helperText={
                        formProps.touched.stamp_seal &&
                        formProps.errors.stamp_seal
                      }
                    >
                      
                      <MenuItem value="">Select</MenuItem>
                      {props?.dropdowns?.dropdowns?.filter((field) => field?.name == "Stamp & seal by proper approving authority is available")[0]?.drop_down_details?.map((field, i) => (
                          <MenuItem key={i} value={field?.name}>
                            {field?.name}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Col>

                  <Col md={12} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      id="original_doc_submitted"
                      name="original_doc_submitted"
                      label="Originals of documents submitted is verified"
                      variant="standard"
                      size="small"
                      value={formProps.values.original_doc_submitted}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.original_doc_submitted &&
                        Boolean(formProps.errors.original_doc_submitted)
                      }
                      helperText={
                        formProps.touched.original_doc_submitted &&
                        formProps.errors.original_doc_submitted
                      }
                    >
                      
                      <MenuItem value="">Select</MenuItem>
                      {props?.dropdowns?.dropdowns?.filter((field) => field?.name == "Originals of documents submitted is verified")[0]?.drop_down_details?.map((field, i) => (
                          <MenuItem key={i} value={field?.name}>
                            {field?.name}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Col>

                  <Col md={12} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      id="ownership_confirmed"
                      name="ownership_confirmed"
                      label="Ownership confirmed by any three documents"
                      variant="standard"
                      size="small"
                      value={formProps.values.ownership_confirmed}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.ownership_confirmed &&
                        Boolean(formProps.errors.ownership_confirmed)
                      }
                      helperText={
                        formProps.touched.ownership_confirmed &&
                        formProps.errors.ownership_confirmed
                      }
                    >
                      
                      <MenuItem value="">Select</MenuItem>
                      {props?.dropdowns?.dropdowns?.filter((field) => field?.name == "Ownership confirmed by any three documents")[0]?.drop_down_details?.map((field, i) => (
                          <MenuItem key={i} value={field?.name}>
                            {field?.name}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Col>

                  <Col md={12} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      id="cust_cooperation_valuation"
                      name="cust_cooperation_valuation"
                      label="Customer is co-operation in valuation"
                      variant="standard"
                      size="small"
                      value={formProps.values.cust_cooperation_valuation}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.cust_cooperation_valuation &&
                        Boolean(formProps.errors.cust_cooperation_valuation)
                      }
                      helperText={
                        formProps.touched.cust_cooperation_valuation &&
                        formProps.errors.cust_cooperation_valuation
                      }
                    >
                     
                     <MenuItem value="">Select</MenuItem>
                      {props?.dropdowns?.dropdowns?.filter((field) => field?.name == "Customer is co-operation in valuation")[0]?.drop_down_details?.map((field, i) => (
                          <MenuItem key={i} value={field?.name}>
                            {field?.name}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Col>

                  <Col md={12} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      id="accesebility_to_reach"
                      name="accesebility_to_reach"
                      label="Proper accessibility is available to reach the property"
                      variant="standard"
                      size="small"
                      value={formProps.values.accesebility_to_reach}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.accesebility_to_reach &&
                        Boolean(formProps.errors.accesebility_to_reach)
                      }
                      helperText={
                        formProps.touched.accesebility_to_reach &&
                        formProps.errors.accesebility_to_reach
                      }
                    >
                     
                     <MenuItem value="">Select</MenuItem>
                      {props?.dropdowns?.dropdowns?.filter((field) => field?.name == "Proper accessibility is available to reach the property")[0]?.drop_down_details?.map((field, i) => (
                          <MenuItem key={i} value={field?.name}>
                            {field?.name}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Col>

                  <Col md={12} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      id="property_identified_through"
                      name="property_identified_through"
                      label="Property identified through"
                      variant="standard"
                      size="small"
                      value={formProps.values.property_identified_through}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.property_identified_through &&
                        Boolean(formProps.errors.property_identified_through)
                      }
                      helperText={
                        formProps.touched.property_identified_through &&
                        formProps.errors.property_identified_through
                      }
                    >
                      
                      <MenuItem value="">Select</MenuItem>
                      {props?.dropdowns?.dropdowns?.filter((field) => field?.name == "Property identified through")[0]?.drop_down_details?.map((field, i) => (
                          <MenuItem key={i} value={field?.name}>
                            {field?.name}
                          </MenuItem>
                        ))}
                      {/* <MenuItem value="Key plan of ownership doc">
                        Key plan of ownership doc
                      </MenuItem>
                      <MenuItem value="Technical doc">Technical doc</MenuItem>
                      <MenuItem value="Customer has shown the property">
                        Customer has shown the property
                      </MenuItem> */}
                    </TextField>
                  </Col>

                  <Col md={12} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      id="structure_confirming"
                      name="structure_confirming"
                      label="Structure confirming local by laws"
                      variant="standard"
                      size="small"
                      value={formProps.values.structure_confirming}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.structure_confirming &&
                        Boolean(formProps.errors.structure_confirming)
                      }
                      helperText={
                        formProps.touched.structure_confirming &&
                        formProps.errors.structure_confirming
                      }
                    >
                     
                     <MenuItem value="">Select</MenuItem>
                      {props?.dropdowns?.dropdowns?.filter((field) => field?.name == "Structure confirming local by laws")[0]?.drop_down_details?.map((field, i) => (
                          <MenuItem key={i} value={field?.name}>
                            {field?.name}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Col>

                  <Col md={12} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      id="adverse_feature"
                      name="adverse_feature"
                      label="Is there any adverse feature like slum , graveyard , cremation(nonelectrical) ,dumping ground are nearby site ?"
                      variant="standard"
                      size="small"
                      value={formProps.values.adverse_feature}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.adverse_feature &&
                        Boolean(formProps.errors.adverse_feature)
                      }
                      helperText={
                        formProps.touched.adverse_feature &&
                        formProps.errors.adverse_feature
                      }
                    >
                     
                     <MenuItem value="">Select</MenuItem>
                      {props?.dropdowns?.dropdowns?.filter((field) => field?.name == "Is there any adverse feature like slum , graveyard , cremation(nonelectrical) ,dumping ground are nearby site ?")[0]?.drop_down_details?.map((field, i) => (
                          <MenuItem key={i} value={field?.name}>
                            {field?.name}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Col>

                  <Col md={12} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      id="surrounded_by_factory"
                      name="surrounded_by_factory"
                      label="Is it surrounded by factory/godown etc?"
                      variant="standard"
                      size="small"
                      value={formProps.values.surrounded_by_factory}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.surrounded_by_factory &&
                        Boolean(formProps.errors.surrounded_by_factory)
                      }
                      helperText={
                        formProps.touched.surrounded_by_factory &&
                        formProps.errors.surrounded_by_factory
                      }
                    >
                      
                      <MenuItem value="">Select</MenuItem>
                      {props?.dropdowns?.dropdowns?.filter((field) => field?.name == "Is it surrounded by factory/godown etc?")[0]?.drop_down_details?.map((field, i) => (
                          <MenuItem key={i} value={field?.name}>
                            {field?.name}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Col>

                  <Col md={12} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      id="avaliabilty_school_hospital"
                      name="avaliabilty_school_hospital"
                      label="Is property in a residential area where major housing complex ,market complex, school are in the surroundings apart from the availability of electrical ,telephone connection"
                      variant="standard"
                      size="small"
                      value={formProps.values.avaliabilty_school_hospital}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.avaliabilty_school_hospital &&
                        Boolean(formProps.errors.avaliabilty_school_hospital)
                      }
                      helperText={
                        formProps.touched.avaliabilty_school_hospital &&
                        formProps.errors.avaliabilty_school_hospital
                      }
                    >
                     
                     <MenuItem value="">Select</MenuItem>
                      {props?.dropdowns?.dropdowns?.filter((field) => field?.name == "Is property in a residential area where major housing complex ,market complex, school are in the surroundings apart from the availability of electrical ,telephone connection")[0]?.drop_down_details?.map((field, i) => (
                          <MenuItem key={i} value={field?.name}>
                            {field?.name}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Col>

                  <Col md={12} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      id="disaster_management_resilient"
                      name="disaster_management_resilient"
                      label="Is construction as per guideline of national disaster management on ensuring disaster resilient construction of building and infrasturcture ?"
                      variant="standard"
                      size="small"
                      value={formProps.values.disaster_management_resilient}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.disaster_management_resilient &&
                        Boolean(formProps.errors.disaster_management_resilient)
                      }
                      helperText={
                        formProps.touched.disaster_management_resilient &&
                        formProps.errors.disaster_management_resilient
                      }
                    >
                    
                    <MenuItem value="">Select</MenuItem>
                      {props?.dropdowns?.dropdowns?.filter((field) => field?.name == "Is construction as per guideline of national disaster management on ensuring disaster resilient construction of building and infrasturcture ?")[0]?.drop_down_details?.map((field, i) => (
                          <MenuItem key={i} value={field?.name}>
                            {field?.name}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Col>

                  <Col md={12} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      id="enlisted_negative"
                      name="enlisted_negative"
                      label="Enlisted for any negative authority action"
                      variant="standard"
                      value={formProps.values.enlisted_negative}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.enlisted_negative &&
                        Boolean(formProps.errors.enlisted_negative)
                      }
                      helperText={
                        formProps.touched.enlisted_negative &&
                        formProps.errors.enlisted_negative
                      }
                    >
                     
                     <MenuItem value="">Select</MenuItem>
                      {props?.dropdowns?.dropdowns?.filter((field) => field?.name == "Enlisted for any negative authority action")[0]?.drop_down_details?.map((field, i) => (
                          <MenuItem key={i} value={field?.name}>
                            {field?.name}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Col>

                  <Col md={12} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      id="activity_on_site"
                      name="activity_on_site"
                      label="Activity on site"
                      variant="standard"
                      value={formProps.values.activity_on_site}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.activity_on_site &&
                        Boolean(formProps.errors.activity_on_site)
                      }
                      helperText={
                        formProps.touched.activity_on_site &&
                        formProps.errors.activity_on_site
                      }
                    >
                     
                     <MenuItem value="">Select</MenuItem>
                      {props?.dropdowns?.dropdowns?.filter((field) => field?.name == "Activity on site")[0]?.drop_down_details?.map((field, i) => (
                          <MenuItem key={i} value={field?.name}>
                            {field?.name}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Col>

                  <Col md={12} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      id="labour_site"
                      name="labour_site"
                      label="Labor on site"
                      variant="standard"
                      value={formProps.values.labour_site}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.labour_site &&
                        Boolean(formProps.errors.labour_site)
                      }
                      helperText={
                        formProps.touched.labour_site &&
                        formProps.errors.labour_site
                      }
                    >
                     
                     <MenuItem value="">Select</MenuItem>
                      {props?.dropdowns?.dropdowns?.filter((field) => field?.name == "Labor on site")[0]?.drop_down_details?.map((field, i) => (
                          <MenuItem key={i} value={field?.name}>
                            {field?.name}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Col>

                  <Col md={12} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      id="permissible_master"
                      name="permissible_master"
                      label="Permissible Use Master"
                      variant="standard"
                      value={formProps.values.permissible_master}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.permissible_master &&
                        Boolean(formProps.errors.permissible_master)
                      }
                      helperText={
                        formProps.touched.permissible_master &&
                        formProps.errors.permissible_master
                      }
                    >
                  
                  <MenuItem value="">Select</MenuItem>
                      {props?.dropdowns?.dropdowns?.filter((field) => field?.name == "Permissible Use Master")[0]?.drop_down_details?.map((field, i) => (
                          <MenuItem key={i} value={field?.name}>
                            {field?.name}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Col>

                  <Col md={12} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      id="municipal_limits"
                      name="municipal_limits"
                      label="Municipal Limits"
                      variant="standard"
                      value={formProps.values.municipal_limits}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.municipal_limits &&
                        Boolean(formProps.errors.municipal_limits)
                      }
                      helperText={
                        formProps.touched.municipal_limits &&
                        formProps.errors.municipal_limits
                      }
                    >
                     
                     <MenuItem value="">Select</MenuItem>
                      {props?.dropdowns?.dropdowns?.filter((field) => field?.name == "Municipal Limits")[0]?.drop_down_details?.map((field, i) => (
                          <MenuItem key={i} value={field?.name}>
                            {field?.name}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Col>

                  <Col md={12} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      id="prop_acceptable"
                      name="prop_acceptable"
                      label="Property Technically Acceptable"
                      variant="standard"
                      value={formProps.values.prop_acceptable}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.prop_acceptable &&
                        Boolean(formProps.errors.prop_acceptable)
                      }
                      helperText={
                        formProps.touched.prop_acceptable &&
                        formProps.errors.prop_acceptable
                      }
                    >
                      
                      <MenuItem value="">Select</MenuItem>
                      {props?.dropdowns?.dropdowns?.filter((field) => field?.name == "Property Technically Acceptable")[0]?.drop_down_details?.map((field, i) => (
                          <MenuItem key={i} value={field?.name}>
                            {field?.name}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Col>

                  <Col md={12} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      id="permissible_usage"
                      name="permissible_usage"
                      label="Permissible Usage Allow As Per Master Plan"
                      variant="standard"
                      value={formProps.values.permissible_usage}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.permissible_usage &&
                        Boolean(formProps.errors.permissible_usage)
                      }
                      helperText={
                        formProps.touched.permissible_usage &&
                        formProps.errors.permissible_usage
                      }
                    >
                    
                    <MenuItem value={1}>Yes</MenuItem>
                     <MenuItem value={0}>No</MenuItem>
                    </TextField>
                  </Col>
                  <Col md={12} className="pb-4">
                    <TextField
                      fullWidth
                      text
                      id="is_high_tension_line"
                      name="is_high_tension_line"
                      label="Is High Tension Line &#x1F4F1;"
                      variant="standard"
                      // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }} 
                      value={formProps.values.is_high_tension_line}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.is_high_tension_line &&
                        Boolean(formProps.errors.is_high_tension_line)
                      }
                      helperText={
                        formProps.touched.is_high_tension_line &&
                        formProps.errors.is_high_tension_line
                      }
                    >
                      
                      <MenuItem value={1}>Yes</MenuItem>
                     <MenuItem value={0}>No</MenuItem>
                    </TextField>
                  </Col>
                  <Col md={12} className="pb-4">
                    <TextField
                      fullWidth
                      text
                      id="high_tension_line_passing"
                      name="high_tension_line_passing"
                      label="high tension line passing near our property Remark &#x1F4F1;"
                      variant="standard"
                      // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }} 
                      value={formProps.values.high_tension_line_passing}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.high_tension_line_passing &&
                        Boolean(formProps.errors.high_tension_line_passing)
                      }
                      helperText={
                        formProps.touched.high_tension_line_passing &&
                        formProps.errors.high_tension_line_passing
                      }
                    >
                      
                     
                      <MenuItem value={1}>Yes</MenuItem>
                     <MenuItem value={0}>No</MenuItem>
                    </TextField>
                  </Col>
                  <Col md={12} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      id="property_negative"
                      name="property_negative"
                      label="negative property &#x1F4F1;"
                      variant="standard"
                      // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }} 
                      value={formProps.values.property_negative}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.property_negative &&
                        Boolean(formProps.errors.property_negative)
                      }
                      helperText={
                        formProps.touched.property_negative &&
                        formProps.errors.property_negative
                      }
                    >
                         
                      <MenuItem value={1}>Yes</MenuItem>
                     <MenuItem value={0}>No</MenuItem>
                    </TextField>
                  </Col>
                </Row>

                <Divider />
                {/* {console.log("object",props?.dropdowns?.dropdowns?.filter((field) => field?.name == "negative property"),props?.dropdowns?.dropdowns)} */}
                <br />

                <Row className="form-group">
                  <Col>
                    <Button
                      color="success"
                      variant="contained"
                      disabled={formProps.isSubmitting}
                      fullWidth
                      type="submit"
                      onClick={()=>dispatch(ADD_ONE())}
                    >
                      Next
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
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
    observations: state.observations,
    dropdowns: state.dropdowns,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editObservationsData: (data, setValue, value, token) =>
      dispatch(editObservationsData(data, setValue, value, token)),
      editProgressData: (progressData, setValue, value,token) =>dispatch(editProgressData(progressData, setValue, value,token)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Observations);
