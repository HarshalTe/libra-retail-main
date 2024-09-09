import React, { useEffect } from "react";
import { connect } from "react-redux";
import Bottom from "./Bottom";
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
import MapImage from "./MapImage";
import { getdropdownDetailsPage } from "../../../../../Redux/Creators/DropdownDetailsCreators";

export const ReportContext = React.createContext();

function AdityaBirlaFinanceLimited(props) {
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
                         <b >Aditya Birla Finance Limited</b> {" "} 
                     </div>
               </div>
               <div className='row'>
                     <div className="col-md-12"  style={{ border: '1px solid black',fontFamily: 'Times New Roman' }}>
                         <b>Basic Details</b> 
                     </div>
               </div>
               <div className='row'>
               <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                     <b className=" text-left p-1 pl-2 ">Name of the Valuer</b>
                </div>
                <div className="col-md-9"  style={{ border: '1px solid black',fontFamily: 'Times New Roman' }}>
                         <b className="text-left p-1 pl-2">Libra Valuers</b> 
                </div>
               </div>
               <div className='row'>
               <div className="col-md-3 d-flex " style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                         <b  className=" text-left p-1 pl-2">Name of the Client</b>
              </div>
             <div className="col-md-3 d-flex " style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
             </div>
            <div className="col-md-2 d-flex align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                 <b  className=" text-left p-1 pl-2">Initiation Date </b>
            </div>
          <div className="col-md-4 d-flex " style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
         </div>
              </div>
        <div className='row'>
               <div className="col-md-3 d-flex align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                         <b  className=" text-left p-1 pl-2">Vertical</b>
              </div>
             <div className="col-md-3 d-flex " style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
             </div>
            <div className="col-md-2 d-flex align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                 <b  className=" text-left p-1 pl-2">Visit Date</b>
            </div>
          <div className="col-md-4 d-flex" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
         </div>
        </div>
        <div className='row'>
               <div className="col-md-3 d-flex align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                         <b  className=" text-left p-1 pl-2">Case Refernce Number</b>
              </div>
             <div className="col-md-3 d-flex" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
             </div>
            <div className="col-md-2 d-flex align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                 <b  className=" text-left p-1 pl-2">Report Date</b>
            </div>
          <div className="col-md-4 d-flex" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                       <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
         </div>
        </div>
        <div className='row'>
        <div className="col-md-3 d-flex  align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
             <b  className="mb-0">Name of the Property Owner</b>
        </div>
            <div className="col-md-9"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman' }}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
            </div>
        </div>
        <div className='row'>
            <div className="col-md-12"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman' }} >
                 <b>Location Details</b> 
            </div>
        </div>
        <div className='row'>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className="mb-0">Property Address As Per TRF</b>
           </div>
           <div className='col-md-9 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
        </div>
        <div className='row'>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className="mb-0">Property Address As Per Visit</b>
           </div>
           <div className='col-md-9' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
        </div>
        <div className='row'>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Property Address As Per Legal Documents</b>
           </div>
           <div className='col-md-9 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
        </div>
        <div className='row'>
               <div className="col-md-3 d-flex align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                         <b  className=" text-left p-1 pl-2">Main Locality</b>
              </div>
             <div className="col-md-3" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
             </div>
            <div className="col-md-2 d-flex align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                 <b  className=" text-left p-1 pl-2">Sub Locality</b>
            </div>
          <div className="col-md-4" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
         </div>
        </div>
        <div className='row'>
               <div className="col-md-3 d-flex align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                         <b  className=" text-left p-1 pl-2">Micro Location</b>
              </div>
             <div className="col-md-3" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
             </div>
            <div className="col-md-2 d-flex align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                 <b  className=" text-left p-1 pl-2">Landmark</b>
            </div>
          <div className="col-md-4 d-flex" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
         </div>
        </div>
        <div className='row'>
               <div className="col-md-3 d-flex align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                         <b  className=" text-left p-1 pl-2">Latitude</b>
              </div>
             <div className="col-md-3" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                        <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
             </div>
            <div className="col-md-2 d-flex align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                 <b  className=" text-left p-1 pl-2">Longitude</b>
            </div>
          <div className="col-md-4 " style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
         </div>
        </div>
        <div className='row'>
               <div className="col-md-4 d-flex align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                         <b  className=" text-left p-1 pl-2">Has the Valuator Done Valuation for this property before? </b>
              </div>
             <div className="col-md-2 " style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
             </div>
            <div className="col-md-2 d-flex align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                 <b  className=" text-left p-1 pl-2">If Yes, when</b>
            </div>
          <div className="col-md-4 " style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
         </div>
        </div>
        <div className='row'>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Property Type</b>
           </div>
           <div className='col-md-9' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
        </div>
        <div className='row'>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Property Sub Type</b>
           </div>
           <div className='col-md-9' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
        </div>
        <div className='row'>
               <div className="col-md-3 d-flex align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                         <b  className=" text-left p-1 pl-2">Locality</b>
              </div>
             <div className="col-md-2" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
             </div>
            <div className="col-md-4 d-flex align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                 <b  className=" text-left p-1 pl-2">Property Falling Within</b>
            </div>
          <div className="col-md-3" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
         </div>
        </div>
        <div className='row'>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Occupancy Level of the Surrounding</b>
           </div>
           <div className='col-md-9' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
        </div>
        <div className='row'>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Condition of the Site of the Property</b>
           </div>
           <div className='col-md-9' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
        </div>
        <div className='row'>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2 ">Distance to Railway Station </b>
           </div>
           <div className='col-md-9' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
        </div>
        <div className='row'>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Distance to Bus Stop</b>
           </div>
           <div className='col-md-9' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
    </div>
    <div className='row'>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Distance of Plot From Main Road</b>
           </div>
           <div className='col-md-9' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
    </div>
    <div className='row'>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Distance from City Center</b>
           </div>
           <div className='col-md-9' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
    </div>
    <div className='row'>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Distance from ABFL Branch</b>
           </div>
           <div className='col-md-9' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
    </div>
    <div className='row'>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Distance from ABFL Branch</b>
           </div>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Width (Facing Road Side) in feet</b>
           </div>
           <div className='col-md-2' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
           <div className='col-md-2 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2"> Depth in Feet</b>
           </div>
           <div className='col-md-2 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                       <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
    </div>
    <div className='row'>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Physical Approach to the Property</b>
           </div>
           <div className='col-md-9' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
    </div>
    <div className='row'>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Legal Approach to the Property</b>
           </div>
           <div className='col-md-9' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
    </div>
    <div className='row'>
           <div className='col-md-8 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Any other features like board of other financier indicating mortgage, notice of Court/any authority which may affect the security</b>
           </div>
           <div className='col-md-4' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
    </div>
    <div className='row'>
        <div className="col-md-12"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman' }}>
            <b>Property Details</b> 
        </div>
    </div>
    <div className='row'>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Occupancy</b>
           </div>
           <div className='col-md-3' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Occupied By</b>
           </div>
           <div className='col-md-3' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
    </div>
    <div className='row'>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Occupied Since</b>
           </div>
           <div className='col-md-3' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Occupied By</b>
           </div>
           <div className='col-md-3' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
    </div>
    <div className='row'>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Occupied Since</b>
           </div>
           <div className='col-md-3' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Name of the Occupant</b>
           </div>
           <div className='col-md-3' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
    </div>
    <div className='row'>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Property Demarcated</b>
           </div>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Property Identification</b>
           </div>
           <div className='col-md-3' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
    </div>
    <div className='row'>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Project Category</b>
           </div>
           <div className='col-md-3' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Identification Through</b>
           </div>
           <div className='col-md-3' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
    </div>
    <div className='row'>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Flat Configuration</b>
           </div>
           <div className='col-md-3' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Flat Type</b>
           </div>
           <div className='col-md-3' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
    </div>
    <div className='row'>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Type of Structure </b>
           </div>
           <div className='col-md-3' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                       <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />   
           </div>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Property Holding</b>
           </div>
           <div className='col-md-3' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                       <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
    </div>
    <div className='row'>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Total No. of Floors</b>
           </div>
           <div className='col-md-3' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                      <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Area of Plot</b>
           </div>
           <div className='col-md-3' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
    </div>
    <div className='row'>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Amenities</b>
           </div>
           <div className='col-md-3' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          /> 
           </div>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Lift Facility</b>
           </div>
           <div className='col-md-3' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
    </div>
    <div className='row'>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">View of the Property </b>
           </div>
           <div className='col-md-3' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                       <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          /> 
           </div>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2"> Marketability </b>
           </div>
           <div className='col-md-3' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
    </div>
    <div className='row'>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Quality of Construction </b>
           </div>
           <div className='col-md-3' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          /> 
           </div>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Parking Facility</b>
           </div>
           <div className='col-md-3' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
    </div>
    <div className='row'>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Shape of the Property</b>
           </div>
           <div className='col-md-3' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Type of Parking</b>
           </div>
           <div className='col-md-3' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
    </div>
    <div className='row'>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Exteriors of the Property</b>
           </div>
           <div className='col-md-3' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                      <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Interiors of the Property </b>
           </div>
           <div className='col-md-3' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
    </div>
    <div className='row'>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Maintenance of the Property</b>
           </div>
           <div className='col-md-3' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          /> 
           </div>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Placement of the Property</b>
           </div>
           <div className='col-md-3' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
    </div>
    <div className='row'>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Age of the Property</b>
           </div>
           <div className='col-md-3' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          /> 
           </div>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Residual Age</b>
           </div>
           <div className='col-md-3' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
    </div>
    <div className='row'>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className="mb-0">Source of Age of the Property</b>
           </div>
           <div className='col-md-3' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b className="mb-0">Cautious Location</b>
           </div>
           <div className='col-md-3' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
    </div>
    <div className='row'>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b className=" text-left p-1 pl-2">Unit Details</b>
           </div>
           <div className='col-md-2' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b className=" text-left p-1 pl-2">Drawing Room</b>
           </div>
           <div className='col-md-1 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b className=" text-left p-1 pl-2">Bedroom</b>
           </div>
           <div className='col-md-2' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b className=" text-left p-1 pl-2"> Dining Room</b>
           </div>
           <div className='col-md-1' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b className=" text-left p-1 pl-2">Kitchen</b>
           </div>
           <div className='col-md-2' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b className=" text-left p-1 pl-2">Bathroom</b>
           </div>
           <div className='col-md-1' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b className=" text-left p-1 pl-2">Balcony</b>
           </div>
    </div>
    <div className='row'>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b className=" text-left p-1 pl-2">2nd Floor</b>
           </div>
           <div className='col-md-2' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
           <div className='col-md-1' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
           <div className='col-md-2' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
           <div className='col-md-1' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
           <div className='col-md-2' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
           <div className='col-md-1' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
       </div>
       <div className='row'>
                     <div className="col-md-12"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman' }}>
                         <b>Documentation Details</b> 
                     </div>
    </div>
    <div className='row'>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Documents Available </b>
           </div>
           <div className='col-md-9' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                    <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />    
           </div>
    </div>
    <div className='row'>
           <div className='col-md-3 d-flex align-items-center text-left' style={{ border: '1px solid black', fontFamily: 'Times New Roman',paddingLeft: 0}}>
               <b  className="p-1 pl-2">Details of<br></br> Documents Available</b>
           </div>
           <div className='col-md-9' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                        <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
    </div>
    <div className='row'>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Details of Approval (Plan,CC,OC)</b>
           </div>
           <div className='col-md-9' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />   
           </div>
    </div>
    <div className='row'>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Set Back in Case of L+B</b>
           </div>
           <div className='col-md-2 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">As per Plan </b>
           </div>
           <div className='col-md-2 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">As per Site</b>
           </div>
           <div className='col-md-2 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Deviations </b>
           </div>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Remarks</b>
           </div>
    </div>
    <div className='row'>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Front </b>
           </div>
           <div className='col-md-2' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                       <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
           <div className='col-md-2' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                       <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          /> 
           </div>
           <div className='col-md-2' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
           <div className='col-md-3' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
    </div>
    <div className='row'>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Side (L)</b>
           </div>
           <div className='col-md-2' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
           <div className='col-md-2 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
           <div className='col-md-2' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
             
           </div>
           <div className='col-md-3' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                       <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
    </div>
    <div className='row'>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2">Side(R) </b>
           </div>
           <div className='col-md-2' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
           <div className='col-md-2' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                        <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
           <div className='col-md-2' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
           <div className='col-md-3' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
    </div>
    <div className='row'>
           <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
               <b  className=" text-left p-1 pl-2 ">Back</b>
           </div>
           <div className='col-md-2' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          /> 
           </div>
           <div className='col-md-2' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
           <div className='col-md-2' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
           <div className='col-md-3' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                      <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
           </div>
    </div>
    <div className='row'>
                     <div className="col-md-12"  style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman' }}>
                         <b>Area Details</b> 
                     </div>
    </div>
    <div className='row'>
                    <div className="col-md-3 " style={{ border: '1px solid black', fontFamily: 'Times New Roman', textAlign: 'center' }}>
                        <b >Detailing</b>
                    </div>
                    <div className="col-md-9" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman' }}>
                        <b>Area in Sqft</b>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                        <b  className=" text-left p-1 pl-2">Plot Area (as perdocuments)</b>
                    </div>
                    <div className='col-md-9' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                        <b  className=" text-left p-1 pl-2">Plot Area (as per plan)</b>
                    </div>
                    <div className='col-md-9' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                        <b  className=" text-left p-1 pl-2">Plot Area(as perphysical)</b>
                    </div>
                    <div className='col-md-9' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                        <b  className=" text-left p-1 pl-2">Carpet Area <br></br>(as perdocuments)</b>
                    </div>
                    <div className='col-md-9' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                        <b  className=" text-left p-1 pl-2">Carpet Area (as per plan)</b>
                    </div>
                    <div className='col-md-9' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                        <b  className=" text-left p-1 pl-2">Carpet Area (as per measurement)</b>
                    </div>
                    <div className='col-md-9' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                        <b  className=" text-left p-1 pl-2">Built Up Area (as per documents)</b>
                    </div>
                    <div className='col-md-9' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                        <b  className=" text-left p-1 pl-2">Built Up Area (as per plan)</b>
                    </div>
                    <div className='col-md-9' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                        <b  className=" text-left p-1 pl-2">Built Up Area (as per measurement)</b>
                    </div>
                    <div className='col-md-9' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                        <b  className=" text-left p-1 pl-2">Area Considered</b>
                    </div>
                    <div className='col-md-9' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                        <b  className=" text-left p-1 pl-2">Loading %</b>
                    </div>
                    <div className='col-md-9 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                        <b  className=" text-left p-1 pl-2">Super Built Up Area</b>
                    </div>
                    <div className='col-md-9' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                </div>
                <div className='row'>
                    <div className="col-md-12" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman' }}>
                        <b>Valuation Details</b>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                        <b className=" text-left p-1 pl-2">Type</b>
                    </div>
                    <div className='col-md-3 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman', textAlign: 'center' }}>
                        <b>Area</b>
                    </div>
                    <div className='col-md-3 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman', textAlign: 'center' }}>
                        <b >Rate</b>
                    </div>
                    <div className='col-md-3 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman', textAlign: 'center' }}>
                        <b>Value</b>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                        <b className=" text-left p-1 pl-2  ">Plot</b>
                    </div>
                    <div className='col-md-3 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                    <div className='col-md-3 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                    <div className='col-md-3 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                        <b  className=" text-left p-1 pl-2">Construction</b>
                    </div>
                    <div className='col-md-3 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                    <div className='col-md-3 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                    <div className='col-md-3 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                        <b className=" text-left p-1 pl-2">Value (As per Comparision Method)</b>
                    </div>
                    <div className='col-md-3 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman',}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                    <div className='col-md-3 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                    <div className='col-md-3 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                        <b  className=" text-left p-1 pl-2">Car Park</b>
                    </div>
                    <div className='col-md-9' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                        <b className=" text-left p-1 pl-2">Amenities</b>
                    </div>
                    <div className='col-md-9' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                        <b  className=" text-left p-1 pl-2">Total Fair Market Value</b>
                    </div>
                    <div className='col-md-9 d-flex' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                           <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                        <b  className=" text-left p-1 pl-2">Reliazable Value</b>
                    </div>
                    <div className='col-md-9' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                            <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                        <b  className=" text-left p-1 pl-2">Distress Value</b>
                    </div>
                    <div className='col-md-9' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                        <b  className=" text-left p-1 pl-2">Insurance Value</b>
                    </div>
                    <div className='col-md-9' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                        <b className=" text-left p-1 pl-2">Government Value</b>
                    </div>
                    <div className='col-md-9 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                </div>
                <div className='row'>
                    <div className="col-md-3 d-flex align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                        <b  className="mb-0">Percentage Completion</b>
                    </div>
                    <div className="col-md-3" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                    <div className="col-md-3 d-flex align-items-center" style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                        <b  className="mb-0">Percentage Recommendation</b>
                    </div>
                    <div className="col-md-3" style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                </div>
                <div className='row'>
                    <div className="col-md-12" style={{ border: '1px solid black', textAlign: 'center', fontFamily: 'Times New Roman' }}>
                        <b>Boundary Detailings</b>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-md-3 d-flex align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                        <b className=" text-left p-1 pl-2">Detailing</b>
                    </div>
                    <div className='col-md-2 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                    <div className='col-md-3 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                    <div className='col-md-2 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                       <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                    <div className='col-md-2 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                       <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                </div>
                <div className='row'>
                    <div className="col-md-3 d-flex align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                        <b className=" text-left p-1 pl-2">As per deed</b>
                    </div>
                    <div className='col-md-2 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                    <div className='col-md-3 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                    <div className='col-md-2 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                    <div className='col-md-2 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                </div>
                <div className='row'>
                    <div className="col-md-3 d-flex align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                        <b className=" text-left p-1 pl-2">As per Layout</b>
                    </div>
                    <div className='col-md-2 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                    <div className='col-md-3 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                        <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                    <div className='col-md-2 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                    <div className='col-md-2 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                </div>
                <div className='row'>
                    <div className="col-md-3 d-flex align-items-center"  style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                        <b className=" text-left p-1 pl-2  ">As per Layout</b>
                    </div>
                    <div className='col-md-2 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                    <div className='col-md-3 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman' }}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                    <div className='col-md-2 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                    <div className='col-md-2 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
                         <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-3 d-flex align-items-center' style={{ border: '1px solid black', fontFamily: 'Times New Roman', paddingLeft: 0 }}>
                        <b  className=" text-left p-1 pl-2  ">Boundaries Matching</b>
                    </div>
                    <div className='col-md-9 ' style={{ border: '1px solid black', fontFamily: 'Times New Roman'}}>
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
            <li style={{ fontWeight: 'bold', fontFamily: 'Times New Roman' }}>The property under consideration is Office located on 2nd floor in Ground + 2nd storied commercial building without lift.</li>
        </ol>
    </div>
