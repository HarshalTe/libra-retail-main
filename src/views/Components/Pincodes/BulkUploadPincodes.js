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
  Label
} from "reactstrap";


import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@material-ui/core/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Divider, TextareaAutosize } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import DateFnsUtils from "@date-io/date-fns";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";

//*Actions
import { bulkuploadPincodes } from "../../../Redux/Creators/PincodeCreators";

function BulkUploadPincodes(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values In Upload file:", values);

   // ? FormData Chahiye File Upload hai
    const data = new FormData();
    data.append("pincode", values.pincode);
    data.append("instructions", values.instructions);
    data.append("instruction_type", values.instruction_type);
    data.append("status", values.status);
    data.append("state", values.state);
    data.append("city", values.city);
    data.append("districtname", values.districtname);
    data.append("subdistrictname", values.subdistrictname);
    data.append("officename", values.officename);
    data.append("file_upload", values.file_upload);
    // let data = {
    //   pincode:values.pincode,
    //   instructions: values.instructions,
    // };

    props.bulkuploadPincodes(data, token);
    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
      <Tooltip title="Create Pincode" placement="left">
        <Button
          variant="outlined"
          style={{"width": "max-content"}}
          color="info"
          size="small"
          className="ml-2"
          onClick={() => toggle()}
          startIcon={<AddIcon fontSize="small" />}
        >
          {/* <CloudUploadIcon fontSize="medium" /> */}
          Add New Pincode In Master
        </Button>
      </Tooltip>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Add New Pincode In Master</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              pincode: "",
              instructions:"",
              instruction_type:"",
              status:"",
              file_upload:"",
              state:"",
              city:"",
              districtname:"",
              subdistrictname:"",
              officename:"",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              pincode: Yup.string().required("Pincode is required"),
              instructions: Yup.string().required("Instructions is required"),
            })}
          >
            {(formProps) => (
              <Form enctype="multipart/form-data">
                <Row>
                  <Col md={6} className="">
                  <Label>State</Label>
                      <TextField
                        fullWidth
                        select
                        variant="outlined"
                        size="small"
                        label="State"
                        id="state"
                        name="state"
                        value={formProps.values.state}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.state &&
                          Boolean(formProps.errors.state)
                        }
                        helperText={
                          formProps.touched.state &&
                          formProps.errors.state
                        }
                        >
                        <MenuItem value="">Select</MenuItem>
                         {props?.dropdowns?.dropdowns
                           ?.filter((field) => field?.name == "State")[0]
                           ?.drop_down_details?.map((field, i) => (
                             <MenuItem key={i} value={field?.name}>
                               {field?.name}
                             </MenuItem>
                           ))}
                           </TextField>
                    </Col>
                  <Col md={6} className="">
                  <Label>District</Label>
                      <TextField
                        fullWidth
                        select
                        variant="outlined"
                        size="small"
                        label="District"
                        id="districtname"
                        name="districtname"
                        value={formProps.values.districtname}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.districtname &&
                          Boolean(formProps.errors.districtname)
                        }
                        helperText={
                          formProps.touched.districtname &&
                          formProps.errors.districtname
                        }
                        >
                        <MenuItem value="">Select</MenuItem>
                         {props?.dropdowns?.dropdowns
                           ?.filter((field) => field?.name == "District")[0]
                           ?.drop_down_details?.map((field, i) => (
                             <MenuItem key={i} value={field?.name}>
                               {field?.name}
                             </MenuItem>
                           ))}
                           </TextField>
                    </Col>
                  <Col md={6} className="">
                  <Label>Sub District</Label>
                      <TextField
                        fullWidth
                        select
                        variant="outlined"
                        size="small"
                        label="Sub District"
                        id="subdistrictname"
                        name="subdistrictname"
                        value={formProps.values.subdistrictname}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.subdistrictname &&
                          Boolean(formProps.errors.subdistrictname)
                        }
                        helperText={
                          formProps.touched.subdistrictname &&
                          formProps.errors.subdistrictname
                        }
                        >
                        <MenuItem value="">Select</MenuItem>
                         {props?.dropdowns?.dropdowns
                           ?.filter((field) => field?.name == "Sub District")[0]
                           ?.drop_down_details?.map((field, i) => (
                             <MenuItem key={i} value={field?.name}>
                               {field?.name}
                             </MenuItem>
                           ))}
                           </TextField>
                    </Col>
                  <Col md={6} className="">
                  <Label>City</Label>
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
                          formProps.touched.city &&
                          Boolean(formProps.errors.city)
                        }
                        helperText={
                          formProps.touched.city &&
                          formProps.errors.city
                        }
                      />
                    </Col>
                  <Col md={6} className="">
                  <Label>Pincode</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Pincode"
                        id="pincode"
                        name="pincode"
                        value={formProps.values.pincode}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.pincode &&
                          Boolean(formProps.errors.pincode)
                        }
                        helperText={
                          formProps.touched.pincode &&
                          formProps.errors.pincode
                        }
                      />
                    </Col>
                  <Col md={6} className="">
                  <Label>Office Name</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Office Name"
                        id="officename"
                        name="officename"
                        value={formProps.values.officename}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.officename &&
                          Boolean(formProps.errors.officename)
                        }
                        helperText={
                          formProps.touched.officename &&
                          formProps.errors.officename
                        }
                      />
                    </Col>
                    <Col md={6} className="">
                    <Label>Instructions</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Instructions"
                        id="instructions"
                        name="instructions"
                        value={formProps.values.instructions}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.instructions &&
                          Boolean(formProps.errors.instructions)
                        }
                        helperText={
                          formProps.touched.instructions &&
                          formProps.errors.instructions
                        }
                      />
                    </Col>
                  
                     <Col md={12} className="">
                    <Label>Type of Instructions</Label>
                    <TextareaAutosize
                    //  aria-label="minimum height"
                    style={{ width: 725, margin:"auto" }}
                     minRows={6}
                        fullWidth
                        // variant="outlined"
                        size="large"
                        label="Type of Instructions"
                        id="instruction_type"
                        name="instruction_type"
                        value={formProps.values.instruction_type}
                        onChange={formProps.handleChange}
                       
                      />
                    </Col>
                    <Col md={6} className="pb-4 pt-3">
                    <Label>Status</Label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      select
                      id="status"
                      name="status"
                      value={formProps.values.status}
                      label="Status"
                      onChange={formProps.handleChange}
                    >
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value={"Important"}>Important</MenuItem>
                      <MenuItem value={"General"}>General</MenuItem>
                    </TextField>
                  </Col>
                    <Col md={6} className="pb-4 pt-3">
                      <Label>Upload</Label>
                      <TextField
                        fullWidth
                        size="small"
                        name="file_upload"
                        variant="outlined"
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
                          formProps.touched.file_upload && formProps.errors.file_upload
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
    dropdowns: state.dropdowns,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    bulkuploadPincodes: (data, token) =>
      dispatch(bulkuploadPincodes(data, token)),
      
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BulkUploadPincodes);
