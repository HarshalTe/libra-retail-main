import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  Table,
  Label,
  CardBody,
  FormGroup,
  CardHeader,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";

import TextField from "@material-ui/core/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@material-ui/core";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";

import { Divider } from "@mui/material";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";

//* Actions
import { editRealEstateData } from "../../../../../Redux/Creators/RealEstateStateCreators";

function EditRealEstate(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values In Real Estate Edit:", values);

    let data = {
      token: token,
      pageno: props.data2.pageno,
      pageSize: props.data2.pageSize,
      id: props.data.id,
      link_id: values.link_id,
      value: values.value,
      type: values.type,
    };

    props.editRealEstateData(data);
    setSubmitting(true);
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
          <EditIcon fontSize="medium" />
        </Button>
      </Tooltip>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Edit Real Estate Link(State)</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              link_id: props?.data?.link_id,
              value: props?.data?.value,
              type: props?.data?.type,
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              link_id: Yup.string().required("State is required"),
              type: Yup.string().required("Type is required"),
              value: Yup.string().required("Value is required"),
            })}
          >
            {(formProps) => (
              <Form>
                <Row>
                  <Col md={6} style={{ paddingBottom: "20px" }}>
                    <TextField
                      select
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="link_id"
                      name="link_id"
                      label="State Name *"
                      value={formProps.values.link_id}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.link_id &&
                        Boolean(formProps.errors.link_id)
                      }
                      helperText={
                        formProps.touched.link_id && formProps.errors.link_id
                      }
                    >
                      <MenuItem value={""}>Select</MenuItem>
                      {props.states.states?.map((state) => (
                        <MenuItem value={state.id}>{state?.state}</MenuItem>
                      ))}
                    </TextField>
                  </Col>
                  <Col md={6} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="type"
                      name="type"
                      label="Type *"
                      value={formProps.values.type}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.type && Boolean(formProps.errors.type)
                      }
                      helperText={
                        formProps.touched.type && formProps.errors.type
                      }
                    />
                  </Col>

                  <Col md={12} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Value *"
                      id="value"
                      name="value"
                      value={formProps.values.value}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.value &&
                        Boolean(formProps.errors.value)
                      }
                      helperText={
                        formProps.touched.value && formProps.errors.value
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
    states: state.states,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editRealEstateData: (data) => dispatch(editRealEstateData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditRealEstate);
