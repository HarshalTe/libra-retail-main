
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

function HdbReportFormat(props) {
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
        <b className='mb-0' >VALUATION REPORT</b>
    </div>
</div>

<div className='row'>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <p className='mb-0'>Ref:</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className='row'>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <p className='mb-0'>LOS NO.</p>
    </div>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <p className='mb-0'>Dated:</p>
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
        <p className='mb-0'>Valuer Name,Contact Details,Email ID & Code</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className='row'>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0'>Branch Name</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
    </div>
</div>
<div className='row'>
                     <div className="col-md-12 d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
                          {" "}
                         <b>GENERAL DETAILS</b> {" "} 
                     </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>1</p>
    </div>
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
        <p className='mb-0'>Purpose of Valuation</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
    </div> 
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>2</p>
    </div>
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
        <p className='mb-0'>Date on which Valuation is done</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
    </div> 
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>3</p>
    </div>
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
        <p className='mb-0'>Name of the applicant</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
    </div> 
</div>
<div className="row">
   <div className="col-md">
       <div className="row">
            <div className="col-md-*" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
                  <p className='mb-0'>3a</p>
            </div>
            <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                <p className='mb-0'>Name of the property Owner</p>
            </div>
            <div className="col-md" >
                <div className="row">
                    <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <p className='mb-0'>As per ownership Document</p>
                    </div>
                    <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <p className='mb-0'>As per Physical visit</p>
                    </div>
                </div>
                <div className="row">
                  
                    <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
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
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>4</p>
    </div>
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
        <p className='mb-0'>Person Name & Contact No. available During Visit</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
    </div> 
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>5</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <b className='mb-0'>Particulars</b>
    </div>
  
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>5a</p>
    </div>
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
        <p className='mb-0'>Property Address Description (As per Physical Site)</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
    </div> 
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p></p>
    </div>
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
        <p className='mb-0'>Property Address Description (As per approved plan)</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
    </div> 
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p></p>
    </div>
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
        <p className='mb-0'>Property Address Description (As per ownership documents)</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
    </div> 
</div>


<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p></p>
    </div>
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
        <p className='mb-0'></p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
        <p className='mb-0'>As per ownership documents</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
        <p className='mb-0'>As per Approved plans & Permission</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
        <p className='mb-0'>As per Physical visit</p>
    </div>
</div>

<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>5b</p>
    </div>
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
        <p className='mb-0'>Plot No. & Sub Plot No.</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
    </div>
</div>

<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>5c</p>
    </div>
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
        <p className='mb-0'>CTS Nos/S.Nos/Gat Nos./Hissa Nos/Khasra Nos.</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
    </div>
</div>

<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>5d</p>
    </div>
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
        <p className='mb-0'>Village/ Town/ Location</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
    </div>
</div>

<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>5e</p>
    </div>
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
        <p className='mb-0'>Taluka</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
    </div>
</div>

<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>5f</p>
    </div>
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
        <p className='mb-0'>District</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
    </div>
</div>

<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>5g</p>
    </div>
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
        <p className='mb-0'>State</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
    </div>
</div>


<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>5h</p>
    </div>
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
        <p className='mb-0'>Pin Code</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
    </div>
</div>

<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>5i</p>
    </div>
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
        <p className='mb-0'>GPS Coordinates</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
         <p className='mb-0'>Latitude</p>         
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
         <p className='mb-0'>Longitude</p>         
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
    </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>5j</p>
    </div>
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
        <p className='mb-0'>Nearest Landmark</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
    </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>5k</p>
    </div>
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
        <p className='mb-0'>Name on the Society Name Board</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
    </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>5l</p>
    </div>
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
        <p className='mb-0'>Name on the Property's Door/Entrance</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
    </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>5m</p>
    </div>
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
        <p className='mb-0'>Name ,Address and contact No. of the Neighbour/Treasurer/Secretary/Chairman who confirmed the Property owners Name & Existence</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
    </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>6</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
        <b className='mb-0'>Particulars</b>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
        <b className='mb-0'>Name</b>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
        <b className='mb-0'>Distance</b>
    </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>6.a</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
       <p className='mb-0'><br></br>Nearest Government offices from property</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>6b</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
       <p className='mb-0'>Nearest Railway Station from property</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>6c</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
       <p className='mb-0'>Nearest Bus Station from property</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>6d</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
       <p className='mb-0'>Nearest Airport Station from property</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>6e</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
       <p className='mb-0'>Nearest National Highway<br></br> from property</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>6f</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
       <p className='mb-0'>Community centers like Hotels,Restaurants,Theaters, Auditoriums,Clubs, Lakes,Ponds etc Approximate Distance from Property</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>6g</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
       <p className='mb-0'>School, College Hospital, Market etc Approximate Distance from Property</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
</div>
<div className='row'>
                     <div className="col-md-12  d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
                          {" "}
                         <b className='mb-0'>DOCUMENT DETAILS:</b> {" "} 
                     </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>7</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <b className='mb-0'>Particulars</b>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <b className='mb-0'>Date</b>
    </div>
    <div className='col-md-2 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <b className='mb-0'>Ref No.</b>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <b className='mb-0'>Registrar office/Competent Authority/Owner Name</b>
    </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>7.a</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
        <p className='mb-0'>Ownership Documents- Sale Deed,Memorandum of Deposit of Title Deed,Agreement to sale, Gift Deed</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
    <div className='col-md-2 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>7.b</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
        <p className='mb-0'>N.A Order</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
    <div className='col-md-2 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>7c</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
        <p className='mb-0'>Commencement Certificate/ Construction Permission/ Building Permission</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
    <div className='col-md-2 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
</div>
<div className="row">
  <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
     <p className='mb-0'>7d</p>
  </div>
  <div className="col-md">
    
     <div className="row">
           <div className="col-md">
                  <div className="row">
                       <div className="col-md-*"  style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'27.40%'}}>
                             <p className='mb-0'>SANCTIONED PLANS</p>  
                       </div>
                       <div className="col-md-*"  style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'27.63%'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                           />
                       </div>
                       <div className="col-md-*"  style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'17.50%'}}>
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
                       <div className="col-md-*"  style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'27.40%'}}>
                           <p className='mb-0'>Building Plan</p>
                       </div>
                       <div className="col-md-*"  style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'27.63%'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                           />
                       </div>
                       <div className="col-md-*"  style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'17.50%'}}>
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
                       <div className="col-md-*"  style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'27.40%'}}>
                              <p className='mb-0'>As per Title document</p>
                       </div>
                       <div className="col-md-*"  style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'27.63%'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                       </div>
                       <div className="col-md-*"  style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'17.50%'}}>
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
                       <div className="col-md-*"  style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'27.40%'}}>
                              <p className='mb-0'>Floor Plan</p>
                       </div>
                       <div className="col-md-*"  style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'27.63%'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                       </div>
                       <div className="col-md-*"  style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'17.50%'}}>
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
                       <div className="col-md-*"  style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'27.40%'}}>
                              <p className='mb-0'>Layout Plan</p>
                       </div>
                       <div className="col-md-*"  style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'27.63%'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                       </div>
                       <div className="col-md-*"  style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'17.50%'}}>
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
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>7e</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
        <p className='mb-0'>Occupancy Certificate/ Completion Certificate</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
    <div className='col-md-2 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>7f</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
        <p className='mb-0'><br></br>Regularisation Certificate / Order</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
    <div className='col-md-2 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>7g</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
        <p className='mb-0'>Share Certificate</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
    <div className='col-md-2 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>7h</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
        <p className='mb-0'>Latest Property Tax Paid Bill</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
    <div className='col-md-2 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
