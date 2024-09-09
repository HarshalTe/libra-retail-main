import React from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Table,
  Label,
} from "reactstrap";
import Button from "@mui/material/Button";
import TextField from "@material-ui/core/TextField";
import { MenuItem } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { Autocomplete, Divider, Typography } from "@mui/material";
//*Actions
import { editUnitDetailData } from "../../../../../Redux/Creators/UnitDetailCreators";

//*Compoenets
import LinerLoader from "components/Loaders/LinerLoader";
import Box from "@mui/material/Box";
import LinearProgressWithLabel from "../ProjectDetails/LinearProgressWithLabel";
import ADD_ONE from "../../../../../Redux/Types/ActionTypes";
import { useDispatch } from "react-redux";
import { editSpecificationsData2 } from "../../../../../Redux/Creators/SpecificationsCreators";
import { editProgressData } from "../../../../../Redux/Creators/ProgressCreators";

function UnitDetails(props) {
  const [progress, setProgress] = React.useState(0);

  const token = props.login?.login?.token;
  const dispatch = useDispatch();

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);

    const value = 2;

    // const value2 = 4;

    let progressData = {
      id: props?.property?.property?.id,
      unitDetailsProgress: 1,
    };

    props.editProgressData(
      progressData,
      props.setValue,
      value,
      props.login?.login?.token
    );
    // props.editUnitDetailData(data, props.setValue, value, token);
    // props.editSpecificationsData2(data2, props.setValue, value, token);
    // setSubmitting(false);
    handleSubmit2(values, { setSubmitting });
  };
  const handleSubmit2 = (values, { setSubmitting }) => {
    console.log("Values:", values);

    let data = {
      // token: token,
      id: values.id,
      property_id: values.property_id,
      project_type: values.project_type,
      property_type: values.property_type,
      property_detail: values.property_detail,
      unit_type: values.unit_type,
      unit_floors: values.unit_floors,
      stories_as_plan: values.stories_as_plan,
      stories_on_site: values.stories_on_site,
      usage_type: values.usage_type,
      wings: values.wings,
      lift: values.lift,
      occupancy_level: values.occupancy_level,
      floor_occupancy_level: values.floor_occupancy_level,
      flats_per_floor: values.flats_per_floor,
      no_floors: values.no_floors,
      configuration: values.configuration,
      bedroom: values.bedroom,
      bathroom: values.bathroom,
      kitchen: values.kitchen,
      living: values.living,
      amenities: values.amenities,
      // main_road_width: values.main_road_width,
      security_system: values.security_system,
      unit_view: values.unit_view,
      total_room: values.total_room,
      flat_pos_from_lift: values.flat_pos_from_lift,
      power_supply: values.power_supply,
      policy_caption_area: values.policy_caption_area,
      is_boundary_matched: values.is_boundary_matched,
      risk_of_tension: values.risk_of_tension,
      is_locality_property: values.is_locality_property,
      court_as_approved: values.court_as_approved,
      structure_type: values.structure_type,
      document_visited: values.document_visited,
      document_remarks: values.document_remarks,
      section_plan_verified: values.section_plan_verified,
      seller_name_verified: values.seller_name_verified,
      seller_no_remarks: values.seller_no_remarks,
      floorwise_wise_usage: values.floorwise_wise_usage,

      //*add by me
      water_connection_from: values.water_connection_from,
      property_access_road_width: values.property_access_road_width,

      //*
      boundaries: values.boundaries,
      deleted_boundaries: values.deleted_boundaries,
      flat_pos_from_staircase: values.flat_pos_from_staircase,
      usage_on_site_floorwise: values.usage_on_site_floorwise,
    };

    const value = 2;
    let data2 = {
      id: values.id,
      property_id: values.property_id,
      is_water: values.is_water,
      electric_metre_pos: values.electric_metre_pos,
      water_connection: values.water_connection,
      drainage_connection: values.drainage_connection,
      is_sewer_connection: values.is_sewer_connection,
    };
    // const value2 = 4;

    // props.editProgressData(progressData, props.setValue, value,props.login?.login?.token);
    props.editUnitDetailData(data, props.setValue, value, token);
    props.editSpecificationsData2(data2, props.setValue, value, token);
    // props.setValue(2)
    setSubmitting(false);
  };
  const formPropsLength = 45;

  return (
    <>
      {props.unitDetails.isLoading ? (
        <div>
          <LinerLoader />
        </div>
      ) : (
        <div>
          <br />
          <Formik
            initialValues={{
              id: props?.property?.property?.unit_detail?.id,
              property_id: props?.property?.property?.id,
              project_type:
                props?.property?.property?.unit_detail?.project_type,
              property_type:
                props?.property?.property?.unit_detail?.property_type,
              property_detail:
                props?.property?.property?.unit_detail?.property_detail,
              unit_type: props?.property?.property?.unit_detail?.unit_type,
              unit_floors: props?.property?.property?.unit_detail?.unit_floors,
              stories_as_plan:
                props?.property?.property?.unit_detail?.stories_as_plan,
              stories_on_site:
                props?.property?.property?.unit_detail?.stories_on_site,
              usage_type: props?.property?.property?.unit_detail?.usage_type,
              wings: props?.property?.property?.unit_detail?.wings,
              lift: props?.property?.property?.unit_detail?.lift,
              occupancy_level:
                props?.property?.property?.unit_detail?.occupancy_level,
              floor_occupancy_level:
                props?.property?.property?.unit_detail?.floor_occupancy_level,
              flats_per_floor:
                props?.property?.property?.unit_detail?.flats_per_floor,
              no_floors: props?.property?.property?.unit_detail?.no_floors,
              configuration:
                props?.property?.property?.unit_detail?.configuration,
              bedroom: props?.property?.property?.unit_detail?.bedroom,
              bathroom: props?.property?.property?.unit_detail?.bathroom,
              kitchen: props?.property?.property?.unit_detail?.kitchen,
              living: props?.property?.property?.unit_detail?.living,
              amenities: props?.property?.property?.unit_detail?.amenities,
              // main_road_width: props?.property?.property?.unit_detail?.main_road_width,
              security_system:
                props?.property?.property?.unit_detail?.security_system,
              unit_view: props?.property?.property?.unit_detail?.unit_view,
              total_room: props?.property?.property?.unit_detail?.total_room,
              flat_pos_from_lift:
                props?.property?.property?.unit_detail?.flat_pos_from_lift,
              flat_pos_from_staircase:
                props?.property?.property?.unit_detail?.flat_pos_from_staircase,
              electric_metre_pos:
                props?.property?.property?.specification?.electric_metre_pos,
              water_connection:
                props?.property?.property?.specification?.water_connection,
              power_supply:
                props?.property?.property?.unit_detail?.power_supply,
              drainage_connection:
                props?.property?.property?.specification?.drainage_connection,
              is_sewer_connection:
                props?.property?.property?.specification?.is_sewer_connection,
              policy_caption_area:
                props?.property?.property?.unit_detail?.policy_caption_area,
              is_boundary_matched:
                props?.property?.property?.unit_detail?.is_boundary_matched,
              risk_of_tension:
                props?.property?.property?.unit_detail?.risk_of_tension,
              is_locality_property:
                props?.property?.property?.unit_detail?.is_locality_property,
              court_as_approved:
                props?.property?.property?.unit_detail?.court_as_approved,
              structure_type:
                props?.property?.property?.unit_detail?.structure_type,
              document_visited:
                props?.property?.property?.unit_detail?.document_visited,
              document_remarks:
                props?.property?.property?.unit_detail?.document_remarks,
              section_plan_verified:
                props?.property?.property?.unit_detail?.section_plan_verified,
              seller_name_verified:
                props?.property?.property?.unit_detail?.seller_name_verified,
              seller_no_remarks:
                props?.property?.property?.unit_detail?.seller_no_remarks,

              //*add by me
              bathroom: props?.property?.property?.unit_detail?.bathroom,
              water_connection_from:
                props?.property?.property?.unit_detail?.water_connection_from,
              is_water: props?.property?.property?.specification?.is_water,
              property_access_road_width:
                props?.property?.property?.unit_detail?.property_access_road_width,
              floorwise_wise_usage:
                props?.property?.property?.unit_detail?.floorwise_wise_usage,

              //*
              boundaries: props?.property?.property?.unit_detail?.boundaries,
              usage_on_site_floorwise:
                props?.property?.property?.unit_detail
                  ?.usage_on_site_floorwise || [],
              direction_name: "",
              ownership: "",
              site: "",
              plan: "",
              deleted_boundaries: [],
              boundries: [],
              property_mortgage: [],
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              // branch_name: Yup.string().required("Branch Name is required"),
            })}
          >
            {(formProps) => (
              <Form>
                <div className="pb-4">
                  <Box sx={{ width: "90%" }}>
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
                <Typography variant={"h5"}>Unit Details</Typography>
                <Divider />
                <br />
                <Row className="form-group">
                  <Col md={4} className="pb-4">
                    <Autocomplete
                      fullWidth
                      id="project_type-autocomplete"
                      options={
                        props?.dropdowns?.dropdowns?.filter(
                          (field) => field?.name === "Type of Project"
                        )[0]?.drop_down_details || []
                      }
                      getOptionLabel={(option) => option?.name || ""}
                      onChange={(e, value) => {
                        formProps.setFieldValue(
                          "project_type",
                          value?.name || ""
                        );
                        if (value?.name) {
                          setProgress(progress + 100 / formPropsLength);
                        }
                      }}
                      onOpen={formProps.handleBlur}
                                            includeInputInList
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Type of project"
                          name="project_type"
                          variant="standard"
                          size="small"
                        />
                      )}
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
                        if (value?.name) {
                          setProgress(progress + 100 / formPropsLength);
                        }
                      }}
                      onOpen={formProps.handleBlur}
                                            includeInputInList
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Type of property"
                          name="property_type"
                          variant="standard"
                          size="small"
                        />
                      )}
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <Autocomplete
                      fullWidth
                      id="property_detail-autocomplete"
                      options={
                        props?.dropdowns?.dropdowns?.filter(
                          (field) =>
                            field?.name === "Property Details as per Site"
                        )[0]?.drop_down_details || []
                      }
                      getOptionLabel={(option) => option?.name || ""}
                      onChange={(e, value) => {
                        formProps.setFieldValue(
                          "property_detail",
                          value?.name || ""
                        );
                        if (value?.name) {
                          setProgress(progress + 100 / formPropsLength);
                        }
                      }}
                      onOpen={formProps.handleBlur}
                                            includeInputInList
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Property details"
                          name="property_detail"
                          variant="standard"
                          size="small"
                        />
                      )}
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="unit_type"
                      name="unit_type"
                      label="Type of units"
                      variant="standard"
                      value={formProps.values.unit_type}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.unit_type)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="unit_floors"
                      name="unit_floors"
                      label="Units floor no."
                      variant="standard"
                      value={formProps.values.unit_floors}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.unit_floors)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="stories_as_plan"
                      name="stories_as_plan"
                      label="No. of stories as per plan"
                      variant="standard"
                      value={formProps.values.stories_as_plan}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.stories_as_plan)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="stories_on_site"
                      name="stories_on_site"
                      label="No. of Stories As per site"
                      variant="standard"
                      value={formProps.values.stories_on_site}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.stories_on_site)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="wings"
                      name="wings"
                      label="No. of wings"
                      variant="standard"
                      value={formProps.values.wings}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.wings)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="lift"
                      name="lift"
                      label="No. of Lifts &#x1F4F1;"
                      variant="standard"
                      value={formProps.values.lift}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.lift)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="flats_per_floor"
                      name="flats_per_floor"
                      label="Units per Floor &#x1F4F1;"
                      // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                      variant="standard"
                      value={formProps.values.flats_per_floor}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.flats_per_floor)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      id="floor_occupancy_level"
                      name="floor_occupancy_level"
                      label="Floor Occupancy Level"
                      variant="standard"
                      value={formProps.values.floor_occupancy_level}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.floor_occupancy_level)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                      >
                      <MenuItem value="">Select</MenuItem>
                        {props?.dropdowns?.dropdowns
                          ?.filter((field) => field?.name == "Floor Occupancy Level")[0]
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
    select
    id="project_occupancy_level"
    name="project_occupancy_level"
    label="Project Occupancy Level"
    variant="standard"
    value={formProps.values.project_occupancy_level}
    onChange={formProps.handleChange}
    onBlur={() => {
      if (formProps.values.project_occupancy_level)
        setProgress(progress + 100 / formPropsLength);
    }}
  >
    <MenuItem value="">Select</MenuItem>
    {props?.dropdowns?.dropdowns
      ?.filter((field) => field?.name == "Project Occupancy Level")[0]
      ?.drop_down_details?.map((field, i) => (
        <MenuItem key={i} value={field?.name}>
          {field?.name}
        </MenuItem>
      ))}
  </TextField>
</Col>


                  <Col md={4} className="pb-4">
                    <Autocomplete
                      fullWidth
                      id="amenities-autocomplete"
                      options={
                        props?.dropdowns?.dropdowns?.filter(
                          (field) => field?.name === "Project Amenities"
                        )[0]?.drop_down_details || []
                      }
                      getOptionLabel={(option) => option?.name || ""}
                      onChange={(e, value) => {
                        formProps.setFieldValue("amenities", value?.name || "");
                        // Example: Uncomment the below lines to handle progress update on change
                        // if (value?.name) {
                        //   setProgress(progress + 100 / formPropsLength);
                        // }
                      }}
                      onOpen={formProps.handleBlur}
                                            includeInputInList
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Project amenities"
                          name="amenities"
                          variant="standard"
                          size="small"
                        />
                      )}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <Autocomplete
                      fullWidth
                      id="security_system-autocomplete"
                      options={
                        props?.dropdowns?.dropdowns?.filter(
                          (field) => field?.name === "Security System"
                        )[0]?.drop_down_details || []
                      }
                      getOptionLabel={(option) => option?.name || ""}
                      onChange={(e, value) => {
                        formProps.setFieldValue(
                          "security_system",
                          value?.name || ""
                        );
                        if (value?.name) {
                          setProgress(progress + 100 / formPropsLength);
                        }
                      }}
                      onOpen={formProps.handleBlur}
                      includeInputInList
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Security system"
                          name="security_system"
                          variant="standard"
                          size="small"
                        />
                      )}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      // select
                      id="unit_view"
                      name="unit_view"
                      label="View from unit &#x1F4F1;"
                      // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                      variant="standard"
                      value={formProps.values.unit_view}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.unit_view)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    >
                      {/* <MenuItem value="Sea">Sea</MenuItem>
                      <MenuItem value="Road">Road</MenuItem>
                      <MenuItem value="Garden">Garden</MenuItem> */}
                    </TextField>
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      // select
                      id="flat_pos_from_lift"
                      name="flat_pos_from_lift"
                      label="Location of Flat from Lift &#x1F4F1;"
                      // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                      variant="standard"
                      value={formProps.values.flat_pos_from_lift}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.flat_pos_from_lift)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    >
                      {/* <MenuItem vlaue=""></MenuItem>
                      <MenuItem vlaue=""></MenuItem>
                      <MenuItem value="Left">Left</MenuItem>
                      <MenuItem vlaue="Right">Right</MenuItem>
                      <MenuItem value="Opposite">Opposite</MenuItem> */}
                    </TextField>
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      id="flat_pos_from_staircase"
                      name="flat_pos_from_staircase"
                      label="Location of Flat from Staircase &#x1F4F1;"
                      variant="standard"
                      value={formProps.values.flat_pos_from_staircase}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.flat_pos_from_staircase)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    >
                      {/* <MenuItem vlaue=""></MenuItem>
                      <MenuItem vlaue=""></MenuItem>
                      <MenuItem value="Left">Left</MenuItem>
                      <MenuItem vlaue="Right">Right</MenuItem>
                      <MenuItem value="Opposite">Opposite</MenuItem> */}
                    </TextField>
                  </Col>

                  </Row>
                <Typography variant={"h5"}>Unit Configuration</Typography>
                <Row>
                <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="configuration"
                      name="configuration"
                      label="Configuration &#x1F4F1;"
                      // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                      variant="standard"
                      value={formProps.values.configuration}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.configuration)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="bedroom"
                      name="bedroom"
                      label="Bedroom"
                      variant="standard"
                      value={formProps.values.bedroom}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.bedroom)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      name="bathroom"
                      id="bathroom"
                      label="Bathroom"
                      variant="standard"
                      value={formProps.values.bathroom}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.bathroom)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="kitchen"
                      name="kitchen"
                      label="Kitchen"
                      variant="standard"
                      value={formProps.values.kitchen}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.kitchen)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
  <TextField
    fullWidth
    id="remarks_for_kitchen"
    name="remarks_for_kitchen"
    label="Remarks for Kitchen"
    variant="standard"
    value={formProps.values.remarks_for_kitchen}
    onChange={formProps.handleChange}
    onBlur={() => {
      if (formProps.values.remarks_for_kitchen)
        setProgress(progress + 100 / formPropsLength);
    }}
  />
</Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="living"
                      name="living"
                      label="Living/Dining"
                      variant="standard"
                      value={formProps.values.living}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.living)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="total_room"
                      name="total_room"
                      label="Total room"
                      variant="standard"
                      value={formProps.values.total_room}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.total_room)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                </Row>

                <Typography variant={"h5"}>Amalgamation Details</Typography>

                <Row className="pt-4 pb-2">
                  <Col md={12}>
                    <FieldArray
                      name="amalgamate"
                      render={(arrayHelpers) => (
                        <div>
                          <Row>
                    
                    <Col md={3} className="pb-4">
                      <TextField
                        fullWidth
                        id="unit_no"
                        name="unit_no"
                        size="small"
                        label="Unit No. &#x1F4F1;"
                        variant="standard"
                        // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                        value={formProps.values.unit_no}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                            if (formProps.values.unit_no)
                              setProgress(progress + 100 / formPropsLength);
                            }}
                          />
                    </Col>
                    <Col md={3} className="pb-4">
                      <TextField
                        fullWidth
                        id="entry_from_unit"
                        name="entry_from_unit"
                        size="small"
                        label="Entry from Unit No. &#x1F4F1;"
                        variant="standard"
                        // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                        value={formProps.values.entry_from_unit}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.entry_from_unit)
                          setProgress(progress + 100 / formPropsLength);
                        }}
                        />
                    </Col>
                    <Col md={2} className="pb-4">
                      <TextField
                        fullWidth
                        id="wc_unit"
                        size="small"
                        name="wc_unit"
                        label="W/C in Unit No. &#x1F4F1;"
                        variant="standard"
                        // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                        value={formProps.values.wc_unit}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.wc_unit)
                          setProgress(progress + 100 / formPropsLength);
                        }}
                        />
                    </Col>
                    <Col md={2} className="pb-4">
                      <TextField
                        fullWidth
                        id="kitchen"
                        size="small"
                        name="kitchen"
                        label="kitchen in Unit No. &#x1F4F1;"
                        variant="standard"
                        // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                        value={formProps.values.kitchen}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.kitchen)
                          setProgress(progress + 100 / formPropsLength);
                        }}
                        />
                    </Col>
                          

                            <Col md={2}>
                              <Button
                                color="success"
                                variant="contained"
                                onClick={() => {
                                  arrayHelpers.push({
                                    property_id: formProps.values.property_id,
                                    unit_no: formProps.values.unit_no,
                                    entry_from_unit: formProps.values.entry_from_unit,
                                    wc_unit: formProps.values.wc_unit,
                                    kitchen: formProps.values.kitchen,
                                    not_coming: formProps.values.not_coming,

                                    property_unit_detail_id:
                                      formProps.values.id,
                                      violationSide:
                                      formProps.values.violationSide,
                                      violationDesc: formProps.values.violationDesc,
                                      violationPercent: formProps.values.violationPercent,
                                  });
                                  {
                                    formProps.setFieldValue(
                                      "direction_name",
                                      ""
                                    );
                                    formProps.setFieldValue("ownership", "");
                                    formProps.setFieldValue("site", "");
                                    formProps.setFieldValue("plan", "");
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
                                <th>Unit No.</th>
                                <th>Entry from Unit No.</th>
                                <th>W/C in Unit No.</th>
                                <th>kitchen in Unit No.</th>
                                  {/* <th>not coming to </th> */}
                                {/* <th>AS PER PLAN</th> */}
                              </tr>
                            </thead>
                            <tbody>
                              {/* {props?.property?.property?.specification?.property_mortgage_violation?.map( */}
                              {formProps?.values?.amalgamate?.map(
                                (amalgamate, index) => {
                                  return (
                                    <tr key={index}>
                                      <td>
                                        <TextField
                                          fullWidth
                                          // disabled
                                          size="small"
                                          label="Unit No."
                                          variant="standard"
                                          name={`amalgamate.${index}.unit_no`}
                                          value={amalgamate.unit_no}
                                          id="unit_no"
                                          onChange={formProps.handleChange}
                                        />
                                      </td>
                                      <td>
                                        <TextField
                                          fullWidth
                                          // disabled
                                          size="small"
                                          label="Entry from Unit No."
                                          variant="standard"
                                          name={`amalgamate.${index}.entry_from_unit`}
                                          value={amalgamate.entry_from_unit}
                                          id="entry_from_unit"
                                          onChange={formProps.handleChange}
                                        />
                                      </td>
                                      <td>
                                        <TextField
                                          fullWidth
                                          // disabled
                                          size="small"
                                          label="W/C in Unit No."
                                          variant="standard"
                                          name={`amalgamate.${index}.wc_unit`}
                                          value={amalgamate.wc_unit}
                                          id="wc_unit"
                                          onChange={formProps.handleChange}
                                        />
                                      </td>
                                      <td>
                                        <TextField
                                          fullWidth
                                          // disabled
                                          size="small"
                                          label="kitchen in Unit No."
                                          variant="standard"
                                          name={`amalgamate.${index}.kitchen`}
                                          value={amalgamate.kitchen}
                                          id="kitchen"
                                          onChange={formProps.handleChange}
                                        />
                                      </td>
                                     

                                      <td>
                                        <Button
                                          color="error"
                                          size="large"
                                          variant="standard"
                                          onClick={() => {
                                            arrayHelpers.remove(index);
                                            console.log("id", amalgamate.id);
                                            formProps.values.deleted_boundaries.push(
                                              amalgamate.id
                                            );
                                          }}
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

                <Typography variant={"h5"}>Infrastructure</Typography>
                <Row className="form-group">
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      text
                      label="Water Connection &#x1F4F1;"
                      select
                      // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                      variant="standard"
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.is_water)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                      id="is_water"
                      name="is_water"
                      value={formProps.values.is_water}
                      error={
                        formProps.touched.is_water &&
                        Boolean(formProps.errors.is_water)
                      }
                      helperText={
                        formProps.touched.is_water && formProps.errors.is_water
                      }
                    >
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value="1">Yes</MenuItem>
                      <MenuItem value="0">No</MenuItem>
                    </TextField>
                  </Col>
                  <Col md={4} className="pb-4">
                    <Autocomplete
                      fullWidth
                      id="water_connection_from-autocomplete"
                      options={
                        props?.dropdowns?.dropdowns?.filter(
                          (field) => field?.name === "Water Connection Type"
                        )[0]?.drop_down_details || []
                      }
                      getOptionLabel={(option) => option?.name || ""}
                      onChange={(e, value) => {
                        formProps.setFieldValue(
                          "water_connection_from",
                          value?.name || ""
                        );
                      }}
                      onOpen={formProps.handleBlur}
                                            includeInputInList
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Water connection from?"
                          name="water_connection_from"
                          variant="standard"
                          size="small"
                          hidden={
                            formProps.values.is_water === "1" ? false : true
                          }
                        />
                      )}
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      text
                      label="Water Connection Remark &#x1F4F1;"
                      // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                      variant="standard"
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.water_connection)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                      id="water_connection"
                      name="water_connection"
                      value={formProps.values.water_connection}
                      error={
                        formProps.touched.water_connection &&
                        Boolean(formProps.errors.water_connection)
                      }
                      helperText={
                        formProps.touched.water_connection &&
                        formProps.errors.water_connection
                      }
                    ></TextField>
                  </Col>

                  <Col md={3} className="pb-4">
                    <TextField
                      fullWidth
                      id="is_sewer_connection"
                      select
                      name="is_sewer_connection"
                      label="Sewage and drainage connection &#x1F4F1;"
                      // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                      variant="standard"
                      value={formProps.values.is_sewer_connection}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.is_sewer_connection)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    >
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value="1">Yes</MenuItem>
                      <MenuItem value="0">No</MenuItem>
                    </TextField>
                  </Col>
                  <Col md={9} className="pb-4">
                    <TextField
                      fullWidth
                      id="drainage_connection"
                      name="drainage_connection"
                      label="Sewage & drainage connection Remark&#x1F4F1;"
                      // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                      variant="standard"
                      value={formProps.values.drainage_connection}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.drainage_connection)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  <Col md={3} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      id="power_supply"
                      name="power_supply"
                      label="Power supply"
                      variant="standard"
                      value={formProps.values.power_supply}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.power_supply)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    >
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value="1">Yes</MenuItem>
                      <MenuItem value="0">No</MenuItem>
                    </TextField>
                  </Col>
                  <Col md={4} className="pb-4">
  <TextField
    fullWidth
    id="electric_meter_no"
    name="electric_meter_no"
    label="Electric Meter No."
    variant="standard"
    value={formProps.values.electric_meter_no}
    onChange={formProps.handleChange}
    onBlur={() => {
      if (formProps.values.electric_meter_no)
        setProgress(progress + 100 / formPropsLength);
    }}
  />
