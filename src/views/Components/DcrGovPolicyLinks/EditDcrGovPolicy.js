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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";

//*download
import axios from "axios";
import fileDownload from "js-file-download";

//*Actions
import { editDcrGovLinkPolicy } from "../../../Redux/Creators/DcrGovPolicyCreators";

function EditDcrGovPolicy(props) {
  const token = props.login?.login?.token;
  console.log("edit dcr policy", props.data);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values In DCR Policy Edit:", values);

    //? FormData Chahiye File Upload hai

    const data = new FormData();
    data.append("token", token);
    data.append("pageno", props.data2.pageno);
    data.append("pageSize", props.data2.pageSize);
    data.append("id", props.data.id);
    data.append("date", values.date);
    data.append("notification_no", values.notification_no);
    data.append("subject", values.subject);
    data.append("dept", values.dept);
    data.append("city", values.city);
    data.append("type", values.type);
    data.append("file", values.file);

    props.editDcrGovLinkPolicy(data);
    setSubmitting(true);
    setModal(false);
  };

  //*download file
  function downloadFile(data) {
    axios
      .get(
        `https://lvpl.in/librabackend/storage/app/public/DCR/${data}`,
        {
          responseType: "blob",
        }
      )
      .then((res) => {
        fileDownload(res.data, data);
      });
  }

  return (
    <div>
      <Tooltip title="Edit" placement="left">
        <Button
          variant="outlined"
          color="warning"
          size="small"
          className="p-1"
          onClick={() => toggle()}
          // startIcon={<EditIcon fontSize="inherit" />}
        >
          <EditIcon fontSize="medium" />
          {/* Edit */}
        </Button>
      </Tooltip>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Edit Dcr/Gov Policy</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              date: props.data.date,
              notification_no: props.data.notification_no,
              subject: props.data.subject,
              dept: props.data.dept,
              city: props.data.city,
              type: props.data.type,
              file: props.data.file,
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
                  <Col md={4} className="pb-4">
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

                  <Col md={4} className="pb-4">
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

                  <Col md={4} className="pb-4">
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

                  <Col md={4} className="pb-4">
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

                  <Col md={4} className="pb-4">
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
                  <Col md={4} className="pb-4">
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
                  {props?.data?.file === "nofile.pdf" ? (
                    <Col md={12} className="pb-4">
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        type="file"
                        label="Upload File"
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
                          formProps.touched.file &&
                          Boolean(formProps.errors.file)
                        }
                        helperText={
                          formProps.touched.file && formProps.errors.file
                        }
                      />
                    </Col>
                  ) : (
                    <Row>
                      <Col md={6} className="pb-4">
                        <Button
                          variant="outlined"
                          size="small"
                          color="success"
                          className="ml-3"
                          fullWidth
                          onClick={() => downloadFile(props.data.file)}
                        >
                          {props.data.file}
                        </Button>
                      </Col>

                      <Col md={6} className="pb-4">
                        <TextField
                          type="file"
                          size="small"
                          fullWidth
                          focused
                          variant="outlined"
                          id="file"
                          name="file"
                          label="File Upload"
                          className="ml-6"
                          // value={formProps.values.file}
                          onChange={(event) => {
                            formProps.setFieldValue(
                              "file",
                              event.currentTarget.files[0]
                            );
                            console.log("file", formProps.values.file);
                          }}
                          error={
                            formProps.touched.file &&
                            Boolean(formProps.errors.file)
                          }
                          helperText={
                            formProps.touched.file && formProps.errors.file
                          }
                        />
                      </Col>
                    </Row>
                  )}
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
    editDcrGovLinkPolicy: (data) => dispatch(editDcrGovLinkPolicy(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDcrGovPolicy);
