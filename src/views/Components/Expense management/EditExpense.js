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
import Autocomplete from '@mui/material/Autocomplete';
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";


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

//*Actions
import { expensesEditData } from "../../../Redux/Creators/ExpensesCreators";

function EditExpense(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  
  const TypeOfExpense=[
    {label:"Staff Salaries"},
    {label:"Annual Maintenance Charges"},
    {label:"BONUS"},
    {label:"Brokerage Expenses"},
    {label:"Business Promotion Expense"},
    {label:"Car Insurance"},
    {label:"Cleaning Expenses"},
    {label:"Computer Expenses"},
    {label:"Consultancy Charges"},
    {label:"Conveyance Expenses"},
    {label:"Depreciation"},
    {label:"Domain Charges"},
    {label:"Electricity Exp"},
    {label:"Food & Meal Expenses"},
    {label:"Freelancing Charges"},
    {label:"Hosting Expenses"},
    {label:"Interest on TDS"},
    {label:"Internet Expense"},
    {label:"IT Consulting and Support Services"},
    {label:"Late Fee Gst"},
    {label:"Legal & Professional Charges"},
    {label:"Membership Fees"},
    {label:"Mobile Expenses"},
    {label:"Motor &Car Expenses"},
    {label:"Office Expense"},
    {label:"Petrol Exp"},
    {label:"Postage & Courier Expenses"},
    {label:"Printing & Stationery"},
    {label:"Property Tax"},
    {label:"PT Expenses"},
    {label:"Rent - Baroda"},
    {label:"Rent for Office No.10 - Aanurag"},
    {label:"Rent for Office No.12 - Prakash Purohit"},
    {label:"Rent for Office No.9 - Chauhan Lal"},
    {label:"Repairs & Maintenance"},
    {label:"Round Off"},
    {label:"Salary-Anisha Dave"},
    {label:"Software Expenses"},
    {label:"Staff Wellfare Expense"},
    {label:"Subcription Charges"},
    {label:"Sundry Balance Wirte Off"},
    {label:"Tea & Coffee Expense"},
    {label:"Training Expenses"},
    {label:"Travelling Expense"},
    {label:"Valuation Charges"},
    {label:"Watchman 1"},
    {label:"Watchman 2"},
    {label:"Watchman 3"},
    {label:"Water Expenses"},
  ]

  console.log(props,"EditExpense");
  const handleSubmit = (values, { setSubmitting }) => {
    
    const token = {
      token:props.login?.login?.token,
      id:props.data.row?.id
    }

   // ? FormData Chahiye File Upload hai
    const data = new FormData();
    // data.append("id", values.id);
    data.append("expense_name", values.expense_name);
    data.append("expense_type", values.expense_type);
    data.append("amount", values.amount);
    data.append("case_no", values.case_no);
    data.append("file_upload", values.file_upload);
    data.append("is_approved", values.is_approved);
    // let data = {
    //   pincode:values.pincode,
    //   instrcutions: values.instrcutions,
    // };
    console.log("Values In Upload file:", data, token);

    props.expensesEditData(data, token);
    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
      <Tooltip title="Add Expense" placement="right" className="m-2" style={{float:"right"}}>
        <Button
          variant="outlined"
          color="info"
          size="small"
          className="ml-2"
          onClick={() => toggle()}
          startIcon={<AddIcon fontSize="small" />}
        >
          {/* <CloudUploadIcon fontSize="medium" /> */}
          Edit
        </Button>
      </Tooltip>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Edit Expense</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
                id: props.data.row?.id,
                expense_name: props.data.row?.expense_name,
              expense_type:props.data.row?.expense_type,
              amount:props.data.row?.amount,
              case_no:props.data.row?.case_no,
              file_upload:props.data.row?.file_upload,
              is_approved:props.data.row?.is_approved
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
            })}
          >
            {(formProps) => (
              <Form enctype="multipart/form-data">
                <Row>
                
                  <Col md={6} className="">
                  <Label>Expense Name</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Expense Name"
                        id="expense_name"
                        name="expense_name"
                        value={formProps.values.expense_name}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.expense_name &&
                          Boolean(formProps.errors.expense_name)
                        }
                        helperText={
                          formProps.touched.expense_name &&
                          formProps.errors.expense_name
                        }
                      />
                    </Col>
                    <Col md={6} className="">
                    <Label>Expense Type</Label>
                    <Autocomplete
                     name="expense_type"
                      value={formProps.values.expense_type}
      disablePortal
      id="expense_type"
      options={TypeOfExpense}
      onChange={(e, value) =>
        formProps.setFieldValue(
          "expense_type",
          value?.label || ""
        )
      }
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params}
      name="expense_type"
      id="expense_type"
      variant="outlined"
      size="small"
      label="Expense Type" />}
    />
                      {/* <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Expense Type"
                        id="expense_type"
                        name="expense_type"
                        value={formProps.values.expense_type}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.expense_type &&
                          Boolean(formProps.errors.expense_type)
                        }
                        helperText={
                          formProps.touched.expense_type &&
                          formProps.errors.expense_type
                        }
                      /> */}
                    </Col>
                    <Col md={6} className="">
                    <Label>Amount</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Amount"
                        id="amount"
                        name="amount"
                        value={formProps.values.amount}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.amount &&
                          Boolean(formProps.errors.amount)
                        }
                        helperText={
                          formProps.touched.amount &&
                          formProps.errors.amount
                        }
                      />
                    </Col>
                    <Col md={6} className="">
                    <Label>Case No.</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Case No."
                        id="case_no"
                        name="case_no"
                        value={formProps.values.case_no}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.case_no &&
                          Boolean(formProps.errors.case_no)
                        }
                        helperText={
                          formProps.touched.case_no &&
                          formProps.errors.case_no
                        }
                      />
                    </Col>
                    
                    <Col md={6}>
                      <Label>File Upload</Label>
                      <TextField
                        fullWidth
                        name="file_upload"
                        size="small"
                        variant="outlined"
                        // margin="normal"
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
                    <Col md={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          id="is_approved"
                          name={`is_approved`}
                          value={formProps.values.is_approved}
                          checked={
                            formProps.values.is_approved == 1 ? true : false
                          }
                          onChange={(event) => {
                            event.target.value == 1
                              ? formProps.setFieldValue(`is_approved`, 0)
                              : formProps.setFieldValue(`is_approved`, 1);
                          }}
                        />
                      }
                      label="Approve"
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
    expensesEditData: (data,token) => dispatch(expensesEditData(data,token)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExpense);
