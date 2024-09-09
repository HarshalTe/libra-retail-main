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
  Table,
  Label,
} from "reactstrap";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
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
import { editMailTimeMaster } from "../../../Redux/Creators/MailTimeCreators";

function EditMailTime(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);

    let data = {
        id: props?.data?.id,
        time:values.time,
        mail_type_id:values.mail_type_id,
        mails:values.mails
    };

    console.log("Data:", data);
    
    props.editMailTimeMaster(data, token);
    setSubmitting(true);
    setModal(false);
  };
  
  console.log("Data:", props?.mailType.mailType);
  return (
    <div>
      <Tooltip title="Edit Mail Time" placement="top">
        <Button
          variant="outlined"
          color="success"
          size="small"
          className="ml-3"
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
            <strong>Edit Mail Time</strong>
          </Typography>
        </ModalHeader>
        <Divider />

        <ModalBody>
          <Formik
            initialValues={{
                mail_type_id: props?.data?.id,
                time: props?.data?.time,
                mails: props?.data?.mails,
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
            })}
          >
            {(formProps) => {
              const companyProps = {
                options: props?.mailtype?.isLoading
                  ? []
                  : props?.mailtype?.mailtype?.data?.map(
                      (company) => company
                    ),
              };
              return (
                <Form>
                  <Row className="form-group">
                  <Col md={6} className="">
                      <TextField
                        fullWidth
                        select
                        variant="outlined"
                        size="small"
                        label="Mail Type"
                        id="mail_type_id"
                        name="mail_type_id"
                        value={formProps.values.mail_type_id}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.mail_type_id &&
                          Boolean(formProps.errors.mail_type_id)
                        }
                        helperText={
                          formProps.touched.mail_type_id &&
                          formProps.errors.mail_type_id
                        }
                      >
                        <MenuItem value={""}>Select</MenuItem>
                        {props?.mailType.mailType.map((row,i)=>(
                        <MenuItem value={row?.id}>{row?.type}</MenuItem>
                        ))}
                      </TextField>
                    </Col>

                    <Col md={6} className="">
                      <TextField
                        fullWidth
                        type="time"
                        variant="outlined"
                        size="small"
                        label="Time"
                        id="time"
                        name="time"
                        value={formProps.values.time}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.time &&
                          Boolean(formProps.errors.time)
                        }
                        helperText={
                          formProps.touched.time &&
                          formProps.errors.time
                        }
                      />
                    </Col>
                    
                  </Row>
                  <Row className="pt-4 pb-2">
                      <Col md={12}>
                        <FieldArray
                          name="mails"
                          render={(arrayHelpers) => (
                            <div>
                              <Row>
                                <Col md={10}>
                                  <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    id="email"
                                    name="email"
                                    label="Email"
                                    value={formProps.values.email}
                                    onChange={formProps.handleChange}
                                    error={
                                      formProps.touched.email &&
                                      Boolean(formProps.errors.email)
                                    }
                                    helperText={
                                      formProps.touched.email &&
                                      formProps.errors.email
                                    }
                                  />
                                </Col>

                                <Col md={2}>
                                  <Button
                                    color="success"
                                    variant="contained"
                                    onClick={() => {
                                      arrayHelpers.push(
                                        formProps.values.email,
                                      );
                                    }}
                                    size="large"
                                  >
                                    <AddIcon fontSize="inherit" />
                                  </Button>
                                </Col>
                              </Row>
                              <Table size="sm" className="mt-3">
                                <thead>
                                  <tr>
                                    <th>Sr No</th>
                                    <th>Email</th>
                                    <th>Delete</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {formProps?.values?.mails?.map(
                                    (area, index) => {
                                      return (
                                        <tr key={index}>
                                          <td>{index + 1}</td>
                                          <td>
                                            <TextField
                                              fullWidth
                                              size="small"
                                              label="Email"
                                              variant="outlined"
                                              name={`mails.${index}`}
                                              value={area}
                                              id="email"
                                              onChange={formProps.handleChange}
                                            />
                                          </td>
                                          <td>
                                            <Button
                                              color="error"
                                              size="large"
                                              variant="contained"
                                              onClick={() =>
                                                arrayHelpers.remove(index)
                                              }
                                              // startIcon={
                                              //   <DeleteIcon fontSize="inherit" />
                                              // }
                                            >
                                              {/* Delete */}
                                              <DeleteIcon fontSize="inherit" />
                                            </Button>
                                          </td>
                                        </tr>
                                      );
                                    }
                                  )}
                                </tbody>
                              </Table>
                            </div>
                          )}
                        />
                      </Col>
                    </Row>
                    {console.log(formProps.values.mails)}

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
    mailTime: state.mailTime,
    mailType: state.mailType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editMailTimeMaster: (data, token) =>
      dispatch(editMailTimeMaster(data, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditMailTime);
