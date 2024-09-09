import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@mui/icons-material/Edit";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";

import moment from "moment";

//*Actions
import { editProjectsData } from "../../../../../Redux/Creators/ProjectsCreators";

function EditProjectsFields(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values Edit:", values);

    let data = {
      token: token,
      id: values.id,
      property_id: values.property_id,
      valuation_id: values.id,

      //   economic_life: values.economic_life,
      building_age: values.building_age,
      residual_age: values.residual_age,
    };

    props.editProjectsData(data);
    setSubmitting(false);
    setModal(false);
  };

  return (
    <div>
      <Tooltip title="Edit" placement="top">
        <Button
          variant="outlined"
          color="warning"
          size="small"
          className="p-1"
          onClick={() => toggle()}
        >
          Edit
        </Button>
      </Tooltip>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Edit Data</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              id: props?.property?.property?.project?.id,
              property_id: props?.property?.property?.id,
              valuation_id: props?.property?.property?.valuation?.id,

              //*Economic Table
              //   economic_life:
              //     props?.property?.property?.valuation?.type?.economic_life,
              building_age: props?.property?.property?.project?.building_age,
              residual_age: props?.property?.property?.project?.residual_age,
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({})}
          >
            {(formProps) => (
              <Form>
                <Row>
                  <Col md={12} className="pb-4">
                    <Typography variant={"h5"}>
                      Project Details Fields
                    </Typography>
                  </Col>
                  {/* <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="economic_life"
                      name="economic_life"
                      label="Economic life of building"
                      value={formProps.values.economic_life}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.economic_life &&
                        Boolean(formProps.errors.economic_life)
                      }
                      helperText={
                        formProps.touched.economic_life &&
                        formProps.errors.economic_life
                      }
                    />
                  </Col> */}

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="building_age"
                      name="building_age"
                      label="Building age"
                      value={formProps.values.building_age}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.building_age &&
                        Boolean(formProps.errors.building_age)
                      }
                      helperText={
                        formProps.touched.building_age &&
                        formProps.errors.building_age
                      }
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="residual_age"
                      name="residual_age"
                      label="Residual age"
                      value={formProps.values.residual_age}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.residual_age &&
                        Boolean(formProps.errors.residual_age)
                      }
                      helperText={
                        formProps.touched.residual_age &&
                        formProps.errors.residual_age
                      }
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
    property: state.property,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editProjectsData: (data) => dispatch(editProjectsData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProjectsFields);
