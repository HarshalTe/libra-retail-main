import React from "react";
import { connect } from "react-redux";

import "./Report1.css";
import printJS from "print-js";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";
import { Button } from "reactstrap";
import Logo from "../../../../../assets/topbanner.jpeg";
import LogoNew from "../../../../../assets/LIBRA LOGO_New.jpg";
import RicsLogo from "../../../../../assets/RICS-Logo-Black.png";
import SignupLogo from "../../../../../assets/signup.png";
import ReportCustomTextField from "./../../../../../components/MuiComponents/ReportCustomTextField";
import QrCodeGeoTag from "./QrCodeGeoTag";
import CompleteButton from "./CompleteButton";
import CompleteBtnLevels from "./CompleteBtnLevels";
import MapImage from "./MapImage";
import { getdropdownDetailsPage } from "../../../../../Redux/Creators/DropdownDetailsCreators";

const ReportBottomSection = ()=>{
    return(
        <>
               {/* <div className="page-break"></div> */}
               <div className=" 3-page test-t pdf-h-w">
                      <div className="test-b test-r test-l">
                        <p className="p-1 m-0 ">Declaration:-</p>
                        <ul className="">
                          {console.log(
                            "props?.dropdownDetails?.dropdownDetails",
                            props?.dropdownDetails?.dropdownDetails?.data?.filter(
                              (field) =>
                                field?.branch?.bank_name ==
                                props?.property?.property?.branch?.bank_name
                            ),
                            props?.dropdownDetails?.dropdownDetails
                          )}
                          <li>
                            {
                              props?.dropdownDetails?.dropdownDetails?.data?.filter(
                                (field) =>
                                  field?.branch?.bank_name ==
                                  props?.property?.property?.branch?.bank_name
                              )[0]?.name
                            }
                          </li>
                          {/* <li>
                            The valuer shall not be responsible for the matters
                            of legal nature that affects the value and opinion
                            expressed by us.
                          </li>
                          <li>
                            where a sketched plan is attached to this report,it
                            does not purport to represent accurate architectural
                            plans.Sketch plans and photographs are provided as
                            general illustrations only.Documents furnished to us
                            are returned to the client along with the report. We
                            cannot preserve them
                          </li>
                          <li>
                            Fair market value indicated in the report is an
                            opinion of the value prevailing on the date of the
                            said report and is based on market feedback on
                            values of similar properties. Client is free to
                            obtain other independent opinions on the same. Fair,
                            market value of such properties / localities may
                            increase or decrease, depending on the future market
                            conditions & scenarios. value varies with the
                            purpose & date.This report is not to be referred if
                            the purpose is different other than mentioned.No
                            structural survey was conducted by us as it is not
                            in our scope of work
                          </li>
                          <li>
                            We hereby declare, “The information furnished above
                            is true and correct to the best of our knowledge and
                            belief. We have no direct or indirect interest in
                            the assets valued.
                          </li> */}
                        </ul>
                      </div>
                      <div className="test-b test-r test-l">
                        <p className="p-1 m-0 ">Sign & Stamp:</p>
                        <div className="d-flex w-20 m-2">
                          <img
                            src={SignupLogo}
                            alt="signup logo"
                            className="pl-3 w-100"
                          />
                        </div>
                      </div>

                      <div className="test d-flex">
                        <div className="w-100 ">
                          <div className="test-b text-center p-1">
                            For Libra Valuers
                          </div>
                          <div className="">
                            <div className="p-1">
                              Place:{" "}
                              <ReportCustomTextField
                                formProps={formProps}
                                name="place"
                              />
                            </div>
                            <div className="p-1">
                              Date:{" "}
                              <ReportCustomTextField
                                formProps={formProps}
                                name="date"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="page-break"></div>

                      <div className="test-t test-l test-r p-2">
                        <div className="d-flex">
                          <div className="w-30">Bank Name-: </div>
                          <div className="w-70">Private-Mira road</div>
                        </div>
                        <div className="d-flex">
                          <div className="w-30">Customer Name-: </div>
                          <div className="w-70">
                            Surendra Warden(NIL report)
                          </div>
                        </div>
                        <div className="d-flex">
                          <div className="w-30">Postal Address-: </div>
                          <div className="w-70">
                            Flat No. 3, West Hill, Near Bank Of Baroda,
                            Nepeansea Road, Malabar Hill, Mumbai - 400036
                          </div>
                        </div>
                      </div>

                      <div className="test w-100">
                        <p className="p-1 m-0 text-center">
                          Location with coordinates
                        </p>
                        <div className="w-100 mx-auto align-items-top justify-content-evenly">

                        <MapImage
                        className="test"
  latitude={props?.property?.property?.latitude}
  longitude={props?.property?.property?.longitude}
  surroundingDevelopment={props?.property?.property?.geo_tag?.surrounding_development}
/>
                          <div
                            className="w-100 test-t"
                            style={{
                              "max-height": "150px",
                              "text-align": "center",
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
                      {/* <div className="test w-100">
                        <p className="p-1 m-0 text-center">
                          Location with coordinates
                        </p>
                        <div className="w-100 mx-auto d-flex align-items-top justify-content-evenly">

                        <div className="w-65 mx-auto ">
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
                          Srounding Development:{" "}
                          {
                            props?.property?.property?.geo_tag
                              ?.surrounding_development
                          }
                        </p>
                        </div>
                          <div
                            className="w-25"
                            style={{
                              "max-height": "150px",
                              "text-align": "center",
                            }}
                          >
                            Scan to Reach Location
                            <QrCodeGeoTag
                              data={props?.property?.property?.geo_tag}
                              />
                          </div>
                              </div>
                      </div> */}

                      
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
        
        </>
    );
}
export default ReportBottomSection;