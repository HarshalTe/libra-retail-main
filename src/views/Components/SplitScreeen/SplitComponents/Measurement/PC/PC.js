import React from "react";
import { connect } from "react-redux";
import { Row, Col, Table } from "reactstrap";
import Button from "@mui/material/Button";
import TextField from "@material-ui/core/TextField";
import { MenuItem, Tooltip } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Checkbox from "@mui/material/Checkbox";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { Divider, Typography } from "@mui/material";

//*Actions
import { editMeasurementData } from "../../../../../../Redux/Creators/MeasurementCreators";

//*Components
import ViewPC from "./ViewPC";
import Box from "@mui/material/Box";
import ProgressLabel from "../Composite/ProgressLabel";

import TextareaAutosize from "@mui/material/TextareaAutosize";

import {
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import ComponentContext from "views/Components/SplitScreeen/CompoenetContext";
import Valuation from "../../../SplitComponents/Valuation/Valuation";

function PC(props) {
  const [progress, setProgress] = React.useState(0);
  const { component, setComponent } = React.useContext(ComponentContext);

  const token = props.login?.login?.token;
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values file:", values);

    //? FormData Chahiye File Upload hai
    const data = new FormData();

    data.append("id", values.id);
    data.append("property_id", values.property_id);
    data.append("measurement_type", values.measurement_type);
    data.append("file", values.file);

    data.append("sites", JSON.stringify(values.sites));
    data.append("delete_sites", JSON.stringify(values.delete_sites));

    data.append("pc_buildup_sites", JSON.stringify(values.pc_buildup_sites));
    data.append(
      "delete_pc_buildup_sites",
      JSON.stringify(values.delete_pc_buildup_sites)
    );
    data.append("pc_buildup_sites", JSON.stringify(values.pc_buildup_sites));

    data.append("plans", JSON.stringify(values.plans));
    data.append("delete_plans", JSON.stringify(values.delete_plans));
    data.append("pc_buildup_plans", JSON.stringify(values.pc_buildup_plans));
    data.append(
      "delete_pc_buildup_plans",
      JSON.stringify(values.delete_pc_buildup_plans)
    );
    data.append("pc_buildup_plans", JSON.stringify(values.pc_buildup_plans));

    data.append("floor_heights", JSON.stringify(values.floor_heights));
    data.append(
      "delete_floor_heights",
      JSON.stringify(values.delete_floor_heights)
    );

    data.append("sites_plot_total_area", values.sites_plot_total_area);
    data.append(
      "sites_plot_total_area_unit",
      values.sites_plot_total_area_unit
    );
    data.append("sites_balcony_total", values.sites_balcony_total);
    data.append("sites_carpet_area_total", values.sites_carpet_area_total);

    data.append("buildup_sites_total_area", values.buildup_sites_total_area);
    data.append(
      "buildup_sites_total_area_unit",
      values.buildup_sites_total_area_unit
    );

    data.append("plans_plot_total_area", values.plans_plot_total_area);
    data.append(
      "plans_plot_total_area_unit",
      values.plans_plot_total_area_unit
    );
    data.append("plans_balcony_total", values.plans_balcony_total);
    data.append("plans_carpet_area_total", values.plans_carpet_area_total);

    data.append("buildup_plans_total_area", values.buildup_plans_total_area);
    data.append(
      "buildup_plans_total_area_unit",
      values.buildup_plans_total_area_unit
    );

    props.editMeasurementData(data, token);
    setSubmitting(false);
    setComponent(<Valuation />);
  };
  const formPropsLength = 20;

  return (
    <div>
      <Formik
        initialValues={{
          id: props?.property?.property?.measurement?.id,
          property_id: props?.property?.property?.id,
          measurement_type: "PC",
          file: props?.property?.property?.measurement?.file,

          //*1st
          sites: props?.property?.property?.measurement?.sites,
          delete_sites: [],
          plot_area: "",
          length: "",
          width: "",
          area: "",
          group_head: null,
          room_name: null,
          sequence: null,
          //!
          sites_plot_total_area:
            props?.property?.property?.measurement?.sites_plot_total_area,
          sites_plot_total_area_unit:
            props?.property?.property?.measurement?.sites_plot_total_area_unit,
          sites_balcony_total: null,
          sites_carpet_area_total: null,
          //!

          //*2nd
          pc_buildup_sites:
            props?.property?.property?.measurement?.pc_buildup_sites,
          delete_pc_buildup_sites: [],
          buildup_area: "",
          length2: "",
          width2: "",
          area2: "",
          //!
          buildup_sites_total_area:
            props?.property?.property?.measurement?.buildup_sites_total_area,
          buildup_sites_total_area_unit:
            props?.property?.property?.measurement
              ?.buildup_sites_total_area_unit,
          //!

          //*3rd
          plans: props?.property?.property?.measurement?.plans,
          delete_plans: [],
          plan_plot_area: "",
          plan_length: "",
          plan_width: "",
          plan_area: "",
          group_head: null,
          room_name: null,
          sequence: null,

          //!
          plans_plot_total_area:
            props?.property?.property?.measurement?.plans_plot_total_area,
          plans_plot_total_area_unit:
            props?.property?.property?.measurement?.plans_plot_total_area_unit,
          plans_balcony_total: null,
          plans_carpet_area_total: null,

          //!

          //*4th
          pc_buildup_plans:
            props?.property?.property?.measurement?.pc_buildup_plans,
          delete_pc_buildup_plans: [],
          pc_buildup_area: "",
          pc_length: "",
          pc_width: "",
          pc_area: "",

          //!
          buildup_plans_total_area:
            props?.property?.property?.measurement?.buildup_plans_total_area,
          buildup_plans_total_area_unit:
            props?.property?.property?.measurement
              ?.buildup_plans_total_area_unit,
          //!

          //*Floor Height
          floor_heights: props?.property?.property?.measurement?.floor_heights,
          delete_floor_heights: [],
          floor_room_name: "",
          height_floor: "",
          floor_unit: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={Yup.object().shape({
          // branch_name: Yup.string().required("Branch Name is required"),
        })}
      >
        {(formProps) => (
          <Form>
             <div className="pb-4">
                    <Box sx={{ width: "100%" }}>
                      <ProgressLabel value={progress} />
                    </Box>
                  </div>
            <Typography variant={"h5"}>As per site</Typography>
            <Divider />
            <br />
            <Row className="pb-2">
              <Col md={12}>
                <FieldArray
                  name="sites"
                  render={(arrayHelpers) => (
                    <div>
                      <Row>
                        <Col md={3}>
                          <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            id="plot_area"
                            name="plot_area"
                            label="Plot area"
                            value={formProps.values.plot_area}
                            onChange={formProps.handleChange}
                            onBlur={() => {
                        if (formProps.values.plot_area)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                          />
                        </Col>

                        <Col md={3}>
                          <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            id="length"
                            name="length"
                            label="Length"
                            value={formProps.values.length}
                            onChange={formProps.handleChange}
                            onBlur={() => {
                        if (formProps.values.length)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                          />
                        </Col>

                        <Col md={3}>
                          <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            id="width"
                            name="width"
                            label="Width"
                            value={formProps.values.width}
                            onChange={formProps.handleChange}
                            onBlur={() => {
                        if (formProps.values.width)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                          />
                        </Col>
                        <Col md={2}>
                          <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            id="area"
                            name="area"
                            label="Area"
                            value={formProps.values.width * formProps.values.length}
                            onChange={formProps.handleChange}
                            onBlur={() => {
                        if (formProps.values.area)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                          />
                        </Col>

                        <Col>
                          <Button
                            color="success"
                            variant="contained"
                            onClick={() => {
                              arrayHelpers.push({
                                measurement_id: formProps.values.id,
                                plot_area: formProps.values.plot_area,
                                length: formProps.values.length,
                                width: formProps.values.width,
                                area: formProps.values.width * formProps.values.length,

                                //!no need
                                group_head: null,
                                room_name: null,
                                sequence: null,
                              });
                              {
                                formProps.setFieldValue("plot_area", "");
                                formProps.setFieldValue("length", "");
                                formProps.setFieldValue("width", "");
                                formProps.setFieldValue("area", "");
                              }
                            }}
                            size="large"
                          >
                            <AddIcon fontSize="inherit" />
                          </Button>
                        </Col>
                      </Row>
                      <Table
                        size="sm"
                        className="mt-3"
                        bordered
                        style={{ textAlign: "center" }}
                      >
                        <thead>
                          <tr>
                            <th>Sr No.</th>
                            <th>Plot area</th>
                            <th>Length</th>
                            <th>Width</th>
                            <th>Area</th>
                            <th>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {formProps?.values?.sites?.map((sites, index) => {
                            formProps.values.sites_plot_total_area =
                              formProps?.values?.sites.reduce(function (
                                prev,
                                cur
                              ) {
                                return (
                                  Number(prev) + Number(cur.area)
                                ).toFixed(2);
                              },
                              0);
                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>

                                <td>
                                  <TextField
                                    fullWidth
                                    onChange={formProps.handleChange}
                                    size="small"
                                    label="Plot area"
                                    variant="outlined"
                                    name={`sites.${index}.plot_area`}
                                    value={sites.plot_area}
                                    id="plot_area"
                                    // onChange={formProps.handleChange}
                      //               onBlur={() => {
                      //   if (formProps.values.railway_station)
                      //     setProgress(progress + 100 / formPropsLength);
                      // }}
                                  />
                                </td>

                                <td>
                                  <TextField
                                    fullWidth
                                    onChange={formProps.handleChange}
                                    size="small"
                                    label="Lenght"
                                    variant="outlined"
                                    name={`sites.${index}.length`}
                                    value={sites.length}
                                    id="length"
                                  />
                                </td>
                                <td>
                                  <TextField
                                    fullWidth
                                    onChange={formProps.handleChange}
                                    size="small"
                                    label="Width"
                                    variant="outlined"
                                    name={`sites.${index}.width`}
                                    value={sites.width}
                                    id="width"
                                  />
                                </td>
                                <td>
                                  <TextField
                                    fullWidth
                                    onChange={formProps.handleChange}
                                    size="small"
                                    label="Area"
                                    variant="outlined"
                                    name={`sites.${index}.area`}
                                    value={sites.area}
                                    id="area"
                                  />
                                </td>

                                <td>
                                  <Button
                                    color="error"
                                    size="large"
                                    variant="outlined"
                                    onClick={() => {
                                      arrayHelpers.remove(index);
                                      formProps.values.delete_sites.push(
                                        sites?.id
                                      );
                                    }}
                                  >
                                    <DeleteIcon fontSize="inherit" />
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
                          <tr>
                            <td
                              style={{
                                textAlign: "center",
                                verticalAlign: "middle",
                              }}
                              colSpan={2}
                            >
                              <Typography>Total Area</Typography>
                            </td>
                            <td colSpan={2}>
                              <TextField
                                fullWidth
                                onChange={formProps.handleChange}
                                size="small"
                                variant="outlined"
                                id="sites_plot_total_area"
                                name="sites_plot_total_area"
                                label="Total"
                                value={formProps.values.sites_plot_total_area}
                              />
                            </td>
                            <td colSpan={2}>
                              <TextField
                                fullWidth
                                select
                                size="small"
                                variant="outlined"
                                id="sites_plot_total_area_unit"
                                name="sites_plot_total_area_unit"
                                label="Total"
                                value={
                                  formProps.values.sites_plot_total_area_unit
                                }
                                onChange={formProps.handleChange}
                                onBlur={() => {
                        if (formProps.values.sites_plot_total_area_unit)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                              >
                                <MenuItem value="">Select</MenuItem>
                                <MenuItem value="ft">Sq ft</MenuItem>
                                <MenuItem value="mt">Sq mt</MenuItem>
                              </TextField>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  )}
                />
              </Col>
            </Row>

            <br />
            <Divider />
            <br />

            <Row className="pb-2">
              <Col md={12}>
                <FieldArray
                  name="pc_buildup_sites"
                  render={(arrayHelpers) => (
                    <div>
                      <Row>
                        <Col md={3}>
                          <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            id="buildup_area"
                            name="buildup_area"
                            label="Build up area"
                            value={formProps.values.buildup_area}
                            onChange={formProps.handleChange}
                            onBlur={() => {
                        if (formProps.values.buildup_area)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                          />
                        </Col>

                        <Col md={3}>
                          <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            id="length2"
                            name="length2"
                            label="Length"
                            value={formProps.values.length2}
                            onChange={formProps.handleChange}
                            onBlur={() => {
                        if (formProps.values.length2)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                          />
                        </Col>

                        <Col md={3}>
                          <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            id="width2"
                            name="width2"
                            label="Width"
                            value={formProps.values.width2}
                            onChange={formProps.handleChange}
                            onBlur={() => {
                        if (formProps.values.width2)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                          />
                        </Col>
                        <Col md={2}>
                          <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            id="area2"
                            name="area2"
                            label="Area"
                            value={formProps.values.width2 * formProps.values.length2}
                            onChange={formProps.handleChange}
                            onBlur={() => {
                        if (formProps.values.area2)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                          />
                        </Col>

                        <Col>
                          <Button
                            color="success"
                            variant="contained"
                            onClick={() => {
                              arrayHelpers.push({
                                measurement_id: formProps.values.id,
                                buildup_area: formProps.values.buildup_area,
                                length: formProps.values.length2,
                                width: formProps.values.width2,
                                area: formProps.values.width2 * formProps.values.length2,
                              });
                              {
                                formProps.setFieldValue("buildup_area", "");
                                formProps.setFieldValue("length2", "");
                                formProps.setFieldValue("width2", "");
                                formProps.setFieldValue("area2", "");
                              }
                            }}
                            size="large"
                          >
                            <AddIcon fontSize="inherit" />
                          </Button>
                        </Col>
                      </Row>
                      <Table
                        size="sm"
                        className="mt-3"
                        bordered
                        style={{ textAlign: "center" }}
                      >
                        <thead>
                          <tr>
                            <th>Sr No.</th>
                            <th>Build up area</th>
                            <th>Length</th>
                            <th>Width</th>
                            <th>Area</th>
                            <th>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {formProps?.values?.pc_buildup_sites?.map(
                            (pc_buildup_sites, index) => {
                              //!balcony area
                              formProps.values.buildup_sites_total_area =
                                formProps?.values?.pc_buildup_sites.reduce(
                                  function (prev, cur) {
                                    return (
                                      Number(prev) + Number(cur.area)
                                    ).toFixed(2);
                                  },
                                  0
                                );
                              return (
                                <tr key={index}>
                                  <td>{index + 1}</td>

                                  <td>
                                    <TextField
                                      fullWidth
                                      size="small"
                                      label="Buildup area"
                                      variant="outlined"
                                      name={`pc_buildup_sites.${index}.buildup_area`}
                                      value={pc_buildup_sites.buildup_area}
                                      id="buildup_area"
                                      onChange={formProps.handleChange}
                      //                 onBlur={() => {
                      //   if (formProps.values.railway_station)
                      //     setProgress(progress + 100 / formPropsLength);
                      // }}
                                    />
                                  </td>

                                  <td>
                                    <TextField
                                      fullWidth
                                      onChange={formProps.handleChange}
                                      size="small"
                                      label="Lenght"
                                      variant="outlined"
                                      name={`pc_buildup_sites.${index}.length`}
                                      value={pc_buildup_sites.length}
                                      id="length"
                                    />
                                  </td>
                                  <td>
                                    <TextField
                                      fullWidth
                                      onChange={formProps.handleChange}
                                      size="small"
                                      label="Width"
                                      variant="outlined"
                                      name={`pc_buildup_sites.${index}.width`}
                                      value={pc_buildup_sites.width}
                                      id="width"
                                    />
                                  </td>
                                  <td>
                                    <TextField
                                      fullWidth
                                      onChange={formProps.handleChange}
                                      size="small"
                                      label="Area"
                                      variant="outlined"
                                      name={`pc_buildup_sites.${index}.area`}
                                      value={pc_buildup_sites.area}
                                      id="area"
                                    />
                                  </td>

                                  <td>
                                    <Button
                                      color="error"
                                      size="large"
                                      variant="outlined"
                                      onClick={() => {
                                        arrayHelpers.remove(index);
                                        formProps.values.delete_pc_buildup_sites.push(
                                          pc_buildup_sites.id
                                        );
                                      }}
                                    >
                                      <DeleteIcon fontSize="inherit" />
                                    </Button>
                                  </td>
                                </tr>
                              );
                            }
                          )}
                          <tr>
                            <td
                              style={{
                                textAlign: "center",
                                verticalAlign: "middle",
                              }}
                              colSpan={2}
                            >
                              <Typography>Total Area</Typography>
                            </td>
                            <td colSpan={2}>
                              <TextField
                                fullWidth
                                onChange={formProps.handleChange}
                                size="small"
                                variant="outlined"
                                id="buildup_sites_total_area"
                                name="buildup_sites_total_area"
                                value={
                                  formProps.values.buildup_sites_total_area
                                }
                                // onChange={formProps.handleChange}
                      //           onBlur={() => {
                      //   if (formProps.values.railway_station)
                      //     setProgress(progress + 100 / formPropsLength);
                      // }}
                              />
                            </td>
                            <td colSpan={2}>
                              <TextField
                                fullWidth
                                select
                                size="small"
                                variant="outlined"
                                id="buildup_sites_total_area_unit"
                                name="buildup_sites_total_area_unit"
                                label="Total"
                                value={
                                  formProps.values.buildup_sites_total_area_unit
                                }
                                onChange={formProps.handleChange}
                                onBlur={() => {
                        if (formProps.values.buildup_sites_total_area_unit)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                              >
                                <MenuItem value="">Select</MenuItem>
                                <MenuItem value="ft">Sq ft</MenuItem>
                                <MenuItem value="mt">Sq mt</MenuItem>
                              </TextField>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  )}
                />
              </Col>
            </Row>

            <Divider />
            <br />
            <Typography variant={"h5"}>As per plan</Typography>
            <Divider />
            <br />
            <Row className="pb-2">
              <Col md={12}>
                <FieldArray
                  name="plans"
                  render={(arrayHelpers) => (
                    <div>
                      <Row>
                        <Col md={3}>
                          <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            id="plan_plot_area"
                            name="plan_plot_area"
                            label="Plot area"
                            value={formProps.values.plan_plot_area}
                            onChange={formProps.handleChange}
                            onBlur={() => {
                        if (formProps.values.plan_plot_area)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                          />
                        </Col>

                        <Col md={3}>
                          <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            id="plan_length"
                            name="plan_length"
                            label="Length"
                            value={formProps.values.plan_length}
                            onChange={formProps.handleChange}
                            onBlur={() => {
                        if (formProps.values.plan_length)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                          />
                        </Col>

                        <Col md={3}>
                          <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            id="plan_width"
                            name="plan_width"
                            label="Width"
                            value={formProps.values.plan_width}
                            onChange={formProps.handleChange}
                            onBlur={() => {
                        if (formProps.values.plan_width)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                          />
                        </Col>
                        <Col md={2}>
                          <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            id="plan_area"
                            name="plan_area"
                            label="Area"
                            value={formProps.values.plan_width * formProps.values.plan_length}
                            onChange={formProps.handleChange}
                            onBlur={() => {
                        if (formProps.values.plan_area)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                          />
                        </Col>

                        <Col>
                          <Button
                            color="success"
                            variant="contained"
                            onClick={() => {
                              arrayHelpers.push({
                                measurement_id: formProps.values.id,
                                plot_area: formProps.values.plan_plot_area,
                                length: formProps.values.plan_length,
                                width: formProps.values.plan_width,
                                area: formProps.values.plan_width * formProps.values.plan_length,

                                //!no need
                                group_head: null,
                                room_name: null,
                                sequence: null,
                              });
                              {
                                formProps.setFieldValue("plan_plot_area", "");
                                formProps.setFieldValue("plan_length", "");
                                formProps.setFieldValue("plan_width", "");
                                formProps.setFieldValue("plan_area", "");
                              }
                            }}
                            size="large"
                          >
                            <AddIcon fontSize="inherit" />
                          </Button>
                        </Col>
                      </Row>
                      <Table
                        size="sm"
                        className="mt-3"
                        bordered
                        style={{ textAlign: "center" }}
                      >
                        <thead>
                          <tr>
                            <th>Sr No.</th>
                            <th>Plot area</th>
                            <th>Length</th>
                            <th>Width</th>
                            <th>Area</th>
                            <th>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {formProps?.values?.plans?.map((plans, index) => {
                            //!plans plot area
                            formProps.values.plans_plot_total_area =
                              formProps?.values?.plans.reduce(function (
                                prev,
                                cur
                              ) {
                                return (
                                  Number(prev) + Number(cur.area)
                                ).toFixed(2);
                              },
                              0);
                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>

                                <td>
                                  <TextField
                                    fullWidth
                                    onChange={formProps.handleChange}
                                    size="small"
                                    label="Plot area"
                                    variant="outlined"
                                    name={`plans.${index}.plot_area`}
                                    value={plans.plot_area}
                                    id="plot_area"
                                    // onChange={formProps.handleChange}
                      //               onBlur={() => {
                      //   if (formProps.values.railway_station)
                      //     setProgress(progress + 100 / formPropsLength);
                      // }}
                                  />
                                </td>

                                <td>
                                  <TextField
                                    fullWidth
                                    onChange={formProps.handleChange}
                                    size="small"
                                    label="Lenght"
                                    variant="outlined"
                                    name={`plans.${index}.length`}
                                    value={plans.length}
                                    id="length"
                                  />
                                </td>
                                <td>
                                  <TextField
                                    fullWidth
                                    onChange={formProps.handleChange}
                                    size="small"
                                    label="Width"
                                    variant="outlined"
                                    name={`plans.${index}.width`}
                                    value={plans.width}
                                    id="width"
                                  />
                                </td>
                                <td>
                                  <TextField
                                    fullWidth
                                    onChange={formProps.handleChange}
                                    size="small"
                                    label="Area"
                                    variant="outlined"
                                    name={`plans.${index}.area`}
                                    value={plans.area}
                                    id="area"
                                  />
                                </td>

                                <td>
                                  <Button
                                    color="error"
                                    size="large"
                                    variant="outlined"
                                    onClick={() => {
                                      arrayHelpers.remove(index);
                                      formProps.values.delete_plans.push(
                                        plans.id
                                      );
                                    }}
                                  >
                                    <DeleteIcon fontSize="inherit" />
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
                          <tr>
                            <td
                              style={{
                                textAlign: "center",
                                verticalAlign: "middle",
                              }}
                              colSpan={2}
                            >
                              <Typography>Total Area</Typography>
                            </td>
                            <td colSpan={2}>
                              <TextField
                                fullWidth
                                onChange={formProps.handleChange}
                                size="small"
                                variant="outlined"
                                id="plans_plot_total_area"
                                name="plans_plot_total_area"
                                value={formProps.values.plans_plot_total_area}
                                // onChange={formProps.handleChange}
                      //           onBlur={() => {
                      //   if (formProps.values.railway_station)
                      //     setProgress(progress + 100 / formPropsLength);
                      // }}
                              />
                            </td>
                            <td colSpan={2}>
                              <TextField
                                fullWidth
                                select
                                size="small"
                                variant="outlined"
                                id="plans_plot_total_area_unit"
                                name="plans_plot_total_area_unit"
                                label="Total"
                                value={
                                  formProps.values.plans_plot_total_area_unit
                                }
                                onChange={formProps.handleChange}
                                onBlur={() => {
                        if (formProps.values.plans_plot_total_area_unit)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                              >
                                <MenuItem value="">Select</MenuItem>
                                <MenuItem value="ft">Sq ft</MenuItem>
                                <MenuItem value="mt">Sq mt</MenuItem>
                              </TextField>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  )}
                />
              </Col>
            </Row>
            <Divider />
            <br />

            <Row className="pb-2">
              <Col md={12}>
                <FieldArray
                  name="pc_buildup_plans"
                  render={(arrayHelpers) => (
                    <div>
                      <Row>
                        <Col md={3}>
                          <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            id="pc_buildup_area"
                            name="pc_buildup_area"
                            label="Build up area"
                            value={formProps.values.pc_buildup_area}
                            onChange={formProps.handleChange}
                            onBlur={() => {
                        if (formProps.values.pc_buildup_area)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                          />
                        </Col>

                        <Col md={3}>
                          <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            id="pc_length"
                            name="pc_length"
                            label="Length"
                            value={formProps.values.pc_length}
                            onChange={formProps.handleChange}
                            onBlur={() => {
                        if (formProps.values.pc_length)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                          />
                        </Col>

                        <Col md={3}>
                          <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            id="pc_width"
                            name="pc_width"
                            label="Width"
                            value={formProps.values.pc_width}
                            onChange={formProps.handleChange}
                            onBlur={() => {
                        if (formProps.values.pc_width)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                          />
                        </Col>
                        <Col md={2}>
                          <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            id="pc_area"
                            name="pc_area"
                            label="Area"
                            value={formProps.values.pc_width * formProps.values.pc_length}
                            onChange={formProps.handleChange}
                            onBlur={() => {
                        if (formProps.values.pc_area)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                          />
                        </Col>

                        <Col>
                          <Button
                            color="success"
                            variant="contained"
                            onClick={() => {
                              arrayHelpers.push({
                                measurement_id: formProps.values.id,
                                buildup_area: formProps.values.pc_buildup_area,
                                length: formProps.values.pc_length,
                                width: formProps.values.pc_width,
                                area: formProps.values.pc_width * formProps.values.pc_length,

                                //*calculate
                                pc_buildup_totat_area: 100,
                                pc_buildup_totat_area_unit: 100,
                              });
                              {
                                formProps.setFieldValue("pc_buildup_area", "");
                                formProps.setFieldValue("pc_length", "");
                                formProps.setFieldValue("pc_width", "");
                                formProps.setFieldValue("pc_area", "");
                              }
                            }}
                            size="large"
                          >
                            <AddIcon fontSize="inherit" />
                          </Button>
                        </Col>
                      </Row>
                      <Table
                        size="sm"
                        className="mt-3"
                        bordered
                        style={{ textAlign: "center" }}
                      >
                        <thead>
                          <tr>
                            <th>Sr No.</th>
                            <th>Build up area</th>
                            <th>Length</th>
                            <th>Width</th>
                            <th>Area</th>
                            <th>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {formProps?.values?.pc_buildup_plans?.map(
                            (pc_buildup_plans, index) => {
                              //!buildplans area
                              formProps.values.buildup_plans_total_area =
                                formProps?.values?.pc_buildup_plans.reduce(
                                  function (prev, cur) {
                                    return (
                                      Number(prev) + Number(cur.area)
                                    ).toFixed(2);
                                  },
                                  0
                                );
                              return (
                                <tr key={index}>
                                  <td>{index + 1}</td>

                                  <td>
                                    <TextField
                                      fullWidth
                                      onChange={formProps.handleChange}
                                      size="small"
                                      label="Buildup area"
                                      variant="outlined"
                                      name={`pc_buildup_plans.${index}.buildup_area`}
                                      value={pc_buildup_plans.buildup_area}
                                      id="buildup_area"
                                      // onChange={formProps.handleChange}
                      //                 onBlur={() => {
                      //   if (formProps.values.railway_station)
                      //     setProgress(progress + 100 / formPropsLength);
                      // }}
                                    />
                                  </td>

                                  <td>
                                    <TextField
                                      fullWidth
                                      onChange={formProps.handleChange}
                                      size="small"
                                      label="Lenght"
                                      variant="outlined"
                                      name={`pc_buildup_plans.${index}.length`}
                                      value={pc_buildup_plans.length}
                                      id="length"
                                    />
                                  </td>
                                  <td>
                                    <TextField
                                      fullWidth
                                      onChange={formProps.handleChange}
                                      size="small"
                                      label="Width"
                                      variant="outlined"
                                      name={`pc_buildup_plans.${index}.width`}
                                      value={pc_buildup_plans.width}
                                      id="width"
                                    />
                                  </td>
                                  <td>
                                    <TextField
                                      fullWidth
                                      onChange={formProps.handleChange}
                                      size="small"
                                      label="Area"
                                      variant="outlined"
                                      name={`pc_buildup_plans.${index}.area`}
                                      value={pc_buildup_plans.area}
                                      id="area"
                                    />
                                  </td>

                                  <td>
                                    <Button
                                      color="error"
                                      size="large"
                                      variant="outlined"
                                      onClick={() => {
                                        arrayHelpers.remove(index);
                                        formProps.values.delete_pc_buildup_plans.push(
                                          pc_buildup_plans.id
                                        );
                                      }}
                                    >
                                      <DeleteIcon fontSize="inherit" />
                                    </Button>
                                  </td>
                                </tr>
                              );
                            }
                          )}
                          <tr>
                            <td
                              style={{
                                textAlign: "center",
                                verticalAlign: "middle",
                              }}
                              colSpan={2}
                            >
                              <Typography>Total Area</Typography>
                            </td>
                            <td colSpan={2}>
                              <TextField
                                fullWidth
                                onChange={formProps.handleChange}
                                size="small"
                                variant="outlined"
                                id="buildup_plans_total_area"
                                name="buildup_plans_total_area"
                                value={
                                  formProps.values.buildup_plans_total_area
                                }
                                // onChange={formProps.handleChange}
                      //           onBlur={() => {
                      //   if (formProps.values.railway_station)
                      //     setProgress(progress + 100 / formPropsLength);
                      // }}
                              />
                            </td>
                            <td colSpan={2}>
                              <TextField
                                fullWidth
                                select
                                size="small"
                                variant="outlined"
                                id="buildup_plans_total_area_unit"
                                name="buildup_plans_total_area_unit"
                                label="Total"
                                value={
                                  formProps.values.buildup_plans_total_area_unit
                                }
                                onChange={formProps.handleChange}
                                onBlur={() => {
                        if (formProps.values.buildup_plans_total_area_unit)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                              >
                                <MenuItem value="">Select</MenuItem>
                                <MenuItem value="ft">Sq ft</MenuItem>
                                <MenuItem value="mt">Sq mt</MenuItem>
                              </TextField>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  )}
                />
              </Col>
            </Row>
            <br />
            <Divider />
            <br />

            <Typography variant="h5">Floor height</Typography>
            <Divider />
            <br />
            <Row className="pb-2">
              <Col md={12}>
                <FieldArray
                  name="floor_heights"
                  render={(arrayHelpers) => (
                    <div>
                      <Row>
                        <Col md={3}>
                          <TextField
                            fullWidth
                            select
                            size="small"
                            variant="outlined"
                            id="floor_room_name"
                            name="floor_room_name"
                            label="Room Name"
                            value={formProps.values.floor_room_name}
                            onChange={formProps.handleChange}
                            onBlur={() => {
                        if (formProps.values.floor_room_name)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                          >
                            <MenuItem value="">Select</MenuItem>
                            {props?.dropdowns?.dropdowns
                        ?.filter((field) => field?.name == "Room Name")[0]
                        ?.drop_down_details?.map((field, i) => (
                          <MenuItem key={i} value={field?.name}>
                            {field?.name}
                          </MenuItem>
                        ))}
                          </TextField>
                        </Col>

                        <Col md={3}>
                          <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            id="height_floor"
                            name="height_floor"
                            label="Height"
                            value={formProps.values.height_floor}
                            onChange={formProps.handleChange}
                            onBlur={() => {
                        if (formProps.values.height_floor)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                          />
                        </Col>

                        <Col md={3}>
                          <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            id="floor_unit"
                            name="floor_unit"
                            label="Unit"
                            value={formProps.values.floor_unit}
                            onChange={formProps.handleChange}
                            onBlur={() => {
                        if (formProps.values.floor_unit)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                          />
                        </Col>

                        <Col md={2}>
                          <Button
                            color="success"
                            variant="contained"
                            onClick={() => {
                              arrayHelpers.push({
                                measurement_id: formProps.values.id,
                                room_name: formProps.values.floor_room_name,
                                height: formProps.values.height_floor,
                                unit: formProps.values.floor_unit,
                              });
                              {
                                formProps.setFieldValue("floor_room_name", "");
                                formProps.setFieldValue("height_floor", "");
                                formProps.setFieldValue("floor_unit", "");
                              }
                            }}
                            size="large"
                          >
                            <AddIcon fontSize="inherit" />
                          </Button>
                        </Col>
                      </Row>
                      <Table
                        size="sm"
                        className="mt-3"
                        bordered
                        style={{ textAlign: "center" }}
                      >
                        <thead>
                          <tr>
                            <th>Sr No.</th>
                            <th>Room name</th>
                            <th>Height</th>
                            <th>Unit</th>
                            <th>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            (console.log(
                              "floor_heights",
                              formProps?.values?.floor_heights
                            ),
                            console.log(
                              "delete_floor_heights",
                              formProps?.values?.delete_floor_heights
                            ))
                          }
                          {formProps?.values?.floor_heights?.map(
                            (floor_heights, index) => {
                              return (
                                <tr key={index}>
                                  <td>{index + 1}</td>

                                  <td>
                                    <TextField
                                      fullWidth
                                      onChange={formProps.handleChange}
                                      size="small"
                                      label="Room name"
                                      variant="outlined"
                                      name={`floor_heights.${index}.room_name`}
                                      value={floor_heights.room_name}
                                      id="room_name"
                                    />
                                  </td>
                                  <td>
                                    <TextField
                                      fullWidth
                                      onChange={formProps.handleChange}
                                      size="small"
                                      label="Height"
                                      variant="outlined"
                                      name={`floor_heights.${index}.height`}
                                      value={floor_heights.height}
                                      id="height"
                                    />
                                  </td>
                                  <td>
                                    <TextField
                                      fullWidth
                                      onChange={formProps.handleChange}
                                      size="small"
                                      label="Unit"
                                      variant="outlined"
                                      name={`floor_heights.${index}.unit`}
                                      value={floor_heights.unit}
                                      id="unit"
                                    />
                                  </td>

                                  <td>
                                    <Button
                                      color="error"
                                      size="large"
                                      variant="outlined"
                                      onClick={() => {
                                        arrayHelpers.remove(index);
                                        formProps.values.delete_floor_heights.push(
                                          floor_heights.id
                                        );
                                      }}
                                    >
                                      <DeleteIcon fontSize="inherit" />
                                    </Button>
                                  </td>
                                </tr>
                              );
                            }
                          )}
                        </tbody>
                      </Table>
                    </div>
                  )}
                />
              </Col>
            </Row>
            <Divider />
            <br />

            <Row className="form-group pb-4">
              <Col md={4}></Col>
              <Col md={3}>
                <TextField
                  fullWidth
                  type="file"
                  focused
                  size="small"
                  variant="outlined"
                  id="file"
                  name="file"
                  label="File Upload"
                  onChange={(event) => {
                    formProps.setFieldValue(
                      "file",
                      event.currentTarget.files[0]
                    );
                    console.log("file", formProps.values.file);
                  }}
                  onBlur={() => {
                    if (formProps.values.file)
                      setProgress(progress + 100 / formPropsLength);
                  }}
                />
              </Col>
              <Col>
                <ViewPC file={formProps.values.file} />
              </Col>
              <Col md={4}></Col>
            </Row>

            <Typography variant="h5">Area as Per Document</Typography>

<Row>
<Col md={4} className="pb-4">
<TextField
fullWidth
id="carpet_area"
name="carpet_area"
label="Carpet Area"
variant="standard"
value={formProps.values.carpet_area}
onChange={formProps.handleChange}
onBlur={() => {
if (formProps.values.carpet_area)
setProgress(progress + 100 / formPropsLength);
}}
/>
</Col>
<Col md={4} className="pb-4">
<TextField
fullWidth
id="built_up_area"
name="built_up_area"
label="Built Up Area"
variant="standard"
value={formProps.values.built_up_area}
onChange={formProps.handleChange}
onBlur={() => {
if (formProps.values.built_up_area)
setProgress(progress + 100 / formPropsLength);
}}
/>
</Col>
<Col md={4} className="pb-4">
<TextField
fullWidth
id="super_built_up_area"
name="super_built_up_area"
label="Super Built Up Area"
variant="standard"
value={formProps.values.super_built_up_area}
onChange={formProps.handleChange}
onBlur={() => {
if (formProps.values.super_built_up_area)
setProgress(progress + 100 / formPropsLength);
}}
/>
</Col>

</Row>

            <Divider />
            <br />
            <Row className="form-group">
                  <Tooltip title="Add to report" placement="top">
                    <Checkbox size="medium" defaultChecked />
                  </Tooltip>
                  <Col md={9} className="pb-4">
                    {/* <TextField
                      fullWidth
                      id="report"
                      name="report"
                      label="Report"
                      variant="standard"
                      value={formProps.values.report}
                      onChange={formProps.handleChange}
                    /> */}

                    <TextareaAutosize
                      aria-label="minimum height"
                      minRows={3}
                      // placeholder="Minimum 3 rows"
                      id="report"
                      name="report"
                      label="Report"
                      variant="standard"
                      value={formProps.values.report}
                      onChange={formProps.handleChange}
                      style={{ width: "100%" }}
                    />
                  </Col>
                  <Col md={2}>
                    <WhatsappShareButton
                      url={window.location.hash}
                      title={formProps.values.report}
                      separator=":: "
                      // className={classes.socialMediaButton}
                    >
                      <WhatsappIcon size={36} />
                    </WhatsappShareButton>
                  </Col>
                  <Col md={10} className="pb-4">
                    <TextField
                      disabled
                      fullWidth
                      id="sample_text"
                      name="Sample text"
                      label="sample_text"
                      variant="standard"
                      value={formProps.values.sample_text}
                      onChange={formProps.handleChange}
                    />
                  </Col>
                  <Col md={2}>
                    <Button
                      color="success"
                      variant="outlined"
                      size="small"
                      onClick={() =>
                        formProps.setFieldValue(
                          "report",
                          formProps.values.sample_text
                        )
                      }
                    >
                      Copy Text
                    </Button>
                  </Col>
                </Row>
            <Divider />
            <br />

            <Row className="form-group pb-4">
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
        )}
      </Formik>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    property: state.property,
    dropdowns: state.dropdowns,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editMeasurementData: (data, token) =>
      dispatch(editMeasurementData(data, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PC);
