import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
  Row,
  Col,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
} from "reactstrap";

import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import Tooltip from "@mui/material/Tooltip";

import TextField from "@material-ui/core/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@material-ui/core";

import { Divider } from "@mui/material";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";

//* Actions
import { queriesPostData } from "../../../Redux/Creators/QueriesCreators";

function CreateQueries(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values Add:", values);

    let data = {
      token: token,
      file: values.file,
      remark: values.remark,
      subject: values.subject,
      deadline: values.deadline,

      //*siff edit mai
    };

    console.log("data add", data);

    props.queriesPostData(data);
    setSubmitting(true);
    setModal(false);
  };

  const branchProps = {
    options: props?.branches?.isLoading
      ? []
      : props?.branches?.branches?.data?.map((branch) => branch?.branch_name),
  };

  const bankProps = {
    options: props?.banks?.isLoading
      ? []
      : props?.banks?.banks?.data?.map((bank) => bank?.bank_name),
  };

  const propertiesProps = {
    options: props?.properties?.isLoading
      ? []
      : props?.properties?.properties?.data?.map(
          (property) => property?.application_no
        ),
  };

  return (
    <div>
      <Button
        size="small"
        variant="contained"
        className="ml-2"
        color="success"
        onClick={() => {
          setModal(!modal);
        }}
      >
        Create
      </Button>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Create Queries</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              user_id: props.login.login.user.id,
              subject: "",
              remark: "",
              file: "",
              deadline: moment().format("YYYY-MM-DD"),

            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              //   branch_name: Yup.string().required("Branch Name is required"),
              //   bank_name: Yup.string().required("Bank Name is required"),
              // application_no: Yup.string().required(
              //   "Application Number is required"
              // ),
              // remark: Yup.string().required("Remark is required"),
            })}
          >
            {(formProps) => (
              <Form>
                <Row>
                  <Col md={4}>
                    <TextField
                      fullWidth
                      size="small"
                      id="subject"
                      name="subject"
                      label="Subject"
                      variant="outlined"
                      value={formProps.values.subject}
                      onChange={formProps.handleChange}
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="date"
                      size="small"
                      label="Deadline"
                      id="deadline"
                      name="deadline"
                      value={formProps.values.deadline}
                      onChange={formProps.handleChange}
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      file
                      size="small"
                      variant="outlined"
                      id="file"
                      name="file"
                      label="file Upload"
                      value={formProps.values.file}
                      onChange={formProps.handleChange}
                    >
                    </TextField>
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="date"
                      size="small"
                      label="Resolved date"
                      id="resolved_date"
                      name="resolved_date"
                      value={formProps.values.resolved_date}
                      onChange={formProps.handleChange}
                    />
                  </Col>

                  <Col md={12} className="">
                    <Label>Remark</Label>
                    <TextareaAutosize
                    //  aria-label="minimum height"
                    style={{ width: 725, margin:"auto" }}
                     minRows={6}
                        fullWidth
                        // variant="outlined"
                        size="large"
                        label="Type of Instructions"
                        id="remark"
                        name="remark"
                        value={formProps.values.remark}
                        onChange={formProps.handleChange}
                       
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
    banks: state.banks,
    branches: state.branches,
    properties: state.properties,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    queriesPostData: (data) => dispatch(queriesPostData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateQueries);
