import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
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
  Table
} from "reactstrap";
import DeleteIcon from "@mui/icons-material/Delete";

import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@material-ui/core/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Autocomplete, Divider } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import DateFnsUtils from "@date-io/date-fns";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";

//*Actions
import { matrixsPostData } from "../../../Redux/Creators/UserMatrixCreators";
import { getPincodesPage } from "./../../../Redux/Creators/PincodeCreators";

function CreateMatrixs(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    
    // ? FormData Chahiye File Upload hai
    // const data = new FormData();
    // data.append("user_id", values.user_id);
    // data.append("expense_type", values.expense_type);
    // // data.append("limit", values.limit);
    // data.append("is_approved", values.is_approved);
    // data.append("file_upload", values.file_upload);
    let data = {
      user_id:values.user_id,
      property_type: values.property_type,
      limit: values.limit,
      pincodes: values.pincodes,
    };
    console.log("Values In Upload file:",data, values);

    props.matrixsPostData(data, token);
    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
      <Tooltip title="Add Matrixs" placement="right" className="m-2" style={{float:"right"}}>
        <Button
          variant="outlined"
          color="info"
          size="small"
          className="ml-2"
          onClick={() => toggle()}
          startIcon={<AddIcon fontSize="small" />}
        >
          {/* <CloudUploadIcon fontSize="medium" /> */}
          Create Internal System Approval Matrix
        </Button>
      </Tooltip>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Add Internal System Approval Matrix</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              user_id: "",
              property_type:"",
              limit:"0",
              pincodes:[],
              pincode_array: [],
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
            //   pincode: Yup.string().required("Pincode is required"),
            //   instrcutions: Yup.string().required("Instructions is required"),
            })}
          >
            {(formProps) => {
               const pincodesProps = {
                options: props?.pincodes?.isLoading
                  ? []
                  : props?.pincodes?.pincodes?.data?.map(
                      (pincode) => pincode
                    ),
              };
              return(
              <Form enctype="multipart/form-data">
                <Row>
                
                  <Col md={12} className="">
                  <Label>Employee Name</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        select
                        type="select"
                        size="small"
                        label="Employee Name"
                        id="user_id"
                        name="user_id"
                        value={formProps.values.user_id}
                        onChange={formProps.handleChange}
                      >
                       <MenuItem value="">Select</MenuItem>
                      {props.users?.users?.data?.map((user , id)=>{
                         return(
                        <MenuItem value={user.id}>{user.name}</MenuItem>
                        )
                      })}
                    </TextField>
                    </Col>

                    <Col md={6} className="pb-4">
                        <Label>Type of Property</Label>
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      select
                      id="property_type"
                      name="property_type"
                      label="Type of property"
                      value={formProps.values.property_type}
                      onChange={formProps.handleChange}
                    >
                      <MenuItem value="">Select</MenuItem>
                      {props?.dropdowns?.dropdowns
                        ?.filter((field) => field?.name == "Property Type")[0]
                        ?.drop_down_details?.map((field, i) => (
                          <MenuItem key={i} value={field?.name}>
                            {field?.name}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Col>

                    <Col md={6} className="">
                    <Label>Limit</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Limit"
                        id="limit"
                        name="limit"
                        value={formProps.values.limit}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.limit &&
                          Boolean(formProps.errors.limit)
                        }
                        helperText={
                          formProps.touched.limit &&
                          formProps.errors.limit
                        }
                        />
                    </Col>
                    <Col md={6}></Col>

                    <Col md={12} className="pb-4">
                        <Label>Add Pincode</Label>
                        <FieldArray
                          name="pincode_array"
                          render={(arrayHelpers) => (
                            <div>
                              <Row>
                                <Col md={10}>
                                  <Autocomplete
                                    id="pincode-autocomplete"
                                    options={pincodesProps.options}
                                    getOptionLabel={(pincode) =>
                                      pincode?.pincode
                                    }
                                    onChange={(e, value) => {
                                      formProps.setFieldValue(
                                        "pincode",
                                        value?.pincode || ""
                                      );
                                      formProps.setFieldValue(
                                        "pincode_id",
                                        value?.id || ""
                                      );
                                    }}
                                    onOpen={formProps.handleBlur}
                                    includeInputInList
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        error={Boolean(
                                          formProps.touched.pincode &&
                                            formProps.errors.pincode
                                        )}
                                        fullWidth
                                        helperText={
                                          formProps.touched.pincode &&
                                          formProps.errors.pincode
                                        }
                                        label="Pincode"
                                        name="pincode"
                                        variant="outlined"
                                      />
                                    )}
                                  />
                                </Col>

                                <Col md={2}>
                                  <Button
                                    color="success"
                                    variant="contained"
                                    onClick={() => {
                                      // console.log(
                                      //   "first",
                                      //   formProps.values.pincode_array.includes(
                                      //     formProps.values.pincode_id
                                      //   )
                                      // );
                                      if (formProps.values.pincode == "") {
                                        Swal.fire(
                                          "Please select Pincode from dropdown!"
                                        );
                                      } else if (
                                        formProps.values.pincode_array.includes(
                                          formProps.values.pincode
                                        )
                                      ) {
                                        Swal.fire(
                                          "This Pincode is already added!"
                                        );
                                      } else {
                                        arrayHelpers.push({
                                          pincode: formProps.values.pincode,
                                          pincode_id:formProps.values.pincode_id,
                                        });
                                        formProps.values.pincodes.push(
                                          formProps.values.pincode
                                        )
                                      }
                                    }}
                                    size="large"
                                  >
                                    <AddIcon fontSize="medium" />
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
                                    <th>Pincode</th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {/* {console.log(
                                    "pincode_array",
                                    formProps?.values?.pincode_array
                                  )} */}
                                  {formProps?.values?.pincode_array?.map(
                                    (bank, index) => {
                                      return (
                                        <tr key={index}>
                                          <td>{index + 1}</td>

                                          <td>
                                            <TextField
                                              fullWidth
                                              disabled
                                              size="small"
                                              label="Pincode"
                                              variant="outlined"
                                              name={`bank.${index}.pincode`}
                                              value={bank.pincode}
                                              id="pincode"
                                            />
                                          </td>

                                          <td>
                                            <Button
                                              color="error"
                                              size="large"
                                              variant="outlined"
                                              onClick={() => {
                                                arrayHelpers.remove(index);
                                                formProps.values.pincode_array.splice(
                                                  index,
                                                  1
                                                );
                                              }}
                                            >
                                              <DeleteIcon fontSize="medium" />
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
            )}}
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
    pincodes: state.pincodes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    matrixsPostData: (data,token) => dispatch(matrixsPostData(data,token)),
    getPincodesPage: (data) => dispatch(getPincodesPage(data)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateMatrixs);
