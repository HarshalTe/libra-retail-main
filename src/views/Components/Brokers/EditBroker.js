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
import DeleteButton from "Helpers/DeleteButton";
import Swal from "sweetalert2";



//*Actions
import { editBrokersData } from "../../../Redux/Creators/BrokersCreators";

function EditBrokers(props) {
  const token = props.login?.login?.token;
  console.log(props?.data?.name,props,"yyyyyy")

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  let data = {
    token: token,
    id: props.data?.id,
  };

  async function deleteSupplier(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        props.onDeleteSupplier(id, data);
      }
    });
  }

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values In Broker Edit:", values);

    let data = {
      token: token,
      pageno: props.data2.pageno,
      pageSize: props.data2.pageSize,
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

    props.editBrokersData(data);
    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
      <div title="Edit Broker" placement="top">
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
      </div>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Edit Broker Data</strong>
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
    editBrokersData: (data) => dispatch(editBrokersData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBrokers);
