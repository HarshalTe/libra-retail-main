import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Row,
  Col,
  Table,
} from "reactstrap";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@material-ui/core/TextField";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import { MenuItem, Tooltip } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";

// import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import moment from "moment";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Autocomplete, Divider, Typography } from "@mui/material";

//*Actions
import { editProjectsData } from "../../../../../Redux/Creators/ProjectsCreators";

//*Compoenets
import LinerLoader from "components/Loaders/LinerLoader";
import DocLinearProgress from "./DocLinearProgress";
import ADD_ONE from "../../../../../Redux/Types/ActionTypes"
import { useDispatch } from "react-redux";
import { editProgressData } from "../../../../../Redux/Creators/ProgressCreators";


function DocumentsProjectDetails(props) {
  const [progress, setProgress] = React.useState(0);
  const token = props.login?.login?.token;
  const dispatch = useDispatch();


  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);
    const token ={
      token:props.login?.login?.token,
      property_id: values.property_id,    
    }
    
    const value = 2;
    let progressData = {
      id: props?.property?.property?.id,
      documentsProgress: 1,
      
    }

    props.editProgressData(progressData, props.setValue, value,props.login?.login?.token);
    handleSubmit2(values, { setSubmitting })
  };

  const handleSubmit2 = (values, { setSubmitting }) => {
    console.log("Values:", values);
    const token ={
      token:props.login?.login?.token,
      property_id: props?.property?.property?.id,    
    }
    let data = {
      id: props?.property?.property?.project?.id,
      approving_authority: JSON.stringify(values.approving_authority),
      corp_limit: values.corp_limit,
      municipal_limit: values.municipal_limit,
      commercial_property: values.commercial_property,
      building_age: values.building_age,
      residual_age: values.residual_age,
      gf: values.gf,
      
      //*
      project_details: JSON.stringify(values.project_details),
      //*
    };
    
    const value = 2;
    
    props.editProjectsData(data, props.setValue, value,token);
    setSubmitting(true);
  };
  const formPropsLength = 13;
  return (
    <>
      {props.projects.isLoading ? (
        <div>
          <LinerLoader />
        </div>
      ) : (
        <div>
          <br />
          <Formik
            initialValues={{
              // property_id: props?.property?.property?.id,
              //*Documents
              // id: props?.property?.property?.project?.id,
              approving_authority:
                props?.property?.property?.project?.approving_authority || [],
              corp_limit: props?.property?.property?.project?.corp_limit,
              municipal_limit:
                props?.property?.property?.project?.municipal_limit,
                commercial_property:
                props?.property?.property?.project?.commercial_property,
                building_age: props?.property?.property?.project?.building_age,
                residual_age: props?.property?.property?.project?.residual_age,
                gf: props?.property?.property?.project?.gf,
                
                //*
                project_details:
                props?.property?.property?.project?.project_details,
                // doc_name: "",
                // date: moment().format("YYYY-MM-DD"),
                // ref_no: "",
                // floors_no: "",
                // remarks: "",
                //*
              }}
              onSubmit={handleSubmit}
              validationSchema={Yup.object().shape({
                //   name: Yup.string().required("Name is required"),
            })}
            >
            {(formProps) => (
              <Form>
                {console.log(formProps?.values,"formProps?.values")}
                <div className="pb-4">
                  <Box sx={{ width: "100%" }}>
                    <DocLinearProgress value={(Object?.values(formProps?.values)?.filter((val) => val !== null && val?.length > 0)?.length/Object?.keys(formProps?.values)?.length)*100} />
                  </Box>
                </div>
                <Typography variant={"h5"}>Project Documents</Typography>
                <Divider />
                <br />
                <Row className="form-group">
                <Col md={6} className="pb-4">
                     <FieldArray
                          name="approving_authority"
                          render={(arrayHelpers) => (
                            <div>
                              <Row>
                                <Col md={10}>
                                  <Autocomplete
                                    id="approving_authority_id"
                                    options={props?.dropdowns?.dropdowns
                                      ?.filter((field) => field?.name == "approving_authority")[0]
                                      ?.drop_down_details}
                                    getOptionLabel={(field) =>
                                      field?.name
                                    }
                                    onChange={(e, value) => {
                                      console.log("approving_authority",value)
                                      formProps.setFieldValue(
                                        "approving_authority_id",
                                        value?.name || ""
                                      );
                                    }}
                                    onOpen={formProps.handleBlur}
                                    includeInputInList
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        error={Boolean(
                                          formProps.touched.approving_authority_id &&
                                            formProps.errors.approving_authority_id
                                        )}
                                        fullWidth
                                        helperText={
                                          formProps.touched.approving_authority_id &&
                                          formProps.errors.approving_authority_id
                                        }
                                        label="Approving Authority"
                                        name="approving_authority_id"
                                        variant="outlined"
                                      />
                                    )}
                                  />
                                </Col>

                                <Col md={2}>
                                  <Button
                                    color="success"
                                    variant="contained"
                                    onClick={() => {
                                      arrayHelpers.push(
                                        formProps.values.approving_authority_id,
                                      );
                                    }}
                                    size="large"
                                  >
                                    <AddIcon fontSize="medium" />
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
                                    <th>Approving Authority</th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {formProps?.values?.approving_authority?.map(
                                    (bank, index) => {
                                      return (
                                        <tr key={index}>
                                          <td>{index + 1}</td>

                                          <td>
                                            <TextField
                                              fullWidth
                                              disabled
                                              size="small"
                                              label="Approving Authority"
                                              variant="outlined"
                                              name={`bank`}
                                              value={bank}
                                              id="approving_authority"
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
                                              <DeleteIcon fontSize="medium" />
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
                  <Col md={2} className="pb-4">
                  
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="corp_limit"
                      name="corp_limit"
                      label="Corporation limit"
                      variant="standard"
                      value={formProps.values.corp_limit}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.corp_limit)
                        setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="municipal_limit"
                      name="municipal_limit"
                      label="Municipal limit"
                      variant="standard"
                      value={formProps.values.municipal_limit}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.municipal_limit)
                        setProgress(progress + 100 / formPropsLength);
                      }}
                      />
                  </Col>

                  {/* <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="tpvd"
                      name="tpvd"
                      label="TPVD"
                      variant="standard"
                      value={formProps.values.tpvd}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.tpvd)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                      />
                  </Col> */}

                  <Col md={4}>
                    <TextField
                      fullWidth
                      id="commercial_property"
                      name="commercial_property"
                      label="Commercial property"
                      variant="standard"
                      value={formProps.values.commercial_property}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.commercial_property)
                        setProgress(progress + 100 / formPropsLength);
                      }}
                      />
                  </Col>

                  <Col md={4}>
                    <TextField
                      fullWidth
                      id="building_age"
                      name="building_age"
                      label="Age of building"
                      variant="standard"
                      value={formProps.values.building_age}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.building_age)
                        setProgress(progress + 100 / formPropsLength);
                      }}
                      />
                  </Col>
                  <Col md={4}>
                    <TextField
                      fullWidth
                      id="residual_age"
                      name="residual_age"
                      label="Residual age of property"
                      variant="standard"
                      value={formProps.values.residual_age}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.residual_age)
                        setProgress(progress + 100 / formPropsLength);
                      }}
                      />
                  </Col>

                  <Col md={4}>
                    <TextField
                      fullWidth
                      id="gf"
                      name="gf"
                      label="GF"
                      variant="standard"
                      value={formProps.values.gf}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.gf)
                        setProgress(progress + 100 / formPropsLength);
                      }}
                      />
                  </Col>
                </Row>

                <Divider />
                <br />

                <Row className="pb-2">
                  <Col md={12}>
                    <FieldArray
                      name="project_details"
                      render={(arrayHelpers) => (
                        <div>
                          <Row>
                            <Col md={2}>
                              <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="doc_name"
                                name="doc_name"
                                label="Document name"
                                value={formProps.values.doc_name}
                                onChange={formProps.handleChange}
                              />
                            </Col>
                            <Col md={2}>
                              <TextField
                                fullWidth
                                type="date"
                                size="small"
                                variant="outlined"
                                id="date"
                                name="date"
                                label="Date"
                                value={formProps.values.date}
                                onChange={formProps.handleChange}
                                onBlur={() => {
                                  if (formProps.values.date)
                                    setProgress(
                                      progress + 100 / formPropsLength
                                    );
                                }}
                                />
                            </Col>
                            <Col md={2}>
                              <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="ref_no"
                                name="ref_no"
                                label="Reference number"
                                value={formProps.values.ref_no}
                                onChange={formProps.handleChange}
                                onBlur={() => {
                                  if (formProps.values.ref_no)
                                  setProgress(
                                    progress + 100 / formPropsLength
                                    );
                                  }}
                                  />
                            </Col>
                            <Col md={2}>
                              <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="floors_no"
                                name="floors_no"
                                label="Outward No."
                                value={formProps.values.floors_no}
                                onChange={formProps.handleChange}
                                onBlur={() => {
                                  if (formProps.values.floors_no)
                                    setProgress(
                                      progress + 100 / formPropsLength
                                    );
                                }}
                              />
                            </Col>
                            <Col md={2}>
                              <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="remarks"
                                name="remarks"
                                label="Remarks"
                                value={formProps.values.remarks}
                                onChange={formProps.handleChange}
                                onBlur={() => {
                                  if (formProps.values.remarks)
                                    setProgress(
                                      progress + 100 / formPropsLength
                                    );
                                }}
                              />
                            </Col>

                            <Col>
                              <Button
                                color="success"
                                variant="contained"
                                onClick={() => {
                                  arrayHelpers.push({
                                    doc_name: formProps.values.doc_name,
                                    date: formProps.values.date,
                                    ref_no: formProps.values.ref_no,
                                    floors_no: formProps.values.floors_no,
                                    remarks: formProps.values.remarks,
                                  });
                                  {
                                    formProps.setFieldValue("doc_name", "");
                                    formProps.setFieldValue("date", "");
                                    formProps.setFieldValue("ref_no", "");
                                    formProps.setFieldValue("floors_no", "");
                                    formProps.setFieldValue("remarks", "");
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
                                <th>Document name</th>
                                <th>Date</th>
                                <th>Reference number</th>
                                <th>Outward No.</th>
                                <th>Remarks</th>
                                <th>Delete</th>
                              </tr>
                            </thead>

                            <tbody>
                              {console.log(
                                "values",
                                formProps?.values?.project_details
                              )}
                              {formProps?.values?.project_details?.map(
                                (project_details, index) => {
                                  return (
                                    <tr key={index}>
                                      <td>{index + 1}</td>

                                      <td>
                                        <TextField
                                          fullWidth
                                          
                                          size="small"
                                          label="Document name"
                                          variant="outlined"
                                          name={`project_details.${index}.doc_name`}
                                          value={project_details.doc_name}
                                          id="doc_name"
                                          onChange={formProps.handleChange}
                                          />
                                      </td>

                                      <td>
                                        <TextField
                                          fullWidth
                                          
                                          type="date"
                                          size="small"
                                          label="Date"
                                          variant="outlined"
                                          name={`project_details.${index}.date`}
                                          value={project_details.date}
                                          id="date"
                                          onChange={formProps.handleChange}
                                        />
                                      </td>
                                      <td>
                                        <TextField
                                          fullWidth
                                          
                                          size="small"
                                          label="Reference number"
                                          variant="outlined"
                                          name={`project_details.${index}.ref_no`}
                                          value={project_details.ref_no}
                                          id="ref_no"
                                          onChange={formProps.handleChange}
                                        />
                                      </td>
                                      <td>
                                        <TextField
                                          fullWidth
                                          
                                          size="small"
                                          label="Outward No."
                                          variant="outlined"
                                          name={`project_details.${index}.floors_no`}
                                          value={project_details.floors_no}
                                          id="floors_no"
                                          onChange={formProps.handleChange}
                                          />
                                      </td>

                                      <td>
                                        <TextField
                                          fullWidth
                                          
                                          size="small"
                                          label="Remarks"
                                          variant="outlined"
                                          name={`project_details.${index}.remarks`}
                                          value={project_details.remarks}
                                          id="remarks"
                                          onChange={formProps.handleChange}
                                          />
                                      </td>

                                      <td>
                                        <Button
                                          color="error"
                                          size="large"
                                          variant="outlined"
                                          onClick={() =>
                                            arrayHelpers.remove(index)
                                          }
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
                <Row className="form-group">
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
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    property: state.property,
    projects: state.projects,
    dropdowns: state.dropdowns,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editProjectsData: (data, setValue, value,token) =>
      dispatch(editProjectsData(data, setValue, value,token)),
      editProgressData: (progressData, setValue, value,token) =>dispatch(editProgressData(progressData, setValue, value,token)),

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentsProjectDetails);
