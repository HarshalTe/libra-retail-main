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
import { editGeoTags } from "../../../../../Redux/Creators/GeoTagsCreatoros";

//*Compoenets
import LinerLoader from "components/Loaders/LinerLoader";
import Box from "@mui/material/Box";
import LinearProgressWithLabel from "../ProjectDetails/LinearProgressWithLabel";
import GeoMap from "./GeoMap"
import ADD_ONE from "../../../../../Redux/Types/ActionTypes"
import { useDispatch } from "react-redux";
import { editProgressData } from "../../../../../Redux/Creators/ProgressCreators";



function GetTags(props) {
  const [progress, setProgress] = React.useState(0);
  const dispatch = useDispatch();

  console.log("GeoTags", props);

  const token = props.login?.login?.token;
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);

    let data = {
      id: values?.id,
      user_id: values?.user_id,
      property_id: values?.property_id,
      long: values?.long,
      lat: values?.lat,
      surrounding_development: values?.surrounding_development,
      remarks: values?.remarks,
    };

    const value = 1;

    console.log("data", data);
    let progressData = {
      id: props?.property?.property?.id,
      geoTagsProgress: 1,
      
    }

    props.editProgressData(progressData, props.setValue, value,props.login?.login?.token);
    props.editGeoTags(data, props.setValue, value, token);
    setSubmitting(true);
  };
  const formPropsLength = 4;
  return (
    <>
      {props.geoTags.isLoading ? (
        <div>
          <LinerLoader />
        </div>
      ) : (
        <>
          <br />
          <Row>
            <Col md={12}>
              <Formik
                initialValues={{
                  id: props?.property?.property?.geo_tag?.id,
                  user_id: props?.login?.login?.user?.id,
                  property_id: props?.property?.property?.id,
                  long: props?.property?.property?.geo_tag?.long,
                  lat: props?.property?.property?.geo_tag?.lat,
                  surrounding_development: props?.property?.property?.geo_tag?.surrounding_development,
                  remarks: props?.property?.property?.geo_tag?.remarks,
                  // time: props?.property?.property?.geo_tag?.time,
                }}
                onSubmit={handleSubmit}
                validationSchema={Yup.object().shape({
                  // lat: Yup.string().required("Latitude is required"),
                  // long: Yup.string().required("Longitude is required"),
                })}
              >
                {(formProps) => (
                  <Form>
                    <div className="pb-4">
                    <Box sx={{ width: "90%" }}>
                      <LinearProgressWithLabel value={(Object?.values(formProps?.values)?.filter((val) => val !== null && val?.length > 0)?.length/Object?.keys(formProps?.values)?.length)*100} />
                    </Box>
                  </div>
                    <Typography variant={"h5"}>GeoTags</Typography>
                    <Divider />
                    <br />
                    <Row className="form-group">
                      <Col md={6} className="pb-4">
                        <TextField
                          fullWidth
                          label="Latitude &#x1F4F1;"
                          // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }} 
                          id="lat"
                          name="lat"
                          variant="standard"
                          value={formProps.values.lat}
                          onChange={formProps.handleChange}
                          onBlur={() => {
                          if (formProps.values.lat)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                        />
                      </Col>
                      <Col md={6} className="pb-4">
                        <TextField
                          fullWidth
                          label="Longitude &#x1F4F1;"
                          // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }} 
                          variant="standard"
                          id="long"
                          name="long"
                          value={formProps.values.long}
                          onChange={formProps.handleChange}
                          onBlur={() => {
                          if (formProps.values.long)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                        />
                      </Col>
                      <Col md={6} className="pb-4">
                        <TextField
                          fullWidth
                          label="srounding development &#x1F4F1;"
                          // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }} 
                          variant="standard"
                          id="surrounding_development"
                          name="surrounding_development"
                          value={formProps.values.surrounding_development}
                          onChange={formProps.handleChange}
                          onBlur={() => {
                          if (formProps.values.surrounding_development)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                        />
                      </Col>
                      <Col md={6} className="pb-4">
                        <TextField
                          fullWidth
                          label="Remark &#x1F4F1;"
                          // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }} 
                          variant="standard"
                          id="remarks"
                          name="remarks"
                          value={formProps.values.remarks}
                          onChange={formProps.handleChange}
                          onBlur={() => {
                          if (formProps.values.remarks)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6} className="pb-4">
                        Map
                        {/* <GeoMap/> */}
                      </Col>
                      <Col md={6} className="pb-4">
                        Map
                      </Col>
                    </Row>

                    <Divider />
                    <br />

                    <Row>
                      <Col md={12}>
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
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    property: state.property,
    geoTags: state.geoTags,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editGeoTags: (data, setValue, value, token) =>
      dispatch(editGeoTags(data, setValue, value, token)),
      editProgressData: (progressData, setValue, value,token) =>dispatch(editProgressData(progressData, setValue, value,token)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GetTags);
