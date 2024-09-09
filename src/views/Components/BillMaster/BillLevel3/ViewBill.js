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

import LV from "../../../../assets/libra_logo1.png";
import TB from "../../../../assets/topbanner.jpeg";

function ViewBill(props) {
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
        View
      </Button>
      {/* <MenuItem disableRipple onClick={() => setModal(!modal)}>
        <VisibilityIcon />
        View
      </MenuItem> */}
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
                  Bill to :APAC HF, APAC virar, APAC Housing Finance Pvt. Ltd.,
                  <br />
                  C-2, 1st Floor, Shakti Apartment, M. B. Estate, Opp. Kalyani
                  <br />
                  Children Hospital, Virar -W, 401303, 9819425790
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
                  2021220303
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
                  GSTIN:27AAPCA5224J1ZG
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
                  September-2021
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
                  13/10/2021
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
                  HL
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
                  HL
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
                  2
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
                  1500
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
                  3000
                </td>
              </tr>
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
                  3000
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
                  Company's Bank & Branch: ICICI Bank, Mira Road Branch
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
                  270
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
                  Account No. 001905501067
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
                  270
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
                  IFSC Code: ICIC0000019
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
                  3540
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
                  THREE THOUSAND FIVE HUNDRED FORTY ONLY.
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
                  Company's GSTIN: 27AEWPD8811N1ZS
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
                  Company's PAN :AEWPD8811N
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
                  State Code: 27
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
                  State: Maharashtra
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
                  SAC 998399
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
                  Is Eligible for Composition Scheme - No
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
                  MSME No. :- MH33D0159243
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
                  Terms & Conditions: The payment to be made within 15 days from
                  the receipt of the
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
                  Bill . Payments made after the due date will attract and
                  interest @9% p.a.
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
                  ENCL: List of cases E. &O.E.
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

          <Divider className="pt-2" />

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
                  1.
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
                  NA
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
                  Mr.Vinit Gowal
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
                  APAC HF
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
                  APAC virar
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
                  28-09-2021
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
                  29-09-2021
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
                  Flat No.G-2, Ground Floor, Parasnath Apartment Chsl, Achole
                  Talav Ring Road, Near Achole Talav, Village Achole,
                  Nallasopara East, Taluka Vasai, Dist Palgahr-401209
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
                  HL
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
                  HL
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
                  1500
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
                  0
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
                  1500
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
                  2616000
                </td>
              </tr>

              {/* 2nd TR */}
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
                  2.
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
                  NA
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
                  Sheetal Dhopte
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
                  APAC HF
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
                  APAC virar
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
                  29-09-2021
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
                  29-09-2021
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
                  Room No.B-2 Ground Floor Charkop Yogaksshem CHSL Plot No.335
                  Sector No.3 Road No.Rsc-36 Charkop Village Kandivali West
                  Mumbai 400067
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
                  HL
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
                  HL
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
                  1500
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
                  0
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
                  1500
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
                  4304000
                </td>
              </tr>
            </tbody>
          </Table>
        </ModalBody>
        <Divider />
        <ModalFooter className="pt-2 pb-2 pr-2">
          <Button
            size="sm"
            className="float-right"
            // block
            color="success"
            onClick={() => setModal(!modal)}
          >
            Submit
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ViewBill;
