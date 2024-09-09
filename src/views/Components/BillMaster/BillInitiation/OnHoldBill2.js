import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import {
  Row,
  Col,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Divider from "@mui/material/Divider";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";
import * as _ from "lodash";

import LV from "../../../../assets/libra_logo1.png";

//*Actions
import { billsPostData2 } from "../../../../Redux/Creators/BIllCreators";

function OnHoldBill2(props) {
  console.log("onhold props", props);
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);

  let billGroupBy = _.chain(props.data.selected)
    .groupBy("vertical_id")
    .map((data, vertical_id) => ({ data, vertical_id }))
    .value();

  console.log("billGroupBy", billGroupBy);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values", values);

    const billDetails =
      props.data !== null
        ? props?.data?.selected?.map((bill) => ({
            id: bill?.id,
            branch_id: bill?.branch_id,
            final_value: values?.final_value,
          }))
        : [];

    let data = {
      // token: token,
      details: billDetails,
      bill_status: values.bill_status,
      final_value: values.final_value,
      grand_total: values.grand_total,
      tds_amount: values.tds_amount,
      net_amount_receivable: values.net_amount_receivable,
      bank_id: values.bank_id,
    };

    console.log("data", data);
    const title = "Successfully Put Bills On Hold!";

    props.billsPostData2(data, title, token);
    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
      <Button
        size="small"
        variant="contained"
        color="error"
        className="ml-2"
        onClick={() => {
          setModal(!modal);
        }}
      >
        OnHold
      </Button>

      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>OnHold Bill</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              bill_status: "case_on_hold",
              final_value: 0,
              grand_total: 0,
              tds_amount: 0,
              net_amount_receivable: 0,
              bank_id: props?.data?.selected[0]?.bank_id,
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              //   branch_name: Yup.string().required("Branch Name is required"),
            })}
          >
            {(formProps) => {
              {
                //! Rate
                formProps.values.final_value = props?.data?.selected?.reduce(
                  function (prev, cur) {
                    return (Number(prev) + Number(cur.rate)).toFixed(2);
                  },
                  0
                );

                //!Grand Total
                var gst = Number();

                gst = ((formProps.values.final_value * 18) / 100).toFixed(2);

                formProps.values.grand_total = (
                  Number(formProps.values.final_value) + Number(gst)
                ).toFixed(2);

                //!TDS amount
                formProps.values.tds_amount = (
                  (formProps.values.grand_total * 10) /
                  100
                ).toFixed(2);

                //!Net Reciveable
                formProps.values.net_amount_receivable = Number(
                  Number(formProps.values.grand_total) -
                    Number(formProps.values.tds_amount)
                ).toFixed(2);

                console.log(
                  "net_amount_receivable",
                  formProps.values.net_amount_receivable
                );
              }

              return (
                <Form>
                  <Divider />

                  <Row>
                    <Table bordered>
                      <thead>
                        <tr>
                          <th
                            colSpan={18}
                            style={{
                              textAlign: "center",
                              fontSize: "20px",
                              fontWeight: "900",
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            <img src={LV} height="70px" />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td
                            colSpan={3}
                            style={{
                              textAlign: "center",
                              fontSize: "30px",
                              fontWeight: "900",
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                              marginBottom: "0px",
                            }}
                          >
                            <h6>SR No.</h6>
                          </td>
                          <td
                            colSpan={3}
                            style={{
                              textAlign: "center",
                              fontSize: "30px",
                              fontWeight: "900",
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                              marginBottom: "0px",
                            }}
                          >
                            {" "}
                            <h6>Verticals</h6>
                          </td>
                          <td
                            colSpan={3}
                            style={{
                              textAlign: "center",
                              fontSize: "30px",
                              fontWeight: "900",
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                              marginBottom: "0px",
                            }}
                          >
                            {" "}
                            <h6>Products</h6>
                          </td>
                          <td
                            colSpan={3}
                            style={{
                              textAlign: "center",
                              fontSize: "30px",
                              fontWeight: "900",
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                              marginBottom: "0px",
                            }}
                          >
                            {" "}
                            <h6>No. Of Cases</h6>
                          </td>
                          <td
                            colSpan={3}
                            style={{
                              textAlign: "center",
                              fontSize: "30px",
                              fontWeight: "900",
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                              marginBottom: "0px",
                            }}
                          >
                            {" "}
                            <h6>Rate Per Case</h6>
                          </td>
                          <td
                            colSpan={3}
                            style={{
                              textAlign: "center",
                              fontSize: "30px",
                              fontWeight: "900",
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                              marginBottom: "0px",
                            }}
                          >
                            {" "}
                            <h6>Amount Payable</h6>
                          </td>
                        </tr>

                        {billGroupBy.map((bill, index) => {
                          return (
                            <tr>
                              <td
                                colSpan={3}
                                style={{
                                  padding: "5px",
                                  textAlign: "center",
                                  border: "2px",
                                  borderColor: "black",
                                  borderStyle: "solid",
                                }}
                              >
                                {index + 1}
                              </td>
                              <td
                                colSpan={3}
                                style={{
                                  padding: "5px",
                                  textAlign: "center",
                                  border: "2px",
                                  borderColor: "black",
                                  borderStyle: "solid",
                                }}
                              >
                                {bill?.data[0].verticals}
                                {/* LAP */}
                              </td>
                              <td
                                colSpan={3}
                                style={{
                                  padding: "5px",
                                  textAlign: "center",
                                  border: "2px",
                                  borderColor: "black",
                                  borderStyle: "solid",
                                }}
                              >
                                {bill?.data[0].product}
                                {/* LAP */}
                              </td>
                              <td
                                colSpan={3}
                                style={{
                                  padding: "5px",
                                  textAlign: "center",
                                  border: "2px",
                                  borderColor: "black",
                                  borderStyle: "solid",
                                }}
                              >
                                {bill?.data?.length}
                              </td>

                              <td
                                colSpan={3}
                                style={{
                                  padding: "5px",
                                  textAlign: "center",
                                  border: "2px",
                                  borderColor: "black",
                                  borderStyle: "solid",
                                }}
                              >
                                {bill?.data[0].rate}
                                {/* 1500 */}
                              </td>

                              <td
                                colSpan={3}
                                style={{
                                  padding: "5px",
                                  textAlign: "center",
                                  border: "2px",
                                  borderColor: "black",
                                  borderStyle: "solid",
                                }}
                              >
                                {Number(bill?.data[0].rate) *
                                  Number(bill?.data?.length)}
                                {/* 1500 */}
                              </td>
                            </tr>
                          );
                        })}

                        <tr>
                          <td
                            colSpan={9}
                            style={{
                              padding: "5px",
                              textAlign: "center",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          ></td>
                          <td
                            colSpan={6}
                            style={{
                              padding: "5px",
                              textAlign: "right",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            Total
                          </td>
                          <td
                            colSpan={3}
                            style={{
                              padding: "5px",
                              textAlign: "center",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            {formProps.values.final_value}
                            {/* 3000 */}
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan={9}
                            style={{
                              padding: "5px",
                              textAlign: "center",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          ></td>
                          <td
                            colSpan={6}
                            style={{
                              padding: "5px",
                              textAlign: "right",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            SGST
                          </td>
                          <td
                            colSpan={3}
                            style={{
                              padding: "5px",
                              textAlign: "center",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            9%
                          </td>
                        </tr>
                        <tr>
                          {" "}
                          <td
                            colSpan={9}
                            style={{
                              padding: "5px",
                              textAlign: "center",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          ></td>
                          <td
                            colSpan={6}
                            style={{
                              padding: "5px",
                              textAlign: "right",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            CGST
                          </td>
                          <td
                            colSpan={3}
                            style={{
                              padding: "5px",
                              textAlign: "center",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            9%
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan={9}
                            style={{
                              padding: "5px",
                              textAlign: "center",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          ></td>
                          <td
                            colSpan={6}
                            style={{
                              padding: "5px",
                              textAlign: "right",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            Grand Total
                          </td>
                          <td
                            colSpan={3}
                            style={{
                              padding: "5px",
                              textAlign: "center",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            {formProps.values.grand_total}
                            {/* 3540 */}
                          </td>
                        </tr>

                        <tr>
                          <td
                            colSpan={9}
                            style={{
                              padding: "5px",
                              textAlign: "center",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          ></td>
                          <td
                            colSpan={6}
                            style={{
                              padding: "5px",
                              textAlign: "right",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            TDS Amount
                          </td>
                          <td
                            colSpan={3}
                            style={{
                              padding: "5px",
                              textAlign: "center",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            {formProps.values.tds_amount}
                            {/* 354 */}
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan={9}
                            style={{
                              padding: "5px",
                              textAlign: "center",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          ></td>
                          <td
                            colSpan={6}
                            style={{
                              padding: "5px",
                              textAlign: "right",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            Net Amount Receivable
                          </td>
                          <td
                            colSpan={3}
                            style={{
                              padding: "5px",
                              textAlign: "center",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            {formProps.values.net_amount_receivable}
                            {/* 3186 */}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Row>

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
                        onClick={() => setModal(!modal)}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    billsPostData2: (data, title, token) => dispatch(billsPostData2(data, title,token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OnHoldBill2);
