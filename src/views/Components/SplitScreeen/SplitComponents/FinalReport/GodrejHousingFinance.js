
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

function GodrejHousingFinance(props) {
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
    <div className="col-md-12" style={{ border: '1px solid black',fontFamily: 'Times New Roman'}}>
        <b >Technical Report Format</b>
    </div>
</div>
<div className="row">
    <div className='col-md-3 align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'>Name of Valuation <br></br>Agency</p>
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
    <div className='col-md-2 align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'>Date of Technical Initiation</p>
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
    <div className='col-md-3 align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'>Name of the Customer/ Applicant & Contact Details</p>
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
         <p className='mb-0 text-left'>Date of Site Visit</p>
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
    <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'>Request from</p>
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
         <p className='mb-0 text-left'>Date of Report release</p>
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
<div className='row'>
                     <div className="col-md-12"  style={{ border: '1px solid black',fontFamily: 'Times New Roman'}}>
                          {" "}
                         <b>Data from Technical Initiation Request Form</b> {" "} 
                     </div>
</div>
<div className="row">
    <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'>Proposal ID /Application No</p>
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
         <p className='mb-0 text-left'>Transaction Type</p>
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
    <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'>Branch Name/ID</p>
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
         <p className='mb-0 text-left'>Request from Employee</p>
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
    <div className='col-md-3  align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'>Name of Current Owner / Seller</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4.2%' }}>
       <p className="mb-0">:</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'>Name of the Person met at site & Contact No.</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4.2%' }}>
       <p className="mb-0">:</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:"11.65%"}}>
        <p className='mb-0'>Address of the property being appraised</p> 
    </div>
    <div className="col-md">
        <div className="row">
            <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'2.1%'}}>
                <p className="mb-0">:</p>
            </div>
            <div className="col-md-*" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'13%'}}>
                <p className='mb-0'></p>
            </div>
            <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4.75%'}}>
                <p className="mb-0">:</p>
            </div>
            <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                <b className='mb-0'>Address</b> {" "} 
            </div>
        </div>
        <div className="row">
            <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'2.1%'}}>
                  <p className="mb-0">:</p>
            </div>
            <div className="col-md-* mb-0 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'13%'}}>
               <p className='mb-0'>As per TRF</p>
            </div>
            <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4.75%'}}>
                <p className="mb-0">:</p>
            </div>
            <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                  <ReportCustomTextField
                  formProps={formProps}
                  name="prospect_no"
                 />
            </div>
        </div>
        <div className="row">
            <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'2.1%'}}>
               <p className="mb-0">:</p>
            </div>
            <div className="col-md-* mb-0 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'13%' }}>
               <p className='mb-0'>As per Legal Documents</p>
            </div>
            <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4.75%'}}>
               <p className="mb-0">:</p>
            </div>
            <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                <ReportCustomTextField
                  formProps={formProps}
                  name="prospect_no"
                 />
            </div>
        </div>
        <div className="row">
            <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'2.1%'}}>
                <p className="mb-0">:</p>
            </div>
            <div className="col-md-* mb-0 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'13%'}}>
                <p className='mb-0'>As per Actual at site</p>
            </div>
            <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4.75%'}}>
               <p className="mb-0">:</p>
            </div>
            <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                <ReportCustomTextField
                  formProps={formProps}
                  name="prospect_no"
                 />
            </div>
        </div>
    </div>
</div>
<div className="row">
    <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'>Documents Provided by</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4.2%' }}>
       <p className="mb-0">:</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className='row'>
                     <div className="col-md-12"  style={{ border: '1px solid black',fontFamily: 'Times New Roman'}}>
                          {" "}
                         <b className='mb-0'>Locational & Property Specific Details (based on site visit)</b> {" "} 
                     </div>
