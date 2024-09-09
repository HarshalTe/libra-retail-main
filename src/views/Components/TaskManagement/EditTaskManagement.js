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
  Label
} from "reactstrap";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@material-ui/core/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";

//*Actions
import { tasksEditData } from "../../../Redux/Creators/TaskCreators";
import { Propane } from "@mui/icons-material";

function EditTaskManagement(props) {
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
      id:props.data.id,
      task_name: values.task_name,
      task_details: values.task_details,
      assigned_by: props?.login?.login?.user?.id,
      assigned_to: values.assigned_to,
      status: values.status,
      deadline_date: values.deadline_date,
    };

    console.log("data:", data);

    props.tasksEditData(data, user);
    setSubmitting(true);
    setModal(false);
  };
  console.log("props112",props)

  return (
    <div>
      <Tooltip title="Edit Tasks" placement="top">
        <Button
          variant="outlined"
          color="warning"
          size="small"
          className="p-1"
          onClick={() => toggle()}
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
            <strong>Edit Task</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              task_name: props?.data?.task_name,
              task_details: props.data?.task_details,
              assigned_by: props.data?.assigned_by,
              status: props.data?.status,
              assigned_to: props.data?.assigned_to?.id,
              deadline_date: props.data.deadline_date,
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
    tasksEditData: (data,user) => dispatch(tasksEditData(data,user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditTaskManagement);
