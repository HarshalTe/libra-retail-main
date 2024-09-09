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
import { postRescheduleData } from "../../../../Redux/Creators/RescheduleCreators";

//*compoenents
import LinerLoader from "components/Loaders/LinerLoader";
import ScheduleIcon from "@mui/icons-material/Schedule";

function Reschedule(props) {
  console.log("props", props.data, props, props?.data?.row?.application_no);
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);
    let user = {
      token: token,
    };
    // let data = {
    //   property_id: values?.property_id,
    //   application_no: values?.application_no,
    //   reschedule_date: values?.reschedule_date,
    //   schedule_date: values?.schedule_date,
    //   reason: values?.reason,
    //   status: values?.status,
    // //   remarks: values?.remarks,
    //   // query_status: values?.query_status,
    // };

    const data = new FormData();
    data.append("property_id", values.property_id);
    data.append("employee_id", props.login?.login?.user?.id);
    data.append("application_no", values.application_no);
    data.append("reschedule_date", values.reschedule_date);
    data.append("reason", values.reason);
    data.append("status", values.status);
    data.append("schedule_date", values.schedule_date);
    data.append("file", values.file);
    data.append("visit_failed_reason", values.visit_failed_reason);

    props.postRescheduleData(data, user);
    setSubmitting(false);
    setModal(true);
  };

  return (
    <div>
      <div
        style={{
          "font-weight": "800",
          "font-size": "1rem",
          cursor: "pointer",
          color: "#5e72e6",
        }}
        onClick={() => toggle()}
      >
        <i className="" aria-hidden="true"></i>Reschedule Case
      </div>

      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Reschedule Case (Auto Mail Generate to Bankers)</strong>
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
                application_no: props?.data?.row?.application_no,
                reschedule_date: "",
                schedule_date: "",
                reason: "",
                status: "",
                completed_date: moment().format("YYYY-MM-DD"),
                remarks: "",
                query_status: "",
                file: "",

                //*
                // application_no: props?.data?.application_no,
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
                  <Form>
                    <Row>
                      <Col md={4} className="pb-4">
                        <Label>Application Number</Label>
                        <TextField
                          fullWidth
                          size="medium"
                          variant="outlined"
                          id="application_no"
                          name="application_no"
                          //   disabled
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
                      <Col md={4}>
                        <Label>Reschedule Date</Label>
                        <TextField
                          fullWidth
                          variant="outlined"
                          type="date"
                          size="small"
                          //   label="Reschedule Date"
                          id="reschedule_date"
                          name="reschedule_date"
                          value={formProps.values.reschedule_date}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.reschedule_date &&
                            Boolean(formProps.errors.reschedule_date)
                          }
                          helperText={
                            formProps.touched.reschedule_date &&
                            formProps.errors.reschedule_date
                          }
                        />
                      </Col>
                      <Col md={4}>
                        <Label>Schedule Date</Label>
                        <TextField
                          fullWidth
                          variant="outlined"
                          type="date"
                          size="small"
                          //   label="Schedule Date"
                          id="schedule_date"
                          name="schedule_date"
                          value={formProps.values.schedule_date}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.schedule_date &&
                            Boolean(formProps.errors.schedule_date)
                          }
                          helperText={
                            formProps.touched.schedule_date &&
                            formProps.errors.schedule_date
                          }
                        />
                      </Col>
                      <Col md={4} className="pb-4">
                        <TextField
                          fullWidth
                          size="medium"
                          variant="outlined"
                          id="reason"
                          name="reason"
                          //   disabled
                          label="Reason"
                          value={formProps.values.reason}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.reason &&
                            Boolean(formProps.errors.reason)
                          }
                          helperText={
                            formProps.touched.reason && formProps.errors.reason
                          }
                        />
                      </Col>
                      <Col md={4} className="pb-4">
                        <TextField
                          fullWidth
                          size="medium"
                          variant="outlined"
                          id="visit_failed_reason"
                          name="visit_failed_reason"
                          //   disabled
                          label="Visit Failed Reason"
                          value={formProps.values.visit_failed_reason}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.visit_failed_reason &&
                            Boolean(formProps.errors.visit_failed_reason)
                          }
                          helperText={
                            formProps.touched.visit_failed_reason &&
                            formProps.errors.visit_failed_reason
                          }
                        />
                      </Col>
                      <Col md={4} className="pb-4">
                        <TextField
                          fullWidth
                          size="medium"
                          variant="outlined"
                          id="status"
                          name="status"
                          //   disabled
                          label="Status"
                          value={formProps.values.status}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.status &&
                            Boolean(formProps.errors.status)
                          }
                          helperText={
                            formProps.touched.status && formProps.errors.status
                          }
                        />
                      </Col>
                      <Col md={4}>
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
    getUsersList: (data) => dispatch(getUsersList(data)),
    postRescheduleData: (data, user) =>
      dispatch(postRescheduleData(data, user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reschedule);
