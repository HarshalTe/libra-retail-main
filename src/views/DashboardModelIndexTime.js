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
import {dailyReportPincodeGet} from "../Redux/Creators/GraphCreators";
import {dailyReportUserWise} from "../Redux/Creators/GraphCreators";
import {dailyReportDayWise} from "../Redux/Creators/GraphCreators";
import {dailyReportLocationWise} from "../Redux/Creators/GraphCreators";
import {dailyReportBankWise} from "../Redux/Creators/GraphCreators";
import {dailyReportRelease} from "../Redux/Creators/GraphCreators";
import {dailyReportReleaseInTat} from "../Redux/Creators/GraphCreators";
import {dailyReportNotRelease} from "../Redux/Creators/GraphCreators";
import {getHourlypProperty} from "../Redux/Creators/GraphCreators";

function DashboardModelIndex(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values In under construct projects Data Add:", values);
    const token = props.login?.login?.token;
    let data = {
      "start_time":values.start_time,
      "end_time":values.end_time
  };
  console.log("objectvalues",values)
 props.getHourlypProperty(data,token)
    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
      <Tooltip title="Select Date" placement="top">
        <Button
        style={{"color": "#fff","background-color": "#5e72e4"}}
          variant="outlined"
          // color="success"
          size="small"
          className="ml-3"
          onClick={() => toggle()}
          startIcon={<AddIcon fontSize="inherit" />}
        >
          Select Time
        </Button>
      </Tooltip>
      <Modal
        className="modal-sm"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Select Time</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
            end_time: "",
            start_time: "",
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
                <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      type="time"
                      size="small"
                      variant="outlined"
                      id="start_time "
                      name="start_time"
                      label="Start Date"
                      value={formProps.values.start_time}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.start_time &&
                        Boolean(formProps.errors.start_time)
                      }
                      helperText={
                        formProps.touched.start_time &&
                        formProps.errors.start_time
                      }
                    >
                    </TextField>
                  </Col>
                <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      type="time"
                      size="small"
                      variant="outlined"
                      id="end_time"
                      name="end_time"
                      label="End Date"
                      value={formProps.values.end_time}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.end_time &&
                        Boolean(formProps.errors.end_time)
                      }
                      helperText={
                        formProps.touched.end_time &&
                        formProps.errors.end_time
                      }
                    >
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
    dailyReportPincodeGet: (data2,token) => dispatch(dailyReportPincodeGet(data2,token)),
    dailyReportUserWise: (data2,token) => dispatch(dailyReportUserWise(data2,token)),
    dailyReportDayWise: (data2,token) => dispatch(dailyReportDayWise(data2,token)),
    dailyReportLocationWise: (data2,token) => dispatch(dailyReportLocationWise(data2,token)),
    dailyReportBankWise: (data2,token) => dispatch(dailyReportBankWise(data2,token)),
    dailyReportRelease: (data2,token) => dispatch(dailyReportRelease(data2,token)),
    dailyReportReleaseInTat: (data2,token) => dispatch(dailyReportReleaseInTat(data2,token)),
    dailyReportNotRelease: (data2,token) => dispatch(dailyReportNotRelease(data2,token)),
    getHourlypProperty: (data,token) => dispatch(getHourlypProperty(data,token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardModelIndex);
