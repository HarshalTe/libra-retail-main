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
import { editPaymentMaster } from "../../../Redux/Creators/PaymentMasterCreators";

function PaymentMasterEdit(props) {
  console.log(props,"ssssssssss")
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);

    let token = {
      token:props.login?.login?.token,
      id: props?.data?.id
    }

    // let data = {
    //   id: props?.data?.id,
    //   company_detail_id: values.company_detail_id,
    //   account_no: values.account_no,
    //   account_name: values.account_name,
    //   ifsc_code: values.ifsc_code,
    //   account_type: values.account_type,
    //   amount: null,
    //   remark: null,
    //   qr_code: values.qr_code,
    // };
    const data = new FormData();
data.append("id", props?.data?.id);
data.append("company_detail_id", values.company_detail_id);
data.append("account_no", values.account_no);
data.append("account_name", values.account_name);
data.append("ifsc_code", values.ifsc_code);
data.append("account_type", values.account_type);
data.append("amount", null);
data.append("remark", null);
data.append("qr_code", values.qr_code);
    props.editPaymentMaster(data, token);
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
            <strong>Edit Libra Bank Details</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              company_detail_id: props?.data?.company_detail_id,
              company_name: props?.data?.company_detail?.company_detail,
              account_no: props?.data?.account_no,
              account_name: props?.data?.account_name,
              ifsc_code: props?.data?.ifsc_code,
              account_type: props?.data?.account_type,
              amount: props?.data?.amount,
              remark: props?.data?.remark,
              qr_code: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              company_detail_id: Yup.string().required(
                "Company Name is required"
              ),
              account_no: Yup.string().required("Account Number is required"),
              account_name: Yup.string().required("Account Name are required"),
              ifsc_code: Yup.string().required("IFSC code is required"),
              account_type: Yup.string().required("Account Type is required"),
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
                  <Row className="form-group">
                    <Col md={4} className="">
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        disabled
                        label="Company Name"
                        id="company_name"
                        name="company_name"
                        value={formProps.values.company_name}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.company_name &&
                          Boolean(formProps.errors.company_name)
                        }
                        helperText={
                          formProps.touched.company_name &&
                          formProps.errors.company_name
                        }
                      />
                    </Col>

                    <Col md={4} className="">
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Account Number"
                        id="account_no"
                        name="account_no"
                        value={formProps.values.account_no}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.account_no &&
                          Boolean(formProps.errors.account_no)
                        }
                        helperText={
                          formProps.touched.account_no &&
                          formProps.errors.account_no
                        }
                      />
                    </Col>
                    <Col md={4} className="">
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Account Name"
                        id="account_name"
                        name="account_name"
                        value={formProps.values.account_name}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.account_name &&
                          Boolean(formProps.errors.account_name)
                        }
                        helperText={
                          formProps.touched.account_name &&
                          formProps.errors.account_name
                        }
                      />
                    </Col>
                  </Row>
                  <Row className="form-group d-flex align-items-end">
                    <Col md={4} className="">
                      <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        id="ifsc_code"
                        name="ifsc_code"
                        label="IFSC code"
                        value={formProps.values.ifsc_code}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.ifsc_code &&
                          Boolean(formProps.errors.ifsc_code)
                        }
                        helperText={
                          formProps.touched.ifsc_code &&
                          formProps.errors.ifsc_code
                        }
                      />
                    </Col>

                    <Col md={4} className="">
                      <TextField
                        fullWidth
                        select
                        variant="outlined"
                        size="small"
                        label="Account Type"
                        id="account_type"
                        name="account_type"
                        value={formProps.values.account_type}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.account_type &&
                          Boolean(formProps.errors.account_type)
                        }
                        helperText={
                          formProps.touched.account_type &&
                          formProps.errors.account_type
                        }
                      >
                        <MenuItem value={""}>Select</MenuItem>
                        <MenuItem value={"Current Account"}>Current Account</MenuItem>
                        <MenuItem value={"OD Account"}>OD Account</MenuItem>
                      </TextField>
                    </Col>
                    <Col md={4}>
                      <Label className="label f-12">QR Code</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        type="file"
                        id="qr_code"
                        name="qr_code"
                        onChange={(e) => {
                          formProps.setFieldValue(
                            "qr_code",
                            e.currentTarget.files[0]
                          );
                        }}
                        error={
                          formProps.touched.qr_code &&
                          Boolean(formProps.errors.qr_code)
                        }
                        helperText={
                          formProps.touched.qr_code && formProps.errors.qr_code
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editPaymentMaster: (data, token) =>
      dispatch(editPaymentMaster(data, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMasterEdit);
