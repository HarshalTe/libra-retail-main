// import React from "react";
// import { connect } from "react-redux";

// import "./Report1.css";
// import printJS from "print-js";

// import TextField from "@material-ui/core/TextField";
// import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { Divider, Typography } from "@mui/material";
// import { Button } from "reactstrap";
// import Logo from "../../../../../assets/topbanner.jpeg";

// function Unkownreport(props) {
//   console.log("props", props);

//   const printPdf = () => {
//     printJS({
//       printable: "htmlToPdf2",
//       type: "html",
//       scanStyles: true,
//       targetStyles: "[*]",
//       font_size: "8pt",
//       maxWidth: 1080,
//       base64: true,
//       honorMarginPadding: false,
//     });
//   };

//   return (
//     <div>
//       <Button
//         color="warning w-20  m-3 float-right"
//         onClick={printPdf}
//         block
//         className="print-button"
//       >
//         <i className="fa fa-eye mr-2" />
//         Print Report
//       </Button>
//       <Formik
//         initialValues={{
//           text_area: props?.property?.property?.annexure?.text_area,
//           surname: props?.property?.property?.surname,
//           customer_name: props?.property?.property?.customer_name,
//         }}
//         // onSubmit={handleSubmit}
//         validationSchema={Yup.object().shape({
//           // branch_name: Yup.string().required("Branch Name is required"),
//         })}
//       >
//         {(formProps) => {
//           return (
//             <Form>
//               <Typography variant={"h5"}>Report 1</Typography>
//               {/* <Divider /> */}
//               <br />
//               {/* <div id="htmlToPdf2" className="f-8">
//                 <div dangerouslySetInnerHTML={{ __html: myHTML }} />
//               </div> */}

//               {/* <div className="">
//                 <div className="" id="htmlToPdf2">
//                   <h4 className="text-center mb-3">VALUATION REPORT</h4>
//                   <div className="purchase-order">
//                     <div className="purchase-order-1">
//                       <div className="purchase-order-1-section-1">
//                         <div className="purchase-order-1-section-1-item-1">
//                           <span></span>
//                           <span style={{ fontWeight: "bold" }}></span>
//                           <p style={{ marginBottom: "0px" }}></p>
//                           <p style={{ marginBottom: "0px" }}></p>
//                           <p style={{ marginBottom: "0px" }}></p>
//                           <p style={{ marginBottom: "0px" }}></p>
//                         </div>
//                         <div className="purchase-order-1-section-1-item-2">
//                           <span></span>
//                           <div style={{ fontWeight: "bold" }}>
//                             <TextField
//                               fullWidth
//                               label="Annexure"
//                               variant="standard"
//                               id="text_area"
//                               name="text_area"
//                               value={formProps.values.text_area}
//                               onChange={formProps.handleChange}
//                             />
//                           </div>
//                           <div style={{ fontWeight: "bold" }}>
//                             <TextField
//                               fullWidth
//                               id="customer_name"
//                               name="customer_name"
//                               label="Customer Name"
//                               variant="standard"
//                               value={formProps.values.customer_name}
//                               onChange={formProps.handleChange}
//                               error={
//                                 formProps.touched.customer_name &&
//                                 Boolean(formProps.errors.customer_name)
//                               }
//                               helperText={
//                                 formProps.touched.customer_name &&
//                                 formProps.errors.customer_name
//                               }
//                             />
//                           </div>
//                           <div style={{ fontWeight: "bold" }}>
//                             <TextField
//                               fullWidth
//                               id="surname"
//                               name="surname"
//                               label="Surname"
//                               variant="standard"
//                               value={formProps.values.surname}
//                               onChange={formProps.handleChange}
//                               error={
//                                 formProps.touched.surname &&
//                                 Boolean(formProps.errors.surname)
//                               }
//                               helperText={
//                                 formProps.touched.surname &&
//                                 formProps.errors.surname
//                               }
//                             />
//                           </div>

//                           <div style={{ fontWeight: "bold" }}></div>
//                           <div style={{ fontWeight: "bold" }}></div>
//                         </div>

//                         <div className="purchase-order-1-section-1-item-3">
//                           <span></span>
//                           <span
//                             style={{
//                               fontWeight: "bold",
//                               fontSize: "17px",
//                             }}
//                           ></span>
//                           <div>
//                             <span></span>
//                             <span
//                               className="ml-2"
//                               style={{ fontWeight: "bold" }}
//                             ></span>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="purchase-order-1-section-2">
//                         <div className="purchase-order-1-section-2-item-1">
//                           <div className="purchase-order-1-section-2-item-1-table-1">
//                             <div className="purchase-order-1-section-2-item-1-table-1-item-1">
//                               <span></span>
//                               <span
//                                 className="ml-1"
//                                 style={{ fontWeight: "600" }}
//                               ></span>
//                             </div>
//                             <div
//                               className="purchase-order-1-section-2-item-1-table-1-item-1"
//                               style={{ textAlign: "center" }}
//                             >
//                               <span style={{ fontWeight: "bold" }}></span>
//                               <span className="ml-1"></span>
//                             </div>
//                             <div className="purchase-order-1-section-2-item-1-table-1-item-1">
//                               <span style={{ fontWeight: "bold" }}> </span>
//                             </div>

//                             <div className="purchase-order-1-section-2-item-1-table-1-item-2">
//                               <span></span>
//                               <span
//                                 className="ml-1"
//                                 style={{ fontWeight: "bold" }}
//                               ></span>
//                             </div>
//                           </div>
//                           <div className="purchase-order-1-section-2-item-1-table-2">
//                             <div className="purchase-order-1-section-2-item-1-table-1-item-1">
//                               <span></span>
//                               <span
//                                 className="ml-1"
//                                 style={{ fontWeight: "bold" }}
//                               ></span>
//                             </div>
//                             <div className="purchase-order-1-section-2-item-1-table-1-item-1"></div>
//                             <div className="purchase-order-1-section-2-item-1-table-1-item-1">
//                               <span></span>
//                               <span style={{ fontWeight: "bold" }}></span>
//                             </div>

//                             <div className="purchase-order-1-section-2-item-1-table-1-item-2">
//                               <span></span>
//                               <span
//                                 className="ml-1"
//                                 style={{ fontWeight: "bold" }}
//                               >
//                                 {" "}
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="purchase-order-1-section-2-item-2">
//                           <span></span>
//                           <p style={{ fontWeight: "bold" }}></p>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="purchase-order-2">
//                       <div className="purchase-order-2-sextion-1">
//                         <div className="purchase-order-2-sextion-2-header-1"></div>
//                         <div className="purchase-order-2-sextion-2-header-2"></div>
//                         <div className="purchase-order-2-sextion-2-header-3"></div>
//                         <div className="purchase-order-2-sextion-2-header-4"></div>
//                         <div className="purchase-order-2-sextion-2-header-5"></div>
//                         <div className="purchase-order-2-sextion-2-header-6"></div>
//                         <div className="purchase-order-2-sextion-2-header-7"></div>
//                         <div className="purchase-order-2-sextion-2-header-8"></div>
//                       </div>