</div>
<div className='row'>
                     <div className="col-md-12  d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
                          {" "}
                         <b className='mb-0'>BOUNDARIES:</b> {" "} 
                     </div>
</div>
<div className="row">
  <div className="col-md-auto d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', width: '4%', height: 'auto' }}>
     <p className='mb-0'>8</p>
  </div>
  <div className="col-md">
     <div className="row">
           <div className="col-md">
                  <div className="row">
                       <div className="col-md-4 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', height: '60px' }}>
                             <p className='mb-0 text-center'>Direction</p>  
                       </div>
                       <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', height: '60px' }}>
                             <p className='mb-0 text-center'>As per <br />Ownership Documents</p>  
                       </div>
                       <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', height: '60px' }}>
                             <p className='mb-0 text-center'>As per <br />Approved plans</p>  
                       </div>
                       <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', height: '60px' }}>
                             <p className='mb-0 text-center'>As per<br /> Site</p>  
                       </div>
                  </div>
           </div>
     </div>
  </div>
</div>

<div className="row">
  <div className="col-md-*" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
     <p className='mb-0'>8a</p>
  </div>
  <div className="col-md">
    
     <div className="row">
           <div className="col-md">
                  <div className="row">
                       <div className="col-md-4 "  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <p className='mb-0'>East</p>  
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
           </div>
     </div>
  </div>
