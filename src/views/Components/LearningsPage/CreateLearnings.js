import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
  Row,
  Col,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
} from "reactstrap";

import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import Tooltip from "@mui/material/Tooltip";

import TextField from "@material-ui/core/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@material-ui/core";

import { Divider } from "@mui/material";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";

//* Actions
import { learningsPostData } from "../../../Redux/Creators/LearningsCreators";

function CreateQueries(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values Add:", values);

    // let data = {
    //   user_id: values.user_id,
    //   case_id: values.property_id.toString(),
    //   subject: values.subject,
    //   file: values.file,
    //   status: values.status,
    //   date: values.date,
    //   remark: values.remark,
    // };

    const data = new FormData();

    data.append("subject", values.subject);
    data.append("file", values.file);
    data.append("type", values.type);
    data.append("date", values.date);
    data.append("city", values.city);
    data.append("notification_no", values.notification_no);

    console.log("data add", data);

    props.learningsPostData(data, token);
    setSubmitting(true);
    setModal(false);
  };


  const propertiesProps2 = {
    options: props?.properties?.isLoading
      ? []
      : props?.properties?.properties?.data?.map((property) => property),
  };

  return (
    <div>
      <Button
        size="small"
        variant="contained"
        className="ml-2"
        color="success"
        onClick={() => {
          setModal(!modal);
        }}
      >
        Create
      </Button>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Create Learnings</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              user_id: props?.login?.login?.user?.id,
              case_id: "",

              subject: "",
              notification_no: "",
              file: "",
              city: "",
              date: moment().format("YYYY-MM-DD"),
              type: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              // case_id: Yup.string().required(
            })}
          >
            {(formProps) => (
              <Form>
                <Row>
                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      size="small"
                      id="notification_no"
                      name="notification_no"
                      label="Notification No"
                      variant="outlined"
                      value={formProps.values.notification_no}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.notification_no &&
                        Boolean(formProps.errors.notification_no)
                      }
                      helperText={
                        formProps.touched.notification_no && formProps.errors.notification_no
                      }
                    />
                  </Col>
                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      size="small"
                      id="city"
                      name="city"
                      label="City"
                      variant="outlined"
                      value={formProps.values.city}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.city &&
                        Boolean(formProps.errors.city)
                      }
                      helperText={
                        formProps.touched.city && formProps.errors.city
                      }
                    />
                  </Col>
                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      size="small"
                      id="type"
                      name="type"
                      label="Type"
                      variant="outlined"
                      value={formProps.values.type}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.type &&
                        Boolean(formProps.errors.type)
                      }
                      helperText={
                        formProps.touched.type && formProps.errors.type
                      }
                    />
                  </Col>
                

                  <Col md={6} className="pb-4">
                    {/* <Label>Upload</Label> */}
                    <TextField
                      fullWidth
                      size="small"
                      name="file"
                      variant="outlined"
                      onChange={(e, value) => {
                        formProps.setFieldValue(
                          "file",
                          e.currentTarget.files[0]
                        );
                      }}
                      type="file"
                      error={
                        formProps.touched.file && Boolean(formProps.errors.file)
                      }
                      helperText={
                        formProps.touched.file && formProps.errors.file
                      }
                    />
                  </Col>

                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      type="date"
                      size="small"
                      id="date"
                      name="date"
                      label="Date"
                      variant="outlined"
                      value={formProps.values.date}
                      onChange={formProps.handleChange}
                    />
                  </Col>
                  {/* <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      size="small"
                      id="status"
                      name="status"
                      label="Status"
                      variant="outlined"
                      value={formProps.values.status}
                      onChange={formProps.handleChange}
                    >
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value={1}>Yes</MenuItem>
                      <MenuItem value={0}>No</MenuItem>
                    </TextField>
                  </Col> */}

                  <Col md={12} className="">
                    <Label>Subject</Label>
                    <TextareaAutosize
                      style={{ width: 725, margin: "auto" }}
                      minRows={6}
                      fullWidth
                      size="large"
                      label="subject"
                      id="subject"
                      name="subject"
                      value={formProps.values.subject}
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
    banks: state.banks,
    branches: state.branches,
    properties: state.properties,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    learningsPostData: (data, token) => dispatch(learningsPostData(data, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateQueries);
