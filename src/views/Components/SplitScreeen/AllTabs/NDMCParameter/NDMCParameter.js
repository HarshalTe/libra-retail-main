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
import { editNdmceData } from "../../../../../Redux/Creators/NdmceCreators";

//*Compoenets
import LinerLoader from "components/Loaders/LinerLoader";
import Box from "@mui/material/Box";
import LinearProgressWithLabel from "../ProjectDetails/LinearProgressWithLabel";
import ADD_ONE from "../../../../../Redux/Types/ActionTypes"
import { useDispatch } from "react-redux";
import { editProgressData } from "../../../../../Redux/Creators/ProgressCreators";


function NDMCParameter(props) {
  const [progress, setProgress] = React.useState(0);
  const dispatch = useDispatch();
  const token = props.login?.login?.token;
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);

    let data = {
      // token: token,
      id: values.id,
      property_id: values.property_id,
      sesmic_zone: values.sesmic_zone,
      cyclone_area: values.cyclone_area,
      flood_area: values.flood_area,
      land_slide_area: values.land_slide_area,
      risk_degree: values.risk_degree,
      crz_fall: values.crz_fall,
      demolution_risk: values.demolution_risk,
      flooring_type: values.flooring_type,
      prone_area: values.prone_area,
      steel_grade: values.steel_grade,
      bldg_height: values.bldg_height,
      concrete_grade: values.concrete_grade,
      environment_exposure: values.environment_exposure,
      is_dcr_norms: values.is_dcr_norms,
      compounding_chances: values.compounding_chances,
      fsi_achieved: values.fsi_achieved,
      setback_deviation: values.setback_deviation,
      fixture_extension1: values.fixture_extension1,
      fixture_extension2: values.fixture_extension2,
      fixture_extension3: values.fixture_extension3,
      fixture_extension4: values.fixture_extension4,
      fixture_extension5: values.fixture_extension5,
      soil_slope: values.soil_slope,
      vertical_deviation: values.vertical_deviation,
    };

    const value = 3;

    let progressData = {
      id: props?.property?.property?.id,
      ndmcProgress: 1,
      
    }

    props.editProgressData(progressData, props.setValue, value,props.login?.login?.token);
    props.editNdmceData(data, props.setValue, value, token);
    setSubmitting(false);
  };
  const formPropsLength = 24;

  return (
    <>
      {props.ndmc.isLoading ? (
        <div>
          <LinerLoader />
        </div>
      ) : (
        <div>
          <br />
          <Formik
            initialValues={{
              id: props?.property?.property?.ndmce?.id,
              property_id: props?.property?.property?.id,
              sesmic_zone: props?.property?.property?.ndmce?.sesmic_zone,
              cyclone_area: props?.property?.property?.ndmce?.cyclone_area,
              flood_area: props?.property?.property?.ndmce?.flood_area,
              land_slide_area:
                props?.property?.property?.ndmce?.land_slide_area,
              risk_degree: props?.property?.property?.ndmce?.risk_degree,
              crz_fall: props?.property?.property?.ndmce?.crz_fall,
              demolution_risk:
                props?.property?.property?.ndmce?.demolution_risk,
              flooring_type: props?.property?.property?.ndmce?.flooring_type,
              prone_area: props?.property?.property?.ndmce?.prone_area,
              steel_grade: props?.property?.property?.ndmce?.steel_grade,
              bldg_height: props?.property?.property?.ndmce?.bldg_height,
              concrete_grade: props?.property?.property?.ndmce?.concrete_grade,
              environment_exposure:
                props?.property?.property?.ndmce?.environment_exposure,
              is_dcr_norms: props?.property?.property?.ndmce?.is_dcr_norms,
              compounding_chances:
                props?.property?.property?.ndmce?.compounding_chances,
              fsi_achieved: props?.property?.property?.ndmce?.fsi_achieved,
              setback_deviation:
                props?.property?.property?.ndmce?.setback_deviation,
              fixture_extension1:
                props?.property?.property?.ndmce?.fixture_extension1,
              fixture_extension2:
                props?.property?.property?.ndmce?.fixture_extension2,
              fixture_extension3:
                props?.property?.property?.ndmce?.fixture_extension3,
              fixture_extension4:
                props?.property?.property?.ndmce?.fixture_extension4,
              fixture_extension5:
                props?.property?.property?.ndmce?.fixture_extension5,
              soil_slope: props?.property?.property?.ndmce?.soil_slope,
              vertical_deviation:
                props?.property?.property?.ndmce?.vertical_deviation,
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
                      <LinearProgressWithLabel value={(Object?.values(formProps?.values)?.filter((val) => val !== null && val?.length > 0)?.length/Object?.keys(formProps?.values)?.length)*100} />
                    </Box>
                  </div>
                <Typography variant={"h5"}>NDMA Parameters</Typography>
                <Divider />
                <br />
                <Row className="form-group">
                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      label="Which sesmic zone property is located in?"
                      variant="standard"
                      id="sesmic_zone"
                      name="sesmic_zone"
                      value={formProps.values.sesmic_zone}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                          if (formProps.values.sesmic_zone)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                    />
                  </Col>
                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      label="Which cyclone area is the building located in?"
                      variant="standard"
                      id="cyclone_area"
                      name="cyclone_area"
                      value={formProps.values.cyclone_area}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                          if (formProps.values.cyclone_area)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                    />
                  </Col>
                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      label="Which flood area is the building located in?"
                      variant="standard"
                      id="flood_area"
                      name="flood_area"
                      value={formProps.values.flood_area}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                          if (formProps.values.flood_area)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                    />
                  </Col>
                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      label="Which land slide area is the building located in?"
                      variant="standard"
                      id="land_slide_area"
                      name="land_slide_area"
                      value={formProps.values.land_slide_area}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                          if (formProps.values.land_slide_area)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                    />
                  </Col>
                 
                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      label="Property fall in CRZ"
                      variant="standard"
                      id="crz_fall"
                      name="crz_fall"
                      value={formProps.values.crz_fall}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                          if (formProps.values.crz_fall)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                    />
                  </Col>
                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      label="Footing type"
                      variant="standard"
                      id="flooring_type"
                      name="flooring_type"
                      value={formProps.values.flooring_type}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                          if (formProps.values.flooring_type)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                        >
                        <MenuItem value="">Select</MenuItem>
                          {props?.dropdowns?.dropdowns
                            ?.filter((field) => field?.name == "Type of Flooring")[0]
                            ?.drop_down_details?.map((field, i) => (
                              <MenuItem key={i} value={field?.name}>
                                {field?.name}
                              </MenuItem>
                            ))}
                        </TextField>
                  </Col>
                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      label="Flood prone area"
                      variant="standard"
                      id="prone_area"
                      name="prone_area"
                      value={formProps.values.prone_area}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                          if (formProps.values.prone_area)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                    />
                  </Col>
                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      label="Steel grade"
                      variant="standard"
                      id="steel_grade"
                      name="steel_grade"
                      value={formProps.values.steel_grade}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                          if (formProps.values.steel_grade)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                    />
                  </Col>
                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      label="Height of the building above ground level"
                      variant="standard"
                      id="bldg_height"
                      name="bldg_height"
                      value={formProps.values.bldg_height}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                          if (formProps.values.bldg_height)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                    />
                  </Col>
                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      label="Concrete grade"
                      variant="standard"
                      id="concrete_grade"
                      name="concrete_grade"
                      value={formProps.values.concrete_grade}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                          if (formProps.values.concrete_grade)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                    />
                  </Col>
                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      label="Environment exposure condition"
                      variant="standard"
                      id="environment_exposure"
                      name="environment_exposure"
                      value={formProps.values.environment_exposure}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                          if (formProps.values.environment_exposure)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                    />
                  </Col>
                  <br/>
                  <Divider/>
                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      label="Is the plan in the line with dcr norms?"
                      variant="standard"
                      id="is_dcr_norms"
                      name="is_dcr_norms"
                      value={formProps.values.is_dcr_norms}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                          if (formProps.values.is_dcr_norms)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                    />
                  </Col>
                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      label="Chances of compounding"
                      variant="standard"
                      id="compounding_chances"
                      name="compounding_chances"
                      value={formProps.values.compounding_chances}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                          if (formProps.values.compounding_chances)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                    />
                  </Col>
                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      label="FSI achieved"
                      variant="standard"
                      id="fsi_achieved"
                      name="fsi_achieved"
                      value={formProps.values.fsi_achieved}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                          if (formProps.values.fsi_achieved)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                    />
                  </Col>
                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      label="Setback deviation"
                      variant="standard"
                      id="setback_deviation"
                      name="setback_deviation"
                      value={formProps.values.setback_deviation}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                          if (formProps.values.setback_deviation)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                    />
                  </Col>
                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      label="Any extension in fixture"
                      variant="standard"
                      id="fixture_extension1"
                      name="fixture_extension1"
                      value={formProps.values.fixture_extension1}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                          if (formProps.values.fixture_extension1)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                    />
                  </Col>
                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      label="Any extension in fixture"
                      variant="standard"
                      id="fixture_extension2"
                      name="fixture_extension2"
                      value={formProps.values.fixture_extension2}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                          if (formProps.values.fixture_extension2)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                    />
                  </Col>
                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      label="Any extension in fixture"
                      variant="standard"
                      id="fixture_extension3"
                      name="fixture_extension3"
                      value={formProps.values.fixture_extension3}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                          if (formProps.values.fixture_extension3)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                    />
                  </Col>
                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      label="Any extension in fixture"
                      variant="standard"
                      id="fixture_extension4"
                      name="fixture_extension4"
                      value={formProps.values.fixture_extension4}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                          if (formProps.values.fixture_extension4)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                    />
                  </Col>
                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      label="Any extension in fixture"
                      variant="standard"
                      id="fixture_extension5"
                      name="fixture_extension5"
                      value={formProps.values.fixture_extension5}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                          if (formProps.values.fixture_extension5)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                    />
                  </Col>
                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      label="Soil slope vulnerable to land slide"
                      variant="standard"
                      id="soil_slope"
                      name="soil_slope"
                      value={formProps.values.soil_slope}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                          if (formProps.values.soil_slope)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                    />
                  </Col>
                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      label="Vertical deviation"
                      variant="standard"
                      id="vertical_deviation"
                      name="vertical_deviation"
                      value={formProps.values.vertical_deviation}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                          if (formProps.values.vertical_deviation)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                    />
                  </Col>
                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      label="Degree of risk associated?"
                      variant="standard"
                      id="risk_degree"
                      name="risk_degree"
                      value={formProps.values.risk_degree}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                          if (formProps.values.risk_degree)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                    />
                  </Col>
                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      label="Any risk of demolution?"
                      variant="standard"
                      id="demolution_risk"
                      name="demolution_risk"
                      value={formProps.values.demolution_risk}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                          if (formProps.values.demolution_risk)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                    >
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value={0}>No</MenuItem>
                      <MenuItem value={1}>Yes</MenuItem>
                    </TextField>
                  </Col>
                </Row>

                <Divider />
                <br />

                <Row className="form-group pb-4">
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
    ndmc: state.ndmc,
    dropdowns: state.dropdowns,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editNdmceData: (data, setValue, value, token) =>
      dispatch(editNdmceData(data, setValue, value, token)),
      editProgressData: (progressData, setValue, value,token) =>dispatch(editProgressData(progressData, setValue, value,token)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NDMCParameter);
