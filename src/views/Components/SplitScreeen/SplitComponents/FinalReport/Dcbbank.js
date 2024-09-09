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

function Dcbbank(props) {
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
                  <h2 className="text-center">DCB BANK LTD</h2>
                  <div className="valuation-report">
                    <div className="test font-bolder text-center">
                      <h4 className="">Valuation report</h4>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">
                        Ref. No.:{" "}
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        APPL 01580942
                      </div>
                      <div className="w-60 p-1  pl-2">Date:5-6-2024</div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">1</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Purpose of valuation
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">2</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Date of inspection and valuation
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">3</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Valuation requested by
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">4</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Suburb name
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">5</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Case no.
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">6</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Type of loan
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">7</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Project name (if any)
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">8</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Name of the customer
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">9</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Property address
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">10</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Property owner (as per doc.)
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">11</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Documents submitted
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">12</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Brief description of the property
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">13</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Type of the property
                        <br />
                        (Independent House / Flat
                        <br />
                        / Office / Shop / Plot)
                        <br />
                        New / Resale <br />
                        Ready property / Under Construction
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">14</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Name of access road
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">15</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        S. No. , Plot No. and C.T.S. No.
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">16</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Classification of locality
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">17</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Proximity to civic amenities
                      </div>
                      <div className="w-60">
                        <div className="d-flex">
                          <div className="test-r w-33 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                          <div className="test-r w-33 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                          <div className="test-r w-34 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                        </div>
                        <div className="d-flex">
                          <div className="test-r w-33 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                          <div className="test-r w-33 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                          <div className="test-r w-34 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">18</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Mode of transport to the property
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">19</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Land freehold or leasehold, term of <br />
                        lease, period expired, balance and <br />
                        lease rent:
                        <br />
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">20</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Jurisdiction / Local Municipal body / <br />
                        Town Planning / Development <br />
                        Authority Area / Panchayat <br />
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">21</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Approvals for drawings from mun. <br />
                        authorities / occupation certificate. <br />
                        ULC clearance /F.S.I. available and <br />
                        balance for future use / F.S.I from <br />
                        T.D.R
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">22</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Name of the co-operative Housing <br />
                        Society Registration No. of Society <br />
                        No. of shares held and certificate no. <br />
                        outgoes per month
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      {/* <div className="w-10 p-1 test-r m-0 text-center">23</div> */}
                      <div className="w-10 test-r">
                        <div className="d-flex">
                          <div className="test w-100 p-1  pl-2">23</div>
                        </div>
                        <div className="d-flex">
                          <div className="test w-100 p-3  pl-2"></div>
                        </div>
                      </div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Boundary details
                      </div>

                      <div className="w-60">
                        <div className="d-flex">
                          <div className="test w-100 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                        </div>
                        <div className="d-flex">
                          <div className="test w-100 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                        </div>
                        <div className="d-flex">
                          <div className="test w-100 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                        </div>
                        <div className="d-flex">
                          <div className="test w-100 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">24</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Whether property falls in the list <br />
                        published by M/C for unauthorized <br />
                        properties
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">25</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Property is easily identifiable
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">26</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Whether property was
                        <br /> identified on our own
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">27</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        If No, your representative was <br />
                        accompanied with customer / Sales
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">28</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Property is demarcated
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">29</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Geo positioning of the property <br />
                        (latitude & longitude)
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="details-structure">
                    <div className="test font-bolder">
                      <h4 className="p-1">
                        <u> II) Details of structure and specifications</u>
                      </h4>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">1</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Year of construction of building
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">2</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Age of the property
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">3</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Estimated future life(Residual age)
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">4</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Present condition of building
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">5</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Any immediate repairs required
                        <br /> with cost of the same
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">6</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Type of construction
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">7</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Permitted use of the property
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">8</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Actual use of the property
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">9</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        No. of floors for building and <br />
                        additional structures:
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">10</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        No. of lifts with capacity and type
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">11</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Type of underground, overhead <br />
                        tanks and pumps
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">12</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Flooring in open spaces / stilts
                        <br /> and staircase
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">13</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Compound wall and gated
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">14</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Building elevation
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">15</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Other amenities and special
                        <br /> amenities and features
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">16</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        General comments on specifications
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">17</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        No. of floors
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">18</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        No. of flats on each floor
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">19</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Accommodation details
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        Basement :
                      </div>
                      <div className="w-40 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center"></div>
                      <div className="w-30 text-left p-1 pl-2 test-r"></div>
                      <div className="w-60">
                        <div className="d-flex">
                          <div className="w-20 text-left p-1 pl-2">
                            G. Floor:
                          </div>
                          <div className="test-b w-80 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                        </div>
                        <div className="d-flex">
                          <div className="w-20 text-left p-1 pl-2">
                            F. Floor:
                          </div>
                          <div className="test-b w-80 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                        </div>
                        <div className="d-flex">
                          <div className="w-20 text-left p-1 pl-2">
                            S. Floor:
                          </div>
                          <div className="test-b w-80 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                        </div>
                        <div className="d-flex">
                          <div className="w-20 text-left p-1 pl-2">
                            T. Floor:
                          </div>
                          <div className="test-b w-80 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="details-property-under-reference">
                    <div className="test font-bolder">
                      <h4 className="p-1">
                        <u> III) Details for the property under reference:</u>
                      </h4>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">1</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Balconies to rooms separate
                        <br /> or merged
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">2</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Walls, plaster and painting
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">3</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Doors and windows
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">4</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Type of flooring
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">5</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Flooring in toilets / W.C. / bath, dado
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">6</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Kitchen platform type and sink
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">7</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Toilets plumbing lines concealed / <br />
                        open type of plumbing and san. <br />
                        Fittings, any special fittings, ceiling
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">8</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Electrical installation open or <br />
                        concealed wiring Type of switches <br />
                        tel. Points, T.V / cable points
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">9</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Risk of demolition (Valuers views)
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">10</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        In case the property has mixed use, <br />
                        define the area being used for purpose
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">11</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Is the mixed use of the property <br />
                        permitted or is it unauthorized
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">12</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Property currently occupied by
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">13</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        If self occupied, then since when
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="assumption-data">
                    <div className="test font-bolder">
                      <h4 className="p-1">
                        <u>
                          IV) Assumptions, data available and basis- for the
                          purpose of valuation.
                        </u>
                      </h4>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">1</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Drawings and approvals
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">2</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Plot area
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">3</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Age of the property
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">4</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Estimated future Life
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">5</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Present condition of property
                        <br /> and structure
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">6</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Comments on specifications
                        <br /> and amenities
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-10 p-1 test-r m-0 text-center">7</div>
                      <div className="w-30 text-left p-1 pl-2 test-r">
                        Market rates of land for similar <br />
                        properties in the vicinity and <br />
                        surrounding area (as inquired from <br />
                        local estate agents)
                      </div>
                      <div className="w-60 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="valuation-of-property">
                    <div className="test font-bolder">
                      <h4 className="p-1">
                        <u>V) Valuation of the property –</u>
                      </h4>
                    </div>
                    <div className="test font-bolder">
                      <h4 className="p-1">1. For Ready Properties -</h4>
                    </div>
                    <div className="test font-bolder">
                      In view of the data available and basis for valuation, the
                      valuation of the property under reference will as under –
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center">
                        Area of property (Permitted as per FSI / building
                        byelaws)
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r font-bolder">
                        <u>Floor</u>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r font-bolder">
                        <u>Actual area (in sq.ft) </u>
                      </div>
                      <div className="w-40 p-1  pl-2 font-bolder">
                        <u>Permissible area(in sq.ft)</u>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center"></div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        Basement
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-40 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center"></div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        G. Floor
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-40 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center"></div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        F. Floor
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-40 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center"></div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        S. Floor
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-40 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center"></div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        T. Floor
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-40 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center"></div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        TOTAL
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-40 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center">
                        Built up / Saleable area
                      </div>
                      <div className="w-80 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center">
                        % loading
                      </div>
                      <div className="w-80 text-left p-1 pl-2 test-r text-center font-bolder">
                        1.0 (As per BUA)
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center">
                        Carpet area (approx)
                      </div>
                      <div className="w-80 text-left p-1 pl-2 test-r text-center font-bolder">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center">
                        Area as per sale agreement
                      </div>
                      <div className="w-80 text-left p-1 pl-2 test-r text-center font-bolder">
                        590 Built Up Area (As per Registered Agreement)
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center">
                        Adherence to building byelaws / FSI
                      </div>
                      <div className="w-80 text-left p-1 pl-2 test-r text-center">
                        Yes / No. If No, details of deviation as under - Yes
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center">
                        Deviation from building byelaws (if any)
                      </div>
                      <div className="w-40 text-left p-1 pl-2 test-r text-center">
                        Plot coverage % NA
                      </div>
                      <div className="w-40 text-left p-1 pl-2 test-r text-center font-bolder">
                        <u>FSI / byelaws %NA</u>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-100 p-1 test-r m-0 font-bolder">
                        <u>1. For Land & Building</u>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center">A</div>
                      <div className="w-80">
                        <div className="d-flex test-b">
                          <div className="test-r w-25 p-1  pl-2">Land area</div>
                          <div className="test-r w-25 p-1  pl-2">
                            Rate adopted
                          </div>
                          <div className="test-r w-50 p-1  pl-2">
                            Land value
                          </div>
                        </div>
                        <div className="d-flex">
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
                          <div className="test-r w-50 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center">B</div>
                      <div className="w-80">
                        <div className="d-flex test-b">
                          <div className="test-r w-25 p-1  pl-2">
                            BUA (as per FSI){" "}
                          </div>
                          <div className="test-r w-25 p-1  pl-2">
                            Rate adopted (after depn)
                          </div>
                          <div className="test-r w-50 p-1  pl-2">
                            Less – Repairs
                          </div>
                        </div>
                        <div className="d-flex">
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
                          <div className="test-r w-50 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center">C</div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        Total Value of Building (A+B) (as per FSI)
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-100 p-1 test-r m-0 font-bolder">
                        <u>2. For Flat / Shop / floor</u>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center">
                        Super Built up area
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        Rate adopted
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        Amenities/ parking
                      </div>
                      <div className="w-40 p-1  pl-2">
                        Market value
                        {/* <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        /> */}
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center">
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
                      <div className="w-40 p-1  pl-2">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-60 p-1 test-r m-0 text-center font-bolder">
                        Insurance value (Area *const rate)
                      </div>
                      <div className="w-40 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-60 p-1 test-r m-0 text-center font-bolder">
                        Forced / Distress sale value (70%)
                      </div>
                      <div className="w-40 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-60 p-1 test-r m-0 text-center font-bolder">
                        Realiazable value (90%)
                      </div>
                      <div className="w-40 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-100 p-1 test-r m-0 font-bolder">
                        <u>2. For Under Construction Properties –</u>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center">1</div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        If Under construction (then mention the level of
                        construction / Slab)
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center">2</div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        Stage of construction
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center">3</div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        Estimated date of completion
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center">4</div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        Is the estimate given by customer valid or not (HL -
                        Self construction)
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center">5</div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        Any comments on Cost Estimate
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-40 p-1 test-r m-0 text-center">
                        Area of property (Permitted as per approved plan){" "}
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r font-bolder">
                        <u>Floor </u>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r font-bolder">
                        <u>Actual area </u>
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r font-bolder">
                        <u>Permissible as per plan </u>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-40 p-1 test-r m-0 text-center"></div>
                      <div className="w-20 text-left p-1 pl-2 test-r"></div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        (approx)
                      </div>
                      <div className="w-20 text-left p-1 pl-2 test-r"></div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-40 p-1 test-r m-0 text-center"></div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        Basement
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
                      <div className="w-40 p-1 test-r m-0 text-center"></div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        G. Floor
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
                      <div className="w-40 p-1 test-r m-0 text-center"></div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        F. Floor
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
                      <div className="w-40 p-1 test-r m-0 text-center"></div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        S. Floor
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
                      <div className="w-40 p-1 test-r m-0 text-center"></div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        T. Floor
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
                      <div className="w-40 p-1 test-r m-0 text-center"></div>
                      <div className="w-20 text-left p-1 pl-2 test-r font-bolder">
                        TOTAL
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
                      <div className="w-40 p-1 test-r m-0 text-center">
                        Built up / Saleable area
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-40 p-1 test-r m-0 text-center">
                        % loading
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-40 p-1 test-r m-0 text-center">
                        Carpet area (approx)
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-40 p-1 test-r m-0 text-center">
                        Area as per sale agreement
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-40 p-1 test-r m-0 text-center">
                        Adherence to Sanction Plan
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-40 p-1 test-r m-0 text-center">
                        Deviation from Sanction Plan (if any)
                      </div>
                      <div className="w-20 p-1 test-r m-0">Plot coverage</div>
                      <div className="w-40 text-left p-1 pl-2 test-r">
                        <u>Sanction Plan</u>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-40 p-1 test-r m-0 text-center"></div>
                      <div className="w-20 p-1 test-r m-0">
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
                  </div>
                  <div className="for-land-and-building">
                    <div className="test font-bolder">
                      <h4 className="p-1">
                        <u>9. For Land & Building</u>
                      </h4>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center">A</div>
                      <div className="w-80">
                        <div className="d-flex test-b">
                          <div className="test-r w-25 p-1  pl-2">Land area</div>
                          <div className="test-r w-25 p-1  pl-2">
                            Rate adopted
                          </div>
                          <div className="test-r w-50 p-1  pl-2">
                            Land value
                          </div>
                        </div>
                        <div className="d-flex">
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
                          <div className="test-r w-50 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center">B</div>
                      <div className="w-80">
                        <div className="d-flex test-b">
                          <div className="test-r w-25 p-1  pl-2">
                            BUA (as per FSI){" "}
                          </div>
                          <div className="test-r w-25 p-1  pl-2">
                            Rate adopted (after depn)
                          </div>
                          <div className="test-r w-50 p-1  pl-2">
                            Less – Repairs
                          </div>
                        </div>
                        <div className="d-flex">
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
                          <div className="test-r w-50 p-1  pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center">C</div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        Total Value of Building (A+B) (as per FSI)
                      </div>
                      <div className="w-60 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test font-bolder">
                      <h4 className="p-1">(ii) For Flat / Shop / floor</h4>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center">
                        Built up area
                      </div>
                      <div className="w-20 p-1 test-r m-0">Rate adopted</div>
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        Amenities
                        {/* <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        /> */}
                      </div>
                      <div className="w-40 p-1 test-r m-0 text-center">
                        Market value
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-r m-0 text-center">
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
                      <div className="w-20 text-left p-1 pl-2 test-r">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-40 p-1 test-r m-0 text-center">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-40 p-1 test-r m-0 text-center font-bolder">
                        Insurance value (Area *const rate)
                      </div>
                      <div className="w-60 p-1 test-r m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-40 p-1 test-r m-0 text-center font-bolder">
                        Forced / Distress sale value (70%)
                      </div>
                      <div className="w-60 p-1 test-r m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-40 p-1 test-r m-0 text-center font-bolder">
                        Realiazable value (90%)
                      </div>
                      <div className="w-60 p-1 test-r m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-100 p-1 test-r m-0 font-bolder">
                        Stage of Construction:
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-40 p-1 test-r m-0 font-bolder">
                        Details of Stage of Construction
                      </div>
                      <div className="w-60 p-1 test-r m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-40 p-1 test-r m-0 font-bolder">
                        Percentage of completion (%)
                      </div>
                      <div className="w-20 p-1 test-r m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                      <div className="w-20 p-1 test-r m-0 font-bolder">
                        Percentage Recommended(%)
                      </div>
                      <div className="w-20 p-1 test-r m-0">
                        <ReportCustomTextField
                          formProps={formProps}
                          name="prospect_no"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="remark">
                    <div className="test d-flex">
                      <div className="w-100 p-1 test-r m-0">
                        <h5>Remarks :</h5>
                        <ol>
                          <li>
                            The property under consideration is 1 BHK Flat
                            located on 1st Floor in Ground + 3rd storied
                            residential building without lift
                          </li>
                          <li>
                            As per site observetion access to the building is as
                            per norms and road width is 20 feet approx.
                          </li>
                          <li>
                            We have received Xerox Copy Of Registered Agreement
                            for sale & Society Registeration Letter are made
                            available for verification.
                          </li>
                          <li>
                            Kindly check the CC & Sanctioned Plan OC at your end
                            before disbursement.
                          </li>
                          <li>
                            At the time of visit we have observed that property
                            was Self Occupied Mrs. Preeti Wagurmekar since last
                            35 Years.
                          </li>
                          <li>
                            As per society name board owner of the unit is Mr.
                            Pandurang Waghurmekar.
                          </li>
                          <li>
                            Registered Agreement for sale made between Mr.
                            Dnyaneshwar Gopal Ghadi AND Mr. Pandurang Sabaji
                            Waghurmekar & Mrs. Priti Pandurang Waghurmekar On
                            Dated 23/12/2002 are made available for
                            verification.
                          </li>
                          <li>
                            Unit boundaries are not mentioned in available
                            documents hence Please check at your legal end
                            before disbursement.
                          </li>
                          <li>
                            We have considered Built Up Area as per Registered
                            Agreement to furnish the report.
                          </li>
                          <li>
                            As the age of property is more than 15 years report
                            release on the basis of available documents as per
                            institute policy.
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                  <div className="test font-bolder">
                    <h4 className="p-1">VI) Marketability</h4>
                  </div>
                  <div className="test d-flex">
                    <div className="w-20 p-1 test-r m-0">For sale</div>
                    <div className="w-20 p-1 test-r m-0">Good</div>
                    <div className="w-20 p-1 test-r m-0">Average</div>
                    <div className="w-20 p-1 test-r m-0">Poor</div>
                    <div className="w-20 p-1 test-r m-0">Average</div>
                  </div>
                  <div className="test d-flex">
                    <div className="w-20 p-1 test-r m-0">
                      For lease - estimated rental Income
                    </div>
                    <div className="w-20 p-1 test-r m-0">Good</div>
                    <div className="w-20 p-1 test-r m-0">Average</div>
                    <div className="w-20 p-1 test-r m-0">Poor</div>
                    <div className="w-20 p-1 test-r m-0">Average</div>
                  </div>
                  <div className="test font-bolder text-center">
                    <h4 className="p-1">VII) Declaration</h4>
                  </div>
                  <div className="test">
                    <ul>
                      <li>
                        Our representative has visited this site. I/We have not
                        verified the title deeds of the properties with the
                        records of the registrar's office as this is beyond the
                        agreed scope of work.Assumptions are made to the best of
                        our knowledge and belief. Reliance is based on the
                        information furnished to us by the identifier AND/OR
                        client.
                      </li>
                      <li>
                        The valuer shall not be responsible for the matters of
                        legal nature that affects the value and opinion
                        expressed by us.
                      </li>
                      <li>
                        where a sketched plan is attached to this report,it does
                        not purport to represent accurate architectural
                        plans.Sketch plans and photographs are provided as
                        general illustrations only.Documents furnished to us are
                        returned to the client along with the report. We cannot
                        preserve them.
                      </li>
                      <li>
                        Fair market value indicated in the report is an opinion
                        of the value prevailing on the date of the said report
                        and is based on market feedback on values of similar
                        properties. Client is free to obtain other independent
                        opinions on the same. Fair, market value of such
                        properties / localities may increase or decrease,
                        depending on the future market conditions & scenarios.
                        value varies with the purpose & date.This report is not
                        to be referred if the purpose is different other than
                        mentioned.No structural survey was conducted by us as it
                        is not in our scope of work
                      </li>
                      <li>
                        We hereby declare, “The information furnished above is
                        true and correct to the best of our knowledge and
                        belief. We have no direct or indirect interest in the
                        assets valued.
                      </li>
                    </ul>
                  </div>
                  <div className="test d-flex">
                    <div className="w-40 p-1 test-r m-0">Place: Mumbai</div>
                    <div className="w-60 p-1 test-r m-0">
                      For M/s Libra valuers
                    </div>
                  </div>
                  <div className="test d-flex">
                    <div className="w-60 p-1 test-r m-0">Date of report : </div>
                    <div className="w-40 p-1 test-r m-0">(SIGNATORY)</div>
                  </div>
                  <div className="test d-flex">
                    <div className="w-100 p-1 test-r m-0">
                      Note: customer name & address should be there on all above
                      3 points . Also follow DCB Bank digital report requirement
                      as discussed last time
                    </div>
                  </div>
                  <div className="test d-flex">
                    <div className="w-100 p-1 test-r m-0 text-center font-bolder">
                    Property Photos Location Sketch
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

export default connect(mapStateToProps, mapDispatchToProps)(Dcbbank);
