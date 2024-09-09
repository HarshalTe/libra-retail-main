import React from "react";
import { connect } from "react-redux";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Row,
  Col,
  Table,
} from "reactstrap";
import Button from "@mui/material/Button";
import TextField from "@material-ui/core/TextField";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import { MenuItem, Tooltip } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Checkbox from "@mui/material/Checkbox";

// import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import moment from "moment";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Divider, Typography } from "@mui/material";

//*Actions
import { editSaleRatesData } from "../../../../../Redux/Creators/SaleRateCreators";

//*Compoenets
import LinerLoader from "components/Loaders/LinerLoader";
import Box from "@mui/material/Box";
import LinearProgressWithLabel from "../ProjectDetails/LinearProgressWithLabel";
import ADD_ONE from "../../../../../Redux/Types/ActionTypes"
import { useDispatch } from "react-redux";

function SaleRateEnquiry(props) {
  const [progress, setProgress] = React.useState(0);
  const dispatch = useDispatch();

  console.log("props:", props);
  const token = props.login?.login?.token;
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);

    let data = {
      // token: token,
      id: values.id,
      property_id: values.property_id,
      construction: values.construction,
      site_engineer: values.site_engineer,
      broker: values.broker,
      rate_details: values.rate_details,

      //*
      delete_rate_details: values.delete_rate_details,
    };

    const value = 2;

    props.editSaleRatesData(data, props.setValue, value, token);
    setSubmitting(false);
  };
  const formPropsLength = 11;

  return (
    <>
      {props.saleRates.isLoading ? (
        <div>
          <LinerLoader />
        </div>
      ) : (
        <>
          <br />
          <Formik
            initialValues={{
              id: props?.property?.property?.sale_rate?.id,
              property_id: props?.property?.property?.id,
              construction: props?.property?.property?.sale_rate?.construction,
              site_engineer:
                props?.property?.property?.sale_rate?.site_engineer,
              broker: props?.property?.property?.sale_rate?.broker,
              rate_details: props?.property?.property?.sale_rate?.rate_details,

              project_name: "",
              project_type: "",
              configs: "",
              area: "",
              rent_per_month: "",
              value: "",
              yield: "",
              remark: "",

              //*
              delete_rate_details: [],
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
                <Typography variant={"h5"}>Sale Rate Enquiry</Typography>
                <Divider />
                <br />
                <Row className="form-group">
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      label="As per construction"
                      variant="standard"
                      id="construction"
                      name="construction"
                      value={formProps.values.construction}
                      onChange={formProps.handleChange}
                       onBlur={() => {
                        if (formProps.values.construction)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      label="As per site engineer"
                      variant="standard"
                      id="site_engineer"
                      name="site_engineer"
                      value={formProps.values.site_engineer}
                      onChange={formProps.handleChange}
                       onBlur={() => {
                        if (formProps.values.site_engineer)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      label="As per broker"
                      variant="standard"
                      id="broker"
                      name="broker"
                      value={formProps.values.broker}
                      onChange={formProps.handleChange}
                       onBlur={() => {
                        if (formProps.values.broker)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                </Row>

                <Row className="pb-2">
                  <Col md={12}>
                    <FieldArray
                      name="rate_details"
                      render={(arrayHelpers) => (
                        <div>
                          <Row>
                            <Col className="pr-1 pl-1">
                              <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="project_name"
                                name="project_name"
                                label="Project name"
                                value={formProps.values.project_name}
                                onChange={formProps.handleChange}
                                 onBlur={() => {
                        if (formProps.values.project_name)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                              />
                            </Col>
                            <Col className="pr-1 pl-1">
                              <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="project_type"
                                name="project_type"
                                label="Project type"
                                value={formProps.values.project_type}
                                onChange={formProps.handleChange}
                                 onBlur={() => {
                        if (formProps.values.project_type)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                              />
                            </Col>
                            <Col className="pr-1 pl-1">
                              <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="configs"
                                name="configs"
                                label="Configuration"
                                value={formProps.values.configs}
                                onChange={formProps.handleChange}
                                 onBlur={() => {
                        if (formProps.values.configs)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                              />
                            </Col>
                            <Col className="pr-1 pl-1">
                              <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="area"
                                name="area"
                                label="Area"
                                value={formProps.values.area}
                                onChange={formProps.handleChange}
                                 onBlur={() => {
                        if (formProps.values.area)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                              />
                            </Col>
                            <Col md={2} className="pr-1 pl-1">
                              <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="rent_per_month"
                                name="rent_per_month"
                                label="Rent per month"
                                value={formProps.values.rent_per_month}
                                onChange={formProps.handleChange}
                                 onBlur={() => {
                        if (formProps.values.rent_per_month)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                              />
                            </Col>

                            <Col className="pr-1 pl-1">
                              <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="value"
                                name="value"
                                label="Value"
                                value={formProps.values.value}
                                onChange={formProps.handleChange}
                                 onBlur={() => {
                        if (formProps.values.value)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                              />
                            </Col>

                            <Col className="pr-1 pl-1">
                              <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="yield"
                                name="yield"
                                label="Yield"
                                value={formProps.values.yield}
                                onChange={formProps.handleChange}
                                 onBlur={() => {
                        if (formProps.values.yield)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                              />
                            </Col>

                            <Col className="pr-1 pl-1">
                              <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="remark"
                                name="remark"
                                label="Remark"
                                value={formProps.values.remark}
                                onChange={formProps.handleChange}
                                 onBlur={() => {
                        if (formProps.values.remark)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                              />
                            </Col>

                            <Col className="pr-1 pl-1">
                              <Button
                                color="success"
                                variant="contained"
                                onClick={() => {
                                  arrayHelpers.push({
                                    sale_rate_id: formProps.values.id,
                                    project_name: formProps.values.project_name,
                                    project_type: formProps.values.project_type,
                                    configs: formProps.values.configs,
                                    area: formProps.values.area,
                                    rent_per_month:
                                      formProps.values.rent_per_month,
                                    value: formProps.values.value,
                                    yield: formProps.values.yield,
                                    remark: formProps.values.remark,
                                  });
                                  {
                                    formProps.setFieldValue("project_name", "");
                                    formProps.setFieldValue("project_type", "");
                                    formProps.setFieldValue("configs", "");
                                    formProps.setFieldValue("area", "");
                                    formProps.setFieldValue(
                                      "rent_per_month",
                                      ""
                                    );
                                    formProps.setFieldValue("value", "");
                                    formProps.setFieldValue("yield", "");
                                    formProps.setFieldValue("remark", "");
                                  }
                                }}
                                size="large"
                              >
                                <AddIcon fontSize="1.4rem" />
                              </Button>
                            </Col>
                          </Row>
                          <Table
                            size="sm"
                            className="mt-3 px-0"
                            bordered
                            style={{ textAlign: "center", padding: "0px" }}
                          >
                            <thead>
                              <tr>
                                <th>PROJECT NAME</th>
                                <th>TYPE OF PROJECT </th>
                                <th>CONFIGURATION </th>
                                <th>AREA</th>
                                <th>RENT PER MONTH</th>
                                <th>VALUE</th>
                                <th>YEILD</th>
                                <th>REMARKS</th>
                                <th>DELETE</th>
                              </tr>
                            </thead>

                            <tbody>
                              {console.log(
                                "values, delete",
                                formProps?.values?.rate_details,
                                formProps?.values?.delete_rate_details
                              )}
                              {formProps?.values?.rate_details?.map(
                                (rateDetail, index) => {
                                  return (
                                    <tr key={index}>
                                      <td>
                                        <TextField
                                          fullWidth
                                          disabled
                                          size="small"
                                          label="Project name"
                                          variant="outlined"
                                          name={`rateDetail.${index}.project_name`}
                                          value={rateDetail.project_name}
                                          id="project_name"
                                          // onChange={formProps.handleChange}
                      //                      onBlur={() => {
                      //   if (formProps.values.railway_station)
                      //     setProgress(progress + 100 / formPropsLength);
                      // }}
                                        />
                                      </td>

                                      <td>
                                        <TextField
                                          fullWidth
                                          disabled
                                          size="small"
                                          label="Project type"
                                          variant="outlined"
                                          name={`rateDetail.${index}.project_type`}
                                          value={rateDetail.project_type}
                                          id="project_type"
                                        />
                                      </td>
                                      <td>
                                        <TextField
                                          fullWidth
                                          disabled
                                          size="small"
                                          label="Configuration"
                                          variant="outlined"
                                          name={`rateDetail.${index}.configs`}
                                          value={rateDetail.configs}
                                          id="configs"
                                        />
                                      </td>
                                      <td>
                                        <TextField
                                          fullWidth
                                          disabled
                                          size="small"
                                          label="Area"
                                          variant="outlined"
                                          name={`rateDetail.${index}.area`}
                                          value={rateDetail.area}
                                          id="area"
                                        />
                                      </td>

                                      <td>
                                        <TextField
                                          fullWidth
                                          disabled
                                          size="small"
                                          label="Rent per month"
                                          variant="outlined"
                                          name={`rateDetail.${index}.rent_per_month`}
                                          value={rateDetail.rent_per_month}
                                          id="rent_per_month"
                                        />
                                      </td>

                                      <td>
                                        <TextField
                                          fullWidth
                                          disabled
                                          size="small"
                                          label="Value"
                                          variant="outlined"
                                          name={`rateDetail.${index}.value`}
                                          value={rateDetail.value}
                                          id="value"
                                        />
                                      </td>
                                      <td>
                                        <TextField
                                          fullWidth
                                          disabled
                                          size="small"
                                          label="Yield"
                                          variant="outlined"
                                          name={`rateDetail.${index}.yield`}
                                          value={rateDetail.yield}
                                          id="yield"
                                        />
                                      </td>

                                      <td>
                                        <TextField
                                          fullWidth
                                          disabled
                                          size="small"
                                          label="Remark"
                                          variant="outlined"
                                          name={`rateDetail.${index}.remark`}
                                          value={rateDetail.remark}
                                          id="remark"
                                        />
                                      </td>

                                      <td>
                                        <Button
                                          color="error"
                                          size="large"
                                          variant="outlined"
                                          onClick={() => {
                                            arrayHelpers.remove(index);
                                            if (rateDetail?.id !== undefined) {
                                              formProps?.values?.delete_rate_details.push(
                                                rateDetail?.id
                                              );
                                            } else {
                                              return;
                                            }
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
                  <Col>
                    <Button
                      color="success"
                      variant="contained"
                      disabled={formProps.isSubmitting}
                      fullWidth
                      type="submit"
                      onClick={()=>dispatch(ADD_ONE())}

                    >
                      Next
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    // propertyid: state.properties.propertyid,
    property: state.property,
    saleRates: state.saleRates,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editSaleRatesData: (data, setValue, value, token) =>
      dispatch(editSaleRatesData(data, setValue, value, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaleRateEnquiry);
