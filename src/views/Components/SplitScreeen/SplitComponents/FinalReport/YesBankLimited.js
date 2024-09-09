
import React, { useEffect } from "react";
import { connect } from "react-redux";

import "./Report1.css";
import printJS from "print-js";
import Bottom from "./Bottom";
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
export const ReportContext = React.createContext();

function YesBankLimited(props) {
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
        <strong className='mb-0' >On the request of the Manager of YES Bank Limited, subject property was inspected to assess its value and the details are as furnished below:</strong>
    </div>
</div>

<div className='row'>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <p className='mb-0'>Branch Name</p>
    </div>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <p className='mb-0'>Type of case</p>
    </div>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className='row'>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <p className='mb-0'>Valuer’s Name</p>
    </div>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <p className='mb-0'>Date of visit</p>
    </div>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className='row'>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <p className='mb-0'>Visiting Engg Name</p>
    </div>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <p className='mb-0'>Time of visit</p>
    </div>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className='row'>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0'>Case Ref. No</p>
    </div>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
    </div>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0'>Date of report</p>
    </div>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
    </div>
</div>
<div className='row'>
    <div className='col-md-6 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0'>Person contacted for property inspection with contact details</p>
    </div>
    <div className='col-md-6 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
    </div>
</div>
<div className='row'>
                     <div className="col-md-12 d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
                          {" "}
                         <b>BASIC DETAILS</b> {" "} 
                     </div>
</div>
<div className='row'>
     <div className='col-md-1 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p>1</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0'>Applicants Name</p>
    </div>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
    </div>
    <div className='col-md-2 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0'>Name of Owners</p>
    </div>
    <div className='col-md-4 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
    </div>
</div>
<div className='row'>
     <div className='col-md-1 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p>2</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0'>Type of property</p>
    </div>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0'>Current usage</p>
    </div>
    <div className='col-md-4 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
    </div>
</div>
<div className="row">
    <div className="col-md-1" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
          <p className='mb-0'>3</p>
    </div>
    <div className="col-md-11">
        <div className="row">
              <div className="col-md-2" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                  <p className='mb-0'>Address of property / Site Address</p>
              </div>
              <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
               </div>
        </div>
        <div className="row">
              <div className="col-md-2" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                   <p className='mb-0'>Address as per documents</p>
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
<div className="row">
      <div className='col-md-1 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0'>4</p>
    </div>
    <div className='col-md-5 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0'>Has the valuer done valuation of this property before? If yes, for whom & when.</p>
    </div>
    <div className='col-md-6 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
    </div>
</div>
<div className='row'>
                     <div className="col-md-12  d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
                          {" "}
                         <b className='mb-0'>SURROUNDING AND LOCALITY DETAILS</b> {" "} 
                     </div>
</div>
<div className="row">
   <div className="col-md">
       <div className="row">
            <div className="col-md-1" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                  <p className='mb-0'>5</p>
            </div>
            <div className="col-md-2 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                <p className='mb-0'>Location</p>
            </div>
            <div className="col-md-9">
                <div className="row">
                    <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <p className='mb-0'>Zoning as per Master Plan / Development plan</p>
                    </div>
                    <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                            <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <p className='mb-0'>Class of locality (High / Middle Class / Lower / Negative)</p>
                    </div>
                    <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
                    </div>
                </div>
                <div className="row">
                   <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                        <p className='mb-0'>Site (Developed / under-developed)</p>
                   </div>
                   <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
                   </div>
                </div>
                <div className="row">
                    <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <p className='mb-0 d-flex justify-content-center align-items-center'>Proximity from civic amenities / public transport</p>
                    </div>
                    <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <p className='mb-0'>Nearest Railway Station</p>
                    </div>
                    <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <p className='mb-0'>Nearest Bus Stop</p>
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
     <div className='col-md-1 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0'>6</p>
    </div>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0'>Nearest Landmark</p>
    </div>
    <div className='col-md-8 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                               <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
</div>
<div className="row">
     <div className='col-md-1 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0'>7</p>
    </div>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0'>Distance from City Centre</p>
    </div>
    <div className='col-md-8 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                               <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
</div>
<div className="row">
     <div className='col-md-1 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0'>8</p>
    </div>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0'>Condition and width of approach road: -</p>
    </div>
    <div className='col-md-8 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                               <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
</div>
<div className='row'>
                     <div className="col-md-12"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
                          {" "}
                         <b>PROPERTY DETAILS</b> {" "} 
                     </div>
</div>
<div className="row">
     <div className='col-md-1 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0'>9</p>
    </div>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 d-flex justify-content-center align-items-center'>Brief description of the property</p>
    </div>
    <div className='col-md-8 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                               <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
</div>
<div className="row">
     <div className='col-md-1 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0'>10</p>
    </div>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0'>Internal visit done</p>
    </div>
    <div className='col-md-8 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                               <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
</div>
<div className="row">
  <div className="col-md-1" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
     <p className='mb-0'>11</p>
  </div>
  <div className="col-md-3"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
     <p className='mb-0'>Occupant</p>
  </div>
  <div className="col-md-8">
      <div className="row">
         <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
            <p className='mb-0'>Vacant/Occupied</p>
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
<br></br>
<div className="row">
  <div className="col-md-1" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
     <p className='mb-0'>11</p>
  </div>
  <div className="col-md-3 d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
     <p className='mb-0'>Occupant</p>
  </div>
  <div className="col-md-8">
      <div className="row">
         <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
            <p className='mb-0'>Name of Occupant</p>
         </div>
         <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
             <ReportCustomTextField
              formProps={formProps}
              name="prospect_no"
            />
         </div>
      </div>
      <div className="row">
         <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
             <p className='mb-0'>Relation with applicant</p>
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
<div className="row">
  <div className="col-md-1" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
     <p className='mb-0'>12</p>
  </div>
  <div className="col-md-3 d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
     <p className='mb-0 '>Building details</p>
  </div>
  <div className="col-md-8">
  <div className="row">
         <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
             <p className='mb-0'>Property Demarcated</p>
         </div>
         <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
             <ReportCustomTextField
              formProps={formProps}
              name="prospect_no"
            />
         </div>
      </div>
      <div className="row">
         <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
             <p className='mb-0'>Type of structure</p>
         </div>
         <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
            <ReportCustomTextField
              formProps={formProps}
              name="prospect_no"
            />
         </div>
      </div>
      <div className="row">
         <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
            <p className='mb-0'>Property Identified through</p>
         </div>
         <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
           <ReportCustomTextField
              formProps={formProps}
              name="prospect_no"
            />
         </div>
      </div>
      <div className="row">
         <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
            <p className='mb-0'>Land/Plot Area</p>
         </div>
         <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
            <ReportCustomTextField
              formProps={formProps}
              name="prospect_no"
            />
         </div>
      </div>
      <div className="row">
         <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
            <p className='mb-0'>No of Blocks/Wings</p>
         </div>
         <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
             <ReportCustomTextField
              formProps={formProps}
              name="prospect_no"
            />
         </div>
      </div>
      <div className="row">
         <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
             <p className='mb-0'>No of Units per floor</p>
         </div>
         <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
            <ReportCustomTextField
              formProps={formProps}
              name="prospect_no"
            />
         </div>
      </div>
      <div className="row">
         <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
            <p className='mb-0'>No. of Floors</p>
         </div>
         <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
             <ReportCustomTextField
              formProps={formProps}
              name="prospect_no"
            />
         </div>
      </div>
      <div className="row">
         <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
            <p className='mb-0'>No. of Lifts</p>
         </div>
         <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
             <ReportCustomTextField
              formProps={formProps}
              name="prospect_no"
            />
         </div>
      </div>
      <div className="row">
         <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
            <p className='mb-0'>Amenities</p>
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
<div className="row">
  <div className="col-md-1" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
     <p className='mb-0'>13</p>
  </div>
  <div className="col-md-3 d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
     <p className='mb-0'>Unit details</p>
  </div>
  <div className="col-md-8">
      <div className="row">
         <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
            <p className='mb-0'>Located on Floor No.</p>
         </div>
         <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
             <ReportCustomTextField
              formProps={formProps}
              name="prospect_no"
            />
         </div>
      </div>
      <div className="row">
         <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
            <p className='mb-0'>No. of rooms / Unit configuration</p>
         </div>
         <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
             <ReportCustomTextField
              formProps={formProps}
              name="prospect_no"
            />
         </div>
      </div>
      <div className="row">
         <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
             <p className='mb-0'>Remarks on view from property</p>
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
<div className="row">
  <div className="col-md-1" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
     <p className='mb-0'>14</p>
  </div>
  <div className="col-md-3"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
     <p className='mb-0'>Present condition of the property:</p>
  </div>
  <div className="col-md-8">
      <div className="row">
         <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
            <p className='mb-0'>Exterior</p>
         </div>
         <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
             <ReportCustomTextField
              formProps={formProps}
              name="prospect_no"
            />
         </div>
      </div>
      <div className="row">
         <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
            <p className='mb-0'>Interior</p>
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
<div className="row">
  <div className="col-md-1" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
     <p className='mb-0'>15</p>
  </div>
  <div className="col-md-3"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
     <p className='mb-0'>Age of the property</p>
  </div>
  <div className="col-md-8">
      <div className="row">
         <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
             <ReportCustomTextField
              formProps={formProps}
              name="prospect_no"
            />
         </div>
      
         <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
            <p className='mb-0'>Residual life</p>
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
<div className="row">
  <div className="col-md-1" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
     <p className='mb-0'>16</p>
  </div>
  <div className="col-md">
    
     <div className="row">
           <div className="col-md">
                  <div className="row">
                       <div className="col-md-4"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <p className='mb-0'>Boundaries</p>  
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <p className='mb-0'>North</p>  
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <p className='mb-0'>South</p>  
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <p className='mb-0'>East</p>  
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <p className='mb-0'>West</p>  
                       </div>
                  </div>
                  <div className="row">
                       <div className="col-md-4"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <p className='mb-0'>Actual on site</p>
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                           />
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                       </div>
                  </div>
                  <div className="row">
                       <div className="col-md-4"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                              <p className='mb-0'>As per Title document</p>
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                       </div>
                  </div>
                  <div className="row">
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                            <p className='mb-0'>Boundaries matching with Sale Deed (Yes / No)</p>
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
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
                     <div className="col-md-12"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman' }}>
                          {" "}
                         <b>SANCTION PLAN APPROVAL & OTHER DOCUMENTS DETAILS</b> {" "} 
                     </div>
</div>
<div className="row">
    <div className="col-md-1" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
          <p className='mb-0'>17</p> 
    </div>
    <div className="col-md-3" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
          <p className='mb-0'>Sanctioned plans details</p> 
    </div>
    <div className="col-md-8" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
             <ReportCustomTextField
                formProps={formProps}
                 name="prospect_no"
              />
    </div>
</div>
<div className="row">
    <div className="col-md-1" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
          <p className='mb-0'>18</p> 
    </div>
    <div className="col-md-3" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
          <p className='mb-0'>Construction permission / Commencement Certificate / OC / BCC</p> 
    </div>
    <div className="col-md-8" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
             <ReportCustomTextField
                formProps={formProps}
                 name="prospect_no"
              />
    </div>
</div>
<div className="row">
    <div className="col-md-1" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
          <p className='mb-0'>19</p> 
    </div>
    <div className="col-md-3" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
          <p className='mb-0'>Ownership type</p> 
    </div>
    <div className="col-md-8" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
             <ReportCustomTextField
                formProps={formProps}
                 name="prospect_no"
              />
    </div>
</div>
<div className="row">
    <div className="col-md-1" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
          <p className='mb-0'>20</p> 
    </div>
    <div className="col-md-3" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
          <p className='mb-0'>Property documents verified (Any others)</p> 
    </div>
    <div className="col-md-8" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
             <ReportCustomTextField
                formProps={formProps}
                 name="prospect_no"
              />
    </div>
</div>
<div className="row">
    <div className="col-md-1" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
          <p className='mb-0'>21</p> 
    </div>
    <div className="col-md-3" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
          <p className='mb-0'>Is the property within Municipal Limits</p> 
    </div>
    <div className="col-md-8" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
             <ReportCustomTextField
                formProps={formProps}
                 name="prospect_no"
              />
    </div>
</div>
<div className="row">
    <div className="col-md-1" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
          <p className='mb-0'>22</p> 
    </div>
    <div className="col-md-3" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
          <p className='mb-0'>Permissible usage as per sanctioned/approved plan</p> 
    </div>
    <div className="col-md-8" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
             <ReportCustomTextField
                formProps={formProps}
                 name="prospect_no"
              />
    </div>
</div>
<div className="row">
  <div className="col-md-1" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
     <p className='mb-0'>23</p>
  </div>
  <div className="col-md-11">
    
     <div className="row">
           <div className="col-md">
                  <div className="row">
                       <div className="col-md-3 d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <b className='mb-0'>Setbacks</b>  
                       </div>
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <b className='mb-0'>As per plan</b>  
                       </div>
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <b className='mb-0'>As per Bye- Laws</b>  
                       </div>
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <b className='mb-0'>Actual at site</b>  
                       </div>
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <b className='mb-0' >Extra Coverage deviation as per Plan</b>  
                       </div>
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <b className='mb-0'>Extra Coverage deviation as per bye-laws</b>  
                       </div>
                  </div>
                  <div className="row">
                       <div className="col-md-3"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <p className='mb-0'>Front</p>
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                           />
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                       </div>
                  </div>
                  <div className="row">
                       <div className="col-md-3"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <p className='mb-0'>Side 1 (Right)</p>
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                           />
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                       </div>
                  </div>
                  <div className="row">
                       <div className="col-md-3"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <p className='mb-0'>Side2 (Left)</p>
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                           />
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                       </div>
                  </div>
                  <div className="row">
                       <div className="col-md-3"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <p className='mb-0'>Rear</p>
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                           />
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                       </div>
                  </div>
        <div className="row">
           <div className="col-md">
                  <div className="row">
                       <div className="col-md-3"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                            <p className='mb-0'>Deviations if any</p>
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
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
  </div>
</div>
<br></br>
<br></br>
<br></br>
<div className="row">
    <div className="col-md-1" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
          <p className='mb-0'>24</p> 
    </div>
    <div className="col-md-3" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
          <p className='mb-0'>Demolition Risk</p> 
    </div>
    <div className="col-md-8" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
             <ReportCustomTextField
                formProps={formProps}
                 name="prospect_no"
              />
    </div>
</div>
<div className="row">
    <div className="col-md-1" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
          <p className='mb-0'>25</p> 
    </div>
    <div className="col-md-11 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
          <b className='mb-0'>VALUATION</b> 
    </div>
</div>
<div className="row">
  <div className="col-md-1" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
     <p className='mb-0'>

     </p>
  </div>
  <div className="col-md">
    
     <div className="row">
           <div className="col-md">
                  <div className="row">
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <b>Area Details</b>  
                       </div>
                  </div>
                  <div className="row">
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <p className='mb-0'>As per Agreement / Sale Deed</p>
                       </div>
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                           />
                       </div>
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                            <p className='mb-0'>Sft</p>
                       </div>
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                            <p className='mb-0'>Carpet / BUA / SBUA</p>
                       </div>
                  </div>
                  <div className="row">
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                              <p className='mb-0'>As per Plan</p>
                       </div>
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                       </div>
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                            <p className='mb-0'>Sft</p>
                       </div>
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <p className='mb-0'>Carpet / BUA</p>
                       </div>
                  </div>
                  <div className="row">
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                              <p className='mb-0'>As per Measurement</p>
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                       </div>
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <p className='mb-0'>Sft</p>
                       </div>
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <p className='mb-0'>Carpet / BUA</p>
                       </div>
                  </div>
           </div>
     </div>
 
     
  </div>
</div>
<div className="row">
  <div className="col-md-1" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
     <p className='mb-0'>A1</p>
  </div>
  <div className="col-md">
    
     <div className="row">
           <div className="col-md">
                   <div className="row">
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <b className='mb-0'>Land + Construction Method (Applicable for Villa / Bunglow / Row House / Industrial)</b>  
                       </div>
                   </div>
                  <div className="row">
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <b className='mb-0'>Description</b>  
                       </div>
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <b className='mb-0'>Area in Sft</b>  
                       </div>
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <b className='mb-0'>Rate per Sft</b>  
                       </div>
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <b className='mb-0'>Realizable Value in Rs.</b>  
                       </div>
                  </div>
                  <div className="row">
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <p className='mb-0'>Land area</p>
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                           />
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                       </div>
                  </div>
                  <div className="row">
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                              <p className='mb-0'>Construction area(Const rate as per present condition of the property)</p>
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                       </div>
                  </div>
                  <div className="row">
                       <div className="col-md-9"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                            <b style={{marginTop:'10px'}}>Deviations if any</b>
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
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
  <div className="col-md-1" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
     <p className='mb-0'>A2</p>
  </div>
  <div className="col-md">
    
     <div className="row">
           <div className="col-md">
                   <div className="row">
                       <div className="col-md "  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <b>Comparison Method</b>  
                       </div>
                   </div>
                  <div className="row">
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <p className='mb-0'>Carpet Area</p>  
                       </div>
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />  
                       </div>
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <p className='mb-0'>Loading in %</p>  
                       </div>
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            /> 
                       </div>
                  </div>
                  <div className="row">
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <p className='mb-0'>Saleable area</p>
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                           />
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <p className='mb-0'>Rate per Sft</p>
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                       </div>
                  </div>
                  <div className="row">
                       <div className="col-md-9"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                            <b className='mb-0'>Realizable Value of property as per comparison method (A2)</b>
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
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
   <div className="col-md-1" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0'>B</p>
   </div>
   <div className="col-md-11 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <b className='mb-0'>Value of Amenities if applicable</b>
   </div>
</div>
<div className="row">
  <div className="col-md-1" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
     <p className='mb-0'>a)</p>
  </div>
  <div className="col-md">
    
     <div className="row">
           <div className="col-md">
                  <div className="row">
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <p className='mb-0'>No of car parks</p>  
                       </div>
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <p className='mb-0'>Rate per car parking</p> 
                       </div>
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <p className='mb-0'>Value of car park</p>  
                       </div>
                  </div>
                  <div className="row">
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <p className='mb-0'>1 Car ParkingNos</p>
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
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
  <div className="col-md-1" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
     <p className='mb-0'>b)</p>
  </div>
  <div className="col-md">
    
     <div className="row">
           <div className="col-md">
                  <div className="row">
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <p className='mb-0'>Other charges in Rs. (Lump Sum) </p>  
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>  
                  </div>
                  <div className="row">
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <b className='mb-0'>Total Amenities charges (B) </b>  
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
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
  <div className="col-md-1" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
     <p className='mb-0'></p>
  </div>
  <div className="col-md">
    
     <div className="row">
           <div className="col-md">
                  <div className="row">
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <b className='mb-0'>Total Realizable Value of the property: - A1 or (A2 + B)</b>  
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>  
                  </div>
                  <div className="row">
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <p className='mb-0'>Forced Sale Value / Distress Value </p>  
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>  
                  </div>
                  <div className="row">
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <p className='mb-0'>Ready Reckoner rate / Circle rate </p>  
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>  
                  </div>
                  <div className="row">
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <p className='mb-0'>Approx. Rentals in case of 100% complete property</p>  
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>  
                  </div>
                  <div className="row">
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <p className='mb-0'>Insurance value / Re-construction cost</p>  
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
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
    <div className="col-md-1" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
          <p className='mb-0'>26</p> 
    </div>
    <div className="col-md-11 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
          <b className='mb-0'>Market Comparable</b> 
    </div>
