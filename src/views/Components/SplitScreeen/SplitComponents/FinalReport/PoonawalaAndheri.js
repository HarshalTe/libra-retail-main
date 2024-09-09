
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

function PoonawalaAndheri(props) {
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
        <b >VALUATION REPORT</b>
    </div>
</div>
<div className="row">
    <div className='col-md-3 align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'>Name of Valuation <br></br>Agency</p>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%' }}>
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
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%' }}>
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
                     <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%' }}>
                                   <b className="mb-0">A.</b>
                      </div>

                     <div className="col-md"  style={{ border: '1px solid black',fontFamily: 'Times New Roman'}}>
                          {" "}
                         <b>Broad level Case and Property details:</b> {" "} 
                     </div>
</div>
<div className="row">
    <div className='col-md-3 align-items-center justify-content-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'>Proposal No</p>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%' }}>
        <p className="mb-0">:</p>
    </div>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className='col-md-2 align-items-center justify-content-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'>Case Type</p>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%' }}>
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
    <div className='col-md-3 align-items-center justify-content-center'  style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'>Date of Inspection /<br></br> Site visit</p>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%' }}>
        <p className="mb-0">:</p>
    </div>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className='col-md-2 align-items-center justify-content-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'>Nearest <br></br>Landmark</p>
    </div>
    <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%' }}>
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
         <p className='mb-0 text-left'>Name of the Customer & Contact Details</p>
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
    <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'>Name of Current Owner / Seller</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%' }}>
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
         <p className='mb-0 text-left'>Documents Provided by PFL</p>
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
                    <div className="col-md-*"  style={{ border: '1px solid black',fontFamily: 'Times New Roman',width:'4%'}}>
                          {" "}
                         <b className='mb-0'>B.</b> {" "} 
                     </div>
                     <div className="col-md"  style={{ border: '1px solid black',fontFamily: 'Times New Roman'}}>
                          {" "}
                         <b className='mb-0'>Locational & Property Specific Details (based on site visit)</b> {" "} 
                     </div>
