
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
import ReportCustomTextField from "../../../../../components/MuiComponents/ReportCustomTextField";
import QrCodeGeoTag from "./QrCodeGeoTag";
import CompleteButton from "./CompleteButton";
import CompleteBtnLevels from "./CompleteBtnLevels";
import { getdropdownDetailsPage } from "../../../../../Redux/Creators/DropdownDetailsCreators";
import Bottom from "./Bottom";
export const ReportContext = React.createContext();

function UtakarshVashi(props) {
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

  // console.log(ReportCustomTextField.formProps)
  return (
    <ReportContext.Provider value={{ print }}>
      <div>
        <div className="d-flex justify-content-end">
          {/* <Button
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
          </Button> */}
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
            // prospect_no: props?.property?.property?.prospect_no,
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

                
                   <div id="htmlToPdf2" className={print ? "f-10" : "f-14"}> 
                  <div  style={{"color":"black"}} className={print ? "f-10 font-family" : "f-14 font-family"}>
                    <div className="logo">
                      <img
                        src={Logo}
                        alt="Logo"
                        className="logo-img"
                        width="100%"
                      />
                    </div>
                    <div className=" 1-page text-center pdf-h-w">
                     {/* <h6 className=" p-1 m-0 test">
                        {" "} 
                        Technical Report Format{" "}
                      </h6> */}
<div className='container'>
<div className='row'>
    <div className="col-md-12 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <b className='mb-0' >Valuation Report Format</b>
    </div>
</div>
<div className="row">
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Application Details</p>
    </div>
    <div className="col-md-9 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
    <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Location Details</p>
    </div>
    <div className="col-md-9 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
    <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Case Reference Number</p>
    </div>
    <div className="col-md-9 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
    <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">File Ref NO. / LAN No.</p>
    </div>
    <div className="col-md-9 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
    <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Date of Report</p>
    </div>
    <div className="col-md-9 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
    <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Loan Type</p>
    </div>
    <div className="col-md-9 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
    <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Name of Applicant</p>
    </div>
    <div className="col-md-9 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
    <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Contact Persons/ Nos</p>
    </div>
    <div className="col-md-9 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
    <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Name of Property Owner</p>
    </div>
    <div className="col-md-9 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
    <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Property Area</p>
    </div>
    <div className="col-md-9 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
    <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Property Holding Type</p>
    </div>
    <div className="col-md-9 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
    <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Property Usage</p>
    </div>
    <div className="col-md-9 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
    <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Area Authorised as per TCP</p>
    </div>
    <div className="col-md-9 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
    <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md">
        <div className="row">
              <div className="col-md-3  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                   <p className="mb-0 text-left"><br></br>Address of Property</p> 
              </div>
              <div className="col-md">
                  <div className="row">
                      <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <p className="mb-0 text-left">As per firing:</p>
                      </div>
                      <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                       </div>
                  </div>
                  <div className="row">
                      <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <p className="mb-0 text-left">On Inspection: (Postal) –</p>
                      </div>
                      <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                       </div>
                  </div>
                  <div className="row">
                      <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <p className="mb-0 text-left">As per Docs. (Sanction Plan & Legal Docs) –</p>
                      </div>
                      <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                       </div>
                  </div>
              </div>
        </div>
    </div>
</div>
<div className="row">
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Person Met/ Nos.P</p>
    </div>
    <div className="col-md-9 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
    <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Address Matching</p>
    </div>
    <div className="col-md-9 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
    <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">

    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Landmark</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
    <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Zone as per City</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
    <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    
</div>
<div className="row">
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Location of Plot / Property</p>
    </div>
    <div className="col-md-9 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
    <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md">
        <div className="row">
              <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                   <p className="mb-0 text-left">Site Boundaries</p> 
              </div>
              <div className="col-md">
                  <div className="row">
                      <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <p className="mb-0 text-left">Site Boundaries (Actual as verified <br></br> at time of site visit.)</p>
                      </div>
                      <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                       </div>
                  </div>
                  <div className="row">
                      <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <p className="mb-0 text-left">North :Parul Building</p>
                      </div>
                      <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                       </div>
                  </div>
                  <div className="row">
                      <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <p className="mb-0 text-left">East :Bhart Niwas Building</p>
                      </div>
                      <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                       </div>
                  </div>
                  <div className="row">
                      <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <p className="mb-0 text-left">West :Row House</p>
                      </div>
                      <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                       </div>
                  </div>
                  <div className="row">
                      <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <p className="mb-0 text-left">South :Road</p>
                      </div>
                      <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                       </div>
                  </div>
              </div>
        </div>
    </div>
</div>
<div className="row">

    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Neighborhood Type</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
    <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Marketability</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
    <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    
</div>
<div className="row">
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Site Boundaries tallied with Boundaries in Title Deed provided by Bank.</p>
    </div>
    <div className="col-md-9 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
     <div className="col-md">
        <div className="row">
            <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                  <p className="mb-0 text-left">Accessibility</p>
            </div>
            <div className="col-md">
                <div className="row">
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <p className="mb-0 text-left">Connectivity</p>
                    </div>
                    <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <p className="mb-0 text-left">Within Municipal Limits</p>
                    </div>
                    <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                        <p className="mb-0 text-left">Site Access</p>
                    </div>
                    <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                        <p className="mb-0 text-left">Within Municipal Limits</p>
                    </div>
                    <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                </div>
            </div>
        </div>
     </div>
</div>
<div className="row">
     <div className="col-md">
        <div className="row">
            <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                  <p className="mb-0 text-left">Property Identified thru</p>
            </div>
            <div className="col-md">
                <div className="row">
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <p className="mb-0 text-left">Site/ Plot demarcation</p>
                    </div>
                    <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <p className="mb-0 text-left">Neighbours inquiry</p>
                    </div>
                    <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                </div>
            </div>
        </div>
     </div>
</div>
<div className='row'>
    <div className="col-md-12 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <b className='mb-0' >Document Details</b>
    </div>
</div>
<div className="row">
     <div className="col-md">
        <div className="row">
            <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                  <p className="mb-0 text-left">Municipal Details</p>
            </div>
            <div className="col-md">
                
                <div className="row">
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
                         <p className="mb-0 text-left">Sanction plan provided</p>
                    </div>
                    <div className="col-md" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
                         <p className="mb-0 text-left">Date of Sanction</p>
                    </div>
                    <div className="col-md" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                </div>
        
                <div className="row">
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
                         <p className="mb-0 text-left">Sanction/ Permit No</p>
                    </div>
                    <div className="col-md" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
                         <p className="mb-0 text-left">Valid Till</p>
                    </div>
                    <div className="col-md" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
                         <p className="mb-0 text-left">No. of Floors sanctioned</p>
                    </div>
                    <div className="col-md" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                </div>
            </div>
        </div>
     </div>
</div>
<div className="row">
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Sanctioned Areas -</p>
    </div>
    <div className="col-md-9 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
    <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Sanctioning Authority -</p>
    </div>
    <div className="col-md-9 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
    <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Municipal / DA Compliance (Compliance to maximum permissible area)</p>
    </div>
    <div className="col-md-9 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
    <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Whether construction is as per the Local By- Laws, In case of Sanction Plan is not available</p>
    </div>
    <div className="col-md-9 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
    <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Commencement Certificate Details</p>
    </div>
    <div className="col-md-9 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
    <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Legal Docs</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Legal Docs Provided: - Details of the Legal Docs:-</p>
    </div>
    <div className="col-md-6 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
       <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className='row'>
    <div className="col-md-12 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <b className='mb-0' >Technical Details</b>
    </div>
</div>
<div className="row">
     <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Type of property</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-1 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">No. Of Stories</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Tenement Position</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
     <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Construction Type</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">No. of lifts –</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
     <div className="col-md">
        <div className="row">
            <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                  <p className="mb-0 text-left">Accommodation Details to be mentioneds</p>
            </div>
            <div className="col-md">
                
                <div className="row">
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
                         <p className="mb-0 text-left">B.F. -</p>
                    </div>
                    <div className="col-md" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
                         <p className="mb-0 text-left">Mezz F1 -</p>
                    </div>
                    <div className="col-md" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                </div>
        
                <div className="row">
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
                         <p className="mb-0 text-left">G.F. -</p>
                    </div>
                    <div className="col-md" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
                         <p className="mb-0 text-left">SF:-</p>
                    </div>
                    <div className="col-md" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
                         <p className="mb-0 text-left">F.F. -</p>
                    </div>
                    <div className="col-md" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
                         <p className="mb-0 text-left">Any other Upper floors:-</p>
                    </div>
                    <div className="col-md" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
                         <p className="mb-0 text-left">Floor No in<br></br>case of Flat –</p>
                    </div>
                    <div className="col-md" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
                         <p className="mb-0 text-left">Accommodation of Flat</p>
                    </div>
                    <div className="col-md" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
                         <p className="mb-0 text-left">Is the property has an independent unit & has anindependent access -</p>
                    </div>
                    <div className="col-md-6" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                </div>
               
                
               
            </div>
        </div>
     </div>
</div>
<div className="row">

    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Details of commercial usage if any –</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
    <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Flooring –</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
    <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    
</div>
<div className="row">

    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Door / Window Fittings–</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
    <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Fittings -</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
    <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    
</div>
<div className="row">

    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Completion Status</p>
    </div>
    <div className="col-md-2 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
    <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Current Age of Property</p>
    </div>
    <div className="col-md-2 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
    <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Residual Age</p>
    </div>
    <div className="col-md-2 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    
</div>
<div className='row'>
    <div className="col-md-12 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <b className='mb-0' >Market Value of Plot / Ready House / Resale Flat / Completed Property</b>
    </div>
</div>
<div className="row">

    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Items</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Permissible Area (In sq. Ft.)</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Rate (Per Sq. Ft.)</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Total Value (?)</p>
    </div>
</div>
<div className="row">

    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Construction Component</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
       <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-3 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-3 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
       <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">

    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Depreciation Rate for construction (If any)</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
       <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-3 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-3 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
       <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">

    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Land Component (As per Sale Deed)</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
       <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-3 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-3 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
       <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">

    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Covered Car Parking</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
       <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-3 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-3 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
       <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">

    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Other One Time Cost (e.g One time society charge, Service Tax etc.)</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
       <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-3 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-3 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
       <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">

    <div className="col-md d-flex  align-items-center " style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">NET MORTGAGE VALUE (Permissible Construction Value + Land Value/Share for Bungalow / Row House/Flats + Amenities Cost + Parking + Others – Depreciation Value) (In ?)</p>
    </div>
    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">

    <div className="col-md d-flex  align-items-center " style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Govt. value</p>
    </div>
    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">

    <div className="col-md d-flex  align-items-center " style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Reliazable Value</p>
    </div>
    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">

    <div className="col-md d-flex  align-items-center " style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">DISTRESSED / FORCED VALUE</p>
    </div>
    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">

    <div className="col-md d-flex  align-items-center " style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Valuation Done Earlier with date of Valuation</p>
    </div>
    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">

    <div className="col-md d-flex  align-items-center " style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">In Municipal / Development Authority Demolition List</p>
    </div>
    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">

    <div className="col-md d-flex  align-items-center " style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Is the property in negative area</p>
    </div>
    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">

    <div className="col-md d-flex  align-items-center " style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Any litigation observed on the property</p>
    </div>
    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">

    <div className="col-md d-flex  align-items-center " style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Date</p>
    </div>
    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className='row'>
    <div className='col-md-12' style={{ border: '1px solid black', }}>
          <p className="w-100 text-left" style={{ fontFamily: 'Times New Roman' }}>Remarks :</p>
        <ol style={{ textAlign: 'justify', paddingInlineStart: '30px', margin: '0' }}>
            <li style={{  fontFamily: 'Times New Roman' }}>The property under consideration is 2 BHK Flat located on 6th Floor in Stilt + 8th storied residential building with 1 lift.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>As per site observation access to the building is as per norms and road width is 15 feet approx.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>At the time of visit we have observed that property was Self Occupied (Relative) by Mrs. Praveen Khan since last 8 Years.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>As per society name board owner of the unit is Mr. Farid Kamaluddin Shaikh.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>Registered Agreement made between M/s. HVC Developers AND Mr. Farid Kamaluddin Sheikh Dated 28/08/2014 made available for verification.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>Unit boundaries are not mentioned in available documents hence Please check at your legal end before disbursement.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>We have considered 45% loading on Registered Agreement Carpet area to Derive SBUA to furnish the valuation report.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>The said property is approx within 15 Km from Malad Branch which is to be noted.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>Additional 1 covered car parking of Rs. 1000000/- each is considered as per provided registered agreement.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>We have received Xerox Copies of Registered Agreement Revised CC Sale Plan & Sanction Plan are made available for verification.</li>
        </ol>
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
          {/* <Button
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
          </Button> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(UtakarshVashi);
