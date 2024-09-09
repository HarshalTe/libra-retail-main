
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

function JanaSmallFinancebankLtd(props) {
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
        <b className='mb-0' >Valuation Format</b>
    </div>
</div>
<div className='row'>
     <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <b className='mb-0' >1</b>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <b className='mb-0 text-left' >CUSTOMER DETAILS</b>
    </div>
</div>
<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >1.1</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Application Number</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >1.6</p>
    </div>
    <div className="col-md d-flex align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Reference Number</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >1.2</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Customer Name</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-* d-flex  justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >1.7</p>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Property owner name as per ownership document</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >1.3</p>
    </div>
    <div className="col-md d-flex align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Date of Inspection</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >1.8</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Visit Done By</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >1.4</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Case Type</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >1.9</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Person met at site</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >1.5</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Contact Number of person met at site</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >1.10</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Relation with customer</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className='row'>
     <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <b className='mb-0' >2</b>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
    </div>
</div>
<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >2.1</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Address of Property</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >2.4</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Legal Address (Survey No. / FP No. / Khasra No./ Plot No)</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >2.2</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Pin Code</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >2.5</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Nearby landmark</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >2.3</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Latitude & Longitude</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >2.6</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Seismic Zone</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className='row'>
     <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <b className='mb-0' >3</b>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
          <b className='mb-0 text-left' >DOCUMENT DETAILS</b>
    </div>
</div>
<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >3.1</p>
    </div>
    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Layout Plan Provided(Y/N)</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman',width:'17%'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Approving Authority</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman',width:'21%'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Approval Number & <br></br>Date</p>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >3.2</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Building Plan Provided(Y/N)</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman',width:'17%'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Approving Authority</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman',width:'21%'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Approval Number & <br></br>Date</p>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >3.3</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Construction Permission (Y/N)</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman',width:'17%'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Approving Authority</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman',width:'21%'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Approval Number & <br></br>Date</p>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >3.4</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Other Legal Document Provided</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman',width:'17%'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Approving Authority</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman',width:'21%'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Approval Number & <br></br>Date</p>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className='row'>
     <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <b className='mb-0' >4</b>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
          <b className='mb-0 text-left' >PHYSICAL DETAILS</b>
    </div>
</div>

<div className="row">
        
     <div className="col-md"> 
        <div className="row">
            <div className="col-md-2 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                  <b className="mb-0 text-left">Four Boundaries of property</b>
            </div>
            <div className="col-md">
                <div className="row">
                   <div className="col-md-* d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
                          <p className="mb-0">4.1</p>
                    </div>
                    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <b className="mb-0">Directions</b>
                    </div>
                    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <b className="mb-0 text-left">East</b>
                    </div>
                    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <b className="mb-0">West</b>
                    </div>
                    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <b className="mb-0">North</b>
                    </div>
                    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <b className="mb-0">South</b>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-* d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
                          <p className="mb-0">4.2</p>
                    </div>
                    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <b className="mb-0">As per Sale <br></br>Deed</b>
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-* d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
                          <p className="mb-0">4.3</p>
                    </div>
                    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <b className="mb-0">Actual at site</b>
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
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
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >4.6</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Plot demarcated at site</p>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >4.7</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Land Use (As per master plan)</p>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >4.8</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' ><br></br>Whether Electricity, water, drainage present in the vicinity (Y/N)</p>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<br></br>
<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >4.9</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' ><br></br>Type of Locality (Residential/Commercial/ Mix/ Industrial/ Others</p>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >4.10</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Class of Locality (Posh/ High/ Middle/Low/ Slum)</p>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >4.11</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Is community dominated area (Yes/No)</p>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >4.12</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Width of public road (ft))</p>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >4.13</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Is property easily located and identified (Yes/No)</p>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >If No, mention reasons</p>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>



<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center px-3" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >4.14</p>
    </div>
    <div className="col-md-* d-flex align-items-center pl-3" style={{ border: '1px solid black', fontFamily: 'Times New Roman', width:'24%'}}>
        <p className='mb-0 text-left'>Property Location (MC/GP/Panchayat under Development Authority)</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'24%'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >4.15</p>
    </div>
    <div className="col-md-* d-flex align-items-center pl-3" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'20%'}}>
        <p className='mb-0 text-left' >Distance from City Center (Km)</p>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>


