import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import {
  Row,
  Col,
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
import { assignPropertyPost } from "../../../../Redux/Creators/AssignPropertyCreators";

//*compoenents
import LinerLoader from "components/Loaders/LinerLoader";

function Reasign(props) {
  console.log("props", props.data);
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);

    let data = {
      token: token,
      property_id: values?.property_id,
      assigned_to: values?.assigned_to,
      completed_date: values?.completed_date,
      remarks: values?.remarks,
      // query_status: values?.query_status,
    };

    console.log("data", data);

    props.assignPropertyPost(data);
    setSubmitting(false);
    setModal(true);
  };

  return (
    <div>
     <div
        style={{
          "font-weight": "800",
          "font-size": "1rem",
          "cursor": "pointer",
          "color": "#5e72e6",
        }}
          onClick={() => toggle()}
        >
          <i className="" aria-hidden="true"></i>Reasign Case
        </div>

      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Reasign Case</strong>
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
                assigned_to: "",
                completed_date: moment().format("YYYY-MM-DD"),
                remarks: "",
                query_status: "",

                //*
                application_no: props?.data?.row?.application_no,
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
                    </Row>

                    <Row>
                    </Row>

                    <Row>
                      <Col md={12} classNam="pb=2">
                        <TextField
                          fullWidth
                          required
                          variant="outlined"
                          size="medium"
                          label="Remarks"
                          id="remarks"
                          name="remarks"
                          value={formProps.values.remarks}
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
    getUsersList: (data) => dispatch(getUsersList(data)),
    assignPropertyPost: (data) => dispatch(assignPropertyPost(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reasign);
