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
// import { postBrokers } from "../../../Redux/Creators/BrokersCreators";

function AddCompatableCom(props) {
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
    };

    // props.postBrokers(data);
    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
      <Tooltip title="Add Compatable" placement="top">
        <Button
          fullWidth
          variant="outlined"
          color="success"
          size="small"
          className="ml-3"
          onClick={() => toggle()}
          startIcon={<AddIcon fontSize="inherit" />}
        >
          Add Compatable
        </Button>
      </Tooltip>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Add Compatable</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              date_range: moment().format("DD-MM-YYYY"),
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
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              //   name: Yup.string().required("Broker Name is required"),
              //   mobile_no: Yup.string().required("Mobile No. is required"),
              //   email: Yup.string().required("Email is required"),
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
                      label="Number of stories"
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
                      label="Amenities"
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
                      label="Configuration"
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
                      label="Lift"
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
                      label="Parking"
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
                      label="Age of the building"
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
                      label="Authorities"
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
                      label="Area arnge(Carper area)"
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
                      label="Name of the project"
                      id="propertyforsell"
                      name="propertyforsell"
                      value={formProps.values.propertyforsell}
                      onChange={formProps.handleChange}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      type="date"
                      variant="outlined"
                      size="small"
                      label="Date Range"
                      id="date_range"
                      name="date_range"
                      value={formProps.values.date_range}
                      onChange={formProps.handleChange}
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
    // postBrokers: (data) => dispatch(postBrokers(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCompatableCom);
