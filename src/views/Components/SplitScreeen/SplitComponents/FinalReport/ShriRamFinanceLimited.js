
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

function ShriRamFinanceLimited(props) {
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
<div className="row">
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">Report date</p>
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
        <p className="mb-0 text-left">Name of Valuer</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
    <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
      <p className='mb-0'>Registration Number</p>
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
        <p className="mb-0 text-left">Branch Name</p>
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
        <p className="mb-0 text-left">Name of Co-Applicant</p>
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
        <p className="mb-0 text-left">Distance from Shriram Finance Limited - SFL</p>
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
        <p className="mb-0 text-left">Is the same property Valued for another Bank/ HFC/FI</p>
    </div>
    <div className="col-md-9 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
    <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className='row'>
    <div className="col-md-12 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <b className='mb-0' >Property Address & Surrounding Details</b>
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">1</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 tex-left'>Property Type</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">2</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Product</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex  align-items-center justify-content-center " style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">3</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Date of visit</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex  align-items-center justify-content-center " style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">3</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Registered owner same as the proposed Customer</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">4</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Name & Contact No. Seller /Builder/ their <br></br>Representatives</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">5</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 txt-left'>Project /Society Name</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">6</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Builder/ Developer/ Contractor Name</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">7</p>
    </div>
    <div className="col-md-3 d-flex align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>As per ownership Document</p>
    </div>
    <div className="col-md-4 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-4 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">8</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>As per Approved plans</p>
    </div>
    <div className="col-md-4 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-4 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">9</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>As per Physical visit</p>
    </div>
    <div className="col-md-4 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-4 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">10</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Village/Mauja/Gram</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">11</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Taluka /Tehsil/Jilla</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">12</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>District</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">13</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>State</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">14</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Pin Code</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">15</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>GPS Coordinates</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">16</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Nearest Landmark</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">17</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Within The Limits Of</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">18</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Hospitals From property</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">19</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>School & college from <br></br>property</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">20</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Local Market from property</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">21</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Railway Station from <br></br>property</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">22</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Bus Station from property</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">23</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>State Highway from property</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">24</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Police station from property</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-4 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
    </div>
    <div className="col-md-2 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
          <b className='mb-0'>Date</b> {" "} 
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
         <b className='mb-0'>Document No.</b> {" "} 
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <b className='mb-0'>Authority</b> {" "} 
    </div>
</div>
<div className="row">
     <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">25</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Ownership Documents-Sale Deed/sale agreement / Gift Deed /DOD Etc.</p>
    </div>
    <div className="col-md-2 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
     <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">26</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>N.A order & Layout</p>
    </div>
    <div className="col-md-2 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
     <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">27</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Commencement Certificate / Construction Permission / Development Permission</p>
    </div>
    <div className="col-md-2 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
     <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">28</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Approved Building Plan</p>
    </div>
    <div className="col-md-2 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
     <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">29</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>OCC/BCC</p>
    </div>
    <div className="col-md-2 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
     <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">30</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Property Tax Paid Bill Latest</p>
    </div>
    <div className="col-md-2 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className='row'>
    <div className="col-md-12 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <b className='mb-0' >BOUNDARIES</b>
    </div>
</div>

<div className="row">
     <div className="col-md">
        <div className="row">
              <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                  <p className="mb-0">31</p>
              </div>
              <div className="col-md">
                    <div className="row">
                        <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'27.18%'}}>
                             <b className='mb-0'>Direction</b> {" "} 
                        </div>
                        <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <b className='mb-0'>As per Ownership Documents</b> {" "} 
                        </div>
                        <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                              <b className='mb-0'>As per Approved plans</b> {" "} 
                        </div>
                        <div className="col-md d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                             <b className='mb-0'>As per Site</b> {" "} 
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'27.18%'}}>
                              <p className='mb-0'>East</p> {" "} 
                        </div>
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
                        <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                            <ReportCustomTextField
                               formProps={formProps}
                               name="prospect_no"
                             />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'27.18%'}}>
                              <p className='mb-0'>West</p> {" "} 
                        </div>
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
                        <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                            <ReportCustomTextField
                               formProps={formProps}
                               name="prospect_no"
                             />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'27.18%'}}>
                              <p className='mb-0'>North</p> {" "} 
                        </div>
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
                        <div className="col-md" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                               <ReportCustomTextField
                               formProps={formProps}
                               name="prospect_no"
                             />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-* d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman',width:'27.18%'}}>
                              <p className='mb-0'>South</p> {" "} 
                        </div>
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
     <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">32</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Property Demarcation Established</p>
    </div>
    <div className="col-md-2 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
     <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">33</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Property Identification Established</p>
    </div>
    <div className="col-md-2 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
         <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className='row'>
    <div className="col-md-12 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <b className='mb-0' >Structural Details</b>
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">34</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Layout Development in %</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">35</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Age of Property</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">36</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Residual Age</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">37</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Present Occupancy</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">38</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Constrcution start Date</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">39</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Type of Structure</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">40</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>No. of Blocks /Wings/Types</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">41</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>No. of Floors</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">42</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>No. of Units ON each Floor</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">43</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Floor Number</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">44</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>No. of Rooms in property</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">45</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Constrcution Work Progress Status</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">46</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Stage of Construction (% Progress)</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">47</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Stage of Construction (% Recommended)</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">48</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Property usage</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">49</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Access / Approcach Road (Approach Road Foot)</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">50</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Availability of Toilet, Water ,Electricity,Sewerage/Drainage</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">51</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>NDMA Norm only related to Structure Complied</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className='row'>
    <div className="col-md-12 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <b className='mb-0' >Property Area Details</b>
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">52</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>FSI/FAR</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">53</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Lineer Dimesnsions</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">54</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Land /Plot Area</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">55</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Type of Flat / <br></br>Independent Unit</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">56</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Carpet Area <br></br>(As per Agreement)</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">a</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Carpet Area (As per Plan)</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">b</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Carpet Area (As per Measurement)</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">57</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Builtup Area</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">58</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Saleable Area</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">59</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Agreement Value</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">60</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Governemnet Guideline Value</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className='row'>
                     <div className="col-md-12  d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
                          {" "}
                         <b className='mb-0'>VALUATION</b> {" "} 
                     </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
          <b className='mb-0'>Description</b> {" "} 
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
         <b className='mb-0'>Property Areas in sqft</b> {" "} 
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <b className='mb-0'>Rate / Sq Ft</b> {" "} 
    </div>
    <div className="col-md-2 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <b className='mb-0'>Value</b> {" "} 
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">61</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
       <p className='mb-0 text-left'>Plot Area</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-2 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
       <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />    
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">62</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
       <p className='mb-0 text-left'>BUA / SBUA</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-2 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
       <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />    
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">63</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
       <p className='mb-0 text-left'>Ammenities charges/Car parking Lumpsum</p>
    </div>
    <div className="col-md-4 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-4 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">64</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
       <p className='mb-0'>Total Value</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">65</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
       <p className='mb-0'>Distress Value (70% of MV)</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">66</p>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
       <p className='mb-0'>Insurable Value</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
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
            <li style={{  fontFamily: 'Times New Roman' }}>As per site observation access to the building is as per norms and road width is 20 feet approx.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>We have received Xerox copies of Draft Agreement & Share Certificate made available for verification.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>Kindly check the CC Sanctioned Plan or OC at your end before disbursement.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>At the time of visit we have observed that property was Seller Occupied by Mr. Nishant Agarwal since last 18 Years.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>As per Society Name Board owner of the unit is Mr. Basudeo Agarwal.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>Draft Agreement for sale made between Mr. Basudeo Prasad Agarwal AND Mr. Jayesh Hemantkumar Vyas & Mrs. Arti Jayesh Vyas are made available for verification.</li>
        </ol>
    </div>
</div>
<div className='row'>
    <div className='col-md-12' style={{ border: '1px solid black', }}>
          <p className="w-100 text-left" style={{ fontFamily: 'Times New Roman' }}>Remarks :</p>
        <ol start={7} style={{ textAlign: 'justify', paddingInlineStart: '30px', margin: '0' }}>
            <li style={{  fontFamily: 'Times New Roman' }}>As the age of the property is more than 20 years report release on the basis of available documents as per Institute policy.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>We have considered 40% Loading on Carpet area as per Draft Agreement to furnish the valuation report.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>The property under consideration is 2 BHK Flat located on 4th Floor in Ground + 25th Upper storied residential building with 2 Lifts.</li>
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

export default connect(mapStateToProps, mapDispatchToProps)(ShriRamFinanceLimited);
