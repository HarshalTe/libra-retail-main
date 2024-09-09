
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

function DeutscheBankMumbai(props) {
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





        <div className='row justify-content-center align-items-center'>
                   <div className='col-md-12 text-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                       <b>VALUATION REPORT</b>
                   </div>
        </div>
                     <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman',textAlign: 'left'}}>
                               <b>LOS NO/Ref no</b>
                           </div>
                          
                            <div className='col-md' style={{border:'1px solid black'}}>
                                              <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                            </div>
                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman',textAlign: 'left'}}>
                               <b>Dated:</b>
                           </div>
                           
                           <div className='col-md' style={{border:'1px solid black'}}>
                                              <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                     </div>

                    <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman',textAlign: 'left'}}>
                               <b>Name of the Customer</b>
                           </div>
                            <div className='col-md' style={{border:'1px solid black'}}>
                                                <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                            </div>
                     </div>

                    <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman',textAlign: 'left'}}>
                               <b>Property address</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                     </div>
                      <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman',textAlign: 'left'}}>
                               <b>Complete Revenue address of the
                                  property address (covers Survey
                                  number, plot number, CST number,
                                  revenue numbers well as complete
                                  address including Building name, etc.)</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black',textAlign: 'left'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                     </div>
                       <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman',textAlign: 'left'}}>
                               <b>Person met during visit</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                     </div>
                       <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman',textAlign: 'left'}}>
                               <b>Owner as per Agreement to Sell</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                     </div>
                      <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman',textAlign: 'left'}}>
                               <b>Date of physical inspection</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                     </div>
                      <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman',textAlign: 'left'}}>
                               <b>Physical inspection done by</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                     </div>
                       <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman',textAlign: 'left'}}>
                               <b>Date of valuation report</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                     </div>
                      <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman',textAlign: 'left'}}>
                               <b>Valuation initiated by</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                     </div>
                     

         <div className='row justify-content-center align-items-center'>
                   <div className='col-md-12 text-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',textAlign: 'left'}}>
                       <b>1. Locality</b>
                   </div>
        </div>
            <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman',textAlign: 'left'}}>
                               <b>1.1 Name of the locality where the property is situated along with nearest land mark</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
            </div>
             <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman',textAlign: 'left'}}>
                               <b>1.2 Type of locality (Residential,Commercial, Residence cum commercial, industrial area)</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
            </div>
             <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman',textAlign: 'left'}}>
                               <b>1.3 Are civic, social, commercial facilities at close proximity or at least within 1 km radius of the property</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
            </div>
             <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>1.4 Neighborhood Classification(Prime, Good, Average).</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
            </div>
            <div className='row'>
              <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
               <b> <br></br>1.5 Remarks: Pl specify in case the locality is adjacent to a village or any other facility which may adversely affect the property value</b>
           </div>
           <div className='col-md d-flex justify-content-center align-items-center' style={{ border: '1px solid black' }}>
               <ReportCustomTextField
                formProps={formProps}
                name="prospect_no"
              />
         </div>
     </div>

            <div className='row justify-content-center align-items-center'>
                   <div className='col-md-12 text-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',textAlign: 'left'}}>
                       <b>2. Property</b>
                   </div>
        </div>
           <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>2.1 Land freehold or leasehold</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
            </div>
               <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>Boundaries</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                               <b>North</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                               <b>South</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' }}>
                               <b>East</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                               <b>West</b>
                           </div>
                           
            </div>
               <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>2.2 Location of property / plot- describe the location, how it is covered on four sides</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                                <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' }}>
                                                <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman'}}>
                                                <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                           
            </div>
            <div className='row'>

                           <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b><br></br>2.3 Type of property (Independent Bungalow/ Builder Villa (part of project/ Builder Flat/ Plot of Land/Floor in independent bungalow/ commercial shop/ commercial office/industrial area)</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
            </div>
             <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>2.4 Total no. of floors in the building (of entire building)</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
            </div>
              <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>2.5 (A) Minimum construction property? (if applicable)</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
            </div>
               <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>2.6 The floor on which the property in question is located</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
            </div>
               <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>2.7 Whether sanctioned plans of the property are available along with details)</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
            </div>
            <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>2.7a CC /OC No.</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
            </div>
            <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>2.8 Is the construction as per sanctioned plans</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
            </div>
            <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>2.9 (a) If answer to 2.7 is “No” please provide the deviation in percentage terms</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
            </div>
            <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>2.10 Is the construction not as per sanctioned plans but within current prevailing byelaws</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
            </div>
             <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>2.11 (a) If answer to 2.8 is “No” please provide the deviation in percentage terms</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
            </div>
            <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>2.12 Is there any demolition or sealing risk on the property?</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
            </div>
            <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>2.13 Whether Proposed development site is in prohibited / regulated area and prior permission has been obtained from national monuments authority.</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
            </div>
            
         <div className='row justify-content-center align-items-center'>
                   <div className='col-md-12 text-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',textAlign: 'left'}}>
                       <b>3. Details of the property</b>
                   </div>
        </div>
         <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>3.1 Description of the property (Will be a brief description)</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
         </div>
                <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>3.2 Is the property ready? (Yes / under construction)</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                </div>
                  <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>3.2 (a) In case of under construction status, pl mention % completion</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                  </div>
                     <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>3.3 Year of construction</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                  </div>
                     <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>3.4 Is the structure load bearing or RCC</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                  </div>
                  <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>3.5 Residual age of the property (Future life)</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                  </div>
                  <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>3.6 Level of maintenance of property (Good/Average/Need immediate repair)</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                  </div>
                  <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>3.7 Are there any visible damages to the structure (external)</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                  </div>
                   <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>3.8 Are there any visible damages to the structure (internal)</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                  </div>
                    <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>3.9 Describe finishes used in property - Internal Finishes - External Finishes</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                  </div>
                   <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>3.10 Accommodation Details (Floor wise)</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                  </div>
                     <div className='row'>

                           <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b><br></br>3.11 In case of builder/society flat/apartment, pl specific number of car parking and detail the document validating the same</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                  </div>
                    <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>3.12 Occupation status of the property (Self-occupied / Leased / Vacant)</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                  </div>
                           <div className='row'>

                           <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b><br></br>3.13 (A) Occupancy level in % (in case of multi-storey building)</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                  </div>
                  <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>3.14 In case of tenanted property, pl obtain the name of the tenant</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                  </div>
                   <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>3.15 Current usage of the property (Residential/Commercial/Residence cum commercial/ industrial area)</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                  </div>
                        <div className='row'>

                           <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b><br></br>3.16 (a) Pl specify the area used for commercial purpose (in sqft)</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                  </div>
                   <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>3.17 (b) In case of the premises being used for commercial purpose in part or full, is the same approved as per sanction plans or current prevailing byelaws</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                  </div>
                      <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>3.18 Details of amenities: Swimming pool, clubhouse, etc.</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
                  </div>
          <div className='row justify-content-center align-items-center'>
                   <div className='col-md-12 text-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',textAlign: 'left'}}>
                       <b>4. Fair Market Valuation Calculation</b>
                   </div>
        </div>
            <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>4.1 Method used for valuation (comparison method, Income Method, Cost Method or Depreciated Replacement Cost or “Land & Building” (as per local parlance) Method For plots, plot + construction, floor in independent bungalows (new construction with stilt parking)</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
           </div>
             <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>4.2 Land Area as per measurement</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
             </div>
             <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>4.3 % share of plot considered</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
            </div>
            <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>4.4 Land Area considered for valuation</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
            </div>
             <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>4.5 Land rate</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
            </div>
              <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>4.6 Market Value of land</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
            </div>
              <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>4.7 Construction area as per measurement</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
            </div>
               <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>4.8 Constructed area used for valuation</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
            </div>
              <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>4.9 Construction rate</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
            </div>
               <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>4.10 Market value of construction For flats/apartments/floors in independent bungalows (old construction without stilt parking) / builder villa projects</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
            </div>
               <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>4.11 Carpet area (as per measurement)</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
            </div>
              <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>4.12 Area as per Agreement</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
            </div>
              <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>4.13 Area as per approved plan</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
            </div>
            <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>4.14 Built up area/ Super Built-up area</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
            </div>
              <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>4.15 Area considered for valuation</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
            </div>
               <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>4.16 Rate considered</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
            </div>
              <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>4.17 No of Car Parking available</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
            </div>
               <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>4.18 Total Value</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
            </div>
               <div className='row'>

                           <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b><br></br>4.19 Government Guideline Value / Circle Rate used for Stamp Duty. Comments in case of variance in Govt. rate & Market rate.</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
            </div>
            <div className='row justify-content-center align-items-center'>
                   <div className='col-md-12 text-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',textAlign: 'left'}}>
                       <b>5. Resalability/ Marketability (ability to resale)</b>
                   </div>
        </div>
           <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>5.1 Resalability (Good/Average/Poor)<br></br>5.2 In case of poor resalability, pl detail the reason</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
            </div>
            <div className='row justify-content-center align-items-center'>
                   <div className='col-md-12 text-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',textAlign: 'left'}}>
                       <b>6. Leasability/Rentability (ability to be rented/leased out)</b>
                   </div>
        </div>
           <div className='row'>

                           <div className='col-md justify-content-center align-items-center' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b><br></br>6.1 Rentability (Very Good, Good, Normal, Limited, Poor) <br></br>6.1 (a) In case of poor or limited rentability, pl detail the reason</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
            </div>
            <div className='row justify-content-center align-items-center'>
                   <div className='col-md-12 text-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',textAlign: 'left'}}>
                       <b>7. Factors adversely affecting the property (if any):</b>
                   </div>
        </div>
          <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>7.1 Details</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
            </div>
             <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>MARKET VALUE OF THE PROPERTY INCLUDING EXISTING AMENITIES</b>
                           </div>
                           <div className='col-md' style={{border:'1px solid black'}}>
                                               <ReportCustomTextField
                                                 formProps={formProps}
                                                 name="prospect_no"
                                                />
                           </div>
            </div>
            <br></br> 
              <div className='row'>

                           <div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
                               <b>Other Remarks:</b>
                           </div>
                           <div className='col-md' style={{ border: '1px solid black', }}>
          <p className="w-100 text-left" style={{ fontFamily: 'Times New Roman' }}>Remarks :</p>
        <ol style={{ textAlign: 'justify', paddingInlineStart: '30px', margin: '0' }}>
            <li style={{  fontFamily: 'Times New Roman' }}>The property under consideration is 2 BHK Flat located on 3rd Floor in Ground + 3 Podium + 1st to 10th storied residential building with 2 lifts.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>As per site observation access to the building is narrow and road width is 10 feet approx.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>We have received only Xerox Copies of Registered Agreement Index II CC & OC available for verification.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>At the time of visit we have observed that property was Self Occupied By Mr. Dhanvant Shah since last 10 Years.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>As per society name board owner of the unit is Mr. Jignesh Anantrai Modi.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>Registered Agreement for sale made between M/s. Mamtora Enterprises AND Mr. Jignesh Anantrai Modi & Mr. Mitesh Anantrai Modi on Dated 12/05/2012 are made available for verification (Index II No. 4827/2012).</li>
            <li style={{  fontFamily: 'Times New Roman' }}>Unit boundaries are not mentioned in available documents hence Please check at your legal end before disbursement.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>We have considered Built Up Area as per Registered Agreement to furnish the report.</li>
            <li style={{  fontFamily: 'Times New Roman' }}>In provide CC & OC Building No. 2 is mentioned whereas on site and as per provided agrement Building No. is not mentioned hence kindly take society clarification for the same at your end before disbursement.</li>
        </ol>
    </div>
            </div>
      <div className='row justify-content-center align-items-center'>
                   <div className='col-md-12 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman',textAlign: 'left'}}>
                       <b>Please refer Annexure for Climate & Environment checks:</b>
                   </div>
        </div>
        <div className='row justify-content-center align-items-center'>
                   <div className='col-md-12 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman',textAlign: 'left'}}>
                       <p>Declaration I:</p>
                       <p>We, Name of the agency hereby declare that the market value of the subject property is Rs.19426000 /- The same is derived considering the location of the property, location, amenities available and other related factors.</p>
                   </div>
        </div>
        <div className='row justify-content-center align-items-center'>
                   <div className='col-md-12 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman',textAlign: 'left'}}>
                       <p>Declaration II:</p>
                       <p>I confirm that the property is /is not constructed as per sanction plans and within the framework of all local regulatory authorities, as explained in the body of the report.</p>
                   </div>
        </div>
        <div className='row justify-content-center align-items-center'>
                   <div className='col-md-12 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman',textAlign: 'left'}}>
                       <p>We confirm that the above value is based on Comparison of similarly positioned properties which have been transacted or are quoted for transaction (taking into account letting situation and various parameters such as location, area, accessibility, physical condition, surroundings etc</p>
                   </div>
        </div>
        <div className='row justify-content-center align-items-center'>
                   <div className='col-md-12 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman',textAlign: 'left'}}>
                       <p>Disclaimer</p>
                   </div>
        </div>
