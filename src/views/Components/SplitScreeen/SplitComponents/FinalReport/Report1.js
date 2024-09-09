import React from "react";
import { connect } from "react-redux";

import "./Report1.css";
import printJS from "print-js";
import Bottom from "./Bottom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";
import { Button } from "reactstrap";
import Logo from "../../../../../assets/topbanner.jpeg";
import LogoNew from "../../../../../assets/LIBRA LOGO_New.jpg";
import RicsLogo from "../../../../../assets/RICS-Logo-Black.png";
import SignupLogo from "../../../../../assets/signup.png";
import ReportCustomTextField from "./../../../../../components/MuiComponents/ReportCustomTextField";
import QrCodeGeoTag from "./QrCodeGeoTag";
import CompleteButton from "./CompleteButton";
import CompleteBtnLevels from "./CompleteBtnLevels";
import MapImage from "./MapImage";
import { getdropdownDetailsPage } from "../../../../../Redux/Creators/DropdownDetailsCreators";

export const ReportContext = React.createContext();

function Report1(props) {
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
          {/* <Button
            color="success"
            onClick={printPdf}
            className="print-button w-20  m-3"
            // disabled={!print}
          >
            <i className="fa fa-save mr-2" />
            Print Report
          </Button> */}
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
            date_of_technical_visit: "12-05-2022",
            property_usage: "Residential",
            onsite: "Residential",
            occupancy: props?.property?.property?.occupancy_type ?? "",
            property_falls_in_demolition: "Low",
            marketability: props?.property?.property?.observation?.marketablity,
            front_side_road: "15 Feet Approximately",
            ward_no: "NA",
            type_of_locality: "Upper Class",
            property_type:
              props?.property?.property?.unit_detail?.property_type,
            distance_From_city: "3.7 km from Mahalaxmi Railway Station",
            site_access: props?.property?.property?.occupation?.site_access,
            corporation_limit: "Yes",
            da: "MCGM",
            town_panchayat: "NA",
            villiage_panchayat: "NA",
            conditions_of_approach_road: "Good",
            mud_road_width: props?.property?.property?.surrounding?.road_width,
            no_of_floors_contructed: "Ground + 4th Floor",
            floor_wise_usage:
              props?.property?.property?.unit_detail?.floorwise_wise_usage,
            age_of_property: "35 Years (As Per Site Information) Years",
            residual_age: props?.property?.property?.project?.residual_age,
            north_document: "Documents Not Provided",
            north_site: "Simla Nagar",
            north_plan: "Documents Not Provided",
            south_document: "Documents Not Provided",
            south_site: "Ashiana Building",
            south_plan: "Documents Not Provided",
            east_document: "Documents Not Provided",
            east_site: "Hill Side Building",
            east_plan: "Documents Not Provided",
            west_document: "Documents Not Provided",
            west_site: "Open Space",
            west_plan: "Documents Not Provided",
            boundaries_matching: "NA",
            property_identified_through:
              props?.property?.property?.observation
                ?.property_identified_through,
            plot_demacated: "YES",
            amenities: props?.property?.property?.unit_detail?.amenities,
            type_of_structure:
              props?.property?.property?.unit_detail?.structure_type,
            no_of_floors_approved: "Ground + 4th Floor",
            no_of_wings: "Single Building",
            no_of_flat_on_each_floor: "2 Flats On Each Floor",
            quality_of_construction:
              props?.property?.property?.specification?.quality_of_construction,
            structural_observation: "Average, No Cracks",
            configuration: props?.property?.property?.configuration,
            flooring_finishing: "Vitrified Tiles Flooring",
            roofing_terracing: "RCC Flat Roof",
            quality_of_fixtures_setting: "Concealed Fittings",
            doors_windows:
              props?.property?.property?.specification?.doors_windows,
            // doors_windows: "Wooden Doors & Aluminum Sliding Window",
            sanctioned_plan: "Yes",
            detail_of_approved_plan: "Sanctioned Plan Not Provided",
            construction_permission: "CC Not Provided, OC Not Provided",
            violation_observed: "Low",
            plan_not_available: "Yes",
            deviation_in_sqft: "NA",
            deviation_in_percent: "NA",
            ground_floor_plan: "NA",
            ground_floor_at_site1: "NA",
            ground_floor_at_site2: "NA",
            first_floor_plan: "NA",
            first_floor_at_site1: "NA",
            first_floor_at_site2: "NA",
            second_floor_plan: "NA",
            second_floor_at_site1: "NA",
            second_floor_at_site2: "NA",
            architect_certificate: "NA",
            contruction_amount_certified: "NA",
            others: "NA",
            validation_methodology:
              "Comparison Approach(Flat, Office, Showroom)",
            plot_area_description: "NA",
            plot_area_area:
              props?.property?.property?.valuation?.type?.plot_area,
            plot_area_rate: "NA",
            plot_area_total_value: "NA",
            carpet_doc_description: "NA",
            carpet_doc_area: "NA",
            carpet_doc_rate: "NA",
            carpet_doc_total_value: "NA",
            carpet_approved_description: "NA",
            carpet_approved_area: "NA",
            carpet_approved_rate: "NA",
            carpet_approved_total_value: "NA",
            builtup_description: "NA",
            builtup_area:
              props?.property?.property?.valuation?.type?.builtup_area,
            builtup_rate: "NA",
            builtup_total_value: "NA",
            super_build_description:
              props?.property?.property?.valuation?.type?.superplot_area,
            super_build_area:
              props?.property?.property?.valuation?.type?.super_builtup_area,
            super_build_rate: "NA",
            super_build_total_value: "NA",
            parking_description: "NA",
            parking_area: "NA",
            parking_rate:
              props?.property?.property?.valuation?.type?.parking_charges,
            parking_total_value:
              props?.property?.property?.specification?.carparking_value,
            terrace_description: "NA",
            terrace_area: "NA",
            terrace_rate: "NA",
            terrace_total_value: "NA",
            amenities_description: "NA",
            amenities_area: "NA",
            amenities_rate: "NA",
            amenities_total_value: "NA",
            depreciation_description: "NA",
            depreciation_area: "NA",
            depreciation_rate: "NA",
            depreciation_total_value: "NA",
            carpet_area_per_measurement:
              props?.property?.property?.measurement?.sites_carpet_area_total,
            fair_market_value:
              props?.property?.property?.valuation?.seller_market_value,
            realizable_value: "0",
            distress_value:
              props?.property?.property?.valuation?.type?.distress_value,
            insurable_Value: "2988000",
            first_floor_usage: "",
            second_floor_usage: "",
            first_floor_units: "",
            second_floor_units: "",
            first_floor_value: "NA",
            second_floor_value: "NA",
            first_floor_tenancy: "",
            second_floor_tenancy: "",
            first_rental_assessment: "",
            second_rental_assessment: "",
            stage_of_construction: "Completed:100% , Recommended:100%",
            govt_guild_value: "NA",
            demolition_risk:
              props?.property?.property?.observation?.demolition_risk,
            latitude: props?.property?.property?.latitude,
            longitude: props?.property?.property?.longitude,
            seismic_zone: props?.property?.property?.ndmce?.sesmic_zone,
            cyclone_area: props?.property?.property?.ndmce?.cyclone_area,
            flood_area: props?.property?.property?.ndmce?.flood_area,
            land_slide: props?.property?.property?.ndmce?.land_slide_area,
            place: "Mumbai",
            date: "17-05-2022",
            remarks: `This is a private case for Measurement Purpose only.,
          The property under consideration is 3 BHK flat in Ground+4th storied residential building without lift.,
          As per site observation access to the building is as per norms and road width is 30 feet approx.,
          During our visit we have not observed society name board.,
          Detailed measurement is mentioned in the annexure.,
          As per site total measured carpet area is 2490 sqft.,,,,,,,,,,,,,,,,,,,,,,`,
            file_1_status: "1",
          }}
          // onSubmit={handleSubmit}
          validationSchema={Yup.object().shape({})}
        >
          {(formProps) => {
            return (
              <Form>
                <Typography variant={"h5"}>Report New</Typography>

                {/* <div>
                  <div
                    id="htmlToPdf3"
                    style={{ color: "black" }}
                    className={print ? "f-10 font-family" : "f-14 font-family"}
                  >
                    <div className="logo d-flex align-items-center justify-content-around mb-1 pb-1 custom-border-solid">
                      <img
                        src={LogoNew}
                        alt="Logo"
                        className="logo-img"
                        width="70px"
                      />
                      <div>
                        <div className="textName mb-2">Libra Valuers</div>
                        <div className="details">
                          <div>TEJAS DAVE - BE-Civil, MBA-(Fin),</div>
                          <div>
                            MVAL-Real Estate, MRICS, FIV, FIE, CE, PETA, CVSRT
                          </div>
                          <div>
                            Shop No.12, Shanti Garden CHS, Sec-5, Building No.7,
                          </div>
                          <div>Mira Road (E), Mumbai 401107.</div>
                        </div>
                      </div>
                      <img
                        src={RicsLogo}
                        alt="Logo"
                        className="logo-img"
                        width="100px"
                      />
                      <div className="contact">
                        <div>Off: 9769070154</div>
                        <div>Email: tejas.dave@libravaluers.com</div>
                        <div>Web: www.libravaluers.com</div>
                      </div>
                    </div>
                    <div className=" 1-page text-center pdf-h-w">
                      <h6 className=" p-1 m-0 test">
                        {" "}
                        TECHNICAL REPORT FORMAT - ESFB{" "}
                      </h6>

                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0">1</div>
                        <div className="w-20 text-left p-1 pl-2 test-r">
                          Request Id
                        </div>
                        <div className="w-30 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-20 text-left p-1 pl-2 test-r test-l">
                          DD/MM/YYYY
                        </div>
                        <div className="w-20 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>
                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0"></div>
                        <div className="w-20 text-left p-1 pl-2 test-r">
                          Name of the Applicant
                        </div>
                        <div className="w-70 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0"></div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Name of the Owner ( As per registered document to the
                          favour off…)
                        </div>
                        <div className="w-20 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-20 text-left p-1 pl-2 test-r test-l">
                          Relationship with the Applicant
                        </div>
                        <div className="w-20 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0"></div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Branch Name
                        </div>
                        <div className="w-20 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-20 text-left p-1 pl-2 test-r test-l">
                          Visit Done By
                        </div>
                        <div className="w-20 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0"></div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Contact Number
                        </div>
                        <div className="w-20 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-20 text-left p-1 pl-2 test-r test-l">
                          Product
                        </div>
                        <div className="w-20 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0">2</div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Age of the Property
                        </div>
                        <div className="w-20 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-20 text-left p-1 pl-2 test-r test-l">
                          Residual Age
                        </div>
                        <div className="w-20 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0">3</div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Type of Property
                        </div>
                        <div className="w-60 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0">4</div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Property Usage
                        </div>
                        <div className="w-60 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-100 p-1 test-r m-0 font-bold">
                          Address of the property
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0">5</div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Property Address as per Document
                        </div>
                        <div className="w-60 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0"></div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Property Address at per site
                        </div>
                        <div className="w-60 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0"></div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Nearest Land Mark
                        </div>
                        <div className="w-60 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0"></div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Latitude and Longitude
                        </div>
                        <div className="w-60 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0">6</div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Whether property is identifiable
                        </div>
                        <div className="w-20 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-20 text-left p-1 pl-2 test-l test-r">
                          Whether property is clearly demarcated
                        </div>
                        <div className="w-20 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0">7</div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Nature of Locality
                        </div>
                        <div className="w-20 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-20 text-left p-1 pl-2 test-l test-r">
                          Locality development
                        </div>
                        <div className="w-20 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0">8</div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          % Residential Usage in Property
                        </div>
                        <div className="w-20 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-20 text-left p-1 pl-2 test-l test-r">
                          % of Commercial Usage in property
                        </div>
                        <div className="w-20 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0">9</div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Whether property is situated near water body, Railway
                          lines, Buffer zones, etc.
                        </div>
                        <div className="w-20 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-20 text-left p-1 pl-2 test-l test-r">
                          Distance from property if any
                        </div>
                        <div className="w-20 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0">10</div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Electricity Meter No.
                        </div>
                        <div className="w-20 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-20 text-left p-1 pl-2 test-l test-r">
                          Installation in favor of
                        </div>
                        <div className="w-20 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0">11</div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Nearest ESFB Branch
                        </div>
                        <div className="w-20 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-20 text-left p-1 pl-2 test-l test-r">
                          Distance from Nearest Branch
                        </div>
                        <div className="w-20 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>

                      <div className="page-break"></div>

                      <div className="test d-flex">
                        <div className="w-100 p-1 test-r m-0 font-bold">
                          Boundaries
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0">12</div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Description
                        </div>
                        <div className="w-15 text-left p-1 pl-2 test-r">
                          North
                        </div>
                        <div className="w-15 text-left p-1 pl-2 test-r">
                          South
                        </div>
                        <div className="w-15 text-left p-1 pl-2 test-r">
                          East
                        </div>
                        <div className="w-15 text-left p-1 pl-2 test-r">
                          West
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0"></div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Schedule boundary as per Document
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
                        <div className="w-10 p-1 test-r m-0"></div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Boundary as per Site investigation
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
                        <div className="w-10 p-1 test-r m-0"></div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Property Dimension as per document
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
                        <div className="w-10 p-1 test-r m-0"></div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Property dimension at site
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
                        <div className="w-10 p-1 test-r m-0"></div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Boundaries Matching
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
                        <div className="w-10 p-1 test-r m-0"></div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Mismatch Remarks
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
                        <div className="w-100 p-1 test-r m-0 font-bold">
                          Valuation
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0">13</div>
                        <div className="w-15 text-left p-1 pl-2 test-r">
                          Area Type
                        </div>
                        <div className="w-15 text-left p-1 pl-2 test-r">
                          As plan/ Deedsft
                        </div>
                        <div className="w-15 text-left p-1 pl-2 test-r">
                          Adopted Area (in Sqft)
                        </div>
                        <div className="w-15 text-left p-1 pl-2 test-r">
                          Rate/Sqft
                        </div>
                        <div className="w-15 text-left p-1 pl-2 test-r">
                          % of completion
                        </div>
                        <div className="w-15 text-left p-1 pl-2 test-r">
                          Valuation INR
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0"></div>
                        <div className="w-15 text-left p-1 pl-2 test-r">
                          Plot Area/UDS
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
                        <div className="w-15 text-left p-1 pl-2 test-r">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0"></div>
                        <div className="w-15 text-left p-1 pl-2 test-r">
                          BUA
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
                        <div className="w-15 text-left p-1 pl-2 test-r">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0"></div>
                        <div className="w-15 text-left p-1 pl-2 test-r">
                          Carpet Area (As per Plan)
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
                        <div className="w-15 text-left p-1 pl-2 test-r">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0"></div>
                        <div className="w-15 text-left p-1 pl-2 test-r">
                          Carpet Area (As per Measurement)
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
                        <div className="w-15 text-left p-1 pl-2 test-r">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0"></div>
                        <div className="w-15 text-left p-1 pl-2 test-r">
                          BUA (As per Agreement)
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
                        <div className="w-15 text-left p-1 pl-2 test-r">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0"></div>
                        <div className="w-15 text-left p-1 pl-2 test-r">
                          Area considered for Valuation (CA / BUA / SUBA)
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
                        <div className="w-15 text-left p-1 pl-2 test-r">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>
                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0"></div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Amenities
                        </div>
                        <div className="w-40 text-left p-1 pl-2 test-r">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>
                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0"></div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Final Market Value (FMV) ( On 100% completion)
                        </div>
                        <div className="w-40 text-left p-1 pl-2 test-r">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0"></div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          As on Date Value (FMV) (Land + As on date
                          construction)
                        </div>
                        <div className="w-40 text-left p-1 pl-2 test-r">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>
                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0"></div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Forced Sale Value(INR) 80%
                        </div>
                        <div className="w-40 text-left p-1 pl-2 test-r">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-100 p-1 test-r m-0 font-bold">
                          Technical Document Details
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0">14</div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Document Name
                        </div>
                        <div className="w-15 text-left p-1 pl-2 test-r">
                          Record type
                        </div>
                        <div className="w-15 text-left p-1 pl-2 test-r">
                          REF No
                        </div>
                        <div className="w-15 text-left p-1 pl-2 test-r">
                          REF Date
                        </div>
                        <div className="w-15 text-left p-1 pl-2 test-r">
                          Details of Approval
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0"></div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Approved Layout Plan
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
                        <div className="w-10 p-1 test-r m-0"></div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Approved Plan
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
                        <div className="w-10 p-1 test-r m-0"></div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Commencement Certificate
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
                        <div className="w-10 p-1 test-r m-0"></div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Occupancy Certificate
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
                        <div className="w-10 p-1 test-r m-0"></div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Title Document
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
                        <div className="w-10 p-1 test-r m-0"></div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          NA Order Details (Non Agriculture)
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
                        <div className="w-10 p-1 test-r m-0"></div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Sale Agreement
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
                        <div className="w-10 p-1 test-r m-0"></div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Katha/Patta Etc,.
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
                        <div className="w-10 p-1 test-r m-0"></div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Tax Paid Receipt
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
                        <div className="w-10 p-1 test-r m-0"></div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Building permit
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
                        <div className="w-10 p-1 test-r m-0"></div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Cash paid receipt/Estimation
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
                        <div className="w-10 p-1 test-r m-0"></div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Other documents if any
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
                        <div className="w-100 p-1 test-r m-0 font-bold">
                          Other Details
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0">15</div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Builder Name
                        </div>
                        <div className="w-60 text-left p-1 pl-2 test-r">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>
                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0">16</div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          RERA Number
                        </div>
                        <div className="w-60 text-left p-1 pl-2 test-r">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>
                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0">17</div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Is the Property Technically Acceptable
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
                        <div className="w-10 p-1 test-r m-0">18</div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Actual FSI at site
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
                        <div className="w-10 p-1 test-r m-0">19</div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Whether the approved Plan copy available
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
                        <div className="w-10 p-1 test-r m-0">20</div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Plan Approval No
                        </div>
                        <div className="w-15 text-left p-1 pl-2 test-r">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-5 text-left p-1 pl-2 test-r">
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
                        <div className="w-5 text-left p-1 pl-2 test-r">
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
                        <div className="w-10 p-1 test-r m-0">21</div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Person Met at site
                        </div>
                        <div className="w-15 text-left p-1 pl-2 test-r">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-5 text-left p-1 pl-2 test-r">
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
                        <div className="w-5 text-left p-1 pl-2 test-r">
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
                        <div className="w-10 p-1 test-r m-0">22</div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Approach Road Type
                        </div>
                        <div className="w-15 text-left p-1 pl-2 test-r">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-5 text-left p-1 pl-2 test-r">
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
                        <div className="w-5 text-left p-1 pl-2 test-r">
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
                        <div className="w-10 p-1 test-r m-0">23</div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Approved Land Use as per Master Plan / CDP
                        </div>
                        <div className="w-15 text-left p-1 pl-2 test-r">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-5 text-left p-1 pl-2 test-r">
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
                        <div className="w-5 text-left p-1 pl-2 test-r">
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
                        <div className="w-10 p-1 test-r m-0">24</div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Number of floors Permitted
                        </div>
                        <div className="w-15 text-left p-1 pl-2 test-r">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-5 text-left p-1 pl-2 test-r">
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
                        <div className="w-5 text-left p-1 pl-2 test-r">
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
                        <div className="w-10 p-1 test-r m-0">25</div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Setback Deviation (%)
                        </div>
                        <div className="w-15 text-left p-1 pl-2 test-r">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-5 text-left p-1 pl-2 test-r">
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
                        <div className="w-5 text-left p-1 pl-2 test-r">
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
                        <div className="w-10 p-1 test-r m-0">26</div>
                        <div className="w-30 text-left p-1 pl-2 test-r">
                          Rental Information
                        </div>

                        <div className="w-60 text-left p-1 pl-2 test-r">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>

                      <div className="page-break"></div>

                      <div className="test d-flex">
                        <div className="w-100 text-left p-1 pl-2 test-r">
                          <b>Remarks :</b>
                          <br />
                          1. The property under consideration is a Ground + 1
                          Floor storied residential building without lift. The
                          Ground Floor comprises of 1-1 BHK unit AND the 1st
                          Floor comprises of 3 Individual rooms with a common
                          Toilet.
                          <br />
                          2. As per site observation access to the building is
                          via Kutcha road and the width is 12 feet approx.
                          <br />
                          3. We have received only Index II copy Sale Deed and
                          Zoning Certificate available for verification.
                          <br />
                          4. Kindly check the Sanctioned plan Commencement
                          Certificate and Occupation Certificate at your end
                          before disbursement.
                          <br />
                          5. At the time of visit we have observed that property
                          is Partly Self Occupied and partly Tenant Occupied
                          since last 2 years.
                          <br />
                          6. During our visit we have not observed unit name
                          board.
                          <br />
                          7. Agreement for sale made between Shree Maruti Vishnu
                          Nadhe AND Shree Nurulhuda Adilahmad Khan on dated
                          15/07/2011 are made available for verification (Index
                          no: 7701/2011).
                          <br />
                          8. As per Index II and Sale deed 650 sft is identified
                          as the plot area for subject property and the same is
                          considered for Valuation. There is a ground + 1 Floor
                          Structure on the subject plot. No documents for
                          Structure are provided. As per site measurements the
                          structure area is approx 1300 sft. This translates to
                          a FSI of 2 which is high as per market norms. Hence
                          considering 1.5 FSI we have considered the structure
                          area of 975 sft for Valuation.
                          <br />
                          9. Subject property is a part of larger layout of
                          Survey No 118. Plot numbers are not designated on
                          sites. We had asked for a copy of Survey Plan/ Layout
                          plans. However the same is not provided. In absence of
                          the same the subject property is identified Partly on
                          the basis of 4 Boundary page provided( North Side
                          Kutcha Road). Hence please check for the same.
                          <br />
                          10. Subject Building Comprises of 1- 1 BHK unit on
                          Ground Floor which is Self Occupied. Further the 1st
                          floor comprises of 3 Individual rooms which are leased
                          out. The terrace comprises of 1 Room with AC Sheet
                          roof which is also leased out. There are 4 tenants
                          (Ahmad / Ali / Siraj / Musalim / Fias). We have not
                          received any lease agreement. In case of triparty
                          agreement the Valuation shall stand Nil.
                          <br />
                          11. We have received a copy of Zoning certificate from
                          Pimpri Chinchwad Municipal Corporation having No
                          166/2008 dated 07/05/2008 for Survey No 118 Rahatni
                          being zoned as Part 18 M Road and part Agricultural.
                          Hence please check for the same. Based on specific
                          instructions received from the Bank we have released
                          the report.
                          <br />
                          12. The copy of Zoning Certificate received is for
                          Rahatni. The Index II specifies the subject vicinity
                          as Rahatni Kalewadi. Hence please check for the same
                          and take legal opinion on the same.
                          <br />
                          13. The subject property has an access via kutcha
                          road. Hence in absence of Survey plans / Layout plans
                          we are unable to comment if the same is Land locked or
                          not.
                          <br />
                          14. The subject property is at a distance of approx
                          300 m to 400 m from Pawana river. Hence please check
                          with your guidelines of funding with regards to same.
                          <br />
                          15. Subject property is a part of Gram Panchayat
                          Rahatni as per Market survey. Hence please check with
                          your guidelines for funding in the same.
                          <br />
                          16. Report is released on available documents as per
                          Banks guidelines.
                        </div>
                      </div>

                      <div className="page-break"></div>

                      <div className="test d-flex">
                        <div className="w-100 text-left p-1 pl-2 test-r">
                          <b>Declaration :-</b>
                          <ul>
                            <br />
                            <li>
                              Our representative has visited this site. I/We
                              have not verified the title deeds of the
                              properties with the records of the registrar's
                              office as this is beyond the agreed scope of
                              work.Assumptions are made to the best of our
                              knowledge and belief. Reliance is based on the
                              information furnished to us by the identifier
                              AND/OR client.
                            </li>
                            <li>
                              <br />
                              The valuer shall not be responsible for the
                              matters of legal nature that affects the value and
                              opinion expressed by us.
                              <br />
                            </li>
                            <li>
                              where a sketched plan is attached to this
                              report,it does not purport to represent accurate
                              architectural plans.Sketch plans and photographs
                              are provided as general illustrations
                              only.Documents furnished to us are returned to the
                              client along with the report. We cannot preserve
                              them.
                              <br />
                            </li>
                            <li>
                              Fair market value indicated in the report is an
                              opinion of the value prevailing on the date of the
                              said report and is based on market feedback on
                              values of similar properties. Client is free to
                              obtain other independent opinions on the same.
                              Fair, market value of such properties / localities
                              may increase or decrease, depending on the future
                              market conditions & scenarios. value varies with
                              the purpose & date.This report is not to be
                              referred if the purpose is different other than
                              mentioned.No structural survey was conducted by us
                              as it is not in our scope of work
                              <br />
                            </li>
                            <li>
                              We hereby declare, “The information furnished
                              above is true and correct to the best of our
                              knowledge and belief. We have no direct or
                              indirect interest in the assets valued.
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="page-break"></div>
                      <div className=" 3-page test-t pdf-h-w">
                      
                      </div>

                      <div className="test-b test-r test-l w-100">
                        <p className="p-1 m-0 text-center font-bold">
                          Location with coordinates
                        </p>
                        <div className="w-70 mr-auto ml-auto">
                          <iframe
                            src={`https://maps.google.com/maps?q=${props?.property?.property?.latitude},${props?.property?.property?.longitude}&t=k&z=15&output=embed`}
                            height="296"
                            width="100%"
                            frameborder="0"
                            scrolling="no"
                          ></iframe>
                        </div>
                        <p className="p-1 mt-4 text-center">
                          Longitude, Latitude:{" "}
                          {props?.property?.property?.longitude} ,{" "}
                          {props?.property?.property?.latitude} & srounding
                          development:{" "}
                          {props?.property?.property?.surrounding_development}
                        </p>
                      </div>
                    </div>
                    <div className="page-break"></div>
                    <div className="test 4-page text-center pdf-h-w">
                      <div className="test-b w-100">
                        <div className="w-70 mr-auto ml-auto">
                          <p className=" p-1 m-0 text-center font-bold">
                            Property Sketch
                          </p>
                          {props.property.property?.sketches?.map((img, i) => {
                            return (
                              <img className="w-100" src={img.file} alt="" />
                            );
                          })}

                        </div>
                      </div>
                      <div className="d-flex">
                        {props.property.property?.photographs
                          ?.filter((row) => row?.is_ok == 1)
                          ?.map((img, i) => {
                            return (
                              <div className="w-50 test-r">
                                <div className="w-80 pt-2 mr-auto ml-auto">
                                  {img.file != null ? (
                                    <>
                                      <img
                                        className="w-100"
                                        src={`https://lvpl.in/librabackend/storage/app/public/PropertyPhotographs/${img?.file}`}
                                        alt=""
                                      />
                                      <p className="mt-4 m-0 p-1 ">
                                        {img.created_at}
                                      </p>
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            );
                          })}
                      
                      </div>
                    </div>

                    <div className="page-break"></div>
                    <div className="test 4-page text-center pdf-h-w">
                      <div className="test-b w-100">
                        <div className="w-70 mr-auto ml-auto">
                          <p className=" p-1 m-0 text-center font-bold">
                            Annexure
                          </p>
                          {props.property.property?.annexure?.annexure_files?.map((img, i) => {
                            return (
                              <img className="w-100" src={img.file} alt="" />
                            );
                          })}

                        </div>
                      </div>
                      <div className="d-flex">
                        {props.property.property?.photographs
                          ?.filter((row) => row?.is_ok == 1)
                          ?.map((img, i) => {
                            return (
                              <div className="w-50 test-r">
                                <div className="w-80 pt-2 mr-auto ml-auto">
                                  {img.file != null ? (
                                    <>
                                      <img
                                        className="w-100"
                                        src={`https://lvpl.in/librabackend/storage/app/public/PropertyPhotographs/${img?.file}`}
                                        alt=""
                                      />
                                      <p className="mt-4 m-0 p-1 ">
                                        {img.created_at}
                                      </p>
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div> */}
                <Typography variant={"h5"}>Report 1</Typography>

                <div>
                  <div id="htmlToPdf2" className={print ? "f-10" : "f-14"}>
                    <div className="logo">
                      <img
                        src={Logo}
                        alt="Logo"
                        className="logo-img"
                        width="100%"
                      />
                    </div>
                    <div className=" 1-page test text-center pdf-h-w">
                      <h6 className=" p-1 m-0 test">
                        {" "}
                        VALUATION REPORT FORMAT FOR LAP/BT/TOP UP /SELF CONST{" "}
                      </h6>
                      <div className="test d-flex">
                        <h6 className="w-70 p-1 test-r m-0">
                          A.GENERAL DETAILS
                        </h6>
                        <div className="w-15 text-left p-1 pl-2 test-r">
                          Report Date
                        </div>
                        <div className="w-15 p-1 text-left pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="report_date"
                          />
                        </div>
                      </div>
                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0">1</div>
                        <div className="w-20 text-left p-1 pl-2 test-r">
                          Prospect Number
                        </div>
                        <div className="w-70 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>
                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0">2</div>
                        <div className="w-20 text-left p-1 pl-2 test-r">
                          Type of Loan
                        </div>
                        <div className="w-70 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="type_of_loan"
                          />
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0">3</div>
                        <div className="w-20 text-left p-1 pl-2 test-r">
                          Name of the Customer
                        </div>
                        <div className="w-70 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="customer_name"
                          />
                        </div>
                      </div>
                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0">4</div>
                        <div className="w-20 text-left p-1 pl-2 test-r">
                          Name of Property Owner as per draft deed / ownership
                          documents
                        </div>
                        <div className="w-70 p-1  pl-2"></div>
                      </div>
                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0">5</div>
                        <div className="w-20 text-left p-1 pl-2 test-r">
                          Property Address as per site
                        </div>
                        <div className="w-70 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="property_address"
                          />
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0">6</div>
                        <div className="w-20 text-left p-1 pl-2 test-r">
                          Legal address of property
                        </div>
                        <div className="w-70 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="property_address"
                          />
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0">7</div>
                        <div className="w-20 text-left p-1 pl-2 test-r">
                          Contact no of the Owner
                        </div>
                        <div className="w-70 d-flex">
                          <div className="test-r p-1 w-50">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="owner_contact"
                            />
                          </div>
                          <div className="test-r p-1 w-30">
                            Name of Tenant if Applicable
                          </div>
                          <div className="p-1 w-20">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="tenant_name"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0">8</div>
                        <div className="w-20 text-left p-1 pl-2 test-r">
                          Technical documents made available for verification
                        </div>
                        <div className="w-70 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="technical_document"
                          />
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0">9</div>
                        <div className="w-20 text-left p-1 pl-2 test-r">
                          Landmark
                        </div>
                        <div className="w-70 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="landmark"
                          />
                        </div>
                      </div>
                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0">10</div>
                        <div className="w-20 text-left p-1 pl-2 test-r">
                          Date of Technical Visit
                        </div>
                        <div className="w-70 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="date_of_technical_visit"
                          />
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0">11</div>
                        <div className="w-20 text-left p-1 pl-2 test-r">
                          Property Usage
                        </div>
                        <div className="w-70 d-flex">
                          <div className="test-r p-1 w-25">As per doc</div>
                          <div className="test-r p-1 w-25">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="property_usage"
                            />
                          </div>
                          <div className="test-r p-1 w-25">On site</div>
                          <div className="p-1 w-25">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="onsite"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0">12</div>
                        <div className="w-20 text-left p-1 pl-2 test-r">
                          Occupancy
                        </div>
                        <div className="w-70 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="occupancy"
                          />
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0">13</div>
                        <div className="w-20 text-left p-1 pl-2 test-r">
                          Property falls in demolition list of local authority
                        </div>
                        <div className="w-70 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="property_falls_in_demolition"
                          />
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0">14</div>
                        <div className="w-20 text-left p-1 pl-2 test-r">
                          Marketability
                        </div>
                        <div className="w-70 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="marketability"
                          />
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0">15</div>
                        <div className="w-20 text-left p-1 pl-2 test-r">
                          Front Side Road Width
                        </div>
                        <div className="w-70 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="front_side_road"
                          />
                        </div>
                      </div>

                      <h6 className="m-0 p-1 test-r test-l">
                        B. SURROUNDING LOCALITY DETAILS
                      </h6>

                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0">1</div>
                        <div className="w-20 text-left p-1 pl-2 test-r">
                          Ward No/ Municipal land No
                        </div>
                        <div className="w-70 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="ward_no"
                          />
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0">2</div>
                        <div className="w-20 text-left p-1 pl-2 test-r">
                          Type of locality
                        </div>
                        <div className="w-70 p-1 text-left pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="type_of_locality"
                          />
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0">3</div>
                        <div className="w-20 text-left p-1 pl-2 test-r">
                          Type of the Property
                        </div>
                        <div className="w-70 p-1 text-left pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="property_type"
                          />
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0">4</div>
                        <div className="w-20 text-left p-1 pl-2 test-r">
                          Distance From City Centre
                        </div>
                        <div className="w-70 p-1 text-left pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="distance_From_city"
                          />
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-10 p-1 test-r m-0">5</div>
                        <div className="w-20 text-left p-1 pl-2 test-r">
                          Site Access
                        </div>
                        <div className="w-70 p-1 text-left pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="site_access"
                          />
                        </div>
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
                            <div className="w-33 p-1 test-b test-r">
                              <ReportCustomTextField
                                formProps={formProps}
                                name="corporation_limit"
                              />
                            </div>
                            <div className="w-33 p-1 test-b test-r">
                              Municipal Limit/DA
                            </div>
                            <div className="w-34 p-1 test-b">
                              <ReportCustomTextField
                                formProps={formProps}
                                name="da"
                              />
                            </div>
                          </div>
                          <div className="d-flex w-100">
                            <div className="w-33 p-1 test-b test-r">
                              <ReportCustomTextField
                                formProps={formProps}
                                name="town_panchayat"
                              />
                            </div>
                            <div className="w-33 p-1 test-b test-r">
                              Village Panchayat
                            </div>
                            <div className="w-34 p-1 test-b">
                              <ReportCustomTextField
                                formProps={formProps}
                                name="villiage_panchayat"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="test-b test-r d-flex">
                        <div className="w-10 p-1 test-r m-0">7</div>
                        <div className="w-20 text-left test-r p-1">
                          Conditions of Approach Road{" "}
                        </div>
                        <div className="w-70 d-flex">
                          <div className="w-33 p-1 test-b test-r">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="conditions_of_approach_road"
                            />{" "}
                          </div>
                          <div className="w-33 p-1 test-b test-r">
                            Mud road Width
                          </div>
                          <div className="w-34 p-1 test-b">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="mud_road_width"
                            />
                          </div>
                        </div>
                      </div>

                      <h6 className="m-0 p-1 test-r test-b">
                        C. PROPERTY DETAILS
                      </h6>
                      <div className="test-b test-r d-flex">
                        <div className="w-10 p-1 test-r m-0">1</div>
                        <div className="w-20 text-left test-r p-1">
                          No of Floors Constructed
                        </div>
                        <div className="w-70 d-flex">
                          <div className="w-20 p-1 test-r">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="no_of_floors_contructed"
                            />
                          </div>
                          <div className="w-16 p-1  test-r"></div>
                          <div className="w-16 p-1  test-r"></div>
                          <div className="w-16 p-1  test-r"></div>
                          <div className="w-16 p-1  test-r"></div>
                          <div className="w-16 p-1 "></div>
                        </div>
                      </div>

                      <div className="test-b test-r d-flex">
                        <div className="w-10 p-1 test-r m-0">2</div>
                        <div className="w-20 text-left test-r p-1">
                          Floor Wise Usage
                        </div>
                        <div className="w-70 d-flex">
                          <div className="w-20 p-1 test-r">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="floor_wise_usage"
                            />
                          </div>
                          <div className="w-16 p-1 test-r"></div>
                          <div className="w-16 p-1 test-r"></div>
                          <div className="w-16 p-1 test-r"></div>
                          <div className="w-16 p-1 test-r"></div>
                          <div className="w-16 p-1"></div>
                        </div>
                      </div>

                      <div className="test-b test-r d-flex">
                        <div className="w-10 p-1 test-r m-0">3</div>
                        <div className="w-20 text-left test-r p-1">
                          Age of the property
                        </div>
                        <div className="w-70 d-flex">
                          <div className="w-33 p-1 test-r">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="age_of_property"
                            />
                          </div>
                          <div className="w-33 p-1  test-r">Residual age</div>
                          <div className="w-34 p-1 ">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="residual_age"
                            />
                          </div>
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
                          <div className="w-33 p-1 test-r">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="north_document"
                            />
                          </div>
                          <div className="w-33 p-1  test-r">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="north_site"
                            />
                          </div>
                          <div className="w-34 p-1 ">
                            {" "}
                            <ReportCustomTextField
                              formProps={formProps}
                              name="north_plan"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="test-b test-r d-flex">
                        <div className="w-10 p-1 test-r m-0"></div>
                        <div className="w-20 text-left test-r p-1">South</div>
                        <div className="w-70 d-flex">
                          <div className="w-33 p-1 test-r">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="south_document"
                            />
                          </div>
                          <div className="w-33 p-1  test-r">
                            {" "}
                            <ReportCustomTextField
                              formProps={formProps}
                              name="south_site"
                            />
                          </div>
                          <div className="w-34 p-1 ">
                            {" "}
                            <ReportCustomTextField
                              formProps={formProps}
                              name="south_plan"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="test-b test-r d-flex">
                        <div className="w-10 p-1 test-r m-0"></div>
                        <div className="w-20 text-left test-r p-1">East</div>
                        <div className="w-70 d-flex">
                          <div className="w-33 p-1 test-r">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="east_document"
                            />
                          </div>
                          <div className="w-33 p-1  test-r">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="east_site"
                            />
                          </div>
                          <div className="w-34 p-1 ">
                            {" "}
                            <ReportCustomTextField
                              formProps={formProps}
                              name="east_plan"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="test-b test-r d-flex">
                        <div className="w-10 p-1 test-r m-0"></div>
                        <div className="w-20 text-left test-r p-1">West</div>
                        <div className="w-70 d-flex">
                          <div className="w-33 p-1 test-r">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="west_document"
                            />
                          </div>
                          <div className="w-33 p-1  test-r">
                            {" "}
                            <ReportCustomTextField
                              formProps={formProps}
                              name="west_site"
                            />
                          </div>
                          <div className="w-34 p-1 ">
                            {" "}
                            <ReportCustomTextField
                              formProps={formProps}
                              name="west_plan"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="test-b test-r d-flex">
                        <div className="w-10 p-1 test-r m-0">5</div>
                        <div className="w-20 text-left p-1 pl-2 test-r">
                          Boundaries are matching or not
                        </div>
                        <div className="w-70 p-1 pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="boundaries_matching"
                          />
                        </div>
                      </div>

                      <div className="test-b test-r d-flex">
                        <div className="w-10 p-1 test-r m-0">6</div>
                        <div className="w-20 text-left p-1 pl-2 test-r">
                          Property Identified through
                        </div>
                        <div className="w-70 p-1 pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="property_identified_through"
                          />
                        </div>
                      </div>

                      <div className="test-b test-r d-flex">
                        <div className="w-10 p-1 test-r m-0">7</div>
                        <div className="w-20 text-left p-1 pl-2 test-r">
                          Plot Demarcated at site
                        </div>
                        <div className="w-70 p-1 pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="plot_demacated"
                          />
                        </div>
                      </div>

                      <div className="test-b test-r d-flex">
                        <div className="w-10 p-1 test-r m-0">8</div>
                        <div className="w-20 text-left p-1 pl-2 test-r">
                          Amenities
                        </div>
                        <div className="w-70 p-1 pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="amenities"
                          />
                        </div>
                      </div>

                      <h6 className="m-0 p-1 test-r test-b">
                        D.STRUCTURAL DETAILS
                      </h6>

                      <div className="test-b test-r d-flex">
                        <div className="w-10 p-1 test-r m-0">1</div>
                        <div className="w-20 text-left test-r p-1">
                          Type of Structure
                        </div>
                        <div className="w-70 d-flex">
                          <div className="w-33 p-1 test-r">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="type_of_structure"
                            />
                          </div>
                          <div className="w-33 p-1  test-r">
                            No of Floors Approved
                          </div>
                          <div className="w-34 p-1 ">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="no_of_floors_approved"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="test-b test-r d-flex">
                        <div className="w-10 p-1 test-r m-0">2</div>
                        <div className="w-20 text-left p-1 pl-2 test-r">
                          No of wings
                        </div>
                        <div className="w-70 p-1 pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="no_of_wings"
                          />
                        </div>
                      </div>

                      <div className="test-b test-r d-flex">
                        <div className="w-10 p-1 test-r m-0">3</div>
                        <div className="w-20 text-left p-1 pl-2 test-r">
                          No. of flats on each floor
                        </div>
                        <div className="w-70 p-1 pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="no_of_flat_on_each_floor"
                          />
                        </div>
                      </div>

                      <div className="test-b test-r d-flex">
                        <div className="w-10 p-1 test-r m-0">4</div>
                        <div className="w-20 text-left p-1 pl-2 test-r">
                          Quality of construction
                        </div>
                        <div className="w-70 p-1 pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="quality_of_construction"
                          />
                        </div>
                      </div>

                      <div className="test-b test-r d-flex">
                        <div className="w-10 p-1 test-r m-0">5</div>
                        <div className="w-20 text-left test-r p-1">
                          Structural observation
                        </div>
                        <div className="w-70 d-flex">
                          <div className="w-33 p-1 test-r">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="structural_observation"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="test-b test-r d-flex">
                        <div className="w-10 p-1 test-r m-0">6</div>
                        <div className="w-20 text-left p-1 pl-2 test-r">
                          Configuration
                        </div>
                        <div className="w-70 p-1 pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="configuration"
                          />
                        </div>
                      </div>
                    </div>
                    {/* <div className="page-break"></div> */}
                    <div className=" 2-page test border-bottom-0 text-center pdf-h-w">
                      <h6 className="m-0 p-1 test-r test-b">E. INTERIORS</h6>

                      <div className="test-b test-r d-flex">
                        <div className="w-10 p-1 test-r m-0">1</div>
                        <div className="w-20 text-left p-1 pl-2 test-r">
                          Flooring & finishing
                        </div>
                        <div className="w-70 p-1 pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="flooring_finishing"
                          />
                        </div>
                      </div>

                      <div className="test-b test-r d-flex">
                        <div className="w-10 p-1 test-r m-0">2</div>
                        <div className="w-20 text-left p-1 pl-2 test-r">
                          Roofing and terracing
                        </div>
                        <div className="w-70 p-1 pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="roofing_terracing"
                          />
                        </div>
                      </div>

                      <div className="test-b test-r d-flex">
                        <div className="w-10 p-1 test-r m-0">3</div>
                        <div className="w-20 text-left p-1 pl-2 test-r">
                          Quality of fixtures & Settings
                        </div>
                        <div className="w-70 p-1 pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="quality_of_fixtures_setting"
                          />
                        </div>
                      </div>

                      <div className="test-b test-r d-flex">
                        <div className="w-10 p-1 test-r m-0">4</div>
                        <div className="w-20 text-left p-1 pl-2 test-r">
                          Doors & Windows
                        </div>
                        <div className="w-70 p-1 pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="doors_windows"
                          />
                        </div>
                      </div>

                      <h6 className="m-0 p-1 test-r test-b">
                        F.PLAN APPROVAL DETAILS
                      </h6>

                      <div className="test-b test-r d-flex">
                        <div className="w-10 p-1 test-r m-0">1</div>
                        <div className="w-20 text-left p-1 pl-2 test-r">
                          Construction as per approved / sanctioned plans
                        </div>
                        <div className="w-70 p-1 pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="sanctioned_plan"
                          />
                        </div>
                      </div>

                      <div className="test-b test-r d-flex">
                        <div className="w-10 p-1 test-r m-0">2</div>
                        <div className="w-20 text-left p-1 pl-2 test-r">
                          Details of approved plan with approval no & date
                        </div>
                        <div className="w-70 p-1 pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="detail_of_approved_plan"
                          />
                        </div>
                      </div>

                      <div className="test-b test-r d-flex">
                        <div className="w-10 p-1 test-r m-0">3</div>
                        <div className="w-20 text-left p-1 pl-2 test-r">
                          Construction permission Number and date.
                        </div>
                        <div className="w-70 p-1 pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="construction_permission"
                          />
                        </div>
                      </div>

                      <div className="test-b test-r d-flex">
                        <div className="w-10 p-1 test-r m-0">4</div>
                        <div className="w-20 text-left p-1 pl-2 test-r">
                          Violations Observed if Any or is there any risk of
                          Demolition in case of Violation
                        </div>
                        <div className="w-70 p-1 pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="violation_observed"
                          />
                        </div>
                      </div>

                      <div className="test-b test-r d-flex">
                        <div className="w-10 p-1 test-r m-0">5</div>
                        <div className="w-20 text-left p-1 pl-2 test-r">
                          If plans not available then is the structure
                          confirming to the local byelaws
                        </div>
                        <div className="w-70 p-1 pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="plan_not_available"
                          />
                        </div>
                      </div>

                      <h6 className="m-0 p-1 test-r test-b">
                        G.DEVIATION DETAILS
                      </h6>

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
                            <div className=" test-b p-1">
                              Deviation in sqft
                              <ReportCustomTextField
                                formProps={formProps}
                                name="deviation_in_sqft"
                              />
                            </div>
                            <div className="d-flex w-100">
                              <div className="w-50 test-r">
                                <div className="test-b p-1">AT SITE</div>
                                <div className="test-b p-1">
                                  <ReportCustomTextField
                                    formProps={formProps}
                                    name="ground_floor_plan"
                                  />
                                </div>
                                <div className="test-b p-1">
                                  <ReportCustomTextField
                                    formProps={formProps}
                                    name="ground_floor_at_site1"
                                  />
                                </div>
                                <div className="p-1">
                                  <ReportCustomTextField
                                    formProps={formProps}
                                    name="ground_floor_at_site2"
                                  />
                                </div>
                              </div>
                              <div className="w-50">
                                <div className="test-b p-1">AT SITE</div>
                                <div className="test-b p-1">
                                  <ReportCustomTextField
                                    formProps={formProps}
                                    name="first_floor_plan"
                                  />
                                </div>
                                <div className="test-b p-1">
                                  <ReportCustomTextField
                                    formProps={formProps}
                                    name="first_floor_at_site1"
                                  />
                                </div>
                                <div className="p-1">
                                  <ReportCustomTextField
                                    formProps={formProps}
                                    name="first_floor_at_site2"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="w-30 test-r test-l">
                            <div className=" test-b p-1">
                              Deviation in %
                              <ReportCustomTextField
                                formProps={formProps}
                                name="deviation_in_percent"
                              />
                            </div>
                            <div className="test-b p-1">AT SITE</div>
                            <div className="test-b p-1">
                              <ReportCustomTextField
                                formProps={formProps}
                                name="second_floor_plan"
                              />
                            </div>
                            <div className="test-b p-1">
                              <ReportCustomTextField
                                formProps={formProps}
                                name="second_floor_at_site1"
                              />
                            </div>
                            <div className="p-1">
                              <ReportCustomTextField
                                formProps={formProps}
                                name="second_floor_at_site2"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <h6 className="m-0 p-1 test-r test-b">
                        H. Self construction case
                      </h6>

                      <div className="self-contruction test-b d-flex">
                        <div className="w-10  max-height-100"></div>
                        <div className="w-45  test-r test-l">
                          <div className=" test-b p-1">
                            Architect certified estimate available or not
                          </div>
                          <div className="test-b p-1">
                            Construction Amount certified
                          </div>
                          <div className=" p-1">Others</div>
                        </div>
                        <div className="w-45  test-r test-l">
                          <div className=" test-b p-1">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="architect_certificate"
                            />
                          </div>
                          <div className="test-b p-1">
                            {" "}
                            <ReportCustomTextField
                              formProps={formProps}
                              name="contruction_amount_certified"
                            />
                          </div>

                          <div className="p-1">
                            {" "}
                            <ReportCustomTextField
                              formProps={formProps}
                              name="others"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="w-100">
                        <table className="">
                          <tr>
                            <th colspan="8">I.FAIR MARKET VALUE</th>
                          </tr>
                          <tr>
                            <td>1</td>
                            <td colspan="3">Valuation Methodology </td>
                            <td colspan="4">
                              Comparison Approach(Flat, Office, Showroom)
                            </td>
                          </tr>
                          <tr>
                            <td rowspan="15">2</td>
                            <td colspan="3">Particulars</td>
                            <td>Description </td>
                            <td>Area (in Sft)</td>
                            <td>Rate (per sft)</td>
                            <td>Total Value</td>
                          </tr>
                          <tr>
                            <td colspan="3">Plot Area</td>
                            <td>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="plot_area_description"
                              />
                            </td>
                            <td>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="plot_area_area"
                              />
                            </td>
                            <td>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="plot_area_rate"
                              />
                            </td>
                            <td>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="plot_area_total_value"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td colspan="3">Carpet area as per document </td>
                            <td>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="carpet_doc_description"
                              />
                            </td>
                            <td>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="carpet_doc_area"
                              />
                            </td>
                            <td>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="carpet_doc_rate"
                              />
                            </td>
                            <td>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="carpet_doc_total_value"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td colspan="3">
                              Carpet area as per approved plan{" "}
                            </td>
                            <td>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="carpet_approved_description"
                              />
                            </td>
                            <td>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="carpet_approved_area"
                              />
                            </td>
                            <td>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="carpet_approved_rate"
                              />
                            </td>
                            <td>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="carpet_approved_total_value"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td colspan="3">Built up area</td>
                            <td>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="builtup_description"
                              />
                            </td>
                            <td>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="builtup_area"
                              />
                            </td>
                            <td>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="builtup_rate"
                              />
                            </td>
                            <td>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="builtup_total_value"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td colspan="3">Super Built up area</td>
                            <td>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="super_build_description"
                              />
                            </td>
                            <td>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="super_build_area"
                              />
                            </td>
                            <td>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="super_build_rate"
                              />
                            </td>
                            <td>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="super_build_total_value"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td colspan="3">
                              No of parking(open/stilt parking)
                            </td>
                            <td>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="parking_description"
                              />
                            </td>
                            <td>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="parking_area"
                              />
                            </td>
                            <td>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="parking_rate"
                              />
                            </td>
                            <td>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="parking_total_value"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td colspan="3">Terrace (open / attached) </td>
                            <td>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="terrace_description"
                              />
                            </td>
                            <td>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="terrace_area"
                              />
                            </td>
                            <td>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="terrace_rate"
                              />
                            </td>
                            <td>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="terrace_total_value"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td colspan="3">Amenities value</td>
                            <td>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="amenities_description"
                              />
                            </td>
                            <td>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="amenities_area"
                              />
                            </td>
                            <td>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="amenities_rate"
                              />
                            </td>
                            <td>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="amenities_total_value"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td colspan="3">Depreciation amount</td>
                            <td>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="depreciation_description"
                              />
                            </td>
                            <td>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="depreciation_area"
                              />
                            </td>
                            <td>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="depreciation_rate"
                              />
                            </td>
                            <td>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="depreciation_total_value"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td colspan="3">Carpet area as per measurement</td>
                            <td colspan="4">
                              <ReportCustomTextField
                                formProps={formProps}
                                name="carpet_area_per_measurement"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td colspan="3">
                              Fair market value of the property
                            </td>
                            <td colspan="4">
                              <ReportCustomTextField
                                formProps={formProps}
                                name="fair_market_value"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td colspan="3">
                              Realizable value of the property
                            </td>
                            <td colspan="4">
                              <ReportCustomTextField
                                formProps={formProps}
                                name="realizable_value"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td colspan="3">Distress value (70%)</td>
                            <td colspan="4">
                              <ReportCustomTextField
                                formProps={formProps}
                                name="distress_value"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td colspan="3">Insurable Value </td>
                            <td colspan="4">
                              <ReportCustomTextField
                                formProps={formProps}
                                name="insurable_value"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td colspan="7">
                              FLOORWISE DETAILS OF USAGE AND RENTAL VALUE
                            </td>
                          </tr>
                          <tr>
                            <td></td>
                            <td>Floor</td>
                            <td>Usage</td>
                            <td>Units</td>
                            <td>Value</td>
                            <td colspan="2">
                              If Tenanted, Year of Current Tenancy
                            </td>
                            <td>Rental Assessment</td>
                          </tr>
                          <tr>
                            <td></td>
                            <td>1st floor</td>
                            <td>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="first_floor_usage"
                              />
                            </td>
                            <td>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="first_floor_units"
                              />
                            </td>
                            <td>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="first_floor_value"
                              />
                            </td>
                            <td colspan="2">
                              <ReportCustomTextField
                                formProps={formProps}
                                name="first_floor_tenancy"
                              />
                            </td>
                            <td>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="first_rental_assessment"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td></td>
                            <td>2nd floor</td>
                            <td>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="second_floor_usage"
                              />
                            </td>
                            <td>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="second_floor_units"
                              />
                            </td>
                            <td>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="second_floor_value"
                              />
                            </td>
                            <td colspan="2">
                              <ReportCustomTextField
                                formProps={formProps}
                                name="second_floor_tenancy"
                              />
                            </td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td colspan="3">Stage of construction</td>
                            <td colspan="4">
                              <ReportCustomTextField
                                formProps={formProps}
                                name="stage_of_construction"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>5</td>
                            <td colspan="3">Govt. Guideline value</td>
                            <td colspan="4">
                              <ReportCustomTextField
                                formProps={formProps}
                                name="govt_guild_value"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>6</td>
                            <td colspan="3">Demolition Risk</td>
                            <td colspan="4">
                              <ReportCustomTextField
                                formProps={formProps}
                                name="demolition_risk"
                              />
                            </td>
                          </tr>

                          <tr>
                            <td>7</td>
                            <td colspan="3">
                              Latitude & longitude of property{" "}
                            </td>
                            <td colspan="4">
                              <ReportCustomTextField
                                formProps={formProps}
                                name="latitude"
                              />
                              ,
                              <ReportCustomTextField
                                formProps={formProps}
                                name="longitude"
                              />
                            </td>
                          </tr>

                          <tr>
                            <td>8</td>
                            <td colspan="3">
                              Which seismic zone property is located in?
                            </td>
                            <td colspan="4">
                              <ReportCustomTextField
                                formProps={formProps}
                                name="seismic_zone"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>9</td>
                            <td colspan="3">
                              Which cyclone area is the building is located in?
                            </td>
                            <td colspan="4">
                              <ReportCustomTextField
                                formProps={formProps}
                                name="cyclone_area"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>10</td>
                            <td colspan="3">
                              Which flood area is the building is located in?
                            </td>
                            <td colspan="4">
                              <ReportCustomTextField
                                formProps={formProps}
                                name="flood_area"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>11</td>
                            <td colspan="3">
                              Which land slide is the building is located in?
                            </td>
                            <td colspan="4">
                              <ReportCustomTextField
                                formProps={formProps}
                                name="land_slide"
                              />
                            </td>
                          </tr>
                          <tr>
                            <th colspan="8" className="text-left border-0">
                              <span className="p-1"> Remarks :</span>
                              <div className="p-2 m-2 border-0">
                                <ReportCustomTextField
                                  formProps={formProps}
                                  name="remarks"
                                  multiline
                                />
                              </div>
                            </th>
                          </tr>
                        </table>
                      </div>
                    </div>
                    {/* <div className="page-break"></div> */}
                    <div className=" 3-page test-t pdf-h-w">
                      <div className="test-b test-r test-l">
                        <p className="p-1 m-0 ">Declaration:-</p>
                        <ul className="">
                          {console.log(
                            "props?.dropdownDetails?.dropdownDetails",
                            props?.dropdownDetails?.dropdownDetails?.data?.filter(
                              (field) =>
                                field?.branch?.bank_name ==
                                props?.property?.property?.branch?.bank_name
                            ),
                            props?.dropdownDetails?.dropdownDetails
                          )}
                          <li>
                            {
                              props?.dropdownDetails?.dropdownDetails?.data?.filter(
                                (field) =>
                                  field?.branch?.bank_name ==
                                  props?.property?.property?.branch?.bank_name
                              )[0]?.name
                            }
                          </li>
                          {/* <li>
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
                            cannot preserve them
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
                          </li> */}
                        </ul>
                      </div>
                      <div className="test-b test-r test-l">
                        <p className="p-1 m-0 ">Sign & Stamp:</p>
                        <div className="d-flex w-20 m-2">
                          <img
                            src={SignupLogo}
                            alt="signup logo"
                            className="pl-3 w-100"
                          />
                        </div>
                      </div>

                      <div className="test d-flex">
                        
                        <div className="w-100 ">
                          <div className="test-b text-center p-1">
                            For Libra Valuers
                          </div>
                          <div className="">
                            <div className="p-1">
                              Place:{" "}
                              <ReportCustomTextField
                                formProps={formProps}
                                name="place"
                              />
                            </div>
                            <div className="p-1">
                              Date:{" "}
                              <ReportCustomTextField
                                formProps={formProps}
                                name="date"
                              />
                            </div>
                          </div>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Report1);