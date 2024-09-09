import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
  Row,
  Col,
  Card,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  InputGroup,
  Label,
} from "reactstrap";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@material-ui/core/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";

//*Actions
import { editProjectsDataTable } from "../../../Redux/Creators/ProjectsCreators";
import CustomTextField from "./../../../components/MuiComponents/CustomTextField";
import DeleteButton from "Helpers/DeleteButton";
import AddButton from "Helpers/AddButton";

function CreateReport(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);

    let data = {
      token: token,
      pageno: 1,
      pageSize: 10000,
      id: props.data.id,
      project_name: values.project_name,
      project_boundries: values.project_boundries,
      per_site: values.per_site,
      address: values.address,
      legal_address: values.legal_address,

      //*rera
      rera_no: values.rera_no,
      commencement_date: values.commencement_date,
      end_date: values.end_date,
      revised_end_date: values.revised_end_date,
      building_type: values.building_type,
      amenities: values.amenities,
      surrounding: values.surrounding,
      localities: values.localities,
      neighbourhood: values.neighbourhood,
      road_access: values.road_access,
      road_width: values.road_width,
      road_type: values.road_type,
      approach_road: values.approach_road,
      structure_type: values.structure_type,
      negative_info_project: values.negative_info_project,
      negative_info_locality: values.negative_info_locality,
    };

    console.log("data:", data);

    props.editProjectsDataTable(data);
    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
        <div
         style={{
          // "font-family": "Roboto, Helvetica, Arial, sans-serif",
          "font-weight": "800",
          "font-size": "1rem",
          "cursor": "pointer",
          "color": "#5e72e6",
          // "margin": "-15px 0 -6px 0",          
          // "padding": "0 48px"
        }}
          onClick={() => toggle()}
        >
          <i className="" aria-hidden="true"></i>
          Stage Updation Report
          {/* <EditIcon fontSize="medium" /> */}
        </div>  
      {/* <Tooltip title="Stage Updation Report" placement="top">
        <Button
          variant="outlined"
          color="success"
          size="small"
          className="p-1 ml-4"
          onClick={() => toggle()}
        >
          Stage Updation Report

        </Button>  
      </Tooltip> */}
      <Modal
        className="modal-xl"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Stage Updation Report</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              visited_by: "",
              detail: [
                {
                  date: "",
                  state_of_construction: "",
                  status: "",
                },
              ],
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({})}
          >
            {(formProps) => (
              <Form>
                <Row className="form-group">
                  <Col md={6}>
                    <CustomTextField
                      label="Visited By"
                      name="visited_by"
                      formProps={formProps}
                      variant="outlined"
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={12}>
                    <FieldArray
                      name="detail"
                      render={(arrayHelpers) => (
                        <div>
                          {formProps.values.detail?.map((item, index) => (
                            <Row
                              className="form-group d-flex align-items-end"
                              key={index}
                            >
                              <Col md={3}>
                                <InputGroup>
                                  <Label>Date</Label>
                                  <CustomTextField
                                    formProps={formProps}
                                    name={`detail[${index}].date`}
                                    variant="outlined"
                                    type="date"
                                  />
                                </InputGroup>
                              </Col>
                              <Col md={4}>
                                <InputGroup>
                                  <CustomTextField
                                    formProps={formProps}
                                    name={`detail[${index}].state_of_construction`}
                                    variant="outlined"
                                    label={`State of Construction`}
                                  />
                                </InputGroup>
                              </Col>
                              <Col md={3}>
                                <InputGroup>
                                  <CustomTextField
                                    formProps={formProps}
                                    name={`detail[${index}].status`}
                                    variant="outlined"
                                    label={`Status`}
                                  />
                                </InputGroup>
                              </Col>
                              <Col md={2}>
                                {formProps.values.detail.length ===
                                  index + 1 && (
                                  <AddButton
                                    onClick={() => {
                                      arrayHelpers.push({
                                        date: "",
                                        state_of_construction: "",
                                        status: "",
                                      });
                                    }}
                                  />
                                )}

                                {formProps.values.detail?.length > 1 && (
                                  <DeleteButton
                                    deleteFunction={() =>
                                      arrayHelpers.remove(index)
                                    }
                                  />
                                )}
                              </Col>
                            </Row>
                          ))}
                        </div>
                      )}
                    />
                  </Col>
                </Row>
                <Divider />
                <Row className="pt-4 pd-4">
                  <Col md={6}>
                    <Button
                      color="success"
                      variant="contained"
                      disabled={formProps.isSubmitting}
                      fullWidth
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Col>

                  <Col md={6}>
                    <Button
                      color="error"
                      variant="contained"
                      fullWidth
                      onClick={() => toggle()}
                    >
                      Cancel
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editProjectsDataTable: (data) => dispatch(editProjectsDataTable(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateReport);
