import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import Swal from "sweetalert2";
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap";

import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@material-ui/core/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import { Autocomplete, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import DateFnsUtils from "@date-io/date-fns";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";

//*Compoenets
import LinerLoader from "components/Loaders/LinerLoader";

//*Actions
import { UserPostData } from "../../../Redux/Creators/UsersCreators";
import { getBanksList } from "../../../Redux/Creators/BanksCreators";
import { getPincodesPage } from "./../../../Redux/Creators/PincodeCreators";
import { getBranchMasterPage } from "../../../Redux/Creators/BranchMasterCreators";


function AddUsers(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  React.useEffect(() => {
    let data = {
      token: token,
    };
    props.getBanksList(data);
  }, []);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const token = props.login?.login?.token;
  let data = {
    token: token,
  };
    props.getBranchMasterPage(data);
  };

  console.log("Values In Add Users:", props);
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values In Add Users:", values);

    let data = {
      token: token,
      pageno: props.data.pageno,
      pageSize: props.data.pageSize,
      name: values.name,
      email: values.email,
      role: values.role,
      status: values.status,
      password: values.password,
      password_confirmation: values.password_confirmation,
      mobile_no: values.mobile_no,
      designation: values.designation,
      join_date: values.join_date,
      user_pincodes: values.user_pincodes,
      banks: values.banks,
      branch_master_id: values.branch_master_id,
      case_types: values.case_types,
      user_type: values.user_type,
    };

    props.UserPostData(data);
    setSubmitting(true);
    setModal(false);
    // return;
  };

  return (
    <div>
      <Button
        variant="contained"
        color="success"
        size="small"
        className="ml-3"
        onClick={() => toggle()}
        // startIcon={<AddIcon fontSize="inherit" />}
      >
        Add New User
      </Button>

      <Modal className="modal-lg" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add New User</ModalHeader>
        {props?.banks?.isLoading ? (
          <ModalBody>
            <LinerLoader />
          </ModalBody>
        ) : (
          <ModalBody>
            <Formik
              initialValues={{
                name: "",
                email: "",
                role: "",
                status: "",
                password: "",
                password_confirmation: "",
                mobile_no: "",
                designation: "",
                join_date: "",

                //*Array

                banks: [],
                banks_temp: [],
                pincode_array: [],
                pincode: "",
                pincode_id: [],
                user_pincodes: [],
                bank_name: "",
                bank_id: "",
                branch_master_id:"",
                case_types:[],
                user_type:""
              }}
              onSubmit={handleSubmit}
              validationSchema={Yup.object().shape({
                name: Yup.string().required("Name is required"),
                email: Yup.string().required("Email is required"),
                role: Yup.string().required("Role is required"),
                status: Yup.string().required("Status is required"),
                password: Yup.string().required("Password is required"),
                password_confirmation: Yup.string().oneOf(
                  [Yup.ref("password"), null],
                  "Passwords must match"
                ),
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
                const pincodesProps = {
                  options: props?.pincodes?.isLoading
                    ? []
                    : props?.pincodes?.pincodes?.data?.map(
                        (pincode) => pincode
                      ),
                };
                // console.log("pincodesProps",pincodesProps)
                return (
                  <Form>
                    <Row>
                      <Col md={6} style={{ paddingBottom: "20px" }}>
                        <TextField
                          fullWidth
                          required
                          variant="outlined"
                          size="small"
                          label="Name"
                          id="name"
                          name="name"
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
                          type="email"
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
                          select
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
                        >
                          <MenuItem value={""}>Select</MenuItem>
                          <MenuItem value={"Site Inspector"}>
                            Site Inspector
                          </MenuItem>
                          <MenuItem value={"Level-1"}>Level-1</MenuItem>
                          <MenuItem value={"Level-2"}>Level-2</MenuItem>
                          <MenuItem value={"Level-3"}>Level-3</MenuItem>
                          <MenuItem value={"admin"}>Admin</MenuItem>
                          <MenuItem value={"Master"}>Master</MenuItem>
                          <MenuItem value={"Bill-1"}>Bill Level-1</MenuItem>
                          <MenuItem value={"Bill-2"}>Bill Level-2</MenuItem>
                          <MenuItem value={"Bill-3"}>Bill Level-3</MenuItem>
                          <MenuItem value={"Auditor"}>Auditor</MenuItem>
                          <MenuItem value={"Auditor"}>Bank</MenuItem>
                          <MenuItem value={"others"}>Others</MenuItem>
                        </TextField>
                      </Col>

                      <Col md={6} style={{ paddingBottom: "20px" }}>
                        <TextField
                          fullWidth
                          required
                          size="small"
                          select
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
                            // allowKeyboardControl={false}
                            id="join_date"
                            name="join_date"
                            required
                            label="Joning Date"
                            inputVariant="outlined"
                            // orientation="landscape"
                            showTodayButton={true}
                            // variant="inline"
                            format="MM/dd/yyyy"
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
                      </Col>

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
                      <Col md={12} className="" style={{ paddingBottom: "20px" }}>
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
                      // console.log("user.company_detail",user.company_detail)
                       return(
                      <MenuItem value={user.id}>{user.company_detail.company_detail}</MenuItem>
                      )
                    })}
                  </TextField>
                  </Col>
                      {/* <Col md={12} className="" style={{ paddingBottom: "20px" }}>
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
                      // console.log("user.company_detail",user.company_detail)
                       return(
                      <MenuItem value={user.id}>{user.company_detail.company_detail}</MenuItem>
                      )
                    })}
                  </TextField>
                  </Col> */}
                      

                  {/* <Typography variant={"h5"}>Case Types</Typography> */}
                {/* <Row className="pt-4 pb-2"> */}
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
                                  formProps?.values,
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
                {/* </Row> */}
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
                                <MenuItem value="0">Libra</MenuItem>
                                <MenuItem value="1">Libra Unstructured</MenuItem>
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
                                        Swal.fire(
                                          "This Bank is already added!"
                                        );
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
                                  {/* {console.log(
                                    "values",
                                    formProps?.values?.banks_temp,
                                    formProps?.values?.banks
                                  )} */}
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
                                              label="Pincode"
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
                                        formProps.values.user_pincodes.push(
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

                      <Col md={6} style={{ paddingBottom: "20px" }}>
                        <TextField
                          fullWidth
                          required
                          type="password"
                          size="small"
                          variant="outlined"
                          id="password"
                          name="password"
                          label="Password"
                          value={formProps.values.password}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.password &&
                            Boolean(formProps.errors.password)
                          }
                          helperText={
                            formProps.touched.password &&
                            formProps.errors.password
                          }
                        />
                      </Col>

                      <Col md={6} style={{ paddingBottom: "20px" }}>
                        <TextField
                          fullWidth
                          required
                          size="small"
                          variant="outlined"
                          type="password"
                          id="password_confirmation"
                          name="password_confirmation"
                          label="Confirm Password"
                          value={formProps.values.password_confirmation}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.password_confirmation &&
                            Boolean(formProps.errors.password_confirmation)
                          }
                          helperText={
                            formProps.touched.password_confirmation &&
                            formProps.errors.password_confirmation
                          }
                        />
                      </Col>
                    </Row>

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
        )}
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
    dropdowns: state.dropdowns,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    UserPostData: (data) => dispatch(UserPostData(data)),
    getBanksList: (data) => dispatch(getBanksList(data)),
    getPincodesPage: (data) => dispatch(getPincodesPage(data)),
    getBranchMasterPage: (data) => dispatch(getBranchMasterPage(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUsers);
