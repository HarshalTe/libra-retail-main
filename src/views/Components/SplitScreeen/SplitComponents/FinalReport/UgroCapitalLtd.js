
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

function UgroCapitalLtd(props) {
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
        <b className='mb-0' >Technical Valuation Report</b>
    </div>
</div>
<div className='row'>
    <div className="col-md-12 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
        <b className='mb-0' >UGRO CAPITAL LTD- STANDARD VALUATION REPORT FORMAT</b>
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <b className="mb-0">Ref.No:</b>
    </div>
    <div className="col-md-7 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
    <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-2 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
      <p className='mb-0'>Date</p>
    </div>
    <div className="col-md-2 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">1</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 tex-left'>Purpose of Valuation</p>
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
        <p className='mb-0 text-left'>Name of the Customer</p>
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
        <p className='mb-0 text-left'>Documents submitted</p>
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
    <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">5</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 txt-left'>Name of the Property holder</p>
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
        <p className="mb-0">6a</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Property Address as per documents submitted Legal Address of Property (SURVEY_NO .. etc)</p>
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
        <p className="mb-0">6b</p>
    </div>
    <div className="col-md-3 d-flex align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Property address as per site <br></br>visit</p>
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
        <p className="mb-0">6c</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Property Address as per Case initiation</p>
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
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>PIN Code</p>
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
        <p className="mb-0">8</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Name of the occupant as per society board and name Plate</p>
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
        <p className="mb-0">9</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Date of inspection</p>
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
        <p className="mb-0">10</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Person met at site</p>
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
        <p className='mb-0 text-left'>GPS Coordinates</p>
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
<div className='row'>
                     <div className="col-md-12  d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
                          {" "}
                         <b className='mb-0'>PROPERTY DETAILS</b> {" "} 
                     </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">1</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Nature of Property (Land and Building/ Vacant Land)</p>
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
        <p className='mb-0 text-left'>Propety Usage(Residential /Commercial/ Mixed/Industrial/Vacant Land/Others)</p>
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
        <p className="mb-0">3</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Property Sub Type (Occupancy)(Self occupied/Tenanted/Vacant/Under-Construction )</p>
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
        <p className='mb-0 text-left'>Developer/Builder name (if Apartment)</p>
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
        <p className="mb-0">5</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Flat/House/Plot no.</p>
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
        <p className='mb-0 text-left'>No. of Stories</p>
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
        <p className="mb-0">7a</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>No. of Stories</p>
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
        <p className="mb-0">7b</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Unit Details</p>
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
        <p className="mb-0">8</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center " style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>If self occupied, occupied <br></br>since</p>
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
        <p className="mb-0">9</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Name of the Occupant if <br></br>rented</p>
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
        <p className="mb-0">10</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>If Vacant, how long vacant.</p>
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
        <p className='mb-0 text-left'>Property Leasehold/ Freehold</p>
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
        <p className='mb-0 text-left'>Year of Construction of the Building</p>
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
        <p className='mb-0 text-left'>Age of the property (years)</p>
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
        <p className='mb-0 text-left'>Estimated Future Life- Residual Life (years)</p>
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
        <p className='mb-0 text-left'>Plot Demarcated</p>
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
        <p className='mb-0 text-left'>Property Identifed through</p>
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
        <p className='mb-0 text-left'>Approach Road width (ft)</p>
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
        <p className='mb-0 text-left'>Present condition of property and structure</p>
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
        <b className='mb-0 text-left'>Boundary details</b>
    </div>
    <div className="col-md-4 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <b className='mb-0 text-left'>As per site</b>
    </div>
    <div className="col-md-4 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <b className='mb-0 text-left'>As per document</b>
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0"></p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>North</p>
    </div>
    <div className="col-md-4 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-4 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
       <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0"></p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>East</p>
    </div>
    <div className="col-md-4 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-4 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
       <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0"></p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>West</p>
    </div>
    <div className="col-md-4 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-4 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
       <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0"></p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>South</p>
    </div>
    <div className="col-md-4 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
    <div className="col-md-4 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
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
        <p className='mb-0 text-left'>Boundaries matching (actual with Legla docs)</p>
    </div>
    <div className="col-md-8 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
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
        <p className='mb-0 text-left'>If not matching, specify discrepancy</p>
    </div>
    <div className="col-md-8 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
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
        <p className='mb-0 text-left'>Does the Land Fall in an area included in any Town Planning Scheme or any Development Plan of Government or any Statutory Body? If so, give particular.</p>
    </div>
    <div className="col-md-8 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
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
        <p className='mb-0 text-left'>Has any contribution been made towardsdevelopment or any demand for such contribution still outstanding?</p>
    </div>
    <div className="col-md-8 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
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
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">24</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Has any contribution been made towardsdevelopment or any demand for such contribution still outstanding?</p>
    </div>
    <div className="col-md-8 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">25</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Any restriction of the usage of the Property</p>
    </div>
    <div className="col-md-8 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
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
        <p className='mb-0 text-left'>Availability of power Supply</p>
    </div>
    <div className="col-md-8 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className='row'>
                     <div className="col-md-12  d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
                          {" "}
                         <b className='mb-0'>LOCALITY DETAILS</b> {" "} 
                     </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">1</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Location Vicinity(Developed, Developing, Undeveloped, Semi-Urban, Rural)</p>
    </div>
    <div className="col-md-8 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
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
        <p className='mb-0 text-left'>Landmark</p>
    </div>
    <div className="col-md-8 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">3</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Proximity -</p>
    </div>
    <div className="col-md-8 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0"></p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>a) Nearest Railway Station:</p>
    </div>
    <div className="col-md-8 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0"></p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>b)Nearest Bus Stop</p>
    </div>
    <div className="col-md-8 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0"></p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>c)Nearest Hospital</p>
    </div>
    <div className="col-md-8 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0"></p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>d) Distance from City Center</p>
    </div>
    <div className="col-md-8 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
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
        <p className='mb-0 text-left'>Condition of approach Road (Good/Fair/Poor/Kacha <br></br>Sadak)</p>
    </div>
    <div className="col-md-8 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">5</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Mode of Transport to the Property</p>
    </div>
    <div className="col-md-8 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className='row'>
                     <div className="col-md-12  d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
                          {" "}
                         <b className='mb-0'>STRUCTURAL DETAILS</b> {" "} 
                     </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">1</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Type of Construction (RCC, Load Bearing, Steel Structure/Others)</p>
    </div>
    <div className="col-md-8 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
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
        <p className='mb-0 text-left'>Quality of Construction</p>
    </div>
    <div className="col-md-8 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">3</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>No of Floors</p>
    </div>
    <div className="col-md-8 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
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
        <p className='mb-0 text-left'>No. of Flats in each Floor (If Apartment)</p>
    </div>
    <div className="col-md-8 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className='row'>
                     <div className="col-md-12  d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
                          {" "}
                         <b className='mb-0'>QUALITY OF CONSTURUCTION</b> {" "} 
                     </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">A</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <b className='mb-0 text-left'>Exteriors</b>
    </div>
    <div className="col-md-8 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">1</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Beam & Column Structure</p>
    </div>
    <div className="col-md-8 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
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
        <p className='mb-0 text-left'>Appearance & Maintenance of Building.</p>
    </div>
    <div className="col-md-8 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">3</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Common areas -Reception /Staircase /Overhead water tank/Sanitation/ Water Supply</p>
    </div>
    <div className="col-md-8 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
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
        <p className='mb-0 text-left'>Observations such Cracks, Peeling, Sagging Beams, Bending Columns etc., should be reported</p>
    </div>
    <div className="col-md-8 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">B</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <b className='mb-0 text-left'>Interiors</b>
    </div>
    <div className="col-md-8 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">1</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Flooring & Finishing</p>
    </div>
    <div className="col-md-8 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
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
        <p className='mb-0 text-left'>Roofing & Terracing</p>
    </div>
    <div className="col-md-8 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">3</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Quality of Fittings/ Wood work./ Doors and Windows</p>
    </div>
    <div className="col-md-8 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
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
        <p className='mb-0 text-left'>Flooring in toilets/ W.C./ bath, dado</p>
    </div>
    <div className="col-md-8 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">5</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Toilets plumbing lines concealed /open Type of plumbing and san. Fittings, any special fittings, ceiling</p>
    </div>
    <div className="col-md-8 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
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
        <p className='mb-0 text-left'>Electrical installation open or concealed wiring Type of switches tel. points,T.V./ cable points</p>
    </div>
    <div className="col-md-8 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className='row'>
                     <div className="col-md-12  d-flex justify-content-center align-items-center"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman'}}>
                          {" "}
                         <b className='mb-0'>PROPERTY DOCUMENTATION AND DEVIATIONS</b> {" "} 
                     </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0">1</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Construction as per Approved/sanction plan</p>
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
        <p className='mb-0 text-left'>Details of Approved plan & plans with Approval no & Date</p>
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
        <p className="mb-0">3</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Construction Permission number & Date / CC</p>
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
        <p className='mb-0 text-left'>Occupation/ Completion Certificate</p>
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
        <p className="mb-0">5</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Ownership Documents</p>
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
        <p className='mb-0 text-left'>Deviations on the property(Percentage of Deviation to be captured as below- if Applicable)</p>
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
        <p className="mb-0">6a</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Horizontal Deviation</p>
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
        <p className="mb-0">6b</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Vertical Deviation</p>
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
        <p className="mb-0">6c</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Setback Deviation</p>
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
        <p className="mb-0">6d</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Usage Violation</p>
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
        <p className="mb-0">6e</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Unit Violation</p>
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
        <p className="mb-0 text-left">6f</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Others</p>
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
                         <b className='mb-0'>VALUATION OF THE PROPERTY</b> {" "} 
                     </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">1</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Land area as per Deed / UDS area as per deed</p>
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
        <p className="mb-0 text-left">2</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Land area as per actual</p>
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
        <p className="mb-0 text-left">3</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Land area adopted</p>
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
        <p className="mb-0 text-left">4</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Rate adopted for valuation</p>
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
        <p className="mb-0 text-left">5</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Total Land value</p>
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
        <p className="mb-0 text-left">6</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Built up area as per plan ( If provided)</p>
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
        <p className="mb-0 text-left">7</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Built up Area / Super Built up Area as per actual</p>
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
        <p className="mb-0 text-left">8</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Built up Area Adopted</p>
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
        <p className="mb-0 text-left">9</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Carpet area (As per Plan)</p>
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
        <p className="mb-0 text-left">10</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Carpet area (As per Measurement)</p>
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
        <p className="mb-0 text-left">11</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Carpet Area / BUA (As per Document)</p>
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
        <p className="mb-0 text-left">12</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Loading Considered for Valuation</p>
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
        <p className="mb-0 text-left">13</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Area considered for Valuation (SUBA / BUA / Carpet Area)</p>
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
        <p className="mb-0 text-left">14</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Construction rate adopted for valuation / Rate per Sq Ft</p>
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
        <p className="mb-0 text-left">15</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Nos of Car Parking</p>
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
        <p className="mb-0 text-left">16</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Rate / Car Parking</p>
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
        <p className="mb-0 text-left">17</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Total Construction value</p>
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
        <p className="mb-0 text-left">18</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Others (Interiors,Amenties like Sump, OHT, compound ,  <br></br>etc)</p>
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
        <p className="mb-0 text-left">19</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Fair market value of property</p>
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
        <p className="mb-0 text-left">20</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Fair market value of the property (in Words)</p>
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
        <p className="mb-0 text-left">21</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Cirle rate (i.e) Guide line rate for Land</p>
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
        <p className="mb-0 text-left">22</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Realizable Value (90% of Fair market value)</p>
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
        <p className="mb-0 text-left">23</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Forced sale value : (75% of Fair market value)</p>
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
        <p className="mb-0 text-left">24</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Insurable Value</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className='row'>
                     <div className="col-md-12"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman' }}>
                          {" "}
                         <b>MARKETABILITY</b> {" "} 
                     </div>