</div>
<div className="row">
  <div className="col-md-*" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
     <p className='mb-0'>8b</p>
  </div>
  <div className="col-md">
    
     <div className="row">
           <div className="col-md">
                  <div className="row">
                       <div className="col-md-4"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <p className='mb-0'>West</p>  
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
           </div>
     </div>
  </div>
</div>
<div className="row">
  <div className="col-md-*" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
     <p className='mb-0'>8c</p>
  </div>
  <div className="col-md">
    
     <div className="row">
           <div className="col-md">
                  <div className="row">
                       <div className="col-md-4"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <p className='mb-0'>North</p>  
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
           </div>
     </div>
  </div>
</div>
<div className="row">
  <div className="col-md-*" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
     <p className='mb-0'>8d</p>
  </div>
  <div className="col-md">
    
     <div className="row">
           <div className="col-md">
                  <div className="row">
                       <div className="col-md-4"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <p className='mb-0'>South</p>  
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
           </div>
     </div>
  </div>
</div>
<div className='row'>
                     <div className="col-md-12  d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
                          {" "}
                         <b className='mb-0'>TECHNICAL DETAILS:</b> {" "} 
                     </div>
</div>
<div className="row">
  <div className="col-md-auto d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', width: '4%', height: '60px' }}>
     <p className='mb-0'>9</p>
  </div>
  <div className="col-md">
     <div className="row">
           <div className="col-md">
                  <div className="row">
                       <div className="col-md-4 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', height: '60px' }}>
                             <p className='mb-0'>Particulars</p>  
                       </div>
                       <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                             <p className='mb-0'>As per <br />ownership Document</p>  
                       </div>
                       <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                             <p className='mb-0'>As per Approved<br />plans & Permission</p>  
                       </div>
                       <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                             <p className='mb-0'>As per <br />Physical visit</p>  
                       </div>
                  </div>
           </div>
     </div>
  </div>
</div>

<div className="row">
  <div className="col-md-*" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
     <p className='mb-0'>9.a.1</p>
  </div>
  <div className="col-md">
    
     <div className="row">
           <div className="col-md">
                  <div className="row">
                       <div className="col-md-4"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <p className='mb-0'>Area of Land /Plot</p>  
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
           </div>
     </div>
  </div>
</div>
<div className="row">
  <div className="col-md-*" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
     <p className='mb-0'>9.a.2</p>
  </div>
  <div className="col-md">
    
     <div className="row">
           <div className="col-md">
                  <div className="row">
                       <div className="col-md-4"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <p className='mb-0'>Plot Usage</p>  
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
           </div>
     </div>
  </div>
</div>
<div className="row">
  <div className="col-md-*" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
     <p className='mb-0'>9.a.3</p>
  </div>
  <div className="col-md">
    
     <div className="row">
           <div className="col-md">
                  <div className="row">
                       <div className="col-md-4"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <p className='mb-0'>Details of Access</p>  
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
           </div>
     </div>
  </div>
</div>
<div className="row">
  <div className="col-md-*" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
     <p className='mb-0'>9.a.4</p>
  </div>
  <div className="col-md">
    
     <div className="row">
           <div className="col-md">
                  <div className="row">
                       <div className="col-md-4"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <p className='mb-0'>Margin Area/ Set Backs (sqft)</p>  
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
           </div>
     </div>
  </div>