</Col>
<Col md={3} className="pb-4">
      <TextField
        fullWidth
        id="electric_metre_photo"
        name="electric_metre_photo"
        label="Electric Meter Photo 📸"
        type="file"
        variant="standard"
        // onChange={handleFileChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
        </Col>
    
                      <Col md={2} className="pb-4">
      <Button
        variant="contained"
        color="primary"
        // onClick={handleViewFile}
        // disabled={!formProps.values.file_url}
        style={{ marginTop: '10px' }}
      >
        View File
      </Button>
    </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="property_access_road_width"
                      name="property_access_road_width"
                      label="Property access road width"
                      variant="standard"
                      value={formProps.values.property_access_road_width}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.property_access_road_width)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="road_width_area"
                      name="road_width_area"
                      label="Feet & Inch &#x1F4F1;"
                      variant="standard"
                      value={formProps.values.road_width_area}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.road_width_area)
                        setProgress(progress + 100 / formPropsLength);
                      }}
                      />
                  </Col>
                  <Col md={4} className="pb-4">
  <TextField
    fullWidth
    id="access_road_type"
    name="access_road_type"
    label="Access Road Type"
    variant="standard"
    value={formProps.values.access_road_type}
    onChange={formProps.handleChange}
    onBlur={() => {
      if (formProps.values.access_road_type)
        setProgress(progress + 100 / formPropsLength);
    }}
  />