</div>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">1</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>For sale (Good/Average/Poor)</p>
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
        <p className="mb-0 text-left">2</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>For lease – estimated rental Income (Good/Average/Poor)</p>
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
        <p className="mb-0 text-left">3</p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Volatility of property prices (Good/Average/Poor)</p>
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
        <p className="mb-0 text-left"></p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>1. Details in case if property going for redevelopment</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<br></br>
<br></br>
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left"></p>
    </div>
    <div className="col-md-3 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>2. In case if any notices pertaining to society or collateral on the society notice board information on the<br></br> same.</p>
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
        <p className="mb-0 text-left"></p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>3. Recommended/not recommended for Technical Criteria</p>
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
        <p className="mb-0 text-left"></p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>4. Adverse comments about the property if observed (like dispute with tenant, etc )</p>
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
        <p className="mb-0 text-left"></p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Client Representative Name during Inspection</p>
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
        <p className="mb-0 text-left"></p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Date of Inspection</p>
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
        <p className="mb-0 text-left"></p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Date of Inspection</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
    </div>
</div>
<div className="row">
  <div className="col-md">
    
     <div className="row">
           <div className="col-md">
           <div className='row'>
    <div className='col-md-12' style={{ border: '1px solid black'}}>
    <p className="w-100 text-left p-1 pl-2" style={{ fontFamily: 'Times New Roman',fontWeight:'bold' }}>Remarks</p>
        <ol start={'1'} style={{ textAlign: 'justify', paddingInlineStart: '30px',  }}>
        <li style={{fontFamily: 'Times New Roman',fontWeight:'bold' }}>Unit boundaries are not  mentioned in  available documents  hence Please check at your legal end before disbursement.</li>
           <li style={{fontFamily: 'Times New Roman',fontWeight:'bold' }}>At the time of visit we have observed that property is Self occupied by Abhishek Radheshyam Agrawal since last 1 Years.</li>
           <li style={{fontFamily: 'Times New Roman',fontWeight:'bold' }}>he property under consideration is Shop on 1st Floor in Basement + Ground + 3 storied commercial building with 3 lift.</li>
            <li style={{fontFamily: 'Times New Roman',fontWeight:'bold' }}>As per site observation access to the building is as per norms and road width is 35 feet approx.</li>
            <li style={{fontFamily: 'Times New Roman',fontWeight:'bold' }}>Kindly check the Commencement certificate and Sanction Plan before disbursement.</li>
            <li style={{fontFamily: 'Times New Roman',fontWeight:'bold' }}>During our visit we have not observed society name board.</li>
            <li style={{fontFamily: 'Times New Roman',fontWeight:'bold' }}>Based on site visit it is identified that Shop No 105 and 110 are amalgamated together having single entrance.</li>
            <li style={{fontFamily: 'Times New Roman',fontWeight:'bold' }}>We have received only Xerox copy of Registered Development Agreement CC Sanction Plan & Part BCC are made available for verification. At the time of visit we have observed that property was Self occupied by friend of customer ie. M/s. Millennium English School since last 6 months.</li>
            <li style={{fontFamily: 'Times New Roman',fontWeight:'bold' }}>Agreement for sale made between Sunil Engineers AND Abhishek Radheshyam Agrawal and Neha Abhishek Radheshyam on dated are made available for verification (Index no: 123).</li>
            <li style={{fontFamily: 'Times New Roman',fontWeight:'bold' }}>We have considered Carpet Area of 388 sft as per Plan provided and applied loading 45% for Valuation Purpose. Hence Saleable Area of 563 sft is considered for Valuation.</li>
        </ol>
    </div>
