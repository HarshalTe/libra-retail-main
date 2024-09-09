import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  Table,
  Label,
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
import Button from "@mui/material/Button";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";
import * as _ from "lodash";

import LV from "../../../../assets/libra_logo1.png";
import TB from "../../../../assets/topbanner.jpeg";
import printJS from "print-js";
import { ToWords } from "to-words";
import "./FinalReport.css";
import Table2 from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function ViewFinalBill(props) {
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

  const [print, setPrint] = React.useState(false);
  // const file_1_status = 0

  const printPdf = () => {
    printJS({
      printable: "htmlToPdf2",
      css: "./FinalReport.css",
      type: "html",
      scanStyles: true,
      targetStyles: "[*]",
      font_size: "8pt",
      maxWidth: 1080,
      base64: true,
      honorMarginPadding: false,
      style: "@page {  options: footers;  }",
    });
  };
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
        variant="contained"
        color="success"
        size="small"
        className="ml-3"
        onClick={() => setModal(true)}
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
            <Button
            color="success"
            onClick={printPdf}
            className="print-button w-20  m-3"
            // disabled={!print}
          >
            <i className="fa fa-save mr-2" />
            Print Report
          </Button>
          </Typography>
        </ModalHeader>
        <Divider />
            <div id="htmlToPdf2">
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
                            colSpan={4}
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
                              paddingLeft: "5px",
                            }}
                          >
                            M Panel Code:{}
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
                            {formatDate(props?.data?.created_date)}
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
                            {props?.data?.created_date}
                          {/* {formatDate2(props?.data?.created_date)} */}
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
                  <div class="page-break"></div>
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
                  <div class="page-break"></div>
                  <div className="hide-on-print form-check form-switch" style={{"text-align": "end"}}>
      <input
        className="form-check-input"
        type="checkbox"
        role="switch"
        id="flexSwitchCheckChecked"
        checked={isChecked}
        onChange={handleSwitchChange}
      />
      <label
        className="form-check-label"
        htmlFor="flexSwitchCheckChecked"
      >
        Show No Dues Certificate
      </label>
    </div>
    {isChecked==true?(
      <div style={{"margin": "4vw"}}>
                 <p style={{"textAlign":"center",
    "fontSize": "22px", "fontWeight": "700" }} >No Dues Certificate</p>
    <div className="d-flex" style={{"justify-content": "space-between"}}>
<p style={{"width":"35vw"}}>To, <br/>{props?.data?.bank?.address}</p>
<p>Date:-{formattedDate}.</p>

    </div>


<p>Dear Sir/Madam,</p>

<p><b>Sub: Confirmation for No Dues pending from Yes Bank Ltd for Services provided till {formatDate(props?.data?.time)}. </b> <br/> This is to confirm that there is no payment outstanding for any activity done by my firm Libra Valuers for Mumbai Location from Yes Bank Ltd, on or till<b> {formatDate(props?.data?.time)} </b></p>

<p></p>

<table className="table">
    <tr>
      <th className="class">Bill Created Date</th>
      <th className="class" >Bill Paid Time</th>
      <th className="class" >Paid Status</th>
    </tr>
    <tr>
      <td className="class" >{props?.data?.created_date}</td>
      <td className="class" >{props?.data?.time}</td>
      <td className="class" >{props?.data?.is_paid=="1"? "Yes" : "No"}</td>
    </tr>
  </table>

{/* <TableContainer component={Paper}>
      <Table2 sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Bill Created Date</TableCell>
            <TableCell align="right">Bill Paid Time</TableCell>
            <TableCell align="right">Paid Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow
              // key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              {props?.data?.created_date}
              </TableCell>
              <TableCell align="right">{props?.data?.time}</TableCell>
              <TableCell align="right">{props?.data?.is_paid=="1"? "Yes" : "No"}</TableCell>
            </TableRow>
        </TableBody>
      </Table2>
    </TableContainer> */}



<p> There is No Dues Pending from Yes Bank Limited for the mentioned period for activities carried out across locations and products.</p>

<p> With Regards,</p>

<p></p>

<p>For, Libra Valuers</p>
                  </div>
    ):""}
                  



                  
                </Form>
              );
            }}
          </Formik>
        </ModalBody>
        </div>
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
      </Modal>
    </div>
  );
}

export default ViewFinalBill;
