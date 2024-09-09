import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  Table,
  Label,
  //   Button,
  CardBody,
  FormGroup,
  CardHeader,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";

import Autocomplete from "@mui/material/Autocomplete";
import FormControlLabel from "@mui/material/FormControlLabel";

import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import TextField from "@material-ui/core/TextField";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomInput from "../../Views/CustomeInput";
import CustomSelect from "../../Views/CustomeSelect";
import GoogleMapReact from 'google-map-react';


function UserLocationForm(props) {
  console.log(props.data);
  //*token
  const token = props.login?.login[0]?.success?.token;

  const [modal, setModal] = useState(false);
  const [addressStart, setAddressStart] = useState('');
  const [addressEnd, setAddressEnd] = useState('');
  const [distanceInKm, setDistanceInKm] = useState('');
  const [addressEmp, setAddressEmp] = useState('');

  //? handleSubmit for fromik
  const StartLatLng = (values) => {
    console.log("objectvalues",values)
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${values.startLat},${values.startLng}&key=AIzaSyC2rc_SiT0rFPip8WdQ5f8YeBPIAaVAG8Q`)
      .then(response => response.json())
      .then(data => {
        setAddressStart(data.results[0].formatted_address);
      });
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${values.endLat},${values.endLng}&key=AIzaSyC2rc_SiT0rFPip8WdQ5f8YeBPIAaVAG8Q`)
        .then(response => response.json())
        .then(data => {
          setAddressEnd(data.results[0].formatted_address);
        });
        distance(values.startLat, values.startLng, values.endLat, values.endLng)
  };
  function distance(lat1, lng1, lat2, lng2) {
    const earthRadius = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);  // deg2rad below
    const dLng = deg2rad(lng2 - lng1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLng/2) * Math.sin(dLng/2)
    ;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = earthRadius * c; // Distance in km
    setDistanceInKm(distance)
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }
  
  // useEffect(() => {
  //   // Fetch the address using the Google Maps API
  // }, [lat, lng]);
  return (
    <div>
      <Formik
        initialValues={{
          startLat:props?.employeeLocation?.employeeLocation[0]?.lat,
          startLng:props?.employeeLocation?.employeeLocation[0]?.long,
          endLat:props?.employeeLocation?.employeeLocation[
            props?.employeeLocation?.employeeLocation.length - 1
          ]?.lat ,
          endLng: props?.employeeLocation?.employeeLocation[
            props?.employeeLocation?.employeeLocation.length - 1
          ]?.long,
          start_location:
            props?.employeeLocation?.employeeLocation[0]?.long +
            "," +
            props?.employeeLocation?.employeeLocation[0]?.lat,
          end_location:
            props?.employeeLocation?.employeeLocation[
              props?.employeeLocation?.employeeLocation.length - 1
            ]?.long +
            "," +
            props?.employeeLocation?.employeeLocation[
              props?.employeeLocation?.employeeLocation.length - 1
            ]?.lat,
          start_address: "",
          end_address: "",
          distance_travelled: "",
          tavel_allowance: "",
          time_search: "",
          time_location: "",
          time_address: "",
        }}
        // onSubmit={handleSubmit}
        validationSchema={Yup.object().shape({
          start_location: Yup.string().required("Start Location is required"),
          email: Yup.string("Enter your email")
            .email("Enter a valid email")
            .required("Email is required"),
        })}
      >
        {(formProps) => {
          const timeProps = {
            options: props?.employeeLocation?.isLoading
              ? []
              : props?.employeeLocation?.employeeLocation?.map(
                  (employee) => employee
                ),
          };

          const timeLongLat = (time) => {
            console.log("time", time);
            const employee = props?.employeeLocation?.employeeLocation?.find(
              (o) => o.time === time
            );
            console.log("employee", employee);

            formProps.setFieldValue(
              "time_location",
              employee?.long + "," + employee?.lat
            );
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${employee?.lat},${employee?.long}&key=AIzaSyC2rc_SiT0rFPip8WdQ5f8YeBPIAaVAG8Q`)
            .then(response => response.json())
            .then(data => {
              setAddressEmp(data.results[0].formatted_address);
            });
          };

          // console.log("timeLongLat", timeLongLat);

          return (
            <Form>
              <Row className="form-group">
                <Col md={12}>
                  <br />
                </Col>

                <Col md={12}>
                  <TextField
                    fullWidth
                    id="start_location"
                    name="start_location"
                    label="Start Location"
                    value={formProps.values.start_location}
                    onChange={formProps.handleChange}
                    error={
                      formProps.touched.start_location &&
                      Boolean(formProps.errors.start_location)
                    }
                    helperText={
                      formProps.touched.start_location &&
                      formProps.errors.start_location
                    }
                  />
                </Col>

                <Col md={12}>
                  <br />
                  <TextField
                    fullWidth
                    id="end_location"
                    name="end_location"
                    label="End Location"
                    value={formProps.values.end_location}
                    onChange={formProps.handleChange}
                    error={
                      formProps.touched.end_location &&
                      Boolean(formProps.errors.end_location)
                    }
                    helperText={
                      formProps.touched.end_location &&
                      formProps.errors.end_location
                    }
                  />
                </Col>
                <Col md={12}>
                  <br />
                  <div className="d-flex">
                    <Button
                      onClick={() => StartLatLng(formProps.values)}
                    >
                      Search
                    </Button>
                  </div>
                </Col>
                <Col md={12} >
                <div>
      {/* <div>Latitude: {lat}</div>
      <div>Longitude: {lng}</div>
      <div>Address: {address}</div> */}
      {/* <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyC2rc_SiT0rFPip8WdQ5f8YeBPIAaVAG8Q' }}
        defaultCenter={{ lat: lat, lng: lng }}
        defaultZoom={15}
      /> */}
    </div>
                </Col>

                <Col md={12}>
                  <br />
                  <TextField
                    fullWidth
                    id="start_address"
                    name="start_address"
                    label="Start Address"
                    value={addressStart}
                    onChange={formProps.handleChange}
                    error={
                      formProps.touched.start_address &&
                      Boolean(formProps.errors.start_address)
                    }
                    helperText={
                      formProps.touched.start_address &&
                      formProps.errors.start_address
                    }
                  />
                </Col>

                <Col md={12}>
                  <br />
                  <TextField
                    fullWidth
                    id="end_address"
                    name="end_address"
                    label="End Address"
                    value={addressEnd}
                    onChange={formProps.handleChange}
                    error={
                      formProps.touched.end_address &&
                      Boolean(formProps.errors.end_address)
                    }
                    helperText={
                      formProps.touched.end_address &&
                      formProps.errors.end_address
                    }
                  />
                </Col>

                <Col md={12}>
                  <br />
                  <TextField
                    fullWidth
                    id="distance_travelled"
                    name="distance_travelled"
                    label="Distance Travelled"
                    value={Math.round(distanceInKm)+" "+"Km"}
                    onChange={formProps.handleChange}
                    error={
                      formProps.touched.distance_travelled &&
                      Boolean(formProps.errors.distance_travelled)
                    }
                    helperText={
                      formProps.touched.distance_travelled &&
                      formProps.errors.distance_travelled
                    }
                  />
                </Col>

                <Col md={12}>
                  <br />
                  <TextField
                    fullWidth
                    id="tavel_allowance"
                    name="tavel_allowance"
                    label="Tavel Allowance"
                    value={formProps.values.tavel_allowance}
                    onChange={formProps.handleChange}
                    error={
                      formProps.touched.tavel_allowance &&
                      Boolean(formProps.errors.tavel_allowance)
                    }
                    helperText={
                      formProps.touched.tavel_allowance &&
                      formProps.errors.tavel_allowance
                    }
                  />
                </Col>

                <Col md={12}>
                  <br />
                  <Autocomplete
                    id="contact-autocomplete"
                    options={timeProps.options}
                    getOptionLabel={(employee) => employee?.time}
                    clearOnBlur={() =>
                      formProps.setFieldValue("time_location", "")
                    }
                    onChange={(e, value) =>
                      formProps.setFieldValue("time_search", value?.time || "")
                    }
                    onOpen={formProps.handleBlur}
                    includeInputInList
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={Boolean(
                          formProps.touched.time_search &&
                            formProps.errors.time_search
                        )}
                        fullWidth
                        helperText={
                          formProps.touched.time_search &&
                          formProps.errors.time_search
                        }
                        label="Time Search"
                        name="time_search"
                        variant="outlined"
                      />
                    )}
                  />
                </Col>

                <Col md={12}>
                  <br />
                  <div className="d-flex">
                    <Button
                      onClick={() => timeLongLat(formProps.values.time_search)}
                    >
                      Search
                    </Button>
                  </div>
                </Col>

                <Col md={12}>
                  <br />
                  <TextField
                    fullWidth
                    id="time_location"
                    name="time_location"
                    label="Time Location"
                    value={formProps.values.time_location}
                    onChange={formProps.handleChange}
                    error={
                      formProps.touched.time_location &&
                      Boolean(formProps.errors.time_location)
                    }
                    helperText={
                      formProps.touched.time_location &&
                      formProps.errors.time_location
                    }
                  />
                </Col>

                <Col md={12}>
                  <br />
                  <TextField
                    fullWidth
                    id="time_address"
                    name="time_address"
                    label="Time Address"
                    value={addressEmp}
                    onChange={formProps.handleChange}
                    error={
                      formProps.touched.time_address &&
                      Boolean(formProps.errors.time_address)
                    }
                    helperText={
                      formProps.touched.time_address &&
                      formProps.errors.time_address
                    }
                  />
                </Col>
              </Row>

              {/* <Button type="submit">Submit</Button> */}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    users: state.users,
    employeeLocation: state.employeeLocation,
  };
};

const mapDispatchToProps = (dispatch) => {};

export default connect(mapStateToProps, mapDispatchToProps)(UserLocationForm);