</div>
<div className="row">
    <div className='col-md-3 d-flex  align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0'>Status of Holding</p>
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
         <p className='mb-0'>Delivery Agency</p>
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
         <p className='mb-0 text-left'>Type of Property</p>
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
         <p className='mb-0 text-left'>Name of the State</p>
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
         <p className='mb-0 text-left'>Main Locality</p>
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
         <p className='mb-0 text-left'>Sub Locality</p>
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
         <p className='mb-0 text-left'>Street on which Property is located</p>
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
         <p className='mb-0 text-left'>Nearest Landmark</p>
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
         <p className='mb-0 text-left'>Pin Code</p>
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
         <p className='mb-0 text-left'>Occupation Status</p>
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
         <p className='mb-0 text-left'><br></br>Locality/Zoning type as per Latest Development Master Plan</p>
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
         <p className='mb-0 text-left'>Property Usage</p>
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
         <p className='mb-0 text-left'>Property Identifiable</p>
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
         <p className='mb-0 text-left'>Property Demarcated separately</p>
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
         <p className='mb-0 text-left'>Identified Through</p>
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
         <p className='mb-0 text-left'>Name of City/Town/Village</p>
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
         <p className='mb-0 text-left'>Roof Construction</p>
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
         <p className='mb-0 text-left'>Type of Structure</p>
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
         <p className='mb-0 text-left'>Total No. of Flats / Units in building</p>
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
         <p className='mb-0 text-left'>Delivery Agency</p>
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
         <p className='mb-0 text-left'><br></br>Internal Quality of construction</p>
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
         <p className='mb-0 text-left'>Delivery Agency</p>
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
         <p className='mb-0 text-left'>No. of Floors in the building</p>
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
         <p className='mb-0 text-left'>Located on Floor No.</p>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
       <p className="mb-0 text-left">:</p>
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
         <p className='mb-0 text-left'>Total No. of Flats / Units in building</p>
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
         <p className='mb-0 text-left'>Internal Quality of construction</p>
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
         <p className='mb-0 text-left'>External Finishing</p>
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
         <p className='mb-0 text-left'>Type of Flooring</p>
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
         <p className='mb-0 text-left'>Present Age of the Property in Yrs</p>
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
         <p className='mb-0 text-left'>Future Physical Life of Property in Yrs</p>
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
         <p className='mb-0 text-left'>Latitude</p>
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
         <p className='mb-0 text-left'>Longitude</p>
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
    <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'>Extra Amenities available</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4.2%' }}>
       <p className="mb-0">:</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className='row'>
                     <div className="col-md-12"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman' }}>
                          {" "}
                         <b>Zone/Locality/Surrounding/Civic Amenities</b> {" "} 
                     </div>
</div>
<div className="row">
    <div className='col-md-3 d-flex  align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'>Infrastructure in the area</p>
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
         <p className='mb-0 text-left'>Class of Locality</p>
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
         <p className='mb-0 text-left'>Type of Road</p>
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
         <p className='mb-0 text-left'>Width of the Road in ft</p>
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
         <p className='mb-0 text-left'>Electrification/Electric poles observed</p>
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
         <p className='mb-0 text-left'>Distance from Bus stand (Km)</p>
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
         <p className='mb-0 text-left'>Distance from the Main Market (Km)</p>
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
         <p className='mb-0 text-left'>Distance from Railway Station (Km)</p>
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
         <p className='mb-0 text-left'>Property falls under Seismic Zone</p>
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
         <p className='mb-0 text-left'>Property Falls under Flood Zone</p>
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
         <p className='mb-0 text-left'><br></br>Property Falls in Cyclone Zone</p>
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
         <p className='mb-0 text-left'>Property Falls in CR Zone</p>
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
         <p className='mb-0 text-left'>Degree of Risk Associated</p>
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
         <p className='mb-0 text-left'>Any risk of Demolition</p>
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
<div className='row'>
                     <div className="col-md-12"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman' }}>
                          {" "}
                         <b>Boundaries</b> {" "} 
                     </div>
</div>
{/*----------------------------------PENDING REPORT START------------------------------------------------------------*/}
<div className="row">
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'25%' }}>
         <p className='mb-0 text-left'>Boundaries</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4.2%' }}>
       <p className="mb-0">:</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
          <p className='mb-0 text-left'>North</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'>South</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
    <p className='mb-0 text-left'>East</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
       <p className='mb-0 text-left'>West</p>
    </div>
</div>
<div className="row">
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'25%' }}>
         <p className='mb-0 text-left'>As per Documents</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4.2%' }}>
       <p className="mb-0">:</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
          <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
          <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
          />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'25%' }}>
         <p className='mb-0 text-left'>As per Site / Actual</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4.2%' }}>
       <p className="mb-0">:</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
          <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
          <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
          />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'25%'}}>
         <p className='mb-0 text-left'>Boundaries Matching</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4.2%' }}>
       <p className="mb-0">:</p>
    </div>
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'17.80%' }}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div> 
     <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
           <p className="mb-0">If No, then reason thereon</p>
     </div>
     <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4.2%'}}>
                    <p className="mb-0">:</p>
     </div>
     <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                     <ReportCustomTextField
                     formProps={formProps}
                     name="prospect_no"
                    />
      </div> 
        
    
