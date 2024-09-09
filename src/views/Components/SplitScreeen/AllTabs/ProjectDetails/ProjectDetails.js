import React from "react";
import { connect } from "react-redux";
import { Row, Col, Table } from "reactstrap";
import Button from "@mui/material/Button";
import TextField from "@material-ui/core/TextField";
import { MenuItem, OutlinedInput, Select } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Autocomplete from "@mui/material/Autocomplete";

import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import {
  Checkbox,
  Divider,
  FormControl,
  InputLabel,
  ListItemText,
  Typography,
} from "@mui/material";

//*Actions
import { editProjectsData } from "../../../../../Redux/Creators/ProjectsCreators";

//*Compoenets
import LinerLoader from "components/Loaders/LinerLoader";
import Box from "@mui/material/Box";
import LinearProgressWithLabel from "./LinearProgressWithLabel";
import { useDispatch } from "react-redux";
import ADD_ONE from "../../../../../Redux/Types/ActionTypes";
import { editProgressData } from "../../../../../Redux/Creators/ProgressCreators";
import Swal from "sweetalert2";
import { getProjects } from "../../../../../Redux/Creators/ProjectsCreators";

function ProjectDetails(props) {
  console.log("propssss", props);
  const dispatch = useDispatch();
  const [progress, setProgress] = React.useState(0);
  const [id, setId] = React.useState();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10000);

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

  const [personName, setPersonName] = React.useState(
    props?.property?.property?.project?.project_amenities || []
  );

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);

    const token = {
      token: props.login?.login?.token,
      property_id: props?.property?.property?.id,
    };

    let data = {
      // property_id: props?.property?.property?.id,
      id: props?.property?.property?.project?.id,
      project_name: values.project_name,
      boundaries: values.boundaries,
      per_site: values.per_site,
      address: values.address,
      legal_address: values.legal_address,

      //*rera
      rera_no: values.rera_no,
      commencement_date: values.commencement_date,
      end_date: values.end_date,
      revised_end_date: values.revised_end_date,
      building_type: values.building_type,
      project_amenities: JSON.stringify(personName),
      surrounding: values.surrounding,
      localities: values.localities,
      neighbourhood: values.neighbourhood,
      road_access: values.road_access,
      main_road_width: values.main_road_width,
      road_type: values.road_type,
      approach_road: values.approach_road,
      structure_type: values.structure_type,
      negative_info_project: values.negative_info_project,
      negative_info_locality: values.negative_info_locality,
      pb_north: values.pb_north,
      pb_south: values.pb_south,
      pb_east: values.pb_east,
      pb_west: values.pb_west,
      negative_prop_interval: values.negative_prop_interval,
      is_project_compound_wall: values.is_project_compound_wall,
      is_project_access: values.is_project_access,
      is_project_access_remark: values.is_project_access_remark,
      basic_infrastructure: values.basic_infrastructure,
      is_demolition_risk: values.is_demolition_risk,
      is_demolition_risk_type: values.is_demolition_risk_type,
      demolition_risk: values.demolition_risk,
      building_occupancy: values.building_occupancy,
      redevolepment_notice: values.redevolepment_notice,
      redevolepment_notice_remark: values.redevolepment_notice_remark,
      rera_project_name: values.rera_project_name,
      wall_width: values.wall_width,
      wall_height: values.wall_height,
      at_site: JSON.stringify(values.at_site),
    };

    const value = 1;

    props.editProjectsData(data, props.setValue, value, token);
    setSubmitting(true);
    progressSubmit();
  };

  React.useEffect(() => {
    fetchData(page, rowsPerPage);
  }, []);

  const fetchData = (page, rowsPerPage) => {
    const token = props.login?.login?.token;

    console.log("page", page);
    let pageno = page + 1;
    console.log("pageno", pageno);
    let data = {
      pageno: pageno,
      pageSize: rowsPerPage,
      token: token,
    };
    props.getProjects(data);
  };

  const value = props.property?.property?.project?.project_name;
  console.log(value, "sss", props, props.property?.property?.project?.pb_east);

  const progressSubmit = (values, { setSubmitting }) => {
    const value = 1;
    let progressData = {
      id: props?.property?.property?.id,
      projectProgress: 1,
    };

    props.editProgressData(
      progressData,
      props.setValue,
      value,
      props.login?.login?.token
    );
    handleSubmit(values, { setSubmitting });
  };

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const projrctSubmit = () => {
    const value = 1;
    swalWithBootstrapButtons
      .fire({
        title: "Do you want to submit the project?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, submit!",
        cancelButtonText: "No, cancel!",
        reverseButtons: false,
      })
      .then((result) => {
        if (result.isConfirmed) {
          let progressData = {
            id: props?.property?.property?.id,
            project_id: id,
          };
          props.editProgressData(
            progressData,
            props.setValue,
            value,
            props.login?.login?.token
          );
        }
      });
  };

  return (
    <>
      {props.property.isLoading ? (
        <div>
          <LinerLoader />
        </div>
      ) : (
        <div>
          <br />
          <Formik
            initialValues={{
              // property_id: props?.property?.property?.id,
              project_id: props?.property?.property?.project?.id,
              project_name:
                props.property?.property?.project?.project_name == undefined
                  ? "N/A"
                  : props.property?.property?.project?.project_name,
              // props?.property?.property?.project?.project_name ?? "",
              boundaries: props?.property?.property?.project?.boundaries, //add karwa
              per_site: props?.property?.property?.project?.per_site,
              address: props?.property?.property?.project?.address,
              legal_address: props?.property?.property?.project?.legal_address, //add karwa

              //*rera
              rera_no: props?.property?.property?.project?.rera_no,
              commencement_date:
                props?.property?.property?.project?.commencement_date,
              end_date: props?.property?.property?.project?.end_date,
              revised_end_date:
                props?.property?.property?.project?.revised_end_date,
              building_type: props?.property?.property?.project?.building_type, //add karwa
              amenities: props?.property?.property?.project?.amenities,
              surrounding: props?.property?.property?.project?.surrounding,
              localities: props?.property?.property?.project?.localities,
              neighbourhood: props?.property?.property?.project?.neighbourhood, //add karwa
              road_access: props?.property?.property?.project?.road_access,
              main_road_width:
                props?.property?.property?.project?.main_road_width,
              road_type: props?.property?.property?.project?.road_type,
              approach_road: props?.property?.property?.project?.approach_road,
              structure_type:
                props?.property?.property?.project?.structure_type,
              negative_info_project:
                props?.property?.property?.project?.negative_info_project,
              negative_info_locality:
                props?.property?.property?.project?.negative_info_locality,
              pb_north:
                props?.property?.property?.project?.at_site != null
                  ? props?.property?.property?.project?.at_site[0]?.north_site
                  : "",
              pb_south:
                props?.property?.property?.project?.at_site != null
                  ? props?.property?.property?.project?.at_site[0]?.south_site
                  : "",
              pb_east:
                props?.property?.property?.project?.at_site != null
                  ? props?.property?.property?.project?.at_site[0]?.east_site
                  : "",
              pb_west:
                props?.property?.property?.project?.at_site != null
                  ? props?.property?.property?.project?.at_site[0]?.west_site
                  : "",
              at_site: props?.property?.property?.project?.at_site || [],
              negative_prop_interval:
                props?.property?.property?.project?.negative_prop_interval,
              is_project_compound_wall:
                props?.property?.property?.project?.is_project_compound_wall,
              is_project_access:
                props?.property?.property?.project?.is_project_access,
              is_project_access_remark:
                props?.property?.property?.project?.is_project_access_remark,
              basic_infrastructure:
                props?.property?.property?.project?.basic_infrastructure,
              is_demolition_risk:
                props?.property?.property?.project?.is_demolition_risk,
              demolition_risk:
                props?.property?.property?.project?.demolition_risk,
              is_demolition_risk_type:
                props?.property?.property?.project?.is_demolition_risk_type,
              building_occupancy:
                props?.property?.property?.project?.building_occupancy,
              redevolepment_notice:
                props?.property?.property?.project?.redevolepment_notice,
              redevolepment_notice_remark:
                props?.property?.property?.project?.redevolepment_notice_remark,
              rera_project_name:
                props?.property?.property?.project?.rera_project_name,
              wall_width: props?.property?.property?.project?.wall_width,
              wall_height: props?.property?.property?.project?.wall_height,
            }}
            onSubmit={progressSubmit}
            validationSchema={Yup.object().shape({
              // project_name: Yup.string().required("Project Name is required"),
              // address: Yup.string().required("Project Address is required"),
              // rera_no: Yup.string().required("Rera No. is required"),
              // commencement_date: Yup.string().required(
              //   "Commencement Date is required"
              // ),
              // end_date: Yup.string().required("End Date required"),
              // revised_end_date: Yup.string().required(
              //   "Revised End Date is required"
              // ),
              // amenities: Yup.string().required("Project Amenities is required"),
              // localities: Yup.string().required(
              //   "Project Localities is required"
              // ),
              // surrounding: Yup.string().required(
              //   "Project Surrounding is required"
              // ),
            })}
          >
            {(formProps) => {
              setId(formProps.values.project_id);
              const projectsProps = {
                options: props?.projects?.isLoading
                  ? []
                  : props?.projects?.projects?.data?.map((project) => project),
              };

              // const formProps = 21;
              const formPropsLength = Object.keys(formProps.values).length - 2;
              console.log("formProps.values.length");

              return (
                <Form>
                  <div className="pb-4">
                    <Box sx={{ width: "100%" }}>
                      {/* <LinearProgressWithLabel value={(Object.values(formProps.values).filter((val) => val !== null && val.length > 0).length/Object.keys(formProps.values).length)*100} /> */}
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
                  <Typography variant={"h5"}>Project Select</Typography>
                  <Divider />
                  <br />
                  <Row>
                    <Col md={10} className="pb-4">
                      <>
                        <Autocomplete
                          id="contact-autocomplete"
                          options={projectsProps.options}
                          getOptionLabel={(project) =>
                            // `${project?.project_name} ${project?.id}`
                            `${project?.project_name} ( ${project?.cts_no}, ${project?.fp_no},${project?.pincode} )`
                          }
                          onChange={(e, value) =>
                            formProps.setFieldValue(
                              "project_id",
                              value?.id || ""
                            )
                          }
                          onOpen={formProps.handleBlur}
                          includeInputInList
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              error={Boolean(
                                formProps.touched.project_id &&
                                  formProps.errors.project_id
                              )}
                              fullWidth
                              helperText={
                                formProps.touched.project_id &&
                                formProps.errors.project_id
                              }
                              label="Project"
                              name="project_id"
                              variant="outlined"
                            />
                          )}
                        />
                      </>
                    </Col>
                    <Col md={2} className="pb-4">
                      {/* <Label>Change Project</Label> */}
                      <Button
                        color="success"
                        variant="contained"
                        // disabled={formProps.isSubmitting}
                        fullWidth
                        // type="submit"
                        onClick={projrctSubmit}
                      >
                        Submit
                      </Button>
                    </Col>
                  </Row>
                  <br />
                  {console.log("formProps.values", formProps.values)}
                  <Typography variant={"h5"}>Project</Typography>
                  <Divider />
                  <br />
                  <Row className="form-group">
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="project_name"
                        name="project_name"
                        label="Project name &#x1F4F1;"
                        // InputProps={{ style: { fontSize: 25 } }}
                        // InputLabelProps={{ style: { fontSize: 22 } }}
                        variant="standard"
                        value={formProps.values.project_name}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.project_name)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                        error={
                          formProps.touched.project_name &&
                          Boolean(formProps.errors.project_name)
                        }
                        helperText={
                          formProps.touched.project_name &&
                          formProps.errors.project_name
                        }
                      />
                    </Col>

                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="boundaries"
                        name="boundaries"
                        label="Project Boundries &#x1F4F1;"
                        // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                        variant="standard"
                        value={formProps.values.boundaries}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.boundaries)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                        error={
                          formProps.touched.boundaries &&
                          Boolean(formProps.errors.boundaries)
                        }
                        helperText={
                          formProps.touched.boundaries &&
                          formProps.errors.boundaries
                        }
                      />
                    </Col>

                    <Col md={4}>
                      <TextField
                        fullWidth
                        id="per_site"
                        name="per_site"
                        label="As per site"
                        variant="standard"
                        value={formProps.values.per_site}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.per_site)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                        error={
                          formProps.touched.per_site &&
                          Boolean(formProps.errors.per_site)
                        }
                        helperText={
                          formProps.touched.per_site &&
                          formProps.errors.per_site
                        }
                      />
                    </Col>
                    <Col md={12} className="pb-4">
                      <TextField
                        fullWidth
                        id="address"
                        name="address"
                        label="Project Address"
                        variant="standard"
                        value={formProps.values.address}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.address)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                        error={
                          formProps.touched.address &&
                          Boolean(formProps.errors.address)
                        }
                        helperText={
                          formProps.touched.address && formProps.errors.address
                        }
                      />
                    </Col>
                    <Col md={12} className="pb-4">
                      <TextField
                        fullWidth
                        id="legal_address"
                        name="legal_address"
                        label="Legal Address"
                        variant="standard"
                        value={formProps.values.legal_address}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.legal_address)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                        error={
                          formProps.touched.legal_address &&
                          Boolean(formProps.errors.legal_address)
                        }
                        helperText={
                          formProps.touched.legal_address &&
                          formProps.errors.legal_address
                        }
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        select
                        id="is_project_compound_wall"
                        name="is_project_compound_wall"
                        label="project compound wall &#x1F4F1;"
                        // InputLabelProps={{ style: { fontSize: 22 } }}
                        variant="standard"
                        value={formProps.values.is_project_compound_wall}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.is_project_compound_wall)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                        error={
                          formProps.touched.is_project_compound_wall &&
                          Boolean(formProps.errors.is_project_compound_wall)
                        }
                        helperText={
                          formProps.touched.is_project_compound_wall &&
                          formProps.errors.is_project_compound_wall
                        }
                      >
                        <MenuItem value="">Select</MenuItem>
                        <MenuItem value="1">Yes</MenuItem>
                        <MenuItem value="0">No</MenuItem>
                      </TextField>
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="wall_height"
                        name="wall_height"
                        label="Height of wall &#x1F4F1;"
                        // InputLabelProps={{ style: { fontSize: 22 } }}
                        variant="standard"
                        value={formProps.values.wall_height}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.wall_height)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                        error={
                          formProps.touched.wall_height &&
                          Boolean(formProps.errors.wall_height)
                        }
                        helperText={
                          formProps.touched.wall_height &&
                          formProps.errors.wall_height
                        }
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="wall_width"
                        name="wall_width"
                        label="Width of wall &#x1F4F1;"
                        // InputLabelProps={{ style: { fontSize: 22 } }}
                        variant="standard"
                        value={formProps.values.wall_width}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.wall_width)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                        error={
                          formProps.touched.wall_width &&
                          Boolean(formProps.errors.wall_width)
                        }
                        helperText={
                          formProps.touched.wall_width &&
                          formProps.errors.wall_width
                        }
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        select
                        id="is_project_access"
                        name="is_project_access"
                        label="project access as per norms &#x1F4F1;"
                        variant="standard"
                        value={formProps.values.is_project_access}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.is_project_access)
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
                        id="is_project_access_remark"
                        name="is_project_access_remark"
                        label="project access as per norms remark &#x1F4F1;"
                        // InputLabelProps={{ style: { fontSize: 22 } }}
                        variant="standard"
                        value={formProps.values.is_project_access_remark}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.is_project_access_remark)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                        error={
                          formProps.touched.is_project_access_remark &&
                          Boolean(formProps.errors.is_project_access_remark)
                        }
                        helperText={
                          formProps.touched.is_project_access_remark &&
                          formProps.errors.is_project_access_remark
                        }
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        select
                        id="basic_infrastructure"
                        name="basic_infrastructure"
                        label="basic infrastructure &#x1F4F1;"
                        // InputLabelProps={{ style: { fontSize: 22 } }}
                        variant="standard"
                        value={formProps.values.basic_infrastructure}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.basic_infrastructure)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                        error={
                          formProps.touched.basic_infrastructure &&
                          Boolean(formProps.errors.basic_infrastructure)
                        }
                        helperText={
                          formProps.touched.basic_infrastructure &&
                          formProps.errors.basic_infrastructure
                        }
                      >
                        <MenuItem value="">Select</MenuItem>
                        <MenuItem value="1">Yes</MenuItem>
                        <MenuItem value="0">No</MenuItem>
                      </TextField>
                    </Col>
                    <br />
                  </Row>
                  <Row>
                    <Typography variant={"h6"}>Plot Boundries:</Typography>
                    <Divider />
                    <Col md={12}>
                      <FieldArray
                        name="at_site"
                        render={(arrayHelpers) => (
                          <div>
                            <Row>
                              <Col md={2}>
                                <TextField
                                  fullWidth
                                  size="small"
                                  variant="outlined"
                                  id="north_site"
                                  name="north_site"
                                  label="North"
                                  value={formProps.values.north_site}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.north_site &&
                                    Boolean(formProps.errors.north_site)
                                  }
                                  helperText={
                                    formProps.touched.north_site &&
                                    formProps.errors.north_site
                                  }
                                />
                              </Col>
                              <Col md={2}>
                                <TextField
                                  fullWidth
                                  size="small"
                                  variant="outlined"
                                  id="south_site"
                                  name="south_site"
                                  label="South"
                                  value={formProps.values.south_site}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.south_site &&
                                    Boolean(formProps.errors.south_site)
                                  }
                                  helperText={
                                    formProps.touched.south_site &&
                                    formProps.errors.south_site
                                  }
                                />
                              </Col>
                              <Col md={2}>
                                <TextField
                                  fullWidth
                                  size="small"
                                  variant="outlined"
                                  id="east_site"
                                  name="east_site"
                                  label="East"
                                  value={formProps.values.east_site}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.east_site &&
                                    Boolean(formProps.errors.east_site)
                                  }
                                  helperText={
                                    formProps.touched.east_site &&
                                    formProps.errors.east_site
                                  }
                                />
                              </Col>
                              <Col md={2}>
                                <TextField
                                  fullWidth
                                  size="small"
                                  variant="outlined"
                                  id="west_site"
                                  name="west_site"
                                  label="West"
                                  value={formProps.values.west_site}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.west_site &&
                                    Boolean(formProps.errors.west_site)
                                  }
                                  helperText={
                                    formProps.touched.west_site &&
                                    formProps.errors.west_site
                                  }
                                />
                              </Col>

                              <Col md={2}>
                                <Button
                                  color="success"
                                  variant="contained"
                                  onClick={() => {
                                    if (
                                      formProps?.values?.at_site.length == 0
                                    ) {
                                      arrayHelpers.push({
                                        id: formProps?.values?.at_site.length,
                                        north_site: formProps.values.north_site,
                                        south_site: formProps.values.south_site,
                                        east_site: formProps.values.east_site,
                                        west_site: formProps.values.west_site,
                                      });
                                    } else {
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
                                  <th>Sr No</th>
                                  <th>North</th>
                                  <th>South</th>
                                  <th>East</th>
                                  <th>West</th>
                                  <th>Delete</th>
                                </tr>
                              </thead>
                              <tbody>
                                {formProps?.values?.at_site?.map(
                                  (area, index) => {
                                    return (
                                      <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                          <TextField
                                            fullWidth
                                            size="small"
                                            label="North_site"
                                            variant="outlined"
                                            name={`at_site.${index}.north_site`}
                                            value={area.north_site}
                                            id="north_site"
                                            onChange={formProps.handleChange}
                                          />
                                        </td>
                                        <td>
                                          <TextField
                                            fullWidth
                                            size="small"
                                            label="South"
                                            variant="outlined"
                                            name={`at_site.${index}.south_site`}
                                            value={area.south_site}
                                            id="south_site"
                                            onChange={formProps.handleChange}
                                          />
                                        </td>
                                        <td>
                                          <TextField
                                            fullWidth
                                            size="small"
                                            label="East"
                                            variant="outlined"
                                            name={`at_site.${index}.east_site`}
                                            value={area.east_site}
                                            id="east_site"
                                            onChange={formProps.handleChange}
                                          />
                                        </td>
                                        <td>
                                          <TextField
                                            fullWidth
                                            size="small"
                                            label="West"
                                            variant="outlined"
                                            name={`at_site.${index}.west_site`}
                                            value={area.west_site}
                                            id="west_site"
                                            onChange={formProps.handleChange}
                                          />
                                        </td>

                                        <td>
                                          <Button
                                            color="error"
                                            size="large"
                                            variant="contained"
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

                  <br />

                  <Typography variant={"h5"}>Rera Details</Typography>
                  <Divider />
                  <br />
                  <Row className="form-group">
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="rera_no"
                        name="rera_no"
                        label="Rera No &#x1F4F1;"
                        // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                        variant="standard"
                        value={formProps.values.rera_no}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.rera_no)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                        error={
                          formProps.touched.rera_no &&
                          Boolean(formProps.errors.rera_no)
                        }
                        helperText={
                          formProps.touched.rera_no && formProps.errors.rera_no
                        }
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="rera_project_name"
                        name="rera_project_name"
                        label="rera project name &#x1F4F1;"
                        // InputLabelProps={{ style: { fontSize: 22 } }}
                        variant="standard"
                        value={formProps.values.rera_project_name}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.rera_project_name)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                        error={
                          formProps.touched.rera_project_name &&
                          Boolean(formProps.errors.rera_project_name)
                        }
                        helperText={
                          formProps.touched.rera_no &&
                          formProps.errors.rera_project_name
                        }
                      />
                    </Col>
                    <Col md={4} className="pb-4 pt-2">
                      <TextField
                        fullWidth
                        type="date"
                        size="small"
                        variant="outlined"
                        id="commencement_date"
                        name="commencement_date"
                        label="Commencement Date &#x1F4F1;"
                        // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                        value={formProps.values.commencement_date}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.commencement_date)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                        error={
                          formProps.touched.commencement_date &&
                          Boolean(formProps.errors.commencement_date)
                        }
                        helperText={
                          formProps.touched.commencement_date &&
                          formProps.errors.commencement_date
                        }
                      />
                    </Col>

                    <Col md={4} className="pb-4 pt-2">
                      <TextField
                        fullWidth
                        type="date"
                        id="end_date"
                        name="end_date"
                        label="End Date &#x1F4F1;"
                        // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                        size="small"
                        variant="outlined"
                        value={formProps.values.end_date}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.end_date)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                        error={
                          formProps.touched.end_date &&
                          Boolean(formProps.errors.end_date)
                        }
                        helperText={
                          formProps.touched.end_date &&
                          formProps.errors.end_date
                        }
                      />
                    </Col>
                    <Col md={4} className="pb-4 pt-2">
                      <TextField
                        fullWidth
                        type="date"
                        id="revised_end_date"
                        name="revised_end_date"
                        label="Revised end date &#x1F4F1;"
                        // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                        variant="outlined"
                        size="small"
                        value={formProps.values.revised_end_date}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.revised_end_date)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                        error={
                          formProps.touched.revised_end_date &&
                          Boolean(formProps.errors.revised_end_date)
                        }
                        helperText={
                          formProps.touched.revised_end_date &&
                          formProps.errors.revised_end_date
                        }
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="building_type"
                        name="building_type"
                        label="Type of building"
                        variant="standard"
                        value={formProps.values.building_type}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.building_type)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      />
                    </Col>
                    <Col md={6}>
                      <div>
                        <FormControl sx={{ m: 1, width: 300 }}>
                          <InputLabel id="demo-multiple-checkbox-label">
                            Project Amenities
                          </InputLabel>
                          <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={personName}
                            onChange={handleChange}
                            input={<OutlinedInput label="Tag" />}
                            renderValue={(selected) => selected.join(", ")}
                            MenuProps={MenuProps}
                          >
                            {props?.dropdowns?.dropdowns
                              ?.filter((field) => field?.name == "amenities")[0]
                              ?.drop_down_details?.map((field) => (
                                <MenuItem key={field?.name} value={field?.name}>
                                  <Checkbox
                                    checked={
                                      personName.indexOf(field?.name) > -1
                                    }
                                  />
                                  <ListItemText primary={field?.name} />
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </div>
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="surrounding"
                        name="surrounding"
                        label="Project surrounding"
                        variant="standard"
                        value={formProps.values.surrounding}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.surrounding)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="localities"
                        name="localities"
                        label="Project locality"
                        variant="standard"
                        value={formProps.values.localities}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.localities)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="neighbourhood"
                        name="neighbourhood"
                        label="Neighbourhood/Type of developer"
                        variant="standard"
                        value={formProps.values.neighbourhood}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.neighbourhood)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      />
                    </Col>

                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="road_access"
                        name="road_access"
                        label="Road access"
                        variant="standard"
                        value={formProps.values.road_access}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.road_access)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <Autocomplete
                        fullWidth
                        id="main_road_width-autocomplete"
                        options={
                          props?.dropdowns?.dropdowns?.filter(
                            (field) => field?.name === "Main Road Width"
                          )[0]?.drop_down_details || []
                        }
                        getOptionLabel={(option) => option?.name || ""}
                        onChange={(e, value) => {
                          formProps.setFieldValue(
                            "main_road_width",
                            value?.name || ""
                          );
                          // Optional: Perform additional actions on change, like updating progress
                          if (value?.name) {
                            setProgress(progress + 100 / formPropsLength);
                          }
                        }}
                        onOpen={formProps.handleBlur}
                        includeInputInList
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={Boolean(
                              formProps.touched.main_road_width &&
                                formProps.errors.main_road_width
                            )}
                            helperText={
                              formProps.touched.main_road_width &&
                              formProps.errors.main_road_width
                            }
                            label="Main Road width 📱"
                            name="main_road_width"
                            variant="standard"
                          />
                        )}
                      />
                    </Col>

                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="road_type"
                        name="road_type"
                        label="Type of road &#x1F4F1;"
                        // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                        variant="standard"
                        value={formProps.values.road_type}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.road_type)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      />
                    </Col>

                    <Col md={4} className="pb-4">
                      <Autocomplete
                        fullWidth
                        id="approach_road-autocomplete"
                        options={
                          props?.dropdowns?.dropdowns?.filter(
                            (field) =>
                              field?.name === "Condition of approach road"
                          )[0]?.drop_down_details || []
                        }
                        getOptionLabel={(option) => option?.name || ""}
                        onChange={(e, value) => {
                          formProps.setFieldValue(
                            "approach_road",
                            value?.name || ""
                          );
                        }}
                        onOpen={formProps.handleBlur}
                        includeInputInList
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={Boolean(
                              formProps.touched.approach_road &&
                                formProps.errors.approach_road
                            )}
                            helperText={
                              formProps.touched.approach_road &&
                              formProps.errors.approach_road
                            }
                            label="Condition of approach road"
                            name="approach_road"
                            variant="standard"
                          />
                        )}
                      />
                    </Col>

                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="structure_type"
                        name="structure_type"
                        label="Type of structure &#x1F4F1;"
                        // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                        variant="standard"
                        value={formProps.values.structure_type}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.structure_type)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="negative_info_project"
                        name="negative_info_project"
                        label="-ve Information of project"
                        variant="standard"
                        value={formProps.values.negative_info_project}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.negative_info_project)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="negative_info_locality"
                        name="negative_info_locality"
                        label="-ve Information of locality"
                        variant="standard"
                        value={formProps.values.negative_info_locality}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.negative_info_locality)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="negative_prop_interval"
                        name="negative_prop_interval"
                        label="negative property internal &#x1F4F1;"
                        variant="standard"
                        value={formProps.values.negative_prop_interval}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.negative_prop_interval)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        select
                        id="is_demolition_risk"
                        name="is_demolition_risk"
                        label="Demolition Risk &#x1F4F1;"
                        // InputLabelProps={{ style: { fontSize: 22 } }}
                        variant="standard"
                        value={formProps.values.is_demolition_risk}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.is_demolition_risk)
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
                        id="demolition_risk"
                        name="demolition_risk"
                        label="Demolition Risk Remark &#x1F4F1;"
                        // InputLabelProps={{ style: { fontSize: 22 } }}
                        variant="standard"
                        value={formProps.values.demolition_risk}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.demolition_risk)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="is_demolition_risk_type"
                        name="is_demolition_risk_type"
                        label="Demolition Risk Type &#x1F4F1;"
                        // InputLabelProps={{ style: { fontSize: 22 } }}
                        variant="standard"
                        value={formProps.values.is_demolition_risk_type}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.is_demolition_risk_type)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="building_occupancy"
                        name="building_occupancy"
                        label="over all bulding occupancy &#x1F4F1;"
                        // InputLabelProps={{ style: { fontSize: 22 } }}
                        variant="standard"
                        value={formProps.values.building_occupancy}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.building_occupancy)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        select
                        id="redevolepment_notice"
                        name="redevolepment_notice"
                        label="Redevelopment notice &#x1F4F1;"
                        // InputLabelProps={{ style: { fontSize: 22 } }}
                        variant="standard"
                        value={formProps.values.redevolepment_notice}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.redevolepment_notice)
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
                        id="redevolepment_notice_remark"
                        name="redevolepment_notice_remark"
                        label="Redevelopment notice Remark&#x1F4F1;"
                        // InputLabelProps={{ style: { fontSize: 22 } }}
                        variant="standard"
                        value={formProps.values.redevolepment_notice_remark}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.redevolepment_notice_remark)
                            setProgress(progress + 100 / formPropsLength);
                        }}
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
                        // disabled={formProps.isSubmitting}
                        fullWidth
                        type="submit"
                        onClick={() => dispatch(ADD_ONE())}
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
    getProjects: (data) => dispatch(getProjects(data)),
    editProjectsData: (data, setValue, value, token) =>
      dispatch(editProjectsData(data, setValue, value, token)),
    editProgressData: (progressData, setValue, value, token) =>
      dispatch(editProgressData(progressData, setValue, value, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);
