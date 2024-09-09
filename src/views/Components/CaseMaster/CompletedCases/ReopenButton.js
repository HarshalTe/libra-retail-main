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

import { Divider } from "@mui/material";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";

import DateFnsUtils from "@date-io/date-fns";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import HistoryIcon from "@mui/icons-material/History";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";

//*Actions
import { getUsersList } from "../../../../Redux/Creators/UsersCreators";
import { reopenPropertyPost } from "../../../../Redux/Creators/AssignPropertyCreators";
import { editPropertiesData } from "../../../../Redux/Creators/ViewWorkInProgressCreators";

//*compoenents
import LinerLoader from "components/Loaders/LinerLoader";

function ReopenButton(props) {
  console.log("props", props.data);
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);

    const dataReOpen = {
      id:values?.property_id,
      is_reopened:values?.is_reopened,
      token:token,
    }
    const data = new FormData();

    data.append("property_id", values?.property_id);
    data.append("assigned_to", values?.assigned_to);
    data.append("reason", values?.reason);
    data.append("image", values?.image);

    props.reopenPropertyPost(data, token,dataReOpen);
    // const value = 0;
// props.editPropertiesData(data2, props.setValue, value);
    
    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
      <MenuItem
        disableRipple
        className="ml-3"
        color="warning"
        onClick={() => {
          setModal(!modal);
        }}
      >
        <AssignmentIndIcon color="warning" />
      </MenuItem>

      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Reopen Case</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        {props?.users?.isLoading ? (
          <ModalBody>
            <LinerLoader />
          </ModalBody>
        ) : (
          <ModalBody>
            <Formik
              initialValues={{
                property_id: props?.data?.id,
                is_reopened: props?.data?.row?.is_reopened==null? 0+1 : +props?.data?.row?.is_reopened+1,
                assigned_to: "",
                reason: "",
                image: "",

                //*
                application_no: props?.data?.application_no,
              }}
              onSubmit={handleSubmit}
              // validationSchema={Yup.object().shape({
              //   // project_name: Yup.string().required("Project Name is required"),
              // })}
            >
              {(formProps) => {
                const userProps = {
                  options: props?.user?.isLoading
                    ? []
                    : props?.users?.users?.data
                        ?.filter(
                          (user) =>
                            user.role != "Bill-1" ||
                            user.role != "Bill-2" ||
                            user.role != "Bill-3"
                        )
                        .map((user) => user),
                };

                console.log("user", formProps.values.assigned_to);

                return (
                  <Form enctype="multipart/form-data">
                    <Row>
                      <Col md={4} className="pb-4">
                        <TextField
                          fullWidth
                          size="medium"
                          variant="outlined"
                          id="application_no"
                          name="application_no"
                          disabled
                          label="Application Number"
                          value={formProps.values.application_no}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.application_no &&
                            Boolean(formProps.errors.application_no)
                          }
                          helperText={
                            formProps.touched.application_no &&
                            formProps.errors.application_no
                          }
                        />
                      </Col>
                      <Col md={8}>
                        <Autocomplete
                          id="contact-autocomplete"
                          options={userProps.options}
                          getOptionLabel={(user) =>
                            `${user?.name} (${user?.role})`
                          }
                          onChange={(e, value) =>
                            formProps.setFieldValue(
                              "assigned_to",
                              value?.id || ""
                            )
                          }
                          onOpen={formProps.handleBlur}
                          includeInputInList
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              error={Boolean(
                                formProps.touched.assigned_to &&
                                  formProps.errors.assigned_to
                              )}
                              fullWidth
                              helperText={
                                formProps.touched.assigned_to &&
                                formProps.errors.assigned_to
                              }
                              label="Assign To"
                              name="assigned_to"
                              variant="outlined"
                            />
                          )}
                        />
                      </Col>

                      <Col md={12} classNam="pb=5">
                        <TextField
                          fullWidth
                          type="file"
                          focused
                          size="small"
                          variant="outlined"
                          id="image"
                          name="image"
                          label="File Upload"
                          onChange={(event) => {
                            formProps.setFieldValue(
                              "image",
                              event.currentTarget.files[0]
                            );
                            console.log("image", formProps.values.image);
                          }}
                        />
                      </Col>
                    </Row>

                    {/* <Row>
                       <Col md={4} classNam="pb=2">
                      <TextField
                        fullWidth
                        type="date"
                        size="small"
                        variant="outlined"
                        id="completed_date"
                        name="completed_date"
                        label="Completed Date"
                        value={formProps.values.completed_date}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.completed_date &&
                          Boolean(formProps.errors.completed_date)
                        }
                        helperText={
                          formProps.touched.completed_date &&
                          formProps.errors.completed_date
                        }
                      />
                    </Col> */}

                    {/* <Col md={4} classNam="pb=2">
                      <TextField
                        fullWidth
                        size="small"
                        select
                        variant="outlined"
                        id="query_status"
                        name="query_status"
                        label="Query Status"
                        value={formProps.values.query_status}
                        onChange={formProps.handleChange}
                      >
                        <MenuItem value={""}>Select</MenuItem>
                        <MenuItem value={1}>Active</MenuItem>
                        <MenuItem value={0}>InActive</MenuItem>
                      </TextField>
                    </Col> 
                    </Row> */}

                    <br />

                    <Row>
                      <Col md={12} classNam="pb=2">
                        <TextField
                          fullWidth
                          required
                          variant="outlined"
                          size="medium"
                          label="Reason"
                          id="reason"
                          name="reason"
                          value={formProps.values.reason}
                          onChange={formProps.handleChange}
                        />
                      </Col>
                    </Row>

                    <br />

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
                );
              }}
            </Formik>
          </ModalBody>
        )}
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reopenPropertyPost: (data, token,dataReOpen) =>
      dispatch(reopenPropertyPost(data, token,dataReOpen)),
      editPropertiesData: (data, setValue, value) =>
      dispatch(editPropertiesData(data, setValue, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReopenButton);