</div>
<div className='row'>
                     <div className="col-md-12"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman' }}>
                          {" "}
                         <b>Setbacks / Margin (in Ft)</b> {" "} 
                     </div>
</div>
<div className="row">
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'25%' }}>
         <p className='mb-0'>Setbacks / Margin in the Building (in Ft)</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4.2%' }}>
       <p className="mb-0">:</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
          <p className='mb-0 text-left'>Front</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'>Rear</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
    <p className='mb-0 text-left'>Left Side</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
       <p className='mb-0 text-left'>Right Side</p>
    </div>
</div>
<div className="row">
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'25%' }}>
         <p className='mb-0'>As per sanctioned/ permissible byelaws</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4.2%' }}>
       <p className="mb-0">:</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
          <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
          <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
          />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'25%' }}>
         <p className='mb-0'>As per Site / Actual</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4.2%' }}>
       <p className="mb-0">:</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
          <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
          <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
          />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className='row'>
                     <div className="col-md-12"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman' }}>
                          {" "}
                         <b>Height / Storeys</b> {" "} 
                     </div>
</div>
<div className="row">
    <div className='col-md-3  align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0'>As per sanctioned/ permissible byelaws</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4.2%' }}>
       <p className="mb-0">:</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className='col-md-3  align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0'>As per Site / Actual</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4.2%' }}>
       <p className="mb-0">:</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className='row'>
                     <div className="col-md-12"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman' }}>
                          {" "}
                         <b>Plot dimension details (In Ft) for Independent Built up</b> {" "} 
                     </div>
</div>
<div className="row">
  <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
      <b className='mb-0'>Side 1</b>
  </div>
  <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
      <b className='mb-0'>Side 2</b>
  </div>
  <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
      <b className='mb-0'>Side 3</b>
  </div>
  <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
      <b className='mb-0'>Side 4</b>
  </div>
  <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
     <b className='mb-0'>Actual Area at site in Sft</b>
  </div>
  <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
      <b className='mb-0'>Legal Area as per Docs in Sft</b>
  </div>
</div>
<div className="row">
  <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
       <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
  </div>
  <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
  </div>
  <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
  </div>
  <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
          <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
  </div>
  <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
       <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
  </div>
  <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
  </div>
</div>
<div className='row'>
                     <div className="col-md-12"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman' }}>
                          {" "}
                         <b>Plot dimension details (In Ft) for Independent Built up</b> {" "} 
                     </div>
</div>
<div className="row">
  <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
     <p className='mb-0 text-left'><br></br>Floor (Pl mention floor wise)</p>
  </div>
  <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', width:'4.2%'}}>
        <p className="mb-0">:</p>
  </div>
  <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
       <p className='mb-0'>Accomodation</p>
  </div>
  <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
       <p className='mb-0'>Carpet Area (Sft)</p>
 </div>
 <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
     <p className='mb-0'><br></br>Actual BUA / Saleable Area (Sft)</p>
 </div>
 <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
    <p className='mb-0'>Permissible Area (Sft)</p>
</div>
<div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
   <p className='mb-0'>Adopted Area (Sft)</p>
</div>
</div>
<div className="row">
  <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
     <p className='mb-0 text-left'>Basement / Stilt</p>
  </div>
  <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', width:'4.2%'}}>
        <p className="mb-0">:</p>
  </div>
  <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
           <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
  </div>
  <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
 </div>
 <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
 </div>
 <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
          <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
</div>
<div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
          <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
</div>
</div>
<div className="row">
  <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
     <p className='mb-0 text-left'>Ground Floor</p>
  </div>
  <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', width:'4.2%'}}>
        <p className="mb-0">:</p>
  </div>
  <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
           <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
  </div>
  <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
 </div>
 <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
 </div>
 <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
          <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
</div>
<div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
          <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
</div>
</div>
<div className="row">
  <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
     <p className='mb-0 text-left'>First Floor</p>
  </div>
  <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', width:'4.2%'}}>
        <p className="mb-0">:</p>
  </div>
  <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
           <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
  </div>
  <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
 </div>
 <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
 </div>
 <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
          <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
</div>
<div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
          <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