</div>
<div className="row">
  <div className="col-md-*" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
     <p className='mb-0'>9.a.6</p>
  </div>
  <div className="col-md">
    
     <div className="row">
           <div className="col-md">
                  <div className="row">
                       <div className="col-md-4"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <p className='mb-0'>Ownership (Freehold / Leasehold)</p>  
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
  <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
     <p className='mb-0'>9.a.7</p>
  </div>
  <div className="col-md">
    
     <div className="row">
           <div className="col-md">
                  <div className="row">
                       <div className="col-md-4"  style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'31.60%'}}>
                             <p className='mb-0'>If Tenancy</p>  
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                           />
                       </div>
                  </div>
                  <div className="row">
                       <div className="col-md-*"  style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
                           <p className='mb-0'>1</p>
                       </div>
                       <div className="col-md-*"  style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'29.32%'}}>
                           <p className='mb-0'>Name of Owner</p>
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'17.50%'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                       </div>
                  </div>
                  <div className="row">
                       <div className="col-md-*"  style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
                           <p className='mb-0'>2</p>
                       </div>
                       <div className="col-md-*"  style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'29.32%'}}>
                           <p className='mb-0'>Name of Tenant</p>
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'17.50%'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                       </div>
                  </div>
                  <div className="row">
                       <div className="col-md-*"  style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
                           <p className='mb-0'>3</p>
                       </div>
                       <div className="col-md-*"  style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'29.32%'}}>
                           <p className='mb-0'>Rent Agreement/Lease deed details (Date & No.)</p>
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'17.50%'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                       </div>
                  </div>
                  <div className="row">
                       <div className="col-md-*"  style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
                           <p className='mb-0'>4</p>
                       </div>
                       <div className="col-md-*"  style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'29.32%'}}>
                           <p className='mb-0'>Occupation age from Day1</p>
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'29.32%'}}>
                           <p className='mb-0'>From</p>
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'17.50%'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'29.32%'}}>
                           <p className='mb-0'>To</p>
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'17.50%'}}>
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
  <div className="col-md-*" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
     <p className='mb-0'>9.a.8</p>
  </div>
  <div className="col-md">
    
     <div className="row">
           <div className="col-md">
                  <div className="row">
                       <div className="col-md-4"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <p className='mb-0'>Present Occupancy</p>  
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
  <div className="col-md-*" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
     <p className='mb-0'>9.a.9</p>
  </div>
  <div className="col-md">
    
     <div className="row">
           <div className="col-md">
                  <div className="row">
                       <div className="col-md-4"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <p className='mb-0'>Land /Plot Area Considered for Valuation</p>  
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
  <div className="col-md-*" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
     <p className='mb-0'>9.a10</p>
  </div>
  <div className="col-md">
    
     <div className="row">
           <div className="col-md">
                  <div className="row">
                       <div className="col-md-4"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <p className='mb-0'>Agreement Value</p>  
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
  <div className="col-md-*" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
     <p className='mb-0'>9.a11</p>
  </div>
  <div className="col-md">
    
     <div className="row">
           <div className="col-md">
                  <div className="row">
                       <div className="col-md-4"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <p className='mb-0'>Government Guideline Rate(Rs./sqft)</p>  
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
  <div className="col-md-*" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
     <p className='mb-0'>9.a12</p>
  </div>
  <div className="col-md">
    
     <div className="row">
           <div className="col-md">
                  <div className="row">
                       <div className="col-md-4"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <p className='mb-0'>Prevailing Market Rate Range(Rs./sqft)</p>  
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <p className='mb-0'>From</p>  
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                               <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
                       </div>
                       <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <p className='mb-0'>To</p>  
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
  <div className="col-md-*" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
     <p className='mb-0'>9.a13</p>
  </div>
  <div className="col-md">
    
     <div className="row">
           <div className="col-md">
                  <div className="row">
                       <div className="col-md-4"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <p className='mb-0'>Rate Adopted for Valuation</p>  
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
  <div className="col-md-*" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
     <p className='mb-0'>9.a14</p>
  </div>
  <div className="col-md">
    
     <div className="row">
           <div className="col-md">
                  <div className="row">
                       <div className="col-md-4"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <p className='mb-0'>Fair Market Value/ Realisable Value</p>  
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
                    <div className="col-md-*" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
                                  <p className='mb-0'>9.b</p>
                     </div>
                     <div className="col-md"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
                         <b>CONSTRUCTION / APARTMENTS</b>  
                     </div>
