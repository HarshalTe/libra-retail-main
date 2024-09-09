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

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";

//*Actions
import { editExternalData } from "../../../Redux/Creators/ExternalDataCreators";

function EditExternalData(props) {
  const token = props.login?.login?.token;
  console.log("External Data Edit", props.data);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values In External Data Edit:", values);

    let data = {
      token: token,
      pageno: props.data2.pageno,
      pageSize: props.data2.pageSize,
      id: props.data2.id,
      project_name: values?.project_name,
      address: values?.address,
      floor: values?.floor,
      flat_no: values?.flat_no,
      tower_name: values?.tower_name,
      location: values?.location,
      carpet_area: values?.carpet_area,
      rent: values?.rent,
      market_value: values?.market_value,
      property_type: values?.property_type,
      latitude: values?.latitude,
      longitude: values?.longitude,
    };

    props.editExternalData(data);
    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
      <Tooltip title="Edit Projects" placement="top">
        <Button
          variant="outlined"
          color="warning"
          size="small"
          className="p-1"
          onClick={() => toggle()}
          // startIcon={<AddIcon fontSize="inherit" />}
        >
          <EditIcon fontSize="medium" />
        </Button>
      </Tooltip>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Edit External Data</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              project_name: props?.data?.project_name,
              address: props?.data?.address,
              floor: props?.data?.floor,
              flat_no: props?.data?.flat_no,
              tower_name: props?.data?.tower_name,
              location: props?.data?.location,
              carpet_area: props?.data?.carpet_area,
              rent: props?.data?.rent,
              market_value: props?.data?.market_value,
              property_type: props?.data?.property_type,
              latitude: props?.data?.latitude,
              longitude: props?.data?.longitude,
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              project_name: Yup.string().required("Project Name is required"),
              address: Yup.string().required("Address is required"),
              tower_name: Yup.string().required("Tower Name are required"),
              latitude: Yup.string().required("Latitude is required"),
              longitude: Yup.string().required("Longitude is required"),
            })}
          >
            {(formProps) => (
              <Form>
                <Row>
                  <Col md={4} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Project Name *"
                      id="project_name"
                      name="project_name"
                      value={formProps.values.project_name}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.project_name &&
                        Boolean(formProps.errors.project_name)
                      }
                      helperText={
                        formProps.touched.project_name &&
                        formProps.errors.project_name
                      }
                    />
                  </Col>

                  <Col md={2} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="floor"
                      name="floor"
                      label="Floor"
                      value={formProps.values.floor}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.floor &&
                        Boolean(formProps.errors.floor)
                      }
                      helperText={
                        formProps.touched.floor && formProps.errors.floor
                      }
                    />
                  </Col>

                  <Col md={2} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="flat_no"
                      name="flat_no"
                      label="Flat No"
                      value={formProps.values.flat_no}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.flat_no &&
                        Boolean(formProps.errors.flat_no)
                      }
                      helperText={
                        formProps.touched.flat_no && formProps.errors.flat_no
                      }
                    />
                  </Col>

                  <Col md={4} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="tower_name"
                      name="tower_name"
                      label="Tower Name *"
                      value={formProps.values.tower_name}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.tower_name &&
                        Boolean(formProps.errors.tower_name)
                      }
                      helperText={
                        formProps.touched.tower_name &&
                        formProps.errors.tower_name
                      }
                    />
                  </Col>

                  <Col md={12} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      rowsMax={4}
                      size="small"
                      variant="outlined"
                      id="address"
                      name="address"
                      label="Address *"
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

                  <Col md={4} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Location"
                      id="location"
                      name="location"
                      value={formProps.values.location}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.location &&
                        Boolean(formProps.errors.location)
                      }
                      helperText={
                        formProps.touched.location && formProps.errors.location
                      }
                    />
                  </Col>
                  <Col md={4} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Carpet Area"
                      id="carpet_area"
                      name="carpet_area"
                      value={formProps.values.carpet_area}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.carpet_area &&
                        Boolean(formProps.errors.carpet_area)
                      }
                      helperText={
                        formProps.touched.carpet_area &&
                        formProps.errors.carpet_area
                      }
                    />
                  </Col>
                  <Col md={4} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Rent"
                      id="rent"
                      name="rent"
                      value={formProps.values.rent}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.rent && Boolean(formProps.errors.rent)
                      }
                      helperText={
                        formProps.touched.rent && formProps.errors.rent
                      }
                    />
                  </Col>

                  <Col md={4} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Market Value"
                      id="market_value"
                      name="market_value"
                      value={formProps.values.market_value}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.market_value &&
                        Boolean(formProps.errors.market_value)
                      }
                      helperText={
                        formProps.touched.market_value &&
                        formProps.errors.market_value
                      }
                    />
                  </Col>

                  <Col md={8} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Property Type"
                      id="property_type"
                      name="property_type"
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

                  <Col md={6} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      type="number"
                      variant="outlined"
                      size="small"
                      label="Latitude"
                      id="latitude"
                      name="latitude"
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
                  <Col md={6} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      type="number"
                      variant="outlined"
                      size="small"
                      label="Longitude"
                      id="longitude"
                      name="longitude"
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
                </Row>

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
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editExternalData: (data) => dispatch(editExternalData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExternalData);