</div>
</div>
<div className="row">
  <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
     <p className='mb-0 text-left'>Second Floor</p>
  </div>
  <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', width:'4.2%'}}>
        <p className="mb-0">:</p>
  </div>
  <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
           <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
  </div>
  <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
 </div>
 <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
 </div>
 <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
          <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
</div>
<div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
          <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
</div>
</div>
<div className="row">
  <div className="col-md align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
     <p className='mb-0 text-left'>Third<br></br>Floor/Above</p>
  </div>
  <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', width:'4.2%'}}>
        <p className="mb-0">:</p>
  </div>
  <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
           <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
  </div>
  <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
 </div>
 <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
 </div>
 <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
          <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
</div>
<div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
          <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
</div>
</div>
<div className="row">
  <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
     <p className='mb-0 text-left'>Total</p>
  </div>
  <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', width:'4.2%'}}>
        <p className="mb-0">:</p>
  </div>
  <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
           <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
  </div>
  <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
 </div>
 <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
 </div>
 <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
          <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
</div>
<div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
          <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
</div>
</div>
{/*----------------------------------PENDING REPORT END------------------------------------------------------------*/}

<div className='row'>
                     <div className="col-md-12"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman' }}>
                          {" "}
                         <b>Building Approvals & Related Documents</b> {" "} 
                     </div>
</div>
<div className="row">
    <div className='col-md-3 d-flex  align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'>Construction as per approved/ sanctioned plans</p>
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
    <div className='col-md-2 d-flex  align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'><br></br>Details of approved plan with approval no and date</p>
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
         <p className='mb-0 text-left'>CC/OC Number and date</p>
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
         <p className='mb-0 text-left'>Work Progress observed at site</p>
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
         <p className='mb-0 text-left'>If plans not available whether the structure confirming to the local byelaws.</p>
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
         <p className='mb-0 text-left'>Violations Observed if Any</p>
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
         <p className='mb-0 text-left'>Any other docs like P tax/E bill/Society NOC etc</p>
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
         <p className='mb-0 text-left'><br></br>RERA Number for Builder Project</p>
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
<div className='row'>
                     <div className="col-md-12"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman' }}>
                          {" "}
                         <b>Estimate Analysis (Applicable only in Self Construction cases)</b> {" "} 
                     </div>
</div>
<div className="row">
    <div className='col-md-3 d-flex  align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'>Submitted Estimated Cost (In Rs per Sqft)</p>
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
         <p className='mb-0 text-left'>Total Estimate submitted (in Rs)</p>
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
         <p className='mb-0 text-left'>Justified Estimated Cost (in Rs per Sqft)</p>
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
         <p className='mb-0 text-left'><br></br>Adoptable / Justified Estimated Cost (In Rs)</p>
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
<div className='row'>
                     <div className="col-md-12"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman' }}>
                          {" "}
                         <b>Property Valuation</b> {" "} 
                     </div>
</div>
<div className='row'>
                     <div className="col-md-12"  style={{ border: '1px solid black',fontFamily: 'Times New Roman' }}>
                          {" "}
                         <b className="text-left">Valuation of Independent House/Bunglow/Commerical/Industrial Building</b> {" "} 
                     </div>
</div>
<div className="row">
    <div className='col-md-3 d-flex  align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'>Land Area (In Sqft)</p>
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
         <p className='mb-0 text-left'>Adoptable Built-up Area (in Sqft)</p>
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
         <p className='mb-0 text-left'>Rate Range of land in the locality (Rs Per Sqft)</p>
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
         <p className='mb-0 text-left'>Construction Cost (Rs per sft)</p>
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
         <p className='mb-0 text-left'>Recommended Rate of Land (Rs per sqft)</p>
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
         <p className='mb-0 text-left'>Total Construction Value for 100% complete building (in Rs)</p>
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
         <p className='mb-0 text-left'>Pls specify if any special amenties provided</p>
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
         <p className='mb-0 text-left'>Addl Cost incurred for amenities (in Rs)</p>
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
         <p className='mb-0 text-left'>Total Land Value (in Rs)</p>
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
         <p className='mb-0 text-left'>Total Construction Value at present construction stage (in Rs)</p>
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
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'>Realizable Value (in Rs)</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4.2%' }}>
       <p className="mb-0">:</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className='col-md-3 d-flex  align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'>Market Value of Land & Building for 100% complete property (in Rs)</p>
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
         <p className='mb-0 text-left'><br></br>Market Value of Land & Building at present stage of completion (in Rs)</p>
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
<div className='row'>
                     <div className="col-md-12"  style={{ border: '1px solid black',fontFamily: 'Times New Roman' }}>
                          {" "}
                         <b className="text-left">Valuation of Flat / Shop / Office / Industrial / Other unit etc</b> {" "} 
                     </div>
