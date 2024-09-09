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
  Label,
} from "reactstrap";

import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@mui/icons-material/Edit";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";
import { editValuationData } from "../../../../../../Redux/Creators/ValuationCreators";


//*Actions
// import { editBrokersData } from "../../../Redux/Creators/BrokersCreators";

function UpdateValuation(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  console.log("objectprops",props)
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);

    let data = {
      // token: token,
      // id: values.id,
      property_id: values.property_id,
      valuation_id: values.valuation_id,

      //*Valuation
      realization_value: values.realization_value,
        yield: values.yield,
        garden_per_area: values.garden_per_doc,
        garden_per_doc: values.garden_per_site,
        garden_per_site: values.garden_per_site,
        garden_per_plan: values.garden_per_plan,
        terrace_per_doc: values.terrace_per_doc,
        terrace_rate: values.terrace_rate,
        terrace_per_site: values.terrace_per_site,
        terrace_per_plan: values.terrace_per_plan,
        open_parking_value: values.open_parking_value,
        open_parking_no: values.open_parking_no,
        mechanical_car_parking_value: values.mechanical_car_parking_value,
        mechanical_stack_parking_no: values.mechanical_stack_parking_no,
        covered_car_parking_value: values.covered_car_parking_value,
        covered_car_parking_no: values.covered_car_parking_no,
        depricated_value: ((+values.age_of_property/+values.usefull_age_of_property) * +values.construction_cost).toFixed(2),
        renevotion_value: values.renevotion_value,
        distress_percentage: values.distress_percentage,
        distress_value: values.distress_value,
        age_per_agreement: values.age_per_agreement,
        as_per_site_inspection: values.as_per_site_inspection,
        esitimated_age: values.esitimated_age,
        externel_expenses: values.externel_expenses,
        rent_per_month: values.rent_per_month,
        garden_rate: values.garden_rate,
        rent_per_sqrft: values.rent_per_sqrft,
        carpet_area_per_site: values.carpet_area_per_site,
        carpet_area_per_plan: values.carpet_area_per_plan,
        carpet_area_per_agreement: values.carpet_area_per_agreement,
        forced_sale_value: values.forced_sale_value,
        additional_charges: values.additional_charges,
        description: values.description,
   
    };

    const value = 1;

    let progressData = {
      id: props?.property?.property?.id,
      valuationProgress: 1,
    };

   

          props.editValuationData(data, props.setValue, value, token);
          setSubmitting(false);

  };

  return (
    <div>
      <Tooltip title="Edit" placement="top">
        <Button
          fullWidth
          variant="outlined"
          color="warning"
          size="small"
          className="p-1"
          onClick={() => toggle()}
          startIcon={<AddIcon fontSize="inherit" />}
        >
          Edit
        </Button>
      </Tooltip>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Edit {props.name}</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
        <ModalBody>
          <Formik
            initialValues={{
              id: props?.property?.property?.valuation?.id,
        property_id: props?.property?.property?.id,
        valuation_id: props?.property?.property?.valuation?.id,
              realization_value: props?.property?.property?.valuation?.realization_value,
              forced_sale_value: props?.property?.property?.valuation?.forced_sale_value,
              yield: props?.property?.property?.valuation?.yield,
              garden_per_area: props?.property?.property?.valuation?.garden_per_area,
              garden_per_doc: props?.property?.property?.valuation?.garden_per_doc,
              garden_per_site: props?.property?.property?.valuation?.garden_per_site,
              garden_per_plan: props?.property?.property?.valuation?.garden_per_plan,
              garden_rate: props?.property?.property?.valuation?.garden_rate,
              additional_charges: props?.property?.property?.valuation?.additional_charges,
              description: props?.property?.property?.valuation?.description,
              terrace_per_doc: props?.property?.property?.valuation?.terrace_per_doc,
              terrace_rate: props?.property?.property?.valuation?.terrace_rate,
              terrace_per_site: props?.property?.property?.valuation?.terrace_per_site,
              terrace_per_plan: props?.property?.property?.valuation?.terrace_per_plan,
              open_parking_value: props?.property?.property?.specification?.parking_type === "Open Car Parking" ? props?.property?.property?.specification?.carparking_value : props?.property?.property?.valuation?.open_parking_value,
              open_parking_no: props?.property?.property?.specification?.parking_type === "Open Car Parking" ? props?.property?.property?.specification?.car_parking_no : props?.property?.property?.valuation?.open_parking_no,
              mechanical_car_parking_value: props?.property?.property?.specification?.parking_type === "Mechanical stack Parking" ? props?.property?.property?.specification?.carparking_value :  props?.property?.property?.valuation?.mechanical_car_parking_value,
              mechanical_stack_parking_no: props?.property?.property?.specification?.parking_type === "Mechanical stack Parking" ? props?.property?.property?.specification?.car_parking_no : props?.property?.property?.valuation?.mechanical_stack_parking_no,
              covered_car_parking_value: props?.property?.property?.specification?.parking_type === "Covered Car Parking" ? props?.property?.property?.specification?.carparking_value : props?.property?.property?.valuation?.covered_car_parking_value,
              covered_car_parking_no: props?.property?.property?.specification?.parking_type === "Covered Car Parking" ? props?.property?.property?.specification?.car_parking_no : props?.property?.property?.valuation?.covered_car_parking_no,
              depricated_value: props?.property?.property?.valuation?.depricated_value,
              renevotion_value: props?.property?.property?.valuation?.renevotion_value,
        distress_percentage: props?.property?.property?.valuation?.distress_percentage,
        distress_value: props?.property?.property?.valuation?.distress_value,
        age_per_agreement: props?.property?.property?.valuation?.age_per_agreement,
        as_per_site_inspection: props?.property?.property?.valuation?.as_per_site_inspection,
        esitimated_age: props?.property?.property?.valuation?.esitimated_age,
        externel_expenses: props?.property?.property?.valuation?.externel_expenses,
        rent_per_month: props?.property?.property?.valuation?.rent_per_month,
        rent_per_sqrft: props?.property?.property?.valuation?.rent_per_sqrft,
        carpet_area_per_plan: props?.property?.property?.valuation?.carpet_area_per_plan,
        carpet_area_per_agreement: props?.property?.property?.valuation?.carpet_area_per_agreement,
        carpet_area_per_site: props?.property?.property?.valuation?.carpet_area_per_site,
        construction_cost: props?.property?.property?.valuation?.type?.construction_cost,
        age_of_property: props?.property?.property?.project?.building_age,
        usefull_age_of_property: props?.property?.property?.project?.residual_age,
   
              building_age_aggrement: props?.property?.property?.specification?.as_per_aggrement,
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
            })}
          >
            {(formProps) => (
              <Form enctype="multipart/form-data">
                
                  {props.name==="Depriciation"?
                  <Row>
                    <Col md={12}>
                      <div style={{"display":"flex","align-items":"center"}}>
                     <Label>Depriciation=</Label>
                      <div >
                      <div style={{"border-bottom":"1px solid"}}>
                        {/* Age of Property */}
                        <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
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
                      </div>
                      <div>
                        {/* Usefull Age of Property */}
                        <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        size="small"
                        label="Usefull Age of Property"
                        id="usefull_age_of_property"
                        name="usefull_age_of_property"
                        value={formProps.values.usefull_age_of_property}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.usefull_age_of_property &&
                          Boolean(formProps.errors.usefull_age_of_property)
                        }
                        helperText={
                          formProps.touched.usefull_age_of_property &&
                          formProps.errors.usefull_age_of_property
                        }
                        />
                      </div>
                      </div>
                      <h3>X</h3>
                      <div>
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        size="small"
                        label="Construction Cost"
                        id="construction_cost"
                        name="construction_cost"
                        value={formProps.values.construction_cost}
                        onChange={formProps.handleChange}
                        />
                      </div>
                      </div>
                    </Col>
                    <Col md={6} className="">
                      <Label>Depriciated Value</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        size="small"
                        label="Depriciated Value"
                        id="depricated_value"
                        name="depricated_value"
                        value={((+formProps.values.age_of_property/+formProps.values.usefull_age_of_property) * +formProps.values.construction_cost).toFixed(2)}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.depricated_value &&
                          Boolean(formProps.errors.depricated_value)
                        }
                        helperText={
                          formProps.touched.depricated_value &&
                          formProps.errors.depricated_value
                        }
                        />
                    </Col>
                        </Row>
                        :""}
                    {props.name==="Parking"?
                    <Row>
                      
                    <Col md={6} className="">
                        <Label>Covered Car Parking No.</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        size="small"
                        label="Covered Car Parking No."
                        id="covered_car_parking_no"
                        name="covered_car_parking_no"
                        value={formProps.values.covered_car_parking_no}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.covered_car_parking_no &&
                          Boolean(formProps.errors.covered_car_parking_no)
                        }
                        helperText={
                          formProps.touched.covered_car_parking_no &&
                          formProps.errors.covered_car_parking_no
                        }
                      />
                    </Col>
                    <Col md={6} className="">
                        <Label>Covered Car Parking Value</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        size="small"
                        label="Covered Car Parking Value"
                        id="covered_car_parking_value"
                        name="covered_car_parking_value"
                        value={formProps.values.covered_car_parking_value}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.covered_car_parking_value &&
                          Boolean(formProps.errors.covered_car_parking_value)
                        }
                        helperText={
                          formProps.touched.covered_car_parking_value &&
                          formProps.errors.covered_car_parking_value
                        }
                      />
                    </Col>
                    <Col md={6} className="">
                        <Label>Mechanical stack Parking No.</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        size="small"
                        label="Mechanical stack Parking No."
                        id="mechanical_stack_parking_no"
                        name="mechanical_stack_parking_no"
                        value={formProps.values.mechanical_stack_parking_no}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.mechanical_stack_parking_no &&
                          Boolean(formProps.errors.mechanical_stack_parking_no)
                        }
                        helperText={
                          formProps.touched.mechanical_stack_parking_no &&
                          formProps.errors.mechanical_stack_parking_no
                        }
                      />
                    </Col>
                    <Col md={6} className="">
                        <Label>Mechanical stack Parking Value</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        size="small"
                        label="Mechanical stack Parking Value"
                        id="mechanical_car_parking_value"
                        name="mechanical_car_parking_value"
                        value={formProps.values.mechanical_car_parking_value}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.mechanical_car_parking_value &&
                          Boolean(formProps.errors.mechanical_car_parking_value)
                        }
                        helperText={
                          formProps.touched.mechanical_car_parking_value &&
                          formProps.errors.mechanical_car_parking_value
                        }
                      />
                    </Col>
                    <Col md={6} className="">
                        <Label>Open Car Parking No.</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        size="small"
                        label="Open Car Parking No."
                        id="open_parking_no"
                        name="open_parking_no"
                        value={formProps.values.open_parking_no}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.open_parking_no &&
                          Boolean(formProps.errors.open_parking_no)
                        }
                        helperText={
                          formProps.touched.open_parking_no &&
                          formProps.errors.open_parking_no
                        }
                        />
                    </Col>
                    <Col md={6} className="">
                        <Label>Open Car Parking Value</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        size="small"
                        label="Open Car Parking Value"
                        id="open_parking_value"
                        name="open_parking_value"
                        value={formProps.values.open_parking_value}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.open_parking_value &&
                          Boolean(formProps.errors.open_parking_value)
                        }
                        helperText={
                          formProps.touched.open_parking_value &&
                          formProps.errors.open_parking_value
                        }
                        />
                    </Col>
                    </Row>
                        :""}
                    {props.name==="Carpet Area"?
                    <Row>
                      
                    <Col md={6} className="">
                        <Label>Carpet Area As per Site</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        size="small"
                        label="Carpet Area As per Site"
                        id="carpet_area_per_site"
                        name="carpet_area_per_site"
                        value={formProps.values.carpet_area_per_site}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.carpet_area_per_site &&
                          Boolean(formProps.errors.carpet_area_per_site)
                        }
                        helperText={
                          formProps.touched.carpet_area_per_site &&
                          formProps.errors.carpet_area_per_site
                        }
                      />
                    </Col>
                    <Col md={6} className="">
                        <Label>Carpet Area As per Aggreement</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        size="small"
                        label="Carpet Area As per Aggreement"
                        id="carpet_area_per_agreement"
                        name="carpet_area_per_agreement"
                        value={formProps.values.carpet_area_per_agreement}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.carpet_area_per_agreement &&
                          Boolean(formProps.errors.carpet_area_per_agreement)
                        }
                        helperText={
                          formProps.touched.carpet_area_per_agreement &&
                          formProps.errors.carpet_area_per_agreement
                        }
                      />
                    </Col>
                    <Col md={6} className="">
                        <Label>Carpet Area As per Plan</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        size="small"
                        label="Carpet Area As per Plan"
                        id="carpet_area_per_plan"
                        name="carpet_area_per_plan"
                        value={formProps.values.carpet_area_per_plan}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.carpet_area_per_plan &&
                          Boolean(formProps.errors.carpet_area_per_plan)
                        }
                        helperText={
                          formProps.touched.carpet_area_per_plan &&
                          formProps.errors.carpet_area_per_plan
                        }
                      />
                    </Col>
                  
                    </Row>
                        :""}

                        {props.name==="Terrace"?
                    <Row>
                    <Col md={6} className="">
                        <Label>Terrace Area as per Plan</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        size="small"
                        label="Area as per Plan"
                        id="terrace_per_plan"
                        name="terrace_per_plan"
                        value={formProps.values.terrace_per_plan}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.terrace_per_plan &&
                          Boolean(formProps.errors.terrace_per_plan)
                        }
                        helperText={
                          formProps.touched.terrace_per_plan &&
                          formProps.errors.terrace_per_plan
                        }
                      />
                    </Col>
                    <Col md={6} className="">
                    <Label>Terrace Area as per Site</Label>

                      <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        size="small"
                        label="Area as per Site"
                        id="terrace_per_site"
                        name="terrace_per_site"
                        value={formProps.values.terrace_per_site}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.terrace_per_site &&
                          Boolean(formProps.errors.terrace_per_site)
                        }
                        helperText={
                          formProps.touched.terrace_per_site &&
                          formProps.errors.terrace_per_site
                        }
                      />
                    </Col>
                    
                    <Col md={6} className="">
                    <Label>Terrace Area as per Document</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        size="small"
                        label="Area as per Document"
                        id="terrace_per_doc"
                        name="terrace_per_doc"
                        value={formProps.values.terrace_per_doc}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.terrace_per_doc &&
                          Boolean(formProps.errors.terrace_per_doc)
                        }
                        helperText={
                          formProps.touched.terrace_per_doc &&
                          formProps.errors.terrace_per_doc
                        }
                        />
                    </Col>
                    <Col md={6} className="">
                    <Label>Terrace rate</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        size="small"
                        label="Terrace rate"
                        id="terrace_rate"
                        name="terrace_rate"
                        value={formProps.values.terrace_rate}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.terrace_rate &&
                          Boolean(formProps.errors.terrace_rate)
                        }
                        helperText={
                          formProps.touched.terrace_rate &&
                          formProps.errors.terrace_rate
                        }
                        />
                    </Col>
                        </Row>
                        :""}
                        {props.name==="Garden"?
                        <Row>
                          
                    <Col md={6} className="">
                        <Label>Area as per Plan</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        size="small"
                        label="Area as per Plan"
                        id="garden_per_plan"
                        name="garden_per_plan"
                        value={formProps.values.garden_per_plan}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.garden_per_plan &&
                          Boolean(formProps.errors.garden_per_plan)
                        }
                        helperText={
                          formProps.touched.garden_per_plan &&
                          formProps.errors.garden_per_plan
                        }
                      />
                    </Col>
                    <Col md={6} className="">
                    <Label>Area as per Site</Label>

                      <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        size="small"
                        label="Area as per Site"
                        id="garden_per_site"
                        name="garden_per_site"
                        value={formProps.values.garden_per_site}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.garden_per_site &&
                          Boolean(formProps.errors.garden_per_site)
                        }
                        helperText={
                          formProps.touched.garden_per_site &&
                          formProps.errors.garden_per_site
                        }
                      />
                    </Col>
                    <Col md={6} className="">
                    <Label>Area as per Document</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        size="small"
                        label="Area as per Document"
                        id="garden_per_doc"
                        name="garden_per_doc"
                        value={formProps.values.garden_per_doc}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.garden_per_doc &&
                          Boolean(formProps.errors.garden_per_doc)
                        }
                        helperText={
                          formProps.touched.garden_per_doc &&
                          formProps.errors.garden_per_doc
                        }
                      />
                    </Col>
                    <Col md={6} className="">
                    <Label>Garden Area</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        size="small"
                        label="Garden Area"
                        id="garden_per_area"
                        name="garden_per_area"
                        value={formProps.values.garden_per_area}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.garden_per_area &&
                          Boolean(formProps.errors.garden_per_area)
                        }
                        helperText={
                          formProps.touched.garden_per_area &&
                          formProps.errors.garden_per_area
                        }
                      />
                    </Col>
                    <Col md={6} className="">
                    <Label>Garden Rate</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        size="small"
                        label="Garden Rate"
                        id="garden_rate"
                        name="garden_rate"
                        value={formProps.values.garden_rate}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.garden_rate &&
                          Boolean(formProps.errors.garden_rate)
                        }
                        helperText={
                          formProps.touched.garden_rate &&
                          formProps.errors.garden_rate
                        }
                      />
                    </Col>
                    </Row>
                      :""}
                      {props.name==="Rent"?
                    <Row>
                    <Col md={6} className="">
                    <Label>Gross Rent Per Month</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        size="small"
                        label="Gross Rent Per Month"
                        id="rent_per_month"
                        name="rent_per_month"
                        value={formProps.values.rent_per_month}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.rent_per_month &&
                          Boolean(formProps.errors.rent_per_month)
                        }
                        helperText={
                          formProps.touched.rent_per_month &&
                          formProps.errors.rent_per_month
                        }
                      />
                    </Col>
                    <Col md={6} className="">
                    <Label>Rent per sqr.ft.</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        size="small"
                        label="Rent per sqr.ft."
                        id="rent_per_sqrft"
                        name="rent_per_sqrft"
                        value={formProps.values.rent_per_sqrft}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.rent_per_sqrft &&
                          Boolean(formProps.errors.rent_per_sqrft)
                        }
                        helperText={
                          formProps.touched.rent_per_sqrft &&
                          formProps.errors.rent_per_sqrft
                        }
                      />
                    </Col>
                    <Col md={6} className="">
                    <Label>Rent Yield</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        size="small"
                        label="Rent Yield"
                        id="yield"
                        name="yield"
                        value={formProps.values.yield}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.yield &&
                          Boolean(formProps.errors.yield)
                        }
                        helperText={
                          formProps.touched.yield &&
                          formProps.errors.yield
                        }
                      />
                    </Col>
                    <Col md={6} className="">
                    <Label>Other Expenses / Property Tax</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        size="small"
                        label="Other Expenses / Property Tax"
                        id="externel_expenses"
                        name="externel_expenses"
                        value={formProps.values.externel_expenses}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.externel_expenses &&
                          Boolean(formProps.errors.externel_expenses)
                        }
                        helperText={
                          formProps.touched.externel_expenses &&
                          formProps.errors.externel_expenses
                        }
                      />
                    </Col>
                    </Row>
                    :""}
                    {props.name==="Age"?
                    <Row>
                    <Col md={6} className="">
                    <Label>Age As per site inspection </Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        size="small"
                        label="Age As per site inspection"
                        id="as_per_site_inspection"
                        name="as_per_site_inspection"
                        value={formProps.values.as_per_site_inspection}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.as_per_site_inspection &&
                          Boolean(formProps.errors.as_per_site_inspection)
                        }
                        helperText={
                          formProps.touched.as_per_site_inspection &&
                          formProps.errors.as_per_site_inspection
                        }
                      />
                    </Col>
                    <Col md={6} className="">
                    <Label>Age As per Aggrement </Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        size="small"
                        label="Age As per Aggrement"
                        id="age_per_agreement"
                        name="age_per_agreement"
                        value={formProps.values.age_per_agreement}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.age_per_agreement &&
                          Boolean(formProps.errors.age_per_agreement)
                        }
                        helperText={
                          formProps.touched.age_per_agreement &&
                          formProps.errors.age_per_agreement
                        }
                      />
                    </Col>
                    <Col md={6} className="">
                    <Label>Residual age of Bulding</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        size="small"
                        label="Residual age of Bulding"
                        id="residual_age"
                        name="residual_age"
                        value={formProps.values.residual_age}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.residual_age &&
                          Boolean(formProps.errors.residual_age)
                        }
                        helperText={
                          formProps.touched.residual_age &&
                          formProps.errors.residual_age
                        }
                      />
                    </Col>
                    <Col md={6} className="">
                    <Label>Estimated Age of building</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        size="small"
                        label="Estimated Age of building"
                        id="esitimated_age"
                        name="esitimated_age"
                        value={formProps.values.esitimated_age}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.esitimated_age &&
                          Boolean(formProps.errors.esitimated_age)
                        }
                        helperText={
                          formProps.touched.esitimated_age &&
                          formProps.errors.esitimated_age
                        }
                      />
                    </Col>
                    </Row>
                          :""}
                          {props.name==="Distress Value"?
                    <Row>
                    
                    <Col md={6} className="">
                    <Label>Distress Value</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        size="small"
                        label="Distress Value"
                        id="distress_value"
                        name="distress_value"
                        value={formProps.values.distress_value}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.distress_value &&
                          Boolean(formProps.errors.distress_value)
                        }
                        helperText={
                          formProps.touched.distress_value &&
                          formProps.errors.distress_value
                        }
                      />
                    </Col>
                    <Col md={6} className="">
                    <Label>Distress Percentage</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        size="small"
                        label="Distress Percentage"
                        id="distress_percentage"
                        name="distress_percentage"
                        value={formProps.values.distress_percentage}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.distress_percentage &&
                          Boolean(formProps.errors.distress_percentage)
                        }
                        helperText={
                          formProps.touched.distress_percentage &&
                          formProps.errors.distress_percentage
                        }
                      />
                    </Col>
                
                
                   
                </Row>
                        :""}
                          {props.name==="Additional Charges"?
                    <Row>
                    <Col md={6} className="">
                    <Label>Additional Charges</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        size="small"
                        label="Additional Charges"
                        id="additional_charges"
                        name="additional_charges"
                        value={formProps.values.additional_charges}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.additional_charges &&
                          Boolean(formProps.errors.additional_charges)
                        }
                        helperText={
                          formProps.touched.additional_charges &&
                          formProps.errors.additional_charges
                        }
                      />
                    </Col>
                    <Col md={6} className="">
                    <Label>Description</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Description"
                        id="description"
                        name="description"
                        value={formProps.values.description}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.description &&
                          Boolean(formProps.errors.description)
                        }
                        helperText={
                          formProps.touched.description &&
                          formProps.errors.description
                        }
                      />
                    </Col>
                
                
                   
                </Row>
                        :""}
                          {props.name==="Forced Value"?
                    <Row>
                    <Col md={6} className="">
                    <Label>Forced Sale Value</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        size="small"
                        label="Forced Sale Value"
                        id="forced_sale_value"
                        name="forced_sale_value"
                        value={formProps.values.forced_sale_value}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.forced_sale_value &&
                          Boolean(formProps.errors.forced_sale_value)
                        }
                        helperText={
                          formProps.touched.forced_sale_value &&
                          formProps.errors.forced_sale_value
                        }
                      />
                    </Col>
                    <Col md={6} className="">
                    <Label>Realization Value</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        size="small"
                        label="Realization Value"
                        id="realization_value"
                        name="realization_value"
                        value={formProps.values.realization_value}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.realization_value &&
                          Boolean(formProps.errors.realization_value)
                        }
                        helperText={
                          formProps.touched.realization_value &&
                          formProps.errors.realization_value
                        }
                      />
                    </Col>
                    {/* <Col md={6} className="">
                    <Label>Distress Value</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        size="small"
                        label="Distress Value"
                        id="distress_value"
                        name="distress_value"
                        value={formProps.values.distress_value}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.distress_value &&
                          Boolean(formProps.errors.distress_value)
                        }
                        helperText={
                          formProps.touched.distress_value &&
                          formProps.errors.distress_value
                        }
                      />
                    </Col>
                 */}
                
                   
                </Row>
                        :""}

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
        </ModalBody>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    property: state.property,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editValuationData: (data, setValue, value, token) =>
    dispatch(editValuationData(data, setValue, value, token)),
    // editBrokersData: (data) => dispatch(editBrokersData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateValuation);