</div>
<div className="row">
  <div className="col-md-1" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
     <p className='mb-0'>a)</p>
  </div>
  <div className="col-md">
    
     <div className="row">
           <div className="col-md">
                  <div className="row">
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <p className='mb-0'>Property Details</p>  
                       </div>
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          /> 
                       </div>
                  </div>
                  <div className="row">
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <p className='mb-0'>Value</p>
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <p className='mb-0'>Date of Transaction</p>
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
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
  <div className="col-md-1" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
     <p className='mb-0'>b)</p>
  </div>
  <div className="col-md">
    
     <div className="row">
           <div className="col-md">
                  <div className="row">
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <p className='mb-0'>Property Details</p>  
                       </div>
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          /> 
                       </div>
                  </div>
                  <div className="row">
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <p className='mb-0'>Value</p>
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <p className='mb-0'>Date of Transaction</p>
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
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
  <div className="col-md-1" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
     <p className='mb-0'>27</p>
  </div>
  <div className="col-md">
    
     <div className="row">
           <div className="col-md">
                 <div className="row">
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <b>Stage of Construction</b>  
                       </div>
                 </div>
                  <div className="row">
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <p className='mb-0'>Details of stage of construction</p>  
                       </div>
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          /> 
                       </div>
                  </div>
                  <div className="row">
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <p className='mb-0'>%age Progress </p>
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <p className='mb-0'>%age Recommended</p>
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
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
  <div className="col-md-1" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
     <p className='mb-0'>28</p>
  </div>
  <div className="col-md">
    
     <div className="row">
           <div className="col-md">
                 <div className="row">
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <b className='mb-0'>Remarks</b>  
                       </div>
                 </div>
                  <div className="row">
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <p className='mb-0'>Negative Remarks</p>  
                       </div>
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <p className='mb-0'>Positive Remarks</p>  
                       </div>
                  </div>
           </div>
     </div>
  </div>