</div>
<div className="row">
  <div className="col-md-*" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
     <p className='mb-0'>9.b.1</p>
  </div>
  <div className="col-md">
    
     <div className="row">
           <div className="col-md">
                  <div className="row">
                       <div className="col-md-4"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <p className='mb-0'>Property</p>  
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
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>9.b.2</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <b className='mb-0'>Particulars</b>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <b className='mb-0'>As per ownership Document</b>
    </div>
    <div className='col-md-2 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <b className='mb-0'>As per Approved plans & Permission</b>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <b className='mb-0'>As per Physical visit</b>
    </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>9.b.3</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
        <p className='mb-0'>Usage</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
    <div className='col-md-2 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>9.b.4</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
        <p className='mb-0'>No. of Storey</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
    <div className='col-md-2 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>9.b.5</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
        <p className='mb-0'>Property type</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
    <div className='col-md-2 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>9.b.6</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
        <p className='mb-0'>Structure</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
    <div className='col-md-2 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>9.b.7</p>
    </div>
    <div className="col-md">
          <div className="row">
                        <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'27.50%'}}>
                             <p className='mb-0'>Completion/ Occupancy Date</p>
                        </div>
                        <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'27.50%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
                       </div>
                       <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'17.50%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
                      </div>
                      <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
                     </div>
          </div>
          <div className="row">
                      <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'27.50%'}}>
                             <p className='mb-0'>Residual Age</p>
                      </div>
                      <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'27.50%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
                     </div>
                     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'17.50%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
                     </div>
                     <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
                    </div>
          </div>
    </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>9.b.8</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
        <p className='mb-0'>Carpet Area(SQFT)</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
    <div className='col-md-2 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>9.b.9</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
        <p className='mb-0'>Built up Area(SQFT)</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
    <div className='col-md-2 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p></p>
    </div>
    <div className='col-md-2 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'9.70%'}}>
        <p className='mb-0'>Loading used in %</p>
    </div>
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'26.50%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'16.75%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>9.b10</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
        <p className='mb-0'>Super Built up/ Saleable Area/ Constructed Area(SQFT)</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
    <div className='col-md-2 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p></p>
    </div>
    <div className='col-md-2 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'9.70%'}}>
        <p className='mb-0'>Loading used in %</p>
    </div>
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'26.50%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'16.75%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>9.b11</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
        <p className='mb-0'>FSI</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
    <div className='col-md-2 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
             <p className='mb-0'>As be Bylaws</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'48%'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>9.b12</p>
    </div>
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'26.45%'}}>
        <p className='mb-0'>Structural Condition (Poor,Average,Good,structural stability test required or not)</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>9.b13</p>
    </div>
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'26.45%'}}>
        <p className='mb-0'>Present Occupancy</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>9.b14</p>
    </div>
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'26.45%'}}>
        <p className='mb-0'>Final Area in SQFT Considered for Valuation-</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>9.b15</p>
    </div>
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'26.45%'}}>
        <p className='mb-0'>Final Area in SQFT Considered for Valuation-</p>
    </div>
    <div className='col-md-1 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'26.45%'}}>
        <p className='mb-0'>From</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
    <div className='col-md-1 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'26.45%'}}>
        <p className='mb-0'>To</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>9.b16</p>
    </div>
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'26.45%'}}>
        <p className='mb-0'>Rate Adopted for Valuation</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>9.b17</p>
    </div>
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'26.45%'}}>
        <p className='mb-0'>Fair Market Value / Realisable value</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>9.b18</p>
    </div>
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'26.45%'}}>
        <p className='mb-0'>Depreciation Considered in percentage</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>9.b19</p>
    </div>
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'26.45%'}}>
        <p className='mb-0'>Distress Value</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>9.b20</p>
    </div>
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'26.45%'}}>
        <p className='mb-0'>Unapproved Construction Value (SQFT)</p>
    </div>
    <div className='col-md-1 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'26.45%'}}>
        <p className='mb-0'>Area:</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
    <div className='col-md-1 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'26.45%'}}>
        <p className='mb-0'>Rate:</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
    <div className='col-md-1 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'26.45%'}}>
        <p className='mb-0'>Value:</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>9.b21</p>
    </div>
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'26.45%'}}>
        <p className='mb-0'>Internal and External Amenities</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>9.b22</p>
    </div>
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'26.45%'}}>
        <p className='mb-0'>Violation Observed in %</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>9.b23</p>
    </div>
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'26.45%'}}>
        <p className='mb-0'>Does property fall in Demolition list of Local Regulatory Authority.</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>9.b24</p>
    </div>
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'26.45%'}}>
        <p className='mb-0'>Remarks on Last 3 years average price of property</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>9.b25</p>
    </div>
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'26.45%'}}>
        <p className='mb-0'>Insurable value of Property</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