<div className='row'>
    <div className='col-md-12' style={{ border: '1px solid black', }}>

        <ol style={{ textAlign: 'justify', paddingInlineStart: '30px', margin: '0' }}>
            <li style={{  fontFamily: 'Times New Roman' }}>The property was Inspected by our Executive <b>Ram sukne</b></li>
            <li style={{  fontFamily: 'Times New Roman' }}>We have no direct or indirect interest in the subject property</li>
            <li style={{  fontFamily: 'Times New Roman' }}>We do not certify the structural stability of the subject property ownership and checking of encumbrances are not considered in the scope of report</li>
            <li style={{  fontFamily: 'Times New Roman' }}>where a sketched plan is attached to this report,it does not purport to represent accurate architectural plans.Sketch plans and photographs are provided as general illustrations only.Documents furnished to us are returned to the client along with the report. We cannot preserve them.</li>
        </ol>
    </div>
</div>
<div className='row'>
    <div className='col-md-12' style={{ border: '1px solid black', }}>

        <ol start={5} style={{ textAlign: 'justify', paddingInlineStart: '30px', margin: '0' }}>
            <li style={{  fontFamily: 'Times New Roman' }}>Our representative has visited this site. I/We have not verified the title deeds of the properties with the records of the registrar's office as this is beyond the agreed scope of work.Assumptions are made to the best of our knowledge and belief. Reliance is based on the information furnished to us by the identifier AND/OR client.</li>
             <li style={{  fontFamily: 'Times New Roman' }}>The valuer shall not be responsible for the matters of legal nature that affects the value and opinion expressed by us.</li>
              <li style={{  fontFamily: 'Times New Roman' }}>We hereby declare, “The information furnished above is true and correct to the best of our knowledge and belief. We have no direct or indirect interest in the assets valued.</li>
             <li style={{  fontFamily: 'Times New Roman' }}>Fair market value indicated in the report is an opinion of the value prevailing on the date of the said report and is based on market feedback on values of similar properties. Client is free to obtain other independent opinions on the same. Fair, market value of such properties / localities may increase or decrease, depending on the future market conditions & scenarios. value varies with the purpose & date.This report is not to be referred if the purpose is different other than mentioned.No structural survey was conducted by us as it is not in our scope of work</li>
        </ol>
    </div>
