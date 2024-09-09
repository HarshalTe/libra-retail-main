import React from "react";
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
import { Button } from "reactstrap";
import printJS from "print-js";

function RealReport() {
  const printPdf = () => {
    printJS({
      printable: "htmlToPdf2",
      type: "html",
      css: "./Report1.css",
      scanStyles: true,
      targetStyles: "[*]",
      font_size: "8pt",
      maxWidth: 1080,
      // base64: true,
      honorMarginPadding: false,
      style: "@page {  options: footers;  }",
    });
  };

  return (
    <div>
      <Button
        color="success"
        onClick={printPdf}
        className="print-button w-20  m-3"
      >
        <i className="fa fa-save mr-2" />
        Print Report
      </Button>
      <div id="htmlToPdf2" className="f-10">
        <div className="logo">
          <img src={Logo} alt="Logo" className="logo-img" width="100%" />
        </div>
        <div className="f-10 1-page test text-center mb-150">
          <h6 className=" p-1 m-0 test">
            {" "}
            VALUATION REPORT FORMAT FOR LAP/BT/TOP UP /SELF CONST{" "}
          </h6>
          <div className="test d-flex">
            <h6 className="w-70 p-1 test-r m-0">A.GENERAL DETAILS</h6>
            <div className="w-15 text-left p-1 pl-2 test-r">Report Date</div>
            <div className="w-15 p-1 text-left pl-2">12-05-2022</div>
          </div>
          <div className="test d-flex">
            <div className="w-10 p-1 test-r m-0">1</div>
            <div className="w-20 text-left p-1 pl-2 test-r">
              Prospect Number
            </div>
            <div className="w-70 p-1  pl-2">0</div>
          </div>
          <div className="test d-flex">
            <div className="w-10 p-1 test-r m-0">2</div>
            <div className="w-20 text-left p-1 pl-2 test-r">Type of Loan</div>
            <div className="w-70 p-1  pl-2">LAP</div>
          </div>

          <div className="test d-flex">
            <div className="w-10 p-1 test-r m-0">3</div>
            <div className="w-20 text-left p-1 pl-2 test-r">
              Name of the Customer
            </div>
            <div className="w-70 p-1  pl-2">Surendra Warden(NIL report)</div>
          </div>
          <div className="test d-flex">
            <div className="w-10 p-1 test-r m-0">4</div>
            <div className="w-20 text-left p-1 pl-2 test-r">
              Name of Property Owner as per draft deed / ownership documents
            </div>
            <div className="w-70 p-1  pl-2"></div>
          </div>
          <div className="test d-flex">
            <div className="w-10 p-1 test-r m-0">5</div>
            <div className="w-20 text-left p-1 pl-2 test-r">
              Property Address as per site
            </div>
            <div className="w-70 p-1  pl-2">
              Flat No. 3, West Hill, Near Bank Of Baroda, Nepeansea Road,
              Malabar Hill, Mumbai - 400036
            </div>
          </div>

          <div className="test d-flex">
            <div className="w-10 p-1 test-r m-0">6</div>
            <div className="w-20 text-left p-1 pl-2 test-r">
              Legal address of property
            </div>
            <div className="w-70 p-1  pl-2">
              Flat No. 3, West Hill, Near Bank Of Baroda, Nepeansea Road,
              Malabar Hill, Mumbai - 400036
            </div>
          </div>

          <div className="test d-flex">
            <div className="w-10 p-1 test-r m-0">7</div>
            <div className="w-20 text-left p-1 pl-2 test-r">
              Contact no of the Owner
            </div>
            <div className="w-70 d-flex">
              <div className="test-r p-1 w-50">Na</div>
              <div className="test-r p-1 w-30">
                Name of Tenant if Applicable
              </div>
              <div className="p-1 w-20">NA</div>
            </div>
          </div>

          <div className="test d-flex">
            <div className="w-10 p-1 test-r m-0">8</div>
            <div className="w-20 text-left p-1 pl-2 test-r">
              Technical documents made available for verification
            </div>
            <div className="w-70 p-1  pl-2">Documents Not Provided</div>
          </div>

          <div className="test d-flex">
            <div className="w-10 p-1 test-r m-0">9</div>
            <div className="w-20 text-left p-1 pl-2 test-r">Landmark</div>
            <div className="w-70 p-1  pl-2">Near Bank Of Baroda</div>
          </div>
          <div className="test d-flex">
            <div className="w-10 p-1 test-r m-0">10</div>
            <div className="w-20 text-left p-1 pl-2 test-r">
              Date of Technical Visit
            </div>
            <div className="w-70 p-1  pl-2">04-05-2022</div>
          </div>

          <div className="test d-flex">
            <div className="w-10 p-1 test-r m-0">11</div>
            <div className="w-20 text-left p-1 pl-2 test-r">Property Usage</div>
            <div className="w-70 d-flex">
              <div className="test-r p-1 w-25">As per doc</div>
              <div className="test-r p-1 w-25">Residential</div>
              <div className="p-1 w-25">On site</div>
              <div className="p-1 w-25">Residential</div>
            </div>
          </div>

          <div className="test d-flex">
            <div className="w-10 p-1 test-r m-0">12</div>
            <div className="w-20 text-left p-1 pl-2 test-r">Occupancy</div>
            <div className="w-70 p-1  pl-2">Self Occupied</div>
          </div>

          <div className="test d-flex">
            <div className="w-10 p-1 test-r m-0">13</div>
            <div className="w-20 text-left p-1 pl-2 test-r">
              Property falls in demolition list of local authority
            </div>
            <div className="w-70 p-1  pl-2">Low</div>
          </div>

          <div className="test d-flex">
            <div className="w-10 p-1 test-r m-0">14</div>
            <div className="w-20 text-left p-1 pl-2 test-r">Marketability</div>
            <div className="w-70 p-1  pl-2">Average</div>
          </div>

          <div className="test d-flex">
            <div className="w-10 p-1 test-r m-0">15</div>
            <div className="w-20 text-left p-1 pl-2 test-r">
              Front Side Road Width
            </div>
            <div className="w-70 p-1  pl-2">15 Feet Approximately</div>
          </div>

          <h6 className="m-0 p-1 test-r test-l">
            B. SURROUNDING LOCALITY DETAILS
          </h6>

          <div className="test d-flex">
            <div className="w-10 p-1 test-r m-0">1</div>
            <div className="w-20 text-left p-1 pl-2 test-r">
              Ward No/ Municipal land No
            </div>
            <div className="w-70 p-1  pl-2">NA</div>
          </div>

          <div className="test d-flex">
            <div className="w-10 p-1 test-r m-0">2</div>
            <div className="w-20 text-left p-1 pl-2 test-r">
              Type of locality
            </div>
            <div className="w-70 p-1 text-left pl-2">Upper Class</div>
          </div>

          <div className="test d-flex">
            <div className="w-10 p-1 test-r m-0">3</div>
            <div className="w-20 text-left p-1 pl-2 test-r">
              Type of the Property
            </div>
            <div className="w-70 p-1 text-left pl-2">Residential</div>
          </div>

          <div className="test d-flex">
            <div className="w-10 p-1 test-r m-0">4</div>
            <div className="w-20 text-left p-1 pl-2 test-r">
              Distance From City Centre
            </div>
            <div className="w-70 p-1 text-left pl-2">
              3.7 km from Mahalaxmi Railway Station
            </div>
          </div>

          <div className="test d-flex">
            <div className="w-10 p-1 test-r m-0">5</div>
            <div className="w-20 text-left p-1 pl-2 test-r">Site Access</div>
            <div className="w-70 p-1 text-left pl-2">Average</div>
          </div>

          <div className="test d-flex">
            <div className="w-10 p-1 test-r m-0">6</div>
            <div className="w-20 text-left test-r">
              <div className="p-1 test-b">Approving Authority:</div>
              <div className="p-1 test-b">Corporation Limit</div>
              <div className="p-1 ">Town Panchayat</div>
            </div>
            <div className="w-70">
              <div className="test-b p-2 pb-3"></div>
              <div className="d-flex w-100">
                <div className="w-33 p-1 test-b test-r">Yes</div>
                <div className="w-33 p-1 test-b test-r">Municipal Limit/DA</div>
                <div className="w-34 p-1 test-b">MCGM</div>
              </div>
              <div className="d-flex w-100">
                <div className="w-33 p-1 test-b test-r">NA</div>
                <div className="w-33 p-1 test-b test-r">Village Panchayat</div>
                <div className="w-34 p-1 test-b">NA</div>
              </div>
            </div>
          </div>

          <div className="test-b test-r d-flex">
            <div className="w-10 p-1 test-r m-0">7</div>
            <div className="w-20 text-left test-r p-1">
              Conditions of Approach Road{" "}
            </div>
            <div className="w-70 d-flex">
              <div className="w-33 p-1 test-b test-r">Good </div>
              <div className="w-33 p-1 test-b test-r">Mud road Width</div>
              <div className="w-34 p-1 test-b">Bituminous Road</div>
            </div>
          </div>

          <h6 className="m-0 p-1 test-r test-b">C. PROPERTY DETAILS</h6>
          <div className="test-b test-r d-flex">
            <div className="w-10 p-1 test-r m-0">1</div>
            <div className="w-20 text-left test-r p-1">
              No of Floors Constructed
            </div>
            <div className="w-70 d-flex">
              <div className="w-20 p-1 test-r">Ground + 4th Floor</div>
              <div className="w-16 p-1  test-r"></div>
              <div className="w-16 p-1  test-r"></div>
              <div className="w-16 p-1  test-r"></div>
              <div className="w-16 p-1  test-r"></div>
              <div className="w-16 p-1 "></div>
            </div>
          </div>

          <div className="test-b test-r d-flex">
            <div className="w-10 p-1 test-r m-0">2</div>
            <div className="w-20 text-left test-r p-1">Floor Wise Usage</div>
            <div className="w-70 d-flex">
              <div className="w-20 p-1 test-r">Residential</div>
              <div className="w-16 p-1 test-r"></div>
              <div className="w-16 p-1 test-r"></div>
              <div className="w-16 p-1 test-r"></div>
              <div className="w-16 p-1 test-r"></div>
              <div className="w-16 p-1"></div>
            </div>
          </div>

          <div className="test-b test-r d-flex">
            <div className="w-10 p-1 test-r m-0">3</div>
            <div className="w-20 text-left test-r p-1">Age of the property</div>
            <div className="w-70 d-flex">
              <div className="w-33 p-1 test-r">
                35 Years (As Per Site Information) Years
              </div>
              <div className="w-33 p-1  test-r">Residual age</div>
              <div className="w-34 p-1 ">25 Years</div>
            </div>
          </div>

          <div className="test-b test-r d-flex">
            <div className="w-10 p-1 test-r m-0">4</div>
            <div className="w-20 text-left p-1 pl-2 test-r">
              Side Boundaries
            </div>
            <div className="w-70 p-1 text-left pl-2"></div>
          </div>

          <div className="test-b test-r d-flex">
            <div className="w-10 p-1 test-r m-0"></div>
            <div className="w-20 text-left test-r p-1"></div>
            <div className="w-70 d-flex">
              <div className="w-33 p-1 test-r">As per document</div>
              <div className="w-33 p-1  test-r">As per site</div>
              <div className="w-34 p-1 ">As per plan</div>
            </div>
          </div>

          <div className="test-b test-r d-flex">
            <div className="w-10 p-1 test-r m-0"></div>
            <div className="w-20 text-left test-r p-1">North</div>
            <div className="w-70 d-flex">
              <div className="w-33 p-1 test-r">Documents Not Provided</div>
              <div className="w-33 p-1  test-r">Simla Nagar</div>
              <div className="w-34 p-1 ">Documents Not Provided</div>
            </div>
          </div>

          <div className="test-b test-r d-flex">
            <div className="w-10 p-1 test-r m-0"></div>
            <div className="w-20 text-left test-r p-1">South</div>
            <div className="w-70 d-flex">
              <div className="w-33 p-1 test-r">Documents Not Provided</div>
              <div className="w-33 p-1  test-r">Ashiana Building</div>
              <div className="w-34 p-1 ">Documents Not Provided</div>
            </div>
          </div>

          <div className="test-b test-r d-flex">
            <div className="w-10 p-1 test-r m-0"></div>
            <div className="w-20 text-left test-r p-1">East</div>
            <div className="w-70 d-flex">
              <div className="w-33 p-1 test-r">Documents Not Provided</div>
              <div className="w-33 p-1  test-r">Hill Side Building </div>
              <div className="w-34 p-1 ">Documents Not Provided</div>
            </div>
          </div>

          <div className="test-b test-r d-flex">
            <div className="w-10 p-1 test-r m-0"></div>
            <div className="w-20 text-left test-r p-1">West</div>
            <div className="w-70 d-flex">
              <div className="w-33 p-1 test-r">Documents Not Provided</div>
              <div className="w-33 p-1  test-r">Open Space</div>
              <div className="w-34 p-1 ">Documents Not Provided</div>
            </div>
          </div>

          <div className="test-b test-r d-flex">
            <div className="w-10 p-1 test-r m-0">5</div>
            <div className="w-20 text-left p-1 pl-2 test-r">
              Boundaries are matching or not
            </div>
            <div className="w-70 p-1 pl-2">NA</div>
          </div>

          <div className="test-b test-r d-flex">
            <div className="w-10 p-1 test-r m-0">6</div>
            <div className="w-20 text-left p-1 pl-2 test-r">
              Property Identified through
            </div>
            <div className="w-70 p-1 pl-2">Surendra Warden, Na</div>
          </div>

          <div className="test-b test-r d-flex">
            <div className="w-10 p-1 test-r m-0">7</div>
            <div className="w-20 text-left p-1 pl-2 test-r">
              Plot Demarcated at site
            </div>
            <div className="w-70 p-1 pl-2">Yes</div>
          </div>

          <div className="test-b test-r d-flex">
            <div className="w-10 p-1 test-r m-0">8</div>
            <div className="w-20 text-left p-1 pl-2 test-r">Amenities</div>
            <div className="w-70 p-1 pl-2">Security, CCTV, Parking etc</div>
          </div>

          <h6 className="m-0 p-1 test-r test-b">D.STRUCTURAL DETAILS</h6>

          <div className="test-b test-r d-flex">
            <div className="w-10 p-1 test-r m-0">1</div>
            <div className="w-20 text-left test-r p-1">Type of Structure</div>
            <div className="w-70 d-flex">
              <div className="w-33 p-1 test-r">RCC Frame structure</div>
              <div className="w-33 p-1  test-r">No of Floors Approved</div>
              <div className="w-34 p-1 ">Ground + 4th Floor</div>
            </div>
          </div>

          <div className="test-b test-r d-flex">
            <div className="w-10 p-1 test-r m-0">2</div>
            <div className="w-20 text-left p-1 pl-2 test-r">No of wings</div>
            <div className="w-70 p-1 pl-2">Single Building</div>
          </div>

          <div className="test-b test-r d-flex">
            <div className="w-10 p-1 test-r m-0">3</div>
            <div className="w-20 text-left p-1 pl-2 test-r">
              No. of flats on each floor
            </div>
            <div className="w-70 p-1 pl-2">2 Flats On Each Floor</div>
          </div>

          <div className="test-b test-r d-flex">
            <div className="w-10 p-1 test-r m-0">4</div>
            <div className="w-20 text-left p-1 pl-2 test-r">
              Quality of construction
            </div>
            <div className="w-70 p-1 pl-2">Average</div>
          </div>

          <div className="test-b test-r d-flex">
            <div className="w-10 p-1 test-r m-0">5</div>
            <div className="w-20 text-left test-r p-1">
              Structural observation
            </div>
            <div className="w-70 d-flex">
              <div className="w-33 p-1 test-r">Average, No Cracks</div>
            </div>
          </div>

          <div className="test-b test-r d-flex">
            <div className="w-10 p-1 test-r m-0">6</div>
            <div className="w-20 text-left p-1 pl-2 test-r">Configuration</div>
            <div className="w-70 p-1 pl-2">3BHK</div>
          </div>
        </div>

        <div className="f-10 2-page test border-bottom-0 text-center mb-100">
          <h6 className="m-0 p-1 test-r test-b">E. INTERIORS</h6>

          <div className="test-b test-r d-flex">
            <div className="w-10 p-1 test-r m-0">1</div>
            <div className="w-20 text-left p-1 pl-2 test-r">
              Flooring & finishing
            </div>
            <div className="w-70 p-1 pl-2">Vitrified Tiles Flooring</div>
          </div>

          <div className="test-b test-r d-flex">
            <div className="w-10 p-1 test-r m-0">2</div>
            <div className="w-20 text-left p-1 pl-2 test-r">
              Roofing and terracing
            </div>
            <div className="w-70 p-1 pl-2">RCC Flat Roof</div>
          </div>

          <div className="test-b test-r d-flex">
            <div className="w-10 p-1 test-r m-0">3</div>
            <div className="w-20 text-left p-1 pl-2 test-r">
              Quality of fixtures & Settings
            </div>
            <div className="w-70 p-1 pl-2">Concealed Fittings</div>
          </div>

          <div className="test-b test-r d-flex">
            <div className="w-10 p-1 test-r m-0">4</div>
            <div className="w-20 text-left p-1 pl-2 test-r">
              Doors & Windows
            </div>
            <div className="w-70 p-1 pl-2">
              Wooden Doors & Aluminum Sliding Window
            </div>
          </div>

          <h6 className="m-0 p-1 test-r test-b">F.PLAN APPROVAL DETAILS</h6>

          <div className="test-b test-r d-flex">
            <div className="w-10 p-1 test-r m-0">1</div>
            <div className="w-20 text-left p-1 pl-2 test-r">
              Construction as per approved / sanctioned plans
            </div>
            <div className="w-70 p-1 pl-2">Yes</div>
          </div>

          <div className="test-b test-r d-flex">
            <div className="w-10 p-1 test-r m-0">2</div>
            <div className="w-20 text-left p-1 pl-2 test-r">
              Details of approved plan with approval no & date
            </div>
            <div className="w-70 p-1 pl-2">Sanctioned Plan Not Provided</div>
          </div>

          <div className="test-b test-r d-flex">
            <div className="w-10 p-1 test-r m-0">3</div>
            <div className="w-20 text-left p-1 pl-2 test-r">
              Construction permission Number and date.
            </div>
            <div className="w-70 p-1 pl-2">
              CC Not Provided, OC Not Provided
            </div>
          </div>

          <div className="test-b test-r d-flex">
            <div className="w-10 p-1 test-r m-0">4</div>
            <div className="w-20 text-left p-1 pl-2 test-r">
              Violations Observed if Any or is there any risk of Demolition in
              case of Violation
            </div>
            <div className="w-70 p-1 pl-2">Low</div>
          </div>

          <div className="test-b test-r d-flex">
            <div className="w-10 p-1 test-r m-0">5</div>
            <div className="w-20 text-left p-1 pl-2 test-r">
              If plans not available then is the structure confirming to the
              local byelaws
            </div>
            <div className="w-70 p-1 pl-2">Yes</div>
          </div>

          <h6 className="m-0 p-1 test-r test-b">F.PLAN APPROVAL DETAILS</h6>

          <div className="test-b test-r d-flex">
            <div className="w-10 p-1 test-r m-0">1</div>
            <div className="w-20 text-left p-1 pl-2 test-r">
              Construction as per approved / sanctioned plans
            </div>
            <div className="w-70 p-1 pl-2">Yes</div>
          </div>

          <div className="test-b test-r d-flex">
            <div className="w-10 p-1 test-r m-0">2</div>
            <div className="w-20 text-left p-1 pl-2 test-r">
              Details of approved plan with approval no & date
            </div>
            <div className="w-70 p-1 pl-2">Sanctioned Plan Not Provided</div>
          </div>

          <div className="test-b test-r d-flex">
            <div className="w-10 p-1 test-r m-0">3</div>
            <div className="w-20 text-left p-1 pl-2 test-r">
              Construction permission Number and date.
            </div>
            <div className="w-70 p-1 pl-2">
              CC Not Provided, OC Not Provided
            </div>
          </div>

          <div className="test-b test-r d-flex">
            <div className="w-10 p-1 test-r m-0">4</div>
            <div className="w-20 text-left p-1 pl-2 test-r">
              Violations Observed if Any or is there any risk of Demolition in
              case of Violation
            </div>
            <div className="w-70 p-1 pl-2">Low</div>
          </div>

          <div className="test-b test-r d-flex">
            <div className="w-10 p-1 test-r m-0">5</div>
            <div className="w-20 text-left p-1 pl-2 test-r">
              If plans not available then is the structure confirming to the
              local byelaws
            </div>
            <div className="w-70 p-1 pl-2">Yes</div>
          </div>

          <h6 className="m-0 p-1 test-r test-b">G.DEVIATION DETAILS</h6>

          <div className="deviation-detail test-b d-flex">
            <div className="w-10  max-height-100"></div>
            <div className="w-20 text-left test-r test-l">
              <div className=" test-b p-1">FLOOR DETAILS</div>
              <div className="test-b p-1">Floor</div>
              <div className="test-b p-1">Ground floor</div>
              <div className="test-b p-1">First Floor</div>
              <div className="p-1">Second Floor</div>
            </div>
            <div className="w-70 d-flex">
              <div className="w-70">
                <div className=" test-b p-1">Deviation in % NA</div>
                <div className="d-flex w-100">
                  <div className="w-50 test-r">
                    <div className="test-b p-1">AT SITE</div>
                    <div className="test-b p-1">NA</div>
                    <div className="test-b p-1">NA</div>
                    <div className="p-1">NA</div>
                  </div>
                  <div className="w-50">
                    <div className="test-b p-1">AT SITE</div>
                    <div className="test-b p-1">NA</div>
                    <div className="test-b p-1">NA</div>
                    <div className="p-1">NA</div>
                  </div>
                </div>
              </div>
              <div className="w-30 test-r test-l">
                <div className=" test-b p-1">Deviation in % NA</div>
                <div className="test-b p-1">AT SITE</div>
                <div className="test-b p-1">NA</div>
                <div className="test-b p-1">NA</div>
                <div className="p-1">NA</div>
              </div>
            </div>
          </div>

          <h6 className="m-0 p-1 test-r test-b">H. Self construction case</h6>

          <div className="self-contruction test-b d-flex">
            <div className="w-10  max-height-100"></div>
            <div className="w-45  test-r test-l">
              <div className=" test-b p-1">
                Architect certified estimate available or not
              </div>
              <div className="test-b p-1">Construction Amount certified</div>
              <div className=" p-1">Others</div>
            </div>
            <div className="w-45  test-r test-l">
              <div className=" test-b p-1">NA</div>
              <div className="test-b p-1">NA</div>

              <div className="p-1">NA</div>
            </div>
          </div>

          <table className="table table-sm">
            <tr>
              <th colspan="8">I.FAIR MARKET VALUE</th>
            </tr>
            <tr>
              <td>1</td>
              <td colspan="3">Valuation Methodology </td>
              <td colspan="4">Comparison Approach(Flat, Office, Showroom)</td>
            </tr>
            <tr>
              <td rowspan="15">2</td>
              <td colspan="3">Particulars</td>
              <td>Description </td>
              <td>Area (in Sft) </td>
              <td>Rate (per sft) </td>
              <td>Total Value</td>
            </tr>
            <tr>
              <td colspan="3">Plot Area</td>
              <td>NA</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td colspan="3">Carpet area as per document </td>
              <td>NA</td>
              <td>Not Providedna</td>
              <td>NA</td>
              <td>NA</td>
            </tr>
            <tr>
              <td colspan="3">Carpet area as per approved plan </td>
              <td>NA</td>
              <td>Sanctioned Plan Not Provided</td>
              <td>NA</td>
              <td>NA</td>
            </tr>
            <tr>
              <td colspan="3">Built up area</td>
              <td>NA</td>
              <td></td>
              <td>0</td>
              <td></td>
            </tr>
            <tr>
              <td colspan="3">Super Built up area</td>
              <td>% Loading Considered on CA</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
            </tr>
            <tr>
              <td colspan="3">No of parking(open/stilt parking)</td>
              <td>NA</td>
              <td>0</td>
              <td>NA</td>
              <td>0</td>
            </tr>
            <tr>
              <td colspan="3">Terrace (open / attached) </td>
              <td>NA</td>
              <td>0</td>
              <td>NA</td>
              <td>0</td>
            </tr>
            <tr>
              <td colspan="3">Amenities value</td>
              <td>NA</td>
              <td>NA</td>
              <td>NA</td>
              <td>0</td>
            </tr>
            <tr>
              <td colspan="3">Depreciation amount</td>
              <td>NA</td>
              <td>NA</td>
              <td>NA</td>
              <td></td>
            </tr>
            <tr>
              <td colspan="3">Carpet area as per measurement</td>
              <td colspan="4">0</td>
            </tr>
            <tr>
              <td colspan="3">Fair market value of the property</td>
              <td colspan="4">0</td>
            </tr>
            <tr>
              <td colspan="3">Realizable value of the property</td>
              <td colspan="4">0</td>
            </tr>
            <tr>
              <td colspan="3">Distress value (70%)</td>
              <td colspan="4">0</td>
            </tr>
            <tr>
              <td colspan="3">Insurable Value </td>
              <td colspan="4">0</td>
            </tr>
            <tr>
              <td>3</td>
              <td colspan="7">FLOORWISE DETAILS OF USAGE AND RENTAL VALUE</td>
            </tr>
            <tr>
              <td></td>
              <td>Floor</td>
              <td>Usage</td>
              <td>Units</td>
              <td>Value</td>
              <td colspan="2">If Tenanted, Year of Current Tenancy</td>
              <td>Rental Assessment</td>
            </tr>
            <tr>
              <td></td>
              <td>1st floor</td>
              <td></td>
              <td></td>
              <td>NA</td>
              <td colspan="2"></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>2nd floor</td>
              <td></td>
              <td></td>
              <td>NA</td>
              <td colspan="2"></td>
              <td></td>
            </tr>
            <tr>
              <td>4</td>
              <td colspan="3">Stage of construction</td>
              <td colspan="4">Completed:100% , Recommended:100%</td>
            </tr>
            <tr>
              <td>5</td>
              <td colspan="3">Govt. Guideline value</td>
              <td colspan="4">NA</td>
            </tr>
            <tr>
              <td>6</td>
              <td colspan="3">Demolition Risk</td>
              <td colspan="4">Low</td>
            </tr>

            <tr>
              <td>7</td>
              <td colspan="3">Latitude & longitude of property </td>
              <td colspan="4">18.962475 72.803461</td>
            </tr>

            <tr>
              <td>8</td>
              <td colspan="3">Which seismic zone property is located in?</td>
              <td colspan="4">3</td>
            </tr>
            <tr>
              <td>9</td>
              <td colspan="3">
                Which cyclone area is the building is located in?
              </td>
              <td colspan="4">NA</td>
            </tr>
            <tr>
              <td>10</td>
              <td colspan="3">
                Which flood area is the building is located in?
              </td>
              <td colspan="4">NA</td>
            </tr>
            <tr>
              <td>11</td>
              <td colspan="3">
                Which land slide is the building is located in?
              </td>
              <td colspan="4">NA</td>
            </tr>
            <tr>
              <th colspan="8" className="text-left border-0 p-1">
                Remarks :
                <td className="p-1 m-0 border-0">
                  1. This is a private case for Measurement Purpose.
                </td>
              </th>
            </tr>
          </table>
        </div>

        <div className="f-10 3-page test-t mb-300">
          <div className="test-b test-r test-l">
            <p className="p-1 m-0 f-10">Declaration:-</p>
            <ul className="f-10">
              <li>
                Our representative has visited this site. I/We have not verified
                the title deeds of the properties with the records of the
                registrar's office as this is beyond the agreed scope of
                work.Assumptions are made to the best of our knowledge and
                belief. Reliance is based on the information furnished to us by
                the identifier AND/OR client.
              </li>
              <li>
                The valuer shall not be responsible for the matters of legal
                nature that affects the value and opinion expressed by us.
              </li>
              <li>
                where a sketched plan is attached to this report,it does not
                purport to represent accurate architectural plans.Sketch plans
                and photographs are provided as general illustrations
                only.Documents furnished to us are returned to the client along
                with the report. We cannot preserve them
              </li>
              <li>
                Fair market value indicated in the report is an opinion of the
                value prevailing on the date of the said report and is based on
                market feedback on values of similar properties. Client is free
                to obtain other independent opinions on the same. Fair, market
                value of such properties / localities may increase or decrease,
                depending on the future market conditions & scenarios. value
                varies with the purpose & date.This report is not to be referred
                if the purpose is different other than mentioned.No structural
                survey was conducted by us as it is not in our scope of work
              </li>
              <li>
                We hereby declare, “The information furnished above is true and
                correct to the best of our knowledge and belief. We have no
                direct or indirect interest in the assets valued.
              </li>
            </ul>
          </div>
          <div className="test-b test-r test-l">
            <p className="p-1 m-0 f-10">Sign & Stamp:</p>
            <img src={SignupLogo} alt="signup logo" className="pl-3" />
          </div>
          <div className="test-b test-r test-l d-flex">
            <div className="w-20 max-height-100 test-r"></div>
            <div className="w-80">
              <div className="test-b text-center p-1">For Libra Valuers</div>
              <div className="">
                <div className="p-1">Place: Mumbai</div>
                <div className="p-1">Date: 06-05-2022</div>
              </div>
            </div>
          </div>
          <div className="test-b test-r test-l text-center">
            <p className="p-1 m-0 f-10">Location with coordinates</p>
            <div className="d-flex w-100 justify-content-center p-4">
              <img src={Map} alt="map" />
            </div>
            <p className="p-1 mt-4 f-10">
              Longitude, Latitude: 18.962475, 72.803461
            </p>
          </div>

          <div className="test-b p-2">
            <div className="d-flex">
              <div className="w-30">Bank Name-: </div>
              <div className="w-70">Private-Mira road</div>
            </div>
            <div className="d-flex">
              <div className="w-30">Customer Name-: </div>
              <div className="w-70">Surendra Warden(NIL report)</div>
            </div>
            <div className="d-flex">
              <div className="w-30">Postal Address-: </div>
              <div className="w-70">
                Flat No. 3, West Hill, Near Bank Of Baroda, Nepeansea Road,
                Malabar Hill, Mumbai - 400036
              </div>
            </div>
          </div>
        </div>

        <div className="test 4-page mb-800 text-center">
          <div className="test-b w-100">
            <div className="w-70 mr-auto ml-auto">
              <p className="f-10 p-1 m-0 text-center">Property Sketch</p>
              <img className="w-100" src={write} alt="" />
            </div>
          </div>
          <div className="d-flex">
            <div className="w-50 test-r">
              <div className="w-80 pt-2 mr-auto ml-auto">
                <img className="w-100" src={Home1} alt="" />
                <p className="mt-4 m-0 p-1 f-10">
                  Wed May 04 2022 10:55:00 GMT+0530 (India Standard Time){" "}
                </p>
              </div>
            </div>
            <div className="w-50">
              <div className="w-80 pt-2 mr-auto ml-auto">
                <img className="w-100" src={Home2} alt="" />
                <p className="mt-4 m-0 p-1 f-10">
                  Wed May 04 2022 10:55:00 GMT+0530 (India Standard Time){" "}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="test 5-page mb-50 text-center">
          <div className="d-flex test-b">
            <div className="w-50 test-r">
              <div className="w-80 pt-2 mr-auto ml-auto">
                <img className="w-100" src={Home3} alt="" />
                <p className="mt-4 m-0 p-1 f-10">
                  Wed May 04 2022 10:55:00 GMT+0530 (India Standard Time){" "}
                </p>
              </div>
            </div>
            <div className="w-50">
              <div className="w-80 pt-2 mr-auto ml-auto">
                <img className="w-100" src={Home4} alt="" />
                <p className="mt-4 m-0 p-1 f-10">
                  Wed May 04 2022 10:55:00 GMT+0530 (India Standard Time){" "}
                </p>
              </div>
            </div>
          </div>
          <div className="d-flex test-b">
            <div className="w-50 test-r">
              <div className="w-80 pt-2 mr-auto ml-auto">
                <img className="w-100" src={Home5} alt="" />
                <p className="mt-4 m-0 p-1 f-10">
                  Wed May 04 2022 10:55:00 GMT+0530 (India Standard Time){" "}
                </p>
              </div>
            </div>
            <div className="w-50">
              <div className="w-80 pt-2 mr-auto ml-auto">
                <img className="w-100" src={Home6} alt="" />
                <p className="mt-4 m-0 p-1 f-10">
                  Wed May 04 2022 10:55:00 GMT+0530 (India Standard Time){" "}
                </p>
              </div>
            </div>
          </div>

          <div className="d-flex ">
            <div className="w-50 test-r">
              <div className="w-80 pt-2 mr-auto ml-auto">
                <img className="w-100" src={Home7} alt="" />
                <p className="mt-4 m-0 p-1 f-10">
                  Wed May 04 2022 10:55:00 GMT+0530 (India Standard Time){" "}
                </p>
              </div>
            </div>
            <div className="w-50">
              <div className="w-80 pt-2 mr-auto ml-auto">
                <img className="w-100" src={Home8} alt="" />
                <p className="mt-4 m-0 p-1 f-10">
                  Wed May 04 2022 10:55:00 GMT+0530 (India Standard Time){" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RealReport;