//                       <div className="purchase-order-2-sextion-1">
//                         <div className="purchase-order-2-sextion-2-header-1"></div>
//                         <div
//                           className="purchase-order-2-sextion-2-header-2"
//                           style={{
//                             textAlign: "right",
//                             paddingRight: "10px",
//                           }}
//                         ></div>
//                         <div className="purchase-order-2-sextion-2-header-3"></div>
//                         <div className="purchase-order-2-sextion-2-header-4"></div>
//                         <div className="purchase-order-2-sextion-2-header-5"></div>
//                         <div
//                           className="purchase-order-2-sextion-2-header-6"
//                           style={{ fontWeight: "bold", fontSize: "10px" }}
//                         ></div>
//                         <div className="purchase-order-2-sextion-2-header-7"></div>
//                         <div
//                           className="purchase-order-2-sextion-2-header-8"
//                           style={{ fontWeight: "bold", fontSize: "10px" }}
//                         ></div>
//                       </div>

//                       <div className="purchase-order-2-sextion-1">
//                         <div className="purchase-order-2-sextion-2-header-1"></div>
//                         <div
//                           className="purchase-order-2-sextion-2-header-2"
//                           style={{
//                             textAlign: "right",
//                             paddingRight: "10px",
//                           }}
//                         ></div>
//                         <div className="purchase-order-2-sextion-2-header-3"></div>
//                         <div className="purchase-order-2-sextion-2-header-4"></div>
//                         <div className="purchase-order-2-sextion-2-header-5"></div>
//                         <div
//                           className="purchase-order-2-sextion-2-header-9"
//                           style={{ fontWeight: "bold" }}
//                         ></div>
//                       </div>
//                     </div>

//                     <div className="purchase-order-3">
//                       <div className="purchase-order-3-section-1"></div>
//                       <div className="purchase-order-3-section-2">
//                         <span style={{ fontWeight: "bold" }}></span>
//                       </div>
//                       <div className="purchase-order-3-section-3"></div>
//                     </div>
//                   </div>
//                 </div>
//               </div> */}

//               {/* <Row className="form-group">
//                 <Col>
//                   <Button
//                     size="medium"
//                     color="success"
//                     fullWidth
//                     // className="float-center"
//                     // variant="outlined"
//                     variant="contained"
//                   >
//                     Next
//                   </Button>
//                 </Col>
//               </Row> */}
//             </Form>
//           );
//         }}
//       </Formik>
//     </div>
//   );
// }

// const mapStateToProps = (state) => {
//   return {
//     login: state.login,
//     property: state.property,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     // getPropertiesPage: (data) => dispatch(getPropertiesPage(data)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Unkownreport);
import "./Report1.css";