<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >4.16</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Type of Property (Land /Bungalow /Apartment /Builder Floor/ Factory/Commercial Shop/ Office/ Institute/ Farm House/ <br></br>Others</p>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
                    <div className="col-md-* d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
                          <p className="mb-0">4.17</p>
                    </div>
                    <div className="col-md-* d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'12.60%'}}>
                          <b className="mb-0"><br></br>Apartment Name</b>
                    </div>
                    <div className="col-md-* d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'23.45%'}}>
                         <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <b className="mb-0">Builder Name</b>
                    </div>
                    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                </div>
<div className="row">
        
     <div className="col-md"> 
        <div className="row">
            <div className="col-md-2 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                  <b className="mb-0 text-left">Unit Details</b>
            </div>
            <div className="col-md">

                <div className="row">
                    <div className="col-md-* d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
                          <p className="mb-0">4.18</p>
                    </div>
                    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <b className="mb-0">Detail</b>
                    </div>
                    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <b className="mb-0">No. of Kitchen</b>
                    </div>
                    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <b className="mb-0">No. of Bathrooms</b>
                    </div>
                    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <b className="mb-0">Others</b>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-* d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'28%'}}>
                          <p className="mb-0">Ground Floor</p>
                    </div>
                    <div className="col-md-* d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'24%'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md-* d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'24%'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-* d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'28%'}}>
                          <p className="mb-0">First Floor</p>
                    </div>
                    <div className="col-md-* d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'24%'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md-* d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'24%'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-* d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'28%'}}>
                          <p className="mb-0">Second Floor</p>
                    </div>
                    <div className="col-md-* d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'24%'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md-* d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'24%'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-* d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'28%'}}>
                          <p className="mb-0">Third Floor</p>
                    </div>
                    <div className="col-md-* d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'24%'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md-* d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'24%'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
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
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >4.19</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Structure (Load Bearing/RCC/Mixed)</p>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >4.20</p>
    </div>
    <div className="col-md-* d-flex  align-items-center pl-3" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman',width:'24%'}}>
        <p className='mb-0 text-left' >Interior Quality (Premium/ Average/Satisfactory/ Poor)</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman',width:'24%'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >4.21</p>
    </div>
    <div className="col-md-* d-flex  align-items-center pl-3" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman',width:'20%'}}>
        <p className='mb-0 text-left' >Exterior Quality (Premium/ Average/ Satisfactory/ <br></br>Poor)</p>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >4.22</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Maintenance level (Good/Average/ Poor)</p>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >4.23</p>
    </div>
    <div className="col-md-* d-flex  align-items-center pl-3" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman',width:'24%'}}>
        <p className='mb-0 text-left' >Age of Property (Years)</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman',width:'24%'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >4.24</p>
    </div>
    <div className="col-md-* d-flex  align-items-center  pl-3" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman',width:'20%'}}>
        <p className='mb-0 text-left' >Residual Age of property (Years)</p>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className='row'>
     <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <b className='mb-0' >5</b>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
          <b className='mb-0 text-left' >OCCUPANCY DETAILS</b>
    </div>
