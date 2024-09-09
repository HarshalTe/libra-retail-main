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

function HdbReport(props) {
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
                    <h3>Valuation Report</h3>
                  </div>
                  <div className="test d-flex">
                    <div className="w-20 p-1 test-r m-0">LOS NO/Ref no</div>
                    <div className="w-40 text-left p-1 pl-2 test-r">
                      <ReportCustomTextField
                        formProps={formProps}
                        name="prospect_no"
                      />
                    </div>
                    <div className="w-10 text-left p-1 pl-2 test-r">Dated:</div>
                    <div className="w-30 text-left p-1 pl-2 test-r">
                      <ReportCustomTextField
                        formProps={formProps}
                        name="prospect_no"
                      />
                    </div>
                  </div>
                  <div className="test d-flex">
                    <div className="w-20 p-1 test-r m-0">Valuer Name</div>
                    <div className="w-80 text-left p-1 pl-2 test-r">
                      <ReportCustomTextField
                        formProps={formProps}
                        name="prospect_no"
                      />
                    </div>
                  </div>
                  <div className="test d-flex">
                    <div className="w-20 p-1 test-r m-0">Branch Name</div>
                    <div className="w-80 text-left p-1 pl-2 test-r">
                      <ReportCustomTextField
                        formProps={formProps}
                        name="prospect_no"
                      />
                    </div>
                  </div>

                  <div className="general-details">
                    <div className="test text-center">
                      <h3 className="">GENERAL DETAILS:</h3>
                    </div>

                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">1</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Purpose of Valuation
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
                        Date on which Valuation is done
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">3</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Name of the applicant /property Owner
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        As per ownership Document
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        As per Physical visit
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
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Person Name & Contact No. available During Visit
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">5</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Particulars
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <b>As per ownership Document</b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <b>As per Approved plans & Permission</b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <b>As per Physical visit</b>
                      </div>
                    </div>

                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">5.a</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Property Address Description
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
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
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">5.b</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Plot No. & Sub Plot No.
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
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
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">5.c</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        CTS Nos/S.Nos/Gat Nos./Hissa Nos/Khasra Nos.
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
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
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">5.d</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Village/ Town/ Location
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center"></div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center"></div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center"></div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">5.e</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Taluka
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
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
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">5.f</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        District
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
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
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">5.g</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        State
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
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
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">5.h</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Pin Code
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
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
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">5.I</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        GPS Coordinates
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">5.J</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Nearest Landmark
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">5.K</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Name on the Society Name Board
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">5.L</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Name on the Property's Door/Entrance
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">5.M</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Name ,Address and contact
                        <br /> No. of the Neighbour
                        <br />
                        /Treasurer/Secretary
                        <br />
                        /Chairman who confirmed the Property owners Name &
                        Existence
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">6</div>
                      <div className="w-30 text-left p-1 pl-2 test-r text-center">
                        <b>Particulars</b>
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r text-center">
                        <b>Name & distance</b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">6.a</div>
                      <div className="w-30 text-left p-1 pl-2 test-r text-center">
                        Nearest Government offices from property
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">6.b</div>
                      <div className="w-30 text-left p-1 pl-2 test-r text-center">
                        Nearest Railway Station from property
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">6.c</div>
                      <div className="w-30 text-left p-1 pl-2 test-r text-center">
                        Nearest Bus Station from property
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">6.d</div>
                      <div className="w-30 text-left p-1 pl-2 test-r text-center">
                        Nearest Airport Station from property
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">6.e</div>
                      <div className="w-30 text-left p-1 pl-2 test-r text-center">
                        Nearest National Highway from property
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">6.f</div>
                      <div className="w-30 text-left p-1 pl-2 test-r text-center">
                        Community centers like Hotels,Restaurants,Theaters,
                        Auditoriums,Clubs, Lakes,Ponds etc Approximate Distance
                        from Property
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">6.g</div>
                      <div className="w-30 text-left p-1 pl-2 test-r text-center">
                        School, College Hospital, Market etc Approximate
                        Distance from Property
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="document-details">
                    <div className="test text-center">
                      <h3 className="">DOCUMENT DETAILS:</h3>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">7</div>
                      <div className="w-30 text-left p-1 pl-2 test-r text-center">
                        <b>Particulars</b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <b>Date</b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <b>No.</b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <b>Registrar office/ Competent Authority/ Owner Name</b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">7.a</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Ownership Documents
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
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
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">7.b</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        N.A Order
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
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
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">7.c</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Commencement Certificate/ Construction Permission/
                        Building Permission
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
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
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>

                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">7.d</div>
                      <div className="w-90">
                        <div className="d-flex">
                          <div className="test-r test-b w-40 p-1  pl-2">
                            SANCTIONED PLANS
                          </div>
                          <div className="test-r test-b w-20 p-1  pl-2"></div>
                          <div className="test-r test-b w-20 p-1  pl-2"></div>
                          <div className="test-r w-20 p-1  pl-2"></div>
                        </div>
                        <div className="d-flex">
                          <div className="test-r test-b w-25 p-1  pl-2">
                            Building Plan
                          </div>
                          <div className="test-r w-25 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                          <div className="test-r w-25 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                          <div className="test-r test-t w-25 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                        </div>
                        <div className="d-flex">
                          <div className="test-r test-b w-25 p-1  pl-2">
                            Floor Plan
                          </div>
                          <div className="test-r test-t w-25 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                          <div className="test-r test-t w-25 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                          <div className="test-r test-t w-25 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                        </div>
                        <div className="d-flex">
                          <div className="test-r w-25 p-1  pl-2">
                            Layout Plan
                          </div>
                          <div className="test-r test-t w-25 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                          <div className="test-r test-t w-25 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                          <div className="test-r test-t w-25 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">7.e</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Occupancy Certificate/ Completion Certificate
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
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
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">7.f</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Regularisation Certificate / Order
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
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
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">7.g</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Share Certificate
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
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
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">7.h</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Latest Property Tax Paid Bill
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
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
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="boundaried-details">
                    <div className="test text-center">
                      <h3 className="">BOUNDARIES:</h3>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">8</div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <b>Direction</b>
                      </div>
                      <div className="w-25 text-left p-1 pl-2 test-r text-center">
                        <b>As per Ownership Documents </b>
                      </div>
                      <div className="w-25 text-left p-1 pl-2 test-r text-center">
                        <b>As per Approved plans</b>
                      </div>
                      <div className="w-25 text-left p-1 pl-2 test-r text-center">
                        <b>As per Site</b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">8.a</div>
                      <div className="w-15 text-left p-1 pl-2 test-r">East</div>
                      <div className="w-25 text-left p-1 pl-2 test-r text-center">
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
                      <div className="w-25 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">8.b</div>
                      <div className="w-15 text-left p-1 pl-2 test-r">West</div>
                      <div className="w-25 text-left p-1 pl-2 test-r text-center">
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
                      <div className="w-25 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">8.c</div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        North
                      </div>
                      <div className="w-25 text-left p-1 pl-2 test-r text-center">
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
                      <div className="w-25 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">8.d</div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        South
                      </div>
                      <div className="w-25 text-left p-1 pl-2 test-r text-center">
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
                      <div className="w-25 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">8.e</div>
                      <div className="w-15 text-left p-1 pl-2 test-r">
                        Remarks
                      </div>
                      <div className="w-25 text-left p-1 pl-2 test-r text-center">
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
                      <div className="w-25 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="technical-details">
                    <div className="test text-center">
                      <h3 className="">TECHNICAL DETAILS:</h3>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">9</div>
                      <div className="w-90 text-left p-1 pl-2 test-r text-center">
                        <b>
                          LAND/PLOT- ( Applicable in Plot + Construction cases
                          only)
                        </b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">9.a</div>
                      <div className="w-30 text-left p-1 pl-2 test-r text-center">
                        <b>Particulars</b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <b>As per ownership Document</b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <b>As per Approved plans & Permission</b>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <b>As per Physical visit</b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">
                        9.a.1
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Area of Land /Plot
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
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
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        BUA / Construction Area
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
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
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">
                        9.a.2
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Plot Usage
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
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
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">
                        9.a.3
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Details of Access
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
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
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">
                        9.a.4
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Margin Area/ Set Backs (sqft)
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
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
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">
                        9.a.5
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Can Plot Demarcated/ Identified on site
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
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
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">
                        9.a.6
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Ownership (Freehold or Lease Hold)
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">
                        9.a.7
                      </div>
                      <div className="w-90">
                        <div className="d-flex">
                          <div className="test-r test-b w-30 p-1  pl-2">
                            If Tenancy
                          </div>
                          <div className="test-r test-b w-70 p-1  pl-2"></div>
                        </div>
                        <div className="d-flex">
                          <div className="test-r test-b w-10 p-1  pl-2 text-center">
                            1
                          </div>
                          <div className="test-r test-b w-20 p-1  pl-2">
                            Name of Owner
                          </div>
                          <div className="test-r test-b w-70 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                        </div>
                        <div className="d-flex">
                          <div className="test-r test-b w-10 p-1  pl-2 text-center">
                            2
                          </div>
                          <div className="test-r test-b w-20 p-1  pl-2">
                            Name of Tenent
                          </div>
                          <div className="test-r test-b w-70 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                        </div>
                        <div className="d-flex">
                          <div className="test-r test-b w-10 p-1  pl-2 text-center">
                            3
                          </div>
                          <div className="test-r test-b w-20 p-1  pl-2">
                            Rent Agreement/Lease deed details (Date & No.)
                          </div>
                          <div className="test-r test-b w-70 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                        </div>
                        <div className="d-flex">
                          <div className="test-r test-b w-10 p-1  pl-2 text-center">
                            4
                          </div>
                          <div className="test-r test-b w-20 p-1  pl-2">
                            Occupation age from Day1
                          </div>
                          <div className="test-r test-b w-10 p-1  pl-2">
                            From
                          </div>
                          <div className="test-r test-b w-25 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                          <div className="test-r test-b w-10 p-1  pl-2">To</div>
                          <div className="test-r test-b w-25 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">
                        9.a.8
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Present Occupancy
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">
                        9.a.9
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Land /Plot Area Considered for Valuation
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">
                        9.a.10
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Agreement Value
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">
                        9.a.11
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Government Guideline Rate(Rs./sqft)
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">
                        9.a.12
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Prevailing Market Rate Range(Rs./sqft)
                      </div>
                      <div className="w-10 text-left p-1 pl-2 test-r text-center">
                        From
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-10 text-left p-1 pl-2 test-r text-center">
                        To
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">
                        9.a.13
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Rate Adopted for Valuation of land
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r text-center"></div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Rate adopted for valuation for Building
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">
                        9.a.14
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Fair Market Value
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Relisable Value (90% Market value)
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Insurable value of Property
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="construction">
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">9.b</div>
                      <div className="w-90 text-left p-1 pl-2 test-r text-center">
                        <b>CONSTRUCTION / APARTMENTS only)</b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">
                        9.b.1
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Property type( Flat , villa , Bungalow,office)
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">
                        9.b.2
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r text-center">
                        Particulars
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        As per ownership Document
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        As per Approved plans & Permission
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        As per Physical visit
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">
                        9.b.3
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        property Usage
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
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
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">
                        9.b.4
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        No. of Storey
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
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
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">
                        9.b.5
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Property type (1BHK, 2BHKetc)
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
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
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">
                        9.b.6
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Structure (RCC, Framed, Load bearing,steel)
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
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
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">
                        9.b.7
                      </div>
                      <div className="w-90">
                        <div className="d-flex">
                          <div className="test-r test-b w-40 p-1  pl-2">
                            Completion/ Occupancy Date
                          </div>
                          <div className="test-r w-20 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                          <div className="test-r w-20 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                          <div className="test-r w-20 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                        </div>
                        <div className="d-flex">
                          <div className="test-r w-40 p-1  pl-2">
                            Age of the Building
                          </div>
                          <div className="test-r test-t w-20 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                          <div className="test-r test-t w-20 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                          <div className="test-r test-t w-20 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Residual Age of the Building
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
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
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">
                        9.b.8
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Carpet Area(SQFT)
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
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
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">
                        9.b.9
                      </div>
                      <div className="w-90">
                        <div className="d-flex">
                          <div className="test-r test-b w-40 p-1  pl-2">
                            Built up Area(SQFT)
                          </div>
                          <div className="test-r w-20 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                          <div className="test-r w-20 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                          <div className="test-r w-20 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                        </div>
                        <div className="d-flex">
                          <div className="w-10 p-1 test-r m-0 text-center">
                            1
                          </div>
                          <div className="test-r w-30 p-1  pl-2">
                            Loading used in %
                          </div>
                          <div className="test-r test-t w-20 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                          <div className="test-r test-t w-20 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                          <div className="test-r test-t w-20 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">
                        9.b.10
                      </div>
                      <div className="w-90">
                        <div className="d-flex">
                          <div className="test-r test-b w-40 p-1  pl-2">
                            Super Built up/ Saleable Area/ Constructed
                            Area(SQFT)
                          </div>
                          <div className="test-r w-20 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                          <div className="test-r w-20 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                          <div className="test-r w-20 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                        </div>
                        <div className="d-flex">
                          <div className="w-10 p-1 test-r m-0 text-center">
                            1
                          </div>
                          <div className="test-r w-30 p-1  pl-2">
                            Loading used in %
                          </div>
                          <div className="test-r test-t w-20 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                          <div className="test-r test-t w-20 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                          <div className="test-r test-t w-20 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">
                        9.b.11
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">FSI</div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
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
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">
                        9.b.12
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Structural Condition(Poor,Average,Good, structural
                        stability test required or not)
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">
                        9.b.13
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Present Occupancy
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">
                        9.b.14
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Government Guideline Rate(Rs./sqft)
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">
                        9.b.15
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Final Area in SQFT Considered for Valuation
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">
                        9.b.16
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Prevailing Market Rate Range(Rs./sqft)
                      </div>
                      <div className="w-10 text-left p-1 pl-2 test-r text-center">
                        From
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-10 text-left p-1 pl-2 test-r text-center">
                        To
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">
                        9.b.17
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Rate Adopted for Valuation
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">
                        9.b.18
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Fair Market Value
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Realisable value (90% of MV)
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">
                        9.b.19
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Depreciation Considered in percentage
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">
                        9.b.20
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Distress Value (75% of MV)
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">
                        9.b.21
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Unapproved Construction Value(SQFT)
                      </div>
                      <div className="w-10 text-left p-1 pl-2 test-r text-center">
                        Area:
                      </div>
                      <div className="w-10 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-10 text-left p-1 pl-2 test-r text-center">
                        Rate:
                      </div>
                      <div className="w-10 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-10 text-left p-1 pl-2 test-r text-center">
                        Value:
                      </div>
                      <div className="w-10 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">
                        9.b.22
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Internal and External Amenities
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">
                        9.b.23
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Violation Observed in %
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">
                        9.b.24
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r text-center">
                        Does property fall in Demolition list of Local
                        Regulatory Authority.
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">
                        9.b.25
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r text-center">
                        Remarks on Last 3 years average price of property
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">
                        9.b.26
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r text-center">
                        Insurable value of Property
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="summary">
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">10</div>
                      <div className="w-90 text-left p-1 pl-2 test-r text-center">
                        <b>SUMMARY:</b>
                      </div>
                    </div>

                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">
                        10.a
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <b>Land Value</b>
                      </div>
                      <div className="w-22 text-left p-1 pl-2 test-r">
                        <b>
                          Approved
                          <br />
                          /Authorised Construction/Unit Value
                        </b>
                      </div>
                      <div className="w-23 text-left p-1 pl-2 test-r">
                        <b>
                          Unapproved
                          <br />
                          /Unauthorised Construction/Unit Value
                        </b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <b>Amenities Cost</b>
                      </div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <b>Total Value of Property</b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-22 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-23 text-left p-1 pl-2 test-r">
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
                      <div className="w-15 text-left p-1 pl-2 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="remarks">
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-90 text-left p-1 pl-2 test-r font-bolder">
                        <b>Remarks : </b>
                        <ol>
                          <li>
                            The property under consideration is 2 BHK Flat
                            Located on 8th Floor in Stilt + 12th storied
                            residential building with 2 Lifts.
                          </li>
                          <li>
                            As per site observation access to the building is as
                            per norms and road width is 20 feet approx.
                          </li>
                          <li>
                            We have received Xerox Copies of Registered
                            Agreement CC & Sale Plan made available for
                            verification.
                          </li>
                          <li>
                            At the time of visit we have observed that property
                            was Self Occupied by Mrs. Renu Tilwani since last 24
                            Years.
                          </li>
                          <li>
                            During the site of visit we have not observed the
                            society name board.
                          </li>
                          <li>
                            Registered Agreement made between M/s. R P
                            Enterprises AND Mrs. Renu M. Tilwani Dated
                            28/10/1997 are made available for verification.
                          </li>
                          <li>
                            Unit boundaries are not mentioned in available
                            documents hence Please check at your legal end
                            before disbursement.
                          </li>
                          <li>
                            We have considered 35% Loading on Carpet Area as per
                            Registered Agreement to furnish the valuation
                            report.
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                  <div className="test d-flex">
                    <div className="w-10 p-1 test-r m-0 text-center"></div>
                    <div className="w-20 p-1 pl-2">site visit done by</div>
                    <div className="w-20 p-1 pl-2">vaibhav gorule</div>
                    <div className="w-20 p-1 pl-2">Stamp & sign</div>
                    <div className="w-30 p-1 pl-2"></div>
                  </div>
                  <div className="test d-flex">
                    <div className="w-10 p-1 test-r m-0 text-center"></div>
                    <div className="w-90 text-left p-1 pl-2 test-r font-bolder">
                      <b>Case checked by</b>
                    </div>
                  </div>
                  <div className="test d-flex">
                    <div className="w-100 p-1 pl-2">
                      <h2>DECLARATION (We hereby declare that):</h2>
                      <ul>
                        <li>
                          Our representative has visited this site. I/We have
                          not verified the title deeds of the properties with
                          the records of the registrar's office as this is
                          beyond the agreed scope of work.Assumptions are made
                          to the best of our knowledge and belief. Reliance is
                          based on the information furnished to us by the
                          identifier AND/OR client
                        </li>

                        <li>
                          The valuer shall not be responsible for the matters of
                          legal nature that affects the value and opinion
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
                          said report and is based on market feedback on values
                          of similar properties. Client is free to obtain other
                          independent opinions on the same. Fair, market value
                          of such properties / localities may increase or
                          decrease, depending on the future market conditions &
                          scenarios. value varies with the purpose & date.This
                          report is not to be referred if the purpose is
                          different other than mentioned.No structural survey
                          was conducted by us as it is not in our scope of work
                        </li>
                        <li>
                          We hereby declare, “The information furnished above is
                          true and correct to the best of our knowledge and
                          belief. We have no direct or indirect interest in the
                          assets valued.
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="test d-flex">
                    <div className="w-25 p-1 test-r m-0 text-center">
                      Bank Name-:
                    </div>
                    <div className="w-75 text-left p-1 pl-2 test-r font-bolder"></div>
                  </div>
                  <div className="test d-flex">
                    <div className="w-25 p-1 test-r m-0 text-center">
                      Customer Name-:
                    </div>
                    <div className="w-75 text-left p-1 pl-2 test-r font-bolder"></div>
                  </div>
                  <div className="test d-flex">
                    <div className="w-25 p-1 test-r m-0 text-center">
                      Postal Address-:
                    </div>
                    <div className="w-75 text-left p-1 pl-2 test-r font-bolder"></div>
                  </div>
                  <div className="test d-flex">
                    <div className="w-100 p-1 test-r m-0 text-center">
                      <b>Property Photos Location Sketch</b>
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

export default connect(mapStateToProps, mapDispatchToProps)(HdbReport);
