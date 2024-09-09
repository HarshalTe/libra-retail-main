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

function IdfcReport(props) {
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

                  <div className="header-content">
                    <div className="test font-bolder text-center">
                      <h3 className="">TECHNICAL APPRAISAL REPORT</h3>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">Ref No.</div>
                      <div className="w-40 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        Date:
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">Branch Name</div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        Type of Case
                      </div>
                      <div className="w-40 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">Valuer Name</div>
                      <div className="w-40 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        Date of Visit
                      </div>
                      <div className="w-20 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">Case Ref. No</div>
                      <div className="w-80 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0">
                        Contacted Person for property inspection
                      </div>
                      <div className="w-80 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="basic-details">
                    <div className="test font-bolder">
                      <h3 className="">
                        <u>BASIC DETAIL</u>
                      </h3>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">1</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Applicant/s Name/s
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">2</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Type of property
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        Current Usage
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">3</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Address at site
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Address as per Document
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">4</div>
                      <div className="w-70 text-left p-1 pl-2 test-r">
                        Has the valuator done valuation of this property before
                        this? If yes, when, for whom?
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="surrounding-locality-details">
                    <div className="test font-bolder">
                      <h3 className="">
                        <u>SURROUNDING & LOCALITY DETAILS</u>
                      </h3>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">5</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Location
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Approved Usage for property
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Class of Locality
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Site is (Dev, Under Dev)
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Proximity to civic amenities /public transport
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Railway Station
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Bus Stop
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">6</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Close Vicinity/Landmark
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">7</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Distance from City Center
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">8</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Condition and width of approach road
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
                    <div className="test font-bolder">
                      <h3 className="">
                        <u>PROPERTY DETAILS</u>
                      </h3>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">9</div>
                      <div className="w-30 text-left p-1 pl-2 test-r font-bolder">
                        Occupant
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Vacant/Occupied
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Name of Occupant
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Relation with applicant
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">10</div>
                      <div className="w-30 text-left p-1 pl-2 test-r font-bolder">
                        Building details
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Property Demarcation
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Property Identified Through
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Type of structure
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Land/Plot Area
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        No of Blocks/Wings
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        No of Units on floor
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        No. of Floors
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        No. of Lifts in each wing
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">11</div>
                      <div className="w-18 text-left p-1 pl-2 test-r font-bolder">
                        Unit details
                      </div>
                      <div className="w-18 text-left p-1 pl-2 test-r">
                        Located on Floor No.
                      </div>
                      <div className="w-54 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-18 text-left p-1 pl-2 test-r font-bolder"></div>
                      <div className="w-18 text-left p-1 pl-2 test-r">
                        No. of rooms
                      </div>
                      <div className="w-54 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-18 text-left p-1 pl-2 test-r font-bolder"></div>
                      <div className="w-18 text-left p-1 pl-2 test-r">
                        Carpet Area
                      </div>
                      <div className="w-18 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-18 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-18 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-18 text-left p-1 pl-2 test-r font-bolder"></div>
                      <div className="w-18 text-left p-1 pl-2 test-r"></div>
                      <div className="w-18 text-left p-1 pl-2 test-r"></div>
                      <div className="w-18 text-left p-1 pl-2 test-r">
                        Road Facing
                      </div>
                      <div className="w-18 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">12</div>
                      <div className="w-18 text-left p-1 pl-2 test-r font-bolder">
                        Quality of Construction:{" "}
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r font-bolder">
                        Exterior
                      </div>
                      <div className="w-27 text-left p-1 pl-2 test-r text-center">
                        Average
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        Interiors
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        Average
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">13</div>
                      <div className="w-18 text-left p-1 pl-2 test-r font-bolder">
                        Age of the property
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r font-bolder">
                        22 Years (As Per OC)
                      </div>
                      <div className="w-27 text-left p-1 pl-2 test-r text-center">
                        Residual life
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r text-center">
                        38
                      </div>
                    </div>
                  </div>
                  <div className="sanction-approval">
                    <div className="test font-bolder">
                      <h3 className="">
                        <u>SANCTION PLAN APPROVAL & OTHER DOCUMENTS DETAILS</u>
                      </h3>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">14</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Sanctioned plans verified with approval no
                      </div>

                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">14A</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Construction as per approved plan
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">14B</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Construction permission
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">14C</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Number and Date
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">14D</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Nature of the Land as per the Online land revenue
                        Records.
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">14E</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Checked the measurement & Ownership details of land as
                        per the online Land revenue records
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">15</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Ownership type
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">16</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Property documents verified
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">17</div>
                      <div className="w-45 text-left p-1 pl-2 test-r">
                        Is the property within Municipal Limits
                      </div>
                      <div className="w-45 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">18</div>
                      <div className="w-45 text-left p-1 pl-2 test-r">
                        Permissible usage allow as per master plan
                      </div>
                      <div className="w-45 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test font-bolder">
                      <h3 className="">Setbacks</h3>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">19A</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Setbacks
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        As per plan/ Bye laws
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        Actual at site
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r text-center">
                        Remarks, if any
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Front
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
                      <div className="w-30 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Side1 (Left)
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
                      <div className="w-30 text-left p-1 pl-2 test-r text-center"></div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Side2 (Right)
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
                      <div className="w-30 text-left p-1 pl-2 test-r text-center"></div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r">Rear</div>
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
                      <div className="w-30 text-left p-1 pl-2 test-r text-center"></div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-45 text-left p-1 pl-2 test-r">
                        <h4>Demolition risk (if any to be highlighted</h4>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r text-center"></div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">19B</div>
                      <div className="w-90 text-left p-1 pl-2 test-r">
                        <h4>Floor Wise Area (In Sqft/Sqmtrs.)</h4>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">19B</div>
                      <div className="w-19 text-left p-1 pl-2 test-r">
                        <h4>Floor No</h4>
                      </div>
                      <div className="w-13 text-left p-1 pl-2 test-r text-center">
                        <h4>As per plan/ Bye laws Sqft</h4>
                      </div>
                      <div className="w-13 text-left p-1 pl-2 test-r text-center">
                        <h4>As per plan/ Bye laws SqMt</h4>
                      </div>
                      <div className="w-13 text-left p-1 pl-2 test-r">
                        <h4>Actual at site Sqft</h4>
                      </div>
                      <div className="w-13 text-left p-1 pl-2 test-r">
                        <h4>Actual at site SqMt</h4>
                      </div>
                      <div className="w-19 text-left p-1 pl-2 test-r">
                        <h4>Deviation / Violations (%)</h4>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-19 text-left p-1 pl-2 test-r">GF</div>
                      <div className="w-13 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-13 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-13 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-13 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-19 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-19 text-left p-1 pl-2 test-r">FF</div>
                      <div className="w-13 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-13 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-13 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-13 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-19 text-left p-1 pl-2 test-r"></div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-19 text-left p-1 pl-2 test-r">SF</div>
                      <div className="w-13 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-13 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-13 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-13 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-19 text-left p-1 pl-2 test-r"></div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-19 text-left p-1 pl-2 test-r">TF</div>
                      <div className="w-13 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-13 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-13 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-13 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-19 text-left p-1 pl-2 test-r"></div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-19 text-left p-1 pl-2 test-r">
                        Total
                      </div>
                      <div className="w-13 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-13 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-13 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-13 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-19 text-left p-1 pl-2 test-r"></div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">20</div>
                      <div className="w-71 text-left p-1 pl-2 test-r">
                        Carpet Area As Measured (sq. ft)
                      </div>
                      <div className="w-19 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-71 text-left p-1 pl-2 test-r">
                        Carpet Area as Agreement (sq. ft)
                      </div>
                      <div className="w-19 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-71 text-left p-1 pl-2 test-r">
                        Carpet Area as Per App. Plan (sq. ft)
                      </div>
                      <div className="w-19 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-71 text-left p-1 pl-2 test-r">
                        Area Considered For Valuation (sq. ft)
                      </div>
                      <div className="w-19 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-71 text-left p-1 pl-2 test-r text-center">
                        Loading
                      </div>
                      <div className="w-10 text-left p-1 pl-2 test-r text-center">
                        Super Area (sq. ft)
                      </div>
                      <div className="w-9 text-left p-1 pl-2 test-r text-center">
                        Super Area (Sq. Mtr)
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-71 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-10 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-9 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-71 text-left p-1 pl-2 test-r text-center">
                        Rate (per sq ft)
                      </div>
                      <div className="w-19 text-left p-1 pl-2 test-r text-center">
                        Value.(INR)
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-71 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-19 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">20A</div>
                      <div className="w-71 text-left p-1 pl-2 test-r text-center">
                        <h4>
                          Current government approved rate as per ready reckoner
                          (Kindly provide this Rate in sq ft. only){" "}
                        </h4>
                      </div>
                      <div className="w-19 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="valuation">
                    <div className="test font-bolder">
                      <h3 className="">
                        <u>VALUATION</u>
                      </h3>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">21</div>
                      <div className="w-90 text-left p-1 pl-2 test-r">
                        <h4>A. Description of Constructed Area and Rates</h4>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-25 text-left p-1 pl-2 test-r">
                        <h4>Description</h4>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <h4>Area (Sft.) </h4>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <h4>Area (Sqmt.) </h4>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        <h4>Rate (Sft.) </h4>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <h4>Amount (in )</h4>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-25 text-left p-1 pl-2 test-r">Land</div>
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
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-25 text-left p-1 pl-2 test-r">
                        <h4>
                          Construction Area / Salable area/ Super Built up area
                        </h4>
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
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-55 text-left p-1 pl-2 test-r">
                        Total Value by Land & Building Method (INR) or
                        comparison method
                      </div>

                      <div className="w-35 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-55 text-left p-1 pl-2 test-r">
                        Stage of construction
                      </div>
                      <div className="w-35 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-55 text-left p-1 pl-2 test-r">
                        Recommended Construction Value
                      </div>
                      <div className="w-35 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-90 text-left p-1 pl-2 test-r">
                        <h4>B. Value of Extra Amenities if applicable</h4>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-25 text-left p-1 pl-2 test-r text-center">
                        No. of Car Parking
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        Rate per parking
                      </div>
                      <div className="w-25 text-left p-1 pl-2 test-r text-center">
                        Value of Car Parking
                      </div>
                      <div className="w-25 text-left p-1 pl-2 test-r text-center">
                        PLC/IDC/EDC/Power Backup/Other
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-25 text-left p-1 pl-2 test-r">
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
                      <div className="w-25 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-25 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-50 text-left p-1 pl-2 test-r">
                        Total Amenities charges
                      </div>
                      <div className="w-40 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-50 text-left p-1 pl-2 test-r">
                        <h4>Total Market Value of Property (A+B) (in Amt. )</h4>
                      </div>
                      <div className="w-40 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-90 text-left p-1 pl-2 test-r">
                        Rupees in words only/-na
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-70 text-left p-1 pl-2 test-r">
                        Forced Sale Value
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-70 text-left p-1 pl-2 test-r">
                        Re-construction Cost (For Property insurance)
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-60 text-left p-1 pl-2 test-r">
                        Approx. Rentals in case of 100% complete property
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="boundaries">
                    <div className="test font-bolder text-center">
                      <h3 className="">
                        <u>BOUNDARIES</u>
                      </h3>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">22</div>
                      <div className="w-30 text-left p-1 pl-2 test-r text-center">
                        <h4>Boundaries</h4>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <h4>EAST</h4>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <h4>WEST</h4>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <h4>NORTH</h4>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <h4>SOUTH</h4>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r text-center">
                        <h4>As per deed </h4>
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
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r text-center">
                        <h4>At site</h4>
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
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        <h4>Boundaries Matching</h4>
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="remarks">
                    <div className="test">
                      <p>Remarks-: </p>
                      <ol>
                        <li>
                          The property under consideration is 2 BHK Flat located
                          on 1st Floor in Ground + 7th storied residential
                          building with 1 lift
                        </li>
                        <li>
                          As per site observetion access to the building is as
                          per norms and road width is 20 feet approx.
                        </li>
                        <li>
                          We have received Xerox Copies Of Registered Agreement
                          Index II Previous Registered Agreement Previous Index
                          II Previous Allotment Letter Property Tax Receipt & OC
                          are made available for verification.
                        </li>
                        <li>
                          At the time of visit we have observed that property
                          was Self Occupied Mr. Matthew Kutticad since last 22
                          Years.
                        </li>
                        <li>
                          During our visit we have not observed society name
                          board.
                        </li>
                        <li>
                          Registered Agreement for sale made between Mrs. Prema
                          Vajrekar & Mr. T.R. Vajrekar AND Mr. Mathew Ukru
                          Kutticad & Mrs. Sulakshana Matthew Kutticad on Dated
                          19/12/2003 are made available for verification(Index
                          II No. 9591/2003).
                        </li>
                        <li>
                          Previous Registered Agreement for sale made between
                          M/s. S.B Builders & Developers AND Mrs. Prema Vajrekar
                          & Mr. T.R. Vajrekar on Dated 03/09/2003 are made
                          available for verification(Index II No. 6907/2003).
                        </li>
                        <li>
                          We have considered Built Up Area as per Registered
                          Agreement to furnish the valuation report
                        </li>
                      </ol>
                    </div>
                  </div>
                  <div className="test d-flex">
                    <div className="w-100 p-1 test-r m-0">
                      Any other observation to highlighted:
                    </div>
                  </div>
                  <div className="test d-flex">
                    <div className="w-40 p-1 test-r m-0">
                      Property in caution area (Y/N)
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
                      Property in Negative area (Y/N)
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
                      Property in OGL (Y/N)
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
                      Verified the online Land Revenue record (Y/N)
                    </div>
                    <div className="w-60 text-left p-1 pl-2 test-r">
                      <ReportCustomTextField
                        formProps={formProps}
                        name="prospect_no"
                      />
                    </div>
                  </div>
                  <div className="test d-flex">
                    <div className="w-25 p-1 test-r m-0 text-center">
                      <h4>LATITUDE</h4>
                    </div>
                    <div className="w-25 p-1 test-r m-0">
                      <ReportCustomTextField
                        formProps={formProps}
                        name="prospect_no"
                      />
                    </div>
                    <div className="w-25 p-1 test-r m-0 text-center">
                      <h4>LONGITUDE</h4>
                    </div>
                    <div className="w-25 p-1 test-r m-0">
                      <ReportCustomTextField
                        formProps={formProps}
                        name="prospect_no"
                      />
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

export default connect(mapStateToProps, mapDispatchToProps)(IdfcReport);
