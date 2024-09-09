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
import Checkbox from "@mui/material/Checkbox";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

//*Actions
import { billPaymentPost } from "../../../../Redux/Creators/FinalBillsCreators";

function PaidBill(props) {
  const token = props.login?.login?.token;
  const [value, setValue] = React.useState(dayjs(''));

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  console.log("object Data:", props)



  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);

    let data = {
      id: props?.data?.id,
      bill_account_number: values?.bill_account_number,
      transaction_id: values?.transaction_id,
      time: value,
      remarks: values?.remarks,
      is_paid: values?.is_paid,
      pending_amount:
        values?.difference_amount_status == 1 ? values?.pending_amount : null,
      amount: values.amount,
      bank_id: values.bank_id,
    };

    console.log("Data:", data);

    props.billPaymentPost(data, token);
    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
      <Tooltip title="Bill Paid" placement="top">
        <Button style={{"backgroundColor":"orange"}}
          variant="contained"
          // color="warning"
          size="small"
          className="ml-3"
          onClick={() => toggle()}
        >
          Payment Received
        </Button>
      </Tooltip>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Payment Received</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              bill_account_number: props?.data?.payement?.account_no,
              transaction_id: props?.data?.transaction_id,
              time: props?.data?.time,
              remarks: props?.data?.remarks,
              is_paid: props?.data?.is_paid,
              difference_amount_status: props?.data?.difference_amount_status,
              pending_amount: props?.data?.pending_amount,
              amount: props?.data?.amount,
              bank_id: props?.data?.bank_id,
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              bill_account_number: Yup.string().required(
                "Account Number is required"
              ),
              transaction_id: Yup.string().required(
                "Transaction ID is required"
              ),
              // time: Yup.string().required("Time is required"),
            })}
          >
            {(formProps) => {
              //*props
              const paymentProps = {
                options: props?.paymentMaster?.isLoading
                  ? []
                  : props?.paymentMaster?.paymentMaster?.data?.map(
                      (payment) => payment
                    ),
              };
              return (
                <Form>
                  <Row>
                    <Col md={4} className="pb-4">
                      <Autocomplete
                        id="contact-autocomplete"
                        options={paymentProps.options}
                        getOptionLabel={(payment) =>
                          payment?.account_no + ` (${payment?.account_name})`
                        }
                        onChange={(e, value) =>
                          formProps.setFieldValue(
                            "bill_account_number",
                            value?.id || ""
                          )
                        }
                        onOpen={formProps.handleBlur}
                        includeInputInList
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={Boolean(
                              formProps.touched.bill_account_number &&
                                formProps.errors.bill_account_number
                            )}
                            fullWidth
                            helperText={
                              formProps.touched.bill_account_number &&
                              formProps.errors.bill_account_number
                            }
                            label="Bill Account Number"
                            name="bill_account_number"
                            variant="outlined"
                          />
                        )}
                      />
                    </Col>

                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Transaction ID *"
                        id="transaction_id"
                        name="transaction_id"
                        value={formProps.values.transaction_id}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.transaction_id &&
                          Boolean(formProps.errors.transaction_id)
                        }
                        helperText={
                          formProps.touched.transaction_id &&
                          formProps.errors.transaction_id
                        }
                      />
                    </Col>

                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        id="name"
                        name="name"
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
                    
                    <Col md={8} className="pb-4">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="Date & Time"
        id="time"
        name="time"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
      />
    </LocalizationProvider>
                    </Col>

                    <Col md={12} className="pb-4">
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Remarks"
                        id="remarks"
                        name="remarks"
                        value={formProps.values.remarks}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.remarks &&
                          Boolean(formProps.errors.remarks)
                        }
                        helperText={
                          formProps.touched.remarks && formProps.errors.remarks
                        }
                        multiline
                        maxRows={4}
                        minRows={2}
                      />
                    </Col>

                    <Col md={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            id="difference_amount_status"
                            name="difference_amount_status"
                            value={formProps.values.difference_amount_status}
                            checked={
                              formProps.values.difference_amount_status == 1
                                ? true
                                : false
                            }
                            onChange={(event) => {
                              event.target.value == 1
                                ? formProps.setFieldValue(
                                    "difference_amount_status",
                                    0
                                  )
                                : formProps.setFieldValue(
                                    "difference_amount_status",
                                    1
                                  );
                            }}
                          />
                        }
                        label="Diffrence Amount?"
                      />
                    </Col>

                    {formProps.values?.difference_amount_status == 1 ? (
                      <Col md={12} className="pb-4">
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          type="number"
                          label="Difference Amount"
                          id="pending_amount"
                          name="pending_amount"
                          value={formProps.values.pending_amount}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.pending_amount &&
                            Boolean(formProps.errors.pending_amount)
                          }
                          helperText={
                            formProps.touched.pending_amount &&
                            formProps.errors.pending_amount
                          }
                        />
                      </Col>
                    ) : (
                      ""
                    )}
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
    paymentMaster: state.paymentMaster,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    billPaymentPost: (data, token) => dispatch(billPaymentPost(data, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaidBill);
