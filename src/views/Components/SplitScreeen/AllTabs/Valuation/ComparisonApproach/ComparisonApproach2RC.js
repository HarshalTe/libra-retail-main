import React from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { Row, Col, Table } from "reactstrap";
import { Divider, Typography, Tooltip } from "@material-ui/core";
import Button from "@mui/material/Button";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

//*switch
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import moment from "moment";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";

//*buttons
import AddCompatable from "../CompatableTabLayout/AddCompatable";
import AddCompatableCom from "./AddCompatableCom";
import GraphComparison from "./GraphComparison";
import HeatMapComparison from "./HeatMapComparison";
import EditComparison from "./EditComparison";
import Checkbox from "@mui/material/Checkbox";
import SiteInspector from "./SiteInspectorModal";
import BrokerDetailsCom from "./BrokerModalCom";

//*Actions
import { editValuationData } from "../../../../../../Redux/Creators/ValuationCreators";

//*Compoenets
import EditEconomyTable from "../EditEconomyTable";
import BrokerModalCom from "./BrokerModalCom";
import SiteInspectorModal from "./SiteInspectorModal";
import EditProjectFields from "../EditProjectFields";
import Box from "@mui/material/Box";
// import LinearProgressWithLabel from ".../ProjectDetails/LinearProgressWithLabel";
import ProgressLabel2 from "./ProgressLabel2";
import MenuItem from "@mui/material/MenuItem";
import UpdateValuation from "../UpdateValuation/UpdateValuation";
import RenovationUpload from "../UpdateValuation/RenovationUpload";
import Swal from "sweetalert2";
import { editValuationAdditionalData } from "../../../../../../Redux/Creators/ValuationCreators";
import { editProgressData } from "../../../../../../Redux/Creators/ProgressCreators";


