import React from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { Row, Col, Table } from "reactstrap";
import { Divider, Typography, Tooltip } from "@material-ui/core";
import Button from "@mui/material/Button";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
// import Typography from '@mui/material/Typography';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

//*switch
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import moment from "moment";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";

//*buttons
import AddCompatable from "../CompatableTabLayout/AddCompatable";
import AddCompatableCom from "./AddCompatableCom";
import HeatMapComparison from "./HeatMapComparison";
import EditComparison from "./EditComparison";
import Checkbox from "@mui/material/Checkbox";
import SiteInspector from "./SiteInspectorModal";
import BrokerDetailsCom from "./BrokerModalCom";

//*Actions
import { editValuationAdditionalData } from "../../../../../../Redux/Creators/ValuationCreators";

//*Compoenets
import EditEconomyTable from "../EditEconomyTable";
import BrokerModalCom from "./BrokerModalCom";
import SiteInspectorModal from "./SiteInspectorModal";
import EditProjectFields from "../EditProjectFields";
import Box from "@mui/material/Box";
// import LinearProgressWithLabel from ".../ProjectDetails/LinearProgressWithLabel";
import ProgressLabel2 from "./ProgressLabel2";
import MenuItem from "@mui/material/MenuItem";
import { editProgressData } from "../../../../../../Redux/Creators/ProgressCreators";
import Swal from "sweetalert2";
import RenovationUpload from "../UpdateValuation/RenovationUpload";
import UpdateValuation from "../UpdateValuation/UpdateValuation";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { editPropertiesReOpen } from "../../../../../../Redux/Creators/AvmCreators";

