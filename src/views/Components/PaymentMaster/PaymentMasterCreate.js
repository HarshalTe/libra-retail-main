import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
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
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@material-ui/core/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import FormControlLabel from "@mui/material/FormControlLabel";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";

//*Actions
import { postPaymentMaster } from "../../../Redux/Creators/PaymentMasterCreators";

function PaymentMasterCreate(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);

    // let data = {
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
data.append("company_detail_id", values.company_detail_id);
data.append("account_no", values.account_no);
data.append("account_name", values.account_name);
data.append("ifsc_code", values.ifsc_code);
data.append("account_type", values.account_type);
data.append("amount", null);
data.append("remark", null);
data.append("qr_code", values.qr_code);

    console.log("Data:", data);

    props.postPaymentMaster(data, token);
    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
      <Tooltip title="Create Payment Master" placement="top">
        <Button
        style={{"width":"max-content"}}
          variant="outlined"
          color="success"
          size="small"
          className="ml-1"
          onClick={() => toggle()}
          startIcon={<AddIcon fontSize="inherit" />}
        >
          Create Libra Bank Details
        </Button>
      </Tooltip>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Create Libra Bank Details</strong>
          </Typography>
        </ModalHeader>
        <Divider />

        <ModalBody>
          <Formik
            initialValues={{
              company_detail_id: "",
              account_no: "",
              account_name: "",
              ifsc_code: "",
              account_type: "",
              amount: "",
              remark: "",
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
                      <Autocomplete
                        id="contact-autocomplete"
                        options={companyProps.options}
                        getOptionLabel={(company) => company?.company_detail}
                        onChange={(e, value) =>
                          formProps.setFieldValue(
                            "company_detail_id",
                            value?.id || ""
                          )
                        }
                        onOpen={formProps.handleBlur}
                        includeInputInList
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={Boolean(
                              formProps.touched.company_detail_id &&
                                formProps.errors.company_detail_id
                            )}
                            fullWidth
                            helperText={
                              formProps.touched.company_detail_id &&
                              formProps.errors.company_detail_id
                            }
                            label="Company Name"
                            name="company_detail_id"
                            variant="outlined"
                          />
                        )}
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
    postPaymentMaster: (data, token) =>
      dispatch(postPaymentMaster(data, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentMasterCreate);
