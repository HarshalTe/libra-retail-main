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
  InputGroup,
  Label,
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
import { special_remarksPostData } from "../../../Redux/Creators/ProjectsCreators";
import CustomTextField from "./../../../components/MuiComponents/CustomTextField";
import DeleteButton from "Helpers/DeleteButton";
import AddButton from "Helpers/AddButton";

function RemarkUpdate(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);
let user={
    token:token
}
    let data = {
        project_id: props.data.id,
      remark_type: values.remark_type,
      remark_name: values.remark_name,
      status: values.status,
      
    };

    console.log("data:", data);

    props.special_remarksPostData(data,user);
    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
        <div
         style={{
          // "font-family": "Roboto, Helvetica, Arial, sans-serif",
          "font-weight": "800",
          "font-size": "1rem",
          "cursor": "pointer",
          "color": "#5e72e6",
          // "margin": "-15px 0 -6px 0",          
          // "padding": "0 48px"
        }}
          onClick={() => toggle()}
        >
          <i className="" aria-hidden="true"></i>Add Remark
        </div>
      {/* <Tooltip title="Create Report" placement="top">
        <Button
          variant="outlined"
          color="primary"
          size="small"
          className="p-1 ml-4"
          onClick={() => toggle()}
        >
          Add Remark
        </Button>
      </Tooltip> */}
      <Modal
        className="modal-xl"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Add Remark</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              remark_type: "",
              remark_name: "",
              status: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({})}
          >
            {(formProps) => (
              <Form>
                <Row className="form-group">
                <Col md={4}>
                              <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="remark_type"
                                name="remark_type"
                                label="Remark Type"
                                value={formProps.values.remark_type}
                                onChange={formProps.handleChange}
                              />
                            </Col>
                            <Col md={4}>
                              <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="remark_name"
                                name="remark_name"
                                label="Remarks"
                                value={formProps.values.remark_name}
                                onChange={formProps.handleChange}
                              />
                            </Col>
                            <Col md={4}>
                            
                            <TextField
                      fullWidth
                      select
                      id="status"
                      name="status"
                      label="status"
                      variant="outlined"
                      value={formProps.values.status}
                      onChange={formProps.handleChange}
                      >
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value={0}>Important (This will show in report)</MenuItem>
                      <MenuItem value={1}>General</MenuItem>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    special_remarksPostData: (data,user) => dispatch(special_remarksPostData(data,user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemarkUpdate);
