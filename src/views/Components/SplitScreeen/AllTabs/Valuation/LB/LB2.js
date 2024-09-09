import React from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { Row, Col, Table,Modal,ModalBody,ModalHeader } from "reactstrap";
import { Divider, Typography, Tooltip } from "@material-ui/core";
import Button from "@mui/material/Button";

//*switch
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import moment from "moment";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";

//*buttons
import GraphLB from "./GraphLB";
import HeatMapLB from "./HeatMapLB";
import AddCompatable from "../CompatableTabLayout/AddCompatable";
import { editValuationAdditionalData } from "../../../../../../Redux/Creators/ValuationCreators";

//*Actions
import { editValuationData } from "../../../../../../Redux/Creators/ValuationCreators";

//*Component
import EditEconomyTable from "../EditEconomyTable";
import BrokerModalLB from "./BrokerModalLB";
import SiteInspectorLB from "./SiteInspectorLB";
import EditProjectFields from "../EditProjectFields";
import ADD_ONE from "../../../../../../Redux/Types/ActionTypes"
import { useDispatch } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from '@mui/material/Checkbox';
import UpdateValuation from "../UpdateValuation/UpdateValuation";
import RenovationUpload from "../UpdateValuation/RenovationUpload";
import Swal from "sweetalert2";
import { editProgressData } from "../../../../../../Redux/Creators/ProgressCreators";