function ComparisonApproach2RC(props) {
  const [progress, setProgress] = React.useState(0);

  const [comparison, setComparison] = React.useState(1);
  const [carpet, setCarpet] = React.useState(1);
  const [modal, setModal] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [terrace, setTerrace] = React.useState();
  const [garden, setGarden] = React.useState();
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
      // yield: values.yield,
      // distress_value_of_prop: values.distress_value_of_prop,
      // distress_value: values.distress_value,
      // carpet_area: values.carpet_area,
      // builtup_area: values.builtup_area,
      // super_builtup_area: values.super_builtup_area,
      // base_rate: values.base_rate,
      // base_value: values.base_value,
      // seller_market_value: values.seller_market_value,
      // parking_no: values.parking_no,
      // rent_per_month: values.rent_per_month,

      //*me
      unit_carper_area:values.unit_carper_area,
      insurance_amt:values.insurance_amt,
      maintanance_amt:values.maintanance_amt,
      property_tax:values.property_tax,
      capitalization:values.capitalization,
      final_unit_value:values.final_unit_value,
      market_value:values.market_value,
      yearly_income:+values.unit_carper_area * +values.parameter_1 * 12 + +values.unit_carper_area * +values.parameter_1 * values.parameter_2/100 - +values.property_tax + +values.insurance_amt + +values.maintanance_amt,
      total_gross_income:+values.unit_carper_area * +values.parameter_1 * 12 + +values.unit_carper_area * +values.parameter_1 * values.parameter_2/100 - +values.property_tax + +values.insurance_amt + +values.maintanance_amt,
      total_out_going: +values.property_tax + +values.insurance_amt + +values.maintanance_amt,
      gross_income: +values.unit_carper_area * +values.parameter_1 * 12 + +values.unit_carper_area * +values.parameter_1 * values.parameter_2/100,
      sd_income:+values.unit_carper_area * +values.parameter_1 * values.parameter_2/100,
      monthly_rent_time:+values.unit_carper_area * +values.parameter_1 * 12,
      rent_per_month: +values.unit_carper_area * +values.parameter_1,
      income_per_month: +values.unit_carper_area * +values.parameter_1,
      income_per_year: +values.unit_carper_area * +values.parameter_1 * 12,
    };

    const value = 1;

    let progressData = {
      id: props?.property?.property?.id,
      valuationProgress: 1,
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

  let avm = props?.data?.length<0
  ? []
  : props.avm?.avm?.length > 0
  ? props.avm?.avm?.find((item) => item?.id==props?.property?.property?.id)
  : [];

  console.log("objectpropsavm",props,avm,avm?.base_rate)

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
        valuation_type: "RC",

        //*
        plot_value: props?.property?.property?.valuation?.type?.plot_value,
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
        total_value: props?.property?.property?.valuation?.type?.total_value,
        avm_value: props?.property?.property?.valuation?.type?.avm_value == null ? avm?.base_rate:props?.property?.property?.valuation?.type?.avm_value,
        final_value: props?.property?.property?.valuation?.type?.final_value,
        
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
        spa_valuation:
          props?.property?.property?.valuation?.type?.spa_valuation,
        seller_market_value:
          props?.property?.property?.valuation?.type?.seller_market_value,
        parking_no: props?.property?.property?.valuation?.type?.parking_no,
        market_value: props?.property?.property?.valuation?.type?.market_value,


        rent_per_month:
          props?.property?.property?.valuation?.type?.rent_per_month,
          unit_carper_area:props?.property?.property?.valuation?.type?.unit_carper_area,
          insurance_amt:props?.property?.property?.valuation?.type?.insurance_amt,
          maintanance_amt:props?.property?.property?.valuation?.type?.maintanance_amt,
          property_tax:props?.property?.property?.valuation?.type?.property_tax,
          capitalization:props?.property?.property?.valuation?.type?.capitalization,
          final_unit_value:props?.property?.property?.valuation?.type?.final_unit_value,
          yearly_income:props?.property?.property?.valuation?.type?.yearly_income,
          total_gross_income:props?.property?.property?.valuation?.type?.total_gross_income,
          total_out_going:props?.property?.property?.valuation?.type?.total_out_going,
          gross_income:props?.property?.property?.valuation?.type?.gross_income,
          sd_income:props?.property?.property?.valuation?.type?.sd_income,
          monthly_rent_time:props?.property?.property?.valuation?.type?.monthly_rent_time,
          income_per_month:props?.property?.property?.valuation?.type?.income_per_month,
          income_per_year:props?.property?.property?.valuation?.type?.income_per_year,
          garden_charges: props?.property?.property?.valuation?.type?.garden_charges == null ? props?.property?.property?.valuation?.garden_rate * garden : props?.property?.property?.valuation?.type?.garden_charges,
          terrace_rights:
          props?.property?.property?.valuation?.type?.terrace_rights == null ? props?.property?.property?.valuation?.terrace_rate * terrace : props?.property?.property?.valuation?.type?.terrace_rights,
          parking_charges:
          props?.property?.property?.valuation?.type?.parking_charges == null ? +props?.property?.property?.valuation?.covered_car_parking_value + +props?.property?.property?.valuation?.mechanical_car_parking_value + +props?.property?.property?.valuation?.open_parking_value : props?.property?.property?.valuation?.type?.parking_charges,


          parameter_1:100,
          parameter_2:6,
          parameter_3:12,
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
            {/* <Col md={2}></Col> */}
            {carpet === 1 ? (
              <Col md={7}>
                <div style={{ width: "100%", overflowX: "scroll" }}>
                  <br />
                  <Table
                    className="table table-sm"
                    bordered
                    style={{
                      textAlign: "center",
                      overflowX: "scroll",
                    }}
                  >
                    <thead>
                      <th></th>
                      <th></th>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Unit Carpet Area</td>
                        <td>
                          <TextField
                           fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="unit_carper_area"
                            name="unit_carper_area"
                            value={formProps.values.unit_carper_area}
                            onChange={formProps.handleChange}
                          />
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Estimated Rent Per Month</td>
                        <td>
                          <TextField
                          disabled
                           fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="rent_per_month"
                            name="rent_per_month"
                            value={formProps.values.rent_per_month == null ? +formProps.values.unit_carper_area * +formProps.values.parameter_1 : formProps.values.rent_per_month}
                            onChange={formProps.handleChange}
                          />
                        </td>
                        <td>
                          <TextField
                           fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="parameter_1"
                            name="parameter_1"
                            value={formProps.values.parameter_1}
                            onChange={formProps.handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Income Per Month</td>
                        <td>
                          <TextField
                          disabled
                           fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="income_per_month"
                            name="income_per_month"
                            value={formProps.values.income_per_month == null ? +formProps.values.unit_carper_area * +formProps.values.parameter_1 : formProps.values.income_per_month}
                            onChange={formProps.handleChange}
                            onBlur={() => {
                              if (formProps.values.income_per_month)
                                setProgress(progress + 100 / formPropsLength);
                            }}
                          />
                        </td>
                        <td></td>
                      </tr>
                      {console.log("object", +formProps.values.builtup_area)}
                      <tr>
                        <td>Income per year</td>
                        <td>
                          <TextField
                          disabled
                           fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="income_per_year"
                            name="income_per_year"
                            value={formProps.values.income_per_year == null ? +formProps.values.unit_carper_area * +formProps.values.parameter_1 * 12 : formProps.values.income_per_year}
                            onChange={formProps.handleChange}
                          />
                        </td>
                        <td></td>
                      </tr>

                      <tr>
                        <td>
                          Deposit Amount as per Leave & <br /> Licence Agreement
                          (Rs) or <br /> 6 Times of monthly rent
                        </td>
                        <td>
                          <TextField
                          disabled
                           fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="monthly_rent_time"
                            name="monthly_rent_time"
                            value={formProps.values.monthly_rent_time == null ? +formProps.values.unit_carper_area * +formProps.values.parameter_1 * +formProps.values.parameter_3 : formProps.values.monthly_rent_time}
                            onChange={formProps.handleChange}
                          />
                        </td>
                        <td>
                          <TextField
                           fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="parameter_3"
                            name="parameter_3"
                            value={formProps.values.parameter_3}
                            onChange={formProps.handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Income from Security Deposit @ FD Rate (6%)</td>
                        <td>
                          <TextField
                          disabled
                           fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="sd_income"
                            name="sd_income"
                            value={formProps.values.sd_income == null ? +formProps.values.unit_carper_area * +formProps.values.parameter_1 * +formProps.values.parameter_3 * formProps.values.parameter_2/100 : formProps.values.sd_income}
                            onChange={formProps.handleChange}
                            onBlur={() => {
                              if (formProps.values.sd_income)
                                setProgress(progress + 100 / formPropsLength);
                            }}
                          />
                        </td>
                        <td>
                        <TextField
                           fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="parameter_2"
                            name="parameter_2"
                            value={formProps.values.parameter_2}
                            onChange={formProps.handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Gross Income Per Year</td>
                        <td>
                          <TextField
                          disabled
                           fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="gross_income"
                            name="gross_income"
                            value={formProps.values.gross_income == null ?  +formProps.values.unit_carper_area * +formProps.values.parameter_1 * 12 + +formProps.values.unit_carper_area * +formProps.values.parameter_1 * formProps.values.parameter_2/100 : formProps.values.gross_income}
                            onChange={formProps.handleChange}
                            onBlur={() => {
                              if (formProps.values.gross_income)
                                setProgress(progress + 100 / formPropsLength);
                            }}
                          />
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Property Tax /year (Rs)</td>
                        <td>
                          <TextField
                           fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="property_tax"
                            name="property_tax"
                            value={formProps.values.property_tax}
                            onChange={formProps.handleChange}
                            onBlur={() => {
                              if (formProps.values.property_tax)
                                setProgress(progress + 100 / formPropsLength);
                            }}
                          />
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Insurance Amount /year (Rs)</td>
                        <td>
                          <TextField
                           fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="insurance_amt"
                            name="insurance_amt"
                            value={formProps.values.insurance_amt}
                            onChange={formProps.handleChange}
                            onBlur={() => {
                              if (formProps.values.insurance_amt)
                                setProgress(progress + 100 / formPropsLength);
                            }}
                          />
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Maintainance Amount per year (Rs)</td>
                        <td>
                          <TextField
                           fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="maintanance_amt"
                            name="maintanance_amt"
                            value={formProps.values.maintanance_amt}
                            onChange={formProps.handleChange}
                            onBlur={() => {
                              if (formProps.values.maintanance_amt)
                                setProgress(progress + 100 / formPropsLength);
                            }}
                          />
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Total Out Goings</td>
                        <td>
                          <TextField
                          disabled
                           fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="total_out_going"
                            name="total_out_going"
                            value={formProps.values.total_out_going == null ? +formProps.values.property_tax + +formProps.values.insurance_amt + +formProps.values.maintanance_amt : formProps.values.total_out_going}
                            onChange={formProps.handleChange}
                          />
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Gross Income - Out Going (A-B)</td>
                        <td>
                          <TextField
                          disabled
                           fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="total_gross_income"
                            name="total_gross_income"
                            value={formProps.values.total_gross_income == null ? +formProps.values.unit_carper_area * +formProps.values.parameter_1 * 12 + +formProps.values.unit_carper_area * +formProps.values.parameter_1 * formProps.values.parameter_2/100 - +formProps.values.property_tax + +formProps.values.insurance_amt + +formProps.values.maintanance_amt : formProps.values.total_gross_income}
                            onChange={formProps.handleChange}
                            onBlur={() => {
                              if (formProps.values.total_gross_income)
                                setProgress(progress + 100 / formPropsLength);
                            }}
                          />
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Net Yearly Income</td>
                        <td>
                          <TextField
                            disabled
                           fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="yearly_income"
                            name="yearly_income"
                            value={formProps.values.yearly_income == null ?  +formProps.values.unit_carper_area * +formProps.values.parameter_1 * 12 + +formProps.values.unit_carper_area * +formProps.values.parameter_1 * formProps.values.parameter_2/100 - +formProps.values.property_tax + +formProps.values.insurance_amt + +formProps.values.maintanance_amt : formProps.values.yearly_income}
                            onChange={formProps.handleChange}
                            onBlur={() => {
                              if (formProps.values.yearly_income)
                                setProgress(progress + 100 / formPropsLength);
                            }}
                          />
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Rate of Capitalization</td>
                        <td>
                          <TextField
                           fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="capitalization"
                            name="capitalization"
                            value={formProps.values.capitalization}
                            onChange={formProps.handleChange}
                            onBlur={() => {
                              if (formProps.values.capitalization)
                                setProgress(progress + 100 / formPropsLength);
                            }}
                          />
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Final Value of Unit</td>
                        <td>
                          <TextField
                           fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="final_unit_value"
                            name="final_unit_value"
                            value={+(formProps.values.yearly_income == null ?  +formProps.values.unit_carper_area * +formProps.values.parameter_1 * 12 + +formProps.values.unit_carper_area * +formProps.values.parameter_1 * formProps.values.parameter_2/100 - +formProps.values.property_tax + +formProps.values.insurance_amt + +formProps.values.maintanance_amt : formProps.values.yearly_income)*100/formProps.values.capitalization*100}
                            onChange={formProps.handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Market Value</td>
                        <td>
                          <TextField
                           fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="market_value"
                            name="market_value"
                            value={formProps.values.market_value}
                            onChange={formProps.handleChange}
                            onBlur={() => {
                              if (formProps.values.market_value)
                                setProgress(progress + 100 / formPropsLength);
                            }}
                          />
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>AVM Value</td>
                        <td>
                          <TextField
                           fullWidth
                            variant="standard"
                            type="number"
                            size="small"
                            id="avm_value"
                            name="avm_value"
                            value={formProps.values.avm_value}
                            onChange={formProps.handleChange}
                          />
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <br />
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
            {/* <Col md={2}></Col> */}
          </Row>

          <br />
          <Divider />
          <br />
          <Row>
            {/* <Col md={4}>
              <AddCompatable />
            </Col>
            <Col md={4}>
              <GraphComparison />
            </Col>
            <Col md={4}>
              <HeatMapComparison />
            </Col> */}
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
    avm: state.avm,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComparisonApproach2RC);
