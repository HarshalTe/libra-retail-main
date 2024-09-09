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
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import moment from "moment";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";

//*Actions
import { siteInspectorsAssignPostData } from "../../../../../Redux/Creators/SiteInspectorCreators";

function AllocateSiteInspector(props) {
  console.log("siree", props.data);
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);

    let data = {
      token: token,
      pageno: 1,
      pageSize: 10000,
      properties: values.properties,
      user_id: values.user_id,
      scheduled_date:
        values.scheduled_date == moment().format("YYYY-MM-DD")
          ? null
          : values.scheduled_date,
      immediate_status:
        values.scheduled_date == moment().format("YYYY-MM-DD") ? 1 : 0,
    };

    console.log("data:", data);

    props.siteInspectorsAssignPostData(
      data,
      props.data.allocateCaseModal,
      props.data.setSelected
    );
    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
      <Button
        size="small"
        className="ml-2"
        variant="contained"
        color="success"
        onClick={() => {
          setModal(!modal);
        }}
      >
        Allocate
      </Button>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Allocate Site Inspector</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              properties: props.data.propertiesIDs,
              user_id: props.data.userID,
              scheduled_date: moment().format("YYYY-MM-DD"),
              immediate_status: 0,
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              //   bank_name: Yup.string().required("Bank Name is required"),
              //   agreement_end_date: Yup.string().required(
              //     "Agreement end date is required"
              //   ),
            })}
          >
            {(formProps) => (
              <Form>
                <Row>
                  {/* <Col md={12} className="pb-4">
                    <FormControlLabel
                      control={
                        <Switch
                          id="immediate_status"
                          name="immediate_status"
                          value={formProps.values.immediate_status}
                          checked={
                            formProps.values.immediate_status == 1
                              ? true
                              : false
                          }
                          onChange={(event) => {
                            event.target.value == 1
                              ? formProps.setFieldValue("immediate_status", 0)
                              : formProps.setFieldValue("immediate_status", 1);
                          }}
                        />
                      }
                      label="Immediate Status"
                    />
                  </Col> */}

                  {/* {formProps.values.immediate_status == 1 ? (
                    ""
                  ) : ( */}
                  <Col md={12} className="pb-4">
                    <TextField
                      fullWidth
                      type="date"
                      size="small"
                      variant="outlined"
                      id="scheduled_date"
                      name="scheduled_date"
                      label="Scheduled Date"
                      value={formProps.values.scheduled_date}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.scheduled_date &&
                        Boolean(formProps.errors.scheduled_date)
                      }
                      helperText={
                        formProps.touched.scheduled_date &&
                        formProps.errors.scheduled_date
                      }
                    />
                  </Col>
                  {/* )} */}
                </Row>

                <Divider />

                <Row className="pt-4 pd-4">
                  <Col md={6}>
                    <Button
                      size="small"
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
                      size="small"
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
    siteInspectorsAssignPostData: (data, allocateCaseModal, setSelected) =>
      dispatch(
        siteInspectorsAssignPostData(data, allocateCaseModal, setSelected)
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllocateSiteInspector);
