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

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";

//*Actions
import {MontlyReportPostGetData} from "../Redux/Creators/GraphCreators";
import {WeeklyReportPostGetData} from "../Redux/Creators/GraphCreators";

function DashboardModel(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values In under construct projects Data Add:", values);
    const token = props.login?.login?.token;
    let data = {
        "isCompleted":values.isCompleted,
      };

      props.MontlyReportPostGetData(data,token);
      props.WeeklyReportPostGetData(data,token);
    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
      <Tooltip title="Select Cases" placement="top">
        <Button
         style={{"color": "#fff","background-color": "#5e72e4"}}
          variant="outlined"
        //   size="small"
          className="mr-2"
          onClick={() => toggle()}
          startIcon={<AddIcon fontSize="inherit" />}
        >
          Select Cases
        </Button>
      </Tooltip>
      <Modal
        className="modal-sm"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Select Cases</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
            isCompleted: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
                // isCompleted: Yup.string().required("Data is required"),
            })}
          >
            {(formProps) =>
            (
              <Form>
                <Row>
                <Col md={8} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      size="small"
                      variant="outlined"
                      id="iscompleted"
                      name="iscompleted"
                      label="Completed"
                      value={formProps.values.iscompleted}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.iscompleted &&
                        Boolean(formProps.errors.iscompleted)
                      }
                      helperText={
                        formProps.touched.iscompleted &&
                        formProps.errors.iscompleted
                      }
                    >
                         <MenuItem value="">Select</MenuItem>
                                <MenuItem value={0}>Ongoing Cases</MenuItem>
                                <MenuItem value={1}>Completed Cases</MenuItem>
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
    graph: state.graph,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    MontlyReportPostGetData: (data,token) => dispatch(MontlyReportPostGetData(data,token)),
    WeeklyReportPostGetData: (data,token) => dispatch(WeeklyReportPostGetData(data,token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardModel);
