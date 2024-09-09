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
} from "reactstrap";
import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@material-ui/core/TextField";
import Select from "@mui/material/Select";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Divider, Tooltip, IconButton } from "@material-ui/core";

//*
import { EditMasterDocumentsData } from "../../../Redux/Creators/DropdownDetailsCreators";

function EditMasterDocuments(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => {
    console.log("modal", modal);
    setModal(!modal);
    console.log("modal", modal);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values In Edit Users:", values);

    let data = {
      token: token,
      pageno: props.data.pageno,
      pageSize: props.data.pageSize,
      id: props?.data?.id,
      dropdown_id: values.dropdown_id,
      name: values.name,
    };

    props.EditMasterDocumentsData(data);
    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
      <Button
        size="small"
        // className="ml-2"
        variant="contained"
        color="warning"
        onClick={() => {
          setModal(!modal);
        }}
        startIcon={<EditIcon />}
      >
        Edit
        {/* <EditIcon /> */}
      </Button>
      {/* <MenuItem
        onClick={() => {
          {
            {
              props.setOpenEdit(!props.openEdit);
            }
            {
              props.handleClose();
            }
          }
        }}
        disableRipple
        color="warning"
      >
        <EditIcon />
        Edit
      </MenuItem> */}

      {/* <Tooltip title="Edit">
        <IconButton
          onClick={() => {
            setModal(!modal);
          }}
        >
          <EditIcon size="small" color="primary" />
        </IconButton>
      </Tooltip> */}

      <Modal className="modal-lg" isOpen={modal} toggle={() => toggle()}>
        <ModalHeader toggle={() => toggle()}>Edit Master Documents</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              dropdown_id: props.data.dropdown_id,
              name: props.data.name,
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              dropdown_id: Yup.string().required("Description is required"),
              name: Yup.string().required("Value is required"),
            })}
          >
            {(formProps) => (
              <Form>
                <Row>
                  <Col md={6} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      size="small"
                      select
                      // disabled
                      variant="outlined"
                      id="dropdown_id"
                      name="dropdown_id"
                      label="Description *"
                      value={formProps.values.dropdown_id}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.dropdown_id &&
                        Boolean(formProps.errors.dropdown_id)
                      }
                      helperText={
                        formProps.touched.dropdown_id &&
                        formProps.errors.dropdown_id
                      }
                    >
                      <MenuItem value={""}>Select Description</MenuItem>

                      {props?.dropdowns?.dropdowns?.map((dropdown) => (
                        <MenuItem value={dropdown.id}>{dropdown.name}</MenuItem>
                      ))}
                    </TextField>
                  </Col>
                  <Col md={6} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Value *"
                      id="name"
                      name="name"
                      value={formProps.values.name}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.name && Boolean(formProps.errors.name)
                      }
                      helperText={
                        formProps.touched.name && formProps.errors.name
                      }
                    />
                  </Col>
                </Row>

                <Divider />

                <Row style={{ justifyContent: "center" }} className="pt-4">
                  <Col>
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

                  <Col>
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
    dropdownDetails: state.dropdownDetails,
    dropdowns: state.dropdowns,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    EditMasterDocumentsData: (data) => dispatch(EditMasterDocumentsData(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditMasterDocuments);
