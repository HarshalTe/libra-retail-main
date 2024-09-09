import React, { useEffect } from "react";
import { connect } from "react-redux";
import Bottom from "./Bottom";
import "./Report1.css";
import printJS from "print-js";
import TextField from "@material-ui/core/TextField";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Divider, Typography } from "@mui/material";
import { Button } from "reactstrap";
import Logo from "../../../../../assets/topbanner.jpeg";
import SignupLogo from "../../../../../assets/signup.png";
import Map from "assets/map.png";
import write from "assets/write.png";
import Home1 from "assets/home.png";
import Home2 from "assets/home2.png";
import Home3 from "assets/home3.png";
import Home4 from "assets/home4.png";
import Home5 from "assets/home5.png";
import Home6 from "assets/home6.png";
import Home7 from "assets/home7.png";
import Home8 from "assets/home8.png";
import ReportCustomTextField from "../../../../../components/MuiComponents/ReportCustomTextField";
import QrCodeGeoTag from "./QrCodeGeoTag";
import CompleteButton from "./CompleteButton";
import CompleteBtnLevels from "./CompleteBtnLevels";
import MapImage from "./MapImage";
import { getdropdownDetailsPage } from "../../../../../Redux/Creators/DropdownDetailsCreators";
export const ReportContext = React.createContext();