</Col>

<Col md={4} className="pb-4">
  <TextField
    fullWidth
    id="condition_of_approach_road"
    name="condition_of_approach_road"
    label="Condition of Approach Road"
    variant="standard"
    value={formProps.values.condition_of_approach_road}
    onChange={formProps.handleChange}
    onBlur={() => {
      if (formProps.values.condition_of_approach_road)
        setProgress(progress + 100 / formPropsLength);
    }}
  />
</Col>
</Row>

<Row>
<Col md={12}>
  <FieldArray
    name="boundries"
    render={() => (
      <div>
        <Row>
          <Col md={4}>
            <Label>Property Boundaries &#x1F4F1;</Label>
          </Col>
        </Row>
        <Table size="sm" className="mt-3">
          <thead>
            <tr>
              <th>Direction</th>
              <th>Project Boundaries As per Site</th>
              <th>Building Boundaries As per Site</th>
              <th>Flat Boundaries As per Site</th>
              <th>Unit Boundaries As per Plan</th>
              <th>Unit Boundaries As per Doc</th>
            </tr>
          </thead>
          <tbody>
            {["north", "south", "west", "east"].map((direction, index) => (
              <tr key={index}>
                <td>
                  <Label>
                    {direction.charAt(0).toUpperCase() + direction.slice(1)}
                  </Label>
                </td>
                <td>
                  <TextField
                    fullWidth
                    size="small"
                    label="Project Boundaries As per Site"
                    variant="standard"
                    name={`boundries.${index}.project_boundaries_as_per_site`}
                    value={
                      formProps.values.boundries[index]
                        ?.project_boundaries_as_per_site || ""
                    }
                    onChange={formProps.handleChange}
                  />
                </td>
                <td>
                  <TextField
                    fullWidth
                    size="small"
                    label="Building Boundaries As per Site"
                    variant="standard"
                    name={`boundries.${index}.building_boundaries_as_per_site`}
                    value={
                      formProps.values.boundries[index]
                        ?.building_boundaries_as_per_site || ""
                    }
                    onChange={formProps.handleChange}
                  />
                </td>
                <td>
                  <TextField
                    fullWidth
                    size="small"
                    label="Flat Boundaries As per Site"
                    variant="standard"
                    name={`boundries.${index}.flat_boundaries_as_per_site`}
                    value={
                      formProps.values.boundries[index]
                        ?.flat_boundaries_as_per_site || ""
                    }
                    onChange={formProps.handleChange}
                  />
                </td>
                <td>
                  <TextField
                    fullWidth
                    size="small"
                    label="Unit Boundaries As per Plan"
                    variant="standard"
                    name={`boundries.${index}.unit_boundaries_as_per_plan`}
                    value={
                      formProps.values.boundries[index]
                        ?.unit_boundaries_as_per_plan || ""
                    }
                    onChange={formProps.handleChange}
                  />
                </td>
                <td>
                  <TextField
                    fullWidth
                    size="small"
                    label="Unit Boundaries As per Doc"
                    variant="standard"
                    name={`boundries.${index}.unit_boundaries_as_per_doc`}
                    value={
                      formProps.values.boundries[index]
                        ?.unit_boundaries_as_per_doc || ""
                    }
                    onChange={formProps.handleChange}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )}
  />
</Col>

<Col md={12} className="pb-4">
                    <TextField
                      fullWidth
                      id="is_boundary_matched"
                      name="is_boundary_matched"
                      select
                      label="Is boundaries mathching"
                      variant="standard"
                      value={formProps.values.is_boundary_matched}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.is_boundary_matched)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    >
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value="1">Yes</MenuItem>
                      <MenuItem value="0">No</MenuItem>
                    </TextField>
                  </Col>


  



                  

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="policy_caption_area"
                      name="policy_caption_area"
                      label="Property Falls in Caution area"
                      variant="standard"
                      value={formProps.values.policy_caption_area}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.policy_caption_area)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      id="risk_of_tension"
                      name="risk_of_tension"
                      label="Risk of high tension line &#x1F4F1;"
                      variant="standard"
                      value={formProps.values.risk_of_tension}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.risk_of_tension)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    >
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value="1">Yes</MenuItem>
                      <MenuItem value="0">No</MenuItem>
                    </TextField>
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      id="is_locality_property"
                      name="is_locality_property"
                      label="Is it Land Locked property"
                      variant="standard"
                      value={formProps.values.is_locality_property}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.is_locality_property)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    >
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value="1">Yes</MenuItem>
                      <MenuItem value="0">No</MenuItem>
                    </TextField>
                  </Col>
                </Row>

                <Typography variant={"h5"}>Part Property Motgage</Typography>
