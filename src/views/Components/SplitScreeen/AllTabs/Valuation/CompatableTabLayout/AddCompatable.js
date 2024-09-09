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
} from "reactstrap";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@material-ui/core/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";

//*Actions
// import { postBrokers } from "../../../Redux/Creators/BrokersCreators";

//*Components
import CompatableTabLayout from "./CompatableTabLayout";

function AddCompatable(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values In under construct projects Data Add:", values);

    let data = {
      token: token,
      pageno: props.data.pageno,
      pageSize: props.data.pageSize,
      name: values.name,
      about: values.about,
      email: values.email,
      dealing_in: values.dealing_in,
      rera_no: values.rera_no,
      nar_no: values.nar_no,
      tread_no: values.tread_no,
      propertyforsell: values.propertyforsell,
      propertyforrent: values.propertyforrent,
      serviceprovided: values.serviceprovided,
      expert_in: values.expert_in,
      operate_in: values.operate_in,
      operating_since: values.operating_since,
      website: values.website,
      mobile_no: values.mobile_no,
    };

    // props.postBrokers(data);
    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
      <Tooltip title="Add Compatable" placement="top">
        <Button
          fullWidth
          variant="outlined"
          color="success"
          size="small"
          className="ml-3"
          onClick={() => toggle()}
          startIcon={<AddIcon fontSize="inherit" />}
        >
          Add Compatable
        </Button>
      </Tooltip>
      <Modal
        className="modal-xl"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Add Compatable</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <CompatableTabLayout />

          <Row>
            <Col md={12}>
              <Button
                color="success"
                variant="contained"
                // disabled={formProps.isSubmitting}
                onClick={() => toggle()}
                fullWidth
                type="submit"
              >
                Submit
              </Button>
            </Col>
          </Row>
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
    // postBrokers: (data) => dispatch(postBrokers(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCompatable);
