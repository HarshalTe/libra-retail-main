import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  Modal,
  ModalHeader,
  ModalBody,
  Table,
  ModalFooter,
  Label
} from "reactstrap";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@material-ui/core/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import DateFnsUtils from "@date-io/date-fns";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

//*Actions
// import { bulkuploadPincodes } from "../../../Redux/Creators/PincodeCreators";

function CreateBillInitiation(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);

  const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values In Upload file:", values);

   // ? FormData Chahiye File Upload hai
    const data = new FormData();
   
    // let data = {
    //   pincode:values.pincode,
    //   instrcutions: values.instrcutions,
    // };

    // props.bulkuploadPincodes(data, token);
    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
      <Tooltip style={{float: "right"}} title="Upload File" placement="left">
        <Button
          variant="outlined"
          color="info"
          size="small"
          className="ml-2"
          onClick={() => toggle()}
          startIcon={<AddIcon fontSize="small" />}
        >
          {/* <CloudUploadIcon fontSize="medium" /> */}
          Manual Bill Generate
        </Button>
      </Tooltip>
      <Modal
        className="modal-xl"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Add Bill</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
             
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              // pincode: Yup.string().required("Pincode is required"),
              // instrcutions: Yup.string().required("Instructions is required"),
            })}
          >
            {(formProps) => (
              <Form enctype="multipart/form-data">
                <Row>
                  <Col md={6}>
                  <Label>Company name</Label>
                      <TextField
                        fullWidth
                        select
                        variant="outlined"
                        label="Company Name"
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
                        <MenuItem value="">Select Company Name</MenuItem>
                        <MenuItem value="Libra Valuers">Libra Valuers</MenuItem>
                        <MenuItem value="LIC">LIC</MenuItem>
                        
                      </TextField>
                    </Col>
                    <Col md={6} className="">
                    <Label>Date</Label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DesktopDatePicker
          label="Date"
          inputFormat="MM/DD/YYYY"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
        
      </Stack>
    </LocalizationProvider>
                    </Col>
                    <Col md={6} className="">
                    <Label>Client Name</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Client Name"
                        id="client_name"
                        name="client_name"
                        value={formProps.values.client_name}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.client_name &&
                          Boolean(formProps.errors.client_name)
                        }
                        helperText={
                          formProps.touched.client_name &&
                          formProps.errors.client_name
                        }
                      />
                    </Col>
                    <Col md={6} className="">
                    <Label>Client GST No.</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Client GST No."
                        id="client_gst_no"
                        name="client_gst_no"
                        value={formProps.values.client_gst_no}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.client_gst_no &&
                          Boolean(formProps.errors.client_gst_no)
                        }
                        helperText={
                          formProps.touched.client_gst_no &&
                          formProps.errors.client_gst_no
                        }
                      />
                    </Col>
                        
                    <Col md={12} className="pb-4 pt-4">
                    <FieldArray
                      name="project_details"
                      render={(arrayHelpers) => (
                        <div>
                          <Row>
                            <Col md={3}>
                              <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="product_name"
                                name="product_name"
                                label="Product Name"
                                value={formProps.values.product_name}
                                onChange={formProps.handleChange}
                              />
                            </Col>
                            <Col md={3}>
                              <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="no_of_cases"
                                name="no_of_cases"
                                label="No. Of Cases"
                                value={formProps.values.no_of_cases}
                                onChange={formProps.handleChange}
                              />
                            </Col>
                            <Col md={2}>
                              <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="rate"
                                name="rate"
                                label="Rate"
                                value={formProps.values.rate}
                                onChange={formProps.handleChange}
                              />
                            </Col>
                            <Col md={2}>
                              <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="total"
                                name="total"
                                label="Total"
                                value={formProps.values.total}
                                onChange={formProps.handleChange}
                              />
                            </Col>
                            
                            <Col>
                              <Button
                                color="success"
                                variant="contained"
                                onClick={() => {
                                  arrayHelpers.push({
                                    product_name: formProps.values.product_name,
                                    no_of_cases: formProps.values.no_of_cases,
                                    rate: formProps.values.rate,
                                    total: formProps.values.total,
                                    remarks: formProps.values.remarks,
                                  });
                                  {
                                    formProps.setFieldValue("product_name", "");
                                    
                                    formProps.setFieldValue("no_of_cases", "");
                                    formProps.setFieldValue("rate", "");
                                    formProps.setFieldValue("total", "");
                                  }
                                }}
                                size="large"
                              >
                                <AddIcon fontSize="inherit" />
                              </Button>
                            </Col>
                          </Row>
                          <Table
                            size="sm"
                            className="mt-3"
                            bordered
                            style={{ textAlign: "center" }}
                          >
                            <thead>
                              <tr>
                                <th>Sr No.</th>
                                <th>Product Name</th>
                                <th>No. Of Cases</th>
                                <th>Rate</th>
                                <th>Total</th>
                                <th>Delete</th>
                              </tr>
                            </thead>

                            <tbody>
                              {console.log(
                                "values",
                                formProps?.values?.project_details
                              )}
                              {formProps?.values?.project_details?.map(
                                (document, index) => {
                                  return (
                                    <tr key={index}>
                                      <td>{index + 1}</td>

                                      <td>
                                        <TextField
                                          fullWidth
                                          disabled
                                          size="small"
                                          label="Product Name"
                                          variant="outlined"
                                          name={`document.${index}.product_name`}
                                          value={document.product_name}
                                          id="product_name"
                                          // onChange={formProps.handleChange}
                                        />
                                      </td>
                                      <td>
                                        <TextField
                                          fullWidth
                                          disabled
                                          size="small"
                                          label="No. Of Cases"
                                          variant="outlined"
                                          name={`document.${index}.no_of_cases`}
                                          value={document.no_of_cases}
                                          id="no_of_cases"
                                          // onChange={formProps.handleChange}
                                        />
                                      </td>
                                      <td>
                                        <TextField
                                          fullWidth
                                          disabled
                                          size="small"
                                          label="Rate"
                                          variant="outlined"
                                          name={`document.${index}.rate`}
                                          value={document.rate}
                                          id="rate"
                                          // onChange={formProps.handleChange}
                                        />
                                      </td>
                                      <td>
                                        <TextField
                                          fullWidth
                                          disabled
                                          size="small"
                                          label="Total"
                                          variant="outlined"
                                          name={`document.${index}.total`}
                                          value={document.total}
                                          id="total"
                                          // onChange={formProps.handleChange}
                                        />
                                      </td>
                                      <td>
                                        <Button
                                          color="error"
                                          size="large"
                                          variant="outlined"
                                          onClick={() =>
                                            arrayHelpers.remove(index)
                                          }
                                        >
                                          <DeleteIcon fontSize="inherit" />
                                        </Button>
                                      </td>
                                    </tr>
                                  );
                                }
                              )}
                            </tbody>
                          </Table>
                        </div>
                      )}
                    />
                  </Col>
                  <Col md={6} className="pb-2">
                    <Label>Total</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Total"
                        id="total_t"
                        name="total_t"
                        value={formProps.values.total_t}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.total_t &&
                          Boolean(formProps.errors.total_t)
                        }
                        helperText={
                          formProps.touched.total_t &&
                          formProps.errors.total_t
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
    // bulkuploadPincodes: (data, token) =>
    //   dispatch(bulkuploadPincodes(data, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateBillInitiation);