</div>
<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center " style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >5.1</p>
    </div>
    <div className="col-md-* d-flex  align-items-center  pl-3" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman',width:'24%'}}>
        <p className='mb-0 text-left' >Status of Occupancy</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman',width:'24%'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >5.3</p>
    </div>
    <div className="col-md-* d-flex  align-items-center pl-3" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman',width:'20%'}}>
        <p className='mb-0 text-left' >Occupied by</p>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >5.2</p>
    </div>
    <div className="col-md-* d-flex  align-items-center pl-3" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman',width:'24%'}}>
        <p className='mb-0 text-left' >Relationship of Occupant with customer</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman',width:'24%'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >5.4</p>
    </div>
    <div className="col-md-* d-flex  align-items-center pl-3" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman',width:'20%'}}>
        <p className='mb-0 text-left' >Occupied Since</p>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className='row'>
     <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <b className='mb-0' >6</b>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
          <b className='mb-0 text-left' >Violations Observed if any</b>
    </div>
</div>
<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >6.1</p>
    </div>
    <div className="col-md-* d-flex  align-items-center pl-3" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman',width:'24%'}}>
        <p className='mb-0 text-left' >Is there encroachment of land<br></br>(Y/N)</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman',width:'24%'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >6.2</p>
    </div>
    <div className="col-md-* d-flex  align-items-center pl-3" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman',width:'20%'}}>
        <p className='mb-0 text-left' >Area of encroachment</p>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >6.3</p>
    </div>
    <div className="col-md-* d-flex  align-items-center pl-3" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman',width:'24%'}}>
        <p className='mb-0 text-left' >Any Deviation in Structure</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman',width:'24%'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >6.4</p>
    </div>
    <div className="col-md-* d-flex  align-items-center pl-3" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman',width:'20%'}}>
        <p className='mb-0 text-left' >Risk of Demolition/Sealing</p>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >6.5</p>
    </div>
    <div className="col-md-* d-flex  align-items-center pl-3" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman',width:'24%'}}>
        <p className='mb-0 text-left' >Is there HT line near to the property?</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman',width:'24%'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >6.6</p>
    </div>
    <div className="col-md-* d-flex  align-items-center pl-3" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman',width:'20%'}}>
        <p className='mb-0 text-left' >Distance of HT line from the property and Voltage in kiloVolt</p>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >6.7</p>
    </div>
    <div className="col-md-* d-flex  align-items-center pl-3" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman',width:'24%'}}>
        <p className='mb-0 text-left' >Is property in buffer zone/no construction zone as per local guidelines</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman',width:'24%'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >6.8</p>
    </div>
    <div className="col-md-* d-flex  align-items-center pl-3" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman',width:'20%'}}>
        <p className='mb-0 text-left' >Details of buffer zone/no construction zone</p>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >6.9</p>
    </div>
    <div className="col-md-* d-flex  align-items-center pl-3" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman',width:'24%'}}>
        <p className='mb-0 text-left' >Is there any litigation notice on the property from any FI</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman',width:'24%'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >6.10</p>
    </div>
    <div className="col-md-* d-flex  align-items-center pl-3" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman',width:'20%'}}>
        <p className='mb-0 text-left' >Details of any notice by FI</p>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >6.11</p>
    </div>
    <div className="col-md-* d-flex  align-items-center pl-3" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman',width:'24%'}}>
        <p className='mb-0 text-left' >Is property near to graveyard/crematorium or burning ghats</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman',width:'24%'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >6.12</p>
    </div>
    <div className="col-md-* d-flex  align-items-center pl-3" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman',width:'20%'}}>
        <p className='mb-0 text-left' >

        </p>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >6.13</p>
    </div>
    <div className="col-md-* d-flex  align-items-center pl-3" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman',width:'24%'}}>
        <p className='mb-0 text-left' >Any other remarks</p>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman',width:'24%'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>

</div>
<div className='row'>
     <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <b className='mb-0' >7</b>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
          <b className='mb-0 text-left' >VALUATION</b>
    </div>
