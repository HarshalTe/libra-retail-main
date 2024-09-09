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

//*Compoents
import ViewComposite from "./ViewComposite";
import Box from "@mui/material/Box";
import { editProgressData } from "../../../../../../Redux/Creators/ProgressCreators";

import ProgressLabel from "./ProgressLabel";

import TextareaAutosize from "@mui/material/TextareaAutosize";

import {
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import Valuation from "../../Valuation/Valuation";
import ComponentContext from "views/Components/SplitScreeen/CompoenetContext";

function Composite(props) {
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

    data.append("plans", JSON.stringify(values.plans));
    data.append("delete_plans", JSON.stringify(values.delete_plans));

    data.append("floor_heights", JSON.stringify(values.floor_heights));
    data.append(
      "delete_floor_heights",
      JSON.stringify(values.delete_floor_heights)
    );

    data.append("sites_balcony_total", values.sites_balcony_total);
    data.append("sites_carpet_area_total", values.sites_carpet_area_total);
    data.append("sites_plot_total_area", values.sites_plot_total_area);
    data.append("plans_balcony_total", values.plans_balcony_total);
    data.append("plans_carpet_area_total", values.plans_carpet_area_total);
    data.append("plans_plot_total_area", values.plans_plot_total_area);

    let progressData = {
      id: props?.property?.property?.id,
      measurementProgress: 1,
      
    }

    const value = 3;

    props.editProgressData(progressData, props.setValue, value,props.login?.login?.token);

    props.editMeasurementData(data, token);
    setSubmitting(false);
    setComponent(<Valuation />);
  };
  const formPropsLength = 16;

  return (
    <div>
      <Formik
        initialValues={{
          id: props?.property?.property?.measurement?.id,
          property_id: props?.property?.property?.id,
          measurement_type: "Composite",
          file: props?.property?.property?.measurement?.file,

          //*sites
          sites: props?.property?.property?.measurement?.sites,
          delete_sites: [],
          group_head: "",
          room_name: "",
          sequence: "",
          length: "",
          width: "",
          area: "",
          plot_area: null,

          //!
          sites_balcony_total:
            props?.property?.property?.measurement?.sites_balcony_total,
          sites_carpet_area_total:
            props?.property?.property?.measurement?.sites_carpet_area_total,
          sites_plot_total_area: null,
          //!

          //*plans
          plans: props?.property?.property?.measurement?.plans,
          delete_plans: [],
          group_head2: "",
          room_name2: "",
          sequence2: "",
          length2: "",
          width2: "",
          area2: "",
          plot_area2: null,

          //!
          plans_balcony_total:
            props?.property?.property?.measurement?.plans_balcony_total,
          plans_carpet_area_total:
            props?.property?.property?.measurement?.plans_carpet_area_total,
          plans_plot_total_area: null,
          //!

          //*Floor Height
          floor_heights: props?.property?.property?.measurement?.floor_heights,
          delete_floor_heights: [],
          room_name2: "",
          height: "",
          unit: "",
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
                        <Col md={2}>
                          <TextField
                            fullWidth
                            select
                            size="small"
                            variant="outlined"
                            id="group_head"
                            name="group_head"
                            label="Group head"
                            value={formProps.values.group_head}
                            onChange={formProps.handleChange}
                            onBlur={() => {
                        if (formProps.values.group_head)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                          >
                             <MenuItem value="">Select</MenuItem>
                            {props?.dropdowns?.dropdowns
                        ?.filter((field) => field?.name == "Group head")[0]
                        ?.drop_down_details?.map((field, i) => (
                          <MenuItem key={i} value={field?.name}>
                            {field?.name}
                          </MenuItem>
                        ))}
                          </TextField>
                        </Col>

                        <Col md={2}>
                          <TextField
                            fullWidth
                            select
                            size="small"
                            variant="outlined"
                            id="room_name"
                            name="room_name"
                            label="Room Name"
                            value={formProps.values.room_name}
                            onChange={formProps.handleChange}
                            onBlur={() => {
                        if (formProps.values.room_name)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                          >
                           <MenuItem value="">Select</MenuItem>
                            {props?.dropdowns?.dropdowns
                        ?.filter((field) => field?.name === "Room Name")[0]
                        ?.drop_down_details?.map((field, i) => (
                          <MenuItem key={i} value={field?.name}>
                            {field?.name}
                          </MenuItem>
                        ))}
                          </TextField>
                        </Col>

                        <Col md={2}>
                          <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            id="sequence"
                            name="sequence"
                            label="Sequence"
                            value={formProps.values.sequence}
                            onChange={formProps.handleChange}
                            onBlur={() => {
                        if (formProps.values.sequence)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                          />
                        </Col>

                        <Col>
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

                        <Col>
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
                        <Col>
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
                                group_head: formProps.values.group_head,
                                room_name: formProps.values.room_name,
                                sequence: formProps.values.sequence,
                                length: formProps.values.length,
                                width: formProps.values.width,
                                area: formProps.values.width * formProps.values.length,

                                //!no need
                                plot_area: formProps.values.plot_area,
                              });
                              {
                                formProps.setFieldValue("group_head", "");
                                formProps.setFieldValue("room_name", "");
                                formProps.setFieldValue("sequence", "");
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
                        style={{ textAlign: "center", verticalAlign: "middle" }}
                      >
                        <thead>
                          <tr>
                            <th>Sr No.</th>
                            <th>Group head</th>
                            <th>Room name</th>
                            <th>Sequence</th>
                            <th>Length</th>
                            <th>Width</th>
                            <th>Area</th>
                            <th>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {formProps?.values?.sites?.map((sites, index) => {
                            //!balcony area
                            formProps.values.sites_balcony_total =
                              formProps?.values?.sites
                                ?.filter(
                                  (site) => site.group_head === "Balcony"
                                )
                                .reduce(function (prev, cur) {
                                  return (
                                    Number(prev) + Number(cur.area)
                                  ).toFixed(2);
                                }, 0);

                            //!bedroom area

                            formProps.values.sites_carpet_area_total =
                              formProps?.values?.sites
                                ?.filter(
                                  (site) => site.group_head === "Carpet Area"
                                )
                                .reduce(function (prev, cur) {
                                  return (
                                    Number(prev) + Number(cur.area)
                                  ).toFixed(2);
                                }, 0);

                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>

                                <td>
                                  <TextField
                                    fullWidth
                                    size="small"
                                    label="Group head"
                                    variant="outlined"
                                    name={`sites.${index}.group_head`}
                                    value={sites.group_head}
                                    id="group_head"
                                    onChange={formProps.handleChange}
                                  />
                                </td>
                                <td>
                                  <TextField
                                    fullWidth
                                    size="small"
                                    label="Room name"
                                    variant="outlined"
                                    name={`sites.${index}.room_name`}
                                    value={sites.room_name}
                                    id="room_name"
                                    onChange={formProps.handleChange}
                                  />
                                </td>
                                <td>
                                  <TextField
                                    fullWidth
                                    size="small"
                                    label="Sequence"
                                    variant="outlined"
                                    name={`sites.${index}.sequence`}
                                    value={sites.sequence}
                                    id="sequence"
                                    onChange={formProps.handleChange}
                                  />
                                </td>
                                <td>
                                  <TextField
                                    fullWidth
                                    size="small"
                                    label="Lenght"
                                    variant="outlined"
                                    name={`sites.${index}.length`}
                                    value={sites.length}
                                    id="length"
                                    onChange={formProps.handleChange}
                                  />
                                </td>
                                <td>
                                  <TextField
                                    fullWidth
                                    size="small"
                                    label="Width"
                                    variant="outlined"
                                    name={`sites.${index}.width`}
                                    value={sites.width}
                                    id="width"
                                    onChange={formProps.handleChange}
                                  />
                                </td>
                                <td>
                                  <TextField
                                    fullWidth
                                    size="small"
                                    label="Area"
                                    variant="outlined"
                                    name={`sites.${index}.area`}
                                    value={sites.area}
                                    id="area"
                                    onChange={formProps.handleChange}
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
                            <th
                              style={{
                                textAlign: "center",
                                verticalAlign: "middle",
                              }}
                              colSpan={3}
                            >
                              Balcony
                            </th>
                            <th
                              style={{
                                textAlign: "center",
                                verticalAlign: "middle",
                              }}
                              colSpan={3}
                            >
                              Total
                            </th>
                            <th
                              style={{
                                textAlign: "center",
                                verticalAlign: "middle",
                              }}
                              colSpan={2}
                            >
                              <TextField
                                fullWidth
                                onChange={formProps.handleChange}
                                size="small"
                                variant="outlined"
                                name="sites_balcony_total"
                                value={formProps.values.sites_balcony_total}
                                id="sites_balcony_total"
                              />
                            </th>
                          </tr>
                          <tr>
                            <th
                              style={{
                                textAlign: "center",
                                verticalAlign: "middle",
                              }}
                              colSpan={3}
                            >
                              Carpet Area
                            </th>
                            <th
                              style={{
                                textAlign: "center",
                                verticalAlign: "middle",
                              }}
                              colSpan={3}
                            >
                              Total
                            </th>
                            <th
                              style={{
                                textAlign: "center",
                                verticalAlign: "middle",
                              }}
                              colSpan={2}
                            >
                              <TextField
                                fullWidth
                                onChange={formProps.handleChange}
                                size="small"
                                variant="outlined"
                                name="sites_carpet_area_total"
                                value={formProps.values.sites_carpet_area_total}
                                id="sites_carpet_area_total"
                              />
                            </th>
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
                        <Col md={2}>
                          <TextField
                            fullWidth
                            select
                            size="small"
                            variant="outlined"
                            id="group_head2"
                            name="group_head2"
                            label="Group head2"
                            value={formProps.values.group_head2}
                            onChange={formProps.handleChange}
                            onBlur={() => {
                        if (formProps.values.group_head2)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                          >
                            <MenuItem value="">Select</MenuItem>
                            {props?.dropdowns?.dropdowns
                        ?.filter((field) => field?.name == "Group head")[0]
                        ?.drop_down_details?.map((field, i) => (
                          <MenuItem key={i} value={field?.name}>
                            {field?.name}
                          </MenuItem>
                        ))}
                          </TextField>
                        </Col>

                        <Col md={2}>
                          <TextField
                            fullWidth
                            select
                            size="small"
                            variant="outlined"
                            id="room_name2"
                            name="room_name2"
                            label="Room Name"
                            value={formProps.values.room_name2}
                            onChange={formProps.handleChange}
                            onBlur={() => {
                        if (formProps.values.room_name2)
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

                        <Col md={2}>
                          <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            id="sequence2"
                            name="sequence2"
                            label="Sequence"
                            value={formProps.values.sequence2}
                            onChange={formProps.handleChange}
                            onBlur={() => {
                        if (formProps.values.sequence2)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                          />
                        </Col>

                        <Col>
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

                        <Col>
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
                        <Col>
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
                                group_head: formProps.values.group_head2,
                                room_name: formProps.values.room_name2,
                                sequence: formProps.values.sequence2,
                                length: formProps.values.length2,
                                width: formProps.values.width2,
                                area: formProps.values.width2 * formProps.values.length2,

                                //!no need
                                plot_area: formProps.values.plot_area2,
                              });
                              {
                                formProps.setFieldValue("group_head2", "");
                                formProps.setFieldValue("room_name2", "");
                                formProps.setFieldValue("sequence2", "");
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
                            <th>Group head</th>
                            <th>Room name</th>
                            <th>Sequence</th>
                            <th>Length</th>
                            <th>Width</th>
                            <th>Area</th>
                            <th>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {formProps?.values?.plans?.map((plans, index) => {
                            //!balcony area
                            formProps.values.plans_balcony_total =
                              formProps?.values?.plans
                                ?.filter(
                                  (plan) => plan.group_head === "Balcony"
                                )
                                .reduce(function (prev, cur) {
                                  return (
                                    Number(prev) + Number(cur.area)
                                  ).toFixed(2);
                                }, 0);

                            //!bedroom area
                            formProps.values.plans_carpet_area_total =
                              formProps?.values?.plans
                                ?.filter(
                                  (plan) => plan.group_head === "Carpet Area"
                                )
                                .reduce(function (prev, cur) {
                                  return (
                                    Number(prev) + Number(cur.area)
                                  ).toFixed(2);
                                }, 0);
                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>

                                <td>
                                  <TextField
                                    fullWidth
                                    onChange={formProps.handleChange}
                                    size="small"
                                    label="Group head"
                                    variant="outlined"
                                    name={`plans.${index}.group_head`}
                                    value={plans.group_head}
                                    id="group_head"
                                  />
                                </td>
                                <td>
                                  <TextField
                                    fullWidth
                                    onChange={formProps.handleChange}
                                    size="small"
                                    label="Room name"
                                    variant="outlined"
                                    name={`plans.${index}.room_name`}
                                    value={plans.room_name}
                                    id="room_name"
                                  />
                                </td>
                                <td>
                                  <TextField
                                    fullWidth
                                    onChange={formProps.handleChange}
                                    size="small"
                                    label="Sequence"
                                    variant="outlined"
                                    name={`plans.${index}.sequence`}
                                    value={plans.sequence}
                                    id="sequence"
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
                            <th
                              style={{
                                textAlign: "center",
                                verticalAlign: "middle",
                              }}
                              colSpan={3}
                            >
                              Balcony
                            </th>
                            <th
                              style={{
                                textAlign: "center",
                                verticalAlign: "middle",
                              }}
                              colSpan={3}
                            >
                              Total
                            </th>
                            <th
                              style={{
                                textAlign: "center",
                                verticalAlign: "middle",
                              }}
                              colSpan={2}
                            >
                              <TextField
                                fullWidth
                                onChange={formProps.handleChange}
                                size="small"
                                variant="outlined"
                                name="plans_balcony_total"
                                value={formProps.values.plans_balcony_total}
                                id="plans_balcony_total"
                              />
                            </th>
                          </tr>
                          <tr>
                            <th
                              style={{
                                textAlign: "center",
                                verticalAlign: "middle",
                              }}
                              colSpan={3}
                            >
                              Carpet Area
                            </th>
                            <th
                              style={{
                                textAlign: "center",
                                verticalAlign: "middle",
                              }}
                              colSpan={3}
                            >
                              Total
                            </th>
                            <th
                              style={{
                                textAlign: "center",
                                verticalAlign: "middle",
                              }}
                              colSpan={2}
                            >
                              <TextField
                                fullWidth
                                onChange={formProps.handleChange}
                                size="small"
                                variant="outlined"
                                name="plans_carpet_area_total"
                                value={formProps.values.plans_carpet_area_total}
                                id="plans_carpet_area_total"
                              />
                            </th>
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
                            id="room_name2"
                            name="room_name2"
                            label="Room Name"
                            value={formProps.values.room_name2}
                            onChange={formProps.handleChange}
                            onBlur={() => {
                        if (formProps.values.room_name2)
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
                            id="height"
                            name="height"
                            label="Height"
                            value={formProps.values.height}
                            onChange={formProps.handleChange}
                            onBlur={() => {
                        if (formProps.values.height)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                          />
                        </Col>

                        <Col md={3}>
                          <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            id="unit"
                            name="unit"
                            label="Unit"
                            value={formProps.values.unit}
                            onChange={formProps.handleChange}
                            onBlur={() => {
                        if (formProps.values.unit)
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
                                room_name: formProps.values.room_name2,
                                height: formProps.values.height,
                                unit: formProps.values.unit,
                              });
                              {
                                formProps.setFieldValue("room_name2", "");
                                formProps.setFieldValue("height", "");
                                formProps.setFieldValue("unit", "");
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
                          {formProps?.values?.floor_heights?.map(
                            (floor_heights, index) => {
                              return (
                                <tr key={index}>
                                  <td>{index + 1}</td>

                                  <td>
                                    <TextField
                                      fullWidth
                                      size="small"
                                      label="Room name"
                                      variant="outlined"
                                      name={`floor_heights.${index}.room_name`}
                                      value={floor_heights.room_name}
                                      id="room_name"
                                      onChange={formProps.handleChange}
                                    />
                                  </td>
                                  <td>
                                    <TextField
                                      fullWidth
                                      size="small"
                                      label="Height"
                                      variant="outlined"
                                      name={`floor_heights.${index}.height`}
                                      value={floor_heights.height}
                                      id="height"
                                      onChange={formProps.handleChange}
                                    />
                                  </td>
                                  <td>
                                    <TextField
                                      fullWidth
                                      size="small"
                                      label="Unit"
                                      variant="outlined"
                                      name={`floor_heights.${index}.unit`}
                                      value={floor_heights.unit}
                                      id="unit"
                                      onChange={formProps.handleChange}
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
                <ViewComposite file={formProps.values.file} />
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
    // propertyid: state.properties.propertyid,
    property: state.property,
    dropdowns: state.dropdowns,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editMeasurementData: (data, token) =>
      dispatch(editMeasurementData(data, token)),
      editProgressData: (progressData, setValue, value,token) =>dispatch(editProgressData(progressData, setValue, value,token)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Composite);
