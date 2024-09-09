import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { Row, Col, Table, Modal, ModalHeader, ModalBody, Label } from "reactstrap";

import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import Tooltip from "@mui/material/Tooltip";

import TextField from "@material-ui/core/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, TextareaAutosize } from "@material-ui/core";

import { Divider } from "@mui/material";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";

//*
import moment from "moment";

//* Actions
import { agreementsPostData } from "../../../../Redux/Creators/AgreementRenewalCreators";
import { agreementClose } from "../../../../Redux/Creators/AgreementRenewalCreators";
// import { getBranchesPage } from "../../../Redux/Creators/BranchesCreators";

//*download
import axios from "axios";
import fileDownload from "js-file-download";

function RenewAgreement(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [actionSelect, setActionSelect] = React.useState(props?.data?.is_close);

  const handleActionSelectChange = (event) => {
    setActionSelect(event.target.value);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values Create new Renewal:", values);

    //form data mai aayega
    const data = new FormData();
    data.append("token", token);
    data.append("bank_id", values.bank_id);
    data.append("start_date", values.start_date);
    data.append("end_date", values.end_date);
    data.append("aggrement_copy", values.aggrement_copy);
    data.append("rate_card", values.rate_card);
    data.append("is_close", actionSelect);
    data.append("remarks", values.remarks);

    props.agreementsPostData(data);
    setSubmitting(true);
    setModal(false);
  };

  const flatProps = {
    options: props?.banks?.isLoading
      ? []
      : props?.banks?.banks?.data?.map((bank) => bank.bank_name),
  };
  

  //*download rateCard
  function downloadRateCard(data) {
    axios
    .get(
      `https://lvpl.in/librabackend/public/api/download-pdf/RateCards/${data}`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${props?.login?.login?.token}` // Include the Bearer token
          }
        }
        )
        .then((res) => {
          fileDownload(res.data, data);
        });
      }
      //*download downloadAgreement
  function downloadAgreement(data) {
    axios
      .get(
        `https://lvpl.in/librabackend/public/api/download-pdf/AggrementCopies/${data}`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${props?.login?.login?.token}` // Include the Bearer token
          }
        }
      )
      .then((res) => {
        fileDownload(res.data, data);
      });
  }

  return (
    <div>
      <Button
        size="small"
        variant="outlined"
        className="ml-2"
        color="success"
        onClick={() => {
          setModal(!modal);
        }}
      >
        Renew
      </Button>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Renew Agreement</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              //*
              bank_name: props?.data?.bank?.bank_name,
              bank_id: props?.data?.bank_id,
              //*
              start_date: props?.data?.start_date,
              end_date: props?.data?.end_date,
              aggrement_copy: props?.data?.aggrement_copy,
              rate_card: props?.data?.rate_card,
              remarks: props?.data?.remarksx,
              is_close: "0",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              bank_name: Yup.string().required("Bank Name is required"),
              start_date: Yup.string().required(
                "Agreement start date is required"
              ),
              end_date: Yup.string().required("Agreement end date is required"),
              aggrement_copy: Yup.string().required(
                "Agreement Copy is required"
              ),
              rate_card: Yup.string().required("Rate Card is required"),
            })}
          >
            {(formProps) => (
              <Form encType="multipart/form-data">
                <Row>
                  <Col md={3} className="pb-4">
                    <Autocomplete
                      {...flatProps}
                      id="bank_name"
                      name="bank_name"
                      size="large"
                      value={formProps.values.bank_name}
                      inputValue={formProps.values.bank_name}
                      onInputChange={(e, value) => {
                        console.log("value", value);
                        formProps.setFieldValue("bank_name", value);
                      }}
                      error={
                        formProps.touched.bank_name &&
                        Boolean(formProps.errors.bank_name)
                      }
                      helperText={
                        formProps.touched.bank_name &&
                        formProps.errors.bank_name
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Bank Name"
                          size="large"
                          variant="outlined"
                        />
                      )}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="bank_id"
                      name="bank_id"
                      disabled
                      hidden
                      label="Bank ID"
                      value={formProps.values.bank_id}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.bank_id &&
                        Boolean(formProps.errors.bank_id)
                      }
                      helperText={
                        formProps.touched.bank_id && formProps.errors.bank_id
                      }
                    >
                      {props.banks.banks.data.map((bank) => {
                        if (formProps.values.bank_name == bank.bank_name) {
                          return (formProps.values.bank_id = bank.id);
                        } else if (formProps.values.bank_name === "") {
                          return (formProps.values.bank_id = "");
                        }
                      })}
                    </TextField>
                  </Col>
                  <Col md={3} className="pb-4">
                    <TextField
                      fullWidth
                      type="date"
                      size="large"
                      variant="outlined"
                      id="start_date"
                      name="start_date"
                      label="Start Date"
                      value={formProps.values.start_date}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.start_date &&
                        Boolean(formProps.errors.start_date)
                      }
                      helperText={
                        formProps.touched.start_date &&
                        formProps.errors.start_date
                      }
                    />
                  </Col>
                  <Col md={3} className="pb-4">
                    <TextField
                      fullWidth
                      type="date"
                      size="large"
                      variant="outlined"
                      id="end_date"
                      name="end_date"
                      label="End Date"
                      value={formProps.values.end_date}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.end_date &&
                        Boolean(formProps.errors.end_date)
                      }
                      helperText={
                        formProps.touched.end_date && formProps.errors.end_date
                      }
                    />
                  </Col>
                  <Col md={3}>
                     <Select
          id="is_close"
          fullWidth
          name="is_close"
          value={actionSelect}
          label="Select"
          size="small"
          onChange={handleActionSelectChange}
        >
          <MenuItem value={0}>Renew</MenuItem>
          <MenuItem value={1}>Close</MenuItem>
        </Select>
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
                        label="Remark"
                        id="remarks"
                        name="remarks"
                        value={formProps.values.remarks}
                        onChange={formProps.handleChange}
                       
                      />
                    </Col>

                  {props?.data?.aggrement_copy === "no_aggrement_copy.pdf" ? (
                    <Col md={12} className="pb-4">
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        type="file"
                        label="Agreement Copy"
                        id="aggrement_copy"
                        name="aggrement_copy"
                        onChange={(event) => {
                          formProps.setFieldValue(
                            "aggrement_copy",
                            event.currentTarget.files[0]
                          );
                          console.log(
                            "aggrement_copy",
                            formProps.values.aggrement_copy
                          );
                        }}
                        error={
                          formProps.touched.aggrement_copy &&
                          Boolean(formProps.errors.aggrement_copy)
                        }
                        helperText={
                          formProps.touched.aggrement_copy &&
                          formProps.errors.aggrement_copy
                        }
                      />
                    </Col>
                  ) : (
                    <Row>
                      <Col md={6} className="pb-4">
                        <Button
                          variant="outlined"
                          size="small"
                          color="success"
                          className=""
                          fullWidth
                          onClick={() =>
                            downloadAgreement(props.data.aggrement_copy)
                          }
                        >
                          {props.data.aggrement_copy}
                        </Button>
                      </Col>

                      <Col md={6} className="pb-4">
                        <TextField
                          type="file"
                          size="small"
                          fullWidth
                          focused
                          variant="outlined"
                          id="aggrement_copy"
                          name="aggrement_copy"
                          label="Agreement Copy"
                          className=""
                          // value={formProps.values.file}
                          onChange={(event) => {
                            formProps.setFieldValue(
                              "aggrement_copy",
                              event.currentTarget.files[0]
                            );
                            console.log(
                              "aggrement_copy",
                              formProps.values.aggrement_copy
                            );
                          }}
                          error={
                            formProps.touched.aggrement_copy &&
                            Boolean(formProps.errors.aggrement_copy)
                          }
                          helperText={
                            formProps.touched.aggrement_copy &&
                            formProps.errors.aggrement_copy
                          }
                        />
                      </Col>
                    </Row>
                  )}

                  {props?.data?.aggrement_copy === "no_aggrement_copy.pdf" ? (
                    <Col md={12} className="pb-4">
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        type="file"
                        label="Agreement Copy"
                        id="aggrement_copy"
                        name="aggrement_copy"
                        onChange={(event) => {
                          formProps.setFieldValue(
                            "aggrement_copy",
                            event.currentTarget.files[0]
                          );
                          console.log(
                            "aggrement_copy",
                            formProps.values.aggrement_copy
                          );
                        }}
                        error={
                          formProps.touched.aggrement_copy &&
                          Boolean(formProps.errors.aggrement_copy)
                        }
                        helperText={
                          formProps.touched.aggrement_copy &&
                          formProps.errors.aggrement_copy
                        }
                      />
                    </Col>
                  ) : (
                    <Row>
                      <Col md={6} className="pb-4">
                        <Button
                          variant="outlined"
                          size="small"
                          color="success"
                          className=""
                          fullWidth
                          onClick={() => downloadRateCard(props.data.rate_card)}
                        >
                          {props.data.rate_card}
                        </Button>
                      </Col>

                      <Col md={6} className="pb-4">
                        <TextField
                          type="file"
                          size="small"
                          fullWidth
                          focused
                          variant="outlined"
                          id="rate_card"
                          name="rate_card"
                          label="Rate Card"
                          className=""
                          // value={formProps.values.file}
                          onChange={(event) => {
                            formProps.setFieldValue(
                              "rate_card",
                              event.currentTarget.files[0]
                            );
                            console.log(
                              "rate_card",
                              formProps.values.rate_card
                            );
                          }}
                          error={
                            formProps.touched.rate_card &&
                            Boolean(formProps.errors.rate_card)
                          }
                          helperText={
                            formProps.touched.rate_card &&
                            formProps.errors.rate_card
                          }
                        />
                      </Col>
                    </Row>
                  )}
                </Row>

                <Divider />

                <Row className="pt-4 pd-4">
                  <Col md={6}>
                    <Button
                      color="success"
                      variant="outlined"
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
                      variant="outlined"
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    agreementsPostData: (data) => dispatch(agreementsPostData(data)),
    agreementClose: (data) => dispatch(agreementClose(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RenewAgreement);