</div>
<div className='row'>

                        <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
                             <p>10</p>
                      </div>
                     <div className="col-md"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman' }}>
                          {" "}
                         <b>SUMMARY:</b> {" "} 
                     </div>
</div>

<div className="row">
  <div className="col-md-*" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
     <p className='mb-0'>10.a</p>
  </div>
  <div className="col-md">
    
     <div className="row">
           <div className="col-md">
                  <div className="row">
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <p className='mb-0'>Land Value</p>  
                       </div>
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <p className='mb-0'>Approved/Authorised Construction/Unit Value/ Actual</p>  
                       </div>
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <p className='mb-0'>Unapproved/Unauthorised Construction/Unit Value</p>  
                       </div>
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <p className='mb-0'>Interiors & Amenities Cost</p>  
                       </div>
                       <div className="col-md d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <p className='mb-0'>Total Value of Property</p>  
                       </div>
                  </div>
                  <div className="row">
                       <div className="col-md-*"  style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'19%'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                           />
                       </div>
                       <div className="col-md-*"  style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'19.80%'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                           />
                       </div>
                       <div className="col-md-*"  style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'23.15%'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                           />
                       </div>
                       <div className="col-md-*"  style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'19%'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                           />
                       </div>
                       <div className="col-md-*"  style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'19%'}}>
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
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>10.a</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'26.45%'}}>
        <p className='mb-0'>Less for Depreciation @ %@1.5 PA</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'26.45%'}}>
        <p className='mb-0'>Net Value</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                              <ReportCustomTextField
                                formProps={formProps}
                                name="prospect_no"
                               />
    </div>
</div>
<div className='row'>
     <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
        <p>11</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'26.45%'}}>
        <p className='mb-0'>Thus the Final Recommended value For the Said Property (excluding unauthorised construction value) is 0</p>
    </div>
