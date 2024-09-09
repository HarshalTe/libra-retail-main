import React from "react";
import { connect } from "react-redux";
import { Row, Col, Table } from "reactstrap";
import Button from "@mui/material/Button";
import TextField from "@material-ui/core/TextField";

import { MenuItem, OutlinedInput, Select } from "@material-ui/core";

import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import {
  Autocomplete,
  Checkbox,
  Divider,
  FormControl,
  InputLabel,
  ListItemText,
  Typography,
} from "@mui/material";

//*Actions
import { editSpecificationsData } from "../../../../../Redux/Creators/SpecificationsCreators";
//*Compoenets
import LinerLoader from "components/Loaders/LinerLoader";
import Box from "@mui/material/Box";
import LinearProgressWithLabel from "../ProjectDetails/LinearProgressWithLabel";
import ADD_ONE from "../../../../../Redux/Types/ActionTypes";
import { useDispatch } from "react-redux";
import { editUnitDetailData2 } from "../../../../../Redux/Creators/UnitDetailCreators";
import { editProgressData } from "../../../../../Redux/Creators/ProgressCreators";

function Specifications(props) {
  const [progress, setProgress] = React.useState(0);
  const [personName2, setPersonName2] = React.useState(
    props?.property?.property?.specification?.property_authority || []
  );
  const dispatch = useDispatch();

  const token = props.login?.login?.token;

  const handleChange2 = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName2(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);
    const value = 4;

    let progressData = {
      id: props?.property?.property?.id,
      specificationsProgress: 1,
    };

    props.editProgressData(
      progressData,
      props.setValue,
      value,
      props.login?.login?.token
    );

    // props.editSpecificationsData(data, props.setValue, value, token);
    // props.editUnitDetailData2(data2, props.setValue, value2, token);
    // setSubmitting(true);
    handleSubmit2(values, { setSubmitting });
  };

  const handleSubmit2 = (values, { setSubmitting }) => {
    console.log("Values:", values);

    let data = {
      id: values.id,
      // property_id: values.property_id,
      // //*Specifications
      // quality_of_construction: values.quality_of_construction,
      // exterior: values.exterior,
      // interior: values.interior,

      // //*type of
      // type_of_construction: values.type_of_construction,

      // //*table
      // // date_of_construct: values.date_of_construct,
      // percent_completion: values.percent_completion,
      // percent_recommended: values.percent_recommended,

      // //*
      // rain: values.rain,
      // nature_of_soil: values.nature_of_soil,
      // material_quality: values.material_quality,
      // cracks: values.cracks,
      // roofs: values.roofs,
      // walls: values.walls,
      // flooring: values.flooring,
      // fittings: values.fittings,
      // doors_windows: values.doors_windows,
      // observation: values.observation,
      // ceiling: values.ceiling,
      // wc_connection: values.wc_connection,
      // electric_connection: values.electric_connection,
      // is_electric: values.is_electric,
      // internal_condition: values.internal_condition,
      // is_renovation: values.is_renovation,
      // renovation_remark: values.renovation_remark,
      // // floor_height: values.floor_height,
      // // loft_height: values.loft_height,
      // // shed_height: values.shed_height,
      // as_per_inspector: values.as_per_inspector,
      // as_per_aggrement: values.as_per_aggrement,
      // // is_attached_terrace_length: values.is_attached_terrace_length,
      // // is_attached_terrace_width: values.is_attached_terrace_width,
      // garden_length: values.garden_length,
      // garden_width: values.garden_width,
      // garden_remark: values.garden_remark,
      // // length: values.length,
      // // width: values.width,
      // parking_type: values.parking_type,
      // car_parking_no: values.car_parking_no,
      // carparking_value: values.carparking_value,
      // property_authority: values.property_authority,
      // lock_in_period: values.lock_in_period,
      // sale_value: values.sale_value,
      // non_sale_value: values.non_sale_value,
      // property_tax: values.property_tax,
      // is_overall_observation: values.is_overall_observation,
      // description_of_violation: values.description_of_violation,
      // side_of_violation: values.side_of_violation,
      // is_wc: values.is_wc,
      // violation_percent: values.violation_percent,
      // is_terrace: values.is_terrace,
      // is_attached_garden: values.is_attached_garden,
      // is_attached_garden_length: values.is_attached_garden_length,
      // is_attached_garden_width: values.is_attached_garden_width,
      // is_attached_terrace_length: values.is_attached_terrace_length,
      // is_attached_terrace_width: values.is_attached_terrace_width,
      // is_attached_garden_remark: values.is_attached_garden_remark,
      // // vertical:values.vertical,
      // // horizontal:values.horizontal,
      // // construct:values.construct,
      // height: [
      //   {
      //     floor_height: values.floor_height,
      //     loft_height: values.loft_height,
      //     shed_height: values.shed_height,
      //   },
      // ],
      // sharp_of_unit: [
      //   {
      //     length: values.length,
      //     width: values.width,
      //     ratio: values.ratio,
      //   },
      // ],
      // horizontal_violation: values.horizontal,
      // vertical_violation: values.vertical,

    quality_of_construction: values.quality_of_construction,
    exterior: values.exterior,
    interior: values.interior,
    type_of_construction: values.type_of_construction,
    rain: values.rain,
    nature_of_soil: values.nature_of_soil,
    structure_condition: values.structure_condition,
    material_quality: values.material_quality,
    cracks: values.cracks,
    roofs: values.roofs,
    walls: values.walls,
    flooring: values.flooring,
    fittings: values.fittings,
    doors_windows: values.doors_windows,
    ceiling: values.ceiling,
    is_renovation: values.is_renovation,
    renovation_remark: values.renovation_remark,
    observation: values.observation,
    floor_height: values.floor_height,
    loft_height: values.loft_height,
    shed_height: values.shed_height,
    shape: values.shape,
    length: values.length,
    width: values.width,
    ratio: values.ratio,
    approving_authority: values.approving_authority,
    lock_in_period: values.lock_in_period,
    sale_value: values.sale_value,
    non_sale_value: values.non_sale_value,
    property_tax: values.property_tax
    };
    const value = 4;

    let data2 = {
      id: values.id,
      property_id: values.property_id,
      structure_condition: values.structure_condition,
    };

    props.editSpecificationsData(data, props.setValue, value, token);
    props.editUnitDetailData2(data2, props.setValue, value, token);
    setSubmitting(true);
  };
  const formPropsLength = 43;

  return (
    <>
      {props.specifications.isLoading ? (
        <div>
          <LinerLoader />
        </div>
      ) : (
        <div>
          <br />

          <Formik
            initialValues={{
              id: props?.property?.property?.specification?.id,
              property_id: props?.property?.property?.id,
              //*Specifications
              quality_of_construction:
                props?.property?.property?.specification
                  ?.quality_of_construction,
              exterior: props?.property?.property?.specification?.exterior,
              interior: props?.property?.property?.specification?.interior,

              //*type of
              type_of_construction:
                props?.property?.property?.specification?.type_of_construction,

              //*table
              date_of_construct:
                props?.property?.property?.specification?.date_of_construct,
              percent_completion:
                props?.property?.property?.specification?.percent_completion,
              percent_recommended:
                props?.property?.property?.specification?.percent_recommended,

              //*
              rain: props?.property?.property?.specification?.rain,
              nature_of_soil:
                props?.property?.property?.specification?.nature_of_soil,
              structure_condition:
                props?.property?.property?.unit_detail?.structure_condition,
              material_quality:
                props?.property?.property?.specification?.material_quality,
              cracks: props?.property?.property?.specification?.cracks,
              roofs: props?.property?.property?.specification?.roofs,
              walls: props?.property?.property?.specification?.walls,
              flooring: props?.property?.property?.specification?.flooring,
              fittings: props?.property?.property?.specification?.fittings,
              doors_windows:
                props?.property?.property?.specification?.doors_windows,
              observation:
                props?.property?.property?.specification?.observation,
              ceiling: props?.property?.property?.specification?.ceiling,
              wc_connection:
                props?.property?.property?.specification?.wc_connection,
              is_wc: props?.property?.property?.specification?.is_wc,
              electric_connection:
                props?.property?.property?.specification?.electric_connection,
              is_electric:
                props?.property?.property?.specification?.is_electric,
              internal_condition:
                props?.property?.property?.specification?.internal_condition,
              renovation_remark:
                props?.property?.property?.specification?.renovation_remark,
              is_renovation:
                props?.property?.property?.specification?.is_renovation,
              floor_height:
                props?.property?.property?.specification?.height == null
                  ? ""
                  : props?.property?.property?.specification?.height[0]
                      ?.floor_height,
              loft_height:
                props?.property?.property?.specification?.height == null
                  ? ""
                  : props?.property?.property?.specification?.height[0]
                      ?.loft_height,
              shed_height:
                props?.property?.property?.specification?.height == null
                  ? ""
                  : props?.property?.property?.specification?.height[0]
                      ?.shed_height,
              as_per_inspector:
                props?.property?.property?.specification?.as_per_inspector,
              as_per_aggrement:
                props?.property?.property?.specification?.as_per_aggrement,
              is_attached_terrace_width:
                props?.property?.property?.specification
                  ?.is_attached_terrace_width,
              is_attached_terrace_length:
                props?.property?.property?.specification
                  ?.is_attached_terrace_length,
              garden_length:
                props?.property?.property?.specification?.garden_length,
              garden_width:
                props?.property?.property?.specification?.garden_width,
              garden_remark:
                props?.property?.property?.specification?.garden_remark,
              length:
                props?.property?.property?.specification?.sharp_of_unit == null
                  ? ""
                  : props?.property?.property?.specification?.sharp_of_unit[0]
                      ?.length,
              width:
                props?.property?.property?.specification?.sharp_of_unit == null
                  ? ""
                  : props?.property?.property?.specification?.sharp_of_unit[0]
                      ?.width,
              ratio:
                props?.property?.property?.specification?.sharp_of_unit == null
                  ? ""
                  : props?.property?.property?.specification?.sharp_of_unit[0]
                      ?.ratio,
              parking_type:
                props?.property?.property?.specification?.parking_type,
              car_parking_no:
                props?.property?.property?.specification?.car_parking_no,
              carparking_value:
                props?.property?.property?.specification?.carparking_value,
              property_authority:
                props?.property?.property?.specification?.property_authority,
              lock_in_period:
                props?.property?.property?.specification?.lock_in_period,
              sale_value: props?.property?.property?.specification?.sale_value,
              non_sale_value:
                props?.property?.property?.specification?.non_sale_value,
              property_tax:
                props?.property?.property?.specification?.property_tax,
              is_overall_observation:
                props?.property?.property?.specification
                  ?.is_overall_observation,
              side_of_violation:
                props?.property?.property?.specification?.side_of_violation,
              description_of_violation:
                props?.property?.property?.specification
                  ?.description_of_violation,
              violation_percent:
                props?.property?.property?.specification?.violation_percent,
              is_attached_garden_length:
                props?.property?.property?.specification
                  ?.is_attached_garden_length,
              is_attached_garden_width:
                props?.property?.property?.specification
                  ?.is_attached_garden_width,
              is_attached_garden_remark:
                props?.property?.property?.specification
                  ?.is_attached_garden_remark,
              is_terrace: props?.property?.property?.specification?.is_terrace,
              is_attached_garden:
                props?.property?.property?.specification?.is_attached_garden,
              vertical:
                props?.property?.property?.specification?.vertical_violation,
              horizontal:
                props?.property?.property?.specification?.horizontal_violation,
              // construct:props?.property?.property?.specification?.construct,
              deleted_boundaries: [],
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
                    <LinearProgressWithLabel
                      value={
                        (Object?.values(formProps?.values)?.filter(
                          (val) => val !== null && val?.length > 0
                        )?.length /
                          Object?.keys(formProps?.values)?.length) *
                        100
                      }
                    />
                  </Box>
                </div>
                <Typography variant={"h5"}>Specifications</Typography>
                <Divider />
                <br />
                <Row className="form-group">
                  <Col md={4} className="pb-4">
                    <Autocomplete
                      id="quality_of_construction"
                      options={
                        props?.dropdowns?.dropdowns?.filter(
                          (field) => field?.name === "Quality of Construction"
                        )[0]?.drop_down_details || []
                      }
                      getOptionLabel={(option) => option?.name || ""}
                      onChange={(event, newValue) => {
                        formProps.setFieldValue(
                          "quality_of_construction",
                          newValue?.name || ""
                        );
                      }}
                      onBlur={formProps.handleBlur}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          label="Quality of construction"
                          variant="standard"
                          size="small"
                          value={formProps.values.quality_of_construction}
                        />
                      )}
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <Autocomplete
                      id="exterior"
                      options={
                        props?.dropdowns?.dropdowns?.filter(
                          (field) => field?.name === "Exterior Master"
                        )[0]?.drop_down_details || []
                      }
                      getOptionLabel={(option) => option?.name || ""}
                      onChange={(event, newValue) => {
                        formProps.setFieldValue(
                          "exterior",
                          newValue?.name || ""
                        );
                        if (newValue?.name) {
                          setProgress(progress + 100 / formPropsLength);
                        }
                      }}
                      onBlur={formProps.handleBlur}
                      onOpen={formProps.handleBlur}
                      includeInputInList
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          label="Exterior"
                          variant="standard"
                          value={formProps.values.exterior}
                          error={
                            formProps.touched.exterior &&
                            Boolean(formProps.errors.exterior)
                          }
                          helperText={
                            formProps.touched.exterior &&
                            formProps.errors.exterior
                          }
                        />
                      )}
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <Autocomplete
                      id="interior"
                      options={
                        props?.dropdowns?.dropdowns?.filter(
                          (field) => field?.name === "Interior Master"
                        )[0]?.drop_down_details || []
                      }
                      getOptionLabel={(option) => option?.name || ""}
                      onChange={(event, newValue) => {
                        formProps.setFieldValue(
                          "interior",
                          newValue?.name || ""
                        );
                        if (newValue?.name) {
                          setProgress(progress + 100 / formPropsLength);
                        }
                      }}
                      onBlur={formProps.handleBlur}
                      onOpen={formProps.handleBlur}
                      includeInputInList
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          label="Interior/ Internal Condition"
                          variant="standard"
                          value={formProps.values.interior}
                          error={
                            formProps.touched.interior &&
                            Boolean(formProps.errors.interior)
                          }
                          helperText={
                            formProps.touched.interior &&
                            formProps.errors.interior
                          }
                        />
                      )}
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <Autocomplete
                      id="type_of_construction"
                      options={
                        props?.dropdowns?.dropdowns?.filter(
                          (field) => field?.name === "Type of Construction"
                        )[0]?.drop_down_details || []
                      }
                      getOptionLabel={(option) => option?.name || ""}
                      onChange={(event, newValue) => {
                        formProps.setFieldValue(
                          "type_of_construction",
                          newValue?.name || ""
                        );
                        if (newValue?.name) {
                          setProgress(progress + 100 / formPropsLength);
                        }
                      }}
                      onBlur={formProps.handleBlur}
                      onOpen={formProps.handleBlur}
                      includeInputInList
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          label="Type of Construction"
                          variant="standard"
                          value={formProps.values.type_of_construction}
                          error={
                            formProps.touched.type_of_construction &&
                            Boolean(formProps.errors.type_of_construction)
                          }
                          helperText={
                            formProps.touched.type_of_construction &&
                            formProps.errors.type_of_construction
                          }
                        />
                      )}
                    />
                  </Col>

                  {/* <Col md={8} className="pb-4">
                <TextField
                  fullWidth
                  id="quality_of_construction"
                  name="quality_of_construction"
                  label="Quality of construction"
                  variant="standard"
                  value={formProps.values.quality_of_construction}
                  onChange={formProps.handleChange}
                  onBlur={() => {
                          if (formProps.values.long)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                  error={
                    formProps.touched.quality_of_construction &&
                    Boolean(formProps.errors.quality_of_construction)
                  }
                  helperText={
                    formProps.touched.quality_of_construction &&
                    formProps.errors.quality_of_construction
                  }
                />
              </Col> */}
                  {/* <Row className="pt-4 pb-2">
                  <Col md={12}>
                    <FieldArray
                      name="construct"
                      render={(arrayHelpers) => (
                        <div>
                          <Row>
                            <Col md={3}>
                              <TextField
                                fullWidth
                                type="date"
                                size="small"
                                variant="outlined"
                                id="date_of_construct"
                                name="date_of_construct"
                                label="Date of construction &#x1F4F1;"
                                value={formProps.values.date_of_construct}
                                onChange={formProps.handleChange}
                                onBlur={() => {
                          if (formProps.values.date_of_construct)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                              >
                              </TextField>
                            </Col>

                            <Col md={4}>
                              <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="completion"
                                name="completion"
                                label="% Completion &#x1F4F1;"
                                value={formProps.values.completion}
                                onChange={formProps.handleChange}
                                onBlur={() => {
                          if (formProps.values.completion)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                              />
                            </Col>

                            <Col md={3}>
                              <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="recommended"
                                name="recommended"
                                label="% Recommended &#x1F4F1;"
                                value={formProps.values.recommended}
                                onChange={formProps.handleChange}
                                onBlur={() => {
                          if (formProps.values.recommended)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                              />
                            </Col>

                            <Col md={2}>
                              <Button
                                color="success"
                                variant="outlined"
                                onClick={() => {
                                  arrayHelpers.push({
                                    property_id: formProps.values.property_id,
                                    property_unit_detail_id:
                                      formProps.values.id,
                                      date_of_construct:
                                      formProps.values.date_of_construct,
                                      completion: formProps.values.completion,
                                      recommended: formProps.values.recommended,
                                  });
                                  {
                                    formProps.setFieldValue(
                                      "direction_name",
                                      ""
                                    );
                                    formProps.setFieldValue("ownership", "");
                                    formProps.setFieldValue("site", "");
                                    formProps.setFieldValue("plan", "");
                                  }
                                }}
                                size="large"
                              >
                                <AddIcon fontSize="inherit" />
                              </Button>
                            </Col>
                          </Row>
                          <Table size="sm" className="mt-3">
                            <thead>
                              <tr>
                                <th>Date of construct</th>
                                <th>% Completion</th>
                                <th>% Recommended </th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                (console.log(
                                  "values",
                                  formProps?.values?.construct
                                ),
                                console.log(
                                  "deleted",
                                  formProps.values.deleted_boundaries
                                ))
                              }
                              {formProps?.values?.construct?.map(
                                (construct, index) => {
                                  return (
                                    <tr key={index}>
                                      <td>
                                        <TextField
                                          fullWidth
                                          // disabled
                                          size="small"
                                          label="Date of construct"
                                          variant="outlined"
                                          name={`construct.${index}.date_of_construct`}
                                          value={construct.date_of_construct}
                                          id="date_of_construct"
                                          onChange={formProps.handleChange}
                                        />
                                      </td>
                                      <td>
                                        <TextField
                                          fullWidth
                                          // disabled
                                          size="small"
                                          label="% Completion"
                                          variant="outlined"
                                          name={`construct.${index}.completion`}
                                          value={construct.completion}
                                          id="completion"
                                          onChange={formProps.handleChange}
                                        />
                                      </td>
                                      <td>
                                        <TextField
                                          fullWidth
                                          size="small"
                                          label="% Recommended"
                                          variant="outlined"
                                          name={`construct.${index}.recommended`}
                                          value={construct.recommended}
                                          id="recommended"
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
                                            console.log("id", construct.id);
                                            formProps.values.deleted_boundaries.push(
                                              construct.id
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
                </Row> */}

                  <Col md={4} className="pb-4">
                    <Autocomplete
                      id="rain"
                      options={
                        props?.dropdowns?.dropdowns?.filter(
                          (field) => field?.name === "Rain"
                        )[0]?.drop_down_details || []
                      }
                      getOptionLabel={(option) => option?.name || ""}
                      onChange={(event, newValue) => {
                        formProps.setFieldValue("rain", newValue?.name || "");
                      }}
                      onBlur={formProps.handleBlur}
                      onOpen={formProps.handleBlur}
                      includeInputInList
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          label="Rain"
                          variant="standard"
                          error={
                            formProps.touched.rain &&
                            Boolean(formProps.errors.rain)
                          }
                          helperText={
                            formProps.touched.rain && formProps.errors.rain
                          }
                        />
                      )}
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <Autocomplete
                      id="nature_of_soil"
                      options={
                        props?.dropdowns?.dropdowns?.filter(
                          (field) => field?.name === "Nature of soil"
                        )[0]?.drop_down_details || []
                      }
                      getOptionLabel={(option) => option?.name || ""}
                      onChange={(event, newValue) => {
                        formProps.setFieldValue(
                          "nature_of_soil",
                          newValue?.name || ""
                        );
                      }}
                      onBlur={formProps.handleBlur}
                      onOpen={formProps.handleBlur}
                      includeInputInList
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          label="Nature of soil"
                          variant="standard"
                          error={
                            formProps.touched.nature_of_soil &&
                            Boolean(formProps.errors.nature_of_soil)
                          }
                          helperText={
                            formProps.touched.nature_of_soil &&
                            formProps.errors.nature_of_soil
                          }
                        />
                      )}
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <Autocomplete
                      id="structure_condition"
                      options={
                        props?.dropdowns?.dropdowns?.filter(
                          (field) => field?.name === "Structure condition"
                        )[0]?.drop_down_details || []
                      }
                      getOptionLabel={(option) => option?.name || ""}
                      onChange={(event, newValue) => {
                        formProps.setFieldValue(
                          "structure_condition",
                          newValue?.name || ""
                        );
                      }}
                      onBlur={formProps.handleBlur}
                      onOpen={formProps.handleBlur}
                      includeInputInList
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          label="Structure condition"
                          variant="standard"
                          error={
                            formProps.touched.structure_condition &&
                            Boolean(formProps.errors.structure_condition)
                          }
                          helperText={
                            formProps.touched.structure_condition &&
                            formProps.errors.structure_condition
                          }
                        />
                      )}
                    />
                  </Col>

                  <Col md={4}>
                    <Autocomplete
                      fullWidth
                      id="material_quality"
                      options={
                        props?.dropdowns?.dropdowns?.filter(
                          (field) => field?.name === "Material quality"
                        )[0]?.drop_down_details || []
                      }
                      getOptionLabel={(option) => option?.name || ""}
                      onChange={(event, newValue) => {
                        formProps.setFieldValue(
                          "material_quality",
                          newValue?.name || ""
                        );
                      }}
                      onBlur={formProps.handleBlur}
                      onOpen={formProps.handleBlur}
                      includeInputInList
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          label="Material quality"
                          variant="standard"
                          error={
                            formProps.touched.material_quality &&
                            Boolean(formProps.errors.material_quality)
                          }
                          helperText={
                            formProps.touched.material_quality &&
                            formProps.errors.material_quality
                          }
                        />
                      )}
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <Autocomplete
                      fullWidth
                      id="cracks"
                      options={
                        props?.dropdowns?.dropdowns?.filter(
                          (field) => field?.name === "Cracks"
                        )[0]?.drop_down_details || []
                      }
                      getOptionLabel={(option) => option?.name || ""}
                      onChange={(event, newValue) => {
                        formProps.setFieldValue("cracks", newValue?.name || "");
                        if (newValue?.name) {
                          setProgress(progress + 100 / formPropsLength);
                        }
                      }}
                      onBlur={formProps.handleBlur}
                      onOpen={formProps.handleBlur}
                      includeInputInList
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          label="Cracks"
                          variant="standard"
                          error={
                            formProps.touched.cracks &&
                            Boolean(formProps.errors.cracks)
                          }
                          helperText={
                            formProps.touched.cracks && formProps.errors.cracks
                          }
                        />
                      )}
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <Autocomplete
                      fullWidth
                      id="roofs"
                      options={
                        props?.dropdowns?.dropdowns?.filter(
                          (field) => field?.name === "Roofs"
                        )[0]?.drop_down_details || []
                      }
                      getOptionLabel={(option) => option?.name || ""}
                      onChange={(event, newValue) => {
                        formProps.setFieldValue("roofs", newValue?.name || "");
                        // Add any additional logic here based on your requirements
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          label="Roofs"
                          variant="standard"
                          size="small"
                        />
                      )}
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <Autocomplete
                      fullWidth
                      id="walls"
                      options={
                        props?.dropdowns?.dropdowns?.filter(
                          (field) => field?.name === "Type of Wall"
                        )[0]?.drop_down_details || []
                      }
                      getOptionLabel={(option) => option?.name || ""}
                      onChange={(event, newValue) => {
                        formProps.setFieldValue("walls", newValue?.name || "");
                        if (newValue?.name) {
                          setProgress(progress + 100 / formPropsLength);
                        }
                      }}
                      onBlur={formProps.handleBlur}
                      onOpen={formProps.handleBlur}
                      includeInputInList
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          label="Walls"
                          variant="standard"
                          size="small"
                          error={
                            formProps.touched.walls &&
                            Boolean(formProps.errors.walls)
                          }
                          helperText={
                            formProps.touched.walls && formProps.errors.walls
                          }
                        />
                      )}
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <Autocomplete
                      fullWidth
                      id="flooring"
                      name="flooring"
                      options={
                        props?.dropdowns?.dropdowns
                          ?.filter(
                            (field) => field?.name === "Type of Flooring"
                          )[0]
                          ?.drop_down_details?.map((field) => field?.name) || []
                      }
                      onChange={(event, value) =>
                        formProps.setFieldValue("flooring", value)
                      }
                      onBlur={formProps.handleBlur}
                      includeInputInList
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Flooring"
                          variant="standard"
                          error={
                            formProps.touched.flooring &&
                            Boolean(formProps.errors.flooring)
                          }
                          helperText={
                            formProps.touched.flooring &&
                            formProps.errors.flooring
                          }
                        />
                      )}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="fittings"
                      name="fittings"
                      label="Fixture/Fittings"
                      variant="standard"
                      value={formProps.values.fittings}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.fittings)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="doors_windows"
                      name="doors_windows"
                      label="Doors/Windows &#x1F4F1;"
                      // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                      variant="standard"
                      value={formProps.values.doors_windows}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.doors_windows)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="ceiling"
                      name="ceiling"
                      label="ceiling &#x1F4F1;"
                      variant="standard"
                      // InputLabelProps={{ style: { fontSize: 22 } }}
                      value={formProps.values.ceiling}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.ceiling)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      id="is_renovation"
                      name="is_renovation"
                      label="Renovation &#x1F4F1;"
                      variant="standard"
                      // InputLabelProps={{ style: { fontSize: 22 } }}
                      value={formProps.values.is_renovation}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.is_renovation)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    >
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value="1">Yes</MenuItem>
                      <MenuItem value="0">No</MenuItem>
                    </TextField>
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="renovation_remark"
                      name="renovation_remark"
                      label="Renovation Remark &#x1F4F1;"
                      variant="standard"
                      // InputLabelProps={{ style: { fontSize: 22 } }}
                      value={formProps.values.renovation_remark}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.renovation_remark)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="observation"
                      name="observation"
                      label="Overall observation(Property Description)"
                      variant="standard"
                      value={formProps.values.observation}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.observation)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  </Row>

                <Typography variant={"h6"}>Height</Typography>

                <Row>


                <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="floor_height"
                      name="floor_height"
                      label="floor height &#x1F4F1;"
                      variant="standard"
                      // InputLabelProps={{ style: { fontSize: 22 } }}
                      value={formProps.values.floor_height}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.floor_height)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="loft_height"
                      name="loft_height"
                      label="loft height &#x1F4F1;"
                      variant="standard"
                      // InputLabelProps={{ style: { fontSize: 22 } }}
                      value={formProps.values.loft_height}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.loft_height)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="shed_height"
                      name="shed_height"
                      label="shed height &#x1F4F1;"
                      variant="standard"
                      // InputLabelProps={{ style: { fontSize: 22 } }}
                      value={formProps.values.shed_height}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.shed_height)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                </Row>

                <Typography variant={"h5"}>Shape Of Unit:</Typography>

