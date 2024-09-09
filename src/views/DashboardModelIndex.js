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

function DashboardModelIndex(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values In under construct projects Data Add:", values);
    const token = props.login?.login?.token;
    let data2 = {
      "startDate":values.startdate,
      "endDate":values.enddate
  };
  console.log("objectendDate",data2,values)
  if (props.name=="dailyPincodeReport") {
    console.log("object4041")
    props.dailyReportPincodeGet(data2,token);
    console.log("object4042")
  } else if (props.name=="dailyReportUserWise") {
    props.dailyReportUserWise(data2,token);
    console.log("object4043")
  } else if (props.name=="dailyReportDayWise") {
    props.dailyReportDayWise(data2,token);
    console.log("object4044")
  } else if (props.name=="dailyReportRelease") {
    props.dailyReportRelease(data2,token);
    console.log("object4045")
  } else if (props.name=="dailyReportLocationWise") {
    props.dailyReportLocationWise(data2,token);
    console.log("object4045")
  } else if (props.name=="dailyReportReleaseInTat") {
    props.dailyReportReleaseInTat(data2,token);
    console.log("object4045")
  } else if (props.name=="dailyBankWiseReport") {
    props.dailyReportBankWise(data2,token);
    console.log("object4046")
  } else if (props.name=="DailyReportNotRelease") {
    props.dailyReportNotRelease(data2,token);
    console.log("object4046")
  } else {
    console.log("object404")
  }
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
          Select Date
        </Button>
      </Tooltip>
      <Modal
        className="modal-sm"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Select Date</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
            endDate: "",
            startDate: "",
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
                      type="date"
                      size="small"
                      variant="outlined"
                      id="startDate "
                      name="startdate"
                      label="Start Date"
                      value={formProps.values.startdate}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.startdate &&
                        Boolean(formProps.errors.startdate)
                      }
                      helperText={
                        formProps.touched.startdate &&
                        formProps.errors.startdate
                      }
                    >
                    </TextField>
                  </Col>
                <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      type="date"
                      size="small"
                      variant="outlined"
                      id="enddate"
                      name="enddate"
                      label="End Date"
                      value={formProps.values.enddate}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.enddate &&
                        Boolean(formProps.errors.enddate)
                      }
                      helperText={
                        formProps.touched.enddate &&
                        formProps.errors.enddate
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardModelIndex);
