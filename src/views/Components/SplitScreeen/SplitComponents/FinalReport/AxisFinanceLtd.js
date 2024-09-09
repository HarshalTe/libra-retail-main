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

function AxisFinanceLtd(props) {
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
                     <div className="col-md-12"  style={{ border: '1px solid black',fontFamily: 'Times New Roman' }}>
                          {" "}
                         <b >Axis Finance Ltd</b> {" "} 
                     </div>
               </div>
               <div className='row'>
                     <div className="col-md-12"  style={{ border: '1px solid black',fontFamily: 'Times New Roman' }}>
                         <b>Technical Report</b> 
                     </div>
               </div>
               <div className='row'>
                     <div className="col-md-12"  style={{ border: '1px solid black',fontFamily: 'Times New Roman' }}>
                         <b>Loan Against Property - Flat/ Home Loan - Flat/ Commercial Purchase</b> 
                     </div>
               </div>
           <div className='row'>
               <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                     <b className=" text-left p-1 pl-2 ">Application Number</b>
                </div>
                <div className="col-md-3 d-flex " style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                </div>
                <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                     <b className=" text-left p-1 pl-2 ">Date</b>
                </div>
                <div className="col-md-3 d-flex " style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                </div>
          </div>
               <div className='row'>
                   <div className="col-md-6 d-flex   align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                         <b  className=" text-left p-1 pl-2">Name of the Customer</b>
                  </div>
                  <div className="col-md-6 d-flex " style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                  </div>
              </div>
              <div className='row'>
                   <div className="col-md-6 d-flex   align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                         <b  className=" text-left p-1 pl-2">Name of the Property Owner(S)</b>
                  </div>
                  <div className="col-md-6 d-flex " style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                  </div>
              </div>
              <div className='row'>
                   <div className="col-md-6 d-flex   align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                         <b  className=" text-left p-1 pl-2">Collateral Ownership</b>
                  </div>
                  <div className="col-md-6 d-flex " style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                  </div>
              </div>
              <div className='row'>
                   <div className="col-md-6 d-flex d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                         <b  className=" text-left p-1 pl-2">Collateral Category</b>
                  </div>
                  <div className="col-md-6 d-flex " style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                  </div>
              </div>
              <div className='row'>
                   <div className="col-md-6 d-flex   align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                         <b  className=" text-left p-1 pl-2">Property Documents Received</b>
                  </div>
                  <div className="col-md-6 d-flex " style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                  </div>
              </div>
              <div className='row'>
                   <div className="col-md-6 d-flex align-items-center " style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                         <b  className=" text-left p-1 pl-2">Property details</b>
                  </div>
                  <div className="col-md-6 d-flex " style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                  </div>
              </div>
              <div className='row'>
                   <div className="col-md-6 d-flex align-items-center " style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                         <b  className=" text-left p-1 pl-2">Property Address(postal):</b>
                  </div>
                  <div className="col-md-6 d-flex " style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                  </div>
              </div>
              <div className='row'>
                   <div className="col-md-1 d-flex  align-items-center " style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                         <b  className=" text-left p-1 pl-2">City</b>
                  </div>
                  <div className="col-md-2 d-flex " style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                  </div>
                  <div className="col-md-1 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                         <b  className=" text-left p-1 pl-2">District</b>
                  </div>
                  <div className="col-md-2 d-flex " style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                  </div>
                  <div className="col-md-1 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                         <b  className=" text-left p-1 pl-2">State</b>
                  </div>
                  <div className="col-md-2 d-flex " style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                  </div>
                  <div className="col-md-1 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                         <b  className=" text-left p-1 pl-2">Pin Code</b>
                  </div>
                  <div className="col-md-2 d-flex " style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                  </div>
              </div>
              <div className='row'>
                   <div className="col-md-6 d-flex align-items-center " style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                         <b  className=" text-left p-1 pl-2">Collateral Ownership</b>
                  </div>
                  <div className="col-md-6 d-flex " style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                  </div>
              </div>
             <div className='row'>
                   <div className="col-md-6 d-flex align-items-center " style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                         <b  className=" text-left p-1 pl-2">Nearby Land Mark :</b>
                  </div>
                  <div className="col-md-6 d-flex " style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                  </div>
              </div>
              <div className='row'>
                   <div className="col-md-6 d-flex align-items-center " style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                         <b  className=" text-left p-1 pl-2">Distance from City Center :</b>
                  </div>
                  <div className="col-md-6 d-flex " style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                  </div>
              </div>
              <div className='row'>
                   <div className="col-md-6 d-flex align-items-center " style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                         <b  className=" text-left p-1 pl-2">Classification of Locality (Metro, Rural, Semi Urban)</b>
                  </div>
                  <div className="col-md-6 d-flex " style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                  </div>
              </div>
              <div className='row'>
                   <div className="col-md-6 d-flex align-items-center " style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                         <b  className=" text-left p-1 pl-2">Approved by Town planning authority</b>
                  </div>
                  <div className="col-md-6 d-flex " style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                  </div>
              </div>
              <div className='row'>
                   <div className="col-md-6 d-flex align-items-center " style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                         <b  className=" text-left p-1 pl-2">Locality Classification</b>
                  </div>
                  <div className="col-md-6 d-flex " style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                  </div>
              </div>
              <div className='row'>
                   <div className="col-md-6 d-flex align-items-center " style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                         <b  className=" text-left p-1 pl-2">Building Type</b>
                  </div>
                  <div className="col-md-6 d-flex " style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                  </div>
              </div>
              <div className='row'>
                   <div className="col-md-6 d-flex align-items-center " style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                         <b  className=" text-left p-1 pl-2">Class of Loaclity :</b>
                  </div>
                  <div className="col-md-6 d-flex " style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                  </div>
              </div>
              <div className='row'>
                   <div className="col-md-6 d-flex align-items-center " style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                         <b  className=" text-left p-1 pl-2">Type of Locality: (Industrial, Commercial, Residential, Mix Usage)</b>
                  </div>
                  <div className="col-md-6 d-flex " style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                  </div>
              </div>
              <div className='row'>
                   <div className="col-md-6 d-flex align-items-center " style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                         <b  className=" text-left p-1 pl-2">Condition of Building (Good, Satisfactory, Poor)</b>
                  </div>
                  <div className="col-md-6 d-flex " style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                  </div>
              </div>
          <div className='row'>
               <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                     <b className=" text-left p-1 pl-2 ">Occuapncy Details</b>
                </div>
                <div className="col-md-3 d-flex " style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                </div>
                <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                     <b className=" text-left p-1 pl-2 ">Monthly Rentals for Leased Prop</b>
                </div>
                <div className="col-md-3 d-flex " style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                </div>
          </div>
          <div className='row'>
                   <div className="col-md-6 d-flex align-items-center " style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                         <b  className=" text-left p-1 pl-2">Name of the Lease</b>
                  </div>
                  <div className="col-md-6 d-flex " style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                  </div>
          </div>
          <div className='row'>
                   <div className="col-md-6 d-flex align-items-center " style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                         <b  className=" text-left p-1 pl-2">Type Of Property</b>
                  </div>
                  <div className="col-md-6 d-flex " style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                 </div>
          
         </div>
         <div className='row'>
                   <div className="col-md-6 d-flex align-items-center " style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                         <b  className=" text-left p-1 pl-2">Status Of Property</b>
                  </div>
                  <div className="col-md-6 d-flex " style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                 </div>
          
         </div>
         <div className='row'>
                   <div className="col-md-6 d-flex align-items-center " style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                         <b  className=" text-left p-1 pl-2">Actual Usage Of Property</b>
                  </div>
                  <div className="col-md-6 d-flex " style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                 </div>
          
         </div>
         <div className='row'>
                   <div className="col-md-6 d-flex align-items-center " style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                         <b  className=" text-left p-1 pl-2">Approved Usage of Property</b>
                  </div>
                  <div className="col-md-6 d-flex " style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                 </div>
          
         </div>
         <div className='row'>
                   <div className="col-md-6 d-flex align-items-center " style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                         <b  className=" text-left p-1 pl-2">Distance</b>
                  </div>
                  <div className="col-md-6 d-flex " style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                 </div>
          
         </div>
          <div className='row'>
               <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                     <b className=" text-left p-1 pl-2 ">Quality of Interiors</b>
                </div>
                <div className="col-md-3 d-flex " style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                </div>
                <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                     <b className=" text-left p-1 pl-2 ">Vasthu Compaince or direction of the enterance</b>
                </div>
                <div className="col-md-3 d-flex " style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                </div>
          </div>
          <div className="row">
              <div className="col-md-4 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                    <b  className=" text-left p-1 pl-2">Four Boundaries of the Property</b>
              </div>
              <div className="col-md-2" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                  <b  className=" text-left p-1 pl-2">East</b>
              </div>
              <div className="col-md-2" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                  <b  className=" text-left p-1 pl-2">West</b>
              </div>
              <div className="col-md-2" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                  <b  className=" text-left p-1 pl-2">North</b>
              </div>
              <div className="col-md-2" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                  <b  className=" text-left p-1 pl-2">South</b>
              </div>
         </div>
         <div className="row">
              <div className="col-md-4 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                  <b  className=" text-left p-1 pl-2">As Per submitted Document</b>
              </div>
              <div className="col-md-2" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
              </div>
              <div className="col-md-2" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
              </div>
              <div className="col-md-2" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
              </div>
              <div className="col-md-2" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
              </div>
         </div>
         <div className="row">
              <div className="col-md-4 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                     <b  className=" text-left p-1 pl-2">Actual as per Site</b>
              </div>
              <div className="col-md-2" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
              </div>
              <div className="col-md-2" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
              </div>
              <div className="col-md-2" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
              </div>
              <div className="col-md-2" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                            <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
              </div>
         </div>
         <div className="row">
             <div className="col-md-4 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                     <b className=" text-left p-1 pl-2 ">Width of the abutting Road</b>
                </div>
             <div className="col-md-4" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
             </div>
             <div className="col-md-4" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
             </div>
         </div>
         <div className="row">
               <div className="col-md-4 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                     <b className=" text-left p-1 pl-2 ">Latitude</b>
                </div>
             <div className="col-md-2" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
             </div>
                <div className="col-md-4 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                     <b className=" text-left p-1 pl-2 ">Longitude</b>
                </div>
             <div className="col-md-2" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
             </div>
         </div>
        <div className='row'>
            <div className="col-md-12"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman' }} >
                 <b>Approval Details</b> 
            </div>
        </div>
        <div className="row">
              <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                    <b  className=" text-left p-1 pl-2">Description</b>
              </div>
              <div className="col-md-3" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                  <b  className=" text-left p-1 pl-2">Approval authority</b>
              </div>
              <div className="col-md-3" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                  <b  className=" text-left p-1 pl-2">Approval no</b>
              </div>
              <div className="col-md-3" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                  <b  className=" text-left p-1 pl-2">Approval Date</b>
              </div>
         </div>
         <div className="row">
              <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                  <b  className=" text-left p-1 pl-2">Layout Plan</b>
              </div>
              <div className="col-md-3" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
              </div>
              <div className="col-md-3" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
              </div>
              <div className="col-md-3" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
              </div>
         </div>
         <div className="row">
              <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                  <b  className=" text-left p-1 pl-2">Building/Construction Plan</b>
              </div>
              <div className="col-md-3" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
              </div>
              <div className="col-md-3" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
              </div>
              <div className="col-md-3" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
              </div>
         </div>
         <div className="row">
              <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                  <b  className=" text-left p-1 pl-2">CC details</b>
              </div>
              <div className="col-md-3" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
              </div>
              <div className="col-md-3" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
              </div>
              <div className="col-md-3" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
              </div>
         </div>
         <div className="row">
              <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                  <b  className=" text-left p-1 pl-2">OC / BCC details</b>
              </div>
              <div className="col-md-3" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
              </div>
              <div className="col-md-3" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
              </div>
              <div className="col-md-3" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
              </div>
         </div>
         <div className="row">
              <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                  <b  className=" text-left p-1 pl-2">Age of Buidling</b>
              </div>
              <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
              </div>
              <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                  <b  className=" text-left p-1 pl-2">Estimated Life of Building</b>
              </div>
              <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
              </div>
         </div>
         <div className="row">
              <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                  <b  className=" text-left p-1 pl-2">Construction Year</b>
              </div>
              <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
              </div>
              <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                  <b  className=" text-left p-1 pl-2">Construction Type</b>
              </div>
              <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
              </div>
         </div>
      <div className="row">
              <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                  <b  className=" text-left p-1 pl-2">Maintainence condition of building</b>
              </div>
              <div className="col-md-5 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
              </div>
              <div className="col-md-4 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
              </div>
      </div>
      <div className="row">
              <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                  <b  className=" text-left p-1 pl-2">Construction Quality of building</b>
              </div>
              <div className="col-md-5 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
              </div>
              <div className="col-md-4 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
              </div>
      </div>
      <div className="row">
              <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                  <b  className=" text-left p-1 pl-2">No Of Floors (As per Plan )</b>
              </div>
              <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
              </div>
              <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                  <b  className=" text-left p-1 pl-2">No Of Floors (As per Site )</b>
              </div>
              <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
              </div>
         </div>
         <div className='row'>
            <div className="col-md-12"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman' }} >
                 <b>Valuation of the Property Flat/Shop/Office/</b> 
            </div>
        </div>
        <div className="row">
              <div className="col-md-3  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">Measured Carpet Area</b>
              </div>
              <div className="col-md-2  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
              </div>
              <div className="col-md-1  d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className="">Sq. Ft.</b>
              </div>
              <div className="col-md-3  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">Approved Carpet Area (As per Plan)</b>
              </div>
              <div className="col-md-2  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
              </div>
              <div className="col-md-1  d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className="">Sq. Ft.</b>
              </div>
        </div>
        <div className="row">
              <div className="col-md-3  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">UDS Land</b>
              </div>
              <div className="col-md-2  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
              </div>
              <div className="col-md-1  d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className="">Sq. Ft.</b>
              </div>
              <div className="col-md-3  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">Agreement Carpet Area</b>
              </div>
              <div className="col-md-2  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
              </div>
              <div className="col-md-1  d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className="">Sq. Ft.</b>
              </div>
        </div>
        <div className="row">
              <div className="col-md-3  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">Loading Adopted for Valuation</b>
              </div>
              <div className="col-md-2  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
              </div>
              <div className="col-md-1  d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className="">%</b>
              </div>
              <div className="col-md-3  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">Saleable Area of Unit</b>
              </div>
              <div className="col-md-2  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
              </div>
              <div className="col-md-1  d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className="">Sq. Ft.</b>
              </div>
        </div>
        <div className="row">
              <div className="col-md-3  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">Loading Adopted for Valuation</b>
              </div>
              <div className="col-md-2  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
              </div>
              <div className="col-md-1  d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className="">Sq. Ft.</b>
              </div>
              <div className="col-md-3  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">Saleable Area of Unit</b>
              </div>
              <div className="col-md-3  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
              </div>

        </div>
        <div className="row">
             <div className="col-md-2 d-flex  align-items-center " style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                <b  className=" text-left p-1 pl-2">Floor Rise Rate</b>
             </div>
             <div className="col-md-1" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
             </div>
             <div className="col-md-3 d-flex  align-items-center " style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                <b  className=" text-left p-1 pl-2">Adopted Rate Building</b>
             </div>
             <div className="col-md-1" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
             </div>
             <div className="col-md-2 d-flex  align-items-center " style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                 <b  className=" text-left p-1 pl-2">Market Value Of the Unit</b>
             </div>
             <div className="col-md-3" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
             </div>
        </div>
        <div className="row">
             <div className="col-md-2 d-flex  align-items-center " style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                <b  className=" text-left p-1 pl-2">Car Parking</b>
             </div>
             <div className="col-md-1" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
             </div>
             <div className="col-md-2 d-flex  align-items-center " style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                <b  className=" text-left p-1 pl-2">No. of Car Parking</b>
             </div>
             <div className="col-md-1" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
             </div>
             <div className="col-md-2 d-flex  align-items-center " style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                <b  className=" text-left p-1 pl-2">Parking Area</b>
             </div>
             <div className="col-md-1" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
             </div>
             <div className="col-md-2 d-flex  align-items-center " style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                <b  className=" text-left p-1 pl-2">Parking Area</b>
             </div>
             <div className="col-md-1" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
             </div>
            
        </div>
        <div className="row">
              <div className="col-md-6 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                       <b  className=" text-left p-1 pl-2">Realizable Value (90% of MV)</b>
              </div>
              <div className="col-md-6"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
              </div>
        </div>
        <div className="row">
              <div className="col-md-6 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                       <b  className=" text-left p-1 pl-2">Distress Value (70% of MV)</b>
              </div>
              <div className="col-md-6"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
              </div>
        </div>
        <div className="row">
              <div className="col-md-6 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                       <b  className=" text-left p-1 pl-2">Insurable Value</b>
              </div>
              <div className="col-md-6"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
              </div>
        </div>
        <div className='row'>
            <div className="col-md-12"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman' }} >
                 <b>Unit Details - Row House/ Independent House/Plot Plus Construction/Land</b> 
            </div>
        </div>
        <div className="row">
               <div className="col-md-3  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">Total Area of plot</b>
               </div>
               <div className="col-md-2" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
               </div>
               <div className="col-md-1  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">Sq ft0</b>
               </div>
               <div className="col-md-3  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">Guide Line Rate</b>
               </div>
               <div className="col-md-2" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
               </div>
               <div className="col-md-1  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                    <b  className=" text-left p-1 pl-2">Sq ft0</b>
               </div>
        </div>
        <div className="row">
               <div className="col-md-3  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">Prevailing Market Rate</b>
               </div>
               <div className="col-md-2" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
               </div>
               <div className="col-md-1  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">Rs0</b>
               </div>
               <div className="col-md-3  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">Assessed/adopted rate</b>
               </div>
               <div className="col-md-2" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
               </div>
               <div className="col-md-1  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                    <b  className=" text-left p-1 pl-2">Rs0</b>
               </div>
        </div>
        <div className="row">
               <div className="col-md-9 d-flex  align-items-center justify-content-center"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman' }}>
                   <b>Value of the Land</b> 
               </div>
               <div className="col-md-2" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
               </div>
               <div className="col-md-1  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                    <b  className=" text-left p-1 pl-2">Rs0</b>
               </div>
        </div>
        <div className='row'>
            <div className="col-md-12"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman' }} >
                 <b>Built up Area of the Property</b> 
            </div>
        </div>
        <div className="row">
           <div className="col-md-5  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">Floorwise Break-up</b>
               </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                <b>Cellar & GF</b> 
           </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                <b>FF</b> 
           </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                <b>SF</b> 
           </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                 <b>TF</b> 
           </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                <b>FF</b> 
           </div>
           <div className="col-md-2 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                 <b>Total</b> 
           </div>
        </div>
        <div className="row">
           <div className="col-md-5  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">As per Approval</b>
               </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          /> 
           </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />  
           </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />  
           </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          /> 
           </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />  
           </div>
           <div className="col-md-2 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />  
           </div>
        </div>
        <div className="row">
           <div className="col-md-5  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">Actual at Site</b>
               </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          /> 
           </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />  
           </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />  
           </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          /> 
           </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />  
           </div>
           <div className="col-md-2 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />  
           </div>
        </div>
        <div className="row">
           <div className="col-md-3  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">Deviation</b>
               </div>
           <div className="col-md-2 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          /> 
           </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                       <b><br></br>Sq. Ft.</b> 
           </div>
           <div className="col-md-3 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                       <b>Deviation</b>  
           </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          /> 
           </div>
           <div className="col-md-2 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />  
           </div>
        </div>
        <div className='row'>
            <div className="col-md-12"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman' }} >
                 <b>Setback details of the Property NA</b> 
            </div>
        </div>
        <div className="row">
           <div className="col-md-5  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">Side Margin Details</b>
               </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                <b>Front</b> 
           </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                <b>Left Side</b> 
           </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                <b>Right Side</b> 
           </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                 <b>Rear</b> 
           </div>
           <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                <b>Remarks</b> 
           </div>
        </div>
        <div className="row">
           <div className="col-md-5  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">As per Approval</b>
               </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />  
           </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          /> 
           </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
           <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
        </div>
        <div className="row">
           <div className="col-md-5  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">Actual at Site</b>
               </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />  
           </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          /> 
           </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
           <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
        </div>
        <div className="row">
           <div className="col-md-5  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">Deviation %</b>
               </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />  
           </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          /> 
           </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
           <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
        </div>
        <div className="row">
           <div className="col-md-5  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">Quality of Construction</b>
               </div>
           <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
        </div>
        <div className="row">
           <div className="col-md-5  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">Maintenance of the Property</b>
               </div>
           <div className="col-md d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
        </div>
        <div className='row'>
            <div className="col-md-12"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman' }} >
                 <b>Cost of Construction</b> 
            </div>
        </div>
        <div className="row">
           <div className="col-md-5  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">Floorwise Break-up</b>
               </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                <b>Cellar & GF</b> 
           </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                <b>FF</b> 
           </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                <b>SF</b> 
           </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                 <b>TF</b> 
           </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                <b>FF</b> 
           </div>
           <div className="col-md-2 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                 <b>Total</b> 
           </div>
        </div>
        <div className="row">
           <div className="col-md-5  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">Approved Area Sq ft</b>
               </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          /> 
           </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />  
           </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />  
           </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          /> 
           </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />  
           </div>
           <div className="col-md-2 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />  
           </div>
        </div>
        <div className="row">
           <div className="col-md-5  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">Construction Cost Rs. Per Sq ft</b>
               </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          /> 
           </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />  
           </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />  
           </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          /> 
           </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />  
           </div>
           <div className="col-md-2 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />  
           </div>
        </div>
        <div className="row">
           <div className="col-md-5  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">Construction Cost of Approved area</b>
               </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          /> 
           </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />  
           </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />  
           </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          /> 
           </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />  
           </div>
           <div className="col-md-2 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />  
           </div>
        </div>
        <div className="row">
           <div className="col-md  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">Value of the interiors</b>
               </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                 <b  className=" text-left p-1 pl-2">Rs.</b>
           </div>
           <div className="col-md-2 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />  
           </div>
        </div>
        <div className="row">
           <div className="col-md  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">Depreciation%</b>
               </div>
           <div className="col-md-1 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                 <b  className=" text-left p-1 pl-2">Rs.</b>
           </div>
           <div className="col-md-2 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />  
           </div>
        </div>
        <div className="row">
           <div className="col-md  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">Total construction value</b>
               </div>
           <div className="col-md-3 d-flex  align-items-center justify-content-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />  
           </div>
        </div>
        <div className='row'>
            <div className="col-md-12"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman' }} >
                 <b>Construction Cost ( Its For Plot Plus Construction)</b> 
            </div>
        </div>
        <div className='row'>
            <div className="col-md-12  d-flex  align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman',paddingLeft:0 }} >
                 <b className=" text-left p-1 pl-2">Note : Cost of Construction to be worked out on Approved area only</b> 
            </div>
        </div>
        <div className="row">
              <div className="col-md-3  d-flex  align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                    <b  className=" text-left p-1 pl-2">Estimated Cost Of Construction</b>
              </div>
              <div className="col-md-3  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />  
              </div>
              <div className="col-md-3  d-flex  align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">Vetted Cost Of Construction</b> 
              </div>
              <div className="col-md-3  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                     <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />  
              </div>
        </div>
        <div className="row">
     <div className="col-md-12 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />     
     </div>
</div>
    <div className="row">
               <div className="col-md-3  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">Stage of Construction</b>
               </div>
               <div className="col-md-2" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
               </div>
               <div className="col-md-1  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">%</b>
               </div>
               <div className="col-md-3  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">Recommended For Disbursement</b>
               </div>
               <div className="col-md-2" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
               </div>
               <div className="col-md-1  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                    <b  className=" text-left p-1 pl-2">%</b>
               </div>
        </div>
        <div className="row">
             <div className="col-md-6 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">Recommended construction rate based on the proposed specifications Rs.</b>
             </div>
             <div className="col-md-6"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                    <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
             </div>
        </div>
        <div className="row">
             <div className="col-md-6 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">Recommended Cost of Construction</b>
             </div>
             <div className="col-md-6"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                    <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
             </div>
        </div>
        <div className="row">
             <div className="col-md-6 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">Total Value of property after Completion</b>
             </div>
             <div className="col-md-6"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                    <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
             </div>
        </div>
        <div className='row'>
            <div className="col-md-12"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman' }} >
                 <b>Government Valuation of Independent Property</b> 
            </div>
        </div>
        <div className="row">
               <div className="col-md-3  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">Area of Land</b>
               </div>
               <div className="col-md-2" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
               </div>
               <div className="col-md-1  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">Sq ft</b>
               </div>
               <div className="col-md-3  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">Government Rate</b>
               </div>
               <div className="col-md-2" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
               </div>
               <div className="col-md-1  d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                    <b  className=" text-left p-1 pl-2">Sq ft</b>
               </div>
        </div>
        <div className="row">
             <div className="col-md-6 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">Value of the Land</b>
             </div>
             <div className="col-md-6"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                    <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
             </div>
        </div>
        <div className='row'>
            <div className="col-md-12  d-flex  align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }} >
                 <b className=" text-left p-1 pl-2">Govt Value of the Unit : Rs. (Government Land cost + Construction cost calculated above)NA</b> 
            </div>
        </div>
        <div className="row">
             <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">Distress Value of the Property : Rs.</b>
             </div>
             <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                    <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
             </div>
        </div>
        <div className="row">
             <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">Realizable Value of the Property : Rs.</b>
             </div>
             <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                    <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
             </div>
        </div>
        <div className="row">
             <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">Insurable Value of the Property : Rs.</b>
             </div>
             <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                    <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
             </div>
        </div>
        <div className="row">
             <div className="col-md d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">Red Flag comments :1.</b>
             </div>
             <div className="col-md"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                    <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
             </div>
        </div>
 <div className='row'>
    <div className='col-md-12' style={{ border: '1px solid black', }}>
          <p className="w-100 text-left p-1 pl-2" style={{ fontWeight: 'bold', fontFamily: 'Times New Roman' }}>Remarks :</p>
        <ol style={{ textAlign: 'justify', paddingInlineStart: '30px', margin: '0' }}>
            <li style={{ fontWeight: 'bold', fontFamily: 'Times New Roman' }}>The property under consideration is 2 BHK Flat Located on 10th Floor in Basement + Ground + 3 Podium + 17th Floors residential building with 1 Lift.</li>
            <li style={{ fontWeight: 'bold', fontFamily: 'Times New Roman' }}>As per site observation access to the building is as per norms and road width is 30 feet approx.</li>
            <li style={{ fontWeight: 'bold', fontFamily: 'Times New Roman' }}>We have received Xerox Copies Of Draft Agreement For Sale Builder Allotment Letter Part BCC & Sanctioned Plan made available for verification.</li>
            <li style={{ fontWeight: 'bold', fontFamily: 'Times New Roman' }}>At the time of visit we have observed that property was Vacant.</li>
            <li style={{ fontWeight: 'bold', fontFamily: 'Times New Roman' }}>During our visit society name board was not observed.</li>
            <li style={{ fontWeight: 'bold', fontFamily: 'Times New Roman' }}>Unit boundaries are not mentioned in available documents hence Please check at your legal end before disbursement.</li>
            <li style={{ fontWeight: 'bold', fontFamily: 'Times New Roman' }}>We have considered 50% Loading on Carpet Area as per Sanctioned Plan to furnish the valuation report.</li>
            <li style={{ fontWeight: 'bold', fontFamily: 'Times New Roman' }}>Additional 1 covered car parking value of Rs 700000/- is considered in the above valuation as mentioned in the provided Draft Agreement copy.</li>
            <li style={{ fontWeight: 'bold', fontFamily: 'Times New Roman' }}>Draft Agreement For Sale Made between M/s. Darvesh Properties Pvt Ltd AND Mr. Abdul Wahid Nasir Ahmed & Mr. Abdul Khalid Nasir Ahmed & Mr. Shahid N Rangooni & Mr. Asadullah Nasir Ahmed Dated Year 2023 available for verification.</li>
        </ol>
    </div>
</div>
<div className="row">
             <div className="col-md-6 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                   <b  className=" text-left p-1 pl-2">Recommended Cost of Construction</b>
             </div>
             <div className="col-md-6"  style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                    <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
             </div>
        </div>
<div className="row">
     <div className="col-md-6 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
             <b  className=" text-left p-1 pl-2">Technical Status</b>
     </div>
     <div className="col-md-6" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />  
     </div>
</div>
<div className="row">
     <div className="col-md-12 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
             <b  className=" text-left p-1 pl-2">Undertaking :</b>
     </div>
</div>
<div className="row">
     <div className="col-md-12 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />     
     </div>
</div>
<div className="row">
     <div className="col-md-12 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />     
     </div>
</div>
<div className="row">
     <div className="col-md-12 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />     
     </div>
</div>
<div className="row">
     <div className="col-md-12 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
             <b  className=" text-left p-1 pl-2">Name of The Valuation Agency : Libra Valuers</b>
     </div>
</div>
<div className='row'>
                    <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                        <b  className=" text-left p-1 pl-2 ">Date of Inspection :</b>
                    </div>
                    <div className='col-md-3' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />  
                    </div>
                    <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                        <b  className=" text-left p-1 pl-2">Seal Of the Agency</b>
                    </div>
                    <div className='col-md-3' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           
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

export default connect(mapStateToProps, mapDispatchToProps)(AxisFinanceLtd);
