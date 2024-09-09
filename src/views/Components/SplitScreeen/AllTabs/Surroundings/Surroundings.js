import React from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Table,
} from "reactstrap";
import Button from "@mui/material/Button";
import TextField from "@material-ui/core/TextField";
import { MenuItem } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { Autocomplete, Divider, Typography } from "@mui/material";

//*Actions
import { editSurroundingsData } from "../../../../../Redux/Creators/SurroundingsCreators";
//*Compoenets
import LinerLoader from "components/Loaders/LinerLoader";
import Box from "@mui/material/Box";
import LinearProgressWithLabel from "../ProjectDetails/LinearProgressWithLabel";
import ADD_ONE from "../../../../../Redux/Types/ActionTypes"
import { useDispatch } from "react-redux";
import { editUnitDetailData2 } from "../../../../../Redux/Creators/UnitDetailCreators";
import { editProgressData } from "../../../../../Redux/Creators/ProgressCreators";


function Surroundings(props) {
  const [progress, setProgress] = React.useState(0);
  const dispatch = useDispatch();
  const token = props.login?.login?.token;
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);

    const value = 5;
    let progressData = {
      id: props?.property?.property?.id,
      surroundingsProgress: 1,
      
    }

    props.editProgressData(progressData, props.setValue, value,props.login?.login?.token);

    // props.editSurroundingsData(data, props.setValue, value, token);
    // props.editUnitDetailData2(data2, props.setValue, value2, token);
    // setSubmitting(false);
    handleSubmit2(values, { setSubmitting })
  };
  const handleSubmit2 = (values, { setSubmitting }) => {
    console.log("Values:", values);

    let data = {
      // token: token,
      id: values.id,
      property_id: values.property_id,
      //*Surroundings
      prop_surroundings: values.prop_surroundings,
      locality_type: values.locality_type,
      civic_amenities: values.civic_amenities,
      neighbourhood: values.neighbourhood,
      unit_view: values.unit_view,
      river_sea: values.river_sea,
      distance_from_naala: values.distance_from_naala,
      is_road_widening: values.is_road_widening,
      road_widening: values.road_widening,

      // road_width: values.road_width,
      // road_width_area: values.road_width_area,
      // request_per_unit: values.request_per_unit,
      // entry_from: values.entry_from,
      // not_coming_to: values.not_coming_to,
      // property_mortgage: values.property_mortgage,
      // amalgamate: values.amalgamate,

    };
console.log("property_mortgage",data)
    const value = 5;
    
    let data2={
      id: values.unitId,
      property_id: values.property_id,
      unit_view: values.unit_view,
      
    }

 

    props.editSurroundingsData(data, props.setValue, value, token);
    props.editUnitDetailData2(data2, props.setValue, value, token);
    setSubmitting(false);
  };
  const formPropsLength = 19;

  return (
    <>
      {props.surroundings.isLoading ? (
        <div>
          <LinerLoader />
        </div>
      ) : (
        <div>
          <br />
          <Formik
            initialValues={{
              id: props?.property?.property?.surrounding?.id,
              unitId: props?.property?.property?.unit_detail?.id,
              property_id: props?.property?.property?.id,
              //*Surroundings
              prop_surroundings:
                props?.property?.property?.surrounding?.prop_surroundings,
              locality_type:
                props?.property?.property?.surrounding?.locality_type,
              civic_amenities: props?.property?.property?.surrounding?.civic_amenities,
              neighbourhood:
                props?.property?.property?.surrounding?.neighbourhood,
              unit_view: props?.property?.property?.unit_detail?.unit_view,
              road_width: props?.property?.property?.surrounding?.road_width,
              road_width_area: props?.property?.property?.surrounding?.road_width_area,
              request_per_unit: props?.property?.property?.surrounding?.request_per_unit,
              entry_from: props?.property?.property?.surrounding?.entry_from,
              not_coming_to: props?.property?.property?.surrounding?.not_coming_to,
              river_sea: props?.property?.property?.surrounding?.river_sea,
              distance_from_naala: props?.property?.property?.surrounding?.distance_from_naala,
              road_widening: props?.property?.property?.surrounding?.road_widening,
              property_mortgage: props?.property?.property?.surrounding?.property_mortgage,
              amalgamate: props?.property?.property?.surrounding?.amalgamate,
              is_road_widening: props?.property?.property?.surrounding?.is_road_widening,
              deleted_boundaries:[],
              
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
                      <LinearProgressWithLabel value={(Object?.values(formProps?.values)?.filter((val) => val !== null && val?.length > 0)?.length/Object?.keys(formProps?.values)?.length)*100} />
                    </Box>
                  </div>
                <Typography variant={"h5"}>Surroundings</Typography>
                <Divider />
                <br />
                <Row className="form-group">
                <Col md={4} className="pb-4">
  <Autocomplete
    fullWidth
    id="prop_surroundings"
    name="prop_surroundings"
    options={props?.dropdowns?.dropdowns
      ?.filter((field) => field?.name === "Property Surroundings")[0]?.drop_down_details || []}
    getOptionLabel={(option) => option?.name || ""}
    onChange={(event, value) => {
      formProps.handleChange({
        target: {
          name: "prop_surroundings",
          value: value ? value.name : ""
        }
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
        label="Property Surroundings (Dev, Under Dev)"
        variant="standard"
        // InputLabelProps={{ style: { fontSize: 22, textTransform: "capitalize" } }}
        error={formProps.touched.prop_surroundings && Boolean(formProps.errors.prop_surroundings)}
        helperText={formProps.touched.prop_surroundings && formProps.errors.prop_surroundings}
      />
    )}
  />
</Col>

<Col md={4} className="pb-4">
  <Autocomplete
    fullWidth
    id="locality_type"
    name="locality_type"
    options={props?.dropdowns?.dropdowns
      ?.filter((field) => field?.name === "Class of locality")[0]?.drop_down_details || []}
    getOptionLabel={(option) => option?.name || ""}
    onChange={(event, value) => {
      formProps.handleChange({
        target: {
          name: "locality_type",
          value: value ? value.name : ""
        }
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
        label="Class of locality"
        variant="standard"
        // InputLabelProps={{ style: { fontSize: 22, textTransform: "capitalize" } }}
        error={formProps.touched.locality_type && Boolean(formProps.errors.locality_type)}
        helperText={formProps.touched.locality_type && formProps.errors.locality_type}
      />
    )}
  />
</Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="civic_amenities"
                      name="civic_amenities"
                      label="Proximity to civic amenities &#x1F4F1;"
                      // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                      variant="standard"
                      value={formProps.values.civic_amenities}
                      onChange={formProps.handleChange}
                       onBlur={() => {
                          if (formProps.values.civic_amenities)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      error={
                        formProps.touched.civic_amenities &&
                        Boolean(formProps.errors.civic_amenities)
                      }
                      helperText={
                        formProps.touched.civic_amenities &&
                        formProps.errors.civic_amenities
                      }
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="neighbourhood"
                      name="neighbourhood"
                      label="Neighbourhood/Type of development"
                      variant="standard"
                      value={formProps.values.neighbourhood}
                      onChange={formProps.handleChange}
                       onBlur={() => {
                          if (formProps.values.neighbourhood)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      error={
                        formProps.touched.neighbourhood &&
                        Boolean(formProps.errors.neighbourhood)
                      }
                      helperText={
                        formProps.touched.neighbourhood &&
                        formProps.errors.neighbourhood
                      }
                    />
                  </Col>

                  <Col md={8} className="pb-4">
                    {/* <FormLabel>Branch name</FormLabel> */}
                    <TextField
                      fullWidth
                      id="unit_view"
                      name="unit_view"
                      label="Unit view(Sea view, Park view, Main road view)"
                      variant="standard"
                      value={formProps.values.unit_view}
                      onChange={formProps.handleChange}
                       onBlur={() => {
                          if (formProps.values.unit_view)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      error={
                        formProps.touched.unit_view &&
                        Boolean(formProps.errors.unit_view)
                      }
                      helperText={
                        formProps.touched.unit_view &&
                        formProps.errors.unit_view
                      }
                    />
                  </Col>
                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      id="river_sea"
                      name="river_sea"
                      label="river, nalla or sea near by property &#x1F4F1;"
                      variant="standard"
                      // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                      value={formProps.values.river_sea}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.river_sea)
                        setProgress(progress + 100 / formPropsLength);
                      }}
                      />
                  </Col>
                <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      id="distance_from_naala"
                      name="distance_from_naala"
                      label="distance from river nalla sea &#x1F4F1;"
                      variant="standard"
                      // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                      value={formProps.values.distance_from_naala}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.distance_from_naala)
                        setProgress(progress + 100 / formPropsLength);
                      }}
                      />
                  </Col>
                <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      id="is_road_widening"
                      name="is_road_widening"
                      label="road widening &#x1F4F1;"
                      variant="standard"
                      // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                      value={formProps.values.is_road_widening}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.is_road_widening)
                        setProgress(progress + 100 / formPropsLength);
                      }}
                      >
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value="1">Yes</MenuItem>
                      <MenuItem value="0">No</MenuItem>
                    </TextField>
                  </Col>
                <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      id="road_widening"
                      name="road_widening"
                      label="road widening Remark &#x1F4F1;"
                      variant="standard"
                      // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                      value={formProps.values.road_widening}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.road_widening)
                        setProgress(progress + 100 / formPropsLength);
                      }}
                      />
                  </Col>

                  {/* <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="road_width"
                      name="road_width"
                      label="road width &#x1F4F1;"
                      variant="standard"
                      // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                      value={formProps.values.road_width}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.road_width)
                        setProgress(progress + 100 / formPropsLength);
                      }}
                      />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="road_width_area"
                      name="road_width_area"
                      label="Feet & Inch &#x1F4F1;"
                      variant="standard"
                      // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                      value={formProps.values.road_width_area}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.road_width_area)
                        setProgress(progress + 100 / formPropsLength);
                      }}
                      />
                  </Col> */}
                </Row>
                {/* <Typography variant={"h7"}>Amalgamation Details</Typography>
                <Row className="pt-4 pb-2">
                  <Col md={12}>
                    <FieldArray
                      name="amalgamate"
                      render={(arrayHelpers) => (
                        <div>
                          <Row>
                    
                    <Col md={3} className="pb-4">
                      <TextField
                        fullWidth
                        id="unit_no"
                        name="unit_no"
                        size="small"
                        label="unit No &#x1F4F1;"
                        variant="outlined"
                        // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                        value={formProps.values.unit_no}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                            if (formProps.values.unit_no)
                              setProgress(progress + 100 / formPropsLength);
                            }}
                          />
                    </Col>
                    <Col md={3} className="pb-4">
                      <TextField
                        fullWidth
                        id="entry_from_unit"
                        name="entry_from_unit"
                        size="small"
                        label="entry from unit &#x1F4F1;"
                        variant="outlined"
                        // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                        value={formProps.values.entry_from_unit}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.entry_from_unit)
                          setProgress(progress + 100 / formPropsLength);
                        }}
                        />
                    </Col>
                    <Col md={2} className="pb-4">
                      <TextField
                        fullWidth
                        id="wc_unit"
                        size="small"
                        name="wc_unit"
                        label="W/C in unit &#x1F4F1;"
                        variant="outlined"
                        // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                        value={formProps.values.wc_unit}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.wc_unit)
                          setProgress(progress + 100 / formPropsLength);
                        }}
                        />
                    </Col>
                    <Col md={2} className="pb-4">
                      <TextField
                        fullWidth
                        id="kitchen"
                        size="small"
                        name="kitchen"
                        label="kitchen in &#x1F4F1;"
                        variant="outlined"
                        // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                        value={formProps.values.kitchen}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.kitchen)
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
                                    unit_no: formProps.values.unit_no,
                                    entry_from_unit: formProps.values.entry_from_unit,
                                    wc_unit: formProps.values.wc_unit,
                                    kitchen: formProps.values.kitchen,
                                    not_coming: formProps.values.not_coming,

                                    property_unit_detail_id:
                                      formProps.values.id,
                                      violationSide:
                                      formProps.values.violationSide,
                                      violationDesc: formProps.values.violationDesc,
                                      violationPercent: formProps.values.violationPercent,
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
                                <th>Unit No</th>
                                <th>Entry Unit from</th>
                                <th>W/C in unit</th>
                                <th>kitchen in</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                (console.log(
                                  "values",
                                  formProps?.values?.amalgamate
                                ),
                                console.log(
                                  "deleted",
                                  formProps.values.deleted_boundaries
                                ))
                              }
                              {formProps?.values?.amalgamate?.map(
                                (amalgamate, index) => {
                                  return (
                                    <tr key={index}>
                                      <td>
                                        <TextField
                                          fullWidth
                                          // disabled
                                          size="small"
                                          label="Unit No"
                                          variant="outlined"
                                          name={`amalgamate.${index}.unit_no`}
                                          value={amalgamate.unit_no}
                                          id="unit_no"
                                          onChange={formProps.handleChange}
                                        />
                                      </td>
                                      <td>
                                        <TextField
                                          fullWidth
                                          // disabled
                                          size="small"
                                          label="Entry from unit"
                                          variant="outlined"
                                          name={`amalgamate.${index}.entry_from_unit`}
                                          value={amalgamate.entry_from_unit}
                                          id="entry_from_unit"
                                          onChange={formProps.handleChange}
                                        />
                                      </td>
                                      <td>
                                        <TextField
                                          fullWidth
                                          // disabled
                                          size="small"
                                          label="W/C in unit"
                                          variant="outlined"
                                          name={`amalgamate.${index}.wc_unit`}
                                          value={amalgamate.wc_unit}
                                          id="wc_unit"
                                          onChange={formProps.handleChange}
                                        />
                                      </td>
                                      <td>
                                        <TextField
                                          fullWidth
                                          // disabled
                                          size="small"
                                          label="kitchen in"
                                          variant="outlined"
                                          name={`amalgamate.${index}.kitchen`}
                                          value={amalgamate.kitchen}
                                          id="kitchen"
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
                                            console.log("id", amalgamate.id);
                                            formProps.values.deleted_boundaries.push(
                                              amalgamate.id
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

                <Row className="form-group pb-4">
                  <Col>
                    <Button
                      color="success"
                      variant="contained"
                      disabled={formProps.isSubmitting}
                      fullWidth
                      onClick={()=>dispatch(ADD_ONE())}
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
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    propertyid: state.properties.propertyid,
    property: state.property,
    surroundings: state.surroundings,
    dropdowns: state.dropdowns
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editSurroundingsData: (data, setValue, value, token) =>
      dispatch(editSurroundingsData(data, setValue, value, token)),
      editUnitDetailData2: (data, setValue, value, token) =>
      dispatch(editUnitDetailData2(data, setValue, value, token)),
      editProgressData: (progressData, setValue, value,token) =>dispatch(editProgressData(progressData, setValue, value,token)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Surroundings);
