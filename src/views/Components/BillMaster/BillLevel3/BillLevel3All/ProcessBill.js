import React from "react";

import { connect } from "react-redux";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import Swal from "sweetalert2";
import { Button } from "@material-ui/core";
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

//*
import { finalBillsApproveAll } from "../../../../../Redux/Creators/FinalBillsCreators";

function ProcessBill(props) {
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);
  console.log("bills", props.data);
  const token = props.login?.login?.token;

  const billsIDs =
    props.data !== null ? props?.data?.map((bank) => bank.id) : [];

  console.log("IDS:", billsIDs);
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values In Upload file:", values);

   // ? FormData Chahiye File Upload hai
    const data = new FormData();
    data.append("pincode", values.pincode);
    data.append("instructions", values.instructions);
    // let data = {
    //   pincode:values.pincode,
    //   instrcutions: values.instrcutions,
    // };

    // props.bulkuploadPincodes(data, token);
    setSubmitting(true);
    setModal(false);
  };

  const approveAll = () => {
    let data = {
    
      bills: billsIDs,
      is_processed: 1,
    };
    console.log("data", data);
    props.finalBillsApproveAll(data,token);
  };

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  return (
    <div>
      <Tooltip title="Approve All">
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => toggle()}
          //   {
          //   swalWithBootstrapButtons
          //     .fire({
          //       title: "Do You want to Process Selected?",
          //       icon: "question",
          //       showCancelButton: true,
          //       confirmButtonText: "Yes, Process!",
          //       cancelButtonText: "No, cancel!",
          //       reverseButtons: false,
          //     })
          //     .then((result) => {
          //       if (result.isConfirmed) {
          //         approveAll();
          //       }
          //     });
          // }}
        >
          Process Bill (GST Payment Done)
        </Button>
      </Tooltip>
      <Modal
        // className="modal-sm"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Process Bill (GST Payment Done)</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              pincode: "",
              instrcutions:"",
              type_of_instrctuions:"",
              status:"",
              date: "",
            }}
            onSubmit={approveAll}
            validationSchema={Yup.object().shape({
              date: Yup.string().required("Date is required"),
            })}
          >
            {(formProps) => (
              <Form enctype="multipart/form-data">
                <Row>
                  <Col md={1} ></Col>
                  <Col style={{fontSize:"20px", fontWeight:"700"}}>
                Do You want to Process Selected?
                  </Col>
                </Row>
                <Row style={{marginBottom:"18px"}}>
                  <Col md={1} ></Col>
                  <Col md={6} className="">
                  <Label>Process Date</Label>
                  <TextField
                      fullWidth
                      type="date"
                      size="small"
                      variant="outlined"
                      id="date"
                      name="date"
                      // label="Date"
                      value={formProps.values.date}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.date && Boolean(formProps.errors.date)
                      }
                      helperText={
                        formProps.touched.date && formProps.errors.date
                      }
                    />
                    </Col>
                </Row>

                <Divider />

                <Row className="pt-4 pd-4">
                  <Col md={6}>
                    <Button
                      // color="#2dce89"
                      style={{backgroundColor:"#2dce89"}}
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
                      style={{backgroundColor:"#f5365c"}}
                      // color="error"
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
    finalBillsApproveAll: (data,token) => dispatch(finalBillsApproveAll(data,token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProcessBill);