</div>
<div className='row justify-content-center align-items-center'>
                   <div className='col-md-12 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman',textAlign: 'left'}}>
                       <p>For (Libra Valuers)</p>
                   </div>
</div>
<div className='row'>

<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <b>Customer Name:</b>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
</div>
<div className='row'>

<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <b>Reference no.:</b>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
</div>
<div className='row justify-content-center align-items-center'>
                   <div className='col-md-12 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman',textAlign: 'left'}}>
                       <p>Date of technical evaluation report:18-7-2024</p>
                   </div>
</div>
<div className='row justify-content-center align-items-center'>
                   <div className='col-md-12 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman',textAlign: 'left'}}>
                       <p>We (Libra Valuers), hereby declare that the Mortgage Lending Value (as per Deutsche Bank policy) for the property at for the loan appraisal of is (90 % of F.M.V.) Rs. /- Only.</p>
                   </div>
</div>
<div className='row justify-content-center align-items-center'>
                   <div className='col-md-12 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman',textAlign: 'left'}}>
                       <p>Haircut % applied on Market Value</p>
                   </div>
</div>
<div className='row justify-content-center align-items-center'>
                   <div className='col-md-12 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman',textAlign: 'left'}}>
                       <p>Rationale for determining the Mortgage Lending Value: (Location, Surroundings, Age & Maintenance of building.)</p>
                   </div>