</div>
<div className="row">
    <div className='col-md-3 d-flex  align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'>CA As Per Measurement</p>
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
         <p className='mb-0 text-left'>Area Consider for Valuation</p>
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
         <p className='mb-0 text-left'>Bua As Per Document</p>
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
         <p className='mb-0 text-left'>Rate considered (Rs per sqft)</p>
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
         <p className='mb-0 text-left'>Total Market Value of Flat / Shop / Flat / Office on 100% complete (in Rs)</p>
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
         <p className='mb-0 text-left'><br></br>Total Market Value of Flat / Shop / Flat / Office on present completion stage (in Rs)</p>
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
<div className='row'>
                     <div className="col-md-12"  style={{ border: '1px solid black',fontFamily: 'Times New Roman' }}>
                          {" "}
                         <b className="text-left">Stage of Construction</b> {" "} 
                     </div>
</div>
<div className="row">
    <div className='col-md-3 d-flex  align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'>% Completion</p>
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
         <p className='mb-0 text-left'><br></br>% Recommendation</p>
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
<br></br><br></br><br></br><br></br>
<div className='row'>
                     <div className="col-md-12"  style={{ border: '1px solid black',fontFamily: 'Times New Roman' }}>
                          {" "}
                         <b className="text-left">Guideline & Distress/Forced Sale Value</b> {" "} 
                     </div>
</div>
<div className="row">
    <div className='col-md-3 d-flex  align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'>Government Guideline/ Circle rate for Land (Rs per sqft)</p>
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
         <p className='mb-0 text-left'>Land Value as per Government Rate (Rs)</p>
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
         <p className='mb-0 text-left'>Government Guideline/ Circle rate for Flat/Unit/ Built up (Rs per sqft)</p>
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
         <p className='mb-0 text-left'>Flat / Unit/Built up Value as per Government Rate(Rs)</p>
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
         <p className='mb-0 text-left'>Forced Sale Value (in Rs)</p>
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
         <p className='mb-0 text-left'>Avg Rental per sqft (in Rs)</p>
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
<div className='row'>
                     <div className="col-md-12"  style={{ border: '1px solid black',fontFamily: 'Times New Roman' }}>
                          {" "}
                         <b>Property Specific Remarks & Observation</b> {" "} 
                     </div>
</div>
<div className="row">
    <div className='col-md-2  d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <b className='mb-0'>Remarks / Observation</b>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4.2%' }}>
       <p className="mb-0">:</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
    <ol start={'1'} style={{ textAlign: 'justify', paddingInlineStart: '30px',marginTop:'20px'}}>
            <li style={{fontFamily: 'Times New Roman' }}>The property under consideration is Shop Located on Ground Floor in Ground+7th storied residential building with 01 lift.</li>
            <li style={{fontFamily: 'Times New Roman' }}>The captioned property is internal compound wall facing hence marketability is effected for such types of properties.</li>
            <li style={{fontFamily: 'Times New Roman' }}>Height of the Shop is 12 feet approx & Height of the Shop is 5.8 feet approx.</li>
            <li style={{fontFamily: 'Times New Roman' }}>As per site observation access to the building is as per norms and road width is 15 feet approx.</li>
            <li style={{fontFamily: 'Times New Roman' }}>We have received Xerox Copies of Registered Agreement For Sale Index II CC OC and Sale Plan are made are available for verification.</li>
            <li style={{fontFamily: 'Times New Roman' }}>Kindly check the sanction Plan at your end before disbursement.</li>
            <li style={{fontFamily: 'Times New Roman' }}>As per site observation RCC + Brickwork + Internal Plaster + External Plaster is completed and Flooring is completed upto 44th Floor and remaining work is in progress.</li>
            <li style={{fontFamily: 'Times New Roman' }}>During our visit we have not observed society name board.</li>
            <li style={{fontFamily: 'Times New Roman' }}>Sale deed Made between M/S. New Ambica Decelopers AND Mr. Paresh Arvind Sachde & Mr. Kanaiyalal Shamji Bhanushali Dated: 22/08/2006 are made available for verification( Index II No. 4014/2006) Unit boundaries are not mentioned in available documents hence Please check at your legal end before disbursement.</li>
            <li style={{fontFamily: 'Times New Roman' }}>Additional loft area had been measured and observed on site hence the area for the same is not considered for the purpose of valuation.</li>
            <li style={{fontFamily: 'Times New Roman' }}>We have considered 45% Loading Registered Agreement For Sale CA to Derive SBUA to furnish the report.</li>
        </ol>
    </div>
