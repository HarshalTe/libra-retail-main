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
// import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import DateFnsUtils from "@date-io/date-fns";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";
import moment from "moment";
import MenuItem from "@mui/material/MenuItem";

//*Actions
// import { uploadDocuments } from "../../../../../Redux/Creators/DocumentsCreators";

function UploadDocument(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values", values);

    const data = new FormData();
    data.append("property_id", values.property_id);
    data.append("document_id", values.document_id);
    data.append("document_desc", values.document_desc);
    data.append("document_file", values.document_file);
    data.append("is_received", values.is_received);
    data.append("received_date", values.received_date);
    data.append("document_remark", values.document_remark);

    // props.uploadDocuments(data, token);
    setSubmitting(false);
    setModal(true);
  };

  return (
    <div>
      <Tooltip title="Upload File" placement="left">
        <Button
          variant="outlined"
          color="info"
          size="small"
          className="ml-2"
          onClick={() => toggle()}
          startIcon={<CloudUploadIcon fontSize="small" />}
        >
          Upload Files
        </Button>
      </Tooltip>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Upload Files</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              document_id: props?.property?.property?.document?.id,
              property_id: props?.property?.property?.id,
              document_desc: "",
              document_file: "",
              is_received: "",
              received_date: moment().format("YYYY-MM-DD"),
              document_remark: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              document_file: Yup.string().required("File is required"),
            })}
            >
            {(formProps) => (
              <Form enctype="multipart/form-data">
                <Row>
                  <Col md={6} className="pt-4">
                    <TextField
                      fullWidth
                      type="file"
                      size="small"
                      focused
                      variant="outlined"
                      id="document_file"
                      name="document_file"
                      label="File Upload"
                      onChange={(event) => {
                        formProps.setFieldValue(
                          "document_file",
                          event.currentTarget.files[0]
                        );
                        console.log(
                          "document_file",
                          formProps.values.document_file
                        );
                      }}
                      error={
                        formProps.touched.document_file &&
                        Boolean(formProps.errors.document_file)
                      }
                      helperText={
                        formProps.touched.document_file &&
                        formProps.errors.document_file
                      }
                    />
                  </Col>
                  <Col md={6}>
                      <TextField
                        fullWidth
                        select
                        variant="outlined"
                        label="File Name"
                        name="file_name"
                        value={formProps.values.file_name}
                        onChange={formProps.handleChange}
                        onBlur={formProps.handleBlur}
                        helperText={
                          formProps.touched.file_name &&
                          formProps.errors.file_name
                        }
                        error={
                          formProps.touched.file_name &&
                          formProps.errors.file_name
                        }
                      >
                        <MenuItem value="">Select File Name</MenuItem>
                        <MenuItem value="Pan Card">Pan Card</MenuItem>
                        <MenuItem value="Adhar Card">Adhar Card</MenuItem>
                        <MenuItem value="Tax Details">Tax Details</MenuItem>
                        <MenuItem value="Index XI">Index XI</MenuItem>
                        <MenuItem value="Sale Deed">Sale Deed</MenuItem>
                        <MenuItem value="Sale Certificate">
                          Sale Certificate
                        </MenuItem>
                      </TextField>
                    </Col>

                
                  <Col md={12} className="pb-4">
                    <TextField
                      fullWidth
                      label="Document remarks"
                      variant="standard"
                      id="document_remark"
                      name="document_remark"
                      value={formProps.values.document_remark}
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
    property: state.property,
    documents: state.documents,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // uploadDocuments: (data, token) => dispatch(uploadDocuments(data, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadDocument);
