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
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@material-ui/core/TextField";
import moment from "moment";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";
import * as _ from "lodash";
import Switch from '@mui/material/Switch';
import LV from "../../../../assets/libra_logo1.png";
import TB from "../../../../assets/newtopbanner.png";
import printJS from "print-js";

//*Actions
import { billsPostData } from "../../../../Redux/Creators/BIllCreators";

function CreditNote(props) {
  console.log("CreditNote props", props.data.selected,props);
  const token = props.login?.login?.token;
  
  const [modal, setModal] = useState(false);
  const [checked, setChecked] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);

  // let propData = props.data?.selected[0]
  
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleChange2 = (event) => {
    setChecked2(event.target.checked);
  };

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
            id: bill?.property_id,
            branch_id: bill?.branch_id,
            final_value: values?.final_value,
            verticals: bill?.vertical_id,
            product: bill?.product_id,
            rate: bill?.rate,
          }))
        : [];

    let data = {
      token: token,
      details: billDetails,
      bill_status: values.bill_status,
      final_value: values.final_value,
      grand_total: values.grand_total,
      tds_amount: values.tds_amount,
      net_amount_receivable: values.net_amount_receivable,
      bank_id: values.bank_id,
      gst: values.gst,
      cgst: values.cgst,
      gst_total: values.gst_total,
      payement_id: values.payement_id,
      created_date: values.created_date,
    };

    console.log("data", data);

    const title = "Succssfully Created The Bills!";

    // props.billsPostData(data, title);
    setSubmitting(true);
    setModal(false);
  };
  const printPdf = () => {
    printJS({
      printable: "htmlToPdf2",
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

// console.log(Object.keys(props?.data?.product_wise_raw_bills),"Object.keys(props?.data?.product_wise_raw_bills)")
  return (
    <div>
      <Button
        size="small"
        variant="contained"
        color="success"
        className="ml-2"
        onClick={() => {
          setModal(!modal);
        }}
      >
        Credit Note
      </Button>

      <Modal
        className="modal-xl"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Credit Note</strong>
          </Typography>
        </ModalHeader>
          <Button
            color="success"
            onClick={printPdf}
            className="print-button w-20  m-3"
            // disabled={!print}
          >
            <i className="fa fa-save mr-2" />
            Print Report
          </Button>
        <Divider />
          <div id="htmlToPdf2">
        <ModalBody>
          <Formik
            initialValues={{
              bill_status: "create",
              final_value: 0,
              grand_total: 0,
              tds_amount: 0,
              net_amount_receivable: 0,
              gst: "9%",
              cgst: "9%",
              gst_total: 0,
              // bank_id: props?.data?.selected[0]?.bank_id,
              payement_id: "",
              created_date: moment().format("YYYY-MM-DD"),
            }}
            // onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              payement_id: Yup.string().required("Payment Account is required"),
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
              {
                //! Rate
                formProps.values.final_value = props?.data?.selected?.reduce(
                  function (prev, cur) {
                    return (Number(prev) + Number(cur.rate)).toFixed(2);
                  },
                  0
                );

                //!Grand Total

                formProps.values.gst_total = Number(
                  (formProps.values.final_value * 18) / 100
                ).toFixed(2);

                formProps.values.grand_total = (
                  Number(formProps.values.final_value) +
                  Number(formProps.values.gst_total)
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

                console.log("gst_total", formProps.values.gst_total);
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
                              "text-align": "center",
                              "font-size": "32px",
                              "font-weight": "900",
                              "padding": "0px",
                              "border": "2px solid black",
                              "background-color": "#bed68d",
                              "color": "black",
                            }}
                          >
                            Credit Note
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td 
                          colSpan={9}
                          style={{
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "padding": "2px 0 2px 4px"
                        }}>
                          Document No:{props?.data?.id}
                        </td>
                          <td
                          colSpan={9}
                          style={{
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "padding": "2px 0 2px 4px"
                        }}>
                          Against invoice:{props?.data?.bill_no}
                        </td>
                        </tr>
                        <tr>
                          <td 
                          colSpan={9}
                          style={{
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "padding": "2px 0 2px 4px"
                        }}>
                          Date of Issue:{props?.data?.created_at}
                        </td>
                          <td
                          colSpan={9}
                          style={{
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "padding": "2px 0 2px 4px"
                        }}>
                          Date of Invoice:{props?.data?.created_at}
                        </td>
                        </tr>

                        <tr>
                          <td 
                          colSpan={6}
                          style={{
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "padding": "2px 0 2px 4px"
                        }}>
                          State:
                        </td>
                          <td
                          colSpan={1}
                          style={{
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "padding": "2px 0 2px 4px"
                        }}>
                          Code
                        </td>
                          <td
                          colSpan={1}
                          style={{
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "padding": "2px 0 2px 4px"
                        }}>
                          {/* 400093 */}
                        </td>
                          <td
                          colSpan={9}
                          style={{
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "padding": "2px 0 2px 4px"
                        }}>
                          
                        </td>
                        </tr>
                      </tbody>

                      <tbody>
                        <td>
                          <tr></tr>
                        </td>
                      </tbody>

                      <tbody>
                        <tr>
                          <td 
                          colSpan={9}
                          style={{
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "padding": "2px 0 2px 4px"
                        }}>
                          Detail of Receiver (Billed to)
                        </td>
                          <td
                          colSpan={9}
                          style={{
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "padding": "2px 0 2px 4px"
                        }}>
                          Detail of Consignee (Shipped to)
                        </td>
                        </tr>

                        <tr>
                          <td 
                          colSpan={9}
                          style={{
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "padding": "2px 0 2px 4px"
                        }}>
                          Name: {props?.data?.bank.bank_name}
                        </td>
                          <td
                          colSpan={9}
                          style={{
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "padding": "2px 0 2px 4px"
                        }}>
                          Name: {props?.data?.bank.bank_name}
                        </td>
                        </tr>

                        <tr>
                          <td 
                          colSpan={9}
                          style={{
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "padding": "2px 0 2px 4px"
                        }}>
                          Address:
                        </td>
                          <td
                          colSpan={9}
                          style={{
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "padding": "2px 0 2px 4px"
                        }}>
                          Address:
                        </td>
                        </tr>

                        <tr>
                          <td 
                          colSpan={9}
                          style={{
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "padding": "2px 0 2px 4px"
                        }}>
                          GSTIN:
                        </td>
                          <td
                          colSpan={9}
                          style={{
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "padding": "2px 0 2px 4px"
                        }}>
                          GSTIN:
                        </td>
                        </tr>

                        <tr>
                          <td 
                          colSpan={6}
                          style={{
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "padding": "2px 0 2px 4px"
                        }}>
                          State:
                        </td>
                          <td
                          colSpan={1}
                          style={{
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "padding": "2px 0 2px 4px"
                        }}>
                          Code:
                        </td>
                          <td
                          colSpan={1}
                          style={{
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "padding": "2px 0 2px 4px"
                        }}>
                          {/* {props.data.raw_bills[0]?.branch?.pincode} */}
                        </td>
                          <td 
                          colSpan={6}
                          style={{
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "padding": "2px 0 2px 4px"
                        }}>
                          State:
                        </td>
                          <td
                          colSpan={1}
                          style={{
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "padding": "2px 0 2px 4px"
                        }}>
                          Code
                        </td>
                          <td
                          colSpan={1}
                          style={{
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "padding": "2px 0 2px 4px"
                        }}>
                          {/* {props.data.raw_bills[0]?.branch?.pincode} */}
                        </td>
                        </tr>
                      </tbody>

                    </Table>
                  </Row>
                  <tbody>
                        <td>
                          <tr></tr>
                        </td>
                      </tbody>

                      <Row>
                    <Table bordered>
                      <thead>
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
                            Product Description
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
                            HSN code
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
                            UOM
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
                            Qty
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
                            Amount
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
                            Discount
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
                            Taxable Value
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
                           <table
                           style={{"width": "-webkit-fill-available"}}
                           >
    <tr>
        <td
        colSpan={18}
        style={{
          textAlign: "center",
          fontSize: "14px",
          fontWeight: "bold",
          padding: "0px",
          // border: "2px",
          // borderColor: "black",
          // borderStyle: "solid",
          wordWrap: "break-word",
          whiteSpace: "normal",
        }}
        >CGST</td>
    </tr>
    <tr>
        <td
        style={{
          textAlign: "center",
          fontSize: "14px",
          fontWeight: "bold",
          padding: "0px",
          // border: "2px",
          // borderColor: "black",
          // borderStyle: "solid",
          wordWrap: "break-word",
          whiteSpace: "normal",
        }}
        >Rate</td>
        <td
        style={{
          textAlign: "center",
          fontSize: "14px",
          fontWeight: "bold",
          padding: "0px",
          // border: "2px",
          // borderColor: "black",
          // borderStyle: "solid",
          wordWrap: "break-word",
          whiteSpace: "normal",
        }}
        >Amount</td>
    </tr>
</table>
                            
                          </td>
                          {/* <tr></tr> */}
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
                             <table
                           style={{"width": "-webkit-fill-available"}}
                           >
    <tr>
        <td
        colSpan={18}
        style={{
          textAlign: "center",
          fontSize: "14px",
          fontWeight: "bold",
          padding: "0px",
          // border: "2px",
          // borderColor: "black",
          // borderStyle: "solid",
          wordWrap: "break-word",
          whiteSpace: "normal",
        }}
        >SGST</td>
    </tr>
    <tr>
        <td
        style={{
          textAlign: "center",
          fontSize: "14px",
          fontWeight: "bold",
          padding: "0px",
          // border: "2px",
          // borderColor: "black",
          // borderStyle: "solid",
          wordWrap: "break-word",
          whiteSpace: "normal",
        }}
        >Rate</td>
        <td
        style={{
          textAlign: "center",
          fontSize: "14px",
          fontWeight: "bold",
          padding: "0px",
          // border: "2px",
          // borderColor: "black",
          // borderStyle: "solid",
          wordWrap: "break-word",
          whiteSpace: "normal",
        }}
        >Amount</td>
    </tr>
</table>
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
                            <table
                           style={{"width": "-webkit-fill-available"}}
                           >
    <tr>
        <td
        colSpan={18}
        style={{
          textAlign: "center",
          fontSize: "14px",
          fontWeight: "bold",
          padding: "0px",
          // border: "2px",
          // borderColor: "black",
          // borderStyle: "solid",
          wordWrap: "break-word",
          whiteSpace: "normal",
        }}
        >IGST</td>
    </tr>
    <tr>
        <td
        style={{
          textAlign: "center",
          fontSize: "14px",
          fontWeight: "bold",
          padding: "0px",
          // border: "2px",
          // borderColor: "black",
          borderStyle: "solid",
          wordWrap: "break-word",
          whiteSpace: "normal",
        }}
        >Rate</td>
        <td
        style={{
          textAlign: "center",
          fontSize: "14px",
          fontWeight: "bold",
          padding: "0px",
          // border: "2px",
          // borderColor: "black",
          // borderStyle: "solid",
          wordWrap: "break-word",
          whiteSpace: "normal",
        }}
        >Amount</td>
    </tr>
</table>
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
                            Total
                          </td>
                        </tr>

                      </thead>
                      {/* {props?.data?.raw_bills} */}
                  {console.log(props?.data?.raw_bills,"props?.data?.raw_bills?")}
                      {props?.data?.raw_bills?.map((row,i)=>(
                        // <div>name</div>
                      
                      <tbody>
                        <tr>
                          <td
                            style={{
                              textAlign: "center",
                              fontSize: "14px",
                              
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                              wordWrap: "break-word",
                              whiteSpace: "normal",
                            }}
                          >
                            {i+1}
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              fontSize: "14px",
                              
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                              wordWrap: "break-word",
                              whiteSpace: "normal",
                            }}
                          >
                            {/* {Object.keys(props?.data?.product_wise_raw_bills)} */}
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              fontSize: "14px",
                              
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                              wordWrap: "break-word",
                              whiteSpace: "normal",
                            }}
                          >
                            {/* HSN code */}
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              fontSize: "14px",
                              
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                              wordWrap: "break-word",
                              whiteSpace: "normal",
                            }}
                          >
                            {/* UOM */}
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              fontSize: "14px",
                              
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                              wordWrap: "break-word",
                              whiteSpace: "normal",
                            }}
                          >
                            {/* Qty */}
                          </td>

                          <td
                            style={{
                              textAlign: "center",
                              fontSize: "14px",
                              
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                              wordWrap: "break-word",
                              whiteSpace: "normal",
                            }}
                          >
                            {row?.rate}
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              fontSize: "14px",
                              
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                              wordWrap: "break-word",
                              whiteSpace: "normal",
                            }}
                          >
                            {/* Amount */}
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              fontSize: "14px",
                              
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                              wordWrap: "break-word",
                              whiteSpace: "normal",
                            }}
                            colSpan={3}
                          >
                            {/* Discount */}
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              fontSize: "14px",
                              
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                              wordWrap: "break-word",
                              whiteSpace: "normal",
                            }}
                          >
                            {/* Taxable Value */}
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              fontSize: "14px",
                              
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                              wordWrap: "break-word",
                              whiteSpace: "normal",
                            }}
                          >
                           <table
                           style={{"width": "-webkit-fill-available"}}
                           >
    <tr>
        <td
        colSpan={18}
        style={{
          textAlign: "center",
          fontSize: "14px",
          
          padding: "0px",
          // border: "2px",
          // borderColor: "black",
          // borderStyle: "solid",
          wordWrap: "break-word",
          whiteSpace: "normal",
        }}
        >
          {/* CGST */}
          </td>
    </tr>
    {/* <tr>
        <td
        style={{
          textAlign: "center",
          fontSize: "14px",
          
          padding: "0px",
          // border: "2px",
          // borderColor: "black",
          // borderStyle: "solid",
          wordWrap: "break-word",
          whiteSpace: "normal",
        }}
        >Rate</td>
        <td
        style={{
          textAlign: "center",
          fontSize: "14px",
          
          padding: "0px",
          // border: "2px",
          // borderColor: "black",
          // borderStyle: "solid",
          wordWrap: "break-word",
          whiteSpace: "normal",
        }}
        >Amount</td>
    </tr> */}
