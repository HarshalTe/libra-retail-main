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
import { editValuationAdditionalData } from "../../../../../Redux/Creators/ValuationCreators";

function EditEconomyTable(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values Edit:", values);

    let data = {
      // id: values.id,
      property_id: values.property_id,
      valuation_id: values.id,

      //* Valuation
      aggreement_no: values.aggreement_no,
      aggreement_date: values.aggreement_date,
      aggreement_value: values.aggreement_value,
      difference: values.difference,
      metodology: values.metodology,
      interest_valued: values.interest_valued,

      // economic_life: values.economic_life,
      // building_age: values.building_age,
      // residual_age: values.residual_age,
      ba_plan: values.ba_plan,
      ba_site: values.ba_site,
      ba_evaluation: values.ba_evaluation,
      ba_loading: values.ba_loading,
      superplot_area: values.superplot_area,
      spa_doc: values.spa_doc,
      spa_valuation: values.spa_valuation,
    };

    props.editValuationAdditionalData(data, token);
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
          // startIcon={<AddIcon fontSize="inherit" />}
        >
          {/* <EditIcon fontSize="medium" /> */}
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
              id: props?.property?.property?.valuation?.id,
              property_id: props?.property?.property?.id,
              valuation_id: props?.property?.property?.valuation?.id,

              //*Valuation
              aggreement_no:
                props?.property?.property?.valuation?.aggreement_no,
              aggreement_date:
                props?.property?.property?.valuation?.aggreement_date === null
                  ? moment().format("YYYY-MM-DD")
                  : props?.property?.property?.valuation?.aggreement_date,
              aggreement_value:
                props?.property?.property?.valuation?.aggreement_value,
              difference: props?.property?.property?.valuation?.difference,
              metodology: props?.property?.property?.valuation?.metodology,
              interest_valued:
                props?.property?.property?.valuation?.interest_valued,

              //*Economic Table
              // economic_life:
              //   props?.property?.property?.valuation?.type?.economic_life,
              // building_age:
              //   props?.property?.property?.valuation?.type?.building_age,
              // residual_age:
              //   props?.property?.property?.valuation?.type?.residual_age,
              ba_plan: props?.property?.property?.valuation?.type?.ba_plan,
              ba_site: props?.property?.property?.valuation?.type?.ba_site,
              ba_evaluation:
                props?.property?.property?.valuation?.type?.ba_evaluation,
              ba_loading:
                props?.property?.property?.valuation?.type?.ba_loading,
              superplot_area:
                props?.property?.property?.valuation?.type?.superplot_area,
              spa_doc: props?.property?.property?.valuation?.type?.spa_doc,
              spa_valuation:
                props?.property?.property?.valuation?.type?.spa_valuation,
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({})}
          >
            {(formProps) => (
              <Form>
                <Row>
                  <Col md={12} className="pb-4">
                    <Typography variant={"h5"}>Valuation</Typography>
                  </Col>

                  <Divider />

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      size="small"
                      label="Agreement no./Index no."
                      variant="outlined"
                      id="aggreement_no"
                      name="aggreement_no"
                      value={formProps.values.aggreement_no}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.aggreement_no &&
                        Boolean(formProps.errors.aggreement_no)
                      }
                      helperText={
                        formProps.touched.aggreement_no &&
                        formProps.errors.aggreement_no
                      }
                    />
                  </Col>
                  <Col md={4} className="pb-4 pt-2">
                    <TextField
                      fullWidth
                      type="date"
                      size="small"
                      variant="outlined"
                      id="aggreement_date"
                      name="aggreement_date"
                      label="Agreement date"
                      value={formProps.values.aggreement_date}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.aggreement_date &&
                        Boolean(formProps.errors.aggreement_date)
                      }
                      helperText={
                        formProps.touched.aggreement_date &&
                        formProps.errors.aggreement_date
                      }
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      size="small"
                      label="Agreement value"
                      variant="outlined"
                      id="aggreement_value"
                      name="aggreement_value"
                      value={formProps.values.aggreement_value}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.aggreement_value &&
                        Boolean(formProps.errors.aggreement_value)
                      }
                      helperText={
                        formProps.touched.aggreement_value &&
                        formProps.errors.aggreement_value
                      }
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      size="small"
                      label="Diffrence"
                      variant="outlined"
                      id="difference"
                      name="difference"
                      value={formProps.values.difference}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.difference &&
                        Boolean(formProps.errors.difference)
                      }
                      helperText={
                        formProps.touched.difference &&
                        formProps.errors.difference
                      }
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      size="small"
                      label="Valuation metodology"
                      variant="outlined"
                      id="metodology"
                      name="metodology"
                      value={formProps.values.metodology}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.metodology &&
                        Boolean(formProps.errors.metodology)
                      }
                      helperText={
                        formProps.touched.metodology &&
                        formProps.errors.metodology
                      }
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      size="small"
                      label="Interest valued"
                      variant="outlined"
                      id="interest_valued"
                      name="interest_valued"
                      value={formProps.values.interest_valued}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.interest_valued &&
                        Boolean(formProps.errors.interest_valued)
                      }
                      helperText={
                        formProps.touched.interest_valued &&
                        formProps.errors.interest_valued
                      }
                    />
                  </Col>
                </Row>

                {/* <Row>
                  <Col md={4} className="pb-4">
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
                  </Col>

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
                </Row> */}

                <Row>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="BA as per plan"
                      id="ba_plan"
                      name="ba_plan"
                      value={formProps.values.ba_plan}
                      onChange={formProps.handleChange}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="BA as per site"
                      id="ba_site"
                      name="ba_site"
                      value={formProps.values.ba_site}
                      onChange={formProps.handleChange}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="BA for evaluation"
                      id="ba_evaluation"
                      name="ba_evaluation"
                      value={formProps.values.ba_evaluation}
                      onChange={formProps.handleChange}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="BA loading"
                      id="ba_loading"
                      name="ba_loading"
                      value={formProps.values.ba_loading}
                      onChange={formProps.handleChange}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Superplot area as per plan"
                      id="superplot_area"
                      name="superplot_area"
                      value={formProps.values.superplot_area}
                      onChange={formProps.handleChange}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="SPA as per doc"
                      id="spa_doc"
                      name="spa_doc"
                      value={formProps.values.spa_doc}
                      onChange={formProps.handleChange}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="SPA for valuation"
                      id="spa_valuation"
                      name="spa_valuation"
                      value={formProps.values.spa_valuation}
                      onChange={formProps.handleChange}
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
    editValuationAdditionalData: (data, token) =>
      dispatch(editValuationAdditionalData(data, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditEconomyTable);
