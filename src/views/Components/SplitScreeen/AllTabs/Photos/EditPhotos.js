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
import Editor from "./Editor"

function EditPhotos(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values", values);

    const data = new FormData();

    data.append("id", values.id);
    data.append("property_id", values.property_id);
    data.append("name", values.name);
    data.append("file", values.file);

    props.editPropertyPhotos(data, token);
    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
      <Button
        size="small"
        className="mr-5"
        variant="contained"
        color="warning"
        onClick={() => {
          setModal(!modal);
        }}
      >
        Edit
      </Button>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Edit Photos</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              id: props?.data?.id,
              property_id: props?.data?.property_id,
              name: props?.data?.name,
              file: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("File Name is required"),
              file: Yup.string().required("File is required"),
            })}
          >
            {(formProps) => (
              <Form enctype="multipart/form-data">
                <Row>
                  <Col md={6} style={{ paddingBottom: "20px" }}>
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
                  </Col>

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
                </Row>
                {/* <Editor/> */}

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
    editPropertyPhotos: (data, token) =>
      dispatch(editPropertyPhotos(data, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPhotos);
