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
import moment from "moment";

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
import { postDcrGovPolicy } from "../../../../../Redux/Creators/DcrGovPolicyCreators";

function AddDcrPolicy(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values In DCrs Add:", values);

    //!form data aayega yaha
    const data = new FormData();
    data.append("token", token);
    data.append("pageno", props.data.pageno);
    data.append("pageSize", props.data.pageSize);
    data.append("date", values.date);
    data.append("notification_no", values.notification_no);
    data.append("subject", values.subject);
    data.append("dept", values.dept);
    data.append("city", values.city);
    data.append("type", values.type);
    data.append("file", values.file);

    props.postDcrGovPolicy(data);
    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
      <Tooltip title="Add Policy" placement="top">
        <Button
          variant="outlined"
          color="success"
          size="small"
          className="ml-3"
          onClick={() => toggle()}
          startIcon={<AddIcon fontSize="inherit" />}
        >
          Add
        </Button>
      </Tooltip>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Add DCR/Gov Policy</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              date: moment().format("YYYY-MM-DD"),
              notification_no: "",
              subject: "",
              dept: "",
              city: "",
              type: "",
              file: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              type: Yup.string().required("Type is required"),
              dept: Yup.string().required("Department is required"),
              notification_no: Yup.string().required(
                "Notification Number are required"
              ),
            })}
          >
            {(formProps) => (
              <Form encType="mmultipart/form-data">
                <Row>
                  <Col md={4} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="date"
                      size="small"
                      label="Type Date"
                      id="date"
                      name="date"
                      value={formProps.values.date}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.date && Boolean(formProps.errors.date)
                      }
                      helperText={
                        formProps.touched.date && formProps.errors.date
                      }
                    />
                  </Col>

                  <Col md={4} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="notification_no"
                      name="notification_no"
                      label="Notification No. *"
                      value={formProps.values.notification_no}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.notification_no &&
                        Boolean(formProps.errors.notification_no)
                      }
                      helperText={
                        formProps.touched.notification_no &&
                        formProps.errors.notification_no
                      }
                    />
                  </Col>

                  <Col md={4} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="subject"
                      name="subject"
                      label="Subject"
                      value={formProps.values.subject}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.subject &&
                        Boolean(formProps.errors.subject)
                      }
                      helperText={
                        formProps.touched.subject && formProps.errors.subject
                      }
                    />
                  </Col>

                  <Col md={4} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="dept"
                      name="dept"
                      label="Department *"
                      value={formProps.values.dept}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.dept && Boolean(formProps.errors.dept)
                      }
                      helperText={
                        formProps.touched.dept && formProps.errors.dept
                      }
                    />
                  </Col>

                  <Col md={4} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="City"
                      id="city"
                      name="city"
                      value={formProps.values.city}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.city && Boolean(formProps.errors.city)
                      }
                      helperText={
                        formProps.touched.city && formProps.errors.city
                      }
                    />
                  </Col>
                  <Col md={4} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Type *"
                      id="type"
                      name="type"
                      value={formProps.values.type}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.type && Boolean(formProps.errors.type)
                      }
                      helperText={
                        formProps.touched.type && formProps.errors.type
                      }
                    />
                  </Col>
                  <Col md={12} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      type="file"
                      // label="Upload File"
                      id="file"
                      name="file"
                      onChange={(event) => {
                        formProps.setFieldValue(
                          "file",
                          event.currentTarget.files[0]
                        );
                        console.log("file", formProps.values.file);
                      }}
                      error={
                        formProps.touched.file && Boolean(formProps.errors.file)
                      }
                      helperText={
                        formProps.touched.file && formProps.errors.file
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
    postDcrGovPolicy: (data) => dispatch(postDcrGovPolicy(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddDcrPolicy);