</table>
                            
                          </td>
                          {/* <tr></tr> */}
                          <td
                            style={{
                              textAlign: "center",
                              fontSize: "14px",
                              
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                              wordWrap: "break-word",
                              whiteSpace: "normal",
                            }}
                          >
                             <table
                           style={{"width": "-webkit-fill-available"}}
                           >
    <tr>
        <td
        colSpan={18}
        style={{
          textAlign: "center",
          fontSize: "14px",
          
          padding: "0px",
          // border: "2px",
          // borderColor: "black",
          // borderStyle: "solid",
          wordWrap: "break-word",
          whiteSpace: "normal",
        }}
        >
          {/* SGST */}
          </td>
    </tr>
    {/* <tr>
        <td
        style={{
          textAlign: "center",
          fontSize: "14px",
          
          padding: "0px",
          // border: "2px",
          // borderColor: "black",
          // borderStyle: "solid",
          wordWrap: "break-word",
          whiteSpace: "normal",
        }}
        >Rate</td>
        <td
        style={{
          textAlign: "center",
          fontSize: "14px",
          
          padding: "0px",
          // border: "2px",
          // borderColor: "black",
          // borderStyle: "solid",
          wordWrap: "break-word",
          whiteSpace: "normal",
        }}
        >Amount</td>
    </tr> */}
