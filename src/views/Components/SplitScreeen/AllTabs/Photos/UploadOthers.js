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
import { editPropertyPhotos } from "../../../../../Redux/Creators/PropertyPhotographsCreators";

function UploadOthers(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values", values);

    const data = new FormData();

    data.append("property_id", values.property_id);
    data.append("name", values.name);
    data.append("file", values.file);
    data.append("desc", values.desc);
    data.append("is_ok", values.is_ok);

    props.editPropertyPhotos(data, token);
    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
      <Button
        size="medium"
        className="ml-2"
        variant="contained"
        color="success"
        onClick={() => {
          setModal(!modal);
        }}
      >
        Upload Extra Photographs
      </Button>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Upload Photos</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              property_id: props?.property?.property?.id,
              name: "others",
              file: "",
              is_ok: 1,
              desc:"photograph"
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              file: Yup.string().required("File is required"),
            })}
          >
            {(formProps) => (
              <Form enctype="multipart/form-data">
                <Row>
                  {/* <Col md={6} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="File Name *"
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
                  </Col> */}

                  <Col md={6}>
                    <TextField
                      fullWidth
                      type="file"
                      focused
                      size="small"
                      variant="outlined"
                      id="file"
                      name="file"
                      label="File Upload"
                      onChange={(event) => {
                        formProps.setFieldValue(
                          "file",
                          event.currentTarget.files[0]
                        );
                        console.log("file", formProps.values.file);
                      }}
                    />
                  </Col>
                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      id="desc"
                      name="desc"
                      label="Type of Photo"
                      variant="outlined"
                      value={formProps.values.desc}
                      onChange={formProps.handleChange}
                    >
                    
                    <MenuItem value="">Select</MenuItem>
                          <MenuItem value="photograph">Photograph</MenuItem>
                          <MenuItem value="sketch">Sketch</MenuItem>
                          <MenuItem value="plan">Plan</MenuItem>
                    </TextField>
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
    editPropertyPhotos: (data, token) =>
      dispatch(editPropertyPhotos(data, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadOthers);