</div>
           </div>
     </div>
  </div>
</div>
<div className='row'>
                     <div className="col-md-12"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman' }}>
                          {" "}
                         <b>DECLARATION</b> {" "} 
                     </div>
</div>
<div className="row">
     <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">1</p>
    </div>
    <div className="col-md-11 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>I have no direct or indirect interest in the property valued.</p>
    </div>
</div> 
<div className="row">
     <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">2</p>
    </div>
    <div className="col-md-11 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Information furnished in the report is true and correct to the best of my knowledge and belief.</p>
    </div>
</div>  
<div className="row">
     <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">3</p>
    </div>
    <div className="col-md-11 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Fair market value indicated in the report is an opinion of the value prevailing on the date of the said report and is based on market feedback on values of similar properties. The client is free to obtain other independent opinions on the same. The fair, market value of such properties/localities may increase or decrease, depending on the future market conditions & scenarios. This report does not certify or confirm any ownership or title of the property that has been valued.</p>
    </div>
</div>
<div className="row">
     <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">4</p>
    </div>
    <div className="col-md-11 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>No structural survey was conducted by us.</p>
    </div>
</div>  
<div className="row">
     <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left">5</p>
    </div>
    <div className="col-md-11 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>I have deputed my representative to Inspect the property. My representative has personally inspected the property.</p>
    </div>
</div> 
<div className="row">
    <div className="col-md-1 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className="mb-0 text-left"></p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Checked By</p>
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
        <p className="mb-0 text-left"></p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Submitted By</p>
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
        <p className="mb-0 text-left"></p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Place</p>
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
        <p className="mb-0 text-left"></p>
    </div>
    <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <p className='mb-0 text-left'>Date</p>
    </div>
    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
        <ReportCustomTextField
            formProps={formProps}
            name="prospect_no"
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(UgroCapitalLtd);