</table>
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              fontSize: "14px",
                              
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                              wordWrap: "break-word",
                              whiteSpace: "normal",
                            }}
                          >
                            <table
                           style={{"width": "-webkit-fill-available"}}
                           >
    <tr>
        <td
        colSpan={18}
        style={{
          textAlign: "center",
          fontSize: "14px",
          
          padding: "0px",
          // border: "2px",
          // borderColor: "black",
          // borderStyle: "solid",
          wordWrap: "break-word",
          whiteSpace: "normal",
        }}
        >
          {/* IGST */}
        </td>
    </tr>
    {/* <tr>
        <td
        style={{
          textAlign: "center",
          fontSize: "14px",
          
          padding: "0px",
          // border: "2px",
          // borderColor: "black",
          borderStyle: "solid",
          wordWrap: "break-word",
          whiteSpace: "normal",
        }}
        >Rate</td>
        <td
        style={{
          textAlign: "center",
          fontSize: "14px",
          
          padding: "0px",
          // border: "2px",
          // borderColor: "black",
          // borderStyle: "solid",
          wordWrap: "break-word",
          whiteSpace: "normal",
        }}
        >Amount</td>
    </tr> */}
</table>
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              fontSize: "14px",
                              
                              padding: "0px",
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                              wordWrap: "break-word",
                              whiteSpace: "normal",
                            }}
                          >
                            {/* Total */}
                          </td>
                        </tr>

                      </tbody>
  ))}
                    </Table>
                  </Row>
                  
                  <Row>
                    <Table bordered>
                      <tbody>
                      <tr>
                          <td 
                          colSpan={12}
                          style={{
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "padding": "2px 0 2px 4px"
                        }}>
                          Total amount in words
                        </td>
                          <td
                          colSpan={5}
                          style={{
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "padding": "2px 0 2px 4px"
                        }}>
                          Total Amount before Tax
                        </td>
                          <td
                          colSpan={1}
                          style={{
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "padding": "2px 0 2px 4px"
                        }}>
                          {/* 1000 */}
                        </td>
                        </tr>
                      </tbody>

                      <tbody>
                      <tr>
                          <td 
                          colSpan={12}
                          style={{
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "padding": "2px 0 2px 4px"
                        }}>
                          
                        </td>
                          <td
                          colSpan={5}
                          style={{
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "padding": "2px 0 2px 4px"
                        }}>
                          Add: CGST
                        </td>
                          <td
                          colSpan={1}
                          style={{
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "padding": "2px 0 2px 4px"
                        }}>
                          {props?.data?.cgst}
                        </td>
                        </tr>
                      </tbody>

                      <tbody>
                      <tr>
                          <td 
                          colSpan={12}
                          style={{
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "padding": "2px 0 2px 4px"
                        }}>
                          
                        </td>
                          <td
                          colSpan={5}
                          style={{
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "padding": "2px 0 2px 4px"
                        }}>
                          Add: SGST
                        </td>
                          <td
                          colSpan={1}
                          style={{
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "padding": "2px 0 2px 4px"
                        }}>
                          {props?.data?.sgst}
                        </td>
                        </tr>
                      </tbody>
                      <tbody>
                      <tr>
                          <td 
                          colSpan={12}
                          style={{
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "padding": "2px 0 2px 4px"
                        }}>
                          
                        </td>
                          <td
                          colSpan={5}
                          style={{
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "padding": "2px 0 2px 4px"
                        }}>
                          Total Tax Amount
                        </td>
                          <td
                          colSpan={1}
                          style={{
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "padding": "2px 0 2px 4px"
                        }}>
                          {/* 180 */}
                        </td>
                        </tr>
                      </tbody>
                      <tbody>
                      <tr>
                          <td 
                          colSpan={12}
                          style={{
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "padding": "2px 0 2px 4px"
                        }}>
                          --
                          {/* ONE THOUSAND ONE HUNDRED EIGHTY ONLY */}
                        </td>
                          <td
                          colSpan={5}
                          style={{
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "padding": "2px 0 2px 4px"
                        }}>
                          Total Amount after Tax:
                        </td>
                          <td
                          colSpan={1}
                          style={{
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "padding": "2px 0 2px 4px"
                        }}>
                          1180
                        </td>
                        </tr>
                      </tbody>
                      </Table>
                  </Row>  
                      <Row>
                    <Col md={6} className="p-0">

                    <Table bordered>
                      <tbody>
                      <tr>
                          <td 
                          colSpan={12}
                          style={{
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "padding": "2px 0 2px 4px"
                        }}>
                          Bank Details
                        </td>
                        </tr>
                      </tbody>

                      <tbody>
                      <tr>
                          <td 
                          colSpan={12}
                          style={{
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "padding": "2px 0 2px 4px"
                        }}>
                          Bank Name: {props.data?.company_detail?.company_detail}
                        </td>
                          
                        </tr>
                      </tbody>

                      <tbody>
                      <tr>
                          <td 
                          colSpan={12}
                          style={{
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "padding": "2px 0 2px 4px"
                        }}>
                          Bank A/C: {props.data?.company_detail?.account}
                        </td>
                        </tr>
                      </tbody>

                      <tbody>
                      <tr>
                          <td 
                          colSpan={12}
                          style={{
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "padding": "2px 0 2px 4px"
                        }}>
                          Bank IFSC: {props.data?.company_detail?.ifsc_code}
                        </td>
                        </tr>
                      </tbody>

                      <tbody>
                      <tr>
                          <td 
                          colSpan={12}
                          style={{
                            "height": "75px",
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "padding": "2px 0 2px 4px"
                        }}>
                          Terms & conditions:-?
                        </td>
                        </tr>
                      </tbody>
                    </Table>
                    </Col>
                    <Col md={6} className="p-0" >
                    <Table bordered>
                      <tbody>
                      <tr>
                          <td 
                          colSpan={12}
                          style={{
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "padding": "2px 0 2px 4px"
                        }}>
                          GST on Reverse Charge
                        </td>
                        </tr>
                      </tbody>

                      <tbody>
                      <tr>
                          <td 
                          colSpan={12}
                          style={{
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "text-align": "center",
                            "padding": "2px 0 2px 4px"
                        }}>
                          Ceritified that the particulars given above are true and correct
                        </td>
                          
                        </tr>
                      </tbody>

                      <tbody>
                      <tr>
                          <td 
                          colSpan={12}
                          style={{
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "text-align": "center",
                            "padding": "2px 0 2px 4px"
                        }}>
                          For
                        </td>
                        </tr>
                      </tbody>
                      <tbody>
                      <tr>
                          <td 
                          colSpan={12}
                          style={{
                            "height": "75px",
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "padding": "2px 0 2px 4px",
                            "text-align": "center",
                            "line-height": "50px"
                        }}>
                          LIBRA VALUERS
                        </td>
                        </tr>
                      </tbody>

                      <tbody>
                      <tr>
                          <td 
                          colSpan={12}
                          style={{
                            "color": "black",
                            "font-weight": "700",
                            "border": "2px solid black",
                            "text-align": "center",
                            "padding": "2px 0 2px 4px"
                        }}>
                          Authorised signatory
                        </td>
                        </tr>
                      </tbody>
                    </Table>
                    </Col>
                  </Row>

                      <tbody>
                        <td>
                          <tr></tr>
                        </td>
                      </tbody>


                  <Divider className="pt-2" />

                 
                </Form>
              );
            }}
          </Formik>
        </ModalBody>
                      </div>
                  <Row>
                    <Col>
                    <ul><li>
                    Mail Shoot On
                    <Switch
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
      />
      Mail Shoot Off
      </li></ul>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                    <ul><li>
                    Digital Sign &nbsp;&nbsp;&nbsp;&nbsp;
                    <Switch
      checked={checked2}
      onChange={handleChange2}
      inputProps={{ 'aria-label': 'controlled' }}
      />
     Without Digital Sign
      </li></ul>
                    </Col>
                  </Row>

                  <Row className="pt-4 pd-4">
                    <Col md={6}>
                      <Button
                        color="success"
                        variant="contained"
                        // disabled={formProps.isSubmitting}
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
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    paymentMaster: state.paymentMaster,
    finalBills: state.finalBills,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    billsPostData: (data, title) => dispatch(billsPostData(data, title)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreditNote);
