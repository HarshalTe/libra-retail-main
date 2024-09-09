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
  Label,
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
import Autocomplete from "@mui/material/Autocomplete";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";

//*Actions
import { editPincodes } from "../../../Redux/Creators/PincodeCreators";
import TextareaAutosize from "@mui/material/TextareaAutosize";


function PincodeMasterEdit(props) {
  console.log(props,"ssssssssss")
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);
const token = {
  token:props.login?.login?.token,
  id:props?.data?.id
}
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
    data.append("_method", "PUT");

    props.editPincodes(data, token);
    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
      <Tooltip title="Edit" placement="left">
        <Button
          variant="outlined"
          color="warning"
          size="small"
          className="p-1"
          onClick={() => toggle()}
        >
          <EditIcon fontSize="medium" />
        </Button>
      </Tooltip>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Add Pincode Instructions</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              
              pincode: props.data.pincode,
              instructions:props.data.instructions,
              instruction_type:props.data.instruction_type,
              status:props.data.status,
              file_upload:props.data.file_upload,
              city:props.data.city,
              state:props.data.state,
              districtname:props.data.districtname,
              subdistrictname:props.data.subdistrictname,
              officename:props.data.officename,
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              // company_detail_id: Yup.string().required(
              //   "Company Name is required"
              // ),
              // account_no: Yup.string().required("Account Number is required"),
              // account_name: Yup.string().required("Account Name are required"),
              // ifsc_code: Yup.string().required("IFSC code is required"),
              // account_type: Yup.string().required("Account Type is required"),
            })}
          >
            {(formProps) => {
              const companyProps = {
                options: props?.companies?.isLoading
                  ? []
                  : props?.companies?.companies?.data?.map(
                      (company) => company
                    ),
              };
              return (
                <Form>
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

                  <Row className="p-4">
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
              );
            }}
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    companies: state.companies,
    dropdowns: state.dropdowns,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editPincodes: (data, token) =>
      dispatch(editPincodes(data, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PincodeMasterEdit);