</div>
<div className="row">
    <div className='col-md-3 d-flex  align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'>Status of Land Holding(Freehold/Leasehold)</p>
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
         <p className='mb-0 text-left'>Developed By <br></br>(Self/colonizer<br></br>/Builder/Society<br></br>/Authority/etc.)</p>
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
    <div className='col-md-3 d-flex  align-items-center justify-content-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'><br></br>Type of Property (Flat / row house/ Shop/ Office/ Industrial/ independent bungalow/ vacant Plot/Independent floor/ Resicum commercial/warehouse)</p>
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
         <p className='mb-0 text-left'>Type of Locality (Posh / Upper Class / Middle class / Lower Middle class / Lower class)</p>
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
         <p className='mb-0 text-left'>Width of road in front or adjacent to the property (In Ft) (Largest width in case of multiple access roads)</p>
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
         <p className='mb-0 text-left'>Occupation Status <br></br>(Self / Tenanted /Mixed /under construction/Vacant<br></br>/Seller Occupied)</p>
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
    <div className='col-md-3 d-flex align-items-center justify-content-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <p className='mb-0 text-left'>
          Location/Zoning as per Master Plan (Resi / Commercial / Mixed / Industrial)
        </p>
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
    <div className='col-md-2 d-flex align-items-center justify-content-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <p className='mb-0 text-left'>
           <br></br> Property Usage (Resi / Comm / Mixed / Industrial / Warehouse / Vacant &lt; 12 months / Vacant since &gt; 12 months / Land)
        </p>
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
         <p className='mb-0 text-left'>Plot Demarcation</p>
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
         <p className='mb-0 text-left'>Property Identifiable (Yes /No)</p>
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
         <p className='mb-0 text-left'>Identified Through (legal docs / Site Map/ customer /local enquiry)</p>
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
         <p className='mb-0 text-left'>Within MC Limit</p>
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
<br></br>
<div className="row">
    <div className='col-md-3 d-flex  align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'>Internal Finishing and Amenities available (Lift/Swimming pool/Club House/Park)</p>
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
         <p className='mb-0 text-left'>Type of Structure (RCC / LB / truss roof / Stone roof /ACC or Tin shed / tile roof / Mud house</p>
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
         <p className='mb-0 text-left'>Year of Completion of Property</p>
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
         <p className='mb-0 text-left'>Construction Stage of the Property (in %)</p>
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
         <p className='mb-0 text-left'>Disbursement Recommended (in %)</p>
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
         <p className='mb-0 text-left'>Present Age of the Property</p>
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
         <p className='mb-0 text-left'>Future Physical Life of Property (Residual Age of property)</p>
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
         <p className='mb-0 text-left'>Is OC or Completion Certificate available? If not, reason informed by customer</p>
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
         <p className='mb-0 text-left'>Comment on Fire Exit</p>
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
         <p className='mb-0 text-left'>Flood prone area?</p>
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
         <p className='mb-0 text-left'>Does property fall under restricted or specialized industrial zone?</p>
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
         <p className='mb-0 text-left'>High Tension wire affecting Property?</p>
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
         <p className='mb-0 text-left'>Mobile tower due to which subject mentioned property being affected</p>
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
         <p className='mb-0 text-left'>Does property fall under CRZ? If yes, which category?</p>
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
         <p className='mb-0 text-left'>Approved FAR or FSI Vs. Actual FAR Vs. FSI for building or given flat</p>
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
                     <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%' }}>
                                   <b className="mb-0">c.</b>
                      </div>

                     <div className="col-md"  style={{ border: '1px solid black',fontFamily: 'Times New Roman'}}>
                        
                         <b>Boundaries</b> 
                     </div>
</div>
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
                     <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4%' }}>
                                   <b className="mb-0">D.</b>
                      </div>

                     <div className="col-md"  style={{ border: '1px solid black',fontFamily: 'Times New Roman'}}>
                        
                         <b>Plan Approvals</b> 
                     </div>
</div>
<div className="row">
    <div className='col-md-3 d-flex  align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'>Construction as per approved/sanctioned plans</p>
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
         <p className='mb-0 text-left'>Details of approved plan with approval no and date</p>
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
         <p className='mb-0 text-left'>Construction permission Number and date</p>
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
         <p className='mb-0 text-left'>Occupancy Permission Number & Date</p>
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
         <p className='mb-0 text-left'>If plans not available, then is the structure confirming to the local byelaws.</p>
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
                     <div className="col-md-*"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
                          {" "}
                         <b>E.</b> {" "} 
                     </div>
                     <div className="col-md"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman' }}>
                          {" "}
                         <b>Setbacks / Margin</b> {" "} 
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
<br></br>
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
<div className="row">
    <div className='col-md-* d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'25%' }}>
         <p className='mb-0'>Any Deviation (Acceptable / Non Acceptable)</p>
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
                     <div className="col-md-*"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
                          {" "}
                         <b>F.</b> {" "} 
                     </div>
                     <div className="col-md"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman' }}>
                          {" "}
                         <b>Demolition Risk :: (Yes /No)</b> {" "} 
                     </div>
</div>
<div className='row'>
                     <div className="col-md"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman' }}>
                         <b>No If Yes, specify reason thereof</b> {" "} 
                     </div>
</div>
<div className='row'>
                     <div className="col-md-*"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
                          {" "}
                         <b>H.</b> {" "} 
                     </div>
                     <div className="col-md"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman' }}>
                          {" "}
                         <b>Built-up Area & Accommodation Details</b> {" "} 
                     </div>
</div>
<div className="row">
  <div className="col-md justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
     <p className='mb-0 text-left'>(Pl mention floor wise)</p>
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
     <p className='mb-0'>Actual BUA / Saleable Area (Sft)</p>
 </div>
 <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
    <p className='mb-0'><br></br>Permissible Area (Sft)</p>
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
<div className="row">
  <div className="col-md-*" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'16%' }}>
     <p className='mb-0 text-left'>Violation observed if any</p>
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
</div>
<div className='row'>
                     <div className="col-md-*"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
                          {" "}
                         <b>I.</b> {" "} 
                     </div>
                     <div className="col-md"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman' }}>
                          {" "}
                         <b>Valuation of Property</b> {" "} 
                     </div>
</div>
<div className="row">
    <div className='col-md-* d-flex  align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'16%' }}>
         <p className='mb-0 text-left'>Land Area (In Sqft)</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4.2%' }}>
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
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4.2%' }}>
       <p className="mb-0">:</p>
    </div>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className='col-md d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'>SQ.FT.</p>
    </div>