</div>
<br></br>
<br></br>
<div className="row">
  <div className="col-md-1" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
     <p className='mb-0'></p>
  </div>
  <div className="col-md">
    
     <div className="row">
           <div className="col-md">
           <div className='row'>
    <div className='col-md-12' style={{ border: '1px solid black'}}>
        <ol start={'1'} style={{ textAlign: 'justify', paddingInlineStart: '30px', margin: '10px' }}>
            <li style={{fontFamily: 'Times New Roman' }}>The property under consideration is 2 BHK Flat Located on 38th Floor in Ground + 7 Podiums + 46th storied residential building with 6 Lifts.</li>
            <li style={{fontFamily: 'Times New Roman' }}>As per site observation access to the building is as per norms and road width is 15 feet approx.</li>
            <li style={{fontFamily: 'Times New Roman' }}>We have received only Xerox copy of Registered Development Agreement CC Sanction Plan & Part BCC are made available for verification. At the time of visit we have observed that property was Self occupied by friend of customer ie. M/s. Millennium English School since last 6 months.</li>
            <li style={{fontFamily: 'Times New Roman' }}>Registered Agreement made between M/s. Runwal Developers Private Limited AND Mr. Anandmaya Shantanu Dhorde & Mrr. Shantani Sopan Dhorde & Mrs. Charusheela Shantanu Dhorde Dated 29/03/2024 made available for verification (Index II Ref No. 6542/2024).</li>
            <li style={{fontFamily: 'Times New Roman' }}>Unit boundaries are not mentioned in available documents hence Please check at your legal end before disbursement.</li>
            <li style={{fontFamily: 'Times New Roman' }}>Additional 1 covered car parking value of Rs 1500000/- is to be considered in the above valuation as mentioned in the provided Registered Agreement</li>
            <li style={{fontFamily: 'Times New Roman' }}>As per site observation RCC + Brickwork + Internal Plaster + External Plaster is completed and Flooring is completed upto 44th Floor and remaining work is in progress</li>
            <li style={{fontFamily: 'Times New Roman' }}>We have considered 50% Loading on Carpet Area as per Sanctioned Plan to derive SUBA to furnish the report.</li>
            <li style={{fontFamily: 'Times New Roman' }}>As per RERA Project name is Nirvana Part I & Project Number is P51900010100 for the building. Project Start date is 24/08/2017 & end date is 30/12/2024 as per RERA record. As per RERA structure is proposed upto Ground + 7 Podiums + 46th Floors & Plans are approved upto Ground + 7 Podiums + 46th Floors. During site visit we have observed that pace of the project is acceptable. Pls note current stage of construction is 80% & recommendation stage is 90%. Pls note we have calculated construction stage recommendation stage according to proposed structure.</li>
        </ol>
    </div>