<Row className="pt-4 pb-2">
  <Col md={12}>
    <FieldArray
      name="property_mortgage"
      render={(arrayHelpers) => (
        <div>
          <Row>
          <Col md={4} className="pb-4">
            <TextField
              fullWidth
              id="request_per_unit_no"
              size="small"
              name="request_per_unit_no"
              label="Request for Unit No. &#x1F4F1;"
              variant="standard"
              // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
              value={formProps.values.request_per_unit_no}
              onChange={formProps.handleChange}
              onBlur={() => {
                  if (formProps.values.request_per_unit_no)
                    setProgress(progress + 100 / formPropsLength);
                  }}
                />
          </Col>
          <Col md={4} className="pb-4">
            <TextField
              fullWidth
              id="entry_unit"
              name="entry_unit"
              size="small"
              label="Entry from Unit No.&#x1F4F1;"
              variant="standard"
              // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
              value={formProps.values.entry_unit}
              onChange={formProps.handleChange}
              onBlur={() => {
                if (formProps.values.entry_unit)
                setProgress(progress + 100 / formPropsLength);
              }}
              />
          </Col>
          <Col md={4} className="pb-4">
            <TextField
              fullWidth
              id="wc_unit2"
              name="wc_unit2"
              size="small"
              label="W/C in Unit No. &#x1F4F1;"
              variant="standard"
              // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
              value={formProps.values.wc_unit2}
              onChange={formProps.handleChange}
              onBlur={() => {
                if (formProps.values.wc_unit2)
                setProgress(progress + 100 / formPropsLength);
              }}
              />
          </Col>
          <Col md={4} className="pb-4">
            <TextField
              fullWidth
              id="kitchen_unit"
              name="kitchen_unit"
              label="kitchen in Unit No. &#x1F4F1;"
              size="small"
              variant="standard"
              // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
              value={formProps.values.kitchen_unit}
              onChange={formProps.handleChange}
              onBlur={() => {
                if (formProps.values.kitchen_unit)
                setProgress(progress + 100 / formPropsLength);
              }}
              />
          </Col>
          <Col md={4} className="pb-4">
            <TextField
              fullWidth
              id="not_coming"
              size="small"
              name="not_coming"
              label="Unit No. not coming to us &#x1F4F1;"
              variant="standard"
              // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
              value={formProps.values.not_coming}
              onChange={formProps.handleChange}
              onBlur={() => {
                if (formProps.values.not_coming)
                setProgress(progress + 100 / formPropsLength);
              }}
              />
          </Col>
          

            <Col md={2}>
              <Button
                color="success"
                variant="contained"
                onClick={() => {
                  arrayHelpers.push({
                    property_id: formProps.values.property_id,
                    request_per_unit_no: formProps.values.request_per_unit_no,
                    entry_unit: formProps.values.entry_unit,
                    wc_unit2: formProps.values.wc_unit2,
                    kitchen_unit: formProps.values.kitchen_unit,
                    not_coming: formProps.values.not_coming,

                    property_unit_detail_id:
                      formProps.values.id,
                      violationSide:
                      formProps.values.violationSide,
                      violationDesc: formProps.values.violationDesc,
                      violationPercent: formProps.values.violationPercent,
                  });
                  {
                    formProps.setFieldValue(
                      "direction_name",
                      ""
                    );
                    formProps.setFieldValue("ownership", "");
                    formProps.setFieldValue("site", "");
                    formProps.setFieldValue("plan", "");
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
                <th>Request for Unit No.</th>
                <th>Entry from Unit No.</th>
                <th>W/C in Unit No. </th>
                <th>Kitchen in Unit No. </th>
                  <th>Unit No. not coming to us </th>
              </tr>
            </thead>
            <tbody>
            
              {formProps?.values?.property_mortgage?.map(
                (property_mortgage, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <TextField
                          fullWidth
                          // disabled
                          size="small"
                          label="Request for Unit No."
                          variant="standard"
                          name={`property_mortgage.${index}.request_per_unit_no`}
                          value={property_mortgage.request_per_unit_no}
                          id="request_per_unit_no"
                          onChange={formProps.handleChange}
                        />
                      </td>
                      <td>
                        <TextField
                          fullWidth
                          // disabled
                          size="small"
                          label="Entry from Unit No."
                          variant="standard"
                          name={`property_mortgage.${index}.entry_unit`}
                          value={property_mortgage.entry_unit}
                          id="entry_unit"
                          onChange={formProps.handleChange}
                        />
                      </td>
                      <td>
                        <TextField
                          fullWidth
                          // disabled
                          size="small"
                          label="W/C in Unit No."
                          variant="standard"
                          name={`property_mortgage.${index}.wc_unit2`}
                          value={property_mortgage.wc_unit2}
                          id="wc_unit2"
                          onChange={formProps.handleChange}
                        />
                      </td>
                      <td>
                        <TextField
                          fullWidth
                          // disabled
                          size="small"
                          label="Kitchen in Unit No."
                          variant="standard"
                          name={`property_mortgage.${index}.kitchen_unit`}
                          value={property_mortgage.kitchen_unit}
                          id="kitchen_unit"
                          onChange={formProps.handleChange}
                        />
                      </td>
                      <td>
                        <TextField
                          fullWidth
                          // disabled
                          size="small"
                          label="Unit No. Not coming to us"
                          variant="standard"
                          name={`property_mortgage.${index}.not_coming`}
                          value={property_mortgage.not_coming}
                          id="not_coming"
                          onChange={formProps.handleChange}
                        />
                      </td>
                     

                      <td>
                        <Button
                          color="error"
                          size="large"
                          variant="standard"
                          onClick={() => {
                            arrayHelpers.remove(index);
                            console.log("id", property_mortgage.id);
                            formProps.values.deleted_boundaries.push(
                              property_mortgage.id
                            );
                          }}
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

                <Row className="form-group pb-4">
                  <Col>
                    <Button
                      color="success"
                      variant="contained"
                      disabled={formProps.isSubmitting}
                      fullWidth
                      type="submit"
                      onClick={() => dispatch(ADD_ONE())}
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
    unitDetails: state.unitDetails,
    dropdowns: state.dropdowns,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editUnitDetailData: (data, setValue, value, token) =>
      dispatch(editUnitDetailData(data, setValue, value, token)),
    editSpecificationsData2: (data, setValue, value, token) =>
      dispatch(editSpecificationsData2(data, setValue, value, token)),
    editProgressData: (progressData, setValue, value, token) =>
      dispatch(editProgressData(progressData, setValue, value, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UnitDetails);
