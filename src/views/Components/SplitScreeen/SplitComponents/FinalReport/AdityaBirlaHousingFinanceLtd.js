
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

function AdityaBirlaHousingFinanceLtd(props) {
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
                 
<div className='container'>
        <div className='row justify-content-center align-items-center'>
                   <div className='col-md-12 text-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                       <b>VALUATION REPORT FOR ADITYA BIRLA HOUSING FINANCE LTD</b>
                   </div>
        </div>
                     <div className='row'>

                           <div className='col-md-2' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                               <b>Deal Number</b>
                           </div>
                           <div className='col-md-* text-center' style={{width:'4%',border:'1px solid black'}}>:</div>
                            <div className='col-md' style={{border:'1px solid black'}}>
                                              <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                            </div>
                           <div className='col-md-2' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                               <b>Asset id</b>
                           </div>
                           <div className='col-md-* text-center' style={{width:'4%',border:'1px solid black'}}>:</div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                              <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                     </div>

                    <div className='row'>

                           <div className='col-md-2' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                               <b>Branch Name</b>
                           </div>
                           <div className='col-md-* text-center' style={{width:'4%',border:'1px solid black'}}>:</div>
                            <div className='col-md' style={{border:'1px solid black'}}>
                                                <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                            </div>
                           <div className='col-md-2' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                               <b>Type of Case</b>
                           </div>
                           <div className='col-md-* text-center' style={{width:'4%',border:'1px solid black'}}>:</div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                                <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                     </div>

                    <div className='row'>

                           <div className='col-md-2' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                               <b>Valuer Name</b>
                           </div>
                           <div className='col-md-* text-center' style={{width:'4%',border:'1px solid black'}}>:</div>
                            <div className='col-md' style={{border:'1px solid black'}}>
                                              <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                            </div>
                           <div className='col-md-2' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                               <b>Product Type</b>
                           </div>
                           <div className='col-md-* text-center' style={{width:'4%',border:'1px solid black'}}>:</div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                     </div>

                      <div className='row'>

                           <div className='col-md-2' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                               <b>Valuer Ref No</b>
                           </div>
                           <div className='col-md-* text-center' style={{width:'4%',border:'1px solid black'}}>:</div>
                            <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                            </div>
                           <div className='col-md-2' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                               <b>Date of Visit</b>
                           </div>
                           <div className='col-md-* text-center' style={{width:'4%',border:'1px solid black'}}>:</div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                     </div>

                       <div className='row'>

                           <div className='col-md-2' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                               <b>Valuer Feedback</b>
                           </div>
                           <div className='col-md-* text-center' style={{width:'4%',border:'1px solid black'}}>:</div>
                            <div className='col-md' style={{border:'1px solid black'}}>
                                              <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                            </div>
                           <div className='col-md-2' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                               <b>Date of Report</b>
                           </div>
                           <div className='col-md-* text-center' style={{width:'4%',border:'1px solid black'}}>:</div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                     </div>

                    <div className='row'>

                           <div className='col-md-2  align-items-center justify-content-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                               <b>Contacted <br></br> Person</b>
                           </div>
                            <div className='col-md' style={{border:'1px solid black'}}>
                                              <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                            </div>
                           <div className='col-md-2 align-items-center justify-content-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                               <b>Relation with Customer</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                           <div className='col-md-2 align-items-center justify-content-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                               <b>Contact <br></br>No</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                     </div>

                     <div className='row'>

                           <div className='col-md-2' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                               <b>BASIC <br></br>DETAILS</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                              <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                     </div>

                     
                     <div className='row'>
                           <div className='col-md-* text-center ' style={{width:'4%',border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                 <b>1</b>
                           </div>
                           <div className='col-md-2 justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                               <b>Applicant <br></br>Name(s)</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                     </div>

                     <div className='row'>
                           <div className='col-md-* text-center ' style={{width:'4%',border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                 <b>2</b>
                           </div>
                           <div className='col-md-2 justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                               <b>Originally type of property</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                                <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                           <div className='col-md-2 justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                               <b>Current<br></br> Usage</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                                <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                     </div>
                <div className="row">
                        <div className="col-md">
                               <div className="row">
                                   <div className="col-md-* text-center "  style={{width:'4%',border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                       <b>3</b>
                                   </div>
                                   <div className="col-md">
                                         <div className="row">
                                              <div className="col-md-* justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'17.30%'}}>
                                                  <b>Address as per <br></br>request</b>
                                              </div>
                                              <div className="col-md"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                              <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                                              </div>
                                         </div>
                                         <div className="row">
                                              <div className="col-md-* justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'17.30%'}}>
                                                  <b>Address as per document</b>
                                              </div>
                                              <div className="col-md"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                              <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                                              </div>
                                         </div>
                                         <div className="row">
                                              <div className="col-md-* justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'17.30%'}}>
                                                  <b>Address as per Site</b>
                                              </div>
                                              <div className="col-md"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                              <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                                              </div>
                                         </div>
                                         <div className="row">
                                              <div className="col-md-* justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'17.30%'}}>
                                                  <b>Project/Colony/<br></br>Layout Name</b>
                                              </div>
                                              <div className="col-md"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                              <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                                              </div>
                                         </div>
                                         <div className="row">
                                              <div className="col-md-* justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'17.30%'}}>
                                                  <b>Unit/Flat no/ Bungalow/Plot/House no.</b>
                                              </div>
                                              <div className="col-md"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                                <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                                              </div>
                                              <div className="col-md-2 justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                                  <b><br></br>Floor No</b>
                                              </div>
                                              <div className="col-md"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                                <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                                              </div>
                                         </div>
                                         <div className="row">
                                              <div className="col-md-* justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'17.30%'}}>
                                                  <b>Building Name</b>
                                              </div>
                                              <div className="col-md"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                                <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                                              </div>
                                              <div className="col-md-2 justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                                  <b>Wing Name</b>
                                              </div>
                                              <div className="col-md"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                                <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                                              </div>
                                         </div>
                                         <div className="row">
                                              <div className="col-md-* justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'17.30%'}}>
                                                  <b>S.No/G.No/<br></br>Khasra No</b>
                                              </div>
                                              <div className="col-md"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                              <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                                              </div>
                                         </div>
                                         <div className="row">
                                              <div className="col-md-* justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'17.30%'}}>
                                                  <b>Close Vicinity/Landmark</b>
                                              </div>
                                              <div className="col-md"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                              <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                                              </div>
                                         </div>
                                         <div className="row">
                                              <div className="col-md-* justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'17.30%'}}>
                                                  <b>Street Name</b>
                                              </div>
                                              <div className="col-md"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                                <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                                              </div>
                                              <div className="col-md-2 justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                                  <b>Village Name</b>
                                              </div>
                                              <div className="col-md"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                                <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                                              </div>
                                         </div>
                                         <div className="row">
                                              <div className="col-md-* justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'17.30%'}}>
                                                  <b>City</b>
                                              </div>
                                              <div className="col-md"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                                <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                                              </div>
                                              <div className="col-md-2 justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                                  <b>State</b>
                                              </div>
                                              <div className="col-md"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                                <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                                              </div>
                                         </div>
                                         <div className="row">
                                              <div className="col-md-* justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'17.30%'}}>
                                                  <b>Main Locality of the Property</b>
                                              </div>
                                              <div className="col-md"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                                <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                                              </div>
                                              <div className="col-md-2 justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                                  <b>Sub <br></br>Locality</b>
                                              </div>
                                              <div className="col-md"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                                <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                                              </div>
                                         </div>
                                         <div className="row">
                                              <div className="col-md-* justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'17.30%'}}>
                                                  <b>Pin code of the Property</b>
                                              </div>
                                              <div className="col-md"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                              <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                                              </div>
                                         </div>
                                         <div className="row">
                                              <div className="col-md-* justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'17.30%'}}>
                                                  <b>Latitude</b>
                                              </div>
                                              <div className="col-md"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                                <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                                              </div>
                                              <div className="col-md-2 justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                                  <b>Longitude</b>
                                              </div>
                                              <div className="col-md"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
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
                           <div className='col-md-* text-center ' style={{width:'4%',border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                 <b>4</b>
                           </div>
                           <div className='col-md-2 justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                               <b>Has the valuator valued this property before, If yes, when, for whom</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                     </div>                   
                 
                     <div className='row'>

                           <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                               <b>SURROUNDING & LOCALITY DETAILS</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                     </div>

                     <div className="row">
                        <div className="col-md">
                               <div className="row">
                                   <div className="col-md-* text-center "  style={{width:'4%',border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                       <b>5</b>
                                   </div>
                                   <div className='col-md-2 justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                      <b>Location</b>
                                   </div>
                                   <div className="col-md">
                                         <div className="row">
                                              <div className="col-md-* justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'17.30%'}}>
                                                  <b>Type (Comm, Res, Ind, Mix)</b>
                                              </div>
                                              <div className="col-md"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                              <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                                              </div>
                                         </div>
                                         <div className="row">
                                              <div className="col-md-* justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'17.30%'}}>
                                                  <b>Locality (Low, Medium, Posh)</b>
                                              </div>
                                              <div className="col-md"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                              <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                                              </div>
                                         </div>
                                         <div className="row">
                                              <div className="col-md-* justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'17.30%'}}>
                                                  <b><br></br>Site is (Dev, Under Dev, Developing)</b>
                                              </div>
                                              <div className="col-md"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                              <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                                              </div>
                                         </div>
                                         <div className="row">
                                              <div className="col-md-* justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'17.30%'}}>
                                                  <b>Proximity to civic amenities/public transport</b>
                                              </div>
                                              <div className="col-md"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                              <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                                              </div>
                                         </div>
                                         <div className="row">
                                              <div className="col-md-* justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'17.30%'}}>
                                                  <b>Railway Station</b>
                                              </div>
                                              <div className="col-md"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                              <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                                              </div>
                                         </div>
                                         <div className="row">
                                              <div className="col-md-* justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'17.30%'}}>
                                                  <b>Bus Stop</b>
                                              </div>
                                              <div className="col-md"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
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
                           <div className='col-md-* text-center ' style={{width:'4%',border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                 <b>6</b>
                           </div>
                           <div className='col-md-2 justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                               <b>Distance from City Centre</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                </div>     
                <div className='row'>
                           <div className='col-md-* text-center ' style={{width:'4%',border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                 <b>7</b>
                           </div>
                           <div className='col-md-2 justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                               <b>Nature of approach Road</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                </div> 
                <div className='row'>
                           <div className='col-md-* text-center ' style={{width:'4%',border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                 <b>8</b>
                           </div>
                           <div className='col-md-2 justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                               <b>Approach Road <br></br>width</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                           <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                               <b>Feet</b>
                           </div>
                </div>   
                <div className='row'>
                           <div className='col-md-* text-center ' style={{width:'4%',border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                 <b>9</b>
                           </div>
                           <div className='col-md-2 justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                               <b>Approach to the property as per Site</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                         
                </div> 
                <div className='row'>
                           <div className='col-md-* text-center ' style={{width:'4%',border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                 <b>10</b>
                           </div>
                           <div className='col-md-2 justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                               <b>Approach to the property as per Docs</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                         
                </div> 
                <div className='row'>
                           <div className='col-md-* text-center ' style={{width:'4%',border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                 <b>11</b>
                           </div>
                           <div className='col-md-2 justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                               <b>Any observation which affects the security</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                         
                </div>
                <div className='row'>

<div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
    <b>PROPERTY DETAILS</b>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
</div>                                  
<div className="row">
                        <div className="col-md">
                               <div className="row">
                                   <div className="col-md-* text-center "  style={{width:'4%',border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                       <b>12</b>
                                   </div>
                                   <div className='col-md-2 justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                      <b>Occupant</b>
                                   </div>
                                   <div className="col-md">
                                         <div className="row">
                                              <div className="col-md-* justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'17.30%'}}>
                                                  <b>Occupied By</b>
                                              </div>
                                              <div className="col-md"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
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
                                   <div className="col-md-* text-center "  style={{width:'4%',border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                       <b>13</b>
                                   </div>
                                   <div className='col-md-2 justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                      <b>Building details</b>
                                   </div>
                                   <div className="col-md">
                                         <div className="row">
                                              <div className="col-md-* justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'17.30%'}}>
                                                  <b>Property Demarcation</b>
                                              </div>
                                              <div className="col-md"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                              <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                                              </div>
                                         </div>
                                         <div className="row">
                                              <div className="col-md-* justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'17.30%'}}>
                                                  <b>Property Identified (Y/N)</b>
                                              </div>
                                              <div className="col-md"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                              <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                                              </div>
                                         </div>
                                         <div className="row">
                                              <div className="col-md-* justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'17.30%'}}>
                                                  <b><br></br>Property Identified through</b>
                                              </div>
                                              <div className="col-md"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                              <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                                              </div>
                                         </div>
                                         <div className="row">
                                              <div className="col-md-* justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'17.30%'}}>
                                                  <b>Type of structure</b>
                                              </div>
                                              <div className="col-md"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                              <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                                              </div>
                                         </div>
                                         <div className="row">
                                              <div className="col-md-* justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'17.30%'}}>
                                                  <b>Land/Plot Area -UDS</b>
                                              </div>
                                              <div className="col-md"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                              <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                                              </div>
                                              <div className="col-md-1 justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                                  <b>Sqft</b>
                                              </div>
                                         </div>
                                         <div className="row">
                                              <div className="col-md-* justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'17.30%'}}>
                                                  <b>No of Blocks</b>
                                              </div>
                                              <div className="col-md"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                              <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                                              </div>
                                         </div>
                                         <div className="row">
                                              <div className="col-md-* justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'17.30%'}}>
                                                  <b>No of Units on each floor</b>
                                              </div>
                                              <div className="col-md"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                              <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                                              </div>
                                         </div>
                                         <div className="row">
                                              <div className="col-md-* justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'17.30%'}}>
                                                  <b>No. of Lifts</b>
                                              </div>
                                              <div className="col-md"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
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
<br></br>
<div className="row">
                        <div className="col-md">
                               <div className="row">
                                   <div className="col-md-* text-center "  style={{width:'4%',border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                       <b>13</b>
                                   </div>
                                   <div className='col-md-2 justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                      <b>Building details</b>
                                   </div>
                                   <div className="col-md">
                                         <div className="row">
                                              <div className="col-md-* justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'17.30%'}}>
                                                  <b>No of Units on each floor</b>
                                              </div>
                                              <div className="col-md"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                              <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                                              </div>
                                         </div>
                                         <div className="row">
                                              <div className="col-md-* justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'17.30%'}}>
                                                  <b>No. of Floors</b>
                                              </div>
                                              <div className="col-md"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                              <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                                              </div>
                                         </div>
                                         <div className="row">
                                              <div className="col-md-* justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'17.30%'}}>
                                                  <b>No. of Lifts</b>
                                              </div>
                                              <div className="col-md"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                              <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                                              </div>
                                         </div>
                                         <div className="row">
                                              <div className="col-md-* justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'17.30%'}}>
                                                  <b>Amenities Available</b>
                                              </div>
                                              <div className="col-md"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                              <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                                              </div>
                                         </div>
                                         <div className="row">
                                              <div className="col-md-* justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'17.30%'}}>
                                                  <b>Delivery Agency</b>
                                              </div>
                                              <div className="col-md"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
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
                                   <div className="col-md-* text-center "  style={{width:'4%',border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                       <b>14</b>
                                   </div>
                                   <div className='col-md-2 justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                      <b>Unit details</b>
                                   </div>
                                   <div className="col-md">
                                         <div className="row">
                                              <div className="col-md-* justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'17.30%'}}>
                                                  <b>Property located on Floor</b>
                                              </div>
                                              <div className="col-md"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                              <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                                              </div>
                                         </div>
                                         <div className="row">
                                              <div className="col-md-* justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'17.30%'}}>
                                                  <b><br></br>Unit Configuration</b>
                                              </div>
                                              <div className="col-md"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                              <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                                              </div>
                                         </div>
                                         <div className="row">
                                              <div className="col-md-* justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'17.30%'}}>
                                                  <b>Measured Carpet area</b>
                                              </div>
                                              <div className="col-md"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                              <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                                              </div>
                                              <div className="col-md-* justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'17.30%'}}>
                                                  <b>Sqft</b>
                                              </div>
                                         </div>
                                         <div className="row">
                                              <div className="col-md-* justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'17.30%'}}>
                                                  <b>SBUA of</b>
                                              </div>
                                              <div className="col-md"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                              <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                                              </div>
                                              <div className="col-md-* justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'17.30%'}}>
                                                  <b>Sqft</b>
                                              </div>
                                         </div>
                                         <div className="row">
                                              <div className="col-md-* justify-content-center align-items-center"  style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'17.30%'}}>
                                                  <b>View from property</b>
                                              </div>
                                              <div className="col-md"  style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
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
                           <div className='col-md-* text-center ' style={{width:'4%',border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                 <b>15</b>
                           </div>
                           <div className='col-md-2 justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                               <b>Construction Quality (Good/Avg/Bad)</b>
                           </div>
                           <div className='col-md-2 justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                               <b><br></br>Exteriors</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                           <div className='col-md-2 justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                               <b><br></br>Interiors</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
</div> 
<div className='row'>
                           <div className='col-md-* text-center ' style={{width:'4%',border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                 <b>16</b>
                           </div>
                           <div className='col-md-2 justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                               <b>Age of the property (Yrs)</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                           <div className='col-md-2 justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                               <b>Residual age (Yrs)</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                          
</div> 

<div className='row justify-content-center align-items-center'>
                   <div className='col-md-12 text-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                       <b>SANCTION PLAN APPROVAL & OTHER DOCUMENTS DETAILS</b>
                   </div>
        </div>

        <div className='row'>
                           <div className='col-md-* text-center ' style={{width:'4%',border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                 <b>17</b>
                           </div>
                           <div className='col-md-2 justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                               <b>Sanction Plan Available</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
  
                          
</div> 


<div className="row">
      <div className="col-md-* text-center "  style={{width:'4%',border:'1px solid black', fontFamily: 'Times New Roman'}}>
          <b>18</b>
      </div>
      <div className='col-md-2 justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
         <b>Description</b>
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
         <b>Approval Ref No</b>
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
         <b>Date of Approval</b>
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
         <b>Expiry Date</b>
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
         <b>Sanctioning Authority</b>
      </div>
</div>
<div className="row">
      <div className='col-md-* justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'20.66%'}}>
         <b>Layout Plan</b>
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
</div>
<div className="row">
      <div className='col-md-* justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'20.66%'}}>
         <b>Building Plan</b>
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
</div>
<div className="row">
      <div className='col-md-* justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'20.66%'}}>
         <b>Construction Permission</b>
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
</div>
<div className="row">
      <div className='col-md-* justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'20.66%'}}>
         <b>Occupancy Certificate</b>
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
</div>
<div className="row">
      <div className="col-md-* text-center "  style={{width:'4%',border:'1px solid black', fontFamily: 'Times New Roman'}}>
          <b>19</b>
      </div>
      <div className='col-md-2 justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
         <b>Construction commencement date</b>
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
          <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
          />
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
         <b><br></br>Expected Completion Date</b>
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
             <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
          />
      </div>
</div>
<div className="row">
      <div className="col-md-* text-center "  style={{width:'4%',border:'1px solid black', fontFamily: 'Times New Roman'}}>
          <b>20</b>
      </div>
      <div className='col-md-2 justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
         <b>Ownership Type (Free / Lease Hold)</b>
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
          <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
          />
      </div>
</div>
<div className="row">
      <div className="col-md-* text-center "  style={{width:'4%',border:'1px solid black', fontFamily: 'Times New Roman'}}>
          <b>21</b>
      </div>
      <div className='col-md-2 justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
         <b><br></br>Property documents verification details</b>
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
          <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
          />
      </div>
</div>
<div className="row">
      <div className="col-md-* text-center "  style={{width:'4%',border:'1px solid black', fontFamily: 'Times New Roman'}}>
          <b>22</b>
      </div>
      <div className='col-md-2 justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
         <b>Property Jurisdiction</b>
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
          <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
          />
      </div>
</div>
<br></br>
<br></br>
<div className="row">
      <div className="col-md-* text-center justify-content-center align-items-center"  style={{width:'4%',border:'1px solid black', fontFamily: 'Times New Roman'}}>
          <b><br></br>23</b>
      </div>
      <div className='col-md-2 justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
         <b><br></br>Permissible zoning as per master plan</b>
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
          <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
          />
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
         <b><br></br>Usage As per Site</b>
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
          <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
          />
      </div>
</div>
<div className="row">
      <div className="col-md-* text-center "  style={{width:'4%',border:'1px solid black', fontFamily: 'Times New Roman'}}>
          <b>24</b>
      </div>
      <div className='col-md-2 justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
         <b><br></br>Whether property under demolition list as per authority (Y/N)</b>
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
          <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
          />
      </div>
</div>

<div className="row">
      <div className="col-md-* text-center "  style={{width:'4%',border:'1px solid black', fontFamily: 'Times New Roman'}}>
          <b>25</b>
      </div>
      <div className='col-md-2 justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
         <b>Setbacks (Fts)</b>
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
         <b>As per plan/ Byelaws (Fts)</b>
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
         <b>As per site (Fts)</b>
      </div>
</div>
<div className="row">
      <div className='col-md-* justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'20.66%'}}>
         <b>Front</b>
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
</div>
<div className="row">
      <div className='col-md-* justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'20.66%'}}>
         <b>Side1(Left)</b>
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
</div>
<div className="row">
      <div className='col-md-* justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'20.66%'}}>
         <b>Side2(Right)</b>
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
</div>
<div className="row">
      <div className='col-md-* justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'20.66%'}}>
         <b>Rear</b>
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
</div>
<div className="row">
<div className='col-md ' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
    <b>BUA Area (In Sft.)</b>
</div>
</div>
<div className="row">
      <div className="col-md-* text-center "  style={{width:'4%',border:'1px solid black', fontFamily: 'Times New Roman'}}>
          <b>26</b>
      </div>
      <div className='col-md-2 justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
         <b>Floor</b>
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
         <b>As per plan/ Byelaws (Sft)</b>
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
         <b>As per site (Sft)</b>
      </div>
</div>
<div className="row">
      <div className='col-md-* justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'20.66%'}}>
         <b>First</b>
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
</div>
<div className="row">
      <div className='col-md-* justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'20.66%'}}>
         <b>Second</b>
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
</div>
<div className="row">
      <div className='col-md-* justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'20.66%'}}>
         <b>Third</b>
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
</div>
<div className="row">
      <div className='col-md-* justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'20.66%'}}>
         <b>Total BUA (In Sft.)</b>
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
</div>
<div className="row">
<div className='col-md ' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
    <b>VALUATION DETAILS</b>
</div>
</div>
<div className="row">
      <div className="col-md-* text-center "  style={{width:'4%',border:'1px solid black', fontFamily: 'Times New Roman'}}>
          <b>27</b>
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
         <b>(A)Description of Land & Constructed Area and Rates</b>
      </div>
</div>
<div className="row">
<div className='col-md ' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
    <b>Property Type</b>
</div>
<div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>

<div className="row">
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
         <b>Description</b>
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
         <b>Unit of Measurement</b>
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
         <b>Area</b>
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
         <b>Rate/unit</b>
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
         <b>Amount</b>
      </div>
</div>
<div className="row">
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'20.66%'}}>
         <b>Amount</b>
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
</div>
<div className="row">
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'20.66%'}}>
         <b>Parking/Stilt BUA</b>
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
</div>
<div className="row">
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'20.66%'}}>
         <b>CA as per Plan</b>
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
</div>
<div className="row">
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'20.66%'}}>
         <b>CA as per Agreement</b>
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
</div>
<div className="row">
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'20.66%'}}>
         <b>BUA/SBUA</b>
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
</div>
<div className="row">
<div className='col-md ' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
    <b>Construction Progress</b>
</div>
<div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
<div className='col-md ' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
    <b>% Completion</b>
</div>
<div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
</div>
<div className='col-md ' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
    <b>Recommendation</b>
</div>
<div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
</div>
</div>
<div className="row">
<div className='col-md ' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
    <b>(B)Value of Extra Amenities if applicable</b>
</div>
</div>
<div className="row">
<div className='col-md ' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
    <b>No of Car Parks</b>
</div>
<div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
</div>
</div>
<div className="row">
<div className='col-md ' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
    <b>Car Parking Charges Lumpsum (INR)</b>
</div>
<div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
</div>
</div>
<div className="row">
<div className='col-md ' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
    <b>EDC,IDC Lumpsum(INR)</b>
</div>
<div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
</div>
</div>
<div className="row">
<div className='col-md ' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
    <b>PLC Charges Lumpsum(INR)</b>
</div>
<div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
</div>
</div>
<div className="row">
<div className='col-md ' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
    <b>Power Backup</b>
</div>
<div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
</div>
</div>
<div className="row">
<div className='col-md ' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
    <b>Interiors/Amenities</b>
</div>
<div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
</div>
</div>
<div className="row">
<div className='col-md ' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
    <b>Interiors % completion</b>
</div>
<div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
</div>
</div>
<div className="row">
<div className='col-md ' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
    <b>Total of Component A on Completion</b>
</div>
<div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
</div>
</div>
<div className="row">
<div className='col-md ' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
    <b>Total of Component B on Completion</b>
</div>
<div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
</div>
</div>
<div className="row">
<div className='col-md ' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
    <b>Total Market Value of Property on Completion (A+B)</b>
</div>
<div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
</div>
</div>
<div className="row">
<div className='col-md ' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
    <b>Total Market Value of Property on Completion in Words</b>
</div>
<div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
</div>
</div>
<div className="row">
<div className='col-md ' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
    <b>Total Market Value of Property as on Date (A+B)</b>
</div>
<div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
</div>
</div>
<div className="row">
<div className='col-md ' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
    <b>Forced / Distress Sale Value as on date</b>
</div>
<div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
</div>
</div>
<div className="row">
<div className='col-md ' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
    <b>Approx. Rentals in case of 100% complete property</b>
</div>
<div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
</div>
</div>
<div className="row">
<div className='col-md ' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
    <b>BOUNDARIES</b>
</div>
</div>
<div className="row">
      <div className="col-md-* text-center "  style={{width:'4%',border:'1px solid black', fontFamily: 'Times New Roman'}}>
          <b>28</b>
      </div>
      <div className='col-md-* justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'16%'}}>
         <b>Boundaries</b>
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
         <b>North</b>
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
         <b>East</b>
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
         <b>South</b>
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
         <b>West</b>
      </div>
</div>
<div className="row">
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'20.66%'}}>
         <b>As per Docs</b>
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
       <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
</div>
<div className="row">
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'20.66%'}}>
         <b>At site</b>
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
      </div>
</div>
<div className="row">
      <div className='col-md-* justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman',width:'20%'}}>
         <b>Boundaries Matching</b>
      </div>
      <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
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
            <li style={{  fontFamily: 'Times New Roman' }}>The property under consideration is 1BHK Flat on 7th Floor in Ground + 7 Floors storied residential building with / without lift.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>As per site observation access to the building is as per norms and road width is 15 feet approx.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>We have received only Xerox Copies of Registered Agreement Previous Deed of Transfer Previous Index II Previous Registered Agreement CC OC Sale Plan & Share Certificate made available for verification.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>Kindly check the Sanction Plan at your end before disbursement.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>At the time of visit we have observed that property was (Self/seller/Tenant/ Vacant) occupied since last --- days/months.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>As per society name board owner of the unit is XYZ. During our visit we have not observed society name board.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>Agreement for sale made between Mahendra Life Space Developers AND Mrs. Suvarana Prakash Kakade and Mr. Prakash Baban Kakade on dated 27/11/2009 are made available for verification (Index no: 8591/2009).</li>
        </ol>
    </div>
</div>
<div className='row'>
    <div className='col-md-12' style={{ border: '1px solid black', }}>
          <p className="w-100 text-left" style={{ fontFamily: 'Times New Roman' }}>Declaration:</p>
        <ol style={{ textAlign: 'justify', paddingInlineStart: '30px', margin: '0' }}>
            <li style={{  fontFamily: 'Times New Roman' }}>Our representative has visited this site. I/We have not verified the title deeds of the properties with the records of the registrar's office as this is beyond the agreed scope of work. Assumptions are made to the best of our knowledge and belief. Reliance is based on the information furnished to us by the identifier AND/OR client.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>The valuer shall not be responsible for the matters of legal nature that affects the value and opinion expressed by us.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>Fair market value indicated in the report is an opinion of the value prevailing on the date of the said report and is based on market feedback on values of similar properties. Client is free to obtain other independent opinions on the same. Fair, market value of such properties / localities may increase or decrease, depending on the future market conditions & scenarios.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>value varies with the purpose & date. This report is not to be referred if the purpose is different other than mentioned.No structural survey was conducted by us as it is not in our scope of work.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>We hereby declare, “The information furnished above is true and correct to the best of our knowledge and belief. We have no direct or indirect interest in the assets valued..</li>
            <li style={{  fontFamily: 'Times New Roman' }}>where a sketched plan is attached to this report,it does not purport to represent accurate architectural plans.Sketch plans and photographs are provided as general illustrations only. Documents furnished to us are returned to the client along with the report. We cannot preserve them.</li>
        </ol>
    </div>
</div>
<div className='row'>
                     <div className="col-md-6"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman' }}>
                          {" "}
                         <b>(Authorized Signatory)</b> {" "} 
                     </div>
                     <div className="col-md-6"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman' }}>
                         
                     </div>
</div>
<div className='row'>
                     <div className="col-md-12"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman' }}>
                          {" "}
                         <b>Deviations /Observations</b> {" "} 
                     </div>
</div>
<div className="row">
    <div className='col-md-3 d-flex  align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <b className='mb-0 text-left'>Deal Number</b>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <p className="mb-0">:</p>
    </div>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className='col-md-2 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <b className='mb-0 text-left'>Asset id</b>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
       <p className="mb-0">:</p>
    </div>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className='col-md-3 d-flex  align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <b className='mb-0 text-left'>Branch Name</b>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <p className="mb-0">:</p>
    </div>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className='col-md-2 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <b className='mb-0 text-left'>Type of Case</b>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
       <p className="mb-0">:</p>
    </div>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className='col-md-3 d-flex  align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <b className='mb-0 text-left'>Valuer Name</b>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <p className="mb-0">:</p>
    </div>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className='col-md-2 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <b className='mb-0 text-left'>Product Type</b>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
       <p className="mb-0">:</p>
    </div>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className='col-md-3 d-flex  align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <b className='mb-0 text-left'>Valuer Ref No</b>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <p className="mb-0">:</p>
    </div>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className='col-md-2 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <b className='mb-0 text-left'>Date of Visit</b>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
       <p className="mb-0">:</p>
    </div>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className='col-md-3 d-flex  align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <b className='mb-0 text-left'>Valuer Feedback</b>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <p className="mb-0">:</p>
    </div>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className='col-md-2 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <b className='mb-0 text-left'>Date of Report</b>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
       <p className="mb-0">:</p>
    </div>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className='col-md d-flex  align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <b className='mb-0 text-left'>Property Address</b>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>





{/*----------------------------------PENDING REPORT END------------------------------------------------------------*/}




        
</div>
<Bottom></Bottom>
</div>               
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

export default connect(mapStateToProps, mapDispatchToProps)(AdityaBirlaHousingFinanceLtd);