function ComparisonApproach2(props) {
  const [progress, setProgress] = React.useState(0);

  const [comparison, setComparison] = React.useState(1);
  const [carpet, setCarpet] = React.useState(1);
  const [modal, setModal] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [radio, setRadio] = React.useState();
  const [terrace, setTerrace] = React.useState();
  const [garden, setGarden] = React.useState();

  const [Value, setValue] = React.useState(0);

  const handleChangeRadio = (event) => {
    setValue(event.target.value);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const toggle = () => setModal(!modal);
  const token = props.login?.login?.token;

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  console.log("Values:", radio);

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

      //*
      valuation_type: values.valuation_type,

      //*
      plot_value: values.plot_value,
      property_value: +Value.toFixed(2),
      plot_area: values.plot_area,
      development_charge: values.development_charge,
      other_charges: values.other_charges,
      final_plot_value: values.final_plot_value,
      garden_charges: +props?.property?.property?.valuation?.garden_rate * +garden,
      //*
      construction_value: values.construction_value,
      ba_area: values.ba_area,
      const_rate: values.const_rate,
      const_cost: values.const_cost,
      deprication_cost: values.deprication_cost,
      net_value: values.net_value,
      add_renevotion: props?.property?.property?.valuation?.renevotion_value,
      pre_renevotion: values.pre_renevotion,
      final_renevotion: values.final_renevotion,
      terrace_rights: values.terrace_rights,
      parking_charges: values.parking_charges,
      total_value: values.total_value,
      avm_value: values.avm_value,
      final_value: (+props?.property?.property?.valuation?.renevotion_value + +props?.property?.property?.valuation?.terrace_rate * terrace + +values.parking_charges + +values.other_charges + +values.plot_value).toFixed(2),
      rent_per_month: values.rent_per_month,
      yield: values.yield,
      distress_value_of_prop: values.distress_value_of_prop,
      distress_value: values.distress_value,
      builtup_rate: values.builtup_rate,
      carpet_area: radio,
      builtup_area: (+(values.carpet_area==null? radio : values.carpet_area) * +values.bua_loading).toFixed(2),
      super_builtup_area: +(values.carpet_area==null? radio : values.carpet_area) * +values.sbua_loading,
      base_rate: values.base_rate,
      base_value: values.base_value,
      bua_loading: values.bua_loading,
      sbua_loading: values.sbua_loading,
      carpet_rate: ((+props?.property?.property?.valuation?.renevotion_value + +props?.property?.property?.valuation?.terrace_rate * terrace + +values.parking_charges + +values.other_charges + +values.plot_value)/+(values.carpet_area==null? radio : values.carpet_area)).toFixed(2),
      // seller_market_value: values.seller_market_value,
      // parking_no: values.parking_no,
      // rent_per_month: values.rent_per_month,

      //*me
    };

    console.log("objectdata",data)

    const value = 1;

    let progressData = {
      id: props?.property?.property?.id,
      valuationProgress: 1,
      plot_rate: values.base_rate,
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
  const formPropsLength = 18;
  

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
        valuation_type: "CA",

        //*
        plot_value: props?.property?.property?.valuation?.type?.plot_value,
        property_value: props?.property?.property?.valuation?.type?.property_value,
        plot_area: props?.property?.property?.valuation?.type?.plot_area,
        development_charge:
          props?.property?.property?.valuation?.type?.development_charge,
        other_charges:
          props?.property?.property?.valuation?.type?.other_charges,
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
        net_value: props?.property?.property?.valuation?.type?.net_value,
        add_renevotion:
          props?.property?.property?.valuation?.type?.add_renevotion,
        pre_renevotion:
          props?.property?.property?.valuation?.type?.pre_renevotion,
        final_renevotion:
          props?.property?.property?.valuation?.type?.final_renevotion,
        terrace_rights:
          props?.property?.property?.valuation?.type?.terrace_rights == null ? props?.property?.property?.valuation?.terrace_rate * terrace : props?.property?.property?.valuation?.type?.terrace_rights,
        parking_charges:
          props?.property?.property?.valuation?.type?.parking_charges == null ? +props?.property?.property?.valuation?.covered_car_parking_value + +props?.property?.property?.valuation?.mechanical_car_parking_value + +props?.property?.property?.valuation?.open_parking_value : props?.property?.property?.valuation?.type?.parking_charges,
        total_value: props?.property?.property?.valuation?.type?.total_value,
        avm_value: props?.property?.property?.valuation?.type?.avm_value,
        final_value: props?.property?.property?.valuation?.type?.final_value,
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
        builtup_rate: props?.property?.property?.valuation?.type?.builtup_rate,
        super_builtup_rate: props?.property?.property?.valuation?.type?.super_builtup_rate,
        base_value: props?.property?.property?.valuation?.type?.base_value,
        bua_loading: props?.property?.property?.valuation?.type?.bua_loading,
        sbua_loading: props?.property?.property?.valuation?.type?.sbua_loading,
        garden_charges: props?.property?.property?.valuation?.type?.garden_charges == null ? props?.property?.property?.valuation?.garden_rate * garden : props?.property?.property?.valuation?.type?.garden_charges,

        //*me
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
        spa_valuation:
          props?.property?.property?.valuation?.type?.spa_valuation,
        seller_market_value:
          props?.property?.property?.valuation?.type?.seller_market_value,
        parking_no: props?.property?.property?.valuation?.type?.parking_no,
        carpet_rate:
          props?.property?.property?.valuation?.type?.carpet_rate,
        customer_rent:
          props?.property?.property?.valuation?.type?.customer_rent,
      }}
      onSubmit={handleSubmit}
      validationSchema={Yup.object().shape({
        //   email: Yup.string().required("Email is required"),
      })}
    >
      {(formProps) => {
        console.log("formprops",formProps.values)
        return(
        <Form>
          <div className="pb-4">
            <Box sx={{ width: "100%" }}>
              <ProgressLabel2 value={progress} />
            </Box>
            {/* <Divider/> */}
          </div>
         

          <br />

          <Row>
            {carpet === 1 ? (
              <Col md={7}>
                <div style={{ width: "100%", overflowX: "scroll" }}>
                  <br />
                  <Table

                    className=" table-sm"
                    bordered
                    style={{
                      "font-size":"14px",
                      padding: "1px !important",
                      margin: "0 !important",
                      textAlign: "center",
                      overflowX: "scroll",
                    }}
                  >
                    <thead>
                      <th></th>
                      <th></th>
                    </thead>
                    <tbody>


{/* new field above */}

                      <tr>
                        <td style={{ fontSize: "14px" }}>
                          Carpet Area &#x1F4F1;
                        </td>
                        <td>
                          <TextField
                          disabled
                            fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="carpet_area"
                            name="carpet_area"
                            value={formProps.values.carpet_area==null? radio : formProps.values.carpet_area}
                            onChange={formProps.handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Loading For BUA (On CA)</td>
                        <td>
                          <TextField
                            fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="bua_loading"
                            name="bua_loading"
                            value={formProps.values.bua_loading}
                            onChange={formProps.handleChange}
                            onBlur={() => {
                              if (formProps.values.bua_loading)
                                setProgress(progress + 100 / formPropsLength);
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Built up Area &#x1F4F1;</td>
                        <td>
                          <TextField
                            fullWidth
                            disabled
                            variant="standard"
                            size="small"
                            id="builtup_area"
                            name="builtup_area"
                            value={(+(formProps.values.carpet_area==null? radio : formProps.values.carpet_area) * +formProps.values.bua_loading).toFixed(2)}
                            onChange={formProps.handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Loading For SBUA (On CA)</td>
                        <td>
                          <TextField
                            fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="sbua_loading"
                            name="sbua_loading"
                            value={formProps.values.sbua_loading}
                            onChange={formProps.handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Super Built up Area &#x1F4F1;</td>
                        <td>
                          <TextField
                          disabled
                            fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="super_builtup_area"
                            name="super_builtup_area"
                            value={(+(formProps.values.carpet_area==null? radio : formProps.values.carpet_area) * +formProps.values.sbua_loading).toFixed(2)}
                            onChange={formProps.handleChange}
                            onBlur={() => {
                              if (formProps.values.super_builtup_area)
                                setProgress(progress + 100 / formPropsLength);
                            }}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>Carpet rate per sqf</td>
                        <td>
                          <TextField
                            fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="base_rate"
                            name="base_rate"
                            value={formProps.values.base_rate}
                            onChange={formProps.handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Builtup rate per sqf</td>
                        <td>
                          <TextField
                            fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="builtup_rate"
                            name="builtup_rate"
                            value={formProps.values.builtup_rate}
                            onChange={formProps.handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Super Builtup rate per sqf</td>
                        <td>
                          <TextField
                            fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="super_builtup_rate"
                            name="super_builtup_rate"
                            value={formProps.values.super_builtup_rate}
                            onChange={formProps.handleChange}
                          />
                        </td>
                      </tr>
                      {/* <tr>
                      <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={Value}
        onChange={handleChangeRadio}
      >
        <FormControlLabel value={formProps.values.carpet_area==null? radio : formProps.values.carpet_area} control={<Radio size="small" />} label="CA" />
        <FormControlLabel value={formProps.values.carpet_area==null? radio : formProps.values.carpet_area * +formProps.values.loading_bua} control={<Radio size="small"/>} label="BUA" />
        <FormControlLabel value={formProps.values.super_builtup_area} control={<Radio size="small"/>} label="SBUA" />
      </RadioGroup>
    </FormControl>
                      </tr> */}
                      <tr>
                      <div
                        style={{ "font-size": "14px","display": "flex","justify-content": "space-around" }}
                      >
                        <div className="d-flex">
                        <div>

                        <input type="radio" id="caSite" name="ca" value="" onClick={(event) => setValue(+(formProps.values.carpet_area==null? radio : formProps.values.carpet_area) * formProps.values.base_rate)}/>

                        <lable for="caSite">
                        CA
                        </lable>
                          </div>
                        
                        </div>
                        <div className="d-flex">
                            <div>

                        <input type="radio" id="caAggrement" name="ca" value="" onClick={(event) =>setValue(+(+(formProps.values.carpet_area==null? radio : formProps.values.carpet_area) * +formProps.values.bua_loading) * formProps.values.builtup_rate)}/>
                        <lable for="caSite">
                        BUA
                        </lable>
                            </div>
                         
                        </div>
                        <div className="d-flex">
                          <div>
                        <input type="radio" id="caPlan" name="ca" value="" onClick={(event) =>setValue(+(+(formProps.values.carpet_area==null? radio : formProps.values.carpet_area) * +formProps.values.sbua_loading) * formProps.values.super_builtup_rate)}/>
                        <lable for="caPlan">
                        SBUA
                        </lable>
                          </div>
                       
                        </div>
                      </div>
                      </tr>
                      {/* {console.log("objectvalue",Value,+(formProps.values.carpet_area==null? radio : formProps.values.carpet_area) * +formProps.values.bua_loading)} */}
                      <tr>
                        <td>Property Value</td>
                        <td>
                          <TextField
                            disabled
                            fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="property_value"
                            name="property_value"
                            value={formProps.values.property_value == null? +Value.toFixed(2) : formProps.values.property_value}
                            onChange={formProps.handleChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>Add for renovation</td>
                        <td>
                          <TextField
                            fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="add_renevotion"
                            name="add_renevotion"
                            value={+props?.property?.property?.valuation?.renevotion_value}
                            onChange={formProps.handleChange}
                          />
                        </td>
                      </tr>
                     
                      <tr>
                        <td>Add terrace rights</td>
                        <td>
                          <TextField
                          disabled
                            fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="terrace_rights"
                            name="terrace_rights"
                            value={+props?.property?.property?.valuation?.terrace_rate * terrace}
                            onChange={formProps.handleChange}
                            onBlur={() => {
                              if (formProps.values.terrace_rights)
                                setProgress(progress + 100 / formPropsLength);
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Add parking charges &#x1F4F1;</td>
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
                            onBlur={() => {
                              if (formProps.values.parking_charges)
                                setProgress(progress + 100 / formPropsLength);
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Add Garden Charges</td>
                        <td>
                          <TextField
                          disabled
                            fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="garden_charges"
                            name="garden_charges"
                            value={+props?.property?.property?.valuation?.garden_rate * +garden}
                            onChange={formProps.handleChange}
                            onBlur={() => {
                              if (formProps.values.garden_charges)
                                setProgress(progress + 100 / formPropsLength);
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Add other charges</td>
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
                            onBlur={() => {
                              if (formProps.values.other_charges)
                                setProgress(progress + 100 / formPropsLength);
                            }}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>Final Value &#x1F4F1;</td>
                        <td>
                          <TextField
                          disabled
                            fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="final_value"
                            name="final_value"
                            value={formProps.values.final_value==null? (+props?.property?.property?.valuation?.renevotion_value + +props?.property?.property?.valuation?.terrace_rate * terrace + +formProps.values.parking_charges + +formProps.values.other_charges + +formProps.values.plot_value).toFixed(2) : formProps.values.final_value}
                            onChange={formProps.handleChange}
                            onBlur={() => {
                              if (formProps.values.final_value)
                                setProgress(progress + 100 / formPropsLength);
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Carpet Rate</td>
                        <td>
                          <TextField
                          disabled
                            fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="carpet_rate"
                            name="carpet_rate"
                            value={ formProps.values.carpet_rate==null? (( +props?.property?.property?.valuation?.renevotion_value + +props?.property?.property?.valuation?.terrace_rate * terrace + +formProps.values.parking_charges + +formProps.values.other_charges + +formProps.values.plot_value)/+(formProps.values.carpet_area==null? radio : formProps.values.carpet_area)).toFixed(2) : formProps.values.carpet_rate }
                            onChange={formProps.handleChange}
                            onBlur={() => {
                              if (formProps.values.carpet_rate)
                                setProgress(progress + 100 / formPropsLength);
                            }}
                          />
                        </td>
                      </tr>

                    
                    </tbody>
                  </Table>
                </div>
                <br />
              </Col>
            ) : (
              <Col md={7}></Col>
            )}

              {console.log(formProps.values.caSite,"caSite")}
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
                      Carpet Area:  
                      {
                        props?.property?.property?.valuation?.type
                          ?.deprication_cost
                      }
                    </div>
                    <h6>

                    (Select Which ever is Lower)
                    </h6>
                    <UpdateValuation name="Carpet Area"/>
                  </div>
                  <div style={{"margin": "5px"}}>
                    <div>
                      <div
                        style={{ "font-size": "14px", "color": "black" , "font-weight": "600" }}
                      >
                        <div className="d-flex">
                        <div>

                        <input type="radio" id="caSite" name="ca" value="" onClick={(event) => setRadio(props?.property?.property?.valuation?.carpet_area_per_site)}/>

                        <lable for="caSite">
                        Carpet Area As per Site : 
                        {
                            props?.property?.property?.valuation?.carpet_area_per_site
                          }
                        </lable>
                          </div>
                        
                        </div>
                        <div className="d-flex">
                            <div>

                        <input type="radio" id="caAggrement" name="ca" value="" onClick={(event) =>setRadio(props?.property?.property?.valuation?.carpet_area_per_agreement)}/>
                        <lable for="caSite">
                        Carpet Area As per Aggreement : 
                        {
                            props?.property?.property?.valuation?.carpet_area_per_agreement
                          }
                        </lable>
                            </div>
                         
                        </div>
                        <div className="d-flex">
                          <div>
                        <input type="radio" id="caPlan" name="ca" value="" onClick={(event) =>setRadio(props?.property?.property?.valuation?.carpet_area_per_plan)}/>
                        <lable for="caPlan">
                        Carpet Area As per Plan :  
                        {
                            props?.property?.property?.valuation?.carpet_area_per_plan
                          }
                        </lable>
                          </div>
                       
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
          </Row>

          <br />
          <Divider />
          <br />

          <Row className="form-group pb-4">
            <Col>
              <Tooltip title="submit" placement="left">
                <Button
                  color="success"
                  variant="contained"
                  disabled={formProps.isSubmitting}
                  fullWidth
                  type="submit"
                  onClick={() => toggle()}
                >
                  Next
                </Button>
              </Tooltip>
            </Col>
          </Row>
        </Form>
      )}}
    </Formik>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,

    property: state.property,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editValuationAdditionalData: (data, setValue, value, token) =>
      dispatch(editValuationAdditionalData(data, setValue, value, token)),
    editProgressData: (progressData, setValue, value, token) =>
      dispatch(editProgressData(progressData, setValue, value, token)),
      editPropertiesReOpen: (data) => dispatch(editPropertiesReOpen(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComparisonApproach2);
