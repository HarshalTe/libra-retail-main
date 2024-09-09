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
} from "reactstrap";
import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@material-ui/core/TextField";
import Select from "@mui/material/Select";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Divider, Tooltip, IconButton } from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";

//*
import { editBankProductsData } from "../../../../Redux/Creators/BankProductsCreators";

function EditBankProducts(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => {
    console.log("modal", modal);
    setModal(!modal);
    console.log("modal", modal);
  };
  const bankVerticalsProps = {
    options: props?.bankVerticals?.isLoading
      ? []
      : props?.bankVerticals?.bankVerticals?.data?.map(
          (bankVertical) => bankVertical?.name +" " + "("+bankVertical?.branch?.bank_name +")"
        ),
  };
  const bankVerticalsProps3 = {
    options: props?.bankVerticals?.isLoading
      ? []
      : props?.bankVerticals?.bankVerticals?.data?.map(
          (bankVertical) => bankVertical
        ),
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);

    let data = {
      token: token,
      pageno: props.data.pageno,
      pageSize: props.data.pageSize,
      id: props?.data?.id,
      bank_id: values.bank_id,
      branch_id: values.branch_id.toString(),
      name: values.name,
      bank_vertical_id: values.bank_vertical_id.toString(),
      rate: values.rate.toString(),
    };

    props.editBankProductsData(data);
    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
      <Button
        size="small"
        variant="contained"
        color="warning"
        onClick={() => {
          setModal(!modal);
        }}
        startIcon={<EditIcon />}
      >
        Edit
      </Button>

      <Modal className="modal-lg" isOpen={modal} toggle={() => toggle()}>
        <ModalHeader toggle={() => toggle()}>Edit Bank Product</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              bank_id: props.data.bank_id,
              branch_id: props.data.branch_id,
              bank_vertical_id: props.data.bank_vertical_id,
              name: props.data.name,
              rate: props.data.rate,
              bank_vertical_name: props.data.bank_vertical.name,
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              bank_vertical_name: Yup.string().required(
                "Bank Vertical is required"
              ),
              name: Yup.string().required("Product Name is required"),
              rate: Yup.string().required("Rate is required"),
            })}
          >
            {(formProps) => {
              return (
                <Form>
                  <Row>
                    <Col md={4} className="pb-4">
                      <>
                      {/* <Autocomplete
                          {...bankVerticalsProps}
                          id="bank_vertical_name"
                          name="bank_vertical_name"
                          value={formProps.values.bank_vertical_name}
                          inputValue={formProps.values.bank_vertical_name}
                          onInputChange={(e, value) => {
                            console.log("value", value);
                            formProps.setFieldValue(
                              "bank_vertical_name",
                              value
                            );
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="bank_vertical_name"
                              id="bank_vertical_name"
                              label="Bank Vertical"
                              variant="outlined"
                              disabled
                              error={
                                formProps.touched.bank_vertical_name &&
                                Boolean(formProps.errors.bank_vertical_name)
                              }
                              helperText={
                                formProps.touched.bank_vertical_name &&
                                formProps.errors.bank_vertical_name
                              }
                            />
                          )}
                        /> */}
                      <Autocomplete
                            id="bank_vertical_name"
                            name="bank_vertical_name"
                            value={formProps.values.bank_vertical_name}
                            inputValue={formProps.values.bank_vertical_name}
                          options={bankVerticalsProps3.options}
                          getOptionLabel={(bank) =>
                            `${bank.name  +" " + "("+bank?.branch?.bank_name +")"}`
                          }
                          onChange={(e, value) =>{
                            console.log(value,e,"ere")
                            formProps.setFieldValue(
                              "bank_vertical_name",
                              value?.name || ""
                            )
                          }
                          }
                          onOpen={formProps.handleBlur}
                          includeInputInList
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              error={Boolean(
                                formProps.touched.bank_vertical_name &&
                                  formProps.errors.bank_vertical_name
                              )}
                              fullWidth
                              helperText={
                                formProps.touched.bank_vertical_name &&
                                formProps.errors.bank_vertical_name
                              }
                              label="Bank Vertical *"
                              name="bank_vertical_name"
                              variant="outlined"
                            />
                          )}
                        />

                        <TextField
                          fullWidth
                          hidden
                          size="small"
                          variant="outlined"
                          id="bank_vertical_id"
                          name="bank_vertical_id"
                          disabled
                          label="Bank Vertical ID"
                          value={formProps.values.bank_vertical_id}
                          onChange={formProps.handleChange}
                        >
                          {props.bankVerticals?.bankVerticals?.data?.map(
                            (bankVertical) => {
                              if (
                                formProps.values.bank_vertical_name ==
                                bankVertical.name
                              ) {
                                return (formProps.values.bank_vertical_id =
                                  bankVertical.id);
                              } else if (
                                formProps.values.bank_vertical_name === ""
                              ) {
                                return (formProps.values.bank_vertical_id = "");
                              }
                            }
                          )}
                        </TextField>

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
                          {props?.bankVerticals?.bankVerticals?.data?.map(
                            (bankVertical) => {
                              if (
                                formProps.values.bank_vertical_name ==
                                bankVertical?.name
                              ) {
                                return (formProps.values.bank_id =
                                  bankVertical?.bank_id);
                              } else if (
                                formProps.values.bank_vertical_name === ""
                              ) {
                                return (formProps.values.bank_id = "");
                              }
                            }
                          )}
                        </TextField>

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
                          {props?.bankVerticals?.bankVerticals?.data?.map(
                            (bankVertical) => {
                              if (
                                formProps.values.bank_vertical_name ==
                                bankVertical?.name
                              ) {
                                return (formProps.values.branch_id =
                                  bankVertical?.branch_id);
                              } else if (
                                formProps.values.bank_vertical_name === ""
                              ) {
                                return (formProps.values.branch_id = "");
                              }
                            }
                          )}
                        </TextField>
                      </>
                    </Col>

                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Product Name"
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

                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Rate"
                        id="rate"
                        name="rate"
                        type="number"
                        value={formProps.values.rate}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.rate &&
                          Boolean(formProps.errors.rate)
                        }
                        helperText={
                          formProps.touched.rate && formProps.errors.rate
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
    dropdownDetails: state.dropdownDetails,
    dropdowns: state.dropdowns,
    bankVerticals: state.bankVerticals,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editBankProductsData: (data) => dispatch(editBankProductsData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBankProducts);
