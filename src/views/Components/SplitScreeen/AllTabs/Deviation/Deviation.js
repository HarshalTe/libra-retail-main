import React from "react";
import { connect } from "react-redux";
import { Row, Col, Table, Label } from "reactstrap";
import Button from "@mui/material/Button";
import TextField from "@material-ui/core/TextField";
import { MenuItem } from "@material-ui/core";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { Divider, Typography } from "@mui/material";

//*compo
import ViewHorizontal from "./ViewHorizontal";
import ViewVertical from "./ViewVertical";

//*Actions
import { editDeviationData } from "../../../../../Redux/Creators/DeviationCreators";

//*Compoenets
import LinerLoader from "components/Loaders/LinerLoader";
import Box from "@mui/material/Box";
import LinearProgressWithLabel from "../ProjectDetails/LinearProgressWithLabel";
import ADD_ONE from "../../../../../Redux/Types/ActionTypes";
import { useDispatch } from "react-redux";
import { editProgressData } from "../../../../../Redux/Creators/ProgressCreators";

function Deviation(props) {
  const [progress, setProgress] = React.useState(0);
  const dispatch = useDispatch();

  const token = props.login?.login?.token;
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values In Upload file:", values,values.horizontal_violation,JSON.stringify(values.horizontal_violation));

    //? FormData Chahiye File Upload hai
    const data = new FormData();

    data.append("id", values.id);
    data.append("property_id", values.property_id);
    data.append("property_vertical", values.property_vertical);
    data.append("property_horizontal", values.property_horizontal);
    data.append("horizontal_violation", JSON.stringify(values.horizontal_violation));
    data.append("vertical_violation", JSON.stringify(values.vertical_violation));
    data.append("approved_floors", JSON.stringify(values.approved_floors));

    const value = 2;

    let progressData = {
      id: props?.property?.property?.id,
      deviationProgress: 1,
    };

    props.editProgressData(
      progressData,
      props.setValue,
      value,
      props.login?.login?.token
    );

    props.editDeviationData(data, props.setValue, value, token);
    setSubmitting(false);
  };
  const formPropsLength = 4;

  return (
    <>
      {props.deviation.isLoading ? (
        <div>
          <LinerLoader />
        </div>
      ) : (
        <div>
          <br />
          <Formik
            initialValues={{
              id: props?.property?.property?.deviation?.id,
              property_id: props?.property?.property?.id,
              property_vertical:
                props?.property?.property?.deviation?.property_vertical,
              property_horizontal:
                props?.property?.property?.deviation?.property_horizontal,

              //*
              approved_floors:
                props?.property?.property?.deviation?.approved_floors == "null"
                  ? []
                  : props?.property?.property?.deviation?.approved_floors,
              floor: "",
              approved: "",
              horizontal_violation:
                props?.property?.property?.deviation?.horizontal_violation ||
                [],
              vertical_violation:
                props?.property?.property?.deviation?.vertical_violation || [],
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              // branch_name: Yup.string().required("Branch Name is required"),
            })}
          >
            {(formProps) => (
              <Form enctype="multipart/form-data">
                <div className="pb-4">
                  <Box sx={{ width: "90%" }}>
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
                <Typography variant={"h5"}>Deviation</Typography>
                <Divider />
                <br />
                <Typography variant={"h6"}>Property Deviation</Typography>
                <br />
                <Row className="form-group">
                  <Col md={12}>
                    <FieldArray
                      name="horizontal_violation"
                      render={() => (
                        <div>
                          <Row className="mb-2">
                            <Col md={2}>
                              <Label>Direction of Violation</Label>
                            </Col>
                            <Col md={5}>
                              <Label>Description of Violation</Label>
                            </Col>
                            <Col md={5}>
                              <Label>Violation Percent</Label>
                            </Col>
                          </Row>
                          {["north", "south", "west", "east"].map(
                            (direction, index) => (
                              <Row key={index} className="mb-2">
                                <Col md={2}>
                                  <Label>
                                    {direction.charAt(0).toUpperCase() +
                                      direction.slice(1)}
                                  </Label>
                                </Col>
                                <Col md={5}>
                                  <TextField
                                    fullWidth
                                    size="small"
                                    label="Description of Violation"
                                    variant="outlined"
                                    name={`horizontal_violation.${index}.description_of_violation`}
                                    value={
                                      formProps.values.horizontal_violation[
                                        index
                                      ]?.description_of_violation || ""
                                    }
                                    onChange={formProps.handleChange}
                                  />
                                </Col>
                                <Col md={5}>
                                  <TextField
                                    fullWidth
                                    size="small"
                                    label="Violation Percent"
                                    variant="outlined"
                                    name={`horizontal_violation.${index}.violation_percent`}
                                    value={
                                      formProps.values.horizontal_violation[
                                        index
                                      ]?.violation_percent || ""
                                    }
                                    onChange={formProps.handleChange}
                                  />
                                </Col>
                              </Row>
                            )
                          )}
                        </div>
                      )}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      type="file"
                      focused
                      size="small"
                      variant="outlined"
                      id="property_horizontal"
                      name="property_horizontal"
                      label="Horizontal"
                      onChange={(event) => {
                        formProps.setFieldValue(
                          "property_horizontal",
                          event.currentTarget.files[0]
                        );
                        console.log(
                          "property_horizontal",
                          formProps.values.property_horizontal
                        );
                      }}
                      onBlur={() => {
                        if (formProps.values.property_horizontal)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  <Col md={6} className="pb-4">
                    <ViewHorizontal
                      horizontal={formProps.values.property_horizontal}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <FieldArray
                      name="vertical_violation"
                      render={() => (
                        <div>
                          <Row className="mb-2">
                            <Col md={2}>
                              <Label>Direction of Violation</Label>
                            </Col>
                            <Col md={5}>
                              <Label>Description of Violation</Label>
                            </Col>
                            <Col md={5}>
                              <Label>Violation Percent</Label>
                            </Col>
                          </Row>
                          {["Upward", "Downward"].map((direction, index) => (
                            <Row key={index} className="mb-3">
                              <Col md={2}>
                                <Label>
                                  {direction.charAt(0).toUpperCase() +
                                    direction.slice(1)}
                                </Label>
                              </Col>
                              <Col md={5}>
                                <TextField
                                  fullWidth
                                  size="small"
                                  label="Description of Violation"
                                  variant="outlined"
                                  name={`vertical_violation.${index}.description_of_violation`}
                                  value={
                                    formProps.values.vertical_violation[index]
                                      ?.description_of_violation || ""
                                  }
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                              <Col md={5}>
                                <TextField
                                  fullWidth
                                  size="small"
                                  label="Violation Percent"
                                  variant="outlined"
                                  name={`vertical_violation.${index}.violation_percent`}
                                  value={
                                    formProps.values.vertical_violation[index]
                                      ?.violation_percent || ""
                                  }
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                            </Row>
                          ))}
                        </div>
                      )}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      type="file"
                      focused
                      size="small"
                      variant="outlined"
                      id="property_vertical"
                      name="property_vertical"
                      label="Vertical"
                      onChange={(event) => {
                        formProps.setFieldValue(
                          "property_vertical",
                          event.currentTarget.files[0]
                        );
                        console.log(
                          "property_vertical",
                          formProps.values.property_vertical
                        );
                      }}
                      onBlur={() => {
                        if (formProps.values.property_vertical)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  <Col md={6} className="pb-4">
                    <ViewVertical
                      vertical={formProps.values.property_vertical}
                    />
                  </Col>
                </Row>

                <Divider />
                <br />

                <Typography variant={"h5"}>Floor Deviation</Typography>
                <Divider />
                <br />

                <Col md={12}>
                  <FieldArray
                    name="approved_floors"
                    render={(arrayHelpers) => (
                      <div>
                        <Row>
                          <Col md={5}>
                            <TextField
                              fullWidth
                              size="small"
                              variant="outlined"
                              id="floor"
                              name="floor"
                              label="Floor"
                              value={formProps.values.floor}
                              onChange={formProps.handleChange}
                              onBlur={() => {
                                if (formProps.values.floor)
                                  setProgress(progress + 100 / formPropsLength);
                              }}
                            />
                          </Col>

                          <Col md={5}>
                            <TextField
                              fullWidth
                              select
                              size="small"
                              variant="outlined"
                              id="approved"
                              name="approved"
                              label="Approved"
                              value={formProps.values.approved}
                              onChange={formProps.handleChange}
                              onBlur={() => {
                                if (formProps.values.approved)
                                  setProgress(progress + 100 / formPropsLength);
                              }}
                            >
                              <MenuItem value="">Select</MenuItem>
                              <MenuItem value="Yes">Yes</MenuItem>
                              <MenuItem value="No">No</MenuItem>
                            </TextField>
                          </Col>

                          <Col md={2}>
                            <Button
                              color="success"
                              variant="outlined"
                              onClick={() => {
                                arrayHelpers.push({
                                  deviation_id: formProps.values.id,
                                  property_id: formProps.values.property_id,
                                  floor: formProps.values.floor,
                                  approved: formProps.values.approved,
                                });
                                {
                                  formProps.setFieldValue("floor", "");
                                  formProps.setFieldValue("approved", "");
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
                              <th>Floor</th>
                              <th>Approved</th>
                            </tr>
                          </thead>
                          <tbody>
                            {console.log(
                              "values",
                              formProps?.values?.approved_floors
                            )}
                            {formProps?.values?.approved_floors?.map(
                              (approvedFloors, index) => {
                                return (
                                  <tr key={index}>
                                    <td>
                                      <TextField
                                        fullWidth
                                        disabled
                                        size="small"
                                        label="Floor"
                                        variant="outlined"
                                        name={`approvedFloors.${index}.floor`}
                                        value={approvedFloors.floor}
                                        id="floor"
                                        // onChange={formProps.handleChange}
                                      />
                                    </td>
                                    <td>
                                      <TextField
                                        fullWidth
                                        disabled
                                        size="small"
                                        label="Approved"
                                        variant="outlined"
                                        name={`approvedFloors.${index}.approved`}
                                        value={approvedFloors.approved}
                                        id="approved"
                                        // onChange={formProps.handleChange}
                                      />
                                    </td>

                                    <td>
                                      <Button
                                        color="error"
                                        size="large"
                                        variant="outlined"
                                        onClick={() => {
                                          arrayHelpers.remove(index);
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

                <Divider />
                <br />

                <Row className="form-group pb-4">
                  <Col>
                    <Button
                      color="success"
                      variant="contained"
                      disabled={formProps.isSubmitting}
                      fullWidth
                      onClick={() => dispatch(ADD_ONE())}
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
    // propertyid: state.properties.propertyid,
    property: state.property,
    deviation: state.deviation,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editDeviationData: (data, setValue, value, token) =>
      dispatch(editDeviationData(data, setValue, value, token)),
    editProgressData: (progressData, setValue, value, token) =>
      dispatch(editProgressData(progressData, setValue, value, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Deviation);