</div>
<div className="row">
    <div className='col-md-* d-flex  align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'16%' }}>
         <p className='mb-0 text-left'>Current Market Rate of land in the locality (Range) in Rs Per Sqft</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4.2%' }}>
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
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4.2%' }}>
       <p className="mb-0">:</p>
    </div>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className='col-md d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'>SQ.FT.</p>
    </div>
</div>
<div className="row">
    <div className='col-md-* d-flex  align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'16%' }}>
         <p className='mb-0 text-left'>Recommended Rate of Land (Rs per sqft)</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4.2%' }}>
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
    <div className='col-md-* d-flex  align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'16%' }}>
         <p className='mb-0 text-left'>Total Land Value (in Rs)</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4.2%' }}>
        <p className="mb-0">:</p>
    </div>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className='col-md-2 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'>Total Construction Value for present construction stage (in Rs)</p>
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
    <div className='col-md-* d-flex  align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'16%' }}>
         <p className='mb-0 text-left'>Market Value of Land & Building for 100% complete property (in Rs)</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4.2%' }}>
        <p className="mb-0">:</p>
    </div>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className='col-md-2 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'>Market Value of Land & Building for present completed property (in Rs)</p>
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
    <div className='col-md-* d-flex  align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'16%' }}>
         <p className='mb-0 text-left'>Distress Value of 100% complete property</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4.2%' }}>
        <p className="mb-0">:</p>
    </div>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className='col-md-2 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'>Distress Value of present completed property @ (in Rs)</p>
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
    <div className='col-md-* d-flex  align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'16%' }}>
         <p className='mb-0 text-left'>Flat / Apartment / Shop / Office Carpet (As per Document) (in Sqft)</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4.2%' }}>
        <p className="mb-0">:</p>
    </div>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className='col-md-2 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'><br></br>Flat / Apartment / Shop / Office Carpet (As per Measurement) (in Sqft)</p>
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
    <div className='col-md-* d-flex  align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'16%' }}>
         <p className='mb-0 text-left'>Flat / Apartment / Shop /Office Carpet (As per Plan) (in Sqft)</p>
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
<br></br><br></br><br></br>
<div className="row">
    <div className='col-md-* d-flex  align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'16%' }}>
         <p className='mb-0 text-left'>Flat / Apartment / Shop / Office BUA (in Sqft)</p>
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
    <div className='col-md-* d-flex  align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'16%' }}>
         <p className='mb-0 text-left'>Nos of Car Parking</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4.2%' }}>
        <p className="mb-0">:</p>
    </div>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className='col-md-2 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'>Rate / Car Parking</p>
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
    <div className='col-md-* d-flex  align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'16%' }}>
         <p className='mb-0 text-left'>Base rate per sqft of Apartment/ Shop / Flat / Office (Rs per sqft)</p>
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
    <div className='col-md-* d-flex  align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'16%' }}>
         <p className='mb-0 text-left'>Base rate per sqft of Apartment/ Shop / Flat / Office (Rs per sqft)</p>
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
    <div className='col-md-* d-flex  align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'16%' }}>
         <p className='mb-0 text-left'>Area Considered for Valuaton (CA/BUA/SBA)</p>
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
    <div className='col-md-* d-flex  align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'16%' }}>
         <p className='mb-0 text-left'>Total Market Value of Apartment / Shop / Flat / Office</p>
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
    <div className='col-md-* d-flex  align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'16%' }}>
         <p className='mb-0 text-left'>Relizable Value of the Flat (90% of the MV)</p>
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
    <div className='col-md-* d-flex  align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'16%' }}>
         <p className='mb-0 text-left'>Distress Value of Apartment/ Shop / Flat / Office (70% of the MV)</p>
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
    <div className='col-md-* d-flex  align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'16%' }}>
         <p className='mb-0 text-left'>Government Guideline/ Circle rate for Land (Rs per sqft)</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4.2%' }}>
        <p className="mb-0">:</p>
    </div>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className='col-md-2 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'>Land Value as per Government Rate(Rs)</p>
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
    <div className='col-md-* d-flex  align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'16%' }}>
         <p className='mb-0 text-left'>Government Guideline/ Circle rate for Flats (Rs per sqft)</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4.2%' }}>
        <p className="mb-0">:</p>
    </div>
    <div className='col-md-3 d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className='col-md-2 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'><br></br>Flat / Apartment Value as per Government Rate (Rs)</p>
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
    <div className='col-md d-flex  align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'>Final recommended value in words</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className='col-md d-flex  align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'>Value of reconstruction to be considered for property insurance(Rs.)</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className='row'>
                     <div className="col-md-*"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman', width:'4%'}}>
                          {" "}
                         <b>J.</b> {" "} 
                     </div>
                     <div className="col-md"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman' }}>
                          {" "}
                         <b>Property Specific Remarks</b> {" "} 
                     </div>