</div>
           </div>
     </div>
  </div>
</div>
<div className="row">
  <div className="col-md-1" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
     <p className='mb-0'>29</p>
  </div>
  <div className="col-md">
    
     <div className="row">
           <div className="col-md">
                  <div className="row">
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <p className='mb-0'>Latitude: </p>
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <p className='mb-0'>Longitude:</p>
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
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
           <div className="col-md">
                  <div className="row">
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <b  className='mb-0'>Location Sketch:</b>
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          
                       </div>
                  </div>
           </div>
     </div>
  </div>
</div>
<div className="row">
  <div className="col-md">
    
     <div className="row">
           <div className="col-md">
                  <div className="row">
                       <div className="col-md  d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <b className='mb-0'>Property Sketch:</b>
                       </div>
                       <div className="col-md  d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <b className='mb-0'>External Visit</b>
                       </div>
                  </div>
           </div>
     </div>
  </div>
</div>
<div className="row">
  <div className="col-md-1" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
    <p className='mb-0'></p>
  </div>
  <div className="col-md">

    <div className="row">
      <div className="col-md">
        <div className='row'>
          <div className='col-md-12' style={{ border: '1px solid black' }}>
            <p className="w-100 text-left p-1 pl-2" style={{ fontFamily: 'Times New Roman' }}>Declaration:-</p>
            <ul style={{ textAlign: 'justify', paddingInlineStart: '30px', margin: '10px' }}>
              <li style={{ fontFamily: 'Times New Roman' }}>Our representative has visited this site. I/We have not verified the title deeds of the properties with the records of the registrar's office as this is beyond the agreed scope of work. Assumptions are made to the best of our knowledge and belief. Reliance is based on the information furnished to us by the identifier AND/OR client.</li>
              <li style={{ fontFamily: 'Times New Roman' }}>The valuer shall not be responsible for the matters of legal nature that affects the value and opinion expressed by us</li>
              <li style={{ fontFamily: 'Times New Roman' }}>where a sketched plan is attached to this report,it does not purport to represent accurate architectural plans. Sketch plans and photographs are provided as general illustrations only. Documents furnished to us are returned to the client along with the report. We cannot preserve them.</li>
              <li style={{ fontFamily: 'Times New Roman' }}>Fair market value indicated in the report is an opinion of the value prevailing on the date of the said report and is based on market feedback on values of similar properties. Client is free to obtain other independent opinions on the same. Fair, market value of such properties / localities may increase or decrease, depending on the future market conditions & scenarios. value varies with the purpose & date.This report is not to be referred if the purpose is different other than mentioned. No structural survey was conducted by us as it is not in our scope of work</li>
              <li style={{ fontFamily: 'Times New Roman' }}>We hereby declare, “The information furnished above is true and correct to the best of our knowledge and belief. We have no direct or indirect interest in the assets valued.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div className="row">
  <div className="col-md-1" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
    <p className='mb-0'></p>
  </div>
  <div className="col-md">

    <div className="row">
      <div className="col-md">
        <div className='row'>
          <div className='col-md-12' style={{ border: '1px solid black' }}>
            <p className="w-100 text-left p-1 pl-2" style={{ fontFamily: 'Times New Roman' }}>Sign & Stamp</p>
           
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div className="row">
  <div className="col-md-1" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
     <p className='mb-0'></p>
  </div>
  <div className="col-md">
    
     <div className="row">
           <div className="col-md">
                  <div className="row">
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <p className='mb-0'>Date: </p>
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <p className='mb-0'>Place:</p>
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
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

export default connect(mapStateToProps, mapDispatchToProps)(YesBankLimited);
