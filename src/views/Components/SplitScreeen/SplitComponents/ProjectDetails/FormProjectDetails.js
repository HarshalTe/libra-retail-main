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

function FormProjectDetails() {
  return (
    <>
      <br />

      <Formik
        initialValues={{
          //*Tower
          towers: [],
          tower_name: "",
          configuration: "",
          remarks: "",
        }}
        // onSubmit={handleSubmit}
        validationSchema={Yup.object().shape({
          // branch_name: Yup.string().required("Branch Name is required"),
        })}
      >
        {/* id="property_occupied_by"
                  name="property_occupied_by"
                 
                  value={formProps.values.property_occupied_by}
                  error={
                    formProps.touched.property_occupied_by &&
                    Boolean(formProps.errors.property_occupied_by)
                  }
                  helperText={
                    formProps.touched.property_occupied_by &&
                    formProps.errors.property_occupied_by
                  } */}
        {(formProps) => (
          <Form>
            <Typography variant={"h5"}>Project Details</Typography>
            <Divider />
            <br />
            <Row className="form-group">
              <Col md={6} className="pb-4">
                <TextField
                  fullWidth
                  label="Project"
                  variant="standard"
                  onChange={formProps.handleChange}
                />
              </Col>
              <Col md={6} className="pb-4">
                <TextField
                  fullWidth
                  label="Amenities"
                  variant="standard"
                  onChange={formProps.handleChange}
                />
              </Col>
            </Row>

            <Divider />
            <br />
            <Typography variant={"h5"}>Documents</Typography>
            <Divider />
            <Row className="form-group" className="pb-4">
              <Col md={12} className="pb-4">
                <Typography>Base Rate:</Typography>
              </Col>
              <Col md={2} className="pb-4">
                <TextField
                  fullWidth
                  label="Flats"
                  variant="standard"
                  onChange={formProps.handleChange}
                />
              </Col>
              <Col md={2} className="pb-4">
                <TextField
                  fullWidth
                  label="Shops"
                  variant="standard"
                  onChange={formProps.handleChange}
                />
              </Col>
              <Col md={2} className="pb-4">
                <TextField
                  fullWidth
                  label="Showrooms"
                  variant="standard"
                  onChange={formProps.handleChange}
                />
              </Col>
              <Col md={2} className="pb-4">
                <TextField
                  fullWidth
                  label="Office"
                  variant="standard"
                  onChange={formProps.handleChange}
                />
              </Col>

              <Col md={2} className="pb-4">
                <TextField
                  fullWidth
                  label="Industrial land"
                  variant="standard"
                  onChange={formProps.handleChange}
                />
              </Col>

              <Col md={2} className="pb-4">
                <TextField
                  fullWidth
                  label="Industrial unit"
                  variant="standard"
                  onChange={formProps.handleChange}
                />
              </Col>
            </Row>
            <Divider />
            <br />

            <Typography variant={"h5"}>Tower</Typography>
            <Divider />

            <Row className="pt-4 pb-2">
              <Col md={12}>
                <FieldArray
                  name="towers"
                  render={(arrayHelpers) => (
                    <div>
                      <Row className="pl-9">
                        <Col md={3}>
                          <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            id="tower_name"
                            name="tower_name"
                            label="Tower Name"
                            value={formProps.values.tower_name}
                            onChange={formProps.handleChange}
                          />
                        </Col>

                        <Col md={3}>
                          <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            id="configuration"
                            name="configuration"
                            label="Configuration"
                            value={formProps.values.configuration}
                            onChange={formProps.handleChange}
                          />
                        </Col>

                        <Col md={3}>
                          <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            id="remarks"
                            name="remarks"
                            label="Remarks"
                            value={formProps.values.remarks}
                            onChange={formProps.handleChange}
                          />
                        </Col>

                        <Col md={3}>
                          <Button
                            color="success"
                            variant="outlined"
                            onClick={() => {
                              arrayHelpers.push({
                                tower_name: formProps.values.tower_name,
                                configuration: formProps.values.configuration,
                                remarks: formProps.values.remarks,
                              });
                              {
                                formProps.setFieldValue("tower_name", "");
                                formProps.setFieldValue("configuration", "");
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
                            <th>Tower Name</th>
                            <th>Configuration</th>
                            <th>Remarks</th>
                            <th>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {console.log("values", formProps?.values?.towers)}
                          {formProps?.values?.towers?.map((towers, index) => {
                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>

                                <td>
                                  <TextField
                                    fullWidth
                                    disabled
                                    size="small"
                                    label="Type of ownership"
                                    variant="outlined"
                                    name={`towers.${index}.tower_name`}
                                    value={towers.tower_name}
                                    id="tower_name"
                                    // onChange={formProps.handleChange}
                                  />
                                </td>
                                <td>
                                  <TextField
                                    fullWidth
                                    disabled
                                    size="small"
                                    label="Configuration"
                                    variant="outlined"
                                    name={`towers.${index}.configuration`}
                                    value={towers.configuration}
                                    id="configuration"
                                    // onChange={formProps.handleChange}
                                  />
                                </td>
                                <td>
                                  <TextField
                                    fullWidth
                                    disabled
                                    size="small"
                                    label="Owner name"
                                    variant="outlined"
                                    name={`towers.${index}.remarks`}
                                    value={towers.remarks}
                                    id="remarks"
                                  />
                                </td>

                                <td>
                                  <Button
                                    color="error"
                                    size="large"
                                    variant="outlined"
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    <DeleteIcon fontSize="inherit" />
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </div>
                  )}
                />
              </Col>
            </Row>

            <Divider />
            <br />

            <Typography variant={"h5"}>Rera details + Rera Links</Typography>
            <Divider />
            <Row className="form-group pb-4"></Row>

            <Divider />
            <br />

            <Typography variant={"h5"}>Zoning</Typography>
            <Divider />
            <Row className="form-group pb-4">
              <Col md={4} className="pb-4">
                <TextField
                  fullWidth
                  select
                  label="Project is in demolition list"
                  variant="standard"
                  onChange={formProps.handleChange}
                >
                  <MenuItem vlaue="">Select</MenuItem>
                  <MenuItem vlaue="Yes">Yes</MenuItem>
                  <MenuItem vlaue="No">No</MenuItem>
                </TextField>
              </Col>
              <Col className="pb-4 pt-2">
                <Tooltip title="part of annexure">
                  <Checkbox size="medium" defaultChecked />
                </Tooltip>
              </Col>
              <Col md={7} className="pb-4">
                <TextField
                  fullWidth
                  label="Project is in demolition road width"
                  variant="standard"
                  onChange={formProps.handleChange}
                />
              </Col>
              <Col md={4} className="pb-4">
                <TextField
                  fullWidth
                  label="Project is in demolition unapproved floor"
                  variant="standard"
                  onChange={formProps.handleChange}
                />
              </Col>
              <Col md={4} className="pb-4">
                <TextField
                  fullWidth
                  label="Project is in demolition line voilation"
                  variant="standard"
                  onChange={formProps.handleChange}
                />
              </Col>
            </Row>

            <Divider />
            <br />

            <Row className="form-group" className="pb-4">
              <Col>
                <Button
                  size="medium"
                  color="success"
                  fullWidth
                  // className="float-center"
                  // variant="outlined"
                  variant="contained"
                >
                  Next
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default FormProjectDetails;
