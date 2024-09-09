import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import {
  Row,
  Col,
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
import Autocomplete from "@mui/material/Autocomplete";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Divider, Typography } from "@material-ui/core";

//*
import { bankVerticalsPostData } from "../../../../Redux/Creators/BankVerticalsCreators";

function AddBankVerticals(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  const bankProps = {
    options: props?.banks?.isLoading
      ? []
      : props?.banks?.banks?.data?.map((bank) => bank?.bank_name),
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("handleSubmit");
    let data = {
      token: token,
      pageno: 1,
      pageSize: 10000,
      bank_id: values.bank_id,
      branch_id: values.branch_id.toString(),
      name: values.name,
    };

    console.log("data", data);

    props.bankVerticalsPostData(data);
    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="success"
        size="small"
        className="ml-3"
        onClick={() => toggle()}
        startIcon={<AddIcon fontSize="inherit" />}
      >
       1. Add Verticals
      </Button>

      <Modal className="modal-lg" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <Typography>
            <strong>Add Bank Verticals</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              //*
              bank_id: "",
              branch_id: "",
              name: "",
              //*
              bank_name: "",
              branch_name: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Name is required"),
              bank_name: Yup.string().required("Bank Name is required"),
              branch_name: Yup.string().required("Branch Name is required"),
            })}
          >
            {(formProps) => {
              const branchesProps = {
                options:
                  formProps.values.bank_name == ""
                    ? []
                    : props?.branches?.branches?.data
                        ?.filter(
                          (branch) =>
                            branch.bank_name == formProps?.values?.bank_name
                        )
                        ?.map((branch) => branch.branch_name),
              };

              console.log("bankprops", branchesProps);

              return (
                <Form>
                  <Row>
                    <Col md={6} className="pb-4">
                      <>
                        <Autocomplete
                          {...bankProps}
                          id="bank_name"
                          name="bank_name"
                          value={formProps.values.bank_name}
                          inputValue={formProps.values.bank_name}
                          onInputChange={(e, value) => {
                            console.log("value", value);
                            formProps.setFieldValue("bank_name", value);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="bank_name"
                              id="bank_name"
                              label="Bank Name"
                              variant="outlined"
                              error={
                                formProps.touched.bank_name &&
                                Boolean(formProps.errors.bank_name)
                              }
                              helperText={
                                formProps.touched.bank_name &&
                                formProps.errors.bank_name
                              }
                            />
                          )}
                        />

                        <TextField
                          fullWidth
                          hidden
                          size="small"
                          variant="outlined"
                          id="bank_id"
                          name="bank_id"
                          disabled
                          label="Bank ID"
                          value={formProps.values.bank_id}
                          onChange={formProps.handleChange}
                        >
                          {props?.banks?.banks?.data?.map((bank) => {
                            if (formProps.values?.bank_name == bank?.bank_name) {
                              return (formProps.values.bank_id = bank?.id);
                            } else if (formProps.values.bank_name === "") {
                              return (formProps.values.bank_id = "");
                            }
                          })}
                        </TextField>
                      </>
                    </Col>
                    <Col md={6} className="pb-4">
                      <>
                        <Autocomplete
                          {...branchesProps}
                          id="branch_name"
                          name="branch_name"
                          value={formProps.values.branch_name}
                          inputValue={formProps.values.branch_name}
                          onInputChange={(e, value) => {
                            console.log("value", value);
                            formProps.setFieldValue("branch_name", value);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="branch_name"
                              id="branch_name"
                              label="Branch Name"
                              variant="outlined"
                              error={
                                formProps.touched.branch_name &&
                                Boolean(formProps.errors.branch_name)
                              }
                              helperText={
                                formProps.touched.branch_name &&
                                formProps.errors.branch_name
                              }
                            />
                          )}
                        />

                        <TextField
                          fullWidth
                          hidden
                          size="small"
                          variant="outlined"
                          id="branch_id"
                          name="branch_id"
                          disabled
                          label="Branch ID"
                          value={formProps.values.branch_id}
                          onChange={formProps.handleChange}
                        >
                          {props?.branches?.branches?.data?.map((branch) => {
                            if (
                              formProps.values.branch_name == branch.branch_name
                            ) {
                              return (formProps.values.branch_id = branch?.id);
                            } else if (formProps.values.branch_name === "") {
                              return (formProps.values.branch_id = "");
                            }
                          })}
                        </TextField>
                      </>
                    </Col>

                    <Col md={12} className="pb-4">
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Name"
                        id="name"
                        name="name"
                        value={formProps.values.name}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.name &&
                          Boolean(formProps.errors.name)
                        }
                        helperText={
                          formProps.touched.name && formProps.errors.name
                        }
                      />
                    </Col>
                  </Row>

                  <Divider />

                  <Row style={{ justifyContent: "center" }} className="pt-4">
                    <Col>
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

                    <Col>
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
              );
            }}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    bankVerticalsPostData: (data) => dispatch(bankVerticalsPostData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBankVerticals);
