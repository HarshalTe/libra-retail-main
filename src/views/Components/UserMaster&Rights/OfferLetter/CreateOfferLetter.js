import React, { useState } from "react";

import { connect } from "react-redux";
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
} from "reactstrap";

import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Divider, TextareaAutosize } from "@mui/material";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";

//*Actions
import { offerlettersPostData } from "../../../../Redux/Creators/OfferLetterCreators";

function CreateOfferLetter(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    // ? FormData Chahiye File Upload hai
    const data = new FormData();
    data.append("name", values.name);
    data.append("email", values.email);
    data.append("phone", values.phone);
    data.append("gender", values.gender);
    data.append("doj", values.doj);
    data.append("position", values.position);
    data.append("salary_pa", values.salary_pa);
    data.append("status", values.status);
    data.append("message", values.message);
    data.append("is_approved", values.is_approved);
    data.append("file_name", values.file_name);
    data.append("internal_remarks", values.internal_remarks);
  
    console.log("Values In Upload file:", data, values);

    props.offerlettersPostData(data, token);
    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
      <Tooltip
        title="Add Offer Letter"
        placement="right"
        className="m-2"
        style={{ float: "right" }}
      >
        <Button
          variant="outlined"
          color="info"
          size="small"
          className="ml-2"
          onClick={() => toggle()}
          startIcon={<AddIcon fontSize="small" />}
        >
          {/* <CloudUploadIcon fontSize="medium" /> */}
          Create Offer Letter
        </Button>
      </Tooltip>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Add Offer Letter</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              name: "",
              email: "",
              phone: "",
              gender: "",
              doj: "",
              position: "",
              salary_pa: "",
              status: "",
              message: "",
              file_name: "",
              internal_remarks: "",
              is_approved: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              //   pincode: Yup.string().required("Pincode is required"),
              // instrcutions: Yup.string().required("Instructions is required"),
            })}
          >
            {(formProps) => (
              <Form enctype="multipart/form-data">
                <Row>
                  <Col md={6} className="">
                    <Label>Name</Label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Name"
                      id="name"
                      name="name"
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

                  <Col md={6} className="">
                    <Label>Email Id</Label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Email Id"
                      id="email"
                      name="email"
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

                  <Col md={6} className="">
                    <Label>Mobile No.</Label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Mobile No."
                      id="phone"
                      name="phone"
                      value={formProps.values.phone}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.phone &&
                        Boolean(formProps.errors.phone)
                      }
                      helperText={
                        formProps.touched.phone && formProps.errors.phone
                      }
                    />
                  </Col>

                  <Col md={6} className="">
                    <Label>Gender</Label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Gender"
                      id="gender"
                      name="gender"
                      value={formProps.values.gender}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.gender &&
                        Boolean(formProps.errors.gender)
                      }
                      helperText={
                        formProps.touched.gender && formProps.errors.gender
                      }
                    />
                  </Col>

                  <Col md={6} className="">
                    <Label>Date Of Birth</Label>
                    <TextField
                      fullWidth
                      type="date"
                      variant="outlined"
                      size="small"
                      label="Date Of Birth"
                      id="doj"
                      name="doj"
                      value={formProps.values.doj}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.doj && Boolean(formProps.errors.doj)
                      }
                      helperText={formProps.touched.doj && formProps.errors.doj}
                    />
                  </Col>
                  <Col md={6} className="">
                    <Label>Salary</Label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Salary"
                      id="salary_pa"
                      name="salary_pa"
                      value={formProps.values.salary_pa}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.salary_pa &&
                        Boolean(formProps.errors.salary_pa)
                      }
                      helperText={
                        formProps.touched.salary_pa &&
                        formProps.errors.salary_pa
                      }
                    />
                  </Col>
                  <Col md={6} className="">
                    <Label>Position</Label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Position"
                      id="position"
                      name="position"
                      value={formProps.values.position}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.position &&
                        Boolean(formProps.errors.position)
                      }
                      helperText={
                        formProps.touched.position && formProps.errors.position
                      }
                    />
                  </Col>
                  <Col md={6} className="">
                    <Label>Approvel Status</Label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      select
                      label="Status"
                      id="status"
                      name="status"
                      value={formProps.values.status}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.status &&
                        Boolean(formProps.errors.status)
                      }
                      helperText={
                        formProps.touched.status && formProps.errors.status
                      }
                    >
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value="Sent">Sent</MenuItem>
                      <MenuItem value="Approved">Approved</MenuItem>
                      <MenuItem value="Hired">Hired</MenuItem>
                      <MenuItem value="Rejected">Rejected</MenuItem>
                    </TextField>
                  </Col>

                  <Col md={6} className="pb-4 pt-3">
                    <Label>Upload</Label>
                    <TextField
                      fullWidth
                      size="small"
                      name="file_name"
                      variant="outlined"
                      onChange={(e, value) => {
                        formProps.setFieldValue(
                          "file_name",
                          e.currentTarget.files[0]
                        );
                      }}
                      type="file"
                      error={
                        formProps.touched.file_name &&
                        Boolean(formProps.errors.file_name)
                      }
                      helperText={
                        formProps.touched.file_name &&
                        formProps.errors.file_name
                      }
                    />
                  </Col>

                  <Col md={6} className="pb-4 pt-3">
                    <Label>Is Approved</Label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      select
                      label="Is Approved"
                      id="is_approved"
                      name="is_approved"
                      value={formProps.values.is_approved}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.is_approved &&
                        Boolean(formProps.errors.is_approved)
                      }
                      helperText={
                        formProps.touched.is_approved &&
                        formProps.errors.is_approved
                      }
                    >
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value={0}>Yes</MenuItem>
                      <MenuItem value={1}>No</MenuItem>
                    </TextField>
                  </Col>


                  <Col md={12} className="">
                    <Label>Internal Remark</Label>
                    <TextareaAutosize
                      //  aria-label="minimum height"
                      style={{ width: 725, margin: "auto" }}
                      minRows={6}
                      fullWidth
                      // variant="outlined"
                      size="large"
                      label="internal_remarks"
                      id="internal_remarks"
                      name="internal_remarks"
                      value={formProps.values.internal_remarks}
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
                  {/* <Col md={4}>
                   <View/>
                  </Col> */}
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
    users: state.users,
    dropdowns: state.dropdowns,
    offerLetters: state.offerLetters,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    offerlettersPostData: (data, token) =>
      dispatch(offerlettersPostData(data, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateOfferLetter);
