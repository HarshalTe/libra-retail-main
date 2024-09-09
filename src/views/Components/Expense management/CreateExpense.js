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
import Autocomplete from "@mui/material/Autocomplete";
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
import { expensesPostData } from "../../../Redux/Creators/ExpensesCreators";

function CreateExpense(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const [naConversionActive, setNAConversionActive] = useState(false);
  const toggle = () => setModal(!modal);

  const TypeOfExpense = [
    { label: "Staff Salaries" },
    { label: "Annual Maintenance Charges" },
    { label: "BONUS" },
    { label: "Brokerage Expenses" },
    { label: "Business Promotion Expense" },
    { label: "Car Insurance" },
    { label: "Cleaning Expenses" },
    { label: "Computer Expenses" },
    { label: "Consultancy Charges" },
    { label: "Conveyance Expenses" },
    { label: "Depreciation" },
    { label: "Domain Charges" },
    { label: "Electricity Exp" },
    { label: "Food & Meal Expenses" },
    { label: "Freelancing Charges" },
    { label: "Hosting Expenses" },
    { label: "Interest on TDS" },
    { label: "Internet Expense" },
    { label: "IT Consulting and Support Services" },
    { label: "Late Fee Gst" },
    { label: "Legal & Professional Charges" },
    { label: "Membership Fees" },
    { label: "Mobile Expenses" },
    { label: "Motor &Car Expenses" },
    { label: "Office Expense" },
    { label: "Petrol Exp" },
    { label: "Postage & Courier Expenses" },
    { label: "Printing & Stationery" },
    { label: "Property Tax" },
    { label: "PT Expenses" },
    { label: "Rent - Baroda" },
    { label: "Rent for Office No.10 - Aanurag" },
    { label: "Rent for Office No.12 - Prakash Purohit" },
    { label: "Rent for Office No.9 - Chauhan Lal" },
    { label: "Repairs & Maintenance" },
    { label: "Round Off" },
    { label: "Salary-Anisha Dave" },
    { label: "Software Expenses" },
    { label: "Staff Wellfare Expense" },
    { label: "Subcription Charges" },
    { label: "Sundry Balance Wirte Off" },
    { label: "Tea & Coffee Expense" },
    { label: "Training Expenses" },
    { label: "Travelling Expense" },
    { label: "Valuation Charges" },
    { label: "Watchman 1" },
    { label: "Watchman 2" },
    { label: "Watchman 3" },
    { label: "Water Expenses" },
  ];

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values In Upload file:", values);

    // ? FormData Chahiye File Upload hai
    const data = new FormData();
    data.append("expense_name", values.expense_name);
    data.append("expense_type", values.expense_type);
    data.append("amount", values.amount);
    data.append("case_no", values.case_no);
    data.append("user_id", values.user_id);
    data.append("file_upload", values.file_upload);
    props.expensesPostData(data, token);
    setSubmitting(true);
    setModal(false);
  };

  const handleNAConversion = (formProps) => {
    const updatedValues = { ...formProps.values };
    for (const key in updatedValues) {
      if (updatedValues.hasOwnProperty(key) && updatedValues[key] === "") {
        updatedValues[key] = "N/A";
      }
    }
    formProps.setValues(updatedValues);
    setNAConversionActive(false);
  };

  return (
    <div>
      <Tooltip
        title="Add Expense"
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
          Create
        </Button>
      </Tooltip>
      <Modal className="modal-lg" isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Add Expense</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              expense_name: "",
              expense_type: "",
              amount: "",
              case_no: "",
              user_id: props?.login?.login?.user?.id,
              file_upload: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              //   instrcutions: Yup.string().required("Instructions is required"),
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
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="expense_type"
                          id="expense_type"
                          variant="outlined"
                          size="small"
                          label="Expense Type"
                        />
                      )}
                    />
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
                        formProps.touched.amount && formProps.errors.amount
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
                        formProps.touched.case_no && formProps.errors.case_no
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
                      onChange={(e) => {
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
                        formProps.touched.file_upload &&
                        formProps.errors.file_upload
                      }
                    />
                  </Col>
                </Row>
                <Divider />
                <Row className="pt-4 pd-4">
                  {/* Conditionally render the "N/A" conversion button */}
                  {/* {naConversionActive && ( */}
        <Button
          color="primary"
          variant="outlined"
          fullWidth
          onClick={() => handleNAConversion(formProps)}
        >
          Convert Empty Fields to "N/A"
        </Button>
      {/* )} */}
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
    expensesPostData: (data, token) => dispatch(expensesPostData(data, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateExpense);
