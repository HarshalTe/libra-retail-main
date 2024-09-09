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

function ReportOne(props) {
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

  return (
    <ReportContext.Provider value={{ print }}>
      <div>
        <div className="d-flex justify-content-end">
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

                <div>
                  {/* <div id="htmlToPdf2" className={print ? "f-10" : "f-14"}> */}
                  <div
                    id="htmlToPdf2"
                    style={{ color: "black" }}
                    className={print ? "f-10 font-family" : "f-14 font-family"}
                  >
                    <div className="logo">
                      <img
                        src={Logo}
                        alt="Logo"
                        className="logo-img"
                        width="100%"
                      />
                    </div>
                    <div className=" 1-page text-center pdf-h-w">
                      <h6 className=" p-1 m-0 test font-weight-bold">
                        {" "}
                        TECHNICAL REPORT FORMAT - ESFB{" "}
                      </h6>
                      <h6 className=" p-2 m-0 test font-bold"></h6>
                      <div className="test d-flex">
                        <div className="w-40 text-left p-1 pl-2 test-r">
                          Application number
                        </div>
                        <div className="w-13 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-37 text-left p-1 pl-2 test-r test-l"></div>
                        <div className="w-10 p-1  pl-2"></div>
                      </div>
                      <div className="test d-flex">
                        <div className="w-40 text-left p-1 pl-2 test-r">
                          Name of Customer
                        </div>
                        <div className="w-13 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-37 text-left p-1 pl-2 test-r test-l">
                          Date of Report
                        </div>
                        <div className="w-10 p-1  pl-2"></div>
                      </div>
                      <div className="test d-flex">
                        <div className="w-40 text-left p-1 pl-2 test-r">
                          Name of Property Owner
                        </div>
                        <div className="w-13 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-37 text-left p-1 pl-2 test-r test-l">
                          Product Type (LAP/MME/SME)
                        </div>
                        <div className="w-10 p-1  pl-2"></div>
                      </div>
                      <div className="test d-flex">
                        <div className="w-40 text-left p-1 pl-2 test-r">
                          Relationship of Property Owner with Customer
                        </div>
                        <div className="w-13 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-37 text-left p-1 pl-2 test-r test-l">
                          Unit Type (Flat/Land/Duplex/Row House <br />
                          /Bungalow/Industrial/Commercial)
                        </div>
                        <div className="w-10 p-1  pl-2"></div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-40 text-left p-1 pl-2 test-r">
                          Complete Property Address
                        </div>
                        <div className="w-60 p-1  pl-2"></div>
                      </div>
                      <div className="d-flex">
                        <div className="w-40 text-left p-1 pl-2 test-l test-b test-r test-t">
                          Pin Code
                        </div>
                        <div className="w-13 p-1  pl-2 test-l test-b test-r test-t">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-47 text-left p-1 pl-2"> </div>
                      </div>
                      <div className="d-flex">
                        <div className="w-40 text-left p-1 pl-2 test-l test-b test-r test-t">
                          Nearby Landmark
                        </div>
                        <div className="w-13 p-1 pl-2 test-l test-b test-r test-t">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-47 text-left p-1 pl-2"> </div>
                      </div>
                      <div className="test d-flex">
                        <div className="w-40 text-left p-1 pl-2 test-r">
                          Legal Address
                        </div>
                        <div className="w-60 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>
                      <div className="test d-flex p-3"></div>

                      <div className="test d-flex">
                        <div className="w-40 text-left p-1 pl-2 test-r">
                          In demolition List of Municipal Authority ? (Yes/No)
                        </div>
                        <div className="w-13 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-37 text-left p-1 pl-2 test-r test-l">
                          Level of Risk of Demolition (High/Medium/Low)
                        </div>
                        <div className="w-10 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>
                      <div className="test d-flex p-3"></div>
                      <div className="d-flex">
                        <div className="w-40 text-left p-1 pl-2 test-l test-b test-r test-t"></div>
                        <div className="w-13 p-1  pl-2 test-l test-b test-r test-t">
                          Directions
                          <br />
                          as on Site
                        </div>
                        <div className="w-37 p-1  pl-2 test-l test-b test-r test-t">
                          Directions as per Sale deed
                        </div>
                        <div className="w-10 text-left p-1 pl-2"> </div>
                      </div>
                      <div className="d-flex">
                        <div className="w-40 text-center p-1 pl-2 test-l test-b test-r test-t">
                          East
                        </div>
                        <div className="w-13 p-1  pl-2 test-l test-b test-r test-t">
                          Internal Road
                        </div>
                        <div className="w-37 p-1  pl-2 test-l test-b test-r test-t">
                          NA
                        </div>
                        <div className="w-10 text-left p-1 pl-2"> </div>
                      </div>
                      <div className="d-flex">
                        <div className="w-40 text-center p-1 pl-2 test-l test-b test-r test-t">
                          West
                        </div>
                        <div className="w-13 p-1  pl-2 test-l test-b test-r test-t">
                          Ganpati
                          <br /> Mandir
                        </div>
                        <div className="w-37 p-1  pl-2 test-l test-b test-r test-t">
                          NA
                        </div>
                        <div className="w-10 text-left p-1 pl-2"> </div>
                      </div>
                      <div className="d-flex">
                        <div className="w-40 text-center p-1 pl-2 test-l test-b test-r test-t">
                          North
                        </div>
                        <div className="w-13 p-1  pl-2 test-l test-b test-r test-t">
                          Jain Temple
                        </div>
                        <div className="w-37 p-1  pl-2 test-l test-b test-r test-t">
                          NA
                        </div>
                        <div className="w-10 text-left p-1 pl-2"> </div>
                      </div>
                      <div className="d-flex">
                        <div className="w-40 text-center p-1 pl-2 test-l test-b test-r test-t">
                          South
                        </div>
                        <div className="w-13 p-1  pl-2 test-l test-b test-r test-t">
                          SVC Bank
                        </div>
                        <div className="w-37 p-1  pl-2 test-l test-b test-r test-t">
                          NA
                        </div>
                        <div className="w-10 text-left p-1 pl-2"> </div>
                      </div>
                      <div className="test d-flex">
                        <div className="w-40 text-left p-1 pl-2 test-r">
                          Property Area as per Site Measurement (in sqft)
                        </div>
                        <div className="w-13 p-1  pl-2">1280</div>
                        <div className="w-37 text-left p-1 pl-2 test-r test-l">
                          Property Area as per Title Documents (in sqft)
                        </div>
                        <div className="w-10 p-1  pl-2">
                          1221 BUA (Old Valuation Report)
                        </div>
                      </div>
                      <div className="test d-flex">
                        <div className="w-40 text-left p-1 pl-2 test-r">
                          Property Type as per Actual Site (Flat/Row
                          House/Bungalow/Farm House/Shop/Office/Land/Industrial/
                          <br />
                          Warehouse/Agricultural Land/Mixed)
                        </div>
                        <div className="w-13 p-1  pl-2">Flat</div>
                        <div className="w-37 text-left p-1 pl-2 test-r test-l">
                          Property Type as per Title Documents (Flat/Row
                          House/Bungalow/Farm House/Shop/Office/Land/Industrial/
                          <br />
                          Warehouse/Agricultural Land/Mixed)
                        </div>
                        <div className="w-10 p-1  pl-2">Flat</div>
                      </div>
                      <div className="test">
                        <div className="d-flex">
                          <div className="w-40 text-left p-1 pl-2 test-l test-b test-r">
                            Property Location
                            <br /> (Municipal Corporation/Municipal
                            Council/Development
                            <br /> Authority/SEZ/Town Planning/Gram
                            Panchayat/SEZ)
                          </div>
                          <div className="w-13 p-1  pl-2 test-l test-b test-r">
                            Zilla Parishad
                            <br /> Thane
                          </div>
                          <div className="w-37 text-left p-1 pl-2"> </div>
                        </div>
                        <div className="d-flex">
                          <div className="w-40 text-left p-1 pl-2 test-l test-b test-r">
                            Land Holding Type
                            <br />
                            (Freehold/Leasehold)
                          </div>
                          <div className="w-13 p-1 pl-2 test-l test-b test-r">
                            Free Hold
                          </div>
                          <div className="w-37 text-left p-1 pl-2"> </div>
                        </div>
                        <div className="d-flex">
                          <div className="w-40 text-left p-1 pl-2 test-l test-b test-r">
                            Approved Land Usage
                            <br />
                            (Residential/Commercial/Industrial
                            <br />
                            /Mixed/Agricultural)
                          </div>
                          <div className="w-13 p-1 pl-2 test-l test-b test-r">
                            Residential
                          </div>
                          <div className="w-37 text-left p-1 pl-2"> </div>
                        </div>

                        <div className="d-flex">
                          <div className="w-40 text-left p-1 pl-2 test-l test-b test-r">
                            Actual Land Usage
                            <br />
                            (Residential/Commercial/Industrial
                            <br />
                            /Mixed/Agricultural)
                          </div>
                          <div className="w-13 p-1 pl-2 test-l test-b test-r">
                            Residential
                          </div>
                          <div className="w-37 text-left p-1 pl-2"> </div>
                        </div>

                        <div className="d-flex">
                          <div className="w-40 text-left p-1 pl-2 test-l test-b test-r">
                            Property Demarcated at Site
                            <br />
                            (Yes/No)
                          </div>
                          <div className="w-13 p-1 pl-2 test-l test-b test-r">
                            Yes
                          </div>
                          <div className="w-37 text-left p-1 pl-2"> </div>
                        </div>

                        <div className="d-flex">
                          <div className="w-40 text-left p-1 pl-2 test-l test-b test-r">
                            Class of Locality
                            <br />
                            (High Class/Middle Class/Low Class)
                          </div>
                          <div className="w-13 p-1 pl-2 test-l test-b test-r">
                            Middle Class
                          </div>
                          <div className="w-37 text-left p-1 pl-2"> </div>
                        </div>
                        <div className="d-flex">
                          <div className="w-40 text-left p-1 pl-2 test-l test-b test-r">
                            No of Floors
                          </div>
                          <div className="w-13 p-1 pl-2 test-l test-b test-r">
                            NA
                          </div>
                          <div className="w-37 text-left p-1 pl-2"> </div>
                        </div>
                        <div className="d-flex">
                          <div className="w-40 text-left p-1 pl-2 test-l test-b test-r">
                            No of Floors( Residential)
                          </div>
                          <div className="w-13 p-1 pl-2 test-l test-b test-r">
                            NA
                          </div>
                          <div className="w-37 text-left p-1 pl-2"> </div>
                        </div>
                        <div className="d-flex">
                          <div className="w-40 text-left p-1 pl-2 test-l test-b test-r">
                            No of of units on each Floor
                          </div>
                          <div className="w-13 p-1 pl-2 test-l test-b test-r">
                            2 Flats per
                            <br />
                            floor
                          </div>
                          <div className="w-37 text-left p-1 pl-2"> </div>
                        </div>
                        <div className="d-flex">
                          <div className="w-40 text-left p-1 pl-2 test-l test-b test-r">
                            Permissible No of Floors
                          </div>
                          <div className="w-13 p-1 pl-2 test-l test-b test-r">
                            NA
                          </div>
                          <div className="w-37 text-left p-1 pl-2"> </div>
                        </div>
                        <div className="d-flex">
                          <div className="w-40 text-left p-1 pl-2 test-l test-b test-r">
                            Construction Type
                            <br />
                            (RCC/Load Bearing/Steel/Composite)
                          </div>
                          <div className="w-13 p-1 pl-2 test-l test-b test-r">
                            Rcc Framed
                            <br />
                            Structure
                          </div>
                          <div className="w-37 text-left p-1 pl-2"> </div>
                        </div>
                        <div className="d-flex">
                          <div className="w-40 text-left p-1 pl-2 test-l test-b test-r">
                            Interior
                            <br />
                            (Good/Average/Poor)
                          </div>
                          <div className="w-13 p-1 pl-2 test-l test-b test-r">
                            Average
                          </div>
                          <div className="w-37 text-left p-1 pl-2"> </div>
                        </div>
                        <div className="d-flex">
                          <div className="w-40 text-left p-1 pl-2 test-l test-b test-r">
                            Exterior
                            <br />
                            (Good/Average/Poor)
                          </div>
                          <div className="w-13 p-1 pl-2 test-l test-b test-r">
                            Average
                          </div>
                          <div className="w-37 text-left p-1 pl-2"> </div>
                        </div>
                        <div className="d-flex">
                          <div className="w-40 text-left p-1 pl-2 test-l test-b test-r">
                            Property Neighbourhood
                            <br />
                            (Developed/Underdevelopment
                            <br />
                            /Undeveloped/Negative)
                          </div>
                          <div className="w-13 p-1 pl-2 test-l test-b test-r">
                            Developing
                          </div>
                          <div className="w-37 text-left p-1 pl-2"> </div>
                        </div>
                        <div className="d-flex">
                          <div className="w-40 text-left p-1 pl-2 test-l test-b test-r">
                            Marketability
                            <br />
                            (Good/Average/Poor)
                          </div>
                          <div className="w-13 p-1 pl-2 test-l test-b test-r">
                            Average
                          </div>
                          <div className="w-37 text-left p-1 pl-2"> </div>
                        </div>
                        <div className="d-flex">
                          <div className="w-40 text-left p-1 pl-2 test-l test-b test-r">
                            Amenities (if any)
                          </div>
                          <div className="w-13 p-1 pl-2 test-l test-b test-r">
                            0
                          </div>
                          <div className="w-37 text-left p-1 pl-2"> </div>
                        </div>
                        <div className="d-flex">
                          <div className="w-40 text-left p-1 pl-2 test-l test-b test-r">
                            Basis of Property Identification
                          </div>
                          <div className="w-13 p-1 pl-2 test-l test-b test-r">
                            Customer has
                            <br />
                            shown
                            <br />
                            property
                          </div>
                          <div className="w-37 text-left p-1 pl-2"> </div>
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-40 text-left p-1 pl-2 test-r">
                          Basis of Property Usage Permission Confirmation
                        </div>
                        <div className="w-13 p-1  pl-2">Residential</div>
                        <div className="w-37 text-left p-1 pl-2 test-r test-l"></div>
                      </div>
                      <div className="test d-flex">
                        <div className="w-40 text-left p-1 pl-2 test-r">
                          Occupancy Status (Occupied/Vacant)
                        </div>
                        <div className="w-13 p-1  pl-2">Self Occupied</div>
                        <div className="w-37 text-left p-1 pl-2 test-r test-l"></div>
                      </div>
                      <div className="test d-flex">
                        <div className="w-40 text-left p-1 pl-2 test-r">
                          Occupied By (Name)
                          <br />
                          (Self/Tenant)
                        </div>
                        <div className="w-13 p-1  pl-2">
                          Mr. Jitendra <br />
                          Patil
                        </div>
                        <div className="w-37 text-left p-1 pl-2 test-r test-l"></div>
                      </div>
                      <div className="test d-flex">
                        <div className="w-40 text-left p-1 pl-2 test-r">
                          Occupied Since
                        </div>
                        <div className="w-13 p-1  pl-2">
                          14 Years (As <br />
                          per Site <br />
                          Information)
                          <br />
                        </div>
                        <div className="w-37 text-left p-1 pl-2 test-r test-l"></div>
                      </div>
                      <div className="test d-flex">
                        <div className="w-100 text-left p-3 test-r"></div>
                      </div>
                      <div className="test d-flex">
                        <div className="w-40 text-left p-1 pl-2 test-r">
                          Rent per month
                        </div>
                        <div className="w-13 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-37 text-left p-1 pl-2 test-r test-l"></div>
                      </div>
                      <div className="test d-flex">
                        <div className="w-40 text-left p-1 pl-2 test-r">
                          Age of Property (in years)
                        </div>
                        <div className="w-13 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-37 text-left p-1 pl-2 test-r test-l"></div>
                      </div>
                      <div className="test d-flex">
                        <div className="w-40 text-left p-1 pl-2 test-r">
                          Residual Age of Property (in years)
                        </div>
                        <div className="w-13 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-37 text-left p-1 pl-2 test-r test-l"></div>
                      </div>
                      <div className="test d-flex">
                        <div className="w-40 text-left p-1 pl-2 test-r"></div>
                        <div className="w-13 p-1  pl-2 font-bolder text-center">
                          Actual
                        </div>
                        <div className="w-37 text-left p-1 pl-2 test-r test-l font-bolder text-center">
                          As per Title
                        </div>
                        <div className="w-10 text-left pl-2 test-r test-l font-bolder">
                          As Per <br />
                          Approved <br />
                          Plans
                        </div>
                      </div>
                      <div className="test d-flex">
                        <div className="w-40 text-left p-1 pl-2 test-r">
                          Land Area (in sqft)
                        </div>
                        <div className="w-13 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-37 text-left p-1 pl-2 test-r test-l">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-10 text-left p-1 pl-2 test-r test-l">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>
                      <div className="test d-flex">
                        <div className="w-40 text-left p-1 pl-2 test-r">
                          Carpet Area (in sqft)
                        </div>
                        <div className="w-13 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-37 text-left p-1 pl-2 test-r test-l">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-10 text-left p-1 pl-2 test-r test-l">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>
                      <div className="test d-flex">
                        <div className="w-40 text-left p-1 pl-2 test-r">
                          Super Built Up Area (in sqft)
                        </div>
                        <div className="w-13 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-37 text-left p-1 pl-2 test-r test-l"></div>
                        <div className="w-10 text-left p-1 pl-2 test-r test-l"></div>
                      </div>
                      <div className="test d-flex">
                        <div className="w-40 text-left p-1 pl-2 test-r">
                          Permissible FAR
                        </div>
                        <div className="w-60 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>
                      <div className="test d-flex">
                        <div className="w-100 text-left p-1 pl-2 test-r text-center font-bolder">
                          Valuation
                        </div>
                      </div>
                      <div className="test d-flex">
                        <div className="w-53 text-left p-1 pl-2 test-r text-center font-bolder">
                          Area Details
                        </div>
                        <div className="w-37 text-left p-1 pl-2 test-r test-l text-center font-bolder">
                          Rate (Rs/sqft)
                        </div>
                        <div className="w-10 text-left p-1 pl-2 test-r test-l text-center font-bolder">
                          Value
                        </div>
                      </div>
                      <div className="test d-flex">
                        <div className="w-40 text-left p-1 pl-2 test-r">
                          Land Area (in sqft)
                        </div>
                        <div className="w-13 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-37 text-left p-1 pl-2 test-l test-r">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-10 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>
                      <div className="test d-flex">
                        <div className="w-40 text-left p-1 pl-2 test-r">
                          Carpet Area (in sqft)
                        </div>
                        <div className="w-13 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-37 text-left p-1 pl-2 test-l test-r">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-10 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>
                      <div className="test d-flex">
                        <div className="w-40 text-left p-1 pl-2 test-r">
                          Super Built Up Area (in sqft)
                        </div>
                        <div className="w-13 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-37 text-left p-1 pl-2 test-l test-r">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-10 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>
                      <div className="test d-flex">
                        <div className="w-40 text-left p-1 pl-2 test-r">
                          Carpet Area (in sqft)
                        </div>
                        <div className="w-13 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-37 text-left p-1 pl-2 test-l test-r">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-10 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>
                      <div className="test d-flex">
                        <div className="w-40 text-left p-1 pl-2 test-r">
                          Super Built Up Area (in sqft)
                        </div>
                        <div className="w-13 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-37 text-left p-1 pl-2 test-l test-r">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-10 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>
                      <div className="test d-flex">
                        <div className="w-40 text-left p-1 pl-2 test-r">
                          Others (Car Parking)
                        </div>
                        <div className="w-13 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-37 text-left p-1 pl-2 test-l test-r">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-10 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>
                      <div className="test d-flex">
                        <div className="w-40 text-left p-1 pl-2 test-r">
                          Total Value
                        </div>
                        <div className="w-13 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-37 text-left p-1 pl-2 test-l test-r">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-10 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>
                      <div className="test">
                        <div className="d-flex">
                          <div className="w-40 text-left p-1 pl-2 test-l test-b test-r">
                            Distressed Value (70%)
                          </div>
                          <div className="w-13 p-1  pl-2 test-l test-b test-r">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                          <div className="w-47 text-left p-1 pl-2"> </div>
                        </div>
                        <div className="d-flex">
                          <div className="w-40 text-left p-1 pl-2 test-l test-b test-r">
                            Govt Value
                          </div>
                          <div className="w-13 p-1  pl-2 test-l test-b test-r">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                          <div className="w-47 text-left p-1 pl-2"> </div>
                        </div>
                        <div className="d-flex">
                          <div className="w-40 text-left p-1 pl-2 test-l test-b test-r">
                            Deviations, if any
                            <br />
                            (Vertical/Horizontal)
                          </div>
                          <div className="w-13 p-1  pl-2 test-l test-b test-r">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                          <div className="w-47 text-left p-1 pl-2"> </div>
                        </div>
                      </div>
                      <div className="test d-flex">
                        <div className="w-40 text-left p-1 pl-2 test-r">
                          % Deviation with complete details
                        </div>
                        <div className="w-60 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>
                      <div className="test d-flex">
                        <div className="w-40 text-left p-1 pl-2 test-r">
                          Violations (If any)
                        </div>
                        <div className="w-60 p-1  pl-2"></div>
                      </div>
                      <div className="test d-flex">
                        <div className="w-40 text-left p-1 pl-2 test-r">
                          Technical Remarks
                        </div>
                        <div className="w-60 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-40 text-left p-1 pl-2 test-r">
                          Stage of Construction
                        </div>
                        <div className="w-13 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-47 text-left p-1 pl-2 test-l test-r"></div>
                      </div>
                      <div className="test d-flex p-3"></div>
                      <div className="test d-flex">
                        <div className="w-40 text-left p-1 pl-2 test-r">
                          Technical Progress (in %)
                        </div>
                        <div className="w-13 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-47 p-1 pl-2 test-l test-r"></div>
                      </div>
                      <div className="test d-flex p-3"></div>
                      <div className="test d-flex">
                        <div className="w-40 text-left p-1 pl-2 test-r">
                          Floorwise Details of Usage of Property
                        </div>
                        <div className="w-13 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                        <div className="w-47 p-1 pl-2 test-l test-r"></div>
                      </div>
                      <div className="test d-flex p-3"></div>
                      <div className="test">
                        <div className="d-flex">
                          <div className="w-40 text-left p-1 pl-2 test-l test-b test-r">
                            Access Road available to the property
                            <br />
                            (Yes/No)
                          </div>
                          <div className="w-13 p-1  pl-2 test-l test-b test-r">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                          <div className="w-47 text-left p-1 pl-2"> </div>
                        </div>
                        <div className="d-flex">
                          <div className="w-40 text-left p-1 pl-2 test-l test-b test-r">
                            Width of Access Road & Type <br />
                            (Concrete/Tar/Brickroad/Kutcha)
                          </div>
                          <div className="w-13 p-1  pl-2 test-l test-b test-r">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                          <div className="w-47 text-left p-1 pl-2"> </div>
                        </div>
                        <div className="d-flex">
                          <div className="w-40 text-left p-1 pl-2 test-l test-b test-r">
                            Is High Tension Wire passing above the property
                            <br />
                            (Yes/No)
                          </div>
                          <div className="w-13 p-1  pl-2 test-l test-b test-r">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                          <div className="w-47 text-left p-1 pl-2"> </div>
                        </div>
                        <div className="d-flex">
                          <div className="w-40 text-left p-1 pl-2 test-l test-b test-r">
                            Is it a Landlocked Property (Yes/No)
                          </div>
                          <div className="w-13 p-1  pl-2 test-l test-b test-r">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                          <div className="w-47 text-left p-1 pl-2"> </div>
                        </div>
                        <div className="d-flex">
                          <div className="w-40 text-left p-1 pl-2 test-l test-b test-r">
                            Person met at the property along with contact
                            details
                          </div>
                          <div className="w-13 p-1  pl-2 test-l test-b test-r">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                          <div className="w-47 text-left p-1 pl-2"> </div>
                        </div>
                      </div>
                      <div className="test d-flex p-3"></div>
                      <div className="test d-flex">
                        <div className="w-40 text-left p-1 pl-2 test-r">
                          Plan CC & OC Ref No
                        </div>
                        <div className="w-60 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>
                      <div className="test d-flex">
                        <div className="w-40 text-left p-1 pl-2 test-r">
                          List of Documents shared for valuation
                        </div>
                        <div className="w-60 p-1  pl-2">
                          <ReportCustomTextField
                            formProps={formProps}
                            name="prospect_no"
                          />
                        </div>
                      </div>
                      <div className="test d-flex p-3"></div>
                      <div className="test">
                        <div className="d-flex">
                          <div className="w-40 text-left p-1 pl-2 test-l test-b test-r">
                            Date of Visit
                          </div>
                          <div className="w-13 p-1  pl-2 test-l test-b test-r">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                          <div className="w-47 text-left p-1 pl-2"> </div>
                        </div>
                        <div className="d-flex">
                          <div className="w-40 text-left p-1 pl-2 test-l test-b test-r">
                            Date Of Report
                          </div>
                          <div className="w-13 p-1  pl-2 test-l test-b test-r">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                          <div className="w-47 text-left p-1 pl-2"> </div>
                        </div>
                      </div>
                      <div className="test d-flex p-3"></div>
                      <div className="test">
                        <div className="d-flex">
                          <div className="w-40 text-left p-1 pl-2 test-l test-b test-r">
                            Property Visited by
                          </div>
                          <div className="w-13 p-1  pl-2 test-l test-b test-r">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                          <div className="w-47 text-left p-1 pl-2"> </div>
                        </div>
                        <div className="d-flex">
                          <div className="w-40 text-left p-1 pl-2 test-l test-b test-r">
                            Tech Report Entered by
                          </div>
                          <div className="w-13 p-1  pl-2 test-l test-b test-r">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                          <div className="w-47 text-left p-1 pl-2">
                            <ReportCustomTextField
                              formProps={formProps}
                              name="prospect_no"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="page-break"></div>

                      <div className="test d-flex">
                        <div className="w-100 text-left p-1 pl-2 test-r">
                          <b>Declaration :-</b>
                          <ul>
                            <br />
                            <li>
                              Our representative has visited this site. I/We
                              have not verified the title deeds of the
                              properties with the records of the registrar's
                              office as this is beyond the agreed scope of
                              work.Assumptions are made to the best of our
                              knowledge and belief. Reliance is based on the
                              information furnished to us by the identifier
                              AND/OR client.
                            </li>
                            <li>
                              <br />
                              The valuer shall not be responsible for the
                              matters of legal nature that affects the value and
                              opinion expressed by us.
                              <br />
                            </li>
                            <li>
                              where a sketched plan is attached to this
                              report,it does not purport to represent accurate
                              architectural plans.Sketch plans and photographs
                              are provided as general illustrations
                              only.Documents furnished to us are returned to the
                              client along with the report. We cannot preserve
                              them.
                              <br />
                            </li>
                            <li>
                              Fair market value indicated in the report is an
                              opinion of the value prevailing on the date of the
                              said report and is based on market feedback on
                              values of similar properties. Client is free to
                              obtain other independent opinions on the same.
                              Fair, market value of such properties / localities
                              may increase or decrease, depending on the future
                              market conditions & scenarios. value varies with
                              the purpose & date.This report is not to be
                              referred if the purpose is different other than
                              mentioned.No structural survey was conducted by us
                              as it is not in our scope of work
                              <br />
                            </li>
                            <li>
                              We hereby declare, “The information furnished
                              above is true and correct to the best of our
                              knowledge and belief. We have no direct or
                              indirect interest in the assets valued.
                            </li>
                          </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(ReportOne);
