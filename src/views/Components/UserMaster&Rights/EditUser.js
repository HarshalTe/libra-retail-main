import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { Row, Col, Table, Modal, ModalHeader, ModalBody } from "reactstrap";
import { Button, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@material-ui/core/TextField";
import Select from "@mui/material/Select";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import Swal from "sweetalert2";
import AddIcon from "@mui/icons-material/Add";
import { Autocomplete } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import DateFnsUtils from "@date-io/date-fns";

//*
import { editUsersData } from "../../../Redux/Creators/UsersCreators";
import { getPincodesPage } from "Redux/Creators/PincodeCreators";
import { getAssetsList } from "../../../Redux/Creators/AssetsCreators";

function EditUser(props) {
  const token = props.login?.login?.token;
  console.log("Edit User:", props.data);

  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  let banksArray = [];

  props?.data?.banks?.map((bank) => banksArray.push(bank.id));

  console.log("bankArray", banksArray);
  let pincodesArray = [];

  props?.data?.user_pincodes?.map((pincode) => pincodesArray.push(pincode.pincode));

  console.log("bankArray", banksArray);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values In Edit Users:", values);

    let data = {
      token: token,
      pageno: props.data2.pageno,
      pageSize: props.data2.pageSize,
      id: props?.data?.id,
      name: values.name,
      email: values.email,
      role: values.role,
      status: values.status,
      mobile_no: values.mobile_no,
      designation: values.designation,
      join_date: values.join_date,
      user_pincodes: values.user_pincodes,
      delete_user_pincodes: values.delete_user_pincodes,
      banks: values.banks,
      branch_master_id: values.branch_master_id,
      case_types: JSON.stringify(values.case_types),
      user_type: values.user_type
    };

    props.editUsersData(data);
    setSubmitting(true);
    setModal(false);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const token = props.login?.login?.token;
  let data = {
    token: token,
  };
    props.getAssetsList(data);
  };
  const rows =props.assets?.isLoading
  ? []
  : props.assets?.assets?.length > 0
  ? props.assets?.assets
  : [];


  return (
    <div>
      <Button
        size="small"
        className="ml-2"
        variant="contained"
        color="warning"
        onClick={() => {
          setModal(!modal);
        }}
        startIcon={<EditIcon />}
      >
        Edit
      </Button>

      <Modal className="modal-lg" isOpen={modal} toggle={() => toggle()}>
        <ModalHeader toggle={toggle}>Edit User</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              name: props?.data?.name,
              email: props?.data?.email,
              role: props?.data?.role,
              status: props?.data?.status,
              mobile_no: props?.data?.mobile_no,
              designation: props?.data?.designation,
              join_date: props?.data?.join_date,

              //*
              banks: [],
              banks_temp: props?.data?.banks,
              bank_name: "",
              bank_id: "",
              pincode_array: props?.data?.user_pincodes,
              branch_master_id: props?.data?.branch_master_id,
              pincode: "",
              pincode_id: "",
              user_pincodes:[],
              case_types:props?.data?.case_types == null ? [] :props?.data?.case_types,
              delete_user_pincodes:[],
              assets:rows?.filter(item => item.user_id === props?.data?.id) || [],
              user_type:props?.data?.user_type
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Name is required"),
              email: Yup.string().required("Email is required"),
              role: Yup.string().required("Role is required"),
              status: Yup.string().required("Status is required"),
              mobile_no: Yup.string().required("Mobile No. is required"),
              designation: Yup.string().required("Designation is required"),
              join_date: Yup.string().required("Joining Date is required"),
            })}
          >
            {(formProps) => {
              const banksProps = {
                options: props?.banks?.isLoading
                  ? []
                  : props?.banks?.banks?.data?.map((banks) => banks),
              };

              formProps.values.banks = banksArray;

              const pincodesProps = {
                options: props?.pincodes?.isLoading
                  ? []
                  : props?.pincodes?.pincodes?.data?.map((pincode) => pincode),

                };
                formProps.values.user_pincodes = pincodesArray
              return (
                <Form encType="multipart/form-data">
                  <Row>
                    <Col md={6} style={{ paddingBottom: "20px" }}>
                      <TextField
                        fullWidth
                        required
                        variant="outlined"
                        id="name"
                        name="name"
                        size="small"
                        label="Name"
                        value={formProps.values.name}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.name &&
                          Boolean(formProps.errors.name)
                        }
                        helperText={
                          formProps.touched.name && formProps.errors.name
                        }
                      />
                    </Col>

                    <Col md={6} style={{ paddingBottom: "20px" }}>
                      <TextField
                        fullWidth
                        required
                        size="small"
                        variant="outlined"
                        id="email"
                        name="email"
                        label="Email"
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

                    <Col md={6} style={{ paddingBottom: "20px" }}>
                      <TextField
                        fullWidth
                        required
                        size="small"
                        variant="outlined"
                        id="role"
                        name="role"
                        label="Role"
                        value={formProps.values.role}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.role &&
                          Boolean(formProps.errors.role)
                        }
                        helperText={
                          formProps.touched.role && formProps.errors.role
                        }
                      />
                    </Col>

                    <Col md={6} style={{ paddingBottom: "20px" }}>
                      <TextField
                        fullWidth
                        required
                        size="small"
                        select
                        disabled
                        variant="outlined"
                        id="status"
                        name="status"
                        label="Status"
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
                        <MenuItem value={""}>Select</MenuItem>
                        <MenuItem value={1}>Active</MenuItem>
                        <MenuItem value={0}>InActive</MenuItem>
                      </TextField>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6} style={{ paddingBottom: "20px" }}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                          fullWidth
                          id="join_date"
                          name="join_date"
                          required
                          label="Joning Date"
                          inputVariant="outlined"
                          format="MM/dd/yyyy"
                          showTodayButton={true}
                          size="small"
                          value={formProps.values.join_date}
                          onChange={(value) =>
                            formProps.setFieldValue(
                              "join_date",
                              moment(value).format("YYYY-MM-DD")
                            )
                          }
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                          error={
                            formProps.touched.join_date &&
                            Boolean(formProps.errors.join_date)
                          }
                          helperText={
                            formProps.touched.join_date &&
                            formProps.errors.join_date
                          }
                        />
                      </MuiPickersUtilsProvider>
                    </Col>

                    <Col md={6} style={{ paddingBottom: "20px" }}>
                      <TextField
                        fullWidth
                        required
                        size="small"
                        variant="outlined"
                        id="mobile_no"
                        name="mobile_no"
                        label="Mobile Number"
                        value={formProps.values.mobile_no}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.mobile_no &&
                          Boolean(formProps.errors.mobile_no)
                        }
                        helperText={
                          formProps.touched.mobile_no &&
                          formProps.errors.mobile_no
                        }
                      />
                      {/* <ErrorMessage /> */}
                    </Col>
{console.log(banksProps,pincodesProps,"formProps.values",formProps.values)}
                    <Col md={12} style={{ paddingBottom: "20px" }}>
                      <TextField
                        fullWidth
                        required
                        size="small"
                        variant="outlined"
                        id="designation"
                        name="designation"
                        label="Designation"
                        value={formProps.values.designation}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.designation &&
                          Boolean(formProps.errors.designation)
                        }
                        helperText={
                          formProps.touched.designation &&
                          formProps.errors.designation
                        }
                      />
                    </Col>
                    <Col md={12} style={{ paddingBottom: "20px" }}>
                     { console.log("user.company_detail",props.branchMaster?.branchMaster?.data,props)}
                    <TextField
                      fullWidth
                      variant="outlined"
                      select
                      type="select"
                      size="small"
                      label="Branch Master"
                      id="branch_master_id"
                      name="branch_master_id"
                      value={formProps.values.branch_master_id}
                      onChange={formProps.handleChange}
                    >
                     <MenuItem value="">Select</MenuItem>
                    {props.branchMaster?.branchMaster?.map((user , id)=>{
                      console.log("user.company_detail",user.company_detail)
                       return(
                      <MenuItem value={user.id}>{user.company_detail.company_detail}</MenuItem>
                      )
                    })}
                  </TextField>
                  </Col>
                  <Typography variant={"h5"}>Case Types</Typography>
                  <Col md={12}>
                    <FieldArray
                      name="case_types"
                      render={(arrayHelpers) => (
                        <div>
                          <Row>
                            <Col md={10}>
                              <TextField
                                fullWidth
                                select
                                size="small"
                                variant="outlined"
                                id="caseTypes"
                                name="caseTypes"
                                label="Case Types"
                                value={formProps.values.caseTypes}
                                onChange={formProps.handleChange}
                              
                                >
                                <MenuItem value="">Select</MenuItem>
                                  {props?.dropdowns?.dropdowns
                                    ?.filter((field) => field?.name == "Case Type")[0]
                                    ?.drop_down_details?.map((field, i) => (
                                      <MenuItem key={i} value={field?.name}>
                                        {field?.name}
                                      </MenuItem>
                                    ))}
                              </TextField>
                            </Col>


                            <Col md={2}>
                              <Button
                                color="success"
                                variant="outlined"
                                onClick={() => {
                                  arrayHelpers.push({
                                    caseTypes: formProps.values.caseTypes,
                                  });
                                  {
                                    formProps.setFieldValue(
                                      "caseTypes",
                                      ""
                                    );
                                  }
                                }}
                                size="large"
                              >
                                <AddIcon fontSize="inherit" />
                              </Button>
                            </Col>
                          </Row>
                          <Table size="sm" className="mt-3">
                            <thead>
                              <tr>
                                <th>Case Types</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                (console.log(
                                  "values",
                                  formProps?.values?.case_types
                                ))
                              }
                              {formProps?.values?.case_types?.map(
                                (case_types, index) => {
                                  return (
                                    <tr key={index}>
                                      <td>
                                        <TextField
                                          fullWidth
                                          disabled
                                          size="small"
                                          label="Case Types"
                                          variant="outlined"
                                          name={`case_types.${index}.caseTypes`}
                                          value={case_types.caseTypes}
                                          id="caseTypes"
                                          // onChange={formProps.handleChange}
                                        />
                                      </td>

                                      <td>
                                        <Button
                                          color="error"
                                          size="large"
                                          variant="outlined"
                                          onClick={() => {
                                            arrayHelpers.remove(index);
                                            console.log("id", case_types.id);
                                            // formProps.values.deleted_boundaries.push(
                                            //   case_types.id
                                            // );
                                          }}
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
                  <Col md={12}>
                              <TextField
                                fullWidth
                                select
                                size="small"
                                variant="outlined"
                                id="user_type"
                                name="user_type"
                                label="User Type"
                                value={formProps.values.user_type}
                                onChange={formProps.handleChange}
                              
                                >
                                <MenuItem value="">Select</MenuItem>
                                <MenuItem value={0}>Libra</MenuItem>
                                <MenuItem value={1}>Libra Unstructured</MenuItem>
                              </TextField>
                              </Col>
                    <Col md={12} className="pb-4">
                      <FieldArray
                        name="banks_temp"
                        render={(arrayHelpers) => (
                          <div>
                            <Row>
                              <Col md={10}>
                                <Autocomplete
                                  id="bank-autocomplete"
                                  options={banksProps.options}
                                  getOptionLabel={(bank) => bank?.bank_name}
                                  onChange={(e, value) => {
                                    formProps.setFieldValue(
                                      "bank_name",
                                      value?.bank_name || ""
                                    );
                                    formProps.setFieldValue(
                                      "bank_id",
                                      value?.id || ""
                                    );
                                  }}
                                  onOpen={formProps.handleBlur}
                                  includeInputInList
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      error={Boolean(
                                        formProps.touched.bank_name &&
                                          formProps.errors.bank_name
                                      )}
                                      fullWidth
                                      helperText={
                                        formProps.touched.bank_name &&
                                        formProps.errors.bank_name
                                      }
                                      label="Bank Name"
                                      name="bank_name"
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
                                    if (formProps.values.bank_name == "") {
                                      Swal.fire(
                                        "Please select bank from dropdown!"
                                      );
                                    } else if (
                                      formProps.values.banks.includes(
                                        formProps.values.bank_id
                                      )
                                    ) {
                                      Swal.fire("This Bank is already added!");
                                    } else {
                                      arrayHelpers.push({
                                        bank_name: formProps.values.bank_name,
                                        bank_id: formProps.values.bank_id,
                                      });
                                      formProps.values.banks.push(
                                        formProps.values.bank_id
                                      );
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
                                  <th>Bank</th>
                                </tr>
                              </thead>

                              <tbody>
                                {console.log(
                                  "values",
                                  formProps?.values?.banks_temp,
                                  formProps?.values?.banks
                                )}
                                {formProps?.values?.banks_temp?.map(
                                  (bank, index) => {
                                    return (
                                      <tr key={index}>
                                        <td>{index + 1}</td>

                                        <td>
                                          <TextField
                                            fullWidth
                                            disabled
                                            size="small"
                                            label="Bank Name"
                                            variant="outlined"
                                            name={`bank.${index}.bank_name`}
                                            value={bank.bank_name}
                                            id="bank_name"
                                          />
                                        </td>

                                        <td>
                                          <Button
                                            color="error"
                                            size="large"
                                            variant="outlined"
                                            onClick={() => {
                                              arrayHelpers.remove(index);
                                              formProps.values.banks.splice(
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
                    <Col md={12} className="pb-4">
                      <FieldArray
                        name="pincode_array"
                        render={(arrayHelpers) => (
                          <div>
                            <Row>
                              <Col md={10}>
                                <Autocomplete
                                  id="pincode-autocomplete"
                                  options={pincodesProps.options}
                                  getOptionLabel={(pincode) => pincode?.pincode}
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
                                    if (formProps.values.pincode == "") {
                                      Swal.fire(
                                        "Please select Pincode from dropdown!"
                                      );
                                    } else if (
                                      formProps.values.user_pincodes.includes(
                                        formProps.values.pincode
                                      )
                                    ) {
                                      Swal.fire(
                                        "This Pincode is already added!"
                                      );
                                    } else {
                                      arrayHelpers.push({
                                        pincode: formProps.values.pincode,
                                        pincode_id: formProps.values.pincode_id,
                                      });
                                      formProps.values.user_pincodes.push(
                                        formProps.values.pincode
                                      );
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
                                    "user_pincodes",
                                    formProps?.values?.user_pincodes
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
                                              console.log("formProps.valuess",formProps.values,formProps.values.pincode_array[index],formProps.values.pincode_array,formProps.values.pincode_array[index].id)
                                              formProps.values.delete_user_pincodes.push(
                                                formProps.values.pincode_array[index].id
                                              );
                                              arrayHelpers.remove(index);
                                              formProps.values.user_pincodes.splice(
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

                    <Col md={12} className="pb-4 mt-4">
                    <FieldArray
                      name="assets"
                      render={(arrayHelpers) => (
                        <div>
                          <Row>
                            {/* <Col md={10}>
                              <TextField
                                fullWidth
                                required
                                size="small"
                                select
                                variant="outlined"
                                id="assets2"
                                name="assets2"
                                label="Assets"
                                value={formProps.values.assets2}
                                onChange={formProps.handleChange}
                                error={
                                  formProps.touched.assets2 &&
                                  Boolean(formProps.errors.assets2)
                                }
                                helperText={
                                  formProps.touched.assets2 &&
                                  formProps.errors.assets2
                                }
                              >
                              {  console.log(rows,"hhhhh")}
                                <MenuItem value={""}>Select</MenuItem>
                                {rows?.map((row) => {
                                  return(

                                    <MenuItem value={row?.name}>
                                    {row?.name}
                                  </MenuItem>
                                    )
                                })}
                              </TextField>
                            </Col>

                            <Col md={2}>
                              <Button
                                color="success"
                                variant="contained"
                                onClick={() => {
                                  arrayHelpers.push(formProps.values.assets2);
                                }}
                                size="large"
                              >
                                <AddIcon fontSize="medium" />
                              </Button>
                            </Col> */}
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
                                <th>Assets</th>
                              </tr>
                            </thead>

                            <tbody>
                              {console.log("values", formProps?.values?.assets)}
                              {formProps?.values?.assets?.map((bank, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{index + 1}</td>

                                    <td>
                                      <TextField
                                        fullWidth
                                        disabled
                                        size="small"
                                        label="Assets"
                                        variant="outlined"
                                        name={`bank.${index}`}
                                        value={bank.name}
                                        id="assets"
                                      />
                                    </td>

                                    <td>
                                      <Button
                                        color="error"
                                        size="large"
                                        variant="outlined"
                                        onClick={() => {
                                          arrayHelpers.remove(index);
                                          formProps.values.banks.splice(
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
                              })}
                            </tbody>
                          </Table>
                        </div>
                      )}
                    />
                  </Col>
                  </Row>

                  <br />

                  <br />

                  <Row style={{ justifyContent: "center" }}>
                    <Col>
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

                    <Col>
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
    banks: state.banks,
    pincodes: state.pincodes,
    branchMaster: state.branchMaster,
    assets: state.assets,
    dropdowns: state.dropdowns,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPincodesPage: (data) => dispatch(getPincodesPage(data)),
    editUsersData: (data) => dispatch(editUsersData(data)),
    getAssetsList: (data) => dispatch(getAssetsList(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