export default function Unkownreport() {
  return (
    <div style={{ overflow: "scroll", width: "100%" }}>
      {/* Hello HelpForDev */}
      <div className="helpForDev" style={{ border: "3px solid black" }}>
        <label htmlFor="test">HelpForDev </label>
        <input type="text" id="test" />
      </div>
      {/* <p>it Works !! :)</p>a */}
      <table cellSpacing={0} border={0} className="table table-bordered">
        {/* <colgroup width={32} />
        <colgroup width={32} />
        <colgroup span={5} width={23} />
        <colgroup width={50} />
        <colgroup span={7} width={23} /> */}
        <tbody>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              height={20}
              a
              colspan="8"
            >
              <b>
                <font face="Arial" color="#000008">
                  VALUATION REPORT FORMAT FOR LAP/BT/TOP UP /SELF CONST
                </font>
              </b>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
              height={35}
            >
              <b>
                <font face="Arial" color="#000008">
                  A.GENERAL DETAILS
                </font>
              </b>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Report Date
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <b>
                <font face="Arial" color="#000008">
                  <input
                    style={{ width: 100 }}
                    type="text"
                    defaultValue="{{$getreport->report2_reportdate}}"
                    id="report2_reportdate"
                    name="report2_reportdate"
                  />
                </font>
              </b>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                1
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Prospect Number
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font color="#000000">
                <textarea
                  style={{ width: "100%" }}
                  type="text"
                  className="pdfinput"
                  id="report2_prospectno"
                  name="report2_prospectno"
                  defaultValue={"{{$getreport->report2_prospectno}}"}
                />
                <br />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                2
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Type of Loan
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <b>
                <font face="Arial" color="#000008">
                  <textarea
                    type="text"
                    className="pdfinput"
                    style={{ width: "100%" }}
                    id="report2_typeofloan"
                    name="report2_typeofloan"
                    defaultValue={
                      "@isset($getreport->report2_typeofloan){{$getreport->report2_typeofloan}}@endisset"
                    }
                  />
                </font>
              </b>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                3
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Name of the Customer
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <b>
                <font face="Arial" color="#000008">
                  <textarea
                    type="text"
                    style={{ width: "100%" }}
                    className="pdfinput"
                    id="report2_nameofcustomer"
                    name="report2_nameofcustomer"
                    defaultValue={"{{$getreport->report2_nameofcustomer}}"}
                  />
                </font>
              </b>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              height={52}
            >
              <font face="Arial" color="#000000">
                4
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Name of Property Owner as per draft deed / ownership documents
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <b>
                <font face="Arial" color="#000008">
                  <textarea
                    style={{ width: "100%" }}
                    type="text"
                    className="pdfinput"
                    id="report2_nameofpropertyowner"
                    name="report2_nameofpropertyowner"
                    defaultValue={"{{$getreport->report2_nameofpropertyowner}}"}
                  />
                </font>
              </b>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                5
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Property Address as per site
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font color="#000000">
                <textarea
                  type="text"
                  className="pdfinput"
                  style={{ width: "100%" }}
                  id="report2_propertyaddressatsite"
                  name="report2_propertyaddressatsite"
                  defaultValue={"{{$getreport->report2_propertyaddressatsite}}"}
                />
                <br />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                6
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Legal address of property
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font color="#000000">
                <textarea
                  style={{ width: "100%" }}
                  type="text"
                  className="pdfinput"
                  id="report2_legaladdressofproperty"
                  name="report2_legaladdressofproperty"
                  defaultValue={
                    "{{$getreport->report2_legaladdressofproperty}}"
                  }
                />
                <br />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                7
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Contact no of the Owner
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_contactnoofowner}}"
                  className="pdfinput"
                  id="report2_contactnoofowner"
                  name="report2_contactnoofowner"
                />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font face="Arial" color="#000000">
                Name of Tenant if Applicable
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                <input
                  style={{ width: 100 }}
                  type="text"
                  defaultValue="{{$getreport->report2_tenantifapp}}"
                  className="pdfinput"
                  id="report2_tenantifapp"
                  name="report2_tenantifapp"
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              height={35}
            >
              <font face="Arial" color="#000000">
                8
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Technical documents made available for verification
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_techdocsavailver}}"
                  id="report2_techdocsavailver"
                  name="report2_techdocsavailver"
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                8
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Landmark
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_landmark}}"
                  id="report2_landmark"
                  name="report2_landmark"
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                9
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Date of Technical Visit
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_dateoftechnicalvisit}}"
                  id="report2_dateoftechnicalvisit"
                  name="report2_dateoftechnicalvisit"
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              height={35}
            >
              <font face="Arial" color="#000000">
                10
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Property Usage
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                AS per doc
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <b>
                <font face="Arial" color="#000008">
                  <input
                    type="text"
                    defaultValue="{{$getreport->report2_propertyusage_asperdoc}}"
                    id="report2_propertyusage_asperdoc"
                    name="report2_propertyusage_asperdoc"
                  />
                </font>
              </b>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                On site
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <b>
                <font face="Arial" color="#000008">
                  <input
                    type="text"
                    defaultValue="{{$getreport->report2_propertyusage_onsite}}"
                    id="report2_propertyusage_onsite"
                    name="report2_propertyusage_onsite"
                  />
                </font>
              </b>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                11
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Occupancy
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <b>
                <font face="Arial" color="#000008">
                  <input
                    type="text"
                    id="report2_occupancy"
                    name="report2_occupancy"
                    defaultValue="@isset($getreport->report2_occupancy){{$getreport->report2_occupancy}}@endisset"
                  />
                </font>
              </b>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              height={35}
            >
              <font face="Arial" color="#000000">
                12
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Property falls in demolition list of local authority
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                <input
                  type="text"
                  style={{ width: "auto" }}
                  defaultValue="@isset($getreport->report2_propfallsindemolition){{$getreport->report2_propfallsindemolition}}@endisset"
                  id="report2_propfallsindemolition"
                  name="report2_propfallsindemolition"
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                13
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Marketability
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                <input
                  type="text"
                  style={{ width: "auto" }}
                  defaultValue="@isset($getreport->report2_marketability){{$getreport->report2_marketability}}@endisset"
                  id="report2_marketability"
                  name="report2_marketability"
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                14
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Front Side Road Width
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                <input
                  type="text"
                  style={{ width: "auto" }}
                  defaultValue="{{$getreport->report2_frontsideroadwidth}}"
                  id="report2_frontsideroadwidth"
                  name="report2_frontsideroadwidth"
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="8"
            >
              <b>
                <font face="Arial" color="#000008">
                  B. SURROUNDING LOCALITY DETAILS
                </font>
              </b>
            </td>
            <td align="left" valign="bottom">
              <font color="#000000">
                <br />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                1
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Ward No/ Municipal land No
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_wardnoormunicipallandno}}"
                  id="report2_wardnoormunicipallandno"
                  name="report2_wardnoormunicipallandno"
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                2
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Type of locality
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_typeoflocality}}"
                  id="report2_typeoflocality"
                  name="report2_typeoflocality"
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                3
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Type of the Property
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_typeofproperty}}"
                  id="report2_typeofproperty"
                  name="report2_typeofproperty"
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                4
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Distance From City Centre
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_distancefromcitycentre}}"
                  id="report2_distancefromcitycentre"
                  name="report2_distancefromcitycentre"
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                5
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Site Access
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_siteaccess}}"
                  id="report2_siteaccess"
                  name="report2_siteaccess"
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              height={20}
              align="left"
              valign="middle"
            >
              <font face="Arial" color="#000000">
                6
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Approving Authority:
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font color="#000000">
                <br />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              height={20}
              align="left"
              valign="middle"
            >
              <font face="Arial" color="#000000">
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Corporation Limit
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font face="Arial" color="#000000">
                <input
                  type="text"
                  defaultValue="@isset ($getreport->report2_corporationlimit){{$getreport->report2_corporationlimit}}@endisset"
                  id="report2_corporationlimit"
                  name="report2_corporationlimit"
                />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font face="Arial" color="#000000">
                Municipal Limit/DA
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font face="Arial" color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_municipallimitorda}}"
                  id="report2_municipallimitorda"
                  name="report2_municipallimitorda"
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              height={20}
              align="left"
              valign="middle"
            >
              <font face="Arial" color="#000000">
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Town Panchayat
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_approvingauthority_townpanchayat}}"
                  id="report2_approvingauthority_townpanchayat"
                  name="report2_approvingauthority_townpanchayat"
                />
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font face="Arial" color="#000000">
                Village Panchayat
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font face="Arial" color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_villagepanchayat}}"
                  id="report2_villagepanchayat"
                  name="report2_villagepanchayat"
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                7
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Conditions of Approach Road
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_approvingauthority_condition1}}"
                  id="report2_approvingauthority_condition1"
                  name="report2_approvingauthority_condition1"
                />
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font face="Arial" color="#000000">
                Mud road Width
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_approvingauthority_mudroadwidth}}"
                  id="report2_approvingauthority_mudroadwidth"
                  name="report2_approvingauthority_mudroadwidth"
                />
                <br />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="8"
              height={20}
            >
              <b>
                <font face="Arial" color="#000008">
                  C. PROPERTY DETAILS
                </font>
              </b>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                1
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                No of Floors Constructed
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_nooffloors}}"
                  id="report2_nooffloors"
                  name="report2_nooffloors"
                />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font color="#000000">
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font color="#000000">
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font color="#000000">
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font color="#000000">
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font color="#000000">
                <br />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                2
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Floor Wise Usage
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                <input
                  type="text"
                  style={{ width: "auto" }}
                  defaultValue="@isset($getreport->report2_floorwiseusage){{$getreport->report2_floorwiseusage}}@endisset"
                  id="report2_floorwiseusage"
                  name="report2_floorwiseusage"
                />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font color="#000000">
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font color="#000000">
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font color="#000000">
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font color="#000000">
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font color="#000000">
                <br />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              height={43}
            >
              <font face="Arial" color="#000000">
                3
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Age of the property
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font face="Arial" color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_ageofproperty}}"
                  id="report2_ageofproperty"
                  name="report2_ageofproperty"
                />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font face="Arial" color="#000000">
                Residual age
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font face="Arial" color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_residualage}}"
                  id="report2_residualage"
                  name="report2_residualage"
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                4
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <b>
                <font face="Arial" color="#000008">
                  Side Boundaries
                </font>
              </b>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font color="#000000">
                <br />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                &nbsp;
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                &nbsp;
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font face="Arial" color="#000000">
                As per document
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font face="Arial" color="#000000">
                As per site
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font face="Arial" color="#000000">
                As per plan
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                &nbsp;
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                North
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_asperdoc_north}}"
                  id="report2_asperdoc_north"
                  name="report2_asperdoc_north"
                />
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font face="Arial" color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_aspersite_north}}"
                  id="report2_aspersite_north"
                  name="report2_aspersite_north"
                />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_asperplan_north}}"
                  id="report2_asperplan_north"
                  name="report2_asperplan_north"
                />
                <br />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                &nbsp;
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                South
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_asperdoc_south}}"
                  id="report2_asperdoc_south"
                  name="report2_asperdoc_south"
                />
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font face="Arial" color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_aspersite_south}}"
                  id="report2_aspersite_south"
                  name="report2_aspersite_south"
                />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_asperplan_south}}"
                  id="report2_asperplan_south"
                  name="report2_asperplan_south"
                />
                <br />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                &nbsp;
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                East
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_asperdoc_east}}"
                  id="report2_asperdoc_east"
                  name="report2_asperdoc_east"
                />
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font face="Arial" color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_aspersite_east}}"
                  id="report2_aspersite_east"
                  name="report2_aspersite_east"
                />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_asperplan_east}}"
                  id="report2_asperplan_east"
                  name="report2_asperplan_east"
                />
                <br />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                &nbsp;
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                West
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_asperdoc_west}}"
                  id="report2_asperdoc_west"
                  name="report2_asperdoc_west"
                />
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font face="Arial" color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_aspersite_west}}"
                  id="report2_aspersite_west"
                  name="report2_aspersite_west"
                />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_asperplan_west}}"
                  id="report2_asperplan_west"
                  name="report2_asperplan_west"
                />
                <br />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                5
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Boundaries are matching or not
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                <input
                  type="text"
                  style={{ width: "auto" }}
                  defaultValue="@isset($getreport->report2_boundariesmatching){{$getreport->report2_boundariesmatching}}@endisset"
                  id="report2_boundariesmatching"
                  name="report2_boundariesmatching"
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                6
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Property Identified through
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_propertyidentifiedthrough}}"
                  id="report2_propertyidentifiedthrough"
                  name="report2_propertyidentifiedthrough"
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                7
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Plot Demarcated at site
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_plotdemarcated}}"
                  id="report2_plotdemarcated"
                  name="report2_plotdemarcated"
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                8
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Amenities
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <b>
                <font face="Arial" color="#000008">
                  <input
                    type="text"
                    defaultValue="{{$getreport->report2_amenities}}"
                    id="report2_amenities"
                    name="report2_amenities"
                  />
                </font>
              </b>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="8"
              height={20}
            >
              <b>
                <font face="Arial" color="#000008">
                  D.STRUCTURAL DETAILS
                </font>
              </b>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                1
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Type of Structure
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font face="Arial" color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_typeofstructure}}"
                  id="report2_typeofstructure"
                  name="report2_typeofstructure"
                />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font face="Arial" color="#000000">
                No of Floors Approved
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font face="Arial" color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_noofrooms}}"
                  id="report2_noofrooms"
                  name="report2_noofrooms"
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                2
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                No of wings
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_noofwings}}"
                  id="report2_noofwings"
                  name="report2_noofwings"
                />{" "}
                wings
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                3
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                No. of flats on each floor
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_noofflatseachfloor}}"
                  id="report2_noofflatseachfloor"
                  name="report2_noofflatseachfloor"
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                4
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Quality of construction
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <b>
                <font face="Arial" color="#000008">
                  <input
                    type="text"
                    style={{ width: "auto" }}
                    defaultValue="@isset($getreport->report2_qualityofconstruction){{$getreport->report2_qualityofconstruction}}@endisset"
                    id="report2_qualityofconstruction"
                    name="report2_qualityofconstruction"
                  />
                </font>
              </b>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                5
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Structural observation
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font face="Arial" color="#000000">
                Cracks if any :{" "}
                <input
                  type="text"
                  style={{ width: "auto" }}
                  defaultValue="@isset($getreport->report2_structuralobsveration){{$getreport->report2_structuralobsveration}}@endisset"
                  id="report2_structuralobsveration"
                  name="report2_structuralobsveration"
                />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="4"
            >
              <b>
                <font face="Arial" color="#000008" />
              </b>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                6
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Configuration
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_configuration}}"
                  id="report2_configuration"
                  name="report2_configuration"
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="8"
              height={20}
            >
              <b>
                <font face="Arial" color="#000008">
                  E. INTERIORS
                </font>
              </b>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                1
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Flooring &amp; finishing.
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_flooringfinishing}}"
                  id="report2_flooringfinishing"
                  name="report2_flooringfinishing"
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                2
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Roofing and terracing
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_roofingandterracing}}"
                  id="report2_roofingandterracing"
                  name="report2_roofingandterracing"
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                3
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Quality of fixtures &amp; Settings
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_qofsettings}}"
                  id="report2_qofsettings"
                  name="report2_qofsettings"
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                4
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Doors &amp; Windows
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_doorsandwindows}}"
                  id="report2_doorsandwindows"
                  name="report2_doorsandwindows"
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="8"
              height={20}
            >
              <b>
                <font face="Arial" color="#000008">
                  F.PLAN APPROVAL DETAILS
                </font>
              </b>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              height={35}
            >
              <font face="Arial" color="#000000">
                1
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Construction as per approved / sanctioned plans
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                <textarea
                  type="text"
                  style={{ width: "100%" }}
                  id="report2_constructionasperapprovedorsanctionedplans"
                  name="report2_constructionasperapprovedorsanctionedplans"
                  defaultValue={
                    "@isset($getreport->report2_constructionasperapprovedorsanctionedplans){{$getreport->report2_constructionasperapprovedorsanctionedplans}}@endisset"
                  }
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              height={76}
              sdval={2}
              sdnum="1033;"
            >
              <font color="#000000">2</font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Details of approved plan with approval no &amp; date
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                <textarea
                  type="text"
                  style={{ width: "100%" }}
                  id="report2_detailsofapprovedplanwithaprnodate"
                  name="report2_detailsofapprovedplanwithaprnodate"
                  defaultValue={
                    "{{$getreport->report2_detailsofapprovedplanwithaprnodate}}"
                  }
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              height={45}
            >
              <font face="Arial" color="#000000">
                3
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Construction permission Number and date.
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                <textarea
                  type="text"
                  style={{ width: "100%" }}
                  id="report2_constpermnoanddate"
                  name="report2_constpermnoanddate"
                  defaultValue={"{{$getreport->report2_constpermnoanddate}}"}
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              height={52}
              sdval={4}
              sdnum="1033;"
            >
              <font color="#000000">4</font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Violations Observed if Any or is there any risk of Demolition in
                case of Violation
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                <textarea
                  style={{ width: "100%" }}
                  type="text"
                  id="report2_violationsobsvered"
                  name="report2_violationsobsvered"
                  defaultValue={"{{$getreport->report2_violationsobsvered}}"}
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              height={60}
            >
              <font face="Arial" color="#000000">
                5
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font color="#000000">
                {" "}
                If plans not available then is the structure confirming to the
                local byelaws
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                <textarea
                  style={{ width: "100%" }}
                  type="text"
                  id="report2_plansnotavailable"
                  name="report2_plansnotavailable"
                  defaultValue={"{{$getreport->report2_plansnotavailable}}"}
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="8"
              height={20}
            >
              <b>
                <font face="Arial" color="#000008">
                  G.DEVIATION DETAILS
                </font>
              </b>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <b>
                <font face="Arial" color="#000008">
                  &nbsp;
                </font>
              </b>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                FLOOR DETAILS
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="4"
            >
              <font face="Arial" color="#000000">
                Deviation in Sqft
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_devsqft}}"
                  id="report2_devsqft"
                  name="report2_devsqft"
                />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font face="Arial" color="#000000">
                Deviation in %
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_devpercent}}"
                  id="report2_devpercent"
                  name="report2_devpercent"
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <b>
                <font face="Arial" color="#000008">
                  <br />
                </font>
              </b>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Floor
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font face="Arial" color="#000000">
                As per plan
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font face="Arial" color="#000000">
                AT SITE
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font face="Arial" color="#000000">
                AT SITE
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <b>
                <font face="Arial" color="#000008">
                  <br />
                </font>
              </b>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Ground floor
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_devsqftasperplan_groundfloor}}"
                  id="report2_devsqftasperplan_groundfloor"
                  name="report2_devsqftasperplan_groundfloor"
                />
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_devspercentatsite1_groundfloor}}"
                  id="report2_devspercentatsite1_groundfloor"
                  name="report2_devspercentatsite1_groundfloor"
                />
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_devspercentatsite2_groundfloor}}"
                  id="report2_devspercentatsite2_groundfloor"
                  name="report2_devspercentatsite2_groundfloor"
                />
                <br />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <b>
                <font face="Arial" color="#000008">
                  <br />
                </font>
              </b>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                First Floor
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_devsqftasperplan_firstfloor}}"
                  id="report2_devsqftasperplan_firstfloor"
                  name="report2_devsqftasperplan_firstfloor"
                />
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_devspercentatsite1_firstfloor}}"
                  id="report2_devspercentatsite1_firstfloor"
                  name="report2_devspercentatsite1_firstfloor"
                />
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_devspercentatsite2_firstfloor}}"
                  id="report2_devspercentatsite2_firstfloor"
                  name="report2_devspercentatsite2_firstfloor"
                />
                <br />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <b>
                <font face="Arial" color="#000008">
                  <br />
                </font>
              </b>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Second Floor
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_devsqftasperplan_secondfloor}}"
                  id="report2_devsqftasperplan_secondfloor"
                  name="report2_devsqftasperplan_secondfloor"
                />
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_devspercentatsite1_secondfloor}}"
                  id="report2_devspercentatsite1_secondfloor"
                  name="report2_devspercentatsite1_secondfloor"
                />
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_devspercentatsite2_secondfloor}}"
                  id="report2_devspercentatsite2_secondfloor"
                  name="report2_devspercentatsite2_secondfloor"
                />
                <br />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="8"
              height={20}
            >
              <b>
                <font face="Arial" color="#000008">
                  H. Self construction case
                </font>
              </b>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                &nbsp;
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                Architect certified estimate available or not
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="4"
            >
              <font face="Arial" color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_architectcertifiedestimate}}"
                  id="report2_architectcertifiedestimate"
                  name="report2_architectcertifiedestimate"
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                Construction Amount certified
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="4"
            >
              <font face="Arial" color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_constructionamtcertified}}"
                  id="report2_constructionamtcertified"
                  name="report2_constructionamtcertified"
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                Others
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="4"
            >
              <font color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_others}}"
                  id="report2_others"
                  name="report2_others"
                />
                <br />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="8"
              height={20}
            >
              <b>
                <font face="Arial" color="#000008">
                  I.FAIR MARKET VALUE
                </font>
              </b>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                1
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                Valuation Methodology
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="4"
            >
              <font face="Arial" color="#000000">
                <input
                  type="text"
                  defaultValue="@if($getreport->report2_compositemethod1 == 'H')Comparison Approach(Flat, Office, Showroom)@else L+B(Bungalows+Industrial Property)@endif"
                  id="report2_compositemethod1"
                  name="report2_compositemethod1"
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              height={35}
              align="left"
              valign="middle"
            >
              <font face="Arial" color="#000000">
                2
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                Particulars
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Description
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Area&nbsp;(in Sft)
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Rate&nbsp;(per sft)
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Total Value
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              height={20}
              align="left"
              valign="middle"
            >
              <font face="Arial" color="#000000">
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                Plot Area
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                <input
                  style={{ width: 100 }}
                  type="text"
                  defaultValue="{{$getreport->report2_plotarea_description}}"
                  id="report2_plotarea_description"
                  name="report2_plotarea_description"
                />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                <input
                  style={{ width: 100 }}
                  type="text"
                  defaultValue="{{$getreport->report2_plotarea_area}}"
                  id="report2_plotarea_area"
                  name="report2_plotarea_area"
                />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                <input
                  style={{ width: 100 }}
                  type="text"
                  defaultValue="{{$getreport->report2_plotarea_rate}}"
                  id="report2_plotarea_rate"
                  name="report2_plotarea_rate"
                />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                <input
                  style={{ width: 100 }}
                  type="text"
                  defaultValue="{{$getreport->report2_plotarea_total}}"
                  id="report2_plotarea_total"
                  name="report2_plotarea_total"
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              height={20}
              align="left"
              valign="middle"
            >
              <font face="Arial" color="#000000">
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                Carpet area as per document
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                <input
                  style={{ width: 100 }}
                  type="text"
                  defaultValue="{{$getreport->report2_carpetareaasperdoc_description}}"
                  id="report2_carpetareaasperdoc_description"
                  name="report2_carpetareaasperdoc_description"
                />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                <input
                  style={{ width: 100 }}
                  type="text"
                  defaultValue="{{$getreport->report2_carpetareaasperdoc_area}}"
                  id="report2_carpetareaasperdoc_area"
                  name="report2_carpetareaasperdoc_area"
                />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                <input
                  style={{ width: 100 }}
                  type="text"
                  defaultValue="{{$getreport->report2_carpetareaasperdoc_rate}}"
                  id="report2_carpetareaasperdoc_rate"
                  name="report2_carpetareaasperdoc_rate"
                />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                <input
                  style={{ width: 100 }}
                  type="text"
                  defaultValue="{{$getreport->report2_carpetareaasperdoc_total}}"
                  id="report2_carpetareaasperdoc_total"
                  name="report2_carpetareaasperdoc_total"
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              height={20}
              align="left"
              valign="middle"
            >
              <font face="Arial" color="#000000">
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                Carpet area as per approved plan
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                <input
                  style={{ width: 100 }}
                  type="text"
                  defaultValue="{{$getreport->report2_carpetareaasperplan_description}}"
                  id="report2_carpetareaasperplan_description"
                  name="report2_carpetareaasperplan_description"
                />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                <input
                  style={{ width: 100 }}
                  type="text"
                  defaultValue="{{$getreport->report2_carpetareaasperplan_area}}"
                  id="report2_carpetareaasperplan_area"
                  name="report2_carpetareaasperplan_area"
                />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                <input
                  style={{ width: 100 }}
                  type="text"
                  defaultValue="{{$getreport->report2_carpetareaasperplan_rate}}"
                  id="report2_carpetareaasperplan_rate"
                  name="report2_carpetareaasperplan_rate"
                />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                <input
                  style={{ width: 100 }}
                  type="text"
                  defaultValue="{{$getreport->report2_carpetareaasperplan_total}}"
                  id="report2_carpetareaasperplan_total"
                  name="report2_carpetareaasperplan_total"
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              height={20}
              align="left"
              valign="middle"
            >
              <font face="Arial" color="#000000">
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                Built up area
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font color="#000000">
                <input
                  style={{ width: 100 }}
                  type="text"
                  defaultValue="{{$getreport->report2_builtuparea_description}}"
                  id="report2_builtuparea_description"
                  name="report2_builtuparea_description"
                />
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                <input
                  style={{ width: 100 }}
                  type="text"
                  defaultValue="{{$getreport->report2_builtuparea_area}}"
                  id="report2_builtuparea_area"
                  name="report2_builtuparea_area"
                />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                <input
                  style={{ width: 100 }}
                  type="text"
                  defaultValue="{{$getreport->report2_builtuparea_rate}}"
                  id="report2_builtuparea_rate"
                  name="report2_builtuparea_rate"
                />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                <input
                  style={{ width: 100 }}
                  type="text"
                  defaultValue="{{$getreport->report2_builtuparea_total}}"
                  id="report2_builtuparea_total"
                  name="report2_builtuparea_total"
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              height={20}
              align="left"
              valign="middle"
            >
              <font face="Arial" color="#000000">
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                Super Built up area
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                <input
                  style={{ width: 100 }}
                  type="text"
                  defaultValue="{{$getreport->report2_superbuiltuparea_description}}"
                  id="report2_superbuiltuparea_description"
                  name="report2_superbuiltuparea_description"
                />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                <input
                  style={{ width: 100 }}
                  type="text"
                  defaultValue="{{$getreport->report2_superbuiltuparea_area}}"
                  id="report2_superbuiltuparea_area"
                  name="report2_superbuiltuparea_area"
                />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                <input
                  style={{ width: 100 }}
                  type="text"
                  defaultValue="{{$getreport->report2_superbuiltuparea_rate}}"
                  id="report2_superbuiltuparea_rate"
                  name="report2_superbuiltuparea_rate"
                />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                <input
                  style={{ width: 100 }}
                  type="text"
                  defaultValue="{{$getreport->report2_superbuiltuparea_total}}"
                  id="report2_superbuiltuparea_total"
                  name="report2_superbuiltuparea_total"
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              height={20}
              align="left"
              valign="middle"
            >
              <font face="Arial" color="#000000">
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                No of parking(open/stilt parking)
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                <input
                  style={{ width: 100 }}
                  type="text"
                  defaultValue="{{$getreport->report2_noofparking_description}}"
                  id="report2_noofparking_description"
                  name="report2_noofparking_description"
                />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font color="#000000">
                <input
                  style={{ width: 100 }}
                  type="text"
                  defaultValue="{{$getreport->report2_noofparking_area}}"
                  id="report2_noofparking_area"
                  name="report2_noofparking_area"
                />
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font color="#000000">
                <input
                  style={{ width: 100 }}
                  type="text"
                  defaultValue="{{$getreport->report2_noofparking_rate}}"
                  id="report2_noofparking_rate"
                  name="report2_noofparking_rate"
                />
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font color="#000000">
                <input
                  style={{ width: 100 }}
                  type="text"
                  defaultValue="{{$getreport->report2_noofparking_total}}"
                  id="report2_noofparking_total"
                  name="report2_noofparking_total"
                />
                <br />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              height={20}
              align="left"
              valign="middle"
            >
              <font face="Arial" color="#000000">
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                Terrace (open / attached)
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font color="#000000">
                <input
                  style={{ width: 100 }}
                  type="text"
                  defaultValue="{{$getreport->report2_terrace_description}}"
                  id="report2_terrace_description"
                  name="report2_terrace_description"
                />
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                <input
                  style={{ width: 100 }}
                  type="text"
                  defaultValue="{{$getreport->report2_terrace_area}}"
                  id="report2_terrace_area"
                  name="report2_terrace_area"
                />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                <input
                  style={{ width: 100 }}
                  type="text"
                  defaultValue="{{$getreport->report2_terrace_rate}}"
                  id="report2_terrace_rate"
                  name="report2_terrace_rate"
                />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                <input
                  style={{ width: 100 }}
                  type="text"
                  defaultValue="{{$getreport->report2_terrace_total}}"
                  id="report2_terrace_total"
                  name="report2_terrace_total"
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              height={20}
              align="left"
              valign="middle"
            >
              <font face="Arial" color="#000000">
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                Amenities value
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                <input
                  style={{ width: 100 }}
                  type="text"
                  defaultValue="{{$getreport->report2_amenitiesvalue_description}}"
                  id="report2_amenitiesvalue_description"
                  name="report2_amenitiesvalue_description"
                />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                <input
                  style={{ width: 100 }}
                  type="text"
                  defaultValue="{{$getreport->report2_amenitiesvalue_area}}"
                  id="report2_amenitiesvalue_area"
                  name="report2_amenitiesvalue_area"
                />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                <input
                  style={{ width: 100 }}
                  type="text"
                  defaultValue="{{$getreport->report2_amenitiesvalue_rate}}"
                  id="report2_amenitiesvalue_rate"
                  name="report2_amenitiesvalue_rate"
                />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                <input
                  style={{ width: 100 }}
                  type="text"
                  defaultValue="{{$getreport->report2_amenitiesvalue_total}}"
                  id="report2_amenitiesvalue_total"
                  name="report2_amenitiesvalue_total"
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              height={20}
              align="left"
              valign="middle"
            >
              <font face="Arial" color="#000000">
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                Depreciation amount
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                <input
                  style={{ width: 100 }}
                  type="text"
                  defaultValue="{{$getreport->report2_depreciationamt_description}}"
                  id="report2_depreciationamt_description"
                  name="report2_depreciationamt_description"
                />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                <input
                  style={{ width: 100 }}
                  type="text"
                  defaultValue="{{$getreport->report2_depreciationamt_area}}"
                  id="report2_depreciationamt_area"
                  name="report2_depreciationamt_area"
                />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                <input
                  style={{ width: 100 }}
                  type="text"
                  defaultValue="{{$getreport->report2_depreciationamt_rate}}"
                  id="report2_depreciationamt_rate"
                  name="report2_depreciationamt_rate"
                />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                <input
                  style={{ width: 100 }}
                  type="text"
                  defaultValue="{{$getreport->report2_depreciationamt_total}}"
                  id="report2_depreciationamt_total"
                  name="report2_depreciationamt_total"
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              height={20}
              align="left"
              valign="middle"
            >
              <font face="Arial" color="#000000">
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
              align="right"
              valign="bottom"
            >
              <font face="Arial" color="#000000">
                Carpet area as per measurements
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="4"
            >
              <b>
                <font face="Arial" color="#000008">
                  <input
                    type="text"
                    defaultValue="{{$getreport->report1_unitdetails_carpetareaaspermeas}}"
                    id="report1_unitdetails_carpetareaaspermeas"
                    name="report1_unitdetails_carpetareaaspermeas"
                  />
                </font>
              </b>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              height={20}
              align="left"
              valign="middle"
            >
              <font face="Arial" color="#000000">
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
              align="right"
              valign="bottom"
            >
              <font face="Arial" color="#000000">
                Fair market value of the property
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="4"
            >
              <b>
                <font face="Arial" color="#000008">
                  <input
                    type="text"
                    defaultValue="{{$getreport->report2_fmvalue_total}}"
                    id="report2_fmvalue_total"
                    name="report2_fmvalue_total"
                  />
                </font>
              </b>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              height={20}
              align="left"
              valign="middle"
            >
              <font face="Arial" color="#000000">
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
              align="right"
              valign="bottom"
            >
              <font face="Arial" color="#000000">
                Realizable value of the property
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="4"
            >
              <b>
                <font face="Arial" color="#000008">
                  <input
                    type="text"
                    defaultValue="{{$getreport->report2_realizablevalue_total}}"
                    id="report2_realizablevalue_total"
                    name="report2_realizablevalue_total"
                  />
                </font>
              </b>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              height={20}
              align="left"
              valign="middle"
            >
              <font face="Arial" color="#000000">
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
              align="right"
              valign="bottom"
            >
              <font face="Arial" color="#000000">
                Distress Value (70%)
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="4"
            >
              <b>
                <font face="Arial" color="#000008">
                  <input
                    type="text"
                    defaultValue="{{$getreport->report2_distressvalue_total}}"
                    id="report2_distressvalue_total"
                    name="report2_distressvalue_total"
                  />
                </font>
              </b>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              height={20}
              align="left"
              valign="middle"
            >
              <font face="Arial" color="#000000">
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
              align="right"
              valign="bottom"
            >
              <font face="Arial" color="#000000">
                Insurable Value
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="4"
            >
              <b>
                <font face="Arial" color="#000008">
                  <input
                    type="text"
                    defaultValue="{{$getreport->report2_insurablevalue}}"
                    id="report2_insurablevalue"
                    name="report2_insurablevalue"
                  />
                </font>
              </b>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                3
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="7"
            >
              <font face="Arial" color="#000000">
                FLOORWISE DETAILS OF USAGE AND RENTAL VALUE
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              height={52}
            >
              <font face="Arial" color="#000000">
                &nbsp;
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Floor
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Usage
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Units
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Value
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <font face="Arial" color="#000000">
                If Tenanted, Year of Current Tenancy
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                Rental Assessment
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                &nbsp;
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                1rd floor
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font color="#000000">
                <input
                  style={{ width: 100 }}
                  type="text"
                  defaultValue="{{$getreport->report2_1stfloor_Usage}}"
                  id="report2_1stfloor_Usage"
                  name="report2_1stfloor_Usage"
                />
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font color="#000000">
                <input
                  style={{ width: 100 }}
                  type="text"
                  defaultValue="{{$getreport->report2_1stfloor_Units}}"
                  id="report2_1stfloor_Units"
                  name="report2_1stfloor_Units"
                />
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <b>
                <font face="Arial" color="#000008">
                  <input
                    style={{ width: 100 }}
                    type="text"
                    defaultValue="{{$getreport->report2_1stfloor_Value}}"
                    id="report2_1stfloor_Value"
                    name="report2_1stfloor_Value"
                  />
                </font>
              </b>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <b>
                <font face="Arial" color="#000008">
                  <input
                    style={{ width: 100 }}
                    type="text"
                    defaultValue="{{$getreport->report2_1stfloor_Iftenanted}}"
                    id="report2_1stfloor_Iftenanted"
                    name="report2_1stfloor_Iftenanted"
                  />
                </font>
              </b>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font color="#000000">
                <input
                  style={{ width: 100 }}
                  type="text"
                  defaultValue="{{$getreport->report2_1stfloor_rentalassessment}}"
                  id="report2_1stfloor_rentalassessment"
                  name="report2_1stfloor_rentalassessment"
                />
                <br />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                &nbsp;
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                2th floor
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font color="#000000">
                <input
                  style={{ width: 100 }}
                  type="text"
                  defaultValue="{{$getreport->report2_2ndfloor_Usage}}"
                  id="report2_2ndfloor_Usage"
                  name="report2_2ndfloor_Usage"
                />
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font color="#000000">
                <input
                  style={{ width: 100 }}
                  type="text"
                  defaultValue="{{$getreport->report2_2ndfloor_Units}}"
                  id="report2_2ndfloor_Units"
                  name="report2_2ndfloor_Units"
                />
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font color="#000000">
                <input
                  style={{ width: 100 }}
                  type="text"
                  defaultValue="{{$getreport->report2_2ndfloor_Value}}"
                  id="report2_2ndfloor_Value"
                  name="report2_2ndfloor_Value"
                />
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="2"
            >
              <b>
                <font face="Arial" color="#000008">
                  <input
                    style={{ width: 100 }}
                    type="text"
                    defaultValue="{{$getreport->report2_2ndfloor_Iftenanted}}"
                    id="report2_2ndfloor_Iftenanted"
                    name="report2_2ndfloor_Iftenanted"
                  />
                </font>
              </b>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font color="#000000">
                <input
                  style={{ width: 100 }}
                  type="text"
                  defaultValue="{{$getreport->report2_2ndfloor_rentalassessment}}"
                  id="report2_2ndfloor_rentalassessment"
                  name="report2_2ndfloor_rentalassessment"
                />
                <br />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                4
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                Stage of construction
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="4"
            >
              <font face="Arial" color="#000000">
                <textarea
                  type="text"
                  id="report2_stageofconstruction1"
                  name="report2_stageofconstruction1"
                  style={{ width: "100%" }}
                  defaultValue={"{{$getreport->report2_stageofconstruction1}}"}
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                5
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                Govt. Guideline value
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="4"
            >
              <font face="Arial" color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_govtguidelinevalue}}"
                  id="report2_govtguidelinevalue"
                  name="report2_govtguidelinevalue"
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                6
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                Demolition Risk
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="4"
            >
              <font face="Arial" color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_demolitionrisk}}"
                  id="report2_demolitionrisk"
                  name="report2_demolitionrisk"
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                7
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                Latitude &amp; longitude of property
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="4"
            >
              <font face="Arial" color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_latitude}}"
                  style={{ width: "auto" }}
                  id="report2_latitude"
                  name="report2_latitude"
                />{" "}
                ,{" "}
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_longitude}}"
                  style={{ width: "auto" }}
                  id="report2_longitude"
                  name="report2_longitude"
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                8
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                Which seismic zone property is located in?
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="4"
            >
              <font face="Arial" color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_seismiczone}}"
                  id="report2_seismiczone"
                  name="report2_seismiczone"
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                9
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                Which cyclone area is the building is located in?
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="4"
            >
              <font face="Arial" color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_cyclonearea}}"
                  id="report2_cyclonearea"
                  name="report2_cyclonearea"
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                10
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                Which flood area is the building is located in?
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="4"
            >
              <font face="Arial" color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_floodarea}}"
                  id="report2_floodarea"
                  name="report2_floodarea"
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font face="Arial" color="#000000">
                11
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="3"
            >
              <font face="Arial" color="#000000">
                Which land slide is the building is located in?
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="4"
            >
              <font face="Arial" color="#000000">
                <input
                  type="text"
                  defaultValue="{{$getreport->report2_landslide}}"
                  id="report2_landslide"
                  name="report2_landslide"
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="8"
              height={20}
            >
              <b>
                <font face="Arial" color="#000008">
                  Remarks :
                </font>
              </b>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="8"
              height={77}
              valign="bottom"
            >
              <b>
                <font face="Arial" color="#000008">
                  <textarea
                    type="text"
                    style={{ width: "100%" }}
                    id="report2_remarks"
                    name="report2_remarks"
                    defaultValue={"{{$getreport->report2_remarks}}"}
                  />
                </font>
              </b>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
                paddingRight: 10,
              }}
              colspan="8"
              align="justify"
            >
              Declaration:-
              <br />
              <ul>
                <li>
                  Our representative has visited this site. I/We have not
                  verified the title deeds of the properties with the records of
                  the registrar's office as this is beyond the agreed scope of
                  work.Assumptions are made to the best of our knowledge and
                  belief. Reliance is based on the information furnished to us
                  by the identifier AND/OR client.
                </li>
                <li>
                  The valuer shall not be responsible for the matters of legal
                  nature that affects the value and opinion expressed by us.
                </li>
                <li>
                  where a sketched plan is attached to this report,it does not
                  purport to represent accurate architectural plans.Sketch plans
                  and photographs are provided as general illustrations
                  only.Documents furnished to us are returned to the client
                  along with the report. We cannot preserve them.
                </li>
                <li>
                  Fair market value indicated in the report is an opinion of the
                  value prevailing on the date of the said report and is based
                  on market feedback on values of similar properties. Client is
                  free to obtain other independent opinions on the same. Fair,
                  market value of such properties / localities may increase or
                  decrease, depending on the future market conditions &amp;
                  scenarios. value varies with the purpose &amp; date.This
                  report is not to be referred if the purpose is different other
                  than mentioned.No structural survey was conducted by us as it
                  is not in our scope of work
                </li>
                <li>
                  We hereby declare, “The information furnished above is true
                  and correct to the best of our knowledge and belief. We have
                  no direct or indirect interest in the assets valued.
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
            >
              <font color="#000000">
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="7"
            >
              <font face="Arial" color="#000000">
                For Libra Valuers.&nbsp;
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              height={57}
            >
              <font color="#000000">
                <br />
              </font>
            </td>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="7"
              valign="bottom"
            >
              <font face="Arial" color="#000000">
                Place:{" "}
                <input
                  type="text"
                  style={{ width: 200 }}
                  defaultValue="{{$getreport->report2_place}}"
                  id="report2_place"
                  name="report2_place"
                />
                <br /> Date:{" "}
                <input
                  type="text"
                  style={{ width: 200 }}
                  defaultValue="{{$getreport->report2_mumbai}}"
                  id="report2_mumbai"
                  name="report2_mumbai"
                />
              </font>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
              }}
              colspan="8"
              align="center"
              valign="top"
            >
              <font face="Arial" color="#000000">
                Location with coordinates
              </font>
              <br />
              <img
                src="http://maps.googleapis.com/maps/api/staticmap?center={{$getgeotagjson->geolat}},{{$getgeotagjson->geolong}}&size=1000x1000&zoom=17&maptype=hybrid&markers=color:red|{{$getgeotagjson->geolat}},{{$getgeotagjson->geolong}}&key=AIzaSyDsznAFo5vRXAEjWBgk4_yZ_YWKDP8KytE"
                className="thumbnail"
                style={{ width: "100%" }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
