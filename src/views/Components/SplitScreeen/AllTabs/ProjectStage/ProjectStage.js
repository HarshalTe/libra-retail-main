import React from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import Button from "@mui/material/Button";
import TextField from "@material-ui/core/TextField";
import { MenuItem } from "@material-ui/core";
import { useDispatch } from "react-redux";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Autocomplete, Divider, Typography } from "@mui/material";

//*Actions
import { editProjectStageData } from "../../../../../Redux/Creators/ProjectStageCreators";
import ADD_ONE from "../../../../../Redux/Types/ActionTypes";
//*Compoenets
import LinerLoader from "components/Loaders/LinerLoader";
import Box from "@mui/material/Box";
import LinearProgressWithLabel from "../ProjectDetails/LinearProgressWithLabel";
import { editProgressData } from "../../../../../Redux/Creators/ProgressCreators";
import StageCalculator from "../StageCalculator/StageCalculator";

function ProjectStage(props) {
  const [progress, setProgress] = React.useState(0);
  const token = props.login?.login?.token;
  const dispatch = useDispatch();
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);
    const value = 5;

    let progressData = {
      id: props?.property?.property?.id,
      projectStageProgress: 1,
    };

    props.editProgressData(
      progressData,
      props.setValue,
      value,
      props.login?.login?.token
    );

    // props.editProjectStageData(data, props.setValue, value, token);
    // setSubmitting(false);
    handleSubmit2(values, { setSubmitting });
  };
  const handleSubmit2 = (values, { setSubmitting }) => {
    console.log("Values:", values);

    let data = {
      // token: token,
      id: values.id,
      property_id: values.property_id,
      project_id: values.project_id,
      //*PrijectStage
      project_type: values.project_type,
      property_details: values.property_details,
      unit_type: values.unit_type,
      no_towers: values.no_towers,
      no_lifts: values.no_lifts,
      amenities: values.amenities,
      security: values.security,
      flats_per_floor: values.flats_per_floor,
      floors_approved: values.floors_approved,

      //*Flat Configuration
      no_rooms: values.no_rooms,
      bedroom: values.bedroom,
      bathroom: values.bathroom,
      is_kitchen: values.is_kitchen,
      kitchen: values.kitchen,
      living: values.living,
      configuration: values.configuration,
      current_stage: values.current_stage,
    };

    const value = 6;

    props.editProjectStageData(data, props.setValue, value, token);
    setSubmitting(false);
  };
  const formPropsLength = 16;

  return (
    <div>
      {props.projectStage.isLoading ? (
        <div>
          <LinerLoader />
        </div>
      ) : (
        <>
          <br />
          <Formik
            initialValues={{
              id: props?.property?.property?.project_stage?.id,
              property_id: props?.property?.property?.id,
              project_id: props?.property?.property?.project?.id,
              //*PrijectStage
              project_type:
                props?.property?.property?.project_stage?.project_type,
              property_details:
                props?.property?.property?.project_stage?.property_details,
              unit_type: props?.property?.property?.project_stage?.unit_type,
              no_towers: props?.property?.property?.project_stage?.no_towers,
              no_lifts: props?.property?.property?.project_stage?.no_lifts,
              amenities: props?.property?.property?.project_stage?.amenities,
              security: props?.property?.property?.project_stage?.security,
              flats_per_floor:
                props?.property?.property?.project_stage?.flats_per_floor,
              floors_approved:
                props?.property?.property?.project_stage?.floors_approved,

              //*Flat Configuration
              no_rooms: props?.property?.property?.project_stage?.no_rooms,
              bedroom: props?.property?.property?.project_stage?.bedroom,
              bathroom: props?.property?.property?.project_stage?.bathroom,
              kitchen: props?.property?.property?.project_stage?.kitchen,
              living: props?.property?.property?.project_stage?.living,
              configuration:
                props?.property?.property?.project_stage?.configuration,
              current_stage:
                props?.property?.property?.project_stage?.current_stage,
              is_kitchen: props?.property?.property?.project_stage?.is_kitchen,
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              // branch_name: Yup.string().required("Branch Name is required"),
            })}
          >
            {(formProps) => (
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
                <Typography variant={"h5"}>
                  {" "}
                  Project Stage
                </Typography>
                <Divider />
                <br />

                <StageCalculator/>

                {/* <br />
                <Row className="form-group">
                  <Col md={4} className="pb-4">
                    <Autocomplete
                      fullWidth
                      id="project_type"
                      name="project_type"
                      options={
                        props?.dropdowns?.dropdowns?.filter(
                          (field) => field?.name === "Type of Project"
                        )[0]?.drop_down_details || []
                      }
                      getOptionLabel={(option) => option?.name || ""}
                      onChange={(event, value) => {
                        formProps.handleChange({
                          target: {
                            name: "project_type",
                            value: value ? value.name : "",
                          },
                        });
                        if (value) {
                          setProgress(progress + 100 / formPropsLength);
                        }
                      }}
                      onBlur={() => {
                        if (formProps.values.project_type) {
                          setProgress(progress + 100 / formPropsLength);
                        }
                      }}
                      includeInputInList
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Type of Project"
                          variant="standard"
                          error={
                            formProps.touched.project_type &&
                            Boolean(formProps.errors.project_type)
                          }
                          helperText={
                            formProps.touched.project_type &&
                            formProps.errors.project_type
                          }
                        />
                      )}
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <Autocomplete
                      fullWidth
                      id="property_details"
                      name="property_details"
                      options={
                        props?.dropdowns?.dropdowns?.filter(
                          (field) => field?.name === "Property Type"
                        )[0]?.drop_down_details || []
                      }
                      getOptionLabel={(option) => option?.name || ""}
                      onChange={(event, value) => {
                        formProps.handleChange({
                          target: {
                            name: "property_details",
                            value: value ? value.name : "",
                          },
                        });
                        if (value) {
                          setProgress(progress + 100 / formPropsLength);
                        }
                      }}
                      onBlur={() => {
                        if (formProps.values.property_details) {
                          setProgress(progress + 100 / formPropsLength);
                        }
                      }}
                      includeInputInList
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Property details"
                          variant="standard"
                          error={
                            formProps.touched.property_details &&
                            Boolean(formProps.errors.property_details)
                          }
                          helperText={
                            formProps.touched.property_details &&
                            formProps.errors.property_details
                          }
                        />
                      )}
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="unit_type"
                      name="unit_type"
                      label="Type of unit"
                      variant="standard"
                      value={formProps.values.unit_type}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.unit_type)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                      error={
                        formProps.touched.unit_type &&
                        Boolean(formProps.errors.unit_type)
                      }
                      helperText={
                        formProps.touched.unit_type &&
                        formProps.errors.unit_type
                      }
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="no_towers"
                      name="no_towers"
                      label="No. of towers/Wings in project &#x1F4F1;"
                      // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                      variant="standard"
                      value={formProps.values.no_towers}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.no_towers)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                      error={
                        formProps.touched.no_towers &&
                        Boolean(formProps.errors.no_towers)
                      }
                      helperText={
                        formProps.touched.no_towers &&
                        formProps.errors.no_towers
                      }
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="no_lifts"
                      name="no_lifts"
                      label="No. of lifts in building &#x1F4F1;"
                      // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                      variant="standard"
                      value={formProps.values.no_lifts}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.no_lifts)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                      error={
                        formProps.touched.no_lifts &&
                        Boolean(formProps.errors.no_lifts)
                      }
                      helperText={
                        formProps.touched.no_lifts && formProps.errors.no_lifts
                      }
                    />
                  </Col>

                  <Col md={4}>
                    <Autocomplete
                      fullWidth
                      id="amenities"
                      name="amenities"
                      options={
                        props?.dropdowns?.dropdowns?.filter(
                          (field) => field?.name === "Project Amenities"
                        )[0]?.drop_down_details || []
                      }
                      getOptionLabel={(option) => option?.name || ""}
                      onChange={(event, value) => {
                        formProps.handleChange({
                          target: {
                            name: "amenities",
                            value: value ? value.name : "",
                          },
                        });
                        if (value) {
                          setProgress(progress + 100 / formPropsLength);
                        }
                      }}
                      onBlur={() => {
                        if (formProps.values.amenities) {
                          setProgress(progress + 100 / formPropsLength);
                        }
                      }}
                      includeInputInList
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Project amenities"
                          variant="standard"
                          error={
                            formProps.touched.amenities &&
                            Boolean(formProps.errors.amenities)
                          }
                          helperText={
                            formProps.touched.amenities &&
                            formProps.errors.amenities
                          }
                        />
                      )}
                    />
                  </Col>

                  <Col md={4}>
                    <Autocomplete
                      fullWidth
                      id="security"
                      name="security"
                      options={
                        props?.dropdowns?.dropdowns?.filter(
                          (field) => field?.name === "Security System"
                        )[0]?.drop_down_details || []
                      }
                      getOptionLabel={(option) => option?.name || ""}
                      onChange={(event, value) => {
                        formProps.handleChange({
                          target: {
                            name: "security",
                            value: value ? value.name : "",
                          },
                        });
                        if (value) {
                          setProgress(progress + 100 / formPropsLength);
                        }
                      }}
                      onBlur={() => {
                        if (formProps.values.security) {
                          setProgress(progress + 100 / formPropsLength);
                        }
                      }}
                      includeInputInList
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Security systems"
                          variant="standard"
                          error={
                            formProps.touched.security &&
                            Boolean(formProps.errors.security)
                          }
                          helperText={
                            formProps.touched.security &&
                            formProps.errors.security
                          }
                        />
                      )}
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="flats_per_floor"
                      name="flats_per_floor"
                      label="Flats Per Floor &#x1F4F1;"
                      // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                      variant="standard"
                      size="small"
                      value={formProps.values.flats_per_floor}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.flats_per_floor)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                      error={
                        formProps.touched.flats_per_floor &&
                        Boolean(formProps.errors.flats_per_floor)
                      }
                      helperText={
                        formProps.touched.flats_per_floor &&
                        formProps.errors.flats_per_floor
                      }
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="floors_approved"
                      name="floors_approved"
                      label="No. of floors approved as per plan"
                      variant="standard"
                      size="small"
                      value={formProps.values.floors_approved}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.floors_approved)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                      error={
                        formProps.touched.floors_approved &&
                        Boolean(formProps.errors.floors_approved)
                      }
                      helperText={
                        formProps.touched.floors_approved &&
                        formProps.errors.floors_approved
                      }
                    />
                  </Col>
                </Row>
                <Typography variant={"h5"}>Flat Configuration</Typography>
                <Divider />
                <br />
                <Row className="form-group">
                  <Col md={3} className="pb-4">
                    <TextField
                      fullWidth
                      id="no_rooms"
                      name="no_rooms"
                      label="No of rooms"
                      variant="standard"
                      value={formProps.values.no_rooms}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.no_rooms)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  <Col md={3} className="pb-4">
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
                      error={
                        formProps.touched.bedroom &&
                        Boolean(formProps.errors.bedroom)
                      }
                      helperText={
                        formProps.touched.bedroom && formProps.errors.bedroom
                      }
                    />
                  </Col>
                  <Col md={3} className="pb-4">
                    <TextField
                      fullWidth
                      id="bathroom"
                      name="bathroom"
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
                  <Col md={3} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      id="is_kitchen"
                      name="is_kitchen"
                      label="Kitchen &#x1F4F1;"
                      // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                      variant="standard"
                      value={formProps.values.is_kitchen}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.is_kitchen)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    >
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value={0}>No</MenuItem>
                      <MenuItem value={1}>Yes</MenuItem>
                    </TextField>
                  </Col>
                  <Col md={3} className="pb-4">
                    <TextField
                      fullWidth
                      id="kitchen"
                      name="kitchen"
                      label="Kitchen Remark &#x1F4F1;"
                      // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                      variant="standard"
                      value={formProps.values.kitchen}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.kitchen)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  <Col md={3} className="pb-4">
                    <TextField
                      fullWidth
                      id="living"
                      name="living"
                      label="Living/Dinning"
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
                      id="current_stage"
                      name="current_stage"
                      label="Current Stage"
                      variant="standard"
                      value={formProps.values.current_stage}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.current_stage)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                </Row>
                <Divider /> */}
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
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    // propertyid: state.properties.propertyid,
    property: state.property,
    projectStage: state.projectStage,
    dropdowns: state.dropdowns,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editProjectStageData: (data, setValue, value, token) =>
      dispatch(editProjectStageData(data, setValue, value, token)),
    editProgressData: (progressData, setValue, value, token) =>
      dispatch(editProgressData(progressData, setValue, value, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectStage);