</div>
<div className="row">
        
     <div className="col-md"> 
        <div className="row">
            <div className="col-md-2 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                  <b className="mb-0 text-left">Land Value</b>
            </div>
            <div className="col-md">
                <div className="row">
                    <div className="col-md-* d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
                          <b className="mb-0">7.2</b>
                    </div>
                    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <b className="mb-0">Land Measurement Unit</b>
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md-* d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
                          <b className="mb-0">7.23</b>
                    </div>
                    <div className="col-md-* d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'24%'}}>
                         <b className="mb-0">Land Area</b>
                    </div>
                    <div className="col-md-* d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'24%'}}>
                         <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-* d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
                          <b className="mb-0">7.3</b>
                    </div>
                    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <b className="mb-0">Land Rate</b>
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md-* d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
                          <b className="mb-0">7.24</b>
                    </div>
                    <div className="col-md-* d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'24%'}}>
                         <b className="mb-0">Land Value</b>
                    </div>
                    <div className="col-md-* d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'24%'}}>
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
            <div className="col-md-2 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                  <b className="mb-0 text-left">Permissible FSI</b>
            </div>
            <div className="col-md">

                <div className="row">
                    <div className="col-md-* d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
                          <b className="mb-0">7.3</b>
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md-* d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
                          <b className="mb-0">7.24</b>
                    </div>
                    <div className="col-md-* d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'24%'}}>
                          <b className="mb-0">FSI Considered for valuation</b>
                    </div>
                    <div className="col-md-* d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'24%'}}>
                         <b className="mb-0">As per By laws</b>
                    </div>
                </div>
            </div>
        </div>
     </div>
</div>

<div className="row">
        
     <div className="col-md"> 
        <div className="row">
            <div className="col-md-2 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                  <b className="mb-0 text-left">Existing Construction Value</b>
            </div>
            <div className="col-md">

                <div className="row">
                    <div className="col-md-* d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
                          <b className="mb-0">7.4</b>
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <b className="mb-0">Type of area (Carpet Area/Super Built Up Area/Built Up Area)</b>
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-* d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
                          <b className="mb-0">7.5</b>
                    </div>
                    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <b className="mb-0">Floor</b>
                    </div>
                    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <b className="mb-0">Area (Sqft)</b>
                    </div>
                    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <b className="mb-0">Rate (per Sqft)</b>
                    </div>
                    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <b className="mb-0">Amount (Rs)</b>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-* d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
                          <b className="mb-0">7.6</b>
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-* d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
                          <b className="mb-0">7.7</b>
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-* d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
                          <b className="mb-0">7.8</b>
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-* d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
                          <b className="mb-0">7.9</b>
                    </div>
                    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <b className="mb-0">Total</b>
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
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
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >7.10</p>
    </div>
    <div className="col-md  d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman',width:'24%'}}>
        <p className='mb-0 text-left' >Total Existing Value of Property(A+B)(Rs)</p>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman',width:'24%'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>

</div>
<div className='row'>
    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
          <b className='mb-0' >To Be Filled For Construction & Improvement Cases</b>
    </div>
</div>

