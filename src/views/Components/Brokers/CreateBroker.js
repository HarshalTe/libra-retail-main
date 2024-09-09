import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";

//*Actions
import { postBrokers } from "../../../Redux/Creators/BrokersCreators";

function CreateBroker(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values In under construct projects Data Add:", values);

    let data = {
      token: token,
      pageno: props.data.pageno,
      pageSize: props.data.pageSize,
      name: values.name,
      about: values.about,
      email: values.email,
      dealing_in: values.dealing_in,
      rera_no: values.rera_no,
      nar_no: values.nar_no,
      tread_no: values.tread_no,
      propertyforsell: values.propertyforsell,
      propertyforrent: values.propertyforrent,
      serviceprovided: values.serviceprovided,
      expert_in: values.expert_in,
      operate_in: values.operate_in,
      operating_since: values.operating_since,
      website: values.website,
      mobile_no: values.mobile_no,
      latitude: values.latitude,
      longitude: values.longitude,
      address: values.address,
      pincode: values.pincode,
      photo_upload: values.photo_upload,
    };

    props.postBrokers(data);
    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
      <Tooltip title="Add Brokers" placement="top">
        <Button
          variant="outlined"
          color="success"
          size="small"
          className="ml-3"
          onClick={() => toggle()}
          startIcon={<AddIcon fontSize="inherit" />}
        >
          Create
        </Button>
      </Tooltip>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Add Broker</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              name: "",
              about: "",
              email: "",
              dealing_in: "",
              rera_no: "",
              nar_no: "",
              tread_no: "",
              propertyforsell: "",
              propertyforrent: "",
              serviceprovided: "",
              expert_in: "",
              operate_in: "",
              operating_since: "",
              website: "",
              mobile_no: "",
              latitude: "",
              longitude: "",
              address: "",
              pincode: "",
              photo_upload: "",

            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Broker Name is required"),
              mobile_no: Yup.string().required("Mobile No. is required"),
              email: Yup.string().required("Email is required"),
            })}
          >
            {(formProps) => (
              <Form>
                <Row>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="name"
                      name="name"
                      label="Name *"
                      value={formProps.values.name}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.name && Boolean(formProps.errors.name)
                      }
                      helperText={
                        formProps.touched.name && formProps.errors.name
                      }
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="email"
                      name="email"
                      label="Email *"
                      value={formProps.values.email}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.email &&
                        Boolean(formProps.errors.email)
                      }
                      helperText={
                        formProps.touched.email && formProps.errors.email
                      }
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="mobile_no"
                      name="mobile_no"
                      label="Mobile No *"
                      value={formProps.values.mobile_no}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.mobile_no &&
                        Boolean(formProps.errors.mobile_no)
                      }
                      helperText={
                        formProps.touched.mobile_no &&
                        formProps.errors.mobile_no
                      }
                    />
                  </Col>
                </Row>

                <Row>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="About"
                      id="about"
                      name="about"
                      value={formProps.values.about}
                      onChange={formProps.handleChange}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Dealing In"
                      id="dealing_in"
                      name="dealing_in"
                      value={formProps.values.dealing_in}
                      onChange={formProps.handleChange}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Rera No."
                      id="rera_no"
                      name="rera_no"
                      value={formProps.values.rera_no}
                      onChange={formProps.handleChange}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="NAR No."
                      id="nar_no"
                      name="nar_no"
                      value={formProps.values.nar_no}
                      onChange={formProps.handleChange}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Tread No"
                      id="tread_no"
                      name="tread_no"
                      value={formProps.values.tread_no}
                      onChange={formProps.handleChange}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Property for sell"
                      id="propertyforsell"
                      name="propertyforsell"
                      value={formProps.values.propertyforsell}
                      onChange={formProps.handleChange}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Property for rent"
                      id="propertyforrent"
                      name="propertyforrent"
                      value={formProps.values.propertyforrent}
                      onChange={formProps.handleChange}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Service provided"
                      id="serviceprovided"
                      name="serviceprovided"
                      value={formProps.values.serviceprovided}
                      onChange={formProps.handleChange}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Expert In"
                      id="expert_in"
                      name="expert_in"
                      value={formProps.values.expert_in}
                      onChange={formProps.handleChange}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Operate In"
                      id="operate_in"
                      name="operate_in"
                      value={formProps.values.operate_in}
                      onChange={formProps.handleChange}
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Operating Since"
                      id="operating_since"
                      name="operating_since"
                      value={formProps.values.operating_since}
                      onChange={formProps.handleChange}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Website"
                      id="website"
                      name="website"
                      value={formProps.values.website}
                      onChange={formProps.handleChange}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Latitude"
                      id="latitude"
                      name="latitude"
                      value={formProps.values.latitude}
                      onChange={formProps.handleChange}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Longitude"
                      id="longitude"
                      name="longitude"
                      value={formProps.values.longitude}
                      onChange={formProps.handleChange}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Address"
                      id="address"
                      name="address"
                      value={formProps.values.address}
                      onChange={formProps.handleChange}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Pincode                      "
                      id="pincode"
                      name="pincode"
                      value={formProps.values.pincode}
                      onChange={formProps.handleChange}
                    />
                  </Col>
                  <Col md={4}>
                      <Label className="label f-12">Photo upload</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        // label="Photo upload" 
                        size="small"
                        type="file"
                        id="photo_upload"
                        name="photo_upload"
                        onChange={(e) => {
                          formProps.setFieldValue(
                            "photo_upload",
                            e.currentTarget.files[0]
                          );
                        }}
                        error={
                          formProps.touched.photo_upload &&
                          Boolean(formProps.errors.photo_upload)
                        }
                        helperText={
                          formProps.touched.photo_upload && formProps.errors.photo_upload
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
    postBrokers: (data) => dispatch(postBrokers(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateBroker);
