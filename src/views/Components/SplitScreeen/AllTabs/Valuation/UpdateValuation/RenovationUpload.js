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
import { Divider, Switch } from "@mui/material";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";
import { editValuationFormData } from "../../../../../../Redux/Creators/ValuationCreators";


//*Actions
// import { editBrokersData } from "../../../Redux/Creators/BrokersCreators";

function RenovationUpload(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const [checked, setChecked] = React.useState(true);
  
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  console.log("objectprops",props)
  const toggle = () => setModal(!modal);
  const handleSubmit = (values, { setSubmitting }) => {
    let token={
      token:props.login?.login?.token,
      id: values.id,
      property_id: values.property_id,
      valuation_id: values.valuation_id,
    }
    console.log("Values:", values);

    // let data = {
    //   // token: token,
    //   id: values.id,
    //   property_id: values.property_id,
    //   valuation_id: values.valuation_id,

    //   //*Valuation
    //   realization_value: values.realization_value,
    //     yield: values.yield,
    //     garden_per_area: values.garden_per_doc,
    //     garden_per_doc: values.garden_per_site,
    //     garden_per_site: values.garden_per_site,
    //     garden_per_plan: values.garden_per_plan,
    //     terrace_per_doc: values.terrace_per_doc,
    //     terrace_per_site: values.terrace_per_site,
    //     terrace_per_plan: values.terrace_per_plan,
    //     open_parking_value: values.open_parking_value,
    //     open_parking_no: values.open_parking_no,
    //     mechanical_car_parking_value: values.mechanical_car_parking_value,
    //     mechanical_stack_parking_no: values.mechanical_stack_parking_no,
    //     covered_car_parking_value: values.covered_car_parking_value,
    //     covered_car_parking_no: values.covered_car_parking_no,
    //     excel: values.excel,
    //     approved_excel: values.approved_excel,
   
    // };

    const data = new FormData();
    // data.append("excel", values.excel);
    // data.append("approved_excel", values.approved_excel);
    data.append("renevotion_value", values.renevotion_value);

    const value = 1;

    let progressData = {
      id: props?.property?.property?.id,
      valuationProgress: 1,
    };

   

          props.editValuationFormData(data, props.setValue, value, token);
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
          className="p-1"
          onClick={() => toggle()}
          startIcon={<AddIcon fontSize="inherit" />}
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
            <strong>Edit Renevotion Value</strong>
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
              terrace_per_doc: props?.property?.property?.valuation?.terrace_per_doc,
              terrace_per_site: props?.property?.property?.valuation?.terrace_per_site,
              terrace_per_plan: props?.property?.property?.valuation?.terrace_per_plan,
              open_parking_value: props?.property?.property?.valuation?.open_parking_value,
              open_parking_no: props?.property?.property?.valuation?.open_parking_no,
              mechanical_car_parking_value: props?.property?.property?.valuation?.mechanical_car_parking_value,
              mechanical_stack_parking_no: props?.property?.property?.valuation?.mechanical_stack_parking_no,
              covered_car_parking_value: props?.property?.property?.valuation?.covered_car_parking_value,
              covered_car_parking_no: props?.property?.property?.valuation?.covered_car_parking_no,
              excel: "",
              approved_excel: "",
              renevotion_value: props?.property?.property?.valuation?.renevotion_value,
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
            })}
          >
            {(formProps) => (
              <Form enctype="multipart/form-data">
                
                  <Row>
                    <Col md={3} className="">
                      <Label>Add to Annexure:</Label>
                  
                    </Col>
                    <Col md={9} className="">
                      Yes
                      <Switch
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
    No
                      <Label></Label>
                    
                    </Col>
                    <Col md={6} className="">
                      <Label>Upload Client Architecture Certified Estimate</Label>
                      <TextField
                        fullWidth
                        type="file"
                        variant="outlined"
                        size="small"
                        // label="Depriciated Value"
                        id="excel"
                        name="excel"
                        value={formProps.values.excel}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.excel &&
                          Boolean(formProps.errors.excel)
                        }
                        helperText={
                          formProps.touched.excel &&
                          formProps.errors.excel
                        }
                        />
                    </Col>
                    <Col md={6} className="">
                      <Label>Upload Approved Estimate</Label>
                      <TextField
                        fullWidth
                        type="file"
                        variant="outlined"
                        size="small"
                        // label="Depriciated Value"
                        id="approved_excel"
                        name="approved_excel"
                        value={formProps.values.approved_excel}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.approved_excel &&
                          Boolean(formProps.errors.approved_excel)
                        }
                        helperText={
                          formProps.touched.approved_excel &&
                          formProps.errors.approved_excel
                        }
                        />
                    </Col>
                    <Col md={6} className="">
                    <Label>Renevotion Value</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        type="number"
                        label="Renevotion Value"
                        id="renevotion_value"
                        name="renevotion_value"
                        value={formProps.values.renevotion_value}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.renevotion_value &&
                          Boolean(formProps.errors.renevotion_value)
                        }
                        helperText={
                          formProps.touched.renevotion_value &&
                          formProps.errors.renevotion_value
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
    editValuationFormData: (data, setValue, value, token) =>
    dispatch(editValuationFormData(data, setValue, value, token)),
    // editBrokersData: (data) => dispatch(editBrokersData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RenovationUpload);