function LB2(props) {
  const [lb, setLb] = React.useState(1);
  const [plot, setPlot] = React.useState(1);
  const [construction, setConstruction] = React.useState(1);
  const [modal, setModal] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [radio, setRadio] = React.useState();
  const [radio2, setRadio2] = React.useState();
  const [terrace, setTerrace] = React.useState();
  const [garden, setGarden] = React.useState();


  const handleChange = (event) => {
    setChecked(event.target.checked);
  }
  const toggle = () => setModal(!modal);
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  const dispatch = useDispatch();
  const token = props.login?.login?.token;
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);

    let data = {
      // token: token,
      // id: values.id,
      property_id: values.property_id,
      valuation_id: values.valuation_id,

      //*Valuation
      // aggreement_no: values.aggreement_no,
      // aggreement_date: values.aggreement_date,
      // aggreement_value: values.aggreement_value,
      // difference: values.difference,
      // metodology: values.metodology,
      // interest_valued: values.interest_valued,

      // //*
      valuation_type: values.valuation_type,

      // //*
      // plot_value: values.plot_value,
      // plot_area: values.plot_area,
      // development_charge: values.development_charge,
      // other_charges: values.other_charges,
      // final_plot_value: values.final_plot_value,
      // //*
      // construction_value: values.construction_value,
      // ba_area: values.ba_area,
      // const_rate: values.const_rate,
      // const_cost: values.const_cost,
      // deprication_cost: values.deprication_cost,
      // net_value: values.net_value,
      // add_renevotion: values.add_renevotion,
      // pre_renevotion: values.pre_renevotion,
      // final_renevotion: values.final_renevotion,
      // terrace_rights: values.terrace_rights,
      // parking_charges: values.parking_charges,
      // total_value: values.total_value,
      // avm_value: values.avm_value,
      // final_value: values.final_value,
      // rent_per_month: values.rent_per_month,
      // yield: values.yield,
      // distress_value_of_prop: values.distress_value_of_prop,
      // distress_value: values.distress_value,
      // carpet_area: values.carpet_area,
      // builtup_area: values.builtup_area,
      // super_builtup_area: values.super_builtup_area,
      // base_rate: values.base_rate,
      // base_value: values.base_value,
      
      //*me
      land_area_paln: values.land_area_paln,
      land_area_measurement: values.land_area_measurement,
      land_area_aggreement: values.land_area_aggreement,
      BA_plan: values.BA_plan,
      BA_measurement: values.BA_measurement,
      BA_docs: values.BA_docs,
      plot_area: radio,
      plot_value: values.plot_value,
      net_value: +(values.plot_area==null? radio : values.plot_area) * +values.plot_value,
      BA: radio2,
      construction_rate: values.construction_rate,
      construction_cost: +values.construction_rate * +(values.BA==null? radio2:values.BA),
      depreciation_amount: values.depreciation_amount,
      final_const_cost: +(+values.construction_rate * +(values.BA==null? radio2:values.BA)) - +values.depreciation_amount,
      value_L_B: +(values.plot_area==null? radio : values.plot_area) + +values.plot_value + +(+values.construction_rate * +(values.BA==null? radio2:values.BA)) - +values.depreciation_amount,
      land_development: values.land_development,
      amenities_charges: values.amenities_charges,
      parking_charges: values.parking_charges,
      other_charges: values.other_charges,
      final_value: +(values.plot_area==null? radio : values.plot_area) + +values.plot_value + +(+values.construction_rate * +(values.BA==null? radio2:values.BA)) - +values.depreciation_amount +  +values.other_charges + +values.land_development + +values.amenities_charges + +values.parking_charges,
    };

    const value = 1;

    let progressData = {
      id: props?.property?.property?.id,
      valuationProgress: 1,
      plot_rate: values.plot_value,
    };

    swalWithBootstrapButtons
      .fire({
        title:
          "Deviation is more than allowed limit are you sure you want to continue with this value?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, I Accept",
        cancelButtonText: "No, cancel!",
        reverseButtons: false,
      })
      .then((result) => {
        if (result.isConfirmed) {
          props.editProgressData(
            progressData,
            props.setValue,
            value,
            props.login?.login?.token
          );

          props.editValuationAdditionalData(data, props.setValue, value, token);
          setSubmitting(false);
        }
      });
  };
  return (
    <Formik
      initialValues={{
        id: props?.property?.property?.valuation?.id,
        property_id: props?.property?.property?.id,
        valuation_id: props?.property?.property?.valuation?.id,

        //*Valuation
        aggreement_no: props?.property?.property?.valuation?.aggreement_no,
        aggreement_date:
          props?.property?.property?.valuation?.aggreement_date === null
            ? moment().format("YYYY-MM-DD")
            : props?.property?.property?.valuation?.aggreement_date,
        aggreement_value:
          props?.property?.property?.valuation?.aggreement_value,
        difference: props?.property?.property?.valuation?.difference,
        metodology: props?.property?.property?.valuation?.metodology,
        interest_valued: props?.property?.property?.valuation?.interest_valued,

        //*
        valuation_type: "LB",

        //*
        development_charge:
          props?.property?.property?.valuation?.type?.development_charge,
        final_plot_value:
          props?.property?.property?.valuation?.type?.final_plot_value,
        //*
        construction_value:
          props?.property?.property?.valuation?.type?.construction_value,
        ba_area: props?.property?.property?.valuation?.type?.ba_area,
        const_rate: props?.property?.property?.valuation?.type?.const_rate,
        const_cost: props?.property?.property?.valuation?.type?.const_cost,
        deprication_cost:
          props?.property?.property?.valuation?.type?.deprication_cost,
        add_renevotion:
          props?.property?.property?.valuation?.type?.add_renevotion,
        pre_renevotion:
          props?.property?.property?.valuation?.type?.pre_renevotion,
        final_renevotion:
          props?.property?.property?.valuation?.type?.final_renevotion,
        terrace_rights:
          props?.property?.property?.valuation?.type?.terrace_rights,
        total_value: props?.property?.property?.valuation?.type?.total_value,
        avm_value: props?.property?.property?.valuation?.type?.avm_value,
        rent_per_month:
          props?.property?.property?.valuation?.type?.rent_per_month,
        yield: props?.property?.property?.valuation?.type?.yield,
        distress_value_of_prop:
          props?.property?.property?.valuation?.type?.distress_value_of_prop,
        distress_value:
          props?.property?.property?.valuation?.type?.distress_value,
        carpet_area: props?.property?.property?.valuation?.type?.carpet_area,
        builtup_area: props?.property?.property?.valuation?.type?.builtup_area,
        super_builtup_area:
          props?.property?.property?.valuation?.type?.super_builtup_area,
        base_rate: props?.property?.property?.valuation?.type?.base_rate,
        base_value: props?.property?.property?.valuation?.type?.base_value,

        //*me
        add_other_charges: "",

        //!Economic Life
        economic_life:
          props?.property?.property?.valuation?.type?.economic_life,
        //*Project dets
        building_age: props?.property?.property?.project?.building_age,
        residual_age: props?.property?.property?.project?.residual_age,
        //*
        ba_plan: props?.property?.property?.valuation?.type?.ba_plan,
        ba_site: props?.property?.property?.valuation?.type?.ba_site,
        ba_evaluation:
          props?.property?.property?.valuation?.type?.ba_evaluation,
        ba_loading: props?.property?.property?.valuation?.type?.ba_loading,
        superplot_area:
          props?.property?.property?.valuation?.type?.superplot_area,
        spa_doc: props?.property?.property?.valuation?.type?.spa_doc,


        spa_valuation:props?.property?.property?.valuation?.type?.spa_valuation,

        value_L_B:props?.property?.property?.valuation?.type?.value_L_B,
        land_development:props?.property?.property?.valuation?.type?.land_development,
        amenities_charges:props?.property?.property?.valuation?.type?.amenities_charges,
        other_charges:props?.property?.property?.valuation?.type?.other_charges,
        final_value:props?.property?.property?.valuation?.type?.final_value,

        land_area_paln:props?.property?.property?.valuation?.type?.land_area_paln,
        land_area_measurement:props?.property?.property?.valuation?.type?.land_area_measurement,
        land_area_aggreement:props?.property?.property?.valuation?.type?.land_area_aggreement,
        BA_plan:props?.property?.property?.valuation?.type?.BA_plan,
        BA_measurement:props?.property?.property?.valuation?.type?.BA_measurement,
        BA_docs:props?.property?.property?.valuation?.type?.BA_docs,
        plot_area:props?.property?.property?.valuation?.type?.plot_area,
        plot_value:props?.property?.property?.valuation?.type?.plot_value,
        net_value:props?.property?.property?.valuation?.type?.net_value,
        BA:props?.property?.property?.valuation?.type?.BA,
        construction_rate:props?.property?.property?.valuation?.type?.construction_rate,
        construction_cost:props?.property?.property?.valuation?.type?.construction_cost,
        depreciation_amount:props?.property?.property?.valuation?.type?.depreciation_amount,
        final_const_cost:props?.property?.property?.valuation?.type?.final_const_cost,
        garden_charges: props?.property?.property?.valuation?.type?.garden_charges == null ? props?.property?.property?.valuation?.garden_rate * garden : props?.property?.property?.valuation?.type?.garden_charges,
        parking_charges:
        props?.property?.property?.valuation?.type?.parking_charges == null ? +props?.property?.property?.valuation?.covered_car_parking_value + +props?.property?.property?.valuation?.mechanical_car_parking_value + +props?.property?.property?.valuation?.open_parking_value : props?.property?.property?.valuation?.type?.parking_charges,


      }}
      onSubmit={handleSubmit}
      validationSchema={Yup.object().shape({
        //   name: Yup.string().required("Broker Name is required"),
        //   mobile_no: Yup.string().required("Mobile No. is required"),
        //   email: Yup.string().required("Email is required"),
      })}
    >
      {(formProps) => (
        <Form>
          <Row>
            <Col md={12}>
              <Typography>Valuation Table for L+B</Typography>
            </Col>
          </Row>

          {/* <br /> */}

          <Row>
          </Row>
          <br />
          <Divider />
          <br />
          <br />
          <Divider />
          <br />

          <Row>

            {construction === 1 ? (
              <Col md={7}>
                <div style={{ width: "100%", overflowX: "scroll" }}>
                  <Table
                    className="table table-sm"
                    bordered
                    style={{
                      textAlign: "center",
                      overflowX: "scroll",
                      padding: "0px",
                    }}
                  >
                    <thead>
                      <th>Construction Value</th>
                      <th></th>
                    </thead>
                    <tbody>

                    <tr>
                        <td>Land Area (As per Plan)</td>
                        <td>
                          <TextField
                           fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="land_area_paln"
                            name="land_area_paln"
                            value={formProps.values.land_area_paln}
                            onChange={formProps.handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Land Area (As per Measurement)</td>
                        <td>
                          <TextField
                           fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="land_area_measurement"
                            name="land_area_measurement"
                            value={formProps.values.land_area_measurement}
                            onChange={formProps.handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Land Area (As per Aggreement)</td>
                        <td>
                          <TextField
                           fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="land_area_aggreement"
                            name="land_area_aggreement"
                            value={formProps.values.land_area_aggreement}
                            onChange={formProps.handleChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>BA (As per Plan)</td>
                        <td>
                          <TextField
                           fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="BA_plan"
                            name="BA_plan"
                            value={formProps.values.BA_plan}
                            onChange={formProps.handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>BA (As per Measurement)</td>
                        <td>
                          <TextField
                           fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="BA_measurement"
                            name="BA_measurement"
                            value={formProps.values.BA_measurement}
                            onChange={formProps.handleChange}

                          />
                        </td>
                      </tr>
                      <tr>
                        <td>BA (As per Docs)</td>
                        <td>
                          <TextField
                           fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="BA_docs"
                            name="BA_docs"
                            value={formProps.values.BA_docs}
                            onChange={formProps.handleChange}
                          />
                        </td>
                      </tr>

                      <div
                        style={{ "font-size": "14px" }}
                      >
                        <div className="d-flex">
                        <div>

                        <input type="radio" id="caSite" name="la" value="" onClick={(event) => setRadio(formProps.values.land_area_paln)}/>

                        <lable for="caSite">
                        Land Area (As per Plan)
                        </lable>
                          </div>
                        
                        </div>
                        <div className="d-flex">
                            <div>

                        <input type="radio" id="caAggrement" name="la" value="" onClick={(event) =>setRadio(formProps.values.land_area_measurement)}/>
                        <lable for="caSite">
                        Land area (As per Measurment)
                        </lable>
                            </div>
                         
                        </div>
                        <div className="d-flex">
                          <div>
                        <input type="radio" id="caPlan" name="la" value="" onClick={(event) =>setRadio(formProps.values.land_area_aggreement)}/>
                        <lable for="caPlan">
                        Land area (As per Agreement)
                        </lable>
                          </div>
                       
                        </div>
                      </div>

                      <tr>
                        <td>PA</td>
                        <td>
                          <TextField
                           fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="plot_area"
                            name="plot_area"
                            value={formProps.values.plot_area==null? radio : formProps.values.plot_area}
                            onChange={formProps.handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>PA Rates</td>
                        <td>
                          <TextField
                           fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="plot_value"
                            name="plot_value"
                            value={formProps.values.plot_value}
                            onChange={formProps.handleChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>Value</td>
                        <td>
                          <TextField
                           fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="net_value"
                            name="net_value"
                            value={formProps.values.net_value == null ? +(formProps.values.plot_area==null? radio : formProps.values.plot_area) * +formProps.values.plot_value : formProps.values.net_value}
                            onChange={formProps.handleChange}
                         
                          />
                        </td>
                      </tr>
                      <div
                        style={{ "font-size": "14px" }}
                      >
                        <div className="d-flex">
                        <div>

                        <input type="radio" id="caSite" name="ba" value="" onClick={(event) => setRadio2(formProps.values.BA_plan)}/>

                        <lable for="caSite">
                        BA (As per Plan)
                        </lable>
                          </div>
                        
                        </div>
                        <div className="d-flex">
                            <div>

                        <input type="radio" id="caAggrement" name="ba" value="" onClick={(event) =>setRadio2(formProps.values.BA_measurement)}/>
                        <lable for="caSite">
                        BA ( As per Measurment)
                        </lable>
                            </div>
                         
                        </div>
                        <div className="d-flex">
                          <div>
                        <input type="radio" id="caPlan" name="ba" value="" onClick={(event) =>setRadio2(formProps.values.BA_docs)}/>
                        <lable for="caPlan">
                        BA (As per Agreement)
                        </lable>
                          </div>
                       
                        </div>
                      </div>

                      <tr>
                        <td>BA</td>
                        <td>
                          <TextField
                           fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="BA"
                            name="BA"
                            value={formProps.values.BA==null? radio2:formProps.values.BA}
                            onChange={formProps.handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Construction Rate</td>
                        <td>
                          <TextField
                           fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="construction_rate"
                            name="construction_rate"
                            value={formProps.values.construction_rate}
                            onChange={formProps.handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Construction Cost</td>
                        <td>
                          <TextField
                           fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="construction_cost"
                            name="construction_cost"
                            value={formProps.values.construction_cost == null ? +formProps.values.construction_rate * +(formProps.values.BA==null? radio2:formProps.values.BA) : formProps.values.construction_cost}
                            onChange={formProps.handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Depreciation Amount</td>
                        <td>
                          <TextField
                           fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="depreciation_amount"
                            name="depreciation_amount"
                            value={formProps.values.depreciation_amount}
                            onChange={formProps.handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Final const cost</td>
                        <td>
                          <TextField
                          disabled
                           fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="final_const_cost"
                            name="final_const_cost"
                            value={formProps.values.final_const_cost==null ? +(+formProps.values.construction_rate * +(formProps.values.BA==null? radio2:formProps.values.BA)) - +formProps.values.depreciation_amount : formProps.values.final_const_cost}
                            onChange={formProps.handleChange}
                          />
                        </td>
                      </tr>
                   
                      <tr>
                        <td>Value(L+B)</td>
                        <td>
                          <TextField
                          disabled
                           fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="value_L_B"
                            name="value_L_B"
                            value={formProps.values.value_L_B ==null ? +(formProps.values.plot_area==null? radio : formProps.values.plot_area) + +formProps.values.plot_value + +(+formProps.values.construction_rate * +(formProps.values.BA==null? radio2:formProps.values.BA)) - +formProps.values.depreciation_amount : formProps.values.value_L_B}
                            onChange={formProps.handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Land Development Cost</td>
                        <td>
                          <TextField
                           fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="land_development"
                            name="land_development"
                            value={formProps.values.land_development}
                            onChange={formProps.handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Amenities Charges</td>
                        <td>
                          <TextField
                           fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="amenities_charges"
                            name="amenities_charges"
                            value={formProps.values.amenities_charges}
                            onChange={formProps.handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Parking Charges</td>
                        <td>
                          <TextField
                           fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="parking_charges"
                            name="parking_charges"
                            value={formProps.values.parking_charges}
                            onChange={formProps.handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Other Charges</td>
                        <td>
                          <TextField
                           fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="other_charges"
                            name="other_charges"
                            value={formProps.values.other_charges}
                            onChange={formProps.handleChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>Final Value</td>
                        <td>
                          <TextField
                          disabled
                           fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="final_value"
                            name="final_value"
                            value={formProps.values.final_value==null ? +(formProps.values.plot_area==null? radio : formProps.values.plot_area) + +formProps.values.plot_value + +(+formProps.values.construction_rate * +(formProps.values.BA==null? radio2:formProps.values.BA)) - +formProps.values.depreciation_amount +  +formProps.values.other_charges + +formProps.values.land_development + +formProps.values.amenities_charges + +formProps.values.parking_charges : formProps.values.final_value}
                            onChange={formProps.handleChange}
                          />
                        </td> 
                      </tr>

                    {console.log("object2",+(formProps.values.plot_area==null? radio : formProps.values.plot_area) + +formProps.values.plot_value + +(+formProps.values.construction_rate * +(formProps.values.BA==null? radio2:formProps.values.BA)) - +formProps.values.depreciation_amount +  +formProps.values.other_charges + +formProps.values.land_development + +formProps.values.amenities_charges + +formProps.values.parking_charges) }

                    </tbody>
                  </Table>
                </div>
              </Col>
            ) : (
              <Col md={7}></Col>
            )}
          <Col md={5} className="mt-4">
              <div style={{ width: "100%" }}>
                
              <div style={{"border":"2px solid #b6daeaad"}}>
                  <div
                    style={{ background: "#ddedff", opacity: "1","margin": "4px","display": "flex","justify-content": "space-between" }}
                  >
                    <div
                      style={{
                        "font-weight": "600",
                        "font-size": "16px",
                        "color": "black",
                        "margin": "2px"
                      }}
                    >
                      Depriciation:
                      {
                        props?.property?.property?.valuation?.type
                          ?.deprication_cost
                      }
                    </div>
                    <UpdateValuation name="Depriciation"/>
                  </div>
                  <div style={{"margin": "5px"}}>
                    <div>
                      <div
                        style={{ "font-size": "14px", "color": "black" , "font-weight": "600" }}
                      >
                        <li>
                          Depriciated Value:
                          {
                            props?.property?.property?.valuation?.depricated_value
                          }
                        </li>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{"border":"2px solid #b6daeaad"}}>
                  <div
                    style={{ background: "#ddedff", opacity: "1","margin": "4px","display": "flex","justify-content": "space-between" }}
                  >
                    <div
                      style={{
                        "font-weight": "600",
                        "font-size": "16px",
                        "color": "black",
                        "margin": "2px"
                      }}
                    >
                     Parking:
                      {
                        +props?.property?.property?.valuation?.covered_car_parking_value + +props?.property?.property?.valuation?.mechanical_car_parking_value + +props?.property?.property?.valuation?.open_parking_value
                      }
                    </div>
                    <UpdateValuation name="Parking"/>
                  </div>
                  <div style={{"margin": "5px"}}>
                    <div>
                      <div
                        style={{ "font-size": "14px", "color": "black" , "font-weight": "600" }}
                      >
                        <li>Covered Car Parking</li>
                        <div>NO.:{props?.property?.property?.valuation?.covered_car_parking_no}</div>
                        <div>
                          Value:{props?.property?.property?.valuation?.covered_car_parking_value}
                        </div>
                        <li>Mechanical stack Parking</li>
                        <div>NO.:{props?.property?.property?.valuation?.mechanical_stack_parking_no}</div>
                        <div>
                          Value:{props?.property?.property?.valuation?.mechanical_car_parking_value}
                        </div>
                        <li>Open Car Parking</li>
                        <div>NO.:{props?.property?.property?.valuation?.open_parking_no}</div>
                        <div>
                          Value:{props?.property?.property?.valuation?.open_parking_value}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{"border":"2px solid #b6daeaad"}}>
                  <div
                    style={{ background: "#ddedff", opacity: "1","margin": "4px","display": "flex","justify-content": "space-between" }}
                  >
                    <div
                      style={{
                        "font-weight": "600",
                        "font-size": "16px",
                        "color": "black",
                        "margin": "2px"
                      }}
                    >
                    Terrace value: {props?.property?.property?.valuation?.terrace_rate * terrace}
                    </div>
                    <UpdateValuation name="Terrace"/>
                  </div>
                  <div style={{"margin": "5px"}}>
                    <div>
                    <div
                        style={{ "font-size": "14px", "color": "black" , "font-weight": "600" }}
                      >
                        <div className="d-flex">
                        <div>

                        <input type="radio" id="caSite" name="ca" value="" onClick={(event) => setTerrace(props?.property?.property?.valuation?.terrace_per_plan)}/>
                          <lable>Area as per plan:{props?.property?.property?.valuation?.terrace_per_plan}</lable>

                        
                          </div>
                        
                        </div>
                        <div className="d-flex">
                            <div>

                        <input type="radio" id="caAggrement" name="ca" value="" onClick={(event) =>setTerrace(props?.property?.property?.valuation?.terrace_per_site)}/>
                      <lable>Area as per site:{props?.property?.property?.valuation?.terrace_per_site}</lable>
                       
                            </div>
                         
                        </div>
                        <div className="d-flex">
                          <div>
                        <input type="radio" id="caPlan" name="ca" value="" onClick={(event) =>setTerrace(props?.property?.property?.valuation?.terrace_per_doc)}/>
                        <lable>Area as per Document:{props?.property?.property?.valuation?.terrace_per_doc}</lable>
                       
                          </div>
                       
                        </div>
                      </div>
                      <div
                        style={{ "font-size": "14px", "color": "black" , "font-weight": "600" }}
                      >
                        <li>Terrace Rate:{props?.property?.property?.valuation?.terrace_rate}</li>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{"border":"2px solid #b6daeaad"}}>
                  <div
                    style={{ background: "#ddedff", opacity: "1","margin": "4px","display": "flex","justify-content": "space-between" }}
                  >
                    <div
                      style={{
                        "font-weight": "600",
                        "font-size": "16px",
                        "color": "black",
                        "margin": "2px"
                      }}
                    >
                     Garden Value: {props?.property?.property?.valuation?.garden_rate * garden}
                    </div>
                    <UpdateValuation name="Garden"/>
                  </div>
                  <div style={{"margin": "5px"}}>
                    <div>
                    <div
                        style={{ "font-size": "14px", "color": "black" , "font-weight": "600" }}
                      >
                        <div className="d-flex">
                        <div>

                        <input type="radio" id="caSite" name="ca" value="" onClick={(event) => setGarden(props?.property?.property?.valuation?.garden_per_plan)}/>
                        <lable>Area as per plan:{props?.property?.property?.valuation?.garden_per_plan}</lable>

                        
                          </div>
                        
                        </div>
                        <div className="d-flex">
                            <div>

                        <input type="radio" id="caAggrement" name="ca" value="" onClick={(event) =>setGarden(props?.property?.property?.valuation?.garden_per_doc)}/>
                        <lable>Area as per Document:{props?.property?.property?.valuation?.garden_per_doc}</lable>
                     
                            </div>
                         
                        </div>
                        <div className="d-flex">
                          <div>
                        <input type="radio" id="caPlan" name="ca" value="" onClick={(event) =>setGarden(props?.property?.property?.valuation?.garden_per_site)}/>
                        <lable>Area as per site:{props?.property?.property?.valuation?.garden_per_site}</lable>
                        
                          </div>
                       
                        </div>
                      </div>
                      <div
                        style={{ "font-size": "14px", "color": "black" , "font-weight": "600" }}
                      >
                        <li>Garden Area:{props?.property?.property?.valuation?.garden_per_area}</li>
                        <li>Garden Rate considered for valuation:{props?.property?.property?.valuation?.garden_rate}</li>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{"border":"2px solid #b6daeaad"}}>
                  <div
                    style={{ background: "#ddedff", opacity: "1","margin": "4px","display": "flex","justify-content": "space-between" }}
                  >
                    <div
                      style={{
                        "font-weight": "600",
                        "font-size": "16px",
                        "color": "black",
                        "margin": "2px"
                      }}
                    >
                      Rent:
                      {
                        props?.property?.property?.valuation?.type
                          ?.rent_per_month
                      }
                    </div>
                    <UpdateValuation name="Rent"/>
                  </div>
                  <div style={{"margin": "5px"}}>
                    <div>
                      <div
                        style={{ "font-size": "14px", "color": "black" , "font-weight": "600" }}
                      >
                          <li>Gross Rent Per Month:{props?.property?.property?.valuation?.rent_per_month}</li>
                          <li>Gross Rent Per Sq.ft.:{props?.property?.property?.valuation?.rent_per_sqrft}</li>
                        {/* <li>Area as per Document:</li> */}
                        <li>Other Expenses / Property Tax:{props?.property?.property?.valuation?.externel_expenses}</li>
                        <li>Yield:{props?.property?.property?.valuation?.yield}</li>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{"border":"2px solid #b6daeaad"}}>
                  <div
                    style={{ background: "#ddedff", opacity: "1","margin": "4px","display": "flex","justify-content": "space-between" }}
                  >
                    <div
                      style={{
                        "font-weight": "600",
                        "font-size": "16px",
                        "color": "black",
                        "margin": "2px"
                      }}
                    >
                     Additional Charges:{props?.property?.property?.valuation?.additional_charges}
                    </div>
                    <UpdateValuation name="Additional Charges"/>
                  </div>
                  <div style={{"margin": "5px"}}>
                    <div>
                      <div
                        style={{ "font-size": "14px", "color": "black" , "font-weight": "600" }}
                      >
                         <li>Additional Charges:{props?.property?.property?.valuation?.additional_charges}</li>
                        <li>Description:{props?.property?.property?.valuation?.description}</li>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{"border":"2px solid #b6daeaad"}}>
                  <div
                    style={{ background: "#ddedff", opacity: "1","margin": "4px","display": "flex","justify-content": "space-between" }}
                  >
                    <div
                      style={{
                        "font-weight": "600",
                        "font-size": "16px",
                        "color": "black",
                        "margin": "2px"
                      }}
                    >
                     Age:
                    </div>
                    <UpdateValuation name="Age"/>
                  </div>
                  <div style={{"margin": "5px"}}>
                    <div>
                      <div
                        style={{ "font-size": "14px", "color": "black" , "font-weight": "600" }}
                      >
                            <li>
                          Age As per site inspection:
                          {
                            props?.property?.property?.valuation?.as_per_site_inspection
                          }
                        </li>
                            <li>
                          Age As per Aggrement:
                          {
                            props?.property?.property?.valuation?.age_per_agreement
                          }
                        </li>
                        <li>
                          Residual age of Bulding:
                          {
                            props?.property?.property?.valuation?.type
                              ?.residual_age
                          }
                        </li>
                            <li>
                            Estimated Age of building:
                          {props?.property?.property?.valuation?.esitimated_age}
                        </li>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{"border":"2px solid #b6daeaad"}}>
                  <div
                    style={{ background: "#ddedff", opacity: "1","margin": "4px","display": "flex","justify-content": "space-between" }}
                  >
                    <div
                      style={{
                        "font-weight": "600",
                        "font-size": "16px",
                        "color": "black",
                        "margin": "2px"
                      }}
                    >
                     Distress Value:{" "}
                      {
                        props?.property?.property?.valuation?.type
                          ?.distress_value
                      }
                    </div>
                    <UpdateValuation name="Distress Value"/>
                  </div>
                  <div style={{"margin": "5px"}}>
                    <div>
                      <div
                        style={{ "font-size": "14px", "color": "black" , "font-weight": "600" }}
                      >
                            <li>
                            Distress Value:
                          {
                            props?.property?.property?.valuation?.distress_value
                          }
                        </li>
                        <li>
                        Distress Percentage:
                          {
                            props?.property?.property?.valuation?.distress_percentage
                          }
                        </li>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{"border":"2px solid #b6daeaad"}}>
                  <div
                    style={{ background: "#ddedff", opacity: "1","margin": "4px","display": "flex","justify-content": "space-between" }}
                  >
                    <div
                      style={{
                        "font-weight": "600",
                        "font-size": "16px",
                        "color": "black",
                        "margin": "2px"
                      }}
                    >
                     Renevotion Value:{" "}
                      {/* {
                        props?.property?.property?.valuation?.renevotion_value
                      } */}
                    </div>
                    <RenovationUpload name="Renevotion Value"/>
                  </div>
                  <div style={{"margin": "5px"}}>
                    <div>
                      <div
                        style={{ "font-size": "14px", "color": "black" , "font-weight": "600" }}
                      >
                            <li>
                            Renevotion Value:
                          {
                            props?.property?.property?.valuation?.renevotion_value
                          }
                        </li>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{"border":"2px solid #b6daeaad"}}>
                  <div
                    style={{ background: "#ddedff", opacity: "1","margin": "4px","display": "flex","justify-content": "space-between" }}
                  >
                    <div
                      style={{
                        "font-weight": "600",
                        "font-size": "16px",
                        "color": "black",
                        "margin": "2px"
                      }}
                    >
                     Forced Value:
                    </div>
                    <UpdateValuation name="Forced Value"/>
                  </div>
                  <div style={{"margin": "5px"}}>
                    <div>
                      <div
                        style={{ "font-size": "14px", "color": "black" , "font-weight": "600" }}
                      >
                              <li>Forced Sale Value:{props?.property?.property?.valuation?.forced_sale_value}</li>
                              <li>Realization Value:{props?.property?.property?.valuation?.realization_value}</li>
                   
                      </div>
                    </div>
                  </div>
                </div>
                
                
              </div>
            </Col>
          </Row>

          <br />
          <Divider />
          <br />
          <Row>
            {/* <Col md={4}>
              <AddCompatable />
            </Col>
            <Col md={4}>
              <GraphLB />
            </Col>
            <Col md={4}>
              <HeatMapLB />
            </Col> */}
          </Row>

          <br />
          <Divider />
          <br />

          <Row className="form-group pb-4">
            <Col>
            <Tooltip title="Submit" placement="left">
            <Button
                color="success"
                variant="contained"
                disabled={formProps.isSubmitting}
                fullWidth
                type="submit"
                onClick={() => toggle()}
                // onClick={()=>dispatch(ADD_ONE())}
              >
                Next
              </Button>
      </Tooltip>
  
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    // propertyid: state.properties.propertyid,
    property: state.property,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editValuationAdditionalData: (data, setValue, value, token) =>
      dispatch(editValuationAdditionalData(data, setValue, value, token)),
    editValuationData: (data, setValue, value, token) =>
      dispatch(editValuationData(data, setValue, value, token)),
      editProgressData: (progressData, setValue, value, token) =>
      dispatch(editProgressData(progressData, setValue, value, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LB2);
