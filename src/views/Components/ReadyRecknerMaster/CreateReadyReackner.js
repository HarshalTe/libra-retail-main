import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@material-ui/core/TextField";
import { Divider } from "@mui/material";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";

//*Actions
import {getReadyrecknersList} from "../../../Redux/Creators/ReadyRecknersCreators"
import {readyrecknersEditData} from "../../../Redux/Creators/ReadyRecknersCreators"
import {readyrecknersPostData} from "../../../Redux/Creators/ReadyRecknersCreators"
import {DeleteReadyreckners} from "../../../Redux/Creators/ReadyRecknersCreators"

function CreateReadyReackner(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);
    let users = {
      token: token,
      // pageno: props.data.pageno,
      // pageSize: props.data.pageSize,

    }
    let data = {
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

    props.readyrecknersPostData(data,users);
    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
      <Tooltip title="Add Ready Reckoners" placement="top">
        <Button
        style={{"width": "auto","float": "right"}}
          variant="outlined"
          color="success"
          size="small"
          className=" mt-3 mr-4"
          onClick={() => toggle()}
          fullWidth
          startIcon={<AddIcon fontSize="inherit" />}
        >
          Create Ready Reckoner
        </Button>
      </Tooltip>
      <Modal
        className="modal-xl"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Add Ready Reckoners</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
          village_name: "",
        area_type: "",
        local_body_type: "",
        local_body_name: "",
        landmark: "",
        zone: "",
        subzon: "",
        land: "",
        residential: "",
        office: "",
        shop: "",
        industrial: "",
        cs_no: "",
        tps_no: ""
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
    getReadyrecknersList: (data) => dispatch(getReadyrecknersList(data)),
    readyrecknersEditData: (data) => dispatch(readyrecknersEditData(data)),
    readyrecknersPostData: (data,user) => dispatch(readyrecknersPostData(data,user)),
    DeleteReadyreckners: (data) => dispatch(DeleteReadyreckners(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateReadyReackner);
