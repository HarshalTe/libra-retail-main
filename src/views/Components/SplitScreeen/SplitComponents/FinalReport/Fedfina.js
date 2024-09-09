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

function Fedfina(props) {
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
                    <h2>Valuation Report</h2>
                  </div>
                  <section className="general-details">
                    <div className="test d-flex">
                      <div className="w-60 p-1 test-r">
                        <b>A. GENERAL DETAILS</b>
                      </div>
                      <div className="w-25 p-1 test-r">
                        <b>Date:-</b>
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">1</div>
                      <div className="w-30 p-1 test-r">Prospect Number</div>
                      <div className="w-65 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">2</div>
                      <div className="w-30 p-1 test-r">Type of Loan</div>
                      <div className="w-65 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">3</div>
                      <div className="w-30 p-1 test-r">
                        Name of the Customer(s){" "}
                      </div>
                      <div className="w-65 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">4</div>
                      <div className="w-30 p-1 test-r">
                        Name of Property Owner
                      </div>
                      <div className="w-65 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">5</div>
                      <div className="w-30 p-1 test-r">
                        Provided Documents Details
                      </div>
                      <div className="w-65 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">6</div>
                      <div className="w-30 p-1 test-r">
                        Property Address as per site
                      </div>
                      <div className="w-65 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">7</div>
                      <div className="w-30 p-1 test-r">
                        Legal address of property
                      </div>
                      <div className="w-65 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">8</div>
                      <div className="w-30 p-1 test-r">
                        Contact no of the Owner
                      </div>
                      <div className="w-25 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 p-1 test-r">
                        Tenant if Applicable
                      </div>
                      <div className="w-20 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">9</div>
                      <div className="w-30 p-1 test-r">Landmark</div>
                      <div className="w-65 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">10</div>
                      <div className="w-30 p-1 test-r">
                        Date of Technical Visit
                      </div>
                      <div className="w-65 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">11</div>
                      <div className="w-30 p-1 test-r">Property Usage</div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 p-1 test-r">Residential</div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r">Residential</div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">12</div>
                      <div className="w-30 p-1 test-r">Occupancy</div>
                      <div className="w-65 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">13</div>
                      <div className="w-30 p-1 test-r">
                        Property falls in demolition list of local authority
                      </div>
                      <div className="w-65 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">14</div>
                      <div className="w-30 p-1 test-r">Marketability</div>
                      <div className="w-65 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">15</div>
                      <div className="w-30 p-1 test-r">
                        Front Side Road Width
                      </div>
                      <div className="w-65 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                  </section>
                  <section className="surrounding-localit-details">
                    <div className="test d-flex">
                      <div className="w-100 p-1 test-r">
                        <b>B. SURROUNDING LOCALITY DETAILS</b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">1</div>
                      <div className="w-30 p-1 test-r">
                        Ward No/ Municipal land No
                      </div>
                      <div className="w-65 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">2</div>
                      <div className="w-30 p-1 test-r">Type of locality </div>
                      <div className="w-65 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">3</div>
                      <div className="w-30 p-1 test-r">
                        Type of the Property
                      </div>
                      <div className="w-65 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">4</div>
                      <div className="w-30 p-1 test-r">
                        Distance From City Centre
                      </div>
                      <div className="w-65 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">5</div>
                      <div className="w-30 p-1 test-r">Site Access </div>
                      <div className="w-65 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">6</div>
                      <div className="w-95 p-1 test-r">
                        Approving Authority:
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 test-r"></div>
                      <div className="w-95">
                        <div className="d-flex">
                          <div className="w-32 test-b p-1 test-r">
                            Corporation Limit
                          </div>
                          <div className="w-15 test-b p-1 test-r">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                          <div className="w-28 test-b p-1 test-r">
                            Municipal Limit/DA
                          </div>
                          <div className="w-25 test-b p-1 test-r">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                        </div>
                        <div className="d-flex">
                          <div className="w-32 p-1 test-r">Town Panchayat</div>
                          <div className="w-15 p-1 test-r">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                          <div className="w-28 p-1 test-r">
                            Village Panchayat
                          </div>
                          <div className="w-25 p-1 test-r">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">7</div>
                      <div className="w-30 p-1 test-r">
                        Conditions of Approach Road
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-25 p-1 test-r">Road Width</div>
                      <div className="w-25 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                  </section>
                  <section className="property-details">
                    <div className="test d-flex">
                      <div className="w-100 p-1 test-r">
                        <b>C. PROPERTY DETAILS </b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">1</div>
                      <div className="w-30 p-1 test-r">No of Floors</div>
                      <div className="w-65 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">2</div>
                      <div className="w-30 p-1 test-r">Floor Wise Usage</div>
                      <div className="w-65 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">3</div>
                      <div className="w-30 p-1 test-r">Age of the property</div>
                      <div className="w-20 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-25 p-1 test-r">Age of the property</div>
                      <div className="w-20 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">4</div>
                      <div className="w-30 p-1 test-r">Side Boundaries</div>
                      <div className="w-65 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r"></div>
                      <div className="w-20 p-1 test-r"></div>
                      <div className="w-25 p-1 test-r">As per document</div>
                      <div className="w-30 p-1 test-r">As per site</div>
                      <div className="w-20 p-1 test-r">As per plan</div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r"></div>
                      <div className="w-20 p-1 test-r">North</div>
                      <div className="w-25 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-30 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r"></div>
                      <div className="w-20 p-1 test-r">South</div>
                      <div className="w-25 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-30 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r"></div>
                      <div className="w-20 p-1 test-r">East</div>
                      <div className="w-25 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-30 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r"></div>
                      <div className="w-20 p-1 test-r">West</div>
                      <div className="w-25 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-30 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">5</div>
                      <div className="w-30 p-1 test-r">
                        Boundaries are matching or not
                      </div>
                      <div className="w-65 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">6</div>
                      <div className="w-30 p-1 test-r">
                        Property Identified through{" "}
                      </div>
                      <div className="w-65 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">7</div>
                      <div className="w-30 p-1 test-r">
                        Plot Demarcated at site{" "}
                      </div>
                      <div className="w-65 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">8</div>
                      <div className="w-30 p-1 test-r">Amenities</div>
                      <div className="w-65 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                  </section>
                  <section className="structural-details">
                    <div className="test d-flex">
                      <div className="w-100 p-1 test-r">
                        <b>D. STRUCTURAL DETAILS</b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">1</div>
                      <div className="w-30 p-1 test-r">Type of Structure</div>
                      <div className="w-20 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-25 p-1 test-r">No of floors</div>
                      <div className="w-20 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">2</div>
                      <div className="w-30 p-1 test-r">No of wings</div>
                      <div className="w-65 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">3</div>
                      <div className="w-30 p-1 test-r">
                        Construction permission Number and date.
                      </div>
                      <div className="w-65 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">3</div>
                      <div className="w-30 p-1 test-r">
                        OC/BCC Approval no & Date.
                      </div>
                      <div className="w-65 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">4</div>
                      <div className="w-30 p-1 test-r">
                        Violations Observed if Any or is there any risk of
                        Demolition in case of Violation
                      </div>
                      <div className="w-65 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">5</div>
                      <div className="w-30 p-1 test-r">
                        If plans not available then is the structure confirming
                        to the local byelaws
                      </div>
                      <div className="w-65 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                  </section>
                  <section className="deviation-details">
                    <div className="test d-flex">
                      <div className="w-100 p-1 test-r">
                        <b>G. DEVIATION DETAILS </b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r"></div>
                      <div className="w-20 p-1 test-r">FLOOR DETAILS</div>
                      <div className="w-60 p-1 test-r text-center">
                        Deviation in Sq ft
                      </div>
                      <div className="w-15 p-1 test-r">Deviation in %</div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r"></div>
                      <div className="w-20 p-1 test-r text-center">Floor</div>
                      <div className="w-15 p-1 test-r">As per bye laws</div>
                      <div className="w-25 p-1 test-r text-center">At site</div>
                      <div className="w-20 p-1 test-r">Adopted</div>
                      <div className="w-15 p-1 test-r">Deviation</div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r"></div>
                      <div className="w-20 p-1 test-r text-center">Stilt</div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-25 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r"></div>
                      <div className="w-20 p-1 test-r text-center">GF</div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-25 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r"></div>
                      <div className="w-20 p-1 test-r text-center">FF</div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-25 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r"></div>
                      <div className="w-20 p-1 test-r text-center">SF</div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-25 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r"></div>
                      <div className="w-20 p-1 test-r text-center">TF</div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-25 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r"></div>
                      <div className="w-20 p-1 test-r">Total Area</div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-25 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                  </section>
                  <section className="self-construction-case">
                    <div className="test d-flex">
                      <div className="w-100 p-1 test-r">
                        <b>H. SELF-CONSTRUCTION CASE</b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r"></div>
                      <div className="w-35 p-1 test-r">
                        Architect certified estimate available or Not
                      </div>
                      <div className="w-60 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r"></div>
                      <div className="w-35 p-1 test-r">
                        Construction Amount certified
                      </div>
                      <div className="w-60 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r"></div>
                      <div className="w-35 p-1 test-r">Others</div>
                      <div className="w-60 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                  </section>
                  <section className="self-construction-case">
                    <div className="test d-flex">
                      <div className="w-100 p-1 test-r">
                        <b>I. FAIR MARKET VALUE</b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">1</div>
                      <div className="w-35 p-1 test-r">
                        <b>Valuation Methodology </b>
                      </div>
                      <div className="w-60 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">2</div>
                      <div className="w-35 p-1 test-r text-center">
                        Particulars
                      </div>
                      <div className="w-15 p-1 test-r">Description</div>
                      <div className="w-15 p-1 test-r">Area (in Sq ft) </div>
                      <div className="w-15 p-1 test-r">Rate (per Sq ft) </div>
                      <div className="w-15 p-1 test-r">Total Value</div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r"></div>
                      <div className="w-35 p-1 test-r">
                        Land area as per document
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r"></div>
                      <div className="w-35 p-1 test-r">
                        Carpet area as per plan
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r"></div>
                      <div className="w-35 p-1 test-r">
                        Carpet / BUA as per Documents
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r"></div>
                      <div className="w-35 p-1 test-r">
                        Carpet area as per measurement on site
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r"></div>
                      <div className="w-35 p-1 test-r">
                        Built up Area as per plan
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r"></div>
                      <div className="w-35 p-1 test-r">Super Built up area</div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r"></div>
                      <div className="w-35 p-1 test-r">Amenities value</div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r"></div>
                      <div className="w-35 p-1 test-r">Depreciation amount</div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r"></div>
                      <div className="w-35 p-1 test-r">Fair Market Value</div>
                      <div className="w-60 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r"></div>
                      <div className="w-35 p-1 test-r">
                        Reliazable Value (90% of Market Value)
                      </div>
                      <div className="w-60 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r"></div>
                      <div className="w-35 p-1 test-r">
                        Distress Sale Value (70% of Market Value)
                      </div>
                      <div className="w-60 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">3</div>
                      <div className="w-95 p-1 test-r"></div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r"></div>
                      <div className="w-10 p-1 test-r">Floor</div>
                      <div className="w-15 p-1 test-r">Usage</div>
                      <div className="w-10 p-1 test-r">Units</div>
                      <div className="w-15 p-1 test-r text-center">Value</div>
                      <div className="w-25 p-1 test-r text-center">
                        If Tenanted, Year of Current Tenancy
                      </div>
                      <div className="w-20 p-1 test-r text-center">
                        Rental Assessment
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r"></div>
                      <div className="w-10 p-1 test-r">Stilt</div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-10 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-25 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r"></div>
                      <div className="w-10 p-1 test-r">Ground floor</div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-10 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-25 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r"></div>
                      <div className="w-10 p-1 test-r">First Floor</div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-10 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-25 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r"></div>
                      <div className="w-10 p-1 test-r">2nd Floor</div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-10 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-25 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r"></div>
                      <div className="w-10 p-1 test-r">Third Floor</div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-10 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-25 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">4</div>
                      <div className="w-35 p-1 test-r">
                        Stage of construction
                      </div>
                      <div className="w-60 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">5</div>
                      <div className="w-35 p-1 test-r">
                        Govt. Guideline value
                      </div>
                      <div className="w-60 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">6</div>
                      <div className="w-35 p-1 test-r">
                        Property reflecting in demolition list?
                      </div>
                      <div className="w-60 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">7</div>
                      <div className="w-35 p-1 test-r">
                        Latitude & longitude of property
                      </div>
                      <div className="w-60 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">8</div>
                      <div className="w-35 p-1 test-r">
                        Which seismic zone property is located in?
                      </div>
                      <div className="w-60 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">9</div>
                      <div className="w-35 p-1 test-r">Demolition Risk</div>
                      <div className="w-60 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">10</div>
                      <div className="w-35 p-1 test-r">
                        Which flood area is the building is located in?
                      </div>
                      <div className="w-60 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-5 p-1 text-center test-r">11</div>
                      <div className="w-35 p-1 test-r">
                        What is the height of building?
                      </div>
                      <div className="w-60 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                  </section>
                  <section className="remarks-and-declaration">
                    <div className="test d-flex">
                      <div className="w-100 p-1 test-r font-bolder">
                        <b>Remarks</b>
                        <br />
                        <br />
                        <ol>
                          <li>
                            The property under consideration is in Ground + 2
                            storied residential commercial building without lift
                          </li>
                          <li>
                            As per site observation access to the building is as
                            per norms and road width is 8 feet approx.
                          </li>
                          <li>
                            We have received only Index II Gunthewari
                            Certificate Gunthewari Plan & Sale Deed available
                            for verification.
                          </li>
                          <li>
                            Kindly check the Commencement certificate &
                            Occupation Certificate before disbursement.
                          </li>
                          <li>
                            At the time of visit we have observed that property
                            is Tenant Occupied-Tejas Kanekar & Joshi on Ground
                            Floor and Kumavat & kuslakar on 1st Floor and shiekh
                            & Mulay on 2nd Floor and Madane and Bhosale on
                            Terrace Floor occupied since last 2 Years.
                          </li>
                          <li>
                            During our visit we have not observed society name
                            board.
                          </li>
                          <li>
                            Agreement for sale made between Shantabai Shamrao
                            Jagtap AND Mr Sanjay Vitthalrao Patil on dated
                            24/11/1994 are made available for verification
                            (Index no: 4972/1994).
                          </li>
                          <li>
                            Subject property is a part of larger layout of
                            Survey No 18/3. Plot numbers are not designated on
                            sites. We had asked for a copy of Survey Plan/
                            Layout plans. However the same is not provided. In
                            absence of the same the subject property is
                            identified Partly on the basis of 4 Boundary page
                            provided Partially Matched (North Side Road).
                          </li>
                          <li>
                            Based on site visit it is identified Ground Floor of
                            the property comprises of 2-1RK unit which are
                            leased out to Tejas Kanekar & Joshi. 1st Floor
                            comprises of 2-1RK which are leased out to Kumavat &
                            kuslakar. 2nd Floor comprises of 2-1RK which are
                            leased out to shiekh & Mulay We have not received
                            any lease agreements. Hence in case of Triparty
                            agreement the Valuation shall stand Nil.
                          </li>
                          <li>
                            We have considered the plot area 1000 sft as per
                            Plan provided for Valuation. Further we have
                            considered the Built up area of 3197 sft as per plan
                            for Valuation.
                          </li>
                          <li>
                            We have received a copy of Gunthewari Certificate by
                            Pune Municipal Corporation having No 9560 dated
                            16/07/2004 for Building on Survey No 29 Katraj.
                          </li>
                        </ol>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-50 p-1 test-r text-center">
                        Authorized Signatory Signature & Place
                      </div>
                      <div className="w-5 p-1 test-r text-center">
                        <b>:</b>
                      </div>
                      <div className="w-45 p-1 test-r text-center"></div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-100 p-1 test-r">
                        Declaration:
                        <br />
                        <br />
                        Our representative has visited this site. I/We have not
                        verified the title deeds of the properties with the
                        records of the registrar's office as this is beyond the
                        agreed scope of work. Assumptions are made to the best
                        of our knowledge and belief. Reliance is based on the
                        information furnished to us by the identifier AND/OR
                        client.
                        <br />
                        The valuer shall not be responsible for the matters of
                        legal nature that affects the value and opinion
                        expressed by us. where a sketched plan is attached to
                        this report,it does not purport to represent accurate
                        architectural plans.Sketch plans and photographs are
                        provided as general illustrations only. Documents
                        furnished to us are returned to the client along with
                        the report. We cannot preserve them. Fair market value
                        indicated in the report is an opinion of the value
                        prevailing on the date of the said report and is based
                        on market feedback on values of similar properties.
                        Client is free to obtain other independent opinions on
                        the same. Fair, market value of such properties /
                        localities may increase or decrease, depending on the
                        future market conditions & scenarios.
                        <br />
                        value varies with the purpose & date. This report is not
                        to be referred if the purpose is different other than
                        mentioned.No structural survey was conducted by us as it
                        is not in our scope of work.
                        <br />
                        We hereby declare, “The information furnished above is
                        true and correct to the best of our knowledge and
                        belief. We have no direct or indirect interest in the
                        assets valued.
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

export default connect(mapStateToProps, mapDispatchToProps)(Fedfina);