function KogtaFinantial(props) {
  const [print, setPrint] = React.useState(false);
  // const file_1_status = 0
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10000);

  const printPdf = () => {
    printJS({
      printable: "htmlToPdf2",
      type: "html",
      scanStyles: true,
      targetStyles: "[*]",
      font_size: "11pt",
      maxWidth: 1080,
      base64: true,
      honorMarginPadding: false,
      style: "@page {  options: footers;  }",
    });
  };

  React.useEffect(() => {
    fetchData(page);
  }, []);

  const fetchData = (page) => {
    const token = props.login?.login?.token;
    // setPage(page + 1);
    console.log("page", page);
    let pageno = page + 1;
    console.log("pageno", pageno);
    let data = {
      pageno: pageno,
      pageSize: rowsPerPage,
      token: token,
    };
    props.getdropdownDetailsPage(data);
  };

  return (
    <ReportContext.Provider value={{ print }}>
      <div>
        <div className="d-flex justify-content-end">
          <Button
            color="success"
            onClick={printPdf}
            className="print-button w-20  m-3"
            // disabled={!print}
          >
            <i className="fa fa-save mr-2" />
            Print Report
          </Button>
        </div>
        <Formik
          initialValues={{
            text_area: props?.property?.property?.annexure?.text_area,
            surname: props?.property?.property?.surname,
            report_date: "12-05-2022",
            customer_name: props?.property?.property?.customer_name ?? "",
            prospect_no: "",
            type_of_loan: "LAP",
            property_address: props?.property?.property?.postal_address,
            owner_contact: props?.property?.property?.legal_address,
            tenant_name: "",
            technical_document: "Documents Not Provided",
            landmark: props?.property?.property?.nearby_landmark,
            file_1_status: "1",
          }}
          // onSubmit={handleSubmit}
          validationSchema={Yup.object().shape({})}
        >
          {(formProps) => {
            return (
              <Form>
                <Typography variant={"h5"}>Report New</Typography>
                <div
                  id="htmlToPdf2"
                  style={{ color: "black" }}
                  className={print ? "f-10 font-family" : "f-14 font-family"}
                >
                  <div className="logo">
                    <img
                      src={Logo}
                      alt="Logo"
                      className="logo-img"
                      width="100%"
                    />
                  </div>
                  <div className="test text-center">
                    <h1>Name of Agency :Libra valuers</h1>
                  </div>

                  <section className="header-details">
                    <div className="test d-flex">
                      <div className="w-50 p-1 test-r m-0">
                        <b>KOGTA FINANCIAL INDIA LIMITED</b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <b>Date of Initiation</b>
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test text-center">
                      <b>Technical Report</b>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0 text-center">
                        <b>Loan Application No.</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <b>Product</b>
                      </div>
                      <div className="w-40 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0 text-center">
                        <b>Date of Inspection / Site visit</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <b>Nearest Landmark</b>
                      </div>
                      <div className="w-40 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0 text-center">
                        <b>Name of the Customer/ Applicant /Co applicant</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <b>Contact no. of customer</b>
                      </div>
                      <div className="w-40 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0 text-center">
                        <b>Name of owner / seller</b>
                      </div>
                      <div className="w-70 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <b>Address of the property being appraised</b>
                      </div>
                      <div className="w-90">
                        <div className="d-flex">
                          <div className="test-r w-15 p-1  pl-2">
                            <b>As per Document</b>
                          </div>
                          <div className="test-t w-85 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                        </div>
                        <div className="d-flex">
                          <div className="test-t test-r w-15 p-1  pl-2">
                            <b>As per actual or postal</b>
                          </div>
                          <div className="test-t w-85 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="document-provided-institute">
                    <div className="test text-center">
                      <b>Documents Provided by Institute</b>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b>Document Description</b>
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r text-center">
                        <b>Available yes/No</b>
                      </div>
                      <div className="w-40 text-left p-1 pl-2 test-r text-center">
                        <b>Document Number and Approval Number</b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b>Sale Deed/Release deed/sale agreement</b>
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-40 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b>Allotment letter</b>
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-40 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b>7/12 extract/Patta/Land record</b>
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-40 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b>Conversion Certificate</b>
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-40 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b>Property Tax receipts</b>
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-40 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b>Sanction Plan</b>
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-40 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b>Commencent Certificate</b>
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-40 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b>OC/BCC</b>
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-40 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b>Other documents</b>
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-40 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                  </section>
                  <section className="dimensions">
                    <div className="test text-center">
                      <b>Dimensions</b>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b>Description</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <b>North</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <b>South</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>East</b>
                      </div>
                      <div className="w-25 text-left p-1 pl-2 test-r text-center">
                        <b>West</b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b>As per Documents</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-25 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b>As per Documents</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-25 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b>As per Site / Actual</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-25 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                  </section>
                  <section className="boundaries-details">
                    <div className="test text-center">
                      <b>Boundaries details</b>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b>Description</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <b>North</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <b>South</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>East</b>
                      </div>
                      <div className="w-25 text-left p-1 pl-2 test-r text-center">
                        <b>West</b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b>As per Documents</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-25 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b>As per Site / Actual</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-25 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b>Boundaries Matching </b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <b>Mismatch Remarks</b>
                      </div>
                      <div className="w-40 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b>Status of Land Holding - LeaseHold or Freehold</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <b>Developed By(Authority)</b>
                      </div>
                      <div className="w-40 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b>Type of Property As per document</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <b>Type of property at site</b>
                      </div>
                      <div className="w-40 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b>
                          Location/Zoning as per Master Plan -
                          (Resi/Comm/Mixed/Industrial)
                        </b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <b>Development of the vicinity in %</b>
                      </div>
                      <div className="w-40 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b>Distance from nearest bus stand</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <b>No. of houses in Village in Rural cases</b>
                      </div>
                      <div className="w-40 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b>Approach Road Width</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>Approach road typeCC/Bitumen /Gravel /Kachha</b>
                      </div>
                      <div className="w-40 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b>Govt road or Private passage </b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>Plot Demarcation available</b>
                      </div>
                      <div className="w-40 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b>
                          Identified Through ( (legal docs / Site Map/ customer
                          /local enquiry)
                        </b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>Within Corporation / Urban Development / GP Limit</b>
                      </div>
                      <div className="w-40 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b>
                          Type of Structure (RCC/LB/truss roof/Stone roof/ACC or
                          Tin shed/tile roof/ Mud house)
                        </b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>
                          Person Met at site and his relationship with owner
                        </b>
                      </div>
                      <div className="w-40 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b>Occupancy status</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>Occupied since</b>
                      </div>
                      <div className="w-40 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b>Age of the Property in yrs</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>Residual Life of Property in yrs</b>
                      </div>
                      <div className="w-40 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b>
                          Availability of basic amenities like - electricity,
                          water etc.
                        </b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>Maintenance level of building Good/Average /poor </b>
                      </div>
                      <div className="w-40 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b>Property situated near nala/open canal</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>Distance from Nala/Open Canal</b>
                      </div>
                      <div className="w-40 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b>
                          Distance from High Tension Line if HT line is
                          witnessed
                        </b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>Seismic Zone Classification</b>
                      </div>
                      <div className="w-40 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b>Locality Type</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>Marketabiliy</b>
                      </div>
                      <div className="w-40 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b>Market Feedback</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        <b>
                          Any hazard in the event of Earthquakes/ land slide
                          /Cyclone /Flood /chemical hazardous / Fire
                          Hazardous/Tsunamis etc as per guideline of NDMA
                        </b>
                      </div>
                      <div className="w-25 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                  </section>
                  <section className="building-parameters">
                    <div className="test text-center">
                      <b>Building Parameters</b>
                    </div>
                    <div className="test d-flex">
                      <div className="w-15 p-1 test-r m-0">
                        <b>
                          Is the plan in line with the local authorithy norms
                        </b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>Number of floors permitted</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>Number of floors constructed</b>
                      </div>
                      <div className="w-25 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-15 p-1 test-r m-0">
                        <b>FSI achieved</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>Risk of demolition</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>Chances of Compounding</b>
                      </div>
                      <div className="w-25 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-15 p-1 test-r m-0">
                        <b>Setback Deviation (%)</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>Vertical Deviation</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>Any extension in future?</b>
                      </div>
                      <div className="w-25 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-100 p-2"></div>
                    </div>
                  </section>
                  <section className="valuation-of-property">
                    <div className="test text-center">
                      <b>
                        Valuation of Property ( Fair Market Valuation /Distress
                        Valuation){" "}
                      </b>
                    </div>
                    <div className="test d-flex">
                      <div className="w-15 p-1 test-r m-0">
                        <b>Area Type</b>
                      </div>
                      <div className="w-20 text-left p-1 test-r">
                        <b>As per Plan/deed (in sqft)</b>
                      </div>
                      <div className="w-15 text-left p-1 test-r">
                        <b>As per Site (In sqft)</b>
                      </div>
                      <div className="w-15 text-left p-1 test-r">
                        <b>Permissible (In sqft)</b>
                      </div>
                      <div className="w-10 text-left p-1 test-r">
                        <b>Rate/Sqft</b>
                      </div>
                      <div className="w-10 text-left p-1 test-r">
                        <b>% completed</b>
                      </div>
                      <div className="w-15 text-left p-1 test-r">
                        <b>Valuation INR</b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-15 p-1 test-r m-0">
                        <b>Plot Area/UDS</b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-10 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-10 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-15 p-1 test-r m-0">
                        <b>Cost of Const. Of G.F.</b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-10 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-10 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-15 p-1 test-r m-0">
                        <b>Cost of Const. Of F.F.</b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-10 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-10 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-15 p-1 test-r m-0">
                        <b>Cost of Const. Of G.F.</b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-10 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-10 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-15 p-1 test-r m-0">
                        <b>Carpet Area</b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-10 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-10 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-15 p-1 test-r m-0">
                        <b>Area considered for Valuation (CA / BUA / SUBA)</b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-10 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-10 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-15 p-1 test-r m-0">
                        <b>
                          Fair Market Value(INR) @ Present Stage of Construction
                        </b>
                      </div>
                      <div className="w-85 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-15 p-1 test-r m-0">
                        <b>Reliazable Value (90% of MV)</b>
                      </div>
                      <div className="w-85 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-15 p-1 test-r m-0">
                        <b>Forced sale Value(INR) at 70%</b>
                      </div>
                      <div className="w-85 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-15 text-left test-r p-2">
                        <h3 className="mt-4">Price confirm from</h3>
                      </div>
                      <div className="w-85">
                        <div className="d-flex test">
                          <div className="test-r p-2 w-70">
                            <b>Local Property Dealer/ Local Person Name </b>
                          </div>
                          <div className="w-30 p-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                        </div>
                        <div className="d-flex test">
                          <div className="test-r p-2 w-70">
                            <b>Local Dealer No./ Local Dealer Shop Name </b>
                          </div>
                          <div className="w-30 p-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                        </div>
                        <div className="d-flex test">
                          <div className="test-r p-2 w-70">
                            <b>Value Rate According To Dealer</b>
                          </div>
                          <div className="w-30 p-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="as-per-govt">
                    <div className="test text-center">
                      <b>As per govt .value of property</b>
                    </div>
                    <div className="test d-flex">
                      <div className="w-15 p-1 test-r m-0">
                        <b>
                          Government Guidline/Circle Rate for Land(Rs Per Sq.ft){" "}
                        </b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>Land Value as per Govt Rate (Rs.)</b>
                      </div>
                      <div className="w-50 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-15 p-1 test-r m-0">
                        <b>
                          Government Guidline/Circle Rate for Building (Rs Per
                          Sq.ft)
                        </b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>Flat /Apartment Value as Per Government Rate (Rs)</b>
                      </div>
                      <div className="w-50 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-15 p-1 test-r m-0">
                        <b>Total Valution of Property as Per Government Rate</b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>Sub Registrar office & Location Name</b>
                      </div>
                      <div className="w-50 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                  </section>
                  <section className="site-plan">
                    <div className="test text-center">
                      <b>Site Plan</b>
                    </div>
                    <div className="test d-flex">
                      <div className="w-35 p-1 test-r m-0 text-center">
                        <b>As per Documents</b>
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r text-center">
                        <b>As per Actual</b>
                      </div>
                      <div className="w-35 text-left p-1 pl-2 test-r text-center">
                        <b>According to Local Bye laws</b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-35 p-1 test-r m-0 text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-35 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test text-center">
                      <b>Utility connection</b>
                    </div>
                    <div className="test d-flex">
                      <div className="w-15 p-1 test-r m-0">
                        <b>Electricity bill in mention Meter no.</b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>On site available meter no.</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>Both no. are matched </b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                  </section>
                  <section className="remarks">
                    <div className="test">
                      <b>Remarks:</b>
                    </div>
                    <div className="test d-flex">
                      <div className="w-100 p-1">
                        <ol>
                          <li>
                            The property under consideration is 1 BHK Flat
                            located on 9th Floor in Ground + 15th storied
                            residential building with 1 Lift.
                          </li>
                          <li>
                            As per site observation access to the building and
                            road width is 10 feet approx.
                          </li>
                          <li>
                            We have received Xerox Copies of Part OC SRA
                            Allotment Letter Share Certificate & Electricity
                            Bill are made available for verification.
                          </li>
                          <li>
                            At the time of visit we have observed that property
                            was Tenant occupied by Mr. Shafi Shaikh since last 3
                            Years.
                          </li>
                          <li>
                            During our visit society name board was not
                            observed.
                          </li>
                          <li>
                            SRA Allotment Letter made in the name of Mr. Ganesh
                            Gopi Jha Dated 19/05/2021 made available for
                            verification.
                          </li>
                          <li>
                            Unit boundaries are not mentioned in the provided
                            documents hence please check at your legal end
                            before disbursement.
                          </li>
                          <li>
                            We have considered 30% Loading on Carpet Area as per
                            measurement to Derive SBUA to furnish the valuation
                            report.
                          </li>
                        </ol>
                      </div>
                    </div>
                    <div className="test text-center">
                      <b>Valuer Certification</b>
                    </div>
                    <div className="test d-flex">
                      <div className="w-15 p-1 test-r m-0">
                        <b>Date of Visit </b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>Date of Report Submission </b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r"></div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-15 p-1 test-r m-0">
                        <b>Name of Engineer Visited th property </b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>Authorised Signatory Name & Signature </b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r"></div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-15 p-1 test-r m-0">
                        <b>Place </b>
                      </div>
                      <div className="w-85 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-100 p-1 test-r m-0">
                        <p>Declaration: </p>
                        <br />
                        <br />
                        <p>
                          Our representative has visited this site. I/We have
                          not verified the title deeds of the properties with
                          the records of the registrar's office as this is
                          beyond the agreed scope of work. Assumptions are made
                          to the best of our knowledge and belief. Reliance is
                          based on the information furnished to us by the
                          identifier AND/OR client. The valuer shall not be
                          responsible for the matters of legal nature that
                          affects the value and opinion expressed by us. where a
                          sketched plan is attached to this report,it does not
                          purport to represent accurate architectural
                          plans.Sketch plans and photographs are provided as
                          general illustrations only. Documents furnished to us
                          are returned to the client along with the report. We
                          cannot preserve them. Fair market value indicated in
                          the report is an opinion of the value prevailing on
                          the date of the said report and is based on market
                          feedback on values of similar properties. Client is
                          free to obtain other independent opinions on the same.
                          Fair, market value of such properties / localities may
                          increase or decrease, depending on the future market
                          conditions & scenarios. value varies with the purpose
                          & date. This report is not to be referred if the
                          purpose is different other than mentioned.No
                          structural survey was conducted by us as it is not in
                          our scope of work. We hereby declare, “The information
                          furnished above is true and correct to the best of our
                          knowledge and belief. We have no direct or indirect
                          interest in the assets valued.
                        </p>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-100 p-1 test-r m-0">
                        <b>
                          Location cum Route map showing property Boundaries
                          from Nearby Landmarks with approx distance)
                        </b>
                      </div>
                      <div className="test d-flex">
                        <div className="w-30 p-1 test-r m-0">
                          <b>Coordinates</b>
                        </div>
                        <div className="w-15 text-left p-1 pl-2 test-r">
                          <b>Latitude </b>
                        </div>
                        <div className="w-20 text-left p-1 pl-2 test-r">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-15 text-left p-1 pl-2 test-r">
                          <b>Longitude</b>
                        </div>

                        <div className="w-20 text-left p-1 pl-2 test-r">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>
                    </div>
                  </section>
                  <Bottom></Bottom>
                </div>
              </Form>
            );
          }}
        </Formik>
        <div className="d-flex justify-content-between">
          <Button
            color="success"
            onClick={printPdf}
            className="print-button w-20  m-3"
            // disabled={!print}
          >
            <i className="fa fa-save mr-2" />
            Print Report
          </Button>
          {props?.login?.login?.user?.role == "Level-3" ||
          props?.login?.login?.user?.role == "admin" ? (
            <CompleteButton />
          ) : (
            <CompleteBtnLevels />
          )}
        </div>
      </div>
    </ReportContext.Provider>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    property: state.property,
    dropdowns: state.dropdowns,
    dropdownDetails: state.dropdownDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getPropertiesPage: (data) => dispatch(getPropertiesPage(data)),
    getdropdownDetailsPage: (data) => dispatch(getdropdownDetailsPage(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(KogtaFinantial);