<Row>
  <Col md={3} className="pb-4">
    <Autocomplete
      fullWidth
      id="shape"
      name="shape"
      options={
        props?.dropdowns?.dropdowns?.filter(
          (field) => field?.name === "Shape"
        )[0]?.drop_down_details || []
      }
      getOptionLabel={(option) => option?.name || ""}
      onChange={(event, value) => {
        formProps.handleChange({
          target: {
            name: "shape",
            value: value ? value.name : "",
          },
        });
        if (value) {
          setProgress(progress + 100 / formPropsLength);
        }
      }}
      onBlur={formProps.handleBlur}
      includeInputInList
      renderInput={(params) => (
        <TextField
          {...params}
          label="Shape"
          variant="standard"
          // InputLabelProps={{ style: { fontSize: 22 } }}
        />
      )}
    />
  </Col>

  <Col md={3} className="pb-4">
    <TextField
      fullWidth
      id="length"
      name="length"
      label="Length &#x1F4F1;"
      variant="standard"
      // InputLabelProps={{ style: { fontSize: 22 } }}
      value={formProps.values.length}
      onChange={formProps.handleChange}
      onBlur={() => {
        if (formProps.values.length)
          setProgress(progress + 100 / formPropsLength);
      }}
    />
  </Col>
  <Col md={3} className="pb-4">
    <TextField
      fullWidth
      id="width"
      name="width"
      label="Width &#x1F4F1;"
      variant="standard"
      // InputLabelProps={{ style: { fontSize: 22 } }}
      value={formProps.values.width}
      onChange={formProps.handleChange}
      onBlur={() => {
        if (formProps.values.width)
          setProgress(progress + 100 / formPropsLength);
      }}
    />
  </Col>
  <Col md={3} className="pb-4">
    <TextField
      fullWidth
      id="ratio"
      name="ratio"
      label="Ratio &#x1F4F1;"
      variant="standard"
      // InputLabelProps={{ style: { fontSize: 22 } }}
      value={formProps.values.ratio}
      onChange={formProps.handleChange}
      onBlur={() => {
        if (formProps.values.ratio)
          setProgress(progress + 100 / formPropsLength);
      }}
    />
  </Col>
