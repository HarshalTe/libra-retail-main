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
import MapImage from "./MapImage";
import { getdropdownDetailsPage } from "../../../../../Redux/Creators/DropdownDetailsCreators";
export const ReportContext = React.createContext();

function Bottom(props) {
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
<div className="">
                           
                     
                      
                      <div className="page-break"></div>

                      <div class="p-2 test">
                             <div class="flex items-center mb-2">
                                           <div class="w-1/3 text-left">Bank Name:</div>
                            </div>
                            <div class="flex items-center mb-2">
                                          <div class="w-1/3 text-left">Customer Name:</div> 
                            </div>
                            <div class="flex items-center mb-2">
                                          <div class="w-1/3 text-left">Postal Address:</div>
                           </div>
                     </div>
                   <div className="container">
                         <div className="row">
                          <div className="col-md-9 test">

                              <div className=" w-100">
                                  <p className="p-1 m-0 text-center">
                                          Location with coordinates
                                   </p>
                                   <div className=" mx-auto ">
                          <iframe
                            src={`https://maps.google.com/maps?q=${props?.property?.property?.latitude},${props?.property?.property?.longitude}&t=k&z=15&output=embed`}
                            height="296"
                            width="100%"
                            frameBorder="0"
                            scrolling="no"
                            allowFullScreen
                            loading="lazy"
                            title={`Map of property at coordinates (${props?.property?.property?.latitude}, ${props?.property?.property?.longitude})`}
                          ></iframe>
                           <p className="p-1 mt-4 text-center">
                          Latitude, Longitude:{" "}
                          {props?.property?.property?.latitude},{" "}
                          {props?.property?.property?.longitude} &
                          <br />
                          Surrounding Development:{" "}
                          {
                            props?.property?.property?.geo_tag
                              ?.surrounding_development
                          }
                        </p>
                        </div>
                        </div>
                               </div>
                               <div className="col-md-3 test">
                              <div
                                  className="w-100 "
                                  style={{
                                     "max-height": "150px",
                                     "text-align": "center",
                                     "marginTop"  : "90px"
                                   }}
                              >
                            <div>
                            Scan to Reach Location
                            </div>
                            <QrCodeGeoTag
                              data={props?.property?.property?.geo_tag}
                              />
                              </div>
                               </div>
                         </div>
                   </div>
</div>

                    <div className="page-break"></div>
<div className="4-page text-center pdf-h-w">
                      <p className="test p-1 m-0 text-center">Sketch</p>
                      <div className="d-flex flex-wrap">
                        {props.property.property?.photographs
                          ?.filter(
                            (row) => row?.is_ok == 1 && row?.desc === "sketch"
                          )
                          ?.map((img, i) => {
                            return (
                              <div className="w-100">
                                <div className="test pt-2 mr-auto ml-auto">
                                  {img.file != null ? (
                                    <>
                                      <img
                                        className="w-90"
                                        src={`https://lvpl.in/librabackend/storage/app/public/PropertyPhotographs/${img?.file}`}
                                        alt=""
                                      />
                                      <p className="mt-4 m-0 p-1 ">
                                        {img.created_at}
                                      </p>
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            );
                          })}
                      </div>
</div>
                    {/* <div className="page-break"></div> */}
<div className="4-page text-center pdf-h-w">
                      <p className="test p-1 m-0 text-center">Plan</p>
                      <div className="d-flex flex-wrap">
                        {props.property.property?.photographs
                          ?.filter(
                            (row) => row?.is_ok == 1 && row?.desc === "plan"
                          )
                          ?.map((img, i) => {
                            return (
                              <div className="w-100">
                                <div className="test pt-2 mr-auto ml-auto">
                                  {img.file != null ? (
                                    <>
                                      <img
                                        className="w-90"
                                        src={`https://lvpl.in/librabackend/storage/app/public/PropertyPhotographs/${img?.file}`}
                                        alt=""
                                      />
                                      <p className="mt-4 m-0 p-1 ">
                                        {img.created_at}
                                      </p>
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            );
                          })}
                      </div>
</div>

                    <div className="page-break"></div>
<div className="4-page text-center pdf-h-w">
                      <p className="test p-1 m-0 text-center">Photographs</p>
                      <div className="d-flex flex-wrap">
                        {props.property.property?.photographs
                          ?.filter(
                            (row) =>
                              row?.is_ok == 1 && row?.desc === "photograph"
                          )
                          ?.map((img, i) => {
                            return (
                              <div className="w-50">
                                <div className="test pt-2 mr-auto ml-auto">
                                  {img.file != null ? (
                                    <>
                                      <img
                                        className="w-90 h-300p"
                                        src={`https://lvpl.in/librabackend/storage/app/public/PropertyPhotographs/${img?.file}`}
                                        alt=""
                                      />
                                      <p className="mt-4 m-0 p-1 ">
                                        {img.created_at}
                                      </p>
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            );
                          })}
                      </div>
                      <div className="page-break"></div>
                      <div className="w-100">
                        <div className="mr-auto ml-auto">
                          {props.property.property?.annexure?.annexure_files?.map(
                            (img, i) => {
                              return (
                                <>
                                  <p className="test p-1 m-0 text-center">
                                    Annexure
                                  </p>
                                  <img
                                    className="w-100"
                                    src={`https://lvpl.in/librabackend/storage/app/public/Annexures/${img.file}`}
                                    alt=""
                                  />
                                  <div className="page-break"></div>
                                </>
                              );
                            }
                          )}
                        </div>
                      </div>
</div>


              </Form>
            );
          }}
        </Formik>
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

export default connect(mapStateToProps, mapDispatchToProps)(Bottom);