</div>
<div className='row justify-content-center align-items-center'>
                   <div className='col-md-12 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman',textAlign: 'left'}}>
                       <p>(Technical Evaluation agency to document the factors considered for determining the Mortgage Lending value in brief and in specific the reasons in case of haircut  10%)</p>
                   </div>
</div>
<div className='row justify-content-center align-items-center'>
                   <div className='col-md-12 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman',textAlign: 'left'}}>
                       <p>Authorised signatory & stamp (For Libra Valuers)</p>
                   </div>
</div>
<div className='row justify-content-center align-items-center'>
                   <div className='col-md-12 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman',textAlign: 'left'}}>
                       <p>Date :</p>
                   </div>
</div>
<div className='row'>

<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p>Authorized Signatory</p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
</div>
<div className='row justify-content-center align-items-center'>
                   <div className='col-md-12 text-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',textAlign: 'left'}}>
                       <b>Annexure for property:</b>
                   </div>
</div>
<div className='row justify-content-center align-items-center'>
                   <div className='col-md-12 text-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',textAlign: 'left'}}>
                       <b>Additional Climate & Environment checks</b>
                   </div>
</div>
<div className='row justify-content-center align-items-center'>
                   <div className='col-md-12 text-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',textAlign: 'left'}}>
                       <b>DOCUMENT DETAILS</b>
                   </div>
