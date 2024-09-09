import React, { useState } from "react";
import { connect } from "react-redux";
import { Col, Row, Table } from "reactstrap";
import {
  MenuItem,
  Select,
  TextField,
  InputLabel,
  Switch,
  Tooltip,
  Typography,
  Divider,
} from "@material-ui/core";
import Icon from "@mui/material/Icon";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";

import { editStageCalculator } from "../../../../../../Redux/Creators/StageCalculatorCreators";

//*Compoenets
import LinerLoader from "components/Loaders/LinerLoader";
import Box from "@mui/material/Box";
import ReadyProgressBar from "./ReadyProgressBar"

// import LinearProgressWithLabel from ".../ProjectDetails/LinearProgressWithLabel";

function UnderConstruction(props) {
    const [progress, setProgress] = React.useState(0);

  const token = props.login?.login?.token;
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);

    let data = {
      id: values.id,
      property_id: values.property_id,
      type: values.type,
      type_detail: values.type_detail,
      name: values.name,
      remarks: values.remarks,
      basement: values.basement,
      stilth: values.stilth,
      podium: values.podium,
      upper_floor: values.upper_floor,
      escalation: values.escalation,
      soc_remark: values.soc_remark,
      soc_completed: values.soc_completed,
      soc_recommended: values.soc_recommended,
      no_floors: values.no_floors,
      no_completed_floors: values.no_completed_floors,

      stage_calculator_details: [
        {
          id: values.basement_id,
          property_id: values.property_id,
          stage_calculator_id: values.id,
          name: "Basement",
          recommanded: values.basement_recommanded,
          actual: values.basement_actual,
        },
        {
          id: values.rcc_gf_slab_level_id,
          property_id: values.property_id,
          stage_calculator_id: values.id,
          name: "RCC upto GF slab level",
          recommanded: values.rcc_gf_slab_level_recommanded,
          actual: values.rcc_gf_slab_level_actual,
        },
        {
          id: values.rcc_gf_slab_casting_id,
          property_id: values.property_id,
          stage_calculator_id: values.id,
          name: "RCC upto GF slab casting",
          recommanded: values.rcc_gf_slab_casting_recommanded,
          actual: values.rcc_gf_slab_casting_actual,
        },
        {
          id: values.rcc_ff_roof_level_id,
          property_id: values.property_id,
          stage_calculator_id: values.id,
          name: "RCC upto FF roof level",
          recommanded: values.rcc_ff_roof_level_recommanded,
          actual: values.rcc_ff_roof_level_actual,
        },
        {
          id: values.rcc_ff_slab_casting_id,
          property_id: values.property_id,
          stage_calculator_id: values.id,
          name: "RCC upto FF slab casting",
          recommanded: values.rcc_ff_slab_casting_recommanded,
          actual: values.rcc_ff_slab_casting_actual,
        },
        {
          id: values.brick_work_id,
          property_id: values.property_id,
          stage_calculator_id: values.id,
          name: "Brick Work",
          recommanded: values.brick_work_recommanded,
          actual: values.brick_work_actual,
        },
        {
          id: values.internal_plaster_id,
          property_id: values.property_id,
          stage_calculator_id: values.id,
          name: "Internal Plaster",
          recommanded: values.internal_plaster_recommanded,
          actual: values.internal_plaster_actual,
        },
        {
          id: values.external_plaster_id,
          property_id: values.property_id,
          stage_calculator_id: values.id,
          name: "External Plaster",
          recommanded: values.external_plaster_recommanded,
          actual: values.external_plaster_actual,
        },
        {
          id: values.flooring_id,
          property_id: values.property_id,
          stage_calculator_id: values.id,
          name: "Flooring",
          recommanded: values.flooring_recommanded,
          actual: values.flooring_actual,
        },
        {
          id: values.electrification_id,
          property_id: values.property_id,
          stage_calculator_id: values.id,
          name: "Electrification",
          recommanded: values.electrification_recommanded,
          actual: values.electrification_actual,
        },
        {
          id: values.wood_work_id,
          property_id: values.property_id,
          stage_calculator_id: values.id,
          name: "Wood Work",
          recommanded: values.wood_work_recommanded,
          actual: values.wood_work_actual,
        },
        {
          id: values.finishing_id,
          property_id: values.property_id,
          stage_calculator_id: values.id,
          name: "Finishing",
          recommanded: values.finishing_recommanded,
          actual: values.finishing_actual,
        },
      ],
    };

    console.log("data:", data);

    const value = 2;

    props.editStageCalculator(data, props.setValue, value, token);
    setSubmitting(false);
  };
  return (
    <div>
      {props.stageCalculator.isLoading ? (
        <div>
          <LinerLoader />
        </div>
      ) : (
        <div>
          <Formik
            initialValues={{
              property_id: props?.property?.property?.id,
              id: props?.property?.property?.stage_calculator?.id,
              type: "UD",
              type_detail:
                props?.property?.property?.stage_calculator?.type_detail,
              name: props?.property?.property?.stage_calculator?.name,
              remarks: props?.property?.property?.stage_calculator?.remarks,
              basement:
                props?.property?.property?.stage_calculator?.basement == null
                  ? "0"
                  : props?.property?.property?.stage_calculator?.basement,
              stilth:
                props?.property?.property?.stage_calculator?.stilth == null
                  ? "0"
                  : props?.property?.property?.stage_calculator?.stilth,
              podium:
                props?.property?.property?.stage_calculator?.podium == null
                  ? "0"
                  : props?.property?.property?.stage_calculator?.podium,
              upper_floor:
                props?.property?.property?.stage_calculator?.upper_floor == null
                  ? "0"
                  : props?.property?.property?.stage_calculator?.upper_floor,
              escalation:
                props?.property?.property?.stage_calculator?.escalation == null
                  ? "0"
                  : props?.property?.property?.stage_calculator?.escalation,
              soc_remark:
                props?.property?.property?.stage_calculator?.soc_remark,
              soc_completed:
                props?.property?.property?.stage_calculator?.soc_completed,
              soc_recommended:
                props?.property?.property?.stage_calculator?.soc_recommended,
              no_floors: props?.property?.property?.stage_calculator?.no_floors,
              no_completed_floors:
                props?.property?.property?.stage_calculator
                  ?.no_completed_floors,

              //*
              stage_calculator_details:
                props?.property?.property?.stage_calculator
                  ?.stage_calculator_details == "null"
                  ? []
                  : props?.property?.property?.stage_calculator
                      ?.stage_calculator_details,

              //*recommend

              //*
              basement_id:
                props?.property?.property?.stage_calculator
                  ?.stage_calculator_details[0]?.id,
              basement_recommanded:
                props?.property?.property?.stage_calculator
                  ?.stage_calculator_details[0]?.recommanded,
              basement_actual:
                props?.property?.property?.stage_calculator
                  ?.stage_calculator_details[0]?.actual == null
                  ? 0
                  : props?.property?.property?.stage_calculator
                      ?.stage_calculator_details[0]?.actual,
              //*
              rcc_gf_slab_level_id:
                props?.property?.property?.stage_calculator
                  ?.stage_calculator_details[1]?.id,
              rcc_gf_slab_level_recommanded:
                props?.property?.property?.stage_calculator
                  ?.stage_calculator_details[1]?.recommanded,
              rcc_gf_slab_level_actual:
                props?.property?.property?.stage_calculator
                  ?.stage_calculator_details[1]?.actual == null
                  ? 0
                  : props?.property?.property?.stage_calculator
                      ?.stage_calculator_details[1]?.actual,

              //*
              rcc_gf_slab_casting_id:
                props?.property?.property?.stage_calculator
                  ?.stage_calculator_details[2]?.id,
              rcc_gf_slab_casting_recommanded:
                props?.property?.property?.stage_calculator
                  ?.stage_calculator_details[2]?.recommanded,
              rcc_gf_slab_casting_actual:
                props?.property?.property?.stage_calculator
                  ?.stage_calculator_details[2]?.actual == null
                  ? 0
                  : props?.property?.property?.stage_calculator
                      ?.stage_calculator_details[2]?.actual,

              //*
              rcc_ff_roof_level_id:
                props?.property?.property?.stage_calculator
                  ?.stage_calculator_details[3]?.id,
              rcc_ff_roof_level_recommanded:
                props?.property?.property?.stage_calculator
                  ?.stage_calculator_details[3]?.recommanded,
              rcc_ff_roof_level_actual:
                props?.property?.property?.stage_calculator
                  ?.stage_calculator_details[3]?.actual == null
                  ? 0
                  : props?.property?.property?.stage_calculator
                      ?.stage_calculator_details[3]?.actual,

              //*
              rcc_ff_slab_casting_id:
                props?.property?.property?.stage_calculator
                  ?.stage_calculator_details[4]?.id,
              rcc_ff_slab_casting_recommanded:
                props?.property?.property?.stage_calculator
                  ?.stage_calculator_details[4]?.recommanded,
              rcc_ff_slab_casting_actual:
                props?.property?.property?.stage_calculator
                  ?.stage_calculator_details[4]?.actual == null
                  ? 0
                  : props?.property?.property?.stage_calculator
                      ?.stage_calculator_details[4]?.actual,

              //*
              brick_work_id:
                props?.property?.property?.stage_calculator
                  ?.stage_calculator_details[5]?.id,
              brick_work_recommanded:
                props?.property?.property?.stage_calculator
                  ?.stage_calculator_details[5]?.recommanded,
              brick_work_actual:
                props?.property?.property?.stage_calculator
                  ?.stage_calculator_details[5]?.actual == null
                  ? 0
                  : props?.property?.property?.stage_calculator
                      ?.stage_calculator_details[5]?.actual,

              //*
              internal_plaster_id:
                props?.property?.property?.stage_calculator
                  ?.stage_calculator_details[6]?.id,
              internal_plaster_recommanded:
                props?.property?.property?.stage_calculator
                  ?.stage_calculator_details[6]?.recommanded,
              internal_plaster_actual:
                props?.property?.property?.stage_calculator
                  ?.stage_calculator_details[6]?.actual == null
                  ? 0
                  : props?.property?.property?.stage_calculator
                      ?.stage_calculator_details[6]?.actual,

              //*
              external_plaster_id:
                props?.property?.property?.stage_calculator
                  ?.stage_calculator_details[7]?.id,
              external_plaster_recommanded:
                props?.property?.property?.stage_calculator
                  ?.stage_calculator_details[7]?.recommanded,
              external_plaster_actual:
                props?.property?.property?.stage_calculator
                  ?.stage_calculator_details[7]?.actual == null
                  ? 0
                  : props?.property?.property?.stage_calculator
                      ?.stage_calculator_details[7]?.actual,

              //*
              flooring_id:
                props?.property?.property?.stage_calculator
                  ?.stage_calculator_details[8]?.id,
              flooring_recommanded:
                props?.property?.property?.stage_calculator
                  ?.stage_calculator_details[8]?.recommanded,
              flooring_actual:
                props?.property?.property?.stage_calculator
                  ?.stage_calculator_details[8]?.actual == null
                  ? 0
                  : props?.property?.property?.stage_calculator
                      ?.stage_calculator_details[8]?.actual,

              //*
              electrification_id:
                props?.property?.property?.stage_calculator
                  ?.stage_calculator_details[9]?.id,
              electrification_recommanded:
                props?.property?.property?.stage_calculator
                  ?.stage_calculator_details[9]?.recommanded,
              electrification_actual:
                props?.property?.property?.stage_calculator
                  ?.stage_calculator_details[9]?.actual == null
                  ? 0
                  : props?.property?.property?.stage_calculator
                      ?.stage_calculator_details[9]?.actual,

              //*
              wood_work_id:
                props?.property?.property?.stage_calculator
                  ?.stage_calculator_details[10]?.id,
              wood_work_recommanded:
                props?.property?.property?.stage_calculator
                  ?.stage_calculator_details[10]?.recommanded,
              wood_work_actual:
                props?.property?.property?.stage_calculator
                  ?.stage_calculator_details[10]?.actual == null
                  ? 0
                  : props?.property?.property?.stage_calculator
                      ?.stage_calculator_details[10]?.actual,

              //*
              finishing_id:
                props?.property?.property?.stage_calculator
                  ?.stage_calculator_details[11]?.id,
              finishing_recommanded:
                props?.property?.property?.stage_calculator
                  ?.stage_calculator_details[11]?.recommanded,
              finishing_actual:
                props?.property?.property?.stage_calculator
                  ?.stage_calculator_details[11]?.actual == null
                  ? 0
                  : props?.property?.property?.stage_calculator
                      ?.stage_calculator_details[11]?.actual,
            }}
            onSubmit={handleSubmit}
            // validationSchema={Yup.object().shape({
            //   // branch_name: Yup.string().required("Branch Name is required"),
            // })}
          >
            {(formProps) => {
              let incrementCount = (field, value) => {
                formProps.setFieldValue(field, Number(value) + 1);
              };

              let decrementCount = (field, value) => {
                if (value == 0) {
                  return;
                }
                formProps.setFieldValue(field, Number(value) - 1);
              };
                            const formPropsLength = 20;

              return (
                <Form>
                   <div className="pb-4">
                    <Box sx={{ width: "100%" }}>
                      <ReadyProgressBar value={progress} />
                    </Box>
                  </div>
                  <Row>
                    <Col md={12} className="pb-3">
                      <TextField
                        fullWidth
                        select
                        variant="outlined"
                        size="small"
                        id="type_detail"
                        name="type_detail"
                        value={formProps.values.type_detail}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.type_detail)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      >
                        <MenuItem value="Bunglow">Bunglow</MenuItem>
                        <MenuItem value="Building">Building</MenuItem>
                      </TextField>
                    </Col>
                  </Row>
                  <Row>
                    {/* <Col md={2} className="pb-3">
                      Remarks
                      <Tooltip title="yes/no" placement="top-start">
                        <Switch defaultChecked size="medium" color="primary" />
                      </Tooltip>
                    </Col> */}
                    <Col md={12} className="pb-3">
                      <TextField
                        label="Remarks"
                        variant="standard"
                        id="remarks"
                        name="remarks"
                        value={formProps.values.remarks}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.remarks)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                        fullWidth
                        multiline
                      />
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col md={12} className="pb-3">
                      <Typography variant="h5">Ready</Typography>
                      <Divider />
                    </Col>

                    <Col md={3} className="pb-3">
                      <Typography variant="h6">Rera Project Name:</Typography>
                    </Col>
                    <Col md={9} className="pb-3">
                      <TextField
                        variant="standard"
                        id="name"
                        name="name"
                        value={formProps.values.name}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.name)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                        fullWidth
                      />
                    </Col>
                  </Row>

                  <Row style={{ textAlign: "center" }}>
                    <Col md={12} className="pb-3">
                      <Typography variant="h5">
                        Total Number Of Floors
                      </Typography>
                      <Divider />
                    </Col>

                    <Col md={3} className="pb-3">
                      Basement
                    </Col>
                    <Col md={3} className="pb-3">
                      Stilh
                    </Col>
                    <Col md={3} className="pb-3">
                      Podium
                    </Col>
                    <Col md={3} className="pb-3">
                      Upper Floor
                    </Col>

                    <Col md={3} className="pb-3">
                      <IconButton
                        aria-label="minus"
                        className="p-1"
                        onClick={() =>
                          decrementCount("basement", formProps.values.basement)
                        }
                        
                      >
                        <RemoveCircleIcon color="error" />
                      </IconButton>

                      {formProps.values.basement}
                      <IconButton
                        aria-label="add"
                        className="p-1"
                        onClick={() =>
                          incrementCount("basement", formProps.values.basement)
                        }
                      >
                        <AddCircleIcon color="success" />
                      </IconButton>
                    </Col>

                    <Col md={3} className="pb-3">
                      <IconButton
                        aria-label="minus"
                        className="p-1"
                        onClick={() =>
                          decrementCount("stilth", formProps.values.stilth)
                        }
                      >
                        <RemoveCircleIcon color="error" />
                      </IconButton>
                      {formProps.values.stilth}
                      <IconButton
                        aria-label="add"
                        className="p-1"
                        onClick={() =>
                          incrementCount("stilth", formProps.values.stilth)
                        }
                      >
                        <AddCircleIcon color="success" />
                      </IconButton>
                    </Col>

                    <Col md={3} className="pb-3">
                      <IconButton
                        aria-label="minus"
                        className="p-1"
                        onClick={() =>
                          decrementCount("podium", formProps.values.podium)
                        }
                      >
                        <RemoveCircleIcon color="error" />
                      </IconButton>
                      {formProps.values.podium}
                      <IconButton
                        aria-label="add"
                        className="p-1"
                        onClick={() =>
                          incrementCount("podium", formProps.values.podium)
                        }
                      >
                        <AddCircleIcon color="success" />
                      </IconButton>
                    </Col>
                    <Col md={3} className="pb-3">
                      <IconButton
                        aria-label="minus"
                        className="p-1"
                        onClick={() =>
                          decrementCount(
                            "upper_floor",
                            formProps.values.upper_floor
                          )
                        }
                      >
                        <RemoveCircleIcon color="error" />
                      </IconButton>
                      {formProps.values.upper_floor}
                      <IconButton
                        aria-label="add"
                        className="p-1"
                        onClick={() =>
                          incrementCount(
                            "upper_floor",
                            formProps.values.upper_floor
                          )
                        }
                      >
                        <AddCircleIcon color="success" />
                      </IconButton>
                    </Col>
                  </Row>

                  <br />

                  <Row>
                    <Col md={12} className="pb-3">
                      <Typography>Excavation:</Typography>
                      <Slider
                        size="medium"
                        id="escalation"
                        name="escalation"
                        defaultValue={formProps.values.escalation}
                        onChange={(e) =>
                          formProps.setFieldValue("escalation", e.target.value)
                        }
                        aria-label="Excavation"
                        valueLabelDisplay="on"
                      />
                    </Col>
                  </Row>
                  <br />

                  <Row>
                    <Table bordered style={{ textAlign: "center" }}>
                      <thead>
                        <th>Name</th>
                        <th>Recommended</th>
                        <th>Actual</th>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Basement</td>
                          <td>
                            <TextField
                              variant="standard"
                              id="basement_recommanded"
                              name="basement_recommanded"
                              value={formProps.values.basement_recommanded}
                              onChange={formProps.handleChange}
                              onBlur={() => {
                                if (formProps.values.basement_recommanded)
                                  setProgress(progress + 100 / formPropsLength);
                              }}
                              fullWidth
                            />
                          </td>
                          <td>
                            <IconButton
                              aria-label="minus"
                              className="p-1"
                              onClick={() =>
                                decrementCount(
                                  "basement_actual",
                                  formProps.values.basement_actual
                                )
                              }
                            >
                              <RemoveCircleIcon color="error" />
                            </IconButton>
                            {formProps.values.basement_actual}
                            <IconButton
                              aria-label="add"
                              className="p-1"
                              onClick={() =>
                                incrementCount(
                                  "basement_actual",
                                  formProps.values.basement_actual
                                )
                              }
                            >
                              <AddCircleIcon color="success" />
                            </IconButton>
                          </td>
                        </tr>
                        <tr>
                          <td>RCC upto GF slab level</td>
                          <td>
                            <TextField
                              variant="standard"
                              id="rcc_gf_slab_level_recommanded"
                              name="rcc_gf_slab_level_recommanded"
                              value={
                                formProps.values.rcc_gf_slab_level_recommanded
                              }
                              onChange={formProps.handleChange}
                              onBlur={() => {
                                if (formProps.values.rcc_gf_slab_level_recommanded)
                                  setProgress(progress + 100 / formPropsLength);
                              }}
                              fullWidth
                            />
                          </td>
                          <td>
                            <IconButton
                              aria-label="minus"
                              className="p-1"
                              onClick={() =>
                                decrementCount(
                                  "rcc_gf_slab_level_actual",
                                  formProps.values.rcc_gf_slab_level_actual
                                )
                              }
                            >
                              <RemoveCircleIcon color="error" />
                            </IconButton>
                            {formProps.values.rcc_gf_slab_level_actual}
                            <IconButton
                              aria-label="add"
                              className="p-1"
                              onClick={() =>
                                incrementCount(
                                  "rcc_gf_slab_level_actual",
                                  formProps.values.rcc_gf_slab_level_actual
                                )
                              }
                            >
                              <AddCircleIcon color="success" />
                            </IconButton>
                          </td>
                        </tr>
                        <tr>
                          <td>RCC upto GF slab casting</td>
                          <td>
                            <TextField
                              variant="standard"
                              id="rcc_gf_slab_casting_recommanded"
                              name="rcc_gf_slab_casting_recommanded"
                              value={
                                formProps.values.rcc_gf_slab_casting_recommanded
                              }
                              onChange={formProps.handleChange}
                              onBlur={() => {
                                if (formProps.values.rcc_gf_slab_casting_recommanded)
                                  setProgress(progress + 100 / formPropsLength);
                              }}
                              fullWidth
                            />
                          </td>
                          <td>
                            <IconButton
                              aria-label="minus"
                              className="p-1"
                              onClick={() =>
                                decrementCount(
                                  "rcc_gf_slab_casting_actual",
                                  formProps.values.rcc_gf_slab_casting_actual
                                )
                              }
                            >
                              <RemoveCircleIcon color="error" />
                            </IconButton>
                            {formProps.values.rcc_gf_slab_casting_actual}
                            <IconButton
                              aria-label="add"
                              className="p-1"
                              onClick={() =>
                                incrementCount(
                                  "rcc_gf_slab_casting_actual",
                                  formProps.values.rcc_gf_slab_casting_actual
                                )
                              }
                            >
                              <AddCircleIcon color="success" />
                            </IconButton>
                          </td>
                        </tr>
                        <tr>
                          <td>RCC upto FF roof level</td>
                          <td>
                            <TextField
                              variant="standard"
                              id="rcc_ff_roof_level_recommanded"
                              name="rcc_ff_roof_level_recommanded"
                              value={
                                formProps.values.rcc_ff_roof_level_recommanded
                              }
                              onChange={formProps.handleChange}
                              onBlur={() => {
                                if (formProps.values.rcc_ff_roof_level_recommanded)
                                  setProgress(progress + 100 / formPropsLength);
                              }}
                              fullWidth
                            />
                          </td>
                          <td>
                            <IconButton
                              aria-label="minus"
                              className="p-1"
                              onClick={() =>
                                decrementCount(
                                  "rcc_ff_roof_level_actual",
                                  formProps.values.rcc_ff_roof_level_actual
                                )
                              }
                            >
                              <RemoveCircleIcon color="error" />
                            </IconButton>
                            {formProps.values.rcc_ff_roof_level_actual}
                            <IconButton
                              aria-label="add"
                              className="p-1"
                              onClick={() =>
                                incrementCount(
                                  "rcc_ff_roof_level_actual",
                                  formProps.values.rcc_ff_roof_level_actual
                                )
                              }
                            >
                              <AddCircleIcon color="success" />
                            </IconButton>
                          </td>
                        </tr>
                        <tr>
                          <td>RCC upto FF slab casting</td>
                          <td>
                            <TextField
                              variant="standard"
                              id="rcc_ff_slab_casting_recommanded"
                              name="rcc_ff_slab_casting_recommanded"
                              value={
                                formProps.values.rcc_ff_slab_casting_recommanded
                              }
                              onChange={formProps.handleChange}
                              onBlur={() => {
                                if (formProps.values.rcc_ff_slab_casting_recommanded)
                                  setProgress(progress + 100 / formPropsLength);
                              }}
                              fullWidth
                            />
                          </td>
                          <td>
                            <IconButton
                              aria-label="minus"
                              className="p-1"
                              onClick={() =>
                                decrementCount(
                                  "rcc_ff_slab_casting_actual",
                                  formProps.values.rcc_ff_slab_casting_actual
                                )
                              }
                            >
                              <RemoveCircleIcon color="error" />
                            </IconButton>
                            {formProps.values.rcc_ff_slab_casting_actual}
                            <IconButton
                              aria-label="add"
                              className="p-1"
                              onClick={() =>
                                incrementCount(
                                  "rcc_ff_slab_casting_actual",
                                  formProps.values.rcc_ff_slab_casting_actual
                                )
                              }
                            >
                              <AddCircleIcon color="success" />
                            </IconButton>
                          </td>
                        </tr>
                        <tr>
                          <td>Brick Work</td>
                          <td>
                            <TextField
                              variant="standard"
                              id="brick_work_recommanded"
                              name="brick_work_recommanded"
                              value={formProps.values.brick_work_recommanded}
                              onChange={formProps.handleChange}
                              onBlur={() => {
                                if (formProps.values.brick_work_recommanded)
                                  setProgress(progress + 100 / formPropsLength);
                              }}
                              fullWidth
                            />
                          </td>
                          <td>
                            <IconButton
                              aria-label="minus"
                              className="p-1"
                              onClick={() =>
                                decrementCount(
                                  "brick_work_actual",
                                  formProps.values.brick_work_actual
                                )
                              }
                            >
                              <RemoveCircleIcon color="error" />
                            </IconButton>
                            {formProps.values.brick_work_actual}
                            <IconButton
                              aria-label="add"
                              className="p-1"
                              onClick={() =>
                                incrementCount(
                                  "brick_work_actual",
                                  formProps.values.brick_work_actual
                                )
                              }
                            >
                              <AddCircleIcon color="success" />
                            </IconButton>
                          </td>
                        </tr>
                        <tr>
                          <td>Internal Plaster</td>
                          <td>
                            <TextField
                              variant="standard"
                              id="internal_plaster_recommanded"
                              name="internal_plaster_recommanded"
                              value={
                                formProps.values.internal_plaster_recommanded
                              }
                              onChange={formProps.handleChange}
                              onBlur={() => {
                                if (formProps.values.internal_plaster_recommanded)
                                  setProgress(progress + 100 / formPropsLength);
                              }}
                              fullWidth
                            />
                          </td>
                          <td>
                            <IconButton
                              aria-label="minus"
                              className="p-1"
                              onClick={() =>
                                decrementCount(
                                  "internal_plaster_actual",
                                  formProps.values.internal_plaster_actual
                                )
                              }
                            >
                              <RemoveCircleIcon color="error" />
                            </IconButton>
                            {formProps.values.internal_plaster_actual}
                            <IconButton
                              aria-label="add"
                              className="p-1"
                              onClick={() =>
                                incrementCount(
                                  "internal_plaster_actual",
                                  formProps.values.internal_plaster_actual
                                )
                              }
                            >
                              <AddCircleIcon color="success" />
                            </IconButton>
                          </td>
                        </tr>
                        <tr>
                          <td>External Plaster</td>
                          <td>
                            <TextField
                              variant="standard"
                              id="external_plaster_recommanded"
                              name="external_plaster_recommanded"
                              value={
                                formProps.values.external_plaster_recommanded
                              }
                              onChange={formProps.handleChange}
                              onBlur={() => {
                                if (formProps.values.external_plaster_recommanded)
                                  setProgress(progress + 100 / formPropsLength);
                              }}
                              fullWidth
                            />
                          </td>
                          <td>
                            <IconButton
                              aria-label="minus"
                              className="p-1"
                              onClick={() =>
                                decrementCount(
                                  "external_plaster_actual",
                                  formProps.values.external_plaster_actual
                                )
                              }
                            >
                              <RemoveCircleIcon color="error" />
                            </IconButton>
                            {formProps.values.external_plaster_actual}
                            <IconButton
                              aria-label="add"
                              className="p-1"
                              onClick={() =>
                                incrementCount(
                                  "external_plaster_actual",
                                  formProps.values.external_plaster_actual
                                )
                              }
                            >
                              <AddCircleIcon color="success" />
                            </IconButton>
                          </td>
                        </tr>
                        <tr>
                          <td>Flooring</td>
                          <td>
                            <TextField
                              variant="standard"
                              id="flooring_recommanded"
                              name="flooring_recommanded"
                              value={formProps.values.flooring_recommanded}
                              onChange={formProps.handleChange}
                               onBlur={() => {
                                if (formProps.values.flooring_recommanded)
                                  setProgress(progress + 100 / formPropsLength);
                              }}
                              fullWidth
                            />
                          </td>
                          <td>
                            <IconButton
                              aria-label="minus"
                              className="p-1"
                              onClick={() =>
                                decrementCount(
                                  "flooring_actual",
                                  formProps.values.flooring_actual
                                )
                              }
                            >
                              <RemoveCircleIcon color="error" />
                            </IconButton>
                            {formProps.values.flooring_actual}
                            <IconButton
                              aria-label="add"
                              className="p-1"
                              onClick={() =>
                                incrementCount(
                                  "flooring_actual",
                                  formProps.values.flooring_actual
                                )
                              }
                            >
                              <AddCircleIcon color="success" />
                            </IconButton>
                          </td>
                        </tr>
                        <tr>
                          <td>Electrification</td>
                          <td>
                            <TextField
                              variant="standard"
                              id="electrification_recommanded"
                              name="electrification_recommanded"
                              value={
                                formProps.values.electrification_recommanded
                              }
                              onChange={formProps.handleChange}
                              onBlur={() => {
                                if (formProps.values.electrification_recommanded)
                                  setProgress(progress + 100 / formPropsLength);
                              }}
                              fullWidth
                            />
                          </td>
                          <td>
                            <IconButton
                              aria-label="minus"
                              className="p-1"
                              onClick={() =>
                                decrementCount(
                                  "electrification_actual",
                                  formProps.values.electrification_actual
                                )
                              }
                            >
                              <RemoveCircleIcon color="error" />
                            </IconButton>
                            {formProps.values.electrification_actual}
                            <IconButton
                              aria-label="add"
                              className="p-1"
                              onClick={() =>
                                incrementCount(
                                  "electrification_actual",
                                  formProps.values.electrification_actual
                                )
                              }
                            >
                              <AddCircleIcon color="success" />
                            </IconButton>
                          </td>
                        </tr>
                        <tr>
                          <td>Wood Work</td>
                          <td>
                            <TextField
                              variant="standard"
                              id="wood_work_recommanded"
                              name="wood_work_recommanded"
                              value={formProps.values.wood_work_recommanded}
                              onChange={formProps.handleChange}
                               onBlur={() => {
                                if (formProps.values.wood_work_recommanded)
                                  setProgress(progress + 100 / formPropsLength);
                              }}
                              fullWidth
                            />
                          </td>
                          <td>
                            <IconButton
                              aria-label="minus"
                              className="p-1"
                              onClick={() =>
                                decrementCount(
                                  "wood_work_actual",
                                  formProps.values.wood_work_actual
                                )
                              }
                            >
                              <RemoveCircleIcon color="error" />
                            </IconButton>
                            {formProps.values.wood_work_actual}
                            <IconButton
                              aria-label="add"
                              className="p-1"
                              onClick={() =>
                                incrementCount(
                                  "wood_work_actual",
                                  formProps.values.wood_work_actual
                                )
                              }
                            >
                              <AddCircleIcon color="success" />
                            </IconButton>
                          </td>
                        </tr>
                        <tr>
                          <td>Finishing</td>
                          <td>
                            <TextField
                              variant="standard"
                              id="finishing_recommanded"
                              name="finishing_recommanded"
                              value={formProps.values.finishing_recommanded}
                              onChange={formProps.handleChange}
                              onBlur={() => {
                                if (formProps.values.basement_recommanded)
                                  setProgress(progress + 100 / formPropsLength);
                              }}
                              fullWidth
                            />
                          </td>
                          <td>
                            <IconButton
                              aria-label="minus"
                              className="p-1"
                              onClick={() =>
                                decrementCount(
                                  "finishing_actual",
                                  formProps.values.finishing_actual
                                )
                              }
                            >
                              <RemoveCircleIcon color="error" />
                            </IconButton>
                            {formProps.values.finishing_actual}
                            <IconButton
                              aria-label="add"
                              className="p-1"
                              onClick={() =>
                                incrementCount(
                                  "finishing_actual",
                                  formProps.values.finishing_actual
                                )
                              }
                            >
                              <AddCircleIcon color="success" />
                            </IconButton>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Row>

                  <br />
                  <br />

                  <Row>
                    <Col md={6} className="pb-3">
                      <Typography variant="h6">Total no. of floors:</Typography>
                      <TextField
                        variant="standard"
                        id="no_floors"
                        name="no_floors"
                        value={formProps.values.no_floors}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                                if (formProps.values.no_floors)
                                  setProgress(progress + 100 / formPropsLength);
                              }}
                        fullWidth
                      />
                    </Col>

                    <Col md={6} className="pb-3">
                      <Typography variant="h6">Completed floors:</Typography>
                      <TextField
                        variant="standard"
                        id="no_completed_floors"
                        name="no_completed_floors"
                        value={formProps.values.no_completed_floors}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                                if (formProps.values.no_completed_floors)
                                  setProgress(progress + 100 / formPropsLength);
                              }}
                        fullWidth
                      />
                    </Col>
                  </Row>

                  <Row style={{ textAlign: "center" }}>
                    <Col md={12} className="pb-3">
                      <Typography variant="h5">
                        Stage Of Construction
                      </Typography>
                      <Divider />
                    </Col>

                    <Col>
                      <Table bordered style={{ textAlign: "center" }}>
                        <thead>
                          <th>%Completed</th>
                          <th>%Recommended</th>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <TextField
                                variant="standard"
                                id="soc_completed"
                                name="soc_completed"
                                value={formProps.values.soc_completed}
                                onChange={formProps.handleChange}
                                onBlur={() => {
                                if (formProps.values.soc_completed)
                                  setProgress(progress + 100 / formPropsLength);
                              }}
                                fullWidth
                              />
                            </td>
                            <td>
                              <TextField
                                variant="standard"
                                id="soc_recommended"
                                name="soc_recommended"
                                value={formProps.values.soc_recommended}
                                onChange={formProps.handleChange}
                                onBlur={() => {
                                if (formProps.values.soc_recommended)
                                  setProgress(progress + 100 / formPropsLength);
                              }}
                                fullWidth
                              />
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  </Row>

                  <br />

                  <Row>
                    <Col md={12} className="pb-3">
                      <TextField
                        focused
                        label="Remark"
                        variant="outlined"
                        id="soc_remark"
                        name="soc_remark"
                        value={formProps.values.soc_remark}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                                if (formProps.values.soc_remark)
                                  setProgress(progress + 100 / formPropsLength);
                              }}
                        fullWidth
                        multiline
                        rows={5}
                        rowsMax={10}
                      />
                    </Col>
                  </Row>

                  <Divider />
                  <br />

                  <Row className="pb-4">
                    <Col>
                      <Button
                        color="success"
                        variant="contained"
                        disabled={formProps.isSubmitting}
                        fullWidth
                        type="submit"
                      >
                        Next
                      </Button>
                    </Col>
                  </Row>
                </Form>
              );
            }}
          </Formik>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    property: state.property,
    stageCalculator: state.stageCalculator,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    editStageCalculator: (data, setValue, value, token) =>
      dispatch(editStageCalculator(data, setValue, value, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UnderConstruction);
