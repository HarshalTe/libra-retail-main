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
  Label,
} from "reactstrap";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@material-ui/core/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import FormControlLabel from "@mui/material/FormControlLabel";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";

//*Actions
import { postMailTypeMaster } from "../../../Redux/Creators/MailTypeCreators";

function CreateMailType(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);

    let data = {
        type:values.type,
        content:values.content
    };

    console.log("Data:", data);

    props.postMailTypeMaster(data, token);
    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
      <Tooltip title="Create Mail Type" placement="top">
        <Button
          variant="outlined"
          color="success"
          size="small"
          className="ml-3"
          onClick={() => toggle()}
          startIcon={<AddIcon fontSize="inherit" />}
        >
          Create
        </Button>
      </Tooltip>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Create Mail Type</strong>
          </Typography>
        </ModalHeader>
        <Divider />

        <ModalBody>
          <Formik
            initialValues={{
                type: "",
                content: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              
            })}
          >
            {(formProps) => {
              return (
                <Form>
                  <Row className="form-group d-flex align-items-end">
                    <Col md={6} className="">
                      <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        id="type"
                        name="type"
                        label="Mail Type"
                        value={formProps.values.type}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.type &&
                          Boolean(formProps.errors.type)
                        }
                        helperText={
                          formProps.touched.type &&
                          formProps.errors.type
                        }
                      />
                    </Col>
                    <Col md={6} className="">
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Content"
                        id="content"
                        name="content"
                        value={formProps.values.content}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.content &&
                          Boolean(formProps.errors.content)
                        }
                        helperText={
                          formProps.touched.content &&
                          formProps.errors.content
                        }
                      >
                      </TextField>
                    </Col>
                  </Row>

                  <Divider />

                  <Row className="p-4">
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
              );
            }}
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    companies: state.companies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMailTypeMaster: (data, token) =>
      dispatch(postMailTypeMaster(data, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateMailType);