</div>
<div className='row'>

<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p>Layout Plan Provided</p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p>Approval date & Number</p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p>Approving Authority</p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
</div>
<div className='row'>

<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p>Building Plan Provided</p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p>Approval date & Number</p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p>Approving Authority</p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
</div>
<div className='row'>

<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p>Construction permission</p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p>Approval date & Number</p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p>Approving Authority</p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
</div>
<div className='row'>

<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p>Pollution Certificate including validity</p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p>Approval date & Number</p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p>Approving Authority</p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
</div>
<div className='row'>

<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p>Availability of Power</p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p></p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p>Surrounding Industry / zone</p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
</div>
<div className='row'>

<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p>Heavy Machinery install in Factory Premises</p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p></p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p>Restriction on Sale /Purchase</p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
</div>
<div className='row'>

<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p>Accessibility / Approach Road</p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p></p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p>Occupancy Level in %</p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
</div>
<div className='row'>

<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p>Lease Hold / Free Hold</p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p></p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p>Occupancy Level in %</p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
</div>
<div className='row'>

<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p>Lease Hold / Free Hold</p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p></p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p>If Lease Hold Period of Lease</p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
</div>
<div className='row'>

<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p>Neighborhood – whether industrial /otherwise... etc.</p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p></p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p></p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
</div>
<div className='row'>

<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p>Type of Usage as per Plan</p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p></p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p>Type of Usage at site</p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
</div>
<div className='row'>

<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p>Property should not have hazardous chemical, no pollution issues.</p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p></p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p></p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
</div>
<div className='row'>

<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p>Whether presence of explosives , polluting materials etc …</p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p></p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p>Presence of approvals from the requisite departments – Fire, Environment, etc…</p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
</div>
<br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
<div className='row justify-content-center align-items-center'>
                   <div className='col-md-12 text-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman',textAlign: 'left'}}>
                       <b>Additional Documents & Remarks</b>
                   </div>
</div>
<div className='row'>

<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p>1) Whether the factory is a polluting industry and may need to be relocated or shut down <br></br> 2) Factors affecting salability / market value (Positive and Negative) --- building beneath a flyover etc.</p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p></p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p></p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
</div>
<div className='row'>

<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p>Authorised signatory & stamp (For Name of the agency)</p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p></p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p></p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
</div>
<div className='row'>

<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p>Name of Visting Engineer:</p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p></p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
                    <ReportCustomTextField
                      formProps={formProps}
                      name="prospect_no"
                     />
</div>
<div className='col-md' style={{border:'1px solid black', fontFamily: 'Times New Roman' ,textAlign: 'left'}}>
    <p></p>
</div>
<div className='col-md' style={{border:'1px solid black'}}>
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

export default connect(mapStateToProps, mapDispatchToProps)(DeutscheBankMumbai);