<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >7.11</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <b className='mb-0 text-left' >Proposed Construction Details ('C)</b>
    </div>
    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <b className='mb-0 ' >Floor</b>
    </div>
    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <b className='mb-0 ' >Area (Sqft)</b>
    </div>
    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <b className='mb-0 ' >Rate (per Sqft)</b>
    </div>
    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <b className='mb-0  ' >Amount (Rs)</b>
    </div>
</div>

<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >7.12</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>

<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >7.13</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>

<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >7.14</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>

<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >7.15</p>
    </div>
    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <b className='mb-0 ' >Total</b>
    </div>
    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
            <div className="col-md-* d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
                          <p className="mb-0">7.16</p>
            </div>
            <div className="col-md-2 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                  <b className="mb-0 text-left">Cost as per Estimate of Customer (Rs)</b>
            </div>
            <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
            </div>
</div>
<div className="row">
            <div className="col-md-* d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
                          <p className="mb-0">7.17</p>
            </div>
            <div className="col-md-2 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                  <b className="mb-0 text-left">Rate_Sqft as per Estimate of customer(Rs)</b>
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
            <div className="col-md-2 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                  <b className="mb-0 text-left">Description of <br></br>proposed
                  construction/<br></br>improvement</b>
            </div>
            <div className="col-md">

                <div className="row">
                    <div className="col-md-* d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
                          <b className="mb-0">7.18</b>
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <b className="mb-0">Material at site (Yes/No)</b>
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-* d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
                          <b className="mb-0">7.19</b>
                    </div>
                    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <b className="mb-0">Description</b>
                    </div>
                    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <b className="mb-0">Rs. / sqft</b>
                    </div>
                    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <b className="mb-0">Qty.</b>
                    </div>
                    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <b className="mb-0">Total value</b>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',height:'43px'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md-* d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'24%'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md-* d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'24%'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md-* d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'24%'}}>
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
<br></br>
<br></br>


<div className="row">
        
     <div className="col-md"> 
        <div className="row">
            <div className="col-md-* d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
                          <b className="mb-0">7.20</b>
            </div>
            <div className="col-md-2 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                  <b className="mb-0 text-left">Composite Calculation</b>
            </div>
            <div className="col-md">

                <div className="row">
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <b className="mb-0">Value of extra Amenities</b>
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <b className="mb-0">Discription</b>
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <b className="mb-0">Interior</b>
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <b className="mb-0">695 Carpet Area (As Per Registered Agreement)</b>
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
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
            <div className="col-md-* d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
                          <p className="mb-0">7.21</p>
            </div>
            <div className="col-md-2 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                  <b className="mb-0 text-left">Total Fair market Value of Property after completion of pproposed construction(A+B+C)<br></br>(Rs)</b>
            </div>
            <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
            </div>
</div>
<div className="row">
            <div className="col-md-* d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
                          <p className="mb-0">7.22</p>
            </div>
            <div className="col-md-2 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                  <b className="mb-0 text-left">Realisable Value of Property (Rs)</b>
            </div>
            <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
            </div>
</div>
<div className="row">
            <div className="col-md-* d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
                          <p className="mb-0">7.23</p>
            </div>
            <div className="col-md-2 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                  <b className="mb-0 text-left">Valuation as per Govt. Guideline Rate</b>
            </div>
            <div className="col-md-2 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                  <b className="mb-0 text-left">Rate (per sqft))</b>
            </div>
            <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
            </div>
            <div className="col-md-* d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
                          <p className="mb-0">7.24</p>
            </div>
            <div className="col-md-2 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                  <b className="mb-0 text-left">Land value as per Government Guideline Rate (Rs)</b>
            </div>
            <div className="col-md-2 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
            </div>
</div>
<div className="row">
            <div className="col-md-* d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
                          <p className="mb-0">7.25</p>
            </div>
            <div className="col-md-2 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                  <b className="mb-0 text-left">Distressed Value of Property (Rs) (75% of market value)</b>
            </div>
            <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
            </div>
</div>
<div className='row'>
     <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <b className='mb-0' >8</b>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
          <b className='mb-0 text-left' >STAGE OF CONSTRUCTION</b>
    </div>
</div>
<div className="row">
        
     <div className="col-md"> 
        <div className="row">
            <div className="col-md-2 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                  <b className="mb-0 text-left">Based on standard Cost of construction</b>
            </div>
            <div className="col-md">
                <div className="row">
                    <div className="col-md-* d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
                          <b className="mb-0">8.1</b>
                    </div>
                    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <b className="mb-0">Description of Structure (RCC/Load Bearing/ Mix)</b>
                    </div>
                    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <b className="mb-0">(Description of stage)</b>
                    </div>
                    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <b className="mb-0">% Completed</b>
                    </div>
                    <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <b className="mb-0">% Recommended</b>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-* d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%'}}>
                          <b className="mb-0">8.2</b>
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                           formProps={formProps}
                           name="prospect_no"
                         />
                    </div>
                    <div className="col-md-* d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'24%'}}>
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
     <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <b className='mb-0' >9</b>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
          <b className='mb-0 text-left' >Reference Detail</b>
    </div>
</div>

<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >9.1</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Reference Type (Broker/ Builder/ Colonizer/ Neighbor/ Shop Owner/ Valuer</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >9.3</p>
    </div>
    <div className="col-md d-flex align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Reference Name</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >9.2</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Reference Type (Broker/ Builder/ Colonizer/ Neighbor/ Shop Owner/ Valuer</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >9.4</p>
    </div>
    <div className="col-md d-flex align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Reference Contact Number</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className='row'>
     <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <b className='mb-0' >10</b>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
          <b className='mb-0 text-left' >Exceptions</b>
    </div>
</div>
<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >10.1</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Seismic Zone</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >10.10</p>
    </div>
    <div className="col-md d-flex align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Distance from City Center (Km)</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >10.2</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Layout Plan Provided(Y/N)</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >10.11</p>
    </div>
    <div className="col-md d-flex align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Property Location (MC/GP/ Panchayat under Development <br></br>Authority)</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
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

<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >10.3</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Layout Plan Provided(Y/N)</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >10.12</p>
    </div>
    <div className="col-md d-flex align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Property Location (MC/GP/ Panchayat under Development <br></br>Authority)</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >10.4</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Construction Permission(Y/N)</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >10.13</p>
    </div>
    <div className="col-md d-flex align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Residual Age of property (Years)</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >10.5</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Plot demarcated at site</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >10.14</p>
    </div>
    <div className="col-md d-flex align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Risk of Demolition/Sealing</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >10.6</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Plot demarcated at site</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >10.15</p>
    </div>
    <div className="col-md d-flex align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Risk of Demolition/Sealing</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >10.7</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Is community dominated area <br></br>(Yes/No)</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >10.16</p>
    </div>
    <div className="col-md d-flex align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Is there HT line near to the property?</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >10.8</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Width of public road (ft)</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >10.17</p>
    </div>
    <div className="col-md d-flex align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Is property in buffer zone/no construction zone as per local <br></br>guidelines</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >10.9</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Is property easily located and identified <br></br>(Yes/No)</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >10.18</p>
    </div>
    <div className="col-md d-flex align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Is there any litigation notice on the property from any FI</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >10.10</p>
    </div>
    <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' ></p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
        <p className='mb-0' >10.19</p>
    </div>
    <div className="col-md d-flex align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left' >Is property near to graveyard/crematorium or burning ghats</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
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
            <li style={{  fontFamily: 'Times New Roman' }}>The property under consideration is 2 BHK Flat located on 2nd Floor in Ground + 13th storied residential building with 2 Lifts.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>As per site observation access to the building is as per norms and road width is 15 feet approx.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>We have received only Xerox Copies of Registered Agreement Previous Deed of Transfer Previous Index II Previous Registered Agreement CC OC Sale Plan & Share Certificate made available for verification.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>At the time of visit we have observed that property was Self Occupied by Mr. Vikram Appasaheb Hoskalle since last 14 Years.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>Registered Agreement made between M/s. HVC Developers AND Mr. Farid Kamaluddin Sheikh Dated 28/08/2014 made available for verification.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>As per society name board owner of the unit is Mr. Vikram A Hoskalle.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>Registered Agreement for sale made between Mr. Subhash Swaroopchand Jain AND Mr. Vikram Appasaheb Hoskalle Dated 30/11/2010 are made available for verification.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>Previous Deed of Transfer made between Mr. Ramesh Yuraj Kavediya AND Mr. Subhash Swaroopchand Jain on Dated 23/09/2010 made available for verification (Index II Ref No. 10320/2010) Unit boundaries are not mentioned in available documents hence Please check at your legal end before disbursement.</li>
        </ol>
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

export default connect(mapStateToProps, mapDispatchToProps)(JanaSmallFinancebankLtd);
