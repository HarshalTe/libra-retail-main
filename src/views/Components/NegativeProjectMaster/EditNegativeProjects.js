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
import FormGroup from "@mui/material/FormGroup";
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
import { negativeProjectsEditData } from "../../../Redux/Creators/NegativeProjectsCreators";

function EditNegativeProjects(props) {
  const token = props.login?.login?.token;
  console.log("edit negative", props.data);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values In Edit Negative Projects Edit:", values);

    //? FormData Chahiye File Upload hai

    const data = new FormData();
    data.append("token", token);
    data.append("pageno", props.data2.pageno);
    data.append("id", props.data.id);
    data.append("pageSize", props.data2.pageSize);
    data.append("project_name", values.project_name);
    data.append("address", values.address);
    data.append("pincode", values.pincode);
    data.append("reasons", values.reasons);
    data.append("file", values.file);

    props.negativeProjectsEditData(data);
    setSubmitting(true);
    setModal(false);
  };

  //*download file
  function downloadFile(data) {
    axios
      .get(
        `https://lvpl.in/librabackend/storage/app/public/NegativeProjectPage/${data}`,
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
            <strong>Add Negative Projects</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              project_name: props?.data?.project_name,
              address: props?.data?.address,
              pincode: props?.data?.pincode,
              reasons: props.data?.reasons,
              file: props?.data?.file,
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              project_name: Yup.string().required("Project Name is required"),
              address: Yup.string().required("Address is required"),
              reasons: Yup.string().required("Reasons are required"),
            })}
          >
            {(formProps) => (
              <Form encType="multipart/form-data">
                <Row>
                  <Col md={6} className="pb-4">
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

                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
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

                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="pincode"
                      name="pincode"
                      label="Pincode"
                      value={formProps.values.pincode}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.pincode &&
                        Boolean(formProps.errors.pincode)
                      }
                      helperText={
                        formProps.touched.pincode && formProps.errors.pincode
                      }
                    />
                  </Col>

                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="reasons"
                      name="reasons"
                      label="Reasons *"
                      value={formProps.values.reasons}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.reasons &&
                        Boolean(formProps.errors.reasons)
                      }
                      helperText={
                        formProps.touched.reasons && formProps.errors.reasons
                      }
                    />
                  </Col>

                  {props?.data?.file === null ? (
                    <Col md={6} className="pb-4">
                      <TextField
                        fullWidth
                        type="file"
                        size="small"
                        focused
                        variant="outlined"
                        id="file"
                        name="file"
                        label="File Upload"
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

                  <Col md={6} className="pb-4"></Col>
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
    negativeProjectsEditData: (data) =>
      dispatch(negativeProjectsEditData(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditNegativeProjects);
