import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  Table,
  Label,
  Button,
  CardBody,
  FormGroup,
  CardHeader,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";

import CustomInput from "views/Components/Custom/CustomInput";
import CustomSelect from "views/Views/CustomeSelect";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";

function BillPaidConfirm(props) {
  const token = props.login?.login[0]?.success?.token;

  const [modal, setModal] = useState(false);

  return (
    <div>
      <Button
        size="sm"
        className="ml-2"
        color="success"
        onClick={() => {
          setModal(!modal);
        }}
      >
        Save
      </Button>
      <Modal
        className="modal-inverted modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          Bill Paid Confirm
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              bank_ac_no: "",
              transaction_id: "",
              time_stamp: "",
            }}
            // onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              bank_ac_no: Yup.string().required("Account Number is required"),
              transaction_id: Yup.string().required("ID is required"),
              time_stamp: Yup.string().required("Time is required"),
            })}
          >
            {(formProps) => (
              <Form encType="multipart/form-data">
                <Row>
                  <Col md={12}>
                    <Label>Bank Account No. (*)</Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="text"
                        name="bank_ac_no"
                        id="bank_ac_no"
                        placeholder="Account Number"
                        className={
                          "form-control" +
                          (formProps.errors.bank_ac_no &&
                          formProps.touched.bank_ac_no
                            ? " is-invalid"
                            : "")
                        }
                      />

                      <ErrorMessage
                        name="bank_ac_no"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </Col>

                  <Col md={12}>
                    <Label>Transaction ID (*)</Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="text"
                        name="transaction_id"
                        id="transaction_id"
                        placeholder="Transaction ID"
                        className={
                          "form-control" +
                          (formProps.errors.transaction_id &&
                          formProps.touched.transaction_id
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="transaction_id"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </Col>

                  <Col md={12}>
                    <Label>Time (*)</Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="date"
                        name="time_stamp"
                        id="time_stamp"
                        placeholder="Time"
                        className={
                          "form-control" +
                          (formProps.errors.time_stamp &&
                          formProps.touched.time_stamp
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="time_stamp"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </Col>

                  <Col md={12}>
                    <Label>Remarks</Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="text"
                        name="remarks"
                        id="remarks"
                        placeholder="Remarks"
                        className={
                          "form-control" +
                          (formProps.errors.remarks && formProps.touched.remarks
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="remarks"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </Col>

                  <Col md={4}>
                    <br />
                    <Label>Amount Diffrence</Label>
                    <InputGroup size="sm">
                      <Field
                        component={CustomSelect}
                        type="checkbox"
                        name="amount_check"
                        id="amount_check"
                        placeholder="Remark"
                        className={
                          "form-control" +
                          (formProps.errors.amount_check &&
                          formProps.touched.amount_check
                            ? " is-invalid"
                            : "")
                        }
                      />
                    </InputGroup>
                  </Col>

                  {formProps.values.amount_check ? (
                    <>
                      <Col md={12}>
                        <br />
                        {/* <Label>Differential Amount</Label> */}
                        <InputGroup>
                          <Field
                            component={CustomInput}
                            type="text"
                            name="amount_received"
                            id="amount_received"
                            placeholder="Enter Amount Received"
                          />
                        </InputGroup>
                      </Col>

                      <Col md={12}>
                        <br />
                        {/* <Label>Differential Amount</Label> */}
                        <InputGroup>
                          <Field
                            component={CustomInput}
                            type="text"
                            name="pending_amount"
                            id="pending_amount"
                            placeholder="Enter Pending Amount"
                          />
                        </InputGroup>
                      </Col>
                    </>
                  ) : (
                    ""
                  )}
                </Row>

                <br />

                <Row style={{ justifyContent: "left" }}>
                  <Col md={4}>(*) mandatory</Col>
                </Row>

                <br />

                <Row style={{ justifyContent: "center" }}>
                  <Col md={4}>
                    <Button type="reset" color="danger" block>
                      <b>Reset</b>
                    </Button>
                  </Col>
                  <Col md={4}>
                    <Button
                      type="submit"
                      disabled={formProps.isSubmitting}
                      color="primary"
                      block
                    >
                      Submit
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

export default BillPaidConfirm;