</Row>

<Typography variant={"h5"}>Authority Details</Typography>


<Row>
<Col md={6}>
                    <div>
                      <FormControl sx={{ m: 1, width: 440 }}>
                        <InputLabel id="demo-multiple-checkbox-label">
                          Approving Authority
                        </InputLabel>
                        <Select
                          labelId="demo-multiple-checkbox-label"
                          id="demo-multiple-checkbox"
                          multiple
                          value={personName2}
                          onChange={handleChange2}
                          input={<OutlinedInput label="Tag" />}
                          renderValue={(selected) => selected.join(", ")}
                          MenuProps={MenuProps}
                        >
                          {props?.dropdowns?.dropdowns
                            ?.filter(
                              (field) => field?.name == "approving_authority"
                            )[0]
                            ?.drop_down_details?.map((field) => (
                              <MenuItem key={field?.name} value={field?.name}>
                                <Checkbox
                                  checked={
                                    personName2.indexOf(field?.name) > -1
                                  }
                                />
                                <ListItemText primary={field?.name} />
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </div>
                  </Col>
                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      id="lock_in_period"
                      name="lock_in_period"
                      label="lock in period &#x1F4F1;"
                      variant="standard"
                      // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                      value={formProps.values.lock_in_period}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.lock_in_period)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      id="sale_value"
                      name="sale_value"
                      label="sale value wing &#x1F4F1;"
                      variant="standard"
                      // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                      value={formProps.values.sale_value}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.sale_value)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      id="non_sale_value"
                      name="non_sale_value"
                      label="Non-sale wing &#x1F4F1;"
                      variant="standard"
                      // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                      value={formProps.values.non_sale_value}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.non_sale_value)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      id="property_tax"
                      name="property_tax"
                      label="property tax Receipt &#x1F4F1;"
                      variant="standard"
                      // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                      value={formProps.values.property_tax}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.property_tax)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
</Row>




                  {/* <Row>
                    
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      id="is_wc"
                      label="W/C connection &#x1F4F1;"
                      name="is_wc"
                      variant="standard"
                      value={formProps.values.is_wc}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.is_wc)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    >
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value="1">Yes</MenuItem>
                      <MenuItem value="0">No</MenuItem>
                    </TextField>
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="wc_connection"
                      name="wc_connection"
                      label="W/C connection Remark &#x1F4F1;"
                      variant="standard"
                      value={formProps.values.wc_connection}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.wc_connection)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      id="is_electric"
                      name="is_electric"
                      label="electricity connection &#x1F4F1;"
                      variant="standard"
                      value={formProps.values.is_electric}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.is_electric)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    >
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value="1">Yes</MenuItem>
                      <MenuItem value="0">No</MenuItem>
                    </TextField>
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="electric_connection"
                      name="electric_connection"
                      label="electricity connection Remark &#x1F4F1;"
                      variant="standard"
                      value={formProps.values.electric_connection}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.electric_connection)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="internal_condition"
                      name="internal_condition"
                      label="internal condition &#x1F4F1;"
                      variant="standard"
                      value={formProps.values.internal_condition}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.internal_condition)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                 
                  
                  
                 
                </Row>
                <Typography variant={"h4"}>Age Of Property:</Typography>

                <Row>
                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      id="as_per_inspector"
                      name="as_per_inspector"
                      label="As per site inspection &#x1F4F1;"
                      variant="standard"
                      // InputLabelProps={{ style: { fontSize: 22 } }}
                      value={formProps.values.as_per_inspector}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.as_per_inspector)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      id="as_per_aggrement"
                      name="as_per_aggrement"
                      label="As per Aggrement &#x1F4F1;"
                      variant="standard"
                      // InputLabelProps={{ style: { fontSize: 22 } }}
                      value={formProps.values.as_per_aggrement}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.as_per_aggrement)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                </Row>
                <Typography variant={"h4"}>Attached Terrace</Typography>

                <Row>
                  <Col md={3} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      id="is_terrace"
                      name="is_terrace"
                      label="Terrace &#x1F4F1;"
                      variant="standard"
                      // InputLabelProps={{ style: { fontSize: 22 } }}
                      value={formProps.values.is_terrace}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.is_terrace)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    >
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value="1">Yes</MenuItem>
                      <MenuItem value="0">No</MenuItem>
                    </TextField>
                  </Col>
                  <Col md={3} className="pb-4">
                    <TextField
                      fullWidth
                      id="is_attached_terrace_length"
                      name="is_attached_terrace_length"
                      label="Length &#x1F4F1;"
                      variant="standard"
                      // InputLabelProps={{ style: { fontSize: 22 } }}
                      value={formProps.values.is_attached_terrace_length}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.is_attached_terrace_length)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  <Col md={3} className="pb-4">
                    <TextField
                      fullWidth
                      id="is_attached_terrace_width"
                      name="is_attached_terrace_width"
                      label="Width &#x1F4F1;"
                      variant="standard"
                      // InputLabelProps={{ style: { fontSize: 22 } }}
                      value={formProps.values.is_attached_terrace_width}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.is_attached_terrace_width)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  <Col md={3} className="pb-4">
                    <TextField
                      fullWidth
                      id="terrace_total"
                      name="terrace_total"
                      label="Total &#x1F4F1;"
                      variant="standard"
                      // InputLabelProps={{ style: { fontSize: 22 } }}
                      value={
                        +formProps.values.is_attached_terrace_width *
                        +formProps.values.is_attached_terrace_length
                      }
                      // onChange={formProps.handleChange}
                    />
                  </Col>
                </Row>
                <Typography variant={"h4"}>Attached Garden</Typography>

                <Row>
                  <Col md={3} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      id="is_attached_garden"
                      name="is_attached_garden"
                      label="Garden &#x1F4F1;"
                      variant="standard"
                      // InputLabelProps={{ style: { fontSize: 22 } }}
                      value={formProps.values.is_attached_garden}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.is_attached_garden)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    >
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value="1">Yes</MenuItem>
                      <MenuItem value="0">No</MenuItem>
                    </TextField>
                  </Col>
                  <Col md={3} className="pb-4">
                    <TextField
                      fullWidth
                      id="is_attached_garden_length"
                      name="is_attached_garden_length"
                      label="Length &#x1F4F1;"
                      variant="standard"
                      // InputLabelProps={{ style: { fontSize: 22 } }}
                      value={formProps.values.is_attached_garden_length}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.is_attached_garden_length)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  <Col md={3} className="pb-4">
                    <TextField
                      fullWidth
                      id="is_attached_garden_width"
                      name="is_attached_garden_width"
                      label="Width &#x1F4F1;"
                      variant="standard"
                      // InputLabelProps={{ style: { fontSize: 22 } }}
                      value={formProps.values.is_attached_garden_width}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.is_attached_garden_width)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  <Col md={3} className="pb-4">
                    <TextField
                      fullWidth
                      id="garden_total"
                      name="garden_total"
                      label="Total &#x1F4F1;"
                      variant="standard"
                      // InputLabelProps={{ style: { fontSize: 22 } }}
                      value={
                        +formProps.values.is_attached_garden_width *
                        +formProps.values.is_attached_garden_length
                      }
                      // onChange={formProps.handleChange}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="is_attached_garden_remark"
                      name="is_attached_garden_remark"
                      label="Garden Remark &#x1F4F1;"
                      variant="standard"
                      // InputLabelProps={{ style: { fontSize: 22 } }}
                      value={formProps.values.is_attached_garden_remark}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.is_attached_garden_remark)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                </Row>
               
                <Typography variant={"h4"}>Parking:</Typography>
                <Row>
                  <Col md={4} className="pb-4">
                    <Autocomplete
                      fullWidth
                      id="parking_type"
                      name="parking_type"
                      options={
                        props?.dropdowns?.dropdowns?.filter(
                          (field) => field?.name === "Parking type"
                        )[0]?.drop_down_details || []
                      }
                      getOptionLabel={(option) => option?.name || ""}
                      onChange={(event, value) => {
                        formProps.handleChange({
                          target: {
                            name: "parking_type",
                            value: value ? value.name : "",
                          },
                        });
                        if (value) {
                          setProgress(progress + 100 / formPropsLength);
                        }
                      }}
                      onBlur={formProps.handleBlur}
                      includeInputInList
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Parking type"
                          variant="standard"
                          // InputLabelProps={{ style: { fontSize: 22, textTransform: "capitalize" } }}
                        />
                      )}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="car_parking_no"
                      name="car_parking_no"
                      label="car parking no. &#x1F4F1;"
                      variant="standard"
                      // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                      value={formProps.values.car_parking_no}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.car_parking_no)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="carparking_value"
                      name="carparking_value"
                      label="car parking value &#x1F4F1;"
                      variant="standard"
                      // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                      value={formProps.values.carparking_value}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.carparking_value)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                </Row> */}
                

                <Divider />

                {/* <Typography variant={"h5"}>Horizontal Violation</Typography> */}
                {/* <Row className="pt-4 pb-2">
                  <Col md={12}>
                    <FieldArray
                      name="horizontal"
                      render={(arrayHelpers) => (
                        <div>
                          <Row>
                            <Col md={3}>
                              <TextField
                                fullWidth
                                select
                                size="small"
                                variant="outlined"
                                id="violationSide"
                                name="violationSide"
                                label="Direction of Violation &#x1F4F1;"
                                // InputLabelProps={{ style: { fontSize: 19,textTransform: "capitalize" } }}
                                value={formProps.values.violationSide}
                                onChange={formProps.handleChange}
                                onBlur={() => {
                                  if (formProps.values.violationSide)
                                    setProgress(
                                      progress + 100 / formPropsLength
                                    );
                                }}
                              >
                                <MenuItem value="">Select</MenuItem>
                                <MenuItem value="East">East</MenuItem>
                                <MenuItem value="West">West</MenuItem>
                                <MenuItem value="North">North</MenuItem>
                                <MenuItem value="South">South</MenuItem>
                              </TextField>
                            </Col>

                            <Col md={4}>
                              <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="violationDesc"
                                name="violationDesc"
                                label="description of violation &#x1F4F1;"
                                // InputLabelProps={{ style: { fontSize: 19,textTransform: "capitalize" } }}
                                value={formProps.values.violationDesc}
                                onChange={formProps.handleChange}
                                onBlur={() => {
                                  if (formProps.values.violationDesc)
                                    setProgress(
                                      progress + 100 / formPropsLength
                                    );
                                }}
                              />
                            </Col>

                            <Col md={3}>
                              <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="violationPercent"
                                name="violationPercent"
                                label="violation percent &#x1F4F1;"
                                // InputLabelProps={{ style: { fontSize: 19,textTransform: "capitalize" } }}
                                value={formProps.values.violationPercent}
                                onChange={formProps.handleChange}
                                onBlur={() => {
                                  if (formProps.values.violationPercent)
                                    setProgress(
                                      progress + 100 / formPropsLength
                                    );
                                }}
                              />
                            </Col>

                            <Col md={2}>
                              <Button
                                color="success"
                                variant="outlined"
                                onClick={() => {
                                  arrayHelpers.push({
                                    property_id: formProps.values.property_id,
                                    property_unit_detail_id:
                                      formProps.values.id,
                                    violationSide:
                                      formProps.values.violationSide,
                                    violationDesc:
                                      formProps.values.violationDesc,
                                    violationPercent:
                                      formProps.values.violationPercent,
                                  });
                                  // {
                                  //   formProps.setFieldValue(
                                  //     "direction_name",
                                  //     ""
                                  //   );
                                  //   formProps.setFieldValue("ownership", "");
                                  //   formProps.setFieldValue("site", "");
                                  //   formProps.setFieldValue("plan", "");
                                  // }
                                }}
                                size="large"
                              >
                                <AddIcon fontSize="inherit" />
                              </Button>
                            </Col>
                          </Row>
                          <Table size="sm" className="mt-3">
                            <thead>
                              <tr>
                                <th>Direction of Violation</th>
                                <th>Description Of Violation</th>
                                <th>Violation Percent </th>
                              </tr>
                            </thead>
                            <tbody>
                              {formProps?.values?.horizontal?.map(
                                (horizontal, index) => {
                                  return (
                                    <tr key={index}>
                                      <td>
                                        <TextField
                                          fullWidth
                                          // disabled
                                          size="small"
                                          label="Direction of Violation"
                                          variant="outlined"
                                          name={`horizontal.${index}.violationSide`}
                                          value={horizontal.violationSide}
                                          id="violationSide"
                                          onChange={formProps.handleChange}
                                        />
                                      </td>
                                      <td>
                                        <TextField
                                          fullWidth
                                          // disabled
                                          size="small"
                                          label="Description Of Violation"
                                          variant="outlined"
                                          name={`horizontal.${index}.violationDesc`}
                                          value={horizontal.violationDesc}
                                          id="violationDesc"
                                          onChange={formProps.handleChange}
                                        />
                                      </td>
                                      <td>
                                        <TextField
                                          fullWidth
                                          // disabled
                                          size="small"
                                          label="Violation Percent"
                                          variant="outlined"
                                          name={`horizontal.${index}.violationPercent`}
                                          value={horizontal.violationPercent}
                                          id="violationPercent"
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
                                            console.log("id", horizontal.id);
                                            formProps.values.deleted_boundaries.push(
                                              horizontal.id
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
                </Row> */}

                {/* <Divider /> */}
                {/* <Typography variant={"h5"}>Vertical Violation</Typography> */}
                {/* <Row className="pt-4 pb-2">
                  <Col md={12}>
                    <FieldArray
                      name="vertical"
                      render={(arrayHelpers) => (
                        <div>
                          <Row>
                            <Col md={3}>
                              <TextField
                                fullWidth
                                select
                                size="small"
                                variant="outlined"
                                id="violationSide"
                                name="violationSide"
                                label="Direction of Violation &#x1F4F1;"
                                // InputLabelProps={{ style: { fontSize: 19,textTransform: "capitalize" } }}
                                value={formProps.values.violationSide}
                                onChange={formProps.handleChange}
                                onBlur={() => {
                                  if (formProps.values.violationSide)
                                    setProgress(
                                      progress + 100 / formPropsLength
                                    );
                                }}
                              >
                                <MenuItem value="">Select</MenuItem>
                                <MenuItem value="East">East</MenuItem>
                                <MenuItem value="West">West</MenuItem>
                                <MenuItem value="North">North</MenuItem>
                                <MenuItem value="South">South</MenuItem>
                              </TextField>
                            </Col>

                            <Col md={4}>
                              <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="violationDesc"
                                name="violationDesc"
                                label="description of violation &#x1F4F1;"
                                // InputLabelProps={{ style: { fontSize: 19,textTransform: "capitalize" } }}
                                value={formProps.values.violationDesc}
                                onChange={formProps.handleChange}
                                onBlur={() => {
                                  if (formProps.values.violationDesc)
                                    setProgress(
                                      progress + 100 / formPropsLength
                                    );
                                }}
                              />
                            </Col>

                            <Col md={3}>
                              <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="violationPercent"
                                name="violationPercent"
                                label="violation percent &#x1F4F1;"
                                // InputLabelProps={{ style: { fontSize: 19,textTransform: "capitalize" } }}
                                value={formProps.values.violationPercent}
                                onChange={formProps.handleChange}
                                onBlur={() => {
                                  if (formProps.values.violationPercent)
                                    setProgress(
                                      progress + 100 / formPropsLength
                                    );
                                }}
                              />
                            </Col>

                            <Col md={2}>
                              <Button
                                color="success"
                                variant="outlined"
                                onClick={() => {
                                  arrayHelpers.push({
                                    property_id: formProps.values.property_id,
                                    property_unit_detail_id:
                                      formProps.values.id,
                                    violationSide:
                                      formProps.values.violationSide,
                                    violationDesc:
                                      formProps.values.violationDesc,
                                    violationPercent:
                                      formProps.values.violationPercent,
                                  });
                                  // {
                                  //   formProps.setFieldValue(
                                  //     "direction_name",
                                  //     ""
                                  //   );
                                  //   formProps.setFieldValue("ownership", "");
                                  //   formProps.setFieldValue("site", "");
                                  //   formProps.setFieldValue("plan", "");
                                  // }
                                }}
                                size="large"
                              >
                                <AddIcon fontSize="inherit" />
                              </Button>
                            </Col>
                          </Row>
                          <Table size="sm" className="mt-3">
                            <thead>
                              <tr>
                                <th>Direction of Violation</th>
                                <th>Description Of Violation</th>
                                <th>Violation Percent </th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                (console.log(
                                  "values",
                                  formProps?.values?.vertical
                                ),
                                console.log(
                                  "deleted",
                                  formProps.values.deleted_boundaries
                                ))
                              }

                              {formProps?.values?.vertical?.map(
                                (vertical, index) => {
                                  return (
                                    <tr key={index}>
                                      <td>
                                        <TextField
                                          fullWidth
                                          // disabled
                                          size="small"
                                          label="Direction of Violation"
                                          variant="outlined"
                                          name={`vertical.${index}.violationSide`}
                                          value={vertical.violationSide}
                                          id="violationSide"
                                          onChange={formProps.handleChange}
                                        />
                                      </td>
                                      <td>
                                        <TextField
                                          fullWidth
                                          // disabled
                                          size="small"
                                          label="Description Of Violation"
                                          variant="outlined"
                                          name={`vertical.${index}.violationDesc`}
                                          value={vertical.violationDesc}
                                          id="violationDesc"
                                          onChange={formProps.handleChange}
                                        />
                                      </td>
                                      <td>
                                        <TextField
                                          fullWidth
                                          // disabled
                                          size="small"
                                          label="Violation Percent"
                                          variant="outlined"
                                          name={`vertical.${index}.violationPercent`}
                                          value={vertical.violationPercent}
                                          id="violationPercent"
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
                                            console.log("id", vertical.id);
                                            formProps.values.deleted_boundaries.push(
                                              vertical.id
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
                </Row> */}

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
                      onClick={() => dispatch(ADD_ONE())}
                    >
                      Next
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    // propertyid: state.properties.propertyid,
    property: state.property,
    specifications: state.specifications,
    dropdowns: state.dropdowns,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editSpecificationsData: (data, setValue, value, token) =>
      dispatch(editSpecificationsData(data, setValue, value, token)),
    editUnitDetailData2: (data, setValue, value, token) =>
      dispatch(editUnitDetailData2(data, setValue, value, token)),
    editProgressData: (progressData, setValue, value, token) =>
      dispatch(editProgressData(progressData, setValue, value, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specifications);
