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

import LV from "../../../../assets/libra_logo1.png";
import TB from "../../../../assets/topbanner.jpeg";

//*Actions
import { billsPostData2 } from "../../../../Redux/Creators/BIllCreators";
import { getBranchesPage } from "../../../../Redux/Creators/BranchesCreators";

function CreateBill2(props) {
  console.log("createbill2 props", props.data.selected);
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const [pageSize, setPageSize] = React.useState(100000);

  const fetchData = () => {
    const token = props.login?.login?.token;

    // console.log("page", page);
    let pageno = 1;
    // console.log("pageno", pageno);
    let data = {
      pageno: pageno,
      pageSize: pageSize,
      token: token,
    };
    props.getBranchesPage(data);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  let payement = props.branches?.isLoading
  ? []
  : props.branches.branches?.data?.find(function(element) {
    return element.id == props.data.selected[0].branch_id;
  });

  const formatDate = (inputString) => {
    const dateObj = new Date(inputString);
    const monthYearString = dateObj.toLocaleString('default', { month: 'long', year: 'numeric' });
    return monthYearString;
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
            id: bill?.id,
            branch_id: bill?.branch_id,
            final_value: values?.final_value,
            verticals: bill?.vertical_id,
            product: bill?.product_id,
            rate: bill?.rate,
          }))
        : [];

    let data = {
      // token: token,
      details: billDetails,
      bill_status: values.bill_status,
      // final_value: values.final_value,
      grand_total: values.grand_total,
      tds_amount: values.tds_amount,
      net_amount_receivable: values.net_amount_receivable,
      bank_id: values.bank_id,
      gst: values.gst,

      cgst: values.cgst,
      gst_total: values.gst_total,
      payement_id: payement?.payement_id,
      created_date: values.created_date,
      // user_id:props?.login?.login?.user?.id
    };
    console.log(payement,"payement",payement?.payement_id)

    console.log("data", data);

    const title = "Succssfully Created The Bills!";

    props.billsPostData2(data, title,token);
    setSubmitting(true);
    setModal(false);
  };

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
        Create
      </Button>

      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Create Bill</strong>
          </Typography>
        </ModalHeader>
        <Divider />
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
              bank_id: props?.data?.selected[0]?.bank_id,
              payement_id: "",
              created_date: moment().format("YYYY-MM-DD"),
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              // payement_id: Yup.string().required("Payment Account is required"),
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
                  {/* <Row className="pb-3">
                    <Col md={12} className="pb-4">
                      <Autocomplete
                        id="contact-autocomplete"
                        options={paymentProps.options}
                        getOptionLabel={(payment) =>
                          payment?.account_name + ` (${payment?.account_no})`
                        }
                        onChange={(e, value) =>
                          formProps.setFieldValue(
                            "payement_id",
                            value?.id || ""
                          )
                        }
                        onOpen={formProps.handleBlur}
                        includeInputInList
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={Boolean(
                              formProps.touched.payement_id &&
                                formProps.errors.payement_id
                            )}
                            fullWidth
                            helperText={
                              formProps.touched.payement_id &&
                              formProps.errors.payement_id
                            }
                            label="Account"
                            name="payement_id"
                            variant="outlined"
                          />
                        )}
                      />
                    </Col>
                  </Row> */}

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
                            {/* {props?.data?.raw_bills[0]?.final_value} */}
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
                            {formProps.values.grand_total}
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

                        {billGroupBy[0]?.data?.map((rawBills, index) => (
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
                              {rawBills?.customer_name}
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
                              {rawBills?.bank_name}
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
                              {rawBills?.branch_name}
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
                              {rawBills?.postal_address}
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
                              {rawBills?.verticals}
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
                              {rawBills?.product}
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
    paymentMaster: state.paymentMaster,
    branches: state.branches,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    billsPostData2: (data, title,token) => dispatch(billsPostData2(data, title,token)),
    getBranchesPage: (data) => dispatch(getBranchesPage(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateBill2);