</div>
<div className="row">
    <div className='col-md-3  d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'>Whether Property visited earlier for any other financier</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4.2%' }}>
       <p className="mb-0">:</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'>Pls specify the name of the financier</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4.2%' }}>
       <p className="mb-0">:</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
  <div className="col-md-2 "  style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
       <b className='mb-0'>References of Transactions Available</b>
  </div>
  <div className="col-md">
     <div className="row">
       <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4.2%' }}>
          <p className="mb-0">:</p>
         </div>
        <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
            <b className='mb-0'>Ref 1</b>
        </div>
        <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
            <b className='mb-0'>Ref 2</b>
        </div>
        <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
             <b className='mb-0'>Ref 3</b>
        </div>
        <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
            <b className='mb-0'>Ref 5</b>
        </div>
        <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
            <b className='mb-0'>Ref 5</b>
        </div>
     </div>
     <div className="row">
        <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4.2%',height:'48px' }}>
             <p className="mb-0">:</p>
           </div>
         <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
            <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
           />
         </div>
        <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
           <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
          />
        </div>
        <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
          <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
          />
        </div>
        <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
           <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
          />
        </div>
        <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
          <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
          />
        </div>
     </div>
  </div>
</div>
<div className='row'>
                     <div className="col-md-12"  style={{ border: '1px solid black',fontFamily: 'Times New Roman' }}>
                          {" "}
                         <b>PROPERTY PHOTOGRAPHS</b> {" "} 
                     </div>
</div>
<div className="row">
    <div className='col-md-3  d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'>Name of the Customer/ Applicant</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4.2%' }}>
       <p className="mb-0">:</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'>Proposal ID/Application No</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4.2%' }}>
       <p className="mb-0">:</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className='col-md-3  align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'>Address of the property being appraised</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4.2%' }}>
       <p className="mb-0">:</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>

<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<div className='row'>
                     <div className="col-md-12"  style={{ border: '1px solid black',fontFamily: 'Times New Roman' }}>
                          {" "}
                         <b>Valuer Certification/Disclaimer</b> {" "} 
                     </div>
</div>

<div className="row">
  
  <div className="col-md">

    <div className="row">
      <div className="col-md">
        <div className='row'>
          <div className='col-md-12' style={{ border: '1px solid black' }}>
            <ul style={{ textAlign: 'justify', paddingInlineStart: '30px', margin: '10px' }}>
            <li style={{ fontFamily: 'Times New Roman' }}>Fair market value indicated in the report is an opinion of the value prevailing on the date of the said report and is based on market feedback on values of similar properties. Client is free to obtain other independent opinions on the same. Fair, market value of such properties / localities may increase or decrease, depending on the future market conditions & scenarios. value varies with the purpose & date.This report is not to be referred if the purpose is different other than mentioned.No structural survey was conducted by us as it is not in our scope of work.</li>
            <li style={{ fontFamily: 'Times New Roman' }}>We hereby declare, “The information furnished above is true and correct to the best of our knowledge and belief. We have no direct or indirect interest in the assets valued.</li>
            <li style={{ fontFamily: 'Times New Roman' }}>Our representative has visited this site. I/We have not verified the title deeds of the properties with the records of the registrar's office as this is beyond the agreed scope of work.Assumptions are made to the best of our knowledge and belief. Reliance is based on the information furnished to us by the identifier AND/OR client.</li>
            <li style={{ fontFamily: 'Times New Roman' }}>The valuer shall not be responsible for the matters of legal nature that affects the value and opinion expressed by us.</li>   
            <li style={{ fontFamily: 'Times New Roman' }}>where a sketched plan is attached to this report,it does not purport to represent accurate architectural plans.Sketch plans and photographs are provided as general illustrations only.Documents furnished to us are returned to the client along with the report. We cannot preserve them.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div className="row">
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0'>Name of Engineer Visited the property</p>
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
    <div className='col-md-2 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0'>Authorized Signatory Name & Signature</p>
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


        
</div>
<Bottom></Bottom>
</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(GodrejHousingFinance);