</div>
<div className='row'>
    <div className='col-md-12' style={{ border: '1px solid black', }}>
          <p className="w-100 text-left" style={{ fontFamily: 'Times New Roman' }}>Remarks :</p>
        <ol style={{ textAlign: 'justify', paddingInlineStart: '30px', margin: '0' }}>
            <li style={{  fontFamily: 'Times New Roman' }}>The property under consideration is 2BHK Flat on 3rd Floor in Ground+4 Floors storied residential building without lift.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>As per site observation access to the building is as per norms and road width is 15 feet approx.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>At the time of visit we have observed that property was self occupied since last 36 years.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>As per society name board owner of the unit is M/s. Fortune.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>We have received xerox copies of Reg. Agreement Deed Of Declaration & Share Certificate available for verification. Kindly check the CC OC & Sanction Plan at your end before disbursement.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>Reg. Agreement for sale made between Mr. Abdulhasan Hasan Barry & Mrs. Sajidabanoo Abdulhasan AND M/s. Fortune Shipping Lines Pvt Ltd dated 15/10/1998 are made available for verification.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>We have considered BUA mentioned in Reg. Agreement to furnish the valuation report.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>Limited open parking facility is available within the society premises.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>As per site inspection Living Room is converted into Bedroom.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>Deed Of Declaration in the name of M/s. Fortune Shipping Lines Pvt Ltd on dated 5th Aug 2009 are made available for verification(5598/2009/Mumbai-1).</li>
        </ol>
    </div>
</div>
<div className="row">
    <div className='col-md-3  d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'>Date of Visit</p>
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
         <p className='mb-0 text-left'>Date of Report Submission</p>
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
    <div className='col-md-3  d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
         <p className='mb-0 text-left'><br></br>Name of Engineer Visited the property</p>
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
         <p className='mb-0 text-left'>Authorized Signatory Name & Signature</p>
    </div>
    <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'4.2%' }}>
       <p className="mb-0">:</p>
    </div>
    <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
       
    </div>
</div>
<br></br><br></br><br></br>
<div className="row">
  
  <div className="col-md">

    <div className="row">
      <div className="col-md">
        <div className='row'>
          <div className='col-md-12' style={{ border: '1px solid black' }}>
            <p className="w-100 text-left p-1 pl-2" style={{ fontFamily: 'Times New Roman' }}>Declaration:-</p>
            <ul style={{ textAlign: 'justify', paddingInlineStart: '30px', margin: '10px' }}>
              <li style={{ fontFamily: 'Times New Roman' }}>Our representative has visited this site. I/We have not verified the title deeds of the properties with the records of the registrar's office as this is beyond the agreed scope of work.Assumptions are made to the best of our knowledge and belief. Reliance is based on the information furnished to us by the identifier AND/OR client.</li>
              <li style={{ fontFamily: 'Times New Roman' }}>The valuer shall not be responsible for the matters of legal nature that affects the value and opinion expressed by us.</li>
              <li style={{ fontFamily: 'Times New Roman' }}>where a sketched plan is attached to this report,it does not purport to represent accurate architectural plans.Sketch plans and photographs are provided as general illustrations only.Documents furnished to us are returned to the client along with the report. We cannot preserve them.</li>
              <li style={{ fontFamily: 'Times New Roman' }}>Fair market value indicated in the report is an opinion of the value prevailing on the date of the said report and is based on market feedback on values of similar properties. Client is free to obtain other independent opinions on the same. Fair, market value of such properties / localities may increase or decrease, depending on the future market conditions & scenarios. value varies with the purpose & date.This report is not to be referred if the purpose is different other than mentioned.No structural survey was conducted by us as it is not in our scope of work</li>
              <li style={{ fontFamily: 'Times New Roman' }}>We hereby declare, “The information furnished above is true and correct to the best of our knowledge and belief. We have no direct or indirect interest in the assets valued.</li>
            </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(PoonawalaAndheri);
