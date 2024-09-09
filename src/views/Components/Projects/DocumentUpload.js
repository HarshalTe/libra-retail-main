import React, { useState } from "react";

import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  Modal,
  ModalHeader,
  ModalBody,
  CardBody,
  Label,
} from "reactstrap";

import Button from "@mui/material/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";
import { editProjectsDataTablePhotos } from "../../../Redux/Creators/ProjectsCreators";
import { editProjectsDataTable } from "../../../Redux/Creators/ProjectsCreators";
import moment from "moment";
import { postProjectDocument } from "../../../Redux/Creators/ProjectDocumentCreators";

//*Actions

function DocumentUpload(props) {
  const [modal, setModal] = useState(false);
  const toggle = () => {
    // handleFileChange()
    setModal(!modal);
  };
  console.log(
    "Values In Upload file:",
    props,
    props?.data?.project_tower_details
  );

  const handleSubmit = (values, { setSubmitting }) => {
    const token = props.login?.login?.token;
    console.log("Values In Create form", values, token, props);

    const data = new FormData();
    // data.append("project_id", props?.data);
    data.append("document_name", values.document_name);
    data.append("authority", values.authority);
    data.append("outward_no", values.outward_no);
    data.append("date", values.date);
    data.append("file_upload", values.file_upload);
    data.append("reference_number", values.reference_number);
    data.append("tower_id", values.tower_id);

    console.log("submit data", data);
    props.postProjectDocument(data, token);
    setSubmitting(false);
  };

  return (
    <div>
      <div
        style={{
          "font-weight": "800",
          "font-size": "1rem",
          cursor: "pointer",
          color: "#5e72e6",
        }}
        onClick={() => toggle()}
      >
        <i className="" aria-hidden="true"></i>Project Upload Document
      </div>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Project Upload Document</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Card>
            <CardBody>
              <Formik
                initialValues={{
                  document_name: "",
                  file_upload: "",
                  date: moment().format("YYYY-MM-DD"),
                  reference_number: "",
                  outward_no: "",
                  authority: "",
                  remarks: "",
                  tower_id: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={Yup.object().shape({})}
              >
                {(formProps) => {
                  return (
                    <Form>
                      <br />
                      <Row className="form-group d-flex align-items-end">
                        <Col md={6}>
                          <Label>Document Name</Label>
                          <TextField
                            fullWidth
                            select
                            variant="outlined"
                            label="Document Name"
                            name="document_name"
                            value={formProps.values.document_name}
                            onChange={formProps.handleChange}
                            onBlur={formProps.handleBlur}
                            helperText={
                              formProps.touched.document_name &&
                              formProps.errors.document_name
                            }
                            error={
                              formProps.touched.document_name &&
                              formProps.errors.document_name
                            }
                          >
                            <MenuItem value="N/A">Select</MenuItem>
                            {props?.dropdowns?.dropdowns
                              ?.filter(
                                (field) => field?.name === "Document Details"
                              )[0]
                              ?.drop_down_details?.map((field, i) => (
                                <MenuItem key={i} value={field?.name}>
                                  {field?.name}
                                </MenuItem>
                              ))}
                          </TextField>
                        </Col>
                        <Col md={6}>
                          <Label>Upload Documents</Label>
                          <TextField
                            fullWidth
                            name="file_upload"
                            variant="outlined"
                            margin="small"
                            onChange={(e, value) => {
                              formProps.setFieldValue(
                                "file_upload",
                                e.currentTarget.files[0]
                              );
                            }}
                            type="file"
                            error={
                              formProps.touched.file_upload &&
                              Boolean(formProps.errors.file_upload)
                            }
                            helperText={
                              formProps.touched.file_upload &&
                              formProps.errors.file_upload
                            }
                          />
                        </Col>
                        <Col md={6} className="pb-4">
                          <TextField
                            fullWidth
                            variant="outlined"
                            select
                            id="tower_id"
                            name="tower_id"
                            label="Tower"
                            value={formProps.values.tower_id}
                            onChange={formProps.handleChange}
                          >
                            <MenuItem value="N/A">Select</MenuItem>
                            {props?.data?.project_tower_details?.map(
                              (field, i) => (
                                <MenuItem key={i} value={field?.id}>
                                  {field?.tower_name}
                                </MenuItem>
                              )
                            )}
                          </TextField>
                        </Col>

                        <Col md={6} className="pb-4 pt-4">
                          <TextField
                            fullWidth
                            focused
                            type="date"
                            variant="outlined"
                            id="date"
                            name="date"
                            label="Document Date"
                            value={formProps.values.date}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.date &&
                              Boolean(formProps.errors.date)
                            }
                            helperText={
                              formProps.touched.date && formProps.errors.date
                            }
                          />
                        </Col>

                        <Col md={6} className="pb-4">
                          <TextField
                            fullWidth
                            variant="outlined"
                            label="Outward Number"
                            id="outward_no"
                            name="outward_no"
                            value={formProps.values.outward_no}
                            onChange={formProps.handleChange}
                          />
                        </Col>
                        <Col md={6} className="pb-4">
                          <TextField
                            fullWidth
                            label="authority"
                            variant="outlined"
                            id="authority"
                            name="authority"
                            value={formProps.values.authority}
                            onChange={formProps.handleChange}
                          />
                        </Col>
                        <Col md={6} className="pb-4">
                          <TextField
                            fullWidth
                            label="Reference Number"
                            variant="outlined"
                            id="reference_number"
                            name="reference_number"
                            value={formProps.values.reference_number}
                            onChange={formProps.handleChange}
                          />
                        </Col>
                        <Col md={6} className="pb-4">
                          <TextField
                            fullWidth
                            label="Document remarks"
                            variant="outlined"
                            id="remarks"
                            name="remarks"
                            value={formProps.values.remarks}
                            onChange={formProps.handleChange}
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Button
                          color="success"
                          variant="contained"
                          disabled={formProps.isSubmitting}
                          fullWidth
                          type="submit"
                        >
                          Upload Documents
                        </Button>
                      </Row>
                    </Form>
                  );
                }}
              </Formik>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    dropdowns: state.dropdowns,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editProjectsDataTablePhotos: (data, users) =>
      dispatch(editProjectsDataTablePhotos(data, users)),
    editProjectsDataTable: (data, user) =>
      dispatch(editProjectsDataTable(data, user)),
    postProjectDocument: (data, token) =>
      dispatch(postProjectDocument(data, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentUpload);
