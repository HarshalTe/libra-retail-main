import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import ReportCustomTextField from "./../../../../../components/MuiComponents/ReportCustomTextField";
import * as Yup from "yup";
import { Divider, Switch, Typography } from "@mui/material";
import { Button, Col, Row } from "reactstrap";
import { connect } from "react-redux";
import printJS from "print-js";
import HeatMapRadius from "../../AllTabs/Valuation/UpdateValuation/HeatMapRadius";
import {
  getProperty1,
  getProperty2,
  getProperty3,
} from "../../../../../Redux/Creators/CaseComparableCreators";

export const ReportContext = React.createContext();
function ComparableReport(props) {
  const [checked, setChecked] = React.useState(false);
  const [type, setType] = React.useState();
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const token = props.login?.login?.token;

  React.useEffect(() => {
    if (props.property.property?.comparable_ids != null) {
      let data = {
        token: token,
        id: props.property.property?.comparable_ids,
      };
      props.getProperty1(data);
      props.getProperty2(data);
      props.getProperty3(data);
      console.log(data);
    } else {
      console.log("no comparable_ids");
    }
  }, []);

  const [print, setPrint] = React.useState(false);
  console.log("objectprops", props);
  const printPdf = () => {
    printJS({
      printable: "htmlToPdf2",
      type: "html",
      scanStyles: true,
      targetStyles: "[*]",
      font_size: "8pt",
      maxWidth: 1080,
      base64: true,
      honorMarginPadding: false,
      style: "@page {  options: footers;  }",
    });
  };

  let rows =
    props.comparable.isLoading1 ||
    props.comparable.isLoading2 ||
    props.comparable.isLoading3 ||
    props.comparable?.errMess1 != null ||
    props.comparable?.errMess2 != null ||
    props.comparable?.errMess3 != null
      ? []
      : [
          props.comparable.comparable1,
          props.comparable.comparable2,
          props.comparable.comparable3,
        ];

  const rows2 =
    // props?.avm?.avm?.isLoading
    // ? []
    // :
    rows?.length > 1 ? rows : [];
  console.log(
    rows2,
    "hhhhhh",
    props.comparable.isLoading1,
    props.comparable.isLoading1 ||
      props.comparable.isLoading2 ||
      props.comparable.isLoading3
  );

  return (
    <ReportContext.Provider value={{ print }}>
      <Row>
        <Col md={5} style={{}}>
          Select Sales Comparison Approach
          <div className="">
            <div>
              <input
                type="radio"
                id="plot"
                name="plot"
                value="plot"
                onClick={(event) => setType("Plot")}
              />

              <lable for="plot">Plot</lable>
            </div>
            <div>
              <input
                type="radio"
                id="Resi+Comm+Indust"
                name="RCI"
                value="rci"
                onClick={(event) => setType("Resi+Comm+Industrial")}
              />

              <lable for="Resi+Comm+Indust">Resi+Comm+Industrial</lable>
            </div>
          </div>
          {/* &#x27A3; To add data in Repoet Select data From Table Below */}
        </Col>
        <Col md={4}>
          <Button
            color="success"
            onClick={printPdf}
            className="print-button w-20"
            // disabled={!print}
          >
            <i className="fa fa-save mr-2" />
            Print Report
          </Button>
        </Col>
        <Col md={3}>
          <strong>
            Add To Annexture{" "}
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          </strong>
        </Col>
      </Row>
      {/* <Typography variant={"h3"}>Sales Comparison Approach</Typography> */}

      <div>
        <div id="htmlToPdf2" className={print ? "f-10" : "f-14"}>
          <div className="logo"></div>
          <div className=" 1-page test text-center pdf-h-w">
            <h3 className=" p-1 m-0 test"> Sales Comparable</h3>
            <div className="test d-flex">
              <div className="w-20 p-1 test-r m-0">
                Area:{props?.property?.property?.area}
              </div>
              <div className="w-20 p-1 test-r m-0">
                Rate / sqft:{props?.property?.property?.plot_rate}
              </div>
              <div className="w-20 p-1 test-r m-0">
                Value:{props?.property?.property?.valuation?.aggreement_value}
              </div>
              <div className="w-20 p-1 test-r m-0">
                Rent:{props?.property?.property?.valuation?.customer_rent}
              </div>
              <div className="w-20 p-1 test-r m-0">
                Yield:{props?.property?.property?.valuation?.yield}
              </div>
            </div>
            <div className="test d-flex h-18vw">
              <div className="w-60 h-60 p-1 test-r m-0">
                <HeatMapRadius data={rows2} />
              </div>
              <div className="w-40 text-left p-1 pl-2 test-r">
                <div className="w-100 p-1 pl-2 test-b">
                  Address:{props?.property?.property?.legal_address}
                </div>
                <div className="w-100  p-1 pl-2 ">
                  Property Type:{props?.property?.property?.property_type}
                </div>
                <div className="w-100  p-1 pl-2 ">
                  Price per sqft:{props?.property?.property?.compare_price}
                </div>
                <div className="w-100  p-1 pl-2 ">
                  Age of Building:{props?.property?.property?.age_of_build}
                </div>
                <div className="w-100  p-1 pl-2 ">
                  Aggrement Value:{" "}
                  {props?.property?.property?.valuation?.aggreement_value}
                </div>
                <div className="w-100  p-1 pl-2 ">
                  Property Value:{" "}
                  {props?.property?.property?.valuation?.final_value}
                </div>
                <div className="w-100  p-1 pl-2 ">
                  Yield: {props?.property?.property?.valuation?.yield}
                </div>
              </div>
            </div>
            <div className="test d-flex">
              <div className="w-100 text-left p-1 pl-2 test-r">
                Sales Comparison Approach
              </div>
            </div>

            <div className="test d-flex">
              <div className="w-25 p-1 test-r m-0"></div>
              <div className="w-15 text-left p-1 pl-2 test-r">
                Subject Property
              </div>
              <div className="w-60 p-1 test-r pl-2">Comparable Properties</div>
            </div>

            <div className="test d-flex">
              <div className="w-25 p-1 test-r m-0"></div>
              <div className="w-15 text-left p-1 pl-2 test-r">Match</div>
              {rows2?.map((row, i) => {
                console.log(row, "row");
                if (row.length > 0) {
                  return (
                    <div className="w-20 p-1 test-r pl-2">
                      <div className="w-100 mr-auto ml-auto">
                        {row?.photographs[0]?.file != null ? (
                          <>
                            <img
                              className="w-100"
                              src={`https://lvpl.in/librabackend/storage/app/public/PropertyPhotographs/${row?.photographs[0]?.file}`}
                              alt=""
                            />
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="w-20 p-1 test-r pl-2">
                      <div className="w-100 mr-auto ml-auto">
                        {/* {row?.photographs[0]?.file != null ?
                              <>
                              <img className="w-100" src={`https://lvpl.in/librabackend/storage/app/public/PropertyPhotographs/${row?.photographs[0]?.file}`} alt="" />
                              </>
                            :""  
                            } */}
                      </div>
                    </div>
                  );
                }
              })}
            </div>

            <div className="test d-flex">
              <div className="w-25 p-1 test-r m-0">Item</div>
              <div className="w-15 text-left p-1 pl-2 test-r">Property</div>
              {rows2?.map((row, i) => {
                return <div className="w-20 p-1 test-r pl-2">{i + 1}</div>;
              })}
            </div>

            {type == "Resi+Comm+Industrial" ? (
              <div>
                <div className="test d-flex">
                  <div className="w-25 p-1 test-r m-0">Source</div>
                  <div className="w-15 text-left p-1 pl-2 test-r">-</div>
                  {rows2?.map((row, i) => {
                    return (
                      <div className="w-20 p-1 test-r pl-2">
                        {row?.project?.sourced_by}
                      </div>
                    );
                  })}
                </div>
                <div className="test d-flex">
                  <div className="w-25 p-1 test-r m-0">
                    Quoted Price / Price Sold
                  </div>
                  <div className="w-15 text-left p-1 pl-2 test-r">-</div>
                  {rows2?.map((row, i) => {
                    return (
                      <div className="w-20 p-1 test-r pl-2">
                        {row?.report_date}
                      </div>
                    );
                  })}
                </div>
                <div className="test d-flex">
                  <div className="w-25 p-1 test-r m-0">
                    Date of Sale / months
                  </div>
                  <div className="w-15 text-left p-1 pl-2 test-r">-</div>
                  {rows2?.map((row, i) => {
                    return (
                      <div className="w-20 p-1 test-r pl-2">
                        {row?.report_date}
                      </div>
                    );
                  })}
                </div>
                <div className="test d-flex">
                  <div className="w-25 p-1 test-r m-0">Condition</div>
                  <div className="w-15 text-left p-1 pl-2 test-r">-</div>
                  {rows2?.map((row, i) => {
                    return (
                      <div className="w-20 p-1 test-r pl-2">
                        {row?.specification?.structure_condition}
                      </div>
                    );
                  })}
                </div>
                <div className="test d-flex">
                  <div className="w-25 p-1 test-r m-0">
                    Stage of construction
                  </div>
                  <div className="w-15 text-left p-1 pl-2 test-r">-</div>
                  {rows2?.map((row, i) => {
                    return (
                      <div className="w-20 p-1 test-r pl-2">
                        {row?.project_stage?.current_stage}
                      </div>
                    );
                  })}
                </div>
                <div className="test d-flex">
                  <div className="w-25 p-1 test-r m-0">
                    Location of project/property
                  </div>
                  <div className="w-15 text-left p-1 pl-2 test-r">-</div>
                  {rows2?.map((row, i) => {
                    return (
                      <div className="w-20 p-1 test-r pl-2">
                        {row?.location}
                      </div>
                    );
                  })}
                </div>
                <div className="test d-flex">
                  <div className="w-25 p-1 test-r m-0">
                    Distance from our property
                  </div>
                  <div className="w-15 text-left p-1 pl-2 test-r">-</div>
                  {rows2?.map((row, i) => {
                    return (
                      <div className="w-20 p-1 test-r pl-2">
                        {row?.report_date}
                      </div>
                    );
                  })}
                </div>
                <div className="test d-flex">
                  <div className="w-25 p-1 test-r m-0">Main road/internal</div>
                  <div className="w-15 text-left p-1 pl-2 test-r">-</div>
                  {rows2?.map((row, i) => {
                    return (
                      <div className="w-20 p-1 test-r pl-2">
                        {row?.road_name}
                      </div>
                    );
                  })}
                </div>
                <div className="test d-flex">
                  <div className="w-25 p-1 test-r m-0">Age of building</div>
                  <div className="w-15 text-left p-1 pl-2 test-r">-</div>
                  {rows2?.map((row, i) => {
                    return (
                      <div className="w-20 p-1 test-r pl-2">
                        {row?.project?.building_age}
                      </div>
                    );
                  })}
                </div>
                <div className="test d-flex">
                  <div className="w-25 p-1 test-r m-0">Carpet Area</div>
                  <div className="w-15 text-left p-1 pl-2 test-r">-</div>
                  {rows2?.map((row, i) => {
                    return (
                      <div className="w-20 p-1 test-r pl-2">
                        {row?.report_date}
                      </div>
                    );
                  })}
                </div>
                <div className="test d-flex">
                  <div className="w-25 p-1 test-r m-0">Rate on Carpet</div>
                  <div className="w-15 text-left p-1 pl-2 test-r">-</div>
                  {rows2?.map((row, i) => {
                    return (
                      <div className="w-20 p-1 test-r pl-2">
                        {row?.valuation?.type?.carpet_rate}
                      </div>
                    );
                  })}
                </div>
                <div className="test d-flex">
                  <div className="w-25 p-1 test-r m-0">Unit Configuration</div>
                  <div className="w-15 text-left p-1 pl-2 test-r">-</div>
                  {rows2?.map((row, i) => {
                    return (
                      <div className="w-20 p-1 test-r pl-2">
                        {row?.configuration}
                      </div>
                    );
                  })}
                </div>
                <div className="test d-flex">
                  <div className="w-25 p-1 test-r m-0">
                    Floor on which property is located
                  </div>
                  <div className="w-15 text-left p-1 pl-2 test-r">-</div>
                  {rows2?.map((row, i) => {
                    return (
                      <div className="w-20 p-1 test-r pl-2">
                        {row?.occupation?.floor_no}
                      </div>
                    );
                  })}
                </div>
                <div className="test d-flex">
                  <div className="w-25 p-1 test-r m-0">Parking</div>
                  <div className="w-15 text-left p-1 pl-2 test-r">-</div>
                  {rows2?.map((row, i) => {
                    return (
                      <div className="w-20 p-1 test-r pl-2">
                        {row?.valuation?.type?.parking_charges}
                      </div>
                    );
                  })}
                </div>
                <div className="test d-flex">
                  <div className="w-25 p-1 test-r m-0">No. of Lifts</div>
                  <div className="w-15 text-left p-1 pl-2 test-r">-</div>
                  {rows2?.map((row, i) => {
                    return (
                      <div className="w-20 p-1 test-r pl-2">
                        {row?.no_of_lift}
                      </div>
                    );
                  })}
                </div>
                <div className="test d-flex">
                  <div className="w-25 p-1 test-r m-0">Number of Floor</div>
                  <div className="w-15 text-left p-1 pl-2 test-r">-</div>
                  {rows2?.map((row, i) => {
                    return (
                      <div className="w-20 p-1 test-r pl-2">
                        {row?.no_of_floor}
                      </div>
                    );
                  })}
                </div>
                <div className="test d-flex">
                  <div className="w-25 p-1 test-r m-0">View From Window</div>
                  <div className="w-15 text-left p-1 pl-2 test-r">-</div>
                  {rows2?.map((row, i) => {
                    return (
                      <div className="w-20 p-1 test-r pl-2">
                        {row?.report_date}
                      </div>
                    );
                  })}
                </div>
                <div className="test d-flex">
                  <div className="w-25 p-1 test-r m-0">
                    Project/Unit with Amenities
                  </div>
                  <div className="w-15 text-left p-1 pl-2 test-r">-</div>
                  {rows2?.map((row, i) => {
                    return (
                      <div className="w-20 p-1 test-r pl-2">
                        {row?.report_date}
                      </div>
                    );
                  })}
                </div>
                <div className="test d-flex">
                  <div className="w-25 p-1 test-r m-0">Observations</div>
                  <div className="w-15 text-left p-1 pl-2 test-r">-</div>
                  {rows2?.map((row, i) => {
                    return (
                      <div className="w-20 p-1 test-r pl-2">
                        {row?.report_date}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div>
                <div>
                  <div className="test d-flex">
                    <div className="w-25 p-1 test-r m-0">Source</div>
                    <div className="w-15 text-left p-1 pl-2 test-r">-</div>
                    {rows2?.map((row, i) => {
                      return (
                        <div className="w-20 p-1 test-r pl-2">
                          {row?.project?.sourced_by}
                        </div>
                      );
                    })}
                  </div>
                  <div className="test d-flex">
                    <div className="w-25 p-1 test-r m-0">
                      Quoted Price / Price Sold
                    </div>
                    <div className="w-15 text-left p-1 pl-2 test-r">-</div>
                    {rows2?.map((row, i) => {
                      return (
                        <div className="w-20 p-1 test-r pl-2">
                          {row?.report_date}
                        </div>
                      );
                    })}
                  </div>
                  <div className="test d-flex">
                    <div className="w-25 p-1 test-r m-0">
                      Date of Sale / months
                    </div>
                    <div className="w-15 text-left p-1 pl-2 test-r">-</div>
                    {rows2?.map((row, i) => {
                      return (
                        <div className="w-20 p-1 test-r pl-2">
                          {row?.report_date}
                        </div>
                      );
                    })}
                  </div>
                  <div className="test d-flex">
                    <div className="w-25 p-1 test-r m-0">Condition</div>
                    <div className="w-15 text-left p-1 pl-2 test-r">-</div>
                    {rows2?.map((row, i) => {
                      return (
                        <div className="w-20 p-1 test-r pl-2">
                          {row?.specification?.structure_condition}
                        </div>
                      );
                    })}
                  </div>

                  <div className="test d-flex">
                    <div className="w-25 p-1 test-r m-0">
                      Location of project/property
                    </div>
                    <div className="w-15 text-left p-1 pl-2 test-r">-</div>
                    {rows2?.map((row, i) => {
                      return (
                        <div className="w-20 p-1 test-r pl-2">
                          {row?.location}
                        </div>
                      );
                    })}
                  </div>
                  <div className="test d-flex">
                    <div className="w-25 p-1 test-r m-0">
                      Distance from our property
                    </div>
                    <div className="w-15 text-left p-1 pl-2 test-r">-</div>
                    {rows2?.map((row, i) => {
                      return (
                        <div className="w-20 p-1 test-r pl-2">
                          {row?.report_date}
                        </div>
                      );
                    })}
                  </div>
                  <div className="test d-flex">
                    <div className="w-25 p-1 test-r m-0">
                      Main road/internal
                    </div>
                    <div className="w-15 text-left p-1 pl-2 test-r">-</div>
                    {rows2?.map((row, i) => {
                      return (
                        <div className="w-20 p-1 test-r pl-2">
                          {row?.road_name}
                        </div>
                      );
                    })}
                  </div>
                  <div className="test d-flex">
                    <div className="w-25 p-1 test-r m-0">Shape of the Plot</div>
                    <div className="w-15 text-left p-1 pl-2 test-r">-</div>
                    {rows2?.map((row, i) => {
                      return (
                        <div className="w-20 p-1 test-r pl-2">
                          {row?.specification?.unit_length_shape}
                        </div>
                      );
                    })}
                  </div>
                  <div className="test d-flex">
                    <div className="w-25 p-1 test-r m-0">
                      Zoning as per Development plan
                    </div>
                    <div className="w-15 text-left p-1 pl-2 test-r">-</div>
                    {rows2?.map((row, i) => {
                      return (
                        <div className="w-20 p-1 test-r pl-2">
                          {row?.report_date}
                        </div>
                      );
                    })}
                  </div>
                  <div className="test d-flex">
                    <div className="w-25 p-1 test-r m-0">
                      Applicable FSI as per norms
                    </div>
                    <div className="w-15 text-left p-1 pl-2 test-r">-</div>
                    {rows2?.map((row, i) => {
                      return (
                        <div className="w-20 p-1 test-r pl-2">
                          {row?.project?.permissible_FSI}
                        </div>
                      );
                    })}
                  </div>
                  <div className="test d-flex">
                    <div className="w-25 p-1 test-r m-0">Plot Area /size</div>
                    <div className="w-15 text-left p-1 pl-2 test-r">-</div>
                    {rows2?.map((row, i) => {
                      return (
                        <div className="w-20 p-1 test-r pl-2">
                          {row?.valuation?.type?.plot_area}
                        </div>
                      );
                    })}
                  </div>
                  <div className="test d-flex">
                    <div className="w-25 p-1 test-r m-0">Rate</div>
                    <div className="w-15 text-left p-1 pl-2 test-r">-</div>
                    {rows2?.map((row, i) => {
                      return (
                        <div className="w-20 p-1 test-r pl-2">
                          {row?.plot_rate}
                        </div>
                      );
                    })}
                  </div>

                  <div className="test d-flex">
                    <div className="w-25 p-1 test-r m-0">
                      Project/Unit with Amenities
                    </div>
                    <div className="w-15 text-left p-1 pl-2 test-r">-</div>
                    {rows2?.map((row, i) => {
                      return (
                        <div className="w-20 p-1 test-r pl-2">
                          {row?.report_date}
                        </div>
                      );
                    })}
                  </div>
                  <div className="test d-flex">
                    <div className="w-25 p-1 test-r m-0">Observations</div>
                    <div className="w-15 text-left p-1 pl-2 test-r">-</div>
                    {rows2?.map((row, i) => {
                      return (
                        <div className="w-20 p-1 test-r pl-2">
                          {row?.report_date}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ReportContext.Provider>
  );
}
const mapStateToProps = (state) => {
  return {
    login: state.login,
    avm: state.avm,
    property: state.property,
    comparable: state.comparable,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getProperty1: (data) => dispatch(getProperty1(data)),
    getProperty2: (data) => dispatch(getProperty2(data)),
    getProperty3: (data) => dispatch(getProperty3(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ComparableReport);
