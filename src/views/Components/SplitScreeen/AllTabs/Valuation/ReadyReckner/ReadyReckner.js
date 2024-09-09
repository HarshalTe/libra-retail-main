import React from 'react'
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import ReportCustomTextField from "./../../../../../../components/MuiComponents/ReportCustomTextField";
import * as Yup from "yup";
import { Divider, Switch, Typography } from "@mui/material";
import { Button, Col, Row } from "reactstrap";
import { connect } from "react-redux";
import printJS from "print-js";
import {getReadyrecknersList} from "../../../../../../Redux/Creators/ReadyRecknersCreators"
// import HeatMapRadius from '../../AllTabs/Valuation/UpdateValuation/HeatMapRadius';

export const ReportContext = React.createContext();
function ReadyReckner(props) {
  const [checked, setChecked] = React.useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const rows = props.readyReckners?.isLoading
  ? []
  : props.readyReckners?.readyReckners?.length > 0
    ? props.readyReckners?.readyReckners
    : [];
console.log("objectprops",rows,props)
React.useEffect(() => {
  const token = props.login?.login?.token;
  let data = {
    token: token,
  };
  props.getReadyrecknersList(data);
}, []);

const foundObject = rows.find(obj => obj.cs_no === props.property?.property?.project?.cts_no);
    const [print, setPrint] = React.useState(false);
console.log("objectprops",props)
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
  return (
    <ReportContext.Provider value={{ print }}>
      <Row>
       <Col md={8} style={{"color":"red"}}>
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
      </Row>
      <Row>

      <Col md={8}>

              <Typography variant={"h5"}>Ready Reckoner</Typography>
      </Col>
      <Col md={4}>

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

              <div>
                <div id="htmlToPdf2" className={print ? "f-10" : "f-14"}>
                  <div className="logo">
                  </div>
                  <div className=" 1-page test text-center pdf-h-w ">
                    <h1 className=" p-1 m-0 test color-red bg-navy text-white">
                   DIVISION / VILLAGE : {foundObject?.village_name}
                      {" "}
                      
                    </h1>
                    <h3 className=" p-1 m-0 test bg-navy text-white">
                   Commence From 1st April 2023 To 31st March 2024
                      {" "}
                      
                    </h3>
                    <div className="test d-flex">
                      <div className="text-left w-20 p-1 test-r m-0 bg-red text-white">
                        Type of Area:
                      </div>
                      <div className="text-left w-30 p-1 test-r m-0">
                      {foundObject?.area_type}
                      </div>
                      <div className="text-left w-20 p-1 test-r m-0 bg-navy text-white">
                        Local Body Type
                      </div>
                      <div className="text-left w-30 p-1 test-r m-0">
                      {foundObject?.local_body_type}
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="text-left w-20 p-1 test-r m-0 bg-navy text-white">
                        Local Body Name:
                      </div>
                      <div className="text-left w-80 p-1 test-r m-0">
                      {foundObject?.local_body_name}
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="text-left w-20 p-1 test-r m-0 bg-red text-white">
                        Land Mark:
                      </div>
                      <div className="text-left w-80 p-1 test-r m-0">
                      {foundObject?.landmark}
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="text-right w-100 p-1 test-l m-0 bg-navy text-white">
                        Rate of  Land + Building in ₹ per sq. m. Build-Up
                      </div>
                      
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-l m-0">
                        Zone
                      </div>
                      <div className="w-20 p-1 test-l m-0">
                        Sub Zone
                      </div>
                      <div className="w-20 p-1 test-l m-0">
                        Land
                      </div>
                      <div className="w-25 p-1 test-l m-0">
                        Residential
                      </div>
                      <div className="w-20 p-1 test-l m-0">
                        Office
                      </div>
                      <div className="w-20 p-1 test-l m-0">
                        Shop
                      </div>
                      <div className="w-15 p-1 test-l m-0">
                        Industrial
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="w-20 p-1 test-l m-0">
                      {foundObject?.zone}
                      </div>
                      <div className="w-20 p-1 test-l m-0">
                      {foundObject?.subzone}
                      </div>
                      <div className="w-20 p-1 test-l m-0">
                      {foundObject?.land}
                      </div>
                      <div className="w-25 p-1 test-l m-0">
                      {foundObject?.residential}
                      </div>
                      <div className="w-20 p-1 test-l m-0">
                      {foundObject?.office}
                      </div>
                      <div className="w-20 p-1 test-l m-0">
                      {foundObject?.shop}
                      </div>
                      <div className="w-15 p-1 test-l m-0">
                      {foundObject?.industrial}
                      </div>
                    </div>
                    <div className="test d-flex">
                      <div className="text-left w-100 p-1 test-l m-0">
                      Cts. No. :- {foundObject?.cs_no}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    
  </ReportContext.Provider>
  )
}
const mapStateToProps = (state) => {
  return {
    login: state.login,
    property: state.property,
    readyReckners: state.readyReckners,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getReadyrecknersList: (data) => dispatch(getReadyrecknersList(data)),
  };
};


export default connect(mapStateToProps,mapDispatchToProps)(ReadyReckner);
