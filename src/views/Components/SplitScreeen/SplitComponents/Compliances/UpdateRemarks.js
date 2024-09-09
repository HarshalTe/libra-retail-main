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
  Label,
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
// import { editValuationData } from "../../../../../../Redux/Creators/ValuationCreators";


//*Actions
// import { editBrokersData } from "../../../Redux/Creators/BrokersCreators";

function UpdateRemarks(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  console.log("objectprops",props)
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);

    let data = {
      // token: token,
      id: values.id,
      property_id: values.property_id,
      valuation_id: values.valuation_id,

      //*Valuation
      realization_value: values.realization_value,
        yield: values.yield,
        garden_per_area: values.garden_per_doc,
        garden_per_doc: values.garden_per_site,
        garden_per_site: values.garden_per_site,
        garden_per_plan: values.garden_per_plan,
        terrace_per_doc: values.terrace_per_doc,
        terrace_rate: values.terrace_rate,
        terrace_per_site: values.terrace_per_site,
        terrace_per_plan: values.terrace_per_plan,
        open_parking_value: values.open_parking_value,
        open_parking_no: values.open_parking_no,
        mechanical_car_parking_value: values.mechanical_car_parking_value,
        mechanical_stack_parking_no: values.mechanical_stack_parking_no,
        covered_car_parking_value: values.covered_car_parking_value,
        covered_car_parking_no: values.covered_car_parking_no,
        depricated_value: values.depricated_value,
        renevotion_value: values.renevotion_value,
        distress_percentage: values.distress_percentage,
        distress_value: values.distress_value,
        age_per_agreement: values.age_per_agreement,
        as_per_site_inspection: values.as_per_site_inspection,
        esitimated_age: values.esitimated_age,
        externel_expenses: values.externel_expenses,
        rent_per_month: values.rent_per_month,
        garden_rate: values.garden_rate,
        rent_per_sqrft: values.rent_per_sqrft,
   
    };

    const value = 1;

    let progressData = {
      id: props?.property?.property?.id,
      valuationProgress: 1,
    };

   

          // props.editValuationData(data, props.setValue, value, token);
          setSubmitting(false);

  };

  return (
    <div>
      <Tooltip title="Edit" placement="top">
        <Button
          fullWidth
          variant="outlined"
          color="warning"
          size="small"
          className="ml-1"
          onClick={() => toggle()}
          // startIcon={<AddIcon fontSize="inherit" />}
        >
          Remark
        </Button>
      </Tooltip>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Remark</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
        <ModalBody>
          <Formik
            initialValues={{
              id: props?.property?.property?.valuation?.id,
        property_id: props?.property?.property?.id,
        valuation_id: props?.property?.property?.valuation?.id,
              realization_value: props?.property?.property?.valuation?.realization_value,
              yield: props?.property?.property?.valuation?.yield,
              garden_per_area: props?.property?.property?.valuation?.garden_per_area,
              garden_per_doc: props?.property?.property?.valuation?.garden_per_doc,
              garden_per_site: props?.property?.property?.valuation?.garden_per_site,
              garden_per_plan: props?.property?.property?.valuation?.garden_per_plan,
              garden_rate: props?.property?.property?.valuation?.garden_rate,
              terrace_per_doc: props?.property?.property?.valuation?.terrace_per_doc,
              terrace_rate: props?.property?.property?.valuation?.terrace_rate,
              terrace_per_site: props?.property?.property?.valuation?.terrace_per_site,
              terrace_per_plan: props?.property?.property?.valuation?.terrace_per_plan,
              open_parking_value: props?.property?.property?.valuation?.open_parking_value,
              open_parking_no: props?.property?.property?.valuation?.open_parking_no,
              mechanical_car_parking_value: props?.property?.property?.valuation?.mechanical_car_parking_value,
              mechanical_stack_parking_no: props?.property?.property?.valuation?.mechanical_stack_parking_no,
              covered_car_parking_value: props?.property?.property?.valuation?.covered_car_parking_value,
              covered_car_parking_no: props?.property?.property?.valuation?.covered_car_parking_no,
              depricated_value: props?.property?.property?.valuation?.depricated_value,
              renevotion_value: props?.property?.property?.valuation?.renevotion_value,
        distress_percentage: props?.property?.property?.valuation?.distress_percentage,
        distress_value: props?.property?.property?.valuation?.distress_value,
        age_per_agreement: props?.property?.property?.valuation?.age_per_agreement,
        as_per_site_inspection: props?.property?.property?.valuation?.as_per_site_inspection,
        esitimated_age: props?.property?.property?.valuation?.esitimated_age,
        externel_expenses: props?.property?.property?.valuation?.externel_expenses,
        rent_per_month: props?.property?.property?.valuation?.rent_per_month,
        rent_per_sqrft: props?.property?.property?.valuation?.rent_per_sqrft,
   
              building_age_inspection: props?.property?.property?.specification?.as_per_inspector,
              building_age_aggrement: props?.property?.property?.specification?.as_per_aggrement,
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
            })}
          >
            {(formProps) => (
              <Form enctype="multipart/form-data">
                  <Row>
                    <Col md={12} className="">
                      <Label>{props.name}</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Remark"
                        id="depricated_value"
                        name="depricated_value"
                        value={formProps.values.depricated_value}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.depricated_value &&
                          Boolean(formProps.errors.depricated_value)
                        }
                        helperText={
                          formProps.touched.depricated_value &&
                          formProps.errors.depricated_value
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
    // editValuationData: (data, setValue, value, token) =>
    // dispatch(editValuationData(data, setValue, value, token)),
    // editBrokersData: (data) => dispatch(editBrokersData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateRemarks);