</div>
<br></br>
                <div className='row'>
    <div className='col-md-12' style={{ border: '1px solid black', }}>
    <p className="w-100 text-left p-1 pl-2" style={{ fontWeight: 'bold', fontFamily: 'Times New Roman' }}>Remarks :</p>
        <ol style={{ textAlign: 'justify', paddingInlineStart: '30px', margin: '0' }}>
            <li style={{ fontWeight: 'bold', fontFamily: 'Times New Roman' }}>The property under consideration is Office located on 2nd floor in Ground + 2nd storied commercial building without lift.</li>
            <li style={{ fontWeight: 'bold', fontFamily: 'Times New Roman' }}>As per site observation access to the building is as per norms and road width is 15 feet approx.</li>
            <li style={{ fontWeight: 'bold', fontFamily: 'Times New Roman' }}>We have received only Xerox copy of Registered Development Agreement CC Sanction Plan & Part BCC are made available for verification. At the time of visit we have observed that property was Self occupied by friend of customer ie. M/s. Millennium English School since last 6 months.</li>
            <li style={{ fontWeight: 'bold', fontFamily: 'Times New Roman' }}>During our visit we have not observed society name board.</li>
            <li style={{ fontWeight: 'bold', fontFamily: 'Times New Roman' }}>Registered Development Agreement made between Mr. Nilesh Prabhakar Zunzarrao & Mr. Ravindra Prabhakar Zunzarrao & Mr. Prabhakar Narahari Zunzharrao & Mrs. Vijaya Ravindra Zunzarrao & Mrs. Neha Nilesh Zunzarrao AND M/s. Milestone Spaces on dated NA/03/2008 are made available for verification.</li>
            <li style={{ fontWeight: 'bold', fontFamily: 'Times New Roman' }}>Unit boundaries are not mentioned in available documents hence Please check at your legal end before disbursement.</li>
            <li style={{ fontWeight: 'bold', fontFamily: 'Times New Roman' }}>We have considered 50% loading on Sanction Plan carpet area to furnish the report.</li>
            <li style={{ fontWeight: 'bold', fontFamily: 'Times New Roman' }}>At the time of visit we have observed that Office No.1 to 4 are used as classrooms and are not internally merged which is to be noted.</li>
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

export default connect(mapStateToProps, mapDispatchToProps)(AdityaBirlaFinanceLimited);
