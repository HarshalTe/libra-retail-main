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
  ModalFooter,
} from "reactstrap";
import Divider from "@mui/material/Divider";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MenuItem from "@mui/material/MenuItem";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";
import * as _ from "lodash";

import LV from "../../../../../assets/libra_logo1.png";
import TB from "../../../../../assets/topbanner.jpeg";

import { ToWords } from "to-words";

function ViewTDSBill(props) {
  console.log("data", props.data);

  const [modal, setModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
  };

  const toWords = new ToWords({
    localeCode: "en-IN",
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: false,
    },
  });

  let billGroupBy = _.chain(props.data.raw_bills)
    .groupBy("verticals")
    .map((data, verticals) => ({ data, verticals }))
    .value();

  console.log("billGroupBy", billGroupBy);

  const formatDate = (inputString) => {
    const dateObj = new Date(inputString);
    const monthYearString = dateObj.toLocaleString('default', { month: 'long', year: 'numeric' });
    return monthYearString;
  };
  const formatDate2 = (inputString) => {
    const dateObj = new Date(inputString);
    const formattedString = dateObj.toLocaleDateString('en-US');
    return formattedString;
  };
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' }).replace(/\//g, '.');

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
        View
      </Button>

      <Modal
        className="modal-xl"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>View Bill</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              gst: 0,
              grand_total_words: "",
            }}
            // onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              //   branch_name: Yup.string().required("Branch Name is required"),
            })}
          >
            {(formProps) => {
              {
                //!Grand Total

                formProps.values.gst = (
                  (props?.data?.raw_bills[0]?.final_value * 9) /
                  100
                ).toFixed(2);

                formProps.values.grand_total_words = toWords.convert(
                  props?.data?.grand_total == null
                    ? 0
                    : props?.data?.grand_total
                );
                console.log("totalinwords", formProps.values.grand_total_words);
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
                            {/* <strong>Libra Valuers</strong> */}
                            <img src={TB} height="100px" width="100%" />
                          </th>
                        </tr>
                        <tr>
                          <th
                            colSpan={18}
                            style={{
                              textAlign: "center",
                              fontSize: "16px",
                              fontWeight: "900",
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            Tax Invoice
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td
                            colSpan={8}
                            style={{
                              textAlign: "left",
                              fontSize: "10px",
                              fontWeight: "bold",
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                              paddingLeft: "5px",
                            }}
                          >
                            Bill to: {props?.data?.bank?.address}
                          </td>
                          <td
                            colSpan={4}
                            style={{
                              textAlign: "left",
                              fontSize: "10px",
                              fontWeight: "bold",
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          ></td>
                          <td
                            colSpan={2}
                            style={{
                              textAlign: "right",

                              fontSize: "10px",
                              fontWeight: "bold",
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                              paddingTop: "30px",
                            }}
                          >
                            Invoice No.:
                          </td>
                          <td
                            colSpan={2}
                            style={{
                              textAlign: "right",
                              fontSize: "10px",
                              fontWeight: "bold",
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                              paddingTop: "30px",
                            }}
                          >
                            {props?.data?.bill_no}
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan={8}
                            style={{
                              textAlign: "left",
                              fontSize: "10px",
                              fontWeight: "bold",
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                              paddingLeft: "5px",
                            }}
                          >
                            GSTIN:{props?.data?.company_detail?.gstin}
                          </td>
                          <td
                            colSpan={4}
                            style={{
                              textAlign: "left",
                              fontSize: "10px",
                              fontWeight: "bold",
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                              paddingTop: "30px",
                            }}
                          ></td>
                          <td
                            colSpan={2}
                            style={{
                              textAlign: "right",

                              fontSize: "10px",
                              fontWeight: "bold",
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                              paddingTop: "30px",
                            }}
                          >
                            Bill Month
                          </td>
                          <td
                            colSpan={2}
                            style={{
                              textAlign: "right",
                              fontSize: "10px",
                              fontWeight: "bold",
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                              paddingTop: "30px",
                            }}
                          >
                            {formatDate(props?.data?.time)}
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan={12}
                            style={{
                              textAlign: "left",
                              fontSize: "10px",
                              fontWeight: "bold",
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                              paddingLeft: "5px",
                            }}
                          ></td>

                          <td
                            colSpan={2}
                            style={{
                              textAlign: "right",

                              fontSize: "10px",
                              fontWeight: "bold",
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                              paddingTop: "30px",
                            }}
                          >
                            Invoice Date:
                          </td>
                          <td
                            colSpan={2}
                            style={{
                              textAlign: "right",
                              fontSize: "10px",
                              fontWeight: "bold",
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                              paddingTop: "30px",
                            }}
                          >
                          {formatDate2(props?.data?.time)}
                          </td>
                        </tr>
                        {/* //* description */}
                        <tr>
                          <td
                            colSpan={8}
                            style={{
                              padding: "0px",
                              textAlign: "left",
                              fontWeight: "bold",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            Description
                          </td>
                          <td
                            colSpan={2}
                            style={{
                              padding: "0px",
                              textAlign: "center",
                              fontWeight: "bold",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          ></td>
                          <td
                            colSpan={2}
                            style={{
                              padding: "0px",
                              textAlign: "center",
                              fontWeight: "bold",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            No. of cases
                          </td>
                          <td
                            colSpan={2}
                            style={{
                              padding: "0px",
                              textAlign: "center",
                              fontWeight: "bold",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            Rate (Rs.)
                          </td>
                          <td
                            colSpan={2}
                            style={{
                              padding: "0px",
                              textAlign: "center",
                              fontWeight: "bold",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            Amount (Rs.)
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan={8}
                            style={{
                              padding: "0px",
                              textAlign: "left",
                              fontWeight: "bold",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            Verticals
                          </td>
                          <td
                            colSpan={2}
                            style={{
                              padding: "0px",
                              textAlign: "center",
                              fontWeight: "bold",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            Procuct
                          </td>
                          <td
                            colSpan={2}
                            style={{
                              padding: "0px",
                              textAlign: "center",
                              fontWeight: "bold",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          ></td>
                          <td
                            colSpan={2}
                            style={{
                              padding: "0px",
                              textAlign: "center",
                              fontWeight: "bold",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          ></td>
                          <td
                            colSpan={2}
                            style={{
                              padding: "0px",
                              textAlign: "center",
                              fontWeight: "bold",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          ></td>
                        </tr>

                        {billGroupBy?.map((rawBills) => (
                          <tr>
                            <td
                              colSpan={8}
                              style={{
                                padding: "0px",
                                textAlign: "left",
                                fontWeight: "bold",
                                border: "2px",
                                borderColor: "black",
                                borderStyle: "solid",
                              }}
                            >
                              {rawBills?.data[0]?.vertical?.name}
                            </td>
                            <td
                              colSpan={2}
                              style={{
                                padding: "0px",
                                textAlign: "center",
                                fontWeight: "bold",
                                border: "2px",
                                borderColor: "black",
                                borderStyle: "solid",
                              }}
                            >
                              {rawBills?.data[0]?.product?.name}
                            </td>
                            <td
                              colSpan={2}
                              style={{
                                padding: "0px",
                                textAlign: "center",
                                fontWeight: "bold",
                                border: "2px",
                                borderColor: "black",
                                borderStyle: "solid",
                              }}
                            >
                              {rawBills?.data?.length}
                            </td>
                            <td
                              colSpan={2}
                              style={{
                                padding: "0px",
                                textAlign: "center",
                                fontWeight: "bold",
                                border: "2px",
                                borderColor: "black",
                                borderStyle: "solid",
                              }}
                            >
                              {rawBills?.data[0]?.rate}
                            </td>
                            <td
                              colSpan={2}
                              style={{
                                padding: "0px",
                                textAlign: "center",
                                fontWeight: "bold",
                                border: "2px",
                                borderColor: "black",
                                borderStyle: "solid",
                              }}
                            >
                              {rawBills?.data[0]?.rate * rawBills?.data?.length}
                            </td>
                          </tr>
                        ))}

                        {/* //* bank dets */}
                        <tr>
                          <td
                            colSpan={8}
                            style={{
                              padding: "0px",
                              textAlign: "left",
                              fontWeight: "bold",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            Bank Details:
                          </td>
                          <td
                            colSpan={2}
                            style={{
                              padding: "0px",
                              textAlign: "center",
                              fontWeight: "bold",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          ></td>
                          <td
                            colSpan={2}
                            style={{
                              padding: "0px",
                              textAlign: "center",
                              fontWeight: "bold",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          ></td>
                          <td
                            colSpan={2}
                            style={{
                              padding: "0px",
                              textAlign: "center",
                              fontWeight: "bold",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            Total
                          </td>
                          <td
                            colSpan={2}
                            style={{
                              padding: "0px",
                              textAlign: "center",
                              fontWeight: "bold",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            {props?.data?.raw_bills[0]?.final_value}
                          </td>
                        </tr>

                        <tr>
                          <td
                            colSpan={8}
                            style={{
                              padding: "0px",
                              textAlign: "left",
                              // fontWeight: "bold",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            Company's Bank & Branch: {props?.data?.company_detail?.state} {props?.data?.company_detail?.state_code}
                          </td>
                          <td
                            colSpan={2}
                            style={{
                              padding: "0px",
                              textAlign: "center",
                              fontWeight: "bold",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          ></td>
                          <td
                            colSpan={2}
                            style={{
                              padding: "0px",
                              textAlign: "center",
                              fontWeight: "bold",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            Add:CGST
                          </td>
                          <td
                            colSpan={2}
                            style={{
                              padding: "0px",
                              textAlign: "center",
                              fontWeight: "bold",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            9%
                          </td>
                          <td
                            colSpan={2}
                            style={{
                              padding: "0px",
                              textAlign: "center",
                              fontWeight: "bold",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            {formProps?.values?.gst}
                            {/* 270 */}
                          </td>
                        </tr>

                        <tr>
                          <td
                            colSpan={8}
                            style={{
                              padding: "0px",
                              textAlign: "left",
                              // fontWeight: "bold",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            Account No.{props?.data?.company_detail?.account}
                          </td>
                          <td
                            colSpan={2}
                            style={{
                              padding: "0px",
                              textAlign: "center",
                              fontWeight: "bold",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          ></td>
                          <td
                            colSpan={2}
                            style={{
                              padding: "0px",
                              textAlign: "center",
                              fontWeight: "bold",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            Add:SGST
                          </td>
                          <td
                            colSpan={2}
                            style={{
                              padding: "0px",
                              textAlign: "center",
                              fontWeight: "bold",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            9%
                          </td>
                          <td
                            colSpan={2}
                            style={{
                              padding: "0px",
                              textAlign: "center",
                              fontWeight: "bold",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            {formProps?.values?.gst}
                            {/* 270 */}
                          </td>
                        </tr>

                        <tr>
                          <td
                            colSpan={8}
                            style={{
                              padding: "0px",
                              textAlign: "left",
                              // fontWeight: "bold",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            IFSC Code: {props?.data?.company_detail?.ifsc_code}
                          </td>
                          <td
                            colSpan={2}
                            style={{
                              padding: "0px",
                              textAlign: "center",
                              fontWeight: "bold",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          ></td>

                          <td
                            colSpan={4}
                            style={{
                              padding: "0px",
                              textAlign: "center",
                              fontWeight: "bold",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            Grand Total
                          </td>
                          <td
                            colSpan={2}
                            style={{
                              padding: "0px",
                              textAlign: "center",
                              fontWeight: "bold",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            {props?.data?.grand_total}
                          </td>
                        </tr>

                        <tr>
                          <td
                            colSpan={16}
                            style={{
                              padding: "0px",
                              textAlign: "center",
                              fontWeight: "bold",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            {formProps?.values?.grand_total_words}
                          </td>
                        </tr>

                        <tr>
                          <td
                            colSpan={12}
                            style={{
                              padding: "0px",
                              textAlign: "left",
                              // fontWeight: "bold",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            Company's GSTIN: {props?.data?.company_detail?.gstin}
                          </td>
                          <td
                            colSpan={4}
                            style={{
                              padding: "0px",
                              textAlign: "center",
                              // fontWeight: "bold",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            For Libra Valuers
                          </td>
                        </tr>

                        <tr>
                          <td
                            colSpan={12}
                            style={{
                              padding: "0px",
                              textAlign: "left",
                              // fontWeight: "bold",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            Company's PAN :{props?.data?.company_detail?.pan}
                          </td>
                          <td
                            colSpan={4}
                            rowSpan={8}
                            style={{
                              padding: "0px",
                              textAlign: "center",
                              // fontWeight: "bold",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          ></td>
                        </tr>

                        <tr>
                          <td
                            colSpan={12}
                            style={{
                              padding: "0px",
                              textAlign: "left",
                              // fontWeight: "bold",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            State Code: {props?.data?.company_detail?.state_code}
                          </td>
                        </tr>

                        <tr>
                          <td
                            colSpan={12}
                            style={{
                              padding: "0px",
                              textAlign: "left",
                              // fontWeight: "bold",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            State: {props?.data?.company_detail?.state}
                          </td>
                        </tr>

                        <tr>
                          <td
                            colSpan={12}
                            style={{
                              padding: "0px",
                              textAlign: "left",
                              // fontWeight: "bold",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            SAC {props?.data?.company_detail?.sac}
                          </td>
                        </tr>

                        <tr>
                          <td
                            colSpan={12}
                            style={{
                              padding: "0px",
                              textAlign: "left",
                              // fontWeight: "bold",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            Is Eligible for Composition Scheme - {props?.data?.company_detail?.composition_scheme==0?"No":"Yes"}
                          </td>
                        </tr>

                        <tr>
                          <td
                            colSpan={12}
                            style={{
                              padding: "0px",
                              textAlign: "left",
                              // fontWeight: "bold",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            MSME No. :-  {props?.data?.company_detail?.msme_no}
                          </td>
                        </tr>

                        <tr>
                          <td
                            colSpan={12}
                            style={{
                              padding: "0px",
                              textAlign: "left",
                              // fontWeight: "bold",
                              fontSize: "10px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            Terms & Conditions: The payment to be made within 15
                            days from the receipt of the
                          </td>
                        </tr>

                        <tr>
                          <td
                            colSpan={12}
                            style={{
                              padding: "0px",
                              textAlign: "left",
                              // fontWeight: "bold",
                              fontSize: "10px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            Bill . Payments made after the due date will attract
                            and interest @9% p.a.
                          </td>
                        </tr>

                        <tr>
                          <td
                            colSpan={12}
                            style={{
                              padding: "0px",
                              textAlign: "left",
                              // fontWeight: "bold",
                              fontSize: "16px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            ENCL: {props?.data?.company_detail?.encl}
                          </td>
                          <td
                            colSpan={4}
                            style={{
                              padding: "0px",
                              textAlign: "center",
                              // fontWeight: "bold",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            Authorised Sign
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Row>

                  <Divider className="pt-2" />

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
                            List Of Cases
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td
                            style={{
                              textAlign: "center",
                              fontSize: "14px",
                              fontWeight: "bold",
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                              wordWrap: "break-word",
                              whiteSpace: "normal",
                            }}
                          >
                            SR No.
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              fontSize: "14px",
                              fontWeight: "bold",
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                              wordWrap: "break-word",
                              whiteSpace: "normal",
                            }}
                          >
                            Prospect No
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              fontSize: "14px",
                              fontWeight: "bold",
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                              wordWrap: "break-word",
                              whiteSpace: "normal",
                            }}
                          >
                            Customer Name
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              fontSize: "14px",
                              fontWeight: "bold",
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                              wordWrap: "break-word",
                              whiteSpace: "normal",
                            }}
                          >
                            Bank Name
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              fontSize: "14px",
                              fontWeight: "bold",
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                              wordWrap: "break-word",
                              whiteSpace: "normal",
                            }}
                          >
                            Branch Name
                          </td>

                          <td
                            style={{
                              textAlign: "center",
                              fontSize: "14px",
                              fontWeight: "bold",
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                              wordWrap: "break-word",
                              whiteSpace: "normal",
                            }}
                          >
                            Created Date
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              fontSize: "14px",
                              fontWeight: "bold",
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                              wordWrap: "break-word",
                              whiteSpace: "normal",
                            }}
                          >
                            Report Generated Date
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              fontSize: "14px",
                              fontWeight: "bold",
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                              wordWrap: "break-word",
                              whiteSpace: "normal",
                            }}
                            colSpan={3}
                          >
                            Postal Address
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              fontSize: "14px",
                              fontWeight: "bold",
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                              wordWrap: "break-word",
                              whiteSpace: "normal",
                            }}
                          >
                            Verticals
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              fontSize: "14px",
                              fontWeight: "bold",
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                              wordWrap: "break-word",
                              whiteSpace: "normal",
                            }}
                          >
                            Product
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              fontSize: "14px",
                              fontWeight: "bold",
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                              wordWrap: "break-word",
                              whiteSpace: "normal",
                            }}
                          >
                            Rate
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              fontSize: "14px",
                              fontWeight: "bold",
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                              wordWrap: "break-word",
                              whiteSpace: "normal",
                            }}
                          >
                            No Of KM
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              fontSize: "14px",
                              fontWeight: "bold",
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                              wordWrap: "break-word",
                              whiteSpace: "normal",
                            }}
                          >
                            Cost of Km
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              fontSize: "14px",
                              fontWeight: "bold",
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                              wordWrap: "break-word",
                              whiteSpace: "normal",
                            }}
                          >
                            Fees
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              fontSize: "14px",
                              fontWeight: "bold",
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                              wordWrap: "break-word",
                              whiteSpace: "normal",
                            }}
                          >
                            Property Value
                          </td>
                        </tr>

                        {props?.data?.raw_bills?.map((rawBills, index) => (
                          <tr>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "0px",
                                border: "2px",
                                borderColor: "black",
                                borderStyle: "solid",
                                wordWrap: "break-word",
                                whiteSpace: "normal",
                              }}
                            >
                              {index + 1}
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "0px",
                                border: "2px",
                                borderColor: "black",
                                borderStyle: "solid",
                                wordWrap: "break-word",
                                whiteSpace: "normal",
                              }}
                            >
                              {rawBills?.property?.prospect_no}
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "0px",
                                border: "2px",
                                borderColor: "black",
                                borderStyle: "solid",
                                wordWrap: "break-word",
                                whiteSpace: "normal",
                              }}
                            >
                              {rawBills?.property?.customer_name}
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "0px",
                                border: "2px",
                                borderColor: "black",
                                borderStyle: "solid",
                                wordWrap: "break-word",
                                whiteSpace: "normal",
                              }}
                            >
                              {rawBills?.branch?.bank_name}
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "0px",
                                border: "2px",
                                borderColor: "black",
                                borderStyle: "solid",
                                wordWrap: "break-word",
                                whiteSpace: "normal",
                              }}
                            >
                              {rawBills?.branch?.branch_name}
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "0px",
                                border: "2px",
                                borderColor: "black",
                                borderStyle: "solid",
                                wordWrap: "break-word",
                                whiteSpace: "normal",
                              }}
                            >
                              {rawBills?.created_date}
                            </td>

                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "0px",
                                border: "2px",
                                borderColor: "black",
                                borderStyle: "solid",
                                wordWrap: "break-word",
                                whiteSpace: "normal",
                              }}
                            >
                              {rawBills?.created_date}
                              {/* 29-09-2021(static) */}
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "0px",
                                border: "2px",
                                borderColor: "black",
                                borderStyle: "solid",
                                wordWrap: "break-word",
                                whiteSpace: "normal",
                              }}
                              colSpan={3}
                            >
                              {rawBills?.property?.postal_address}
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "0px",
                                border: "2px",
                                borderColor: "black",
                                borderStyle: "solid",
                                wordWrap: "break-word",
                                whiteSpace: "normal",
                              }}
                            >
                              {rawBills?.vertical?.name}
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "0px",
                                border: "2px",
                                borderColor: "black",
                                borderStyle: "solid",
                                wordWrap: "break-word",
                                whiteSpace: "normal",
                              }}
                            >
                              {rawBills?.product?.name}
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "0px",
                                border: "2px",
                                borderColor: "black",
                                borderStyle: "solid",
                                wordWrap: "break-word",
                                whiteSpace: "normal",
                              }}
                            >
                              {rawBills?.rate}
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "0px",
                                border: "2px",
                                borderColor: "black",
                                borderStyle: "solid",
                                wordWrap: "break-word",
                                whiteSpace: "normal",
                              }}
                            ></td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "0px",
                                border: "2px",
                                borderColor: "black",
                                borderStyle: "solid",
                                wordWrap: "break-word",
                                whiteSpace: "normal",
                              }}
                            >
                              {rawBills?.cost}
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "0px",
                                border: "2px",
                                borderColor: "black",
                                borderStyle: "solid",
                                wordWrap: "break-word",
                                whiteSpace: "normal",
                              }}
                            >
                              {rawBills?.product?.rate}
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "0px",
                                border: "2px",
                                borderColor: "black",
                                borderStyle: "solid",
                                wordWrap: "break-word",
                                whiteSpace: "normal",
                              }}
                            >
                              {rawBills?.property?.property_cost}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Row>

                  <Row className="pt-4 pd-4">
                    <Col md={12}>
                      <Button
                        color="warning"
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

export default ViewTDSBill;
