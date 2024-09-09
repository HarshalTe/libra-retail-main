import React, { useEffect } from "react";
import { connect } from "react-redux";

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
import ReportCustomTextField from "./../../../../../components/MuiComponents/ReportCustomTextField";

export const ReportContext = React.createContext();

function Report1(props) {
  const [print, setPrint] = React.useState(false);

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
    <ReportContext.Provider value={{ print }}>
      <div className="d-flex justify-content-end">
        <Button
          color="warning w-20  m-3"
          onClick={() => setPrint(!print)}
          className="print-button"
        >
          {print ? (
            <i className="fa fa-edit mr-2" />
          ) : (
            <i className="fa fa-save mr-2" />
          )}
          {print ? "Edit Report " : "Save Report"}
        </Button>
        <Button
          color="success"
          onClick={printPdf}
          className="print-button w-20  m-3"
          disabled={!print}
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
          customer_name:
            props?.property?.property?.customer_name ??
            "Surendra Warden(NIL report)",
          prospect_no: 0,
          type_of_loan: "LAP",
          property_address:
            "Flat No. 3, West Hill, Near Bank Of Baroda, Nepeansea Road, Malabar Hill, Mumbai - 400036",
          owner_contact: "NA",
          tenant_name: "",
          technical_document: "Documents Not Provided",
          landmark: "Landmark",
          date_of_technical_visit: "12-05-2022",
          property_usage: "Residential",
          onsite: "Residential",
          occupancy: "Self Occupied",
          property_falls_in_demolition: "Low",
          marketability: "Average",
          front_side_road: "15 Feet Approximately",
          ward_no: "NA",
          type_of_locality: "Upper Class",
          property_type: "Residential",
          distance_From_city: "3.7 km from Mahalaxmi Railway Station",
          site_access: "Average",
          corporation_limit: "Yes",
          da: "MCGM",
          town_panchayat: "NA",
          villiage_panchayat: "NA",
          conditions_of_approach_road: "Good",
          mud_road_width: "Bituminous Road",
          no_of_floors_contructed: "Ground + 4th Floor",
          floor_wise_usage: "Residential",
          age_of_property: "35 Years (As Per Site Information) Years",
          residual_age: "25 Years",
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
          property_identified_through: "Surendra Warden, Na",
          plot_demacated: "YES",
          amenities: "Security, CCTV, Parking etc",
          type_of_structure: "RCC Frame structure",
          no_of_floors_approved: "Ground + 4th Floor",
          no_of_wings: "Single Building",
          no_of_flat_on_each_floor: "2 Flats On Each Floor",
          quality_of_construction: "Average",
          structural_observation: "Average, No Cracks",
          configuration: "3BHK",
          flooring_finishing: "Vitrified Tiles Flooring",
          roofing_terracing: "RCC Flat Roof",
          quality_of_fixtures_setting: "Concealed Fittings",
          doors_windows: "Wooden Doors & Aluminum Sliding Window",
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
          validation_methodology: "Comparison Approach(Flat, Office, Showroom)",
          plot_area_description: "NA",
          plot_area_area: "NA",
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
          builtup_area: "NA",
          builtup_rate: "NA",
          builtup_total_value: "NA",
          super_build_description: "NA",
          super_build_area: "NA",
          super_build_rate: "NA",
          super_build_total_value: "NA",
          parking_description: "NA",
          parking_area: "NA",
          parking_rate: "NA",
          parking_total_value: "NA",
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
          carpet_area_per_measurement: "2490",
          fair_market_value: "0",
          realizable_value: "0",
          distress_value: "0.00",
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
          demolition_risk: "Low",
          latitude: "18.962475",
          longitude: "72.803461",
          seismic_zone: "3",
          cyclone_area: "NA",
          flood_area: "NA",
          land_slide: "NA",
          place: "Mumbai",
          date: "17-05-2022",
          remarks: `This is a private case for Measurement Purpose only.,
          The property under consideration is 3 BHK flat in Ground+4th storied residential building without lift.,
          As per site observation access to the building is as per norms and road width is 30 feet approx.,
          During our visit we have not observed society name board.,
          Detailed measurement is mentioned in the annexure.,
          As per site total measured carpet area is 2490 sqft.,,,,,,,,,,,,,,,,,,,,,,`,
        }}
        // onSubmit={handleSubmit}
        validationSchema={Yup.object().shape({})}
      >
        {(formProps) => {
          return (
            <Form>
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
                  <div className=" 1-page test text-center">
                    <h6 className=" p-1 m-0 test">
                      {" "}
                      VALUATION REPORT FORMAT FOR LAP/BT/TOP UP /SELF CONST{" "}
                    </h6>
                    <div className="test d-flex">
                      <h6 className="w-70 p-1 test-r m-0">A.GENERAL DETAILS</h6>
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
                  <div className="page-break"></div>
                  <div className=" 2-page test border-bottom-0 text-center">
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
                        If plans not available then is the structure confirming
                        to the local byelaws
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

                    <table className="table table-sm">
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
                        <td>Area (in Sft) </td>
                        <td>Rate (per sft) </td>
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
                        <td colspan="3">Carpet area as per approved plan </td>
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
                        <td colspan="3">No of parking(open/stilt parking)</td>
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
                        <td></td>
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
                        <td colspan="3">Fair market value of the property</td>
                        <td colspan="4">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="fair_market_value"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td colspan="3">Realizable value of the property</td>
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
                        <td colspan="3">Latitude & longitude of property </td>
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
                        <th colspan="8" className="text-left border-0 p-1">
                          Remarks :
                          <p className="p-1 m-0 border-0">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="remarks"
                              multiline
                            />
                          </p>
                        </th>
                      </tr>
                    </table>
                  </div>
                  <div className="page-break"></div>
                  <div className=" 3-page test-t">
                    <div className="test-b test-r test-l">
                      <p className="p-1 m-0 ">Declaration:-</p>
                      <ul className="">
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
                          cannot preserve them
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
                    <div className="test-b test-r test-l">
                      <p className="p-1 m-0 ">Sign & Stamp:</p>
                      <img
                        src={SignupLogo}
                        alt="signup logo"
                        className="pl-3"
                      />
                    </div>
                    <div className="test-b test-r test-l d-flex">
                      <div className="w-20 max-height-100 test-r"></div>
                      <div className="w-80">
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

                    <div className="test-b test-r test-l w-100">
                      <p className="p-1 m-0 text-center">
                        Location with coordinates
                      </p>
                      <div className="w-70 mr-auto ml-auto">
                        <img src={Map} alt="map" className="w-100" />
                      </div>
                      <p className="p-1 mt-4 text-center">
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
                          Flat No. 3, West Hill, Near Bank Of Baroda, Nepeansea
                          Road, Malabar Hill, Mumbai - 400036
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="page-break"></div>
                  <div className="test 4-page text-center">
                    <div className="test-b w-100">
                      <div className="w-70 mr-auto ml-auto">
                        <p className=" p-1 m-0 text-center">Property ddd Sketch</p>
                        <img className="w-100" src={write} alt="" />
                      </div>
                    </div>
                    <div className="d-flex">
                      <div className="w-50 test-r">
                        <div className="w-80 pt-2 mr-auto ml-auto">
                          <img className="w-100" src={Home1} alt="" />
                          <p className="mt-4 m-0 p-1 ">
                            Wed May 04 2022 10:55:00 GMT+0530 (India Standard
                            Time){" "}
                          </p>
                        </div>
                      </div>
                      <div className="w-50">
                        <div className="w-80 pt-2 mr-auto ml-auto">
                          <img className="w-100" src={Home2} alt="" />
                          <p className="mt-4 m-0 p-1 ">
                            Wed May 04 2022 10:55:00 GMT+0530 (India Standard
                            Time){" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="page-break"></div>
                  <div className="test 5-page mb-50 text-center">
                    <div className="d-flex test-b">
                      <div className="w-50 test-r">
                        <div className="w-80 pt-2 mr-auto ml-auto">
                          <img className="w-100" src={Home3} alt="" />
                          <p className="mt-4 m-0 p-1 ">
                            Wed May 04 2022 10:55:00 GMT+0530 (India Standard
                            Time){" "}
                          </p>
                        </div>
                      </div>
                      <div className="w-50">
                        <div className="w-80 pt-2 mr-auto ml-auto">
                          <img className="w-100" src={Home4} alt="" />
                          <p className="mt-4 m-0 p-1 ">
                            Wed May 04 2022 10:55:00 GMT+0530 (India Standard
                            Time){" "}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex test-b">
                      <div className="w-50 test-r">
                        <div className="w-80 pt-2 mr-auto ml-auto">
                          <img className="w-100" src={Home5} alt="" />
                          <p className="mt-4 m-0 p-1 ">
                            Wed May 04 2022 10:55:00 GMT+0530 (India Standard
                            Time){" "}
                          </p>
                        </div>
                      </div>
                      <div className="w-50">
                        <div className="w-80 pt-2 mr-auto ml-auto">
                          <img className="w-100" src={Home6} alt="" />
                          <p className="mt-4 m-0 p-1 ">
                            Wed May 04 2022 10:55:00 GMT+0530 (India Standard
                            Time){" "}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex ">
                      <div className="w-50 test-r">
                        <div className="w-80 pt-2 mr-auto ml-auto">
                          <img className="w-100" src={Home7} alt="" />
                          <p className="mt-4 m-0 p-1 ">
                            Wed May 04 2022 10:55:00 GMT+0530 (India Standard
                            Time){" "}
                          </p>
                        </div>
                      </div>
                      <div className="w-50">
                        <div className="w-80 pt-2 mr-auto ml-auto">
                          <img className="w-100" src={Home8} alt="" />
                          <p className="mt-4 m-0 p-1 ">
                            Wed May 04 2022 10:55:00 GMT+0530 (India Standard
                            Time){" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="">
                <div className="" id="htmlToPdf2">
                  <h4 className="text-center mb-3">VALUATION REPORT</h4>
                  <div className="purchase-order">
                    <div className="purchase-order-1">
                      <div className="purchase-order-1-section-1">
                        <div className="purchase-order-1-section-1-item-1">
                          <span></span>
                          <span style={{ fontWeight: "bold" }}></span>
                          <p style={{ marginBottom: "0px" }}></p>
                          <p style={{ marginBottom: "0px" }}></p>
                          <p style={{ marginBottom: "0px" }}></p>
                          <p style={{ marginBottom: "0px" }}></p>
                        </div>
                        <div className="purchase-order-1-section-1-item-2">
                          <span></span>
                          <div style={{ fontWeight: "bold" }}>
                            <TextField
                              fullWidth
                              label="Annexure"
                              variant="standard"
                              id="text_area"
                              name="text_area"
                              value={formProps.values.text_area}
                              onChange={formProps.handleChange}
                            />
                          </div>
                          <div style={{ fontWeight: "bold" }}>
                            <TextField
                              fullWidth
                              id="customer_name"
                              name="customer_name"
                              label="Customer Name"
                              variant="standard"
                              value={formProps.values.customer_name}
                              onChange={formProps.handleChange}
                              error={
                                formProps.touched.customer_name &&
                                Boolean(formProps.errors.customer_name)
                              }
                              helperText={
                                formProps.touched.customer_name &&
                                formProps.errors.customer_name
                              }
                            />
                          </div>
                          <div style={{ fontWeight: "bold" }}>
                            <TextField
                              fullWidth
                              id="surname"
                              name="surname"
                              label="Surname"
                              variant="standard"
                              value={formProps.values.surname}
                              onChange={formProps.handleChange}
                              error={
                                formProps.touched.surname &&
                                Boolean(formProps.errors.surname)
                              }
                              helperText={
                                formProps.touched.surname &&
                                formProps.errors.surname
                              }
                            />
                          </div>

                          <div style={{ fontWeight: "bold" }}></div>
                          <div style={{ fontWeight: "bold" }}></div>
                        </div>

                        <div className="purchase-order-1-section-1-item-3">
                          <span></span>
                          <span
                            style={{
                              fontWeight: "bold",
                              fontSize: "17px",
                            }}
                          ></span>
                          <div>
                            <span></span>
                            <span
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            ></span>
                          </div>
                        </div>
                      </div>
                      <div className="purchase-order-1-section-2">
                        <div className="purchase-order-1-section-2-item-1">
                          <div className="purchase-order-1-section-2-item-1-table-1">
                            <div className="purchase-order-1-section-2-item-1-table-1-item-1">
                              <span></span>
                              <span
                                className="ml-1"
                                style={{ fontWeight: "600" }}
                              ></span>
                            </div>
                            <div
                              className="purchase-order-1-section-2-item-1-table-1-item-1"
                              style={{ textAlign: "center" }}
                            >
                              <span style={{ fontWeight: "bold" }}></span>
                              <span className="ml-1"></span>
                            </div>
                            <div className="purchase-order-1-section-2-item-1-table-1-item-1">
                              <span style={{ fontWeight: "bold" }}> </span>
                            </div>

                            <div className="purchase-order-1-section-2-item-1-table-1-item-2">
                              <span></span>
                              <span
                                className="ml-1"
                                style={{ fontWeight: "bold" }}
                              ></span>
                            </div>
                          </div>
                          <div className="purchase-order-1-section-2-item-1-table-2">
                            <div className="purchase-order-1-section-2-item-1-table-1-item-1">
                              <span></span>
                              <span
                                className="ml-1"
                                style={{ fontWeight: "bold" }}
                              ></span>
                            </div>
                            <div className="purchase-order-1-section-2-item-1-table-1-item-1"></div>
                            <div className="purchase-order-1-section-2-item-1-table-1-item-1">
                              <span></span>
                              <span style={{ fontWeight: "bold" }}></span>
                            </div>

                            <div className="purchase-order-1-section-2-item-1-table-1-item-2">
                              <span></span>
                              <span
                                className="ml-1"
                                style={{ fontWeight: "bold" }}
                              >
                                {" "}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="purchase-order-1-section-2-item-2">
                          <span></span>
                          <p style={{ fontWeight: "bold" }}></p>
                        </div>
                      </div>
                    </div>

                    <div className="purchase-order-2">
                      <div className="purchase-order-2-sextion-1">
                        <div className="purchase-order-2-sextion-2-header-1"></div>
                        <div className="purchase-order-2-sextion-2-header-2"></div>
                        <div className="purchase-order-2-sextion-2-header-3"></div>
                        <div className="purchase-order-2-sextion-2-header-4"></div>
                        <div className="purchase-order-2-sextion-2-header-5"></div>
                        <div className="purchase-order-2-sextion-2-header-6"></div>
                        <div className="purchase-order-2-sextion-2-header-7"></div>
                        <div className="purchase-order-2-sextion-2-header-8"></div>
                      </div>

                      <div className="purchase-order-2-sextion-1">
                        <div className="purchase-order-2-sextion-2-header-1"></div>
                        <div
                          className="purchase-order-2-sextion-2-header-2"
                          style={{
                            textAlign: "right",
                            paddingRight: "10px",
                          }}
                        ></div>
                        <div className="purchase-order-2-sextion-2-header-3"></div>
                        <div className="purchase-order-2-sextion-2-header-4"></div>
                        <div className="purchase-order-2-sextion-2-header-5"></div>
                        <div
                          className="purchase-order-2-sextion-2-header-6"
                          style={{ fontWeight: "bold", fontSize: "10px" }}
                        ></div>
                        <div className="purchase-order-2-sextion-2-header-7"></div>
                        <div
                          className="purchase-order-2-sextion-2-header-8"
                          style={{ fontWeight: "bold", fontSize: "10px" }}
                        ></div>
                      </div>

                      <div className="purchase-order-2-sextion-1">
                        <div className="purchase-order-2-sextion-2-header-1"></div>
                        <div
                          className="purchase-order-2-sextion-2-header-2"
                          style={{
                            textAlign: "right",
                            paddingRight: "10px",
                          }}
                        ></div>
                        <div className="purchase-order-2-sextion-2-header-3"></div>
                        <div className="purchase-order-2-sextion-2-header-4"></div>
                        <div className="purchase-order-2-sextion-2-header-5"></div>
                        <div
                          className="purchase-order-2-sextion-2-header-9"
                          style={{ fontWeight: "bold" }}
                        ></div>
                      </div>
                    </div>

                    <div className="purchase-order-3">
                      <div className="purchase-order-3-section-1"></div>
                      <div className="purchase-order-3-section-2">
                        <span style={{ fontWeight: "bold" }}></span>
                      </div>
                      <div className="purchase-order-3-section-3"></div>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* <Row className="form-group">
                <Col>
                  <Button
                    size="medium"
                    color="success"
                    fullWidth
                    // className="float-center"
                    // variant="outlined"
                    variant="contained"
                  >
                    Next
                  </Button>
                </Col>
              </Row> */}
            </Form>
          );
        }}
      </Formik>
    </ReportContext.Provider>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    property: state.property,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getPropertiesPage: (data) => dispatch(getPropertiesPage(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Report1);
