import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { MenuItem } from "@material-ui/core";
import {
  Row,
  Col,
  Card,
  Table,
  Label,
  Button,
  CardBody,
  FormGroup,
  CardHeader,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";

import CustomInput from "views/Components/Custom/CustomInput";
import CustomSelect from "views/Views/CustomeSelect";
import Switch from "@mui/material/Switch";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { finalBillsApproveAll } from "../../../../Redux/Creators/FinalBillsCreators";
import { reopenPropertyPost } from "../../../../Redux/Creators/AssignPropertyCreators";
import { finalBillsEditData2 } from "../../../../Redux/Creators/FinalBillsCreators";

function ReopenFinalBill(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const [checked, setChecked] = React.useState(false);
  //  const finalBillId =
  //  props.((row) => row.id)
  //    : [];
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values In Upload file:", values, props);

    let dataId = [props?.data?.id];
    let data = {
      bank_id: props.data?.bank_id,
      amount: props.data?.amount,
      is_reopen_by_admin: 1,
      reason_for_creaditnote: values.reason_for_creaditnote,
      is_creditnote: checked == true ? 1 : 0,
      is_reopen_closed_processed:
        props.data?.is_processed == 1
          ? 1
          : props.data?.is_reopen_closed_processed,
      is_reopen_closed:
        props.data?.is_processed == 0 ? 1 : props.data?.is_reopen_closed,
        is_reopen:"1"
    };
    // let data2 = {
    //     bills: finalBillId,
    //     is_reopened: 1,

    // };

    props.finalBillsEditData2(data, token, dataId);
    // props.reopenPropertyPost(data2, token);

    // props.finalBillsApproveAll(data2,token);

    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={() => {
          setModal(!modal);
        }}
      >
        Reopen Bill
      </Button>
      {/* <Button
        size="sm"
        className="ml-2"
        color="success"
        onClick={() => {
          setModal(!modal);
        }}
      >
        Save
      </Button> */}
      <Modal
        className="modal-inverted modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          Create credit note
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              is_creditnote: "",
              reason_for_creaditnote: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              reason_for_creaditnote: Yup.string().required(
                "Reopen Reason note is required"
              ),
            })}
          >
            {(formProps) => (
              <Form encType="multipart/form-data">
                <Row>
                  <Col md={12}>
                    <Label>Create Credit Note?</Label>
                    No
                    <Switch
                      checked={checked}
                      onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                    Yes
                  </Col>
                  <Col md={12} className="pb-4">
                    {/* <Label>Reopen Reason *</Label> */}
                    <TextField
                      fullWidth
                      select
                      size="small"
                      variant="outlined"
                      id="reason_for_creaditnote"
                      name="reason_for_creaditnote"
                      label="Reopen Reason"
                      value={formProps.values.reason_for_creaditnote}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.reason_for_creaditnote &&
                        Boolean(formProps.errors.reason_for_creaditnote)
                      }
                      helperText={
                        formProps.touched.reason_for_creaditnote &&
                        formProps.errors.reason_for_creaditnote
                      }
                      >
                      <MenuItem value="">Select</MenuItem>
                        {props?.dropdowns?.dropdowns
                          ?.filter((field) => field?.name == "Reopen Reason")[0]
                          ?.drop_down_details?.map((field, i) => (
                          <MenuItem key={i} value={field?.name}>
                              {field?.name}
                            </MenuItem>
                          ))}
                      </TextField>
                  </Col>
                  <Col md={12} className="pb-4">
                    <Label>Reopen Reason *</Label>
                    <TextField
                      multiline
                      rows={4}
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="reason_for_creaditnote"
                      name="reason_for_creaditnote"
                      // label="Reopen Reason"
                      value={formProps.values.reason_for_creaditnote}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.reason_for_creaditnote &&
                        Boolean(formProps.errors.reason_for_creaditnote)
                      }
                      helperText={
                        formProps.touched.reason_for_creaditnote &&
                        formProps.errors.reason_for_creaditnote
                      }
                    ></TextField>
                  </Col>
                </Row>

                <br />

                <Row style={{ justifyContent: "left" }}>
                  <Col md={4}>(*) mandatory</Col>
                </Row>

                <br />

                <Row style={{ justifyContent: "center" }}>
                  <Col md={4}>
                    <Button type="reset" color="danger" block>
                      <b>Reset</b>
                    </Button>
                  </Col>
                  <Col md={4}>
                    <Button
                      type="submit"
                      disabled={formProps.isSubmitting}
                      color="primary"
                      block
                    >
                      Submit
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
    dropdowns: state.dropdowns,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    finalBillsEditData2: (data, token, dataId) =>
      dispatch(finalBillsEditData2(data, token, dataId)),
    finalBillsApproveAll: (data2, token) =>
      dispatch(finalBillsApproveAll(data2, token)),
    reopenPropertyPost: (data2, token) =>
      dispatch(reopenPropertyPost(data2, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReopenFinalBill);
