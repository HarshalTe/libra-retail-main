import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
  Row,
  Col,
  Card,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
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
import {readyrecknersEditData} from "../../../Redux/Creators/ReadyRecknersCreators"

import { editProjectsDataTable } from "../../../Redux/Creators/ProjectsCreators";
import { DeleteSpecial_remarks } from "../../../Redux/Creators/ProjectsCreators";

function EditReadyReackner(props) {
  
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);
    const token = props.login?.login?.token;
    const user={
      token:token
    } 

    let data = {
      id: props.data.id,
      village_name: values.village_name,
      area_type: values.area_type,
      local_body_type: values.local_body_type,
      local_body_name: values.local_body_name,
      landmark: values.landmark,
      zone: values.zone,
      subzone: values.subzone,
      land: values.land,
      residential: values.residential,
      office: values.office,
      shop: values.shop,
      industrial: values.industrial,
      cs_no: values.cs_no,
      tps_no: values.tps_no,
    };

    console.log("data:", data);

    props.readyrecknersEditData(data,user);
    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
      <Tooltip title="Edit Ready Reckoner" placement="top">
        <Button
          variant="outlined"
          color="warning"
          size="small"
          className="p-1"
          onClick={() => toggle()}
        >
          <EditIcon fontSize="medium" />
        </Button>
      </Tooltip>
      <Modal
        className="modal-xl"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Edit Ready Reckoner</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
                village_name: props?.data?.village_name,
                area_type: props?.data?.area_type,
                local_body_type: props?.data?.local_body_type,
                local_body_name: props?.data?.local_body_name,
                landmark: props?.data?.landmark,
                zone: props?.data?.zone,
                subzone: props?.data?.subzone,
                land: props?.data?.land,
                residential: props?.data?.residential,
                office: props?.data?.office,
                shop: props?.data?.shop,
                industrial: props?.data?.industrial,
                cs_no: props?.data?.cs_no,
                tps_no: props?.data?.tps_no,
              
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({

            })}
          >
            {(formProps) => (
              <Form>
              <Row>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="village_name"
                      name="village_name"
                      label="Village Name"
                      value={formProps.values.village_name}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.village_name &&
                        Boolean(formProps.errors.village_name)
                      }
                      helperText={
                        formProps.touched.village_name &&
                        formProps.errors.village_name
                      }
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="area_type"
                      name="area_type"
                      label="Area Type"
                      value={formProps.values.area_type}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.area_type &&
                        Boolean(formProps.errors.area_type)
                      }
                      helperText={
                        formProps.touched.area_type &&
                        formProps.errors.area_type
                      }
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="local_body_type"
                      name="local_body_type"
                      label="Local Body Type"
                      value={formProps.values.local_body_type}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.local_body_type &&
                        Boolean(formProps.errors.local_body_type)
                      }
                      helperText={
                        formProps.touched.local_body_type &&
                        formProps.errors.local_body_type
                      }
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="local_body_name"
                      name="local_body_name"
                      label="Local Body Name"
                      value={formProps.values.local_body_name}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.local_body_name &&
                        Boolean(formProps.errors.local_body_name)
                      }
                      helperText={
                        formProps.touched.local_body_name &&
                        formProps.errors.local_body_name
                      }
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="landmark"
                      name="landmark"
                      label="Landmark"
                      value={formProps.values.landmark}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.landmark &&
                        Boolean(formProps.errors.landmark)
                      }
                      helperText={
                        formProps.touched.landmark &&
                        formProps.errors.landmark
                      }
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="zone"
                      name="zone"
                      label="Zone"
                      value={formProps.values.zone}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.zone &&
                        Boolean(formProps.errors.zone)
                      }
                      helperText={
                        formProps.touched.zone &&
                        formProps.errors.zone
                      }
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="subzone"
                      name="subzone"
                      label="Subzone"
                      value={formProps.values.subzone}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.subzone &&
                        Boolean(formProps.errors.subzone)
                      }
                      helperText={
                        formProps.touched.subzone &&
                        formProps.errors.subzone
                      }
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="land"
                      name="land"
                      label="Land"
                      value={formProps.values.land}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.land &&
                        Boolean(formProps.errors.land)
                      }
                      helperText={
                        formProps.touched.land &&
                        formProps.errors.land
                      }
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="residential"
                      name="residential"
                      label="Residential"
                      value={formProps.values.residential}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.residential &&
                        Boolean(formProps.errors.residential)
                      }
                      helperText={
                        formProps.touched.residential &&
                        formProps.errors.residential
                      }
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="office"
                      name="office"
                      label="Office"
                      value={formProps.values.office}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.office &&
                        Boolean(formProps.errors.office)
                      }
                      helperText={
                        formProps.touched.office &&
                        formProps.errors.office
                      }
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="shop"
                      name="shop"
                      label="Shop"
                      value={formProps.values.shop}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.shop &&
                        Boolean(formProps.errors.shop)
                      }
                      helperText={
                        formProps.touched.shop &&
                        formProps.errors.shop
                      }
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="industrial"
                      name="industrial"
                      label="Industrial"
                      value={formProps.values.industrial}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.industrial &&
                        Boolean(formProps.errors.industrial)
                      }
                      helperText={
                        formProps.touched.industrial &&
                        formProps.errors.industrial
                      }
                    />
                  </Col>
                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="cs_no"
                      name="cs_no"
                      label="CS No."
                      value={formProps.values.cs_no}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.cs_no &&
                        Boolean(formProps.errors.cs_no)
                      }
                      helperText={
                        formProps.touched.cs_no &&
                        formProps.errors.cs_no
                      }
                    />
                  </Col>
                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="tps_no"
                      name="tps_no"
                      label="TPS No."
                      value={formProps.values.tps_no}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.tps_no &&
                        Boolean(formProps.errors.tps_no)
                      }
                      helperText={
                        formProps.touched.tps_no &&
                        formProps.errors.tps_no
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    readyrecknersEditData: (data,user) => dispatch(readyrecknersEditData(data,user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditReadyReackner);
