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

function RohaReport(props) {
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
                    <h2>
                      VALUATION REPORT FOR ROHA HOUSING FINANCE PRIVATE LTD
                    </h2>
                  </div>

                  <div className="header-details">
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">
                        <b>Loan Number</b>
                      </div>
                      <div className="w-5 text-left p-1 pl-2 test-r text-center">
                        <b>:</b>
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 p-1 test-r m-0">
                        <b>Product Type</b>
                      </div>
                      <div className="w-5 text-left p-1 pl-2 test-r text-center">
                        <b>:</b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">
                        <b>Branch Name</b>
                      </div>
                      <div className="w-5 text-left p-1 pl-2 test-r text-center">
                        <b>:</b>
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 p-1 test-r m-0">
                        <b>Sub Product type</b>
                      </div>
                      <div className="w-5 text-left p-1 pl-2 test-r text-center">
                        <b>:</b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">
                        <b>Valuer Name</b>
                      </div>
                      <div className="w-5 text-left p-1 pl-2 test-r text-center">
                        <b>:</b>
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 p-1 test-r m-0">
                        <b>Type of Case</b>
                      </div>
                      <div className="w-5 text-left p-1 pl-2 test-r text-center">
                        <b>:</b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">
                        <b>Valuer Ref No</b>
                      </div>
                      <div className="w-5 text-left p-1 pl-2 test-r text-center">
                        <b>:</b>
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 p-1 test-r m-0">
                        <b>Date of Visit</b>
                      </div>
                      <div className="w-5 text-left p-1 pl-2 test-r text-center">
                        <b>:</b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">
                        <b>Valuer Feedback</b>
                      </div>
                      <div className="w-5 text-left p-1 pl-2 test-r text-center">
                        <b>:</b>
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 p-1 test-r m-0">
                        <b>Date of Report</b>
                      </div>
                      <div className="w-5 text-left p-1 pl-2 test-r text-center">
                        <b>:</b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">
                        <b>Contacted Person</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <b>Relation with Customer</b>
                      </div>
                      <div className="w-20 p-1 test-r m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-10 text-left p-1 pl-2">
                        <b> Contact No :</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="basic-details">
                    <div className="test">
                      <h3>BASIC DETAILS</h3>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0">
                        <b>1</b>
                      </div>
                      <div className="w-30 p-1 test-r m-0">
                        <b>Applicant Name(s) </b>
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0">
                        <b>2</b>
                      </div>
                      <div className="w-30 p-1 test-r m-0">
                        <b>Originally type of property</b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <b>Current Usage</b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0">
                        <b>3</b>
                      </div>
                      <div className="w-30 p-1 test-r m-0">
                        <b>Address as per request</b>
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b>Address as per request</b>
                      </div>
                      <div className="w-70 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b>Address as per Site</b>
                      </div>
                      <div className="w-70 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b>Project/Colony/Layout Name</b>
                      </div>
                      <div className="w-70 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b> Unit/Flat no/ Bungalow/Plot/House no. </b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        <b>Floor No</b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b> Building Name </b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        <b>Wing Name</b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b>S.No/G.No/Khasra No </b>
                      </div>
                      <div className="w-70 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b>Close Vicinity/Landmark</b>
                      </div>
                      <div className="w-70 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b> Street Name </b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        <b>Village Name</b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b> City </b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        <b>State</b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b> Main Locality of the Property </b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        <b>Sub Locality</b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b>Pin code of the Property </b>
                      </div>
                      <div className="w-70 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b>Nearest Police station </b>
                      </div>
                      <div className="w-70 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b>Nearest Post office</b>
                      </div>
                      <div className="w-70 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0">
                        <b>Latitude</b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        <b>Longitude</b>
                      </div>
                      <div className="w-40 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0">
                        <b>4</b>
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <b>
                          {" "}
                          Has the valuator valued this property before, If yes,
                          when, for whom
                        </b>
                      </div>

                      <div className="w-30 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="surrounding-and-locality-details">
                    <div className="test">
                      <h3>SURROUNDING & LOCALITY DETAILS</h3>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0">
                        <b>5</b>
                      </div>
                      <div className="w-30 p-1 test-r m-0">
                        <b>Location</b>
                      </div>
                      <div className="w-40 p-1 test-r m-0">
                        <b>Type (Comm, Res, Ind, Mix) </b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-40 p-1 test-r m-0">
                        <b>Locality (Low, Medium, Posh) </b>
                      </div>

                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-40 p-1 test-r m-0">
                        <b>Site is (Dev, Under Dev, Developing) </b>
                      </div>

                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-40 p-1 test-r m-0">
                        <b>Proximity to civic amenities/public transport </b>
                      </div>

                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-40 p-1 test-r m-0">
                        <b>Railway Station</b>
                      </div>

                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-40 p-1 test-r m-0">
                        <b>Bus Stop </b>
                      </div>

                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0">
                        <b>6</b>
                      </div>
                      <div className="w-30 p-1 test-r m-0">
                        <b>Distance from Sourcing Branch</b>
                      </div>

                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0">
                        <b>7</b>
                      </div>
                      <div className="w-30 p-1 test-r m-0">
                        <b>Nature of approach Road </b>
                      </div>

                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0">
                        <b>8</b>
                      </div>
                      <div className="w-30 p-1 test-r m-0">
                        <b>Approach Road width</b>
                      </div>

                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0">
                        <b>9</b>
                      </div>
                      <div className="w-30 p-1 test-r m-0">
                        <b>Approach to the property as per Sit</b>
                      </div>

                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0">
                        <b>10</b>
                      </div>
                      <div className="w-30 p-1 test-r m-0">
                        <b>Approach to the property as per Docs</b>
                      </div>

                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0">
                        <b>11</b>
                      </div>
                      <div className="w-30 p-1 test-r m-0">
                        <b>Any observation which affects the security</b>
                      </div>

                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="property-details">
                    <div className="test">
                      <h3>PROPERTY DETAILS</h3>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0">
                        <b>12</b>
                      </div>
                      <div className="w-30 p-1 test-r m-0">
                        <b>Occupant</b>
                      </div>
                      <div className="w-30 p-1 test-r m-0">
                        <b>Occupied By</b>
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0 text-center">
                        <b>Name of Occupant</b>
                      </div>

                      <div className="w-70 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0 text-center">
                        <b>No of Tenants/duration </b>
                      </div>

                      <div className="w-70 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0 text-center">
                        <b>Relation with applicant</b>
                      </div>

                      <div className="w-70 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0">
                        <b>13</b>
                      </div>
                      <div className="w-30 p-1 test-r m-0 text-center">
                        <b>Building details</b>
                      </div>
                      <div className="w-30 p-1 test-r m-0 text-center">
                        <b>Property Demarcation</b>
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0 text-center">
                        <b>Property Identified (Y/N)</b>
                      </div>

                      <div className="w-70 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0 text-center">
                        <b>Property Identified through</b>
                      </div>

                      <div className="w-70 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0 text-center">
                        <b>Type of structure</b>
                      </div>
                      <div className="w-70 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0 text-center">
                        <b>Seismic Zone</b>
                      </div>
                      <div className="w-70 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0 text-center">
                        <b>Type of soil</b>
                      </div>
                      <div className="w-70 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0 text-center">
                        <b>Land/Plot Area -UDS</b>
                      </div>
                      <div className="w-10 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0 text-center">
                        <b>No of Blocks</b>
                      </div>
                      <div className="w-70 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0 text-center">
                        <b>No of Units on each floor </b>
                      </div>
                      <div className="w-70 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0 text-center">
                        <b>No. of Floors</b>
                      </div>
                      <div className="w-70 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0 text-center">
                        <b>No. of Lifts</b>
                      </div>
                      <div className="w-70 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0 text-center">
                        <b>Amenities Available</b>
                      </div>
                      <div className="w-70 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0">
                        <b>14</b>
                      </div>
                      <div className="w-30 p-1 test-r m-0 text-center">
                        <b>Unit details </b>
                      </div>
                      <div className="w-30 p-1 test-r m-0 text-center">
                        <b>Property located on Floor</b>
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0 text-center">
                        <b>Unit Configuration</b>
                      </div>
                      <div className="w-70 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0 text-center">
                        <b>Carpet area </b>
                      </div>
                      <div className="w-10 text-left p-1 pl-2 test-r"></div>
                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0 text-center">
                        <b>SBUA of</b>
                      </div>
                      <div className="w-10 text-left p-1 pl-2 test-r"></div>
                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0 text-center">
                        <b>View from property</b>
                      </div>
                      <div className="w-70 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0">
                        <b>15</b>
                      </div>
                      <div className="w-30 p-1 test-r m-0 text-center">
                        <b>Construction Quality (Good/Avg/Bad)</b>
                      </div>
                      <div className="w-10 p-1 test-r m-0 text-center">
                        <b>Exteriors</b>
                      </div>
                      <div className="w-25 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-10 text-left p-1 pl-2">Interiors</div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0">
                        <b>16</b>
                      </div>
                      <div className="w-30 p-1 test-r m-0 text-center">
                        <b>Age of the property (Yrs) </b>
                      </div>

                      <div className="w-30 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>

                      <div className="w-30 text-left p-1 pl-2 test-r">
                        <b>Residual age (Yrs)43</b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0">
                        <b>17</b>
                      </div>
                      <div className="w-30 p-1 test-r m-0 text-center">
                        <b>Occupancy (%) </b>
                      </div>

                      <div className="w-30 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>

                      <div className="w-30 text-left p-1 pl-2 test-r">
                        <b>
                          Properties within 250 Mtr RadiusResidential Locality
                        </b>
                      </div>
                    </div>
                  </div>
                  <div className="sanction-plan-details">
                    <div className="test">
                      <h3>SANCTION PLAN APPROVAL & OTHER DOCUMENTS DETAILS</h3>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0">
                        <b>18</b>
                      </div>
                      <div className="w-20 p-1 test-r m-0">
                        <b>Sanction Plan Available</b>
                      </div>
                      <div className="w-70 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0">
                        <b>19</b>
                      </div>
                      <div className="w-20 p-1 test-r m-0">
                        <b>Description</b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <b>Approval No </b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>Date of Approval</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>Expiry Date</b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <b>Sanctioning Authority</b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0"></div>
                      <div className="w-20 p-1 test-r m-0">
                        <b>Layout Plan</b>
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
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0"></div>
                      <div className="w-20 p-1 test-r m-0">
                        <b>Building Plan</b>
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
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0"></div>
                      <div className="w-20 p-1 test-r m-0">
                        <b>Construction Permission</b>
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
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0"></div>
                      <div className="w-20 p-1 test-r m-0">
                        <b>Construction Certificate</b>
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
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0">
                        <b>20</b>
                      </div>
                      <div className="w-40 p-1 test-r m-0">
                        <b>Construction commencement date</b>
                      </div>
                      <div className="w-10 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <b>Expected Completion Date</b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0">
                        <b>21</b>
                      </div>
                      <div className="w-40 p-1 test-r m-0">
                        <b>Ownership Type (Free / Lease Hold)</b>
                      </div>
                      <div className="w-50 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0">
                        <b>22</b>
                      </div>
                      <div className="w-40 p-1 test-r m-0 text-center">
                        <b>Property documents verification details</b>
                      </div>
                      <div className="w-50 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0">
                        <b>23</b>
                      </div>
                      <div className="w-40 p-1 test-r m-0 text-center">
                        <b>Property Jurisdiction</b>
                      </div>
                      <div className="w-50 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0">
                        <b>24</b>
                      </div>
                      <div className="w-40 p-1 test-r m-0 text-center">
                        <b>Permissible zoning as per master plan</b>
                      </div>
                      <div className="w-10 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <b>Usage as per Site </b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0">
                        <b>25</b>
                      </div>
                      <div className="w-50 p-1 test-r m-0 text-center">
                        <b>
                          Whether property under demolition list as per
                          authority (Y/N)
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
                      <div className="w-10 p-1 test-r m-0">
                        <b>26</b>
                      </div>
                      <div className="w-15 p-1 test-r m-0 text-center">
                        <b>Setbacks (Fts)</b>
                      </div>
                      <div className="w-55 text-left p-1 pl-2 test-r">
                        <b>As per plan/ Byelaws (Fts)</b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <b>As per site (Fts)</b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0"></div>
                      <div className="w-15 p-1 test-r m-0 text-center">
                        <b>Front</b>
                      </div>
                      <div className="w-55 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0"></div>
                      <div className="w-15 p-1 test-r m-0 text-center">
                        <b>Side1(Left)</b>
                      </div>
                      <div className="w-55 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0"></div>
                      <div className="w-15 p-1 test-r m-0 text-center">
                        <b>Side2(Right)</b>
                      </div>
                      <div className="w-55 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0"></div>
                      <div className="w-15 p-1 test-r m-0 text-center">
                        <b>Rear</b>
                      </div>
                      <div className="w-55 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0">
                        <b>27</b>
                      </div>
                      <div className="w-90 p-1 test-r m-0 text-center">
                        <b>BUA Area (In Sqft.)</b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0">
                        <b>Floor</b>
                      </div>
                      <div className="w-60 p-1 test-r m-0 text-center">
                        <b>As per plan/ Byelaws (Sqft) </b>
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        <b>As per site (Sqft)</b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0">Ground</div>
                      <div className="w-60 p-1 test-r m-0 text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0">3rd Floor</div>
                      <div className="w-60 p-1 test-r m-0 text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0">
                        Total BUA (In Sqft.)
                      </div>
                      <div className="w-60 p-1 test-r m-0 text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="valuation-details">
                    <div className="test">
                      <h3>VALUATION DETAILS</h3>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0">
                        <b>28</b>
                      </div>
                      <div className="w-90 p-1 test-r m-0">
                        <b>
                          (A)Description of Land & Constructed Area and Rates
                        </b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-100 p-1 test-r m-0">
                        <b>Property Type:Flat</b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b>Description</b>
                      </div>
                      <div className="w-20 p-1 test-r m-0 text-center">
                        <b>Unit of Measurement</b>
                      </div>

                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <b>Area</b>
                      </div>

                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <b>Rate/unit</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <b>Amount</b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-30 p-1 test-r m-0">
                        <b>Land Area</b>
                      </div>
                      <div className="w-20 p-1 test-r m-0 text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
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
                      <div className="w-30 p-1 test-r m-0">
                        <b>Parking/Stilt BUA</b>
                      </div>
                      <div className="w-20 p-1 test-r m-0 text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
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
                      <div className="w-30 p-1 test-r m-0">
                        Existing BUA/ SBUA/Carpet Area
                      </div>
                      <div className="w-20 p-1 test-r m-0 text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
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
                      <div className="w-30 p-1 test-r m-0">
                        Proposed BUA/ SBUA/Carpet Area
                      </div>
                      <div className="w-20 p-1 test-r m-0 text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
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
                      <div className="w-50 p-1 test-r m-0">
                        <b>Construction Progress</b>
                      </div>
                      <div className="w-50 p-1 test-r m-0 text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-40 p-1 test-r m-0">
                        <b>% Completion</b>
                      </div>
                      <div className="w-15 p-1 test-r m-0 text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-30 p-1 test-r m-0 text-center">
                        <b>% Recommendation</b>
                      </div>
                      <div className="w-15 p-1 test-r m-0 text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-100 p-1 test-r m-0">
                        <b>(B)Value of Extra Amenities if applicable</b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-70 p-1 test-r m-0">
                        <b>No of Car Parks</b>
                      </div>
                      <div className="w-30 p-1 test-r m-0 text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-70 p-1 test-r m-0">
                        <b>Car Parking Charges Lumpsum (INR) </b>
                      </div>
                      <div className="w-30 p-1 test-r m-0 text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-70 p-1 test-r m-0">
                        <b>EDC, IDC Lumpsum (INR)</b>
                      </div>
                      <div className="w-30 p-1 test-r m-0 text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-70 p-1 test-r m-0">
                        <b>PLC Charges Lumpsum (INR)</b>
                      </div>
                      <div className="w-30 p-1 test-r m-0 text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-70 p-1 test-r m-0">
                        <b>Power Backup</b>
                      </div>
                      <div className="w-30 p-1 test-r m-0 text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-70 p-1 test-r m-0">
                        <b>Interiors/Amenities</b>
                      </div>
                      <div className="w-30 p-1 test-r m-0 text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-70 p-1 test-r m-0">
                        <b>Interiors % completion</b>
                      </div>
                      <div className="w-30 p-1 test-r m-0 text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-70 p-1 test-r m-0">
                        <b>Total of Component A on Completion </b>
                      </div>
                      <div className="w-30 p-1 test-r m-0 text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-70 p-1 test-r m-0">
                        <b>Total of Component B on Completion</b>
                      </div>
                      <div className="w-30 p-1 test-r m-0 text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-70 p-1 test-r m-0">
                        <b>
                          Total Market Value of Property on Completion (A+B)
                        </b>
                      </div>
                      <div className="w-30 p-1 test-r m-0 text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-70 p-1 test-r m-0">
                        <b>
                          Total Market Value of Property on Completion in Words
                        </b>
                      </div>
                      <div className="w-30 p-1 test-r m-0 text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-70 p-1 test-r m-0">
                        <b>Total Market Value of Property as on Date (A+B) </b>
                      </div>
                      <div className="w-30 p-1 test-r m-0 text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-70 p-1 test-r m-0">
                        <b>Guideline Value of The Property </b>
                      </div>
                      <div className="w-30 p-1 test-r m-0 text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-70 p-1 test-r m-0">
                        <b>Distress Sale Value as on date (80%) </b>
                      </div>
                      <div className="w-30 p-1 test-r m-0 text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-70 p-1 test-r m-0">
                        <b>Approx. Rentals in case of 100% complete property</b>
                      </div>
                      <div className="w-30 p-1 test-r m-0 text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-100 p-1 test-r m-0">
                        <b>BOUNDARIES</b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0"></div>
                      <div className="w-15 p-1 test-r m-0">
                        <b>Boundaries</b>
                      </div>
                      <div className="w-20 p-1 test-r m-0">
                        <b>North</b>
                      </div>
                      <div className="w-20 p-1 test-r m-0">
                        <b>East</b>
                      </div>
                      <div className="w-15 p-1 test-r m-0">
                        <b>South</b>
                      </div>
                      <div className="w-20 p-1 test-r m-0">
                        <b>West</b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0"></div>
                      <div className="w-15 p-1 test-r m-0">
                        <b>As per Docs</b>
                      </div>
                      <div className="w-20 p-1 test-r m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 p-1 test-r m-0">
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
                      <div className="w-20 p-1 test-r m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0">
                        <b>29</b>
                      </div>
                      <div className="w-20 p-1 test-r m-0">
                        <b>At site</b>
                      </div>
                      <div className="w-15 p-1 test-r m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 p-1 test-r m-0">
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
                      <div className="w-20 p-1 test-r m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0"></div>
                      <div className="w-20 p-1 test-r m-0">
                        <b>As per ATS </b>
                      </div>
                      <div className="w-15 p-1 test-r m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 p-1 test-r m-0">
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
                      <div className="w-20 p-1 test-r m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-45 p-1 test-r m-0">
                        <b>Boundaries Matching</b>
                      </div>
                      <div className="w-55 p-1 test-r m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-100 p-1 test-r m-0">
                        Remarks:
                        <ol>
                          <li>
                            The property under consideration is 1 BHK Flat
                            Located on 3rd Floor in Ground + 3rd storied
                            residential building without Lift.
                          </li>
                          <li>
                            As per site observation access to the building and
                            road width is 15 feet approx.
                          </li>
                          <li>
                            We have received Xerox Copies of Draft Agreement
                            Chain Agreement CC & Sale Plan made available for
                            verification.
                          </li>
                          <li>
                            Kindly check the Sanction Plan OC at your end before
                            disbursement.
                          </li>
                          <li>
                            At the time of visit we have observed that property
                            was Seller Occupied by Mrs. Geeta Mhatre since last
                            4 Years.
                          </li>
                          <li>
                            During our visit we have not observed society name
                            board.
                          </li>
                          <li>
                            Draft Agreement made between Mrs. Geeta Shivaji
                            Mahatre & Mr. Shivaji Damodar Mahatre & Mrs. Sangita
                            Sunil Gaikwad AND Mr. Kunal Sunil Gaikwad & Mrs.
                            Sangeeta Sunil Gaikwad & Mr. Sunil Gaikwad made
                            available for verification.
                          </li>
                          <li>
                            Chain Agreement made between M/s. Mauli Krupa AND
                            Mrs. Geeta Shivaji Mahatre & Mr. Shivaji Damodar
                            Mahatre Dated 11/12/2020 made available for
                            verification (Index II Ref No. 7095/2020).
                          </li>
                          <li>
                            The captioned property is approved by GP and please
                            check your policy before funding the GP Properties
                            along with DP Plan. Kindly check the authenticity of
                            GP CC shared with us at your end and also check your
                            policy before funding the GP Properties.
                          </li>
                          <li>
                            Kindly note GP is having approving authority of
                            GF+2nd Floor and our property is located on 3rd
                            Floor Hence kindly check your policy before funding
                            such types of properties.
                          </li>
                          <li>
                            Unit boundaries are not mentioned in available
                            documents hence Please check at your legal end
                            before disbursement.
                          </li>
                          <li>
                            As the age of property is more than 15 years report
                            released on the basis of available documents as per
                            FI Policy.
                          </li>
                          <li>
                            We have considered BUA as per Chain Agreement to
                            furnish the report.
                          </li>
                        </ol>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-100 p-1 test-r m-0">
                        Declaration:-
                        <ol>
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
                        </ol>
                      </div>
                    </div>
                  </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(RohaReport);
