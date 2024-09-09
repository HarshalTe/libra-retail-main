import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";

import {
  Row,
  Col,
  Card,
  CardBody, CardHeader,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@material-ui/core/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";

//*Actions
import { tasksPostData } from "../../../Redux/Creators/TaskCreators";
import { PropaneRounded } from "@mui/icons-material";

function CreateTaskManagement(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);
    let user = {
      token: token,
      pageno: props.data.pageno,
      pageSize: props.data.pageSize,
    }

    let data = {
      task_name: values.task_name,
      task_details: values.task_details,
      assigned_by: props?.login?.login?.user?.id,
      assigned_to: values.assigned_to,
      status: values.status,
      tat: values.tat,
      deadline_date: values.deadline_date,
    };
console.log("objectdata",data)
    props.tasksPostData(data,user);
    setSubmitting(true);
    setModal(false);
  };
  const projectsProps = {
    options: props?.users?.isLoading
      ? []
      : props?.users?.users?.data?.map((project) => project),
  };
  // const projectsProps = {
  //   options: props?.users?.isLoading
  //     ? []
  //     : props?.users?.users?.data?.map((user) => user),
  // };


  return (
    <div>
      <Tooltip title="Add Task" placement="top">
        <Button
          variant="outlined"
          color="success"
          style={{"width":"max-content"}}
          size="small"
          className="ml-3"
          onClick={() => toggle()}
          fullWidth
          startIcon={<AddIcon fontSize="inherit" />}
          >
          Create Task Management
        </Button>
      </Tooltip>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Add Task</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              task_name: "",
              task_details: "",
              assigned_by: props?.login?.login?.user,
              status: "",
              tat: "",
              deadline_date: moment().format("YYYY-MM-DD"),
              assigned_to: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              task_name: Yup.string().required("Task Name is required"),
            })}
          >
            {(formProps) => (
              <Form>
                <Row className="form-group">
                  <Col md={6} className="">
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="task_name"
                      name="task_name"
                      label="Task Name"
                      value={formProps.values.task_name}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.task_name &&
                        Boolean(formProps.errors.task_name)
                      }
                      helperText={
                        formProps.touched.task_name &&
                        formProps.errors.task_name
                      }
                    />
                  </Col>
                  <Col md={6} className="">
                    <TextField
                      fullWidth
                      size="small"
                      
                      variant="outlined"
                      id="task_details"
                      name="task_details"
                      label="Task Details"
                      value={formProps.values.task_details}
                      onChange={formProps.handleChange}
                    />
                  </Col>
                </Row>
                <Row className="form-group">

                  <Col md={6} className="mb-1">
                    <TextField
                      fullWidth
                      select
                      type="select"
                      variant="outlined"
                      size="small"
                      label="Assigned To"
                      id="assigned_to"
                      name="assigned_to"
                      value={formProps.values.assigned_to}
                      onChange={formProps.handleChange}
                    >
                      <MenuItem value="">Select</MenuItem>
                      {props.users?.users?.data?.map((user , id)=>{
                         return(
                        <MenuItem value={user.id}>{user.name}</MenuItem>
                        )
                      })}
                    </TextField>
                    
                  </Col>
                 
                  <Col md={6} className="mb-1">
                  <TextField
                      fullWidth
                      variant="outlined"
                      type="date"
                      size="small"
                      label="Deadline Date"
                      id="deadline_date"
                      name="deadline_date"
                      value={formProps.values.deadline_date}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.deadline_date &&
                        Boolean(formProps.errors.deadline_date)
                      }
                      helperText={
                        formProps.touched.deadline_date &&
                        formProps.errors.deadline_date
                      }
                    />
                  </Col>
                  </Row>
                <Row className="form-group">
                  <Col md={6} className="">
                    <TextField
                      fullWidth
                      select
                      variant="outlined"
                      size="small"
                      label="Task Status"
                      id="status"
                      name="status"
                      value={formProps.values.status}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.status &&
                        Boolean(formProps.errors.status)
                      }
                      helperText={
                        formProps.touched.status && formProps.errors.status
                      }
                    >
                       <MenuItem value="">Select</MenuItem>
                        <MenuItem value={0}>No</MenuItem>
                        <MenuItem value={1}>Yes</MenuItem>
                    </TextField>
                  </Col>
                  <Col md={6} className="">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="TAT"
                      id="tat"
                      name="tat"
                      value={formProps.values.tat}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.tat &&
                        Boolean(formProps.errors.tat)
                      }
                      helperText={
                        formProps.touched.tat && formProps.errors.tat
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
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    tasksPostData: (data,user) => dispatch(tasksPostData(data,user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTaskManagement);
