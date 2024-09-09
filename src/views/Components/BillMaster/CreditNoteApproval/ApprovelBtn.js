
import { connect } from "react-redux";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";


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
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
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
// import { expensesPostData } from "../../../Redux/Creators/ExpensesCreators";

//*
import { finalBillsEditData2 } from "../../../../Redux/Creators/FinalBillsCreators";

function ApprovelBtn(props) {
  console.log("delete",props);
  const token = props.login?.login?.token;

  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);

  const deleteIDs = props.data?.row?.id
    // props.data !== null
    //   ? props?.data?.selected?.map((pincode) => pincode.id)
    //   : [];

  const approve = () => {
    let data = {
      id: deleteIDs,
      is_creditnote_approved:1,
    };
    console.log("data", data);
    // props.propertiesDeleteAll(data, token);
  };

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const handleSubmit = (values, { setSubmitting }) => {
    
    // ? FormData Chahiye File Upload hai
    // const data = new FormData();
    // data.append("is_creditnote_approved", values.is_creditnote_approved);
    // data.append("amount", values.amount);
    // token : props?.login?.login?.token,
    let dataId =[props?.data?.row?.id]
    let data = {
      id:props?.data?.row?.id,
      bank_id:props?.data?.row?.bank_id,
      is_creditnote_approved:values.is_creditnote_approved,
      amount: values.amount,
    };
    console.log("Values In Upload file:", values,data);

    // props.finalBillsEditData2(data, token);
    props.finalBillsEditData2(data, token,dataId);
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
          Approve
        </Button>
      </Tooltip>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Approve</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
                expense_name: "",
              expense_type:"",
              amount:"",
              case_no:"",
              file_upload:""
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
            //   pincode: Yup.string().required("Pincode is required"),
            //   instrcutions: Yup.string().required("Instructions is required"),
            })}
          >
            {(formProps) => (
              <Form enctype="multipart/form-data">
                <Row>
                
                  <Col md={6} className="">
                  <Label>Approve Credit Note</Label>
                      <TextField
                        fullWidth
                        select
                        variant="outlined"
                        size="small"
                        label="Approve Credit Note"
                        id="is_creditnote_approved"
                        name="is_creditnote_approved"
                        value={formProps.values.is_creditnote_approved}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.is_creditnote_approved &&
                          Boolean(formProps.errors.is_creditnote_approved)
                        }
                        helperText={
                          formProps.touched.is_creditnote_approved &&
                          formProps.errors.is_creditnote_approved
                        }
                       >
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value="1">Yes</MenuItem>
                      <MenuItem value="0">No</MenuItem>
                    </TextField>
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
    finalBillsEditData2: (data,token,dataId) => dispatch(finalBillsEditData2(data,token,dataId)),

    // finalBillsEditData2: (data,token) => dispatch(finalBillsEditData2(data,token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApprovelBtn);
