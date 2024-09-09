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

function CsbFormat(props) {
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
                    <b>Valuation Report</b>
                  </div>
                  <section className="header-details">
                    <div className="test d-flex">
                      <div className="w-10 p-1 text-center test-r">
                        <b>1</b>
                      </div>
                      <div className="w-90 p-1">
                        <b>Customer Details</b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r"></div>
                      <div className="w-90">
                        <div className="d-flex">
                          <div className="w-15 test-b p-1 test-r">Name</div>
                          <div className="w-20 test-b p-1 test-r">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                          <div className="w-15 test-b p-1 test-r">
                            Application No.
                          </div>
                          <div className="w-50 test-b p-1 test-r">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                        </div>
                        <div className="d-flex">
                          <div className="w-15 p-1 test-r">Contact No </div>
                          <div className="w-20 p-1 test-r">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                          <div className="w-15 p-1 test-r">Case Type</div>
                          <div className="w-50 p-1 test-r">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 text-center test-r">
                        <b>2</b>
                      </div>
                      <div className="w-90 p-1">
                        <b>Asset Details</b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r"></div>
                      <div className="w-90">
                        <div className="d-flex">
                          <div className="w-15 test-b p-1 test-r">
                            Property Owner
                          </div>
                          <div className="w-85 test-b p-1 test-r">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                        </div>
                        <div className="d-flex">
                          <div className="w-15 test-b p-1 test-r">
                            Postal Address
                          </div>
                          <div className="w-85 test-b p-1 test-r">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                        </div>
                        <div className="d-flex">
                          <div className="w-15 test-b p-1 test-r">
                            Legal Address
                          </div>
                          <div className="w-85 test-b p-1 test-r">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                        </div>
                        <div className="d-flex">
                          <div className="w-15 test-b p-1 test-r">
                            Nearby landmark
                          </div>
                          <div className="w-85 test-b p-1 test-r">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                        </div>
                        <div className="d-flex">
                          <div className="w-15 test-b p-1 test-r">
                            Geo Coordinates
                          </div>
                          <div className="w-85 test-b p-1 test-r">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                        </div>
                        <div className="d-flex">
                          <div className="w-15 p-1 test-r">
                            How to reach the property{" "}
                          </div>
                          <div className="w-85 p-1 test-r">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 text-center test-r">
                        <b>3</b>
                      </div>
                      <div className="w-90 p-1">
                        <b>Document Details</b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r"></div>
                      <div className="w-15 p-1 test-r">Layout Plan</div>
                      <div className="w-20 p-1 test-r">Copy</div>
                      <div className="w-15 p-1 test-r">
                        Name of approving authority
                      </div>
                      <div className="w-10 p-1 test-r">MCGM</div>
                      <div className="w-10 p-1 test-r">
                        Document date & Approval No.
                      </div>
                      <div className="w-20 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r"></div>
                      <div className="w-15 p-1 test-r">Building Plan</div>
                      <div className="w-20 p-1 test-r">OC</div>
                      <div className="w-15 p-1 test-r">
                        Name of approving authority
                      </div>
                      <div className="w-10 p-1 test-r">Copy</div>
                      <div className="w-10 p-1 test-r">
                        Document date & Approval No.
                      </div>
                      <div className="w-20 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r"></div>
                      <div className="w-15 p-1 test-r">OC Details </div>
                      <div className="w-20 p-1 test-r">OC</div>
                      <div className="w-15 p-1 test-r">
                        Name of approving authority
                      </div>
                      <div className="w-10 p-1 test-r">Copy</div>
                      <div className="w-10 p-1 test-r">
                        Document date & Approval No.
                      </div>
                      <div className="w-20 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r"></div>
                      <div className="w-15 p-1 test-r">
                        Construction Permission
                      </div>
                      <div className="w-10 p-1 test-r">
                        {" "}
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-10 p-1 test-r">
                        Name of approving authority
                      </div>
                      <div className="w-15 p-1 test-r">Copy</div>
                      <div className="w-10 p-1 test-r">
                        Document date & Approval No.{" "}
                      </div>
                      <div className="w-30 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r"></div>
                      <div className="w-15 p-1 test-r">Legal Documents</div>
                      <div className="w-35 p-1 test-r">
                        {" "}
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>

                      <div className="w-10 p-1 test-r">
                        Name of approving authority
                      </div>
                      <div className="w-10 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-10 p-1 test-r">
                        Document date & Approval No.
                      </div>
                      <div className="w-10 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r"></div>
                      <div className="w-25 p-1 test-r">
                        List of documents verified{" "}
                      </div>
                      <div className="w-25 p-1 test-r text-center">
                        Document Name
                      </div>
                      <div className="w-10 p-1 test-r">Date</div>
                      <div className="w-30 p-1 test-r text-center">
                        Reference No.
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r"></div>
                      <div className="w-25 p-1 test-r">
                        List of documents verified{" "}
                      </div>
                      <div className="w-25 p-1 test-r">Sale deed</div>
                      <div className="w-10 p-1 test-r">
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
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r"></div>
                      <div className="w-25 p-1 test-r">
                        List of documents verified{" "}
                      </div>
                      <div className="w-25 p-1 test-r">Land Tax</div>
                      <div className="w-10 p-1 test-r">
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
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r"></div>
                      <div className="w-25 p-1 test-r">
                        List of documents verified{" "}
                      </div>
                      <div className="w-25 p-1 test-r">Building Tax</div>
                      <div className="w-10 p-1 test-r">
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
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r"></div>
                      <div className="w-25 p-1 test-r">
                        List of documents verified{" "}
                      </div>
                      <div className="w-25 p-1 test-r">
                        Possession Certificate
                      </div>
                      <div className="w-10 p-1 test-r">
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
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r"></div>
                      <div className="w-25 p-1 test-r">
                        List of documents verified{" "}
                      </div>
                      <div className="w-25 p-1 test-r">
                        Location Certificate
                      </div>
                      <div className="w-10 p-1 test-r">
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
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r"></div>
                      <div className="w-25 p-1 test-r">
                        List of documents verified{" "}
                      </div>
                      <div className="w-25 p-1 test-r">Location Sketch</div>
                      <div className="w-10 p-1 test-r">
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
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 text-center test-r">
                        <b>4</b>
                      </div>
                      <div className="w-90 p-1">
                        <b>Physical Details</b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r"></div>
                      <div className="w-90 p-1 test-r">
                        Adjoining Property/Boundaries{" "}
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r"></div>
                      <div className="w-15 p-1 test-r"></div>
                      <div className="w-10 p-1 test-r text-center">
                        As per document{" "}
                      </div>
                      <div className="w-35 p-1 test-r text-center">
                        As per site
                      </div>
                      <div className="w-10 p-1 test-r"></div>
                      <div className="w-10 p-1 test-r text-center">
                        As per document
                      </div>
                      <div className="w-10 p-1 test-r text-center">
                        As per site
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r">East</div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-10 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r text-center">West</div>
                      <div className="w-15 p-1 test-r"></div>
                      <div className="w-35 p-1 test-r text-center">
                        Eastern Express Highway
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r">North</div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-10 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r text-center">South</div>
                      <div className="w-15 p-1 test-r"></div>
                      <div className="w-35 p-1 test-r text-center">
                        Internal Road
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r">
                        Matching of Boundaries
                      </div>
                      <div className="w-25 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r">
                        Remarks if any mismatch
                      </div>
                      <div className="w-50 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r">
                        Property identifiable at site
                      </div>
                      <div className="w-25 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r">
                        Property demarcated at site
                      </div>
                      <div className="w-50 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r">Land use</div>
                      <div className="w-25 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r">Type of structure</div>
                      <div className="w-50 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r">Type of property</div>
                      <div className="w-25 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r">
                        Remarks if any deviation in usage
                      </div>
                      <div className="w-50 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r">Total No of floors</div>
                      <div className="w-25 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-15 p-1 test-r">
                        Remarks if any deviation as per local bye laws/approved
                        plan
                      </div>
                      <div className="w-50 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-25 p-1 test-r">
                        Floor on which the property is located{" "}
                      </div>
                      <div className="w-25 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 p-1 test-r">
                        Minimum margins available as per local bye laws
                      </div>
                      <div className="w-30 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-25 p-1 test-r">No of rooms</div>
                      <div className="w-25 p-1 test-r">Living/Dining</div>
                      <div className="w-20 p-1 test-r">Office</div>
                      <div className="w-10 p-1 test-r">No of rooms</div>
                      <div className="w-10 p-1 test-r">Bedrooms</div>
                      <div className="w-10 p-1 test-r text-center">NA</div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-25 p-1 test-r">Toilets</div>
                      <div className="w-25 p-1 test-r">Toilets</div>
                      <div className="w-20 p-1 test-r">NA</div>
                      <div className="w-10 p-1 test-r">Kitchen</div>
                      <div className="w-10 p-1 test-r">Kitchen</div>
                      <div className="w-10 p-1 test-r text-center">NA</div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-25 p-1 test-r">
                        Approx age of property
                      </div>
                      <div className="w-25 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 p-1 test-r">
                        Residual age of property
                      </div>
                      <div className="w-30 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-25 p-1 test-r">Nature of access</div>
                      <div className="w-25 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 p-1 test-r">Width of access</div>
                      <div className="w-30 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    {/* 5 */}
                    <div className="test d-flex">
                      <div className="w-10 p-1 text-center test-r">
                        <b>5</b>
                      </div>
                      <div className="w-90 p-1">
                        <b>Tenure/Occupancy Details</b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r"></div>
                      <div className="w-15 p-1 test-r">Status of tenure</div>
                      <div className="w-25 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 p-1 test-r">
                        No of Years of Occupancy
                      </div>
                      <div className="w-30 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-25 p-1 test-r">Name of Occupant </div>
                      <div className="w-25 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 p-1 test-r">
                        Any other observations
                      </div>
                      <div className="w-30 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    {/* 6 */}
                    <div className="test d-flex">
                      <div className="w-10 p-1 text-center test-r">
                        <b>6</b>
                      </div>
                      <div className="w-90 p-1">
                        <b>Stage of construction</b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r"></div>
                      <div className="w-15 p-1 test-r">
                        Stage of construction{" "}
                      </div>
                      <div className="w-25 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 p-1 test-r">
                        If under construction, extent of completion
                      </div>
                      <div className="w-30 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    {/* 7 */}
                    <div className="test d-flex">
                      <div className="w-10 p-1 text-center test-r">
                        <b>7</b>
                      </div>
                      <div className="w-90 p-1">
                        <b>Violations, if any, observed</b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r"></div>
                      <div className="w-15 p-1 test-r">
                        Nature and extent of violations
                      </div>
                      <div className="w-75 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    {/* 8 */}
                    <div className="test d-flex">
                      <div className="w-10 p-1 text-center test-r">
                        <b>8</b>
                      </div>
                      <div className="w-90 p-1">
                        <b>Area details of property</b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r"></div>
                      <div className="w-15 p-1 test-r">Plot Area</div>
                      <div className="w-10 p-1 test-r">0</div>
                      <div className="w-10 p-1 test-r"></div>
                      <div className="w-15 p-1 test-r"></div>
                      <div className="w-10 p-1 test-r"></div>
                      <div className="w-30 p-1 test-r"></div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r"></div>
                      <div className="w-15 p-1 test-r">Building Area </div>
                      <div className="w-20 p-1 test-r text-center">
                        Plinth Area
                      </div>
                      <div className="w-15 p-1 test-r text-center">Carpet</div>
                      <div className="w-10 p-1 test-r text-center">SBUA</div>
                      <div className="w-30 p-1 test-r text-center">
                        Usage Remarks
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r"></div>
                      <div className="w-15 p-1 test-r text-center">BF</div>
                      <div className="w-10 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-10 p-1 test-r text-center">
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
                      <div className="w-10 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-30 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r"></div>
                      <div className="w-15 p-1 test-r text-center">GF</div>
                      <div className="w-10 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-10 p-1 test-r text-center">
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
                      <div className="w-10 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-30 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r"></div>
                      <div className="w-15 p-1 test-r text-center">1F</div>
                      <div className="w-10 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-10 p-1 test-r text-center">
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
                      <div className="w-10 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-30 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r"></div>
                      <div className="w-15 p-1 test-r text-center">2F</div>
                      <div className="w-10 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-10 p-1 test-r text-center">
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
                      <div className="w-10 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-30 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r"></div>
                      <div className="w-15 p-1 test-r text-center">
                        Total Area
                      </div>
                      <div className="w-10 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-10 p-1 test-r text-center">
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
                      <div className="w-10 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-30 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r"></div>
                      <div className="w-15 p-1 test-r text-center">
                        Carpet Area / BUA as per Document{" "}
                      </div>
                      <div className="w-75 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r"></div>
                      <div className="w-15 p-1 test-r text-center">
                        Carpet Area as per Plan
                      </div>
                      <div className="w-75 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r">Remarks</div>
                      <div className="w-90 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    {/* 9 */}
                    <div className="test d-flex">
                      <div className="w-10 p-1 text-center test-r">
                        <b>9</b>
                      </div>
                      <div className="w-90 p-1">
                        <b>Valuation</b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r"></div>
                      <div className="w-25 p-1 test-r">Land Value</div>
                      <div className="w-10 p-1 test-r text-center">
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
                      <div className="w-30 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r"></div>
                      <div className="w-25 p-1 test-r">Building Value</div>
                      <div className="w-10 p-1 test-r text-center">
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
                      <div className="w-40 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-35 p-1 test-r">CA / BUA / SUBA </div>
                      <div className="w-10 p-1 test-r text-center">
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
                      <div className="w-40 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-35 p-1 test-r">Any other value</div>
                      <div className="w-10 p-1 test-r text-center">
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
                      <div className="w-40 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r">
                        <b>Fair Market Value</b>
                      </div>
                      <div className="w-90 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r">
                        <b>Distress Value</b>
                      </div>
                      <div className="w-90 p-1 test-r text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-50 p-1 test-r">
                        Guideline Value of Land as per government records
                      </div>
                      <div className="w-50 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    {/* 10 */}
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r text-center">
                        <b>10</b>
                      </div>
                      <div className="w-90 p-1 test-r">
                        <b>Remarks & Marketability of the property</b>
                      </div>
                    </div>
                    <div className="test">
                      <div className="w-100 p-1 test-r">
                        Remarks: <br />
                        <br />
                        <ol>
                          <li>
                            The property under consideration is Office on 6th
                            Floor in Basement + Ground + 3 Podiums + 14th
                            storied commercial building with 7 Lifts.
                          </li>
                          <li>
                            As per site observation access to the building is as
                            per norms and road width is 25 feet approx.
                          </li>
                          <li>
                            We have received Xerox Copies of Draft Agreement
                            Sanctioned Plan & OC made available for
                            verification.
                          </li>
                          <li>
                            As per site visit we have observed that property was
                            Vacant (Bare Shell Condition).
                          </li>
                          <li>
                            During our visit we have not observed society name
                            board for Office premises.
                          </li>
                          <li>
                            We have considered 50% Loading on Carpet Area as per
                            Sanctioned Plan to Derive SBUA to furnish the
                            valuation report.
                          </li>
                          <li>
                            Additional covered car parking of Rs. 800000/- is
                            considered in above valuation as mentioned in the
                            Draft Agreement.
                          </li>
                        </ol>
                      </div>
                    </div>
                    {/* 11 */}
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r text-center">
                        <b>11</b>
                      </div>
                      <div className="w-90 p-1 test-r">
                        <b>Additional Checks</b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-85 p-1 test-r">
                        Property is Sarfaesi Compliant
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-85 p-1 test-r">
                        Land not yet demarcated where the landed properties is a
                        part of a large stretch
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-85 p-1 test-r">
                        Land not yet partitioned
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-85 p-1 test-r">
                        Properties, which are expected to be acquired on road
                        widening as per government notifications.
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-85 p-1 test-r">
                        Property located in the first or above floors for which
                        independent right of access is not available.
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-85 p-1 test-r">
                        Properties which include religious worship places,
                        whether private or public.
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-85 p-1 test-r">
                        Properties which are common burial grounds/ crematories
                        or adjacent to such places.
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-85 p-1 test-r">
                        Properties which encroach on water bodies like
                        backwaters, river, lake etc. CRZ Violations
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-85 p-1 test-r">
                        Properties in which pipelines have been laid down
                        underneath for gas, water, petrol etc.
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-85 p-1 test-r">
                        Properties above which Extra High Tension (EHT) power
                        grid line is passing through.
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-85 p-1 test-r">
                        Properties which are in the nature of marshy land.
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-85 p-1 test-r">
                        Properties which are wet land, for purpose other than
                        for agriculture (except plantations).
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-85 p-1 test-r">
                        Properties in which ponds occupy more than 25% of the
                        total area.
                      </div>
                      <div className="w-15 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    {/* 12 */}
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r text-center">
                        <b>12</b>
                      </div>
                      <div className="w-90 p-1 test-r">
                        <b>Declaration</b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-100 p-1 test-r">
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
                    {/* 13 */}
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r text-center">
                        <b>13</b>
                      </div>
                      <div className="w-90 p-1 test-r">
                        <b>Name and signature of the valuer</b>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r text-center"></div>
                      <div className="w-55 p-1 test-r">Libra valuers</div>
                      <div className="w-15 p-1 test-r">Signature</div>
                      <div className="w-20 p-1 test-r"></div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-50 p-1 test-r text-center">Date</div>
                      <div className="w-50 p-1 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
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

export default connect(mapStateToProps, mapDispatchToProps)(CsbFormat);