</div>
<div className="row">
  <div className="col-md-auto" style={{ border: '1px solid black', fontFamily: 'Times New Roman', width: '4%' }}>
     <p className='mb-0'></p>
  </div>
  <div className="col-md">
     <div className="row">
           <div className="col-md">
              <div className='row'>
                <div className='col-md-12' style={{ border: '1px solid black' }}>
                    <ol start={1} style={{ textAlign: 'justify', paddingInlineStart: '30px', margin: '10px 0', listStylePosition: 'inside' }}>
                        <li style={{ fontFamily: 'Times New Roman', marginBottom: '0.5em' }}>The property under consideration is 1BHK Flat / Office / Shop / showroom / in B+G+4 storied residential /commercial building with / without lift.</li>
                        <li style={{ fontFamily: 'Times New Roman', marginBottom: '0.5em' }}>Height of the loft/room/gala is 00 feet.</li>
                        <li style={{ fontFamily: 'Times New Roman', marginBottom: '0.5em' }}>As per site observation access to the building is as per norms and road width is …….feet approx.</li>
                        <li style={{ fontFamily: 'Times New Roman', marginBottom: '0.5em' }}>We have received only Index II copy / sale deed / Draft agreement / not legible CC copy / not legible OC copy /layout plan /floor plan dated 00 /00/2018 available for verification.</li>
                        <li style={{ fontFamily: 'Times New Roman', marginBottom: '0.5em' }}>Kindly check the …. at your end before disbursement.</li>
                        <li style={{ fontFamily: 'Times New Roman', marginBottom: '0.5em' }}>At the time of visit we have observed that property was (Self/seller/Tenant/ Vacant) occupied since last --- days/months.</li>
                        <li style={{ fontFamily: 'Times New Roman', marginBottom: '0.5em' }}>As per society name board owner of the unit is XYZ. During our visit we have not observed society name board.</li>
                        <li style={{ fontFamily: 'Times New Roman', marginBottom: '0.5em' }}>Agreement for sale made between ________ on dated are made available for verification (Index no: 123).</li>
                        <li style={{ fontFamily: 'Times New Roman', marginBottom: '0.5em' }}>Unit boundaries are not mentioned in available documents hence Please check at your legal end before disbursement.</li>
                        <li style={{ fontFamily: 'Times New Roman', marginBottom: '0.5em' }}>On site numbering pattern is different than approved plan pattern. Now please take change in numbering pattern confirmation from society/builder letter head before funding wrt approved plan</li>
                        <li style={{ fontFamily: 'Times New Roman', marginBottom: '0.5em' }}>As the age of property more than 10/20 years report released on the basis of available document as per institute Policy.</li>
                        <li style={{ fontFamily: 'Times New Roman', marginBottom: '0.5em' }}>Additional covered car parking of Rs.0000/- can be considered on providing authenticate documents.</li>
                        <li style={{ fontFamily: 'Times New Roman', marginBottom: '0.5em' }}>As per site observation Flat no …. …. are internally merged with single entry from unit no 00.</li>
                        <li style={{ fontFamily: 'Times New Roman', marginBottom: '0.5em' }}>As per site observation work is completed upto RCC ….Floor Brickwork upto…Floor Flooring upto… Plastering upto… Finishing work is in progress.</li>
                        <li style={{ fontFamily: 'Times New Roman', marginBottom: '0.5em' }}>Unit consisting of Loft/Terrace/ basement area …………… Sq Ft. Hence 1/3 area of …………… Sq Ft is considered in valuation as it is documented in agreement for Sale. Kindly check the approved plan for the approval of loft/terrace/basement at your end before disbursement.</li>
                        <li style={{ fontFamily: 'Times New Roman', marginBottom: '0.5em' }}>The said property is APF with the institute hence report release on the area provided by institute</li>
                        <li style={{ fontFamily: 'Times New Roman', marginBottom: '0.5em' }}>As this Top up case valuation done on the basis of area given by institute on mail. we have not verified any technical/ownership documents for valuation.</li>
                        <li style={{ fontFamily: 'Times New Roman', marginBottom: '0.5em' }}>Rera registration no of captioned project is ………</li>
                        <li style={{ fontFamily: 'Times New Roman', marginBottom: '0.5em' }}>During Property Visit………………… met at site who is ……………. His contact number is ……………..It was clearly explained to applicant and that the property visit is being done for the purpose of valuation in relation with the loan proposal with ICICI for which the property would be treated as a security</li>
                      
                    </ol>
                </div>
              </div>
           </div>
     </div>
  </div>
</div>
<br></br>
<div className="row">
  <div className="col-md-auto" style={{ border: '1px solid black', fontFamily: 'Times New Roman', width: '4%' }}>
     <p className='mb-0'></p>
  </div>
  <div className="col-md">
     <div className="row">
           <div className="col-md">
              <div className='row'>
                <div className='col-md-12' style={{ border: '1px solid black' }}>
                    <ol start={20} style={{ textAlign: 'justify', paddingInlineStart: '30px', margin: '10px 0', listStylePosition: 'inside' }}>
                        <li style={{ fontFamily: 'Times New Roman', marginBottom: '0.5em' }}>In our view the work being done for construction/ extension/ improvement in the dwelling unit does not endanger the residents in the dwelling unit and also the structure of the building is suitable for the aforesaid work in the dwelling unit.</li>
                        <li style={{ fontFamily: 'Times New Roman', marginBottom: '0' }}>The captioned property is approved by GP and please check your policy before funding the GP Properties. Kindly check the authenticity of GP CC Plan shared with us at your end and also check your policy before funding the GP Properties. We have considered 30/45/50% sloading on Plan/agreement/Index II Carpet area to Derive SBUA/BUA to furnish the</li>
                    </ol>
                </div>
              </div>
           </div>
     </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HdbReportFormat);
