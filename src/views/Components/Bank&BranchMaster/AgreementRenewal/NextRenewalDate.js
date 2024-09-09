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

function NextRenewalDate(props) {
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
          Next Renewal Date
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              next_renewal_date: "",
            }}
            // onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              next_renewal_date: Yup.string().required("Date is required"),
            })}
          >
            {(formProps) => (
              <Form encType="multipart/form-data">
                <Row>
                  <Col md={12} className="pb-3">
                    <Label>Next Renewal Date (*)</Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="date"
                        name="next_renewal_date"
                        id="next_renewal_date"
                        placeholder="Account Number"
                        className={
                          "form-control" +
                          (formProps.errors.next_renewal_date &&
                          formProps.touched.next_renewal_date
                            ? " is-invalid"
                            : "")
                        }
                      />

                      <ErrorMessage
                        name="next_renewal_date"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </Col>

                  <Col md={6} className="pb-3">
                    <Label>Agreement copy</Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="file"
                        name="agreement_copy"
                        id="agreement_copy"
                        placeholder="Agreement copy"
                      />
                    </InputGroup>
                  </Col>

                  <Col md={6} className="pb-3">
                    <Label>Rate Card</Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="file"
                        name="rate_card"
                        id="rate_card"
                        placeholder="Rate Card"
                      />
                    </InputGroup>
                  </Col>
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

export default NextRenewalDate;
