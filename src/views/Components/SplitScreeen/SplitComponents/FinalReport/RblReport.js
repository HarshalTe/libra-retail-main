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

function RblReport(props) {
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
                    <h2>RBL BANK TECHNICAL APPRAISAL REPORT</h2>
                  </div>

                  <div className="loan-application-details">
                    <div className="test d-flex">
                      <div className="w-100 text-center">
                        <b>LOAN APPLICATION DETAILS</b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">
                        <b>RBL BRANCH NAME</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <b>RBL Bank Ltd - Goregaon </b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <b>APPLICATION NO</b>
                      </div>
                      <div className="w-15 p-1 test-r m-0">
                        <b>10000 026000</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>LOAN TYPE</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>HL</b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">
                        <b>NAME OF APPLICANT (S) </b>
                      </div>
                      <div className="w-50 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r m-0">
                        <b>
                          NAME & NUMBER OF CONTACT PERSON FOR PROPERTY VISIT
                        </b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="valuation-assignment-details">
                    <div className="test text-center">
                      <b>VALUATION ASSIGNMENT DETAILS</b>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">
                        <b>DATE OF INITIATION</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <b>VALUATION REFERENCE NO </b>
                      </div>
                      <div className="w-15 p-1 test-r m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>PURPOSE OF VALUATION</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">
                        <b>DATE OF VISIT</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <b>PROPERTY VISITED BY (NAME)</b>
                      </div>
                      <div className="w-15 p-1 test-r m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>VALUATION METHOD ADOPTED</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">
                        <b>DATE OF VALUATION </b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <b>REPORT PREPARED BY (NAME)</b>
                      </div>
                      <div className="w-45 p-1 test-r m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">
                        <b>WHETHER SAME PROPERTY VALUED EARLIER ?</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <b>IF YES, DATE AND BRIEF OF EARLIER ASSINMENT </b>
                      </div>
                      <div className="w-45 p-1 test-r m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">
                        <b>HOUSE/FLAT NO.</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <b>FLOOR NO.</b>
                      </div>
                      <div className="w-15 p-1 test-r m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>WING NAME & NO.</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">
                        <b>BUILDING NAME & NO.</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <b>PROJECT NAME/SOCIETY NAME</b>
                      </div>
                      <div className="w-15 p-1 test-r m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>PLOT NO.</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">
                        <b>SUERVEY NO.</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <b>
                          STAGE/SECTOR/
                          <br />
                          WARD NO.
                        </b>
                      </div>
                      <div className="w-15 p-1 test-r m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>STREET NAME &/NO.</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">
                        <b>VILLAGE/LOCATION </b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <b>LANDMARK 1</b>
                      </div>
                      <div className="w-15 p-1 test-r m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>LANDMARK 2</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">
                        <b>PIN CODE</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <b>PIN CODE AREA</b>
                      </div>
                      <div className="w-15 p-1 test-r m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>CITY / TALUKA/TOWN</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">
                        <b>DISTRICT</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <b>LAT, LONG VALUE (NE) </b>
                      </div>
                      <div className="w-45 p-1 test-r m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">
                        <b>STATE</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <b>NEAREST RBL BANK LOCATION</b>
                      </div>
                      <div className="w-15 p-1 test-r m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>DISTANCE FROM RBL BANK LOCATION (KMS.)</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="address-details">
                    <div className="test text-center">
                      <b>ADDRESS DETAILS AS PER PROPERTY VISIT</b>
                    </div>
                    <div className="test d-flex">
                      <div className="w-35 p-1 test-r m-0">
                        <b>ADDRESS AS PER PROPERTY VISIT</b>
                      </div>
                      <div className="w-65 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test text-center">
                      <b>ADDRESS DETAILS AS PER LEGAL DOCUMENTS</b>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">
                        <b>ADDRESS AS PER DOC</b>
                      </div>
                      <div className="w-80 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">
                        <b>LEGAL DOCUMENT(S) REFERRED FOR ADDRESS</b>
                      </div>
                      <div className="w-80 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="boundaries-comment-identification">
                    <div className="test text-center">
                      <b>BOUNDARIES & COMMENT ON IDENTIFICATION</b>
                    </div>
                    <div className="d-flex">
                      <div className="w-20 p-1 border-ltr m-0">
                        <b>DIRECTIONS</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 border-ltr text-center">
                        <b>NORTH</b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 border-ltr">
                        <b>SOUTH</b>
                      </div>
                      <div className="w-15 p-1 border-ltr m-0">
                        <b>EAST</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 border-ltr">
                        <b>WEST</b>
                      </div>
                      <div className="w-15 text-left test-t test-r p-1 pl-2"></div>
                    </div>
                    <div className="d-flex">
                      <div className="w-20 p-1 border-ltr m-0">
                        <b>AS PER APPROVED PLAN</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 border-ltr text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 border-ltr">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 border-ltr m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 border-ltr">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left test-r p-1 pl-2"></div>
                    </div>
                    <div className="d-flex">
                      <div className="w-20 p-1 border-ltr m-0">
                        <b>AS PER APPROVED PLAN</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 border-ltr text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 border-ltr">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 border-ltr m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 border-ltr">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left test-r p-1 pl-2"></div>
                    </div>
                    <div className="d-flex">
                      <div className="w-20 p-1 border-ltr m-0">
                        <b>AS PER SITE</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 border-ltr text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 border-ltr">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 border-ltr m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 border-ltr">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left test-r p-1 pl-2"></div>
                    </div>
                    <div className="d-flex">
                      <div className="w-20 p-1 border-ltr m-0">
                        <b>AS PER LEGAL DOCUMENTS</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 border-ltr text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 border-ltr">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 border-ltr m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 border-ltr">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left test-r p-1 pl-2"></div>
                    </div>
                    <div className="d-flex">
                      <div className="w-20 p-1 border-ltr m-0">
                        <b>BOUNDARIES MATCHING ? </b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 border-ltr text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 border-ltr">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 border-ltr m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 border-ltr">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left test-r test-b p-1 pl-2"></div>
                    </div>
                    <div className="d-flex">
                      <div className="w-20 p-1 border-ltr m-0">
                        <b>COMMENT IF DISCREPANCY IN BOUNDARY MATCHING</b>
                      </div>
                      <div className="w-80 text-left p-1 pl-2 border-ltr text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="ownership-details">
                    <div className="test d-flex">
                      <div className="w-100 text-center">
                        <b>OWNERSHIP DETAILS</b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">
                        <b>PRESENT OWNER</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <b>PROPOSED OWNERS</b>
                      </div>
                      <div className="w-45 p-1 test-r m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">
                        <b>WHETHER SELLER IS BUILDER/DEVELOPER</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <b>SELLER NAME(s) </b>
                      </div>
                      <div className="w-45 p-1 test-r m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">
                        <b>WHETHER PROPERTY LEASEHOLD OR FREEHOLD</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <b>IF LEASEHOLD, NAME OF THE LEASOR, LEASE TENURE</b>
                      </div>
                      <div className="w-45 p-1 test-r m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">
                        <b>OCCUPANCY STATUS</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <b>
                          DETAILS OF OCCUPANT(S) (NAME & TENURE) AS PER VISIT
                          INFO
                        </b>
                      </div>
                      <div className="w-45 p-1 test-r m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="general-details">
                    <div className="test d-flex">
                      <div className="w-100 text-center">
                        <b>GENERAL DETAILS</b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">
                        <b>MUNICIPAL LIMIT</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <b>MUNICIPAL AUTHORITY (NAME)</b>
                      </div>
                      <div className="w-15 p-1 test-r m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>YEAR OF CONSTRUCTION</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">
                        <b>AGE OF PROPERTY (YEARS)</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <b>RESIDUAL AGE OF PROPERTY (YEARS) </b>
                      </div>
                      <div className="w-15 p-1 test-r m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>PERSON MET AT SITE</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">
                        <b>APPROACH ROAD TO PROPERTY</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <b>TYPE OF APPROACH ROAD</b>
                      </div>
                      <div className="w-15 p-1 test-r m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>WIDTH OF APPROACH ROAD (MTRS)</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">
                        <b>CLASS OF LOCALITY </b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <b>
                          PROPERTY FURNISHED
                          <br />
                          /UNFURNISHED{" "}
                        </b>
                      </div>
                      <div className="w-15 p-1 test-r m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>
                          PROPERTY/
                          <br />
                          DWELLING UNIT TYPE
                        </b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">
                        <b>NATURE OF BUILDING/WING</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <b>STRUCTURE TYPE </b>
                      </div>
                      <div className="w-15 p-1 test-r m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>STRUCTURALLY FIT</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                  </div>
                  <section className="critical-parameters-check">
                    <div className="test d-flex">
                      <div className="w-100 text-center">
                        <b>CRITICAL PARAMETERS CHECK</b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">
                        <b>ZONING AS PER DEVELOPMENT PLAN</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <b>CURRENT PROPERTY USAGE</b>
                      </div>
                      <div className="w-15 p-1 test-r m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>APPROVED PROPERTY USAGE</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">
                        <b>DEVIATIONS TO APPROVED PLAN</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <b>DETAILS IN CASE DEVIATION TO APPROVED PLAN</b>
                      </div>
                      <div className="w-45 p-1 test-r m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">
                        <b>
                          PROPERTY IN CEILING
                          <br />
                          /UNAUTHORISED LIST OF GOVT/ AUTHORITY
                        </b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <b>DEMOLITION RISK</b>
                      </div>
                      <div className="w-15 p-1 test-r m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>HABITATION % WITHIN 500 MTRS AROUND PROPERTY</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-100 p-1 test-r m-0">NA</div>
                    </div>
                  </section>
                  <section className="social-infra-project-specs">
                    <div className="test d-flex">
                      <div className="w-100 text-center">
                        <b>SOCIAL INFRA, INTERNAL AND PROJECT SPECS</b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-35 p-1 test-r m-0">
                        <b>
                          PRESENCE OF SOCIAL INFRASTRUCTURE SCHOOL, BANK,
                          HOSPITAL, MARKET, BUS STOP, ETC
                        </b>
                      </div>
                      <div className="w-65 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-35 p-1 test-r m-0">
                        <b>
                          INTERNAL PROPERTY SPECS STRUCTURAL ELEMENTS, FITTINGS
                          & FINISH
                        </b>
                      </div>
                      <div className="w-65 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-35 p-1 test-r m-0">
                        <b>
                          PROJECT AMENITIES CLUBHOUSE, GYM, GARDEN, POOL, ETC
                        </b>
                      </div>
                      <div className="w-65 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                  </section>
                  <section className="area-and-valuation">
                    <div className="test text-center">
                      <b>AREA & VALUATION DETAILS</b>
                    </div>
                    <div className="test text-center">
                      <b>APARTMENT/FLAT/UNITS </b>
                    </div>
                    <div className="d-flex">
                      <div className="w-20 text-left test-l test-t test-r p-1 pl-2"></div>
                      <div className="w-15 text-left p-1 pl-2 border-ltr text-center">
                        <b>AREA TYPE VERIFIED FROM</b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 border-ltr text-center">
                        <b>CARPET AREA (C.A) In sq.fts</b>
                      </div>
                      <div className="w-15 p-1 border-ltr m-0">
                        <b>BUILT UP AREA (B.U.A) In sq.fts</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 border-ltr">
                        <b>SALE/SUPER BUILT UP AREA (S.A) - In sq.fts</b>
                      </div>
                      <div className="w-15 text-left test-t test-r p-1 pl-2"></div>
                    </div>
                    <div className="d-flex">
                      <div className="w-20 text-left test-l test-r p-1 pl-2"></div>
                      <div className="w-15 text-left p-1 pl-2 border-ltr text-center">
                        Document
                      </div>
                      <div className="w-20 text-left p-1 pl-2 border-ltr">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 border-ltr m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 border-ltr">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left test-r p-1 pl-2"></div>
                    </div>
                    <div className="d-flex">
                      <div className="w-20 text-left test-l test-r p-1 pl-2"></div>
                      <div className="w-15 text-left p-1 pl-2 border-ltr text-center">
                        Approved Plan
                      </div>
                      <div className="w-20 text-left p-1 pl-2 border-ltr">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 border-ltr m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 border-ltr">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left test-r p-1 pl-2"></div>
                    </div>
                    <div className="d-flex">
                      <div className="w-20 text-left test-l test-r p-1 pl-2"></div>
                      <div className="w-15 text-left p-1 pl-2 border-ltr text-center">
                        Actual at Site
                      </div>
                      <div className="w-20 text-left p-1 pl-2 border-ltr">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 border-ltr m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 border-ltr">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left test-r p-1 pl-2"></div>
                    </div>
                    <div className="d-flex">
                      <div className="w-20 text-left test-l test-r p-1 pl-2"></div>
                      <div className="w-15 text-left p-1 pl-2 border-ltr text-center">
                        Area Type adopted for valuation (Select any one only -
                        C.A/B.U.A/S.A)
                      </div>
                      <div className="w-20 text-left p-1 pl-2 border-ltr">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 border-ltr m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 border-ltr">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left test-r p-1 pl-2"></div>
                    </div>
                    <div className="d-flex">
                      <div className="w-20 text-left test-l test-r p-1 pl-2"></div>
                      <div className="w-15 text-left p-1 pl-2 border-ltr text-center">
                        Area adopted for valuation in Sq.fts
                      </div>
                      <div className="w-20 text-left p-1 pl-2 border-ltr">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 border-ltr m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 border-ltr">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left test-r p-1 pl-2"></div>
                    </div>
                    <div className="d-flex">
                      <div className="w-20 text-left test-l test-r p-1 pl-2"></div>
                      <div className="w-15 text-left p-1 pl-2 border-ltr text-center">
                        <b>RATE per sq.ft </b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 border-ltr">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 border-ltr m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 border-ltr">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left test-r p-1 pl-2"></div>
                    </div>
                    <div className="d-flex">
                      <div className="w-20 text-left test-l test-r p-1 pl-2"></div>
                      <div className="w-15 text-left p-1 pl-2 border-ltr text-center">
                        <b>VALUE OF UNIT</b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 border-ltr">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 border-ltr m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 border-ltr">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left test-r p-1 pl-2"></div>
                    </div>
                    <div className="d-flex">
                      <div className="w-20 text-left test-l test-r p-1 pl-2"></div>
                      <div className="w-15 text-left p-1 pl-2 border-ltr text-center">
                        <b>(A) : VALUE OF UNIT RECOMMENDED</b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 border-ltr">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 border-ltr m-0">
                        <b>DETAILS OF UDS, IF ANY</b>
                      </div>
                      <div className="w-30 text-left p-1 pl-2 border-ltr">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">
                        <b>REMAKRS ON AREA & VALUATION</b>
                      </div>
                      <div className="w-80 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>

                      {/* <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div> */}
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center">
                        SR.NO.
                      </div>
                      <div className="w-65 text-left p-1 pl-2 test-r text-center">
                        AMENITY/IMROVEMENT DESCRIPTION
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        AMOUNT (Rs.)
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center">1</div>
                      <div className="w-65 text-left p-1 pl-2 test-r">
                        CAR PARK
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        0
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center"></div>
                      <div className="w-65 text-left p-1 pl-2 test-r text-center">
                        <b>TOTAL AMENITIES COST (B)</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        0
                      </div>
                    </div>
                  </section>
                  <section className="final-valuation-recommended">
                    <div className="test text-center">
                      <b>FINAL VALUATION RECOMMENDED</b>
                    </div>
                    <div className="d-flex">
                      <div className="w-20 text-left border-ltr p-1 pl-2">
                        VALUE OF UNIT RECOMMENDED
                      </div>
                      <div className="w-15 text-left p-1 pl-2 border-ltr text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 border-ltr text-center">
                        <b>(A)</b>
                      </div>
                      <div className="w-45 text-left test-t test-r p-1 pl-2"></div>
                    </div>
                    <div className="d-flex">
                      <div className="w-20 text-left border-ltr p-1 pl-2">
                        AMENITIES COST CONSIDERED
                      </div>
                      <div className="w-15 text-left p-1 pl-2 border-ltr text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 border-ltr text-center">
                        <b>(B)</b>
                      </div>
                      <div className="w-45 text-left test-b test-r p-1 pl-2"></div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">
                        <b>TOTAL FAIR MARKET VALUE (RS.) (A+B) </b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 p-1 test-r m-0">
                        <b>TOTAL FAIR MARKET VALUE (RS.) IN WORDS</b>
                      </div>
                      <div className="w-45 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">
                        <b>REALISABLE VALUE (RS.) (90% of MV) </b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 p-1 test-r m-0">
                        <b>DISTRESS VALUE (Rs.)(70% of MV)</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r text-center"></div>
                    </div>
                  </section>
                  <section className="rental-replacement">
                    <div className="test text-center">
                      <b>RENTAL & REPLACEMENT COST INFORMATION</b>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center">
                        <b>
                          GROSS MONTHLY RENTAL FOR SIMILAR PROPERTIES IN
                          LOCALITY IN (RS.)
                        </b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <b>GOVT GUIDELINE RATE Per sq.ft.</b>
                      </div>
                      <div className="w-15 p-1 test-r m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <b>REPLACEMENT COST (RS.) </b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                  </section>
                  <section className="floor-details">
                    <div className="test text-center">
                      <b>FLOOR DETAILS</b>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center"></div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <b>FLOORS</b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <b>APPROVED</b>
                      </div>
                      <div className="w-15 p-1 test-r m-0">
                        <b>ACTUAL / PLANNED</b>
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r text-center">
                        <b>
                          REMARKS ON NO. OF FLOORS, NOS OF UNITS PER FLOOR &
                          LIFT AVAILABILITY
                        </b>
                      </div>
                    </div>
                    <div className="d-flex">
                      <div className="w-20 text-left border-ltr p-1 pl-2 text-center">
                        (A)
                      </div>
                      <div className="w-15 text-left p-1 pl-2 border-ltr text-center">
                        NO OF BASEMENT(S)
                      </div>
                      <div className="w-20 text-left p-1 pl-2 border-ltr text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 border-ltr text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-30 text-left test-t test-r p-1 pl-2"></div>
                    </div>
                    <div className="d-flex">
                      <div className="w-20 text-left border-ltr p-1 pl-2 text-center">
                        (B)
                      </div>
                      <div className="w-15 text-left p-1 pl-2 border-ltr text-center">
                        NO OF GROUND /PARKING/STILT
                      </div>
                      <div className="w-20 text-left p-1 pl-2 border-ltr text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 border-ltr text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-30 text-left test-r p-1 pl-2"></div>
                    </div>
                    <div className="d-flex">
                      <div className="w-20 text-left border-ltr p-1 pl-2 text-center">
                        (C)
                      </div>
                      <div className="w-15 text-left p-1 pl-2 border-ltr text-center">
                        PODIUM(S)
                      </div>
                      <div className="w-20 text-left p-1 pl-2 border-ltr text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 border-ltr text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-30 text-left test-r p-1 pl-2"></div>
                    </div>
                    <div className="d-flex">
                      <div className="w-20 text-left border-ltr p-1 pl-2 text-center">
                        (D)
                      </div>
                      <div className="w-15 text-left p-1 pl-2 border-ltr text-center">
                        NO. OF UPPER FLOOR(S)
                      </div>
                      <div className="w-20 text-left p-1 pl-2 border-ltr text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 border-ltr text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-30 text-left test-r p-1 pl-2"></div>
                    </div>
                    <div className="d-flex">
                      <div className="w-20 text-left border-ltr p-1 pl-2 text-center">
                        <b>(E) = (A + B + C + D) </b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 border-ltr text-center">
                        <b>TOTAL NO. OF FLOOR(S) </b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 border-ltr text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 border-ltr text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-30 text-left test-b test-r p-1 pl-2"></div>
                    </div>
                  </section>
                  <section className="property-construction-stage">
                    <div className="test text-center">
                      <b>PROPERTY CONSTRUCTION STAGE </b>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center">na</div>
                      <div className="w-35 text-left p-1 pl-2 test-r text-center">
                        <b>PROPERTY COMPLETION STATUS</b>
                      </div>

                      <div className="w-15 p-1 test-r m-0">Completed</div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center"></div>
                      <div className="w-15 text-left p-1 pl-2 test-r"></div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center">
                        <b>SR.NO.</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <b>ACTIVITY</b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <b>ALLOTED % FOR ACTIVITY</b>
                      </div>
                      <div className="w-15 p-1 test-r m-0">
                        <b>ACTIVITY COMPLETED TILL FLOOR NUMBER</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <b>PRESENT COMPLETION (%)</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>
                          IF WORK IS BELOW PLINTH/GROUND LVL, MENTION % UPTO 35%
                        </b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center">1</div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        PLINTH
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r m-0">
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
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center">2</div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        R.C.C. ABOVE GROUND
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r m-0">
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
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center">3</div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        BRICKWORK
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r m-0">
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
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center">4</div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        INTERNAL PLASTER
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r m-0">
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
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center">5</div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        EXTERNAL PLASTER
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r m-0">
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
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center">6</div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        FLOORING
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r m-0">
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
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center">7</div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        PLUMBING & ELECTRIC WORK
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r m-0">
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
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center">8</div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        DOOR, WINDOW & PAINT
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r m-0">
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
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center">9</div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        FINISHING & POSSESSION
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r m-0">
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
                    </div>
                    <div className="test d-flex">
                      <div className="w-35 p-1 test-r m-0 text-center">
                        <b>TOTAL COMPLETION (%)</b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r m-0">
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
                    </div>
                    <div className="test d-flex">
                      <div className="w-100 p-1 test-r m-0 text-center">
                        <b>
                          : REMARKS ON CONSTRUCTION MATERIALS & LABOUR AVAILABLE
                          AT SITE, CONSTRUCTION PROGRESS PACE & DISBURSEMENT
                          RECOMMENDED:
                        </b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-100 p-1 test-r m-0">
                        <b>NA</b>
                      </div>
                    </div>
                  </section>
                  <section className="technical-documents">
                    <div className="test text-center">
                      <b>TECHNICAL DOCUMENTS DETAILS</b>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center">
                        <b>DOCUMENT NAME</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <b>APPROVING AUTHORITY</b>
                      </div>
                      <div className="w-65 text-left p-1 pl-2 test-r text-center">
                        <b>DETAILS OF APPROVAL</b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">
                        <b>APPROVED LAYOUT PLAN</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-65 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">
                        <b>APPROVED FLOOR PLAN</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-65 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">
                        <b>CONSTRUCTION / OCCUPATION PERMISSION</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-65 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">
                        <b>ESTIMATE - IF APPLICABLE</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-65 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">
                        <b>OTHER APPROVALS</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-65 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">
                        <b>OWNERSHIP DOC VERIFIED</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-65 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">
                        <b>REMARKS ON DOCUMENTS VERIFIED</b>
                      </div>

                      <div className="w-80 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                  </section>
                  <section className="final-observation-and-recommendation">
                    <div className="test text-center">
                      <b>FINAL OBSERVATION & RECOMMENDATION ON THE PROPERTY</b>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center">
                        <b>UNIT CONFIGURATION</b>
                      </div>
                      <div className="w-50 text-left p-1 pl-2 test-r text-center">
                        <b>1 RK</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <b>VIEW FROM PROPERTY</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <b>Road & Building View </b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center">
                        <b>BUIILDING APPERANCE</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <b>Average</b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <b>MAINTAINANCE OF BUILDING</b>
                      </div>
                      <div className="w-45 text-left p-1 pl-2 test-r text-center">
                        <b>Average</b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center">
                        <b>PROPERTY IDENTIFIED </b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <b>IDENTIFICATION CONFIRMED WITH</b>
                      </div>
                      <div className="w-45 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-35 p-1 test-r m-0 text-center">
                        <b>
                          CONSISTENCY WITH SURROUNDING PROPERTIES w.r.t NATURE,
                          USAGE, RATES & DEVIATIONS, IF ANY
                        </b>
                      </div>
                      <div className="w-65 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-35 p-1 test-r m-0 text-center">
                        <b>DEMAND, SUPPLY, AVAILABILITY OF SIMILAR PROPERTY</b>
                      </div>
                      <div className="w-65 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-35 p-1 test-r m-0 text-center">
                        <b>
                          WHETHER PROPERTY IS FROM APPROVED PROJECT LIST OF RBL
                          BANK ? PROVIDE DETAILS
                        </b>
                      </div>
                      <div className="w-65 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center">
                        <b>PROPERTY TECHNICALLY ACCEPTABLE ?</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <b>MARKETABILITY OF PROPERTY</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r text-center"></div>
                    </div>
                  </section>
                  <section className="remarks">
                    <div className="test">
                      <b>REMARKS ON THE PROPERTY</b>
                    </div>
                    <div className="test d-flex">
                      <div className="w-100 p-1 test-r m-0">
                        <ol>
                          <li>
                            The property under consideration is 1 RK Flat
                            located on Ground Floor in Ground + 3rd storied
                            residential building without lift.
                          </li>
                          <li>
                            As per site observation access road to the building
                            is narrow and road width is 10 feet approx.
                          </li>
                          <li>
                            We have received Xerox Copies Of Draft Agreement
                            Property Tax Receipt Share Certificate & OC are made
                            available for verification.
                          </li>
                          <li>
                            At the time of visit we have observed that property
                            was Vacant since last 4 Months.
                          </li>
                          <li>
                            As per society name board owner of the unit is Mrs.
                            Dr. Namita Jiwrajka.
                          </li>
                          <li>
                            Draft Agreement for sale made between Mrs. Dr.
                            Namita Rajesh Jiwrajka AND Mr. Sushil Kumar Pandey &
                            Mrs. Mina Devi Pandey are made available for
                            verification.
                          </li>
                          <li>
                            Unit boundaries are not mentioned in available
                            documents hence Please check at your legal end
                            before disbursement.
                          </li>
                          <li>
                            We have considered 20% loading on carpet area as per
                            Draft Agreement to furnish the report.
                          </li>
                        </ol>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-100 p-1 test-r m-0">
                        Declaration:-
                        <ul>
                          <li>
                            Our representative has visited this site. I/We have
                            not verified the title deeds of the properties with
                            the records of the registrar's office as this is
                            beyond the agreed scope of work.Assumptions are made
                            to the best of our knowledge and belief. Reliance is
                            based on the information furnished to us by the
                            identifier AND/OR client.
                          </li>
                          <li>
                            The valuer shall not be responsible for the matters
                            of legal nature that affects the value and opinion
                            expressed by us.
                          </li>
                          <li>
                            where a sketched plan is attached to this report,it
                            does not purport to represent accurate architectural
                            plans.Sketch plans and photographs are provided as
                            general illustrations only.Documents furnished to us
                            are returned to the client along with the report. We
                            cannot preserve them.
                          </li>
                          <li>
                            Fair market value indicated in the report is an
                            opinion of the value prevailing on the date of the
                            said report and is based on market feedback on
                            values of similar properties. Client is free to
                            obtain other independent opinions on the same. Fair,
                            market value of such properties / localities may
                            increase or decrease, depending on the future market
                            conditions & scenarios. value varies with the
                            purpose & date.This report is not to be referred if
                            the purpose is different other than mentioned.No
                            structural survey was conducted by us as it is not
                            in our scope of work
                          </li>
                          <li>
                            We hereby declare, “The information furnished above
                            is true and correct to the best of our knowledge and
                            belief. We have no direct or indirect interest in
                            the assets valued.
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-60 p-1 test-r m-0 text-center">
                        Authorized Signatory Name & Signature
                      </div>
                      <div className="w-40 p-1 test-r m-0 text-center">
                       
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

export default connect(mapStateToProps, mapDispatchToProps)(RblReport);
