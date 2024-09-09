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
// import { editBrokersData } from "../../../Redux/Creators/BrokersCreators";

function EditComparison(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values In Broker Edit:", values);

    let data = {
      token: token,
      pageno: props.data.pageno,
      pageSize: props.data.pageSize,
      id: props.data.id,
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

    // props.editBrokersData(data);
    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
      <Tooltip title="Edit Comparison" placement="top">
        <Button
          variant="outlined"
          color="warning"
          size="small"
          className="p-1"
          onClick={() => toggle()}
          // startIcon={<AddIcon fontSize="inherit" />}
        >
          {/* <EditIcon fontSize="medium" /> */}
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
            <strong>Edit Comparison Data</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              name: props?.data?.name,
              about: props?.data?.about,
              email: props?.data?.email,
              dealing_in: props?.data?.dealing_in,
              rera_no: props?.data?.rera_no,
              nar_no: props?.data?.nar_no,
              tread_no: props?.data?.tread_no,
              propertyforsell: props?.data?.propertyforsell,
              propertyforrent: props?.data?.propertyforrent,
              serviceprovided: props?.data?.serviceprovided,
              expert_in: props?.data?.expert_in,
              operate_in: props?.data?.operate_in,
              operating_since: props?.data?.operating_since,
              website: props?.data?.website,
              mobile_no: props?.data?.mobile_no,
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
                      label="Economic life of building"
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
                      label="Building age"
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
                      label="Residual age"
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
                      label="BA as per plan"
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
                      label="BA as per site"
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
                      label="BA for evaluation"
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
                      label="BA loading"
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
                      label="Superplot area as per plan"
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
                      label="SPA as per doc"
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
                      label="SPA for valuation"
                      id="propertyforrent"
                      name="propertyforrent"
                      value={formProps.values.propertyforrent}
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
    // editBrokersData: (data) => dispatch(editBrokersData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditComparison);
